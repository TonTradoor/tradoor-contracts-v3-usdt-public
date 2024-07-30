# TACT Compilation Report
Contract: Pool
BOC Size: 9596 bytes

# Types
Total Types: 30

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## JettonMint
TLB: `jetton_mint#89b71d09 origin:address receiver:address amount:int257 custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonMint`
Signature: `JettonMint{origin:address,receiver:address,amount:int257,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## UpdateConfig
TLB: `update_config#3a5a5395 tlpJetton:address orderBook:address claimExecutor:address lpGasConsumption:coins perpGasConsumption:coins minTonsForStorage:coins gasForMintTlp:coins maxLpNetCap:coins lpRolloverFeeRate:uint32 = UpdateConfig`
Signature: `UpdateConfig{tlpJetton:address,orderBook:address,claimExecutor:address,lpGasConsumption:coins,perpGasConsumption:coins,minTonsForStorage:coins,gasForMintTlp:coins,maxLpNetCap:coins,lpRolloverFeeRate:uint32}`

## UpdateTokenConfig
TLB: `update_token_config#e6424c82 tokenId:uint16 config:TokenConfig{name:^string,enable:bool,minValue:coins,maxValue:coins,maxLeverage:uint16,liquidationFee:coins,maintenanceRate:uint32,tradingFeeRate:uint32,lpTradingFeeRate:uint32} = UpdateTokenConfig`
Signature: `UpdateTokenConfig{tokenId:uint16,config:TokenConfig{name:^string,enable:bool,minValue:coins,maxValue:coins,maxLeverage:uint16,liquidationFee:coins,maintenanceRate:uint32,tradingFeeRate:uint32,lpTradingFeeRate:uint32}}`

## ClaimProtocolFee
TLB: `claim_protocol_fee#feb2a766 trxId:uint64 feeReceiver:address = ClaimProtocolFee`
Signature: `ClaimProtocolFee{trxId:uint64,feeReceiver:address}`

## SendProtocolFee
TLB: `send_protocol_fee#5dd58461 trxId:uint64 feeReceiver:address amount:coins = SendProtocolFee`
Signature: `SendProtocolFee{trxId:uint64,feeReceiver:address,amount:coins}`

## UpdateLiquidityPool
TLB: `update_liquidity_pool#5523d11e isIncrease:bool orderId:uint64 account:address jettonDelta:coins trxId:uint64 prices:dict<uint16, uint128> lpFundingFeeGrowth:coins rolloverFeeGrowth:coins = UpdateLiquidityPool`
Signature: `UpdateLiquidityPool{isIncrease:bool,orderId:uint64,account:address,jettonDelta:coins,trxId:uint64,prices:dict<uint16, uint128>,lpFundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## LiquidityPoolUpdated
TLB: `liquidity_pool_updated#cd6336bc isIncrease:bool orderId:uint64 tlpPrice:uint128 tlpDelta:coins jettonDelta:coins trxId:uint64 = LiquidityPoolUpdated`
Signature: `LiquidityPoolUpdated{isIncrease:bool,orderId:uint64,tlpPrice:uint128,tlpDelta:coins,jettonDelta:coins,trxId:uint64}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 triggerAbove:bool trxId:uint64 price:uint128 premiumRate:uint32 fundingFeeGrowth:int128 rolloverFeeGrowth:int128 = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,trxId:uint64,price:uint128,premiumRate:uint32,fundingFeeGrowth:int128,rolloverFeeGrowth:int128}`

## PerpPositionUpdated
TLB: `perp_position_updated#ef01c2b4 orderId:uint64 payout:coins trxId:uint64 = PerpPositionUpdated`
Signature: `PerpPositionUpdated{orderId:uint64,payout:coins,trxId:uint64}`

## LiquidityIncreasedEvent
TLB: `liquidity_increased_event#b9b08d0d trxId:uint64 opType:uint8 account:address jettonDelta:coins tlpDelta:coins tlpPrice:uint128 tlpSupply:coins lpFundAfter:int128 entryLpFundingFeeGrowth:coins entryRolloverFeeGrowth:coins = LiquidityIncreasedEvent`
Signature: `LiquidityIncreasedEvent{trxId:uint64,opType:uint8,account:address,jettonDelta:coins,tlpDelta:coins,tlpPrice:uint128,tlpSupply:coins,lpFundAfter:int128,entryLpFundingFeeGrowth:coins,entryRolloverFeeGrowth:coins}`

