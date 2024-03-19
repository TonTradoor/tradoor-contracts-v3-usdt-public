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
}

// decrease RBF
message RBFPositionDecreasedEvent {
    positionId: Int;
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    bonusDelta: Int;
    bonusAfter: Int;
    receive: Int;
}

// global RBF
message GlobalRBFChangedEvent {
    riskBufferFundAfter: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    liquidation: Int;
}

// ============================ LP ================================ //
// increase LP
message IncreaseLPPositionCreatedEvent {
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message IncreaseLPPositionCancelledEvent {
    index: Int;
    trxId: Int;
}

message IncreaseLPPositionExecutedEvent {
    index: Int;
    trxId: Int;
}

message LPPositionIncreasedEvent {
    account: Address;
    marginDelta: Int;
    marginAfter: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    entryFundingFeeGrowth: Int;
    entryTradingFeeGrowth: Int;
}

// decrease LP
message DecreaseLPPositionCreatedEvent {
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message DecreaseLPPositionCancelledEvent {
    index: Int;
    trxId: Int;
}

message DecreaseLPPositionExecutedEvent {
    index: Int;
    trxId: Int;
}

message LPPositionDecreasedEvent {
    account: Address;
    marginDelta: Int;
    marginAfter: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    tradingFee: Int;
    fundingFee: Int;
    realizedLoss: Int;
}

// liquidate LP
message LPPositionLiquidatedEvent {
    account: Address;
    trxId: Int;
    margin: Int;
    liquidity: Int;
    tradingFee: Int;
    fundingFee: Int;
    liquidationFee: Int;
}

// global LP
message GlobalLPChangedEvent {
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
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
