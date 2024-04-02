import "./structs";

// ============================ admin ================================ //
message UpdateConfig {
    gasConsumption: Int;
    minTonsForStorage: Int;
    lpLockTime: Int;
    bonusFactor: Int;
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
    interestRate: Int;
    maxFundingRate: Int;
}

// ============================ LP ================================ //
message(0xe89cd45f) UpdateLPPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message(0x1cf0cf81) UpdateLPPositionSuccess {
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