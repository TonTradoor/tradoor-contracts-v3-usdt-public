# TACT Compilation Report
Contract: Pool
BOC Size: 23302 bytes

# Types
Total Types: 63

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## StdAddress
TLB: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

## VarAddress
TLB: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

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

## UpdateContract
TLB: `update_contract#2eb108db code:^slice data:Maybe ^slice = UpdateContract`
Signature: `UpdateContract{code:^slice,data:Maybe ^slice}`

## JettonTransfer
TLB: `jetton_transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:Maybe address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonTransfer`
Signature: `JettonTransfer{query_id:uint64,amount:coins,destination:address,response_destination:Maybe address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## JettonTransferNotification
TLB: `jetton_transfer_notification#7362d09c query_id:uint64 amount:coins sender:address forward_payload:remainder<slice> = JettonTransferNotification`
Signature: `JettonTransferNotification{query_id:uint64,amount:coins,sender:address,forward_payload:remainder<slice>}`

## JettonBurn
TLB: `jetton_burn#595f07bc query_id:uint64 amount:coins response_destination:address custom_payload:Maybe ^cell = JettonBurn`
Signature: `JettonBurn{query_id:uint64,amount:coins,response_destination:address,custom_payload:Maybe ^cell}`

## JettonMint
TLB: `jetton_mint#89b71d09 origin:address receiver:address amount:int257 custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonMint`
Signature: `JettonMint{origin:address,receiver:address,amount:int257,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## JettonUpdateContent
TLB: `jetton_update_content#5b8f271d jetton_content:^cell = JettonUpdateContent`
Signature: `JettonUpdateContent{jetton_content:^cell}`

## UpdatePoolConfig
TLB: `update_pool_config#a62f856c orderLockTime:uint32 maxLpNetCap:coins lpRolloverFeeRate:uint32 liquidatedPositionShareRate:uint32 normalPositionShareRate:uint32 = UpdatePoolConfig`
Signature: `UpdatePoolConfig{orderLockTime:uint32,maxLpNetCap:coins,lpRolloverFeeRate:uint32,liquidatedPositionShareRate:uint32,normalPositionShareRate:uint32}`

## UpdateConfig
TLB: `update_config#11692626 gasConfig:Maybe GasConfig{lpMinExecutionFee:coins,perpMinExecutionFee:coins,gasForPerpTrader:coins,gasForPerpExecutor:coins,gasForLpTrader:coins,gasForLpExecutor:coins,minTonsForStorage:coins,gasForTransferJetton:coins,gasForBurnTlp:coins,gasForMintTlp:coins} executorConfig:Maybe ExecutorConfig{executors:dict<address, bool>,compensator:address,claimer:address} contractConfig:Maybe ContractConfig{multisig:address,tlpJetton:address,tlpWallet:address,jettonWallet:address} = UpdateConfig`
Signature: `UpdateConfig{gasConfig:Maybe GasConfig{lpMinExecutionFee:coins,perpMinExecutionFee:coins,gasForPerpTrader:coins,gasForPerpExecutor:coins,gasForLpTrader:coins,gasForLpExecutor:coins,minTonsForStorage:coins,gasForTransferJetton:coins,gasForBurnTlp:coins,gasForMintTlp:coins},executorConfig:Maybe ExecutorConfig{executors:dict<address, bool>,compensator:address,claimer:address},contractConfig:Maybe ContractConfig{multisig:address,tlpJetton:address,tlpWallet:address,jettonWallet:address}}`

## SetManager
TLB: `set_manager#92f200ce manager:address = SetManager`
Signature: `SetManager{manager:address}`

## ListToken
TLB: `list_token#e49b3bf0 tokenId:uint16 config:TokenConfig{name:^string,enable:bool,maxLeverage:uint16,liquidationFee:coins,maintenanceRate:uint32,tradingFeeRate:uint32,lpTradingFeeRate:uint32} = ListToken`
Signature: `ListToken{tokenId:uint16,config:TokenConfig{name:^string,enable:bool,maxLeverage:uint16,liquidationFee:coins,maintenanceRate:uint32,tradingFeeRate:uint32,lpTradingFeeRate:uint32}}`

