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
    executorLength: Int;
    executors: map<Int, ExecutorParam>;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    lpMinExecutionFee: Int as coins;
    perpMinExecutionFee: Int as coins;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    poolLpGasConsumption: Int as coins;
    poolPerpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasTransferJetton: Int as coins;
    usdtWallet: Address;
    pool: Address;
}

message(0x5dd58461) SendProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
    amount: Int;
}

// ============================ LP ================================ //
message CreateDecreaseLPPositionOrder {
    executionFee: Int as coins;
    liquidityDelta: Int as uint128;
    trxId: Int as uint64;
}

message CancelLPPositionOrder {
    orderId: Int as uint64;
    trxId: Int as uint64;
    executionFeeReceiver: Address?;
}

message ExecuteLPPositionOrder {
    orderId: Int as uint64;
    trxId: Int as uint64;
    executionFeeReceiver: Address?;
}

message(0xe89cd45f) UpdateLPPosition {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    liquidityDelta: Int;
    trxId: Int as uint64;
}

message(0x1cf0cf81) UpdateLPPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int as uint64;
}

message CreateCompensate {
    orderType: Int? as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int as uint128;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
}

message CancelCompensate {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

message ExecuteCompensate {
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message CreateDecreasePerpPositionOrder {
    executionFee: Int as coins;
    tokenId: Int as uint64;
    isLong: Bool;
    marginDelta: Int as uint128;
    sizeDelta: Int as uint128;
    triggerPrice: Int as uint128;
    trxId: Int as uint64;
}

message CreateTpSlPerpPositionOrder {
    executionFee: Int as coins;
    tokenId: Int as uint64;
    isLong: Bool;
    tpSize: Int as uint128;
    tpPrice: Int as uint128;
    slSize: Int as uint128;
    slPrice: Int as uint128;
    trxId: Int as uint64;
}

message CancelPerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message ExecutePerpPositionOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int as uint64;
    tokenId: Int as uint64;
    price: Int;
    premiumRate: Int;
}

message LiquidatePerpPosition {
    liquidationFeeReceiver: Address?;
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    trxId: Int as uint64;
    price: Int;
    premiumRate: Int;
}

message ADLPerpPosition {
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    marginDelta: Int as uint128;
    sizeDelta: Int as uint128;
    trxId: Int as uint64;
    price: Int;
    premiumRate: Int;
}

message(0xff57e557) UpdatePerpPosition {
    orderId: Int as uint64;
    opType: Int as uint8;
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    trxId: Int as uint64;
    price: Int;
    premiumRate: Int;
}

message(0xef01c2b4) UpdatePerpPositionSuccess {
    orderId: Int as uint64;
    receive: Int;
    trxId: Int as uint64;
}
