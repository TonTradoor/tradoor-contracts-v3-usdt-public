// ============================ LP ================================ //
message LiquidityOrderCreatedEvent {
    opType: Int as uint8;
    account: Address;
    jettonDelta: Int as coins;
    executionFee: Int as coins;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message LiquidityOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message LiquidityPoolChangedEvent {
    trxId: Int as uint64;
    orderId: Int as uint64;
    opType: Int as uint8;
    account: Address;
    jettonDelta: Int as coins;
    tlpDelta: Int as coins;
    tlpPrice: Int as uint128;
    tlpSupply: Int as coins;
    lpFundAfter: Int as int128;
    realizedLpFundingFeeDelta: Int as coins;
    realizedLpRolloverFeeDelta: Int as coins;
    entryLpFundingFeeGrowth: Int as coins;
    entryRolloverFeeGrowth: Int as coins;
}

// ============================ Perp ================================ //
message PerpOrderCreatedEvent {
    opType: Int as uint8;
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    triggerPrice: Int as uint128;
    triggerAbove: Bool;
    executionFee: Int as coins;
    orderId: Int as uint64;
    trxId: Int as uint64;
    blockTime: Int as uint32;
    requestTime: Int as uint32;
}

message PerpOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
}
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

// ============================ Compensate ================================ //
message CompensateCreatedEvent {
    compensateId: Int as uint64;
    orderType: Int? as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int as coins;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
    unlockTime: Int as uint32;
}

message CompensateCancelledEvent {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

message CompensateExecutedEvent {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}
