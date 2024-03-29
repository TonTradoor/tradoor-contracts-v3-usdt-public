// ============================ Config ================================ //
struct ConfigData {
    rbfLockTime: Int;
    bonusFactor: Int;
    minLPMargin: Int;
    maxLPLeverage: Int;
    lpLiquidationFee: Int;
    lpMaxRiskRate: Int;
    orderBook: Address;
}

struct TokenConfig {
    name: String;
    enable: Bool;
    // ==================== Trader Position Configuration ==================
    minMargin: Int;
    maxLeverage: Int;
    liquidationFee: Int;
    // ==================== Trading Fee Configuration ==================
    tradingFeeRate: Int;
    lpTradingFeeRate: Int;
    protocalTradingFeeRate: Int;
    // ==================== Other Configuration ==========================
    interestRate: Int;
    maxFundingRate: Int;
}

struct TokenConfigData {
    tokenIdNext: Int;
    tokenConfig: TokenConfig?;
}

// ============================ RBF ================================ //
struct RBFPosition {
    positionId: Int;
    liquidity: Int;
    bonus: Int;
    unlockTime: Int;
}

struct GlobalRBFPosition {
    riskBufferFund: Int;
    liquidity: Int;
}

struct RBFPositionData {
    rbfPosition: RBFPosition?;
    globalRBFPosition: GlobalRBFPosition;
}

// ============================ LP ================================ //
struct IncreaseLPPositionOrder {
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
}

struct DecreaseLPPositionOrder {
    account: Address;
    marginDelta: Int;
    liquidityDelta: Int;
    executionFee: Int;
    blockTime: Int;
}

struct LPPosition {
    positionId: Int;
    margin: Int;
    liquidity: Int;
    entryFundingFeeGrowth: Int;
    entryTradingFeeGrowth: Int;
}

struct GlobalLPLiquidity {
    margin: Int;
    liquidity: Int;
    fundingFeeGrowth: Int;
    tradingFeeGrowth: Int;
}

struct LPPositionData {
    lpPosition: LPPosition?;
    globalLPLiquidity: GlobalLPLiquidity;
}

// ============================ Perp ================================ //
// perp position
struct AccountPerpPosition {
    positions: map<Address, DirectionPerpPosition>;
}

struct DirectionPerpPosition {
    longPosition: PerpPosition;
    shortPosition: PerpPosition;
}

struct PerpPosition {
    positionId: Int;
    margin: Int;
    size: Int;
    entryPrice: Int;
    entryFundingFeeGrowth: Int;
}

struct GlobalLPPosition {
    netSize: Int;
    isLong: Bool;
    entryPrice: Int;
}

struct PerpPositionData {
    perpPosition: DirectionPerpPosition?;
    globalLPPosition: GlobalLPPosition?;
}

// ============================ Price ================================ //
struct PriceData {
    price: Int;
}

struct UpdatePrice {
    tokenId: Int;
    price: Int;
}
