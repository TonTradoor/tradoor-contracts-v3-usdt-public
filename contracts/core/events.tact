// ============================ RBF ================================ //
message IncreaseRBFPositionCreatedEvent {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message RBFPositionIncreasedEvent {
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    unlockTimeAfter: Int;
}

message DecreaseRBFPositionCreatedEvent {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message RBFPositionDecreasedEvent {
    account: Address;
    liquidityDelta: Int;
    liquidityAfter: Int;
    unlockTimeAfter: Int;
}

message GlobalRBFChangedEvent {
    liquidityAfter: Int;
}

// ============================ LP ================================ //
message IncreaseLPPositionCreatedEvent {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message LPPositionIncreasedEvent {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    entryFundingFeeGrowth: Int;
    entryTradingFeeGrowth: Int;
}

message DecreaseLPPositionCreatedEvent {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    executionFee: Int;
    index: Int;
}

message LPPositionDecreasedEvent {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    liquidityAfter: Int;
    realizedProfit: Int;
}

message GlobalLPChangedEvent {
    netSizeAfter: Int;
    isLong: Bool;
    entryPriceAfter: Int;
}