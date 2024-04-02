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
    tokenIdNext: Int = 1;

    // lpLockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    lpLockTime: Int = 10 * 60; // TODO lock 10 min for test
    bonusFactor: Int = 1;

    // admin
    owner: Address;
    orderBook: Address;

    // LP
    lpPositions: map<Address, LPPosition>; // trader => LP
    lpPositionIndexNext: Int as uint64 = 1;
    globalLPLiquidity: GlobalLPLiquidity;

    // Perp
    perpPositions: map<Int, AccountPerpPosition>; // tokenId => user => direction => position
    perpPositionIndexNext: Int as uint64 = 1;

    globalLPPositions: map<Int, GlobalLPPosition>; // tokenId => globalLP

    // price
    prices: map<Int, PriceData>; // tokenId => priceData

    protocolTradingFee: Int = 0;

    // funding rate
    globalPositions : map<Int, GlobalPosition>; // tokenId => globalPosition
    globalFundingRateSamples: map<Int, GlobalFundingRateSample>; // tokenId => sample

    init(deployId: Int) {
        self.owner = sender();
        self.orderBook = newAddress(0, 0);
        self.globalLPLiquidity = GlobalLPLiquidity{lpFund: 0, liquidity: 0, fundingFeeGrowth: 0};
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

        // TODO update funding rate

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
        let globalNetLP: Int = self.globalLPLiquidity.lpFund + self.calculateTotalGlobalUnrealizedPnl();
        if (globalNetLP < 0) {
            globalNetLP = 0;
        }
        let bonus: Int = 0;
        if (globalNetLP < self.globalLPLiquidity.liquidity) {
            // bonus = b + s (1 - x) * liquidity
            bonus = self.bonusFactor * (self.globalLPLiquidity.liquidity - globalNetLP)
                 * liquidityDelta / self.globalLPLiquidity.liquidity;
            lpPosition.bonus = lpPosition.bonus + bonus;
        }
        // TODO funding fee

        // update position
        lpPosition.liquidity = lpPosition.liquidity + liquidityDelta;
        lpPosition.unlockTime = now() + self.lpLockTime;

        // set position
        self.lpPositions.set(account, lpPosition);

        // update global position
        self.globalLPLiquidity.lpFund = self.globalLPLiquidity.lpFund + liquidityDelta;
        self.globalLPLiquidity.liquidity = self.globalLPLiquidity.liquidity + liquidityDelta;

        emit(LPPositionIncreasedEvent{
            positionId: lpPosition.positionId,
            account: account,
            liquidityDelta: liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            bonusDelta: bonus,
            bonusAfter: lpPosition.bonus,
            unlockTimeAfter: lpPosition.unlockTime,
            realizedFundingFee: 0,
            realizedFundingFeeAfter: lpPosition.realizedFundingFee,
            trxId: trxId
        }.toCell());
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPLiquidity.lpFund,
            liquidityAfter: self.globalLPLiquidity.liquidity,
            tradingFee: 0,
            fundingFee: 0,
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
        let totalGlobalUnrealizedPnl: Int = self.calculateTotalGlobalUnrealizedPnl();
        let globalNetLP: Int = self.globalLPLiquidity.lpFund + totalGlobalUnrealizedPnl;
        require(globalNetLP > 0, "insufficient global LP");

        // calculate receive amount
        if (globalNetLP < 0) {
            globalNetLP = 0;
        }
        require(globalNetLP > 0, "insuficient global net LP");

        let receive: Int = 0;
        let bonus: Int = 0;

        if (globalNetLP >= self.globalLPLiquidity.liquidity) {
            let n: Int = ((now() - lpPosition.unlockTime)  + self.lpLockTime) / DAY;

            if (lpPosition.bonus == 0) {
                // bonus = liquidity * r（x-1）* min(n，100）* 0.1%
                bonus = liquidityDelta * self.bonusFactor * (globalNetLP - self.globalLPLiquidity.liquidity) * min(n, 100) / (globalNetLP * 1000);
            } else {
                let bonus1: Int = liquidityDelta * (globalNetLP - self.globalLPLiquidity.liquidity) / globalNetLP;
                let bonus2: Int = lpPosition.bonus;
                let bonus3: Int = liquidityDelta * self.bonusFactor * (globalNetLP - self.globalLPLiquidity.liquidity) * min(n, 100) / (globalNetLP * 1000);
                bonus = max(min(bonus1, bonus2), bonus3);
            }
            receive = liquidityDelta + bonus;
        } else {
            receive = liquidityDelta * globalNetLP / self.globalLPLiquidity.liquidity;
        }
        // funding fee TODO

        // update position
        lpPosition.liquidity = lpPosition.liquidity - liquidityDelta;
        lpPosition.bonus = lpPosition.bonus - bonus;

        // set position
        if (lpPosition.liquidity > 0 || lpPosition.bonus > 0) {
            self.lpPositions.set(account, lpPosition);
        } else {
            self.lpPositions.set(account, null);
        }

        // update global position
        self.globalLPLiquidity.lpFund = self.globalLPLiquidity.lpFund - receive;
        self.globalLPLiquidity.liquidity = self.globalLPLiquidity.liquidity - liquidityDelta;

        // event
        emit(LPPositionDecreasedEvent{
            positionId: lpPosition.positionId,
            account: account,
            liquidityDelta: liquidityDelta,
            liquidityAfter: lpPosition.liquidity,
            bonusDelta: bonus,
            bonusAfter: lpPosition.bonus,
            fundingFeeDelta: lpPosition.realizedFundingFee,
            receive: receive,
            trxId: trxId
        }.toCell());
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPLiquidity.lpFund,
            liquidityAfter: self.globalLPLiquidity.liquidity,
            tradingFee: 0,
            fundingFee: 0,
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
            globalLPLiquidity: self.globalLPLiquidity
        };
    }

    // ============================ Perp ================================ //
    receive(msg: UpdatePerpPosition) {
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
        else if (msg.opType == ORDER_OP_TYPE_LIQUIDATION) {
            receive = self.decreasePerpPosition(msg.trxId, true, msg.account, msg.tokenId, msg.isLong, 0, 0, tradePrice);
        }
        else {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            receive = self.decreasePerpPosition(msg.trxId, false, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice);
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

    fun increasePerpPosition(trxId: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int) {
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
                lpRealizedPnl = sizeUsed * (tradePrice - globalLpPosition.entryPrice) / DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLpPosition.entryPrice - tradePrice) / DECIMAL_FACTOR;
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
        let tradingFee: Int = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let protocalTradingFee: Int = tradingFee - lpTradingFee;
        
        self.protocalTradingFee += protocalTradingFee;
        self.globalLPLiquidity.lpFund += lpRealizedPnl + lpTradingFee;

        // check liquidity
        require(globalLpPosition.netSize * globalLpPosition.entryPrice / DECIMAL_FACTOR <= self.globalLPLiquidity.lpFund, "insufficient liquidity");

        // TODO funding fee
        let fundingFee: Int = 0;

        // update position
        perpPosition.margin += marginDelta + fundingFee - tradingFee;
        perpPosition.entryPrice = (perpPosition.size * perpPosition.entryPrice + sizeDelta * tradePrice) / (perpPosition.size + sizeDelta);
        perpPosition.size += sizeDelta;

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

        // check leverage
        require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / DECIMAL_FACTOR, "legerage too high");

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
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPLiquidity.lpFund,
            liquidityAfter: self.globalLPLiquidity.liquidity,
            tradingFee: lpTradingFee,
            fundingFee: 0,
            trxId: trxId
        }.toCell());
    }

    fun decreasePerpPosition(trxId: Int, isLiquidate: Bool, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int): Int {
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
        if (isLiquidate) {
            marginDelta = perpPosition.margin;
            sizeDelta = perpPosition.size;
        } else {
            if (sizeDelta > perpPosition.size) {
                sizeDelta = perpPosition.size;
            }
        }

        // TODO funding fee
        let fundingFee: Int = 0;

        // check liquidate
        if (isLiquidate) {
            // check maintain margin
            let unrealizedPnl: Int = 0;
            if (isLong) {
                unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / DECIMAL_FACTOR;
            } else {
                unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / DECIMAL_FACTOR;
            }
            let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR) + tokenConfig.liquidationFee;
            require(maintenanceMargin >= perpPosition.margin + unrealizedPnl, "margin rate too low");

            // liquidate price
            let liquidatePrice: Int = ((perpPosition.margin + fundingFee - tokenConfig.liquidationFee) * DECIMAL_FACTOR + (isLong ? -perpPosition.entryPrice * perpPosition.size : perpPosition.entryPrice * perpPosition.size)) 
                / (perpPosition.size * (tokenConfig.tradingFeeRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)));
            require(isLong ? liquidatePrice < perpPosition.entryPrice : liquidatePrice > perpPosition.entryPrice, "not reach liquidate price");
            tradePrice = liquidatePrice;
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
                lpRealizedPnl = sizeUsed * (tradePrice - globalLpPosition.entryPrice) / DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLpPosition.entryPrice - tradePrice) / DECIMAL_FACTOR;
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
        let tradingFee: Int = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let protocalTradingFee: Int = tradingFee - lpTradingFee;

        self.protocalTradingFee += protocalTradingFee;
        self.globalLPLiquidity.lpFund += lpRealizedPnl + lpTradingFee;

        let positionId: Int = perpPosition.positionId;
        let receive: Int = 0;
        if (isLiquidate) {
            // close position
            receive = tokenConfig.liquidationFee;
            perpPosition = PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0
            };
            emit(PerpPositionLiquidatedEvent{
                positionId: positionId,
                account: account,
                tokenId: tokenId,
                isLong: isLong,
                marginDelta: marginDelta,
                sizeDelta: sizeDelta,
                liquidatePrice: tradePrice,
                tradingFee: tradingFee,
                fundingFee: fundingFee,
                liquidationFee: receive,
                trxId: trxId
            }.toCell());
        } else {
            // position pnl
            let realizedPnl: Int = 0;
            if (isLong) {
                realizedPnl = sizeDelta * (tradePrice - perpPosition.entryPrice) / DECIMAL_FACTOR;
            } else {
                realizedPnl = sizeDelta * (perpPosition.entryPrice - tradePrice) / DECIMAL_FACTOR;
            }
            // check liquidity
            require(globalLpPosition.netSize * globalLpPosition.entryPrice / DECIMAL_FACTOR <= self.globalLPLiquidity.lpFund, "insufficient liquidity");

            // update position
            perpPosition.margin += realizedPnl + fundingFee - tradingFee;
                                    
            require(perpPosition.margin >= 0, "insufficient margin");
            if (marginDelta > perpPosition.margin) {
                marginDelta = perpPosition.margin;
            }
            perpPosition.margin -= marginDelta;
            perpPosition.size -= sizeDelta;

            if (perpPosition.size > 0) {
                // check maintain margin
                let unrealizedPnl: Int = 0;
                if (isLong) {
                    unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / DECIMAL_FACTOR;
                } else {
                    unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / DECIMAL_FACTOR;
                }
                let maintenanceMargin: Int = perpPosition.size * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * DECIMAL_FACTOR) + tokenConfig.liquidationFee;
                require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

                // check leverage
                require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size, "legerage too high");
                receive = marginDelta;
            } else {
                // close position
                receive = perpPosition.margin;
                perpPosition = PerpPosition {
                    positionId: 0,
                    margin: 0,
                    size: 0,
                    entryPrice: 0,
                    entryFundingFeeGrowth: 0
                };
            }

            // event
            emit(PerpPositionDecreasedEvent{
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
                receive: receive,
                trxId: trxId
            }.toCell());
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

        emit(GlobalLPPositionChangedEvent{
            tokenId: tokenId,
            netSizeAfter: globalLpPosition.netSize,
            isLong: globalLpPosition.isLong,
            entryPriceAfter: globalLpPosition.entryPrice,
            trxId: trxId
        }.toCell());
        emit(GlobalLPChangedEvent{
            lpFundAfter: self.globalLPLiquidity.lpFund,
            liquidityAfter: self.globalLPLiquidity.liquidity,
            tradingFee: lpTradingFee,
            fundingFee: 0,
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
            globalLPPosition: self.globalLPPositions.get(tokenId)
        };
    }

    // ============================ private function ================================ //
    fun setPrice(pricesLength: Int, prices: map<Int, UpdatePrice>) {
        if (pricesLength <= 0) {
            return;
        }
        let i: Int = 0;
        let totalGlobalUnrealizedPnl: Int = 0;
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
                        unrealizedPnl = globalLPPosition.netSize * (price - globalLPPosition.entryPrice) / DECIMAL_FACTOR;
                    } else {
                        unrealizedPnl = globalLPPosition.netSize * (globalLPPosition.entryPrice - price) / DECIMAL_FACTOR;
                    }
                    totalGlobalUnrealizedPnl = totalGlobalUnrealizedPnl - globalLPPosition.unrealizedPnl + unrealizedPnl;
                    self.globalLPPositions.set(tokenId, globalLPPosition);
                }
            }
            i = i + 1;
        }
        self.totalGlobalUnrealizedPnl = totalGlobalUnrealizedPnl;
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

    fun updateFundingRate(tokenId: Int) {
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
        // clamp (IR - avgPR) : -0.5% <= (IR - avgPR) <= 0.5%
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

        // get paidSize and receivedSize TODO
        let globalPosition: GlobalPosition = self.globalPositions.get(tokenId)!!;

        let paidSize: Int = 0;
        let receivedSize: Int = 0;
        let clampedFundingRateDeltaAbs: Int = 0;
        if (clampedFundingRateDelta >= 0) {
            paidSize = globalPosition.longSize;
            receivedSize = globalPosition.shortSize;
            clampedFundingRateDeltaAbs = clampedFundingRateDelta;
        } else {
            paidSize = globalPosition.shortSize;
            receivedSize = globalPosition.longSize;
            clampedFundingRateDeltaAbs = -clampedFundingRateDelta;
        }
        
        // calculate funding rate growth
        // paidFundingRateGrowthDelta = (paidSize * price * fundingRate) / paidSize = price * fundingRate
        let paidFundingRateGrowthDelta: Int = indexPrice * clampedFundingRateDeltaAbs / PERCENTAGE_BASIS_POINT;

        let receivedFundingRateGrowthDelta: Int = 0;
        if (paidFundingRateGrowthDelta > 0) {
            if (receivedSize > 0) {
                receivedFundingRateGrowthDelta = paidSize * paidFundingRateGrowthDelta / receivedSize;
            } else {
                let riskBufferFundDelta: Int = paidSize * paidFundingRateGrowthDelta / DECIMAL_FACTOR;
                self.globalRiskBufferFund.riskBufferFund += riskBufferFundDelta;
            }
        }
        let longFundingRateGrowthAfter: Int = globalPosition.longFundingRateGrowth;
        let shortFundingRateGrowthAfter: Int = globalPosition.shortFundingRateGrowth;
        
        // funding rate > 0, long pay for short and LP TODO
        if (clampedFundingRateDelta >= 0) {
            longFundingRateGrowthAfter = longFundingRateGrowthAfter - paidFundingRateGrowthDelta;
            shortFundingRateGrowthAfter = shortFundingRateGrowthAfter + receivedFundingRateGrowthDelta;
        } else {
            longFundingRateGrowthAfter = longFundingRateGrowthAfter + receivedFundingRateGrowthDelta;
            shortFundingRateGrowthAfter = shortFundingRateGrowthAfter - paidFundingRateGrowthDelta;
        }
        globalPosition.longFundingRateGrowth = longFundingRateGrowthAfter;
        globalPosition.shortFundingRateGrowth = shortFundingRateGrowthAfter;
        self.globalPositions.set(tokenId, globalPosition);
    }

    fun clamp(premiumRateAvg: Int, interestRate: Int): Int {
        let rateDelta: Int = interestRate - premiumRateAvg;
        if (rateDelta > PREMIUM_RATE_CLAMP_BOUNDARY_) {
            return PREMIUM_RATE_CLAMP_BOUNDARY_;
        } else if (rateDelta < -PREMIUM_RATE_CLAMP_BOUNDARY_) {
            return -PREMIUM_RATE_CLAMP_BOUNDARY_;
        } else {
            return rateDelta;
        }

    }

    fun calculatePremiumRate(): Int {
        return 0;
    }

}
