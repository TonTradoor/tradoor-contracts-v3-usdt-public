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
    rbfPositionOrders: map<Int, RBFPositionOrder>; // orderId => order
    rbfPositionOrderIndexNext: Int as uint64 = 1;

    // LP
    increaseLPPositionOrders: map<Int, IncreaseLPPositionOrder>; // orderId => order
    increaseLPPositionOrderIndexNext: Int as uint64 = 1;

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

    fun isExecutor(account: Address): Bool {
        let isExecutorOpt: Bool? = self.executors.get(account);
        if (isExecutorOpt == null) {
            return false;
        }
        return isExecutorOpt!!;
    }

    fun isCompensator(account: Address): Bool {
        let isCompensatorOpt: Bool? = self.compensators.get(account);
        if (isCompensatorOpt == null) {
            return false;
        }
        return isCompensatorOpt!!;
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
            minTimeDelayExecutor: self.minTimeDelayExecutor,
            maxTimeDelayExecutor: self.maxTimeDelayExecutor,
            minTimeDelayTrader: self.minTimeDelayTrader,
            minPendingTimeDelayCompensator: self.minPendingTimeDelayCompensator,
            minExecutionFee: self.minExecutionFee,
            gasConsumption: self.gasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            usdtWallet: self.usdtWallet,
            pool: self.pool,
            isExecutor: isExecutor,
            isCompensator: isCompensator
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

    // ======================================================== RBF ================================================================ //

    // ============================ Create Increase ================================ //
    fun handleCreateIncreaseRBFPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, liquidityDelta: Int) {
        dump("handleCreateIncreaseRBFPositionOrder");
        let ctx: Context = context();

        if (ctx.value < executionFee + self.gasConsumption) {
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
            executionFeeReceiver: null
        });

        // event
        emit(RBFPositionOrderCreatedEvent{
            isIncrease: true,
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            orderId: orderId
        }.toCell());

        let refundValue: Int = context().value - executionFee - self.gasConsumption;
        if (refundValue > 0) {
            dump("handleCreateIncreaseRBFPositionOrder refund toncoin");
            send(SendParameters{
                to: account,
                bounce: false,
                value: refundValue
            });
        }
    }

    // ============================ Create Decrease ================================ //
    receive(msg: CreateDecreaseRBFPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
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
            executionFeeReceiver: null
        });

        // event
        emit(RBFPositionOrderCreatedEvent{
            isIncrease: false,
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            orderId: orderId
        }.toCell());
    }

    // ============================ Cancel Increase / Decrease ================================ //
    // cancel increase => transfer jetton => token excesses handel cancel
    // cancel decrease
    receive(msg: CancelRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: RBFPositionOrder = orderOpt!!;
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
            self.rbfPositionOrders.set(msg.orderId, order);

            // transfer jetton
            send(SendParameters{
                to: self.usdtWallet, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: false,
                body: self.createJettonTransferBody(callbackId, order.liquidityDelta, order.account, myAddress())
            });
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
                mode: SendIgnoreErrors
            });
        }
    }

    // ============================ Execute Increase / Decrease ================================ //
    // execute increase => increase position for pool => increase success / bounced
    // execute decrease => decrease position for pool => decrease success => transfer jetton => token excesses handel cancel
    receive(msg: ExecuteRBFPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        // check order
        require(orderOpt != null, "order not exist");

        let order: RBFPositionOrder = orderOpt!!;
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
            bounce: false,
            body: UpdateRBFPosition {
                isIncrease: order.isIncrease,
                orderId: msg.orderId,
                trxId: msg.trxId,
                account: order.account,
                liquidityDelta: order.liquidityDelta
            }.toCell()
        });
    }

    receive(msg: UpdateRBFPositionSuccess) {
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: RBFPositionOrder = orderOpt!!;
        
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
                    mode: SendIgnoreErrors
                });
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
                trxId: msg.trxId
            });

            order.callbackId = callbackId;
            self.rbfPositionOrders.set(msg.orderId, order);

            // transfer jetton
            send(SendParameters{
                to: self.usdtWallet, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: false,
                body: self.createJettonTransferBody(callbackId, msg.receive, order.account, myAddress())
            });
        }
    }

    // reset order pending
    bounced(src: bounced<UpdateRBFPosition>) {
        // get order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: RBFPositionOrder = orderOpt!!;

        // update pending
        order.isPending = false;
        self.rbfPositionOrders.set(src.orderId, order);
    }

    // ============================ Callback Cancel Increase / Execute Decrease ================================ //
    fun handelRBFPositionOrderCallback(orderId: Int, trxId: Int) {
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
                    mode: SendIgnoreErrors
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
                    mode: SendIgnoreErrors
                });
            }
        }
    }

    // ============================ Compensate ================================ //
    // compensate for increase RBF
    receive(msg: CompensateIncreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check compensator
        require(self.isCompensator(sender()), "not compensator");
        
        // check order pending
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: RBFPositionOrder = orderOpt!!;
        require(order.isPending, "order not pending");
        require(order.pendingTime + self.minPendingTimeDelayCompensator <= now(), "too early for compensator");

        // increase position success
        if (msg.positionSuccess) {
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
                    mode: SendIgnoreErrors
                });
            }
            return;
        }

        // increase position failed, cancel order
        // refund jetton already success
        if (msg.refundSuccess) {
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
        } else {
            order.executionFeeReceiver = sender();
        }
        self.rbfPositionOrders.set(msg.orderId, order);

        // transfer jetton
        send(SendParameters{
            to: self.usdtWallet, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(callbackId, jettonCallback.amount, order.account, myAddress())
        });
    }

    // compensate for increase RBF
    receive(msg: CompensateDecreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check compensator
        require(self.isCompensator(sender()), "not compensator");
        
        // check order
        let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: RBFPositionOrder = orderOpt!!;
        require(order.isPending, "order not pending");
        require(order.pendingTime + self.minPendingTimeDelayCompensator <= now(), "too early for compensator");

        // decrease position failed
        if (!msg.positionSuccess) {
            // delete order
            self.rbfPositionOrders.set(msg.orderId, null);
            // event
            emit(RBFPositionOrderCancelledEvent{
                isIncrease: false,
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

        // increase position success, cancel order
        // refund jetton already success
        if (msg.refundSuccess) {
            // refund jetton success
            if (order.callbackId != null) {
                // delete callback
                self.jettonCallbacks.set(order.callbackId!!, null);
            }
            // delete order
            self.rbfPositionOrders.set(msg.orderId, null);
            // event
            emit(RBFPositionOrderExecutedEvent{
                isIncrease: false,
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
        // refund jetton already success

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
        } else {
            order.executionFeeReceiver = sender();
        }
        self.rbfPositionOrders.set(msg.orderId, order);

        // transfer jetton
        send(SendParameters{
            to: self.usdtWallet, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(callbackId, jettonCallback.amount, order.account, myAddress())
        });
    }

    // ============================ Getter ================================ //
    get fun rbfPositionOrderData(orderId: Int?): RBFPositionOrderData {
        let rbfPositionOrder: RBFPositionOrder? = null;
        if (orderId != null) {
            rbfPositionOrder = self.rbfPositionOrders.get(orderId!!);
        }
        return RBFPositionOrderData{
            rbfPositionOrderIndexNext: self.rbfPositionOrderIndexNext,
            rbfPositionOrder: rbfPositionOrder
        };
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
        let isExecutor: Bool = self.isExecutor(sender());

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
        let isExecutor: Bool = self.isExecutor(sender());

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
            .storeInt(0, 1) // custom payload
            .storeCoins(0) // forward_ton_amount
            .storeSlice(beginCell().endCell().asSlice()) // forward payload
            .endCell();
    }


}
