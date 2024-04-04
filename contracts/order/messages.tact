import "./structs";

// ============================ JETTON ============================= //
message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    receiver: Address;
    responseDestination: Address?;
    customPayload: Cell?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining; 
}

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining; // Comment Text message when Transfer the jetton 
}

message(0xd53276db) TokenExcesses {
    queryId: Int as uint64;
}

// ============================ admin ================================ //
message UpdateConfig {
    executor: Address?;
    enableExecutor: Bool?;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    minExecutionFee: Int as coins;
    gasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    usdtWallet: Address;
    pool: Address;
}

// ============================ LP ================================ //
message CreateDecreaseLPPositionOrder {
    executionFee: Int as coins;
    liquidityDelta: Int;
}

message CancelLPPositionOrder {
    orderId: Int as uint64;
    trxId: Int;
    executionFeeReceiver: Address?;
}

message ExecuteLPPositionOrder {
    orderId: Int as uint64;
    trxId: Int;
    executionFeeReceiver: Address?;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message(0xe89cd45f) UpdateLPPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message(0x1cf0cf81) UpdateLPPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int;
}

message CompensateOrder {
    orderType: Int?;
    orderId: Int as uint64;
    trxId: Int;
    refundReceiver: Address?;
    refundAmount: Int;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
}

// ============================ Perp ================================ //
message CreateDecreasePerpPositionOrder {
    executionFee: Int as coins;
    opType: Int as uint8;
    tokenId: Int as uint64;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
}

message CancelPerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int;
}

message ExecutePerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message LiquidateOrADLPerpPosition {
    executionFeeReceiver: Address?;
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    // adlSize: Int;
    trxId: Int;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

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
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message(0xef01c2b4) UpdatePerpPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int;
}
