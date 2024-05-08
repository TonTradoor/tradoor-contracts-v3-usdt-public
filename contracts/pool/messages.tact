import "./structs";

// ============================ admin ================================ //
message UpdateConfig {
    executorLength: Int;
    executors: map<Int, ExecutorParam>;
    claimExecutor: Address;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    lpLockTime: Int;
    lpAddBonusFactor: Int;
    lpRemoveBonusFactor: Int;
    lpLiquidityFactor: Int;
    orderBook: Address;
}

message UpdateTokenConfig {
    tokenId: Int as uint64;
    name: String;
    enable: Bool;
    // ==================== Trader Position Config ====================
    minValue: Int;
    maxValue: Int;
    maxLeverage: Int;
    liquidationFee: Int;
    maintenanceRate: Int;
    // ==================== Trading Fee Config ====================
    tradingFeeRate: Int;
    lpTradingFeeRate: Int;
    // ==================== Funding Fee Config ====================
    interestRate: Int;
    maxFundingRate: Int;
    liquidityProportion: Int;
}

message ClaimProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
}

message(0x5dd58461) SendProtocolFee {
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