import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract OrderBook with Deployable, Ownable {
    
    // config
    maxTimeDelayExecutor: Int = 30 * 60; // executor execute before 30min
    minTimeDelayTrader: Int = 3 * 60; // trader execute after 3min

    // TODO gas
    minExecutionFee: Int = ton("0.1"); // fee for every operation
    gasConsumption: Int = ton("0.05"); // min consumption gas
    minTonsForStorage: Int = ton("0.03"); // min storage gas

    usdtWallet: Address; // order book USDT jetton wallet address
    pool: Address; // pool address

    // tokenConfigs: map<Int, TokenConfig>; // tokenIndex => tokenConfig
    // tokenIndexNext: Int as uint64 = 1;

    // admin
    owner: Address;
    executors: map<Address, Bool>; // account => enabled
    // compensators: map<Address, Bool>; // account => enabled

    // LP
    lpPositionOrders: map<Int, LPPositionOrder>; // orderId => order
    lpPositionOrderIndexNext: Int as uint64 = 1;

    // Perp
    perpPositionOrders: map<Int, PerpPositionOrder>; // orderId => order
    perpPositionOrderExs: map<Int, PerpPositionOrderEx>; // orderId => orderEx
    perpPositionOrderIndexNext: Int as uint64 = 1;

    init(deployId: Int) {
        self.owner = sender();

        self.executors.set(sender(), true);

        self.usdtWallet = newAddress(0, 0);
        self.pool = newAddress(0, 0);
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: UpdateConfig) {
        self.requireOwner();
        // auth
        if (msg.executor != null && msg.enableExecutor != null) {
            self.executors.set(msg.executor!!, msg.enableExecutor!!);
        }

        // config
        self.maxTimeDelayExecutor = msg.maxTimeDelayExecutor;
        self.minTimeDelayTrader = msg.minTimeDelayTrader;
        self.minExecutionFee = msg.minExecutionFee;
        self.gasConsumption = msg.gasConsumption;
        self.minTonsForStorage = msg.minTonsForStorage;
        self.usdtWallet = msg.usdtWallet;
        self.pool = msg.pool;
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    get fun configData(executor: Address?): ConfigData {
        let isExecutor: Bool? = null;
        if (executor != null) {
            isExecutor = self.executors.get(executor!!);
        }

        return ConfigData{
            isExecutor: isExecutor,
            maxTimeDelayExecutor: self.maxTimeDelayExecutor,
            minTimeDelayTrader: self.minTimeDelayTrader,
            minExecutionFee: self.minExecutionFee,
            gasConsumption: self.gasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            usdtWallet: self.usdtWallet,
            pool: self.pool
        };
    }

    // ======================================================== Token ================================================================ //
    /**
    * @dev This function is called when the contract receives a TokenNotification message.
    * It checks the token and handles the corresponding operation code.
    * @param msg The TokenNotification message received.
    */
    receive(msg: TokenNotification) {
        // just refund other token
        if (sender() != self.usdtWallet) {
            send(SendParameters{
                to: sender(), 
                value: 0,
                mode: SendRemainingValue, 
                bounce: false,
                body: TokenTransfer{
                    queryId: msg.queryId,
                    amount: msg.amount,
                    receiver: msg.from,
                    responseDestination: msg.from,
                    customPayload: null,
                    forwardTonAmount: 0,
                    forwardPayload: beginCell().endCell().asSlice()
                }.toCell()
            });
            return;
        }

        // get op code
        let operation: Slice = msg.forwardPayload.loadRef().asSlice();
        let opCode: Int = operation.loadUint(32);
        if (opCode == OP_CREATE_INCREASE_LP_POSITION_ORDER) {
            let liquidityDelta: Int = operation.loadUint(128);
            let executionFee: Int = operation.loadCoins();

            self.handleCreateIncreaseLPPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, liquidityDelta);
        } else if (opCode == OP_CREATE_INCREASE_PERP_POSITION_ORDER) {
            let executionFee: Int = operation.loadCoins();
            let isMarket: Bool = operation.loadInt(1) == -1;
            let tokenId: Int = operation.loadUint(64);
            let isLong: Bool = operation.loadInt(1) == -1;
            let marginDelta: Int = operation.loadUint(128);
            let sizeDelta: Int = operation.loadUint(128);
            let triggerPrice: Int = operation.loadUint(256);
            
            let tpSl: Slice = operation.loadRef().asSlice();
            let tpSize: Int = tpSl.loadUint(128);
            let tpPrice: Int = tpSl.loadUint(256);
            let slSize: Int = tpSl.loadUint(128);
            let slPrice: Int = tpSl.loadUint(256);

            self.handleCreateIncreasePerpPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, isMarket, tokenId, isLong, marginDelta, 
                sizeDelta, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        } else {
            send(SendParameters{
                to: self.usdtWallet, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: false,
                body: TokenTransfer{
                    queryId: msg.queryId,
                    amount: msg.amount,
                    receiver: msg.from,
                    responseDestination: msg.from,
                    customPayload: null,
                    forwardTonAmount: 0,
                    forwardPayload: beginCell().endCell().asSlice()
                }.toCell()
            });
        }
    }

    fun refundJetton(queryId: Int, amount: Int, to: Address, destination: Address?) {
        if (amount > 0) {
            send(SendParameters{
                to: self.usdtWallet, 
                value: GAS_TRANSFER_JETTON,
                mode: SendIgnoreErrors, 
                bounce: false,
                body: TokenTransfer{
                    queryId: queryId,
                    amount: amount,
                    receiver: to,
                    responseDestination: destination,
                    customPayload: null,
                    forwardTonAmount: 0,
                    forwardPayload: beginCell().endCell().asSlice()
                }.toCell()
            });
        }
    }

    // transfer execess ton
    fun refundExecessTon(to: Address, executionFee: Int) {
        let refundValue: Int = context().value - executionFee - self.gasConsumption - self.minTonsForStorage;
        if (refundValue > 0) {
            send(SendParameters{
                to: to,
                bounce: false,
                value: refundValue,
                mode: SendIgnoreErrors
            });
        }
    }

    fun getPoolGas(): Int {
        return context().readForwardFee() * 2 + self.gasConsumption * 2 + self.minTonsForStorage;
    }

    // ======================================================== LP ================================================================ //
    // Create Increase
    fun handleCreateIncreaseLPPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, liquidityDelta: Int) {
        let ctx: Context = context();

        let refundComment: String = "";
        let refund: Bool = false;
        if (ctx.value < executionFee + self.gasConsumption + self.minTonsForStorage) {
            refund = true;
            refundComment = "gas not enough";
        }

        if (jettonFromAmount < liquidityDelta) {
            refund = true;
            refundComment = "jetton not enough";
        }

        if (executionFee < self.minExecutionFee) {
            refund = true;
            refundComment = "execution fee not enough";
        }

        // need refund
        if (refund) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            send(SendParameters{
                to: account,
                bounce: true,
                value: executionFee,
                mode: SendIgnoreErrors + SendRemainingValue,
                body: refundComment.asComment()
            });
            return;
        }

        // add new order
        let orderId: Int = self.lpPositionOrderIndexNext;
        self.lpPositionOrderIndexNext = orderId + 1;
        self.lpPositionOrders.set(orderId, LPPositionOrder{
            isIncrease: true,
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            executionFeeReceiver: account,
            lastOperator: null
        });

        // event
        emit(LPPositionOrderCreatedEvent{
            opType: ORDER_OP_TYPE_INCREASE,
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            orderId: orderId
        }.toCell());

        self.refundExecessTon(account, executionFee);
    }

    // Create Decrease
    receive(msg: CreateDecreaseLPPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption + self.minTonsForStorage, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let orderId: Int = self.lpPositionOrderIndexNext;
        self.lpPositionOrderIndexNext = self.lpPositionOrderIndexNext + 1;
        self.lpPositionOrders.set(orderId, LPPositionOrder{
            isIncrease: false,
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now(),
            isPending: false,
            executionFeeReceiver: sender(),
            lastOperator: null
        });

        // event
        emit(LPPositionOrderCreatedEvent{
            opType: ORDER_OP_TYPE_DECREASE,
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            orderId: orderId
        }.toCell());

        // transfer execess gas
        self.refundExecessTon(sender(), msg.executionFee);
    }

    // Cancel Increase / Decrease
    // cancel increase => orderBook wallet => excess gas
    // cancel decrease => excess gas
    receive(msg: CancelLPPositionOrder) {
        let ctx: Context = context();
        // check order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= self.gasConsumption + self.minTonsForStorage + GAS_TRANSFER_JETTON, "gas not enough");
        } else {
            require(ctx.value >= self.gasConsumption + self.minTonsForStorage, "gas not enough");
        }

        self.shouldCancel(order.blockTime, sender(), order.isPending);

        // get fee receiver
        let executionFeeReceiver: Address = sender();
        if (msg.executionFeeReceiver != null) {
            executionFeeReceiver = msg.executionFeeReceiver!!;
        }

        // delete order
        self.lpPositionOrders.set(msg.orderId, null);

        if (order.isIncrease) {
            // transfer jetton
            self.refundJetton(0, order.liquidityDelta, order.account, sender());
        }

        // transfer execution fee
        // self.transferExecutionFee(executionFeeReceiver, order.executionFee);
        if (order.executionFee > 0) {
            send(SendParameters{
                to: executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }

        // event
        emit(LPPositionOrderCancelledEvent{
            opType: order.isIncrease ? ORDER_OP_TYPE_INCREASE : ORDER_OP_TYPE_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExecessTon(sender(), 0);
    }

    // Execute Increase / Decrease
    // execute increase => increase position for pool => increase success / bounced => excess gas
    // execute decrease => decrease position for pool => decrease success => orderBook wallet => excess gas
    receive(msg: ExecuteLPPositionOrder) {
        let ctx: Context = context();

        // check order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
        } else {
            require(ctx.value >= self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas() + GAS_TRANSFER_JETTON, "gas not enough");
        }

        self.shouldExecute(order.blockTime, order.isPending);

        // update order
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        order.lastOperator = sender();
        order.isPending = true;
        self.lpPositionOrders.set(msg.orderId, order);

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdateLPPosition {
                isIncrease: order.isIncrease,
                orderId: msg.orderId,
                trxId: msg.trxId,
                account: order.account,
                liquidityDelta: order.liquidityDelta,
                pricesLength: msg.pricesLength,
                prices: msg.prices
            }.toCell()
        });
    }

    // increase success / bounced => excess gas
    // decrease success => orderBook wallet => excess gas
    receive(msg: UpdateLPPositionSuccess) {
        let ctx: Context = context();
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= self.gasConsumption, "gas not enough");
        } else {
            require(ctx.value >= self.gasConsumption + GAS_TRANSFER_JETTON, "gas not enough");
        }

        // delete order
        self.lpPositionOrders.set(msg.orderId, null);

        // transfer jetton
        if (msg.receive > 0) {
            self.refundJetton(msg.trxId, msg.receive, order.account, order.lastOperator);
        }

        // transfer execution fee
        if (order.executionFee > 0) {
            send(SendParameters{
                to: order.executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }

        // event
        emit(LPPositionOrderExecutedEvent{
            opType: order.isIncrease ? ORDER_OP_TYPE_INCREASE : ORDER_OP_TYPE_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer excess gas
        if (order.lastOperator != null) {
            self.refundExecessTon(order.lastOperator!!, 0);
        }
    }

    // reset order pending
    bounced(src: bounced<UpdateLPPosition>) {

        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: LPPositionOrder = orderOpt!!;

        // update pending
        order.isPending = false;
        self.lpPositionOrders.set(src.orderId, order);
    }

    // ============================ Getter ================================ //
    get fun lpPositionOrder(orderId: Int): LPPositionOrder? {
        return self.lpPositionOrders.get(orderId);
    }

    get fun lpPositionOrderIndexNext(): Int {
        return self.lpPositionOrderIndexNext;
    }

    // ============================ Perp ================================ //
    // ============================ Create Increase ================================ //
    fun handleCreateIncreasePerpPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, isMarket: Bool,
        tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, triggerPrice: Int, tpSize: Int, tpPrice: Int, slSize: Int, slPrice: Int) {
        let ctx: Context = context();

        let refundComment: String = "";
        let refund: Bool = false;
        if (ctx.value < executionFee + self.gasConsumption + self.minTonsForStorage) {
            refund = true;
            refundComment = "gas not enough";
        }

        if (jettonFromAmount < marginDelta) {
            refund = true;
            refundComment = "jetton not enough";
        }

        if (executionFee < self.minExecutionFee) {
            refund = true;
            refundComment = "execution fee not enough";
        }

        // need refund
        if (refund) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            send(SendParameters{
                to: account,
                bounce: true,
                value: executionFee,
                mode: SendIgnoreErrors + SendRemainingValue,
                body: refundComment.asComment()
            });
            return;
        }

        // add new order
        let opType: Int = 0;
        if (isMarket) {
            opType = ORDER_OP_TYPE_INCREASE_MARKET;
        } else {
            opType = ORDER_OP_TYPE_INCREASE_LIMIT;
        }
        self.createPerpOrder(opType, account, tokenId, isLong, marginDelta, sizeDelta, triggerPrice, 
            tpSize, tpPrice, slSize, slPrice, executionFee);

        self.refundExecessTon(account, executionFee);
    }

    // ============================ Create Decrease ================================ //
    receive(msg: CreateDecreasePerpPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption + self.minTonsForStorage, "gas not enough");
        // check execution fee TODO tp/sl
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");
        require(msg.opType == ORDER_OP_TYPE_DECREASE_MARKET || msg.opType == ORDER_OP_TYPE_DECREASE_TP || msg.opType == ORDER_OP_TYPE_DECREASE_SL, "invalid op type");

        // add new order
        self.createPerpOrder(msg.opType, sender(), msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.triggerPrice, 
                0, 0, 0, 0, msg.executionFee);

        // transfer execess gas
        self.refundExecessTon(sender(), msg.executionFee);
    }

    fun createPerpOrder(opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, triggerPrice: Int, 
        tpSize: Int, tpPrice: Int, slSize: Int, slPrice: Int, executionFee: Int): Int {
        let triggerAbove: Bool = false;

        let orderId: Int = self.perpPositionOrderIndexNext;
        self.perpPositionOrderIndexNext = orderId + 1;

        if (opType == ORDER_OP_TYPE_INCREASE_MARKET || opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            // increase for long order, must trigger below the price
            triggerAbove = !isLong;
            self.perpPositionOrderExs.set(orderId, PerpPositionOrderEx{
                tpSize: tpSize,
                tpPrice: tpPrice,
                slSize: slSize,
                slPrice: slPrice
            });
        } else {
            if (opType == ORDER_OP_TYPE_DECREASE_MARKET) {
                // decrease for long market order, must trigger above the price
                triggerAbove = isLong;
            } else {
                if (opType == ORDER_OP_TYPE_DECREASE_TP) {
                    // tp for long limit order, must trigger above the price
                    triggerAbove = isLong;
                } else {
                    triggerAbove = !isLong;
                }
            }
        }

        self.perpPositionOrders.set(orderId, PerpPositionOrder{
            opType: opType,
            tokenId: tokenId,
            account: account,
            isLong: isLong,
            marginDelta: marginDelta,
            sizeDelta: sizeDelta,
            triggerPrice: triggerPrice,
            triggerAbove: triggerAbove,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            executionFeeReceiver: sender(),
            lastOperator: null
        });
        // event
        emit(PerpPositionOrderCreatedEvent{
            opType: opType,
            tokenId: tokenId,
            account: account,
            isLong: isLong,
            marginDelta: marginDelta,
            sizeDelta: sizeDelta,
            executionFee: executionFee,
            orderId: orderId,
            triggerPrice: triggerPrice,
            triggerAbove: triggerAbove,
            tpSize: tpSize,
            tpPrice: tpPrice,
            slSize: slSize,
            slPrice: slPrice
        }.toCell());
        return orderId;
    }

    // ============================ Cancel Increase / Decrease ================================ //
    // cancel increase => orderBook wallet => user wallet => token excess handel cancel => excess gas
    // cancel decrease => excess gas
    receive(msg: CancelPerpPositionOrder) {
        let ctx: Context = context();
        // check order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: PerpPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.gasConsumption + self.minTonsForStorage + GAS_TRANSFER_JETTON, "gas not enough");
        } else {
            require(ctx.value >= self.gasConsumption + self.minTonsForStorage, "gas not enough");
        }

        self.shouldCancel(order.blockTime, sender(), order.isPending);

        // get fee receiver
        let executionFeeReceiver: Address = sender();
        if (msg.executionFeeReceiver != null) {
            executionFeeReceiver = msg.executionFeeReceiver!!;
        }

        // delete order
        self.perpPositionOrders.set(msg.orderId, null);

        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            // transfer jetton
            self.refundJetton(msg.trxId, order.marginDelta, order.account, sender());
        }

        // transfer execution fee
        // self.transferExecutionFee(executionFeeReceiver, order.executionFee);
        if (order.executionFee > 0) {
            send(SendParameters{
                to: executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }

        // event
        emit(PerpPositionOrderCancelledEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExecessTon(sender(), 0);
    }

    // ============================ Execute Increase / Decrease ================================ //
    // execute increase => increase position for pool => increase success / bounced => excess gas
    // execute decrease => decrease position for pool => decrease success => transfer jetton => token excesses handel cancel => excess gas
    receive(msg: ExecutePerpPositionOrder) {
        dump("ExecutePerpPositionOrder");

        let ctx: Context = context();

        // check order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: PerpPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
        } else {
            require(ctx.value >= self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas() + GAS_TRANSFER_JETTON, "gas not enough");
        }

        self.shouldExecute(order.blockTime, order.isPending);

        // update order
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        order.lastOperator = sender();
        order.isPending = true;
        self.perpPositionOrders.set(msg.orderId, order);

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdatePerpPosition {
                orderId: msg.orderId,
                opType: order.opType,
                trxId: msg.trxId,
                account: order.account,
                tokenId: order.tokenId,
                isLong: order.isLong,
                marginDelta: order.marginDelta,
                sizeDelta: order.sizeDelta,
                triggerPrice: order.triggerPrice,
                triggerAbove: order.triggerAbove,
                pricesLength: msg.pricesLength,
                prices: msg.prices
            }.toCell()
        });
    }

    // increase success / bounced => excess gas
    // decrease success => transfer jetton => token excesses handel cancel => excess gas
    receive(msg: UpdatePerpPositionSuccess) {
        dump("UpdatePerpPositionSuccess");

        let ctx: Context = context();
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: PerpPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.gasConsumption, "gas not enough");
            // create tp sl
            let orderExOpt: PerpPositionOrderEx? = self.perpPositionOrderExs.get(msg.orderId);
            if (orderExOpt != null) {
                let orderEx: PerpPositionOrderEx = orderExOpt!!;
                // create tp/sl
                if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                    self.createPerpOrder(ORDER_OP_TYPE_DECREASE_TP, sender(), order.tokenId, order.isLong, 0, orderEx.tpSize, orderEx.tpPrice, 
                        0, 0, 0, 0, 0);
                }

                if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                    self.createPerpOrder(ORDER_OP_TYPE_DECREASE_SL, sender(), order.tokenId, order.isLong, 0, orderEx.slSize, orderEx.slPrice, 
                        0, 0, 0, 0, 0);
                }
            }
        } else {
            require(ctx.value >= self.gasConsumption + GAS_TRANSFER_JETTON, "gas not enough");
        }

        // delete order
        self.perpPositionOrders.set(msg.orderId, null);

        // transfer jetton
        if (msg.receive > 0) {
            if (order.opType == ORDER_OP_TYPE_LIQUIDATION) {
                self.refundJetton(msg.trxId, msg.receive, order.executionFeeReceiver, order.lastOperator);
            } else {
                self.refundJetton(msg.trxId, msg.receive, order.account, order.lastOperator);
            }
        }

        // event
        emit(PerpPositionOrderExecutedEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execution fee
        if (order.executionFee > 0) {
            send(SendParameters{
                to: order.executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }

        // transfer execess gas
        if (order.lastOperator != null) {
            self.refundExecessTon(order.lastOperator!!, 0);
        }
    }

    // reset order pending
    bounced(src: bounced<UpdatePerpPosition>) {
        // get order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: PerpPositionOrder = orderOpt!!;
        if (order.opType == ORDER_OP_TYPE_LIQUIDATION) {
            // delete
            self.perpPositionOrders.set(src.orderId, null);
        } else {
            // update pending
            order.isPending = false;
            self.perpPositionOrders.set(src.orderId, order);
        }
    }

    // ============================ Liquidation ================================ //
    receive(msg: LiquidatePerpPosition) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas() + GAS_TRANSFER_JETTON, "gas not enough");

        // check sender
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        require(isExecutor, "invalid sender");

        // fee receiver
        let liquidationFeeReceiver: Address = sender();
        if (msg.liquidationFeeReceiver != null) {
            liquidationFeeReceiver = msg.liquidationFeeReceiver!!;
        }

        // add new order
        let orderId: Int = self.perpPositionOrderIndexNext;
        self.perpPositionOrderIndexNext = self.perpPositionOrderIndexNext + 1;
        self.perpPositionOrders.set(orderId, PerpPositionOrder{
            opType: ORDER_OP_TYPE_LIQUIDATION,
            tokenId: msg.tokenId,
            account: msg.account,
            isLong: msg.isLong,
            marginDelta: 0,
            sizeDelta: 0,
            triggerPrice: 0,
            triggerAbove: false,
            executionFee: 0,
            blockTime: now(),
            isPending: true,
            executionFeeReceiver: liquidationFeeReceiver,
            lastOperator: sender()
        });

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdatePerpPosition {
                opType: ORDER_OP_TYPE_LIQUIDATION,
                orderId: orderId,
                trxId: msg.trxId,
                account: msg.account,
                tokenId: msg.tokenId,
                isLong: msg.isLong,
                marginDelta: 0,
                sizeDelta: 0,
                triggerPrice: 0,
                triggerAbove: false,
                pricesLength: msg.pricesLength,
                prices: msg.prices
            }.toCell()
        });
    }
    
    // ============================ ADL ================================ //
    receive(msg: ADLPerpPosition) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas() + GAS_TRANSFER_JETTON, "gas not enough");

        // check sender
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        require(isExecutor, "invalid sender");

        // add new order
        let orderId: Int = self.perpPositionOrderIndexNext;
        self.perpPositionOrderIndexNext = self.perpPositionOrderIndexNext + 1;
        self.perpPositionOrders.set(orderId, PerpPositionOrder{
            opType: ORDER_OP_TYPE_ADL,
            tokenId: msg.tokenId,
            account: msg.account,
            isLong: msg.isLong,
            marginDelta: msg.marginDelta,
            sizeDelta: msg.sizeDelta,
            triggerPrice: 0,
            triggerAbove: false,
            executionFee: 0,
            blockTime: now(),
            isPending: true,
            executionFeeReceiver: sender(),
            lastOperator: sender()
        });

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdatePerpPosition {
                opType: ORDER_OP_TYPE_ADL,
                orderId: orderId,
                trxId: msg.trxId,
                account: msg.account,
                tokenId: msg.tokenId,
                isLong: msg.isLong,
                marginDelta: 0,
                sizeDelta: msg.sizeDelta,
                triggerPrice: 0,
                triggerAbove: false,
                pricesLength: msg.pricesLength,
                prices: msg.prices
            }.toCell()
        });
    }

    // ============================ Getter ================================ //
    get fun perpPositionOrder(orderId: Int): PerpPositionOrder? {
        return self.perpPositionOrders.get(orderId);
    }

    get fun perpPositionOrderIndexNext(): Int {
        return self.perpPositionOrderIndexNext;
    }

    // ======================================================== Compensate ================================================================ //
    receive(msg: CompensateOrder) {
        let ctx: Context = context();

        // executor or trader
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }

        // check sender
        require(isExecutor, "invalid sender");

        // check gas
        if (msg.refundReceiver != null && msg.refundAmount > 0) {
            require(ctx.value >= self.gasConsumption + self.minTonsForStorage + GAS_TRANSFER_JETTON, "gas not enough");
        } else {
            require(ctx.value >= self.gasConsumption + self.minTonsForStorage, "gas not enough");
        }

        // get order
        if(msg.orderType != null) {
            let isPending: Bool = true;
            if (msg.orderType == ORDER_TYPE_LP) {
                let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
                if (orderOpt != null) {
                    isPending = (orderOpt!!).isPending;
                }
                self.lpPositionOrders.set(msg.orderId, null);
            } else {
                let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
                if (orderOpt != null) {
                    isPending = (orderOpt!!).isPending;
                }
                self.perpPositionOrders.set(msg.orderId, null);
            }
            require(isPending, "order not pending");
        }

        // refund
        if (msg.refundReceiver != null && msg.refundAmount > 0) {
            // transfer jetton
            self.refundJetton(msg.trxId, msg.refundAmount, msg.refundReceiver!!, sender());
        }

        // transfer execution fee
        // self.transferExecutionFee(msg.executionFeeReceiver, msg.executionFee);
        if (msg.executionFeeReceiver != null && msg.executionFee > 0) {
            send(SendParameters{
                to: msg.executionFeeReceiver!!,
                bounce: true,
                value: msg.executionFee,
                mode: SendIgnoreErrors
            });
        }

        emit(CompensateOrderEvent{
            orderType: msg.orderType,
            orderId: msg.orderId,
            trxId: msg.trxId,
            refundReceiver: msg.refundReceiver,
            refundAmount: msg.refundAmount,
            executionFeeReceiver: msg.executionFeeReceiver,
            executionFee: msg.executionFee
        }.toCell());

        // transfer execess gas
        self.refundExecessTon(sender(), 0);
        return;
    }

    // ======================================================== private function ================================================================ //
    fun shouldCancel(blockTime: Int, account: Address, isPending: Bool) {
        require(!isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }

        // check sender
        require(sender() == account || isExecutor, "invalid sender");
        // trader cancel must after minTimeDelayTrader
        if (!isExecutor) {
            require(blockTime + self.minTimeDelayTrader <= now(), "too early");
        }
    }

    fun shouldExecute(blockTime: Int, isPending: Bool) {
        require(!isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }

        // check sender
        require(isExecutor, "invalid sender");

        // executor cancel must before maxTimeDelayExecutor
        require(blockTime + self.maxTimeDelayExecutor > now(), "order expired");
    }

    // fun tokenEnabled(tokenIndex: Int): Bool {
    //     let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenIndex);
    //     if (tokenConfigOpt == null) {
    //         return false;
    //     }
    //     return (tokenConfigOpt!!).enable;
    // }


}
