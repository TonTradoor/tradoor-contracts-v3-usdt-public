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
    minExecutionFee: Int;
    gasConsumption: Int;
    minTonsForStorage: Int;
    usdtWallet: Address;
    pool: Address;
}

// ============================ RBF ================================ //
message CreateDecreaseRBFPositionOrder {
    executionFee: Int;
    liquidityDelta: Int;
}

message CancelRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    executionFeeReceiver: Address?;
}

message ExecuteRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    executionFeeReceiver: Address?;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

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

message CompensateOrder {
    orderType: Int?;
    orderId: Int;
    trxId: Int;
    refundReceiver: Address?;
    refundAmount: Int;
    executionFeeReceiver: Address?;
    executionFeeAmount: Int;
}
// ============================ LP ================================ //
message CreateDecreaseLPPositionOrder {
    executionFee: Int;
    marginDelta: Int;
    liquidityDelta: Int;
}

message CancelLPPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int;
    trxId: Int;
}

message ExecuteLPPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int;
    trxId: Int;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message LiquidateLPPositionOrder {
    executionFeeReceiver: Address?;
    account: Address;
    trxId: Int;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

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

message CompensateLPPositionOrder {
    orderId: Int;
    trxId: Int;
    needRefund: Bool;
    isExecute: Bool;
    executionFeeReceiver: Address?;
}

// ============================ Perp ================================ //
message CreateDecreasePerpPositionOrder {
    executionFee: Int;
    opType: Int;
    tokenId: Int;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
}

message CancelPerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int;
    trxId: Int;
}

message ExecutePerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int;
    trxId: Int;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

message LiquidateOrADLPerpPosition {
    executionFeeReceiver: Address?;
    tokenId: Int;
    account: Address;
    isLong: Bool;
    // adlSize: Int;
    trxId: Int;
    pricesLength: Int;
    prices: map<Int, UpdatePrice>;
}

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

message CompensatePerpPositionOrder {
    orderId: Int;
    trxId: Int;
    needRefund: Bool;
    isExecute: Bool;
    executionFeeReceiver: Address?;
}