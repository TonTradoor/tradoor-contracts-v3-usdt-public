# TACT Compilation Report
Contract: Pool
BOC Size: 14952 bytes

# Types
Total Types: 44

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
TLB: `update_config#4317981e executor:Maybe address enableExecutor:Maybe bool gasConsumption:Maybe coins minTonsForStorage:Maybe coins lpBonusFactor:Maybe int257 lpLiquidityFactor:Maybe int257 orderBook:Maybe address = UpdateConfig`
Signature: `UpdateConfig{executor:Maybe address,enableExecutor:Maybe bool,gasConsumption:Maybe coins,minTonsForStorage:Maybe coins,lpBonusFactor:Maybe int257,lpLiquidityFactor:Maybe int257,orderBook:Maybe address}`

## UpdateTokenConfig
TLB: `update_token_config#69d44870 tokenId:uint64 name:Maybe ^string enable:Maybe bool minMargin:Maybe int257 maxLeverage:Maybe int257 liquidationFee:Maybe int257 tradingFeeRate:Maybe int257 lpTradingFeeRate:Maybe int257 interestRate:Maybe int257 maxFundingRate:Maybe int257 = UpdateTokenConfig`
Signature: `UpdateTokenConfig{tokenId:uint64,name:Maybe ^string,enable:Maybe bool,minMargin:Maybe int257,maxLeverage:Maybe int257,liquidationFee:Maybe int257,tradingFeeRate:Maybe int257,lpTradingFeeRate:Maybe int257,interestRate:Maybe int257,maxFundingRate:Maybe int257}`

## ClaimProtocolFee
TLB: `claim_protocol_fee#b58e3465 feeReceiver:address = ClaimProtocolFee`
Signature: `ClaimProtocolFee{feeReceiver:address}`

## UpdateLPPosition
TLB: `update_lp_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 pricesLength:uint64 prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}> = UpdateLPPosition`
Signature: `UpdateLPPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64,pricesLength:uint64,prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}>}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#1cf0cf81 orderId:uint64 receive:int257 trxId:uint64 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:uint64,receive:int257,trxId:uint64}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool trxId:uint64 pricesLength:uint64 prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}> = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,trxId:uint64,pricesLength:uint64,prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}>}`

## UpdatePerpPositionSuccess
TLB: `update_perp_position_success#ef01c2b4 orderId:uint64 receive:int257 trxId:uint64 = UpdatePerpPositionSuccess`
Signature: `UpdatePerpPositionSuccess{orderId:uint64,receive:int257,trxId:uint64}`

## UpdatePrice
TLB: `update_price#1dc8958c trxId:uint64 pricesLength:uint64 prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}> = UpdatePrice`
Signature: `UpdatePrice{trxId:uint64,pricesLength:uint64,prices:dict<int, ^UpdatePriceParam{tokenId:uint64,price:int257}>}`

## SetPremiumRateSampleRange
TLB: `set_premium_rate_sample_range#0176e0c9 sampleRangeLength:uint64 sampleRanges:dict<int, ^PremiumRateSampleRangeParam{sampleId:uint64,sampleLength:uint64,samples:dict<int, ^PremiumRateSample{deviationRate:int257,premiumRate:int257}>}> = SetPremiumRateSampleRange`
Signature: `SetPremiumRateSampleRange{sampleRangeLength:uint64,sampleRanges:dict<int, ^PremiumRateSampleRangeParam{sampleId:uint64,sampleLength:uint64,samples:dict<int, ^PremiumRateSample{deviationRate:int257,premiumRate:int257}>}>}`

## DeviationRate
TLB: `deviation_rate#2dd61a98 deviationRate:int257 = DeviationRate`
Signature: `DeviationRate{deviationRate:int257}`

## LPPositionIncreasedEvent
TLB: `lp_position_increased_event#1f8596cf opType:uint8 positionId:uint64 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 unlockTimeAfter:int257 realizedFundingFeeDelta:int257 realizedFundingFeeAfter:int257 entryFundingFeeGrowthAfter:int257 trxId:uint64 = LPPositionIncreasedEvent`
Signature: `LPPositionIncreasedEvent{opType:uint8,positionId:uint64,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,unlockTimeAfter:int257,realizedFundingFeeDelta:int257,realizedFundingFeeAfter:int257,entryFundingFeeGrowthAfter:int257,trxId:uint64}`

