# TACT Compilation Report
Contract: Pool
BOC Size: 14602 bytes

# Types
Total Types: 37

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

## UpdateConfig
TLB: `update_config#4a9f2f80 executorLength:int257 executors:dict<int, ^ExecutorParam{executor:address,enable:bool}> claimExecutor:address lpGasConsumption:coins perpGasConsumption:coins minTonsForStorage:coins lpLockTime:int257 lpAddBonusFactor:int257 lpRemoveBonusFactor:int257 lpLiquidityFactor:int257 orderBook:address = UpdateConfig`
Signature: `UpdateConfig{executorLength:int257,executors:dict<int, ^ExecutorParam{executor:address,enable:bool}>,claimExecutor:address,lpGasConsumption:coins,perpGasConsumption:coins,minTonsForStorage:coins,lpLockTime:int257,lpAddBonusFactor:int257,lpRemoveBonusFactor:int257,lpLiquidityFactor:int257,orderBook:address}`

## UpdateTokenConfig
TLB: `update_token_config#cb2ee6a2 tokenId:uint64 name:^string enable:bool minValue:int257 maxValue:int257 maxLeverage:int257 liquidationFee:int257 maintenanceRate:int257 tradingFeeRate:int257 lpTradingFeeRate:int257 interestRate:int257 maxFundingRate:int257 liquidityProportion:int257 = UpdateTokenConfig`
Signature: `UpdateTokenConfig{tokenId:uint64,name:^string,enable:bool,minValue:int257,maxValue:int257,maxLeverage:int257,liquidationFee:int257,maintenanceRate:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257,liquidityProportion:int257}`

## ClaimProtocolFee
TLB: `claim_protocol_fee#feb2a766 trxId:uint64 feeReceiver:address = ClaimProtocolFee`
Signature: `ClaimProtocolFee{trxId:uint64,feeReceiver:address}`

## SendProtocolFee
TLB: `send_protocol_fee#5dd58461 trxId:uint64 feeReceiver:address amount:int257 = SendProtocolFee`
Signature: `SendProtocolFee{trxId:uint64,feeReceiver:address,amount:int257}`

## UpdateLPPosition
TLB: `update_lp_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 = UpdateLPPosition`
Signature: `UpdateLPPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#1cf0cf81 orderId:uint64 receive:int257 trxId:uint64 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:uint64,receive:int257,trxId:uint64}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool trxId:uint64 price:int257 premiumRate:int257 = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,trxId:uint64,price:int257,premiumRate:int257}`

## UpdatePerpPositionSuccess
TLB: `update_perp_position_success#ef01c2b4 orderId:uint64 receive:int257 trxId:uint64 = UpdatePerpPositionSuccess`
Signature: `UpdatePerpPositionSuccess{orderId:uint64,receive:int257,trxId:uint64}`

## UpdatePrice
TLB: `update_price#1dc8958c trxId:uint64 pricesLength:uint64 prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}> = UpdatePrice`
Signature: `UpdatePrice{trxId:uint64,pricesLength:uint64,prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}>}`

## LPPositionIncreasedEvent
TLB: `lp_position_increased_event#339ed2e7 trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 unlockTimeAfter:int257 realizedFundingFeeDelta:int257 realizedFundingFeeAfter:int257 entryFundingFeeGrowthAfter:int257 lpFundAfter:int257 lpLiquidityAfter:int257 = LPPositionIncreasedEvent`
Signature: `LPPositionIncreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,unlockTimeAfter:int257,realizedFundingFeeDelta:int257,realizedFundingFeeAfter:int257,entryFundingFeeGrowthAfter:int257,lpFundAfter:int257,lpLiquidityAfter:int257}`

## LPPositionDecreasedEvent
TLB: `lp_position_decreased_event#f9eaa610 trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 fundingFeeDelta:int257 entryFundingFeeGrowthAfter:int257 receive:int257 lpFundAfter:int257 lpLiquidityAfter:int257 = LPPositionDecreasedEvent`
Signature: `LPPositionDecreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,fundingFeeDelta:int257,entryFundingFeeGrowthAfter:int257,receive:int257,lpFundAfter:int257,lpLiquidityAfter:int257}`

## PerpPositionIncreasedEvent
TLB: `perp_position_increased_event#df887817 trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address tokenId:uint64 isLong:bool marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 entryPrice:int257 fundingFee:int257 tradingFee:int257 entryFundingFeeGrowthAfter:int257 globalLongMarginAfter:int257 globalShortMarginAfter:int257 globalLongSizeAfter:int257 globalShortSizeAfter:int257 globalLongFundingFeeGrowthAfter:int257 globalShortFundingFeeGrowthAfter:int257 globalLPFundingFeeGrowthAfter:int257 lpNetSizeAfter:int257 lpIsLong:bool lpEntryPriceAfter:int257 lpFundAfter:int257 lpLiquidityAfter:int257 lpTradingFee:int257 lpRealizedPnl:int257 lpReceivedFundingFee:int257 = PerpPositionIncreasedEvent`
Signature: `PerpPositionIncreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,tokenId:uint64,isLong:bool,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,entryPrice:int257,fundingFee:int257,tradingFee:int257,entryFundingFeeGrowthAfter:int257,globalLongMarginAfter:int257,globalShortMarginAfter:int257,globalLongSizeAfter:int257,globalShortSizeAfter:int257,globalLongFundingFeeGrowthAfter:int257,globalShortFundingFeeGrowthAfter:int257,globalLPFundingFeeGrowthAfter:int257,lpNetSizeAfter:int257,lpIsLong:bool,lpEntryPriceAfter:int257,lpFundAfter:int257,lpLiquidityAfter:int257,lpTradingFee:int257,lpRealizedPnl:int257,lpReceivedFundingFee:int257}`

