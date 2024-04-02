// ============================ Config ================================ //
// struct TokenConfig {
//     name: String;
//     enable: Bool;
// }

struct ConfigData {
    isExecutor: Bool?;
    maxTimeDelayExecutor: Int;
    minTimeDelayTrader: Int;
    minExecutionFee: Int;
    gasConsumption: Int;
    minTonsForStorage: Int;
    usdtWallet: Address;
    pool: Address;
}

// ============================ LP ================================ //
struct LPPositionOrder {
    isIncrease: Bool;
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
    isPending: Bool;
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
