# TACT Compilation Report
Contract: Pool
BOC Size: 9839 bytes

# Types
Total Types: 78

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
TLB: `update_config#4d35a99c gasConsumption:Maybe int257 minTonsForStorage:Maybe int257 rbfLockTime:Maybe int257 bonusFactor:Maybe int257 minLPMargin:Maybe int257 maxLPLeverage:Maybe int257 lpLiquidationFee:Maybe int257 lpMaxRiskRate:Maybe int257 orderBook:Maybe address = UpdateConfig`
Signature: `UpdateConfig{gasConsumption:Maybe int257,minTonsForStorage:Maybe int257,rbfLockTime:Maybe int257,bonusFactor:Maybe int257,minLPMargin:Maybe int257,maxLPLeverage:Maybe int257,lpLiquidationFee:Maybe int257,lpMaxRiskRate:Maybe int257,orderBook:Maybe address}`

## UpdateTokenConfig
TLB: `update_token_config#8ed4d7aa tokenId:int257 name:Maybe ^string enable:Maybe bool minMarginPerPosition:Maybe int257 maxLeveragePerPosition:Maybe int257 liquidationFeeRatePerPosition:Maybe int257 liquidationExecutionFee:Maybe int257 interestRate:Maybe int257 maxFundingRate:Maybe int257 = UpdateTokenConfig`
Signature: `UpdateTokenConfig{tokenId:int257,name:Maybe ^string,enable:Maybe bool,minMarginPerPosition:Maybe int257,maxLeveragePerPosition:Maybe int257,liquidationFeeRatePerPosition:Maybe int257,liquidationExecutionFee:Maybe int257,interestRate:Maybe int257,maxFundingRate:Maybe int257}`

## UpdateRBFPosition
TLB: `update_rbf_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdateRBFPosition`
Signature: `UpdateRBFPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateRBFPositionSuccess
TLB: `update_rbf_position_success#1cf0cf81 orderId:int257 receive:int257 trxId:uint64 = UpdateRBFPositionSuccess`
Signature: `UpdateRBFPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## UpdateLPPosition
TLB: `update_lp_position#fea36b71 orderId:uint64 opType:uint8 account:address marginDelta:int257 liquidityDelta:int257 trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdateLPPosition`
Signature: `UpdateLPPosition{orderId:uint64,opType:uint8,account:address,marginDelta:int257,liquidityDelta:int257,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#4989c7c1 orderId:int257 receive:int257 trxId:uint64 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## CancelIncreasePerpPositionMarketOrder
TLB: `cancel_increase_perp_position_market_order#fc741917 index:int257 trxId:int257 = CancelIncreasePerpPositionMarketOrder`
Signature: `CancelIncreasePerpPositionMarketOrder{index:int257,trxId:int257}`

## ExecuteIncreasePerpPositionMarketOrder
TLB: `execute_increase_perp_position_market_order#be94fb37 index:int257 trxId:int257 = ExecuteIncreasePerpPositionMarketOrder`
Signature: `ExecuteIncreasePerpPositionMarketOrder{index:int257,trxId:int257}`

## CreateDecreasePerpPositionMarketOrder
TLB: `create_decrease_perp_position_market_order#e3a4bafb token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 = CreateDecreasePerpPositionMarketOrder`
Signature: `CreateDecreasePerpPositionMarketOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257}`

## CancelDecreasePerpPositionMarketOrder
TLB: `cancel_decrease_perp_position_market_order#8d55f8eb index:int257 trxId:int257 = CancelDecreasePerpPositionMarketOrder`
Signature: `CancelDecreasePerpPositionMarketOrder{index:int257,trxId:int257}`

## ExecuteDecreasePerpPositionMarketOrder
TLB: `execute_decrease_perp_position_market_order#3ab0bb9d index:int257 trxId:int257 = ExecuteDecreasePerpPositionMarketOrder`
Signature: `ExecuteDecreasePerpPositionMarketOrder{index:int257,trxId:int257}`

