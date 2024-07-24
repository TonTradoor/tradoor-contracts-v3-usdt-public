// ============================ Config ================================ //

struct GasConfig {
    lpMinExecutionFee: Int as coins;
    perpMinExecutionFee: Int as coins;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    poolLpGasConsumption: Int as coins;
    poolPerpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasTransferJetton: Int as coins;
    gasForBurnTlp: Int as coins;
}

struct ExecutorConfig {
    executors: map<Address, Bool>;
    lpExecutors: map<Address, Bool>;
    compensator: Address;
}

struct ContractConfig {
    tlpWallet: Address;
    jettonWallet: Address;
    pool: Address;
}

struct ConfigData {
    isExecutor: Bool?;
    orderLockTime: Int as uint32;
    lpMinExecutionFee: Int as coins;
    perpMinExecutionFee: Int as coins;
    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    poolLpGasConsumption: Int as coins;
    poolPerpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasTransferJetton: Int as coins;
    gasForBurnTlp: Int as coins;
    totalExecutionFee: Int as coins;
    tlpWallet: Address;
    jettonWallet: Address;
    pool: Address;
}

// ============================ LP ================================ //
struct LiquidityOrder {
    isIncrease: Bool;
    account: Address;
    jettonDelta: Int as coins;
    executionFee: Int as coins;
    blockTime: Int as uint32;
    isPending: Bool;
    executionFeeReceiver: Address;
    lastOperator: Address?;
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
    executionFeeReceiver: Address;
    lastOperator: Address?;
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
