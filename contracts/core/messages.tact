// ============================ JETTON ============================= //

message(0x7362d09c) TokenNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton 
}

// ============================ RBF ================================ //
// increase RBF
message CreateIncreaseRBFPositionOrder {
    executionFee: Int;
    liquidityDelta: Int;
}

message CancelIncreaseRBFPositionOrder {
    index: Int;
}

message ExecuteIncreaseRBFPositionOrder {
    index: Int;
}

// decrease RBF
message CreateDecreaseRBFPositionOrder {
    liquidityDelta: Int;
}

message CancelDecreaseRBFPositionOrder {
    index: Int;
}

message ExecuteDecreaseRBFPositionOrder {
    index: Int;
}

// ============================ LP ================================ //
// increase LP
message CreateIncreaseLPPositionOrder {
    margin: Int;
    liquidityDelta: Int;
}

message CancelIncreaseLPPositionOrder {
    index: Int;
}

message ExecuteIncreaseLPPositionOrder {
    index: Int;
}

// decrease LP
message CreateDecreaseLPPositionOrder {
    margin: Int;
    liquidityDelta: Int;
}

message CancelDecreaseLPPositionOrder {
    index: Int;
}

message ExecuteDecreaseLPPositionOrder {
    index: Int;
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
}

message ExecuteIncreasePerpPositionMarketOrder {
    index: Int;
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
}

message ExecuteDecreasePerpPositionMarketOrder {
    index: Int;
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
}

message ExecuteIncreasePerpPositionLimitOrder {
    index: Int;
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
}

message ExecuteDecreasePerpPositionLimitOrder {
    index: Int;
}