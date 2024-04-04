// ============================ LP ================================ //
// increase LP
message LPPositionOrderCreatedEvent {
    opType: Int as uint8;
    account: Address;
    liquidityDelta: Int;
    executionFee: Int as coins;
    orderId: Int;
}

message LPPositionOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int;
}

message LPPositionOrderExecutedEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int;
}

// ============================ Perp ================================ //
message PerpPositionOrderCreatedEvent {
    opType: Int as uint8;
    tokenId: Int as uint64;
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
    executionFee: Int as coins;
    orderId: Int;
}

message PerpPositionOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int;
}

message PerpPositionOrderExecutedEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int;
}

// ============================ Compensate ================================ //
message CompensateOrderEvent {
    orderType: Int?;
    orderId: Int as uint64;
    trxId: Int;
    refundReceiver: Address?;
    refundAmount: Int;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
}