# TACT Compilation Report
Contract: OrderBook
BOC Size: 9525 bytes

# Types
Total Types: 69

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

## TokenExcesses
TLB: `token_excesses#d53276db queryId:uint64 = TokenExcesses`
Signature: `TokenExcesses{queryId:uint64}`

## UpdateConfig
TLB: `update_config#8861cc73 executor:Maybe address enableExecutor:Maybe bool compensator:Maybe address enableCompensator:Maybe bool minTimeDelayExecutor:Maybe int257 maxTimeDelayExecutor:Maybe int257 minTimeDelayTrader:Maybe int257 minPendingTimeDelayCompensator:Maybe int257 minExecutionFee:Maybe int257 gasConsumption:Maybe int257 minTonsForStorage:Maybe int257 usdtWallet:Maybe address pool:Maybe address = UpdateConfig`
Signature: `UpdateConfig{executor:Maybe address,enableExecutor:Maybe bool,compensator:Maybe address,enableCompensator:Maybe bool,minTimeDelayExecutor:Maybe int257,maxTimeDelayExecutor:Maybe int257,minTimeDelayTrader:Maybe int257,minPendingTimeDelayCompensator:Maybe int257,minExecutionFee:Maybe int257,gasConsumption:Maybe int257,minTonsForStorage:Maybe int257,usdtWallet:Maybe address,pool:Maybe address}`

## CreateDecreaseRBFPositionOrder
TLB: `create_decrease_rbf_position_order#a11162ed executionFee:int257 liquidityDelta:int257 = CreateDecreaseRBFPositionOrder`
Signature: `CreateDecreaseRBFPositionOrder{executionFee:int257,liquidityDelta:int257}`

## CancelRBFPositionOrder
TLB: `cancel_rbf_position_order#bc6f0603 orderId:int257 trxId:int257 executionFeeReceiver:Maybe address = CancelRBFPositionOrder`
Signature: `CancelRBFPositionOrder{orderId:int257,trxId:int257,executionFeeReceiver:Maybe address}`

## ExecuteRBFPositionOrder
TLB: `execute_rbf_position_order#a436705a orderId:int257 trxId:int257 executionFeeReceiver:Maybe address = ExecuteRBFPositionOrder`
Signature: `ExecuteRBFPositionOrder{orderId:int257,trxId:int257,executionFeeReceiver:Maybe address}`

## UpdateRBFPosition
TLB: `update_rbf_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 = UpdateRBFPosition`
Signature: `UpdateRBFPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64}`

## UpdateRBFPositionSuccess
TLB: `update_rbf_position_success#1cf0cf81 orderId:int257 receive:int257 trxId:uint64 = UpdateRBFPositionSuccess`
Signature: `UpdateRBFPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## CompensateIncreaseRBFPositionOrder
TLB: `compensate_increase_rbf_position_order#c8541fd9 orderId:int257 trxId:int257 positionSuccess:bool refundSuccess:bool executionFeeReceiver:Maybe address = CompensateIncreaseRBFPositionOrder`
Signature: `CompensateIncreaseRBFPositionOrder{orderId:int257,trxId:int257,positionSuccess:bool,refundSuccess:bool,executionFeeReceiver:Maybe address}`

## CompensateDecreaseRBFPositionOrder
TLB: `compensate_decrease_rbf_position_order#c1618eb3 orderId:int257 trxId:int257 positionSuccess:bool refundSuccess:bool executionFeeReceiver:Maybe address = CompensateDecreaseRBFPositionOrder`
Signature: `CompensateDecreaseRBFPositionOrder{orderId:int257,trxId:int257,positionSuccess:bool,refundSuccess:bool,executionFeeReceiver:Maybe address}`

## CancelIncreaseLPPositionOrder
TLB: `cancel_increase_lp_position_order#0da19d6e executionFeeReceiver:address orderId:int257 trxId:int257 = CancelIncreaseLPPositionOrder`
Signature: `CancelIncreaseLPPositionOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## ExecuteIncreaseLPPositionOrder
TLB: `execute_increase_lp_position_order#e06785fe executionFeeReceiver:address orderId:int257 trxId:int257 = ExecuteIncreaseLPPositionOrder`
Signature: `ExecuteIncreaseLPPositionOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## CreateDecreaseLPPositionOrder
TLB: `create_decrease_lp_position_order#7202bd7d executionFee:int257 marginDelta:int257 liquidityDelta:int257 = CreateDecreaseLPPositionOrder`
Signature: `CreateDecreaseLPPositionOrder{executionFee:int257,marginDelta:int257,liquidityDelta:int257}`

