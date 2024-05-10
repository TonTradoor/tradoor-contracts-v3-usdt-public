import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract OrderBook with Deployable, Resumable {
    
    // config
    maxTimeDelayExecutor: Int = 30 * 60; // executor execute before 30min
    minTimeDelayTrader: Int = 3 * 60; // trader execute after 3min

    // gas
    // order gas
    lpGasConsumption: Int = ton("0.04"); // min lp consumption gas
    perpGasConsumption: Int = ton("0.09"); // min perp consumption gas
    // pool gas
    poolLpGasConsumption: Int = ton("0.04"); // min orderbook consumption gas
    poolPerpGasConsumption: Int = ton("0.09"); // min perp consumption gas
    // storage gas
    minTonsForStorage: Int = ton("0.01"); // min pool storage gas
    // jetton gas
    gasTransferJetton: Int = ton("0.08"); // min pool storage gas
    // execution fee
    lpMinExecutionFee: Int = ton("0.05"); // fee for every operation
    perpMinExecutionFee: Int = ton("0.1"); // fee for every operation
    // total gas
    totalExecutionFee: Int = 0;

    // address
    usdtWallet: Address; // order book USDT jetton wallet address
    pool: Address; // pool address

    // admin
    owner: Address;
    stopped: Bool;
    executors: map<Address, Bool>; // account => enabled

    // LP
    lpPositionOrders: map<Int, LPPositionOrder>; // orderId => order
    lpPositionOrderIndexNext: Int as uint64 = 1;

    // Perp
    perpPositionOrders: map<Int, PerpPositionOrder>; // orderId => order
    perpPositionOrderExs: map<Int, PerpPositionOrderEx>; // orderId => orderEx
    perpPositionOrderIndexNext: Int as uint64 = 1;

    // Compensate
    compensates: map<Int, Compensate>; // id => compensate
    compensateIndexNext: Int as uint64 = 1;


    init(deployId: Int) {
        self.owner = sender();
        self.stopped = false;
        self.executors.set(sender(), true);

        self.usdtWallet = newAddress(0, 0);
        self.pool = newAddress(0, 0);
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: UpdateConfig) {
        self.requireOwner();
        // auth
        let i: Int = 0;
        while (i < msg.executorLength) {
            let executor: ExecutorParam? = msg.executors.get(i);
            if (executor != null) {
                self.executors.set((executor!!).executor, (executor!!).enable);
            }
            i += 1;
        }

        // config
        self.maxTimeDelayExecutor = msg.maxTimeDelayExecutor;
        self.minTimeDelayTrader = msg.minTimeDelayTrader;
        self.lpMinExecutionFee = msg.lpMinExecutionFee;
        self.perpMinExecutionFee = msg.perpMinExecutionFee;

        self.lpGasConsumption = msg.lpGasConsumption;
        self.perpGasConsumption = msg.perpGasConsumption;
        self.poolLpGasConsumption = msg.poolLpGasConsumption;
        self.poolPerpGasConsumption = msg.poolPerpGasConsumption;
        self.minTonsForStorage = msg.minTonsForStorage;
        self.gasTransferJetton = msg.gasTransferJetton;

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
            lpMinExecutionFee: self.lpMinExecutionFee,
            perpMinExecutionFee: self.perpMinExecutionFee,
            lpGasConsumption: self.lpGasConsumption,
            perpGasConsumption: self.perpGasConsumption,
            poolLpGasConsumption: self.poolLpGasConsumption,
            poolPerpGasConsumption: self.poolPerpGasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            gasTransferJetton: self.gasTransferJetton,
            totalExecutionFee: self.totalExecutionFee,
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
                mode: SendIgnoreErrors + SendRemainingValue, 
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

        // stop
        if (self.stopped) {
            self.refundJetton(msg.queryId, msg.amount, msg.from, msg.from);
            send(SendParameters{
                to: msg.from,
                bounce: true,
                value: 0,
                mode: SendIgnoreErrors + SendRemainingValue,
                body: "create order stopped".asComment()
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
                mode: SendIgnoreErrors + SendRemainingValue, 
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
                value: self.gasTransferJetton,
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

    fun exceedGas(orderType: Int, executionFeeDelta: Int, executionMultiple: Int, transferJetton: Bool): Int {
        dump("exceed gas");
        let tonBalanceBeforeMsg: Int = myBalance() - self.totalExecutionFee + executionFeeDelta - context().value;
        // dump(myBalance() - context().value);
        // dump(tonBalanceBeforeMsg);
        tonBalanceBeforeMsg = max(0, tonBalanceBeforeMsg);
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        let extraValue: Int = max(0, tonBalanceBeforeMsg - self.minTonsForStorage);
        let gasConsumption: Int = orderType == ORDER_TYPE_LP ? self.lpGasConsumption : self.perpGasConsumption;
        // dump(storageFee);
        // dump(extraValue);
        // dump(gasConsumption);
        return context().value - storageFee - gasConsumption * executionMultiple + extraValue - 
            (executionFeeDelta > 0 ? executionFeeDelta : 0) - (transferJetton ? self.gasTransferJetton : 0);
    }

    // transfer exceed ton
    fun refundExceedTon(orderType: Int, to: Address, executionFeeDelta: Int, executionMultiple: Int, transferJetton: Bool) {
        let refundValue: Int = self.exceedGas(orderType, executionFeeDelta, executionMultiple, transferJetton);
        dump(refundValue);
        if (refundValue > 0) {
            send(SendParameters{
                to: to,
                bounce: false,
                value: refundValue
                // mode: SendIgnoreErrors
            });
        }
    }

    fun getPoolGas(orderType: Int): Int {
        let gasConsumption: Int = orderType == ORDER_TYPE_LP ? self.poolLpGasConsumption : self.poolPerpGasConsumption;
        return context().readForwardFee() + gasConsumption + self.minTonsForStorage;
    }

    // ======================================================== LP ================================================================ //
    // Create Increase
    fun handleCreateIncreaseLPPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, liquidityDelta: Int) {
        let ctx: Context = context();

        let refundComment: String = "";
        let refund: Bool = false;
        if (ctx.value < executionFee + self.lpGasConsumption) {
            refund = true;
            refundComment = "gas not enough";
        }

        if (jettonFromAmount < liquidityDelta) {
            refund = true;
            refundComment = "jetton not enough";
        }

        if (executionFee < self.lpMinExecutionFee) {
            refund = true;
            refundComment = "execution fee not enough";
        }

        // need refund
        if (refund) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            send(SendParameters{
                to: account,
                bounce: true,
                value: 0,
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

        self.totalExecutionFee += executionFee;

        // event
        emit(LPPositionOrderCreatedEvent{
            opType: ORDER_OP_TYPE_INCREASE,
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            orderId: orderId,
            trxId: queryId
        }.toCell());

        self.refundExceedTon(ORDER_TYPE_LP, account, executionFee, 1, false);
    }

    // Create Decrease
    receive(msg: CreateDecreaseLPPositionOrder) {
        self.requireNotStopped();

        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.lpGasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.lpMinExecutionFee, "execution fee not enough");

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

        self.totalExecutionFee += msg.executionFee;

        // event
        emit(LPPositionOrderCreatedEvent{
            opType: ORDER_OP_TYPE_DECREASE,
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            orderId: orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_LP, sender(), msg.executionFee, 1, false);
    }

    // Cancel Increase / Decrease
    // cancel increase => orderBook wallet => excess gas
    // cancel decrease => excess gas
    receive(msg: CancelLPPositionOrder) {
        let ctx: Context = context();
        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= self.lpGasConsumption + self.gasTransferJetton, "gas not enough");
        } else {
            require(ctx.value >= self.lpGasConsumption, "gas not enough");
        }
        
        // check order
        require(!order.isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor || sender() == order.account, "invalid sender");

        // trader cancel must after minTimeDelayTrader
        if (!isExecutor) {
            require(order.blockTime + self.minTimeDelayTrader <= now(), "too early");
        }

        // get fee receiver
        let executionFeeReceiver: Address = sender();
        if (msg.executionFeeReceiver != null) {
            executionFeeReceiver = msg.executionFeeReceiver!!;
        }

        // delete order
        self.lpPositionOrders.set(msg.orderId, null);

        if (order.isIncrease) {
            // transfer jetton
            self.refundJetton(msg.trxId, order.liquidityDelta, order.account, sender());
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

            self.totalExecutionFee -= order.executionFee;
        }

        // event
        emit(LPPositionOrderCancelledEvent{
            opType: order.isIncrease ? ORDER_OP_TYPE_INCREASE : ORDER_OP_TYPE_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_LP, sender(), -order.executionFee, 1, order.isIncrease);
    }

    // Execute Increase / Decrease
    // execute increase => increase position for pool => increase success / bounced => excess gas
    // execute decrease => decrease position for pool => decrease success => orderBook wallet => excess gas
    receive(msg: ExecuteLPPositionOrder) {
        let ctx: Context = context();

        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= self.lpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_LP), "gas not enough");
        } else {
            require(ctx.value >= self.lpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_LP) + self.gasTransferJetton, "gas not enough");
        }

        // check order
        require(!order.isPending, "order is pending");

        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor, "invalid sender");

        // execute must before maxTimeDelayExecutor
        require(order.blockTime + self.maxTimeDelayExecutor > now(), "order expired");

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
                liquidityDelta: order.liquidityDelta
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
            require(ctx.value >= self.lpGasConsumption, "gas not enough");
        } else {
            require(ctx.value >= self.lpGasConsumption + self.gasTransferJetton, "gas not enough");
        }

        // delete order
        self.lpPositionOrders.set(msg.orderId, null);

        // transfer jetton
        if (msg.receive > 0) {
            self.refundJetton(msg.trxId, msg.receive, order.account, order.lastOperator);
        }

        // dump(myBalance());

        // transfer execution fee
        if (order.executionFee > 0) {
            send(SendParameters{
                to: order.executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
            self.totalExecutionFee -= order.executionFee;
        }

        // dump(myBalance());

        // event
        emit(LPPositionOrderExecutedEvent{
            opType: order.isIncrease ? ORDER_OP_TYPE_INCREASE : ORDER_OP_TYPE_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer excess gas
        if (order.lastOperator != null) {
            self.refundExceedTon(ORDER_TYPE_LP, order.lastOperator!!, -order.executionFee, 1, msg.receive > 0);
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

        if (order.lastOperator != null) {
            send(SendParameters{
                to: order.lastOperator!!,
                value: 0,
                mode: SendIgnoreErrors + SendRemainingValue
            });
        }
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
        if (ctx.value < executionFee + self.perpGasConsumption) {
            refund = true;
            refundComment = "gas not enough";
        }

        if (jettonFromAmount < marginDelta) {
            refund = true;
            refundComment = "jetton not enough";
        }

        let executionFeeMultiple: Int = 1;
        if (tpSize > 0 && tpPrice > 0) {
            executionFeeMultiple += 1;
        }
        if (slSize > 0 && slPrice > 0) {
            executionFeeMultiple += 1;
        }

        if (executionFee < self.perpMinExecutionFee * executionFeeMultiple) {
            refund = true;
            refundComment = "execution fee not enough";
        }

        // need refund
        if (refund) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            send(SendParameters{
                to: account,
                bounce: true,
                value: 0,
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
        self.createPerpOrder(queryId, opType, account, tokenId, isLong, marginDelta, sizeDelta, triggerPrice, 
            tpSize, tpPrice, slSize, slPrice, executionFee / executionFeeMultiple);

        self.totalExecutionFee += executionFee;

        self.refundExceedTon(ORDER_TYPE_PERP, account, executionFee, 1, false);
    }

    // ============================ Create Decrease ================================ //
    receive(msg: CreateDecreasePerpPositionOrder) {
        self.requireNotStopped();

        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.perpGasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.perpMinExecutionFee, "execution fee not enough");

        // add new order
        self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_MARKET, sender(), msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.triggerPrice, 
                0, 0, 0, 0, msg.executionFee);

        self.totalExecutionFee += msg.executionFee;

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), msg.executionFee, 1, false);
    }

    receive(msg: CreateTpSlPerpPositionOrder) {
        self.requireNotStopped();
        
        let ctx: Context = context();

        let executionFeeMultiple: Int = 0;
        if (msg.tpSize > 0 && msg.tpPrice > 0) {
            executionFeeMultiple += 1;
        }
        if (msg.slSize > 0 && msg.slPrice > 0) {
            executionFeeMultiple += 1;
        }

        // check gas
        require(ctx.value - msg.executionFee >= self.perpGasConsumption * executionFeeMultiple, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.perpMinExecutionFee * executionFeeMultiple, "execution fee not enough");

        // create tp/sl
        if (msg.tpSize > 0 && msg.tpPrice > 0) {
            self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_TP, sender(), msg.tokenId, msg.isLong, 0, msg.tpSize, msg.tpPrice, 
                0, 0, 0, 0, msg.executionFee / executionFeeMultiple);
        }

        if (msg.slSize > 0 && msg.slPrice > 0) {
            self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_SL, sender(), msg.tokenId, msg.isLong, 0, msg.slSize, msg.slPrice, 
                0, 0, 0, 0, msg.executionFee / executionFeeMultiple);
        }

        self.totalExecutionFee += msg.executionFee;

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), msg.executionFee, executionFeeMultiple, false);
    }

    fun createPerpOrder(trxId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, triggerPrice: Int, 
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
                slPrice: slPrice,
                executionFee: executionFee
            });
            // let tpSlExecutionFee: Int = 0;
            // if (tpSize > 0 && tpPrice > 0) {
            //     tpSlExecutionFee += executionFee;
            // }
            // if (slSize > 0 && slPrice > 0) {
            //     tpSlExecutionFee += executionFee;
            // }
            // self.totalExecutionFee += tpSlExecutionFee;
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
            slPrice: slPrice,
            trxId: trxId
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
            require(ctx.value >= self.perpGasConsumption + self.gasTransferJetton, "gas not enough");
        } else {
            require(ctx.value >= self.perpGasConsumption, "gas not enough");
        }

        // check order
        require(!order.isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor || sender() == order.account, "invalid sender");
        
        // trader cancel market order must after minTimeDelayTrader
        if (!isExecutor && (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_DECREASE_MARKET)) {
            require(order.blockTime + self.minTimeDelayTrader <= now(), "too early");
        }

        // get fee receiver
        let executionFeeReceiver: Address = sender();
        if (msg.executionFeeReceiver != null) {
            executionFeeReceiver = msg.executionFeeReceiver!!;
        }

        let executionFee: Int = 0;
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            let orderExOpt: PerpPositionOrderEx? = self.perpPositionOrderExs.get(msg.orderId);
            if (orderExOpt != null) {
                let orderEx: PerpPositionOrderEx = orderExOpt!!;
                // tp/sl
                let tpSlExecutionFee: Int = 0;
                if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                    tpSlExecutionFee += orderEx.executionFee;
                }
                if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                    tpSlExecutionFee += orderEx.executionFee;
                }
                if (tpSlExecutionFee > 0) {
                    // transfer tpsl execution fee to user
                    send(SendParameters{
                        to: order.account,
                        bounce: true,
                        value: tpSlExecutionFee,
                        mode: SendIgnoreErrors
                    });
                    executionFee += tpSlExecutionFee;
                }

                // delete
                self.perpPositionOrderExs.set(msg.orderId, null);
            }

            // transfer jetton
            self.refundJetton(msg.trxId, order.marginDelta, order.account, sender());
        }

        // delete order
        self.perpPositionOrders.set(msg.orderId, null);

        // transfer execution fee
        // self.transferExecutionFee(executionFeeReceiver, order.executionFee);
        if (order.executionFee > 0) {
            send(SendParameters{
                to: executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
            executionFee += order.executionFee;
        }
        self.totalExecutionFee -= executionFee;

        // event
        emit(PerpPositionOrderCancelledEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), -executionFee, 1, order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT);
    }

    // ============================ Execute Increase / Decrease ================================ //
    // execute increase => increase position for pool => increase success / bounced => excess gas
    // execute decrease => decrease position for pool => decrease success => transfer jetton => token excesses handel cancel => excess gas
    receive(msg: ExecutePerpPositionOrder) {
        // dump("ExecutePerpPositionOrder");

        let ctx: Context = context();

        // check order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: PerpPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.perpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_PERP), "gas not enough");
        } else {
            require(ctx.value >= self.perpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");
        }

        // check order
        require(!order.isPending, "order is pending");
        require(msg.tokenId == order.tokenId, "token not match");

        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor, "invalid sender");

        // execute market must before maxTimeDelayExecutor
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_DECREASE_MARKET) {
            require(order.blockTime + self.maxTimeDelayExecutor > now(), "order expired");
        }

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
                price: msg.price,
                premiumRate: msg.premiumRate
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

        let executionFee: Int = 0;
        let executionFeeMultiple: Int = 1;
        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.perpGasConsumption, "gas not enough");
            // create tp sl
            let orderExOpt: PerpPositionOrderEx? = self.perpPositionOrderExs.get(msg.orderId);
            if (orderExOpt != null) {
                let orderEx: PerpPositionOrderEx = orderExOpt!!;
                // create tp/sl
                if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                    executionFeeMultiple += 1;
                    self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_TP, sender(), order.tokenId, order.isLong, 0, orderEx.tpSize, orderEx.tpPrice, 
                        0, 0, 0, 0, orderEx.executionFee);
                }

                if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                    executionFeeMultiple += 1;
                    self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_SL, sender(), order.tokenId, order.isLong, 0, orderEx.slSize, orderEx.slPrice, 
                        0, 0, 0, 0, orderEx.executionFee);
                }
            }
        } else {
            require(ctx.value >= self.perpGasConsumption + self.gasTransferJetton, "gas not enough");
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
            self.totalExecutionFee -= order.executionFee;
        }

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, order.lastOperator!!, -order.executionFee, executionFeeMultiple, msg.receive > 0);

        dump("UpdatePerpPositionSuccess done");
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
        if (order.lastOperator != null) {
            send(SendParameters{
                to: order.lastOperator!!,
                value: 0,
                mode: SendIgnoreErrors + SendRemainingValue
            });
        }
    }

    // ============================ Liquidation ================================ //
    receive(msg: LiquidatePerpPosition) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.perpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");

        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
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
                price: msg.price,
                premiumRate: msg.premiumRate
            }.toCell()
        });
    }
    
    // ============================ ADL ================================ //
    receive(msg: ADLPerpPosition) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.perpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");

        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
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
                price: msg.price,
                premiumRate: msg.premiumRate
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

    // ======================================================== Claim ================================================================ //
    receive(msg: SendProtocolFee) {
        require(sender() == self.pool, "invalid sender");

        if (msg.amount > 0) {
            send(SendParameters{
                to: self.usdtWallet, 
                value: self.gasTransferJetton,
                mode: SendRemainingValue + SendIgnoreErrors, 
                bounce: false,
                body: TokenTransfer{
                    queryId: msg.trxId,
                    amount: msg.amount,
                    receiver: msg.feeReceiver,
                    responseDestination: msg.feeReceiver,
                    customPayload: null,
                    forwardTonAmount: 0,
                    forwardPayload: beginCell().endCell().asSlice()
                }.toCell()
            });
        }
    }

    // ======================================================== Compensate ================================================================ //
    // Create compensate, lock one day
    receive(msg: CreateCompensate) {

        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor, "invalid sender");

        let ctx: Context = context();
        // check gas
        require(ctx.value >= self.perpGasConsumption, "gas not enough");

        // add new compensate
        let compensateId: Int = self.compensateIndexNext;
        self.compensateIndexNext += 1;
        self.compensates.set(compensateId, Compensate{
            orderType: msg.orderType,
            orderId: msg.orderId,
            trxId: msg.trxId,
            refundReceiver: msg.refundReceiver,
            refundAmount: msg.refundAmount,
            executionFeeReceiver: msg.executionFeeReceiver,
            executionFee: msg.executionFee,
            unlockTime: now() + DAY
        });

        // event
        emit(CompensateCreatedEvent{
            compensateId: compensateId,
            orderType: msg.orderType,
            orderId: msg.orderId,
            trxId: msg.trxId,
            refundReceiver: msg.refundReceiver,
            refundAmount: msg.refundAmount,
            executionFeeReceiver: msg.executionFeeReceiver,
            executionFee: msg.executionFee,
            unlockTime: now() + DAY
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), 0, 1, false);
    }

    receive(msg: CancelCompensate) {
        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor, "invalid sender");

        let ctx: Context = context();
        // get compensate
        require(self.compensates.get(msg.compensateId) != null, "compensate not exist");

        // check gas
        require(ctx.value >= self.perpGasConsumption + self.gasTransferJetton, "gas not enough");

        // delete compensate
        self.compensates.set(msg.compensateId, null);

        // event
        emit(CompensateCancelledEvent{
            compensateId: msg.compensateId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), 0, 1, false);
    }

    receive(msg: ExecuteCompensate) {
        // check sender
        let isExecutor: Bool = self.isExecutor(sender());
        require(isExecutor, "invalid sender");

        let ctx: Context = context();
        // check gas
        require(ctx.value >= self.perpGasConsumption, "gas not enough");

        // check unlock time
        let compensateOpt: Compensate? = self.compensates.get(msg.compensateId);
        require(compensateOpt != null, "compensate not exist");
        let compensate: Compensate = compensateOpt!!;

        require(now() >= compensate.unlockTime, "not reach unlock time");        

        // get order
        if(compensate.orderType != null) {
            let isPending: Bool = true;
            if (compensate.orderType == ORDER_TYPE_LP) {
                let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(compensate.orderId);
                if (orderOpt != null) {
                    isPending = (orderOpt!!).isPending;
                }
                self.lpPositionOrders.set(compensate.orderId, null);
            } else {
                let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(compensate.orderId);
                if (orderOpt != null) {
                    isPending = (orderOpt!!).isPending;
                }
                self.perpPositionOrders.set(compensate.orderId, null);
            }
            require(isPending, "order not pending");
        }

        // refund
        if (compensate.refundReceiver != null && compensate.refundAmount > 0) {
            // transfer jetton
            self.refundJetton(compensate.trxId, compensate.refundAmount, compensate.refundReceiver!!, sender());
        }

        // transfer execution fee
        // self.transferExecutionFee(msg.executionFeeReceiver, msg.executionFee);
        if (compensate.executionFeeReceiver != null && compensate.executionFee > 0) {
            send(SendParameters{
                to: compensate.executionFeeReceiver!!,
                bounce: true,
                value: compensate.executionFee,
                mode: SendIgnoreErrors
            });
        }

        emit(CompensateExecutedEvent{
            compensateId: msg.compensateId,
            trxId: compensate.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), 0, 1, compensate.refundReceiver != null && compensate.refundAmount > 0);
        return;
    }

    // ======================================================== private function ================================================================ //

    fun isExecutor(account: Address): Bool {
        let isExecutorOpt: Bool? = self.executors.get(account);
        if (isExecutorOpt == null) {
            return false;
        }
        return isExecutorOpt!!;
    }


}
