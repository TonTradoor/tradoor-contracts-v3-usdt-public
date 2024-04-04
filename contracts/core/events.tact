import "./structs";

// ============================ LP ================================ //
// increase LP
message LPPositionIncreasedEvent {
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
    trxId: Int;
}

// decrease LP
message LPPositionDecreasedEvent {
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
    trxId: Int;
}

// global LP
message GlobalLPChangedEvent {
    lpFundAfter: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    fundingFee: Int;
    trxId: Int;
}

message GlobalLPPositionChangedEvent {
    tokenId: Int as uint64;
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
    trxId: Int;
}

// ============================ Perp ================================ //
message PerpPositionIncreasedEvent {
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
    trxId: Int;
}

message PerpPositionDecreasedEvent {
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
    trxId: Int;
}

message PerpPositionLiquidatedEvent {
    opType: Int as uint8;
    positionId: Int as uint64;
    account: Address;
    tokenId: Int as uint64;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    liquidatePrice: Int;
    fundingFee: Int;
    tradingFee: Int;
    liquidationFee: Int;
    trxId: Int;
}

message GlobalPositionChangedEvent {
    longSizeAfter: Int;
    shortSizeAfter: Int;
    longFundingFeeGrowthAfter: Int;
    shortFundingFeeGrowthAfter: Int;
    trxId: Int;
}

// ============================ Price ================================ //
message UpdatePriceEvent {
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}