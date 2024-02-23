// ============================ RBF ================================ //
/// increase RBF
message IncreaseRBFPositionCreatedEvent {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message IncreaseRBFPositionCancelledEvent {
    index: Int;
}

message IncreaseRBFPositionExecutedEvent {
    index: Int;
}

message RBFPositionIncreasedEvent {
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    unlockTimeAfter: Int;
}

/// decrease RBF
message DecreaseRBFPositionCreatedEvent {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message DecreaseRBFPositionCancelledEvent {
    index: Int;
}

message RBFPositionDecreasedEvent {
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    unlockTimeAfter: Int;
}

/// global RBF
message GlobalRBFChangedEvent {
    liquidityAfter: Int;
}

// ============================ LP ================================ //
/// increase LP
message IncreaseLPPositionCreatedEvent {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message IncreaseLPPositionCancelledEvent {
    index: Int;
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

/// decrease LP
message DecreaseLPPositionCreatedEvent {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message DecreaseLPPositionCancelledEvent {
    index: Int;
}

message LPPositionDecreasedEvent {
    account: Address;
    marginDelta: Int;
    marginAfter: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    realizedProfit: Int;
}

/// global LP
message GlobalLPChangedEvent {
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
}

// ============================ Perp ================================ //
/// increase Perp
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

/// decrease Perp
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