## LiquidityDecreasedEvent
TLB: `liquidity_decreased_event#a15613d6 trxId:uint64 opType:uint8 account:address jettonDelta:coins tlpDelta:coins tlpPrice:uint128 tlpSupply:coins lpFundAfter:int128 entryLpFundingFeeGrowth:coins entryRolloverFeeGrowth:coins = LiquidityDecreasedEvent`
Signature: `LiquidityDecreasedEvent{trxId:uint64,opType:uint8,account:address,jettonDelta:coins,tlpDelta:coins,tlpPrice:uint128,tlpSupply:coins,lpFundAfter:int128,entryLpFundingFeeGrowth:coins,entryRolloverFeeGrowth:coins}`

## PerpPositionIncreasedEvent
TLB: `perp_position_increased_event#2f2c10e5 trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address tokenId:uint16 isLong:bool marginDelta:int128 marginAfter:coins sizeDelta:int128 sizeAfter:coins tradePrice:uint128 entryPrice:uint128 fundingFee:int128 rolloverFee:coins tradingFee:coins entryFundingFeeGrowthAfter:int128 entryRolloverFeeGrowthAfter:int128 globalLongMarginAfter:coins globalShortMarginAfter:coins globalLongSizeAfter:coins globalShortSizeAfter:coins lpNetSizeAfter:coins lpIsLong:bool lpEntryPriceAfter:uint128 lpFundAfter:int128 lpTradingFee:coins lpRealizedPnl:int128 = PerpPositionIncreasedEvent`
Signature: `PerpPositionIncreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,tokenId:uint16,isLong:bool,marginDelta:int128,marginAfter:coins,sizeDelta:int128,sizeAfter:coins,tradePrice:uint128,entryPrice:uint128,fundingFee:int128,rolloverFee:coins,tradingFee:coins,entryFundingFeeGrowthAfter:int128,entryRolloverFeeGrowthAfter:int128,globalLongMarginAfter:coins,globalShortMarginAfter:coins,globalLongSizeAfter:coins,globalShortSizeAfter:coins,lpNetSizeAfter:coins,lpIsLong:bool,lpEntryPriceAfter:uint128,lpFundAfter:int128,lpTradingFee:coins,lpRealizedPnl:int128}`

## PerpPositionDecreasedEvent
TLB: `perp_position_decreased_event#fd8c49cb trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address tokenId:uint16 isLong:bool marginDelta:int128 marginAfter:coins sizeDelta:int128 sizeAfter:coins tradePrice:uint128 entryPrice:uint128 realizedPnLDelta:int128 fundingFee:int128 rolloverFee:coins tradingFee:coins entryFundingFeeGrowthAfter:int128 entryRolloverFeeGrowthAfter:int128 payout:coins globalLongMarginAfter:coins globalShortMarginAfter:coins globalLongSizeAfter:coins globalShortSizeAfter:coins lpNetSizeAfter:coins lpIsLong:bool lpEntryPriceAfter:uint128 lpFundAfter:int128 lpTradingFee:coins lpRealizedPnl:int128 = PerpPositionDecreasedEvent`
Signature: `PerpPositionDecreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,tokenId:uint16,isLong:bool,marginDelta:int128,marginAfter:coins,sizeDelta:int128,sizeAfter:coins,tradePrice:uint128,entryPrice:uint128,realizedPnLDelta:int128,fundingFee:int128,rolloverFee:coins,tradingFee:coins,entryFundingFeeGrowthAfter:int128,entryRolloverFeeGrowthAfter:int128,payout:coins,globalLongMarginAfter:coins,globalShortMarginAfter:coins,globalLongSizeAfter:coins,globalShortSizeAfter:coins,lpNetSizeAfter:coins,lpIsLong:bool,lpEntryPriceAfter:uint128,lpFundAfter:int128,lpTradingFee:coins,lpRealizedPnl:int128}`

