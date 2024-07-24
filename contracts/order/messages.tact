import "./structs";
// ============================ Jetton ================================ //

message(0x0f8a7ea5) JettonTransfer {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    destination: Address;                   // address of the new owner of the jettons
    response_destination: Address?;          // address where to send a response with confirmation of a successful transfer and the rest of the incoming message Toncoins.
    custom_payload: Cell?;                  // optional custom payload
    forward_ton_amount: Int as coins;       // the amount of nanotons to be sent to the destination address.
    forward_payload: Slice as remaining;    // optional custom data that should be sent to the destination address.
}

message(0x7362d09c) JettonTransferNotification {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    sender: Address;                        // address of the sender of the jettons
    forward_payload: Slice as remaining;    // optional custom payload
}

message(0x595f07bc) JettonBurn {
    query_id: Int as uint64;        // arbitrary request number
    amount: Int as coins;           // amount of jettons to burn
    response_destination: Address;  // address where to send a response with confirmation of a successful burn and the rest of the incoming message coins.
    custom_payload: Cell?;          // optional custom payload
}

// ============================ admin ================================ //
message DeployTLP {
    jetton_content: Cell;
}

message UpdateConfig {
    orderLockTime: Int? as uint32;
    gasConfig: GasConfig?;
    executorConfig: ExecutorConfig?;
    contractConfig: ContractConfig?;
}

message(0x5dd58461) SendProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
    amount: Int as coins;
}

// ============================ LP ================================ //

message CancelLiquidityOrder {
    orderId: Int as uint64;
    trxId: Int as uint64;
    executionFeeReceiver: Address?;
}

message ExecuteLiquidityOrder {
    orderId: Int as uint64;
    trxId: Int as uint64;
    executionFeeReceiver: Address?;
    prices: map<Int as uint16, Int as uint128>;
    lpFundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message UpdateLiquidityPool {
    isIncrease: Bool;
    orderId: Int as uint64;
    account: Address;
    jettonDelta: Int as coins;
    trxId: Int as uint64;
    prices: map<Int as uint16, Int as uint128>;
    lpFundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message LiquidityPoolUpdated {
    isIncrease: Bool;
    orderId: Int as uint64;
    tlpPrice: Int as uint128;
    tlpDelta: Int as coins;
    jettonDelta: Int as coins;
    trxId: Int as uint64;
}


// ============================ Compensate ================================ //
message CreateCompensate {
    orderType: Int? as uint8;
    orderId: Int as uint64;
    trxId: Int as uint64;
    refundReceiver: Address?;
    refundAmount: Int as coins;
    executionFeeReceiver: Address?;
    executionFee: Int as coins;
}

message ExecuteOrCancelCompensate {
    isCancel: Bool;
    compensateId: Int as uint64;
    trxId: Int as uint64;
}

// ============================ Perp ================================ //
message CreateDecreasePerpOrder {
    executionFee: Int as coins;
    tokenId: Int as uint16;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    triggerPrice: Int as uint128;
    trxId: Int as uint64;
    requestTime: Int as uint32;
}

message CreateTpSlPerpOrder {
    executionFee: Int as coins;
    tokenId: Int as uint16;
    isLong: Bool;
    tpSize: Int as coins;
    tpPrice: Int as uint128;
    slSize: Int as coins;
    slPrice: Int as uint128;
    trxId: Int as uint64;
    requestTime: Int as uint32;
}

message CancelPerpOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int as uint64;
}

message ExecutePerpOrder {
    executionFeeReceiver: Address?;
    orderId: Int as uint64;
    trxId: Int as uint64;
    tokenId: Int as uint16;
    price: Int as uint128;
    fundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message LiquidatePerpPosition {
    liquidationFeeReceiver: Address?;
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    trxId: Int as uint64;
    price: Int as uint128;
    fundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message ADLPerpPosition {
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    trxId: Int as uint64;
    price: Int as uint128;
    fundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message(0xff57e557) UpdatePerpPosition {
    orderId: Int as uint64;
    opType: Int as uint8;
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    triggerPrice: Int as uint128;
    triggerAbove: Bool;
    trxId: Int as uint64;
    price: Int as uint128;
    fundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message(0xef01c2b4) PerpPositionUpdated {
    orderId: Int as uint64;
    payout: Int as coins;
    trxId: Int as uint64;
}