## LPPositionDecreasedEvent
TLB: `lp_position_decreased_event#054bc1b9 opType:uint8 positionId:uint64 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 fundingFeeDelta:int257 entryFundingFeeGrowthAfter:int257 receive:int257 trxId:uint64 = LPPositionDecreasedEvent`
Signature: `LPPositionDecreasedEvent{opType:uint8,positionId:uint64,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,fundingFeeDelta:int257,entryFundingFeeGrowthAfter:int257,receive:int257,trxId:uint64}`

## GlobalLPLiquidityChangedEvent
TLB: `global_lp_liquidity_changed_event#433d8d04 lpFundAfter:int257 liquidityAfter:int257 tradingFee:int257 realizedPnl:int257 trxId:uint64 = GlobalLPLiquidityChangedEvent`
Signature: `GlobalLPLiquidityChangedEvent{lpFundAfter:int257,liquidityAfter:int257,tradingFee:int257,realizedPnl:int257,trxId:uint64}`

## GlobalLPPositionChangedEvent
TLB: `global_lp_position_changed_event#f65a7093 tokenId:uint64 netSizeAfter:int257 isLong:bool entryPriceAfter:int257 trxId:uint64 = GlobalLPPositionChangedEvent`
Signature: `GlobalLPPositionChangedEvent{tokenId:uint64,netSizeAfter:int257,isLong:bool,entryPriceAfter:int257,trxId:uint64}`

## PerpPositionIncreasedEvent
TLB: `perp_position_increased_event#00e5476e opType:uint8 positionId:uint64 account:address tokenId:uint64 isLong:bool marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 entryPrice:int257 fundingFee:int257 tradingFee:int257 entryFundingFeeGrowthAfter:int257 trxId:uint64 = PerpPositionIncreasedEvent`
Signature: `PerpPositionIncreasedEvent{opType:uint8,positionId:uint64,account:address,tokenId:uint64,isLong:bool,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,entryPrice:int257,fundingFee:int257,tradingFee:int257,entryFundingFeeGrowthAfter:int257,trxId:uint64}`

## PerpPositionDecreasedEvent
TLB: `perp_position_decreased_event#9dfdb1a9 opType:uint8 positionId:uint64 account:address tokenId:uint64 isLong:bool marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 realizedPnLDelta:int257 fundingFee:int257 tradingFee:int257 entryFundingFeeGrowthAfter:int257 receive:int257 trxId:uint64 = PerpPositionDecreasedEvent`
Signature: `PerpPositionDecreasedEvent{opType:uint8,positionId:uint64,account:address,tokenId:uint64,isLong:bool,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,realizedPnLDelta:int257,fundingFee:int257,tradingFee:int257,entryFundingFeeGrowthAfter:int257,receive:int257,trxId:uint64}`

## GlobalPositionChangedEvent
TLB: `global_position_changed_event#82e5206c tokenId:uint64 longMarginAfter:int257 shortMarginAfter:int257 longSizeAfter:int257 shortSizeAfter:int257 longFundingFeeGrowthAfter:int257 shortFundingFeeGrowthAfter:int257 trxId:uint64 = GlobalPositionChangedEvent`
Signature: `GlobalPositionChangedEvent{tokenId:uint64,longMarginAfter:int257,shortMarginAfter:int257,longSizeAfter:int257,shortSizeAfter:int257,longFundingFeeGrowthAfter:int257,shortFundingFeeGrowthAfter:int257,trxId:uint64}`

## UpdatePriceEvent
TLB: `update_price_event#6271a1c7 tokenId:uint64 price:int257 lpFundingFee:int257 = UpdatePriceEvent`
Signature: `UpdatePriceEvent{tokenId:uint64,price:int257,lpFundingFee:int257}`

## PremiumRateChangedEvent
TLB: `premium_rate_changed_event#fc86b5fb tokenId:uint64 deviationRate:int257 premiumRate:int257 = PremiumRateChangedEvent`
Signature: `PremiumRateChangedEvent{tokenId:uint64,deviationRate:int257,premiumRate:int257}`

## ConfigData
TLB: `_ isExecutor:Maybe bool gasConsumption:coins minTonsForStorage:coins lpBonusFactor:int257 lpLiquidityFactor:int257 orderBook:address = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,gasConsumption:coins,minTonsForStorage:coins,lpBonusFactor:int257,lpLiquidityFactor:int257,orderBook:address}`

