import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";
import "./upgrade";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract Pool with Deployable, Resumable {

    owner: Address;
    stopped: Bool = false;
    
    // config
    orderLockTime: Int as uint32 = 3 * 60;
    maxLpNetCap: Int as coins = 0;
    lpRolloverFeeRate: Int as uint32 = 0;
    
    gasForPerpTrader: Int as coins = ton("0.08");
    gasForPerpExecutor: Int as coins = ton("0.08");
    gasForLpTrader: Int as coins = ton("0.08");
    gasForLpExecutor: Int as coins = ton("0.08");
    gasForTransferJetton: Int as coins = ton("0.08"); // estimated gas of transfer jetton
    gasForBurnTlp: Int as coins = ton("0.08"); // estimated gas of burn TLP
    gasForMintTlp: Int as coins = ton("0.01"); // estimated gas of mint TLP
    lpMinExecutionFee: Int as coins = ton("0.05"); // fee for every operation
    perpMinExecutionFee: Int as coins = ton("0.1"); // fee for every operation
    minTonsForStorage: Int as coins = ton("0.01"); // min storage gas

    tlpJetton: Address = newAddress(0, 0);// TLP address
    tlpWallet: Address = newAddress(0, 0); // TLP jetton wallet address
    jettonWallet: Address = newAddress(0, 0); //USDT jetton wallet address

    compensator: Address = newAddress(0, 0);
    claimer: Address = newAddress(0, 0);
    executors: map<Address, Bool>; // only contains enabled executors, so values are always true

    tokenConfigs: map<Int as uint16, TokenConfig>; // tokenId => tokenConfig

    // data
    liquidityOrders: map<Int as uint64, LiquidityOrder>; // orderId => order
    liquidityOrderIndexNext: Int as uint64 = 1;

    perpOrders: map<Int as uint64, PerpOrder>; // orderId => order
    perpOrderExs: map<Int as uint64, PerpOrderEx>; // orderId => orderEx
    perpOrderIndexNext: Int as uint64 = 1;

    compensates: map<Int as uint64, Compensate>; // id => compensate
    compensateIndexNext: Int as uint64 = 1;

    perpPositionIndexNext: Int as uint64 = 1;
    perpPositions: map<Int as uint16, AccountPerpPosition>; // tokenId => user => direction => position

    globalLPPositions: map<Int as uint16, GlobalLPPosition>; // tokenId => globalLP
    globalPositions: map<Int as uint16, GlobalPosition>; // tokenId => globalPosition

    tlpSupply: Int as coins = 0;
    totalExecutionFee: Int as coins = 0; // total execution fee of all pending orders
    protocolTradingFee: Int as coins = 0; // protocol trading fee of tradoor.io

    globalLPFund: Int as int128 = 0;
    globalLPUnrealizedPnl: Int as int128 = 0;

    globalLpFundingFeeGrowth: Int as coins = 0;
    globalRolloverFeeGrowth: Int as coins = 0;

    /**
     * Initializes the contract.
     * @param deployId The deployment ID.
     */
    init(deployId: Int) {
        self.owner = sender();
    }

    /**
     * @dev Update the configuration of the contract.
     * @param msg The UpdateConfig message containing the new configuration values.
     */
    receive(msg: UpdateConfig) {
        self.requireOwner();
        self.orderLockTime = msg.orderLockTime!!;
        self.maxLpNetCap = msg.maxLpNetCap!!;
        self.lpRolloverFeeRate = msg.lpRolloverFeeRate!!;

        // contract
        let contractConfig: ContractConfig? = msg.contractConfig;
        if (contractConfig != null) {
            self.tlpJetton = contractConfig!!.tlpJetton; 
            self.tlpWallet = contractConfig!!.tlpWallet;
            self.jettonWallet = contractConfig!!.jettonWallet;
        }

        // executors
        let executorConfig: ExecutorConfig? = msg.executorConfig;
        if (executorConfig != null) {
            let executors: map<Address, Bool> = executorConfig!!.executors;
            foreach (executor,enable in executors) {
                self.executors.set(executor, enable? true : null);
            }
            self.compensator = executorConfig!!.compensator;
            self.claimer = executorConfig!!.claimer;
        }

        // gas
        let gasConfig: GasConfig? = msg.gasConfig;
        if (gasConfig != null) {
            self.gasForPerpTrader = gasConfig!!.gasForPerpTrader;
            self.gasForPerpExecutor = gasConfig!!.gasForPerpExecutor;
            self.gasForLpTrader = gasConfig!!.gasForLpTrader;
            self.gasForLpExecutor = gasConfig!!.gasForLpExecutor;
            self.minTonsForStorage = gasConfig!!.minTonsForStorage;
            self.gasForTransferJetton = gasConfig!!.gasForTransferJetton;
            self.lpMinExecutionFee = gasConfig!!.lpMinExecutionFee;
            self.perpMinExecutionFee = gasConfig!!.perpMinExecutionFee;
            self.gasForBurnTlp = gasConfig!!.gasForBurnTlp;
            self.gasForMintTlp = gasConfig!!.gasForMintTlp;
        }

        self.reply("config updated".asComment());
    }

    /**
     * @dev Update the content of the TLP jetton.
     */
    receive(msg: JettonUpdateContent) {
        self.requireOwner();
        self.forward(self.tlpJetton, msg.toCell(), true, null);
    }

    /**
     * @dev List/Update a token.
     * @param msg The ListToken message containing the token ID and config.
     */
    receive(msg: ListToken) {
        self.requireOwner();
        self.tokenConfigs.set(msg.tokenId, msg.config);
        self.reply("token listed".asComment());
    }

    /**
     * @dev Delist a token after it has no orders or positions. but in this function, the orders are not checked.
     * @param msg The DelistToken message containing the token ID.
     */
    receive(msg: DelistToken) {
        self.requireOwner();
        let position: GlobalPosition? = self.globalPositions.get(msg.tokenId);
        if (position != null) {
            require(position!!.longSize + position!!.shortSize == 0, "token cannot be delisted");
        }
        self.tokenConfigs.del(msg.tokenId);
        self.globalPositions.del(msg.tokenId);
        self.globalLPPositions.del(msg.tokenId);
        self.perpPositions.del(msg.tokenId);
        self.reply("token delisted".asComment());
    }

    /**
     * @dev Claim the protocol trading fee.
     * @param msg The ClaimProtocolFee message containing the transaction ID and fee receiver.
     */
    receive(msg: ClaimProtocolFee) {
        require(sender() == self.claimer, "invalid sender");
        require(self.protocolTradingFee > 0, "no enough jettons to claim");
        send(SendParameters{
                to: self.jettonWallet, 
                value: 0,
                mode: SendRemainingValue | SendIgnoreErrors, 
                bounce: false,
                body: JettonTransfer{
                    query_id: msg.trxId,
                    amount: self.protocolTradingFee,
                    destination: msg.feeReceiver,
                    response_destination: msg.feeReceiver,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().storeUint(0, 1).endCell().asSlice()
                }.toCell()
            });
        self.protocolTradingFee = 0;
    }

    // ======================================================== Token ======================================================== //
    /**
     * receive TON coin transfers to the contract
     */
    receive() {}

    /**
     * receive TON jetton transfers to the contract
     * It handles incoming JettonTransferNotification messages and performs various operations based on the message's payload.
     * If the sender is neither the contract's USDT wallet nor the contract's TLP wallet, the jetton will be transferred to the sender.
     * If the contract is stopped, it refunds the token and sends a bounce message to the sender indicating that order creation is stopped.
     * If the operation code is OP_CREATE_INCREASE_LP_POSITION_ORDER, it handles the creation of an increase LP position order.
     * If the operation code is OP_CREATE_INCREASE_PERP_POSITION_ORDER, it handles the creation of an increase perpetual position order.
     * If the operation code is not recognized, it refunds the token to the sender.
     * @param msg the jetton transfer notification message 
     */
    receive(msg: JettonTransferNotification) {
        // just refund other token
        if (sender() != self.jettonWallet && sender() != self.tlpWallet) {
            self.refundJetton(msg.query_id, msg.amount, msg.sender, msg.sender);
            return;
        }
        if (self.stopped || msg.forward_payload.loadUint(1) != 1) {
            self.refundJetton(msg.query_id, msg.amount, msg.sender, msg.sender);
            return;
        }
        if (sender() == self.tlpWallet ) {
            let operation: Slice = msg.forward_payload.loadRef().asSlice();
            let executionFee: Int = operation.loadCoins();
            self.createLiquidityOrder(msg.query_id, false, msg.sender, executionFee, msg.amount);
            return;
        }
        let operation: Slice = msg.forward_payload.loadRef().asSlice();
        let opCode: Int = operation.loadUint(8);
        if (opCode == OP_CREATE_INCREASE_LP_POSITION_ORDER) {
            let executionFee: Int = operation.loadCoins();
            self.createLiquidityOrder(msg.query_id, true, msg.sender, executionFee, msg.amount);
        } else if (opCode == OP_CREATE_INCREASE_PERP_POSITION_ORDER) {
            let marginDelta: Int = msg.amount;
            let executionFee: Int = operation.loadCoins();
            let isMarket: Bool = operation.loadInt(1) == -1;
            let tokenId: Int = operation.loadUint(16);
            let isLong: Bool = operation.loadInt(1) == -1;
            
            let sizeDelta: Int = operation.loadCoins();
            let triggerPrice: Int = operation.loadUint(128);
            let requestTime: Int = operation.loadUint(32);

            let tpSl: Slice = operation.loadRef().asSlice();
            let tpSize: Int = tpSl.loadCoins();
            let tpPrice: Int = tpSl.loadUint(128);
            let slSize: Int = tpSl.loadCoins();
            let slPrice: Int = tpSl.loadUint(128);

            self.createIncreasePerpOrder(msg.query_id, msg.sender, executionFee, isMarket, tokenId, isLong, marginDelta, 
                sizeDelta, triggerPrice, tpSize, tpPrice, slSize, slPrice, requestTime);
        } else {
            self.refundJetton(msg.query_id, msg.amount, msg.sender, msg.sender);
        }
    }

    fun refundJetton(query_id: Int, amount: Int, destination: Address, response_destination: Address?) {
        if (amount > 0) {
            send(SendParameters{
                to: sender(),
                value: 0,
                mode: SendIgnoreErrors | SendRemainingValue,
                bounce: false,
                body: JettonTransfer{
                    query_id: query_id,
                    amount: amount,
                    destination: destination,
                    response_destination: response_destination,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().storeUint(0, 1).endCell().asSlice()
                }.toCell()
            });
        }
    }

    /**
     * Transfer the specified amount of jetton to the specified address.
     * 
     * @param query_id The ID of the query.
     * @param amount The amount of jetton to refund.
     * @param destination The address to refund the jetton to.
     * @param response_destination The optional address to specify as the response destination.
     */
    fun transferJetton(to: Address, query_id: Int, amount: Int, destination: Address, response_destination: Address?) {
        if (amount > 0) {
            send(SendParameters{
                to: to, 
                value: self.gasForTransferJetton,
                mode: SendIgnoreErrors, 
                bounce: false,
                body: JettonTransfer{
                    query_id: query_id,
                    amount: amount,
                    destination: destination,
                    response_destination: response_destination,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().storeUint(0, 1).endCell().asSlice()
                }.toCell()
            });
        }
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
    fun transferEstimatedRemainValue(gasConsumption: Int, to: Address, executionFeeDelta: Int, executionMultiple: Int, transferJetton: Bool) {
        let ctx: Context = context();
        let tonBalanceBeforeMsg: Int = myBalance() - self.totalExecutionFee + executionFeeDelta - ctx.value;
        tonBalanceBeforeMsg = max(0, tonBalanceBeforeMsg);
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        let extraValue: Int = self.executors.exists(ctx.sender)? 0 : max(0, tonBalanceBeforeMsg - self.minTonsForStorage);

        let refundValue: Int = ctx.value - storageFee - gasConsumption * executionMultiple + extraValue - 
            (executionFeeDelta > 0 ? executionFeeDelta : 0) - (transferJetton ? self.gasForTransferJetton : 0);

        if (refundValue > 0) {
            send(SendParameters{ to: to, value: refundValue, mode: SendIgnoreErrors });
        }
    }

    // ======================================================== LP ======================================================== //

    /**
     * Create a new liquidity order.
     * 
     * @param query_id The ID of the query.
     * @param isIncrease A boolean value indicating whether the order is increasing liquidity.
     * @param jettonFromAmount The amount of jetton to refund.
     * @param account The address of the account.
     * @param executionFee The execution fee.
     * @param jettonDelta Decreasing liquidity means the delta of TLP; Increasing liquidity means the delta of USDT.
     */
    fun createLiquidityOrder(query_id: Int, isIncrease: Bool, account: Address, executionFee: Int, jettonDelta: Int) {
        let ctx: Context = context();
        let wallet: Address = isIncrease ? self.jettonWallet : self.tlpWallet;
        if (executionFee < self.lpMinExecutionFee) {
            self.refundJetton(query_id, jettonDelta, account, account);
            return;
        }
        if( ctx.value < self.gasForLpTrader + executionFee) {
            self.refundJetton(query_id, jettonDelta, account, account);
            return;
        }

        let orderId: Int = self.liquidityOrderIndexNext;
        self.liquidityOrderIndexNext += 1;
        self.liquidityOrders.set(orderId, LiquidityOrder{
            isIncrease: isIncrease,
            account: account,
            jettonDelta: jettonDelta,
            executionFee: executionFee,
            blockTime: now(),
            isPending: false
        });

        self.totalExecutionFee += executionFee;

        emit(LiquidityOrderCreatedEvent{
            opType: isIncrease ? OP_TYPE_LP_INCREASE : OP_TYPE_LP_DECREASE,
            account: account,
            jettonDelta: jettonDelta,
            executionFee: executionFee,
            orderId: orderId,
            trxId: query_id
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForLpTrader, account, executionFee, 1, false);
    }

    /**
     * This function is called when a CancelLiquidityOrder message is received.
     * It cancels a liquidity position order and performs various checks and operations.
     *
     * @param msg The CancelLiquidityOrder message containing the order ID and other parameters.
     */
    receive(msg: CancelLiquidityOrder) {
        let ctx: Context = context();
         // check gas, incr Liquidity and decr Liquidity all cost transfer gas.
        require(ctx.value >= self.gasForLpTrader + self.gasForTransferJetton, "gas not enough");

        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: LiquidityOrder = orderOpt!!;

        require(!order.isPending, "order is pending");

        let isExecutor: Bool = self.executors.exists(ctx.sender);
        require(isExecutor || ctx.sender == order.account, "invalid sender");

        if (!isExecutor) {
            require(order.blockTime + self.orderLockTime <= now(), "too early to cancel");
        }

        self.liquidityOrders.del(msg.orderId);

        self.transferJetton(order.isIncrease ? self.jettonWallet : self.tlpWallet, msg.trxId, order.jettonDelta, order.account, ctx.sender);

        // transfer execution fee
        let executionFeeReceiver: Address = msg.executionFeeReceiver != null ? msg.executionFeeReceiver!! : ctx.sender;
        if (order.executionFee > 0) {
            send(SendParameters{ to: executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors });
            self.totalExecutionFee -= order.executionFee;
        }

        emit(LiquidityOrderCancelledEvent{
            opType: order.isIncrease ? OP_TYPE_LP_INCREASE : OP_TYPE_LP_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForLpTrader, ctx.sender, -order.executionFee, 1, true);
    }

    /**
     * This function is called when executing an liquidity order.
     * It performs various checks and updates the order accordingly.
     * 
     * @param msg The ExecuteLiquidityOrder message containing the order details.
     */
    receive(msg: ExecuteLiquidityOrder) {
        let ctx: Context = context();
        require(self.executors.exists(ctx.sender), "invalid sender");

        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");

        let order: LiquidityOrder = orderOpt!!;
        require(!order.isPending, "order is pending");

        let estimatedGas: Int = self.gasForLpExecutor;
        if(order.isIncrease){
            estimatedGas += self.gasForMintTlp;
            require(ctx.value >= estimatedGas, "gas not enough");
        }else{
            estimatedGas += self.gasForBurnTlp;
            require(ctx.value >= estimatedGas + self.gasForTransferJetton, "gas not enough");
        }

        order.isPending = true;
        self.liquidityOrders.set(msg.orderId, order);

        let prices: map<Int as uint16, Int as uint128> = msg.prices;
        let globalLPUnrealizedPnl: Int = 0;
        foreach ( tokenId,price in prices) {
            let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
            if (globalLPPositionOpt != null) {
                let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;
                globalLPUnrealizedPnl += globalLPPosition.netSize * (price - globalLPPosition.entryPrice) * (globalLPPosition.isLong ? 1 : -1) / PRICE_DECIMAL_FACTOR;
            }
        }
        self.globalLPUnrealizedPnl = globalLPUnrealizedPnl;

        // charge funding fee
        let lpFundingFeeGrowthDelta: Int = msg.lpFundingFeeGrowth - self.globalLpFundingFeeGrowth;
        self.globalLpFundingFeeGrowth = msg.lpFundingFeeGrowth;

        // charge rollover fee
        let rolloverFeeGrowthDelta: Int = msg.rolloverFeeGrowth - self.globalRolloverFeeGrowth;
        let lpRolloverFeeGrowthDelta: Int = rolloverFeeGrowthDelta * self.lpRolloverFeeRate / PERCENTAGE_BASIS_POINT;
        self.globalRolloverFeeGrowth = msg.rolloverFeeGrowth;

        self.globalLPFund += lpFundingFeeGrowthDelta + lpRolloverFeeGrowthDelta;
        self.protocolTradingFee += (rolloverFeeGrowthDelta - lpRolloverFeeGrowthDelta);

        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;
        let tlpPrice: Int = 0;
        let jettonDelta: Int = 0;
        let tlpDelta: Int = 0;
        if (order.isIncrease) {
            jettonDelta = order.jettonDelta; // usdt
            let availableQuota: Int = max(0, (self.maxLpNetCap - globalNetLP));
            require(jettonDelta <= availableQuota, "insufficient quota to supply");

            tlpPrice = self.tlpSupply == 0 ? PRICE_DECIMAL_FACTOR : (globalNetLP * JETTON_PRICE_DECIMAL_FACTOR / self.tlpSupply);
            tlpDelta = jettonDelta  * JETTON_PRICE_DECIMAL_FACTOR / tlpPrice; 

            send(SendParameters{
                to: self.tlpJetton, 
                value: self.gasForMintTlp,
                bounce: true,
                body: JettonMint{ origin: ctx.sender, receiver: order.account, amount: tlpDelta, custom_payload: null, forward_ton_amount: 0, forward_payload: emptySlice() }.toCell()
            });
            self.globalLPFund += jettonDelta;
            self.tlpSupply += tlpDelta;
        } else {
            tlpDelta = order.jettonDelta; // tlp
            tlpPrice = globalNetLP  * JETTON_PRICE_DECIMAL_FACTOR / self.tlpSupply;
            jettonDelta = tlpPrice * tlpDelta / JETTON_PRICE_DECIMAL_FACTOR;

            send(SendParameters{
                to: self.tlpWallet,
                value: self.gasForBurnTlp,
                bounce: true,
                body: JettonBurn{ query_id: msg.trxId, amount: tlpDelta, response_destination: ctx.sender, custom_payload: null }.toCell()
            });
            self.globalLPFund -= jettonDelta;
            self.tlpSupply -= tlpDelta;

            self.transferJetton(self.jettonWallet, msg.trxId, jettonDelta, order.account, ctx.sender);
        }
        self.liquidityOrders.del(msg.orderId);

        if (order.executionFee > 0) {
            let receiver: Address = msg.executionFeeReceiver != null ? msg.executionFeeReceiver!! : ctx.sender;
            send(SendParameters{ to: receiver, value: order.executionFee, mode: SendIgnoreErrors});
            self.totalExecutionFee -= order.executionFee;
        }

        emit(LiquidityPoolChangedEvent{
            trxId: msg.trxId,
            orderId: msg.orderId,
            opType: order.isIncrease ? OP_TYPE_LP_INCREASE : OP_TYPE_LP_DECREASE,
            account: order.account,
            jettonDelta: jettonDelta,
            tlpPrice: tlpPrice,
            tlpDelta: tlpDelta,
            tlpSupply: self.tlpSupply,
            lpFundAfter: self.globalLPFund,
            realizedLpFundingFeeDelta: lpFundingFeeGrowthDelta,
            realizedLpRolloverFeeDelta: lpRolloverFeeGrowthDelta,
            entryLpFundingFeeGrowth: self.globalLpFundingFeeGrowth,
            entryRolloverFeeGrowth: self.globalRolloverFeeGrowth
        }.toCell());

        self.transferEstimatedRemainValue(estimatedGas, ctx.sender, -order.executionFee, 1, !order.isIncrease);
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
    fun createIncreasePerpOrder(query_id: Int, account: Address, executionFee: Int, isMarket: Bool,
        tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, triggerPrice: Int, tpSize: Int, tpPrice: Int, slSize: Int, slPrice: Int, requestTime: Int) {
        let ctx: Context = context();

        if (ctx.value < executionFee + self.gasForPerpTrader) {
            self.refundJetton(query_id, marginDelta, account, account);
            return;
        }

        let executionFeeMultiple: Int = 1;
        if (tpSize > 0 && tpPrice > 0) {
            executionFeeMultiple += 1;
        }
        if (slSize > 0 && slPrice > 0) {
            executionFeeMultiple += 1;
        }

        if (executionFee < self.perpMinExecutionFee * executionFeeMultiple) {
            self.refundJetton(query_id, marginDelta, account, account);
            return;
        }

        let opType: Int = isMarket ? OP_TYPE_PERP_INCREASE_MARKET : OP_TYPE_PERP_INCREASE_LIMIT;
        let orderId = self.createPerpOrder(query_id, opType, account, tokenId, isLong, 
            marginDelta, sizeDelta, triggerPrice, executionFee / executionFeeMultiple, requestTime);

        if ((tpSize > 0 && tpPrice > 0) || (slSize > 0 && slPrice > 0)) {
            self.perpOrderExs.set(orderId, PerpOrderEx{ tpSize, tpPrice, slSize, slPrice, executionFee });
        }

        self.totalExecutionFee += executionFee;

        self.transferEstimatedRemainValue(self.gasForPerpTrader, account, executionFee, 1, false);
    }

    /**
     * Receive function for creating a decrease perpetual position order.
     * 
     * @param msg The CreateDecreasePerpOrder message containing the order details.
     */
    receive(msg: CreateDecreasePerpOrder) {
        self.requireNotStopped();

        let ctx: Context = context();
        require(ctx.value - msg.executionFee >= self.gasForPerpTrader, "gas not enough");
        require(msg.executionFee >= self.perpMinExecutionFee, "execution fee not enough");

        self.createPerpOrder(msg.trxId, OP_TYPE_PERP_DECREASE_MARKET, ctx.sender, msg.tokenId, msg.isLong,
         msg.marginDelta, msg.sizeDelta, msg.triggerPrice, msg.executionFee, msg.requestTime);

        self.totalExecutionFee += msg.executionFee;

        self.transferEstimatedRemainValue(self.gasForPerpTrader, ctx.sender, msg.executionFee, 1, false);
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

        require(ctx.value - msg.executionFee >= self.gasForPerpTrader * executionFeeMultiple, "gas not enough");
        require(msg.executionFee >= self.perpMinExecutionFee * executionFeeMultiple, "execution fee not enough");

        if (msg.tpSize > 0 && msg.tpPrice > 0) {
            self.createPerpOrder(msg.trxId, OP_TYPE_PERP_DECREASE_TP, ctx.sender, msg.tokenId, msg.isLong, 
            0, msg.tpSize, msg.tpPrice, msg.executionFee / executionFeeMultiple, msg.requestTime);
        }

        if (msg.slSize > 0 && msg.slPrice > 0) {
            self.createPerpOrder(msg.trxId, OP_TYPE_PERP_DECREASE_SL, ctx.sender, msg.tokenId, msg.isLong,
             0, msg.slSize, msg.slPrice, msg.executionFee / executionFeeMultiple, msg.requestTime);
        }

        self.totalExecutionFee += msg.executionFee;

        self.transferEstimatedRemainValue(self.gasForPerpTrader, ctx.sender, msg.executionFee, executionFeeMultiple, false);
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
    fun createPerpOrder(trxId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, 
    marginDelta: Int, sizeDelta: Int, triggerPrice: Int, executionFee: Int, requestTime: Int): Int {
        let triggerAbove: Bool = false;

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;

        if (opType == OP_TYPE_PERP_INCREASE_MARKET || opType == OP_TYPE_PERP_INCREASE_LIMIT) {
            // increase for long order, must trigger below the price
            triggerAbove = !isLong;
        } else {
            if (opType == OP_TYPE_PERP_DECREASE_MARKET) {
                // decrease for long market order, must trigger above the price
                triggerAbove = isLong;
            } else {
                // tp for long limit order, must trigger above the price
                triggerAbove = (opType == OP_TYPE_PERP_DECREASE_TP ? isLong : !isLong);
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
            isPending: false
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
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: PerpOrder = orderOpt!!;

        require(!order.isPending, "order is pending");

        let increase: Bool = order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_INCREASE_LIMIT;
        if (increase) {
            // compute gas + transfer jetton gas(returns usdt to trader)
            require(ctx.value >= self.gasForPerpTrader + self.gasForTransferJetton, "gas not enough");
        } else {
            require(ctx.value >= self.gasForPerpTrader, "gas not enough");
        }

        let isExecutor: Bool = self.executors.exists(ctx.sender);
        require(isExecutor || ctx.sender == order.account, "invalid sender");
        
        if (!isExecutor && (order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_DECREASE_MARKET)) {
            require(order.blockTime + self.orderLockTime <= now(), "too early to cancel");
        }

        let executionFee: Int = 0;
        if (increase) {
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

                self.perpOrderExs.del(msg.orderId);
            }

            self.transferJetton(self.jettonWallet, msg.trxId, order.marginDelta, order.account, ctx.sender);
        }
        self.perpOrders.del(msg.orderId);

        // transfer execution fee
        if (order.executionFee > 0) {
            let executionFeeReceiver: Address = msg.executionFeeReceiver == null ? ctx.sender : msg.executionFeeReceiver!!;
            send(SendParameters{ to: executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors });
            executionFee += order.executionFee;
        }
        self.totalExecutionFee -= executionFee;

        emit(PerpOrderCancelledEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForPerpTrader, ctx.sender, -executionFee, 1, increase);
    }


    /**
     * Receives and executes a perpetual position order.
     * 
     * @param msg The ExecutePerpOrder message containing the order details.
     */
    receive(msg: ExecutePerpOrder) {
        let ctx: Context = context();

        require(self.executors.exists(ctx.sender), "invalid sender");
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: PerpOrder = orderOpt!!;

        let increase: Bool = order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_INCREASE_LIMIT;
        if (increase) {
            require(ctx.value >= self.gasForPerpExecutor, "gas not enough");
        } else {
            require(ctx.value >= self.gasForPerpExecutor + self.gasForTransferJetton, "gas not enough");
        }
        require(!order.isPending, "order is pending");

        order.isPending = true;
        self.perpOrders.set(msg.orderId, order);

        if (!(order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_DECREASE_MARKET)){
            require(order.triggerAbove ? (msg.price >= order.triggerPrice) : (msg.price <= order.triggerPrice), "not reach trigger price");
        }
        let executionFeeReceiver = msg.executionFeeReceiver == null ? ctx.sender : msg.executionFeeReceiver!!;
        if (increase) {
            self.increasePerpPosition(msg.trxId, msg.orderId, order.opType, order.account, order.tokenId, order.isLong, order.marginDelta, order.sizeDelta, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth, executionFeeReceiver);
        } else {
            self.decreasePerpPosition(msg.trxId, msg.orderId, order.opType, order.account, order.tokenId, order.isLong, order.marginDelta, order.sizeDelta, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth, executionFeeReceiver);
        }    
    }

    /**
     * Increases the perpetual position for a given account and token.
     * 
     * @param trxId The transaction ID.
     * @param orderId The order ID.
     * @param opType The operation type.
     * @param account The account address.
     * @param tokenId The token ID.
     * @param isLong Indicates whether the position is long or short.
     * @param marginDelta The change in margin.
     * @param sizeDelta The change in size.
     * @param avgPremiumRate The average premium rate.
     * @param tradePrice The trade price.
     */
    fun increasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int, fundingFeeGrowth: Int, rolloverFeeGrowth: Int, executionFeeReceiver: Address) {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        let order: PerpOrder = self.perpOrders.get(orderId)!!;

        // get position
        let accountPerpPositionOpt: AccountPerpPosition? = self.perpPositions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {},
            shortPosition: PerpPosition {}
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;

        // check margin
        if (perpPosition.size == 0) {
            perpPosition.positionId = self.perpPositionIndexNext;
            self.perpPositionIndexNext += 1;
        }

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{};
        if (isLong) {
            globalPosition.longSize += sizeDelta;
        } else {
            globalPosition.shortSize += sizeDelta;
        }
        // update global value
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        // get global lp position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {};

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong == globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        // entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * tradePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = !isLong;
        }

        // trading fee
        let tradingFee: Int = 0;
        let lpTradingFee: Int = 0;
        if (sizeDelta > 0) {
            tradingFee = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
            lpTradingFee = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
            self.protocolTradingFee += tradingFee - lpTradingFee;
            self.globalLPFund += lpRealizedPnl + lpTradingFee;
        }

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        // update position
        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += marginDelta + fundingFee - tradingFee - rolloverFee;
        let marginDeltaAfter: Int = perpPosition.margin - marginBefore;

        perpPosition.entryPrice = (perpPosition.size * perpPosition.entryPrice + sizeDelta * tradePrice) / (perpPosition.size + sizeDelta);
        perpPosition.size += sizeDelta;
        perpPosition.entryFundingFeeGrowth = fundingFeeGrowth;
        perpPosition.entryRolloverFeeGrowth = rolloverFeeGrowth;

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

        // check leverage
        require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / PRICE_DECIMAL_FACTOR, "leverage too high");

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
            globalPosition.longMargin += marginDeltaAfter;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortMargin += marginDeltaAfter;
        }
        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        let executionFeeMultiple: Int = 1;
        // create tp sl
        let orderExOpt: PerpOrderEx? = self.perpOrderExs.get(orderId);
        if (orderExOpt != null) {
            let orderEx: PerpOrderEx = orderExOpt!!;
            // create tp/sl
            if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                executionFeeMultiple += 1;
                self.createPerpOrder(trxId, OP_TYPE_PERP_DECREASE_TP, order.account, order.tokenId, order.isLong,
                 0, orderEx.tpSize, orderEx.tpPrice, orderEx.executionFee, now());
            }

            if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                executionFeeMultiple += 1;
                self.createPerpOrder(trxId, OP_TYPE_PERP_DECREASE_SL, order.account, order.tokenId, order.isLong, 
                0, orderEx.slSize, orderEx.slPrice, orderEx.executionFee, now());
            }
            // delete
            self.perpOrderExs.del(orderId);
        }

        self.perpOrders.del(orderId);
        if (order.executionFee > 0) {
            send(SendParameters{ to: executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors});
            self.totalExecutionFee -= order.executionFee;
        }

        emit(PerpPositionIncreasedEvent{
            trxId: trxId,
            orderId: orderId,
            opType: opType,
            positionId: perpPosition.positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDeltaAfter,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: tradePrice,
            entryPrice: perpPosition.entryPrice,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            rolloverFee: rolloverFee,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongValueAfter: globalPosition.longValue,
            globalShortValueAfter: globalPosition.shortValue,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl,
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForPerpExecutor, sender(), -order.executionFee, executionFeeMultiple, false);
    }

    /**
     * Decreases the perpetual position for a given account and token.
     * 
     * @param trxId The transaction ID.
     * @param orderId The order ID.
     * @param opType The operation type.
     * @param account The account address.
     * @param tokenId The token ID.
     * @param isLong Indicates whether the position is long or short.
     * @param marginDelta The change in margin.
     * @param sizeDelta The change in size.
     * @param avgPremiumRate The average premium rate.
     * @param tradePrice The trade price.
     */
    fun decreasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int,
        fundingFeeGrowth: Int, rolloverFeeGrowth: Int, executionFeeReceiver: Address) {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        let order: PerpOrder = self.perpOrders.get(orderId)!!;

        let accountPerpPositionOpt: AccountPerpPosition? = self.perpPositions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {},
            shortPosition: PerpPosition {}
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;
        require(perpPosition.size > 0, "position not exist");

        if (sizeDelta > perpPosition.size) {
            sizeDelta = perpPosition.size;
        }

        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{};

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {};

        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong != globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (!isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * tradePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
        }

        let tradingFee: Int = 0;
        let lpTradingFee: Int = 0;
        if (sizeDelta > 0) {
            tradingFee = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
            lpTradingFee = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;

            self.protocolTradingFee += tradingFee - lpTradingFee;
            self.globalLPFund += lpRealizedPnl + lpTradingFee;
        }
        let positionId: Int = perpPosition.positionId;
        let payout: Int = 0;
        let realizedPnl: Int = 0;
        if (isLong) {
            realizedPnl = sizeDelta * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            realizedPnl = sizeDelta * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }

        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += realizedPnl + fundingFee - tradingFee - rolloverFee;

        require(perpPosition.margin >= 0, "insufficient margin");
        // partially close position
        if (sizeDelta > 0 && sizeDelta < perpPosition.size && marginDelta == 0) {
            marginDelta = perpPosition.margin * sizeDelta / perpPosition.size;
        }
        if (marginDelta > perpPosition.margin) {
            marginDelta = perpPosition.margin;
        }
        perpPosition.margin -= marginDelta;
        perpPosition.size -= sizeDelta;
        perpPosition.entryFundingFeeGrowth = fundingFeeGrowth;
        perpPosition.entryRolloverFeeGrowth = rolloverFeeGrowth;
        let marginDeltaAfter: Int = marginBefore - perpPosition.margin;

        if (perpPosition.size > 0) {
            // check maintain margin
            let unrealizedPnl: Int = 0;
            if (isLong) {
                unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
            require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

            // check leverage
            require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / PRICE_DECIMAL_FACTOR, "leverage too high");

            payout = marginDelta;
        } else {
            // close position
            // withdraw all margin
            marginDeltaAfter += perpPosition.margin;
            payout = marginDelta + perpPosition.margin;
            perpPosition = PerpPosition {};
        }

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
            globalPosition.longMargin -= marginDeltaAfter;
            globalPosition.longSize -= sizeDelta;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortMargin -= marginDeltaAfter;
            globalPosition.shortSize -= sizeDelta;
        }
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);
        self.perpOrders.del(orderId);
        self.transferJetton(self.jettonWallet, trxId, payout, order.account, sender());
        if (order.executionFee > 0) {
            send(SendParameters{ to: executionFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors});
            self.totalExecutionFee -= order.executionFee;
        }

        emit(PerpPositionDecreasedEvent{
            trxId: trxId,
            orderId: orderId,
            opType: opType,
            positionId: positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDeltaAfter,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: tradePrice,
            entryPrice: perpPosition.entryPrice,
            realizedPnLDelta: realizedPnl,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            rolloverFee: rolloverFee,
            payout: payout,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongValueAfter: globalPosition.longValue,
            globalShortValueAfter: globalPosition.shortValue,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForPerpExecutor, sender(), -order.executionFee, 1, payout > 0);
    }

    /**
     * This function is called when a LiquidatePerpPosition message is received.
     * It performs various checks, adds a new order to the order book, and sends an update position message to the pool.
     * 
     * @param msg The LiquidatePerpPosition message containing information about the liquidation.
     */
    receive(msg: LiquidatePerpPosition) {
        let ctx: Context = context();
        require(ctx.value >= self.gasForPerpExecutor + self.gasForTransferJetton, "gas not enough");
        require(self.executors.exists(ctx.sender), "invalid sender");

        let liquidationFeeReceiver: Address = msg.liquidationFeeReceiver != null ? msg.liquidationFeeReceiver!! : ctx.sender;

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{
            opType: OP_TYPE_PERP_LIQUIDATION,
            tokenId: msg.tokenId,
            account: msg.account,
            isLong: msg.isLong,
            marginDelta: 0,
            sizeDelta: 0,
            triggerPrice: 0,
            triggerAbove: false,
            executionFee: 0,
            blockTime: now(),
            isPending: true
        });

        self.liquidatePerpPosition( msg.trxId, orderId, msg.account, msg.tokenId, msg.isLong, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth, liquidationFeeReceiver);
    }

    /**
     * Liquidates a perpetual position.
     * 
     * @param trxId The transaction ID.
     * @param orderId The order ID.
     * @param account The account address.
     * @param tokenId The token ID.
     * @param isLong Indicates if the position is long.
     * @param avgPremiumRate The average premium rate.
     * @param tradePrice The trade price.
     */
    fun liquidatePerpPosition(trxId: Int, orderId: Int, account: Address, tokenId: Int, isLong: Bool, tradePrice: Int, fundingFeeGrowth: Int, rolloverFeeGrowth: Int, liquidationFeeReceiver: Address) {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        let order: PerpOrder = self.perpOrders.get(orderId)!!;

        // get position
        let accountPerpPositionOpt: AccountPerpPosition? = self.perpPositions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {},
            shortPosition: PerpPosition {}
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;
        require(perpPosition.size > 0, "position not exist");

        // delta
        let marginDelta: Int = perpPosition.margin;
        let sizeDelta: Int = perpPosition.size;

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{};

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin >= perpPosition.margin + fundingFee - rolloverFee + unrealizedPnl, "margin is too high to liquidate");

        // liquidate price
        let bankruptcyPrice: Int = ((perpPosition.margin + fundingFee - rolloverFee - tokenConfig.liquidationFee) * PRICE_DECIMAL_FACTOR + (isLong ? -perpPosition.entryPrice * perpPosition.size : perpPosition.entryPrice * perpPosition.size))
            / (perpPosition.size * (tokenConfig.tradingFeeRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)) / PERCENTAGE_BASIS_POINT);

        // get global position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {};

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong != globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (!isLong) {
                lpRealizedPnl = sizeUsed * (bankruptcyPrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - bankruptcyPrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        // lp entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * bankruptcyPrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
        }

        // trading fee
        let tradingFee: Int = sizeDelta * bankruptcyPrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let protocolTradingFee: Int = tradingFee - lpTradingFee;

        self.protocolTradingFee += protocolTradingFee;
        self.globalLPFund += lpRealizedPnl + lpTradingFee;

        let positionId: Int = perpPosition.positionId;
        let payout: Int = tokenConfig.liquidationFee;
        let realizedPnl: Int = -(marginDelta - tradingFee + fundingFee - rolloverFee);

        // close position
        perpPosition = PerpPosition {};

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
            globalPosition.longMargin -= marginDelta;
            globalPosition.longSize -= sizeDelta;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortMargin -= marginDelta;
            globalPosition.shortSize -= sizeDelta;
        }

        // update global value
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        self.perpOrders.del(orderId);
        self.transferJetton(self.jettonWallet, trxId, payout, liquidationFeeReceiver, sender());

        if (order.executionFee > 0) {
            send(SendParameters{ to: liquidationFeeReceiver, value: order.executionFee, mode: SendIgnoreErrors});
            self.totalExecutionFee -= order.executionFee;
        }
        emit(PerpPositionDecreasedEvent{
            trxId: trxId,
            orderId: orderId,
            opType: OP_TYPE_PERP_LIQUIDATION,
            positionId: positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDelta,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: bankruptcyPrice,
            entryPrice: perpPosition.entryPrice,
            realizedPnLDelta: realizedPnl,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            rolloverFee: rolloverFee,
            payout: payout,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongValueAfter: globalPosition.longValue,
            globalShortValueAfter: globalPosition.shortValue,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForPerpExecutor, sender(), -order.executionFee, 1, payout > 0);
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
        let ctx: Context = context();
        require(ctx.value >= self.gasForPerpExecutor + self.gasForTransferJetton, "gas not enough");
        require(self.executors.exists(ctx.sender), "invalid sender");

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{
            opType: OP_TYPE_PERP_ADL,
            tokenId: msg.tokenId,
            account: msg.account,
            isLong: msg.isLong,
            marginDelta: msg.marginDelta,
            sizeDelta: msg.sizeDelta,
            triggerPrice: 0,
            triggerAbove: false,
            executionFee: 0,
            blockTime: now(),
            isPending: true
        });

        self.decreasePerpPosition( msg.trxId, orderId, OP_TYPE_PERP_ADL, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth, ctx.sender);
    }

    // ======================================================== Compensate ================================================================ //
    /**
     * This function is called when a CreateCompensate message is received.
     * It performs various checks and adds a new compensate to the order book.
     * 
     * @param msg The CreateCompensate message containing the details of the compensate.
     */
    receive(msg: CreateCompensate) {
        require(self.compensator == sender(), "invalid sender");

        let ctx: Context = context();
        require(ctx.value >= self.gasForPerpExecutor, "gas not enough");

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
            unlockTime: now() + 1 * DAY
        });

        emit(CompensateCreatedEvent{
            compensateId: compensateId,
            orderType: msg.orderType,
            orderId: msg.orderId,
            trxId: msg.trxId,
            refundReceiver: msg.refundReceiver,
            refundAmount: msg.refundAmount,
            executionFeeReceiver: msg.executionFeeReceiver,
            executionFee: msg.executionFee,
            unlockTime: now() + 1 * DAY
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForPerpExecutor, sender(), 0, 1, false);
    }

    /**
     * @dev This function is the entry point for executing or canceling a compensation.
     * @param msg The ExecuteOrCancelCompensate message containing the necessary information for execution or cancellation.
     */
    receive(msg: ExecuteOrCancelCompensate) {
        require(self.compensator == sender(), "invalid sender");
        require(context().value >= self.gasForPerpExecutor + self.gasForTransferJetton, "gas not enough");

        let compensateOpt: Compensate? = self.compensates.get(msg.compensateId);
        require(compensateOpt != null, "compensate not exist");
        let compensate: Compensate = compensateOpt!!;

        if (msg.isCancel) {
            self.compensates.del(msg.compensateId);

            emit(CompensateCancelledEvent{
                compensateId: msg.compensateId,
                trxId: msg.trxId
            }.toCell());

            self.transferEstimatedRemainValue(self.gasForPerpExecutor, sender(), 0, 1, false);
            return;
        }

        require(now() >= compensate.unlockTime, "not reach unlock time");        

        if(compensate.orderType != null) {
            if (compensate.orderType == ORDER_TYPE_LP) {
                self.liquidityOrders.del(compensate.orderId);
            } else {
                self.perpOrders.del(compensate.orderId);
                self.perpOrderExs.del(compensate.orderId);
            }
        }

        if (compensate.refundReceiver != null && compensate.refundAmount > 0) {
            self.transferJetton(self.jettonWallet, compensate.trxId, compensate.refundAmount, compensate.refundReceiver!!, sender());
        }

        if (compensate.executionFeeReceiver != null && compensate.executionFee > 0) {
            send(SendParameters{ to: compensate.executionFeeReceiver!!, bounce: true, value: compensate.executionFee, mode: SendIgnoreErrors });
        }
        self.compensates.del(msg.compensateId);

        emit(CompensateExecutedEvent{
            compensateId: msg.compensateId,
            trxId: compensate.trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.gasForPerpExecutor, sender(), 0, 1, compensate.refundReceiver != null && compensate.refundAmount > 0);
    }

    /**
     * Retrieves the account information for the given address.
     * 
     * @param account The address of the account.
     * @return The AccountInfo object containing the account information.
     */
    get fun accountInfo(account: Address): AccountInfo {
        let isExecutor: Bool = self.executors.exists(account);
        let isCompensator: Bool = self.compensator == account;
        let isClaimer: Bool = self.claimer == account;
        return AccountInfo{ isExecutor, isCompensator, isClaimer};
    }

    /**
     * Retrieves the perp position data for the given token ID and account.
     * 
     * @param tokenId The ID of the token.
     * @param account The address of the account.
     * @return The PerpPositionData object containing the perp position data.
     */
    get fun perpPosition(tokenId: Int, account: Address?): PerpPositionData {
        let position: DirectionPerpPosition? = null;
        if (account != null) {
            let accountPerpPositionOpt: AccountPerpPosition? = self.perpPositions.get(tokenId);
            if (accountPerpPositionOpt != null) {
                position = (accountPerpPositionOpt!!).positions.get(account!!);
            }
        }
        return PerpPositionData {
            perpPositionIndexNext: self.perpPositionIndexNext,
            perpPosition: position,
            globalLPPosition: self.globalLPPositions.get(tokenId),
            globalPosition: self.globalPositions.get(tokenId)
        };
    }

    /**
     * Retrieves the configuration data for the order book.
     * 
     * @param account The address of the account.
     * @return The ConfigData object containing the configuration data.
     */
    get fun configData(): ConfigData {
        return ConfigData {
            orderLockTime: self.orderLockTime,
            lpMinExecutionFee: self.lpMinExecutionFee,
            perpMinExecutionFee: self.perpMinExecutionFee,
            gasForLpTrader: self.gasForLpTrader,
            gasForLpExecutor: self.gasForLpExecutor,
            gasForPerpTrader: self.gasForPerpTrader,
            gasForPerpExecutor: self.gasForPerpExecutor,
            minTonsForStorage: self.minTonsForStorage,
            gasForTransferJetton: self.gasForTransferJetton,
            gasForBurnTlp: self.gasForBurnTlp,
            gasForMintTlp: self.gasForMintTlp,
            tlpWallet: self.tlpWallet,
            jettonWallet: self.jettonWallet,
            tlpJetton: self.tlpJetton,
            maxLpNetCap: self.maxLpNetCap,
        };
    }

    /**
     * Retrieves the configuration of a token based on its ID.
     * 
     * @param tokenId The ID of the token.
     * @return The TokenConfig object associated with the token ID, or null if not found.
     */
    get fun tokenConfig(tokenId: Int): TokenConfig? {
        return self.tokenConfigs.get(tokenId);
    }

    /**
     * Retrieves the LP position data for a given account.
     * 
     * @param account The address of the account.
     * @return LPPositionData The LP position data.
     */
    get fun poolStat(): PoolStat {
        return PoolStat {
            tlpSupply: self.tlpSupply,
            totalExecutionFee: self.totalExecutionFee,
            protocolTradingFee: self.protocolTradingFee,
            globalLPFund: self.globalLPFund,
            globalLPUnrealizedPnl: self.globalLPUnrealizedPnl,
            globalLpFundingFeeGrowth: self.globalLpFundingFeeGrowth,
            globalRolloverFeeGrowth: self.globalRolloverFeeGrowth,
        };
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
