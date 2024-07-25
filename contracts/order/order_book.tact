import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract OrderBook with Deployable, Resumable {

    owner: Address;
    stopped: Bool = false;
    
    // config
    orderLockTime: Int as uint32 = 3 * 60; // trader execute after 3min

    lpGasConsumption: Int as coins = ton("0.04"); // min lp consumption gas
    perpGasConsumption: Int as coins = ton("0.09"); // min perp consumption gas
    poolLpGasConsumption: Int as coins = ton("0.04"); // min orderbook consumption gas
    poolPerpGasConsumption: Int as coins = ton("0.09"); // min perp consumption gas
    minTonsForStorage: Int as coins = ton("0.01"); // min pool storage gas
    gasTransferJetton: Int as coins = ton("0.08"); // min pool storage gas
    gasForBurnTlp: Int as coins = ton("0.08"); // estimated burn TLP gas
    lpMinExecutionFee: Int as coins = ton("0.05"); // fee for every operation
    perpMinExecutionFee: Int as coins = ton("0.1"); // fee for every operation
    
    tlpWallet: Address; // order book TLP jetton wallet address
    jettonWallet: Address; // order book USDT jetton wallet address
    pool: Address; // pool address

    executors: map<Address, Bool>; // account => enabled
    lpExecutors: map<Address, Bool>;
    compensator: Address;

    // data
    liquidityOrders: map<Int as uint64, LiquidityOrder>; // orderId => order
    liquidityOrderIndexNext: Int as uint64 = 1;

    perpOrders: map<Int as uint64, PerpOrder>; // orderId => order
    perpOrderExs: map<Int as uint64, PerpOrderEx>; // orderId => orderEx
    perpOrderIndexNext: Int as uint64 = 1;

    compensates: map<Int as uint64, Compensate>; // id => compensate
    compensateIndexNext: Int as uint64 = 1;

    totalExecutionFee: Int as coins = 0;

    /**
     * Initializes the order book contract.
     * @param deployId The deployment ID.
     */
    init(deployId: Int) {
        //todo v1.4.1 support newAddress(0,0);
        self.owner = sender();
        self.jettonWallet = sender();
        self.tlpWallet = sender();
        self.pool = sender();
        self.compensator = sender();
    }

    // ======================================================== Admin ================================================================ //
    /**
     * @dev Receive function to update the configuration parameters of the order book contract.
     * @param msg The UpdateConfig message containing the new configuration values.
     */
    receive(msg: UpdateConfig) {
        self.requireOwner();
        self.orderLockTime = msg.orderLockTime!!;

        // contract
        let contractConfig: ContractConfig? = msg.contractConfig;
        if (contractConfig != null) {
            self.tlpWallet = contractConfig!!.tlpWallet;
            self.jettonWallet = contractConfig!!.jettonWallet;
            self.pool = contractConfig!!.pool; 
        }

        // executors
        let executorConfig: ExecutorConfig? = msg.executorConfig;
        if (executorConfig != null) {
            let executors: map<Address, Bool> = executorConfig!!.executors;
            foreach (executor,enable in executors) {
                self.executors.set(executor, enable? true : null);
            }
            let lpExecutors: map<Address, Bool> = executorConfig!!.lpExecutors;
            foreach (executor,enable in lpExecutors) {
                self.lpExecutors.set(executor, enable? true : null);
            }
            self.compensator = executorConfig!!.compensator;
        }

        // gas
        let gasConfig: GasConfig? = msg.gasConfig;
        if (gasConfig != null) {
            self.lpGasConsumption = gasConfig!!.lpGasConsumption;
            self.perpGasConsumption = gasConfig!!.perpGasConsumption;
            self.poolLpGasConsumption = gasConfig!!.poolLpGasConsumption;
            self.poolPerpGasConsumption = gasConfig!!.poolPerpGasConsumption;
            self.minTonsForStorage = gasConfig!!.minTonsForStorage;
            self.gasTransferJetton = gasConfig!!.gasTransferJetton;
            self.lpMinExecutionFee = gasConfig!!.lpMinExecutionFee;
            self.perpMinExecutionFee = gasConfig!!.perpMinExecutionFee;
            self.gasForBurnTlp = gasConfig!!.gasForBurnTlp;
        }

        self.reply("config updated".asComment());
    }

    /**
     * Retrieves the configuration data for the order book.
     * 
     * @param account The address of the account.
     * @return The ConfigData object containing the configuration data.
     */
    get fun configData(account: Address?): ConfigData {
        let isExecutor: Bool? = null;
        if (account != null) {
            isExecutor = self.executors.get(account!!);
        }

        return ConfigData{
            isExecutor: isExecutor,
            orderLockTime: self.orderLockTime,
            lpMinExecutionFee: self.lpMinExecutionFee,
            perpMinExecutionFee: self.perpMinExecutionFee,
            lpGasConsumption: self.lpGasConsumption,
            perpGasConsumption: self.perpGasConsumption,
            poolLpGasConsumption: self.poolLpGasConsumption,
            poolPerpGasConsumption: self.poolPerpGasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            gasTransferJetton: self.gasTransferJetton,
            gasForBurnTlp: self.gasForBurnTlp,
            totalExecutionFee: self.totalExecutionFee,
            tlpWallet: self.tlpWallet,
            jettonWallet: self.jettonWallet,
            pool: self.pool,
        };
    }

    // ======================================================== Token ======================================================== //
    /**
     * receive TON coin transfers to the contract
     */
    receive() {}

    /**
     * This function is the receive function of the OrderBook contract.
     * It handles incoming JettonTransferNotification messages and performs various operations based on the message's payload.
     * If the sender is not the contract's USDT wallet, it refunds the token to the sender.
     * If the contract is stopped, it refunds the token and sends a bounce message to the sender indicating that order creation is stopped.
     * If the operation code is OP_CREATE_INCREASE_LP_POSITION_ORDER, it handles the creation of an increase LP position order.
     * If the operation code is OP_CREATE_INCREASE_PERP_POSITION_ORDER, it handles the creation of an increase perpetual position order.
     * If the operation code is not recognized, it refunds the token to the sender.
     *
     * @param msg The JettonTransferNotification message received.
     */
    receive(msg: JettonTransferNotification) {
        // just refund other token
        if (sender() != self.jettonWallet && sender() != self.tlpWallet) {
            self.notify(JettonTransfer{
                query_id: msg.query_id,
                amount: msg.amount,
                destination: msg.sender,
                response_destination: msg.sender,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice()}.toCell(),
            );
            return;
        }

        // stop
        if (self.stopped) {
            self.refundJetton(sender(), msg.query_id, msg.amount, msg.sender, msg.sender);
            self.forward(msg.sender, "contract stopped".asComment(), true, null);
            return;
        }

        // get op code
        let exist: Bool = msg.forward_payload.loadUint(1) == 1;
        if (!exist) {
            self.refundJetton(sender(), msg.query_id, msg.amount, msg.sender, msg.sender);
            self.forward(msg.sender, "payload not exist".asComment(), true, null);
            return;
        }
        if(sender() == self.jettonWallet){
            let operation: Slice = msg.forward_payload.loadRef().asSlice();
            let opCode: Int = operation.loadUint(8);
            if (exist && opCode == OP_CREATE_INCREASE_LP_POSITION_ORDER) {
                let jettonDelta: Int = operation.loadCoins();
                let executionFee: Int = operation.loadCoins();

                self.handleCreateIncreaseLiquidityOrder(msg.query_id, msg.amount, msg.sender, executionFee, jettonDelta);
            } else if (exist && opCode == OP_CREATE_INCREASE_PERP_POSITION_ORDER) {
                let executionFee: Int = operation.loadCoins();
                let isMarket: Bool = operation.loadInt(1) == -1;
                let tokenId: Int = operation.loadUint(16);
                let isLong: Bool = operation.loadInt(1) == -1;
                let marginDelta: Int = operation.loadCoins();
                let sizeDelta: Int = operation.loadCoins();
                let triggerPrice: Int = operation.loadUint(128);
                let requestTime: Int = operation.loadUint(32);

                let tpSl: Slice = operation.loadRef().asSlice();
                let tpSize: Int = tpSl.loadCoins();
                let tpPrice: Int = tpSl.loadUint(128);
                let slSize: Int = tpSl.loadCoins();
                let slPrice: Int = tpSl.loadUint(128);

                self.handleCreateIncreasePerpOrder(msg.query_id, msg.amount, msg.sender, executionFee, isMarket, tokenId, isLong, marginDelta, 
                    sizeDelta, triggerPrice, tpSize, tpPrice, slSize, slPrice, requestTime);
            } else {
                self.notify(JettonTransfer{
                    query_id: msg.query_id,
                    amount: msg.amount,
                    destination: msg.sender,
                    response_destination: msg.sender,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: emptySlice()}.toCell()
                );
            }
        } else {
            let operation: Slice = msg.forward_payload.loadRef().asSlice();
            let tlpDelta: Int = operation.loadCoins();
            let executionFee: Int = operation.loadCoins();
            self.handleCreateDecreaseLiquidityOrder(msg.query_id, msg.amount, msg.sender, executionFee, tlpDelta);
        }

    }

    /**
     * Refunds the specified amount of jetton to the specified address.
     * 
     * @param query_id The ID of the query.
     * @param amount The amount of jetton to refund.
     * @param to The address to refund the jetton to.
     * @param destination The optional address to specify as the response destination.
     */
    fun refundJetton(jettonWallet: Address, query_id: Int, amount: Int, to: Address, destination: Address?) {
        if (amount > 0) {
            send(SendParameters{
                to: jettonWallet, 
                value: self.gasTransferJetton,
                mode: SendIgnoreErrors, 
                bounce: false,
                body: JettonTransfer{
                    query_id: query_id,
                    amount: amount,
                    destination: to,
                    response_destination: destination,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: emptySlice()
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
        let ctx: Context = context();
        let tonBalanceBeforeMsg: Int = myBalance() - self.totalExecutionFee + executionFeeDelta - ctx.value;
        tonBalanceBeforeMsg = max(0, tonBalanceBeforeMsg);
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        let extraValue: Int = max(0, tonBalanceBeforeMsg - self.minTonsForStorage);
        let gasConsumption: Int = orderType == ORDER_TYPE_LP ? self.lpGasConsumption : self.perpGasConsumption;
        return ctx.value - storageFee - gasConsumption * executionMultiple + extraValue - 
            (executionFeeDelta > 0 ? executionFeeDelta : 0) - (transferJetton ? self.gasTransferJetton : 0);
    }

    /**
     * Refunds the excess ton tokens to the specified address.
     * 
     * @param orderType The type of the order.
     * @param to The address to which the excess ton tokens will be refunded.
     * @param executionFeeDelta The execution fee jettonDelta.
     * @param executionMultiple The execution multiple.
     * @param transferJetton A boolean value indicating whether to transfer jetton.
     */
    fun refundExceedTon(orderType: Int, to: Address, executionFeeDelta: Int, executionMultiple: Int, transferJetton: Bool) {
        let refundValue: Int = self.exceedGas(orderType, executionFeeDelta, executionMultiple, transferJetton);
        if (refundValue > 0) {
            send(SendParameters{ to: to, value: refundValue, mode: SendIgnoreErrors });
        }
    }

    /**
     * Calculates the total gas consumption for a given order type.
     *
     * @param orderType The type of the order (0 for LP order, 1 for Perp order).
     * @return The total gas consumption, including forward fee, gas consumption, and minimum tons for storage.
     */
    fun getPoolGas(orderType: Int): Int {
        return self.minTonsForStorage + (orderType == ORDER_TYPE_LP ? self.poolLpGasConsumption : self.poolPerpGasConsumption);
    }

    // ======================================================== LP ======================================================== //
    /**
     * Handles the creation of an increase LP position order.
     *
     * @param query_id The ID of the query.
     * @param jettonFromAmount The amount of jetton sender which the order is created.
     * @param account The address of the account creating the order.
     * @param executionFee The execution fee for the order.
     * @param tlpDelta The change in liquidity for the order.
     */
    fun handleCreateIncreaseLiquidityOrder(query_id: Int, jettonFromAmount: Int, account: Address, executionFee: Int, jettonDelta: Int) {
        let ctx: Context = context();

        let refundComment: String = "";
        let refund: Bool = false;
        if (ctx.value < executionFee + self.lpGasConsumption) {
            refund = true;
            refundComment = "gas not enough";
        }

        if (jettonFromAmount < jettonDelta) {
            refund = true;
            refundComment = "jetton not enough";
        }

        if (executionFee < self.lpMinExecutionFee) {
            refund = true;
            refundComment = "execution fee not enough";
        }

        // need refund
        if (refund) {
            self.refundJetton(self.jettonWallet, query_id, jettonFromAmount, account, account);
            self.forward(account, refundComment.asComment(), true, null);
            return;
        }

        // add new order
        let orderId: Int = self.liquidityOrderIndexNext;
        self.liquidityOrderIndexNext += 1;
        self.liquidityOrders.set(orderId, LiquidityOrder{
            isIncrease: true,
            account: account,
            jettonDelta: jettonDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            executionFeeReceiver: account,
            lastOperator: null
        });
        self.totalExecutionFee += executionFee;

        // event
        emit(LiquidityOrderCreatedEvent{
            opType: ORDER_OP_TYPE_INCREASE,
            account: account,
            jettonDelta: jettonDelta,
            executionFee: executionFee,
            orderId: orderId,
            trxId: query_id
        }.toCell());

        self.refundExceedTon(ORDER_TYPE_LP, account, executionFee, 1, false);
    }

    /**
     * Receive function for creating a decrease LP position order.
     *
     * @param msg The CreateDecreaseLPPositionOrder message containing the order details.
     */
    fun handleCreateDecreaseLiquidityOrder(query_id: Int, jettonFromAmount: Int, account: Address, executionFee: Int, tlpDelta: Int) {
        //check sender
        require(self.lpExecutors.get(account) != null, "invalid sender");

        let ctx: Context = context();
        // check gas
        require(ctx.value - executionFee >= self.lpGasConsumption, "gas not enough");
        // check execution fee
        require(executionFee >= self.lpMinExecutionFee, "execution fee not enough");

        // add new order
        let orderId: Int = self.liquidityOrderIndexNext;
        self.liquidityOrderIndexNext += 1;
        self.liquidityOrders.set(orderId, LiquidityOrder{
            isIncrease: false,
            account: account,
            jettonDelta: tlpDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false,
            executionFeeReceiver: account,
            lastOperator: null
        });

        self.totalExecutionFee += executionFee;

        // event
        emit(LiquidityOrderCreatedEvent{
            opType: ORDER_OP_TYPE_DECREASE,
            account: account,
            jettonDelta: tlpDelta,
            executionFee: executionFee,
            orderId: orderId,
            trxId: query_id
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_LP, account, executionFee, 1, false);
    }

    /**
     * This function is called when a CancelLiquidityOrder message is received.
     * It cancels a liquidity position order and performs various checks and operations.
     *
     * @param msg The CancelLiquidityOrder message containing the order ID and other parameters.
     */
    receive(msg: CancelLiquidityOrder) {
        let ctx: Context = context();
         // check gas, addLiquidity and decreaseLiquidity all need transfer gas.
        require(ctx.value >= self.lpGasConsumption + self.gasTransferJetton, "gas not enough");

        // get order
        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LiquidityOrder = orderOpt!!;

        // check order
        require(!order.isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = self.executors.get(ctx.sender) != null;
        require(isExecutor || ctx.sender == order.account, "invalid sender");

        // trader cancel must after orderLockTime
        if (!isExecutor) {
            require(order.blockTime + self.orderLockTime <= now(), "too early");
        }

        // delete order
        self.liquidityOrders.del(msg.orderId);

        self.refundJetton(order.isIncrease ? self.jettonWallet : self.tlpWallet, msg.trxId, order.jettonDelta, order.account, ctx.sender);

        // transfer execution fee
        let executionFeeReceiver: Address = msg.executionFeeReceiver != null ? msg.executionFeeReceiver!! : ctx.sender;
        if (order.executionFee > 0) {
            send(SendParameters{ to: executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors });
            self.totalExecutionFee -= order.executionFee;
        }

        // event
        emit(LiquidityOrderCancelledEvent{
            opType: order.isIncrease ? ORDER_OP_TYPE_INCREASE : ORDER_OP_TYPE_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_LP, ctx.sender, -order.executionFee, 1, order.isIncrease);
    }

    /**
     * This function is called when executing an LP position order.
     * It performs various checks and updates the order accordingly.
     * 
     * @param msg The ExecuteLiquidityOrder message containing the order details.
     */
    receive(msg: ExecuteLiquidityOrder) {
        // check gas
        let ctx: Context = context();
       
        // get order
        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: LiquidityOrder = orderOpt!!;

        let estimateGas: Int = self.lpGasConsumption * 2 + ctx.readForwardFee() + self.getPoolGas(ORDER_TYPE_LP) + self.gasTransferJetton;
        if(!order.isIncrease){
            // burn tlp + transfer jetton
            estimateGas += self.gasTransferJetton;
        }
        require(ctx.value >= estimateGas, "gas not enough");


        // check order
        require(!order.isPending, "order is pending");

        // check sender
        require(self.executors.get(ctx.sender) != null, "invalid sender");

        // update order
        order.executionFeeReceiver = msg.executionFeeReceiver != null ? msg.executionFeeReceiver!! : ctx.sender;
        order.lastOperator = ctx.sender;
        order.isPending = true;
        self.liquidityOrders.set(msg.orderId, order);

        // send update position msg
        send(SendParameters{
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            body: UpdateLiquidityPool {
                isIncrease: order.isIncrease,
                orderId: msg.orderId,
                trxId: msg.trxId,
                account: order.account,
                jettonDelta: order.jettonDelta,
                prices: msg.prices,
                lpFundingFeeGrowth: msg.lpFundingFeeGrowth,
                rolloverFeeGrowth: msg.rolloverFeeGrowth
            }.toCell()
        });
    }

    /**
     * This function is triggered when an LP position update is successful.
     * It performs various checks and operations related to the LP position order.
     * 
     * @param msg The LiquidityPoolUpdated message containing the order ID, transaction ID, and received amount.
     */
    receive(msg: LiquidityPoolUpdated) {
        let ctx: Context = context();
        require(ctx.sender == self.pool, "invalid sender");
        // get order
        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LiquidityOrder = orderOpt!!;

        if(!msg.isIncrease) {
            // burn tlp
            require(ctx.value >= self.lpGasConsumption + self.gasForBurnTlp + self.gasTransferJetton, "gas not enough");
            send(SendParameters{
                to: self.tlpWallet,
                value: self.gasForBurnTlp,
                mode: SendIgnoreErrors,
                bounce: false,
                body: JettonBurn{ query_id: msg.trxId, amount: msg.tlpDelta, response_destination: order.account, custom_payload: null }.toCell()
            });
            //transfer jetton
            self.refundJetton(self.jettonWallet, msg.trxId, msg.jettonDelta, order.account, order.lastOperator);
        }

        // delete order
        self.liquidityOrders.del(msg.orderId);
    
        // transfer execution fee
        if (order.executionFee > 0) {
            send(SendParameters{ to: order.executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors});
            self.totalExecutionFee -= order.executionFee;
        }

        // event
        emit(LiquidityOrderExecutedEvent{
            opType: order.isIncrease ? ORDER_OP_TYPE_INCREASE : ORDER_OP_TYPE_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer excess gas
        if (order.lastOperator != null) {
            self.refundExceedTon(ORDER_TYPE_LP, order.lastOperator!!, -order.executionFee, 1, true);
        }
    }

    /**
     * This function is called when a transaction is bounced, indicating that an update to an LP position order has failed.
     * It retrieves the LP position order associated with the bounced transaction and updates its pending status.
     * If the order has a last operator, it sends a zero-value transaction to the last operator.
     * 
     * @param src The bounced transaction containing the order ID.
     */
    bounced(src: bounced<UpdateLiquidityPool>) {

        // get order
        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(src.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: LiquidityOrder = orderOpt!!;

        // update pending
        order.isPending = false;
        self.liquidityOrders.set(src.orderId, order);

        if (order.lastOperator != null) {
            send(SendParameters{ to: order.lastOperator!!, value: 0, mode: SendIgnoreErrors | SendRemainingValue});
        }
    }

    /**
     * Retrieves the LiquidityOrderData for the specified order ID.
     * 
     * @param orderId The ID of the order to retrieve.
     * @return The LiquidityOrderData object containing the next index and the LPPositionOrder associated with the order ID.
     */
    get fun liquidityOrder(orderId: Int): LiquidityOrderData {
        return LiquidityOrderData{
            liquidityOrderIndexNext: self.liquidityOrderIndexNext,
            liquidityOrder: self.liquidityOrders.get(orderId)
        };
    }

    // ======================================================== Perp ======================================================== //
    /**
     * Handles the creation and increase of a perpetual position order.
     * 
     * @param query_id The unique identifier for the order.
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
    fun handleCreateIncreasePerpOrder(query_id: Int, jettonFromAmount: Int, account: Address, executionFee: Int, isMarket: Bool,
        tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, triggerPrice: Int, tpSize: Int, tpPrice: Int, slSize: Int, slPrice: Int, requestTime: Int) {
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
            self.refundJetton(self.jettonWallet, query_id, jettonFromAmount, account, account);
            self.forward(account, refundComment.asComment(), true, null);
            return;
        }

        // add new order
        let opType: Int = isMarket ? ORDER_OP_TYPE_INCREASE_MARKET : ORDER_OP_TYPE_INCREASE_LIMIT;
        self.createPerpOrder(query_id, opType, account, tokenId, isLong, marginDelta, sizeDelta, triggerPrice, 
            tpSize, tpPrice, slSize, slPrice, executionFee / executionFeeMultiple, requestTime);

        self.totalExecutionFee += executionFee;

        self.refundExceedTon(ORDER_TYPE_PERP, account, executionFee, 1, false);
    }

    /**
     * Receive function for creating a decrease perpetual position order.
     * 
     * @param msg The CreateDecreasePerpOrder message containing the order details.
     */
    receive(msg: CreateDecreasePerpOrder) {
        self.requireNotStopped();

        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.perpGasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.perpMinExecutionFee, "execution fee not enough");

        // add new order
        self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_MARKET, ctx.sender, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.triggerPrice, 
                0, 0, 0, 0, msg.executionFee, msg.requestTime);

        self.totalExecutionFee += msg.executionFee;

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, ctx.sender, msg.executionFee, 1, false);
    }

    /**
     * @dev This function is called when receiving a CreateTpSlPerpOrder message.
     * It performs various checks on gas and execution fee, creates take profit (tp) and stop loss (sl) orders if necessary,
     * updates the total execution fee, and transfers excess gas.
     * @param msg The CreateTpSlPerpOrder message containing the necessary information for creating tp/sl orders.
     */
    receive(msg: CreateTpSlPerpOrder) {
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
            self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_TP, ctx.sender, msg.tokenId, msg.isLong, 0, msg.tpSize, msg.tpPrice, 
                0, 0, 0, 0, msg.executionFee / executionFeeMultiple, msg.requestTime);
        }

        if (msg.slSize > 0 && msg.slPrice > 0) {
            self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_SL, ctx.sender, msg.tokenId, msg.isLong, 0, msg.slSize, msg.slPrice, 
                0, 0, 0, 0, msg.executionFee / executionFeeMultiple, msg.requestTime);
        }

        self.totalExecutionFee += msg.executionFee;

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, ctx.sender, msg.executionFee, executionFeeMultiple, false);
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
        tpSize: Int, tpPrice: Int, slSize: Int, slPrice: Int, executionFee: Int, requestTime: Int): Int {
        let triggerAbove: Bool = false;

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;

        if (opType == ORDER_OP_TYPE_INCREASE_MARKET || opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            // increase for long order, must trigger below the price
            triggerAbove = !isLong;
            if ((tpSize > 0 && tpPrice > 0) || (slSize > 0 && slPrice > 0)) {
                self.perpOrderExs.set(orderId, PerpOrderEx{ tpSize, tpPrice, slSize, slPrice, executionFee });
            }
        } else {
            if (opType == ORDER_OP_TYPE_DECREASE_MARKET) {
                // decrease for long market order, must trigger above the price
                triggerAbove = isLong;
            } else {
                // tp for long limit order, must trigger above the price
                triggerAbove = (opType == ORDER_OP_TYPE_DECREASE_TP ? isLong : !isLong);
            }
        }

        let blockTime: Int = now();
        self.perpOrders.set(orderId, PerpOrder{
            opType: opType,
            tokenId: tokenId,
            account: account,
            isLong: isLong,
            marginDelta: marginDelta,
            sizeDelta: sizeDelta,
            triggerPrice: triggerPrice,
            triggerAbove: triggerAbove,
            executionFee: executionFee,
            blockTime: blockTime,
            isPending: false,
            executionFeeReceiver: account,
            lastOperator: null
        });

        // event
        emit(PerpOrderCreatedEvent{
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
            blockTime: blockTime,
            requestTime: requestTime,
            trxId: trxId
        }.toCell());
        return orderId;
    }

    /**
     * This function is called when a CancelPerpOrder message is received.
     * It cancels a perpetual position order and performs various checks and operations.
     * 
     * @param msg The CancelPerpOrder message containing the order ID and other parameters.
     */
    receive(msg: CancelPerpOrder) {
        let ctx: Context = context();
        // check order
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: PerpOrder = orderOpt!!;

        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.perpGasConsumption + self.gasTransferJetton, "gas not enough");
        } else {
            require(ctx.value >= self.perpGasConsumption, "gas not enough");
        }

        // check order
        require(!order.isPending, "order is pending");

        // executor or trader
        let isExecutor: Bool = self.executors.get(ctx.sender) != null;
        require(isExecutor || ctx.sender == order.account, "invalid sender");
        
        // trader cancel market order must after orderLockTime
        if (!isExecutor && (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_DECREASE_MARKET)) {
            require(order.blockTime + self.orderLockTime <= now(), "too early");
        }

        // get fee receiver
        let executionFeeReceiver: Address = msg.executionFeeReceiver == null ? ctx.sender : msg.executionFeeReceiver!!;

        let executionFee: Int = 0;
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            let orderExOpt: PerpOrderEx? = self.perpOrderExs.get(msg.orderId);
            if (orderExOpt != null) {
                let orderEx: PerpOrderEx = orderExOpt!!;
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
                    send(SendParameters{ to: order.account, value: tpSlExecutionFee, mode: SendIgnoreErrors });
                    executionFee += tpSlExecutionFee;
                }

                // delete
                self.perpOrderExs.del(msg.orderId);
            }

            // transfer jetton
            self.refundJetton(self.jettonWallet, msg.trxId, order.marginDelta, order.account, ctx.sender);
        }

        // delete order
        self.perpOrders.del(msg.orderId);

        // transfer execution fee
        // self.transferExecutionFee(executionFeeReceiver, order.executionFee);
        if (order.executionFee > 0) {
            send(SendParameters{ to: executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors });
            executionFee += order.executionFee;
        }
        self.totalExecutionFee -= executionFee;

        // event
        emit(PerpOrderCancelledEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, ctx.sender, -executionFee, 1, order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT);
    }


    /**
     * Receives and executes a perpetual position order.
     * 
     * @param msg The ExecutePerpOrder message containing the order details.
     */
    receive(msg: ExecutePerpOrder) {
        let ctx: Context = context();

        // check order
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: PerpOrder = orderOpt!!;
             // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.perpGasConsumption * 2 + ctx.readForwardFee() + self.getPoolGas(ORDER_TYPE_PERP), "gas not enough");
        } else {
            require(ctx.value >= self.perpGasConsumption * 2 + ctx.readForwardFee() + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");
        }

        // check order
        require(!order.isPending, "order is pending");
        require(msg.tokenId == order.tokenId, "token not match");

        // check sender
        require(self.executors.get(ctx.sender) != null, "invalid sender");

        // update order
        order.executionFeeReceiver = msg.executionFeeReceiver == null ? ctx.sender : msg.executionFeeReceiver!!;
        order.lastOperator = ctx.sender;
        order.isPending = true;
        self.perpOrders.set(msg.orderId, order);

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
                premiumRate: msg.premiumRate,
                fundingFeeGrowth: msg.fundingFeeGrowth,
                rolloverFeeGrowth: msg.rolloverFeeGrowth
            }.toCell()
        });
    }

    /**
     * This function is called when a successful update is made to a perpetual position order.
     * It performs various checks and actions based on the type of order and the received message.
     * 
     * @param msg The PerpPositionUpdated message containing the order ID and transaction ID.
     */
    receive(msg: PerpPositionUpdated) {
        let ctx: Context = context();
        require(sender() == self.pool, "invalid sender");

        // get order
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: PerpOrder = orderOpt!!;

        let executionFee: Int = 0;
        let executionFeeMultiple: Int = 1;
        // check gas
        if (order.opType == ORDER_OP_TYPE_INCREASE_MARKET || order.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            require(ctx.value >= self.perpGasConsumption, "gas not enough");
            // create tp sl
            let orderExOpt: PerpOrderEx? = self.perpOrderExs.get(msg.orderId);
            if (orderExOpt != null) {
                let orderEx: PerpOrderEx = orderExOpt!!;
                // create tp/sl
                if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                    executionFeeMultiple += 1;
                    self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_TP, sender(), order.tokenId, order.isLong, 0, orderEx.tpSize, orderEx.tpPrice, 
                        0, 0, 0, 0, orderEx.executionFee, now());
                }

                if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                    executionFeeMultiple += 1;
                    self.createPerpOrder(msg.trxId, ORDER_OP_TYPE_DECREASE_SL, sender(), order.tokenId, order.isLong, 0, orderEx.slSize, orderEx.slPrice, 
                        0, 0, 0, 0, orderEx.executionFee, now());
                }
                // delete
                self.perpOrderExs.set(msg.orderId, null);
            }
        } else {
            require(ctx.value >= self.perpGasConsumption + self.gasTransferJetton, "gas not enough");
        }

        // delete order
        self.perpOrders.set(msg.orderId, null);

        // transfer jetton
        if (msg.payout > 0) {
            if (order.opType == ORDER_OP_TYPE_LIQUIDATION) {
                self.refundJetton(self.jettonWallet, msg.trxId, msg.payout, order.executionFeeReceiver, order.lastOperator);
            } else {
                self.refundJetton(self.jettonWallet, msg.trxId, msg.payout, order.account, order.lastOperator);
            }
        }

        // event
        emit(PerpOrderExecutedEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        // transfer execution fee
        if (order.executionFee > 0) {
            send(SendParameters{ to: order.executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors});
            self.totalExecutionFee -= order.executionFee;
        }

        // transfer execess gas
        self.refundExceedTon(ORDER_TYPE_PERP, order.lastOperator!!, -order.executionFee, executionFeeMultiple, msg.payout > 0);
    }

    /**
     * Handles the bounced event for an UpdatePerpPosition.
     * If the order is a liquidation order, it is deleted sender the perpOrders mapping.
     * Otherwise, the order's isPending flag is set to false.
     * If the order has a lastOperator, a send transaction is triggered to the lastOperator with a value of 0.
     */
    bounced(src: bounced<UpdatePerpPosition>) {
        // get order
        let orderOpt: PerpOrder? = self.perpOrders.get(src.orderId);
        if (orderOpt == null) {
            return;
        }
        let order: PerpOrder = orderOpt!!;
        if (order.opType == ORDER_OP_TYPE_LIQUIDATION) {
            // delete
            self.perpOrders.set(src.orderId, null);
        } else {
            // update pending
            order.isPending = false;
            self.perpOrders.set(src.orderId, order);
        }
        if (order.lastOperator != null) {
            send(SendParameters{ to: order.lastOperator!!, value: 0, mode: SendIgnoreErrors | SendRemainingValue });
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
        let ctx: Context = context();
        require(ctx.value >= self.perpGasConsumption * 2 + ctx.readForwardFee() + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");

        // check sender
        require(self.executors.get(ctx.sender) != null, "invalid sender");

        // fee receiver
        let liquidationFeeReceiver: Address = msg.liquidationFeeReceiver != null ? msg.liquidationFeeReceiver!! : ctx.sender;

        // add new order
        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{
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
            lastOperator: ctx.sender
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
                premiumRate: msg.premiumRate,
                fundingFeeGrowth: msg.fundingFeeGrowth,
                rolloverFeeGrowth: msg.rolloverFeeGrowth
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
        let ctx: Context = context();
        require(ctx.value >= self.perpGasConsumption * 2 + ctx.readForwardFee() + self.getPoolGas(ORDER_TYPE_PERP) + self.gasTransferJetton, "gas not enough");

        // check sender
        require(self.executors.get(ctx.sender) != null, "invalid sender");

        // add new order
        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{
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
            executionFeeReceiver: ctx.sender,
            lastOperator: ctx.sender
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
                premiumRate: msg.premiumRate,
                fundingFeeGrowth: msg.fundingFeeGrowth,
                rolloverFeeGrowth: msg.rolloverFeeGrowth
            }.toCell()
        });
    }

    /**
     * Retrieves the PerpOrderData for the specified order ID.
     * 
     * @param orderId: The ID of the order to retrieve.
     * @return The PerpOrderData object containing the next index, order details, and extended order details.
     */
    get fun perpOrder(orderId: Int): PerpOrderData {
        return PerpOrderData{
            perpOrderIndexNext: self.perpOrderIndexNext,
            perpOrder: self.perpOrders.get(orderId),
            perpOrderEx: self.perpOrderExs.get(orderId)
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
                to: self.jettonWallet, 
                value: self.gasTransferJetton,
                mode: SendRemainingValue | SendIgnoreErrors, 
                bounce: false,
                body: JettonTransfer{
                    query_id: msg.trxId,
                    amount: msg.amount,
                    destination: msg.feeReceiver,
                    response_destination: msg.feeReceiver,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().storeUint(0, 1).endCell().asSlice()
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
                self.liquidityOrders.set(compensate.orderId, null);
            } else {
                self.perpOrders.set(compensate.orderId, null);
                self.perpOrderExs.set(compensate.orderId, null);
            }
        }

        // refund
        if (compensate.refundReceiver != null && compensate.refundAmount > 0) {
            // transfer jetton
            self.refundJetton(self.jettonWallet, compensate.trxId, compensate.refundAmount, compensate.refundReceiver!!, sender());
        }

        // transfer execution fee
        // self.transferExecutionFee(msg.executionFeeReceiver, msg.executionFee);
        if (compensate.executionFeeReceiver != null && compensate.executionFee > 0) {
            send(SendParameters{ to: compensate.executionFeeReceiver!!, value: compensate.executionFee, mode: SendIgnoreErrors });
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

}
