import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract Pool with Deployable, Ownable {
    owner: Address;

    // config
    orderBook: Address;
    claimExecutor: Address;

    lpGasConsumption: Int as coins = ton("0.04");
    perpGasConsumption: Int as coins = ton("0.09");
    minTonsForStorage: Int as coins = ton("0.01");
    gasForMintTlp: Int as coins = ton("0.01");

    maxLpNetCap: Int as coins = ton("10000000"); // 10M
    lpRolloverFeeRate: Int as uint32 = 100;

    tokenConfigs: map<Int as uint16, TokenConfig>; // tokenId => tokenConfig

    // data
    tlpJetton: Address; // TLP address
    tlpSupply: Int as coins = 0;

    protocolTradingFee: Int as coins = 0;
    globalLPFund: Int as int128 = 0;
    globalLPUnrealizedPnl: Int as int128 = 0;
    globalLpFundingFeeGrowth: Int as coins = 0;
    globalRolloverFeeGrowth: Int as coins = 0;

    globalPerpNetValue: Int as coins = 0;
    globalPerpSingleValue: Int as coins = 0;

    perpPositionIndexNext: Int as uint64 = 1;
    perpPositions: map<Int as uint16, AccountPerpPosition>; // tokenId => user => direction => position

    globalLPPositions: map<Int as uint16, GlobalLPPosition>; // tokenId => globalLP
    globalPositions: map<Int as uint16, GlobalPosition>; // tokenId => globalPosition
    prices: map<Int as uint16, Int as uint128>; // tokenId => price

    /**
     * Initializes the pool contract.
     * @param deployId The deployment ID.
     */
    init(deployId: Int) {
        self.owner = sender();
        self.orderBook = sender();
        self.tlpJetton = sender();
        self.claimExecutor = sender();
    }

    // ======================================================== Admin ================================================================ //
    /**
     * @dev Receive function to update the configuration of the pool contract.
     * @param msg The UpdateConfig struct containing the new configuration parameters.
     */
    receive(msg: UpdateConfig) {
        self.requireOwner();
        self.tlpJetton = msg.tlpJetton;
        self.orderBook = msg.orderBook;
        self.claimExecutor = msg.claimExecutor;
        self.lpGasConsumption = msg.lpGasConsumption;
        self.perpGasConsumption = msg.perpGasConsumption;
        self.minTonsForStorage = msg.minTonsForStorage;
        self.gasForMintTlp = msg.gasForMintTlp;

        self.maxLpNetCap = msg.maxLpNetCap;
        self.lpRolloverFeeRate = msg.lpRolloverFeeRate;
        self.reply("config updated".asComment());
    }

    /**
     * Updates the token configuration for a specific token ID.
     * 
     * @param msg The UpdateTokenConfig message containing the new token configuration.
     */
    receive(msg: UpdateTokenConfig) {
        self.requireOwner();
        self.tokenConfigs.set(msg.tokenId, msg.config);
        self.reply("token config updated".asComment());
    }

    /**
     * @dev Receive function to claim protocol trading fee.
     * @param msg The ClaimProtocolFee message containing the transaction ID, fee receiver, and amount.
     */
    receive(msg: ClaimProtocolFee) {
        require(sender() == self.claimExecutor, "invalid sender");

        if (self.protocolTradingFee > 0) {
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
            self.protocolTradingFee = 0;
        }
    }

    /**
     * receive TON coin transfers to the contract
     */
    receive() {}

    /**
     * Retrieves the configuration data for the pool.
     * 
     * @param executor The address of the executor.
     * @return The ConfigData object containing the pool configuration.
     */
    get fun configData(): ConfigData {
        return ConfigData{
            lpGasConsumption: self.lpGasConsumption,
            perpGasConsumption: self.perpGasConsumption,
            minTonsForStorage: self.minTonsForStorage,
            gasForMintTlp: self.gasForMintTlp,
            maxLpNetCap: self.maxLpNetCap,
            tlpJetton: self.tlpJetton,
            orderBook: self.orderBook,
            claimExecutor: self.claimExecutor
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
     * Retrieves the price data for a given token ID.
     * 
     * @param tokenId The ID of the token.
     * @return The price data associated with the token ID, or `null` if no price data is found.
     */
    get fun priceData(tokenId: Int): Int? {
        return self.prices.get(tokenId);
    }

    /**
     * Calculates the gas fee for a given order type.
     * 
     * @return The gas fee for the order.
     */
    fun exceedGas(): Int {
        let ctx: Context = context();
        let tonBalanceBeforeMsg: Int = myBalance() - ctx.value;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        let extraValue: Int = max(0, tonBalanceBeforeMsg - self.minTonsForStorage);
        return ctx.value - storageFee + extraValue;
    }

    // ======================================================== LP ================================================================ //
    /**
     * @dev Receive function to update LP position based on the received message.
     * @param msg The UpdateLiquidityPool message containing the necessary information.
     */
    receive(msg: UpdateLiquidityPool) {
        require(sender() == self.orderBook, "invalid sender");
        let prices: map<Int as uint16, Int as uint128> = self.prices;
        let globalLPUnrealizedPnl: Int = 0;
        foreach ( tokenId,price in prices) {
            let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
            if (globalLPPositionOpt != null) {
                let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;
                if (globalLPPosition.isLong) {
                    globalLPUnrealizedPnl += globalLPPosition.netSize * (price - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
                } else {
                    globalLPUnrealizedPnl += globalLPPosition.netSize * (globalLPPosition.entryPrice - price) / PRICE_DECIMAL_FACTOR;
                }
            }
        }
        self.globalLPUnrealizedPnl = globalLPUnrealizedPnl;
        self.prices = prices;

        // settle lp funding fee
        let lpFundingFeeGrowth: Int = msg.lpFundingFeeGrowth - self.globalLpFundingFeeGrowth;
        self.globalLPFund += lpFundingFeeGrowth;
        self.globalLpFundingFeeGrowth = msg.lpFundingFeeGrowth;

        // settle rollover fee
        let rolloverFeeGrowth: Int = msg.rolloverFeeGrowth - self.globalRolloverFeeGrowth;
        let lpRolloverFeeGrowth: Int = rolloverFeeGrowth * self.lpRolloverFeeRate / PERCENTAGE_BASIS_POINT;
        self.globalLPFund += lpRolloverFeeGrowth;
        self.protocolTradingFee += (rolloverFeeGrowth - lpRolloverFeeGrowth);
        self.globalRolloverFeeGrowth = msg.rolloverFeeGrowth;

        if (msg.isIncrease) {
            self.increaseLiquidity(msg.trxId, msg.orderId, msg.account, msg.jettonDelta);
        } else {
            self.decreaseLiquidity(msg.trxId, msg.orderId, msg.account, msg.jettonDelta);
        }
    }

    /**
     * Increases the LP (Liquidity Provider) position by adding liquidity to the pool.
     * 
     * @param trxId The transaction ID.
     * @param orderId The order ID.
     * @param account The address of the LP account.
     * @param jettonDelta The change in liquidity to be added to the LP position.
     */
    fun increaseLiquidity(trxId: Int, orderId: Int, account: Address, jettonDelta: Int) {
        // calculate tlp delta
        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;
        let availableJetton: Int = max(0, (self.maxLpNetCap - globalNetLP));
        require(jettonDelta <= availableJetton, "insufficient available jetton");

        let tlpPrice: Int = self.tlpSupply == 0 ? PRICE_DECIMAL_FACTOR : (globalNetLP * (TLP_DECIMAL / JETTON_DECIMAL) * PRICE_DECIMAL_FACTOR / self.tlpSupply);
        let tlpDelta: Int = jettonDelta * (TLP_DECIMAL / JETTON_DECIMAL) * PRICE_DECIMAL_FACTOR  / tlpPrice; 

        send(SendParameters{
            to: self.tlpJetton, 
            value: self.gasForMintTlp,
            mode: SendPayGasSeparately,
            bounce: true,
            body: JettonMint{ origin: account, receiver: account, amount: tlpDelta, custom_payload: null, forward_ton_amount: 0, forward_payload: emptySlice() }.toCell()
        });
       // update global position
        self.globalLPFund += jettonDelta;
        self.tlpSupply += tlpDelta;

        // leave minTonsForStorage
        let msgValue: Int = self.exceedGas() - self.lpGasConsumption - self.gasForMintTlp;
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: LiquidityPoolUpdated {
                isIncrease: true,
                orderId: orderId,
                tlpPrice: tlpPrice,
                tlpDelta: tlpDelta,
                jettonDelta: jettonDelta,
                trxId: trxId
            }.toCell()
        });

        emit(LiquidityIncreasedEvent{
            trxId: trxId,
            opType: ORDER_OP_TYPE_INCREASE,
            account: account,
            jettonDelta: jettonDelta,
            tlpPrice: tlpPrice,
            tlpDelta: tlpDelta,
            tlpSupply: self.tlpSupply,
            lpFundAfter: self.globalLPFund,
        }.toCell());
    }

    /**
     * Decreases the liquidity position of an LP (Liquidity Provider) account.
     * 
     * @param trxId The transaction ID.
     * @param orderId The order ID.
     * @param account The LP account address.
     * @param tlpDelta The amount of TLP-jetton to unstake.
     */
    fun decreaseLiquidity(trxId: Int, orderId: Int, account: Address, tlpDelta: Int) {
        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;
        let tlpPrice: Int = globalNetLP * (TLP_DECIMAL / JETTON_DECIMAL) * PRICE_DECIMAL_FACTOR / self.tlpSupply;
        let jettonDelta: Int = tlpPrice * tlpDelta / ((TLP_DECIMAL / JETTON_DECIMAL) * PRICE_DECIMAL_FACTOR);

        self.globalLPFund -= jettonDelta;
        self.tlpSupply -= tlpDelta;
        // exceed gas
        let msgValue: Int = self.exceedGas() - self.lpGasConsumption;
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately | SendIgnoreErrors,
            body: LiquidityPoolUpdated {
                isIncrease: false,
                orderId: orderId,
                tlpPrice: tlpPrice,
                tlpDelta: tlpDelta,
                jettonDelta: jettonDelta,
                trxId: trxId
            }.toCell()
        });

        // event
        emit(LiquidityDecreasedEvent{
            trxId: trxId,
            opType: ORDER_OP_TYPE_DECREASE,
            account: account,
            tlpDelta: tlpDelta,
            jettonDelta: jettonDelta,
            tlpPrice: tlpPrice,
            tlpSupply: self.tlpSupply,
            lpFundAfter: self.globalLPFund,
        }.toCell());
    }

    /**
     * Retrieves the LP position data for a given account.
     * 
     * @param account The address of the account.
     * @return LPPositionData The LP position data.
     */
    get fun globalPoolData(): GlobalPoolData {
        return GlobalPoolData {
            tlpSupply: self.tlpSupply,
            protocolTradingFee: self.protocolTradingFee,
            globalLPFund: self.globalLPFund,
            globalLPUnrealizedPnl: self.globalLPUnrealizedPnl,
            globalLpFundingFeeGrowth: self.globalLpFundingFeeGrowth,
            globalRolloverFeeGrowth: self.globalRolloverFeeGrowth,
            globalPerpNetValue: self.globalPerpNetValue,
            globalPerpSingleValue: self.globalPerpSingleValue
        };
    }

    // ============================ Perp ================================ //
    /**
     * @dev This function is called when a `UpdatePerpPosition` message is received.
     * It updates the perpetual position based on the provided parameters.
     * 
     * @param msg The `UpdatePerpPosition` message containing the necessary information.
     */
    receive(msg: UpdatePerpPosition) {
        require(sender() == self.orderBook, "invalid sender");
        let tradePrice: Int = msg.price;
        self.prices.set(msg.tokenId, tradePrice);
        // update position
        if (msg.opType == ORDER_OP_TYPE_INCREASE_MARKET || msg.opType == ORDER_OP_TYPE_INCREASE_LIMIT) {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.increasePerpPosition(msg.trxId, msg.orderId, msg.opType, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
        } else if (msg.opType == ORDER_OP_TYPE_LIQUIDATION) {
            self.liquidatePerpPosition(msg.trxId, msg.orderId, msg.account, msg.tokenId, msg.isLong, tradePrice, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
        } else if (msg.opType == ORDER_OP_TYPE_ADL) {
            self.decreasePerpPosition(msg.trxId, msg.orderId, msg.opType, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
        } else {
            if (msg.triggerAbove) {
                require(tradePrice >= msg.triggerPrice, "not reach trigger price");
            } else {
                require(tradePrice <= msg.triggerPrice, "not reach trigger price");
            }
            self.decreasePerpPosition(msg.trxId, msg.orderId, msg.opType, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, tradePrice, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
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
    fun increasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int, fundingFeeGrowth: Int, rolloverFeeGrowth: Int) {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        // check value
        if (sizeDelta > 0) {
            let valueDelta: Int = sizeDelta * tradePrice / PRICE_DECIMAL_FACTOR;
            require(valueDelta >= tokenConfig.minValue, "less than min value");
            require(valueDelta <= tokenConfig.maxValue, "greater than max value");
        }

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
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
            },
            shortPosition: PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
            }
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;

        // check margin
        if (perpPosition.size == 0) {
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
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;

        // get global lp position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0
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

        // exceed gas
        let msgValue: Int = self.exceedGas() - self.perpGasConsumption;

        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: PerpPositionUpdated {
                orderId: orderId,
                payout: 0,
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
            rolloverFee: rolloverFee,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl,
        }.toCell());
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
        fundingFeeGrowth: Int, rolloverFeeGrowth: Int) {
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
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
            },
            shortPosition: PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
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
            longValue: 0,
            shortValue: 0
        };

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        // get global position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0
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
        // position pnl
        if (isLong) {
            realizedPnl = sizeDelta * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            realizedPnl = sizeDelta * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }

        // margin
        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += realizedPnl + fundingFee - tradingFee - rolloverFee;

        require(perpPosition.margin >= 0, "insufficient margin");
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
            perpPosition = PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
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

        // // update global value
        let singleValueBefore: Int = max(globalPosition.longValue, globalPosition.shortValue);
        let netValueBefore: Int = abs(globalPosition.longValue - globalPosition.shortValue);
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;
        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        // exceed gas
        let msgValue: Int = self.exceedGas() - self.perpGasConsumption;

        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: PerpPositionUpdated {
                orderId: orderId,
                payout: payout,
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

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl
        }.toCell());
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
    fun liquidatePerpPosition(trxId: Int, orderId: Int, account: Address, tokenId: Int, isLong: Bool, tradePrice: Int, fundingFeeGrowth: Int, rolloverFeeGrowth: Int) {
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
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
            },
            shortPosition: PerpPosition {
                positionId: 0,
                margin: 0,
                size: 0,
                entryPrice: 0,
                entryFundingFeeGrowth: 0,
                entryRolloverFeeGrowth: 0
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
            longValue: 0,
            shortValue: 0
        };

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
        let liquidatePrice: Int = ((perpPosition.margin + fundingFee - rolloverFee - tokenConfig.liquidationFee) * PRICE_DECIMAL_FACTOR + (isLong ? -perpPosition.entryPrice * perpPosition.size : perpPosition.entryPrice * perpPosition.size))
            / (perpPosition.size * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)) / PERCENTAGE_BASIS_POINT);

        // get global position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {
            netSize: 0,
            isLong: false,
            entryPrice: 0
        };

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong != globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (!isLong) {
                lpRealizedPnl = sizeUsed * (liquidatePrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - liquidatePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        // lp entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * liquidatePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
        }

        // trading fee
        let tradingFee: Int = sizeDelta * liquidatePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let protocolTradingFee: Int = tradingFee - lpTradingFee;

        self.protocolTradingFee += protocolTradingFee;
        self.globalLPFund += lpRealizedPnl + lpTradingFee;

        let positionId: Int = perpPosition.positionId;
        let payout: Int = tokenConfig.liquidationFee;
        let realizedPnl: Int = -(marginDelta - tradingFee + fundingFee - rolloverFee);

        // close position
        perpPosition = PerpPosition {
            positionId: 0,
            margin: 0,
            size: 0,
            entryPrice: 0,
            entryFundingFeeGrowth: 0,
            entryRolloverFeeGrowth: 0
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
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;
        self.globalPerpSingleValue += max(globalPosition.longValue, globalPosition.shortValue) - singleValueBefore;
        self.globalPerpNetValue += abs(globalPosition.longValue - globalPosition.shortValue) - netValueBefore;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.perpPositions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        // exceed gas
        let msgValue: Int = self.exceedGas() - self.perpGasConsumption;

        require(msgValue > 0, "send gas not enough");
        // send update success msg
        send(SendParameters{
            to: self.orderBook,
            value: msgValue,
            bounce: false,
            mode: SendPayGasSeparately,
            body: PerpPositionUpdated {
                orderId: orderId,
                payout: payout,
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
            tradePrice: liquidatePrice,
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

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl
        }.toCell());
    }

    /**
     * Retrieves the perpetual position data for a given token ID and account.
     * 
     * @param tokenId The ID of the token.
     * @param account The account address. If null, the global position data will be returned.
     * @return The perpetual position data, including global values and specific position data.
     */
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
            globalPosition: self.globalPositions.get(tokenId)
        };
    }

}
