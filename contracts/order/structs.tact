// ============================ Config ================================ //
struct TokenConfig {
    name: String;
    enable: Bool;
    // ==================== Trader Position Configuration ==================
    minMarginPerPosition: Int;
    maxLeveragePerPosition: Int;
    liquidationFeeRatePerPosition: Int;
    // ==================== Other Configuration ==========================
    liquidationExecutionFee: Int;
    interestRate: Int;
    maxFundingRate: Int;
}

struct ConfigData {
    minTimeDelayExecutor: Int;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    minPendingTimeDelayCompensator: Int;
    rbfLockTime: Int;
    minExecutionFee: Int;
    gasConsumption: Int;
    minTonsForStorage: Int;
    usdtWallet: Address;
    pool: Address;
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
struct IncreaseRBFPositionOrder {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    pendingTime: Int;
    callbackId: Int?;
    executionFeeReceiver: Address?;
}

struct DecreaseRBFPositionOrder {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
    pendingTime: Int;
    callbackId: Int?;
    executionFeeReceiver: Address?;
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

// perp position
struct AccountPerpPosition {
    positions: map<Address, DirectionPerpPosition>;
}

struct DirectionPerpPosition {
    longPosition: PerpPosition;
    shortPosition: PerpPosition;
}

struct PerpPosition {
    margin: Int;
    size: Int;
    entryPrice: Int;
    entryFundingFeeGrowth: Int;
}