## CancelDecreaseLPPositionOrder
TLB: `cancel_decrease_lp_position_order#a3d5b983 executionFeeReceiver:address orderId:int257 trxId:int257 = CancelDecreaseLPPositionOrder`
Signature: `CancelDecreaseLPPositionOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## ExecuteDecreaseLPPositionOrder
TLB: `execute_decrease_lp_position_order#65646b81 executionFeeReceiver:address orderId:int257 trxId:int257 = ExecuteDecreaseLPPositionOrder`
Signature: `ExecuteDecreaseLPPositionOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## CancelIncreasePerpPositionMarketOrder
TLB: `cancel_increase_perp_position_market_order#58b94082 executionFeeReceiver:address orderId:int257 trxId:int257 = CancelIncreasePerpPositionMarketOrder`
Signature: `CancelIncreasePerpPositionMarketOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## ExecuteIncreasePerpPositionMarketOrder
TLB: `execute_increase_perp_position_market_order#e025c33b executionFeeReceiver:address orderId:int257 trxId:int257 = ExecuteIncreasePerpPositionMarketOrder`
Signature: `ExecuteIncreasePerpPositionMarketOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## CreateDecreasePerpPositionMarketOrder
TLB: `create_decrease_perp_position_market_order#e3a4bafb token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 = CreateDecreasePerpPositionMarketOrder`
Signature: `CreateDecreasePerpPositionMarketOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257}`

## CancelDecreasePerpPositionMarketOrder
TLB: `cancel_decrease_perp_position_market_order#b402e2ab executionFeeReceiver:address orderId:int257 trxId:int257 = CancelDecreasePerpPositionMarketOrder`
Signature: `CancelDecreasePerpPositionMarketOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## ExecuteDecreasePerpPositionMarketOrder
TLB: `execute_decrease_perp_position_market_order#934e1515 executionFeeReceiver:address orderId:int257 trxId:int257 = ExecuteDecreasePerpPositionMarketOrder`
Signature: `ExecuteDecreasePerpPositionMarketOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## CreateIncreasePerpPositionLimitOrder
TLB: `create_increase_perp_position_limit_order#c8482978 token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool = CreateIncreasePerpPositionLimitOrder`
Signature: `CreateIncreasePerpPositionLimitOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool}`

## CancelIncreasePerpPositionLimitOrder
TLB: `cancel_increase_perp_position_limit_order#e789101a executionFeeReceiver:address orderId:int257 trxId:int257 = CancelIncreasePerpPositionLimitOrder`
Signature: `CancelIncreasePerpPositionLimitOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## ExecuteIncreasePerpPositionLimitOrder
TLB: `execute_increase_perp_position_limit_order#507e4926 executionFeeReceiver:address orderId:int257 trxId:int257 = ExecuteIncreasePerpPositionLimitOrder`
Signature: `ExecuteIncreasePerpPositionLimitOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## CreateDecreasePerpPositionLimitOrder
TLB: `create_decrease_perp_position_limit_order#8c1c25c8 token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool = CreateDecreasePerpPositionLimitOrder`
Signature: `CreateDecreasePerpPositionLimitOrder{token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool}`

## CancelDecreasePerpPositionLimitOrder
TLB: `cancel_decrease_perp_position_limit_order#59d50e93 executionFeeReceiver:address orderId:int257 trxId:int257 = CancelDecreasePerpPositionLimitOrder`
Signature: `CancelDecreasePerpPositionLimitOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## ExecuteDecreasePerpPositionLimitOrder
TLB: `execute_decrease_perp_position_limit_order#05929c16 executionFeeReceiver:address orderId:int257 trxId:int257 = ExecuteDecreasePerpPositionLimitOrder`
Signature: `ExecuteDecreasePerpPositionLimitOrder{executionFeeReceiver:address,orderId:int257,trxId:int257}`

## RBFPositionOrderCreatedEvent
TLB: `rbf_position_order_created_event#cf635798 isIncrease:bool account:address liquidityDelta:int257 executionFee:int257 orderId:int257 = RBFPositionOrderCreatedEvent`
Signature: `RBFPositionOrderCreatedEvent{isIncrease:bool,account:address,liquidityDelta:int257,executionFee:int257,orderId:int257}`

## RBFPositionOrderCancelledEvent
TLB: `rbf_position_order_cancelled_event#245466c4 isIncrease:bool orderId:int257 trxId:int257 = RBFPositionOrderCancelledEvent`
Signature: `RBFPositionOrderCancelledEvent{isIncrease:bool,orderId:int257,trxId:int257}`