## PerpPositionDecreasedEvent
TLB: `perp_position_decreased_event#a4a3c27f trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address tokenId:uint64 isLong:bool marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 entryPrice:int257 realizedPnLDelta:int257 fundingFee:int257 tradingFee:int257 entryFundingFeeGrowthAfter:int257 receive:int257 globalLongMarginAfter:int257 globalShortMarginAfter:int257 globalLongSizeAfter:int257 globalShortSizeAfter:int257 globalLongFundingFeeGrowthAfter:int257 globalShortFundingFeeGrowthAfter:int257 globalLPFundingFeeGrowthAfter:int257 lpNetSizeAfter:int257 lpIsLong:bool lpEntryPriceAfter:int257 lpFundAfter:int257 lpLiquidityAfter:int257 lpTradingFee:int257 lpRealizedPnl:int257 lpReceivedFundingFee:int257 = PerpPositionDecreasedEvent`
Signature: `PerpPositionDecreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,tokenId:uint64,isLong:bool,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,entryPrice:int257,realizedPnLDelta:int257,fundingFee:int257,tradingFee:int257,entryFundingFeeGrowthAfter:int257,receive:int257,globalLongMarginAfter:int257,globalShortMarginAfter:int257,globalLongSizeAfter:int257,globalShortSizeAfter:int257,globalLongFundingFeeGrowthAfter:int257,globalShortFundingFeeGrowthAfter:int257,globalLPFundingFeeGrowthAfter:int257,lpNetSizeAfter:int257,lpIsLong:bool,lpEntryPriceAfter:int257,lpFundAfter:int257,lpLiquidityAfter:int257,lpTradingFee:int257,lpRealizedPnl:int257,lpReceivedFundingFee:int257}`

## UpdateFundingFeeEvent
TLB: `update_funding_fee_event#9a9ef506 length:int257 datas:dict<int, ^UpdateFundingRateEventData{trxId:int257,tokenId:int257,price:int257,lpReceivedFundingFeeDelta:int257,globalLPFundingFeeGrowth:int257,longFundingFeeGrowthAfter:int257,shortFundingFeeGrowthAfter:int257}> = UpdateFundingFeeEvent`
Signature: `UpdateFundingFeeEvent{length:int257,datas:dict<int, ^UpdateFundingRateEventData{trxId:int257,tokenId:int257,price:int257,lpReceivedFundingFeeDelta:int257,globalLPFundingFeeGrowth:int257,longFundingFeeGrowthAfter:int257,shortFundingFeeGrowthAfter:int257}>}`

## ConfigData
TLB: `_ isExecutor:Maybe bool lpGasConsumption:coins perpGasConsumption:coins minTonsForStorage:coins lpAddBonusFactor:int257 lpRemoveBonusFactor:int257 lpLiquidityFactor:int257 orderBook:address claimExecutor:address protocolTradingFee:int257 = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,lpGasConsumption:coins,perpGasConsumption:coins,minTonsForStorage:coins,lpAddBonusFactor:int257,lpRemoveBonusFactor:int257,lpLiquidityFactor:int257,orderBook:address,claimExecutor:address,protocolTradingFee:int257}`

## ExecutorParam
TLB: `_ executor:address enable:bool = ExecutorParam`
Signature: `ExecutorParam{executor:address,enable:bool}`

## TokenConfig
TLB: `_ name:^string enable:bool minValue:int257 maxValue:int257 maxLeverage:int257 liquidationFee:int257 maintenanceRate:int257 liquidityProportion:int257 tradingFeeRate:int257 lpTradingFeeRate:int257 interestRate:int257 maxFundingRate:int257 = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool,minValue:int257,maxValue:int257,maxLeverage:int257,liquidationFee:int257,maintenanceRate:int257,liquidityProportion:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257}`

## LPPosition
TLB: `_ positionId:uint64 liquidity:int257 bonus:int257 realizedFundingFee:int257 entryFundingFeeGrowth:int257 unlockTime:int257 = LPPosition`
Signature: `LPPosition{positionId:uint64,liquidity:int257,bonus:int257,realizedFundingFee:int257,entryFundingFeeGrowth:int257,unlockTime:int257}`

