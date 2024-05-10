# TACT Compilation Report
Contract: OrderBook
BOC Size: 16153 bytes

# Types
Total Types: 45

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
TLB: `update_config#92cd3362 executorLength:int257 executors:dict<int, ^ExecutorParam{executor:address,enable:bool}> maxTimeDelayExecutor:int257 minTimeDelayTrader:int257 lpMinExecutionFee:coins perpMinExecutionFee:coins lpGasConsumption:coins perpGasConsumption:coins poolLpGasConsumption:coins poolPerpGasConsumption:coins minTonsForStorage:coins gasTransferJetton:coins usdtWallet:address pool:address = UpdateConfig`
Signature: `UpdateConfig{executorLength:int257,executors:dict<int, ^ExecutorParam{executor:address,enable:bool}>,maxTimeDelayExecutor:int257,minTimeDelayTrader:int257,lpMinExecutionFee:coins,perpMinExecutionFee:coins,lpGasConsumption:coins,perpGasConsumption:coins,poolLpGasConsumption:coins,poolPerpGasConsumption:coins,minTonsForStorage:coins,gasTransferJetton:coins,usdtWallet:address,pool:address}`

## SendProtocolFee
TLB: `send_protocol_fee#5dd58461 trxId:uint64 feeReceiver:address amount:int257 = SendProtocolFee`
Signature: `SendProtocolFee{trxId:uint64,feeReceiver:address,amount:int257}`

## CreateDecreaseLPPositionOrder
TLB: `create_decrease_lp_position_order#25b21724 executionFee:coins liquidityDelta:uint128 trxId:uint64 = CreateDecreaseLPPositionOrder`
Signature: `CreateDecreaseLPPositionOrder{executionFee:coins,liquidityDelta:uint128,trxId:uint64}`

## CancelLPPositionOrder
TLB: `cancel_lp_position_order#7d91eb36 orderId:uint64 trxId:uint64 executionFeeReceiver:Maybe address = CancelLPPositionOrder`
Signature: `CancelLPPositionOrder{orderId:uint64,trxId:uint64,executionFeeReceiver:Maybe address}`

## ExecuteLPPositionOrder
TLB: `execute_lp_position_order#1286b98b orderId:uint64 trxId:uint64 executionFeeReceiver:Maybe address = ExecuteLPPositionOrder`
Signature: `ExecuteLPPositionOrder{orderId:uint64,trxId:uint64,executionFeeReceiver:Maybe address}`

## UpdateLPPosition
TLB: `update_lp_position#e89cd45f isIncrease:bool orderId:uint64 account:address liquidityDelta:int257 trxId:uint64 = UpdateLPPosition`
Signature: `UpdateLPPosition{isIncrease:bool,orderId:uint64,account:address,liquidityDelta:int257,trxId:uint64}`

## UpdateLPPositionSuccess
TLB: `update_lp_position_success#1cf0cf81 orderId:uint64 receive:int257 trxId:uint64 = UpdateLPPositionSuccess`
Signature: `UpdateLPPositionSuccess{orderId:uint64,receive:int257,trxId:uint64}`

## CreateCompensate
TLB: `create_compensate#af93b5c8 orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:uint128 executionFeeReceiver:Maybe address executionFee:coins = CreateCompensate`
Signature: `CreateCompensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:uint128,executionFeeReceiver:Maybe address,executionFee:coins}`

## CancelCompensate
TLB: `cancel_compensate#58def8ba compensateId:uint64 trxId:uint64 = CancelCompensate`
Signature: `CancelCompensate{compensateId:uint64,trxId:uint64}`

## ExecuteCompensate
TLB: `execute_compensate#cc1ca2f0 compensateId:uint64 trxId:uint64 = ExecuteCompensate`
Signature: `ExecuteCompensate{compensateId:uint64,trxId:uint64}`

## CreateDecreasePerpPositionOrder
TLB: `create_decrease_perp_position_order#6a923ddb executionFee:coins tokenId:uint64 isLong:bool marginDelta:uint128 sizeDelta:uint128 triggerPrice:uint128 trxId:uint64 = CreateDecreasePerpPositionOrder`
Signature: `CreateDecreasePerpPositionOrder{executionFee:coins,tokenId:uint64,isLong:bool,marginDelta:uint128,sizeDelta:uint128,triggerPrice:uint128,trxId:uint64}`