## RBFPositionOrderExecutedEvent
TLB: `rbf_position_order_executed_event#912bb14f isIncrease:bool orderId:int257 trxId:int257 = RBFPositionOrderExecutedEvent`
Signature: `RBFPositionOrderExecutedEvent{isIncrease:bool,orderId:int257,trxId:int257}`

## IncreaseLPPositionOrderCreatedEvent
TLB: `increase_lp_position_order_created_event#4cecab36 account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 orderId:int257 = IncreaseLPPositionOrderCreatedEvent`
Signature: `IncreaseLPPositionOrderCreatedEvent{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,orderId:int257}`

## IncreaseLPPositionOrderCancelledEvent
TLB: `increase_lp_position_order_cancelled_event#9985369a orderId:int257 trxId:int257 = IncreaseLPPositionOrderCancelledEvent`
Signature: `IncreaseLPPositionOrderCancelledEvent{orderId:int257,trxId:int257}`

## IncreaseLPPositionOrderExecutedEvent
TLB: `increase_lp_position_order_executed_event#36d9a70c orderId:int257 trxId:int257 = IncreaseLPPositionOrderExecutedEvent`
Signature: `IncreaseLPPositionOrderExecutedEvent{orderId:int257,trxId:int257}`

## DecreaseLPPositionOrderCreatedEvent
TLB: `decrease_lp_position_order_created_event#04df076d account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 orderId:int257 = DecreaseLPPositionOrderCreatedEvent`
Signature: `DecreaseLPPositionOrderCreatedEvent{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,orderId:int257}`

## DecreaseLPPositionOrderCancelledEvent
TLB: `decrease_lp_position_order_cancelled_event#185d15c3 orderId:int257 trxId:int257 = DecreaseLPPositionOrderCancelledEvent`
Signature: `DecreaseLPPositionOrderCancelledEvent{orderId:int257,trxId:int257}`

## DecreaseLPPositionOrderExecutedEvent
TLB: `decrease_lp_position_order_executed_event#9903b72a orderId:int257 trxId:int257 = DecreaseLPPositionOrderExecutedEvent`
Signature: `DecreaseLPPositionOrderExecutedEvent{orderId:int257,trxId:int257}`

## IncreasePerpPositionMarketOrderCreatedEvent
TLB: `increase_perp_position_market_order_created_event#562e4a74 account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 executionFee:int257 orderId:int257 = IncreasePerpPositionMarketOrderCreatedEvent`
Signature: `IncreasePerpPositionMarketOrderCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,orderId:int257}`

## IncreasePerpPositionMarketOrderCancelledEvent
TLB: `increase_perp_position_market_order_cancelled_event#b61379a1 token:^string orderId:int257 trxId:int257 = IncreasePerpPositionMarketOrderCancelledEvent`
Signature: `IncreasePerpPositionMarketOrderCancelledEvent{token:^string,orderId:int257,trxId:int257}`

## IncreasePerpPositionMarketOrderExecutedEvent
TLB: `increase_perp_position_market_order_executed_event#55f35131 token:^string orderId:int257 trxId:int257 = IncreasePerpPositionMarketOrderExecutedEvent`
Signature: `IncreasePerpPositionMarketOrderExecutedEvent{token:^string,orderId:int257,trxId:int257}`

## IncreasePerpPositionLimitOrderCreatedEvent
TLB: `increase_perp_position_limit_order_created_event#c4e4bd2f account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 orderId:int257 = IncreasePerpPositionLimitOrderCreatedEvent`
Signature: `IncreasePerpPositionLimitOrderCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,orderId:int257}`

## IncreasePerpPositionLimitOrderCancelledEvent
TLB: `increase_perp_position_limit_order_cancelled_event#7a990893 token:^string orderId:int257 trxId:int257 = IncreasePerpPositionLimitOrderCancelledEvent`
Signature: `IncreasePerpPositionLimitOrderCancelledEvent{token:^string,orderId:int257,trxId:int257}`

## IncreasePerpPositionLimitOrderExecutedEvent
TLB: `increase_perp_position_limit_order_executed_event#c0ddcafe token:^string orderId:int257 trxId:int257 = IncreasePerpPositionLimitOrderExecutedEvent`
Signature: `IncreasePerpPositionLimitOrderExecutedEvent{token:^string,orderId:int257,trxId:int257}`

## DecreasePerpPositionMarketOrderCreatedEvent
TLB: `decrease_perp_position_market_order_created_event#86f9fb2a account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 acceptablePrice:int257 executionFee:int257 orderId:int257 = DecreasePerpPositionMarketOrderCreatedEvent`
Signature: `DecreasePerpPositionMarketOrderCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,acceptablePrice:int257,executionFee:int257,orderId:int257}`

