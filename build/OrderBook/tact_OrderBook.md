# TACT Compilation Report
Contract: OrderBook
BOC Size: 10220 bytes

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

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 queryId:uint64 amount:coins receiver:address responseDestination:Maybe address customPayload:Maybe ^cell forwardTonAmount:coins forwardPayload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{queryId:uint64,amount:coins,receiver:address,responseDestination:Maybe address,customPayload:Maybe ^cell,forwardTonAmount:coins,forwardPayload:remainder<slice>}`

## TokenNotification
TLB: `token_notification#7362d09c queryId:uint64 amount:coins from:address forwardPayload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{queryId:uint64,amount:coins,from:address,forwardPayload:remainder<slice>}`

## TokenExcesses
TLB: `token_excesses#d53276db queryId:uint64 = TokenExcesses`
Signature: `TokenExcesses{queryId:uint64}`

## UpdateConfig
TLB: `update_config#408e9f7c executor:Maybe address enableExecutor:Maybe bool maxTimeDelayExecutor:int257 minTimeDelayTrader:int257 minExecutionFee:coins gasConsumption:coins minTonsForStorage:coins usdtWallet:address pool:address = UpdateConfig`
Signature: `UpdateConfig{executor:Maybe address,enableExecutor:Maybe bool,maxTimeDelayExecutor:int257,minTimeDelayTrader:int257,minExecutionFee:coins,gasConsumption:coins,minTonsForStorage:coins,usdtWallet:address,pool:address}`

## CreateDecreaseLPPositionOrder
TLB: `create_decrease_lp_position_order#89f311c8 executionFee:coins liquidityDelta:int257 = CreateDecreaseLPPositionOrder`
Signature: `CreateDecreaseLPPositionOrder{executionFee:coins,liquidityDelta:int257}`

## CancelLPPositionOrder
TLB: `cancel_lp_position_order#57165d2b orderId:uint64 trxId:int257 executionFeeReceiver:Maybe address = CancelLPPositionOrder`
Signature: `CancelLPPositionOrder{orderId:uint64,trxId:int257,executionFeeReceiver:Maybe address}`

## ExecuteLPPositionOrder
TLB: `execute_lp_position_order#56912219 orderId:uint64 trxId:int257 executionFeeReceiver:Maybe address pricesLength:uint64 prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}> = ExecuteLPPositionOrder`
Signature: `ExecuteLPPositionOrder{orderId:uint64,trxId:int257,executionFeeReceiver:Maybe address,pricesLength:uint64,prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}>}`

## UpdateLPPosition
TLB: `update_lp_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:int257 pricesLength:uint64 prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}> = UpdateLPPosition`
Signature: `UpdateLPPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:int257,pricesLength:uint64,prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}>}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#1cf0cf81 orderId:uint64 receive:int257 trxId:int257 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:uint64,receive:int257,trxId:int257}`

## CompensateOrder
TLB: `compensate_order#e622476c orderType:Maybe int257 orderId:uint64 trxId:int257 refundReceiver:Maybe address refundAmount:int257 executionFeeReceiver:Maybe address executionFee:coins = CompensateOrder`
Signature: `CompensateOrder{orderType:Maybe int257,orderId:uint64,trxId:int257,refundReceiver:Maybe address,refundAmount:int257,executionFeeReceiver:Maybe address,executionFee:coins}`

## CreateDecreasePerpPositionOrder
TLB: `create_decrease_perp_position_order#d5c87eb9 executionFee:coins opType:uint8 tokenId:uint64 isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 = CreateDecreasePerpPositionOrder`
Signature: `CreateDecreasePerpPositionOrder{executionFee:coins,opType:uint8,tokenId:uint64,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257}`

## CancelPerpPositionOrder
TLB: `cancel_perp_position_order#e95fd524 executionFeeReceiver:Maybe address orderId:uint64 trxId:int257 = CancelPerpPositionOrder`
Signature: `CancelPerpPositionOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:int257}`

## ExecutePerpPositionOrder
TLB: `execute_perp_position_order#87c410d0 executionFeeReceiver:Maybe address orderId:uint64 trxId:int257 pricesLength:uint64 prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}> = ExecutePerpPositionOrder`
Signature: `ExecutePerpPositionOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:int257,pricesLength:uint64,prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}>}`

## LiquidatePerpPosition
TLB: `liquidate_perp_position#33f0a29c executionFeeReceiver:Maybe address tokenId:uint64 account:address isLong:bool trxId:int257 pricesLength:uint64 prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}> = LiquidatePerpPosition`
Signature: `LiquidatePerpPosition{executionFeeReceiver:Maybe address,tokenId:uint64,account:address,isLong:bool,trxId:int257,pricesLength:uint64,prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}>}`

