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

struct GlobalLPPosition {
    netSize: Int;
    isLong: Bool;
    entryPrice: Int;
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

// funding rate //

// struct PriceVertex {
//     size: Int;
//     premiumRateX96: Int;
// }

// struct PriceState {
//     // uint128 maxPriceImpactLiquidity;
//     maxPriceImpactLiquidity: Int;
//     // uint128 premiumRateX96;
//     premiumRateX96: Int;
//     // PriceVertex[7] priceVertices;
//     priceVertices: map<Int, PriceVertex>;
//     // uint8 pendingVertexIndex;
//     pendingVertexIndex: Int;
//     // uint8 liquidationVertexIndex;
//     liquidationVertexIndex: Int;
//     // uint8 currentVertexIndex;
//     currentVertexIndex: Int;
//     // uint128[7] liquidationBufferNetSizes;
//     liquidationBufferNetSizes: map<Int, Int>;
// }

// struct GlobalRiskBufferFund {
//     riskBufferFund: Int;
//     liquidity: Int;
// }

// struct GlobalPosition {
//     longSize: Int;
//     shortSize: Int;
//     longFundingRateGrowthX96: Int;
//     shortFundingRateGrowthX96: Int;
// }

// struct GlobalLiquidityPosition {
//     netSize: Int;
//     liquidationBufferNetSize: Int;
//     entryPriceX96: Int;
//     side: Bool;
//     liquidity: Int;
//     realizedProfitGrowthX64: Int;
// }

// struct GlobalFundingRateSample {
//     lastAdjustFundingRateTime: Int;
//     sampleCount: Int;
//     cumulativePremiumRateX96: Int;
// }

// struct PreviousGlobalFundingRate {
//     longFundingRateGrowthX96: Int;
//     shortFundingRateGrowthX96: Int;
// }

// struct FundingRateGrowthX96 {
//     clampedFundingRateDeltaX96: Int;
//     longFundingRateGrowthAfterX96: Int;
//     shortFundingRateGrowthAfterX96: Int;
// }

// struct SamplePremiumRateResult {
//     sample: GlobalFundingRateSample;
//     shouldAdjustFundingRate: Bool;
//     fundingRateDeltaX96: Int;
// }

// ============================ Price ================================ //
struct PriceData {
    price: Int;
}

struct UpdatePrice {
    tokenId: Int;
    price: Int;
}
