// ============================ RBF ================================ //
struct IncreaseRBFPositionOrder {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
}

struct DecreaseRBFPositionOrder {
    account: Address;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
}

struct RBFPosition {
    liquidity: Int;
    unlockTime: Int;
}

struct GlobalRBFPosition {
    riskBufferFund: Int;
    liquidity: Int;
}

// ============================ LP ================================ //
struct IncreaseLPPositionOrder {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
}

struct DecreaseLPPositionOrder {
    account: Address;
    margin: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
}

struct LPPosition {
    margin: Int;
    liquidity: Int;
    entryFundingFeeGrowth: Int;
    entryTradingFeeGrowth: Int;
}

struct GlobalLPPosition {
    netSize: Int;
    isLong: Bool;
    entryPrice: Int;
}
