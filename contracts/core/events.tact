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
    marginAfter: Int;
    liquidityAfter: Int;
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
    trxId: Int;
}

// ============================ Price ================================ //
message UpdatePriceEvent {
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}