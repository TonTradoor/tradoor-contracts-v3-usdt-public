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
    bonusFactor: Int = 1;

    // admin
    owner: Address;
    orderBook: Address;
    protocolTradingFee: Int = 0;

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

    // price
    prices: map<Int, PriceData>; // tokenId => priceData

    // funding rate
    globalFundingRateSamples: map<Int, GlobalFundingRateSample>; // tokenId => sample

    init(deployId: Int) {
        self.owner = sender();
        self.orderBook = newAddress(0, 0);
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: UpdateConfig) {
        self.requireOwner();

        self.gasConsumption = msg.gasConsumption;
        self.minTonsForStorage = msg.minTonsForStorage;
        self.lpLockTime = msg.lpLockTime;
        self.bonusFactor = msg.bonusFactor;
        self.orderBook = msg.orderBook;
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
            tradingFeeRate: 1_000, // 0.1%
            lpTradingFeeRate: 600_000, // 60%
            interestRate: 0,
            maxFundingRate: 0
        };

        if (msg.name != null){
            tokenConfig.name = msg.name;
        }
        if (msg.enable != null){
            tokenConfig.enable = msg.enable;
        }
        if (msg.minMargin != null){
            tokenConfig.minMargin = msg.minMargin;
        }
        if (msg.maxLeverage != null){
            tokenConfig.maxLeverage = msg.maxLeverage;
        }
        if (msg.liquidationFee != null){
            tokenConfig.liquidationFee = msg.liquidationFee;
        }
        if (msg.interestRate != null){
            tokenConfig.interestRate = msg.interestRate;
        }
        if (msg.tradingFeeRate != null){
            tokenConfig.tradingFeeRate = msg.tradingFeeRate;
        }
        if (msg.lpTradingFeeRate != null){
            tokenConfig.lpTradingFeeRate = msg.lpTradingFeeRate;
        }
        if (msg.maxFundingRate != null){
            tokenConfig.maxFundingRate = msg.maxFundingRate;
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

    get fun configData(): ConfigData {
        return ConfigData{
            lpLockTime: self.lpLockTime,
            bonusFactor: self.bonusFactor,
            orderBook: self.orderBook
        };
    }

    get fun tokenConfig(tokenId: Int): TokenConfigData {
        return TokenConfigData{
            tokenIdNext: self.tokenIdNext,
            tokenConfig: self.tokenConfigs.get(tokenId)
        };
    }

    get fun priceData(tokenId: Int): PriceData? {
        return self.prices.get(tokenId);
    }

    // ======================================================== LP ================================================================ //
    receive(msg: UpdateLPPosition) {
        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.setPrice(msg.pricesLength, msg.prices);

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
            bonus = self.bonusFactor * (self.globalLPLiquidity - globalNetLP)
                 * liquidityDelta / self.globalLPLiquidity;
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
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: 0,
            fundingFee: 0,
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
                bonus = liquidityDelta * self.bonusFactor * (globalNetLP - self.globalLPLiquidity) * min(n, 100) / (globalNetLP * 1000);
            } else {
                let bonus1: Int = liquidityDelta * (globalNetLP - self.globalLPLiquidity) / globalNetLP;
                let bonus2: Int = lpPosition.bonus;
                let bonus3: Int = liquidityDelta * self.bonusFactor * (globalNetLP - self.globalLPLiquidity) * min(n, 100) / (globalNetLP * 1000);
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
        lpPosition.liquidity = lpPosition.liquidity - liquidityDelta;
        lpPosition.bonus = lpPosition.bonus - bonus;

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
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: 0,
            fundingFee: 0,
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
        dump("UpdatePerpPosition");

        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.setPrice(msg.pricesLength, msg.prices);

        // get index price
        let indexPrice: Int = self.getPrice(msg.tokenId);
        require(indexPrice > 0, "none available price");

        // update funding rate
        // self.updateFundingRate(msg.tokenId, indexPrice);

        // TODO get trade price
        let tradePrice: Int = indexPrice;

        // update position
        let receive: Int = 0;
        if (msg.opType == ORDER_OP_TYPE_INCREASE_MARKET || msg.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.increasePerpPosition(msg.opType, msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice);
        } else if (msg.opType == ORDER_OP_TYPE_LIQUIDATION) {
            receive = self.liquidatePerpPosition(msg.trxId, msg.account, msg.tokenId, msg.isLong, tradePrice);
        } else if (msg.opType == ORDER_OP_TYPE_ADL) {
            receive = self.decreasePerpPosition(msg.opType, msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice);
        } else {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            receive = self.decreasePerpPosition(msg.opType, msg.trxId, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice);
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

    fun increasePerpPosition(opType: Int, trxId: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int) {
        dump("increasePerpPosition");
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
        let globalLpPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLpPosition: GlobalLPPosition = globalLpPositionOpt != null ? globalLpPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0,
            unrealizedPnl: 0
        };

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLpPosition.netSize > 0 && (isLong == globalLpPosition.isLong)) {
            let sizeUsed: Int = sizeDelta > globalLpPosition.netSize ? globalLpPosition.netSize : sizeDelta;
            if (isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLpPosition.netSize -= sizeUsed;
            if (globalLpPosition.netSize == 0) {
                globalLpPosition.entryPrice = 0;
            }
        }
        // entry price
        if (sizeRemaining > 0) {
            globalLpPosition.entryPrice = (globalLpPosition.netSize * globalLpPosition.entryPrice + sizeRemaining * tradePrice) / (globalLpPosition.netSize + sizeRemaining);
            globalLpPosition.netSize += sizeRemaining;
            globalLpPosition.isLong = !isLong;
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

        // check liquidity
        require(globalLpPosition.netSize * globalLpPosition.entryPrice / PRICE_DECIMAL_FACTOR <= self.globalLPFund, "insufficient liquidity");

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{
            longSize: 0,
            shortSize: 0,
            longFundingFeeGrowth: 0,
            shortFundingFeeGrowth: 0
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

        // update position
        perpPosition.margin += marginDelta + fundingFee - tradingFee;
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
            globalPosition.longSize += sizeDelta;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortSize += sizeDelta;
        }
        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);

        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLpPosition);

        dump("emit events");

        // event
        emit(PerpPositionIncreasedEvent{
            opType: opType,
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
            entryFundingFeeGrowthAfter: entryFundingFeeGrowthAfter,
            trxId: trxId
        }.toCell());
        emit(GlobalPositionChangedEvent{
            longSizeAfter: globalPosition.longSize,
            shortSizeAfter: globalPosition.shortSize,
            longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            trxId: trxId
        }.toCell());
        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLpPosition.netSize,
            isLong: globalLpPosition.isLong,
            entryPriceAfter: globalLpPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: lpTradingFee,
            fundingFee: 0,
            realizedPnl: lpRealizedPnl,
            trxId: trxId
        }.toCell());
        dump("increasePerpPosition done");
    }

    fun decreasePerpPosition(opType: Int, trxId: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int): Int {
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

        let isLiquidate: Bool = opType == ORDER_OP_TYPE_LIQUIDATION ? true : false;
        // clamp delta
        if (sizeDelta > perpPosition.size) {
            sizeDelta = perpPosition.size;
        }

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{
            longSize: 0,
            shortSize: 0,
            longFundingFeeGrowth: 0,
            shortFundingFeeGrowth: 0
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
        let globalLpPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLpPosition: GlobalLPPosition = globalLpPositionOpt != null ? globalLpPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0,
            unrealizedPnl: 0
        };

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLpPosition.netSize > 0 && (isLong != globalLpPosition.isLong)) {
            let sizeUsed: Int = sizeDelta > globalLpPosition.netSize ? globalLpPosition.netSize : sizeDelta;
            if (isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLpPosition.netSize -= sizeUsed;
            if (globalLpPosition.netSize == 0) {
                globalLpPosition.entryPrice = 0;
            }
        }
        // lp entry price
        if (sizeRemaining > 0) {
            globalLpPosition.entryPrice = (globalLpPosition.netSize * globalLpPosition.entryPrice + sizeRemaining * tradePrice) / (globalLpPosition.netSize + sizeRemaining);
            globalLpPosition.netSize += sizeRemaining;
            globalLpPosition.isLong = !isLong;
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
        // check liquidity
        require(globalLpPosition.netSize * globalLpPosition.entryPrice / PRICE_DECIMAL_FACTOR <= self.globalLPFund, "insufficient liquidity");

        // margin
        perpPosition.margin += realizedPnl + fundingFee - tradingFee;
                                
        require(perpPosition.margin >= 0, "insufficient margin");
        if (marginDelta > perpPosition.margin) {
            marginDelta = perpPosition.margin;
        }
        perpPosition.margin -= marginDelta;
        perpPosition.size -= sizeDelta;
        perpPosition.entryFundingFeeGrowth = entryFundingFeeGrowthAfter;

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
        } else {
            directionPerpPosition.shortPosition = perpPosition;
        }
        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalLPPositions.set(tokenId, globalLpPosition);

        // event
        emit(PerpPositionDecreasedEvent{
            opType: opType,
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
            longSizeAfter: globalPosition.longSize,
            shortSizeAfter: globalPosition.shortSize,
            longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            trxId: trxId
        }.toCell());
        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLpPosition.netSize,
            isLong: globalLpPosition.isLong,
            entryPriceAfter: globalLpPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: lpTradingFee,
            fundingFee: 0,
            realizedPnl: lpRealizedPnl,
            trxId: trxId
        }.toCell());
        return receive;
    }

    fun liquidatePerpPosition(trxId: Int, account: Address, tokenId: Int, isLong: Bool, tradePrice: Int): Int {
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
            longSize: 0,
            shortSize: 0,
            longFundingFeeGrowth: 0,
            shortFundingFeeGrowth: 0
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
            / (perpPosition.size * (tokenConfig.tradingFeeRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)));
        require(isLong ? liquidatePrice < perpPosition.entryPrice : liquidatePrice > perpPosition.entryPrice, "not reach liquidate price");
        tradePrice = liquidatePrice;

        // get global position
        let globalLpPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLpPosition: GlobalLPPosition = globalLpPositionOpt != null ? globalLpPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0,
            unrealizedPnl: 0
        };

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLpPosition.netSize > 0 && (isLong != globalLpPosition.isLong)) {
            let sizeUsed: Int = sizeDelta > globalLpPosition.netSize ? globalLpPosition.netSize : sizeDelta;
            if (isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLpPosition.netSize -= sizeUsed;
            if (globalLpPosition.netSize == 0) {
                globalLpPosition.entryPrice = 0;
            }
        }
        // lp entry price
        if (sizeRemaining > 0) {
            globalLpPosition.entryPrice = (globalLpPosition.netSize * globalLpPosition.entryPrice + sizeRemaining * tradePrice) / (globalLpPosition.netSize + sizeRemaining);
            globalLpPosition.netSize += sizeRemaining;
            globalLpPosition.isLong = !isLong;
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
            globalPosition.longSize -= sizeDelta;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortSize -= sizeDelta;
        }
        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLpPosition);

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
            longSizeAfter: globalPosition.longSize,
            shortSizeAfter: globalPosition.shortSize,
            longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            trxId: trxId
        }.toCell());
        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLpPosition.netSize,
            isLong: globalLpPosition.isLong,
            entryPriceAfter: globalLpPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPFund,
            liquidityAfter: self.globalLPLiquidity,
            tradingFee: lpTradingFee,
            fundingFee: 0,
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
            perpPosition: perpPosition,
            globalLPPosition: self.globalLPPositions.get(tokenId),
            globalPosition: self.globalPositions.get(tokenId)
        };
    }

    // ============================ funding fee ================================ //
    receive(msg: UpdateFundingFee) {
        require(sender() == self.orderBook, "invalid sender");

        // update price
        self.setPrice(msg.pricesLength, msg.prices);

        // get index price
        let indexPrice: Int = self.getPrice(msg.tokenId);
        require(indexPrice > 0, "none available price");

        // update funding rate
        self.updateFundingRate(msg.tokenId, indexPrice);
    }

    // ============================ private function ================================ //
    fun setPrice(pricesLength: Int, prices: map<Int, UpdatePrice>) {
        if (pricesLength <= 0) {
            return;
        }
        let i: Int = 0;
        let totalGlobalUnrealizedPnl: Int = self.globalLPUnrealizedPnl;
        while(i < pricesLength) {
            let updatePrice: UpdatePrice? = prices.get(i);
            if (updatePrice != null) {
                // TODO check price offset
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
            }
            i = i + 1;
        }
        self.globalLPUnrealizedPnl = totalGlobalUnrealizedPnl;
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

    fun updateFundingRate(tokenId: Int, indexPrice: Int) {
        let tokenConfig: TokenConfig = self.tokenConfigs.get(tokenId)!!;

        // =========== calculate sample =========== //
        // get funding rate sample
        let sampleOpt: GlobalFundingRateSample? = self.globalFundingRateSamples.get(tokenId);
        let sample: GlobalFundingRateSample = sampleOpt != null ? sampleOpt!! : GlobalFundingRateSample{
            lastAdjustFundingRateTime: 0,
            sampleCount: 0,
            cumulativePremiumRate: now() - (now() % ADJUST_FUNDING_RATE_INTERVAL)
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
            return;
        }

        // get global position
        let globalLpPosition: GlobalLPPosition = self.globalLPPositions.get(tokenId)!!;

        // TODO
        let premiumRate: Int = self.calculatePremiumRate();

        // calculate if should adjust funding rate and funding rate delta
        if (globalLpPosition.isLong) {
            premiumRate = -premiumRate;
        }
        dump(premiumRate);

        // cumulative sample count
        let sampleCountDelta: Int = timeDelta / SAMPLE_PREMIUM_RATE_INTERVAL;
        let sampleCountAfter: Int = sample.sampleCount + sampleCountDelta;
        dump(sampleCountAfter);

        // cumulative PR
        let cumulativePremiumRate: Int = premiumRate * ((sample.sampleCount + 1 + sampleCountAfter) * sampleCountDelta / 2 );
        cumulativePremiumRate = sample.cumulativePremiumRate + cumulativePremiumRate;
        dump(cumulativePremiumRate);

        // sample count < 720, no need update funding rate
        if (sampleCountAfter < REQUIRED_SAMPLE_COUNT) {
            sample.cumulativePremiumRate = cumulativePremiumRate;
            sample.sampleCount = sampleCountAfter;
            self.globalFundingRateSamples.set(tokenId, sample);
            return;
        }

        // average PR
        let premiumRateAvg: Int = cumulativePremiumRate / PREMIUM_RATE_AVG_DENOMINATOR;
        if (cumulativePremiumRate < 0) {
            premiumRateAvg = -premiumRateAvg;
        }
        // clamp (IR - avgPR) : -0.05% <= (IR - avgPR) <= 0.05%
        let fundingRateDelta: Int = premiumRateAvg + self.clamp(premiumRateAvg, tokenConfig.interestRate);
        
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

        // get paidSize and receivedSize
        let globalPosition: GlobalPosition = self.globalPositions.get(tokenId)!!;

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
        if (paidFundingFeeGrowthDelta > 0) {
            if (receivedSize > 0) {
                receivedFundingFeeGrowthDelta = paidFundingFeeGrowthDelta;
                self.globalLPFundingFeeGrowth += paidFundingFeeGrowthDelta * (paidSize - receivedSize) / self.globalLPLiquidity;
            } else {
                self.globalLPFundingFeeGrowth += paidSize * paidFundingFeeGrowthDelta / self.globalLPLiquidity;
            }
        }
        let longFundingFeeGrowthAfter: Int = globalPosition.longFundingFeeGrowth;
        let shortFundingFeeGrowthAfter: Int = globalPosition.shortFundingFeeGrowth;
        
        // funding rate > 0, long pay for short and LP TODO
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
    }

    fun clamp(premiumRateAvg: Int, interestRate: Int): Int {
        let rateDelta: Int = interestRate - premiumRateAvg;
        if (rateDelta > PREMIUM_RATE_CLAMP_BOUNDARY) {
            return PREMIUM_RATE_CLAMP_BOUNDARY;
        } else if (rateDelta < -PREMIUM_RATE_CLAMP_BOUNDARY) {
            return -PREMIUM_RATE_CLAMP_BOUNDARY;
        } else {
            return rateDelta;
        }
    }

    fun calculatePremiumRate(): Int {
        return 0;
    }

}
