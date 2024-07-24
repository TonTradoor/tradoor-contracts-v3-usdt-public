// ============================ LP ================================ //
// increase LP
message LiquidityOrderCreatedEvent {
    opType: Int as uint8;
    account: Address;
    jettonDelta: Int as coins;
    executionFee: Int as coins;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message LiquidityOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message LiquidityOrderExecutedEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message PerpOrderCreatedEvent {
    opType: Int as uint8;
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    triggerPrice: Int as uint128;
    triggerAbove: Bool;
    executionFee: Int as coins;
    orderId: Int as uint64;
    trxId: Int as uint64;
    blockTime: Int as uint32;
    requestTime: Int as uint32;
}

message PerpOrderCancelledEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message PerpOrderExecutedEvent {
    opType: Int as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

// ============================ Compensate ================================ //
message CompensateCreatedEvent {
    compensateId: Int as uint64;
    orderType: Int? as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int as coins;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
    unlockTime: Int as uint32;
}

message CompensateCancelledEvent {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

message CompensateExecutedEvent {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}
