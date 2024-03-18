// ============================ JETTON ============================= //

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
    compensator: Address?;
    enableCompensator: Bool?;
    minTimeDelayExecutor: Int?;
    maxTimeDelayExecutor: Int?;
    minTimeDelayTrader: Int?;
    minPendingTimeDelayCompensator: Int?;
    rbfLockTime: Int?;
    minExecutionFee: Int?;
    gasConsumption: Int?;
    minTonsForStorage: Int?;
    usdtWallet: Address?;
    pool: Address?;
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
}

message UpdateRBFPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message UpdateRBFPositionSuccess {
    orderId: Int;
    receive: Int;
    trxId: Int as uint64;
}

message CompensateIncreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    positionSuccess: Bool;
    refundSuccess: Bool;
    executionFeeReceiver: Address?;
}

message CompensateDecreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    positionSuccess: Bool;
    refundSuccess: Bool;
    executionFeeReceiver: Address?;
}
// ============================ LP ================================ //
// increase LP
message CancelIncreaseLPPositionOrder {
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

message ExecuteIncreaseLPPositionOrder {
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

// decrease LP
message CreateDecreaseLPPositionOrder {
    executionFee: Int;
    marginDelta: Int;
    liquidityDelta: Int;
}

message CancelDecreaseLPPositionOrder {
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

message ExecuteDecreaseLPPositionOrder {
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

// ============================ Perp ================================ //
// increase market Perp
message CancelIncreasePerpPositionMarketOrder {
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

message ExecuteIncreasePerpPositionMarketOrder {
    executionFeeReceiver: Address;
    orderId: Int;
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
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

message ExecuteDecreasePerpPositionMarketOrder {
    executionFeeReceiver: Address;
    orderId: Int;
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
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

message ExecuteIncreasePerpPositionLimitOrder {
    executionFeeReceiver: Address;
    orderId: Int;
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
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}

message ExecuteDecreasePerpPositionLimitOrder {
    executionFeeReceiver: Address;
    orderId: Int;
    trxId: Int;
}
