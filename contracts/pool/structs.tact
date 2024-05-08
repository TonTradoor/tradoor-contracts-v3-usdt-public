// ============================ Config ================================ //
struct ConfigData {
    isExecutor: Bool?;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    lpAddBonusFactor: Int;
    lpRemoveBonusFactor: Int;
    lpLiquidityFactor: Int;
    orderBook: Address;
    claimExecutor: Address;
    protocolTradingFee: Int;
}

struct ExecutorParam {
    executor: Address;
    enable: Bool;
}

struct TokenConfig {
    name: String;
    enable: Bool;
    // ==================== Trader Position Config ====================
    minValue: Int;
    maxValue: Int;
    maxLeverage: Int;
    liquidationFee: Int;
    maintenanceRate: Int;
    liquidityProportion: Int;
    // ==================== Trading Fee Config ====================
    tradingFeeRate: Int;
    lpTradingFeeRate: Int;
    // ==================== Funding Fee Config ====================
    interestRate: Int;
    maxFundingRate: Int;
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
    prevPremiumRate: Int?;
}

// ============================ Price ================================ //
struct UpdatePriceParam {
    tokenId: Int as uint64;
    price: Int;
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

struct UpdateFundingRateResult {
    lpReceivedFundingFeeDelta: Int;
    longFundingFeeGrowthAfter: Int;
    shortFundingFeeGrowthAfter: Int;
}

struct UpdateFundingRateEventData {
    trxId: Int;
    tokenId: Int;
    price: Int;
    lpReceivedFundingFeeDelta: Int;
    longFundingFeeGrowthAfter: Int;
    shortFundingFeeGrowthAfter: Int;
}