## LPPositionData
TLB: `_ lpPosition:Maybe LPPosition{positionId:uint64,liquidity:int257,bonus:int257,realizedFundingFee:int257,entryFundingFeeGrowth:int257,unlockTime:int257} globalLPFund:int257 globalLPLiquidity:int257 globalLPFundingFeeGrowth:int257 globalLPUnrealizedPnl:int257 = LPPositionData`
Signature: `LPPositionData{lpPosition:Maybe LPPosition{positionId:uint64,liquidity:int257,bonus:int257,realizedFundingFee:int257,entryFundingFeeGrowth:int257,unlockTime:int257},globalLPFund:int257,globalLPLiquidity:int257,globalLPFundingFeeGrowth:int257,globalLPUnrealizedPnl:int257}`

## AccountPerpPosition
TLB: `_ positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}> = AccountPerpPosition`
Signature: `AccountPerpPosition{positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}>}`

## DirectionPerpPosition
TLB: `_ longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257} shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257} = DirectionPerpPosition`
Signature: `DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}`

## PerpPosition
TLB: `_ positionId:uint64 margin:int257 size:int257 entryPrice:int257 entryFundingFeeGrowth:int257 = PerpPosition`
Signature: `PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}`

## GlobalLPPosition
TLB: `_ netSize:int257 isLong:bool entryPrice:int257 unrealizedPnl:int257 = GlobalLPPosition`
Signature: `GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257,unrealizedPnl:int257}`

## PerpPositionData
TLB: `_ globalPerpNetValue:int257 globalPerpSingleValue:int257 perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}} globalLPPosition:Maybe GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257,unrealizedPnl:int257} globalPosition:Maybe GlobalPosition{longMargin:int257,shortMargin:int257,longSize:int257,shortSize:int257,longFundingFeeGrowth:int257,shortFundingFeeGrowth:int257,longValue:int257,shortValue:int257} globalFundingRateSample:Maybe GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRate:int257} prevPremiumRate:Maybe int257 = PerpPositionData`
Signature: `PerpPositionData{globalPerpNetValue:int257,globalPerpSingleValue:int257,perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}},globalLPPosition:Maybe GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257,unrealizedPnl:int257},globalPosition:Maybe GlobalPosition{longMargin:int257,shortMargin:int257,longSize:int257,shortSize:int257,longFundingFeeGrowth:int257,shortFundingFeeGrowth:int257,longValue:int257,shortValue:int257},globalFundingRateSample:Maybe GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRate:int257},prevPremiumRate:Maybe int257}`

## UpdatePriceParam
TLB: `_ tokenId:uint64 price:int257 = UpdatePriceParam`
Signature: `UpdatePriceParam{tokenId:uint64,price:int257}`

## GlobalPosition
TLB: `_ longMargin:int257 shortMargin:int257 longSize:int257 shortSize:int257 longFundingFeeGrowth:int257 shortFundingFeeGrowth:int257 longValue:int257 shortValue:int257 = GlobalPosition`
Signature: `GlobalPosition{longMargin:int257,shortMargin:int257,longSize:int257,shortSize:int257,longFundingFeeGrowth:int257,shortFundingFeeGrowth:int257,longValue:int257,shortValue:int257}`

## GlobalFundingRateSample
TLB: `_ lastAdjustFundingRateTime:int257 sampleCount:int257 cumulativePremiumRate:int257 = GlobalFundingRateSample`
Signature: `GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRate:int257}`

## UpdateFundingRateResult
TLB: `_ lpReceivedFundingFeeDelta:int257 globalLPFundingFeeGrowth:int257 longFundingFeeGrowthAfter:int257 shortFundingFeeGrowthAfter:int257 = UpdateFundingRateResult`
Signature: `UpdateFundingRateResult{lpReceivedFundingFeeDelta:int257,globalLPFundingFeeGrowth:int257,longFundingFeeGrowthAfter:int257,shortFundingFeeGrowthAfter:int257}`

## UpdateFundingRateEventData
TLB: `_ trxId:int257 tokenId:int257 price:int257 lpReceivedFundingFeeDelta:int257 globalLPFundingFeeGrowth:int257 longFundingFeeGrowthAfter:int257 shortFundingFeeGrowthAfter:int257 = UpdateFundingRateEventData`
Signature: `UpdateFundingRateEventData{trxId:int257,tokenId:int257,price:int257,lpReceivedFundingFeeDelta:int257,globalLPFundingFeeGrowth:int257,longFundingFeeGrowthAfter:int257,shortFundingFeeGrowthAfter:int257}`

# Get Methods
Total Get Methods: 6

## configData
Argument: executor

## tokenConfig
Argument: tokenId

## priceData
Argument: tokenId

## lpPosition
Argument: account

## perpPosition
Argument: tokenId
Argument: account

## owner

# Error Codes
2: Stack undeflow
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
18995: margin rate too low
19114: invalid premium rate
23245: greater than max value
23314: insufficient liquidity for single value
27798: invalid token
28603: margin rate too high
31332: less than min value
31425: not reach unlock time
36718: disabled token
39251: insufficient global LP
41207: invalid sender
54040: insufficient global net LP
55754: insufficient liquidity for net value
59588: token config not exist
62409: insufficient margin