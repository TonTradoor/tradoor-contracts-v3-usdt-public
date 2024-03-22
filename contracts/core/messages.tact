// ============================ admin ================================ //
message UpdateConfig {
    gasConsumption: Int?;
    minTonsForStorage: Int?;
    rbfLockTime: Int?;
    bonusFactor: Int?;
    minLPMargin: Int?;
    maxLPLeverage: Int?;
    lpLiquidationFee: Int?;
    lpMaxRiskRate: Int?;
    orderBook: Address?;
}

message UpdateTokenConfig {
    tokenId: Int;
    name: String?;
    enable: Bool?;
    minMarginPerPosition: Int?;
    maxLeveragePerPosition: Int?;
    liquidationFeeRatePerPosition: Int?;
    liquidationExecutionFee: Int?;
    interestRate: Int?;
    maxFundingRate: Int?;
}

// ============================ RBF ================================ //
message(0xe89cd45f) UpdateRBFPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message(0x1cf0cf81) UpdateRBFPositionSuccess {
    orderId: Int;
    receive: Int;
    trxId: Int as uint64;
}

// ============================ LP ================================ //
message(0xfea36b71) UpdateLPPosition {
    orderId: Int as uint64;
    opType: Int as uint8;
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message(0x4989c7c1) UpdateLPPositionSuccess {
    orderId: Int;
    receive: Int;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
// increase market Perp
message CancelIncreasePerpPositionMarketOrder {
    index: Int;
    trxId: Int;
}

message ExecuteIncreasePerpPositionMarketOrder {
    index: Int;
    trxId: Int;
}

// decrease market Perp
message CreateDecreasePerpPositionMarketOrder {
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
}

message CancelDecreasePerpPositionMarketOrder {
    index: Int;
    trxId: Int;
}

message ExecuteDecreasePerpPositionMarketOrder {
    index: Int;
    trxId: Int;
}

// increase limit Perp
message CreateIncreasePerpPositionLimitOrder {
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
}

message CancelIncreasePerpPositionLimitOrder {
    index: Int;
    trxId: Int;
}

message ExecuteIncreasePerpPositionLimitOrder {
    index: Int;
    trxId: Int;
}

// decrease limit Perp
message CreateDecreasePerpPositionLimitOrder {
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
}

message CancelDecreasePerpPositionLimitOrder {
    index: Int;
    trxId: Int;
}

message ExecuteDecreasePerpPositionLimitOrder {
    index: Int;
    trxId: Int;
}