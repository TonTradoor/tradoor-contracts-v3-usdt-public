# TACT Compilation Report
Contract: OrderBook
BOC Size: 16108 bytes

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

## JettonTransfer
TLB: `jetton_transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:Maybe address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonTransfer`
Signature: `JettonTransfer{query_id:uint64,amount:coins,destination:address,response_destination:Maybe address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## JettonTransferNotification
TLB: `jetton_transfer_notification#7362d09c query_id:uint64 amount:coins sender:address forward_payload:remainder<slice> = JettonTransferNotification`
Signature: `JettonTransferNotification{query_id:uint64,amount:coins,sender:address,forward_payload:remainder<slice>}`

## JettonBurn
TLB: `jetton_burn#595f07bc query_id:uint64 amount:coins response_destination:address custom_payload:Maybe ^cell = JettonBurn`
Signature: `JettonBurn{query_id:uint64,amount:coins,response_destination:address,custom_payload:Maybe ^cell}`

## DeployTLP
TLB: `deploy_tlp#f6ba9e09 jetton_content:^cell = DeployTLP`
Signature: `DeployTLP{jetton_content:^cell}`

## UpdateConfig
TLB: `update_config#9b32c809 orderLockTime:Maybe uint32 gasConfig:Maybe GasConfig{lpMinExecutionFee:coins,perpMinExecutionFee:coins,lpGasConsumption:coins,perpGasConsumption:coins,poolLpGasConsumption:coins,poolPerpGasConsumption:coins,minTonsForStorage:coins,gasTransferJetton:coins,gasForBurnTlp:coins} executorConfig:Maybe ExecutorConfig{executors:dict<address, bool>,lpExecutors:dict<address, bool>,compensator:address} contractConfig:Maybe ContractConfig{tlpWallet:address,jettonWallet:address,pool:address} = UpdateConfig`
Signature: `UpdateConfig{orderLockTime:Maybe uint32,gasConfig:Maybe GasConfig{lpMinExecutionFee:coins,perpMinExecutionFee:coins,lpGasConsumption:coins,perpGasConsumption:coins,poolLpGasConsumption:coins,poolPerpGasConsumption:coins,minTonsForStorage:coins,gasTransferJetton:coins,gasForBurnTlp:coins},executorConfig:Maybe ExecutorConfig{executors:dict<address, bool>,lpExecutors:dict<address, bool>,compensator:address},contractConfig:Maybe ContractConfig{tlpWallet:address,jettonWallet:address,pool:address}}`

## SendProtocolFee
TLB: `send_protocol_fee#5dd58461 trxId:uint64 feeReceiver:address amount:coins = SendProtocolFee`
Signature: `SendProtocolFee{trxId:uint64,feeReceiver:address,amount:coins}`

## CancelLiquidityOrder
TLB: `cancel_liquidity_order#481e7561 orderId:uint64 trxId:uint64 executionFeeReceiver:Maybe address = CancelLiquidityOrder`
Signature: `CancelLiquidityOrder{orderId:uint64,trxId:uint64,executionFeeReceiver:Maybe address}`

## ExecuteLiquidityOrder
TLB: `execute_liquidity_order#abcf587b orderId:uint64 trxId:uint64 executionFeeReceiver:Maybe address prices:dict<uint16, uint128> lpFundingFeeGrowth:coins rolloverFeeGrowth:coins = ExecuteLiquidityOrder`
Signature: `ExecuteLiquidityOrder{orderId:uint64,trxId:uint64,executionFeeReceiver:Maybe address,prices:dict<uint16, uint128>,lpFundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## UpdateLiquidityPool
TLB: `update_liquidity_pool#5523d11e isIncrease:bool orderId:uint64 account:address jettonDelta:coins trxId:uint64 prices:dict<uint16, uint128> lpFundingFeeGrowth:coins rolloverFeeGrowth:coins = UpdateLiquidityPool`
Signature: `UpdateLiquidityPool{isIncrease:bool,orderId:uint64,account:address,jettonDelta:coins,trxId:uint64,prices:dict<uint16, uint128>,lpFundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## LiquidityPoolUpdated
TLB: `liquidity_pool_updated#cd6336bc isIncrease:bool orderId:uint64 tlpPrice:uint128 tlpDelta:coins jettonDelta:coins trxId:uint64 = LiquidityPoolUpdated`
Signature: `LiquidityPoolUpdated{isIncrease:bool,orderId:uint64,tlpPrice:uint128,tlpDelta:coins,jettonDelta:coins,trxId:uint64}`

