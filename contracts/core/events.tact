import "./structs";

// ============================ LP ================================ //
// increase LP
message LPPositionIncreasedEvent {
    positionId: Int;
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
    unlockTimeAfter: Int;
    trxId: Int;
}

// decrease LP
message LPPositionDecreasedEvent {
    positionId: Int;
    account: Address;
    liquidityDelta: Int; // decrease liquidty
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
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
    tokenId: Int;
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
    trxId: Int;
}

// ============================ Perp ================================ //
message PerpPositionIncreasedEvent {
    positionId: Int;
    account: Address;
    tokenId: Int;
    isLong: Bool;
    marginDelta: Int;
    marginAfter: Int;
    sizeDelta: Int;
    sizeAfter: Int;
    tradePrice: Int;
    entryPrice: Int;
    fundingFee: Int;
    tradingFee: Int;
    trxId: Int;
}

message PerpPositionDecreasedEvent {
    positionId: Int;
    account: Address;
    tokenId: Int;
    isLong: Bool;
    marginDelta: Int;
    marginAfter: Int;
    sizeDelta: Int;
    sizeAfter: Int;
    tradePrice: Int;
    realizedPnLDelta: Int;
    fundingFee: Int;
    tradingFee: Int;
    receive: Int;
    trxId: Int;
}

message PerpPositionLiquidatedEvent {
    positionId: Int;
    account: Address;
    tokenId: Int;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    liquidatePrice: Int;
    fundingFee: Int;
    tradingFee: Int;
    liquidationFee: Int;
    trxId: Int;
}

// ============================ Price ================================ //
message UpdatePriceEvent {
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}