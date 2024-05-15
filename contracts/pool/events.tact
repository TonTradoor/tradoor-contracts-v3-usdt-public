import "./structs";

// ============================ LP ================================ //
// increase LP
message LPPositionIncreasedEvent {
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
    unlockTimeAfter: Int;
    realizedFundingFeeDelta: Int;
    realizedFundingFeeAfter: Int;
    entryFundingFeeGrowthAfter: Int;
    lpFundAfter: Int;
    lpLiquidityAfter: Int;
}

// decrease LP
message LPPositionDecreasedEvent {
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    liquidityDelta: Int; // decrease liquidty
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
    fundingFeeDelta: Int;
    entryFundingFeeGrowthAfter: Int;
    receive: Int; // realizedPnl = receive - liquidityDelta
    lpFundAfter: Int;
    lpLiquidityAfter: Int;
}

// ============================ Perp ================================ //
message PerpPositionIncreasedEvent {
    // perp position
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    tokenId: Int as uint64;
    isLong: Bool;
    marginDelta: Int;
    marginAfter: Int;
    sizeDelta: Int;
    sizeAfter: Int;
    avgPremiumRate: Int;
    tradePrice: Int;
    entryPrice: Int;
    fundingFee: Int;
    tradingFee: Int;
    entryFundingFeeGrowthAfter: Int;
    // global position
    globalLongMarginAfter: Int;
    globalShortMarginAfter: Int;
    globalLongSizeAfter: Int;
    globalShortSizeAfter: Int;
    globalLongFundingFeeGrowthAfter: Int;
    globalShortFundingFeeGrowthAfter: Int;
    globalLPFundingFeeGrowthAfter: Int;
    // lp position
    lpNetSizeAfter: Int;
    lpIsLong: Bool;
    lpEntryPriceAfter: Int;
    // lp liquidity
    lpFundAfter: Int;
    lpLiquidityAfter: Int;
    lpTradingFee: Int;
    lpRealizedPnl: Int;
    lpReceivedFundingFee: Int;
}

message PerpPositionDecreasedEvent {
    // perp position
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    tokenId: Int as uint64;
    isLong: Bool;
    marginDelta: Int;
    marginAfter: Int;
    sizeDelta: Int;
    sizeAfter: Int;
    avgPremiumRate: Int;
    tradePrice: Int; // liquidatePrice for liquidate
    entryPrice: Int;
    realizedPnLDelta: Int;
    fundingFee: Int;
    tradingFee: Int;
    entryFundingFeeGrowthAfter: Int;
    receive: Int;
    // global position
    globalLongMarginAfter: Int;
    globalShortMarginAfter: Int;
    globalLongSizeAfter: Int;
    globalShortSizeAfter: Int;
    globalLongFundingFeeGrowthAfter: Int;
    globalShortFundingFeeGrowthAfter: Int;
    globalLPFundingFeeGrowthAfter: Int;
    // lp position
    lpNetSizeAfter: Int;
    lpIsLong: Bool;
    lpEntryPriceAfter: Int;
    // lp liquidity
    lpFundAfter: Int;
    lpLiquidityAfter: Int;
    lpTradingFee: Int;
    lpRealizedPnl: Int;
    lpReceivedFundingFee: Int;
}

// ============================ Funding Fee ================================ //
message UpdateFundingFeeEvent {
    length: Int;
    datas: map<Int, UpdateFundingRateEventData>;
}
