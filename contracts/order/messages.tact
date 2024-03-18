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

// ============================ RBF ================================ //
// increase RBF
message CancelIncreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    executionFeeReceiver: Address?;
}

message ExecuteIncreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    executionFeeReceiver: Address?;
}

message IncreaseRBFPosition {
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message IncreaseRBFPositionSuccess {
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message CompensateIncreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    positionSuccess: Bool;
    refundSuccess: Bool;
    executionFeeReceiver: Address?;
}

// decrease RBF
message CreateDecreaseRBFPositionOrder {
    executionFee: Int;
    liquidityDelta: Int;
}

message CancelDecreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    executionFeeReceiver: Address?;
}

message ExecuteDecreaseRBFPositionOrder {
    orderId: Int;
    trxId: Int;
    executionFeeReceiver: Address?;
}

message DecreaseRBFPosition {
    orderId: Int;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message DecreaseRBFPositionSuccess {
    orderId: Int;
    received: Int;
    trxId: Int as uint64;
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

// ============================ admin ================================ //
message SetExecutor {
    executor: Address;
    enable: Bool;
}

message SetCompensator {
    compensator: Address;
    enable: Bool;
}

message UpdateConfig {
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