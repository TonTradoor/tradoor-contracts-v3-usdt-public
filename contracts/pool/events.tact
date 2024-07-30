import "./structs";

// ============================ LP ================================ //
// increase LP
message LiquidityIncreasedEvent {
    trxId: Int as uint64;
    opType: Int as uint8;
    account: Address;
    jettonDelta: Int as coins;
    tlpDelta: Int as coins;
    tlpPrice: Int as uint128;
    tlpSupply: Int as coins;
    lpFundAfter: Int as int128;
    entryLpFundingFeeGrowth: Int as coins;
    entryRolloverFeeGrowth: Int as coins;
}

// decrease LP
message LiquidityDecreasedEvent {
    trxId: Int as uint64;
    opType: Int as uint8;
    account: Address;
    jettonDelta: Int as coins;
    tlpDelta: Int as coins;
    tlpPrice: Int as uint128;
    tlpSupply: Int as coins;
    lpFundAfter: Int as int128;
    entryLpFundingFeeGrowth: Int as coins;
    entryRolloverFeeGrowth: Int as coins;
}

// ============================ Perp ================================ //
message PerpPositionIncreasedEvent {
    // perp position
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    tokenId: Int as uint16;
    isLong: Bool;
    marginDelta: Int as int128;
    marginAfter: Int as coins;
    sizeDelta: Int as int128;
    sizeAfter: Int as coins;
    tradePrice: Int as uint128;
    entryPrice: Int as uint128;
    fundingFee: Int as int128;
    rolloverFee: Int as coins;
    tradingFee: Int as coins;
    entryFundingFeeGrowthAfter: Int as int128;
    entryRolloverFeeGrowthAfter: Int as int128;
    // global position
    globalLongMarginAfter: Int as coins;
    globalShortMarginAfter: Int as coins;
    globalLongSizeAfter: Int as coins;
    globalShortSizeAfter: Int as coins;

    // lp position
    lpNetSizeAfter: Int as coins;
    lpIsLong: Bool;
    lpEntryPriceAfter: Int as uint128;
    // lp liquidity
    lpFundAfter: Int as int128;
    lpTradingFee: Int as coins;
    lpRealizedPnl: Int as int128;
}

message PerpPositionDecreasedEvent {
    // perp position
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    tokenId: Int as uint16;
    isLong: Bool;
    marginDelta: Int as int128;
    marginAfter: Int as coins;
    sizeDelta: Int as int128;
    sizeAfter: Int as coins;
    tradePrice: Int as uint128; // liquidatePrice for liquidate
    entryPrice: Int as uint128;
    realizedPnLDelta: Int as int128;
    fundingFee: Int as int128;
    rolloverFee: Int as coins;
    tradingFee: Int as coins;
    entryFundingFeeGrowthAfter: Int as int128;
    entryRolloverFeeGrowthAfter: Int as int128;
    payout: Int as coins;
    // global position
    globalLongMarginAfter: Int as coins;
    globalShortMarginAfter: Int as coins;
    globalLongSizeAfter: Int as coins;
    globalShortSizeAfter: Int as coins;

    // lp position
    lpNetSizeAfter: Int as coins;
    lpIsLong: Bool;
    lpEntryPriceAfter: Int as uint128;
    // lp liquidity
    lpFundAfter: Int as int128;
    lpTradingFee: Int as coins;
    lpRealizedPnl: Int as int128;
}
