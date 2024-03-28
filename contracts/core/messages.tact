import "./structs";

// ============================ admin ================================ //
message UpdateConfig {
    gasConsumption: Int;
    minTonsForStorage: Int;
    rbfLockTime: Int;
    bonusFactor: Int;
    minLPMargin: Int;
    maxLPLeverage: Int;
    lpLiquidationFee: Int;
    lpMaxRiskRate: Int;
    orderBook: Address;
}

message UpdateTokenConfig {
    tokenId: Int;
    name: String;
    enable: Bool;
    minMargin: Int;
    maxLeverage: Int;
    liquidationFee: Int;
    tradingFeeRate: Int;
    lpTradingFeeRate: Int;
    protocalTradingFeeRate: Int;
    interestRate: Int;
    maxFundingRate: Int;
}

// ============================ RBF ================================ //
message(0xe89cd45f) UpdateRBFPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
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
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message(0x4989c7c1) UpdateLPPositionSuccess {
    orderId: Int;
    receive: Int;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message(0xff57e557) UpdatePerpPosition {
    orderId: Int as uint64;
    opType: Int as uint8;
    tokenId: Int;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    trxId: Int as uint64;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message(0xef01c2b4) UpdatePerpPositionSuccess {
    orderId: Int;
    receive: Int;
    trxId: Int as uint64;
}