## DecreasePerpPositionMarketOrderCancelledEvent
TLB: `decrease_perp_position_market_order_cancelled_event#4a233d8e token:^string orderId:int257 trxId:int257 = DecreasePerpPositionMarketOrderCancelledEvent`
Signature: `DecreasePerpPositionMarketOrderCancelledEvent{token:^string,orderId:int257,trxId:int257}`

## DecreasePerpPositionMarketOrderExecutedEvent
TLB: `decrease_perp_position_market_order_executed_event#7960bf7f token:^string orderId:int257 trxId:int257 = DecreasePerpPositionMarketOrderExecutedEvent`
Signature: `DecreasePerpPositionMarketOrderExecutedEvent{token:^string,orderId:int257,trxId:int257}`

## DecreasePerpPositionLimitOrderCreatedEvent
TLB: `decrease_perp_position_limit_order_created_event#c4695b07 account:address token:^string isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 orderId:int257 = DecreasePerpPositionLimitOrderCreatedEvent`
Signature: `DecreasePerpPositionLimitOrderCreatedEvent{account:address,token:^string,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,orderId:int257}`

## DecreasePerpPositionLimitOrderCancelledEvent
TLB: `decrease_perp_position_limit_order_cancelled_event#87b5eebf token:^string orderId:int257 trxId:int257 = DecreasePerpPositionLimitOrderCancelledEvent`
Signature: `DecreasePerpPositionLimitOrderCancelledEvent{token:^string,orderId:int257,trxId:int257}`

## DecreasePerpPositionLimitOrderExecutedEvent
TLB: `decrease_perp_position_limit_order_executed_event#7b0dc0a3 token:^string orderId:int257 trxId:int257 = DecreasePerpPositionLimitOrderExecutedEvent`
Signature: `DecreasePerpPositionLimitOrderExecutedEvent{token:^string,orderId:int257,trxId:int257}`

## TokenConfig
TLB: `_ name:^string enable:bool = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool}`

## ConfigData
TLB: `_ isExecutor:Maybe bool isCompensator:Maybe bool minTimeDelayExecutor:int257 maxTimeDelayExecutor:int257 minTimeDelayTrader:int257 minPendingTimeDelayCompensator:int257 minExecutionFee:int257 gasConsumption:int257 minTonsForStorage:int257 usdtWallet:address pool:address = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,isCompensator:Maybe bool,minTimeDelayExecutor:int257,maxTimeDelayExecutor:int257,minTimeDelayTrader:int257,minPendingTimeDelayCompensator:int257,minExecutionFee:int257,gasConsumption:int257,minTonsForStorage:int257,usdtWallet:address,pool:address}`

## JettonCallback
TLB: `_ orderType:int257 orderId:int257 tokenId:Maybe int257 amount:int257 trxId:int257 = JettonCallback`
Signature: `JettonCallback{orderType:int257,orderId:int257,tokenId:Maybe int257,amount:int257,trxId:int257}`

## RBFPositionOrder
TLB: `_ isIncrease:bool account:address liquidityDelta:int257 executionFee:int257 blockTime:int257 isPending:bool pendingTime:int257 callbackId:Maybe int257 executionFeeReceiver:Maybe address lastOperator:Maybe address = RBFPositionOrder`
Signature: `RBFPositionOrder{isIncrease:bool,account:address,liquidityDelta:int257,executionFee:int257,blockTime:int257,isPending:bool,pendingTime:int257,callbackId:Maybe int257,executionFeeReceiver:Maybe address,lastOperator:Maybe address}`

## IncreaseLPPositionOrder
TLB: `_ account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 blockTime:int257 isPending:bool pendingTime:int257 = IncreaseLPPositionOrder`
Signature: `IncreaseLPPositionOrder{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,blockTime:int257,isPending:bool,pendingTime:int257}`

## DecreaseLPPositionOrder
TLB: `_ account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 blockTime:int257 isPending:bool pendingTime:int257 = DecreaseLPPositionOrder`
Signature: `DecreaseLPPositionOrder{account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,blockTime:int257,isPending:bool,pendingTime:int257}`

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

# Get Methods
Total Get Methods: 4

## configData
Argument: executor
Argument: compensator

## rbfPositionOrder
Argument: orderId

## rbfPositionOrderIndexNext

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
16780: order expired
19305: gas not enough
21064: not compensator
24173: order is pending
24562: execution fee not enough
32637: order not exist
39703: too early
40029: jetton callback not exist
41207: invalid sender
42241: order not pending
54538: too early for compensator