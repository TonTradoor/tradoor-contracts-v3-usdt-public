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

    jettonCallbacks: map<Int, JettonCallback>; // queryId => callback
    jettonCallbackQueryIdNext: Int as uint64 = 1;

    // RBF
    rbfPositionOrders: map<Int, RBFPositionOrder>; // orderId => order
    rbfPositionOrderIndexNext: Int as uint64 = 1;

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
        // self.compensators.set(sender(), true);

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
                body: self.createJettonTransferBody(msg.queryId, msg.amount, msg.from, msg.from)
            });
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
        else if (opCode == OP_CREATE_INCREASE_PERP_POSITION_ORDER) {
            let executionFee: Int = operation.loadCoins();
            let isMarket: Bool = operation.loadInt(1) == -1;
            let tokenId: Int = operation.loadInt(64);
            let isLong: Bool = operation.loadInt(1) == -1;
            let marginDelta: Int = operation.loadInt(128);
            let sizeDelta: Int = operation.loadInt(128);
            let triggerPrice: Int = operation.loadInt(256);
            let tpSl: Slice = operation.loadRef().asSlice();
            let tpSize: Int = tpSl.loadInt(128);
            let tpPrice: Int = tpSl.loadInt(256);
            let slSize: Int = tpSl.loadInt(128);
            let slPrice: Int = tpSl.loadInt(256);

            self.handleCreateIncreasePerpPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, isMarket, tokenId, isLong, marginDelta, 
                sizeDelta, triggerPrice, tpSize, tpPrice, slSize, slPrice);
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
        else if (jettonCallback.orderType == ORDER_TYPE_PERP) {
            self.handelPerpPositionOrderCallback(jettonCallback.orderId, jettonCallback.trxId);
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
                liquidityDelta: order.liquidityDelta,
                pricesLength: msg.pricesLength,
                prices: msg.prices
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
    // receive(msg: CompensateRBFPositionOrder) {
    //     let ctx: Context = context();

    //     // check compensator
    //     let isCompensator: Bool = false;
    //     let isCompensatorOpt: Bool? = self.compensators.get(sender());
    //     if (isCompensatorOpt != null) {
    //         isCompensator = isCompensatorOpt!!;
    //     }
    //     require(isCompensator, "not compensator");
        
    //     // check order pending
    //     let orderOpt: RBFPositionOrder? = self.rbfPositionOrders.get(msg.orderId);
    //     require(orderOpt != null, "order not exist");
    //     let order: RBFPositionOrder = orderOpt!!;

    //     // check gas
    //     if (order.isIncrease) {
    //         require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
    //     } else {
    //         require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
    //     }

    //     require(order.isPending, "order not pending");

    //     // refund
    //     if (msg.needRefund) {
    //         // increase position failed, cancel order
    //         // refund jetton failed
    //         // get callback
    //         require(order.callbackId != null, "jetton callback not exist");
    //         let callbackId: Int = order.callbackId!!;
    //         let jettonCallbackOpt: JettonCallback? = self.jettonCallbacks.get(callbackId);
    //         if (jettonCallbackOpt == null) {
    //             return;
    //         }
    //         let jettonCallback: JettonCallback = jettonCallbackOpt!!;
    //         // update trxId
    //         jettonCallback.trxId = msg.trxId;
    //         self.jettonCallbacks.set(callbackId, jettonCallback);

    //         // update execution fee receiver
    //         if (msg.executionFeeReceiver != null) {
    //             order.executionFeeReceiver = msg.executionFeeReceiver!!;
    //         }
    //         order.lastOperator = sender();
    //         self.rbfPositionOrders.set(msg.orderId, order);

    //         // transfer jetton
    //         self.refundJetton(callbackId, jettonCallback.amount, jettonCallback.receiver, myAddress());
    //         return;
    //     }

    //     if (msg.isExecute) {
    //         // delete order
    //         self.rbfPositionOrders.set(msg.orderId, null);
    //         // event
    //         emit(RBFPositionOrderExecutedEvent{
    //             isIncrease: true,
    //             orderId: msg.orderId,
    //             trxId: msg.trxId
    //         }.toCell());
    //     } else {
    //         if (order.callbackId != null) {
    //             // delete callback
    //             self.jettonCallbacks.set(order.callbackId!!, null);
    //         }
    //         // delete order
    //         self.rbfPositionOrders.set(msg.orderId, null);
    //         // event
    //         emit(RBFPositionOrderCancelledEvent{
    //             isIncrease: true,
    //             orderId: msg.orderId,
    //             trxId: msg.trxId
    //         }.toCell());
    //     }

    //     // transfer execution fee
    //     if (order.executionFeeReceiver != null) {
    //         send(SendParameters{
    //             to: order.executionFeeReceiver!!,
    //             bounce: true,
    //             value: order.executionFee,
    //             mode: SendPayGasSeparately
    //         });
    //     }

    //     // transfer execess gas
    //     self.refundExecessTon(sender(), order.executionFee);
    //     return;
    // }

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
                liquidityDelta: order.liquidityDelta,
                pricesLength: msg.pricesLength,
                prices: msg.prices
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
                liquidityDelta: 0,
                pricesLength: msg.pricesLength,
                prices: msg.prices
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
    // receive(msg: CompensateLPPositionOrder) {
    //     let ctx: Context = context();

    //     // check compensator
    //     let isCompensator: Bool = false;
    //     let isCompensatorOpt: Bool? = self.compensators.get(sender());
    //     if (isCompensatorOpt != null) {
    //         isCompensator = isCompensatorOpt!!;
    //     }
    //     require(isCompensator, "not compensator");
        
    //     // check order pending
    //     let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
    //     require(orderOpt != null, "order not exist");
    //     let order: LPPositionOrder = orderOpt!!;

    //     // check gas
    //     if (order.opType == ORDER_OP_TYPE_INCREASE) {
    //         require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
    //     } else {
    //         require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
    //     }

    //     require(order.isPending, "order not pending");

    //     // refund
    //     if (msg.needRefund) {
    //         // increase position failed, cancel order
    //         // refund jetton failed
    //         // get callback
    //         require(order.callbackId != null, "jetton callback not exist");
    //         let callbackId: Int = order.callbackId!!;
    //         let jettonCallbackOpt: JettonCallback? = self.jettonCallbacks.get(callbackId);
    //         if (jettonCallbackOpt == null) {
    //             return;
    //         }
    //         let jettonCallback: JettonCallback = jettonCallbackOpt!!;
    //         // update trxId
    //         jettonCallback.trxId = msg.trxId;
    //         self.jettonCallbacks.set(callbackId, jettonCallback);

    //         // update execution fee receiver
    //         if (msg.executionFeeReceiver != null) {
    //             order.executionFeeReceiver = msg.executionFeeReceiver!!;
    //         }
    //         order.lastOperator = sender();
    //         self.lpPositionOrders.set(msg.orderId, order);

    //         // transfer jetton
    //         self.refundJetton(callbackId, jettonCallback.amount, jettonCallback.receiver, myAddress());
    //         return;
    //     }

    //     if (msg.isExecute) {
    //         // delete order
    //         self.lpPositionOrders.set(msg.orderId, null);
    //         // event
    //         emit(LPPositionOrderExecutedEvent{
    //             opType: order.opType,
    //             orderId: msg.orderId,
    //             trxId: msg.trxId
    //         }.toCell());
    //     } else {
    //         if (order.callbackId != null) {
    //             // delete callback
    //             self.jettonCallbacks.set(order.callbackId!!, null);
    //         }
    //         // delete order
    //         self.lpPositionOrders.set(msg.orderId, null);
    //         // event
    //         emit(LPPositionOrderCancelledEvent{
    //             opType: order.opType,
    //             orderId: msg.orderId,
    //             trxId: msg.trxId
    //         }.toCell());
    //     }

    //     // transfer execution fee
    //     if (order.executionFeeReceiver != null && order.executionFee != 0) {
    //         send(SendParameters{
    //             to: order.executionFeeReceiver!!,
    //             bounce: true,
    //             value: order.executionFee,
    //             mode: SendPayGasSeparately
    //         });
    //     }

    //     // transfer execess gas
    //     self.refundExecessTon(sender(), order.executionFee);
    //     return;
    // }

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
        dump("handleCreateIncreasePerpPositionOrder");
        let ctx: Context = context();

        if (ctx.value < executionFee + ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage) {
            dump("gas not enough");
            self.refundJetton(queryId, jettonFromAmount, account, account);
            return;
        }

        if (jettonFromAmount < marginDelta) {
            dump("refund from not enough margin");
            self.refundJetton(queryId, jettonFromAmount, account, account);
            return;
        }

        if (executionFee < self.minExecutionFee) {
            dump("execution fee not enough");
            self.refundJetton(queryId, jettonFromAmount, account, account);
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
        require(ctx.value - msg.executionFee >= ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage, "gas not enough");
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
            callbackId: null,
            executionFeeReceiver: null,
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
            require(ctx.value >= ctx.readForwardFee() * 4 + self.gasConsumption * 2 + self.minTonsForStorage + ton("0.032"), "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 2 + self.gasConsumption + self.minTonsForStorage, "gas not enough");
        }

        self.shouldCancel(order.blockTime, sender(), order.isPending);

        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            // add callback
            let callbackId: Int = self.jettonCallbackQueryIdNext;
            self.jettonCallbackQueryIdNext = callbackId + 1;
            self.jettonCallbacks.set(callbackId, JettonCallback{
                orderType: ORDER_TYPE_PERP,
                orderId: msg.orderId,
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
            order.callbackId = callbackId;
            self.perpPositionOrders.set(msg.orderId, order);
            dump("cancel perp order");
            // transfer jetton
            self.refundJetton(callbackId, order.marginDelta, order.account, myAddress());
        } else {
            // get fee receiver
            let executionFeeReceiver: Address = sender();
            if (msg.executionFeeReceiver != null) {
                executionFeeReceiver = msg.executionFeeReceiver!!;
            }

            // delete order
            self.perpPositionOrders.set(msg.orderId, null);
            // event
            emit(PerpPositionOrderCancelledEvent{
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
    receive(msg: ExecutePerpPositionOrder) {
        let ctx: Context = context();

        // check order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: PerpPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
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
        dump("execute Perp increase order send msg to pool");
    }

    // increase success / bounced => excess gas
    // decrease success => orderBook wallet => user wallet => token excesses handel cancel => excess gas
    receive(msg: UpdatePerpPositionSuccess) {
        dump("receive update Perp position success");
        let ctx: Context = context();
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(msg.orderId);
        if (orderOpt == null) {
            dump("order not exist");
            return;
        }
        let order: PerpPositionOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= ctx.readForwardFee() * 2 + self.gasConsumption, "gas not enough");
        } else {
            require(ctx.value >= ctx.readForwardFee() * 4 + self.gasConsumption * 2 + ton("0.032"), "gas not enough");
        }

        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
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

            // delete order
            self.perpPositionOrders.set(msg.orderId, null);
            // event
            emit(PerpPositionOrderExecutedEvent{
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
                orderType: ORDER_TYPE_PERP,
                orderId: msg.orderId,
                amount: msg.receive,
                receiver: receiver,
                trxId: msg.trxId
            });

            order.callbackId = callbackId;
            self.perpPositionOrders.set(msg.orderId, order);

            // transfer jetton
            self.refundJetton(callbackId, msg.receive, receiver, myAddress());
        }
    }

    // reset order pending
    bounced(src: bounced<UpdatePerpPosition>) {
        dump("increase perp position failed");

        // get order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(src.orderId);
        if (orderOpt == null) {
            dump("order not exist");
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
    receive(msg: LiquidateOrADLPerpPosition) {
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
        dump("liquidate perp send msg to pool");
    }

    // ============================ Callback Cancel Increase / Execute Decrease / Execute Liquidation ================================ //
    fun handelPerpPositionOrderCallback(orderId: Int, trxId: Int) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= ctx.readForwardFee() + self.gasConsumption, "gas not enough");

        // get order
        let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(orderId);
        if (orderOpt == null) {
            return;
        }
        let order: PerpPositionOrder = orderOpt!!;

        // delete order
        self.perpPositionOrders.set(orderId, null);
        self.perpPositionOrderExs.set(orderId, null);

        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            // event
            emit(PerpPositionOrderCancelledEvent{
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
            dump("cancel Perp increase order success");
        } else {
            // event
            emit(PerpPositionOrderExecutedEvent{
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
    // receive(msg: CompensatePerpPositionOrder) {
    //     let ctx: Context = context();

    //     // check compensator
    //     let isCompensator: Bool = false;
    //     let isCompensatorOpt: Bool? = self.compensators.get(sender());
    //     if (isCompensatorOpt != null) {
    //         isCompensator = isCompensatorOpt!!;
    //     }
    //     require(isCompensator, "not compensator");
        
    //     // check order pending
    //     let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(msg.orderId);
    //     require(orderOpt != null, "order not exist");
    //     let order: LPPositionOrder = orderOpt!!;

    //     // check gas
    //     if (order.opType == ORDER_OP_TYPE_INCREASE) {
    //         require(ctx.value >= ctx.readForwardFee() * 3 + self.gasConsumption * 2 + self.minTonsForStorage + self.getPoolGas(), "gas not enough");
    //     } else {
    //         require(ctx.value >= ctx.readForwardFee() * 6 + self.gasConsumption * 3 + self.minTonsForStorage + self.getPoolGas() + ton("0.032"), "gas not enough");
    //     }

    //     require(order.isPending, "order not pending");

    //     // refund
    //     if (msg.needRefund) {
    //         // increase position failed, cancel order
    //         // refund jetton failed
    //         // get callback
    //         require(order.callbackId != null, "jetton callback not exist");
    //         let callbackId: Int = order.callbackId!!;
    //         let jettonCallbackOpt: JettonCallback? = self.jettonCallbacks.get(callbackId);
    //         if (jettonCallbackOpt == null) {
    //             return;
    //         }
    //         let jettonCallback: JettonCallback = jettonCallbackOpt!!;
    //         // update trxId
    //         jettonCallback.trxId = msg.trxId;
    //         self.jettonCallbacks.set(callbackId, jettonCallback);

    //         // update execution fee receiver
    //         if (msg.executionFeeReceiver != null) {
    //             order.executionFeeReceiver = msg.executionFeeReceiver!!;
    //         }
    //         order.lastOperator = sender();
    //         self.lpPositionOrders.set(msg.orderId, order);

    //         // transfer jetton
    //         self.refundJetton(callbackId, jettonCallback.amount, jettonCallback.receiver, myAddress());
    //         return;
    //     }

    //     if (msg.isExecute) {
    //         // delete order
    //         self.lpPositionOrders.set(msg.orderId, null);
    //         // event
    //         emit(LPPositionOrderExecutedEvent{
    //             opType: order.opType,
    //             orderId: msg.orderId,
    //             trxId: msg.trxId
    //         }.toCell());
    //     } else {
    //         if (order.callbackId != null) {
    //             // delete callback
    //             self.jettonCallbacks.set(order.callbackId!!, null);
    //         }
    //         // delete order
    //         self.lpPositionOrders.set(msg.orderId, null);
    //         // event
    //         emit(LPPositionOrderCancelledEvent{
    //             opType: order.opType,
    //             orderId: msg.orderId,
    //             trxId: msg.trxId
    //         }.toCell());
    //     }

    //     // transfer execution fee
    //     if (order.executionFeeReceiver != null && order.executionFee != 0) {
    //         send(SendParameters{
    //             to: order.executionFeeReceiver!!,
    //             bounce: true,
    //             value: order.executionFee,
    //             mode: SendPayGasSeparately
    //         });
    //     }

    //     // transfer execess gas
    //     self.refundExecessTon(sender(), order.executionFee);
    //     return;
    // }

    // ============================ Getter ================================ //
    get fun perpPositionOrder(orderId: Int): PerpPositionOrder? {
        return self.perpPositionOrders.get(orderId);
    }

    get fun perpPositionOrderIndexNext(): Int {
        return self.perpPositionOrderIndexNext;
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
