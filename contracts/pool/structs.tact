// ============================ Config ================================ //
struct AccountInfo {
    isExecutor: Bool;
    isCompensator: Bool;
    isClaimer: Bool;
}

struct ConfigData {
    orderLockTime: Int as uint32;
    lpMinExecutionFee: Int as coins;
    perpMinExecutionFee: Int as coins;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasForTransferJetton: Int as coins;
    gasForBurnTlp: Int as coins;
    gasForMintTlp: Int as coins;
    tlpWallet: Address;
    jettonWallet: Address;
    tlpJetton: Address;
    maxLpNetCap: Int as coins;
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

struct PoolStat {
    tlpSupply: Int as coins;
    totalExecutionFee: Int as coins;
    protocolTradingFee: Int as coins;
    globalLPFund: Int as int128;
    globalLPUnrealizedPnl: Int as int128;
    globalLpFundingFeeGrowth: Int as coins;
    globalRolloverFeeGrowth: Int as coins;
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
    entryFundingFeeGrowth: Int as int128 = 0;
    entryRolloverFeeGrowth: Int as int128 = 0;
}

struct GlobalLPPosition {
    netSize: Int as coins = 0;
    isLong: Bool = false;
    entryPrice: Int as uint128 = 0;
}

struct PerpPositionData {
    perpPositionIndexNext: Int as uint64;
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

// ============================ Config ================================ //

struct GasConfig {
    lpMinExecutionFee: Int as coins;
    perpMinExecutionFee: Int as coins;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasForTransferJetton: Int as coins;
    gasForBurnTlp: Int as coins;
    gasForMintTlp: Int as coins;
}

struct ExecutorConfig {
    executors: map<Address, Bool>;
    compensator: Address;
    claimer: Address;
}

struct ContractConfig {
    tlpJetton: Address;
    tlpWallet: Address;
    jettonWallet: Address;
}

// ============================ LP ================================ //
struct LiquidityOrder {
    isIncrease: Bool;
    account: Address;
    jettonDelta: Int as coins;
    executionFee: Int as coins;
    blockTime: Int as uint32;
    isPending: Bool;
}

struct LiquidityOrderData {
    liquidityOrderIndexNext: Int as uint64;
    liquidityOrder: LiquidityOrder?;
}

// ============================ Perp ================================ //
struct PerpOrder {
    opType: Int as uint8;
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    triggerPrice: Int as uint128;
    triggerAbove: Bool;
    executionFee: Int as coins;
    blockTime: Int as uint32;
    isPending: Bool;
}

struct PerpOrderEx {
    tpSize: Int as coins;
    tpPrice: Int as uint128;
    slSize: Int as coins;
    slPrice: Int as uint128;
    executionFee: Int as coins;
}

struct PerpOrderData {
    perpOrderIndexNext: Int as uint64;
    perpOrder: PerpOrder?;
    perpOrderEx: PerpOrderEx?;
}

// ============================ Compensate ================================ //
struct Compensate {
    orderType: Int? as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int as coins;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
    unlockTime: Int as uint32;
}

struct CompensateData {
    compensateIndexNext: Int as uint64;
    compensate: Compensate?;
}

