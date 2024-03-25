// ============================ Config ================================ //
struct TokenConfig {
    name: String;
    enable: Bool;
}

struct ConfigData {
    isExecutor: Bool?;
    isCompensator: Bool?;
    minTimeDelayExecutor: Int;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    minExecutionFee: Int;
    gasConsumption: Int;
    minTonsForStorage: Int;
    usdtWallet: Address;
    pool: Address;
}

// ============================ Callback ================================ //
struct JettonCallback {
    orderType: Int;
    orderId: Int;
    amount: Int;
    receiver: Address;
    trxId: Int;
}

// ============================ RBF ================================ //
struct RBFPositionOrder {
    isIncrease: Bool;
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    callbackId: Int?;
    executionFeeReceiver: Address?;
    lastOperator: Address?;
}

// ============================ LP ================================ //
struct LPPositionOrder {
    opType: Int as uint8;
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    callbackId: Int?;
    executionFeeReceiver: Address?;
    lastOperator: Address?;
}

// ============================ Perp ================================ //
struct PerpPositionOrder {
    opType: Int as uint8;
    tokenId: Int;
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    callbackId: Int?;
    executionFeeReceiver: Address?;
    lastOperator: Address?;
}

struct PerpPositionOrderEx {
    tpSize: Int;
    tpPrice: Int;
    slSize: Int;
    slPrice: Int;
}

// ============================ Price ================================ //
struct UpdatePrice {
    tokenId: Int;
    price: Int;
}