## CreateTpSlPerpPositionOrder
TLB: `create_tp_sl_perp_position_order#23c72f58 executionFee:coins tokenId:uint64 isLong:bool tpSize:uint128 tpPrice:uint128 slSize:uint128 slPrice:uint128 trxId:uint64 = CreateTpSlPerpPositionOrder`
Signature: `CreateTpSlPerpPositionOrder{executionFee:coins,tokenId:uint64,isLong:bool,tpSize:uint128,tpPrice:uint128,slSize:uint128,slPrice:uint128,trxId:uint64}`

## CancelPerpPositionOrder
TLB: `cancel_perp_position_order#c1f953f2 executionFeeReceiver:Maybe address orderId:uint64 trxId:uint64 = CancelPerpPositionOrder`
Signature: `CancelPerpPositionOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:uint64}`

## ExecutePerpPositionOrder
TLB: `execute_perp_position_order#9dfa0ed8 executionFeeReceiver:Maybe address orderId:uint64 trxId:uint64 tokenId:uint64 price:int257 premiumRate:int257 = ExecutePerpPositionOrder`
Signature: `ExecutePerpPositionOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:uint64,tokenId:uint64,price:int257,premiumRate:int257}`

## LiquidatePerpPosition
TLB: `liquidate_perp_position#23343bb4 liquidationFeeReceiver:Maybe address tokenId:uint64 account:address isLong:bool trxId:uint64 price:int257 premiumRate:int257 = LiquidatePerpPosition`
Signature: `LiquidatePerpPosition{liquidationFeeReceiver:Maybe address,tokenId:uint64,account:address,isLong:bool,trxId:uint64,price:int257,premiumRate:int257}`

## ADLPerpPosition
TLB: `adl_perp_position#ec33cc52 tokenId:uint64 account:address isLong:bool marginDelta:uint128 sizeDelta:uint128 trxId:uint64 price:int257 premiumRate:int257 = ADLPerpPosition`
Signature: `ADLPerpPosition{tokenId:uint64,account:address,isLong:bool,marginDelta:uint128,sizeDelta:uint128,trxId:uint64,price:int257,premiumRate:int257}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool trxId:uint64 price:int257 premiumRate:int257 = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,trxId:uint64,price:int257,premiumRate:int257}`

## UpdatePerpPositionSuccess
TLB: `update_perp_position_success#ef01c2b4 orderId:uint64 receive:int257 trxId:uint64 = UpdatePerpPositionSuccess`
Signature: `UpdatePerpPositionSuccess{orderId:uint64,receive:int257,trxId:uint64}`

## LPPositionOrderCreatedEvent
TLB: `lp_position_order_created_event#b417cc6c opType:uint8 account:address liquidityDelta:int257 executionFee:coins orderId:int257 trxId:uint64 = LPPositionOrderCreatedEvent`
Signature: `LPPositionOrderCreatedEvent{opType:uint8,account:address,liquidityDelta:int257,executionFee:coins,orderId:int257,trxId:uint64}`

## LPPositionOrderCancelledEvent
TLB: `lp_position_order_cancelled_event#4b658ac0 opType:uint8 orderId:uint64 trxId:uint64 = LPPositionOrderCancelledEvent`
Signature: `LPPositionOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## LPPositionOrderExecutedEvent
TLB: `lp_position_order_executed_event#b3055fd4 opType:uint8 orderId:uint64 trxId:uint64 = LPPositionOrderExecutedEvent`
Signature: `LPPositionOrderExecutedEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## PerpPositionOrderCreatedEvent
TLB: `perp_position_order_created_event#7263615d opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool tpSize:int257 tpPrice:int257 slSize:int257 slPrice:int257 executionFee:coins orderId:int257 trxId:uint64 = PerpPositionOrderCreatedEvent`
Signature: `PerpPositionOrderCreatedEvent{opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,tpSize:int257,tpPrice:int257,slSize:int257,slPrice:int257,executionFee:coins,orderId:int257,trxId:uint64}`