## CreateCompensate
TLB: `create_compensate#fc33877d orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:coins executionFeeReceiver:Maybe address executionFee:coins = CreateCompensate`
Signature: `CreateCompensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins}`

## ExecuteOrCancelCompensate
TLB: `execute_or_cancel_compensate#88e7f927 isCancel:bool compensateId:uint64 trxId:uint64 = ExecuteOrCancelCompensate`
Signature: `ExecuteOrCancelCompensate{isCancel:bool,compensateId:uint64,trxId:uint64}`

## CreateDecreasePerpOrder
TLB: `create_decrease_perp_order#eef5924d executionFee:coins tokenId:uint16 isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 trxId:uint64 requestTime:uint32 = CreateDecreasePerpOrder`
Signature: `CreateDecreasePerpOrder{executionFee:coins,tokenId:uint16,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,trxId:uint64,requestTime:uint32}`

## CreateTpSlPerpOrder
TLB: `create_tp_sl_perp_order#f94f80bb executionFee:coins tokenId:uint16 isLong:bool tpSize:coins tpPrice:uint128 slSize:coins slPrice:uint128 trxId:uint64 requestTime:uint32 = CreateTpSlPerpOrder`
Signature: `CreateTpSlPerpOrder{executionFee:coins,tokenId:uint16,isLong:bool,tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,trxId:uint64,requestTime:uint32}`

## CancelPerpOrder
TLB: `cancel_perp_order#099ff4a3 executionFeeReceiver:Maybe address orderId:uint64 trxId:uint64 = CancelPerpOrder`
Signature: `CancelPerpOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:uint64}`

## ExecutePerpOrder
TLB: `execute_perp_order#a6acee84 executionFeeReceiver:Maybe address orderId:uint64 trxId:uint64 tokenId:uint16 price:uint128 premiumRate:uint32 fundingFeeGrowth:coins rolloverFeeGrowth:coins = ExecutePerpOrder`
Signature: `ExecutePerpOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:uint64,tokenId:uint16,price:uint128,premiumRate:uint32,fundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## LiquidatePerpPosition
TLB: `liquidate_perp_position#159c658d liquidationFeeReceiver:Maybe address tokenId:uint16 account:address isLong:bool trxId:uint64 price:uint128 premiumRate:uint32 fundingFeeGrowth:coins rolloverFeeGrowth:coins = LiquidatePerpPosition`
Signature: `LiquidatePerpPosition{liquidationFeeReceiver:Maybe address,tokenId:uint16,account:address,isLong:bool,trxId:uint64,price:uint128,premiumRate:uint32,fundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## ADLPerpPosition
TLB: `adl_perp_position#cbc5c561 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins trxId:uint64 price:uint128 premiumRate:uint32 fundingFeeGrowth:coins rolloverFeeGrowth:coins = ADLPerpPosition`
Signature: `ADLPerpPosition{tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,trxId:uint64,price:uint128,premiumRate:uint32,fundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## UpdatePerpPosition
TLB: `update_perp_position#ff57e557 orderId:uint64 opType:uint8 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 triggerAbove:bool trxId:uint64 price:uint128 premiumRate:uint32 fundingFeeGrowth:coins rolloverFeeGrowth:coins = UpdatePerpPosition`
Signature: `UpdatePerpPosition{orderId:uint64,opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,trxId:uint64,price:uint128,premiumRate:uint32,fundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

## PerpPositionUpdated
TLB: `perp_position_updated#ef01c2b4 orderId:uint64 payout:coins trxId:uint64 = PerpPositionUpdated`
Signature: `PerpPositionUpdated{orderId:uint64,payout:coins,trxId:uint64}`

