import "./structs";

// ============================ admin ================================ //
message UpdateConfig {
    executorLength: Int;
    executors: map<Int, ExecutorParam>;
    claimExecutor: Address?;
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
    minValue: Int?;
    maxLeverage: Int?;
    liquidationFee: Int?;
    liquidityProportion: Int?;
    tradingFeeRate: Int?;
    lpTradingFeeRate: Int?;
    interestRate: Int?;
    maxFundingRate: Int?;
}

message ClaimProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
}

message SendProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
    amount: Int;
}

// ============================ LP ================================ //
message(0xe89cd45f) UpdateLPPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
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