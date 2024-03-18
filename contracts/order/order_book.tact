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
    // rbfLockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    rbfLockTime: Int = 5 * 60; // TODO lock 5 min for test

    minExecutionFee: Int = ton("0.1"); // fee for every operation
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
    increaseRBFPositionOrders: map<Int, IncreaseRBFPositionOrder>; // orderId => order
    increaseRBFPositionOrderIndexNext: Int as uint64 = 1;

    decreaseRBFPositionOrders: map<Int, DecreaseRBFPositionOrder>; // orderId => order
    decreaseRBFPositionOrderIndexNext: Int as uint64 = 1;

    // LP
    increaseLPPositionOrders: map<Int, IncreaseLPPositionOrder>; // orderId => order
    increaseLPPositionOrderIndexNext: Int as uint64 = 1;

    decreaseLPPositionOrders: map<Int, DecreaseLPPositionOrder>; // orderId => order
    decreaseLPPositionOrderIndexNext: Int as uint64 = 1;

    // Perp
    /// market order
    increasePerpPositionMarketOrders: map<Int, IncreasePerpPositionMarketOrders>; // tokenIndex => orderId => order
    increasePerpPositionMarketOrderIndexNext: Int as uint64 = 1;

    decreasePerpPositionMarketOrders: map<Int, DecreasePerpPositionMarketOrders>; // tokenIndex => orderId => order
    decreasePerpPositionMarketOrderIndexNext: Int as uint64 = 1;

    /// limit order
    increasePerpPositionLimitOrders: map<Int, IncreasePerpPositionLimitOrders>; // tokenIndex => orderId => order
    increasePerpPositionLimitOrderIndexNext: Int as uint64 = 1;

    decreasePerpPositionLimitOrders: map<Int, DecreasePerpPositionLimitOrders>; // tokenIndex => orderId => order
    decreasePerpPositionLimitOrderIndexNext: Int as uint64 = 1;

    init() {
        self.owner = sender();

        self.executors.set(sender(), true);
        self.compensators.set(sender(), true);

        self.usdtWallet = newAddress(0, 0);
        self.pool = newAddress(0, 0);
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: SetExecutor) {
        self.requireOwner();
        self.executors.set(msg.executor, msg.enable);
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }
    
    receive(msg: SetCompensator) {
        self.requireOwner();
        self.compensators.set(msg.compensator, msg.enable);
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: UpdateConfig) {
        self.requireOwner();

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
        if (msg.rbfLockTime != null){
            self.rbfLockTime = msg.rbfLockTime!!;
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

    fun _isExecutor(account: Address): Bool {
        let isExecutorOpt: Bool? = self.executors.get(account);
        if (isExecutorOpt == null) {
            return false;
        }
        return isExecutorOpt!!;
    }

    fun _isCompensator(account: Address): Bool {
        let isCompensatorOpt: Bool? = self.compensators.get(account);
        if (isCompensatorOpt == null) {
            return false;
        }
        return isCompensatorOpt!!;
    }

    get fun isExecutor(account: Address): Bool {
        return self._isExecutor(account);
    }

    get fun isCompensator(account: Address): Bool {
        return self._isCompensator(account);
    }

    get fun configData(): ConfigData {
        return ConfigData{
            minTimeDelayExecutor: self.minTimeDelayExecutor,
            maxTimeDelayExecutor: self.maxTimeDelayExecutor,
            minTimeDelayTrader: self.minTimeDelayTrader,
            minPendingTimeDelayCompensator: self.minPendingTimeDelayCompensator,
            rbfLockTime: self.rbfLockTime,
            minExecutionFee: self.minExecutionFee,
            gasConsumption: self.gasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            usdtWallet: self.usdtWallet,
            pool: self.pool
        };
    }

    // ======================================================== Entry ================================================================ //
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
            dump("receive create increase rbf position order op code");
            dump(beginCell().storeAddress(msg.from).endCell().hash());
            dump(liquidityDelta);
            dump(executionFee);

            self.handleCreateIncreaseRBFPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, liquidityDelta);
        } 
        // else if (opCode == OP_CREATE_INCREASE_LP_POSITION_ORDER) {
        //     let marginDelta: Int = operation.loadInt(128);
        //     let liquidityDelta: Int = operation.loadInt(128);
        //     let executionFee: Int = operation.loadCoins();
        //     dump("receive create increase rbf position order op code");
        //     dump(beginCell().storeAddress(msg.from).endCell().hash());
        //     dump(marginDelta);
        //     dump(liquidityDelta);
        //     dump(executionFee);

        //     self.handleCreateIncreaseLPPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, marginDelta, liquidityDelta);
        // }
    }

    fun refundLiquidity(queryId: Int, amount: Int, to: Address) {
        dump("refundLiquidity");
        send(SendParameters{
            to: self.usdtWallet, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(queryId, amount, to, to)
        });
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
        if (jettonCallback.orderType == ORDER_TYPE_INCREASE_RBF) {
            self.handelCancelIncreaseRBFPositionOrder(jettonCallback.orderId, jettonCallback.trxId);
        } else if (jettonCallback.orderType == ORDER_TYPE_DECREASE_RBF) {
            self.handelExecuteDecreaseRBFPositionOrder(jettonCallback.orderId, jettonCallback.trxId);
        }
    }

    // ======================================================== RBF ================================================================ //

    // ============================ Increase ================================ //
    fun handleCreateIncreaseRBFPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, liquidityDelta: Int) {
        dump("handleCreateIncreaseRBFPositionOrder");
        let ctx: Context = context();

        if (ctx.value < executionFee + gasConsumption) {
            dump("gas not enough");
            self.refundLiquidity(queryId, jettonFromAmount, account);
            return;
        }

        if (jettonFromAmount < liquidityDelta) {
            self.refundLiquidity(queryId, jettonFromAmount, account);
            dump("refund from not enough liquidity");
            return;
        }

        // add new order
        let orderId: Int = self.increaseRBFPositionOrderIndexNext;
        self.increaseRBFPositionOrderIndexNext = orderId + 1;
        self.increaseRBFPositionOrders.set(orderId, IncreaseRBFPositionOrder{
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: null
        });

        // event
        emit(IncreaseRBFPositionOrderCreatedEvent{
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            orderId: orderId
        }.toCell());

        let refundValue: Int = context().value - executionFee - gasConsumption;
        if (refundValue > 0) {
            dump("handleCreateIncreaseRBFPositionOrder refund toncoin");
            send(SendParameters{
                to: account,
                bounce: false,
                value: refundValue
            });
        }
    }

    receive(msg: CancelIncreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;
        self.shouldCancel(order.blockTime, sender(), order.isPending);

        // add callback
        let callbackId: Int = self.jettonCallbackQueryIdNext;
        self.jettonCallbackQueryIdNext = callbackId + 1;
        self.jettonCallbacks.set(callbackId, JettonCallback{
            orderType: ORDER_TYPE_INCREASE_RBF,
            orderId: msg.orderId,
            tokenId: null,
            amount: order.liquidityDelta,
            trxId: msg.trxId
        });

        // update order
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        order.isPending = true;
        order.pendingTime = now();
        order.callbackId = callbackId;
        self.increaseRBFPositionOrders.set(msg.orderId, order);

        // transfer jetton
        send(SendParameters{
            to: self.usdtWallet, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(callbackId, order.liquidityDelta, order.account, myAddress())
        });
    }

    fun handelCancelIncreaseRBFPositionOrder(orderId: Int, trxId: Int) {
        // get order
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(orderId);
        if (orderOpt == null) {
            emit(IncreaseRBFPositionCancelledEvent{
                orderId: orderId,
                trxId: trxId
            }.toCell());
            return;
        }
        let order: IncreaseRBFPositionOrder = orderOpt!!;
        // delete order
        self.increaseRBFPositionOrders.set(orderId, null);
        // event
        emit(IncreaseRBFPositionCancelledEvent{
            orderId: orderId,
            trxId: trxId
        }.toCell());

        // transfer execution fee
        if (order.executionFeeReceiver != null) {
            send(SendParameters{
                to: order.executionFeeReceiver!!,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }
    }

    receive(msg: ExecuteIncreaseRBFPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.orderId);
        // check order
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime, order.isPending);

        // update order
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        order.isPending = true;
        order.pendingTime = now();
        self.increaseRBFPositionOrders.set(msg.orderId, order);

        // increase position
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: IncreaseRBFPosition {
                orderId: msg.orderId,
                trxId: msg.trxId,
                account: order.account,
                liquidityDelta: order.liquidityDelta
            }.toCell()
        });
    }

    receive(msg: IncreaseRBFPositionSuccess) {
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: IncreaseRBFPositionOrder = orderOpt!!;
        // delete order
        self.increaseRBFPositionOrders.set(msg.orderId, null);
        // event
        emit(IncreaseRBFPositionOrderExecutedEvent{
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execution fee
        if (order.executionFeeReceiver != null) {
            send(SendParameters{
                to: order.executionFeeReceiver!!,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }
    }

    // increase RBF failed, reset order pending
    bounced(src: bounced<IncreaseRBFPosition>) {
        // get order
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: IncreaseRBFPositionOrder = orderOpt!!;

        // update pending
        order.isPending = false;
        self.increaseRBFPositionOrders.set(src.orderId, order);
    }

    // compensate for increase RBF
    receive(msg: CompensateIncreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check compensator
        require(self._isCompensator(sender()), "not compensator");
        
        // check order
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;
        require(order.isPending, "order not pending");
        require(order.pendingTime + self.minPendingTimeDelayCompensator <= now(), "too early for compensator");

        // increase position success
        if (msg.positionSuccess) {
            // delete order
            self.increaseRBFPositionOrders.set(msg.orderId, null);
            // event
            emit(IncreaseRBFPositionOrderExecutedEvent{
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendIgnoreErrors
                });
            }
            return;
        }

        // increase position failed, cancel order
        if (msg.refundSuccess) {
            // refund jetton success
            if (order.callbackId != null) {
                // delete callback
                self.jettonCallbacks.set(order.callbackId!!, null);
            }
            // delete order
            self.increaseRBFPositionOrders.set(msg.orderId, null);
            // event
            emit(IncreaseRBFPositionOrderCancelledEvent{
                orderId: msg.orderId,
                trxId: msg.trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendIgnoreErrors
                });
            }
        } else {
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_INCREASE_RBF,
                orderId: msg.orderId,
                tokenId: null,
                amount: order.liquidityDelta,
                trxId: msg.trxId
            });

            // update order
            if (msg.executionFeeReceiver != null) {
                order.executionFeeReceiver = msg.executionFeeReceiver!!;
            } else {
                order.executionFeeReceiver = sender();
            }
            order.isPending = true;
            order.pendingTime = now();
            order.callbackId = callbackId;
            self.increaseRBFPositionOrders.set(msg.orderId, order);

            // transfer jetton
            send(SendParameters{
                to: self.usdtWallet, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: false,
                body: self.createJettonTransferBody(callbackId, order.liquidityDelta, order.account, myAddress())
            });
        }
    }

    // ============================ Decrease ================================ //
    receive(msg: CreateDecreaseRBFPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let orderId: Int = self.decreaseRBFPositionOrderIndexNext;
        self.decreaseRBFPositionOrderIndexNext = self.decreaseRBFPositionOrderIndexNext + 1;
        self.decreaseRBFPositionOrders.set(orderId, DecreaseRBFPositionOrder{
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now(),
            isPending: false,
            pendingTime: now(),
            callbackId: null,
            executionFeeReceiver: null
        });

        // event
        emit(DecreaseRBFPositionOrderCreatedEvent{
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            orderId: orderId
        }.toCell());
    }

    receive(msg: CancelDecreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: DecreaseRBFPositionOrder = orderOpt!!;
        self.shouldCancel(order.blockTime, sender(), order.isPending);

        // get fee receiver
        let executionFeeReceiver: Address = sender();
        if (msg.executionFeeReceiver != null) {
            executionFeeReceiver = msg.executionFeeReceiver!!;
        }

        // transfer execution fee
        send(SendParameters{
            to: executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });
        // delete order
        self.decreaseRBFPositionOrders.set(msg.orderId, null);
        // event
        emit(DecreaseRBFPositionOrderCancelledEvent{
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());
    }

    fun handelExecuteDecreaseRBFPositionOrder(orderId: Int, trxId: Int) {
        // get order
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(orderId);
        if (orderOpt == null) {
            emit(DecreaseRBFPositionOrderExecutedEvent{
                orderId: orderId,
                trxId: trxId
            }.toCell());
        }
        let order: DecreaseRBFPositionOrder = orderOpt!!;
        // delete order
        self.decreaseRBFPositionOrders.set(orderId, null);
        // event
        emit(DecreaseRBFPositionOrderExecutedEvent{
            orderId: orderId,
            trxId: trxId
        }.toCell());

        // transfer execution fee
        if (order.executionFeeReceiver != null) {
            send(SendParameters{
                to: order.executionFeeReceiver!!,
                bounce: true,
                value: order.executionFee,
                mode: SendIgnoreErrors
            });
        }
    }

    receive(msg: ExecuteDecreaseRBFPositionOrder) {
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(msg.orderId);
        // check order
        require(orderOpt != null, "order not exist");

        let order: DecreaseRBFPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime, order.isPending);

        // get fee receiver
        if (msg.executionFeeReceiver != null) {
            order.executionFeeReceiver = msg.executionFeeReceiver!!;
        } else {
            order.executionFeeReceiver = sender();
        }
        // update pending
        order.isPending = true;
        order.pendingTime = now();
        self.decreaseRBFPositionOrders.set(msg.orderId, order);

        // decrease position
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: DecreaseRBFPosition {
                orderId: msg.orderId,
                account: order.account,
                liquidityDelta: order.liquidityDelta,
                trxId: msg.trxId
            }.toCell()
        });
    }

    receive(msg: DecreaseRBFPositionSuccess) {
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: DecreaseRBFPositionOrder = orderOpt!!;

        // add callback
        let callbackId: Int = self.jettonCallbackQueryIdNext;
        self.jettonCallbackQueryIdNext = callbackId + 1;
        self.jettonCallbacks.set(callbackId, JettonCallback{
            orderType: ORDER_TYPE_DECREASE_RBF,
            orderId: msg.orderId,
            tokenId: null,
            amount: msg.received,
            trxId: msg.trxId
        });

        order.callbackId = callbackId;
        self.decreaseRBFPositionOrders.set(msg.orderId, order);

        // transfer jetton
        send(SendParameters{
            to: self.usdtWallet, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(callbackId, msg.received, order.account, myAddress())
        });
    }

    bounced(src: bounced<DecreaseRBFPosition>) {
        // get order
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: DecreaseRBFPositionOrder = orderOpt!!;

        // update pending
        order.isPending = false;
        self.decreaseRBFPositionOrders.set(msg.orderId, order);
    }

    // compensate for increase RBF
    receive(msg: CompensateDecreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check compensator
        require(self._isCompensator(sender()), "not compensator");
        
        // check order
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: DecreaseRBFPositionOrder = orderOpt!!;
        require(order.isPending, "order not pending");
        require(order.pendingTime + self.minPendingTimeDelayCompensator <= now(), "too early for compensator");

        // decrease position failed
        if (!msg.positionSuccess) {
            // delete order
            self.decreaseRBFPositionOrders.set(orderId, null);
            // event
            emit(DecreaseRBFPositionOrderCancelledEvent{
                orderId: orderId,
                trxId: trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendIgnoreErrors
                });
            }
            return;
        }

        // increase position success, cancel order
        if (msg.refundSuccess) {
            // refund jetton success
            if (order.callbackId != null) {
                // delete callback
                self.jettonCallbacks.set(order.callbackId!!, null);
            }
            // delete order
            self.decreaseRBFPositionOrders.set(orderId, null);
            // event
            emit(DecreaseRBFPositionOrderExecutedEvent{
                orderId: orderId,
                trxId: trxId
            }.toCell());

            // transfer execution fee
            if (order.executionFeeReceiver != null) {
                send(SendParameters{
                    to: order.executionFeeReceiver!!,
                    bounce: true,
                    value: order.executionFee,
                    mode: SendIgnoreErrors
                });
            }
        } else {
            // refund jetton
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_DECREASE_RBF,
                orderId: msg.orderId,
                tokenId: null,
                amount: msg.received,
                trxId: msg.trxId
            });

            order.callbackId = callbackId;
            self.decreaseRBFPositionOrders.set(msg.orderId, order);

            // transfer jetton
            send(SendParameters{
                to: self.usdtWallet, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: false,
                body: self.createJettonTransferBody(callbackId, msg.received, order.account, myAddress())
            });
        }
    }

    // ============================ Getter ================================ //
    get fun increaseRBFPositionOrderIndexNext(): Int {
        return self.increaseRBFPositionOrderIndexNext;
    }

    get fun increaseRBFPositionOrder(orderId: Int): IncreaseRBFPositionOrder? {
        return self.increaseRBFPositionOrders.get(orderId);
    }

    get fun decreaseRBFPositionOrderIndexNext(): Int {
        return self.decreaseRBFPositionOrderIndexNext;
    }

    get fun decreaseRBFPositionOrder(orderId: Int): DecreaseRBFPositionOrder? {
        return self.decreaseRBFPositionOrders.get(orderId);
    }

    // ======================================================== LP ================================================================ //

    // // ============================ Increase ================================ //
    // fun handleCreateIncreaseLPPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, marginDelta: Int, liquidityDelta: Int) {
    //     dump("handleCreateIncreaseLPPositionOrder");
    //     let ctx: Context = context();

    //     if (jettonFromAmount < marginDelta) {
    //         self.refundLiquidity(queryId, jettonFromAmount, account);
    //         dump("refund not enough liquidity");
    //         return;
    //     }
    //     // check executionFee
    //     if (ctx.value < executionFee) {
    //         dump("execution fee not enough");
    //         self.refundLiquidity(queryId, jettonFromAmount, account);
    //         return;
    //     }

    //     // add new order
    //     let orderId: Int = self.increaseLPPositionOrderIndexNext;
    //     self.increaseLPPositionOrderIndexNext = self.increaseLPPositionOrderIndexNext + 1;
    //     self.increaseLPPositionOrders.set(orderId, IncreaseLPPositionOrder{
    //         account: account,
    //         marginDelta: marginDelta,
    //         liquidityDelta: liquidityDelta,
    //         executionFee: executionFee,
    //         blockTime: now()
    //     });

    //     // event
    //     emit(IncreaseLPPositionCreatedEvent{
    //         account: account,
    //         marginDelta: marginDelta,
    //         liquidityDelta: liquidityDelta,
    //         executionFee: executionFee,
    //         orderId: orderId
    //     }.toCell());
    // }
    
    // receive(msg: CancelIncreaseLPPositionOrder) {
    //     let ctx: Context = context();

    //     // check gas
    //     require(ctx.value >= self.gasConsumption, "gas not enough");

    //     // check order
    //     let orderOpt: IncreaseLPPositionOrder? = self.increaseLPPositionOrders.get(msg.orderId);
    //     if (orderOpt == null) {
    //         return;
    //     }
    //     let order: IncreaseLPPositionOrder = orderOpt!!;
    //     self.shouldCancel(order.blockTime, sender(), order.isPending);

    //     // transfer execution fee
    //     send(SendParameters{
    //         to: msg.executionFeeReceiver,
    //         bounce: true,
    //         value: order.executionFee,
    //         mode: SendIgnoreErrors
    //     });

    //     // TODO transfer jetton

    //     // delete order
    //     self.increaseLPPositionOrders.set(msg.orderId, null);
    //     // event
    //     emit(IncreaseLPPositionCancelledEvent{
    //         orderId: msg.orderId,
    //         trxId: msg.trxId
    //     }.toCell());
    // }
    
    // receive(msg: ExecuteIncreaseLPPositionOrder) {
    //     let orderOpt: IncreaseLPPositionOrder? = self.increaseLPPositionOrders.get(msg.orderId);
    //     // check order
    //     require(orderOpt != null, "order not exist");

    //     let order: IncreaseLPPositionOrder = orderOpt!!;
    //     self.shouldExecute(order.blockTime, order.isPending);

    //     // TODO

    //     // delete order
    //     self.increaseLPPositionOrders.set(msg.orderId, null);
        
    //     // transfer execution fee
    //     send(SendParameters{
    //         to: msg.executionFeeReceiver,
    //         bounce: true,
    //         value: order.executionFee,
    //         mode: SendIgnoreErrors
    //     });

    //     // event
    //     emit(IncreaseLPPositionExecutedEvent{
    //         orderId: msg.orderId,
    //         trxId: msg.trxId
    //     }.toCell());
    //     emit(LPPositionIncreasedEvent{
    //         account: order.account,
    //         marginDelta: order.marginDelta,
    //         marginAfter: lpPosition.margin,
    //         liquidityDelta: order.liquidityDelta,
    //         liquidityAfter: lpPosition.liquidity,
    //         entryFundingFeeGrowth: lpPosition.entryFundingFeeGrowth,
    //         entryTradingFeeGrowth: lpPosition.entryTradingFeeGrowth
    //     }.toCell());
    // }

    // // ============================ Decrease ================================ //
    // receive(msg: CreateDecreaseLPPositionOrder) {
    //     let ctx: Context = context();
    //     // check gas
    //     require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
    //     // check execution fee
    //     require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

    //     // add new order
    //     let orderId: Int = self.decreaseLPPositionOrderIndexNext;
    //     self.decreaseLPPositionOrderIndexNext = self.decreaseLPPositionOrderIndexNext + 1;
    //     self.decreaseLPPositionOrders.set(orderId, DecreaseLPPositionOrder{
    //         account: sender(),
    //         marginDelta: msg.marginDelta,
    //         liquidityDelta: msg.liquidityDelta,
    //         executionFee: msg.executionFee,
    //         blockTime: now()
    //     });

    //     // event
    //     emit(DecreaseLPPositionCreatedEvent{
    //         account: sender(),
    //         marginDelta: msg.marginDelta,
    //         liquidityDelta: msg.liquidityDelta,
    //         executionFee: msg.executionFee,
    //         orderId: orderId
    //     }.toCell());
    // }
    
    // receive(msg: CancelDecreaseLPPositionOrder) {
    //     let ctx: Context = context();

    //     // check gas
    //     require(ctx.value >= self.gasConsumption, "gas not enough");

    //     // check order
    //     let orderOpt: DecreaseLPPositionOrder? = self.decreaseLPPositionOrders.get(msg.orderId);
    //     if (orderOpt == null) {
    //         return;
    //     }
    //     let order: DecreaseLPPositionOrder = orderOpt!!;
    //     self.shouldCancel(order.blockTime, ctx.sender, order.isPending);

    //     // TODO transfer execution fee

    //     // TODO transfer jetton

    //     // delete order
    //     self.decreaseLPPositionOrders.set(msg.orderId, null);
    //     // event
    //     emit(DecreaseLPPositionCancelledEvent{
    //         orderId: msg.orderId,
    //         trxId: msg.trxId
    //     }.toCell());
    // }
    
    // receive(msg: ExecuteDecreaseLPPositionOrder) {
    //     let orderOpt: DecreaseLPPositionOrder? = self.decreaseLPPositionOrders.get(msg.orderId);
    //     // check order
    //     require(orderOpt != null, "order not exist");

    //     let order: DecreaseLPPositionOrder = orderOpt!!;
    //     self.shouldExecute(order.blockTime, order.isPending);

    //     // TODO

    //     // delete order
    //     self.increaseLPPositionOrders.set(msg.orderId, null);
        
    //     // transfer execution fee
    //     send(SendParameters{
    //         to: msg.executionFeeReceiver,
    //         bounce: true,
    //         value: order.executionFee,
    //         mode: SendIgnoreErrors
    //     });

    //     // event
    //     emit(DecreaseLPPositionExecutedEvent{
    //         orderId: msg.orderId,
    //         trxId: msg.trxId
    //     }.toCell());
    // }

    // // ============================ Getter ================================ //
    // get fun increaseLPPositionOrderIndexNext(): Int {
    //     return self.increaseLPPositionOrderIndexNext;
    // }

    // get fun increaseLPPositionOrder(orderId: Int): IncreaseLPPositionOrder? {
    //     return self.increaseLPPositionOrders.get(orderId);
    // }

    // get fun decreaseLPPositionOrderIndexNext(): Int {
    //     return self.decreaseLPPositionOrderIndexNext;
    // }

    // get fun decreaseLPPositionOrder(orderId: Int): DecreaseLPPositionOrder? {
    //     return self.decreaseLPPositionOrders.get(orderId);
    // }

    // ============================ Perp ================================ //
    // fun handleCreateIncreasePerpPositionMarketOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, 
    //     tokenId: Int, isLong: Bool, marginDelta: Int, liquidityDelta: Int, acceptablePrice: Int) {
    //     dump("handleCreateIncreasePerpPositionMarketOrder");
    //     let ctx: Context = context();

    //     if (jettonFromAmount < marginDelta) {
    //         self.refundLiquidity(queryId, jettonFromAmount, account);
    //         dump("refund not enough liquidity");
    //         return;
    //     }
    //     // check executionFee
    //     if (ctx.value < executionFee) {
    //         dump("execution fee not enough");
    //         self.refundLiquidity(queryId, jettonFromAmount, account);
    //         return;
    //     }

    //     // get orderId next
    //     let orderIdOpt: Int = self.increasePerpPositionMarketIndexsNext.get(tokenId);
    //     let orderId: Int = 1;
    //     if (orderIdOpt != null) {
    //         orderId = orderIdOpt!!;
    //     }

    //     self.increasePerpPositionMarketOrderIndexNext = self.increasePerpPositionMarketOrderIndexNext + 1;

    //     // get order list by tokenId
    //     let increasePerpPositionMarketOrdersOpt: IncreasePerpPositionMarketOrders? = self.increasePerpPositionMarketOrders.get(tokenId);
    //     let increasePerpPositionMarketOrders: IncreasePerpPositionMarketOrders = IncreasePerpPositionMarketOrders{};
    //     if (increasePerpPositionMarketOrdersOpt != null) {
    //         increasePerpPositionMarketOrders = increasePerpPositionMarketOrdersOpt!!;
    //     }

    //     // get order
    //     increasePerpPositionMarketOrders.get();

    //     self.increasePerpPositionMarketOrders.set(orderId, IncreaseLPPositionOrder{
    //         account: account,
    //         marginDelta: marginDelta,
    //         liquidityDelta: liquidityDelta,
    //         executionFee: executionFee,
    //         blockTime: now()
    //     });

    //     // event
    //     emit(IncreaseLPPositionCreatedEvent{
    //         account: account,
    //         marginDelta: marginDelta,
    //         liquidityDelta: liquidityDelta,
    //         executionFee: executionFee,
    //         orderId: orderId
    //     }.toCell());
    // }

    receive(msg: CancelIncreasePerpPositionMarketOrder) {

    }

    receive(msg: ExecuteIncreasePerpPositionMarketOrder) {

    }

    // ======================================================== private function ================================================================ //
    fun shouldCancel(blockTime: Int, account: Address, isPending: Bool) {
        require(!isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = self._isExecutor(sender());

        // executor cancel must after minTimeDelayExecutor
        if (isExecutor) {
            require(blockTime + self.minTimeDelayExecutor <= now(), "too early");
        }
        // check sender
        require(ctx.sender == account || isExecutor, "invalid sender");
        // trader cancel must after minTimeDelayTrader
        if (!isExecutor) {
            require(blockTime + self.minTimeDelayTrader <= now(), "too early");
        }
    }

    fun shouldExecute(blockTime: Int, isPending: Bool) {
        require(!isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = self._isExecutor(sender());

        // check sender
        require(isExecutor, "invalid sender");

        // executor cancel must after minTimeDelayExecutor
        require(blockTime + self.minTimeDelayExecutor <= now(), "too early");

        // executor cancel must before maxTimeDelayExecutor
        require(blockTime + self.maxTimeDelayExecutor > now(), "order expired");
    }

    fun tokenEnabled(tokenIndex: Int): Bool {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenIndex);
        if (tokenConfigOpt == null) {
            return false;
        }
        return (tokenConfigOpt!!).enable;
    }

    // create jetton transfer body
    fun createJettonTransferBody(queryId: Int, jettonAmount: Int, to: Address, responseDestination: Address): Cell {
        return beginCell()
            .storeInt(0xf8a7ea5, 32)
            .storeInt(queryId, 64)
            .storeCoins(jettonAmount)
            .storeAddress(to) // to_owner_address
            .storeAddress(responseDestination)
            .storeDict(null) // custom payload
            .storeCoins(0) // forward_ton_amount
            .storeRefMaybe(null) // forward payload
            .endCell();
    }


}