## LiquidityOrderCreatedEvent
TLB: `liquidity_order_created_event#c4d020e4 opType:uint8 account:address jettonDelta:coins executionFee:coins orderId:uint64 trxId:uint64 = LiquidityOrderCreatedEvent`
Signature: `LiquidityOrderCreatedEvent{opType:uint8,account:address,jettonDelta:coins,executionFee:coins,orderId:uint64,trxId:uint64}`

## LiquidityOrderCancelledEvent
TLB: `liquidity_order_cancelled_event#b9b03cbc opType:uint8 orderId:uint64 trxId:uint64 = LiquidityOrderCancelledEvent`
Signature: `LiquidityOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## LiquidityOrderExecutedEvent
TLB: `liquidity_order_executed_event#2a138100 opType:uint8 orderId:uint64 trxId:uint64 = LiquidityOrderExecutedEvent`
Signature: `LiquidityOrderExecutedEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## PerpOrderCreatedEvent
TLB: `perp_order_created_event#66ef465f opType:uint8 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 triggerAbove:bool executionFee:coins orderId:uint64 trxId:uint64 blockTime:uint32 requestTime:uint32 = PerpOrderCreatedEvent`
Signature: `PerpOrderCreatedEvent{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,orderId:uint64,trxId:uint64,blockTime:uint32,requestTime:uint32}`

## PerpOrderCancelledEvent
TLB: `perp_order_cancelled_event#f2c5aeac opType:uint8 orderId:uint64 trxId:uint64 = PerpOrderCancelledEvent`
Signature: `PerpOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## PerpOrderExecutedEvent
TLB: `perp_order_executed_event#fc1cdc95 opType:uint8 orderId:uint64 trxId:uint64 = PerpOrderExecutedEvent`
Signature: `PerpOrderExecutedEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## CompensateCreatedEvent
TLB: `compensate_created_event#9628ba96 compensateId:uint64 orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:coins executionFeeReceiver:Maybe address executionFee:coins unlockTime:uint32 = CompensateCreatedEvent`
Signature: `CompensateCreatedEvent{compensateId:uint64,orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32}`

## CompensateCancelledEvent
TLB: `compensate_cancelled_event#4bc341d5 compensateId:uint64 trxId:uint64 = CompensateCancelledEvent`
Signature: `CompensateCancelledEvent{compensateId:uint64,trxId:uint64}`

## CompensateExecutedEvent
TLB: `compensate_executed_event#db45e438 compensateId:uint64 trxId:uint64 = CompensateExecutedEvent`
Signature: `CompensateExecutedEvent{compensateId:uint64,trxId:uint64}`

## GasConfig
TLB: `_ lpMinExecutionFee:coins perpMinExecutionFee:coins lpGasConsumption:coins perpGasConsumption:coins poolLpGasConsumption:coins poolPerpGasConsumption:coins minTonsForStorage:coins gasTransferJetton:coins gasForBurnTlp:coins = GasConfig`
Signature: `GasConfig{lpMinExecutionFee:coins,perpMinExecutionFee:coins,lpGasConsumption:coins,perpGasConsumption:coins,poolLpGasConsumption:coins,poolPerpGasConsumption:coins,minTonsForStorage:coins,gasTransferJetton:coins,gasForBurnTlp:coins}`

## ExecutorConfig
TLB: `_ executors:dict<address, bool> lpExecutors:dict<address, bool> compensator:address = ExecutorConfig`
Signature: `ExecutorConfig{executors:dict<address, bool>,lpExecutors:dict<address, bool>,compensator:address}`