## DelistToken
TLB: `delist_token#9b42e4ef tokenId:uint16 = DelistToken`
Signature: `DelistToken{tokenId:uint16}`

## ClaimProtocolFee
TLB: `claim_protocol_fee#feb2a766 trxId:uint64 feeReceiver:address = ClaimProtocolFee`
Signature: `ClaimProtocolFee{trxId:uint64,feeReceiver:address}`

## CancelLiquidityOrder
TLB: `cancel_liquidity_order#481e7561 orderId:uint64 trxId:uint64 executionFeeReceiver:Maybe address = CancelLiquidityOrder`
Signature: `CancelLiquidityOrder{orderId:uint64,trxId:uint64,executionFeeReceiver:Maybe address}`

## ExecuteLiquidityOrder
TLB: `execute_liquidity_order#abcf587b orderId:uint64 trxId:uint64 executionFeeReceiver:Maybe address prices:dict<uint16, uint128> lpFundingFeeGrowth:coins rolloverFeeGrowth:coins = ExecuteLiquidityOrder`
Signature: `ExecuteLiquidityOrder{orderId:uint64,trxId:uint64,executionFeeReceiver:Maybe address,prices:dict<uint16, uint128>,lpFundingFeeGrowth:coins,rolloverFeeGrowth:coins}`

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
TLB: `execute_perp_order#ed76926e executionFeeReceiver:Maybe address orderId:uint64 trxId:uint64 tokenId:uint16 price:uint128 premiumRate:int32 fundingFeeGrowth:int128 rolloverFeeGrowth:int128 = ExecutePerpOrder`
Signature: `ExecutePerpOrder{executionFeeReceiver:Maybe address,orderId:uint64,trxId:uint64,tokenId:uint16,price:uint128,premiumRate:int32,fundingFeeGrowth:int128,rolloverFeeGrowth:int128}`

## LiquidatePerpPosition
TLB: `liquidate_perp_position#46ded352 liquidationFeeReceiver:Maybe address tokenId:uint16 account:address isLong:bool trxId:uint64 price:uint128 premiumRate:int32 fundingFeeGrowth:int128 rolloverFeeGrowth:int128 = LiquidatePerpPosition`
Signature: `LiquidatePerpPosition{liquidationFeeReceiver:Maybe address,tokenId:uint16,account:address,isLong:bool,trxId:uint64,price:uint128,premiumRate:int32,fundingFeeGrowth:int128,rolloverFeeGrowth:int128}`

## ADLPerpPosition
TLB: `adl_perp_position#d5debfdc tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins trxId:uint64 price:uint128 premiumRate:int32 fundingFeeGrowth:int128 rolloverFeeGrowth:int128 = ADLPerpPosition`
Signature: `ADLPerpPosition{tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,trxId:uint64,price:uint128,premiumRate:int32,fundingFeeGrowth:int128,rolloverFeeGrowth:int128}`

## CreateCompensate
TLB: `create_compensate#fc33877d orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:coins executionFeeReceiver:Maybe address executionFee:coins = CreateCompensate`
Signature: `CreateCompensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins}`

## ExecuteOrCancelCompensate
TLB: `execute_or_cancel_compensate#88e7f927 isCancel:bool compensateId:uint64 trxId:uint64 = ExecuteOrCancelCompensate`
Signature: `ExecuteOrCancelCompensate{isCancel:bool,compensateId:uint64,trxId:uint64}`

## LiquidityOrderCreatedEvent
TLB: `liquidity_order_created_event#c4d020e4 opType:uint8 account:address jettonDelta:coins executionFee:coins orderId:uint64 trxId:uint64 = LiquidityOrderCreatedEvent`
Signature: `LiquidityOrderCreatedEvent{opType:uint8,account:address,jettonDelta:coins,executionFee:coins,orderId:uint64,trxId:uint64}`

