// ============================ Config ================================ //
struct ConfigData {
    lpLockTime: Int;
    bonusFactor: Int;
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
    // ==================== Other Configuration ==========================
    interestRate: Int;
    maxFundingRate: Int;
}

struct TokenConfigData {
    tokenIdNext: Int;
    tokenConfig: TokenConfig?;
}

// ============================ LP ================================ //
struct LPPosition {
    positionId: Int;
    liquidity: Int;
    bonus: Int;
    realizedFundingFee: Int;
    entryFundingFeeGrowth: Int;
    unlockTime: Int;
}

struct LPPositionData {
    lpPosition: LPPosition?;
    lpFund: Int;
    lpLiquidity: Int;
    lpFundingFeeGrowth: Int;
    lpUnrealizedPnl: Int;
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
    unrealizedPnl: Int;
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

// ============================ funding rate ================================ //
struct GlobalPosition {
    longSize: Int;
    shortSize: Int;
    longFundingRateGrowth: Int;
    shortFundingRateGrowth: Int;
}

struct GlobalFundingRateSample {
    lastAdjustFundingRateTime: Int;
    sampleCount: Int;
    cumulativePremiumRate: Int;
}

struct FundingRateGrowth {
    clampedFundingRateDelta: Int;
    longFundingRateGrowthAfter: Int;
    shortFundingRateGrowthAfter: Int;
}

struct SamplePremiumRateResult {
    sample: GlobalFundingRateSample;
    shouldAdjustFundingRate: Bool;
    fundingRateDelta: Int;
}