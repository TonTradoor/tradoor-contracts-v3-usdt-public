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
    tokenIdNext: Int as uint64 = 1;

    // lpLockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    lpLockTime: Int = 10 * 60; // TODO lock 10 min for test
    lpBonusFactor: Int = pow(10, 9);
    lpLiquidityFactor: Int = pow(10, 9);

    // admin
    owner: Address;
    orderBook: Address;
    protocolTradingFee: Int = 0;
    executors: map<Address, Bool>; // account => enabled

    // LP
    lpPositions: map<Address, LPPosition>; // trader => LP
    lpPositionIndexNext: Int as uint64 = 1;

    globalLPPositions: map<Int, GlobalLPPosition>; // tokenId => globalLP

    globalLPFund: Int = 0;
    globalLPLiquidity: Int = 0;
    globalLPFundingFeeGrowth: Int = 0;
    globalLPUnrealizedPnl: Int = 0;

    // Perp
    perpPositions: map<Int, AccountPerpPosition>; // tokenId => user => direction => position
    perpPositionIndexNext: Int as uint64 = 1;
    globalPositions : map<Int, GlobalPosition>; // tokenId => globalPosition

    globalPerpNetValue: Int = 0;
    globalPerpSingleValue: Int = 0;

    // funding rate
    globalFundingRateSamples: map<Int, GlobalFundingRateSample>; // tokenId => sample

    // price
    prices: map<Int, Int>; // tokenId => priceData

    premiumRateSampleRanges: map<Int, PremiumRateSampleRange>; // index => range
    premiumRateSampleRangeLength: Int = 0;
    prevPremiumRateSamples: map<Int, PremiumRateSampleData>;

    init(deployId: Int) {
        self.owner = sender();
        self.orderBook = newAddress(0, 0);
        self.executors.set(sender(), true);
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: UpdateConfig) {
        self.requireOwner();

        if (msg.executor != null && msg.enableExecutor != null) {
            self.executors.set(msg.executor!!, msg.enableExecutor!!);
        }
        if (msg.gasConsumption != null) {
            self.gasConsumption = msg.gasConsumption!!;
        }
        if (msg.minTonsForStorage != null) {
            self.minTonsForStorage = msg.minTonsForStorage!!;
        }
        if (msg.lpLockTime != null) {
            self.lpLockTime = msg.lpLockTime!!;
        }
        if (msg.lpBonusFactor != null) {
            self.lpBonusFactor = msg.lpBonusFactor!!;
        }
        if (msg.lpLiquidityFactor != null) {
            self.lpLiquidityFactor = msg.lpLiquidityFactor!!;
        }
        if (msg.orderBook != null) {
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
        let tokenConfig: TokenConfig = tokenConfigOpt != null ? tokenConfigOpt!! : TokenConfig{
            name: "",
            enable: false,
            minMargin: 10 * pow(10, 6), // 10U
            maxLeverage: 100,
            liquidationFee: 2 * pow(10, 5), // 0.2U
            tradingFeeRate: 1_000_000, // 0.1%
            lpTradingFeeRate: 600_000_000, // 60%
            liquidityProportion: 100_000_000, // 10%
            interestRate: 0,
            maxFundingRate: 0
        };

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
        if (msg.maxFundingRate != null){
            tokenConfig.maxFundingRate = msg.maxFundingRate!!;
        }
        if (msg.tokenId >= self.tokenIdNext) {
            self.tokenIdNext = msg.tokenId + 1;
        }

        self.tokenConfigs.set(msg.tokenId, tokenConfig);
        
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
            gasConsumption: self.gasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            lpLockTime: self.lpLockTime,
            lpBonusFactor: self.lpBonusFactor,
            lpLiquidityFactor: self.lpLiquidityFactor,
            orderBook: self.orderBook
        };
    }

    get fun tokenConfig(tokenId: Int): TokenConfigData {
        return TokenConfigData{
            tokenIdNext: self.tokenIdNext,
            tokenConfig: self.tokenConfigs.get(tokenId)
        };
    }

    // get fun priceData(tokenId: Int): PriceData? {
    //     return self.prices.get(tokenId);
    // }

    // ======================================================== LP ================================================================ //
    receive(msg: UpdateLPPosition) {
        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.updatePriceAndFundingFee(msg.pricesLength, msg.prices);

        // update position
        let receive: Int = 0;
        if (msg.isIncrease) {
            self.increaseLPPosition(msg.account, msg.liquidityDelta, msg.trxId);
        } else {
            receive = self.decreaseLPPosition(msg.account, msg.liquidityDelta, msg.trxId);
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
    }

    fun increaseLPPosition(account: Address, liquidityDelta: Int, trxId: Int) {
        // get position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(account);
        // init position if not exist
        let lpPosition: LPPosition = LPPosition{
                positionId: 0,
                liquidity: 0,
                bonus: 0,
                realizedFundingFee: 0,
                entryFundingFeeGrowth: 0,
                unlockTime: 0
            };
        if (lpPositionOpt != null) {
            lpPosition = lpPositionOpt!!;
        } else {
            lpPosition.positionId = self.lpPositionIndexNext;
            self.lpPositionIndexNext = self.lpPositionIndexNext + 1;
        }

        // update LP
        // calculate bonus
        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;
        if (globalNetLP < 0) {
            globalNetLP = 0;
        }
        let bonus: Int = 0;
        if (globalNetLP < self.globalLPLiquidity) {
            // bonus = b + s (1 - x) * liquidity
            bonus = self.lpBonusFactor * (self.globalLPLiquidity - globalNetLP)
                 * liquidityDelta / (self.globalLPLiquidity * PERCENTAGE_BASIS_POINT);
            lpPosition.bonus = lpPosition.bonus + bonus;
        }
        // funding fee
        let realizedFundingFee: Int = 0;
        if (lpPosition.liquidity > 0) {
            realizedFundingFee = (self.globalLPFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity / PRICE_DECIMAL_FACTOR;
        }

        // update position
        lpPosition.liquidity = lpPosition.liquidity + liquidityDelta;
        lpPosition.realizedFundingFee += realizedFundingFee;
        lpPosition.entryFundingFeeGrowth = self.globalLPFundingFeeGrowth;
        lpPosition.unlockTime = now() + self.lpLockTime;

        // set position
        self.lpPositions.set(account, lpPosition);

        // update global position
        self.globalLPFund = self.globalLPFund + liquidityDelta;
        self.globalLPLiquidity = self.globalLPLiquidity + liquidityDelta;

        emit(LPPositionIncreasedEvent{
            opType: ORDER_OP_TYPE_INCREASE,
            positionId: lpPosition.positionId,
            account: account,
            liquidityDelta: liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            bonusDelta: bonus,
            bonusAfter: lpPosition.bonus,
            unlockTimeAfter: lpPosition.unlockTime,
            realizedFundingFeeDelta: realizedFundingFee,
            realizedFundingFeeAfter: lpPosition.realizedFundingFee,
            entryFundingFeeGrowthAfter: lpPosition.entryFundingFeeGrowth,
            trxId: trxId
        }.toCell());
        emit(GlobalLPLiquidityChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: 0,
            realizedPnl: 0,
            trxId: trxId
        }.toCell());
    }

    fun decreaseLPPosition(account: Address, liquidityDelta: Int, trxId: Int): Int {
        // get position
        let lpPositionOpt: LPPosition? = self.lpPositions.get(account);
        // check position
        require(lpPositionOpt != null, "position not exist");
        let lpPosition: LPPosition = lpPositionOpt!!;

        // check unlock time
        require(lpPosition.unlockTime <= now(), "not reach unlock time");

        // decrease liquidity delta
        if (lpPosition.liquidity < liquidityDelta) {
            liquidityDelta = lpPosition.liquidity;
        }

        // calculate LP global unrealized pnl
        let totalGlobalUnrealizedPnl: Int = self.globalLPUnrealizedPnl;
        let globalNetLP: Int = self.globalLPFund + totalGlobalUnrealizedPnl;
        require(globalNetLP > 0, "insufficient global LP");

        // calculate receive amount
        if (globalNetLP < 0) {
            globalNetLP = 0;
        }
        require(globalNetLP > 0, "insufficient global net LP");

        let receive: Int = 0;
        let bonus: Int = 0;

        if (globalNetLP >= self.globalLPLiquidity) {
            let n: Int = ((now() - lpPosition.unlockTime)  + self.lpLockTime) / DAY;

            if (lpPosition.bonus == 0) {
                // bonus = liquidity * r（x-1）* min(n，100）* 0.1%
                bonus = liquidityDelta * self.lpBonusFactor * (globalNetLP - self.globalLPLiquidity) * min(n, 100) / (globalNetLP * 1000 * PERCENTAGE_BASIS_POINT);
            } else {
                let bonus1: Int = liquidityDelta * (globalNetLP - self.globalLPLiquidity) / globalNetLP;
                let bonus2: Int = lpPosition.bonus;
                let bonus3: Int = liquidityDelta * self.lpBonusFactor * (globalNetLP - self.globalLPLiquidity) * min(n, 100) / (globalNetLP * 1000 * PERCENTAGE_BASIS_POINT);
                bonus = max(min(bonus1, bonus2), bonus3);
            }
            receive = liquidityDelta + bonus;
        } else {
            receive = liquidityDelta * globalNetLP / self.globalLPLiquidity;
        }
        // withdraw funding fee
        let realizedFundingFee: Int = 0;
        if (lpPosition.liquidity > 0) {
            realizedFundingFee = (self.globalLPFundingFeeGrowth - lpPosition.entryFundingFeeGrowth) * lpPosition.liquidity / PRICE_DECIMAL_FACTOR;
        }
        realizedFundingFee += lpPosition.realizedFundingFee;
        receive += realizedFundingFee;

        // update position
        lpPosition.realizedFundingFee = 0;
        lpPosition.liquidity -= liquidityDelta;
        lpPosition.bonus -= max(lpPosition.bonus, bonus);

        // set position
        if (lpPosition.liquidity > 0 || lpPosition.bonus > 0) {
            self.lpPositions.set(account, lpPosition);
        } else {
            self.lpPositions.set(account, null);
        }

        // update global position
        self.globalLPFund = self.globalLPFund - receive;
        self.globalLPLiquidity = self.globalLPLiquidity - liquidityDelta;

        // event
        emit(LPPositionDecreasedEvent{
            opType: ORDER_OP_TYPE_DECREASE,
            positionId: lpPosition.positionId,
            account: account,
            liquidityDelta: liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            bonusDelta: bonus,
            bonusAfter: lpPosition.bonus,
            fundingFeeDelta: realizedFundingFee,
            entryFundingFeeGrowthAfter: lpPosition.entryFundingFeeGrowth,
            receive: receive,
            trxId: trxId
        }.toCell());
        emit(GlobalLPLiquidityChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: 0,
            realizedPnl: 0,
            trxId: trxId
        }.toCell());
        return receive;
    }

    get fun lpPosition(account: Address?): LPPositionData? {
        let lpPosition: LPPosition? = null; 
        if (account != null) {
            lpPosition = self.lpPositions.get(account!!);
        }
        return LPPositionData {
            lpPosition: lpPosition,
            globalLPFund: self.globalLPFund,
            globalLPLiquidity: self.globalLPLiquidity,
            globalLPFundingFeeGrowth: self.globalLPFundingFeeGrowth,
            globalLPUnrealizedPnl: self.globalLPUnrealizedPnl
        };
    }

    // ============================ Perp ================================ //
    receive(msg: UpdatePerpPosition) {
        // dump("UpdatePerpPosition");

        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.updatePriceAndFundingFee(msg.pricesLength, msg.prices);

        // get index price
        let indexPrice: Int = 0;
        let pricOpt: Int? = self.prices.get(msg.tokenId);
        if (pricOpt != null) {
            indexPrice = pricOpt!!;
        }
        require(indexPrice > 0, "none available price");

        // update PR
        let premiumRateSampleOpt: PremiumRateSampleData? = null;
        if (msg.opType == ORDER_OP_TYPE_INCREASE_MARKET || msg.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            premiumRateSampleOpt = self.calculatePremiumRate(msg.tokenId, msg.sizeDelta, msg.isLong);
        } else {
            premiumRateSampleOpt = self.calculatePremiumRate(msg.tokenId, msg.sizeDelta, !msg.isLong);
        }

        let prevPremiumRateSampleOpt: PremiumRateSampleData? = self.prevPremiumRateSamples.get(msg.tokenId);
        let prevPremiumRateSample: PremiumRateSampleData = prevPremiumRateSampleOpt != null ? prevPremiumRateSampleOpt!! : PremiumRateSampleData{
            rangeId: 0,
            sampleId: 0,
            deviationRate: 0,
            premiumRate: 0
        };
        let avgPremiumRate: Int = prevPremiumRateSample.premiumRate;
        
        if (premiumRateSampleOpt != null) {
            let premiumRateSample: PremiumRateSampleData = premiumRateSampleOpt!!;
            avgPremiumRate = (premiumRateSample.premiumRate + avgPremiumRate) / 2;
            prevPremiumRateSample = premiumRateSample;
            self.prevPremiumRateSamples.set(msg.tokenId, prevPremiumRateSample);
            emit(PremiumRateChangedEvent{
                tokenId: msg.tokenId,
                deviationRate: prevPremiumRateSample.deviationRate,
                premiumRate: prevPremiumRateSample.premiumRate
            }.toCell());
        }

        // calculate trade price
        let tradePrice: Int = (PERCENTAGE_BASIS_POINT + avgPremiumRate) * indexPrice / PERCENTAGE_BASIS_POINT;

        // update position
        let receive: Int = 0;
        if (msg.opType == ORDER_OP_TYPE_INCREASE_MARKET || msg.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.increasePerpPosition(msg.opType, msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, indexPrice, tradePrice);
        } else if (msg.opType == ORDER_OP_TYPE_LIQUIDATION) {
            receive = self.liquidatePerpPosition(msg.trxId, msg.account, msg.tokenId, msg.isLong, indexPrice, tradePrice);
        } else if (msg.opType == ORDER_OP_TYPE_ADL) {
            receive = self.decreasePerpPosition(msg.opType, msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, indexPrice, tradePrice);
        } else {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            receive = self.decreasePerpPosition(msg.opType, msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, indexPrice, tradePrice);
        } 

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
    }

    fun increasePerpPosition(opType: Int, trxId: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, indexPrice: Int, tradePrice: Int) {
        // dump("increasePerpPosition");
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");
        
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
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{
            longMargin: 0,
            shortMargin: 0,
            longSize: 0,
            shortSize: 0,
            longFundingFeeGrowth: 0,
            shortFundingFeeGrowth: 0,
            longValue: 0,
            shortValue: 0
        };
        if (isLong) {
            globalPosition.longSize += sizeDelta;
        } else {
            globalPosition.shortSize += sizeDelta;
        }
        // update global value and check liquidity
        let singleValueBefore: Int = max(globalPosition.longValue, globalPosition.shortValue);
        let netValueBefore: Int = abs(globalPosition.longValue - globalPosition.shortValue);
        globalPosition.longValue = globalPosition.longSize * indexPrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * indexPrice / PRICE_DECIMAL_FACTOR;
        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        require(self.globalPerpSingleValue <= self.globalLPFund * self.lpLiquidityFactor / PERCENTAGE_BASIS_POINT, "insufficient liquidity for single value");
        
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;
        require(self.globalPerpNetValue <= self.globalLPFund, "insufficient liquidity for net value");

        // get global lp position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0,
            unrealizedPnl: 0
        };

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
        let fundingFee: Int = 0;
        let entryFundingFeeGrowthAfter: Int = 0;
        if (perpPosition.size > 0) {
            if (isLong) {
                fundingFee = (globalPosition.longFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
                entryFundingFeeGrowthAfter = globalPosition.longFundingFeeGrowth;
            } else {
                fundingFee = (globalPosition.shortFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
                entryFundingFeeGrowthAfter = globalPosition.shortFundingFeeGrowth;
            }
        }

        // update position
        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += marginDelta + fundingFee - tradingFee;
        let marginDeltaAfter: Int = perpPosition.margin - marginBefore;

        perpPosition.entryPrice = (perpPosition.size * perpPosition.entryPrice + sizeDelta * tradePrice) / (perpPosition.size + sizeDelta);
        perpPosition.size += sizeDelta;
        perpPosition.entryFundingFeeGrowth = entryFundingFeeGrowthAfter;

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

        // check leverage
        require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / PRICE_DECIMAL_FACTOR, "legerage too high");

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

        // event
        emit(PerpPositionIncreasedEvent{
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
            entryFundingFeeGrowthAfter: entryFundingFeeGrowthAfter,
            trxId: trxId
        }.toCell());
        emit(GlobalPositionChangedEvent{
            tokenId: tokenId,
            longMarginAfter: globalPosition.longMargin,
            shortMarginAfter: globalPosition.shortMargin,
            longSizeAfter: globalPosition.longSize,
            shortSizeAfter: globalPosition.shortSize,
            longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            trxId: trxId
        }.toCell());
        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLPPosition.netSize,
            isLong: globalLPPosition.isLong,
            entryPriceAfter: globalLPPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalLPLiquidityChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: lpTradingFee,
            realizedPnl: lpRealizedPnl,
            trxId: trxId
        }.toCell());
        // dump("increasePerpPosition done");
    }

    fun decreasePerpPosition(opType: Int, trxId: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, indexPrice: Int, tradePrice: Int): Int {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");
        
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

        // clamp delta
        if (sizeDelta > perpPosition.size) {
            sizeDelta = perpPosition.size;
        }

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{
            longMargin: 0,
            shortMargin: 0,
            longSize: 0,
            shortSize: 0,
            longFundingFeeGrowth: 0,
            shortFundingFeeGrowth: 0,
            longValue: 0,
            shortValue: 0
        };

        // funding fee
        let fundingFee: Int = 0;
        let entryFundingFeeGrowthAfter: Int = 0;
        if (perpPosition.size > 0) {
            if (isLong) {
                fundingFee = (globalPosition.longFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
                entryFundingFeeGrowthAfter = globalPosition.longFundingFeeGrowth;
            } else {
                fundingFee = (globalPosition.shortFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
                entryFundingFeeGrowthAfter = globalPosition.shortFundingFeeGrowth;
            }
        }

        // get global position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0,
            unrealizedPnl: 0
        };

        // lp pnl
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
        // dump(sizeRemaining);
        // dump(isLong);
        // lp entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * tradePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
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
        let positionId: Int = perpPosition.positionId;
        let receive: Int = 0;
        let realizedPnl: Int = 0;
        // position pnl
        if (isLong) {
            realizedPnl = sizeDelta * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            realizedPnl = sizeDelta * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }

        // margin
        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += realizedPnl + fundingFee - tradingFee;
        
        require(perpPosition.margin >= 0, "insufficient margin");
        if (marginDelta > perpPosition.margin) {
            marginDelta = perpPosition.margin;
        }
        perpPosition.margin -= marginDelta;
        perpPosition.size -= sizeDelta;
        perpPosition.entryFundingFeeGrowth = entryFundingFeeGrowthAfter;
        let marginDeltaAfter: Int = marginBefore - perpPosition.margin;

        if (perpPosition.size > 0) {
            // check maintain margin
            let unrealizedPnl: Int = 0;
            if (isLong) {
                unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
            require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

            // check leverage
            require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size, "legerage too high");
            receive = marginDelta;
        } else {
            // close position
            // withdraw all margin
            marginDeltaAfter += perpPosition.margin;
            receive = marginDelta + perpPosition.margin;
            perpPosition = PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0
            };
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

        // update global value
        let singleValueBefore: Int = max(globalPosition.longValue, globalPosition.shortValue);
        let netValueBefore: Int = abs(globalPosition.longValue - globalPosition.shortValue);
        globalPosition.longValue = globalPosition.longSize * indexPrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * indexPrice / PRICE_DECIMAL_FACTOR;
        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        // event
        // emit(PerpPositionDecreasedEvent{
        //     opType: opType,
        //     positionId: positionId,
        //     account: account,
        //     tokenId: tokenId,
        //     isLong: isLong,
        //     marginDelta: marginDeltaAfter,
        //     marginAfter: perpPosition.margin,
        //     sizeDelta: sizeDelta,
        //     sizeAfter: perpPosition.size,
        //     tradePrice: tradePrice,
        //     realizedPnLDelta: realizedPnl,
        //     tradingFee: tradingFee,
        //     fundingFee: fundingFee,
        //     entryFundingFeeGrowthAfter: entryFundingFeeGrowthAfter,
        //     receive: receive,
        //     trxId: trxId
        // }.toCell());
        // emit(GlobalPositionChangedEvent{
        //     tokenId: tokenId,
        //     longMarginAfter: globalPosition.longMargin,
        //     shortMarginAfter: globalPosition.shortMargin,
        //     longSizeAfter: globalPosition.longSize,
        //     shortSizeAfter: globalPosition.shortSize,
        //     longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
        //     shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
        //     trxId: trxId
        // }.toCell());
        // emit(GlobalLPPositionChangedEvent{
        //     tokenId: tokenId,
        //     netSizeAfter: globalLPPosition.netSize,
        //     isLong: globalLPPosition.isLong,
        //     entryPriceAfter: globalLPPosition.entryPrice,
        //     trxId: trxId
        // }.toCell());
        // emit(GlobalLPLiquidityChangedEvent{
        //     lpFundAfter: self.globalLPFund,
        //     liquidityAfter: self.globalLPLiquidity,
        //     tradingFee: lpTradingFee,
        //     realizedPnl: lpRealizedPnl,
        //     trxId: trxId
        // }.toCell());
        return receive;
    }

    fun liquidatePerpPosition(trxId: Int, account: Address, tokenId: Int, isLong: Bool, indexPrice: Int, tradePrice: Int): Int {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");
        
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

        // delta
        let marginDelta: Int = perpPosition.margin;
        let sizeDelta: Int = perpPosition.size;

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{
            longMargin: 0,
            shortMargin: 0,
            longSize: 0,
            shortSize: 0,
            longFundingFeeGrowth: 0,
            shortFundingFeeGrowth: 0,
            longValue: 0,
            shortValue: 0
        };

        // funding fee
        let fundingFee: Int = 0;
        let entryFundingFeeGrowthAfter: Int = 0;
        if (perpPosition.size > 0) {
            if (isLong) {
                fundingFee = (globalPosition.longFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
                entryFundingFeeGrowthAfter = globalPosition.longFundingFeeGrowth;
            } else {
                fundingFee = (globalPosition.shortFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
                entryFundingFeeGrowthAfter = globalPosition.shortFundingFeeGrowth;
            }
        }

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin >= perpPosition.margin + unrealizedPnl, "margin rate too low");

        // liquidate price
        let liquidatePrice: Int = ((perpPosition.margin + fundingFee - tokenConfig.liquidationFee) * PRICE_DECIMAL_FACTOR + (isLong ? -perpPosition.entryPrice * perpPosition.size : perpPosition.entryPrice * perpPosition.size)) 
            / (perpPosition.size * (tokenConfig.tradingFeeRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)) / PERCENTAGE_BASIS_POINT);
        // dump("liquidatePrice");
        // dump(liquidatePrice);
        // dump(perpPosition.entryPrice);
        require(isLong ? liquidatePrice < perpPosition.entryPrice : liquidatePrice > perpPosition.entryPrice, "not reach liquidate price");
        tradePrice = liquidatePrice;

        // get global position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0,
            unrealizedPnl: 0
        };

        // lp pnl
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
        // lp entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * tradePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
        }

        // trading fee
        let tradingFee: Int = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let protocolTradingFee: Int = tradingFee - lpTradingFee;

        self.protocolTradingFee += protocolTradingFee;
        self.globalLPFund += lpRealizedPnl + lpTradingFee;

        let positionId: Int = perpPosition.positionId;
        let receive: Int = 0;
        let realizedPnl: Int = 0;
        // close position
        receive = tokenConfig.liquidationFee;
        realizedPnl = -lpRealizedPnl;
        perpPosition = PerpPosition {
            positionId: 0,
            margin: 0,
            size: 0,
            entryPrice: 0,
            entryFundingFeeGrowth: 0
        };

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
        let singleValueBefore: Int = max(globalPosition.longValue, globalPosition.shortValue);
        let netValueBefore: Int = abs(globalPosition.longValue - globalPosition.shortValue);
        globalPosition.longValue = globalPosition.longSize * indexPrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * indexPrice / PRICE_DECIMAL_FACTOR;
        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        // event
        emit(PerpPositionDecreasedEvent{
            opType: ORDER_OP_TYPE_LIQUIDATION,
            positionId: positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDelta,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: tradePrice,
            realizedPnLDelta: realizedPnl,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            entryFundingFeeGrowthAfter: entryFundingFeeGrowthAfter,
            receive: receive,
            trxId: trxId
        }.toCell());
        emit(GlobalPositionChangedEvent{
            tokenId: tokenId,
            longMarginAfter: globalPosition.longMargin,
            shortMarginAfter: globalPosition.shortMargin,
            longSizeAfter: globalPosition.longSize,
            shortSizeAfter: globalPosition.shortSize,
            longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            trxId: trxId
        }.toCell());
        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLPPosition.netSize,
            isLong: globalLPPosition.isLong,
            entryPriceAfter: globalLPPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalLPLiquidityChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: lpTradingFee,
            realizedPnl: lpRealizedPnl,
            trxId: trxId
        }.toCell());
        return receive;
    }

    get fun perpPosition(tokenId: Int, account: Address?): PerpPositionData? {
        // get position
        let perpPosition: DirectionPerpPosition? = null;
        if (account != null) {
            let accountPerpPositionOpt: AccountPerpPosition? = self.perpPositions.get(tokenId);
            if (accountPerpPositionOpt != null) {
                perpPosition = (accountPerpPositionOpt!!).positions.get(account!!);
            }
        }
        return PerpPositionData{
            globalPerpNetValue: self.globalPerpNetValue,
            globalPerpSingleValue: self.globalPerpSingleValue,
            perpPosition: perpPosition,
            globalLPPosition: self.globalLPPositions.get(tokenId),
            globalPosition: self.globalPositions.get(tokenId),
            globalFundingRateSample: self.globalFundingRateSamples.get(tokenId)
        };
    }

    // ============================ price ================================ //
    receive(msg: UpdatePrice) {
        // check sender
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        require(isExecutor, "invalid sender");

        // update price
        self.updatePriceAndFundingFee(msg.pricesLength, msg.prices);
    }

    receive(msg: SetPremiumRateSampleRange) {
        // check sender
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        require(isExecutor, "invalid sender");

        if (msg.sampleRangeLength <= 0) {
            return;
        }
        let i: Int = 0;
        while(i < msg.sampleRangeLength) {
            let premiumRateSampleRangeParamOpt: PremiumRateSampleRangeParam? = msg.sampleRanges.get(i);

            if (premiumRateSampleRangeParamOpt != null) {
                let premiumRateSampleRangeParam: PremiumRateSampleRangeParam = premiumRateSampleRangeParamOpt!!;
                self.premiumRateSampleRanges.set(premiumRateSampleRangeParam.sampleId, PremiumRateSampleRange{
                    sampleLength: premiumRateSampleRangeParam.sampleLength,
                    samples: premiumRateSampleRangeParam.samples
                });
                if (premiumRateSampleRangeParam.sampleId >= self.premiumRateSampleRangeLength) {
                    self.premiumRateSampleRangeLength = premiumRateSampleRangeParam.sampleId + 1;
                }
            }

            i += 1;
        }
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue
        });
    }

    // ============================ private function ================================ //
    fun updatePriceAndFundingFee(pricesLength: Int, prices: map<Int, UpdatePriceParam>) {
        if (pricesLength <= 0) {
            return;
        }
        let i: Int = 0;
        let totalGlobalUnrealizedPnl: Int = self.globalLPUnrealizedPnl;
        while(i < pricesLength) {
            let updatePrice: UpdatePriceParam? = prices.get(i);
            if (updatePrice != null) {
                // TODO check price offset
                let price: Int = (updatePrice!!).price;
                let tokenId: Int = (updatePrice!!).tokenId;

                let priceOpt: Int? = self.prices.get(tokenId);
                if (priceOpt != null) {
                    self.prices.set(tokenId, price);
                } else {
                    self.prices.set(tokenId, price);
                }

                // update lp pnl
                let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
                if (globalLPPositionOpt != null) {
                    let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;
                    // unrealized pnl
                    let unrealizedPnl: Int = 0;
                    if (globalLPPosition.isLong) {
                        unrealizedPnl = globalLPPosition.netSize * (price - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
                    } else {
                        unrealizedPnl = globalLPPosition.netSize * (globalLPPosition.entryPrice - price) / PRICE_DECIMAL_FACTOR;
                    }
                    totalGlobalUnrealizedPnl = totalGlobalUnrealizedPnl - globalLPPosition.unrealizedPnl + unrealizedPnl;
                    self.globalLPPositions.set(tokenId, globalLPPosition);
                }

                // update global value
                let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
                if (globalPositionOpt != null) {
                    let globalPosition: GlobalPosition = globalPositionOpt!!;
                    let singleValueBefore: Int = max(globalPosition.longValue, globalPosition.shortValue);
                    let netValueBefore: Int = abs(globalPosition.longValue - globalPosition.shortValue);
                    globalPosition.longValue = globalPosition.longSize * price / PRICE_DECIMAL_FACTOR;
                    globalPosition.shortValue = globalPosition.shortSize * price / PRICE_DECIMAL_FACTOR;
                    self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
                    self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;
                    self.globalPositions.set(tokenId, globalPosition);
                }

                // update funding fee
                let lpReceivedFundingFee: Int = self.updateFundingRate(tokenId, price);
                emit(UpdatePriceEvent{
                    tokenId: tokenId,
                    price: price,
                    lpFundingFee: lpReceivedFundingFee
                }.toCell());
            }
            i = i + 1;
        }
        self.globalLPUnrealizedPnl = totalGlobalUnrealizedPnl;
    }

    // fun getPrice(tokenId: Int): Int {
    //     let priceData: PriceData? = self.prices.get(tokenId);
    //     let price: Int = 0;
    //     if (priceData != null) {
    //         price = (priceData!!).price;
    //     }
    //     return price;
    // }

    fun updateFundingRate(tokenId: Int, indexPrice: Int): Int {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "token config not exist");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;

        // =========== calculate sample =========== //
        // get funding rate sample
        let sampleOpt: GlobalFundingRateSample? = self.globalFundingRateSamples.get(tokenId);
        let sample: GlobalFundingRateSample = sampleOpt != null ? sampleOpt!! : GlobalFundingRateSample{
            lastAdjustFundingRateTime: now() - (now() % ADJUST_FUNDING_RATE_INTERVAL),
            sampleCount: 0,
            cumulativePremiumRate: 0
        };

        let lastAdjustFundingRateTime: Int = sample.lastAdjustFundingRateTime;
        // at most 1 hour of premium rate sampling
        let maxSamplingTime: Int = lastAdjustFundingRateTime + ADJUST_FUNDING_RATE_INTERVAL;
        let timestamp: Int = now();
        if (maxSamplingTime < timestamp) {
            timestamp = maxSamplingTime;
        }

        let lastSamplingTime: Int = lastAdjustFundingRateTime + sample.sampleCount * SAMPLE_PREMIUM_RATE_INTERVAL;
        let timeDelta: Int = timestamp - lastSamplingTime;
        if (timeDelta < SAMPLE_PREMIUM_RATE_INTERVAL) {
            // no need to update
            return 0;
        }

        // get PR
        let prevPremiumRateSampleOpt: PremiumRateSampleData? = self.prevPremiumRateSamples.get(tokenId);
        let prevPremiumRateSample: PremiumRateSampleData = prevPremiumRateSampleOpt != null ? prevPremiumRateSampleOpt!! : PremiumRateSampleData{
            rangeId: 0,
            sampleId: 0,
            deviationRate: 0,
            premiumRate: 0
        };
        let premiumRate: Int = prevPremiumRateSample.premiumRate;

        // cumulative sample count
        let sampleCountDelta: Int = timeDelta / SAMPLE_PREMIUM_RATE_INTERVAL;
        let sampleCountAfter: Int = sample.sampleCount + sampleCountDelta;

        // cumulative PR
        let cumulativePremiumRate: Int = premiumRate * ((sample.sampleCount + 1 + sampleCountAfter) * sampleCountDelta / 2 );
        cumulativePremiumRate = sample.cumulativePremiumRate + cumulativePremiumRate;

        // dump(sampleCountAfter);

        // sample count < 720, no need update funding rate
        if (sampleCountAfter < REQUIRED_SAMPLE_COUNT) {
            sample.cumulativePremiumRate = cumulativePremiumRate;
            sample.sampleCount = sampleCountAfter;
            self.globalFundingRateSamples.set(tokenId, sample);
            return 0;
        }

        // average PR
        let premiumRateAvg: Int = cumulativePremiumRate / PREMIUM_RATE_AVG_DENOMINATOR;
        
        // clamp (IR - avgPR) : -0.05% <= (IR - avgPR) <= 0.05%
        let rateDelta: Int = tokenConfig.interestRate - premiumRateAvg;
        let clampedRateDelta: Int = 0;
        if (rateDelta > PREMIUM_RATE_CLAMP_BOUNDARY) {
            clampedRateDelta = PREMIUM_RATE_CLAMP_BOUNDARY;
        } else if (rateDelta < -PREMIUM_RATE_CLAMP_BOUNDARY) {
            clampedRateDelta = -PREMIUM_RATE_CLAMP_BOUNDARY;
        } else {
            clampedRateDelta = rateDelta;
        }
        let fundingRateDelta: Int = premiumRateAvg + clampedRateDelta;
        
        sample.lastAdjustFundingRateTime = maxSamplingTime;
        sample.cumulativePremiumRate = 0;
        sample.sampleCount = 0;
        self.globalFundingRateSamples.set(tokenId, sample);

        // =========== update funding rate =========== //
        // clamp fundingRateDelta: -maxFundingRate <= fundingRateDelta <= maxFundingRate
        let maxFundingRate: Int = tokenConfig.maxFundingRate;
        let clampedFundingRateDelta: Int = 0;
        if (fundingRateDelta > maxFundingRate) {
            clampedFundingRateDelta = maxFundingRate;
        } else if (fundingRateDelta < -maxFundingRate) {
            clampedFundingRateDelta = -maxFundingRate;
        } else {
            clampedFundingRateDelta = fundingRateDelta;
        }

        // dump(clampedFundingRateDelta);

        // get paidSize and receivedSize
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        if (globalPositionOpt == null) {
            return 0;
        }

        let globalPosition: GlobalPosition = globalPositionOpt!!;

        let paidSize: Int = 0;
        let receivedSize: Int = 0;
        if (clampedFundingRateDelta >= 0) {
            paidSize = globalPosition.longSize;
            receivedSize = globalPosition.shortSize;
        } else {
            paidSize = globalPosition.shortSize;
            receivedSize = globalPosition.longSize;
        }
        
        // calculate funding rate growth
        // paidFundingFeeGrowthDelta = (paidSize * price * fundingRate) / paidSize = price * fundingRate
        let paidFundingFeeGrowthDelta: Int = indexPrice * clampedFundingRateDelta / PERCENTAGE_BASIS_POINT;

        let receivedFundingFeeGrowthDelta: Int = 0;
        let lpReceivedFundingFee: Int = 0;
        if (paidFundingFeeGrowthDelta > 0) {
            if (receivedSize > 0) {
                receivedFundingFeeGrowthDelta = paidFundingFeeGrowthDelta;
                lpReceivedFundingFee = paidFundingFeeGrowthDelta * (paidSize - receivedSize);
                self.globalLPFundingFeeGrowth += lpReceivedFundingFee / self.globalLPLiquidity;
            } else {
                lpReceivedFundingFee = paidSize * paidFundingFeeGrowthDelta;
                self.globalLPFundingFeeGrowth += lpReceivedFundingFee / self.globalLPLiquidity;
            }
        }
        let longFundingFeeGrowthAfter: Int = globalPosition.longFundingFeeGrowth;
        let shortFundingFeeGrowthAfter: Int = globalPosition.shortFundingFeeGrowth;
        
        // funding rate > 0, long pay for short and LP
        if (clampedFundingRateDelta >= 0) {
            longFundingFeeGrowthAfter = longFundingFeeGrowthAfter - paidFundingFeeGrowthDelta;
            shortFundingFeeGrowthAfter = shortFundingFeeGrowthAfter + receivedFundingFeeGrowthDelta;
        } else {
            longFundingFeeGrowthAfter = longFundingFeeGrowthAfter + receivedFundingFeeGrowthDelta;
            shortFundingFeeGrowthAfter = shortFundingFeeGrowthAfter - paidFundingFeeGrowthDelta;
        }
        globalPosition.longFundingFeeGrowth = longFundingFeeGrowthAfter;
        globalPosition.shortFundingFeeGrowth = shortFundingFeeGrowthAfter;
        self.globalPositions.set(tokenId, globalPosition);
        return lpReceivedFundingFee / PRICE_DECIMAL_FACTOR;
    }

    fun calculatePremiumRate(tokenId: Int, sizeDelta: Int, isLong: Bool): PremiumRateSampleData? {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        if (tokenConfigOpt == null) {
            return null;
        }
        let tokenConfig: TokenConfig = tokenConfigOpt!!;

        // get global lp position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        if (globalLPPositionOpt == null) {
            return null;
        }
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;

        // simulate global lp after
        let globalLPNetSizeAfter: Int = globalLPPosition.netSize;
        let globalLPIsLongAfter: Bool = globalLPPosition.isLong;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong == globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            sizeRemaining -= sizeUsed;
            globalLPNetSizeAfter -= sizeUsed;
        }
        if(sizeRemaining > 0) {
            globalLPNetSizeAfter += sizeRemaining;
            globalLPIsLongAfter = !isLong;
        }

        // calculate DR
        let tokenLiquidity: Int = (self.globalLPFund + self.globalLPUnrealizedPnl) * tokenConfig.liquidityProportion / PERCENTAGE_BASIS_POINT;
        let deviationRate: Int = globalLPNetSizeAfter * PERCENTAGE_BASIS_POINT / tokenLiquidity;

        let premiumRateSample: PremiumRateSampleData = self.searchPremiumRate(tokenId, deviationRate);
        if (globalLPIsLongAfter) {
            premiumRateSample.deviationRate = -premiumRateSample.deviationRate;
            premiumRateSample.premiumRate = -premiumRateSample.premiumRate;
        }

        return premiumRateSample;
    }

    // receive(msg: DeviationRate) {
    //     let result: PremiumRateSampleData = self.searchPremiumRate(msg.deviationRate);
    //     self.prevPremiumRateSample = result;
    //     dump("find PR");
    //     dump(result.rangeId);
    //     dump(result.sampleId);
    //     dump(result.deviationRate);
    //     dump(result.premiumRate);
    // }

    fun searchPremiumRate(tokenId: Int, deviationRate: Int): PremiumRateSampleData {
        let rangeId: Int = deviationRate / 10_000_000;
        if (rangeId >= 200) {
            rangeId = rangeId / 10 * 10;
        } else if (rangeId >= 300) {
            rangeId = 300;
        }
        // dump(rangeId);

        let premiumRateSampleRangeOpt: PremiumRateSampleRange? = self.premiumRateSampleRanges.get(rangeId);
        if (premiumRateSampleRangeOpt == null) {
            return PremiumRateSampleData {
                rangeId: rangeId,
                sampleId: 0,
                deviationRate: 0,
                premiumRate: 0
            };
        }
        let premiumRateSampleRange: PremiumRateSampleRange = premiumRateSampleRangeOpt!!;
        
        // search in range
        let prevPremiumRateSampleOpt: PremiumRateSampleData? = self.prevPremiumRateSamples.get(tokenId);
        let prevSample: PremiumRateSampleData = prevPremiumRateSampleOpt != null ? prevPremiumRateSampleOpt!! : PremiumRateSampleData{
            rangeId: 0,
            sampleId: 0,
            deviationRate: 0,
            premiumRate: 0
        };
        if (deviationRate == prevSample.deviationRate) {
            return prevSample;
        }
        let start: Int = 0;
        let end: Int = premiumRateSampleRange.sampleLength;
        let cur: Int = 0;
        let forward: Bool = (deviationRate > prevSample.deviationRate) ? true : false;
        let curSample: PremiumRateSample = PremiumRateSample{
            deviationRate: 0,
            premiumRate: 0
        };
        if (rangeId == prevSample.rangeId) {
            cur = prevSample.sampleId;
            curSample.deviationRate = prevSample.deviationRate;
            curSample.premiumRate = prevSample.premiumRate;
            if (deviationRate > prevSample.deviationRate) {
                start = prevSample.sampleId;
                cur = start;
            } else {
                end = prevSample.sampleId;
                cur = end;
            }
        } else {
            if (forward) {
                let startSampleOpt: PremiumRateSample? = premiumRateSampleRange.samples.get(start);
                if (startSampleOpt != null) {
                    curSample = PremiumRateSample{
                        deviationRate: (startSampleOpt!!).deviationRate,
                        premiumRate: (startSampleOpt!!).premiumRate
                    };
                }
            } else {
                let endSampleOpt: PremiumRateSample? = premiumRateSampleRange.samples.get(end);
                if (endSampleOpt != null) {
                    curSample = PremiumRateSample{
                        deviationRate: (endSampleOpt!!).deviationRate,
                        premiumRate: (endSampleOpt!!).premiumRate
                    };
                }

            }

        }

        while(cur >= start && cur <= end) {
            // get next
            let next: Int = forward ? cur + 1 : cur - 1;
            let nextSampleOpt: PremiumRateSample? = premiumRateSampleRange.samples.get(next);
            if (nextSampleOpt == null) {
                return PremiumRateSampleData{
                    rangeId: rangeId,
                    sampleId: cur,
                    deviationRate: curSample.deviationRate,
                    premiumRate: curSample.premiumRate
                };
            }
            let nextSample: PremiumRateSample = nextSampleOpt!!;

            if (forward) {
                if (deviationRate < nextSample.deviationRate) {
                    return PremiumRateSampleData{
                        rangeId: rangeId,
                        sampleId: cur,
                        deviationRate: curSample.deviationRate,
                        premiumRate: curSample.premiumRate
                    };
                } else if (deviationRate == nextSample.deviationRate) {
                    return PremiumRateSampleData{
                        rangeId: rangeId,
                        sampleId: next,
                        deviationRate: nextSample.deviationRate,
                        premiumRate: nextSample.premiumRate
                    };
                } else {
                    curSample = nextSample;
                    cur = next;
                }
            } else {
                if (deviationRate >= nextSample.deviationRate) {
                    return PremiumRateSampleData{
                        rangeId: rangeId,
                        sampleId: next,
                        deviationRate: nextSample.deviationRate,
                        premiumRate: nextSample.premiumRate
                    };
                } else {
                    curSample = nextSample;
                    cur = next;
                }
            }

        }

        return PremiumRateSampleData{
            rangeId: rangeId,
            sampleId: cur,
            deviationRate: curSample.deviationRate,
            premiumRate: curSample.premiumRate
        };
    }


}