## ContractConfig
TLB: `_ tlpWallet:address jettonWallet:address pool:address = ContractConfig`
Signature: `ContractConfig{tlpWallet:address,jettonWallet:address,pool:address}`

## ConfigData
TLB: `_ isExecutor:Maybe bool orderLockTime:uint32 lpMinExecutionFee:coins perpMinExecutionFee:coins lpGasConsumption:coins perpGasConsumption:coins poolLpGasConsumption:coins poolPerpGasConsumption:coins minTonsForStorage:coins gasTransferJetton:coins gasForBurnTlp:coins totalExecutionFee:coins tlpWallet:address jettonWallet:address pool:address = ConfigData`
Signature: `ConfigData{isExecutor:Maybe bool,orderLockTime:uint32,lpMinExecutionFee:coins,perpMinExecutionFee:coins,lpGasConsumption:coins,perpGasConsumption:coins,poolLpGasConsumption:coins,poolPerpGasConsumption:coins,minTonsForStorage:coins,gasTransferJetton:coins,gasForBurnTlp:coins,totalExecutionFee:coins,tlpWallet:address,jettonWallet:address,pool:address}`

## LiquidityOrder
TLB: `_ isIncrease:bool account:address jettonDelta:coins executionFee:coins blockTime:uint32 isPending:bool executionFeeReceiver:address lastOperator:Maybe address = LiquidityOrder`
Signature: `LiquidityOrder{isIncrease:bool,account:address,jettonDelta:coins,executionFee:coins,blockTime:uint32,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address}`

## LiquidityOrderData
TLB: `_ liquidityOrderIndexNext:uint64 liquidityOrder:Maybe LiquidityOrder{isIncrease:bool,account:address,jettonDelta:coins,executionFee:coins,blockTime:uint32,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address} = LiquidityOrderData`
Signature: `LiquidityOrderData{liquidityOrderIndexNext:uint64,liquidityOrder:Maybe LiquidityOrder{isIncrease:bool,account:address,jettonDelta:coins,executionFee:coins,blockTime:uint32,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address}}`

## PerpOrder
TLB: `_ opType:uint8 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 triggerAbove:bool executionFee:coins blockTime:uint32 isPending:bool executionFeeReceiver:address lastOperator:Maybe address = PerpOrder`
Signature: `PerpOrder{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,blockTime:uint32,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address}`

## PerpOrderEx
TLB: `_ tpSize:coins tpPrice:uint128 slSize:coins slPrice:uint128 executionFee:coins = PerpOrderEx`
Signature: `PerpOrderEx{tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,executionFee:coins}`

## PerpOrderData
TLB: `_ perpOrderIndexNext:uint64 perpOrder:Maybe PerpOrder{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,blockTime:uint32,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address} perpOrderEx:Maybe PerpOrderEx{tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,executionFee:coins} = PerpOrderData`
Signature: `PerpOrderData{perpOrderIndexNext:uint64,perpOrder:Maybe PerpOrder{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,blockTime:uint32,isPending:bool,executionFeeReceiver:address,lastOperator:Maybe address},perpOrderEx:Maybe PerpOrderEx{tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,executionFee:coins}}`

## Compensate
TLB: `_ orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:coins executionFeeReceiver:Maybe address executionFee:coins unlockTime:uint32 = Compensate`
Signature: `Compensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32}`

## CompensateData
TLB: `_ compensateIndexNext:uint64 compensate:Maybe Compensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32} = CompensateData`
Signature: `CompensateData{compensateIndexNext:uint64,compensate:Maybe Compensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32}}`

# Get Methods
Total Get Methods: 6

## configData
Argument: account

## liquidityOrder
Argument: orderId

## perpOrder
Argument: orderId

## compensate
Argument: compensateId

## stopped

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
11120: compensate not exist
19305: gas not enough
24173: order is pending
24562: execution fee not enough
31425: not reach unlock time
32637: order not exist
39703: too early
40368: Contract stopped
41207: invalid sender
51911: token not match
53296: Contract not stopped