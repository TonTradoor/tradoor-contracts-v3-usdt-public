import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";
import "./fundingRate";

contract Pool with Deployable, Ownable, fundingRate {

    // config
    gasConsumption: Int = ton("0.05");
    minTonsForStorage: Int = ton("0.03");

    tokenConfigs: map<Int, TokenConfig>; // tokenIndex => tokenConfig
    tokenIndexNext: Int = 1;

    // rbfLockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    rbfLockTime: Int = 5 * 60; // TODO lock 5 min for test
    bonusFactor: Int = 1;

    minLPMargin: Int = 2;
    maxLPLeverage: Int = 100;
    lpLiquidationFee: Int = 5 * pow(10, 5); // 0.5u
    lpMaxRiskRate: Int = pow(10, 6);

    // admin
    owner: Address;
    orderBook: Address;

    // RBF
    globalRBFPosition: GlobalRBFPosition;
    rbfPositions: map<Address, RBFPosition>; // trader => RBF
    rbfPositionIndexNext: Int as uint64 = 1;

    // LP
    globalLiquidity: Int = 0;
    globalLPPositions: map<Int, GlobalLPPosition>; // tokenIndex => globalLP
    lpPositions: map<Address, LPPosition>; // trader => LP
    lpPositionIndexNext: Int as uint64 = 1;

    lpTradingFeeGrowth: Int = 0;
    lpFundingFeeGrowth: Int = 0;

    // Perp
    perpPositions: map<Int, AccountPerpPosition>; // tokenIndex => user => direction => position
    perpPositionIndexNext: Int as uint64 = 1;

    // funding rate
    priceStates: map<Int, PriceState>; // tokenIndex => priceState

    globalRiskBufferFunds: map<Int, GlobalRiskBufferFund>; // tokenIndex => RBF
    globalPositions : map<Int, GlobalPosition>; // tokenIndex => globalPosition
    globalFundingRateSamples: map<Int, GlobalFundingRateSample>; // tokenIndex => sample
    globalLiquidityPositions: map<Int, GlobalLiquidityPosition>; // tokenIndex => globalLiquidityPosition
    previousGlobalFundingRates: map<Int, PreviousGlobalFundingRate>; // tokenIndex => rate

    init() {
        self.owner = sender();
        self.orderBook = newAddress(0, 0);
        self.globalRBFPosition = GlobalRBFPosition{riskBufferFund: 0, liquidity: 0};
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: UpdateConfig) {
        self.requireOwner();
        if (msg.gasConsumption != null){
            self.gasConsumption = msg.gasConsumption!!;
        }
        if (msg.minTonsForStorage != null){
            self.minTonsForStorage = msg.minTonsForStorage!!;
        }
        if (msg.rbfLockTime != null){
            self.rbfLockTime = msg.rbfLockTime!!;
        }
        if (msg.bonusFactor != null){
            self.bonusFactor = msg.bonusFactor!!;
        }
        if (msg.minLPMargin != null){
            self.minLPMargin = msg.minLPMargin!!;
        }
        if (msg.maxLPLeverage != null){
            self.maxLPLeverage = msg.maxLPLeverage!!;
        }
        if (msg.lpLiquidationFee != null){
            self.lpLiquidationFee = msg.lpLiquidationFee!!;
        }
        if (msg.lpMaxRiskRate != null){
            self.lpMaxRiskRate = msg.lpMaxRiskRate!!;
        }
        if (msg.orderBook != null){
            self.orderBook = msg.orderBook!!;
        }
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: UpdateTokenConfig) {
        self.requireOwner();

        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(msg.tokenId);
        let tokenConfig: TokenConfig = TokenConfig{
            name: "",
            enable: false,
            minMarginPerPosition: 10,
            maxLeveragePerPosition: 50,
            liquidationFeeRatePerPosition: 0,
            liquidationExecutionFee: 0,
            interestRate: 0,
            maxFundingRate: 0
        };
        if (tokenConfigOpt != null) {
            tokenConfig = tokenConfigOpt!!;
        }

        if (msg.name != null){
            tokenConfig.name = msg.name!!;
        }
        if (msg.enable != null){
            tokenConfig.enable = msg.enable!!;
        }
        if (msg.minMarginPerPosition != null){
            tokenConfig.minMarginPerPosition = msg.minMarginPerPosition!!;
        }
        if (msg.maxLeveragePerPosition != null){
            tokenConfig.maxLeveragePerPosition = msg.maxLeveragePerPosition!!;
        }
        if (msg.liquidationFeeRatePerPosition != null){
            tokenConfig.liquidationFeeRatePerPosition = msg.liquidationFeeRatePerPosition!!;
        }
        if (msg.liquidationExecutionFee != null){
            tokenConfig.liquidationExecutionFee = msg.liquidationExecutionFee!!;
        }
        if (msg.interestRate != null){
            tokenConfig.interestRate = msg.interestRate!!;
        }
        if (msg.maxFundingRate != null){
            tokenConfig.maxFundingRate = msg.maxFundingRate!!;
        }
        
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    get fun configData(): ConfigData {
        return ConfigData{
            rbfLockTime: self.rbfLockTime,
            bonusFactor: self.bonusFactor,
            minLPMargin: self.minLPMargin,
            maxLPLeverage: self.maxLPLeverage,
            lpLiquidationFee: self.lpLiquidationFee,
            lpMaxRiskRate: self.lpMaxRiskRate,
            orderBook: self.orderBook
        };
    }

    get fun tokenConfig(tokenId: Int): TokenConfig? {
        return self.tokenConfigs.get(tokenId);
    }

    // ======================================================== RBF ================================================================ //
    
    receive(msg: UpdateRBFPosition) {
        dump("receive update position msg");
        require(sender() == self.orderBook, "invalid sender");

        let receive: Int = 0;
        if (msg.isIncrease) {
            self.increasePosition(msg.account, msg.liquidityDelta);
        } else {
            receive = self.decreasePosition(msg.account, msg.liquidityDelta);
        }

        let msgValue: Int = context().value - self.gasConsumption * 2 - self.minTonsForStorage - context().readForwardFee();
        require(msgValue > 0, "send gas not enough");
        dump("msgValue");
        dump(msgValue);
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdateRBFPositionSuccess {
                orderId: msg.orderId,
                receive: receive,
                trxId: msg.trxId
            }.toCell()
        });
        dump("send update RBF position msg");
    }

    fun increasePosition(account: Address, liquidityDelta: Int) {
        // get position
        let lpPositionOpt: RBFPosition? = self.rbfPositions.get(account);
        // init position if not exist
        let rbfPosition: RBFPosition = RBFPosition{
                positionId: 0,
                liquidity: 0,
                bonus: 0,
                unlockTime: 0
            };
        if (lpPositionOpt != null) {
            rbfPosition = lpPositionOpt!!;
        } else {
            rbfPosition.positionId = self.rbfPositionIndexNext;
            self.rbfPositionIndexNext = self.rbfPositionIndexNext + 1;
        }

        // update RBF
        // TODO update funding rate

        // TODO calculate bonus
        let globalNetRBF: Int = self.globalRBFPosition.riskBufferFund + self.calculateTotalGlobalUnrealizedPnl();
        if (globalNetRBF < 0) {
            globalNetRBF = 0;
        }
        let bonus: Int = 0;
        if (globalNetRBF < self.globalRBFPosition.liquidity) {
            // bonus = b + s (1 - x) * liquidity
            bonus = self.bonusFactor * (self.globalRBFPosition.liquidity - globalNetRBF)
                 * liquidityDelta / self.globalRBFPosition.liquidity;
            dump("bonus:");
            dump(bonus);
            rbfPosition.bonus = rbfPosition.bonus + bonus;
        }

        // update position
        rbfPosition.liquidity = rbfPosition.liquidity + liquidityDelta;
        rbfPosition.unlockTime = now() + self.rbfLockTime;

        // set position
        dump("execute increase rbf position");
        dump(beginCell().storeAddress(account).endCell().hash());

        self.rbfPositions.set(account, rbfPosition);

        // update global position
        self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund + liquidityDelta;
        self.globalRBFPosition.liquidity = self.globalRBFPosition.liquidity + liquidityDelta;

        emit(RBFPositionIncreasedEvent{
            positionId: rbfPosition.positionId,
            account: account,
            liquidityDelta: liquidityDelta,
            liquidityAfter: rbfPosition.liquidity,
            bonusDelta: bonus,
            bonusAfter: rbfPosition.bonus,
            unlockTimeAfter: rbfPosition.unlockTime
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity,
            tradingFee: 0,
            liquidation: 0
        }.toCell());
        dump("increase rbf position success");
    }

    fun decreasePosition(account: Address, liquidityDelta: Int): Int {
        // get position
        let rbfPositionOpt: RBFPosition? = self.rbfPositions.get(account);
        // check position
        require(rbfPositionOpt != null, "position not exist");
        let rbfPosition: RBFPosition = rbfPositionOpt!!;

        // check unlock time
        dump(rbfPosition.unlockTime);
        dump(now());
        require(rbfPosition.unlockTime <= now(), "not reach unlock time");
        // check liquidity delta
        require(rbfPosition.liquidity >= liquidityDelta, "insufficient liquidity");

        // update RBF
        // TODO update funding rate
        


        // calculate LP global unrealized pnl
        let totalGlobalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
        require(self.globalRBFPosition.riskBufferFund + totalGlobalUnrealizedPnl > 0, "insufficient global RBF");

        // calculate receive amount
        let globalNetRBF: Int = self.globalRBFPosition.riskBufferFund + self.calculateTotalGlobalUnrealizedPnl();
        if (globalNetRBF < 0) {
            globalNetRBF = 0;
        }
        require(globalNetRBF > 0, "insuficient global net RBF");

        let receive: Int = 0;
        let bonus: Int = 0;

        if (globalNetRBF >= self.globalRBFPosition.liquidity) {
            let n: Int = ((now() - rbfPosition.unlockTime)  + self.rbfLockTime) / DAY;

            if (rbfPosition.bonus == 0) {
                // bonus = liquidity * r（x-1）* min(n，100）* 0.1%
                bonus = liquidityDelta * self.bonusFactor * (globalNetRBF - self.globalRBFPosition.liquidity) * min(n, 100) / (globalNetRBF * 1000);
            } else {
                let bonus1: Int = liquidityDelta * (globalNetRBF - self.globalRBFPosition.liquidity) / globalNetRBF;
                let bonus2: Int = rbfPosition.bonus;
                let bonus3: Int = liquidityDelta * self.bonusFactor * (globalNetRBF - self.globalRBFPosition.liquidity) * min(n, 100) / (globalNetRBF * 1000);
                bonus = max(min(bonus1, bonus2), bonus3);
            }
            receive = liquidityDelta + bonus;
        } else {
            receive = liquidityDelta * globalNetRBF / self.globalRBFPosition.liquidity;
        }
        // update position
        rbfPosition.liquidity = rbfPosition.liquidity - liquidityDelta;
        rbfPosition.bonus = rbfPosition.bonus - bonus;

        // set position
        dump("execute decrease rbf position");
        dump(beginCell().storeAddress(account).endCell().hash());

        if (rbfPosition.liquidity > 0 || rbfPosition.bonus > 0) {
            self.rbfPositions.set(account, rbfPosition);
        } else {
            self.rbfPositions.set(account, null);
        }

        // update global position
        self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund - receive;
        self.globalRBFPosition.liquidity = self.globalRBFPosition.liquidity - liquidityDelta;

        // event
        emit(RBFPositionDecreasedEvent{
            positionId: rbfPosition.positionId,
            account: account,
            liquidityDelta: liquidityDelta,
            liquidityAfter: rbfPosition.liquidity,
            bonusDelta: bonus,
            bonusAfter: rbfPosition.bonus,
            receive: receive
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity,
            tradingFee: 0,
            liquidation: 0
        }.toCell());
        return receive;
    }

    get fun rbfPosition(account: Address): RBFPosition? {
        return self.rbfPositions.get(account);
    }

    // ============================ LP ================================ //
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
    //     let index: Int = self.increaseLPPositionIndexNext;
    //     self.increaseLPPositionIndexNext = self.increaseLPPositionIndexNext + 1;
    //     self.increaseLPPositionOrders.set(index, IncreaseLPPositionOrder{
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
    //         index: index
    //     }.toCell());
    // }
    
    // receive(msg: CancelIncreaseLPPositionOrder) {
    //     let ctx: Context = context();

    //     // check gas
    //     require(ctx.value >= self.gasConsumption, "gas not enough");

    //     // check order
    //     let orderOpt: IncreaseLPPositionOrder? = self.increaseLPPositionOrders.get(msg.index);
    //     if (orderOpt == null) {
    //         return;
    //     }
    //     let order: IncreaseLPPositionOrder = orderOpt!!;
    //     self.shouldCancel(order.blockTime, ctx.sender);

    //     // transfer execution fee
    //     send(SendParameters{
    //         to: self.executionFeeReceiver,
    //         bounce: true,
    //         value: order.executionFee,
    //         mode: SendIgnoreErrors
    //     });

    //     // TODO transfer jetton

    //     // delete order
    //     self.increaseLPPositionOrders.set(msg.index, null);
    //     // event
    //     emit(IncreaseLPPositionCancelledEvent{
    //         index: msg.index,
    //         trxId: msg.trxId
    //     }.toCell());
    // }
    
    // receive(msg: ExecuteIncreaseLPPositionOrder) {
    //     let orderOpt: IncreaseLPPositionOrder? = self.increaseLPPositionOrders.get(msg.index);
    //     // check order
    //     require(orderOpt != null, "order not exist");

    //     let order: IncreaseLPPositionOrder = orderOpt!!;
    //     self.shouldExecute(order.blockTime);

    //     // get position
    //     let lpPositionOpt: LPPosition? = self.lpPositions.get(order.account);
    //     // init position if not exist
    //     let lpPosition: LPPosition = LPPosition{
    //         margin: 0,
    //         liquidity: 0,
    //         entryFundingFeeGrowth: 0,
    //         entryTradingFeeGrowth: 0
    //     };
    //     if (lpPositionOpt != null) {
    //         lpPosition = lpPositionOpt!!;
    //     }

    //     let marginAfter: Int = 0;
    //     if (lpPosition.liquidity == 0) {
    //         marginAfter = order.marginDelta;
    //         // check margin and leverage
    //         require(marginAfter >= self.minLPMargin, "insufficient margin");
    //         require(marginAfter * self.maxLPLeverage >= order.liquidityDelta, "legerage too high");
    //     } else {
    //         // calculate funding fee
    //         let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
    //         // calculate trading fee
    //         let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
    //         marginAfter = lpPosition.margin + tradingFee + fundingFee + order.marginDelta;
    //         // calculate pnl
    //         let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
    //         let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLiquidity / lpPosition.liquidity;
    //         let unrealizedLoss: Int = 0;
    //         if (unrealizedPnl < 0) {
    //             unrealizedLoss = -unrealizedPnl;
    //         }
    //         // check risk rate
    //         require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / BASIS_POINT > unrealizedLoss, "risk rate too high");
    //         // check leverage
    //         require(marginAfter * self.maxLPLeverage >= order.liquidityDelta, "legerage too high");
    //     }
        
    //     // update position
    //     lpPosition.margin = marginAfter;
    //     lpPosition.liquidity = lpPosition.liquidity + order.liquidityDelta;
    //     lpPosition.entryFundingFeeGrowth = self.lpFundingFeeGrowth;
    //     lpPosition.entryTradingFeeGrowth = self.lpTradingFeeGrowth;

    //     // set position
    //     dump("execute increase lp position order");
    //     dump(beginCell().storeAddress(order.account).endCell().hash());

    //     self.lpPositions.set(order.account, lpPosition);

    //     // update global position
    //     self.globalLiquidity = self.globalLiquidity + order.liquidityDelta;

    //     // delete order
    //     self.increaseLPPositionOrders.set(msg.index, null);
        
    //     // transfer execution fee
    //     send(SendParameters{
    //         to: self.executionFeeReceiver,
    //         bounce: true,
    //         value: order.executionFee,
    //         mode: SendIgnoreErrors
    //     });

    //     // event
    //     emit(IncreaseLPPositionExecutedEvent{
    //         index: msg.index,
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

    // receive(msg: CreateDecreaseLPPositionOrder) {
    //     let ctx: Context = context();
    //     // check gas
    //     require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
    //     // check execution fee
    //     require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

    //     // add new order
    //     let index: Int = self.decreaseLPPositionIndexNext;
    //     self.decreaseLPPositionIndexNext = self.decreaseLPPositionIndexNext + 1;
    //     self.decreaseLPPositionOrders.set(index, DecreaseLPPositionOrder{
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
    //         index: index
    //     }.toCell());
    // }
    
    // receive(msg: CancelDecreaseLPPositionOrder) {
    //     let ctx: Context = context();

    //     // check gas
    //     require(ctx.value >= self.gasConsumption, "gas not enough");

    //     // check order
    //     let orderOpt: DecreaseLPPositionOrder? = self.decreaseLPPositionOrders.get(msg.index);
    //     if (orderOpt == null) {
    //         return;
    //     }
    //     let order: DecreaseLPPositionOrder = orderOpt!!;
    //     self.shouldCancel(order.blockTime, ctx.sender);

    //     // TODO transfer execution fee

    //     // TODO transfer jetton

    //     // delete order
    //     self.decreaseLPPositionOrders.set(msg.index, null);
    //     // event
    //     emit(DecreaseLPPositionCancelledEvent{
    //         index: msg.index,
    //         trxId: msg.trxId
    //     }.toCell());
    // }
    
    // receive(msg: ExecuteDecreaseLPPositionOrder) {
    //     let orderOpt: DecreaseLPPositionOrder? = self.decreaseLPPositionOrders.get(msg.index);
    //     // check order
    //     require(orderOpt != null, "order not exist");

    //     let order: DecreaseLPPositionOrder = orderOpt!!;
    //     self.shouldExecute(order.blockTime);

    //     // update position
    //     let lpPositionOpt: LPPosition? = self.lpPositions.get(order.account);
    //     // init position if not exist
    //     let lpPosition: LPPosition = LPPosition{
    //         margin: 0,
    //         liquidity: 0,
    //         entryFundingFeeGrowth: 0,
    //         entryTradingFeeGrowth: 0
    //     };
    //     if (lpPositionOpt != null) {
    //         lpPosition = lpPositionOpt!!;
    //     }

    //     // TODO update funding rate        

    //     // calculate funding fee
    //     let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
    //     // calculate trading fee
    //     let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
    //     let marginAfter: Int = lpPosition.margin + tradingFee + fundingFee;
    //     // check margin
    //     require(marginAfter >= order.marginDelta, "insufficient margin");
    //     marginAfter = marginAfter - order.marginDelta;

    //     // check liquidity
    //     require(lpPosition.liquidity >= order.liquidityDelta, "insufficient liquidity");
    //     let liquidityAfter: Int = lpPosition.liquidity - order.liquidityDelta;

    //     // calculate pnl
    //     let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
    //     let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLiquidity / lpPosition.liquidity;
    //     let unrealizedLoss: Int = 0;
    //     if (unrealizedPnl < 0) {
    //         unrealizedLoss = -unrealizedPnl;
    //     }
        
    //     // check global liquidity
    //     require(self.globalRBFPosition.riskBufferFund + self.globalLiquidity + unrealizedPnl >= order.liquidityDelta, "insufficient global liquidity");

    //     let receivedMargin: Int = 0;
    //     let realizedLoss: Int = 0;
    //     if (liquidityAfter > 0) {
    //         realizedLoss = unrealizedLoss * order.liquidityDelta / lpPosition.liquidity;
    //         if (realizedLoss <= order.marginDelta) {
    //             receivedMargin = order.marginDelta - realizedLoss;
    //         } else {
    //             receivedMargin = 0;
    //             marginAfter = marginAfter + order.marginDelta - realizedLoss;
    //         }
    //         // check risk rate
    //         require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / BASIS_POINT > unrealizedLoss, "risk rate too hig");
    //         // check leverage
    //         require(marginAfter * self.maxLPLeverage >= order.liquidityDelta, "legerage too high");
    //     } else {
    //         realizedLoss = unrealizedLoss;
    //         marginAfter = marginAfter - realizedLoss;
    //         receivedMargin = marginAfter;
    //     }
        
    //     // TODO transfer margin
    //     if (receivedMargin > 0) {

    //     }
        
    //     if (liquidityAfter > 0) {
    //         // update position
    //         lpPosition.margin = marginAfter;
    //         lpPosition.liquidity = liquidityAfter;
    //         lpPosition.entryFundingFeeGrowth = self.lpFundingFeeGrowth;
    //         lpPosition.entryTradingFeeGrowth = self.lpTradingFeeGrowth;
    //         self.lpPositions.set(order.account, lpPosition);
    //     } else {
    //         // delete position
    //         self.lpPositions.set(order.account, null);
    //     }

    //     dump("execute decrease lp position order");
    //     dump(beginCell().storeAddress(order.account).endCell().hash());

    //     // update global position
    //     self.globalLiquidity = self.globalLiquidity - order.liquidityDelta;

    //     // delete order
    //     self.increaseLPPositionOrders.set(msg.index, null);
        
    //     // transfer execution fee
    //     send(SendParameters{
    //         to: self.executionFeeReceiver,
    //         bounce: true,
    //         value: order.executionFee,
    //         mode: SendIgnoreErrors
    //     });

    //     // event
    //     emit(DecreaseLPPositionExecutedEvent{
    //         index: msg.index,
    //         trxId: msg.trxId
    //     }.toCell());
    //     emit(LPPositionDecreasedEvent{
    //         account: order.account,
    //         marginDelta: order.marginDelta,
    //         marginAfter: lpPosition.margin,
    //         liquidityDelta: order.liquidityDelta,
    //         liquidityAfter: lpPosition.liquidity,
    //         tradingFee: tradingFee,
    //         fundingFee: fundingFee,
    //         realizedLoss: realizedLoss
    //     }.toCell());

    // }

    // receive(msg: LiquidateLPPosition) {
    //     // get position
    //     let lpPositionOpt: LPPosition? = self.lpPositions.get(msg.account);
    //     // check position
    //     require(lpPositionOpt != null, "position not exist");
    //     let lpPosition: LPPosition = lpPositionOpt!!;

    //     // TODO update funding rate        

    //     // calculate funding fee
    //     let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
    //     // calculate trading fee
    //     let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
    //     let realizedProfit: Int = tradingFee + fundingFee;
    //     let marginAfter: Int = lpPosition.margin + realizedProfit;

    //     // calculate pnl
    //     let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
    //     let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLiquidity / lpPosition.liquidity;
    //     let unrealizedLoss: Int = 0;
    //     if (unrealizedPnl < 0) {
    //         unrealizedLoss = -unrealizedPnl;
    //     }

    //     // check risk rate
    //     require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / BASIS_POINT <= unrealizedLoss, "risk rate too high");
        
    //     // margin substract fee
    //     let liquidationFee: Int = self.lpLiquidationFee;
    //     if (marginAfter < self.lpLiquidationFee) {
    //         liquidationFee = marginAfter;
    //         marginAfter = 0;
    //     } else {
    //         marginAfter = marginAfter - self.lpLiquidationFee;
    //     }
        
    //     // remained margin add to RBF
    //     self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund + marginAfter;
                
    //     // delete position
    //     self.lpPositions.set(msg.account, null);

    //     dump("liquidate lp position order");
    //     dump(beginCell().storeAddress(msg.account).endCell().hash());

    //     // update global position
    //     self.globalLiquidity = self.globalLiquidity - lpPosition.liquidity;
        
    //     // TODO send liquidation fee to executor

    //     // event
    //     emit(LPPositionLiquidatedEvent{
    //         account: msg.account,
    //         trxId: msg.trxId,
    //         margin: lpPosition.margin,
    //         liquidity: lpPosition.liquidity,
    //         tradingFee: tradingFee,
    //         fundingFee: fundingFee,
    //         liquidationFee: liquidationFee
    //     }.toCell());
    //     emit(GlobalRBFChangedEvent{
    //         riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
    //         liquidityAfter: self.globalRBFPosition.liquidity
    //     }.toCell());
    // }

    // get fun increaseLPPositionIndexNext(): Int {
    //     return self.increaseLPPositionIndexNext;
    // }

    // get fun increaseLPPositionOrder(index: Int): IncreaseLPPositionOrder? {
    //     return self.increaseLPPositionOrders.get(index);
    // }

    // get fun decreaseLPPositionIndexNext(): Int {
    //     return self.decreaseLPPositionIndexNext;
    // }

    // get fun decreaseLPPositionOrder(index: Int): DecreaseLPPositionOrder? {
    //     return self.decreaseLPPositionOrders.get(index);
    // }

    // get fun lpPosition(account: Address): LPPosition? {
    //     return self.lpPositions.get(account);
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

    //     // get index next
    //     let indexOpt: Int = self.increasePerpPositionMarketIndexsNext.get(tokenId);
    //     let index: Int = 1;
    //     if (indexOpt != null) {
    //         index = indexOpt!!;
    //     }

    //     self.increasePerpPositionMarketIndexNext = self.increasePerpPositionMarketIndexNext + 1;

    //     // get order list by tokenId
    //     let increasePerpPositionMarketOrdersOpt: IncreasePerpPositionMarketOrders? = self.increasePerpPositionMarketOrders.get(tokenId);
    //     let increasePerpPositionMarketOrders: IncreasePerpPositionMarketOrders = IncreasePerpPositionMarketOrders{};
    //     if (increasePerpPositionMarketOrdersOpt != null) {
    //         increasePerpPositionMarketOrders = increasePerpPositionMarketOrdersOpt!!;
    //     }

    //     // get order
    //     increasePerpPositionMarketOrders.get();

    //     self.increasePerpPositionMarketOrders.set(index, IncreaseLPPositionOrder{
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
    //         index: index
    //     }.toCell());
    // }

    receive(msg: CancelIncreasePerpPositionMarketOrder) {

    }

    receive(msg: ExecuteIncreasePerpPositionMarketOrder) {

    }

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

    fun tokenEnabled(tokenIndex: Int): Bool {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenIndex);
        if (tokenConfigOpt == null) {
            return false;
        }
        return (tokenConfigOpt!!).enable;
    }

    fun calculateUnrealizedPnL(isLong: Bool, size: Int, entryPrice: Int, price: Int): Int {
        if (isLong) {
            return size * (price - entryPrice) / PRICE_FACTOR;
        } else {
            return size * (entryPrice - price) / PRICE_FACTOR;
        }
    }

    fun sampleAndAdjustFundingRate(tokenIndex: Int) {
        let globalFundingRateSample: GlobalFundingRateSample = self.globalFundingRateSamples.get(tokenIndex)!!;
        let globalLiquidityPosition: GlobalLiquidityPosition = self.globalLiquidityPositions.get(tokenIndex)!!;
        let priceState: PriceState = self.priceStates.get(tokenIndex)!!;
        let tokenConfig: TokenConfig = self.tokenConfigs.get(tokenIndex)!!;

        let res: SamplePremiumRateResult = self.samplePremiumRate(globalFundingRateSample, globalLiquidityPosition, priceState, tokenConfig.interestRate, now());
    }

}
