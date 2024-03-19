// ============================ Config ================================ //
struct TokenConfig {
    name: String;
    enable: Bool;
}

struct ConfigData {
    minTimeDelayExecutor: Int;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    minPendingTimeDelayCompensator: Int;
    minExecutionFee: Int;
    gasConsumption: Int;
    minTonsForStorage: Int;
    usdtWallet: Address;
    pool: Address;
    isExecutor: Bool?;
    isCompensator: Bool?;
}

// ============================ Jetton ================================ //
struct JettonCallback {
    orderType: Int;
    orderId: Int;
    tokenId: Int?;
    amount: Int;
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
    pendingTime: Int;
    callbackId: Int?;
    executionFeeReceiver: Address?;
}

struct RBFPositionOrderData {
    rbfPositionOrderIndexNext: Int;
    rbfPositionOrder: RBFPositionOrder?;
}

// ============================ LP ================================ //
struct IncreaseLPPositionOrder {
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    pendingTime: Int;
}

struct DecreaseLPPositionOrder {
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    pendingTime: Int;
}

// ============================ Perp ================================ //
// increase market order
struct IncreasePerpPositionMarketOrders {
    increasePerpPositionMarketOrders: map<Int, IncreasePerpPositionMarketOrder>;
}

struct IncreasePerpPositionMarketOrder {
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
    executionFee: Int;
    blockTime: Int;
}

// decrease market order
struct DecreasePerpPositionMarketOrders {
    decreasePerpPositionMarketOrders: map<Int, DecreasePerpPositionMarketOrder>;
}

struct DecreasePerpPositionMarketOrder {
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    acceptablePrice: Int;
    executionFee: Int;
    blockTime: Int;
}

// increase limit order
struct IncreasePerpPositionLimitOrders {
    increasePerpPositionLimitOrders: map<Int, IncreasePerpPositionLimitOrder>;
}

struct IncreasePerpPositionLimitOrder {
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    blockTime: Int;
}

// decrease limit order
struct DecreasePerpPositionLimitOrders {
    decreasePerpPositionLimitOrders: map<Int, DecreasePerpPositionLimitOrder>;
}

struct DecreasePerpPositionLimitOrder {
    account: Address;
    isLong: Bool;
    marginDelta: Int;
    sizeDelta: Int;
    triggerPrice: Int;
    triggerAbove: Bool;
    executionFee: Int;
    blockTime: Int;
}