## CreateIncreasePerpPositionLimitOrder
TLB: `create_increase_perp_position_limit_order#c8482978 token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool = CreateIncreasePerpPositionLimitOrder`
Signature: `CreateIncreasePerpPositionLimitOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool}`

## CancelIncreasePerpPositionLimitOrder
TLB: `cancel_increase_perp_position_limit_order#d8d5f4d7 index:int257 trxId:int257 = CancelIncreasePerpPositionLimitOrder`
Signature: `CancelIncreasePerpPositionLimitOrder{index:int257,trxId:int257}`

## ExecuteIncreasePerpPositionLimitOrder
TLB: `execute_increase_perp_position_limit_order#79758599 index:int257 trxId:int257 = ExecuteIncreasePerpPositionLimitOrder`
Signature: `ExecuteIncreasePerpPositionLimitOrder{index:int257,trxId:int257}`

## CreateDecreasePerpPositionLimitOrder
TLB: `create_decrease_perp_position_limit_order#8c1c25c8 token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool = CreateDecreasePerpPositionLimitOrder`
Signature: `CreateDecreasePerpPositionLimitOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool}`

## CancelDecreasePerpPositionLimitOrder
TLB: `cancel_decrease_perp_position_limit_order#617e18c7 index:int257 trxId:int257 = CancelDecreasePerpPositionLimitOrder`
Signature: `CancelDecreasePerpPositionLimitOrder{index:int257,trxId:int257}`

## ExecuteDecreasePerpPositionLimitOrder
TLB: `execute_decrease_perp_position_limit_order#626f92d6 index:int257 trxId:int257 = ExecuteDecreasePerpPositionLimitOrder`
Signature: `ExecuteDecreasePerpPositionLimitOrder{index:int257,trxId:int257}`

## RBFPositionIncreasedEvent
TLB: `rbf_position_increased_event#f0aabad5 positionId:int257 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 unlockTimeAfter:int257 trxId:int257 = RBFPositionIncreasedEvent`
Signature: `RBFPositionIncreasedEvent{positionId:int257,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,unlockTimeAfter:int257,trxId:int257}`

## RBFPositionDecreasedEvent
TLB: `rbf_position_decreased_event#abcb8638 positionId:int257 account:address liquidityDelta:int257 liquidityAfter:int257 bonusDelta:int257 bonusAfter:int257 receive:int257 trxId:int257 = RBFPositionDecreasedEvent`
Signature: `RBFPositionDecreasedEvent{positionId:int257,account:address,liquidityDelta:int257,liquidityAfter:int257,bonusDelta:int257,bonusAfter:int257,receive:int257,trxId:int257}`

## GlobalRBFChangedEvent
TLB: `global_rbf_changed_event#cdaca23b riskBufferFundAfter:int257 liquidityAfter:int257 tradingFee:int257 liquidation:int257 trxId:int257 = GlobalRBFChangedEvent`
Signature: `GlobalRBFChangedEvent{riskBufferFundAfter:int257,liquidityAfter:int257,tradingFee:int257,liquidation:int257,trxId:int257}`

## LPPositionIncreasedEvent
TLB: `lp_position_increased_event#0046a7ea positionId:int257 account:address marginDelta:int257 marginAfter:int257 liquidityDelta:int257 liquidityAfter:int257 entryFundingFeeGrowth:int257 entryTradingFeeGrowth:int257 trxId:int257 = LPPositionIncreasedEvent`
Signature: `LPPositionIncreasedEvent{positionId:int257,account:address,marginDelta:int257,marginAfter:int257,liquidityDelta:int257,liquidityAfter:int257,entryFundingFeeGrowth:int257,entryTradingFeeGrowth:int257,trxId:int257}`