## ConfigData
TLB: `_ lpGasConsumption:coins perpGasConsumption:coins minTonsForStorage:coins gasForMintTlp:coins maxLpNetCap:coins tlpJetton:address orderBook:address claimExecutor:address = ConfigData`
Signature: `ConfigData{lpGasConsumption:coins,perpGasConsumption:coins,minTonsForStorage:coins,gasForMintTlp:coins,maxLpNetCap:coins,tlpJetton:address,orderBook:address,claimExecutor:address}`

## TokenConfig
TLB: `_ name:^string enable:bool minValue:coins maxValue:coins maxLeverage:uint16 liquidationFee:coins maintenanceRate:uint32 tradingFeeRate:uint32 lpTradingFeeRate:uint32 = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool,minValue:coins,maxValue:coins,maxLeverage:uint16,liquidationFee:coins,maintenanceRate:uint32,tradingFeeRate:uint32,lpTradingFeeRate:uint32}`

## GlobalPoolData
TLB: `_ tlpSupply:coins protocolTradingFee:coins globalLPFund:int128 globalLPUnrealizedPnl:int128 globalLpFundingFeeGrowth:coins globalRolloverFeeGrowth:coins globalPerpNetValue:coins globalPerpSingleValue:coins = GlobalPoolData`
Signature: `GlobalPoolData{tlpSupply:coins,protocolTradingFee:coins,globalLPFund:int128,globalLPUnrealizedPnl:int128,globalLpFundingFeeGrowth:coins,globalRolloverFeeGrowth:coins,globalPerpNetValue:coins,globalPerpSingleValue:coins}`

## AccountPerpPosition
TLB: `_ positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}}> = AccountPerpPosition`
Signature: `AccountPerpPosition{positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}}>}`

## DirectionPerpPosition
TLB: `_ longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128} shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128} = DirectionPerpPosition`
Signature: `DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}}`

## PerpPosition
TLB: `_ positionId:uint64 margin:coins size:coins entryPrice:uint128 entryFundingFeeGrowth:int128 entryRolloverFeeGrowth:int128 = PerpPosition`
Signature: `PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}`

## GlobalLPPosition
TLB: `_ netSize:coins isLong:bool entryPrice:uint128 = GlobalLPPosition`
Signature: `GlobalLPPosition{netSize:coins,isLong:bool,entryPrice:uint128}`

## PerpPositionData
TLB: `_ globalPerpNetValue:coins globalPerpSingleValue:coins perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}} globalLPPosition:Maybe GlobalLPPosition{netSize:coins,isLong:bool,entryPrice:uint128} globalPosition:Maybe GlobalPosition{longMargin:coins,shortMargin:coins,longSize:coins,shortSize:coins,longValue:coins,shortValue:coins} = PerpPositionData`
Signature: `PerpPositionData{globalPerpNetValue:coins,globalPerpSingleValue:coins,perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}},globalLPPosition:Maybe GlobalLPPosition{netSize:coins,isLong:bool,entryPrice:uint128},globalPosition:Maybe GlobalPosition{longMargin:coins,shortMargin:coins,longSize:coins,shortSize:coins,longValue:coins,shortValue:coins}}`

## GlobalPosition
TLB: `_ longMargin:coins shortMargin:coins longSize:coins shortSize:coins longValue:coins shortValue:coins = GlobalPosition`
Signature: `GlobalPosition{longMargin:coins,shortMargin:coins,longSize:coins,shortSize:coins,longValue:coins,shortValue:coins}`

# Get Methods
Total Get Methods: 6

## configData

## tokenConfig
Argument: tokenId

## priceData
Argument: tokenId

## globalPoolData

## perpPosition
Argument: tokenId
Argument: account

## owner

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
1644: not reach trigger price
5238: position not exist
9429: send gas not enough
17312: leverage too high
23245: greater than max value
23653: insufficient available jetton
27798: invalid token
28603: margin rate too high
31332: less than min value
36718: disabled token
40940: margin is too high to liquidate
41207: invalid sender
62409: insufficient margin