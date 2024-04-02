# TACT Compilation Report
Contract: Pool
BOC Size: 9998 bytes

# Types
Total Types: 35

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
TLB: `update_config#91a2e10a gasConsumption:int257 minTonsForStorage:int257 lpLockTime:int257 bonusFactor:int257 orderBook:address = UpdateConfig`
Signature: `UpdateConfig{gasConsumption:int257,minTonsForStorage:int257,lpLockTime:int257,bonusFactor:int257,orderBook:address}`

## UpdateTokenConfig
TLB: `update_token_config#92eaeafd tokenId:int257 name:^string enable:bool minMargin:int257 maxLeverage:int257 liquidationFee:int257 tradingFeeRate:int257 lpTradingFeeRate:int257 interestRate:int257 maxFundingRate:int257 = UpdateTokenConfig`
Signature: `UpdateTokenConfig{tokenId:int257,name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257}`

## UpdateLPPosition
TLB: `update_lp_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdateLPPosition`
Signature: `UpdateLPPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#1cf0cf81 orderId:int257 receive:int257 trxId:uint64 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:int257 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:int257,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdatePerpPositionSuccess
TLB: `update_perp_position_success#ef01c2b4 orderId:int257 receive:int257 trxId:uint64 = UpdatePerpPositionSuccess`
Signature: `UpdatePerpPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## LPPositionIncreasedEvent
TLB: `lp_position_increased_event#d07dde06 positionId:int257 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 unlockTimeAfter:int257 realizedFundingFee:int257 realizedFundingFeeAfter:int257 trxId:int257 = LPPositionIncreasedEvent`
Signature: `LPPositionIncreasedEvent{positionId:int257,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,unlockTimeAfter:int257,realizedFundingFee:int257,realizedFundingFeeAfter:int257,trxId:int257}`

## LPPositionDecreasedEvent
TLB: `lp_position_decreased_event#d2393e17 positionId:int257 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 fundingFeeDelta:int257 receive:int257 trxId:int257 = LPPositionDecreasedEvent`
Signature: `LPPositionDecreasedEvent{positionId:int257,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,fundingFeeDelta:int257,receive:int257,trxId:int257}`

## GlobalLPChangedEvent
TLB: `global_lp_changed_event#3f230825 lpFundAfter:int257 liquidityAfter:int257 tradingFee:int257 fundingFee:int257 trxId:int257 = GlobalLPChangedEvent`
Signature: `GlobalLPChangedEvent{lpFundAfter:int257,liquidityAfter:int257,tradingFee:int257,fundingFee:int257,trxId:int257}`

## GlobalLPPositionChangedEvent
TLB: `global_lp_position_changed_event#7eb7fb96 tokenId:int257 netSizeAfter:int257 isLong:bool entryPriceAfter:int257 trxId:int257 = GlobalLPPositionChangedEvent`
Signature: `GlobalLPPositionChangedEvent{tokenId:int257,netSizeAfter:int257,isLong:bool,entryPriceAfter:int257,trxId:int257}`

## PerpPositionIncreasedEvent
TLB: `perp_position_increased_event#07903041 positionId:int257 account:address tokenId:int257 isLong:bool marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 entryPrice:int257 fundingFee:int257 tradingFee:int257 trxId:int257 = PerpPositionIncreasedEvent`
Signature: `PerpPositionIncreasedEvent{positionId:int257,account:address,tokenId:int257,isLong:bool,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,entryPrice:int257,fundingFee:int257,tradingFee:int257,trxId:int257}`

## PerpPositionDecreasedEvent
TLB: `perp_position_decreased_event#2c4f1505 positionId:int257 account:address tokenId:int257 isLong:bool marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 realizedPnLDelta:int257 fundingFee:int257 tradingFee:int257 receive:int257 trxId:int257 = PerpPositionDecreasedEvent`
Signature: `PerpPositionDecreasedEvent{positionId:int257,account:address,tokenId:int257,isLong:bool,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,realizedPnLDelta:int257,fundingFee:int257,tradingFee:int257,receive:int257,trxId:int257}`

