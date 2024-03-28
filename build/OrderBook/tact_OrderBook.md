# TACT Compilation Report
Contract: OrderBook
BOC Size: 15620 bytes

# Types
Total Types: 48

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
TLB: `update_config#a152c301 executor:Maybe address enableExecutor:Maybe bool compensator:Maybe address enableCompensator:Maybe bool minTimeDelayExecutor:Maybe int257 maxTimeDelayExecutor:Maybe int257 minTimeDelayTrader:Maybe int257 minExecutionFee:Maybe int257 gasConsumption:Maybe int257 minTonsForStorage:Maybe int257 usdtWallet:Maybe address pool:Maybe address = UpdateConfig`
Signature: `UpdateConfig{executor:Maybe address,enableExecutor:Maybe bool,compensator:Maybe address,enableCompensator:Maybe bool,minTimeDelayExecutor:Maybe int257,maxTimeDelayExecutor:Maybe int257,minTimeDelayTrader:Maybe int257,minExecutionFee:Maybe int257,gasConsumption:Maybe int257,minTonsForStorage:Maybe int257,usdtWallet:Maybe address,pool:Maybe address}`

## CreateDecreaseRBFPositionOrder
TLB: `create_decrease_rbf_position_order#a11162ed executionFee:int257 liquidityDelta:int257 = CreateDecreaseRBFPositionOrder`
Signature: `CreateDecreaseRBFPositionOrder{executionFee:int257,liquidityDelta:int257}`

## CancelRBFPositionOrder
TLB: `cancel_rbf_position_order#bc6f0603 orderId:int257 trxId:int257 executionFeeReceiver:Maybe address = CancelRBFPositionOrder`
Signature: `CancelRBFPositionOrder{orderId:int257,trxId:int257,executionFeeReceiver:Maybe address}`

## ExecuteRBFPositionOrder
TLB: `execute_rbf_position_order#25ec63c1 orderId:int257 trxId:int257 executionFeeReceiver:Maybe address pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = ExecuteRBFPositionOrder`
Signature: `ExecuteRBFPositionOrder{orderId:int257,trxId:int257,executionFeeReceiver:Maybe address,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateRBFPosition
TLB: `update_rbf_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdateRBFPosition`
Signature: `UpdateRBFPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateRBFPositionSuccess
TLB: `update_rbf_position_success#1cf0cf81 orderId:int257 receive:int257 trxId:uint64 = UpdateRBFPositionSuccess`
Signature: `UpdateRBFPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## CompensateRBFPositionOrder
TLB: `compensate_rbf_position_order#09f91fd2 orderId:int257 trxId:int257 needRefund:bool isExecute:bool executionFeeReceiver:Maybe address pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = CompensateRBFPositionOrder`
Signature: `CompensateRBFPositionOrder{orderId:int257,trxId:int257,needRefund:bool,isExecute:bool,executionFeeReceiver:Maybe address,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## CreateDecreaseLPPositionOrder
TLB: `create_decrease_lp_position_order#7202bd7d executionFee:int257 marginDelta:int257 liquidityDelta:int257 = CreateDecreaseLPPositionOrder`
Signature: `CreateDecreaseLPPositionOrder{executionFee:int257,marginDelta:int257,liquidityDelta:int257}`

## CancelLPPositionOrder
TLB: `cancel_lp_position_order#58157fbb executionFeeReceiver:Maybe address orderId:int257 trxId:int257 = CancelLPPositionOrder`
Signature: `CancelLPPositionOrder{executionFeeReceiver:Maybe address,orderId:int257,trxId:int257}`

## ExecuteLPPositionOrder
TLB: `execute_lp_position_order#d0a15205 executionFeeReceiver:Maybe address orderId:int257 trxId:int257 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = ExecuteLPPositionOrder`
Signature: `ExecuteLPPositionOrder{executionFeeReceiver:Maybe address,orderId:int257,trxId:int257,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## LiquidateLPPositionOrder
TLB: `liquidate_lp_position_order#63dd28a7 executionFeeReceiver:Maybe address account:address trxId:int257 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = LiquidateLPPositionOrder`
Signature: `LiquidateLPPositionOrder{executionFeeReceiver:Maybe address,account:address,trxId:int257,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateLPPosition
TLB: `update_lp_position#fea36b71 orderId:uint64 opType:uint8 account:address marginDelta:int257 liquidityDelta:int257 trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdateLPPosition`
Signature: `UpdateLPPosition{orderId:uint64,opType:uint8,account:address,marginDelta:int257,liquidityDelta:int257,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#4989c7c1 orderId:int257 receive:int257 trxId:uint64 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## CompensateLPPositionOrder
TLB: `compensate_lp_position_order#b7f34c24 orderId:int257 trxId:int257 needRefund:bool isExecute:bool executionFeeReceiver:Maybe address = CompensateLPPositionOrder`
Signature: `CompensateLPPositionOrder{orderId:int257,trxId:int257,needRefund:bool,isExecute:bool,executionFeeReceiver:Maybe address}`

