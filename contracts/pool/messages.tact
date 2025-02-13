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

message JettonMint {
    origin: Address;        // address of origin mint request (may be wallet v4)
    receiver: Address;      // address of receiver
    amount: Int;            // amount of jettons to mint
    custom_payload: Cell?;  // optional custom data
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message JettonUpdateContent {
    jetton_content: Cell;
}

// ============================ Config ================================ //
message UpdatePoolConfig{
    orderLockTime: Int as uint32;
    maxLpNetCap: Int as coins;
    lpRolloverFeeRate: Int as uint32;
    liquidatedPositionShareRate: Int as uint32;
    normalPositionShareRate: Int as uint32;
}

message UpdateConfig {
    gasConfig: GasConfig?;
    executorConfig: ExecutorConfig?;
    contractConfig: ContractConfig?;
}

message ListToken {
    tokenId: Int as uint16;
    config: TokenConfig;
}

message DelistToken {
    tokenId: Int as uint16;
}

message ClaimProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
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
    premiumRate: Int as int32;
    fundingFeeGrowth: Int as int128;
    rolloverFeeGrowth: Int as int128;
}

message LiquidatePerpPosition {
    liquidationFeeReceiver: Address?;
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    trxId: Int as uint64;
    price: Int as uint128;
    premiumRate: Int as int32;
    fundingFeeGrowth: Int as int128;
    rolloverFeeGrowth: Int as int128;
}

message ADLPerpPosition {
    tokenId: Int as uint16;
    account: Address;
    isLong: Bool;
    marginDelta: Int as coins;
    sizeDelta: Int as coins;
    trxId: Int as uint64;
    price: Int as uint128;
    premiumRate: Int as int32;
    fundingFeeGrowth: Int as int128;
    rolloverFeeGrowth: Int as int128;
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
