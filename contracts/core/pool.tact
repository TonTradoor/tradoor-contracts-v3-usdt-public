import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";
import "./fundingRate";

contract Pool with Deployable, Ownable, fundingRate {

    // config
    minExecutionFee: Int;
    gasConsumption: Int;
    minTonsForStorage: Int;
    const minTimeDelayExecutor: Int = 6; // executor execute after 6s
    const maxTimeDelayExecutor: Int = 30 * 60; // executor execute before 30min
    const minTimeDelayTrader: Int = 3 * 60; // trader execute after 3min

    tokenInfos: map<Int, TokenInfo>; // tokenIndex => tokenInfo
    tokenIndexNext: Int;
    tokenConfigs: map<Int, TokenConfig>; // tokenIndex => tokenConfig

    // lockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    lockTime: Int = 5 * 60; // TODO lock 5 min for test
    bonusFactor: Int = 1;

    minLPMargin: Int;
    maxLPLeverage: Int;
    lpLiquidationFee: Int;
    lpMaxRiskRate: Int;

    // admin
    usdc: Address; // pool USDC jetton wallet address
    owner: Address;
    operator: Address;
    executors: map<Address, Bool>; // account => enabled
    executionFeeReceiver: Address;

    // RBF
    increaseRBFPositionOrders: map<Int, IncreaseRBFPositionOrder>; // index => order
    increaseRBFPositionIndexNext: Int as uint128;

    decreaseRBFPositionOrders: map<Int, DecreaseRBFPositionOrder>; // index => order
    decreaseRBFPositionIndexNext: Int as uint128;

    globalRBFPosition: GlobalRBFPosition;
    fundPositions: map<Address, RBFPosition>; // trader => RBF

    // LP
    increaseLPPositionOrders: map<Int, IncreaseLPPositionOrder>; // index => order
    increaseLPPositionIndexNext: Int as uint128;

    decreaseLPPositionOrders: map<Int, DecreaseLPPositionOrder>; // index => order
    decreaseLPPositionIndexNext: Int as uint128;

    globalLiquidity: Int;
    globalLPPositions: map<Int, GlobalLPPosition>; // tokenIndex => globalLP
    lpPositions: map<Address, LPPosition>; // trader => LP

    lpTradingFeeGrowth: Int;
    lpFundingFeeGrowth: Int;

    // Perp
    /// market order
    increasePerpPositionMarketOrders: map<Int, IncreasePerpPositionMarketOrders>; // tokenIndex => index => order
    increasePerpPositionMarketIndexNext: Int as uint128;

    decreasePerpPositionMarketOrders: map<Int, DecreasePerpPositionMarketOrders>; // tokenIndex => index => order
    decreasePerpPositionMarketIndexNext: Int as uint128;

    /// limit order
    increasePerpPositionLimitOrders: map<Int, IncreasePerpPositionLimitOrders>; // tokenIndex => index => order
    increasePerpPositionLimitIndexNext: Int as uint128;

    decreasePerpPositionLimitOrders: map<Int, DecreasePerpPositionLimitOrders>; // tokenIndex => index => order
    decreasePerpPositionLimitIndexNext: Int as uint128;

    perpPositions: map<Int, AccountPerpPosition>; // tokenIndex => user => direction => position

    // funding rate
    priceStates: map<Int, PriceState>; // tokenIndex => priceState

    globalRiskBufferFunds: map<Int, GlobalRiskBufferFund>; // tokenIndex => RBF
    globalPositions : map<Int, GlobalPosition>; // tokenIndex => globalPosition
    globalFundingRateSamples: map<Int, GlobalFundingRateSample>; // tokenIndex => sample
    globalLiquidityPositions: map<Int, GlobalLiquidityPosition>; // tokenIndex => globalLiquidityPosition
    previousGlobalFundingRates: map<Int, PreviousGlobalFundingRate>; // tokenIndex => rate


    init() {
        self.owner = sender();
        self.usdc = newAddress(0, 0);
        self.operator = newAddress(0, 0);
        // TODO need owner to set
        self.executors.set(sender(), true);
        self.executionFeeReceiver = sender();

        self.tokenIndexNext = 1;

        self.minExecutionFee = ton("0.5"); // for every operation
        self.gasConsumption = ton("0.05");
        self.minTonsForStorage = ton("0.03");

        self.minLPMargin = 10;
        self.maxLPLeverage = 100;
        self.lpLiquidationFee = 0;
        self.lpMaxRiskRate = pow(10, 6);

        self.increaseRBFPositionIndexNext = 1;
        self.decreaseRBFPositionIndexNext = 1;
        self.globalRBFPosition = GlobalRBFPosition{riskBufferFund: 0, liquidity: 0};

        self.increaseLPPositionIndexNext = 1;
        self.decreaseLPPositionIndexNext = 1;

        self.globalLiquidity = 0;
        self.lpTradingFeeGrowth = 0;
        self.lpFundingFeeGrowth = 0;

        self.increasePerpPositionMarketIndexNext = 1;
        self.decreasePerpPositionMarketIndexNext = 1;

        self.increasePerpPositionLimitIndexNext = 1;
        self.decreasePerpPositionLimitIndexNext = 1;
    }

    // ============================ Admin ================================ //

    receive(msg: SetOperator) {
        self.requireOwner();
        self.operator = msg.operator;
        emit(OperatorUpdatedEvent{
            newOperator: self.operator
        }.toCell());
        self.reply("operator set".asComment());
    }

    receive(msg: SetExecutor) {
        self.requireOwner();
        self.executors.set(msg.executor, msg.enable);
        self.reply("executor set".asComment());
    }

    receive(msg: SetUSDC) {
        self.requireOwner();
        self.usdc = msg.usdc;
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: SetExecutionFeeReceiver) {
        self.requireOwner();
        self.executionFeeReceiver = msg.receiver;
        emit(ExecutionFeeReceiverUpdatedEvent{
            newExecutionFeeReceiver: self.executionFeeReceiver
        }.toCell());

        let refundValue: Int = context().value - ton("0.04");
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: refundValue
        });
    }

    get fun operator(): Address {
        return self.operator;
    }

    get fun usdc(): Address {
        return self.usdc;
    }

    get fun executionFeeReceiver(): Address {
        return self.executionFeeReceiver;
    }

    fun onlyOperator() {
        require(sender() == self.operator, "only operator");
    }

    // ============================ Entry ================================ //
    /**
    * @dev This function is called when the contract receives a TokenNotification message.
    * It checks the token and handles the corresponding operation code.
    * @param msg The TokenNotification message received.
    */
    receive(msg: TokenNotification) {
        // just ignore other token
        if (sender() != self.usdc) {
            return;
        }

        // get op code
        let operation: Slice = msg.forwardPayload.loadRef().asSlice();
        let opCode: Int = operation.loadInt(32);
        if (opCode == OP_CREATE_INCREASE_RBF_POSITION) {
            let liquidityDelta: Int = operation.loadCoins();
            let executionFee: Int = operation.loadCoins();
            dump("receive create increase rbf position order op code");
            dump(beginCell().storeAddress(msg.from).endCell().hash());
            dump(liquidityDelta);
            dump(executionFee);

            self.handleCreateIncreaseRBFPositionOrder(msg.queryId, msg.amount, msg.from, executionFee, liquidityDelta);
        }
    }

    fun refundLiquidity(queryId: Int, amount: Int, to: Address) {
        dump("refundLiquidity");
        send(SendParameters{
            to: self.usdc, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: false,
            body: self.createJettonTransferBody(queryId, 0, amount, to)
        });
    }

    // ============================ RBF ================================ //
      
    fun handleCreateIncreaseRBFPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, liquidityDelta: Int) {
        dump("handleCreateIncreaseRBFPositionOrder");
        let ctx: Context = context();

        if (ctx.value < executionFee + ton("0.2")) {
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
        let index: Int = self.increaseRBFPositionIndexNext;
        self.increaseRBFPositionIndexNext = self.increaseRBFPositionIndexNext + 1;
        self.increaseRBFPositionOrders.set(index, IncreaseRBFPositionOrder{
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now()
        });

        // event
        emit(IncreaseRBFPositionCreatedEvent{
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            index: index
        }.toCell());

        let refundValue: Int = context().value - executionFee - ton("0.2");
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
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.index);
        if (orderOpt == null) {
            return;
        }
        let order: IncreaseRBFPositionOrder = orderOpt!!;
        self.shouldCancel(order.blockTime, ctx.sender);

        // transfer execution fee
        send(SendParameters{
            to: self.executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });

        // TODO transfer jetton

        // delete order
        self.increaseRBFPositionOrders.set(msg.index, null);
        // event
        emit(IncreaseRBFPositionCancelledEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
    }

    receive(msg: ExecuteIncreaseRBFPositionOrder) {
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.index);
        // check order
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime);

        // get position
        let lpPositionOpt: RBFPosition? = self.fundPositions.get(order.account);
        // init position if not exist
        let fundPosition: RBFPosition = RBFPosition{
                liquidity: 0,
                bonus: 0,
                unlockTime: 0
            };
        if (lpPositionOpt != null) {
            fundPosition = lpPositionOpt!!;
        }

        // update RBF
        // TODO update funding rate

        // TODO calculate bonus
        let globalNetRBF: Int = self.globalRBFPosition.riskBufferFund + self.calculateTotalGlobalUnrealizedPnl();
        if (globalNetRBF < 0) {
            globalNetRBF = 0;
        }
        if (globalNetRBF < self.globalRBFPosition.liquidity) {
            // bonus = b + s (1 - x) * liquidity
            let bonus: Int = self.bonusFactor * (self.globalRBFPosition.liquidity - globalNetRBF)
                 * order.liquidityDelta / self.globalRBFPosition.liquidity;
            dump("bonus:");
            dump(bonus);
            fundPosition.bonus = fundPosition.bonus + bonus;
        }

        // update position
        fundPosition.liquidity = fundPosition.liquidity + order.liquidityDelta;
        fundPosition.unlockTime = now() + self.lockTime;

        // set position
        dump("execute increase rbf position order");
        dump(beginCell().storeAddress(order.account).endCell().hash());

        self.fundPositions.set(order.account, fundPosition);

        // update global position
        self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund + order.liquidityDelta;
        self.globalRBFPosition.liquidity = self.globalRBFPosition.liquidity + order.liquidityDelta;

        // delete order
        self.increaseRBFPositionOrders.set(msg.index, null);
        
        // transfer execution fee
        send(SendParameters{
            to: self.executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });

        // event
        emit(IncreaseRBFPositionExecutedEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
        emit(RBFPositionIncreasedEvent{
            account: order.account,
            liquidityDelta: order.liquidityDelta,
            liquidityAfter: fundPosition.liquidity,
            unlockTimeAfter: fundPosition.unlockTime
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity
        }.toCell());
    }

    receive(msg: CreateDecreaseRBFPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let index: Int = self.decreaseRBFPositionIndexNext;
        self.decreaseRBFPositionIndexNext = self.decreaseRBFPositionIndexNext + 1;
        self.decreaseRBFPositionOrders.set(index, DecreaseRBFPositionOrder{
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now()
        });

        // event
        emit(DecreaseRBFPositionCreatedEvent{
            account: sender(),
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            index: index
        }.toCell());
    }

    receive(msg: CancelDecreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(msg.index);
        if (orderOpt == null) {
            return;
        }
        let order: DecreaseRBFPositionOrder = orderOpt!!;
        self.shouldCancel(order.blockTime, ctx.sender);

        // TODO transfer execution fee
        send(SendParameters{
            to: self.executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });

        // TODO transfer jetton

        // delete order
        self.decreaseRBFPositionOrders.set(msg.index, null);
        // event
        emit(DecreaseRBFPositionCancelledEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
    }

    receive(msg: ExecuteDecreaseRBFPositionOrder) {
        let orderOpt: DecreaseRBFPositionOrder? = self.decreaseRBFPositionOrders.get(msg.index);
        // check order
        require(orderOpt != null, "order not exist");

        let order: DecreaseRBFPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime);

        // update position
        let fundPositionOpt: RBFPosition? = self.fundPositions.get(order.account);
        // init position if not exist
        require(fundPositionOpt != null, "position not exist");
        let fundPosition: RBFPosition = fundPositionOpt!!;

        // check unlock time
        dump(fundPosition.unlockTime);
        dump(now());
        require(fundPosition.unlockTime <= now(), "not reach unlock time");
        // check liquidity delta
        require(fundPosition.liquidity >= order.liquidityDelta, "insufficient liquidity");

        // update RBF
        // TODO update funding rate
        


        // calculate LP global unrealized pnl
        let totalGlobalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
        require(self.globalRBFPosition.riskBufferFund + totalGlobalUnrealizedPnl > 0, "insufficient global RBF");

        // TODO calculate redeem amount
        let globalNetRBF: Int = self.globalRBFPosition.riskBufferFund + self.calculateTotalGlobalUnrealizedPnl();
        if (globalNetRBF < 0) {
            globalNetRBF = 0;
        }
        require(globalNetRBF > 0, "insuficient global net RBF");

        let redeem: Int = 0;
        let bonus: Int = 0;

        if (globalNetRBF >= self.globalRBFPosition.liquidity) {
            let n: Int = ((now() - fundPosition.unlockTime)  + self.lockTime) / DAY;

            if (fundPosition.bonus == 0) {
                // bonus = liquidity * r（x-1）* min(n，100）* 0.1%
                bonus = order.liquidityDelta * self.bonusFactor * (globalNetRBF - self.globalRBFPosition.liquidity) * min(n, 100) / (globalNetRBF * 1000);
            } else {
                let bonus1: Int = order.liquidityDelta * (globalNetRBF - self.globalRBFPosition.liquidity) / globalNetRBF;
                let bonus2: Int = fundPosition.bonus;
                let bonus3: Int = order.liquidityDelta * self.bonusFactor * (globalNetRBF - self.globalRBFPosition.liquidity) * min(n, 100) / (globalNetRBF * 1000);
                bonus = max(min(bonus1, bonus2), bonus3);
            }
            redeem = self.globalRBFPosition.liquidity + bonus;
        } else {
            redeem = order.liquidityDelta * globalNetRBF / self.globalRBFPosition.liquidity;
        }
        // update position
        fundPosition.liquidity = fundPosition.liquidity - order.liquidityDelta;
        fundPosition.bonus = fundPosition.bonus - bonus;

        // set position
        dump("execute decrease rbf position order");
        dump(beginCell().storeAddress(order.account).endCell().hash());

        if (fundPosition.liquidity > 0) {
            self.fundPositions.set(order.account, fundPosition);
        } else {
            self.fundPositions.set(order.account, null);
        }

        // update global position
        self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund - redeem;
        self.globalRBFPosition.liquidity = self.globalRBFPosition.liquidity - order.liquidityDelta;

        // delete order
        self.decreaseRBFPositionOrders.set(msg.index, null);

        // TODO transfer execution fee


        // event
        emit(DecreaseRBFPositionExecutedEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
        emit(RBFPositionDecreasedEvent{
            account: order.account,
            liquidityDelta: order.liquidityDelta,
            liquidityAfter: fundPosition.liquidity,
            unlockTimeAfter: fundPosition.unlockTime
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity
        }.toCell());
    }

    get fun increaseRBFPositionIndexNext(): Int {
        return self.increaseRBFPositionIndexNext;
    }

    get fun increaseRBFPositionOrder(index: Int): IncreaseRBFPositionOrder? {
        return self.increaseRBFPositionOrders.get(index);
    }

    get fun decreaseRBFPositionIndexNext(): Int {
        return self.decreaseRBFPositionIndexNext;
    }

    get fun decreaseRBFPositionOrder(index: Int): DecreaseRBFPositionOrder? {
        return self.decreaseRBFPositionOrders.get(index);
    }

    get fun fundPosition(account: Address): RBFPosition? {
        return self.fundPositions.get(account);
    }

    // ============================ LP ================================ //
    fun handleCreateIncreaseLPPositionOrder(queryId: Int, jettonFromAmount: Int, account: Address, executionFee: Int, marginDelta: Int, liquidityDelta: Int) {
        dump("handleCreateIncreaseLPPositionOrder");
        let ctx: Context = context();

        if (jettonFromAmount < liquidityDelta) {
            self.refundLiquidity(queryId, jettonFromAmount, account);
            dump("refund not enough liquidity");
            return;
        }
        // check executionFee
        if (ctx.value < executionFee) {
            dump("execution fee not enough");
            self.refundLiquidity(queryId, jettonFromAmount, account);
            return;
        }

        // add new order
        let index: Int = self.increaseLPPositionIndexNext;
        self.increaseLPPositionIndexNext = self.increaseLPPositionIndexNext + 1;
        self.increaseLPPositionOrders.set(index, IncreaseLPPositionOrder{
            account: account,
            marginDelta: marginDelta,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now()
        });

        // event
        emit(IncreaseLPPositionCreatedEvent{
            account: account,
            margin: marginDelta,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            index: index
        }.toCell());
    }
    
    receive(msg: CancelIncreaseLPPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: IncreaseLPPositionOrder? = self.increaseLPPositionOrders.get(msg.index);
        if (orderOpt == null) {
            return;
        }
        let order: IncreaseLPPositionOrder = orderOpt!!;
        self.shouldCancel(order.blockTime, ctx.sender);

        // transfer execution fee
        send(SendParameters{
            to: self.executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });

        // TODO transfer jetton

        // delete order
        self.increaseLPPositionOrders.set(msg.index, null);
        // event
        emit(IncreaseLPPositionCancelledEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
    }
    
    receive(msg: ExecuteIncreaseLPPositionOrder) {
        let orderOpt: IncreaseLPPositionOrder? = self.increaseLPPositionOrders.get(msg.index);
        // check order
        require(orderOpt != null, "order not exist");

        let order: IncreaseLPPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime);

        // get position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(order.account);
        // init position if not exist
        let lpPosition: LPPosition = LPPosition{
            margin: 0,
            liquidity: 0,
            entryFundingFeeGrowth: 0,
            entryTradingFeeGrowth: 0
        };
        if (lpPositionOpt != null) {
            lpPosition = lpPositionOpt!!;
        }

        let marginAfter: Int = 0;
        if (lpPosition.liquidity == 0) {
            marginAfter = order.marginDelta;
            // check margin and leverage
            require(marginAfter >= self.minLPMargin, "insufficient margin");
            require(marginAfter * self.maxLPLeverage >= order.liquidityDelta, "legerage too high");
        } else {
            // calculate funding fee
            let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
            // calculate trading fee
            let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
            marginAfter = lpPosition.margin + tradingFee + fundingFee + order.marginDelta;
            // calculate pnl
            let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
            let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLiquidity / lpPosition.liquidity;
            let unrealizedLoss: Int = 0;
            if (unrealizedPnl < 0) {
                unrealizedLoss = -unrealizedPnl;
            }
            // check risk rate
            require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / BASIS_POINT > unrealizedLoss, "risk rate too hig");
            // check leverage
            require(marginAfter * self.maxLPLeverage >= order.liquidityDelta, "legerage too high");
        }
        
        // update position
        lpPosition.margin = marginAfter;
        lpPosition.liquidity = lpPosition.liquidity + order.liquidityDelta;
        lpPosition.entryFundingFeeGrowth = self.lpFundingFeeGrowth;
        lpPosition.entryTradingFeeGrowth = self.lpTradingFeeGrowth;

        // set position
        dump("execute increase lp position order");
        dump(beginCell().storeAddress(order.account).endCell().hash());

        self.lpPositions.set(order.account, lpPosition);

        // update global position
        self.globalLiquidity = self.globalLiquidity + order.liquidityDelta;

        // delete order
        self.increaseLPPositionOrders.set(msg.index, null);
        
        // transfer execution fee
        send(SendParameters{
            to: self.executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });

        // event
        emit(IncreaseLPPositionExecutedEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
        emit(LPPositionIncreasedEvent{
            account: order.account,
            marginDelta: order.marginDelta,
            marginAfter: lpPosition.margin,
            liquidityDelta: order.liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            entryFundingFeeGrowth: lpPosition.entryFundingFeeGrowth,
            entryTradingFeeGrowth: lpPosition.entryTradingFeeGrowth
        }.toCell());
    }

    receive(msg: CreateDecreaseLPPositionOrder) {
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let index: Int = self.decreaseLPPositionIndexNext;
        self.decreaseLPPositionIndexNext = self.decreaseLPPositionIndexNext + 1;
        self.decreaseLPPositionOrders.set(index, DecreaseLPPositionOrder{
            account: sender(),
            marginDelta: msg.marginDelta,
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now()
        });

        // event
        emit(DecreaseLPPositionCreatedEvent{
            account: sender(),
            marginDelta: msg.marginDelta,
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            index: index
        }.toCell());
    }
    
    receive(msg: CancelDecreaseLPPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: DecreaseLPPositionOrder? = self.decreaseLPPositionOrders.get(msg.index);
        if (orderOpt == null) {
            return;
        }
        let order: DecreaseLPPositionOrder = orderOpt!!;
        self.shouldCancel(order.blockTime, ctx.sender);

        // TODO transfer execution fee

        // TODO transfer jetton

        // delete order
        self.decreaseLPPositionOrders.set(msg.index, null);
        // event
        emit(DecreaseLPPositionCancelledEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
    }
    
    receive(msg: ExecuteDecreaseLPPositionOrder) {
        let orderOpt: DecreaseLPPositionOrder? = self.decreaseLPPositionOrders.get(msg.index);
        // check order
        require(orderOpt != null, "order not exist");

        let order: DecreaseLPPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime);

        // update position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(order.account);
        // init position if not exist
        let lpPosition: LPPosition = LPPosition{
            margin: 0,
            liquidity: 0,
            entryFundingFeeGrowth: 0,
            entryTradingFeeGrowth: 0
        };
        if (lpPositionOpt != null) {
            lpPosition = lpPositionOpt!!;
        }

        // TODO update funding rate        

        // calculate funding fee
        let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
        // calculate trading fee
        let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
        let realizedProfit: Int = tradingFee + fundingFee;
        let marginAfter: Int = lpPosition.margin + realizedProfit;
        // check margin
        require(marginAfter >= order.marginDelta, "insufficient margin");
        marginAfter = marginAfter - order.marginDelta;

        // check liquidity
        require(lpPosition.liquidity >= order.liquidityDelta, "insufficient liquidity");
        let liquidityAfter: Int = lpPosition.liquidity - order.liquidityDelta;

        // calculate pnl
        let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
        let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLiquidity / lpPosition.liquidity;
        let unrealizedLoss: Int = 0;
        if (unrealizedPnl < 0) {
            unrealizedLoss = -unrealizedPnl;
        }
        
        // check global liquidity
        require(self.globalRBFPosition.riskBufferFund + self.globalLiquidity + unrealizedPnl >= order.liquidityDelta, "insufficient global liquidity");

        let receivedMargin: Int = 0;
        let realizedLoss: Int = 0;
        if (liquidityAfter > 0) {
            realizedLoss = unrealizedLoss * order.liquidityDelta / lpPosition.liquidity;
            if (realizedLoss <= order.marginDelta) {
                receivedMargin = order.marginDelta - realizedLoss;
            } else {
                receivedMargin = 0;
                marginAfter = marginAfter + order.marginDelta - realizedLoss;
            }
            // check risk rate
            require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / BASIS_POINT > unrealizedLoss, "risk rate too hig");
            // check leverage
            require(marginAfter * self.maxLPLeverage >= order.liquidityDelta, "legerage too high");
        } else {
            realizedLoss = unrealizedLoss;
            marginAfter = marginAfter - realizedLoss;
            receivedMargin = marginAfter;
        }
        
        // TODO transfer margin
        if (receivedMargin > 0) {

        }
        
        if (liquidityAfter > 0) {
            // update position
            lpPosition.margin = marginAfter;
            lpPosition.liquidity = liquidityAfter;
            lpPosition.entryFundingFeeGrowth = self.lpFundingFeeGrowth;
            lpPosition.entryTradingFeeGrowth = self.lpTradingFeeGrowth;
            self.lpPositions.set(order.account, lpPosition);
        } else {
            // delete position
            self.lpPositions.set(order.account, null);
        }

        dump("execute decrease lp position order");
        dump(beginCell().storeAddress(order.account).endCell().hash());

        // update global position
        self.globalLiquidity = self.globalLiquidity - order.liquidityDelta;

        // delete order
        self.increaseLPPositionOrders.set(msg.index, null);
        
        // transfer execution fee
        send(SendParameters{
            to: self.executionFeeReceiver,
            bounce: true,
            value: order.executionFee,
            mode: SendIgnoreErrors
        });

        // event
        emit(DecreaseLPPositionExecutedEvent{
            index: msg.index,
            trxId: msg.trxId
        }.toCell());
        emit(LPPositionDecreasedEvent{
            account: order.account,
            marginDelta: order.marginDelta,
            marginAfter: lpPosition.margin,
            liquidityDelta: order.liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            realizedProfit: realizedProfit,
            realizedLoss: realizedLoss
        }.toCell());

    }

    // ============================ Perp ================================ //


    // ============================ private function ================================ //
    fun calculateTotalGlobalUnrealizedPnl(): Int {
        dump("calculate total pnl");
        let totalGlobalUnrealizedPnl: Int = 0;
        let i: Int = 1;
        while(i < self.tokenIndexNext) {
            let tokenEnabled: Bool = self.tokenEnabled(i);
            if (tokenEnabled) {
                let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(i);
                if (globalLPPositionOpt != null) {
                    let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;
                    // TODO get index price
                    let indexPrice: Int = 1 * PRICE_FACTOR;
                    // unrealized pnl
                    let unrealizedPnl: Int = self.calculateUnrealizedPnL(globalLPPosition.isLong, globalLPPosition.netSize, 
                        globalLPPosition.entryPrice, indexPrice);
                    totalGlobalUnrealizedPnl = totalGlobalUnrealizedPnl + unrealizedPnl;
                }
            }
            i = i + 1;
        }
        dump(totalGlobalUnrealizedPnl);
        return totalGlobalUnrealizedPnl;
    }

    fun shouldCancel(blockTime: Int, account: Address) {
        let ctx: Context = context();
        // executor or trader
        let isExecutorOpt: Bool? = self.executors.get(ctx.sender);
        let isExecutor: Bool = false;
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
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

    fun shouldExecute(blockTime: Int) {
        let ctx: Context = context();
        // executor or trader
        let isExecutorOpt: Bool? = self.executors.get(ctx.sender);
        let isExecutor: Bool = false;
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

    fun tokenEnabled(tokenIndex: Int): Bool {
        let tokenInfoOpt: TokenInfo? = self.tokenInfos.get(tokenIndex);
        if (tokenInfoOpt == null) {
            return false;
        }
        return (tokenInfoOpt!!).enable;
    }

    fun calculateUnrealizedPnL(isLong: Bool, size: Int, entryPrice: Int, price: Int): Int {
        if (isLong) {
            return size * (price - entryPrice) / PRICE_FACTOR;
        } else {
            return size * (entryPrice - price) / PRICE_FACTOR;
        }
    }

    // create jetton transfer body
    fun createJettonTransferBody(queryId: Int, fwdAmount: Int, jettonAmount: Int, to: Address): Cell {
        return beginCell()
            .storeInt(0xf8a7ea5, 32)
            .storeInt(queryId, 64)
            .storeCoins(jettonAmount)
            .storeAddress(to) // to_owner_address
            .storeAddress(to)
            .storeInt(0, 1)
            .storeCoins(fwdAmount) // forward_ton_amount
            .storeInt(0, 1)
            .endCell();
    }

    fun sampleAndAdjustFundingRate(tokenIndex: Int) {
        let globalFundingRateSample: GlobalFundingRateSample = self.globalFundingRateSamples.get(tokenIndex)!!;
        let globalLiquidityPosition: GlobalLiquidityPosition = self.globalLiquidityPositions.get(tokenIndex)!!;
        let priceState: PriceState = self.priceStates.get(tokenIndex)!!;
        let tokenConfig: TokenConfig = self.tokenConfigs.get(tokenIndex)!!;

        let res: SamplePremiumRateResult = self.samplePremiumRate(globalFundingRateSample, globalLiquidityPosition, priceState, tokenConfig.interestRate, now());
    }

}
