# TACT Compilation Report
Contract: Pool
BOC Size: 17328 bytes

# Types
Total Types: 95

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

## TokenNotification
TLB: `token_notification#7362d09c queryId:uint64 amount:coins from:address forwardPayload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{queryId:uint64,amount:coins,from:address,forwardPayload:remainder<slice>}`

## CancelIncreaseRBFPositionOrder
TLB: `cancel_increase_rbf_position_order#0c1d6024 index:int257 trxId:int257 = CancelIncreaseRBFPositionOrder`
Signature: `CancelIncreaseRBFPositionOrder{index:int257,trxId:int257}`

## ExecuteIncreaseRBFPositionOrder
TLB: `execute_increase_rbf_position_order#6bc15d49 index:int257 trxId:int257 = ExecuteIncreaseRBFPositionOrder`
Signature: `ExecuteIncreaseRBFPositionOrder{index:int257,trxId:int257}`

## CreateDecreaseRBFPositionOrder
TLB: `create_decrease_rbf_position_order#a11162ed executionFee:int257 liquidityDelta:int257 = CreateDecreaseRBFPositionOrder`
Signature: `CreateDecreaseRBFPositionOrder{executionFee:int257,liquidityDelta:int257}`

## CancelDecreaseRBFPositionOrder
TLB: `cancel_decrease_rbf_position_order#62266a9f index:int257 trxId:int257 = CancelDecreaseRBFPositionOrder`
Signature: `CancelDecreaseRBFPositionOrder{index:int257,trxId:int257}`

## ExecuteDecreaseRBFPositionOrder
TLB: `execute_decrease_rbf_position_order#27eb7733 index:int257 trxId:int257 = ExecuteDecreaseRBFPositionOrder`
Signature: `ExecuteDecreaseRBFPositionOrder{index:int257,trxId:int257}`

## CancelIncreaseLPPositionOrder
TLB: `cancel_increase_lp_position_order#7564ce0e index:int257 trxId:int257 = CancelIncreaseLPPositionOrder`
Signature: `CancelIncreaseLPPositionOrder{index:int257,trxId:int257}`

## ExecuteIncreaseLPPositionOrder
TLB: `execute_increase_lp_position_order#63f5f996 index:int257 trxId:int257 = ExecuteIncreaseLPPositionOrder`
Signature: `ExecuteIncreaseLPPositionOrder{index:int257,trxId:int257}`

## CreateDecreaseLPPositionOrder
TLB: `create_decrease_lp_position_order#7202bd7d executionFee:int257 marginDelta:int257 liquidityDelta:int257 = CreateDecreaseLPPositionOrder`
Signature: `CreateDecreaseLPPositionOrder{executionFee:int257,marginDelta:int257,liquidityDelta:int257}`

## CancelDecreaseLPPositionOrder
TLB: `cancel_decrease_lp_position_order#455bcf7a index:int257 trxId:int257 = CancelDecreaseLPPositionOrder`
Signature: `CancelDecreaseLPPositionOrder{index:int257,trxId:int257}`

## ExecuteDecreaseLPPositionOrder
TLB: `execute_decrease_lp_position_order#8db2f500 index:int257 trxId:int257 = ExecuteDecreaseLPPositionOrder`
Signature: `ExecuteDecreaseLPPositionOrder{index:int257,trxId:int257}`

## CreateIncreasePerpPositionMarketOrder
TLB: `create_increase_perp_position_market_order#f3c953fe token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 = CreateIncreasePerpPositionMarketOrder`
Signature: `CreateIncreasePerpPositionMarketOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257}`

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

## SetOperator
TLB: `set_operator#5d7a8d75 operator:address = SetOperator`
Signature: `SetOperator{operator:address}`

## SetExecutor
TLB: `set_executor#ecf070ec executor:address enable:bool = SetExecutor`
Signature: `SetExecutor{executor:address,enable:bool}`

## SetUSDC
TLB: `set_usdc#68154757 usdc:address = SetUSDC`
Signature: `SetUSDC{usdc:address}`

## SetExecutionFeeReceiver
TLB: `set_execution_fee_receiver#af1c196a receiver:address = SetExecutionFeeReceiver`
Signature: `SetExecutionFeeReceiver{receiver:address}`

