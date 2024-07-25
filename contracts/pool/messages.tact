import "./structs";

// ============================ jetton ================================ //
message JettonMint {
    origin: Address;        // address of origin mint request (may be wallet v4)
    receiver: Address;      // address of receiver
    amount: Int;            // amount of jettons to mint
    custom_payload: Cell?;  // optional custom data
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}
// ============================ admin ================================ //
message UpdateConfig {
    tlpJetton: Address;
    orderBook: Address;
    claimExecutor: Address;

    lpGasConsumption: Int as coins;
    perpGasConsumption: Int as coins;
    minTonsForStorage: Int as coins;
    gasForMintTlp: Int as coins;

    maxLpNetCap: Int as coins;
    lpRolloverFeeRate: Int as uint32;
}

message UpdateTokenConfig {
    tokenId: Int as uint16;
    config: TokenConfig;
}

message ClaimProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
}

message(0x5dd58461) SendProtocolFee {
    trxId: Int as uint64;
    feeReceiver: Address;
    amount: Int as coins;
}

// ============================ LP ================================ //

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

// ============================ Perp ================================ //
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
    premiumRate: Int as uint32;
    fundingFeeGrowth: Int as coins;
    rolloverFeeGrowth: Int as coins;
}

message(0xef01c2b4) PerpPositionUpdated {
    orderId: Int as uint64;
    payout: Int as coins;
    trxId: Int as uint64;
}