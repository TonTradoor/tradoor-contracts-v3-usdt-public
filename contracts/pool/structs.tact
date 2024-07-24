// ============================ Config ================================ //
struct ConfigData {
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasForMintTlp: Int as coins;
    maxLpNetCap: Int as coins;
    tlpJetton: Address;
    orderBook: Address;
    claimExecutor: Address;
}

struct TokenConfig {
    name: String;
    enable: Bool;
    // ==================== Trader Position Config ====================
    minValue: Int as coins;
    maxValue: Int as coins;
    maxLeverage: Int as uint16;
    liquidationFee: Int as coins;
    maintenanceRate: Int as uint32;
    // ==================== Trading Fee Config ====================
    tradingFeeRate: Int as uint32;
    lpTradingFeeRate: Int as uint32;
}

// ============================ LP ================================ //

struct GlobalPoolData {
    tlpSupply: Int as coins;
    protocolTradingFee: Int as coins;
    globalLPFund: Int as int128;
    globalLPUnrealizedPnl: Int as int128;
    globalLpFundingFeeGrowth: Int as coins;
    globalRolloverFeeGrowth: Int as coins;
    globalPerpNetValue: Int as coins;
    globalPerpSingleValue: Int as coins;
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
    positionId: Int as uint64 = 0;
    margin: Int as coins = 0;
    size: Int as coins = 0;
    entryPrice: Int as uint128 = 0;
    entryFundingFeeGrowth: Int as coins = 0;
    entryRolloverFeeGrowth: Int as coins = 0;
}

struct GlobalLPPosition {
    netSize: Int as coins = 0;
    isLong: Bool = false;
    entryPrice: Int as uint128 = 0;
}

struct PerpPositionData {
    globalPerpNetValue: Int as coins;
    globalPerpSingleValue: Int as coins;
    perpPosition: DirectionPerpPosition?;
    globalLPPosition: GlobalLPPosition?;
    globalPosition: GlobalPosition?;
}

struct GlobalPosition {
    longMargin: Int as coins = 0;
    shortMargin: Int as coins = 0;
    longSize: Int as coins = 0;
    shortSize: Int as coins = 0;
    longValue: Int as coins = 0;
    shortValue: Int as coins = 0;
}