## CreateDecreasePerpPositionOrder
TLB: `create_decrease_perp_position_order#0da78ef9 executionFee:int257 opType:int257 tokenId:int257 isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 = CreateDecreasePerpPositionOrder`
Signature: `CreateDecreasePerpPositionOrder{executionFee:int257,opType:int257,tokenId:int257,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257}`

## CancelPerpPositionOrder
TLB: `cancel_perp_position_order#f99514f3 executionFeeReceiver:Maybe address orderId:int257 trxId:int257 = CancelPerpPositionOrder`
Signature: `CancelPerpPositionOrder{executionFeeReceiver:Maybe address,orderId:int257,trxId:int257}`

## ExecutePerpPositionOrder
TLB: `execute_perp_position_order#e30b9e9b executionFeeReceiver:Maybe address orderId:int257 trxId:int257 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = ExecutePerpPositionOrder`
Signature: `ExecutePerpPositionOrder{executionFeeReceiver:Maybe address,orderId:int257,trxId:int257,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## LiquidatePerpPositionOrder
TLB: `liquidate_perp_position_order#9ab10b46 executionFeeReceiver:Maybe address tokenId:int257 account:address isLong:bool trxId:int257 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = LiquidatePerpPositionOrder`
Signature: `LiquidatePerpPositionOrder{executionFeeReceiver:Maybe address,tokenId:int257,account:address,isLong:bool,trxId:int257,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:int257 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool trxId:uint64 pricesLength:int257 prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}> = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:int257,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,trxId:uint64,pricesLength:int257,prices:dict<int, ^UpdatePrice{tokenId:int257,price:int257}>}`

## UpdatePerpPositionSuccess
TLB: `update_perp_position_success#ef01c2b4 orderId:int257 receive:int257 trxId:uint64 = UpdatePerpPositionSuccess`
Signature: `UpdatePerpPositionSuccess{orderId:int257,receive:int257,trxId:uint64}`

## CompensatePerpPositionOrder
TLB: `compensate_perp_position_order#48618973 orderId:int257 trxId:int257 needRefund:bool isExecute:bool executionFeeReceiver:Maybe address = CompensatePerpPositionOrder`
Signature: `CompensatePerpPositionOrder{orderId:int257,trxId:int257,needRefund:bool,isExecute:bool,executionFeeReceiver:Maybe address}`

## RBFPositionOrderCreatedEvent
TLB: `rbf_position_order_created_event#59e185f1 opType:uint8 account:address liquidityDelta:int257 executionFee:int257 orderId:int257 = RBFPositionOrderCreatedEvent`
Signature: `RBFPositionOrderCreatedEvent{opType:uint8,account:address,liquidityDelta:int257,executionFee:int257,orderId:int257}`

## RBFPositionOrderCancelledEvent
TLB: `rbf_position_order_cancelled_event#9822e3aa opType:uint8 orderId:int257 trxId:int257 = RBFPositionOrderCancelledEvent`
Signature: `RBFPositionOrderCancelledEvent{opType:uint8,orderId:int257,trxId:int257}`

## RBFPositionOrderExecutedEvent
TLB: `rbf_position_order_executed_event#508154c5 opType:uint8 orderId:int257 trxId:int257 = RBFPositionOrderExecutedEvent`
Signature: `RBFPositionOrderExecutedEvent{opType:uint8,orderId:int257,trxId:int257}`

## LPPositionOrderCreatedEvent
TLB: `lp_position_order_created_event#e9304df3 opType:uint8 account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 orderId:int257 = LPPositionOrderCreatedEvent`
Signature: `LPPositionOrderCreatedEvent{opType:uint8,account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,orderId:int257}`

## LPPositionOrderCancelledEvent
TLB: `lp_position_order_cancelled_event#1069ead0 opType:uint8 orderId:int257 trxId:int257 = LPPositionOrderCancelledEvent`
Signature: `LPPositionOrderCancelledEvent{opType:uint8,orderId:int257,trxId:int257}`

## LPPositionOrderExecutedEvent
TLB: `lp_position_order_executed_event#d72f36d8 opType:uint8 orderId:int257 trxId:int257 = LPPositionOrderExecutedEvent`
Signature: `LPPositionOrderExecutedEvent{opType:uint8,orderId:int257,trxId:int257}`