## IncreaseRBFPositionCreatedEvent
TLB: `increase_rbf_position_created_event#9e68162d account:address liquidityDelta:int257 executionFee:int257 index:int257 = IncreaseRBFPositionCreatedEvent`
Signature: `IncreaseRBFPositionCreatedEvent{account:address,liquidityDelta:int257,executionFee:int257,index:int257}`

## IncreaseRBFPositionCancelledEvent
TLB: `increase_rbf_position_cancelled_event#7eea6e53 index:int257 trxId:int257 = IncreaseRBFPositionCancelledEvent`
Signature: `IncreaseRBFPositionCancelledEvent{index:int257,trxId:int257}`

## IncreaseRBFPositionExecutedEvent
TLB: `increase_rbf_position_executed_event#9f9fdf82 index:int257 trxId:int257 = IncreaseRBFPositionExecutedEvent`
Signature: `IncreaseRBFPositionExecutedEvent{index:int257,trxId:int257}`

## RBFPositionIncreasedEvent
TLB: `rbf_position_increased_event#3e87a2f1 account:address liquidityDelta:int257 liquidityAfter:int257 unlockTimeAfter:int257 = RBFPositionIncreasedEvent`
Signature: `RBFPositionIncreasedEvent{account:address,liquidityDelta:int257,liquidityAfter:int257,unlockTimeAfter:int257}`

## DecreaseRBFPositionCreatedEvent
TLB: `decrease_rbf_position_created_event#99f1adce account:address liquidityDelta:int257 executionFee:int257 index:int257 = DecreaseRBFPositionCreatedEvent`
Signature: `DecreaseRBFPositionCreatedEvent{account:address,liquidityDelta:int257,executionFee:int257,index:int257}`

## DecreaseRBFPositionCancelledEvent
TLB: `decrease_rbf_position_cancelled_event#50ea209f index:int257 trxId:int257 = DecreaseRBFPositionCancelledEvent`
Signature: `DecreaseRBFPositionCancelledEvent{index:int257,trxId:int257}`

## DecreaseRBFPositionExecutedEvent
TLB: `decrease_rbf_position_executed_event#a71f6644 index:int257 trxId:int257 = DecreaseRBFPositionExecutedEvent`
Signature: `DecreaseRBFPositionExecutedEvent{index:int257,trxId:int257}`

## RBFPositionDecreasedEvent
TLB: `rbf_position_decreased_event#5bc7e914 account:address liquidityDelta:int257 liquidityAfter:int257 unlockTimeAfter:int257 = RBFPositionDecreasedEvent`
Signature: `RBFPositionDecreasedEvent{account:address,liquidityDelta:int257,liquidityAfter:int257,unlockTimeAfter:int257}`

## GlobalRBFChangedEvent
TLB: `global_rbf_changed_event#fd5108e7 riskBufferFundAfter:int257 liquidityAfter:int257 = GlobalRBFChangedEvent`
Signature: `GlobalRBFChangedEvent{riskBufferFundAfter:int257,liquidityAfter:int257}`

## IncreaseLPPositionCreatedEvent
TLB: `increase_lp_position_created_event#5b6375f9 account:address margin:int257 liquidityDelta:int257 executionFee:int257 index:int257 = IncreaseLPPositionCreatedEvent`
Signature: `IncreaseLPPositionCreatedEvent{account:address,margin:int257,liquidityDelta:int257,executionFee:int257,index:int257}`

## IncreaseLPPositionCancelledEvent
TLB: `increase_lp_position_cancelled_event#1cdd2599 index:int257 trxId:int257 = IncreaseLPPositionCancelledEvent`
Signature: `IncreaseLPPositionCancelledEvent{index:int257,trxId:int257}`

## IncreaseLPPositionExecutedEvent
TLB: `increase_lp_position_executed_event#72176f5d index:int257 trxId:int257 = IncreaseLPPositionExecutedEvent`
Signature: `IncreaseLPPositionExecutedEvent{index:int257,trxId:int257}`

## LPPositionIncreasedEvent
TLB: `lp_position_increased_event#b0bfdb5c account:address marginDelta:int257 marginAfter:int257 liquidityDelta:int257 liquidityAfter:int257 entryFundingFeeGrowth:int257 entryTradingFeeGrowth:int257 = LPPositionIncreasedEvent`
Signature: `LPPositionIncreasedEvent{account:address,marginDelta:int257,marginAfter:int257,liquidityDelta:int257,liquidityAfter:int257,entryFundingFeeGrowth:int257,entryTradingFeeGrowth:int257}`

