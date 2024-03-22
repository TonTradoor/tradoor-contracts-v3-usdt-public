import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract OrderBook with Deployable, Ownable {
    
    // config
    minTimeDelayExecutor: Int = 6; // executor execute after 6s
    maxTimeDelayExecutor: Int = 30 * 60; // executor execute before 30min
    minTimeDelayTrader: Int = 3 * 60; // trader execute after 3min
    minPendingTimeDelayCompensator: Int = 15 * 60; // compendator execute after 15min

    // TODO gas
    minExecutionFee: Int = ton("0.2"); // fee for every operation
    gasConsumption: Int = ton("0.05"); // min consumption gas
    minTonsForStorage: Int = ton("0.03"); // min storage gas

    usdtWallet: Address; // order book USDT jetton wallet address
    pool: Address; // pool address

    tokenConfigs: map<Int, TokenConfig>; // tokenIndex => tokenConfig
    tokenIndexNext: Int as uint64 = 1;

    // admin
    owner: Address;
    executors: map<Address, Bool>; // account => enabled
    compensators: map<Address, Bool>; // account => enabled

    jettonCallbacks: map<Int, JettonCallback>; // queryId => callback
    jettonCallbackQueryIdNext: Int as uint64 = 1;

    // RBF
    rbfPositionOrders: map<Int, RBFPositionOrder>; // orderId => order
    rbfPositionOrderIndexNext: Int as uint64 = 1;

    // LP
    lpPositionOrders: map<Int, LPPositionOrder>; // orderId => order
    lpPositionOrderIndexNext: Int as uint64 = 1;

    // decreaseLPPositionOrders: map<Int, DecreaseLPPositionOrder>; // orderId => order
    // decreaseLPPositionOrderIndexNext: Int as uint64 = 1;

    // Perp
    /// market order
    increasePerpPositionMarketOrders: map<Int, IncreasePerpPositionMarketOrders>; // tokenIndex => orderId => order
    increasePerpPositionMarketOrderIndexNext: Int as uint64 = 1;

    // decreasePerpPositionMarketOrders: map<Int, DecreasePerpPositionMarketOrders>; // tokenIndex => orderId => order
    // decreasePerpPositionMarketOrderIndexNext: Int as uint64 = 1;

    // /// limit order
    // increasePerpPositionLimitOrders: map<Int, IncreasePerpPositionLimitOrders>; // tokenIndex => orderId => order
    // increasePerpPositionLimitOrderIndexNext: Int as uint64 = 1;

    // decreasePerpPositionLimitOrders: map<Int, DecreasePerpPositionLimitOrders>; // tokenIndex => orderId => order
    // decreasePerpPositionLimitOrderIndexNext: Int as uint64 = 1;

    init() {
        self.owner = sender();

        self.executors.set(sender(), true);
        self.compensators.set(sender(), true);

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
        if (msg.compensator != null && msg.enableCompensator != null) {
            self.compensators.set(msg.compensator!!, msg.enableCompensator!!);
        }
        // config
        if (msg.minTimeDelayExecutor != null){
            self.minTimeDelayExecutor = msg.minTimeDelayExecutor!!;
        }
        if (msg.maxTimeDelayExecutor != null){
            self.maxTimeDelayExecutor = msg.maxTimeDelayExecutor!!;
        }
        if (msg.minTimeDelayTrader != null){
            self.minTimeDelayTrader = msg.minTimeDelayTrader!!;
        }
        if (msg.minPendingTimeDelayCompensator != null){
            self.minPendingTimeDelayCompensator = msg.minPendingTimeDelayCompensator!!;
        }
        if (msg.minExecutionFee != null){
            self.minExecutionFee = msg.minExecutionFee!!;
        }
        if (msg.gasConsumption != null){
            self.gasConsumption = msg.gasConsumption!!;
        }
        if (msg.minTonsForStorage != null){
            self.minTonsForStorage = msg.minTonsForStorage!!;
        }
        if (msg.usdtWallet != null){
            self.usdtWallet = msg.usdtWallet!!;
        }
        if (msg.pool != null){
            self.pool = msg.pool!!;
        }
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    get fun configData(executor: Address?, compensator: Address?): ConfigData {
        let isExecutor: Bool? = null;
        if (executor != null) {
            isExecutor = self.executors.get(executor!!);
        }
        let isCompensator: Bool? = null;
        if (compensator != null) {
            isCompensator = self.compensators.get(compensator!!);
        }

        return ConfigData{
            isExecutor: isExecutor,
            isCompensator: isCompensator,
            minTimeDelayExecutor: self.minTimeDelayExecutor,
            maxTimeDelayExecutor: self.maxTimeDelayExecutor,
            minTimeDelayTrader: self.minTimeDelayTrader,
            minPendingTimeDelayCompensator: self.minPendingTimeDelayCompensator,
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
        // just ignore other token
        if (sender() != self.usdtWallet) {
            return;
        }

        // get op code
        let operation: Slice = msg.forwardPayload.loadRef().asSlice();
        let opCode: Int = operation.loadInt(32);
        if (opCode == OP_CREATE_INCREASE_RBF_POSITION_ORDER) {
            let liquidityDelta: Int = operation.loadInt(128);
            let executionFee: Int = operation.loadCoins();

            self.handleCreateIncreaseRBFPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, liquidityDelta);
        } 
        else if (opCode == OP_CREATE_INCREASE_LP_POSITION_ORDER) {
            let marginDelta: Int = operation.loadInt(128);
            let liquidityDelta: Int = operation.loadInt(128);
            let executionFee: Int = operation.loadCoins();

            self.handleCreateIncreaseLPPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, marginDelta, liquidityDelta);
        }
    }
    
    // transfer jetton success callback
    receive(msg: TokenExcesses) {
        // get callback
        let jettonCallbackOpt: JettonCallback? = self.jettonCallbacks.get(msg.queryId);
        if (jettonCallbackOpt == null) {
            return;
        }
        let jettonCallback: JettonCallback = jettonCallbackOpt!!;

        // delete callback
        self.jettonCallbacks.set(msg.queryId, null);

        // order type
        if (jettonCallback.orderType == ORDER_TYPE_RBF) {
            self.handelRBFPositionOrderCallback(jettonCallback.orderId, jettonCallback.trxId);
        }
        else if (jettonCallback.orderType == ORDER_TYPE_LP) {
            self.handelLPPositionOrderCallback(jettonCallback.orderId, jettonCallback.trxId);
        }
    }

    fun refundJetton(queryId: Int, amount: Int, to: Address, response: Address) {
        send(SendParameters{
            to: self.usdtWallet, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(queryId, amount, to, response)
        });
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
        return context().readForwardFee() + self.gasConsumption * 2 + self.minTonsForStorage;
    }

    // ======================================================== RBF ================================================================ //
    // ============================ Create Increase ================================ //
    fun handleCreateIncreaseRBFPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, liquidityDelta: Int) {
        let ctx: Context = context();

        if (ctx.value < executionFee + ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            return;
        }

        if (jettonFromAmount < liquidityDelta) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            return;
        }

        if (executionFee < self.minExecutionFee) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            return;
        }

        // add new order
        let orderId: Int = self.rbfPositionOrderIndexNext;
        self.rbfPositionOrderIndexNext = orderId + 1;
        self.rbfPositionOrders.set(orderId, RBFPositionOrder{
            isIncrease: true,
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: null,
            lastOperator: null
        });

        // event
        emit(RBFPositionOrderCreatedEvent{
            isIncrease: true,
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            orderId: orderId
        }.toCell());

        self.refundExecessTon(account, executionFee);
    }

    // ============================ Create Decrease ================================ //
    receive(msg: CreateDecreaseRBFPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let orderId: Int = self.rbfPositionOrderIndexNext;
        self.rbfPositionOrderIndexNext = self.rbfPositionOrderIndexNext + 1;
        self.rbfPositionOrders.set(orderId, RBFPositionOrder{
            isIncrease: false,
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now(),
            isPending: false,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: null,
            lastOperator: null
        });

        // event
        emit(RBFPositionOrderCreatedEvent{
            isIncrease: false,
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            orderId: orderId
        }.toCell());

        // transfer execess gas
        self.refundExecessTon(sender(), msg.executionFee);
    }

    // ============================ Cancel Increase / Decrease ================================ //
    // cancel increase => orderBook wallet => user wallet => token excess handel cancel => excess gas
    // cancel decrease => excess gas
    receive(msg: CancelRBFPositionOrder) {
        let ctx: Context = context();
        // check order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: RBFPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= ctx.readForwardFee() * 4 + self.gasConsumption * 2 + self.minTonsForStorage + ton("0.032"), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage, "gas not enough");
        }

        self.shouldCancel(order.blockTime, sender(), order.isPending);

        if (order.isIncrease) {
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_RBF,
                orderId: msg.orderId,
                tokenId: null,
                amount: order.liquidityDelta,
                receiver: order.account,
                trxId: msg.trxId
            });

            // update order
            if (msg.executionFeeReceiver != null) {
                order.executionFeeReceiver = msg.executionFeeReceiver!!;
            } else {
                order.executionFeeReceiver = sender();
            }
            order.lastOperator = sender();
            order.isPending = true;
            order.pendingTime = now();
            order.callbackId = callbackId;
            self.rbfPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, order.liquidityDelta, order.account, myAddress());
        } else {
            // get fee receiver
            let executionFeeReceiver: Address = sender();
            if (msg.executionFeeReceiver != null) {
                executionFeeReceiver = msg.executionFeeReceiver!!;
            }

            // delete order
            self.rbfPositionOrders.set(msg.orderId, null);
            // event
            emit(RBFPositionOrderCancelledEvent{
                isIncrease: false,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());

            // transfer execution fee
            send(SendParameters{
                to: executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendPayGasSeparately
            });

            // transfer execess gas
            self.refundExecessTon(sender(), 0);
        }
    }

    // ============================ Execute Increase / Decrease ================================ //
    // execute increase => increase position for pool => increase success / bounced => excess gas
    // execute decrease => decrease position for pool => decrease success => orderBook wallet => user wallet => token excesses handel cancel => excess gas
    receive(msg: ExecuteRBFPositionOrder) {
        let ctx: Context = context();

        // check order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: RBFPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
        }

        self.shouldExecute(order.blockTime, order.isPending);

        // update order
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        order.isPending = true;
        order.pendingTime = now();
        self.rbfPositionOrders.set(msg.orderId, order);

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdateRBFPosition {
                isIncrease: order.isIncrease,
                orderId: msg.orderId,
                trxId: msg.trxId,
                account: order.account,
                liquidityDelta: order.liquidityDelta
            }.toCell()
        });
    }

    // increase success / bounced => excess gas
    // decrease success => orderBook wallet => user wallet => token excesses handel cancel => excess gas
    receive(msg: UpdateRBFPositionSuccess) {
        let ctx: Context = context();
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: RBFPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= ctx.readForwardFee() * 2 + self.gasConsumption, "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 4 + self.gasConsumption * 2 + ton("0.032"), "gas not enough");
        }

        if (order.isIncrease) {
            // delete order
            self.rbfPositionOrders.set(msg.orderId, null);
            // event
            emit(RBFPositionOrderExecutedEvent{
                isIncrease: true,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendPayGasSeparately
                });
            }

            // transfer execess gas
            if (order.lastOperator != null) {
                self.refundExecessTon(order.lastOperator!!, 0);
            }
        } else {
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_RBF,
                orderId: msg.orderId,
                tokenId: null,
                amount: msg.receive,
                receiver: order.account,
                trxId: msg.trxId
            });

            order.callbackId = callbackId;
            self.rbfPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, msg.receive, order.account, myAddress());
        }
    }

    // reset order pending
    bounced(src: bounced<UpdateRBFPosition>) {

        // get order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: RBFPositionOrder = orderOpt!!;

        // update pending
        order.isPending = false;
        self.rbfPositionOrders.set(src.orderId, order);
    }

    // ============================ Callback Cancel Increase / Execute Decrease ================================ //
    fun handelRBFPositionOrderCallback(orderId: Int, trxId: Int) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= ctx.readForwardFee() + self.gasConsumption, "gas not enough");

        // get order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(orderId);
        if (orderOpt == null) {
            return;
        }
        let order: RBFPositionOrder = orderOpt!!;

        // delete order
        self.rbfPositionOrders.set(orderId, null);

        if (order.isIncrease) {
            // event
            emit(RBFPositionOrderCancelledEvent{
                isIncrease: true,
                orderId: orderId,
                trxId: trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendPayGasSeparately
                });
            }
        } else {
            // event
            emit(RBFPositionOrderExecutedEvent{
                isIncrease: false,
                orderId: orderId,
                trxId: trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendPayGasSeparately
                });
            }
        }

        // transfer execess gas
        if (order.lastOperator != null) {
            self.refundExecessTon(order.lastOperator!!, 0);
        }
    }

    // ============================ Compensate ================================ //
    // compensate RBF
    receive(msg: CompensateRBFPositionOrder) {
        let ctx: Context = context();

        // check compensator
        let isCompensator: Bool = false;
        let isCompensatorOpt: Bool? = self.compensators.get(sender());
        if (isCompensatorOpt != null) {
            isCompensator = isCompensatorOpt!!;
        }
        require(isCompensator, "not compensator");
        
        // check order pending
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: RBFPositionOrder = orderOpt!!;

        // check gas
        if (order.isIncrease) {
            require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
        }

        require(order.isPending, "order not pending");
        require(order.pendingTime + self.minPendingTimeDelayCompensator <= now(), "too early for compensator");

        // refund
        if (msg.needRefund) {
            // increase position failed, cancel order
            // refund jetton failed
            // get callback
            require(order.callbackId != null, "jetton callback not exist");
            let callbackId: Int = order.callbackId!!;
            let jettonCallbackOpt: JettonCallback? = self.jettonCallbacks.get(callbackId);
            if (jettonCallbackOpt == null) {
                return;
            }
            let jettonCallback: JettonCallback = jettonCallbackOpt!!;
            // update trxId
            jettonCallback.trxId = msg.trxId;
            self.jettonCallbacks.set(callbackId, jettonCallback);

            // update execution fee receiver
            if (msg.executionFeeReceiver != null) {
                order.executionFeeReceiver = msg.executionFeeReceiver!!;
            }
            order.lastOperator = sender();
            self.rbfPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, jettonCallback.amount, jettonCallback.receiver, myAddress());
            return;
        }

        if (msg.isExecute) {
            // delete order
            self.rbfPositionOrders.set(msg.orderId, null);
            // event
            emit(RBFPositionOrderExecutedEvent{
                isIncrease: true,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());
        } else {
            if (order.callbackId != null) {
                // delete callback
                self.jettonCallbacks.set(order.callbackId!!, null);
            }
            // delete order
            self.rbfPositionOrders.set(msg.orderId, null);
            // event
            emit(RBFPositionOrderCancelledEvent{
                isIncrease: true,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());
        }

        // transfer execution fee
        if (order.executionFeeReceiver != null) {
            send(SendParameters{
                to: order.executionFeeReceiver!!,
                bounce: true,
                value: order.executionFee,
                mode: SendPayGasSeparately
            });
        }

        // transfer execess gas
        self.refundExecessTon(sender(), order.executionFee);
        return;
    }

    // ============================ Getter ================================ //
    get fun rbfPositionOrder(orderId: Int): RBFPositionOrder? {
        return self.rbfPositionOrders.get(orderId);
    }

    get fun rbfPositionOrderIndexNext(): Int {
        return self.rbfPositionOrderIndexNext;
    }

    // ======================================================== LP ================================================================ //
    // ============================ Create Increase ================================ //
    fun handleCreateIncreaseLPPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, marginDelta: Int, liquidityDelta: Int) {
        dump("handleCreateIncreaseLPPositionOrder");
        let ctx: Context = context();

        if (ctx.value < executionFee + ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage) {
            dump("gas not enough");
            self.refundJetton(queryId, jettonFromAmount, account, account);
            return;
        }

        if (jettonFromAmount < marginDelta) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            dump("refund from not enough margin");
            return;
        }

        if (executionFee < self.minExecutionFee) {
            self.refundJetton(queryId, jettonFromAmount, account, account);
            dump("execution fee not enough");
            return;
        }

        // add new order
        let orderId: Int = self.lpPositionOrderIndexNext;
        self.lpPositionOrderIndexNext = orderId + 1;
        self.lpPositionOrders.set(orderId, LPPositionOrder{
            opType: ORDER_OP_TYPE_INCREASE,
            account: account,
            marginDelta: marginDelta,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: null,
            lastOperator: null
        });

        // event
        emit(LPPositionOrderCreatedEvent{
            opType: ORDER_OP_TYPE_INCREASE,
            account: account,
            marginDelta: marginDelta,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            orderId: orderId
        }.toCell());

        self.refundExecessTon(account, executionFee);
    }

    // ============================ Create Decrease ================================ //
    receive(msg: CreateDecreaseLPPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let orderId: Int = self.lpPositionOrderIndexNext;
        self.lpPositionOrderIndexNext = self.lpPositionOrderIndexNext + 1;
        self.lpPositionOrders.set(orderId, LPPositionOrder{
            opType: ORDER_OP_TYPE_DECREASE,
            account: sender(),
            marginDelta: msg.marginDelta,
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now(),
            isPending: false,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: null,
            lastOperator: null
        });

        // event
        emit(LPPositionOrderCreatedEvent{
            opType: ORDER_OP_TYPE_DECREASE,
            account: sender(),
            marginDelta: msg.marginDelta,
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            orderId: orderId
        }.toCell());

        // transfer execess gas
        self.refundExecessTon(sender(), msg.executionFee);
    }

    // ============================ Cancel Increase / Decrease ================================ //
    // cancel increase => orderBook wallet => user wallet => token excess handel cancel => excess gas
    // cancel decrease => excess gas
    receive(msg: CancelLPPositionOrder) {
        let ctx: Context = context();
        // check order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            require(ctx.value >= ctx.readForwardFee() * 4 + self.gasConsumption * 2 + self.minTonsForStorage + ton("0.032"), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage, "gas not enough");
        }

        self.shouldCancel(order.blockTime, sender(), order.isPending);

        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_LP,
                orderId: msg.orderId,
                tokenId: null,
                amount: order.marginDelta,
                receiver: order.account,
                trxId: msg.trxId
            });

            // update order
            if (msg.executionFeeReceiver != null) {
                order.executionFeeReceiver = msg.executionFeeReceiver!!;
            } else {
                order.executionFeeReceiver = sender();
            }
            order.lastOperator = sender();
            order.isPending = true;
            order.pendingTime = now();
            order.callbackId = callbackId;
            self.lpPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, order.marginDelta, order.account, myAddress());
        } else {
            // get fee receiver
            let executionFeeReceiver: Address = sender();
            if (msg.executionFeeReceiver != null) {
                executionFeeReceiver = msg.executionFeeReceiver!!;
            }

            // delete order
            self.lpPositionOrders.set(msg.orderId, null);
            // event
            emit(LPPositionOrderCancelledEvent{
                opType: order.opType,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());

            // transfer execution fee
            send(SendParameters{
                to: executionFeeReceiver,
                bounce: true,
                value: order.executionFee,
                mode: SendPayGasSeparately
            });

            // transfer execess gas
            self.refundExecessTon(sender(), 0);
        }
    }

    // ============================ Execute Increase / Decrease ================================ //
    // execute increase => increase position for pool => increase success / bounced => excess gas
    // execute decrease => decrease position for pool => decrease success => orderBook wallet => user wallet => token excesses handel cancel => excess gas
    receive(msg: ExecuteLPPositionOrder) {
        let ctx: Context = context();

        // check order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
        }

        self.shouldExecute(order.blockTime, order.isPending);

        // update order
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        order.isPending = true;
        order.pendingTime = now();
        self.lpPositionOrders.set(msg.orderId, order);

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdateLPPosition {
                orderId: msg.orderId,
                opType: order.opType,
                trxId: msg.trxId,
                account: order.account,
                marginDelta: order.marginDelta,
                liquidityDelta: order.liquidityDelta
            }.toCell()
        });
        dump("execute LP increase order send msg to pool");
    }

    // increase success / bounced => excess gas
    // decrease success => orderBook wallet => user wallet => token excesses handel cancel => excess gas
    receive(msg: UpdateLPPositionSuccess) {
        dump("receive update LP position success");
        let ctx: Context = context();
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            require(ctx.value >= ctx.readForwardFee() * 2 + self.gasConsumption, "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 4 + self.gasConsumption * 2 + ton("0.032"), "gas not enough");
        }

        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            // delete order
            self.lpPositionOrders.set(msg.orderId, null);
            // event
            emit(LPPositionOrderExecutedEvent{
                opType: order.opType,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendPayGasSeparately
                });
            }

            // transfer execess gas
            if (order.lastOperator != null) {
                self.refundExecessTon(order.lastOperator!!, 0);
            }
        } else {
            let receiver: Address = order.account;
            if (order.opType == ORDER_OP_TYPE_LIQUIDATION) {
                receiver = order.executionFeeReceiver!!;
            }
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_LP,
                orderId: msg.orderId,
                tokenId: null,
                amount: msg.receive,
                receiver: receiver,
                trxId: msg.trxId
            });

            order.callbackId = callbackId;
            self.lpPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, msg.receive, receiver, myAddress());
        }
    }

    // reset order pending
    bounced(src: bounced<UpdateLPPosition>) {
        dump("increase lp position failed");

        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: LPPositionOrder = orderOpt!!;
        if (order.opType == ORDER_OP_TYPE_LIQUIDATION) {
            // delete
            self.lpPositionOrders.set(src.orderId, null);
        } else {
            // update pending
            order.isPending = false;
            self.lpPositionOrders.set(src.orderId, order);
        }
    }

    // ============================ Liquidation ================================ //
    receive(msg: LiquidateLPPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");

        // check sender
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        require(isExecutor, "invalid sender");

        // fee receiver
        let executionFeeReceiver: Address = sender();
        if (msg.executionFeeReceiver != null) {
            executionFeeReceiver = msg.executionFeeReceiver!!;
        }

        // add new order
        let orderId: Int = self.lpPositionOrderIndexNext;
        self.lpPositionOrderIndexNext = self.lpPositionOrderIndexNext + 1;
        self.lpPositionOrders.set(orderId, LPPositionOrder{
            opType: ORDER_OP_TYPE_LIQUIDATION,
            account: msg.account,
            marginDelta: 0,
            liquidityDelta: 0,
            executionFee: 0,
            blockTime: now(),
            isPending: true,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: executionFeeReceiver,
            lastOperator: sender()
        });

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: UpdateLPPosition {
                opType: ORDER_OP_TYPE_LIQUIDATION,
                orderId: orderId,
                trxId: msg.trxId,
                account: msg.account,
                marginDelta: 0,
                liquidityDelta: 0
            }.toCell()
        });
        dump("liquidate LP send msg to pool");
    }

    // ============================ Callback Cancel Increase / Execute Decrease / Execute Liquidation ================================ //
    fun handelLPPositionOrderCallback(orderId: Int, trxId: Int) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= ctx.readForwardFee() + self.gasConsumption, "gas not enough");

        // get order
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(orderId);
        if (orderOpt == null) {
            return;
        }
        let order: LPPositionOrder = orderOpt!!;

        // delete order
        self.lpPositionOrders.set(orderId, null);

        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            // event
            emit(LPPositionOrderCancelledEvent{
                opType: order.opType,
                orderId: orderId,
                trxId: trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendPayGasSeparately
                });
            }
            dump("cancel LP increase order success");
        } else {
            // event
            emit(LPPositionOrderExecutedEvent{
                opType: order.opType,
                orderId: orderId,
                trxId: trxId
            }.toCell());
            
            // transfer execution fee
            if (order.executionFeeReceiver != null && order.executionFee != 0) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendPayGasSeparately
                });
            }
        }

        // transfer execess gas
        if (order.lastOperator != null) {
            self.refundExecessTon(order.lastOperator!!, 0);
        }
    }

    // ============================ Compensate ================================ //
    receive(msg: CompensateLPPositionOrder) {
        let ctx: Context = context();

        // check compensator
        let isCompensator: Bool = false;
        let isCompensatorOpt: Bool? = self.compensators.get(sender());
        if (isCompensatorOpt != null) {
            isCompensator = isCompensatorOpt!!;
        }
        require(isCompensator, "not compensator");
        
        // check order pending
        let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LPPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE) {
            require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
        }

        require(order.isPending, "order not pending");
        require(order.pendingTime + self.minPendingTimeDelayCompensator <= now(), "too early for compensator");

        // refund
        if (msg.needRefund) {
            // increase position failed, cancel order
            // refund jetton failed
            // get callback
            require(order.callbackId != null, "jetton callback not exist");
            let callbackId: Int = order.callbackId!!;
            let jettonCallbackOpt: JettonCallback? = self.jettonCallbacks.get(callbackId);
            if (jettonCallbackOpt == null) {
                return;
            }
            let jettonCallback: JettonCallback = jettonCallbackOpt!!;
            // update trxId
            jettonCallback.trxId = msg.trxId;
            self.jettonCallbacks.set(callbackId, jettonCallback);

            // update execution fee receiver
            if (msg.executionFeeReceiver != null) {
                order.executionFeeReceiver = msg.executionFeeReceiver!!;
            }
            order.lastOperator = sender();
            self.lpPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, jettonCallback.amount, jettonCallback.receiver, myAddress());
            return;
        }

        if (msg.isExecute) {
            // delete order
            self.lpPositionOrders.set(msg.orderId, null);
            // event
            emit(LPPositionOrderExecutedEvent{
                opType: order.opType,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());
        } else {
            if (order.callbackId != null) {
                // delete callback
                self.jettonCallbacks.set(order.callbackId!!, null);
            }
            // delete order
            self.lpPositionOrders.set(msg.orderId, null);
            // event
            emit(LPPositionOrderCancelledEvent{
                opType: order.opType,
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());
        }

        // transfer execution fee
        if (order.executionFeeReceiver != null && order.executionFee != 0) {
            send(SendParameters{
                to: order.executionFeeReceiver!!,
                bounce: true,
                value: order.executionFee,
                mode: SendPayGasSeparately
            });
        }

        // transfer execess gas
        self.refundExecessTon(sender(), order.executionFee);
        return;
    }

    // ============================ Getter ================================ //
    get fun lpPositionOrder(orderId: Int): LPPositionOrder? {
        return self.lpPositionOrders.get(orderId);
    }

    get fun lpPositionOrderIndexNext(): Int {
        return self.lpPositionOrderIndexNext;
    }

    // // ============================ Perp ================================ //



    // ======================================================== private function ================================================================ //
    fun shouldCancel(blockTime: Int, account: Address, isPending: Bool) {
        require(!isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }

        // executor cancel must after minTimeDelayExecutor
        if (isExecutor) {
            require(blockTime + self.minTimeDelayExecutor <= now(), "too early");
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

        // executor cancel must after minTimeDelayExecutor
        require(blockTime + self.minTimeDelayExecutor <= now(), "too early");

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

    // create jetton transfer body
    fun createJettonTransferBody(queryId: Int, jettonAmount: Int, to: Address, responseDestination: Address): Cell {
        return beginCell()
            .storeInt(0xf8a7ea5, 32)
            .storeInt(queryId, 64)
            .storeCoins(jettonAmount)
            .storeAddress(to) // to_owner_address
            .storeAddress(responseDestination)
            .storeInt(0, 1) // custom payload
            .storeCoins(0) // forward_ton_amount
            .storeSlice(beginCell().endCell().asSlice()) // forward payload
            .endCell();
    }


}
