// ============================ Config ================================ //
struct ConfigData {
    isExecutor: Bool?;
    gasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
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
    premuimRateCap: Int;
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
    globalPerpNetValue: Int;
    globalPerpSingleValue: Int;
    perpPosition: DirectionPerpPosition?;
    globalLPPosition: GlobalLPPosition?;
    globalPosition: GlobalPosition?;
    globalFundingRateSample: GlobalFundingRateSample?;
}

// ============================ Price ================================ //
struct UpdatePriceParam {
    tokenId: Int as uint64;
    price: Int;
}

// struct UpdatePriceAndFundingFeeData {
//     tokenId: Int as uint64;
//     price: Int;
//     lpFundingFee: Int;
// }

// ============================ Premium Rate ================================ //
struct PremiumRateSampleRange {
    sampleLength: Int as uint64;
    samples: map<Int, PremiumRateSample>;
}

struct PremiumRateSampleRangeParam {
    sampleId: Int as uint64;
    sampleLength: Int as uint64;
    samples: map<Int, PremiumRateSample>;
}

struct PremiumRateSample {
    sampleX: Int;
    sampleY: Int;
}

struct PremiumRateSampleData {
    rangeId: Int as uint64;
    sampleId: Int as uint64;
    sampleX: Int;
    sampleY: Int;
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
