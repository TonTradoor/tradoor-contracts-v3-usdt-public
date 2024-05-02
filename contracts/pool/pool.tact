import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract Pool with Deployable, Ownable {

    // config
    lpGasConsumption: Int = ton("0.04");
    perpGasConsumption: Int = ton("0.09");
    minTonsForStorage: Int = ton("0.01");

    tokenConfigs: map<Int, TokenConfig>; // tokenId => tokenConfig

    lpLockTime: Int = 24 * 60 * 60;
    lpAddBonusFactor: Int = 1 * pow(10, 9);
    lpRemoveBonusFactor: Int = 10 * pow(10, 9);
    lpLiquidityFactor: Int = pow(10, 9);

    // admin
    owner: Address;
    orderBook: Address;
    protocolTradingFee: Int = 0;
    claimExecutor: Address;
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
    prices: map<Int, Int>; // tokenId => price
    prevPremiumRate: Int = 0;

    init(deployId: Int) {
        self.owner = sender();
        self.orderBook = newAddress(0, 0);
        self.claimExecutor = newAddress(0, 0);
        self.executors.set(sender(), true);
    }

    // ======================================================== Admin ================================================================ //
    receive(msg: UpdateConfig) {
        self.requireOwner();

        let i: Int = 0;
        while (i < msg.executorLength) {
            let executor: ExecutorParam? = msg.executors.get(i);
            if (executor != null) {
                self.executors.set((executor!!).executor, (executor!!).enable);
            }
            i += 1;
        }

        self.claimExecutor = msg.claimExecutor;
        self.lpGasConsumption = msg.lpGasConsumption;
        self.perpGasConsumption = msg.perpGasConsumption;
        self.minTonsForStorage = msg.minTonsForStorage;
        self.lpLockTime = msg.lpLockTime;
        self.lpAddBonusFactor = msg.lpAddBonusFactor;
        self.lpRemoveBonusFactor = msg.lpRemoveBonusFactor;
        self.lpLiquidityFactor = msg.lpLiquidityFactor;
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
            minValue: 100 * pow(10, 6), // 100U
            maxValue: 10_000_000 * pow(10, 6), // 10_000_000U
            maxLeverage: 105,
            liquidationFee: 5 * pow(10, 5), // 0.5U
            tradingFeeRate: 1_000_000, // 0.1%
            lpTradingFeeRate: 600_000_000, // 60%
            maintenanceRate: 10_000_000, // 1%
            liquidityProportion: 100_000_000, // 10%
            interestRate: 0,
            maxFundingRate: 62_500 // 0.00625%
        };

        tokenConfig.name = msg.name;
        tokenConfig.enable = msg.enable;

        tokenConfig.minValue = msg.minValue;
        tokenConfig.maxValue = msg.maxValue;
        tokenConfig.maxLeverage = msg.maxLeverage;
        tokenConfig.liquidationFee = msg.liquidationFee;
        tokenConfig.maintenanceRate = msg.maintenanceRate;

        tokenConfig.tradingFeeRate = msg.tradingFeeRate;
        tokenConfig.lpTradingFeeRate = msg.lpTradingFeeRate;

        tokenConfig.interestRate = msg.interestRate;
        tokenConfig.maxFundingRate = msg.maxFundingRate;
        tokenConfig.liquidityProportion = msg.liquidityProportion;

        self.tokenConfigs.set(msg.tokenId, tokenConfig);
        
        send(SendParameters{
            to: sender(),
            bounce: false,
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: ClaimProtocolFee) {
        require(sender() == self.claimExecutor, "invalid sender");

        if (self.protocolTradingFee > 0) {
            self.protocolTradingFee = 0;
            send(SendParameters{
                to: self.orderBook,
                value: 0,
                bounce: false,
                mode: SendRemainingValue,
                body: SendProtocolFee {
                    trxId: msg.trxId,
                    feeReceiver: msg.feeReceiver,
                    amount: self.protocolTradingFee
                }.toCell()
            });
        }
    }

    get fun configData(executor: Address?): ConfigData {
        let isExecutor: Bool? = null;
        if (executor != null) {
            isExecutor = self.executors.get(executor!!);
        }
        return ConfigData{
            isExecutor: isExecutor,
            lpGasConsumption: self.lpGasConsumption,
            perpGasConsumption: self.perpGasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            lpAddBonusFactor: self.lpAddBonusFactor,
            lpRemoveBonusFactor: self.lpRemoveBonusFactor,
            lpLiquidityFactor: self.lpLiquidityFactor,
            orderBook: self.orderBook
        };
    }

    get fun tokenConfig(tokenId: Int): TokenConfig? {
        return self.tokenConfigs.get(tokenId);
    }

    get fun priceData(tokenId: Int): Int? {
        return self.prices.get(tokenId);
    }

    fun exceedGas(orderType: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - context().value;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        let extraValue: Int = max(0, tonBalanceBeforeMsg - self.minTonsForStorage);
        let gasConsumption: Int = orderType == ORDER_TYPE_LP ? self.lpGasConsumption : self.perpGasConsumption;
        return context().value - storageFee - gasConsumption + extraValue;
    }

    // ======================================================== LP ================================================================ //
    receive(msg: UpdateLPPosition) {
        require(sender() == self.orderBook, "invalid sender");

        // update position
        if (msg.isIncrease) {
            self.increaseLPPosition(msg.trxId, msg.orderId, msg.account, msg.liquidityDelta);
        } else {
            self.decreaseLPPosition(msg.trxId, msg.orderId, msg.account, msg.liquidityDelta);
        }
    }

    fun increaseLPPosition(trxId: Int, orderId: Int, account: Address, liquidityDelta: Int) {
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
            bonus = self.lpAddBonusFactor * (self.globalLPLiquidity - globalNetLP) * liquidityDelta / (self.globalLPLiquidity * PERCENTAGE_BASIS_POINT);
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

        // leave minTonsForStorage
        let msgValue: Int = self.exceedGas(ORDER_TYPE_LP);

        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdateLPPositionSuccess {
                orderId: orderId,
                receive: 0,
                trxId: trxId
            }.toCell()
        });

        emit(LPPositionIncreasedEvent{
            trxId: trxId,
            orderId: orderId,
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
            lpFundAfter: self.globalLPFund,
            lpLiquidityAfter: self.globalLPLiquidity
        }.toCell());
    }

    fun decreaseLPPosition(trxId: Int, orderId: Int, account: Address, liquidityDelta: Int) {
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
        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;
        require(globalNetLP > 0, "insufficient global LP");

        // calculate receive amount
        if (globalNetLP < 0) {
            globalNetLP = 0;
        }
        require(globalNetLP > 0, "insufficient global net LP");

        let receive: Int = 0;
        let bonus: Int = 0;

        if (globalNetLP >= self.globalLPLiquidity) {
            let n: Int = ((now() - lpPosition.unlockTime) + DAY) / DAY;

            if (lpPosition.bonus == 0) {
                // bonus = liquidity * r（x-1）* min(n，100）* 0.1%
                bonus = liquidityDelta * self.lpRemoveBonusFactor * (globalNetLP - self.globalLPLiquidity) * min(n, 100) / (globalNetLP * 10000 * PERCENTAGE_BASIS_POINT);
            } else {
                let bonus1: Int = liquidityDelta * (globalNetLP - self.globalLPLiquidity) / globalNetLP;
                let bonus2: Int = lpPosition.bonus;
                let bonus3: Int = liquidityDelta * self.lpRemoveBonusFactor * (globalNetLP - self.globalLPLiquidity) * min(n, 100) / (globalNetLP * 10000 * PERCENTAGE_BASIS_POINT);
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

        // exceed gas
        let msgValue: Int = self.exceedGas(ORDER_TYPE_LP);

        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdateLPPositionSuccess {
                orderId: orderId,
                receive: receive,
                trxId: trxId
            }.toCell()
        });

        // event
        emit(LPPositionDecreasedEvent{
            trxId: trxId,
            orderId: orderId,
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
            lpFundAfter: self.globalLPFund,
            lpLiquidityAfter: self.globalLPLiquidity
        }.toCell());
    }

    get fun lpPosition(account: Address?): LPPositionData {
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
        let result: UpdateFundingRateResult = self.updatePriceAndFundingFee(msg.tokenId, msg.price);

        // get index price
        let indexPrice: Int = msg.price;
        
        // trade price
        require(abs(msg.premiumRate) < PERCENTAGE_BASIS_POINT, "invalid premium rate");
        let tradePrice: Int = (PERCENTAGE_BASIS_POINT + msg.premiumRate) * indexPrice / PERCENTAGE_BASIS_POINT;
        self.prevPremiumRate = msg.premiumRate;

        // update position
        if (msg.opType == ORDER_OP_TYPE_INCREASE_MARKET || msg.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.increasePerpPosition(msg.trxId, msg.orderId, msg.opType, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, indexPrice, tradePrice, result.lpReceivedFundingFeeDelta);
        } else if (msg.opType == ORDER_OP_TYPE_LIQUIDATION) {
            self.liquidatePerpPosition(msg.trxId, msg.orderId, msg.account, msg.tokenId, msg.isLong, indexPrice, tradePrice, result.lpReceivedFundingFeeDelta);
        } else if (msg.opType == ORDER_OP_TYPE_ADL) {
            self.decreasePerpPosition(msg.trxId, msg.orderId, msg.opType, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, indexPrice, tradePrice, result.lpReceivedFundingFeeDelta);
        } else {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.decreasePerpPosition(msg.trxId, msg.orderId, msg.opType, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, indexPrice, tradePrice, result.lpReceivedFundingFeeDelta);
        } 
    }

    fun increasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, 
        indexPrice: Int, tradePrice: Int, lpReceivedFundingFee: Int) {
        // dump("increasePerpPosition");
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        // check value
        let valueDelta: Int = sizeDelta * tradePrice / PRICE_DECIMAL_FACTOR;
        require(valueDelta <= tokenConfig.maxValue, "greater than max value");
        
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
            // first position, check min value
            require(valueDelta >= tokenConfig.minValue, "less than min value");
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

        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;

        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        require(self.globalPerpSingleValue <= globalNetLP * self.lpLiquidityFactor / PERCENTAGE_BASIS_POINT, "insufficient liquidity for single value");
        
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;
        require(self.globalPerpNetValue <= globalNetLP, "insufficient liquidity for net value");

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
        if (isLong) {
            fundingFee = (globalPosition.longFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
            entryFundingFeeGrowthAfter = globalPosition.longFundingFeeGrowth;
        } else {
            fundingFee = (globalPosition.shortFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
            entryFundingFeeGrowthAfter = globalPosition.shortFundingFeeGrowth;
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


        // exceed gas
        let msgValue: Int = self.exceedGas(ORDER_TYPE_PERP);

        // dump(msgValue);
        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdatePerpPositionSuccess {
                orderId: orderId,
                receive: 0,
                trxId: trxId
            }.toCell()
        });

        // event
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
            entryFundingFeeGrowthAfter: entryFundingFeeGrowthAfter,

            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            globalShortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpLiquidityAfter: self.globalLPLiquidity,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl,
            lpReceivedFundingFee: lpReceivedFundingFee
        }.toCell());
        // dump("increasePerpPosition done");
    }

    fun decreasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, 
        indexPrice: Int, tradePrice: Int, lpReceivedFundingFee: Int) {
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
        require(perpPosition.size > 0, "position not exist");

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
        if (isLong) {
            fundingFee = (globalPosition.longFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
            entryFundingFeeGrowthAfter = globalPosition.longFundingFeeGrowth;
        } else {
            fundingFee = (globalPosition.shortFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
            entryFundingFeeGrowthAfter = globalPosition.shortFundingFeeGrowth;
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
            let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
            require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

            // check leverage
            require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / PRICE_DECIMAL_FACTOR, "leverage too high");

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

        // exceed gas
        let msgValue: Int = self.exceedGas(ORDER_TYPE_PERP);

        // dump(msgValue);
        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdatePerpPositionSuccess {
                orderId: orderId,
                receive: receive,
                trxId: trxId
            }.toCell()
        });

        // event
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
            realizedPnLDelta: realizedPnl,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            entryFundingFeeGrowthAfter: entryFundingFeeGrowthAfter,
            receive: receive,

            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            globalShortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpLiquidityAfter: self.globalLPLiquidity,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl,
            lpReceivedFundingFee: lpReceivedFundingFee
        }.toCell());
    }

    fun liquidatePerpPosition(trxId: Int, orderId: Int, account: Address, tokenId: Int, isLong: Bool, indexPrice: Int, tradePrice: Int, lpReceivedFundingFee: Int) {
        // dump("liquidatePerpPosition");
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
        require(perpPosition.size > 0, "position not exist");

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
        if (isLong) {
            fundingFee = (globalPosition.longFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
            entryFundingFeeGrowthAfter = globalPosition.longFundingFeeGrowth;
        } else {
            fundingFee = (globalPosition.shortFundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
            entryFundingFeeGrowthAfter = globalPosition.shortFundingFeeGrowth;
        }

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin >= perpPosition.margin + unrealizedPnl, "margin rate too low");

        // liquidate price
        let liquidatePrice: Int = ((perpPosition.margin + fundingFee - tokenConfig.liquidationFee) * PRICE_DECIMAL_FACTOR + (isLong ? -perpPosition.entryPrice * perpPosition.size : perpPosition.entryPrice * perpPosition.size)) 
            / (perpPosition.size * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)) / PERCENTAGE_BASIS_POINT);
        // require(isLong ? liquidatePrice < perpPosition.entryPrice : liquidatePrice > perpPosition.entryPrice, "not reach liquidate price");
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

        // exceed gas
        let msgValue: Int = self.exceedGas(ORDER_TYPE_PERP);

        // dump(msgValue);
        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: UpdatePerpPositionSuccess {
                orderId: orderId,
                receive: receive,
                trxId: trxId
            }.toCell()
        });

        // event
        emit(PerpPositionDecreasedEvent{
            trxId: trxId,
            orderId: orderId,
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

            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            globalShortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth,
            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpLiquidityAfter: self.globalLPLiquidity,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl,
            lpReceivedFundingFee: lpReceivedFundingFee
        }.toCell());
    }

    get fun perpPosition(tokenId: Int, account: Address?): PerpPositionData {
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
            globalFundingRateSample: self.globalFundingRateSamples.get(tokenId),
            prevPremiumRate: self.prevPremiumRate
        };
    }

    // ============================ price ================================ //
    receive(msg: UpdatePrice) {
        dump("update price");
        // check sender
        let isExecutor: Bool = false;
        let isExecutorOpt: Bool? = self.executors.get(sender());
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        require(isExecutor, "invalid sender");

        if (msg.pricesLength <= 0) {
            return;
        }
        let i: Int = 0;
        let totalGlobalUnrealizedPnl: Int = self.globalLPUnrealizedPnl;

        let resultDatas: map<Int, UpdateFundingRateEventData> = emptyMap();
        while(i < msg.pricesLength) {
            let updatePrice: UpdatePriceParam? = msg.prices.get(i);
            if (updatePrice != null) {
                // update price
                let tokenId: Int = (updatePrice!!).tokenId;
                let result: UpdateFundingRateResult = self.updatePriceAndFundingFee(tokenId, (updatePrice!!).price);
                resultDatas.set(i, UpdateFundingRateEventData{
                    tokenId: tokenId,
                    lpReceivedFundingFeeDelta: result.lpReceivedFundingFeeDelta,
                    longFundingFeeGrowthAfter: result.longFundingFeeGrowthAfter,
                    shortFundingFeeGrowthAfter: result.shortFundingFeeGrowthAfter
                });
            }
            i += 1;
        }

        emit(UpdateFundingFeeEvent{
            length: msg.pricesLength,
            datas: resultDatas
        }.toCell());

        // exceed gas
        let msgValue: Int = self.exceedGas(ORDER_TYPE_PERP);

        send(SendParameters{
            to: sender(),
            bounce: true,
            value: msgValue,
            mode: SendIgnoreErrors
        });
    }

    // ============================ private function ================================ //
    fun updatePriceAndFundingFee(tokenId: Int, price: Int): UpdateFundingRateResult {
        // dump("updatePriceAndFundingFee");
        // TODO check price offset
        self.prices.set(tokenId, price);

        // update lp pnl
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        dump(globalLPPositionOpt == null);
        if (globalLPPositionOpt != null) {
            let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;
            // unrealized pnl
            let unrealizedPnl: Int = 0;
            if (globalLPPosition.isLong) {
                unrealizedPnl = globalLPPosition.netSize * (price - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                unrealizedPnl = globalLPPosition.netSize * (globalLPPosition.entryPrice - price) / PRICE_DECIMAL_FACTOR;
            }
            // dump("update unrealized pnl");
            // dump(unrealizedPnl);
            self.globalLPUnrealizedPnl = self.globalLPUnrealizedPnl - globalLPPosition.unrealizedPnl + unrealizedPnl;
            globalLPPosition.unrealizedPnl = unrealizedPnl;
            self.globalLPPositions.set(tokenId, globalLPPosition);
        }

        // update global value
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

        let singleValueBefore: Int = max(globalPosition.longValue, globalPosition.shortValue);
        let netValueBefore: Int = abs(globalPosition.longValue - globalPosition.shortValue);
        globalPosition.longValue = globalPosition.longSize * price / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * price / PRICE_DECIMAL_FACTOR;
        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;

        // update funding fee
        // ===>
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
        // dump(timestamp);

        let lastSamplingTime: Int = lastAdjustFundingRateTime + sample.sampleCount * SAMPLE_PREMIUM_RATE_INTERVAL;
        let timeDelta: Int = timestamp - lastSamplingTime;
        // dump(timeDelta);
        if (timeDelta < SAMPLE_PREMIUM_RATE_INTERVAL) {
            // no need to update
            return UpdateFundingRateResult{
                lpReceivedFundingFeeDelta: 0,
                longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
                shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth
            };
        }

        // cumulative sample count
        let sampleCountDelta: Int = timeDelta / SAMPLE_PREMIUM_RATE_INTERVAL;
        let sampleCountAfter: Int = sample.sampleCount + sampleCountDelta;

        // cumulative PR
        let cumulativePremiumRate: Int = self.prevPremiumRate * ((sample.sampleCount + 1 + sampleCountAfter) * sampleCountDelta / 2 );
        cumulativePremiumRate = sample.cumulativePremiumRate + cumulativePremiumRate;

        // sample count < 720, no need update funding rate
        if (sampleCountAfter < REQUIRED_SAMPLE_COUNT) {
            // dump("update funding fee sample");
            sample.cumulativePremiumRate = cumulativePremiumRate;
            sample.sampleCount = sampleCountAfter;
            self.globalFundingRateSamples.set(tokenId, sample);
            return UpdateFundingRateResult{
                lpReceivedFundingFeeDelta: 0,
                longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
                shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth
            };
        }

        // average PR
        let premiumRateAvg: Int = cumulativePremiumRate / PREMIUM_RATE_AVG_DENOMINATOR;

        // clamp (IR - avgPR) : -0.05%/8 <= (IR - avgPR) <= 0.05%/8
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

        // clamp fundingRate: -maxFundingRate <= fundingRate <= maxFundingRate
        let clampedFundingRateDelta: Int = 0;
        if (fundingRateDelta > tokenConfig.maxFundingRate) {
            clampedFundingRateDelta = tokenConfig.maxFundingRate;
        } else if (fundingRateDelta < -tokenConfig.maxFundingRate) {
            clampedFundingRateDelta = -tokenConfig.maxFundingRate;
        } else {
            clampedFundingRateDelta = fundingRateDelta;
        }

        sample.lastAdjustFundingRateTime = maxSamplingTime;
        sample.cumulativePremiumRate = 0;
        sample.sampleCount = 0;
        self.globalFundingRateSamples.set(tokenId, sample);

        // =========== update funding rate =========== //
        // get paidSize and receivedSize
        let paidSize: Int = 0;
        let receivedSize: Int = 0;
        if (fundingRateDelta >= 0) {
            paidSize = globalPosition.longSize;
            receivedSize = globalPosition.shortSize;
        } else {
            paidSize = globalPosition.shortSize;
            receivedSize = globalPosition.longSize;
        }
        
        // calculate funding rate growth
        // paidFundingFeeGrowthDelta = (paidSize * price * fundingRate) / paidSize = price * fundingRate
        let paidFundingFeeGrowthDelta: Int = price * abs(fundingRateDelta) / PERCENTAGE_BASIS_POINT;

        let receivedFundingFeeGrowthDelta: Int = 0;
        let lpReceivedFundingFee: Int = 0;
        if (paidFundingFeeGrowthDelta > 0) {
            if (paidSize > receivedSize) {
                if (receivedSize > 0) {
                    receivedFundingFeeGrowthDelta = paidFundingFeeGrowthDelta;
                    lpReceivedFundingFee = receivedFundingFeeGrowthDelta * (paidSize - receivedSize);
                    self.globalLPFundingFeeGrowth += lpReceivedFundingFee / self.globalLPLiquidity;
                } else {
                    lpReceivedFundingFee = paidFundingFeeGrowthDelta * paidSize;
                    self.globalLPFundingFeeGrowth += lpReceivedFundingFee / self.globalLPLiquidity;
                }
            } else {
                if (receivedSize > 0) {
                    receivedFundingFeeGrowthDelta = paidFundingFeeGrowthDelta * paidSize / receivedSize;
                } else {
                    lpReceivedFundingFee = paidFundingFeeGrowthDelta * paidSize;
                    self.globalLPFundingFeeGrowth += lpReceivedFundingFee / self.globalLPLiquidity;
                }
            }
        }

        // funding rate > 0, long pay for short and LP
        if (fundingRateDelta >= 0) {
            globalPosition.longFundingFeeGrowth -= paidFundingFeeGrowthDelta;
            globalPosition.shortFundingFeeGrowth += receivedFundingFeeGrowthDelta;
        } else {
            globalPosition.longFundingFeeGrowth += receivedFundingFeeGrowthDelta;
            globalPosition.shortFundingFeeGrowth -= paidFundingFeeGrowthDelta;
        }

        self.globalPositions.set(tokenId, globalPosition);
        return UpdateFundingRateResult{
            lpReceivedFundingFeeDelta: lpReceivedFundingFee / PRICE_DECIMAL_FACTOR,
            longFundingFeeGrowthAfter: globalPosition.longFundingFeeGrowth,
            shortFundingFeeGrowthAfter: globalPosition.shortFundingFeeGrowth
        };
    }

}