## TokenConfig
TLB: `_ name:^string enable:bool minMargin:int257 maxLeverage:int257 liquidationFee:int257 liquidityProportion:int257 tradingFeeRate:int257 lpTradingFeeRate:int257 interestRate:int257 maxFundingRate:int257 = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,liquidityProportion:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257}`

## TokenConfigData
TLB: `_ tokenIdNext:uint64 tokenConfig:Maybe TokenConfig{name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,liquidityProportion:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257} = TokenConfigData`
Signature: `TokenConfigData{tokenIdNext:uint64,tokenConfig:Maybe TokenConfig{name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,liquidityProportion:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257}}`

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
TLB: `_ globalPerpNetValue:int257 globalPerpSingleValue:int257 perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}} globalLPPosition:Maybe GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257,unrealizedPnl:int257} globalPosition:Maybe GlobalPosition{longMargin:int257,shortMargin:int257,longSize:int257,shortSize:int257,longFundingFeeGrowth:int257,shortFundingFeeGrowth:int257,longValue:int257,shortValue:int257} globalFundingRateSample:Maybe GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRate:int257} = PerpPositionData`
Signature: `PerpPositionData{globalPerpNetValue:int257,globalPerpSingleValue:int257,perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:uint64,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}},globalLPPosition:Maybe GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257,unrealizedPnl:int257},globalPosition:Maybe GlobalPosition{longMargin:int257,shortMargin:int257,longSize:int257,shortSize:int257,longFundingFeeGrowth:int257,shortFundingFeeGrowth:int257,longValue:int257,shortValue:int257},globalFundingRateSample:Maybe GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRate:int257}}`

## UpdatePriceParam
TLB: `_ tokenId:uint64 price:int257 = UpdatePriceParam`
Signature: `UpdatePriceParam{tokenId:uint64,price:int257}`

## PremiumRateSampleRange
TLB: `_ sampleLength:uint64 samples:dict<int, ^PremiumRateSample{deviationRate:int257,premiumRate:int257}> = PremiumRateSampleRange`
Signature: `PremiumRateSampleRange{sampleLength:uint64,samples:dict<int, ^PremiumRateSample{deviationRate:int257,premiumRate:int257}>}`

## PremiumRateSampleRangeParam
TLB: `_ sampleId:uint64 sampleLength:uint64 samples:dict<int, ^PremiumRateSample{deviationRate:int257,premiumRate:int257}> = PremiumRateSampleRangeParam`
Signature: `PremiumRateSampleRangeParam{sampleId:uint64,sampleLength:uint64,samples:dict<int, ^PremiumRateSample{deviationRate:int257,premiumRate:int257}>}`

## PremiumRateSample
TLB: `_ deviationRate:int257 premiumRate:int257 = PremiumRateSample`
Signature: `PremiumRateSample{deviationRate:int257,premiumRate:int257}`

## PremiumRateSampleData
TLB: `_ rangeId:uint64 sampleId:uint64 deviationRate:int257 premiumRate:int257 = PremiumRateSampleData`
Signature: `PremiumRateSampleData{rangeId:uint64,sampleId:uint64,deviationRate:int257,premiumRate:int257}`

## GlobalPosition
TLB: `_ longMargin:int257 shortMargin:int257 longSize:int257 shortSize:int257 longFundingFeeGrowth:int257 shortFundingFeeGrowth:int257 longValue:int257 shortValue:int257 = GlobalPosition`
Signature: `GlobalPosition{longMargin:int257,shortMargin:int257,longSize:int257,shortSize:int257,longFundingFeeGrowth:int257,shortFundingFeeGrowth:int257,longValue:int257,shortValue:int257}`

## GlobalFundingRateSample
TLB: `_ lastAdjustFundingRateTime:int257 sampleCount:int257 cumulativePremiumRate:int257 = GlobalFundingRateSample`
Signature: `GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRate:int257}`

# Get Methods
Total Get Methods: 5

## configData
Argument: executor

## tokenConfig
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
4996: none available price
5238: position not exist
9429: send gas not enough
18995: margin rate too low
23314: insufficient liquidity for single value
27798: invalid token
28603: margin rate too high
31425: not reach unlock time
36718: disabled token
39251: insufficient global LP
41207: invalid sender
42634: legerage too high
54040: insufficient global net LP
55429: not reach liquidate price
55754: insufficient liquidity for net value
59588: token config not exist
62409: insufficient margin