## PerpPositionOrderCancelledEvent
TLB: `perp_position_order_cancelled_event#803e6175 opType:uint8 orderId:uint64 trxId:uint64 = PerpPositionOrderCancelledEvent`
Signature: `PerpPositionOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## PerpPositionOrderExecutedEvent
TLB: `perp_position_order_executed_event#a1bb0b3f opType:uint8 orderId:uint64 trxId:uint64 = PerpPositionOrderExecutedEvent`
Signature: `PerpPositionOrderExecutedEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## CompensateCreatedEvent
TLB: `compensate_created_event#17e6cb93 compensateId:uint64 orderType:Maybe int257 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:int257 executionFeeReceiver:Maybe address executionFee:coins unlockTime:int257 = CompensateCreatedEvent`
Signature: `CompensateCreatedEvent{compensateId:uint64,orderType:Maybe int257,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:int257,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:int257}`

## CompensateCancelledEvent
TLB: `compensate_cancelled_event#4bc341d5 compensateId:uint64 trxId:uint64 = CompensateCancelledEvent`
Signature: `CompensateCancelledEvent{compensateId:uint64,trxId:uint64}`

## CompensateExecutedEvent
TLB: `compensate_executed_event#db45e438 compensateId:uint64 trxId:uint64 = CompensateExecutedEvent`
Signature: `CompensateExecutedEvent{compensateId:uint64,trxId:uint64}`

## ConfigData
TLB: `_ isExecutor:Maybe bool maxTimeDelayExecutor:int257 minTimeDelayTrader:int257 lpMinExecutionFee:coins perpMinExecutionFee:coins lpGasConsumption:coins perpGasConsumption:coins poolLpGasConsumption:coins poolPerpGasConsumption:coins minTonsForStorage:coins gasTransferJetton:coins totalExecutionFee:coins usdtWallet:address pool:address = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,maxTimeDelayExecutor:int257,minTimeDelayTrader:int257,lpMinExecutionFee:coins,perpMinExecutionFee:coins,lpGasConsumption:coins,perpGasConsumption:coins,poolLpGasConsumption:coins,poolPerpGasConsumption:coins,minTonsForStorage:coins,gasTransferJetton:coins,totalExecutionFee:coins,usdtWallet:address,pool:address}`

## ExecutorParam
TLB: `_ executor:address enable:bool = ExecutorParam`
Signature: `ExecutorParam{executor:address,enable:bool}`

## LPPositionOrder
TLB: `_ isIncrease:bool account:address liquidityDelta:int257 executionFee:coins blockTime:int257 isPending:bool executionFeeReceiver:address lastOperator:Maybe address = LPPositionOrder`
Signature: `LPPositionOrder{isIncrease:bool,account:address,liquidityDelta:int257,executionFee:coins,blockTime:int257,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address}`

## PerpPositionOrder
TLB: `_ opType:uint8 tokenId:uint64 account:address isLong:bool marginDelta:int257 sizeDelta:int257 triggerPrice:int257 triggerAbove:bool executionFee:coins blockTime:int257 isPending:bool executionFeeReceiver:address lastOperator:Maybe address = PerpPositionOrder`
Signature: `PerpPositionOrder{opType:uint8,tokenId:uint64,account:address,isLong:bool,marginDelta:int257,sizeDelta:int257,triggerPrice:int257,triggerAbove:bool,executionFee:coins,blockTime:int257,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address}`

## PerpPositionOrderEx
TLB: `_ tpSize:int257 tpPrice:int257 slSize:int257 slPrice:int257 executionFee:int257 = PerpPositionOrderEx`
Signature: `PerpPositionOrderEx{tpSize:int257,tpPrice:int257,slSize:int257,slPrice:int257,executionFee:int257}`

## UpdatePrice
TLB: `_ tokenId:uint64 price:int257 = UpdatePrice`
Signature: `UpdatePrice{tokenId:uint64,price:int257}`

## Compensate
TLB: `_ orderType:Maybe int257 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:int257 executionFeeReceiver:Maybe address executionFee:coins unlockTime:int257 = Compensate`
Signature: `Compensate{orderType:Maybe int257,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:int257,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:int257}`

# Get Methods
Total Get Methods: 7

## configData
Argument: executor

## lpPositionOrder
Argument: orderId

## lpPositionOrderIndexNext

## perpPositionOrder
Argument: orderId

## perpPositionOrderIndexNext

## stopped

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
11120: compensate not exist
16780: order expired
19305: gas not enough
24173: order is pending
24562: execution fee not enough
31425: not reach unlock time
32637: order not exist
39703: too early
40368: Contract stopped
41207: invalid sender
42241: order not pending
51911: token not match
53296: Contract not stopped