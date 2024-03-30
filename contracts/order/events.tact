// ============================ RBF ================================ //
// increase RBF
message RBFPositionOrderCreatedEvent {
    opType: Int as uint8;
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    orderId: Int;
}

message RBFPositionOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int;
    trxId: Int;
}

message RBFPositionOrderExecutedEvent {
    opType: Int as uint8;
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
message PerpPositionOrderCreatedEvent {
    opType: Int as uint8;
    tokenId: Int;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    tpSize: Int;
    tpPrice: Int;
    slSize: Int;
    slPrice: Int;
    executionFee: Int;
    orderId: Int;
}

message PerpPositionOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int;
    trxId: Int;
}

message PerpPositionOrderExecutedEvent {
    opType: Int as uint8;
    orderId: Int;
    trxId: Int;
}

// ============================ Compensate ================================ //
message CompensateOrderEvent {
    orderType: Int?;
    orderId: Int;
    trxId: Int;
    refundReceiver: Address?;
    refundAmount: Int;
    executionFeeReceiver: Address?;
    executionFeeAmount: Int;
}