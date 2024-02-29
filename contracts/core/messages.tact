// ============================ JETTON ============================= //

message(0x7362d09c) TokenNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton 
}

// ============================ RBF ================================ //
// increase RBF
message CancelIncreaseRBFPositionOrder {
    index: Int;
    uuid: Int;
}

message ExecuteIncreaseRBFPositionOrder {
    index: Int;
    uuid: Int;
}

// decrease RBF
message CreateDecreaseRBFPositionOrder {
    executionFee: Int;
    liquidityDelta: Int;
}

message CancelDecreaseRBFPositionOrder {
    index: Int;
    uuid: Int;
}

message ExecuteDecreaseRBFPositionOrder {
    index: Int;
    uuid: Int;
}

// ============================ LP ================================ //
// increase LP
message CreateIncreaseLPPositionOrder {
    margin: Int;
    liquidityDelta: Int;
}

message CancelIncreaseLPPositionOrder {
    index: Int;
    uuid: Int;
}

message ExecuteIncreaseLPPositionOrder {
    index: Int;
    uuid: Int;
}

// decrease LP
message CreateDecreaseLPPositionOrder {
    margin: Int;
    liquidityDelta: Int;
}

message CancelDecreaseLPPositionOrder {
    index: Int;
    uuid: Int;
}

message ExecuteDecreaseLPPositionOrder {
    index: Int;
    uuid: Int;
}

// ============================ Perp ================================ //
// increase market Perp
message CreateIncreasePerpPositionMarketOrder {
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
}

message CancelIncreasePerpPositionMarketOrder {
    index: Int;
    uuid: Int;
}

message ExecuteIncreasePerpPositionMarketOrder {
    index: Int;
    uuid: Int;
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
    uuid: Int;
}

message ExecuteDecreasePerpPositionMarketOrder {
    index: Int;
    uuid: Int;
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
    uuid: Int;
}

message ExecuteIncreasePerpPositionLimitOrder {
    index: Int;
    uuid: Int;
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
    uuid: Int;
}

message ExecuteDecreasePerpPositionLimitOrder {
    index: Int;
    uuid: Int;
}

// ============================ admin ================================ //
message SetOperator {
    operator: Address;
}

message SetUSDC {
    usdc: Address;
}