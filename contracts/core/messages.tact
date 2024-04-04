import "./structs";

// ============================ admin ================================ //
message UpdateConfig {
    gasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    lpLockTime: Int;
    bonusFactor: Int;
    orderBook: Address;
}

message UpdateTokenConfig {
    tokenId: Int as uint64;
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
    trxId: Int;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message(0x1cf0cf81) UpdateLPPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int;
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
    trxId: Int;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message(0xef01c2b4) UpdatePerpPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int;
}

// ============================ Funding Fee ================================ //
message UpdateFundingFee {
    trxId: Int;
    tokenId: Int as uint64;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}