## PerpPositionLiquidatedEvent
TLB: `perp_position_liquidated_event#e4d104b0 positionId:int257 account:address tokenId:int257 isLong:bool marginDelta:int257 sizeDelta:int257 liquidatePrice:int257 fundingFee:int257 tradingFee:int257 liquidationFee:int257 trxId:int257 = PerpPositionLiquidatedEvent`
Signature: `PerpPositionLiquidatedEvent{positionId:int257,account:address,tokenId:int257,isLong:bool,marginDelta:int257,sizeDelta:int257,liquidatePrice:int257,fundingFee:int257,tradingFee:int257,liquidationFee:int257,trxId:int257}`

## UpdatePriceEvent
TLB: `update_price_event#6793c3e9 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdatePriceEvent`
Signature: `UpdatePriceEvent{pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## ConfigData
TLB: `_ lpLockTime:int257 bonusFactor:int257 orderBook:address = ConfigData`
Signature: `ConfigData{lpLockTime:int257,bonusFactor:int257,orderBook:address}`

## TokenConfig
TLB: `_ name:^string enable:bool minMargin:int257 maxLeverage:int257 liquidationFee:int257 tradingFeeRate:int257 lpTradingFeeRate:int257 interestRate:int257 maxFundingRate:int257 = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257}`

## TokenConfigData
TLB: `_ tokenIdNext:int257 tokenConfig:Maybe TokenConfig{name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257} = TokenConfigData`
Signature: `TokenConfigData{tokenIdNext:int257,tokenConfig:Maybe TokenConfig{name:^string,enable:bool,minMargin:int257,maxLeverage:int257,liquidationFee:int257,tradingFeeRate:int257,lpTradingFeeRate:int257,interestRate:int257,maxFundingRate:int257}}`

## LPPosition
TLB: `_ positionId:int257 liquidity:int257 bonus:int257 realizedFundingFee:int257 entryFundingFeeGrowth:int257 unlockTime:int257 = LPPosition`
Signature: `LPPosition{positionId:int257,liquidity:int257,bonus:int257,realizedFundingFee:int257,entryFundingFeeGrowth:int257,unlockTime:int257}`

## GlobalLPLiquidity
TLB: `_ lpFund:int257 liquidity:int257 fundingFeeGrowth:int257 = GlobalLPLiquidity`
Signature: `GlobalLPLiquidity{lpFund:int257,liquidity:int257,fundingFeeGrowth:int257}`

## LPPositionData
TLB: `_ lpPosition:Maybe LPPosition{positionId:int257,liquidity:int257,bonus:int257,realizedFundingFee:int257,entryFundingFeeGrowth:int257,unlockTime:int257} globalLPLiquidity:GlobalLPLiquidity{lpFund:int257,liquidity:int257,fundingFeeGrowth:int257} = LPPositionData`
Signature: `LPPositionData{lpPosition:Maybe LPPosition{positionId:int257,liquidity:int257,bonus:int257,realizedFundingFee:int257,entryFundingFeeGrowth:int257,unlockTime:int257},globalLPLiquidity:GlobalLPLiquidity{lpFund:int257,liquidity:int257,fundingFeeGrowth:int257}}`

## AccountPerpPosition
TLB: `_ positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}> = AccountPerpPosition`
Signature: `AccountPerpPosition{positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}>}`

## DirectionPerpPosition
TLB: `_ longPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257} shortPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257} = DirectionPerpPosition`
Signature: `DirectionPerpPosition{longPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}`

## PerpPosition
TLB: `_ positionId:int257 margin:int257 size:int257 entryPrice:int257 entryFundingFeeGrowth:int257 = PerpPosition`
Signature: `PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}`

## GlobalLPPosition
TLB: `_ netSize:int257 isLong:bool entryPrice:int257 = GlobalLPPosition`
Signature: `GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257}`

## PerpPositionData
TLB: `_ perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}} globalLPPosition:Maybe GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257} = PerpPositionData`
Signature: `PerpPositionData{perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{positionId:int257,margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}},globalLPPosition:Maybe GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257}}`

## PriceData
TLB: `_ price:int257 = PriceData`
Signature: `PriceData{price:int257}`

## UpdatePrice
TLB: `_ tokenId:int257 price:int257 = UpdatePrice`
Signature: `UpdatePrice{tokenId:int257,price:int257}`

# Get Methods
Total Get Methods: 6

## configData

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
11117: insuficient global net LP
18995: margin rate too low
27798: invalid token
28603: margin rate too high
31425: not reach unlock time
36718: disabled token
39251: insufficient global LP
41207: invalid sender
42634: legerage too high
55429: not reach liquidate price
58161: insufficient liquidity
62409: insufficient margin