## PerpPositionOrderCreatedEvent
TLB: `perp_position_order_created_event#ee2a9831 opType:uint8 tokenId:int257 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool tpSize:int257 tpPrice:int257 slSize:int257 slPrice:int257 executionFee:int257 orderId:int257 = PerpPositionOrderCreatedEvent`
Signature: `PerpPositionOrderCreatedEvent{opType:uint8,tokenId:int257,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,tpSize:int257,tpPrice:int257,slSize:int257,slPrice:int257,executionFee:int257,orderId:int257}`

## PerpPositionOrderCancelledEvent
TLB: `perp_position_order_cancelled_event#97b426ea opType:uint8 orderId:int257 trxId:int257 = PerpPositionOrderCancelledEvent`
Signature: `PerpPositionOrderCancelledEvent{opType:uint8,orderId:int257,trxId:int257}`

## PerpPositionOrderExecutedEvent
TLB: `perp_position_order_executed_event#fecf3a7f opType:uint8 orderId:int257 trxId:int257 = PerpPositionOrderExecutedEvent`
Signature: `PerpPositionOrderExecutedEvent{opType:uint8,orderId:int257,trxId:int257}`

## TokenConfig
TLB: `_ name:^string enable:bool = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool}`

## ConfigData
TLB: `_ isExecutor:Maybe bool isCompensator:Maybe bool minTimeDelayExecutor:int257 maxTimeDelayExecutor:int257 minTimeDelayTrader:int257 minExecutionFee:int257 gasConsumption:int257 minTonsForStorage:int257 usdtWallet:address pool:address = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,isCompensator:Maybe bool,minTimeDelayExecutor:int257,maxTimeDelayExecutor:int257,minTimeDelayTrader:int257,minExecutionFee:int257,gasConsumption:int257,minTonsForStorage:int257,usdtWallet:address,pool:address}`

## JettonCallback
TLB: `_ orderType:int257 orderId:int257 amount:int257 receiver:address trxId:int257 = JettonCallback`
Signature: `JettonCallback{orderType:int257,orderId:int257,amount:int257,receiver:address,trxId:int257}`

## RBFPositionOrder
TLB: `_ isIncrease:bool account:address liquidityDelta:int257 executionFee:int257 blockTime:int257 isPending:bool callbackId:Maybe int257 executionFeeReceiver:Maybe address lastOperator:Maybe address = RBFPositionOrder`
Signature: `RBFPositionOrder{isIncrease:bool,account:address,liquidityDelta:int257,executionFee:int257,blockTime:int257,isPending:bool,callbackId:Maybe int257,executionFeeReceiver:Maybe address,lastOperator:Maybe address}`

## LPPositionOrder
TLB: `_ opType:uint8 account:address marginDelta:int257 liquidityDelta:int257 executionFee:int257 blockTime:int257 isPending:bool callbackId:Maybe int257 executionFeeReceiver:Maybe address lastOperator:Maybe address = LPPositionOrder`
Signature: `LPPositionOrder{opType:uint8,account:address,marginDelta:int257,liquidityDelta:int257,executionFee:int257,blockTime:int257,isPending:bool,callbackId:Maybe int257,executionFeeReceiver:Maybe address,lastOperator:Maybe address}`

## PerpPositionOrder
TLB: `_ opType:uint8 tokenId:int257 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:int257 blockTime:int257 isPending:bool callbackId:Maybe int257 executionFeeReceiver:Maybe address lastOperator:Maybe address = PerpPositionOrder`
Signature: `PerpPositionOrder{opType:uint8,tokenId:int257,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:int257,blockTime:int257,isPending:bool,callbackId:Maybe int257,executionFeeReceiver:Maybe address,lastOperator:Maybe address}`

## PerpPositionOrderEx
TLB: `_ tpSize:int257 tpPrice:int257 slSize:int257 slPrice:int257 = PerpPositionOrderEx`
Signature: `PerpPositionOrderEx{tpSize:int257,tpPrice:int257,slSize:int257,slPrice:int257}`

## UpdatePrice
TLB: `_ tokenId:int257 price:int257 = UpdatePrice`
Signature: `UpdatePrice{tokenId:int257,price:int257}`

# Get Methods
Total Get Methods: 8

## configData
Argument: executor
Argument: compensator

## rbfPositionOrder
Argument: orderId

## rbfPositionOrderIndexNext

## lpPositionOrder
Argument: orderId

## lpPositionOrderIndexNext

## perpPositionOrder
Argument: orderId

## perpPositionOrderIndexNext

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
24173: order is pending
24562: execution fee not enough
32637: order not exist
39703: too early
41207: invalid sender