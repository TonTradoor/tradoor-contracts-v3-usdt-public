// ============================ Config ================================ //
struct ConfigData {
    isExecutor: Bool?;
    gasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    lpLockTime: Int;
    lpBonusFactor: Int;
    lpLiquidityFactor: Int;
    orderBook: Address;
}

struct TokenConfig {
    name: String;
    enable: Bool;
    // ==================== Trader Position Configuration ==================
    minMargin: Int;
    maxLeverage: Int;
    liquidationFee: Int;
    liquidityProportion: Int;
    // ==================== Trading Fee Configuration ==================
    tradingFeeRate: Int;
    lpTradingFeeRate: Int;
    // ==================== Other Configuration ==========================
    interestRate: Int;
    maxFundingRate: Int;
}

struct TokenConfigData {
    tokenIdNext: Int as uint64;
    tokenConfig: TokenConfig?;
}

// ============================ LP ================================ //
struct LPPosition {
    positionId: Int as uint64;
    liquidity: Int;
    bonus: Int;
    realizedFundingFee: Int;
    entryFundingFeeGrowth: Int;
    unlockTime: Int;
}

struct LPPositionData {
    lpPosition: LPPosition?;
    globalLPFund: Int;
    globalLPLiquidity: Int;
    globalLPFundingFeeGrowth: Int;
    globalLPUnrealizedPnl: Int;
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
    positionId: Int as uint64;
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
    globalPosition: GlobalPosition?;
    globalPerpNetValue: Int;
    globalPerpSingleValue: Int;
}

// ============================ Price ================================ //
struct PriceData {
    price: Int;
}

struct UpdatePriceParam {
    tokenId: Int as uint64;
    price: Int;
}

// ============================ Premium Rate ================================ //
struct PremiumRateSampleRange {
    sampleLength: Int;
    samples: map<Int, PremiumRateSample>;
}

struct PremiumRateSampleRangeParam {
    sampleId: Int;
    sampleLength: Int;
    samples: map<Int, PremiumRateSample>;
}

struct PremiumRateSample {
    deviationRate: Int;
    premiumRate: Int;
}

// ============================ Funding Rate ================================ //
struct GlobalPosition {
    longMargin: Int;
    shortMargin: Int;
    longSize: Int;
    shortSize: Int;
    longFundingFeeGrowth: Int;
    shortFundingFeeGrowth: Int;
    longValue: Int;
    shortValue: Int;
}

struct GlobalFundingRateSample {
    lastAdjustFundingRateTime: Int;
    sampleCount: Int;
    cumulativePremiumRate: Int;
}

struct FundingFeeGrowth {
    clampedFundingRateDelta: Int;
    longFundingFeeGrowthAfter: Int;
    shortFundingFeeGrowthAfter: Int;
}

struct SamplePremiumRateResult {
    sample: GlobalFundingRateSample;
    shouldAdjustFundingRate: Bool;
    fundingRateDelta: Int;
}