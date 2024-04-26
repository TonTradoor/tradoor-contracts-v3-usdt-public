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

// global LP
message GlobalLPLiquidityChangedEvent {
    lpFundAfter: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    realizedPnl: Int;
    trxId: Int as uint64;
}

message GlobalLPPositionChangedEvent {
    tokenId: Int as uint64;
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message GlobalPositionChangedEvent {
    tokenId: Int as uint64;
    longMarginAfter: Int;
    shortMarginAfter: Int;
    longSizeAfter: Int;
    shortSizeAfter: Int;
    longFundingFeeGrowthAfter: Int;
    shortFundingFeeGrowthAfter: Int;
    trxId: Int as uint64;
}

// ============================ Price ================================ //
// message UpdatePriceAndFundingFeeEvent {
//     dataLength: Int as uint64;
//     datas: map<Int, UpdatePriceAndFundingFeeData>;
// }
message UpdatePriceEvent {
    tokenId: Int as uint64;
    price: Int;
    lpReceivedFundingFeeDelta: Int;
    longFundingFeeGrowthAfter: Int;
    shortFundingFeeGrowthAfter: Int;
}

message PremiumRateChangedEvent {
    tokenId: Int as uint64;
    premiumRate: Int;
}

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
    tradePrice: Int;
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

message UpdateFundingFeeEvent {
    length: Int;
    datas: map<Int, UpdateFundingRateEventData>;
}
