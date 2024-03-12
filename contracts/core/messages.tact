// ============================ JETTON ============================= //

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining; // Comment Text message when Transfer the jetton 
}

// ============================ RBF ================================ //
// increase RBF
message CancelIncreaseRBFPositionOrder {
    index: Int;
    trxId: Int;
}

message ExecuteIncreaseRBFPositionOrder {
    index: Int;
    trxId: Int;
}

// decrease RBF
message CreateDecreaseRBFPositionOrder {
    executionFee: Int;
    liquidityDelta: Int;
}

message CancelDecreaseRBFPositionOrder {
    index: Int;
    trxId: Int;
}

message ExecuteDecreaseRBFPositionOrder {
    index: Int;
    trxId: Int;
}

// ============================ LP ================================ //
// increase LP
message CancelIncreaseLPPositionOrder {
    index: Int;
    trxId: Int;
}

message ExecuteIncreaseLPPositionOrder {
    index: Int;
    trxId: Int;
}

// decrease LP
message CreateDecreaseLPPositionOrder {
    executionFee: Int;
    marginDelta: Int;
    liquidityDelta: Int;
}

message CancelDecreaseLPPositionOrder {
    index: Int;
    trxId: Int;
}

message ExecuteDecreaseLPPositionOrder {
    index: Int;
    trxId: Int;
}

message LiquidateLPPosition {
    account: Address;
    trxId: Int;
}

// ============================ Perp ================================ //
// increase market Perp
message CancelIncreasePerpPositionMarketOrder {
    index: Int;
    trxId: Int;
}

message ExecuteIncreasePerpPositionMarketOrder {
    index: Int;
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
    index: Int;
    trxId: Int;
}

message ExecuteDecreasePerpPositionMarketOrder {
    index: Int;
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
    index: Int;
    trxId: Int;
}

message ExecuteIncreasePerpPositionLimitOrder {
    index: Int;
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
    index: Int;
    trxId: Int;
}

message ExecuteDecreasePerpPositionLimitOrder {
    index: Int;
    trxId: Int;
}

// ============================ admin ================================ //
message SetOperator {
    operator: Address;
}

message SetExecutor {
    executor: Address;
    enable: Bool;
}

message SetUSDC {
    usdc: Address;
}

message SetExecutionFeeReceiver{
    receiver: Address;
}