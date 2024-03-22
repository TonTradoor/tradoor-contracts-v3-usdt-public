// ============================ RBF ================================ //
// increase RBF
message RBFPositionOrderCreatedEvent {
    isIncrease: Bool;
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    orderId: Int;
}

message RBFPositionOrderCancelledEvent {
    isIncrease: Bool;
    orderId: Int;
    trxId: Int;
}

message RBFPositionOrderExecutedEvent {
    isIncrease: Bool;
    orderId: Int;
    trxId: Int;
}

// ============================ LP ================================ //
message LPPositionOrderCreatedEvent {
    opType: Int as uint8;
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    orderId: Int;
}

message LPPositionOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int;
    trxId: Int;
}

message LPPositionOrderExecutedEvent {
    opType: Int as uint8;
    orderId: Int;
    trxId: Int;
}

// ============================ Perp ================================ //
// increase Perp
message IncreasePerpPositionMarketOrderCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
    executionFee: Int;
    orderId: Int;
}

message IncreasePerpPositionMarketOrderCancelledEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

message IncreasePerpPositionMarketOrderExecutedEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

message IncreasePerpPositionLimitOrderCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    orderId: Int;
}

message IncreasePerpPositionLimitOrderCancelledEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

message IncreasePerpPositionLimitOrderExecutedEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

// decrease Perp
message DecreasePerpPositionMarketOrderCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
    executionFee: Int;
    orderId: Int;
}

message DecreasePerpPositionMarketOrderCancelledEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

message DecreasePerpPositionMarketOrderExecutedEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

message DecreasePerpPositionLimitOrderCreatedEvent {
    account: Address;
    token: String;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    orderId: Int;
}

message DecreasePerpPositionLimitOrderCancelledEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}

message DecreasePerpPositionLimitOrderExecutedEvent {
    token: String;
    orderId: Int;
    trxId: Int;
}