## LPPositionDecreasedEvent
TLB: `lp_position_decreased_event#a97fd949 positionId:int257 account:address marginDelta:int257 marginAfter:int257 liquidityDelta:int257 liquidityAfter:int257 tradingFee:int257 fundingFee:int257 realizedLoss:int257 receive:int257 trxId:int257 = LPPositionDecreasedEvent`
Signature: `LPPositionDecreasedEvent{positionId:int257,account:address,marginDelta:int257,marginAfter:int257,liquidityDelta:int257,liquidityAfter:int257,tradingFee:int257,fundingFee:int257,realizedLoss:int257,receive:int257,trxId:int257}`

## LPPositionLiquidatedEvent
TLB: `lp_position_liquidated_event#bff875f9 positionId:int257 account:address margin:int257 liquidity:int257 tradingFee:int257 fundingFee:int257 liquidationFee:int257 trxId:int257 = LPPositionLiquidatedEvent`
Signature: `LPPositionLiquidatedEvent{positionId:int257,account:address,margin:int257,liquidity:int257,tradingFee:int257,fundingFee:int257,liquidationFee:int257,trxId:int257}`

## GlobalLPLiquidityChangedEvent
TLB: `global_lp_liquidity_changed_event#a13ff0b9 liquidityAfter:int257 trxId:int257 = GlobalLPLiquidityChangedEvent`
Signature: `GlobalLPLiquidityChangedEvent{liquidityAfter:int257,trxId:int257}`

## GlobalLPPositionChangedEvent
TLB: `global_lp_position_changed_event#e18de828 netSizeAfter:int257 isLong:bool entryPriceAfter:int257 trxId:int257 = GlobalLPPositionChangedEvent`
Signature: `GlobalLPPositionChangedEvent{netSizeAfter:int257,isLong:bool,entryPriceAfter:int257,trxId:int257}`

## IncreasePerpPositionMarketCreatedEvent
TLB: `increase_perp_position_market_created_event#d960015d account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 executionFee:int257 index:int257 = IncreasePerpPositionMarketCreatedEvent`
Signature: `IncreasePerpPositionMarketCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,index:int257}`

## IncreasePerpPositionMarketCancelledEvent
TLB: `increase_perp_position_market_cancelled_event#fcfdee01 token:^string index:int257 trxId:int257 = IncreasePerpPositionMarketCancelledEvent`
Signature: `IncreasePerpPositionMarketCancelledEvent{token:^string,index:int257,trxId:int257}`

## IncreasePerpPositionMarketExecutedEvent
TLB: `increase_perp_position_market_executed_event#113c801f token:^string index:int257 trxId:int257 = IncreasePerpPositionMarketExecutedEvent`
Signature: `IncreasePerpPositionMarketExecutedEvent{token:^string,index:int257,trxId:int257}`

## IncreasePerpPositionLimitCreatedEvent
TLB: `increase_perp_position_limit_created_event#93ef9ed0 account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 index:int257 = IncreasePerpPositionLimitCreatedEvent`
Signature: `IncreasePerpPositionLimitCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,index:int257}`

## IncreasePerpPositionLimitCancelledEvent
TLB: `increase_perp_position_limit_cancelled_event#fe5ff78f token:^string index:int257 trxId:int257 = IncreasePerpPositionLimitCancelledEvent`
Signature: `IncreasePerpPositionLimitCancelledEvent{token:^string,index:int257,trxId:int257}`

## IncreasePerpPositionLimitExecutedEvent
TLB: `increase_perp_position_limit_executed_event#6be479b5 token:^string index:int257 trxId:int257 = IncreasePerpPositionLimitExecutedEvent`
Signature: `IncreasePerpPositionLimitExecutedEvent{token:^string,index:int257,trxId:int257}`

## PerpPositionIncreasedEvent
TLB: `perp_position_increased_event#7c25684b account:address token:^string marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 entryPrice:int257 fundingFee:int257 tradingFee:int257 = PerpPositionIncreasedEvent`
Signature: `PerpPositionIncreasedEvent{account:address,token:^string,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,entryPrice:int257,fundingFee:int257,tradingFee:int257}`