## LiquidityOrderCancelledEvent
TLB: `liquidity_order_cancelled_event#b9b03cbc opType:uint8 orderId:uint64 trxId:uint64 = LiquidityOrderCancelledEvent`
Signature: `LiquidityOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## LiquidityPoolChangedEvent
TLB: `liquidity_pool_changed_event#48426f36 trxId:uint64 orderId:uint64 opType:uint8 account:address jettonDelta:coins tlpDelta:coins tlpPrice:uint128 tlpSupply:coins lpFundAfter:int128 realizedLpFundingFeeDelta:coins realizedLpRolloverFeeDelta:coins entryLpFundingFeeGrowth:coins entryRolloverFeeGrowth:coins = LiquidityPoolChangedEvent`
Signature: `LiquidityPoolChangedEvent{trxId:uint64,orderId:uint64,opType:uint8,account:address,jettonDelta:coins,tlpDelta:coins,tlpPrice:uint128,tlpSupply:coins,lpFundAfter:int128,realizedLpFundingFeeDelta:coins,realizedLpRolloverFeeDelta:coins,entryLpFundingFeeGrowth:coins,entryRolloverFeeGrowth:coins}`

## PerpOrderCreatedEvent
TLB: `perp_order_created_event#ad8e31ef opType:uint8 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 triggerAbove:bool executionFee:coins orderId:uint64 trxId:uint64 requestTime:uint32 = PerpOrderCreatedEvent`
Signature: `PerpOrderCreatedEvent{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,orderId:uint64,trxId:uint64,requestTime:uint32}`

## PerpOrderCancelledEvent
TLB: `perp_order_cancelled_event#f2c5aeac opType:uint8 orderId:uint64 trxId:uint64 = PerpOrderCancelledEvent`
Signature: `PerpOrderCancelledEvent{opType:uint8,orderId:uint64,trxId:uint64}`

## PerpPositionIncreasedEvent
TLB: `perp_position_increased_event#47596abe trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address tokenId:uint16 isLong:bool marginDelta:int128 marginAfter:coins sizeDelta:int128 sizeAfter:coins tradePrice:uint128 entryPrice:uint128 fundingFee:int128 rolloverFee:coins tradingFee:coins entryFundingFeeGrowthAfter:int128 entryRolloverFeeGrowthAfter:int128 globalLongMarginAfter:coins globalShortMarginAfter:coins globalLongSizeAfter:coins globalShortSizeAfter:coins globalLongValueAfter:coins globalShortValueAfter:coins lpNetSizeAfter:coins lpIsLong:bool lpEntryPriceAfter:uint128 lpFundAfter:int128 lpTradingFee:coins lpRealizedPnl:int128 = PerpPositionIncreasedEvent`
Signature: `PerpPositionIncreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,tokenId:uint16,isLong:bool,marginDelta:int128,marginAfter:coins,sizeDelta:int128,sizeAfter:coins,tradePrice:uint128,entryPrice:uint128,fundingFee:int128,rolloverFee:coins,tradingFee:coins,entryFundingFeeGrowthAfter:int128,entryRolloverFeeGrowthAfter:int128,globalLongMarginAfter:coins,globalShortMarginAfter:coins,globalLongSizeAfter:coins,globalShortSizeAfter:coins,globalLongValueAfter:coins,globalShortValueAfter:coins,lpNetSizeAfter:coins,lpIsLong:bool,lpEntryPriceAfter:uint128,lpFundAfter:int128,lpTradingFee:coins,lpRealizedPnl:int128}`

