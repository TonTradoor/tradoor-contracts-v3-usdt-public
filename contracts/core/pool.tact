import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract Pool with Deployable, Ownable {

    // config
    gasConsumption: Int = ton("0.05");
    minTonsForStorage: Int = ton("0.03");

    tokenConfigs: map<Int, TokenConfig>; // tokenId => tokenConfig
    tokenIndexNext: Int = 1;

    // rbfLockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    rbfLockTime: Int = 5 * 60; // TODO lock 5 min for test
    bonusFactor: Int = 1;

    minLPMargin: Int = 1;
    maxLPLeverage: Int = 100;
    lpLiquidationFee: Int = 5 * pow(10, 5); // 0.5u
    lpMaxRiskRate: Int = pow(10, 6);

    // admin
    owner: Address;
    orderBook: Address;

    // RBF
    rbfPositions: map<Address, RBFPosition>; // trader => RBF
    rbfPositionIndexNext: Int as uint64 = 1;
    globalRBFPosition: GlobalRBFPosition;

    // LP
    lpPositions: map<Address, LPPosition>; // trader => LP
    lpPositionIndexNext: Int as uint64 = 1;
    globalLPLiquidity: GlobalLPLiquidity;
    globalLPPositions: map<Int, GlobalLPPosition>; // tokenId => globalLP

    lpTradingFeeGrowth: Int = 0;
    lpFundingFeeGrowth: Int = 0;

    // Perp
    perpPositions: map<Int, AccountPerpPosition>; // tokenId => user => direction => position
    perpPositionIndexNext: Int as uint64 = 1;

    // price
    prices: map<Int, PriceData>; // tokenId => priceData

    protocalTradingFee: Int = 0;

    init(deployId: Int) {
        self.owner = sender();
        self.orderBook = newAddress(0, 0);
        self.globalRBFPosition = GlobalRBFPosition{riskBufferFund: 0, liquidity: 0};
        self.globalLPLiquidity = GlobalLPLiquidity{margin: 0, liquidity: 0, fundingFeeGrowth: 0, tradingFeeGrowth: 0};
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
            minMargin: 1,
            maxLeverage: 50,
            liquidationFee: 5 * pow(10, 5), // 0.5U
            tradingFeeRate: 1_000, // 0.1%
            lpTradingFeeRate: 300_000, // 30%
            protocalTradingFeeRate: 300_000, // 30%
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
        if (msg.minMargin != null){
            tokenConfig.minMargin = msg.minMargin!!;
        }
        if (msg.maxLeverage != null){
            tokenConfig.maxLeverage = msg.maxLeverage!!;
        }
        if (msg.liquidationFee != null){
            tokenConfig.liquidationFee = msg.liquidationFee!!;
        }
        if (msg.interestRate != null){
            tokenConfig.interestRate = msg.interestRate!!;
        }
        if (msg.tradingFeeRate != null){
            tokenConfig.tradingFeeRate = msg.tradingFeeRate!!;
        }
        if (msg.lpTradingFeeRate != null){
            tokenConfig.lpTradingFeeRate = msg.lpTradingFeeRate!!;
        }
        if (msg.protocalTradingFeeRate != null){
            tokenConfig.protocalTradingFeeRate = msg.protocalTradingFeeRate!!;
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

    get fun priceData(tokenId: Int): PriceData? {
        return self.prices.get(tokenId);
    }

    // ======================================================== RBF ================================================================ //
    receive(msg: UpdateRBFPosition) {
        dump("receive update position msg");
        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.setPrice(msg.pricesLength, msg.prices);

        // TODO update funding rate

        // update position
        let receive: Int = 0;
        if (msg.isIncrease) {
            self.increaseRBFPosition(msg.account, msg.liquidityDelta, msg.trxId);
        } else {
            receive = self.decreaseRBFPosition(msg.account, msg.liquidityDelta, msg.trxId);
        }

        let msgValue: Int = context().value - self.gasConsumption * 2 - self.minTonsForStorage - context().readForwardFee();
        require(msgValue > 0, "send gas not enough");
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

    fun increaseRBFPosition(account: Address, liquidityDelta: Int, trxId: Int) {
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
            unlockTimeAfter: rbfPosition.unlockTime,
            trxId: trxId
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity,
            tradingFee: 0,
            liquidation: 0,
            trxId: trxId
        }.toCell());
        dump("increase rbf position success");
    }

    fun decreaseRBFPosition(account: Address, liquidityDelta: Int, trxId: Int): Int {
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
            receive: receive,
            trxId: trxId
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity,
            tradingFee: 0,
            liquidation: 0,
            trxId: trxId
        }.toCell());
        return receive;
    }

    get fun rbfPosition(account: Address): RBFPosition? {
        return self.rbfPositions.get(account);
    }

    // ============================ LP ================================ //
    receive(msg: UpdateLPPosition) {
        dump("receive update LP position msg");
        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.setPrice(msg.pricesLength, msg.prices);

        // TODO update funding rate        

        // update position
        let receive: Int = 0;
        if (msg.opType == ORDER_OP_TYPE_INCREASE) {
            self.increaseLPPosition(msg.account, msg.marginDelta, msg.liquidityDelta, msg.trxId);
        } else if (msg.opType == ORDER_OP_TYPE_DECREASE) {
            receive = self.decreaseLPPosition(msg.account, msg.marginDelta, msg.liquidityDelta, msg.trxId);
        } else {
            receive = self.liquidateLPPosition(msg.account, msg.trxId);
        }

        let msgValue: Int = context().value - self.gasConsumption * 2 - self.minTonsForStorage - context().readForwardFee();
        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdateLPPositionSuccess {
                orderId: msg.orderId,
                receive: receive,
                trxId: msg.trxId
            }.toCell()
        });
        dump("send update LP position msg");
    }

    fun increaseLPPosition(account: Address, marginDelta: Int, liquidityDelta: Int, trxId: Int) {
        // get position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(account);
        // init position if not exist
        let lpPosition: LPPosition = LPPosition{
            positionId: 0,
            margin: 0,
            liquidity: 0,
            entryFundingFeeGrowth: 0,
            entryTradingFeeGrowth: 0
        };
        if (lpPositionOpt != null) {
            lpPosition = lpPositionOpt!!;
        } else {
            lpPosition.positionId = self.lpPositionIndexNext;
            self.lpPositionIndexNext = self.lpPositionIndexNext + 1;
        }

        let marginAfter: Int = 0;
        let fundingFee: Int = 0;
        let tradingFee: Int = 0;
        if (lpPosition.liquidity == 0) {
            marginAfter = marginDelta;
            // check margin and leverage
            require(marginAfter >= self.minLPMargin, "insufficient margin");
            require(marginAfter * self.maxLPLeverage >= liquidityDelta, "legerage too high");
        } else {
            // calculate funding fee
            fundingFee = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
            // calculate trading fee
            tradingFee = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
            marginAfter = lpPosition.margin + tradingFee + fundingFee + marginDelta;
            // calculate pnl
            let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
            let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLPLiquidity.liquidity / lpPosition.liquidity;
            let unrealizedLoss: Int = 0;
            if (unrealizedPnl < 0) {
                unrealizedLoss = -unrealizedPnl;
            }
            // check risk rate
            require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / PERCENTAGE_BASIS_POINT > unrealizedLoss, "risk rate too high");
            // check leverage
            require(marginAfter * self.maxLPLeverage >= liquidityDelta, "legerage too high");
        }
        
        // update position
        lpPosition.margin = marginAfter;
        lpPosition.liquidity = lpPosition.liquidity + liquidityDelta;
        lpPosition.entryFundingFeeGrowth = self.lpFundingFeeGrowth;
        lpPosition.entryTradingFeeGrowth = self.lpTradingFeeGrowth;

        // set position
        dump("execute increase lp position order");
        dump(beginCell().storeAddress(account).endCell().hash());

        self.lpPositions.set(account, lpPosition);

        // update global position
        self.globalLPLiquidity.margin = self.globalLPLiquidity.margin + marginDelta;
        self.globalLPLiquidity.liquidity = self.globalLPLiquidity.liquidity + liquidityDelta;

        // event
        emit(LPPositionIncreasedEvent{
            positionId: lpPosition.positionId,
            account: account,
            marginDelta: marginDelta,
            marginAfter: lpPosition.margin,
            liquidityDelta: liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            trxId: trxId
        }.toCell());
        emit(GlobalLPLiquidityChangedEvent{
            marginAfter: self.globalLPLiquidity.margin,
            liquidityAfter: self.globalLPLiquidity.liquidity,
            trxId: trxId
        }.toCell());
    }

    fun decreaseLPPosition(account: Address, marginDelta: Int, liquidityDelta: Int, trxId: Int): Int {
        // get position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(account);
        require(lpPositionOpt != null, "position not exist");

        let lpPosition: LPPosition = lpPositionOpt!!;

        // calculate funding fee
        let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
        // calculate trading fee
        let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
        let marginAfter: Int = lpPosition.margin + tradingFee + fundingFee;
        // check margin
        require(marginAfter >= marginDelta, "insufficient margin");
        marginAfter = marginAfter - marginDelta;

        // check liquidity
        require(lpPosition.liquidity >= liquidityDelta, "insufficient liquidity");
        let liquidityAfter: Int = lpPosition.liquidity - liquidityDelta;

        // calculate pnl
        let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
        let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLPLiquidity.margin / lpPosition.liquidity;
        let unrealizedLoss: Int = 0;
        if (unrealizedPnl < 0) {
            unrealizedLoss = -unrealizedPnl;
        }
        
        // check global liquidity
        require(self.globalRBFPosition.riskBufferFund + self.globalLPLiquidity.liquidity + unrealizedPnl >= liquidityDelta, "insufficient global liquidity");

        let receiveMargin: Int = 0;
        let realizedLoss: Int = 0;
        if (liquidityAfter > 0) {
            realizedLoss = unrealizedLoss * liquidityDelta / lpPosition.liquidity;
            if (realizedLoss <= marginDelta) {
                receiveMargin = marginDelta - realizedLoss;
            } else {
                receiveMargin = 0;
                marginAfter = marginAfter + marginDelta - realizedLoss;
            }
            // check risk rate
            require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / PERCENTAGE_BASIS_POINT > unrealizedLoss, "risk rate too hig");
            // check leverage
            require(marginAfter * self.maxLPLeverage >= liquidityDelta, "legerage too high");
        } else {
            realizedLoss = unrealizedLoss;
            marginAfter = marginAfter - realizedLoss;
            receiveMargin = marginAfter;
        }
        
        if (liquidityAfter > 0) {
            // update position
            lpPosition.margin = marginAfter;
            lpPosition.liquidity = liquidityAfter;
            lpPosition.entryFundingFeeGrowth = self.lpFundingFeeGrowth;
            lpPosition.entryTradingFeeGrowth = self.lpTradingFeeGrowth;
            self.lpPositions.set(account, lpPosition);
        } else {
            // delete position
            self.lpPositions.set(account, null);
        }

        dump("execute decrease lp position order");
        dump(beginCell().storeAddress(account).endCell().hash());

        // update global position
        self.globalLPLiquidity.margin = self.globalLPLiquidity.margin - marginDelta;
        self.globalLPLiquidity.liquidity = self.globalLPLiquidity.liquidity - liquidityDelta;

        // event
        emit(LPPositionDecreasedEvent{
            positionId: lpPosition.positionId,
            account: account,
            marginDelta: marginDelta,
            marginAfter: lpPosition.margin,
            liquidityDelta: liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            realizedLoss: realizedLoss,
            receive: receiveMargin,
            trxId: trxId
        }.toCell());
        emit(GlobalLPLiquidityChangedEvent{
            marginAfter: self.globalLPLiquidity.margin,
            liquidityAfter: self.globalLPLiquidity.liquidity,
            trxId: trxId
        }.toCell());
        return receiveMargin;
    }

    fun liquidateLPPosition(account: Address, trxId: Int): Int {
        // get position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(account);
        // check position
        require(lpPositionOpt != null, "position not exist");
        let lpPosition: LPPosition = lpPositionOpt!!;

        // calculate funding fee
        let fundingFee: Int = (self.lpFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity;
        // calculate trading fee
        let tradingFee: Int = (self.lpTradingFeeGrowth - lpPosition.entryTradingFeeGrowth) * lpPosition.liquidity;
        let realizedProfit: Int = tradingFee + fundingFee;
        let marginAfter: Int = lpPosition.margin + realizedProfit;

        // calculate pnl
        let globalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
        let unrealizedPnl: Int = (globalUnrealizedPnl + self.globalRBFPosition.riskBufferFund) * self.globalLPLiquidity.liquidity / lpPosition.liquidity;
        let unrealizedLoss: Int = 0;
        if (unrealizedPnl < 0) {
            unrealizedLoss = -unrealizedPnl;
        }

        // check risk rate
        require((marginAfter - self.lpLiquidationFee) * self.lpMaxRiskRate / PERCENTAGE_BASIS_POINT <= unrealizedLoss, "risk rate too high");
        
        // margin substract fee
        let liquidationFee: Int = self.lpLiquidationFee;
        if (marginAfter < self.lpLiquidationFee) {
            liquidationFee = marginAfter;
            marginAfter = 0;
        } else {
            marginAfter = marginAfter - self.lpLiquidationFee;
        }
        
        // remained margin add to RBF
        self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund + marginAfter;

        // delete position
        self.lpPositions.set(account, null);

        dump("liquidate lp position order");
        dump(beginCell().storeAddress(account).endCell().hash());

        // update global position
        self.globalLPLiquidity.margin = self.globalLPLiquidity.margin - lpPosition.margin;
        self.globalLPLiquidity.liquidity = self.globalLPLiquidity.liquidity - lpPosition.liquidity;

        // event
        emit(LPPositionLiquidatedEvent{
            positionId: lpPosition.positionId,
            account: account,
            margin: lpPosition.margin,
            liquidity: lpPosition.liquidity,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            liquidationFee: liquidationFee,
            trxId: trxId
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity,
            tradingFee: 0,
            liquidation: 0,
            trxId: trxId
        }.toCell());
        return liquidationFee;
    }

    get fun lpPosition(account: Address): LPPosition? {
        return self.lpPositions.get(account);
    }

    // ============================ Perp ================================ //
    receive(msg: UpdatePerpPosition) {
        dump("receive update LP position msg");
        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.setPrice(msg.pricesLength, msg.prices);

        // TODO update funding rate

        // TODO get trade price
        let tradePrice: Int = self.getPrice(msg.tokenId);

        // update position
        let receive: Int = 0;
        if (msg.opType == ORDER_OP_TYPE_INCREASE_MARKET || msg.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.increasePerpPosition(msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice);
        } 
        // else if (msg.opType == ORDER_OP_TYPE_DECREASE_MARKET || msg.opType == ORDER_OP_TYPE_DECREASE_TP || msg.opType == ORDER_OP_TYPE_DECREASE_SL) {
        //     if (msg.triggerAbove) {
        //         require(tradePrice >= msg.triggerPrice, "not reach trigger price");
        //     } else {
        //         require(tradePrice <= msg.triggerPrice, "not reach trigger price");
        //     }
        //     receive = self.decreasePerpPosition(msg.trxId, msg.account, msg.marginDelta, msg.sizeDelta, tradePrice);
        // } else if (msg.opType == ORDER_OP_TYPE_LIQUIDATION) {
        //     receive = self.liquidatePerpPosition(msg.trxId, msg.account, tradePrice);
        // }

        let msgValue: Int = context().value - self.gasConsumption * 2 - self.minTonsForStorage - context().readForwardFee();
        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdatePerpPositionSuccess {
                orderId: msg.orderId,
                receive: receive,
                trxId: msg.trxId
            }.toCell()
        });
        dump("send update perp position msg");
    }

    fun increasePerpPosition(trxId: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int) {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        // TODO update funding fee
        
        // get position
        let accountPerpPositionOpt: AccountPerpPosition? = self.perpPositions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0
            },
            shortPosition: PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0
            }
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;
        
        // check margin
        if (perpPosition.size == 0) {
            require(marginDelta >= tokenConfig.minMargin, "insufficient margin");
            perpPosition.positionId = self.perpPositionIndexNext;
            self.perpPositionIndexNext += 1;
        }

        // get global position
        let globalLpPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLpPosition: GlobalLPPosition = globalLpPositionOpt != null ? globalLpPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0
        };

        // lp pnl
        let realizedPnl: Int = 0;
        if (globalLpPosition.netSize > 0 && (isLong == globalLpPosition.isLong)) {
            let sizeUsed: Int = sizeDelta > globalLpPosition.netSize ? globalLpPosition.netSize : sizeDelta;
            realizedPnl = self.calculateUnrealizedPnL(isLong, sizeUsed, globalLpPosition.entryPrice, tradePrice);
            sizeDelta -= sizeUsed;
            globalLpPosition.netSize -= sizeUsed;
            if (globalLpPosition.netSize == 0) {
                globalLpPosition.entryPrice = 0;
            }
        }
        // entry price
        if (sizeDelta > 0) {
            globalLpPosition.entryPrice = self.calculateEntryPrice(globalLpPosition.netSize, globalLpPosition.entryPrice, sizeDelta, tradePrice);
        }

        // trading fee
        let tradingFee: Int = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let protocalTradingFee: Int = tradingFee * tokenConfig.protocalTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let rbfTradingFee: Int = tradingFee - lpTradingFee - protocalTradingFee;

        self.globalLPLiquidity.tradingFeeGrowth += lpTradingFee * DECIMAL_FACTOR / self.globalLPLiquidity.liquidity;
        self.protocalTradingFee += protocalTradingFee;
        self.globalRBFPosition.riskBufferFund += realizedPnl + rbfTradingFee;

        // check liquidity
        require(globalLpPosition.netSize <= self.globalRBFPosition.riskBufferFund + self.calculateTotalGlobalUnrealizedPnl() + self.globalLPLiquidity.liquidity, 
            "insufficient liquidity");

        // TODO funding fee
        let fundingFee: Int = 0;

        // update position
        perpPosition.margin += marginDelta + fundingFee - tradingFee;
        perpPosition.entryPrice = self.calculateEntryPrice(perpPosition.size, perpPosition.entryPrice, sizeDelta, tradePrice);
        perpPosition.size += sizeDelta;

        // check maintain margin
        let unrealizedPnl: Int = self.calculateUnrealizedPnL(isLong, perpPosition.size, perpPosition.entryPrice, tradePrice);
        let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

        // check leverage
        require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size, "legerage too high");

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
        }
        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);

        self.globalLPPositions.set(tokenId, globalLpPosition);

        // event
        emit(PerpPositionIncreasedEvent{
            positionId: perpPosition.positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDelta,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: tradePrice,
            entryPrice: perpPosition.entryPrice,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            trxId: trxId
        }.toCell());
        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLpPosition.netSize,
            isLong: globalLpPosition.isLong,
            entryPriceAfter: globalLpPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalRBFChangedEvent{
            riskBufferFundAfter: self.globalRBFPosition.riskBufferFund,
            liquidityAfter: self.globalRBFPosition.liquidity,
            tradingFee: rbfTradingFee,
            liquidation: 0,
            trxId: trxId
        }.toCell());
    }

    // ============================ private function ================================ //
    // TODO update token pnl in trx, save gas
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
                    let indexPrice: Int = self.getPrice(i);
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
            return size * (price - entryPrice) / DECIMAL_FACTOR;
        } else {
            return size * (entryPrice - price) / DECIMAL_FACTOR;
        }
    }

    fun calculateEntryPrice(sizeBefore: Int, entryPrice: Int, sizeDelta: Int, tradePrice: Int): Int {
        if (sizeBefore == 0 && sizeDelta == 0) {
            return 0;
        }
        if (sizeBefore == 0) {
            return tradePrice;
        }
        if (sizeDelta == 0) {
            return entryPrice;
        }
        let liquidity: Int = sizeBefore * entryPrice + sizeDelta * tradePrice;
        let sizeAfter: Int = sizeBefore + sizeDelta;
        return liquidity / sizeAfter;
    }

    fun setPrice(pricesLength: Int, prices: map<Int, UpdatePrice>) {
        if (pricesLength <= 0) {
            return;
        }
        let i: Int = 0;
        while(i < pricesLength) {
            let updatePrice: UpdatePrice? = prices.get(i);
            if (updatePrice != null) {
                // TODO 检查price较上次偏移?
                let price: Int = (updatePrice!!).price;
                let tokenId: Int = (updatePrice!!).tokenId;

                let priceDataOpt: PriceData? = self.prices.get(tokenId);
                if (priceDataOpt != null) {
                    let priceData: PriceData = priceDataOpt!!;
                    priceData.price = price;
                    self.prices.set(tokenId, priceData);
                } else {
                    self.prices.set(tokenId, PriceData{
                        price: price
                    });
                }
            }
            i = i + 1;
        }
        emit(UpdatePriceEvent{
            pricesLength: pricesLength,
            prices: prices
        }.toCell());
    }

    // TODO
    fun getPrice(tokenId: Int): Int {
        let priceData: PriceData? = self.prices.get(tokenId);
        let price: Int = 0;
        if (priceData != null) {
            price = (priceData!!).price;
        }
        return price;
    }

}
