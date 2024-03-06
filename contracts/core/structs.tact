// ============================ RBF ================================ //
struct TokenInfo {
    name: String;
    enable: Bool;
}

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
    bonus: Int;
    unlockTime: Int;
}

struct GlobalRBFPosition {
    riskBufferFund: Int;
    liquidity: Int;
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

// funding rate //

struct PriceVertex {
    size: Int;
    premiumRateX96: Int;
}

struct PriceState {
    // uint128 maxPriceImpactLiquidity;
    maxPriceImpactLiquidity: Int;
    // uint128 premiumRateX96;
    premiumRateX96: Int;
    // PriceVertex[7] priceVertices;
    priceVertices: map<Int, PriceVertex>;
    // uint8 pendingVertexIndex;
    pendingVertexIndex: Int;
    // uint8 liquidationVertexIndex;
    liquidationVertexIndex: Int;
    // uint8 currentVertexIndex;
    currentVertexIndex: Int;
    // uint128[7] liquidationBufferNetSizes;
    liquidationBufferNetSizes: map<Int, Int>;
}

struct GlobalLiquidityPosition {
    netSize: Int;
    liquidationBufferNetSize: Int;
    entryPriceX96: Int;
    side: Bool;
    liquidity: Int;
    realizedProfitGrowthX64: Int;
}

struct GlobalFundingRateSample {
    lastAdjustFundingRateTime: Int;
    sampleCount: Int;
    cumulativePremiumRateX96: Int;
}

struct PreviousGlobalFundingRate {
    longFundingRateGrowthX96: Int;
    shortFundingRateGrowthX96: Int;
}

struct FundingRateGrowthX96 {
    clampedFundingRateDeltaX96: Int;
    longFundingRateGrowthAfterX96: Int;
    shortFundingRateGrowthAfterX96: Int;
}