## PerpPositionDecreasedEvent
TLB: `perp_position_decreased_event#2353464c trxId:uint64 orderId:uint64 opType:uint8 positionId:uint64 account:address tokenId:uint16 isLong:bool marginDelta:int128 marginAfter:coins sizeDelta:int128 sizeAfter:coins tradePrice:uint128 entryPrice:uint128 realizedPnLDelta:int128 fundingFee:int128 rolloverFee:coins tradingFee:coins entryFundingFeeGrowthAfter:int128 entryRolloverFeeGrowthAfter:int128 payout:coins globalLongMarginAfter:coins globalShortMarginAfter:coins globalLongSizeAfter:coins globalShortSizeAfter:coins globalLongValueAfter:coins globalShortValueAfter:coins lpNetSizeAfter:coins lpIsLong:bool lpEntryPriceAfter:uint128 lpFundAfter:int128 lpTradingFee:coins lpRealizedPnl:int128 = PerpPositionDecreasedEvent`
Signature: `PerpPositionDecreasedEvent{trxId:uint64,orderId:uint64,opType:uint8,positionId:uint64,account:address,tokenId:uint16,isLong:bool,marginDelta:int128,marginAfter:coins,sizeDelta:int128,sizeAfter:coins,tradePrice:uint128,entryPrice:uint128,realizedPnLDelta:int128,fundingFee:int128,rolloverFee:coins,tradingFee:coins,entryFundingFeeGrowthAfter:int128,entryRolloverFeeGrowthAfter:int128,payout:coins,globalLongMarginAfter:coins,globalShortMarginAfter:coins,globalLongSizeAfter:coins,globalShortSizeAfter:coins,globalLongValueAfter:coins,globalShortValueAfter:coins,lpNetSizeAfter:coins,lpIsLong:bool,lpEntryPriceAfter:uint128,lpFundAfter:int128,lpTradingFee:coins,lpRealizedPnl:int128}`

## CompensateCreatedEvent
TLB: `compensate_created_event#9628ba96 compensateId:uint64 orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:coins executionFeeReceiver:Maybe address executionFee:coins unlockTime:uint32 = CompensateCreatedEvent`
Signature: `CompensateCreatedEvent{compensateId:uint64,orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32}`

## CompensateCancelledEvent
TLB: `compensate_cancelled_event#4bc341d5 compensateId:uint64 trxId:uint64 = CompensateCancelledEvent`
Signature: `CompensateCancelledEvent{compensateId:uint64,trxId:uint64}`

## CompensateExecutedEvent
TLB: `compensate_executed_event#db45e438 compensateId:uint64 trxId:uint64 = CompensateExecutedEvent`
Signature: `CompensateExecutedEvent{compensateId:uint64,trxId:uint64}`

## AccountInfo
TLB: `_ isExecutor:bool isCompensator:bool isClaimer:bool = AccountInfo`
Signature: `AccountInfo{isExecutor:bool,isCompensator:bool,isClaimer:bool}`

## ConfigData
TLB: `_ orderLockTime:uint32 lpMinExecutionFee:coins perpMinExecutionFee:coins gasForLpTrader:coins gasForLpExecutor:coins gasForPerpTrader:coins gasForPerpExecutor:coins minTonsForStorage:coins gasForTransferJetton:coins gasForBurnTlp:coins gasForMintTlp:coins tlpWallet:address jettonWallet:address tlpJetton:address maxLpNetCap:coins = ConfigData`
Signature: `ConfigData{orderLockTime:uint32,lpMinExecutionFee:coins,perpMinExecutionFee:coins,gasForLpTrader:coins,gasForLpExecutor:coins,gasForPerpTrader:coins,gasForPerpExecutor:coins,minTonsForStorage:coins,gasForTransferJetton:coins,gasForBurnTlp:coins,gasForMintTlp:coins,tlpWallet:address,jettonWallet:address,tlpJetton:address,maxLpNetCap:coins}`

## TokenConfig
TLB: `_ name:^string enable:bool maxLeverage:uint16 liquidationFee:coins maintenanceRate:uint32 tradingFeeRate:uint32 lpTradingFeeRate:uint32 = TokenConfig`
Signature: `TokenConfig{name:^string,enable:bool,maxLeverage:uint16,liquidationFee:coins,maintenanceRate:uint32,tradingFeeRate:uint32,lpTradingFeeRate:uint32}`

## PoolStat
TLB: `_ tlpSupply:coins totalExecutionFee:coins protocolTradingFee:coins globalLPFund:int128 globalLPUnrealizedPnl:int128 globalLpFundingFeeGrowth:coins globalRolloverFeeGrowth:coins = PoolStat`
Signature: `PoolStat{tlpSupply:coins,totalExecutionFee:coins,protocolTradingFee:coins,globalLPFund:int128,globalLPUnrealizedPnl:int128,globalLpFundingFeeGrowth:coins,globalRolloverFeeGrowth:coins}`

