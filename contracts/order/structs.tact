// ============================ Config ================================ //
struct ConfigData {
    isExecutor: Bool?;
    minTimeDelayTrader: Int;
    lpMinExecutionFee: Int as coins;
    perpMinExecutionFee: Int as coins;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    poolLpGasConsumption: Int as coins;
    poolPerpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasTransferJetton: Int as coins;
    totalExecutionFee: Int as coins;
    usdtWallet: Address;
    pool: Address;
}

struct ExecutorParam {
    executor: Address;
    enable: Bool;
}

// ============================ LP ================================ //
struct LPPositionOrder {
    isIncrease: Bool;
    account: Address;
    liquidityDelta: Int;
    executionFee: Int as coins;
    blockTime: Int;
    isPending: Bool;
    executionFeeReceiver: Address;
    lastOperator: Address?;
}

struct LPPositionOrderData {
    lpPositionOrderIndexNext: Int;
    lpPositionOrder: LPPositionOrder?;
}

// ============================ Perp ================================ //
struct PerpPositionOrder {
    opType: Int as uint8;
    tokenId: Int as uint64;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int as coins;
    blockTime: Int;
    isPending: Bool;
    executionFeeReceiver: Address;
    lastOperator: Address?;
}

struct PerpPositionOrderEx {
    tpSize: Int;
    tpPrice: Int;
    slSize: Int;
    slPrice: Int;
    executionFee: Int;
}

struct PerpPositionOrderData {
    perpPositionOrderIndexNext: Int;
    perpPositionOrder: PerpPositionOrder?;
    perpPositionOrderEx: PerpPositionOrderEx?;
}

// ============================ Price ================================ //
struct UpdatePrice {
    tokenId: Int as uint64;
    price: Int;
}

// ============================ Compensate ================================ //
struct Compensate {
    orderType: Int?;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
    unlockTime: Int;
}

struct CompensateData {
    compensateIndexNext: Int;
    compensate: Compensate?;
}
