// ============================ Config ================================ //
struct ConfigData {
    isExecutor: Bool?;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    minExecutionFee: Int as coins;
    gasConsumption: Int as coins;
    lpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    usdtWallet: Address;
    pool: Address;
}

struct WhitelistData {
    enableWhitelist: Bool;
    isInWhitelist: Bool;
}

struct UpdateWhitelistParam {
    account: Address;
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