## AccountPerpPosition
TLB: `_ positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}}> = AccountPerpPosition`
Signature: `AccountPerpPosition{positions:dict<address, ^DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}}>}`

## DirectionPerpPosition
TLB: `_ longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128} shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128} = DirectionPerpPosition`
Signature: `DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}}`

## PerpPosition
TLB: `_ positionId:uint64 margin:coins size:coins entryPrice:uint128 entryFundingFeeGrowth:int128 entryRolloverFeeGrowth:int128 = PerpPosition`
Signature: `PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}`

## GlobalLPPosition
TLB: `_ netSize:coins isLong:bool entryPrice:uint128 = GlobalLPPosition`
Signature: `GlobalLPPosition{netSize:coins,isLong:bool,entryPrice:uint128}`

## PerpPositionData
TLB: `_ perpPositionIndexNext:uint64 perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}} globalLPPosition:Maybe GlobalLPPosition{netSize:coins,isLong:bool,entryPrice:uint128} globalPosition:Maybe GlobalPosition{longMargin:coins,shortMargin:coins,longSize:coins,shortSize:coins,longValue:coins,shortValue:coins} = PerpPositionData`
Signature: `PerpPositionData{perpPositionIndexNext:uint64,perpPosition:Maybe DirectionPerpPosition{longPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128},shortPosition:PerpPosition{positionId:uint64,margin:coins,size:coins,entryPrice:uint128,entryFundingFeeGrowth:int128,entryRolloverFeeGrowth:int128}},globalLPPosition:Maybe GlobalLPPosition{netSize:coins,isLong:bool,entryPrice:uint128},globalPosition:Maybe GlobalPosition{longMargin:coins,shortMargin:coins,longSize:coins,shortSize:coins,longValue:coins,shortValue:coins}}`

## GlobalPosition
TLB: `_ longMargin:coins shortMargin:coins longSize:coins shortSize:coins longValue:coins shortValue:coins = GlobalPosition`
Signature: `GlobalPosition{longMargin:coins,shortMargin:coins,longSize:coins,shortSize:coins,longValue:coins,shortValue:coins}`

## GasConfig
TLB: `_ lpMinExecutionFee:coins perpMinExecutionFee:coins gasForPerpTrader:coins gasForPerpExecutor:coins gasForLpTrader:coins gasForLpExecutor:coins minTonsForStorage:coins gasForTransferJetton:coins gasForBurnTlp:coins gasForMintTlp:coins = GasConfig`
Signature: `GasConfig{lpMinExecutionFee:coins,perpMinExecutionFee:coins,gasForPerpTrader:coins,gasForPerpExecutor:coins,gasForLpTrader:coins,gasForLpExecutor:coins,minTonsForStorage:coins,gasForTransferJetton:coins,gasForBurnTlp:coins,gasForMintTlp:coins}`

## ExecutorConfig
TLB: `_ executors:dict<address, bool> compensator:address claimer:address = ExecutorConfig`
Signature: `ExecutorConfig{executors:dict<address, bool>,compensator:address,claimer:address}`

## ContractConfig
TLB: `_ multisig:address tlpJetton:address tlpWallet:address jettonWallet:address = ContractConfig`
Signature: `ContractConfig{multisig:address,tlpJetton:address,tlpWallet:address,jettonWallet:address}`

## LiquidityOrder
TLB: `_ isIncrease:bool account:address jettonDelta:coins executionFee:coins blockTime:uint32 isPending:bool = LiquidityOrder`
Signature: `LiquidityOrder{isIncrease:bool,account:address,jettonDelta:coins,executionFee:coins,blockTime:uint32,isPending:bool}`

## LiquidityOrderData
TLB: `_ liquidityOrderIndexNext:uint64 liquidityOrder:Maybe LiquidityOrder{isIncrease:bool,account:address,jettonDelta:coins,executionFee:coins,blockTime:uint32,isPending:bool} = LiquidityOrderData`
Signature: `LiquidityOrderData{liquidityOrderIndexNext:uint64,liquidityOrder:Maybe LiquidityOrder{isIncrease:bool,account:address,jettonDelta:coins,executionFee:coins,blockTime:uint32,isPending:bool}}`

