import "./structs";

// ============================ RBF ================================ //
// increase RBF
message RBFPositionIncreasedEvent {
    positionId: Int;
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
    unlockTimeAfter: Int;
    trxId: Int;
}

// decrease RBF
message RBFPositionDecreasedEvent {
    positionId: Int;
    account: Address;
    liquidityDelta: Int; // decrease liquidty
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
    receive: Int; // realizedPnl = receive - liquidityDelta
    trxId: Int;
}

// global RBF
message GlobalRBFChangedEvent {
    riskBufferFundAfter: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    liquidation: Int;
    trxId: Int;
}

// ============================ LP ================================ //
// increase LP
message LPPositionIncreasedEvent {
    positionId: Int;
    account: Address;
    marginDelta: Int;
    marginAfter: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    fundingFee: Int;
    trxId: Int;
}

// decrease LP
message LPPositionDecreasedEvent {
    positionId: Int;
    account: Address;
    marginDelta: Int;
    marginAfter: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    fundingFee: Int;
    realizedLoss: Int;
    receive: Int;
    trxId: Int;
}

// liquidate LP
message LPPositionLiquidatedEvent {
    positionId: Int;
    account: Address;
    margin: Int;
    liquidity: Int;
    tradingFee: Int;
    fundingFee: Int;
    liquidationFee: Int;
    trxId: Int;
}

// global LP
message GlobalLPLiquidityChangedEvent {
    liquidityAfter: Int;
    trxId: Int;
}
message GlobalLPPositionChangedEvent {
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
    trxId: Int;
}

// ============================ Perp ================================ //
// increase Perp
message IncreasePerpPositionMarketCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
    executionFee: Int;
    index: Int;
}

message IncreasePerpPositionMarketCancelledEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message IncreasePerpPositionMarketExecutedEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message IncreasePerpPositionLimitCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    index: Int;
}

message IncreasePerpPositionLimitCancelledEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message IncreasePerpPositionLimitExecutedEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message PerpPositionIncreasedEvent {
    account: Address;
    token: String;
    marginDelta: Int;
    marginAfter: Int;
    sizeDelta: Int;
    sizeAfter: Int;
    tradePrice: Int;
    entryPrice: Int;
    fundingFee: Int;
    tradingFee: Int;
}

// decrease Perp
message DecreasePerpPositionMarketCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
    executionFee: Int;
    index: Int;
}

message DecreasePerpPositionMarketCancelledEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message DecreasePerpPositionMarketExecutedEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message DecreasePerpPositionLimitCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    index: Int;
}

message DecreasePerpPositionLimitCancelledEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message DecreasePerpPositionLimitExecutedEvent {
    token: String;
    index: Int;
    trxId: Int;
}

message PerpPositionDecreasedEvent {
    account: Address;
    token: String;
    marginDelta: Int;
    marginAfter: Int;
    sizeDelta: Int;
    sizeAfter: Int;
    tradePrice: Int;
    realizedPnLDelta: Int;
    fundingFee: Int;
    tradingFee: Int;
}

// ============================ Price ================================ //
message UpdatePriceEvent {
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}