## DecreasePerpPositionMarketCreatedEvent
TLB: `decrease_perp_position_market_created_event#93d6cfb2 account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 executionFee:int257 index:int257 = DecreasePerpPositionMarketCreatedEvent`
Signature: `DecreasePerpPositionMarketCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,index:int257}`

## DecreasePerpPositionMarketCancelledEvent
TLB: `decrease_perp_position_market_cancelled_event#97537cd7 token:^string index:int257 trxId:int257 = DecreasePerpPositionMarketCancelledEvent`
Signature: `DecreasePerpPositionMarketCancelledEvent{token:^string,index:int257,trxId:int257}`

## DecreasePerpPositionMarketExecutedEvent
TLB: `decrease_perp_position_market_executed_event#056291ad token:^string index:int257 trxId:int257 = DecreasePerpPositionMarketExecutedEvent`
Signature: `DecreasePerpPositionMarketExecutedEvent{token:^string,index:int257,trxId:int257}`

## DecreasePerpPositionLimitCreatedEvent
TLB: `decrease_perp_position_limit_created_event#ebf5cf37 account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 index:int257 = DecreasePerpPositionLimitCreatedEvent`
Signature: `DecreasePerpPositionLimitCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,index:int257}`

## DecreasePerpPositionLimitCancelledEvent
TLB: `decrease_perp_position_limit_cancelled_event#cf711360 token:^string index:int257 trxId:int257 = DecreasePerpPositionLimitCancelledEvent`
Signature: `DecreasePerpPositionLimitCancelledEvent{token:^string,index:int257,trxId:int257}`

## DecreasePerpPositionLimitExecutedEvent
TLB: `decrease_perp_position_limit_executed_event#07f5410a token:^string index:int257 trxId:int257 = DecreasePerpPositionLimitExecutedEvent`
Signature: `DecreasePerpPositionLimitExecutedEvent{token:^string,index:int257,trxId:int257}`

## PerpPositionDecreasedEvent
TLB: `perp_position_decreased_event#6aa56cf7 account:address token:^string marginDelta:int257 marginAfter:int257 sizeDelta:int257 sizeAfter:int257 tradePrice:int257 realizedPnLDelta:int257 fundingFee:int257 tradingFee:int257 = PerpPositionDecreasedEvent`
Signature: `PerpPositionDecreasedEvent{account:address,token:^string,marginDelta:int257,marginAfter:int257,sizeDelta:int257,sizeAfter:int257,tradePrice:int257,realizedPnLDelta:int257,fundingFee:int257,tradingFee:int257}`

