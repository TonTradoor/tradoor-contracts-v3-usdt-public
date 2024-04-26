import "./structs";

// ============================ admin ================================ //
message UpdateConfig {
    executor: Address?;
    enableExecutor: Bool?;
    gasConsumption: Int? as coins;
    minTonsForStorage: Int? as coins;
    lpBonusFactor: Int?;
    lpLiquidityFactor: Int?;
    orderBook: Address?;
}

message UpdateTokenConfig {
    tokenId: Int as uint64;
    name: String?;
    enable: Bool?;
    minMargin: Int?;
    maxLeverage: Int?;
    liquidationFee: Int?;
    liquidityProportion: Int?;
    tradingFeeRate: Int?;
    lpTradingFeeRate: Int?;
    interestRate: Int?;
    premuimRateCap: Int?;
}

message ClaimProtocolFee {
    feeReceiver: Address;
}

// ============================ LP ================================ //
message(0xe89cd45f) UpdateLPPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
    // tokenId: Int as uint64;
    // price: Int;
}

message(0x1cf0cf81) UpdateLPPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message(0xff57e557) UpdatePerpPosition {
    orderId: Int as uint64;
    opType: Int as uint8;
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    trxId: Int as uint64;
    price: Int;
    premiumRate: Int;
}

message(0xef01c2b4) UpdatePerpPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int as uint64;
}

// ============================ Price ================================ //
message UpdatePrice {
    trxId: Int as uint64;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePriceParam>;
}

message SetPremiumRateSampleRange {
    sampleRangeLength: Int as uint64;
    sampleRanges: map<Int, PremiumRateSampleRangeParam>;
}

// for test
message DeviationRate {
    deviationRate: Int;
}