## DecreaseLPPositionCreatedEvent
TLB: `decrease_lp_position_created_event#36c6cc39 account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 index:int257 = DecreaseLPPositionCreatedEvent`
Signature: `DecreaseLPPositionCreatedEvent{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,index:int257}`

## DecreaseLPPositionCancelledEvent
TLB: `decrease_lp_position_cancelled_event#956f8d59 index:int257 trxId:int257 = DecreaseLPPositionCancelledEvent`
Signature: `DecreaseLPPositionCancelledEvent{index:int257,trxId:int257}`

## DecreaseLPPositionExecutedEvent
TLB: `decrease_lp_position_executed_event#72ae9b9a index:int257 trxId:int257 = DecreaseLPPositionExecutedEvent`
Signature: `DecreaseLPPositionExecutedEvent{index:int257,trxId:int257}`

## LPPositionDecreasedEvent
TLB: `lp_position_decreased_event#d443ce43 account:address marginDelta:int257 marginAfter:int257 liquidityDelta:int257 liquidityAfter:int257 realizedProfit:int257 realizedLoss:int257 = LPPositionDecreasedEvent`
Signature: `LPPositionDecreasedEvent{account:address,marginDelta:int257,marginAfter:int257,liquidityDelta:int257,liquidityAfter:int257,realizedProfit:int257,realizedLoss:int257}`

## GlobalLPChangedEvent
TLB: `global_lp_changed_event#42445a0e netSizeAfter:int257 isLong:bool entryPriceAfter:int257 = GlobalLPChangedEvent`
Signature: `GlobalLPChangedEvent{netSizeAfter:int257,isLong:bool,entryPriceAfter:int257}`

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

## OperatorUpdatedEvent
TLB: `operator_updated_event#8850b15e newOperator:address = OperatorUpdatedEvent`
Signature: `OperatorUpdatedEvent{newOperator:address}`

## ExecutionFeeReceiverUpdatedEvent
TLB: `execution_fee_receiver_updated_event#bef4bfdc newExecutionFeeReceiver:address = ExecutionFeeReceiverUpdatedEvent`
Signature: `ExecutionFeeReceiverUpdatedEvent{newExecutionFeeReceiver:address}`

## TokenInfo
TLB: `_ name:^string enable:bool = TokenInfo`
Signature: `TokenInfo{name:^string,enable:bool}`

## IncreaseRBFPositionOrder
TLB: `_ account:address liquidityDelta:int257 executionFee:int257 blockTime:int257 = IncreaseRBFPositionOrder`
Signature: `IncreaseRBFPositionOrder{account:address,liquidityDelta:int257,executionFee:int257,blockTime:int257}`

## DecreaseRBFPositionOrder
TLB: `_ account:address liquidityDelta:int257 executionFee:int257 blockTime:int257 = DecreaseRBFPositionOrder`
Signature: `DecreaseRBFPositionOrder{account:address,liquidityDelta:int257,executionFee:int257,blockTime:int257}`

## RBFPosition
TLB: `_ liquidity:int257 bonus:int257 unlockTime:int257 = RBFPosition`
Signature: `RBFPosition{liquidity:int257,bonus:int257,unlockTime:int257}`

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
TLB: `_ margin:int257 liquidity:int257 entryFundingFeeGrowth:int257 entryTradingFeeGrowth:int257 = LPPosition`
Signature: `LPPosition{margin:int257,liquidity:int257,entryFundingFeeGrowth:int257,entryTradingFeeGrowth:int257}`

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

# Get Methods
Total Get Methods: 9

## operator

## usdc

## executionFeeReceiver

## increaseRBFPositionIndexNext

## increaseRBFPositionOrder
Argument: index

## decreaseRBFPositionIndexNext

## decreaseRBFPositionOrder
Argument: index

## fundPosition
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
16780: order expired
19305: gas not enough
22749: risk rate too hig
23236: insufficient global RBF
24562: execution fee not enough
31425: not reach unlock time
32637: order not exist
39703: too early
41207: invalid sender
42634: legerage too high
55585: only operator
58161: insufficient liquidity
61867: insuficient global net RBF
62259: insufficient global liquidity
62409: insufficient margin