## ADLPerpPosition
TLB: `adl_perp_position#316a502c executionFeeReceiver:Maybe address tokenId:uint64 account:address isLong:bool sizeDelta:int257 trxId:int257 pricesLength:uint64 prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}> = ADLPerpPosition`
Signature: `ADLPerpPosition{executionFeeReceiver:Maybe address,tokenId:uint64,account:address,isLong:bool,sizeDelta:int257,trxId:int257,pricesLength:uint64,prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}>}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool trxId:int257 pricesLength:uint64 prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}> = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,trxId:int257,pricesLength:uint64,prices:dict<int, ^UpdatePrice{tokenId:uint64,price:int257}>}`

## UpdatePerpPositionSuccess
TLB: `update_perp_position_success#ef01c2b4 orderId:uint64 receive:int257 trxId:int257 = UpdatePerpPositionSuccess`
Signature: `UpdatePerpPositionSuccess{orderId:uint64,receive:int257,trxId:int257}`

## LPPositionOrderCreatedEvent
TLB: `lp_position_order_created_event#c74d22d3 opType:uint8 account:address liquidityDelta:int257 executionFee:coins orderId:int257 = LPPositionOrderCreatedEvent`
Signature: `LPPositionOrderCreatedEvent{opType:uint8,account:address,liquidityDelta:int257,executionFee:coins,orderId:int257}`

## LPPositionOrderCancelledEvent
TLB: `lp_position_order_cancelled_event#4f8e6c33 opType:uint8 orderId:uint64 trxId:int257 = LPPositionOrderCancelledEvent`
Signature: `LPPositionOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:int257}`

## LPPositionOrderExecutedEvent
TLB: `lp_position_order_executed_event#bbbcd9c2 opType:uint8 orderId:uint64 trxId:int257 = LPPositionOrderExecutedEvent`
Signature: `LPPositionOrderExecutedEvent{opType:uint8,orderId:uint64,trxId:int257}`

## PerpPositionOrderCreatedEvent
TLB: `perp_position_order_created_event#99fc27c0 opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool tpSize:int257 tpPrice:int257 slSize:int257 slPrice:int257 executionFee:coins orderId:int257 = PerpPositionOrderCreatedEvent`
Signature: `PerpPositionOrderCreatedEvent{opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,tpSize:int257,tpPrice:int257,slSize:int257,slPrice:int257,executionFee:coins,orderId:int257}`

## PerpPositionOrderCancelledEvent
TLB: `perp_position_order_cancelled_event#915a5491 opType:uint8 orderId:uint64 trxId:int257 = PerpPositionOrderCancelledEvent`
Signature: `PerpPositionOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:int257}`

## PerpPositionOrderExecutedEvent
TLB: `perp_position_order_executed_event#3927ec7e opType:uint8 orderId:uint64 trxId:int257 = PerpPositionOrderExecutedEvent`
Signature: `PerpPositionOrderExecutedEvent{opType:uint8,orderId:uint64,trxId:int257}`

## CompensateOrderEvent
TLB: `compensate_order_event#66a5401a orderType:Maybe int257 orderId:uint64 trxId:int257 refundReceiver:Maybe address refundAmount:int257 executionFeeReceiver:Maybe address executionFee:coins = CompensateOrderEvent`
Signature: `CompensateOrderEvent{orderType:Maybe int257,orderId:uint64,trxId:int257,refundReceiver:Maybe address,refundAmount:int257,executionFeeReceiver:Maybe address,executionFee:coins}`

## ConfigData
TLB: `_ isExecutor:Maybe bool maxTimeDelayExecutor:int257 minTimeDelayTrader:int257 minExecutionFee:coins gasConsumption:coins minTonsForStorage:coins usdtWallet:address pool:address = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,maxTimeDelayExecutor:int257,minTimeDelayTrader:int257,minExecutionFee:coins,gasConsumption:coins,minTonsForStorage:coins,usdtWallet:address,pool:address}`

## LPPositionOrder
TLB: `_ isIncrease:bool account:address liquidityDelta:int257 executionFee:coins blockTime:int257 isPending:bool executionFeeReceiver:Maybe address lastOperator:Maybe address = LPPositionOrder`
Signature: `LPPositionOrder{isIncrease:bool,account:address,liquidityDelta:int257,executionFee:coins,blockTime:int257,isPending:bool,executionFeeReceiver:Maybe address,lastOperator:Maybe address}`

## PerpPositionOrder
TLB: `_ opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:coins blockTime:int257 isPending:bool executionFeeReceiver:Maybe address lastOperator:Maybe address = PerpPositionOrder`
Signature: `PerpPositionOrder{opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:coins,blockTime:int257,isPending:bool,executionFeeReceiver:Maybe address,lastOperator:Maybe address}`

## PerpPositionOrderEx
TLB: `_ tpSize:int257 tpPrice:int257 slSize:int257 slPrice:int257 = PerpPositionOrderEx`
Signature: `PerpPositionOrderEx{tpSize:int257,tpPrice:int257,slSize:int257,slPrice:int257}`

## UpdatePrice
TLB: `_ tokenId:uint64 price:int257 = UpdatePrice`
Signature: `UpdatePrice{tokenId:uint64,price:int257}`

# Get Methods
Total Get Methods: 6

## configData
Argument: executor

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
42241: order not pending
54499: invalid op type