## PerpOrder
TLB: `_ opType:uint8 tokenId:uint16 account:address isLong:bool marginDelta:coins sizeDelta:coins triggerPrice:uint128 triggerAbove:bool executionFee:coins blockTime:uint32 isPending:bool = PerpOrder`
Signature: `PerpOrder{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,blockTime:uint32,isPending:bool}`

## PerpOrderEx
TLB: `_ tpSize:coins tpPrice:uint128 slSize:coins slPrice:uint128 executionFee:coins = PerpOrderEx`
Signature: `PerpOrderEx{tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,executionFee:coins}`

## PerpOrderData
TLB: `_ perpOrderIndexNext:uint64 perpOrder:Maybe PerpOrder{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,blockTime:uint32,isPending:bool} perpOrderEx:Maybe PerpOrderEx{tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,executionFee:coins} = PerpOrderData`
Signature: `PerpOrderData{perpOrderIndexNext:uint64,perpOrder:Maybe PerpOrder{opType:uint8,tokenId:uint16,account:address,isLong:bool,marginDelta:coins,sizeDelta:coins,triggerPrice:uint128,triggerAbove:bool,executionFee:coins,blockTime:uint32,isPending:bool},perpOrderEx:Maybe PerpOrderEx{tpSize:coins,tpPrice:uint128,slSize:coins,slPrice:uint128,executionFee:coins}}`

## Compensate
TLB: `_ orderType:Maybe uint8 orderId:uint64 trxId:uint64 refundReceiver:Maybe address refundAmount:coins executionFeeReceiver:Maybe address executionFee:coins unlockTime:uint32 = Compensate`
Signature: `Compensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32}`

## CompensateData
TLB: `_ compensateIndexNext:uint64 compensate:Maybe Compensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32} = CompensateData`
Signature: `CompensateData{compensateIndexNext:uint64,compensate:Maybe Compensate{orderType:Maybe uint8,orderId:uint64,trxId:uint64,refundReceiver:Maybe address,refundAmount:coins,executionFeeReceiver:Maybe address,executionFee:coins,unlockTime:uint32}}`

## Pool$Data
TLB: `null`
Signature: `null`

# Get Methods
Total Get Methods: 11

## accountInfo
Argument: account

## perpPosition
Argument: tokenId
Argument: account

## configData

## tokenConfig
Argument: tokenId

## poolStat

## liquidityOrder
Argument: orderId

## perpOrder
Argument: orderId

## compensate
Argument: compensateId

## manager

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
11: 'Unknown' error
12: Fatal error
13: Out of gas error
14: Virtualization error
32: Action list is invalid
33: Action list is too long
34: Action is invalid or not supported
35: Invalid source address in outbound message
36: Invalid destination address in outbound message
37: Not enough TON
38: Not enough extra-currencies
39: Outbound message does not fit into a cell after rewriting
40: Cannot process a message
41: Library reference is null
42: Library change action error
43: Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree
50: Account state size exceeded limits
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
6118: too early to cancel
10594: insufficient quota to supply
11120: compensate not exist
17312: leverage too high
19163: no enough jettons to claim
19305: gas not enough
24173: order is pending
24325: token cannot be delisted
24562: execution fee not enough
27798: invalid token
28603: margin rate too high
31425: not reach unlock time
32637: order not exist
36718: disabled token
40368: Contract stopped
40940: margin is too high to liquidate
41207: invalid sender
53296: Contract not stopped
62409: insufficient margin

# Trait Inheritance Diagram

```mermaid
graph TD
Pool
Pool --> BaseTrait
Pool --> Deployable
Deployable --> BaseTrait
Pool --> Resumable
Resumable --> BaseTrait
Resumable --> Stoppable
Stoppable --> BaseTrait
Stoppable --> Ownable
Ownable --> BaseTrait
Resumable --> Ownable
Pool --> Stoppable
Pool --> Ownable
Pool --> Upgradable
Upgradable --> BaseTrait
Upgradable --> Ownable
```

# Contract Dependency Diagram

```mermaid
graph TD
Pool
```