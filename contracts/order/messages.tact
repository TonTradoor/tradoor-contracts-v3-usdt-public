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

message UpdateWhitelist {
    enableWhitelist: Bool?;
    whitelistLength: Int as uint64;
    whitelist: map<Int, UpdateWhitelistParam>;
}

// ============================ LP ================================ //
message CreateDecreaseLPPositionOrder {
    executionFee: Int as coins;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message CancelLPPositionOrder {
    orderId: Int as uint64;
    trxId: Int as uint64;
    executionFeeReceiver: Address?;
}

message ExecuteLPPositionOrder {
    orderId: Int as uint64;
    trxId: Int as uint64;
    executionFeeReceiver: Address?;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message(0xe89cd45f) UpdateLPPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message(0x1cf0cf81) UpdateLPPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int as uint64;
}

message CreateCompensate {
    orderType: Int?;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
}

message CancelCompensate {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

message ExecuteCompensate {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message CreateDecreasePerpPositionOrder {
    executionFee: Int as coins;
    tokenId: Int as uint64;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    trxId: Int as uint64;
}

message CreateTpSlPerpPositionOrder {
    executionFee: Int as coins;
    tokenId: Int as uint64;
    isLong: Bool;
    tpSize: Int;
    tpPrice: Int;
    slSize: Int;
    slPrice: Int;
    trxId: Int as uint64;
}

message CancelPerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message ExecutePerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int as uint64;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message LiquidatePerpPosition {
    liquidationFeeReceiver: Address?;
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    trxId: Int as uint64;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message ADLPerpPosition {
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    trxId: Int as uint64;
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
    trxId: Int as uint64;
    pricesLength: Int as uint64;
    prices: map<Int, UpdatePrice>;
}

message(0xef01c2b4) UpdatePerpPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int as uint64;
}