## UpdatePriceEvent
TLB: `update_price_event#6793c3e9 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdatePriceEvent`
Signature: `UpdatePriceEvent{pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## ConfigData
TLB: `_ rbfLockTime:int257 bonusFactor:int257 minLPMargin:int257 maxLPLeverage:int257 lpLiquidationFee:int257 lpMaxRiskRate:int257 orderBook:address = ConfigData`
Signature: `ConfigData{rbfLockTime:int257,bonusFactor:int257,minLPMargin:int257,maxLPLeverage:int257,lpLiquidationFee:int257,lpMaxRiskRate:int257,orderBook:address}`

## TokenConfig
TLB: `_ name:^string enable:bool minMarginPerPosition:int257 maxLeveragePerPosition:int257 liquidationFeeRatePerPosition:int257 liquidationExecutionFee:int257 interestRate:int257 maxFundingRate:int257 = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool,minMarginPerPosition:int257,maxLeveragePerPosition:int257,liquidationFeeRatePerPosition:int257,liquidationExecutionFee:int257,interestRate:int257,maxFundingRate:int257}`

## RBFPosition
TLB: `_ positionId:int257 liquidity:int257 bonus:int257 unlockTime:int257 = RBFPosition`
Signature: `RBFPosition{positionId:int257,liquidity:int257,bonus:int257,unlockTime:int257}`

## GlobalRBFPosition
TLB: `_ riskBufferFund:int257 liquidity:int257 = GlobalRBFPosition`
Signature: `GlobalRBFPosition{riskBufferFund:int257,liquidity:int257}`

## IncreaseLPPositionOrder
TLB: `_ account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 blockTime:int257 = IncreaseLPPositionOrder`
Signature: `IncreaseLPPositionOrder{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,blockTime:int257}`

## DecreaseLPPositionOrder
TLB: `_ account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 blockTime:int257 = DecreaseLPPositionOrder`
Signature: `DecreaseLPPositionOrder{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,blockTime:int257}`

## LPPosition
TLB: `_ positionId:int257 margin:int257 liquidity:int257 entryFundingFeeGrowth:int257 entryTradingFeeGrowth:int257 = LPPosition`
Signature: `LPPosition{positionId:int257,margin:int257,liquidity:int257,entryFundingFeeGrowth:int257,entryTradingFeeGrowth:int257}`

## GlobalLPPosition
TLB: `_ netSize:int257 isLong:bool entryPrice:int257 = GlobalLPPosition`
Signature: `GlobalLPPosition{netSize:int257,isLong:bool,entryPrice:int257}`

## IncreasePerpPositionMarketOrders
TLB: `_ increasePerpPositionMarketOrders:dict<int, ^IncreasePerpPositionMarketOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,blockTime:int257}> = IncreasePerpPositionMarketOrders`
Signature: `IncreasePerpPositionMarketOrders{increasePerpPositionMarketOrders:dict<int, ^IncreasePerpPositionMarketOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,blockTime:int257}>}`

## IncreasePerpPositionMarketOrder
TLB: `_ account:address isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 executionFee:int257 blockTime:int257 = IncreasePerpPositionMarketOrder`
Signature: `IncreasePerpPositionMarketOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,blockTime:int257}`

## DecreasePerpPositionMarketOrders
TLB: `_ decreasePerpPositionMarketOrders:dict<int, ^DecreasePerpPositionMarketOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,blockTime:int257}> = DecreasePerpPositionMarketOrders`
Signature: `DecreasePerpPositionMarketOrders{decreasePerpPositionMarketOrders:dict<int, ^DecreasePerpPositionMarketOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,blockTime:int257}>}`

## DecreasePerpPositionMarketOrder
TLB: `_ account:address isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 executionFee:int257 blockTime:int257 = DecreasePerpPositionMarketOrder`
Signature: `DecreasePerpPositionMarketOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,blockTime:int257}`

## IncreasePerpPositionLimitOrders
TLB: `_ increasePerpPositionLimitOrders:dict<int, ^IncreasePerpPositionLimitOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257}> = IncreasePerpPositionLimitOrders`
Signature: `IncreasePerpPositionLimitOrders{increasePerpPositionLimitOrders:dict<int, ^IncreasePerpPositionLimitOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257}>}`

## IncreasePerpPositionLimitOrder
TLB: `_ account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 blockTime:int257 = IncreasePerpPositionLimitOrder`
Signature: `IncreasePerpPositionLimitOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257}`

## DecreasePerpPositionLimitOrders
TLB: `_ decreasePerpPositionLimitOrders:dict<int, ^DecreasePerpPositionLimitOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257}> = DecreasePerpPositionLimitOrders`
Signature: `DecreasePerpPositionLimitOrders{decreasePerpPositionLimitOrders:dict<int, ^DecreasePerpPositionLimitOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257}>}`

## DecreasePerpPositionLimitOrder
TLB: `_ account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 blockTime:int257 = DecreasePerpPositionLimitOrder`
Signature: `DecreasePerpPositionLimitOrder{account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257}`

## AccountPerpPosition
TLB: `_ positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}> = AccountPerpPosition`
Signature: `AccountPerpPosition{positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}>}`

## DirectionPerpPosition
TLB: `_ longPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257} shortPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257} = DirectionPerpPosition`
Signature: `DirectionPerpPosition{longPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257},shortPosition:PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}}`

## PerpPosition
TLB: `_ margin:int257 size:int257 entryPrice:int257 entryFundingFeeGrowth:int257 = PerpPosition`
Signature: `PerpPosition{margin:int257,size:int257,entryPrice:int257,entryFundingFeeGrowth:int257}`

## PriceVertex
TLB: `_ size:int257 premiumRateX96:int257 = PriceVertex`
Signature: `PriceVertex{size:int257,premiumRateX96:int257}`

## PriceState
TLB: `_ maxPriceImpactLiquidity:int257 premiumRateX96:int257 priceVertices:dict<int, ^PriceVertex{size:int257,premiumRateX96:int257}> pendingVertexIndex:int257 liquidationVertexIndex:int257 currentVertexIndex:int257 liquidationBufferNetSizes:dict<int, int> = PriceState`
Signature: `PriceState{maxPriceImpactLiquidity:int257,premiumRateX96:int257,priceVertices:dict<int, ^PriceVertex{size:int257,premiumRateX96:int257}>,pendingVertexIndex:int257,liquidationVertexIndex:int257,currentVertexIndex:int257,liquidationBufferNetSizes:dict<int, int>}`

## GlobalRiskBufferFund
TLB: `_ riskBufferFund:int257 liquidity:int257 = GlobalRiskBufferFund`
Signature: `GlobalRiskBufferFund{riskBufferFund:int257,liquidity:int257}`

## GlobalPosition
TLB: `_ longSize:int257 shortSize:int257 longFundingRateGrowthX96:int257 shortFundingRateGrowthX96:int257 = GlobalPosition`
Signature: `GlobalPosition{longSize:int257,shortSize:int257,longFundingRateGrowthX96:int257,shortFundingRateGrowthX96:int257}`

## GlobalLiquidityPosition
TLB: `_ netSize:int257 liquidationBufferNetSize:int257 entryPriceX96:int257 side:bool liquidity:int257 realizedProfitGrowthX64:int257 = GlobalLiquidityPosition`
Signature: `GlobalLiquidityPosition{netSize:int257,liquidationBufferNetSize:int257,entryPriceX96:int257,side:bool,liquidity:int257,realizedProfitGrowthX64:int257}`

## GlobalFundingRateSample
TLB: `_ lastAdjustFundingRateTime:int257 sampleCount:int257 cumulativePremiumRateX96:int257 = GlobalFundingRateSample`
Signature: `GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRateX96:int257}`

## PreviousGlobalFundingRate
TLB: `_ longFundingRateGrowthX96:int257 shortFundingRateGrowthX96:int257 = PreviousGlobalFundingRate`
Signature: `PreviousGlobalFundingRate{longFundingRateGrowthX96:int257,shortFundingRateGrowthX96:int257}`

## FundingRateGrowthX96
TLB: `_ clampedFundingRateDeltaX96:int257 longFundingRateGrowthAfterX96:int257 shortFundingRateGrowthAfterX96:int257 = FundingRateGrowthX96`
Signature: `FundingRateGrowthX96{clampedFundingRateDeltaX96:int257,longFundingRateGrowthAfterX96:int257,shortFundingRateGrowthAfterX96:int257}`

## SamplePremiumRateResult
TLB: `_ sample:GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRateX96:int257} shouldAdjustFundingRate:bool fundingRateDeltaX96:int257 = SamplePremiumRateResult`
Signature: `SamplePremiumRateResult{sample:GlobalFundingRateSample{lastAdjustFundingRateTime:int257,sampleCount:int257,cumulativePremiumRateX96:int257},shouldAdjustFundingRate:bool,fundingRateDeltaX96:int257}`

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

## rbfPosition
Argument: account

## lpPosition
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
5238: position not exist
9429: send gas not enough
22749: risk rate too hig
23236: insufficient global RBF
31425: not reach unlock time
41207: invalid sender
42634: legerage too high
58161: insufficient liquidity
60602: risk rate too high
61867: insuficient global net RBF
62259: insufficient global liquidity
62409: insufficient margin