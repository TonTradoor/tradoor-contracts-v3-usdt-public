import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract OrderBook with Deployable, Resumable {
    
    // config
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
    compensator: Address;

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


    /**
     * Initializes the order book contract.
     * @param deployId The deployment ID.
     */
    init(deployId: Int) {
        self.owner = sender();
        self.compensator = sender();
        self.stopped = false;
        self.executors.set(sender(), true);

        self.usdtWallet = newAddress(0, 0);
        self.pool = newAddress(0, 0);
    }

    // ======================================================== Admin ================================================================ //
    /**
     * @dev Receive function to update the configuration parameters of the order book contract.
     * @param msg The UpdateConfig message containing the new configuration values.
     */
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
        self.compensator = msg.compensator;

        // config
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
            bounce: true,
            value: 0,
            mode: SendRemainingValue
        });
    }

    /**
     * Retrieves the configuration data for the order book.
     * 
     * @param executor The address of the executor.
     * @return The ConfigData object containing the configuration data.
     */
    get fun configData(executor: Address?): ConfigData {
        let isExecutor: Bool? = null;
        if (executor != null) {
            isExecutor = self.executors.get(executor!!);
        }

        return ConfigData{
            isExecutor: isExecutor,
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

    // ======================================================== Token ======================================================== //
    /**
     * receive TON coin transfers to the contract
     */
    receive() {}

    /**
     * This function is the receive function of the OrderBook contract.
     * It handles incoming TokenNotification messages and performs various operations based on the message's payload.
     * If the sender is not the contract's USDT wallet, it refunds the token to the sender.
     * If the contract is stopped, it refunds the token and sends a bounce message to the sender indicating that order creation is stopped.
     * If the operation code is OP_CREATE_INCREASE_LP_POSITION_ORDER, it handles the creation of an increase LP position order.
     * If the operation code is OP_CREATE_INCREASE_PERP_POSITION_ORDER, it handles the creation of an increase perpetual position order.
     * If the operation code is not recognized, it refunds the token to the sender.
     *
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
        let exist: Bool = msg.forwardPayload.loadUint(1) == 1;
        if (!exist) {
            self.refundJetton(msg.queryId, msg.amount, msg.from, msg.from);
            send(SendParameters{
                to: msg.from,
                bounce: true,
                value: 0,
                mode: SendIgnoreErrors + SendRemainingValue,
                body: "payload not exist".asComment()
            });
            return;
        }
        let operation: Slice = msg.forwardPayload.loadRef().asSlice();
        let opCode: Int = operation.loadUint(32);
        if (exist && opCode == OP_CREATE_INCREASE_LP_POSITION_ORDER) {
            let liquidityDelta: Int = operation.loadUint(128);
            let executionFee: Int = operation.loadCoins();

            self.handleCreateIncreaseLPPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, liquidityDelta);
        } else if (exist && opCode == OP_CREATE_INCREASE_PERP_POSITION_ORDER) {
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

    /**
     * Refunds the specified amount of jetton to the specified address.
     * 
     * @param queryId The ID of the query.
     * @param amount The amount of jetton to refund.
     * @param to The address to refund the jetton to.
     * @param destination The optional address to specify as the response destination.
     */
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

    /**
     * Calculates the gas cost for executing an order.
     * 
     * @param orderType The type of the order (0 for LP order, 1 for perpetual order).
     * @param executionFeeDelta The change in execution fee.
     * @param executionMultiple The execution fee multiple.
     * @param transferJetton Indicates whether to transfer jetton.
     * @return The gas cost for executing the order.
     */
    fun exceedGas(orderType: Int, executionFeeDelta: Int, executionMultiple: Int, transferJetton: Bool): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - self.totalExecutionFee + executionFeeDelta - context().value;
        tonBalanceBeforeMsg = max(0, tonBalanceBeforeMsg);
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        let extraValue: Int = max(0, tonBalanceBeforeMsg - self.minTonsForStorage);
        let gasConsumption: Int = orderType == ORDER_TYPE_LP ? self.lpGasConsumption : self.perpGasConsumption;
        return context().value - storageFee - gasConsumption * executionMultiple + extraValue - 
            (executionFeeDelta > 0 ? executionFeeDelta : 0) - (transferJetton ? self.gasTransferJetton : 0);
    }

    /**
     * Refunds the excess ton tokens to the specified address.
     * 
     * @param orderType The type of the order.
     * @param to The address to which the excess ton tokens will be refunded.
     * @param executionFeeDelta The execution fee delta.
     * @param executionMultiple The execution multiple.
     * @param transferJetton A boolean value indicating whether to transfer jetton.
     */
    fun refundExceedTon(orderType: Int, to: Address, executionFeeDelta: Int, executionMultiple: Int, transferJetton: Bool) {
        let refundValue: Int = self.exceedGas(orderType, executionFeeDelta, executionMultiple, transferJetton);
        if (refundValue > 0) {
            send(SendParameters{
                to: to,
                bounce: true,
                value: refundValue,
                mode: SendIgnoreErrors
            });
        }
    }

    /**
     * Calculates the total gas consumption for a given order type.
     * 
     * @param orderType The type of the order (0 for LP order, 1 for Perp order).
     * @return The total gas consumption, including forward fee, gas consumption, and minimum tons for storage.
     */
    fun getPoolGas(orderType: Int): Int {
        let gasConsumption: Int = orderType == ORDER_TYPE_LP ? self.poolLpGasConsumption : self.poolPerpGasConsumption;
        return context().readForwardFee() + gasConsumption + self.minTonsForStorage;
    }

    // ======================================================== LP ======================================================== //
    /**
     * Handles the creation of an increase LP position order.
     * 
     * @param queryId The ID of the query.
     * @param jettonFromAmount The amount of jetton from which the order is created.
     * @param account The address of the account creating the order.
     * @param executionFee The execution fee for the order.
     * @param liquidityDelta The change in liquidity for the order.
     */
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

    /**
     * Receive function for creating a decrease LP position order.
     * 
     * @param msg The CreateDecreaseLPPositionOrder message containing the order details.
     */
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

    /**
     * This function is called when a CancelLPPositionOrder message is received.
     * It cancels a liquidity position order and performs various checks and operations.
     * 
     * @param msg The CancelLPPositionOrder message containing the order ID and other parameters.
     */
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

    /**
     * This function is called when executing an LP position order.
     * It performs various checks and updates the order accordingly.
     * 
     * @param msg The ExecuteLPPositionOrder message containing the order details.
     */
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

    /**
     * This function is triggered when an LP position update is successful.
     * It performs various checks and operations related to the LP position order.
     * 
     * @param msg The UpdateLPPositionSuccess message containing the order ID, transaction ID, and received amount.
     */
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

    /**
     * This function is called when a transaction is bounced, indicating that an update to an LP position order has failed.
     * It retrieves the LP position order associated with the bounced transaction and updates its pending status.
     * If the order has a last operator, it sends a zero-value transaction to the last operator.
     * 
     * @param src The bounced transaction containing the order ID.
     */
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

    /**
     * Retrieves the LPPositionOrderData for the specified order ID.
     * 
     * @param orderId The ID of the order to retrieve.
     * @return The LPPositionOrderData object containing the next index and the LPPositionOrder associated with the order ID.
     */
    get fun lpPositionOrder(orderId: Int): LPPositionOrderData {
        return LPPositionOrderData{
            lpPositionOrderIndexNext: self.lpPositionOrderIndexNext,
            lpPositionOrder: self.lpPositionOrders.get(orderId)
        };
    }

    // ======================================================== Perp ======================================================== //
    /**
     * Handles the creation and increase of a perpetual position order.
     * 
     * @param queryId The unique identifier for the order.
     * @param jettonFromAmount The amount of jetton to be used for the order.
     * @param account The address of the account placing the order.
     * @param executionFee The execution fee for the order.
     * @param isMarket A boolean indicating whether the order is a market order or a limit order.
     * @param tokenId The ID of the token associated with the order.
     * @param isLong A boolean indicating whether the order is a long position or a short position.
     * @param marginDelta The change in margin for the order.
     * @param sizeDelta The change in size for the order.
     * @param triggerPrice The trigger price for the order.
     * @param tpSize The take profit size for the order.
     * @param tpPrice The take profit price for the order.
     * @param slSize The stop loss size for the order.
     * @param slPrice The stop loss price for the order.
     */
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

    /**
     * Receive function for creating a decrease perpetual position order.
     * 
     * @param msg The CreateDecreasePerpPositionOrder message containing the order details.
     */
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

    /**
     * @dev This function is called when receiving a CreateTpSlPerpPositionOrder message.
     * It performs various checks on gas and execution fee, creates take profit (tp) and stop loss (sl) orders if necessary,
     * updates the total execution fee, and transfers excess gas.
     * @param msg The CreateTpSlPerpPositionOrder message containing the necessary information for creating tp/sl orders.
     */
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

    /**
     * Creates a perpetual order in the order book.
     * 
     * @param trxId The transaction ID associated with the order.
     * @param opType The operation type of the order.
     * @param account The address of the account placing the order.
     * @param tokenId The ID of the token being traded.
     * @param isLong A boolean indicating whether the order is for a long position.
     * @param marginDelta The change in margin for the order.
     * @param sizeDelta The change in size for the order.
     * @param triggerPrice The trigger price for the order.
     * @param tpSize The take profit size for the order.
     * @param tpPrice The take profit price for the order.
     * @param slSize The stop loss size for the order.
     * @param slPrice The stop loss price for the order.
     * @param executionFee The execution fee for the order.
     * @return The ID of the created order.
     */    
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

    /**
     * This function is called when a CancelPerpPositionOrder message is received.
     * It cancels a perpetual position order and performs various checks and operations.
     * 
     * @param msg The CancelPerpPositionOrder message containing the order ID and other parameters.
     */
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


    /**
     * Receives and executes a perpetual position order.
     * 
     * @param msg The ExecutePerpPositionOrder message containing the order details.
     */
    receive(msg: ExecutePerpPositionOrder) {
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

    /**
     * This function is called when a successful update is made to a perpetual position order.
     * It performs various checks and actions based on the type of order and the received message.
     * 
     * @param msg The UpdatePerpPositionSuccess message containing the order ID and transaction ID.
     */
    receive(msg: UpdatePerpPositionSuccess) {
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
    }

    /**
     * Handles the bounced event for an UpdatePerpPosition.
     * If the order is a liquidation order, it is deleted from the perpPositionOrders mapping.
     * Otherwise, the order's isPending flag is set to false.
     * If the order has a lastOperator, a send transaction is triggered to the lastOperator with a value of 0.
     */
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

    /**
     * This function is called when a LiquidatePerpPosition message is received.
     * It performs various checks, adds a new order to the order book, and sends an update position message to the pool.
     * 
     * @param msg The LiquidatePerpPosition message containing information about the liquidation.
     */
    receive(msg: LiquidatePerpPosition) {
        // check gas
        require(context().value >= self.perpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");

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
    
    /**
     * @dev This function is called when a new ADLPerpPosition is received.
     * It performs the following steps:
     * 1. Checks if there is enough gas for execution.
     * 2. Verifies the sender is a valid executor.
     * 3. Adds a new order to the order book.
     * 4. Sends an update position message to the pool.
     * @param msg The ADLPerpPosition message containing the order details.
     */
    receive(msg: ADLPerpPosition) {
        // check gas
        require(context().value >= self.perpGasConsumption * 2 + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");

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

    /**
     * Retrieves the PerpPositionOrderData for the specified order ID.
     * 
     * @param orderId: The ID of the order to retrieve.
     * @return The PerpPositionOrderData object containing the next index, order details, and extended order details.
     */
    get fun perpPositionOrder(orderId: Int): PerpPositionOrderData {
        return PerpPositionOrderData{
            perpPositionOrderIndexNext: self.perpPositionOrderIndexNext,
            perpPositionOrder: self.perpPositionOrders.get(orderId),
            perpPositionOrderEx: self.perpPositionOrderExs.get(orderId)
        };
    }

    // ======================================================== Claim ================================================================ //
    /**
     * @dev This function is called when a `SendProtocolFee` message is received.
     * It verifies that the sender is the contract's pool and transfers the specified amount of tokens to the fee receiver.
     * If the amount is greater than 0, it sends the tokens using the specified parameters.
     * @param msg The `SendProtocolFee` message containing the transaction ID, amount, fee receiver, and other details.
     */
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
    /**
     * This function is called when a CreateCompensate message is received.
     * It performs various checks and adds a new compensate to the order book.
     * 
     * @param msg The CreateCompensate message containing the details of the compensate.
     */
    receive(msg: CreateCompensate) {

        // check sender
        require(self.compensator == sender(), "invalid sender");

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
            unlockTime: now() + 3 * DAY
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
            unlockTime: now() + 3 * DAY
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), 0, 1, false);
    }

    /**
     * @dev This function is the entry point for executing or canceling a compensation.
     * @param msg The ExecuteOrCancelCompensate message containing the necessary information for execution or cancellation.
     */
    receive(msg: ExecuteOrCancelCompensate) {
        // check sender
        require(self.compensator == sender(), "invalid sender");

        // check gas
        require(context().value >= self.perpGasConsumption + self.gasTransferJetton, "gas not enough");

        // get compensate
        let compensateOpt: Compensate? = self.compensates.get(msg.compensateId);
        require(compensateOpt != null, "compensate not exist");
        let compensate: Compensate = compensateOpt!!;

        // cancel
        if (msg.isCancel) {
            // delete compensate
            self.compensates.set(msg.compensateId, null);

            // event
            emit(CompensateCancelledEvent{
                compensateId: msg.compensateId,
                trxId: msg.trxId
            }.toCell());

            // transfer execess gas
            self.refundExceedTon(ORDER_TYPE_PERP, sender(), 0, 1, false);
            return;
        }

        // check unlock time
        require(now() >= compensate.unlockTime, "not reach unlock time");        

        // get order
        if(compensate.orderType != null) {
            if (compensate.orderType == ORDER_TYPE_LP) {
                let orderOpt: LPPositionOrder? = self.lpPositionOrders.get(compensate.orderId);
                self.lpPositionOrders.set(compensate.orderId, null);
            } else {
                let orderOpt: PerpPositionOrder? = self.perpPositionOrders.get(compensate.orderId);
                self.perpPositionOrders.set(compensate.orderId, null);
                self.perpPositionOrderExs.set(compensate.orderId, null);
            }
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

        // delete compensate
        self.compensates.set(msg.compensateId, null);

        emit(CompensateExecutedEvent{
            compensateId: msg.compensateId,
            trxId: compensate.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, sender(), 0, 1, compensate.refundReceiver != null && compensate.refundAmount > 0);
        return;
    }

    /**
     * Retrieves the compensation data for a given compensateId.
     * 
     * @param compensateId The ID of the compensation to retrieve.
     * @return The CompensateData object containing the compensateIndexNext and the compensate with the given compensateId.
     */
    get fun compensate(compensateId: Int): CompensateData {
        return CompensateData{
            compensateIndexNext: self.compensateIndexNext,
            compensate: self.compensates.get(compensateId)
        };
    }

    /**
     * Checks if the given account is an executor.
     * 
     * @param account The address of the account to check.
     * @return True if the account is an executor, false otherwise.
     */
    fun isExecutor(account: Address): Bool {
        let isExecutorOpt: Bool? = self.executors.get(account);
        if (isExecutorOpt == null) {
            return false;
        }
        return isExecutorOpt!!;
    }


}
