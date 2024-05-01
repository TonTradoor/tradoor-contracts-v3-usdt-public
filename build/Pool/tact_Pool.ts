import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type UpdateConfig = {
    $$type: 'UpdateConfig';
    executorLength: bigint;
    executors: Dictionary<bigint, ExecutorParam>;
    claimExecutor: Address;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    minTonsForStorage: bigint;
    lpLockTime: bigint;
    lpBonusFactor: bigint;
    lpLiquidityFactor: bigint;
    orderBook: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(776974783, 32);
        b_0.storeInt(src.executorLength, 257);
        b_0.storeDict(src.executors, Dictionary.Keys.BigInt(257), dictValueParserExecutorParam());
        b_0.storeAddress(src.claimExecutor);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        let b_1 = new Builder();
        b_1.storeInt(src.lpLockTime, 257);
        b_1.storeInt(src.lpBonusFactor, 257);
        b_1.storeInt(src.lpLiquidityFactor, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.orderBook);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 776974783) { throw Error('Invalid prefix'); }
    let _executorLength = sc_0.loadIntBig(257);
    let _executors = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserExecutorParam(), sc_0);
    let _claimExecutor = sc_0.loadAddress();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpLockTime = sc_1.loadIntBig(257);
    let _lpBonusFactor = sc_1.loadIntBig(257);
    let _lpLiquidityFactor = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _orderBook = sc_2.loadAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, claimExecutor: _claimExecutor, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executorLength = source.readBigNumber();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserExecutorParam(), source.readCellOpt());
    let _claimExecutor = source.readAddress();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _lpLockTime = source.readBigNumber();
    let _lpBonusFactor = source.readBigNumber();
    let _lpLiquidityFactor = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, claimExecutor: _claimExecutor, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executorLength);
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.BigInt(257), dictValueParserExecutorParam()).endCell() : null);
    builder.writeAddress(source.claimExecutor);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.lpLockTime);
    builder.writeNumber(source.lpBonusFactor);
    builder.writeNumber(source.lpLiquidityFactor);
    builder.writeAddress(source.orderBook);
    return builder.build();
}

function dictValueParserUpdateConfig(): DictionaryValue<UpdateConfig> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateConfig(src.loadRef().beginParse());
        }
    }
}

export type UpdateTokenConfig = {
    $$type: 'UpdateTokenConfig';
    tokenId: bigint;
    name: string;
    enable: boolean;
    minValue: bigint;
    maxValue: bigint;
    maxLeverage: bigint;
    liquidationFee: bigint;
    maintenanceRate: bigint;
    tradingFeeRate: bigint;
    lpTradingFeeRate: bigint;
    interestRate: bigint;
    maxFundingRate: bigint;
    liquidityProportion: bigint;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3408848546, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
        b_0.storeInt(src.minValue, 257);
        b_0.storeInt(src.maxValue, 257);
        b_0.storeInt(src.maxLeverage, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidationFee, 257);
        b_1.storeInt(src.maintenanceRate, 257);
        b_1.storeInt(src.tradingFeeRate, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.lpTradingFeeRate, 257);
        b_2.storeInt(src.interestRate, 257);
        b_2.storeInt(src.maxFundingRate, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.liquidityProportion, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3408848546) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _minValue = sc_0.loadIntBig(257);
    let _maxValue = sc_0.loadIntBig(257);
    let _maxLeverage = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationFee = sc_1.loadIntBig(257);
    let _maintenanceRate = sc_1.loadIntBig(257);
    let _tradingFeeRate = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _lpTradingFeeRate = sc_2.loadIntBig(257);
    let _interestRate = sc_2.loadIntBig(257);
    let _maxFundingRate = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _liquidityProportion = sc_3.loadIntBig(257);
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate, liquidityProportion: _liquidityProportion };
}

function loadTupleUpdateTokenConfig(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minValue = source.readBigNumber();
    let _maxValue = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
    let _liquidityProportion = source.readBigNumber();
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate, liquidityProportion: _liquidityProportion };
}

function storeTupleUpdateTokenConfig(source: UpdateTokenConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minValue);
    builder.writeNumber(source.maxValue);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.maintenanceRate);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    builder.writeNumber(source.interestRate);
    builder.writeNumber(source.maxFundingRate);
    builder.writeNumber(source.liquidityProportion);
    return builder.build();
}

function dictValueParserUpdateTokenConfig(): DictionaryValue<UpdateTokenConfig> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenConfig(src.loadRef().beginParse());
        }
    }
}

export type ClaimProtocolFee = {
    $$type: 'ClaimProtocolFee';
    trxId: bigint;
    feeReceiver: Address;
}

export function storeClaimProtocolFee(src: ClaimProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4273121126, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.feeReceiver);
    };
}

export function loadClaimProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4273121126) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _feeReceiver = sc_0.loadAddress();
    return { $$type: 'ClaimProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver };
}

function loadTupleClaimProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _feeReceiver = source.readAddress();
    return { $$type: 'ClaimProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver };
}

function storeTupleClaimProtocolFee(source: ClaimProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.feeReceiver);
    return builder.build();
}

function dictValueParserClaimProtocolFee(): DictionaryValue<ClaimProtocolFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadClaimProtocolFee(src.loadRef().beginParse());
        }
    }
}

export type SendProtocolFee = {
    $$type: 'SendProtocolFee';
    trxId: bigint;
    feeReceiver: Address;
    amount: bigint;
}

export function storeSendProtocolFee(src: SendProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1574274145, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.feeReceiver);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadSendProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1574274145) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _feeReceiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver, amount: _amount };
}

function loadTupleSendProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _feeReceiver = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver, amount: _amount };
}

function storeTupleSendProtocolFee(source: SendProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.feeReceiver);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSendProtocolFee(): DictionaryValue<SendProtocolFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadSendProtocolFee(src.loadRef().beginParse());
        }
    }
}

export type UpdateLPPosition = {
    $$type: 'UpdateLPPosition';
    isIncrease: boolean;
    orderId: bigint;
    account: Address;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeUpdateLPPosition(src: UpdateLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3902592095, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeUint(src.orderId, 64);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3902592095) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleUpdateLPPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleUpdateLPPosition(source: UpdateLPPosition) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateLPPosition(): DictionaryValue<UpdateLPPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLPPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdateLPPositionSuccess = {
    $$type: 'UpdateLPPositionSuccess';
    orderId: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeUpdateLPPositionSuccess(src: UpdateLPPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(485543809, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 485543809) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _receive = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateLPPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function loadTupleUpdateLPPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateLPPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function storeTupleUpdateLPPositionSuccess(source: UpdateLPPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateLPPositionSuccess(): DictionaryValue<UpdateLPPositionSuccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateLPPositionSuccess(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLPPositionSuccess(src.loadRef().beginParse());
        }
    }
}

export type UpdatePerpPosition = {
    $$type: 'UpdatePerpPosition';
    orderId: bigint;
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeUpdatePerpPosition(src: UpdatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4283950423, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeUint(src.trxId, 64);
        b_1.storeInt(src.price, 257);
        b_1.storeInt(src.premiumRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4283950423) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _trxId = sc_1.loadUintBig(64);
    let _price = sc_1.loadIntBig(257);
    let _premiumRate = sc_1.loadIntBig(257);
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function loadTupleUpdatePerpPosition(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function storeTupleUpdatePerpPosition(source: UpdatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserUpdatePerpPosition(): DictionaryValue<UpdatePerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdatePerpPositionSuccess = {
    $$type: 'UpdatePerpPositionSuccess';
    orderId: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeUpdatePerpPositionSuccess(src: UpdatePerpPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4009870004, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdatePerpPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4009870004) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _receive = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdatePerpPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function loadTupleUpdatePerpPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdatePerpPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function storeTupleUpdatePerpPositionSuccess(source: UpdatePerpPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdatePerpPositionSuccess(): DictionaryValue<UpdatePerpPositionSuccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePerpPositionSuccess(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePerpPositionSuccess(src.loadRef().beginParse());
        }
    }
}

export type UpdatePrice = {
    $$type: 'UpdatePrice';
    trxId: bigint;
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePriceParam>;
}

export function storeUpdatePrice(src: UpdatePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(499684748, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam());
    };
}

export function loadUpdatePrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 499684748) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), sc_0);
    return { $$type: 'UpdatePrice' as const, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdatePrice(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), source.readCellOpt());
    return { $$type: 'UpdatePrice' as const, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleUpdatePrice(source: UpdatePrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam()).endCell() : null);
    return builder.build();
}

function dictValueParserUpdatePrice(): DictionaryValue<UpdatePrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePrice(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePrice(src.loadRef().beginParse());
        }
    }
}

export type LPPositionIncreasedEvent = {
    $$type: 'LPPositionIncreasedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    positionId: bigint;
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    bonusDelta: bigint;
    bonusAfter: bigint;
    unlockTimeAfter: bigint;
    realizedFundingFeeDelta: bigint;
    realizedFundingFeeAfter: bigint;
    entryFundingFeeGrowthAfter: bigint;
    lpFundAfter: bigint;
    lpLiquidityAfter: bigint;
}

export function storeLPPositionIncreasedEvent(src: LPPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(866046695, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        b_1.storeInt(src.unlockTimeAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.realizedFundingFeeDelta, 257);
        b_2.storeInt(src.realizedFundingFeeAfter, 257);
        b_2.storeInt(src.entryFundingFeeGrowthAfter, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.lpFundAfter, 257);
        b_3.storeInt(src.lpLiquidityAfter, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 866046695) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let _unlockTimeAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _realizedFundingFeeDelta = sc_2.loadIntBig(257);
    let _realizedFundingFeeAfter = sc_2.loadIntBig(257);
    let _entryFundingFeeGrowthAfter = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpFundAfter = sc_3.loadIntBig(257);
    let _lpLiquidityAfter = sc_3.loadIntBig(257);
    return { $$type: 'LPPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFeeDelta: _realizedFundingFeeDelta, realizedFundingFeeAfter: _realizedFundingFeeAfter, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter };
}

function loadTupleLPPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _unlockTimeAfter = source.readBigNumber();
    let _realizedFundingFeeDelta = source.readBigNumber();
    let _realizedFundingFeeAfter = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpLiquidityAfter = source.readBigNumber();
    return { $$type: 'LPPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFeeDelta: _realizedFundingFeeDelta, realizedFundingFeeAfter: _realizedFundingFeeAfter, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter };
}

function storeTupleLPPositionIncreasedEvent(source: LPPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.bonusDelta);
    builder.writeNumber(source.bonusAfter);
    builder.writeNumber(source.unlockTimeAfter);
    builder.writeNumber(source.realizedFundingFeeDelta);
    builder.writeNumber(source.realizedFundingFeeAfter);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpLiquidityAfter);
    return builder.build();
}

function dictValueParserLPPositionIncreasedEvent(): DictionaryValue<LPPositionIncreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionDecreasedEvent = {
    $$type: 'LPPositionDecreasedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    positionId: bigint;
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    bonusDelta: bigint;
    bonusAfter: bigint;
    fundingFeeDelta: bigint;
    entryFundingFeeGrowthAfter: bigint;
    receive: bigint;
    lpFundAfter: bigint;
    lpLiquidityAfter: bigint;
}

export function storeLPPositionDecreasedEvent(src: LPPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4192904720, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        b_1.storeInt(src.fundingFeeDelta, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_2.storeInt(src.receive, 257);
        b_2.storeInt(src.lpFundAfter, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.lpLiquidityAfter, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4192904720) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let _fundingFeeDelta = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _entryFundingFeeGrowthAfter = sc_2.loadIntBig(257);
    let _receive = sc_2.loadIntBig(257);
    let _lpFundAfter = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpLiquidityAfter = sc_3.loadIntBig(257);
    return { $$type: 'LPPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _fundingFeeDelta = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpLiquidityAfter = source.readBigNumber();
    return { $$type: 'LPPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter };
}

function storeTupleLPPositionDecreasedEvent(source: LPPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.bonusDelta);
    builder.writeNumber(source.bonusAfter);
    builder.writeNumber(source.fundingFeeDelta);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpLiquidityAfter);
    return builder.build();
}

function dictValueParserLPPositionDecreasedEvent(): DictionaryValue<LPPositionDecreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionDecreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionIncreasedEvent = {
    $$type: 'PerpPositionIncreasedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    positionId: bigint;
    account: Address;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    marginAfter: bigint;
    sizeDelta: bigint;
    sizeAfter: bigint;
    tradePrice: bigint;
    entryPrice: bigint;
    fundingFee: bigint;
    tradingFee: bigint;
    entryFundingFeeGrowthAfter: bigint;
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    globalLongFundingFeeGrowthAfter: bigint;
    globalShortFundingFeeGrowthAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpLiquidityAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
    lpReceivedFundingFee: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1234761795, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.marginAfter, 257);
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.sizeAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tradePrice, 257);
        b_2.storeInt(src.entryPrice, 257);
        b_2.storeInt(src.fundingFee, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.tradingFee, 257);
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_3.storeInt(src.globalLongMarginAfter, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.globalShortMarginAfter, 257);
        b_4.storeInt(src.globalLongSizeAfter, 257);
        b_4.storeInt(src.globalShortSizeAfter, 257);
        let b_5 = new Builder();
        b_5.storeInt(src.globalLongFundingFeeGrowthAfter, 257);
        b_5.storeInt(src.globalShortFundingFeeGrowthAfter, 257);
        b_5.storeInt(src.lpNetSizeAfter, 257);
        b_5.storeBit(src.lpIsLong);
        let b_6 = new Builder();
        b_6.storeInt(src.lpEntryPriceAfter, 257);
        b_6.storeInt(src.lpFundAfter, 257);
        b_6.storeInt(src.lpLiquidityAfter, 257);
        let b_7 = new Builder();
        b_7.storeInt(src.lpTradingFee, 257);
        b_7.storeInt(src.lpRealizedPnl, 257);
        b_7.storeInt(src.lpReceivedFundingFee, 257);
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1234761795) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginAfter = sc_1.loadIntBig(257);
    let _sizeDelta = sc_1.loadIntBig(257);
    let _sizeAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tradePrice = sc_2.loadIntBig(257);
    let _entryPrice = sc_2.loadIntBig(257);
    let _fundingFee = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _tradingFee = sc_3.loadIntBig(257);
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let _globalLongMarginAfter = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _globalShortMarginAfter = sc_4.loadIntBig(257);
    let _globalLongSizeAfter = sc_4.loadIntBig(257);
    let _globalShortSizeAfter = sc_4.loadIntBig(257);
    let sc_5 = sc_4.loadRef().beginParse();
    let _globalLongFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let _globalShortFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let _lpNetSizeAfter = sc_5.loadIntBig(257);
    let _lpIsLong = sc_5.loadBit();
    let sc_6 = sc_5.loadRef().beginParse();
    let _lpEntryPriceAfter = sc_6.loadIntBig(257);
    let _lpFundAfter = sc_6.loadIntBig(257);
    let _lpLiquidityAfter = sc_6.loadIntBig(257);
    let sc_7 = sc_6.loadRef().beginParse();
    let _lpTradingFee = sc_7.loadIntBig(257);
    let _lpRealizedPnl = sc_7.loadIntBig(257);
    let _lpReceivedFundingFee = sc_7.loadIntBig(257);
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl, lpReceivedFundingFee: _lpReceivedFundingFee };
}

function loadTuplePerpPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongFundingFeeGrowthAfter = source.readBigNumber();
    let _globalShortFundingFeeGrowthAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpLiquidityAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    let _lpReceivedFundingFee = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl, lpReceivedFundingFee: _lpReceivedFundingFee };
}

function storeTuplePerpPositionIncreasedEvent(source: PerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.sizeAfter);
    builder.writeNumber(source.tradePrice);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.globalLongFundingFeeGrowthAfter);
    builder.writeNumber(source.globalShortFundingFeeGrowthAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpLiquidityAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    builder.writeNumber(source.lpReceivedFundingFee);
    return builder.build();
}

function dictValueParserPerpPositionIncreasedEvent(): DictionaryValue<PerpPositionIncreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionDecreasedEvent = {
    $$type: 'PerpPositionDecreasedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    positionId: bigint;
    account: Address;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    marginAfter: bigint;
    sizeDelta: bigint;
    sizeAfter: bigint;
    tradePrice: bigint;
    realizedPnLDelta: bigint;
    fundingFee: bigint;
    tradingFee: bigint;
    entryFundingFeeGrowthAfter: bigint;
    receive: bigint;
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    globalLongFundingFeeGrowthAfter: bigint;
    globalShortFundingFeeGrowthAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpLiquidityAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
    lpReceivedFundingFee: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(361946389, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.marginAfter, 257);
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.sizeAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tradePrice, 257);
        b_2.storeInt(src.realizedPnLDelta, 257);
        b_2.storeInt(src.fundingFee, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.tradingFee, 257);
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_3.storeInt(src.receive, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.globalLongMarginAfter, 257);
        b_4.storeInt(src.globalShortMarginAfter, 257);
        b_4.storeInt(src.globalLongSizeAfter, 257);
        let b_5 = new Builder();
        b_5.storeInt(src.globalShortSizeAfter, 257);
        b_5.storeInt(src.globalLongFundingFeeGrowthAfter, 257);
        b_5.storeInt(src.globalShortFundingFeeGrowthAfter, 257);
        let b_6 = new Builder();
        b_6.storeInt(src.lpNetSizeAfter, 257);
        b_6.storeBit(src.lpIsLong);
        b_6.storeInt(src.lpEntryPriceAfter, 257);
        b_6.storeInt(src.lpFundAfter, 257);
        let b_7 = new Builder();
        b_7.storeInt(src.lpLiquidityAfter, 257);
        b_7.storeInt(src.lpTradingFee, 257);
        b_7.storeInt(src.lpRealizedPnl, 257);
        let b_8 = new Builder();
        b_8.storeInt(src.lpReceivedFundingFee, 257);
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 361946389) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginAfter = sc_1.loadIntBig(257);
    let _sizeDelta = sc_1.loadIntBig(257);
    let _sizeAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tradePrice = sc_2.loadIntBig(257);
    let _realizedPnLDelta = sc_2.loadIntBig(257);
    let _fundingFee = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _tradingFee = sc_3.loadIntBig(257);
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let _receive = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _globalLongMarginAfter = sc_4.loadIntBig(257);
    let _globalShortMarginAfter = sc_4.loadIntBig(257);
    let _globalLongSizeAfter = sc_4.loadIntBig(257);
    let sc_5 = sc_4.loadRef().beginParse();
    let _globalShortSizeAfter = sc_5.loadIntBig(257);
    let _globalLongFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let _globalShortFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let sc_6 = sc_5.loadRef().beginParse();
    let _lpNetSizeAfter = sc_6.loadIntBig(257);
    let _lpIsLong = sc_6.loadBit();
    let _lpEntryPriceAfter = sc_6.loadIntBig(257);
    let _lpFundAfter = sc_6.loadIntBig(257);
    let sc_7 = sc_6.loadRef().beginParse();
    let _lpLiquidityAfter = sc_7.loadIntBig(257);
    let _lpTradingFee = sc_7.loadIntBig(257);
    let _lpRealizedPnl = sc_7.loadIntBig(257);
    let sc_8 = sc_7.loadRef().beginParse();
    let _lpReceivedFundingFee = sc_8.loadIntBig(257);
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl, lpReceivedFundingFee: _lpReceivedFundingFee };
}

function loadTuplePerpPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _realizedPnLDelta = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongFundingFeeGrowthAfter = source.readBigNumber();
    let _globalShortFundingFeeGrowthAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpLiquidityAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    let _lpReceivedFundingFee = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl, lpReceivedFundingFee: _lpReceivedFundingFee };
}

function storeTuplePerpPositionDecreasedEvent(source: PerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.sizeAfter);
    builder.writeNumber(source.tradePrice);
    builder.writeNumber(source.realizedPnLDelta);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.globalLongFundingFeeGrowthAfter);
    builder.writeNumber(source.globalShortFundingFeeGrowthAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpLiquidityAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    builder.writeNumber(source.lpReceivedFundingFee);
    return builder.build();
}

function dictValueParserPerpPositionDecreasedEvent(): DictionaryValue<PerpPositionDecreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionDecreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type UpdateFundingFeeEvent = {
    $$type: 'UpdateFundingFeeEvent';
    length: bigint;
    datas: Dictionary<bigint, UpdateFundingRateEventData>;
}

export function storeUpdateFundingFeeEvent(src: UpdateFundingFeeEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3900186253, 32);
        b_0.storeInt(src.length, 257);
        b_0.storeDict(src.datas, Dictionary.Keys.BigInt(257), dictValueParserUpdateFundingRateEventData());
    };
}

export function loadUpdateFundingFeeEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3900186253) { throw Error('Invalid prefix'); }
    let _length = sc_0.loadIntBig(257);
    let _datas = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdateFundingRateEventData(), sc_0);
    return { $$type: 'UpdateFundingFeeEvent' as const, length: _length, datas: _datas };
}

function loadTupleUpdateFundingFeeEvent(source: TupleReader) {
    let _length = source.readBigNumber();
    let _datas = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdateFundingRateEventData(), source.readCellOpt());
    return { $$type: 'UpdateFundingFeeEvent' as const, length: _length, datas: _datas };
}

function storeTupleUpdateFundingFeeEvent(source: UpdateFundingFeeEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.length);
    builder.writeCell(source.datas.size > 0 ? beginCell().storeDictDirect(source.datas, Dictionary.Keys.BigInt(257), dictValueParserUpdateFundingRateEventData()).endCell() : null);
    return builder.build();
}

function dictValueParserUpdateFundingFeeEvent(): DictionaryValue<UpdateFundingFeeEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateFundingFeeEvent(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFundingFeeEvent(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    minTonsForStorage: bigint;
    lpBonusFactor: bigint;
    lpLiquidityFactor: bigint;
    orderBook: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.isExecutor !== null && src.isExecutor !== undefined) { b_0.storeBit(true).storeBit(src.isExecutor); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeInt(src.lpBonusFactor, 257);
        b_0.storeInt(src.lpLiquidityFactor, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.orderBook);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _lpBonusFactor = sc_0.loadIntBig(257);
    let _lpLiquidityFactor = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _orderBook = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _lpBonusFactor = source.readBigNumber();
    let _lpLiquidityFactor = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.lpBonusFactor);
    builder.writeNumber(source.lpLiquidityFactor);
    builder.writeAddress(source.orderBook);
    return builder.build();
}

function dictValueParserConfigData(): DictionaryValue<ConfigData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeConfigData(src)).endCell());
        },
        parse: (src) => {
            return loadConfigData(src.loadRef().beginParse());
        }
    }
}

export type ExecutorParam = {
    $$type: 'ExecutorParam';
    executor: Address;
    enable: boolean;
}

export function storeExecutorParam(src: ExecutorParam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.executor);
        b_0.storeBit(src.enable);
    };
}

export function loadExecutorParam(slice: Slice) {
    let sc_0 = slice;
    let _executor = sc_0.loadAddress();
    let _enable = sc_0.loadBit();
    return { $$type: 'ExecutorParam' as const, executor: _executor, enable: _enable };
}

function loadTupleExecutorParam(source: TupleReader) {
    let _executor = source.readAddress();
    let _enable = source.readBoolean();
    return { $$type: 'ExecutorParam' as const, executor: _executor, enable: _enable };
}

function storeTupleExecutorParam(source: ExecutorParam) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enable);
    return builder.build();
}

function dictValueParserExecutorParam(): DictionaryValue<ExecutorParam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecutorParam(src)).endCell());
        },
        parse: (src) => {
            return loadExecutorParam(src.loadRef().beginParse());
        }
    }
}

export type TokenConfig = {
    $$type: 'TokenConfig';
    name: string;
    enable: boolean;
    minValue: bigint;
    maxValue: bigint;
    maxLeverage: bigint;
    liquidationFee: bigint;
    maintenanceRate: bigint;
    liquidityProportion: bigint;
    tradingFeeRate: bigint;
    lpTradingFeeRate: bigint;
    interestRate: bigint;
    maxFundingRate: bigint;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
        b_0.storeInt(src.minValue, 257);
        b_0.storeInt(src.maxValue, 257);
        b_0.storeInt(src.maxLeverage, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidationFee, 257);
        b_1.storeInt(src.maintenanceRate, 257);
        b_1.storeInt(src.liquidityProportion, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tradingFeeRate, 257);
        b_2.storeInt(src.lpTradingFeeRate, 257);
        b_2.storeInt(src.interestRate, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.maxFundingRate, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _minValue = sc_0.loadIntBig(257);
    let _maxValue = sc_0.loadIntBig(257);
    let _maxLeverage = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationFee = sc_1.loadIntBig(257);
    let _maintenanceRate = sc_1.loadIntBig(257);
    let _liquidityProportion = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tradingFeeRate = sc_2.loadIntBig(257);
    let _lpTradingFeeRate = sc_2.loadIntBig(257);
    let _interestRate = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _maxFundingRate = sc_3.loadIntBig(257);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minValue = source.readBigNumber();
    let _maxValue = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _liquidityProportion = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minValue);
    builder.writeNumber(source.maxValue);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.maintenanceRate);
    builder.writeNumber(source.liquidityProportion);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    builder.writeNumber(source.interestRate);
    builder.writeNumber(source.maxFundingRate);
    return builder.build();
}

function dictValueParserTokenConfig(): DictionaryValue<TokenConfig> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadTokenConfig(src.loadRef().beginParse());
        }
    }
}

export type LPPosition = {
    $$type: 'LPPosition';
    positionId: bigint;
    liquidity: bigint;
    bonus: bigint;
    realizedFundingFee: bigint;
    entryFundingFeeGrowth: bigint;
    unlockTime: bigint;
}

export function storeLPPosition(src: LPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.positionId, 64);
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.bonus, 257);
        b_0.storeInt(src.realizedFundingFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.entryFundingFeeGrowth, 257);
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadUintBig(64);
    let _liquidity = sc_0.loadIntBig(257);
    let _bonus = sc_0.loadIntBig(257);
    let _realizedFundingFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _entryFundingFeeGrowth = sc_1.loadIntBig(257);
    let _unlockTime = sc_1.loadIntBig(257);
    return { $$type: 'LPPosition' as const, positionId: _positionId, liquidity: _liquidity, bonus: _bonus, realizedFundingFee: _realizedFundingFee, entryFundingFeeGrowth: _entryFundingFeeGrowth, unlockTime: _unlockTime };
}

function loadTupleLPPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _bonus = source.readBigNumber();
    let _realizedFundingFee = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'LPPosition' as const, positionId: _positionId, liquidity: _liquidity, bonus: _bonus, realizedFundingFee: _realizedFundingFee, entryFundingFeeGrowth: _entryFundingFeeGrowth, unlockTime: _unlockTime };
}

function storeTupleLPPosition(source: LPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.bonus);
    builder.writeNumber(source.realizedFundingFee);
    builder.writeNumber(source.entryFundingFeeGrowth);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserLPPosition(): DictionaryValue<LPPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadLPPosition(src.loadRef().beginParse());
        }
    }
}

export type LPPositionData = {
    $$type: 'LPPositionData';
    lpPosition: LPPosition | null;
    globalLPFund: bigint;
    globalLPLiquidity: bigint;
    globalLPFundingFeeGrowth: bigint;
    globalLPUnrealizedPnl: bigint;
}

export function storeLPPositionData(src: LPPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.lpPosition !== null && src.lpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeLPPosition(src.lpPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        b_1.storeInt(src.globalLPFund, 257);
        b_1.storeInt(src.globalLPLiquidity, 257);
        b_1.storeInt(src.globalLPFundingFeeGrowth, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.globalLPUnrealizedPnl, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionData(slice: Slice) {
    let sc_0 = slice;
    let _lpPosition = sc_0.loadBit() ? loadLPPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalLPFund = sc_1.loadIntBig(257);
    let _globalLPLiquidity = sc_1.loadIntBig(257);
    let _globalLPFundingFeeGrowth = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _globalLPUnrealizedPnl = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionData' as const, lpPosition: _lpPosition, globalLPFund: _globalLPFund, globalLPLiquidity: _globalLPLiquidity, globalLPFundingFeeGrowth: _globalLPFundingFeeGrowth, globalLPUnrealizedPnl: _globalLPUnrealizedPnl };
}

function loadTupleLPPositionData(source: TupleReader) {
    const _lpPosition_p = source.readTupleOpt();
    const _lpPosition = _lpPosition_p ? loadTupleLPPosition(_lpPosition_p) : null;
    let _globalLPFund = source.readBigNumber();
    let _globalLPLiquidity = source.readBigNumber();
    let _globalLPFundingFeeGrowth = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    return { $$type: 'LPPositionData' as const, lpPosition: _lpPosition, globalLPFund: _globalLPFund, globalLPLiquidity: _globalLPLiquidity, globalLPFundingFeeGrowth: _globalLPFundingFeeGrowth, globalLPUnrealizedPnl: _globalLPUnrealizedPnl };
}

function storeTupleLPPositionData(source: LPPositionData) {
    let builder = new TupleBuilder();
    if (source.lpPosition !== null && source.lpPosition !== undefined) {
        builder.writeTuple(storeTupleLPPosition(source.lpPosition));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLPLiquidity);
    builder.writeNumber(source.globalLPFundingFeeGrowth);
    builder.writeNumber(source.globalLPUnrealizedPnl);
    return builder.build();
}

function dictValueParserLPPositionData(): DictionaryValue<LPPositionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionData(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionData(src.loadRef().beginParse());
        }
    }
}

export type AccountPerpPosition = {
    $$type: 'AccountPerpPosition';
    positions: Dictionary<Address, DirectionPerpPosition>;
}

export function storeAccountPerpPosition(src: AccountPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.positions, Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition());
    };
}

export function loadAccountPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positions = Dictionary.load(Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition(), sc_0);
    return { $$type: 'AccountPerpPosition' as const, positions: _positions };
}

function loadTupleAccountPerpPosition(source: TupleReader) {
    let _positions = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition(), source.readCellOpt());
    return { $$type: 'AccountPerpPosition' as const, positions: _positions };
}

function storeTupleAccountPerpPosition(source: AccountPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeCell(source.positions.size > 0 ? beginCell().storeDictDirect(source.positions, Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition()).endCell() : null);
    return builder.build();
}

function dictValueParserAccountPerpPosition(): DictionaryValue<AccountPerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAccountPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadAccountPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type DirectionPerpPosition = {
    $$type: 'DirectionPerpPosition';
    longPosition: PerpPosition;
    shortPosition: PerpPosition;
}

export function storeDirectionPerpPosition(src: DirectionPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storePerpPosition(src.longPosition));
        let b_1 = new Builder();
        b_1.store(storePerpPosition(src.shortPosition));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDirectionPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _longPosition = loadPerpPosition(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortPosition = loadPerpPosition(sc_1);
    return { $$type: 'DirectionPerpPosition' as const, longPosition: _longPosition, shortPosition: _shortPosition };
}

function loadTupleDirectionPerpPosition(source: TupleReader) {
    const _longPosition = loadTuplePerpPosition(source.readTuple());
    const _shortPosition = loadTuplePerpPosition(source.readTuple());
    return { $$type: 'DirectionPerpPosition' as const, longPosition: _longPosition, shortPosition: _shortPosition };
}

function storeTupleDirectionPerpPosition(source: DirectionPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePerpPosition(source.longPosition));
    builder.writeTuple(storeTuplePerpPosition(source.shortPosition));
    return builder.build();
}

function dictValueParserDirectionPerpPosition(): DictionaryValue<DirectionPerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDirectionPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadDirectionPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type PerpPosition = {
    $$type: 'PerpPosition';
    positionId: bigint;
    margin: bigint;
    size: bigint;
    entryPrice: bigint;
    entryFundingFeeGrowth: bigint;
}

export function storePerpPosition(src: PerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.positionId, 64);
        b_0.storeInt(src.margin, 257);
        b_0.storeInt(src.size, 257);
        b_0.storeInt(src.entryPrice, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.entryFundingFeeGrowth, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadUintBig(64);
    let _margin = sc_0.loadIntBig(257);
    let _size = sc_0.loadIntBig(257);
    let _entryPrice = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _entryFundingFeeGrowth = sc_1.loadIntBig(257);
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth };
}

function loadTuplePerpPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _size = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth };
}

function storeTuplePerpPosition(source: PerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeNumber(source.margin);
    builder.writeNumber(source.size);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.entryFundingFeeGrowth);
    return builder.build();
}

function dictValueParserPerpPosition(): DictionaryValue<PerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type GlobalLPPosition = {
    $$type: 'GlobalLPPosition';
    netSize: bigint;
    isLong: boolean;
    entryPrice: bigint;
    unrealizedPnl: bigint;
}

export function storeGlobalLPPosition(src: GlobalLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.netSize, 257);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.entryPrice, 257);
        b_0.storeInt(src.unrealizedPnl, 257);
    };
}

export function loadGlobalLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _netSize = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let _entryPrice = sc_0.loadIntBig(257);
    let _unrealizedPnl = sc_0.loadIntBig(257);
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice, unrealizedPnl: _unrealizedPnl };
}

function loadTupleGlobalLPPosition(source: TupleReader) {
    let _netSize = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPrice = source.readBigNumber();
    let _unrealizedPnl = source.readBigNumber();
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice, unrealizedPnl: _unrealizedPnl };
}

function storeTupleGlobalLPPosition(source: GlobalLPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.netSize);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.unrealizedPnl);
    return builder.build();
}

function dictValueParserGlobalLPPosition(): DictionaryValue<GlobalLPPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPPosition(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionData = {
    $$type: 'PerpPositionData';
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
    globalFundingRateSample: GlobalFundingRateSample | null;
    prevPremiumRate: bigint;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.globalPerpNetValue, 257);
        b_0.storeInt(src.globalPerpSingleValue, 257);
        let b_1 = new Builder();
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_1.storeBit(true); b_1.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_2.storeBit(true); b_2.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_2.storeBit(false); }
        let b_3 = new Builder();
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_3.storeBit(true); b_3.store(storeGlobalPosition(src.globalPosition)); } else { b_3.storeBit(false); }
        let b_4 = new Builder();
        if (src.globalFundingRateSample !== null && src.globalFundingRateSample !== undefined) { b_4.storeBit(true); b_4.store(storeGlobalFundingRateSample(src.globalFundingRateSample)); } else { b_4.storeBit(false); }
        let b_5 = new Builder();
        b_5.storeInt(src.prevPremiumRate, 257);
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _globalPerpNetValue = sc_0.loadIntBig(257);
    let _globalPerpSingleValue = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpPosition = sc_1.loadBit() ? loadDirectionPerpPosition(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _globalLPPosition = sc_2.loadBit() ? loadGlobalLPPosition(sc_2) : null;
    let sc_3 = sc_2.loadRef().beginParse();
    let _globalPosition = sc_3.loadBit() ? loadGlobalPosition(sc_3) : null;
    let sc_4 = sc_3.loadRef().beginParse();
    let _globalFundingRateSample = sc_4.loadBit() ? loadGlobalFundingRateSample(sc_4) : null;
    let sc_5 = sc_4.loadRef().beginParse();
    let _prevPremiumRate = sc_5.loadIntBig(257);
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalFundingRateSample: _globalFundingRateSample, prevPremiumRate: _prevPremiumRate };
}

function loadTuplePerpPositionData(source: TupleReader) {
    let _globalPerpNetValue = source.readBigNumber();
    let _globalPerpSingleValue = source.readBigNumber();
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    const _globalFundingRateSample_p = source.readTupleOpt();
    const _globalFundingRateSample = _globalFundingRateSample_p ? loadTupleGlobalFundingRateSample(_globalFundingRateSample_p) : null;
    let _prevPremiumRate = source.readBigNumber();
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalFundingRateSample: _globalFundingRateSample, prevPremiumRate: _prevPremiumRate };
}

function storeTuplePerpPositionData(source: PerpPositionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.globalPerpNetValue);
    builder.writeNumber(source.globalPerpSingleValue);
    if (source.perpPosition !== null && source.perpPosition !== undefined) {
        builder.writeTuple(storeTupleDirectionPerpPosition(source.perpPosition));
    } else {
        builder.writeTuple(null);
    }
    if (source.globalLPPosition !== null && source.globalLPPosition !== undefined) {
        builder.writeTuple(storeTupleGlobalLPPosition(source.globalLPPosition));
    } else {
        builder.writeTuple(null);
    }
    if (source.globalPosition !== null && source.globalPosition !== undefined) {
        builder.writeTuple(storeTupleGlobalPosition(source.globalPosition));
    } else {
        builder.writeTuple(null);
    }
    if (source.globalFundingRateSample !== null && source.globalFundingRateSample !== undefined) {
        builder.writeTuple(storeTupleGlobalFundingRateSample(source.globalFundingRateSample));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.prevPremiumRate);
    return builder.build();
}

function dictValueParserPerpPositionData(): DictionaryValue<PerpPositionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionData(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionData(src.loadRef().beginParse());
        }
    }
}

export type UpdatePriceParam = {
    $$type: 'UpdatePriceParam';
    tokenId: bigint;
    price: bigint;
}

export function storeUpdatePriceParam(src: UpdatePriceParam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
    };
}

export function loadUpdatePriceParam(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'UpdatePriceParam' as const, tokenId: _tokenId, price: _price };
}

function loadTupleUpdatePriceParam(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'UpdatePriceParam' as const, tokenId: _tokenId, price: _price };
}

function storeTupleUpdatePriceParam(source: UpdatePriceParam) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserUpdatePriceParam(): DictionaryValue<UpdatePriceParam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePriceParam(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePriceParam(src.loadRef().beginParse());
        }
    }
}

export type GlobalPosition = {
    $$type: 'GlobalPosition';
    longMargin: bigint;
    shortMargin: bigint;
    longSize: bigint;
    shortSize: bigint;
    longFundingFeeGrowth: bigint;
    shortFundingFeeGrowth: bigint;
    longValue: bigint;
    shortValue: bigint;
}

export function storeGlobalPosition(src: GlobalPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.longMargin, 257);
        b_0.storeInt(src.shortMargin, 257);
        b_0.storeInt(src.longSize, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortSize, 257);
        b_1.storeInt(src.longFundingFeeGrowth, 257);
        b_1.storeInt(src.shortFundingFeeGrowth, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.longValue, 257);
        b_2.storeInt(src.shortValue, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalPosition(slice: Slice) {
    let sc_0 = slice;
    let _longMargin = sc_0.loadIntBig(257);
    let _shortMargin = sc_0.loadIntBig(257);
    let _longSize = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortSize = sc_1.loadIntBig(257);
    let _longFundingFeeGrowth = sc_1.loadIntBig(257);
    let _shortFundingFeeGrowth = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _longValue = sc_2.loadIntBig(257);
    let _shortValue = sc_2.loadIntBig(257);
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longFundingFeeGrowth: _longFundingFeeGrowth, shortFundingFeeGrowth: _shortFundingFeeGrowth, longValue: _longValue, shortValue: _shortValue };
}

function loadTupleGlobalPosition(source: TupleReader) {
    let _longMargin = source.readBigNumber();
    let _shortMargin = source.readBigNumber();
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longFundingFeeGrowth = source.readBigNumber();
    let _shortFundingFeeGrowth = source.readBigNumber();
    let _longValue = source.readBigNumber();
    let _shortValue = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longFundingFeeGrowth: _longFundingFeeGrowth, shortFundingFeeGrowth: _shortFundingFeeGrowth, longValue: _longValue, shortValue: _shortValue };
}

function storeTupleGlobalPosition(source: GlobalPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longMargin);
    builder.writeNumber(source.shortMargin);
    builder.writeNumber(source.longSize);
    builder.writeNumber(source.shortSize);
    builder.writeNumber(source.longFundingFeeGrowth);
    builder.writeNumber(source.shortFundingFeeGrowth);
    builder.writeNumber(source.longValue);
    builder.writeNumber(source.shortValue);
    return builder.build();
}

function dictValueParserGlobalPosition(): DictionaryValue<GlobalPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalPosition(src.loadRef().beginParse());
        }
    }
}

export type GlobalFundingRateSample = {
    $$type: 'GlobalFundingRateSample';
    lastAdjustFundingRateTime: bigint;
    sampleCount: bigint;
    cumulativePremiumRate: bigint;
}

export function storeGlobalFundingRateSample(src: GlobalFundingRateSample) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lastAdjustFundingRateTime, 257);
        b_0.storeInt(src.sampleCount, 257);
        b_0.storeInt(src.cumulativePremiumRate, 257);
    };
}

export function loadGlobalFundingRateSample(slice: Slice) {
    let sc_0 = slice;
    let _lastAdjustFundingRateTime = sc_0.loadIntBig(257);
    let _sampleCount = sc_0.loadIntBig(257);
    let _cumulativePremiumRate = sc_0.loadIntBig(257);
    return { $$type: 'GlobalFundingRateSample' as const, lastAdjustFundingRateTime: _lastAdjustFundingRateTime, sampleCount: _sampleCount, cumulativePremiumRate: _cumulativePremiumRate };
}

function loadTupleGlobalFundingRateSample(source: TupleReader) {
    let _lastAdjustFundingRateTime = source.readBigNumber();
    let _sampleCount = source.readBigNumber();
    let _cumulativePremiumRate = source.readBigNumber();
    return { $$type: 'GlobalFundingRateSample' as const, lastAdjustFundingRateTime: _lastAdjustFundingRateTime, sampleCount: _sampleCount, cumulativePremiumRate: _cumulativePremiumRate };
}

function storeTupleGlobalFundingRateSample(source: GlobalFundingRateSample) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lastAdjustFundingRateTime);
    builder.writeNumber(source.sampleCount);
    builder.writeNumber(source.cumulativePremiumRate);
    return builder.build();
}

function dictValueParserGlobalFundingRateSample(): DictionaryValue<GlobalFundingRateSample> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalFundingRateSample(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalFundingRateSample(src.loadRef().beginParse());
        }
    }
}

export type UpdateFundingRateResult = {
    $$type: 'UpdateFundingRateResult';
    lpReceivedFundingFeeDelta: bigint;
    longFundingFeeGrowthAfter: bigint;
    shortFundingFeeGrowthAfter: bigint;
}

export function storeUpdateFundingRateResult(src: UpdateFundingRateResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lpReceivedFundingFeeDelta, 257);
        b_0.storeInt(src.longFundingFeeGrowthAfter, 257);
        b_0.storeInt(src.shortFundingFeeGrowthAfter, 257);
    };
}

export function loadUpdateFundingRateResult(slice: Slice) {
    let sc_0 = slice;
    let _lpReceivedFundingFeeDelta = sc_0.loadIntBig(257);
    let _longFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    let _shortFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    return { $$type: 'UpdateFundingRateResult' as const, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function loadTupleUpdateFundingRateResult(source: TupleReader) {
    let _lpReceivedFundingFeeDelta = source.readBigNumber();
    let _longFundingFeeGrowthAfter = source.readBigNumber();
    let _shortFundingFeeGrowthAfter = source.readBigNumber();
    return { $$type: 'UpdateFundingRateResult' as const, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function storeTupleUpdateFundingRateResult(source: UpdateFundingRateResult) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpReceivedFundingFeeDelta);
    builder.writeNumber(source.longFundingFeeGrowthAfter);
    builder.writeNumber(source.shortFundingFeeGrowthAfter);
    return builder.build();
}

function dictValueParserUpdateFundingRateResult(): DictionaryValue<UpdateFundingRateResult> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateFundingRateResult(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFundingRateResult(src.loadRef().beginParse());
        }
    }
}

export type UpdateFundingRateEventData = {
    $$type: 'UpdateFundingRateEventData';
    tokenId: bigint;
    lpReceivedFundingFeeDelta: bigint;
    longFundingFeeGrowthAfter: bigint;
    shortFundingFeeGrowthAfter: bigint;
}

export function storeUpdateFundingRateEventData(src: UpdateFundingRateEventData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.tokenId, 257);
        b_0.storeInt(src.lpReceivedFundingFeeDelta, 257);
        b_0.storeInt(src.longFundingFeeGrowthAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortFundingFeeGrowthAfter, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateFundingRateEventData(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadIntBig(257);
    let _lpReceivedFundingFeeDelta = sc_0.loadIntBig(257);
    let _longFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortFundingFeeGrowthAfter = sc_1.loadIntBig(257);
    return { $$type: 'UpdateFundingRateEventData' as const, tokenId: _tokenId, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function loadTupleUpdateFundingRateEventData(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _lpReceivedFundingFeeDelta = source.readBigNumber();
    let _longFundingFeeGrowthAfter = source.readBigNumber();
    let _shortFundingFeeGrowthAfter = source.readBigNumber();
    return { $$type: 'UpdateFundingRateEventData' as const, tokenId: _tokenId, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function storeTupleUpdateFundingRateEventData(source: UpdateFundingRateEventData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.lpReceivedFundingFeeDelta);
    builder.writeNumber(source.longFundingFeeGrowthAfter);
    builder.writeNumber(source.shortFundingFeeGrowthAfter);
    return builder.build();
}

function dictValueParserUpdateFundingRateEventData(): DictionaryValue<UpdateFundingRateEventData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateFundingRateEventData(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFundingRateEventData(src.loadRef().beginParse());
        }
    }
}

 type Pool_init_args = {
    $$type: 'Pool_init_args';
    deployId: bigint;
}

function initPool_init_args(src: Pool_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.deployId, 257);
    };
}

async function Pool_init(deployId: bigint) {
    const __code = Cell.fromBase64('te6ccgECoAEANpcAART/APSkE/S88sgLAQIBYgIDAvjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPmQQCASB+fwJqDhEQDhDfVRzbPPLggsj4QwHMfwHKABEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQFBgRuAZIwf+BwIddJwh+VMCDXCx/eIIIQLk+xv7qPCDDbPGwa2zx/4CCCEMsu5qK64wIgghD+sqdmugcICQoB9gERGgERG4EBAc8AAREYAYEBAc8AAREWAYEBAc8AAREUAfQAERLIgQEBzwABEREBgQEBzwAfgQEBzwDIUA4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQDCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFh8A9tMfAYIQLk+xv7ry4IGBAQHXAPQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA+gDUAdCBAQHXAIEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRBKEEkQSBBHEEYQRQH0ERoRJBEaERkRIxEZERgRIhEYERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEkBgURIwUEESIEAxEhAwIRIAILAhAw2zxsHds8fw0OBKKOsjDTHwGCEP6yp2a68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS4CCCEOic1F+64wIgghD/V+VXuuMCIIIQHciVjLoTFBUWA8QBER8BER7bPFcQVxFXElcSVxJXE1cTVxNwlCBWF7mK6DBXFFcU+EJwcIBAECNtbW3bPA0RFw0NERYNDREVDQ0RFA0JERMJDRESDQcREQcHERAHEF8QThA9TLoQOBBWEEVANBAMfADoVhWBAQEiWfQNb6GSMG3fIG6SMG2OKND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAWWwSbwLiIG6zjiyBAQshIG7y0IBvIjACIG7y0IBvIjEQOxJxIW6VW1n0WTCYyAHPAEEz9EHiCJEw4qQAutMfAYIQyy7morry4IHTP9QB0AHSAIEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAMBB9EHwQexB6EHkQeAH0ERoRJxEaERkRJhEZERgRJREYERcRJBEXERYRIxEWERURIhEVERQRIREUERMRIBETERIRHxESERERHhERERARHREQDxEcDw4RGw4NEScNDBEmDAsRJQsKESQKCREjCQgRIggHESEHBhEgBgURHwUEER4EAxEdAwIRHAIPBP4BERsBESfbPFYXgQEBVihZ9A1voZIwbd8gbpIwbY6H0Ns8bBxvDOIgbjGzMAoRJQoJESQJCBEjCAcRIgcGESEGBREgBQQRHwQDEScDAhEeAgERHQERHIEBAREcyFWw2zzJED0CERECAREcASBulTBZ9FowlEEz9BXi+EJwcIBAEJ8REgAU+EJWFAHHBfLghACoyFAMzxbJUAzMGcoAF4EBAc8AFYEBAc8AE4EBAc8AAciBAQHPABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwAUgQEBzwACyIEBAc8AyVjMyVjMyQHMAX4QI21tbds8DREaDQwRGQwLERgLERcJERYJCBEVCAcRFAcGERMGBRESBQQREQQDERADT+AQrQkIBwYFRMQbGhN8Ac6CAKD3+EJWFAHHBfL0VhPCAI7QVxNwIHADgEARFiPIVSCCEF3VhGFQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyVYWRBQDERYBECQQI21t2zyRW+J/fAKqMNMfAYIQ6JzUX7ry4IHSANM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANM/VUBsFYIAoPf4QlYZAccF8vQEjoLbPI6C2zzifyAhAhAw2zxsHNs8fxcYAriOzjDTHwGCEB3IlYy68uCB0z/TP/QEVSBsEzJwgQEL+EJWFFlxQTP0Cm+hlAHXADCSW23iIG6zljEgbvLQgJEw4oIAoPcB8vQgwQGRW+MOf+CCEJRqmLa64wIwcGprAMjTHwGCEP9X5Ve68uCB0z/TB9M/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAIEBAdcAgQEB1wDUAdCBAQHXANIA0z+BAQHXAIEBAdcAMBBcEFsQWhBZEFgQVxBWAfaCAKD3+EJWIAHHBfL0ERoRJhEaERkRJREZERgRJBEYERcRIxEXERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RJg4NESUNDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUZA5wEERwEAxEbAwIRJgIBESUBESRWIVYm2zwQI18DgUqqViW2C4IQO5rKALny9IIQO5rKAFYloFYmqIIQO5rKAKkEViPACpF/lFYjwAvi4w9vGhsB/hEcmVYbAREdvvLmbJlWGwERHbvy5mziERkRJREZERgRJBEYERcRIxEXERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRFAgHERMHBhESBgUREQUwAxxWI8ADjwZWI8AE4w/jDRwdHgH8VxxXHBEZESURGREYESQRGBEXESMRFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRFQkIERQIBxETBwYREgYFEREFBBEQBBA/TtwaGUAIBgUEA9s8RgH+ERyZVhsBER2+8uZsmVYbAREdu/LmbOIRGRElERkRGBEkERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRFgoJERUJCBEUCAcREwcGERIGBRERBUUB6lccVxxXHFccVx8RFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRFgoJERUJCBEUCAcREwcGERIGBRERBQQREAQQP07cEGtKkBAnECYQRRLbPFgA9BqBAQHPAMhQCSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhf0ABX0ABPLP/QAgQEBzwCBAQHPAAHI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IqhWJFYTqII4BWvHXi1jEAAAqQS+UQCKMVcTVxRXFFcfVx9XIFcgUc2gAREkAQ2gcFRwACAFESgFERERIxERAhEiAhESESAREhETER8REwQREwQREgMREQMBERAEAJxXFFcUVxRXFFcULFYeClYgoQhWJKERFREaERURFBEZERQRExEYERMREhEXERIREREWEREREBEVERABERQBChETCg0REg0PEREPEKsICgkBzlNctglQbaG2CyVWJKiCOAVrx14tYxAAAKkEUpARJaiCOAVrx14tYxAAAKkEViQhtglQDqEBETABoFYjLaG2CwERMKEBETABoBCPBxEvBxBqEFwQTgMRFAMCERMCARESARERgQELERFSAAwBESEB8vQB7MhVkBBaEEkQOEdqUEXLPxKBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyFVABlBFyz8SgQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkBzMkCERICGFYfASBulTBZ9FkwlEEz9BPigQEBAcgBAfQAyQIRKQJWHQFTAvwgbpUwWfRaMJRBM/QV4oEBASVURzAmAlYoAlYUVEcwAREeAREuyFVw2zzJAhElAgERJwFWGwEgbpUwWfRaMJRBM/QV4lR1y4EBAQ7IVTBQNIEBAc8AygCBAQHPAIEBAc8AyQIRKwIbVhoBIG6VMFn0WjCUQTP0FeIRGhE3ERp5VAL8ERkRNhEZERgRNREYERcRNBEXERYRMxEWERURMhEVERQRMREUERMRMBETERIRLxESERERLhERERARLREQDxEsDw4RKw4NESoNDAsRKAsKEScKCREmCQgRJQgHETEHBhEjBgURJgUQNAMRIAMCER8CAREeAREdcts8gSTVIcIAbVUC+PL0cHFWHlY3ViHIVSCCEO8BwrRQBMsfEss/gQEBzwDLP8lWFlUwECQQI21t2zwRGhE3ERoRGREqERkRGBE2ERgRFxE1ERcRFhE0ERYRFREuERURFBEiERQRExEyERMREhEtERIREREwEREREBErERAPETEPDhEjDg0RJg18VgL4DBEzDAsRHgsKER8KCREpCQgRIQgHER0HBhEkBgURIAUEESgEAxEnA1YeA1YgAwIRLgIBEScBETEREBERERDIER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AGZXAHoNERkNDREYDQ0RFw0NERYNERERFRERBREUBRERERMREREQERIREA4REA4QXxBuEJ0QnEqwEEgHBhA1RAQDAupWH4EBASZZ9A1voZIwbd8gbpIwbY6H0Ns8bBxvDOKBbJYhbrPy9CBu8tCAbyxbMjQ0NDWCAI9uUATy9FYTgQEBKln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCyxZ9AtvoZIwbd+fWQH+IG6SMG2OStDTP4EBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBUUQzAF1AHQ0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAVFEMwNRBaVQNsGm8K4iBus5cgbvLQgG8qmzBwVHAAIHBUcAAg4lYSlVR5h1OYlVR0MlND4oEUdiPCAFoD/vL0XVYjgQEBVhxZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOIgbrOXIG7y0IBvKJkwcFRwAFRwACDiViGOE1I7oSyogjgFa8deLWMQAACpBCOOE1IroSyogjgFa8deLWMQAACpBCLiViKOFCxWIaFS4KiCOAVrx14tYxAAAKkE4w2OW1wAKFYgLaFS4KiCOAVrx14tYxAAAKkEAfRS4BEiqFYeVh6gqII4ChjwfXNrkL5VqhypBFYfoC+BSjMRI6C+AREhAfL0Ud2gVh2hgjgFa8deLWMQAACoViGUC6MsqJNRvKjiG6BWGwERG6BWIJaCF8RlNgCWghA7msoA4qAbqIIQO5rKAKkEAREZAakEVi+BAQFWIV0C/ln0DW+hkjBt3yBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTiIG6zlyBu8tCAbySVMHBwUxHicFOkwgCUViQlvZFw4uMAIMIAjhQ0UkOoUzWooFNDoKkEUEOgViJDQ5Ew4lOlqAERH6iCOAoY8H1za5C+VaocqQQgER1eXwCCMVNKtghWJLOOE1NjoVIQqII4BWvHXi1jEAAAqQSOE1M2oVIQqII4BWvHXi1jEAAAqQTiUSGhUGahIMAAknA03gUB/qiCEDuaygCpBFYcIaEBEToBoFYeVjqgARE0AaBWHqNwVHAAIFYpjhRXHFccVxxXHFccVhpWGlHOoVGtoY4tVxdXF1cXVxdXF1YVVhVRvqFRnaERFxEcERcRFhEbERYBERcBCxEWCxC8CQsK4lYQVhC2CQEREQEREKG2C1YQViZgAcaogjgFa8deLWMQAACpBFKgESeogjgFa8deLWMQAACpBFYmIbYJARERoQERLwGgViVWEKG2CwERL6EBES8BoAgRHAgHES4HEGsFERkFBBEYBAMRFwMCERYCAREVAREUgQELERRhAezIVZAQWhBJEDhHalBFyz8SgQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMhVQAZQRcs/EoEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJAczJAhEVAhtWHwEgbpUwWfRZMJRBM/QT4oEBAQHIAQH0AMkCESgCVh0BYgL4IG6VMFn0WjCUQTP0FeKBAQEpAlYUVEcwVhUCVhlUSzABESABCshVcNs8yQIRJAITVhsBIG6VMFn0WjCUQTP0FeJWJFPcgQEBDshVMFA0gQEBzwDKAIEBAc8AgQEBzwDJAhEqAhtWGgEgbpUwWfRaMJRBM/QV4hEaETYRGnljAvwRGRE1ERkRGBE0ERgRFxEzERcRFhEyERYRFRExERURFBEwERQRExEvERMREhEuERIREREnEREREBEsERAPESsPDhEqDg0RKQ0MEIsKESYKCRElCQgRJAgHETIHBhEiBgURJQUEESIEAxEfAwIRHgIBER0BERxy2zyBJNUhwgBtZAL+8vRwcVY5VjNWIMhVIIIQ7wHCtFAEyx8Syz+BAQHPAMs/yVYWVTAQJBAjbW3bPBEaETYRGnMRGhEZESMRGREYETYRGBEXETURFxEWETQRFhEVESIRFREUESoRFBETESkRExESER0REhERESEREREQETMREA8RLQ8OESAODREyDXxlAvgMETAMCxEmCwoRLAoJER4JCBErCAcRKAcGER8GBREkBQQRJQQDEScDVjADVicDAhEwAgERMQERMxEQEREREMgRHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAZmcB9IIQFZLdFQERIMsfAREeAcs/AREcAcs/AREaAcsHAREYAcs/AREWINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAREUAcs/ARESAcoAAREQAYEBAc8ADsiBAQHPAB2BAQHPABuBAQHPAAnIgQEB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byIBkTLiECRwAwSAQlAj2zx8AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AH0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASCAgQIBIIeIAqm5f42zwRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9ssYmYICAceDhAAsgQEBUwNQM0Ez9AxvoZQB1wAwkltt4gLsquEgbpIwbY4cINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOLbPBEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bOds15mFAhipHds82zxXEF8PbLGZhgBkbSFus44dMIEBCwEgbvLQgFYRWXFBM/QKb6GUAdcAMJJbbeKRMeJWG1YbVhtWGVYZVhgABFYTAgEgiYoCASCQkQP5t1EEDdJGDbHDhBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERxbZ4IjQiOCI0IjIiNiIyIjAiNCIwIi4iMiIuIiwiMCIsIioiLiIqIigiLCIoIiYiKiImIiQiKCIkIiIiJiIiIiAiJCIgHiIiHhwiIBwhvqo5tnjZztmvCZi4wA3bd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkE4IGc6tPOK/OkoWA6wtxMj2UAP2bSFus46kKoEBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBus5IwMeMNkTHiLoEBASNZ9A1voZIwbd8gbpIwbY4Y0IEBAdcA0gCBAQHXAIEBAdcAVTBsFG8E4iiBAQEkWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigQEBjY6PAJ4EIG6SMG2OESBu8tCAbypVRG8FVUBvBW8C4gMgbpIwbZkgbvLQgG8kbwTiAiBukjBtmSBu8tCAbyhvCOIBIG6SMG2ZIG7y0IBvI28D4lUDANoxIG7y0IBvIYEBCwIgbvLQgBJZ9AtvoZIwbd8gbpIwbY5K0NM/gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFRRDMAXUAdDTP4EBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBUUQzA1EFpVA2wabwriAGqBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAMBBYEFcQVgBiVEcVWfQNb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiKFFIBEMTJgIBIJKTAtW1A5tngiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7ZYkDdJGDbMkDd5aEA3ljeGcRA3SRg270JmaABGwr7tRNDSAAGACASCUlQPtrn2QN0kYNscOEGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRHFtngiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eNnq2YsCZlpcAdazdxoatLgzOZ0Xl6i2sSM4uDioKCkisiU3NZm4N7KrvDcZtLQqJCmoO6O6tqOqIyKcuTwbMTW3mjvBAAWRtIW6zjqUwgQELASBu8tCAVhBZWfQLb6GSMG3fIG6SMG2Oh9DbPGwWbwbikTHiVHy6LJgAJAQgbpIwbZkgbvLQgG8mbwbiBABO0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAmECUQJBAjAtDtRNDUAfhj0gABjsbbPFcbERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJgQEB1wABAdHbPJucATyBAQFWGQJZ9A1voZIwbd8gbpIwbY6H0Ns8bBxvDOKfAdyBAQHXAIEBAdcAgQEB1wD0BNQB0IEBAdcAgQEB1wCBAQHXANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQw0J0ByjCCCmJaAIIQBV1KgIIImJaAbYIBUYCCElQL5ACCEDuaygBwbW1xbVR0RCBtJm1TM21tIvhCUxHIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFMingDo+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE0z/0BIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcA9ATTP/QEgQEB1wDUMNCBAQHXAPQE9ASBAQHXADARFxEbERcRFxEaERcRFxEZERcRFxEYERcAxshyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIgQEL+EJ/LAQRFgQhbpVbWfRZMJjIAc8AQTP0QeICERMCARESAQIREQIBERABTh9L3EipRXZQQwCY1AHQAdIAgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wAwEHwQexB6EHkQeA==');
    const __system = Cell.fromBase64('te6cckECogEANqEAAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWIfBAIBIBcFAgEgEAYCASAJBwLVtQObZ4IjQiNiI0IjIiNCIyIjAiMiIwIi4iMCIuIiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2WJA3SRg2zJA3eWhAN5Y3hnEQN0kYNu9CdCAE8gQEBVhkCWfQNb6GSMG3fIG6SMG2Oh9DbPGwcbwzilAIBIA8KAgEgDAsAdazdxoatLgzOZ0Xl6i2sSM4uDioKCkisiU3NZm4N7KrvDcZtLQqJCmoO6O6tqOqIyKcuTwbMTW3mjvBAA+2ufZA3SRg2xw4Qa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEcW2eCI0IjYiNCIyIjQiMiIwIjIiMCIuIjAiLiIsIi4iLCIqIiwiKiIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ42erZiwJ0ODQAkBCBukjBtmSBu8tCAbyZvBuIEAWRtIW6zjqUwgQELASBu8tCAVhBZWfQLb6GSMG3fIG6SMG2Oh9DbPGwWbwbikTHiVHy6LI0AEbCvu1E0NIAAYAIBIBIRAN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lAD+bdRBA3SRg2xw4Qa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEcW2eCI0IjgiNCIyIjYiMiIwIjQiMCIuIjIiLiIsIjAiLCIqIi4iKiIoIiwiKCImIioiJiIkIigiJCIiIiYiIiIgIiQiIB4iIh4cIiAcIb6qObZ42c7ZrwnRQTAJ4EIG6SMG2OESBu8tCAbypVRG8FVUBvBW8C4gMgbpIwbZkgbvLQgG8kbwTiAiBukjBtmSBu8tCAbyhvCOIBIG6SMG2ZIG7y0IBvI28D4lUDA/ZtIW6zjqQqgQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6zkjAx4w2RMeIugQEBI1n0DW+hkjBt3yBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTiKIEBASRZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBAQEWeBUAYlRHFVn0DW+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4ihRSARDEyYA2jEgbvLQgG8hgQELAiBu8tCAEln0C2+hkjBt3yBukjBtjkrQ0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAVFEMwBdQB0NM/gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFRRDMDUQWlUDbBpvCuICASAdGAIBxxsZAhipHds82zxXEF8PbLGdGgAEVhMC7KrhIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPGznbNedHABkbSFus44dMIEBCwEgbvLQgFYRWXFBM/QKb6GUAdcAMJJbbeKRMeJWG1YbVhtWGVYZVhgCqbl/jbPBEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2yxidHgAsgQEBUwNQM0Ez9AxvoZQB1wAwkltt4gL40AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERD50gAmoOERAOEN9VHNs88uCCyPhDAcx/AcoAERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVCMhAfYBERoBERuBAQHPAAERGAGBAQHPAAERFgGBAQHPAAERFAH0ABESyIEBAc8AARERAYEBAc8AH4EBAc8AyFAOINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYiAPQagQEBzwDIUAkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYX9AAV9AATyz/0AIEBAc8AgQEBzwAByIEBAc8AE4EBAc8A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kL5VqhypBCARHT42Af6oghA7msoAqQRWHCGhARE6AaBWHlY6oAERNAGgVh6jcFRwACBWKY4UVxxXHFccVxxXHFYaVhpRzqFRraGOLVcXVxdXF1cXVxdWFVYVUb6hUZ2hERcRHBEXERYRGxEWAREXAQsRFgsQvAkLCuJWEFYQtgkBEREBERChtgtWEFYmNwHGqII4BWvHXi1jEAAAqQRSoBEnqII4BWvHXi1jEAAAqQRWJiG2CQEREaEBES8BoFYlVhChtgsBES+hAREvAaAIERwIBxEuBxBrBREZBQQRGAQDERcDAhEWAgERFQERFIEBCxEUOAHsyFWQEFoQSRA4R2pQRcs/EoEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczIVUAGUEXLPxKBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyQHMyQIRFQIbVh8BIG6VMFn0WTCUQTP0E+KBAQEByAEB9ADJAhEoAlYdATkC+CBulTBZ9FowlEEz9BXigQEBKQJWFFRHMFYVAlYZVEswAREgAQrIVXDbPMkCESQCE1YbASBulTBZ9FowlEEz9BXiViRT3IEBAQ7IVTBQNIEBAc8AygCBAQHPAIEBAc8AyQIRKgIbVhoBIG6VMFn0WjCUQTP0FeIRGhE2ERp0OgL8ERkRNREZERgRNBEYERcRMxEXERYRMhEWERURMREVERQRMBEUERMRLxETERIRLhESERERJxERERARLBEQDxErDw4RKg4NESkNDBCLChEmCgkRJQkIESQIBxEyBwYRIgYFESUFBBEiBAMRHwMCER4CAREdAREccts8gSTVIcIAijsC/vL0cHFWOVYzViDIVSCCEO8BwrRQBMsfEss/gQEBzwDLP8lWFlUwECQQI21t2zwRGhE2ERpzERoRGREjERkRGBE2ERgRFxE1ERcRFhE0ERYRFREiERURFBEqERQRExEpERMREhEdERIREREhEREREBEzERAPES0PDhEgDg0RMg2YPAL4DBEwDAsRJgsKESwKCREeCQgRKwgHESgHBhEfBgURJAUEESUEAxEnA1YwA1YnAwIRMAIBETEBETMREBERERDIER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AE89AIIREREZEREGERgGERERFxERBhEWBhERERUREQURFAUNERMNDBESDBERBBEQBBBvEE4QPQwQOxCaEGkYEEcQNkUDAgCCMVNKtghWJLOOE1NjoVIQqII4BWvHXi1jEAAAqQSOE1M2oVIQqII4BWvHXi1jEAAAqQTiUSGhUGahIMAAknA03gUAKFYgLaFS4KiCOAVrx14tYxAAAKkEAf4RHJlWGwERHb7y5myZVhsBER278uZs4hEZESURGREYESQRGBEXESMRFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRFQkIERQIBxETBwYREgYFEREFQQEkBBEQBBA/TtwaGUAIBgUEA9s8QwH8VxxXHBEZESURGREYESQRGBEXESMRFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRFQkIERQIBxETBwYREgYFEREFBBEQBBA/TtwaGUAIBgUEA9s8QwLoViKBAQEoWfQNb6GSMG3fIG6SMG2Oh9DbPGwcbwzigWyWIW6z8vQgbvLQgG8sWzI1NTaCAI9uUAXy9FYXgQEBLVn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCy9Z9AtvoZIwbd+URAH+IG6SMG2OStDTP4EBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBUUQzAF1AHQ0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAVFEMwNRBaVQNsGm8K4iBus5cgbvLQgG8qmzBwVHAAIHBUcAAg4lYVlVR5h1OYlVR0MlND4oEUdiPCAEUC/vL0VhgjvJVXGCERGN5WJYEBAVYdWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG6zlyBu8tCAbyiZMHBUcABUcAAg4lYijhNSOaEqqII4BWvHXi1jEAAAqQQjjhNSKaEqqII4BWvHXi1jEAAAqQQi4lY1gQEBViZZ9A1voZIwbd94RgPcIG6SMG2OGNCBAQHXANIAgQEB1wCBAQHXAFUwbBRvBOIgbrOXIG7y0IBvJJUwcHBTEeJwViYlwgCUViklvZFw4uMAIMIAjhU0UkOoI1YlqKBTQ6CpBFBDoFYnQ0ORMOJwIFYowgCSVyLjDVYTVipXVkcE/I4WViZWEqFWKQGogjgFa8deLWMQAACpBI4WVhFWJ6FWKQGogjgFa8deLWMQAACpBOJWFFMaoCShAREWAaCCAPPJIcL/8vRWKyG8lFcrVireViuhERRWKqEpERZWFaEhwgDjD1YpjhVXGVcZVxlXGVcZLFYeC1YgoQlWJKHjDlRTUkgBzlNctglQbaG2CyVWJKiCOAVrx14tYxAAAKkEUpARJaiCOAVrx14tYxAAAKkEViQhtglQDqEBETABoFYjLaG2CwERMKEBETABoBCPBxEvBxBqEFwQTgMRFAMCERMCARESARERgQELERFJAezIVZAQWhBJEDhHalBFyz8SgQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMhVQAZQRcs/EoEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJAczJAhESAhhWHwEgbpUwWfRZMJRBM/QT4oEBAQHIAQH0AMkCESkCVh0BSgL8IG6VMFn0WjCUQTP0FeKBAQElVEcwJgJWKAJWFFRHMAERHgERLshVcNs8yQIRJQIBEScBVhsBIG6VMFn0WjCUQTP0FeJUdcuBAQEOyFUwUDSBAQHPAMoAgQEBzwCBAQHPAMkCESsCG1YaASBulTBZ9FowlEEz9BXiERoRNxEadEsC/BEZETYRGREYETURGBEXETQRFxEWETMRFhEVETIRFREUETERFBETETARExESES8REhERES4REREQES0REA8RLA8OESsODREqDQwLESgLChEnCgkRJgkIESUIBxExBwYRIwYFESYFEDQDESADAhEfAgERHgERHXLbPIEk1SHCAIpMAvjy9HBxVh5WN1YhyFUgghDvAcK0UATLHxLLP4EBAc8Ayz/JVhZVMBAkECNtbds8ERoRNxEaERkRKhEZERgRNhEYERcRNREXERYRNBEWERURLhEVERQRIhEUERMRMhETERIRLRESERERMBERERARKxEQDxExDw4RIw4NESYNmE0C+AwRMwwLER4LChEfCgkRKQkIESEIBxEdBwYRJAYFESAFBBEoBAMRJwNWHgNWIAMCES4CAREnARExERAREREQyBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBPTgB6DREZDQ0RGA0NERcNDREWDRERERUREQURFAURERETEREREBESERAOERAOEF8QbhCdEJxKsBBIBwYQNUQEAwH0ghAVkt0VAREgyx8BER4Byz8BERwByz8BERoBywcBERgByz8BERYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERQByz8BERIBygABERABgQEBzwAOyIEBAc8AHYEBAc8AG4EBAc8ACciBAQHPABiBAQHPABZQAfyBAQHPAATIgQEBzwATgQEBzwCBAQHPAAHIgQEBzwATgQEBzwATgQEBzwAEyIEBAc8AFYEBAc8AFoEBAc8ABsiBAQHPABfKABeBAQHPABeBAQHPAAfIgQEBzwAYgQEBzwAYgQEBzwAIyIEBAc8AyVAIzMlQBMzJUAbMyVAFzMlRABhQBMzJWMzJWMzJAcwAnFcUVxRXFFcUVxQsVh4KViChCFYkoREVERoRFREUERkRFBETERgRExESERcREhERERYREREQERUREAERFAEKERMKDRESDQ8REQ8QqwgKCQCKMVcTVxRXFFcfVx9XIFcgUc2gAREkAQ2gcFRwACAFESgFERERIxERAhEiAhESESAREhETER8REwQREwQREgMREQMBERAEAfxWLY4VVilWFaFSIKiCOAVrx14tYxAAAKkEjhVWFFYqoVIgqII4BWvHXi1jEAAAqQTiIlYrqAERJgERKaABESgBqII4ChjwfXNrkL5VqhypBAERJqBWFIFvuxEloLkBESMB8vRWEoFDoBEiqFYkVhOogjgFa8deLWMQAACpBL5VAAwBESEB8vQAeFtWJlYlqFYgqII4ChjwfXNrkL5VqhypBCARIqiCEDuaygCpBFYhIaEBEUEBoCFWQaABETsBoBE6EUARIQCIMSRWJ7YIVimzjhRWJSShUhCogjgFa8deLWMQAACpBI4UI1YmoVIQqII4BWvHXi1jEAAAqQTiUSGhUGahIMAAknA03gUB/hEcmVYbAREdvvLmbJlWGwERHbvy5mziERkRJREZERgRJBEYERcRIxEXERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRFAgHERMHBhESBgUREQVZASQEERAEED9O3BoZQAgGBQQD2zxaAvRWIoEBAShZ9A1voZIwbd8gbpIwbY6H0Ns8bBxvDOKBbJYhbrPy9CBu8tCAbyxbMjiCAI9uUAfy9FOoqII4BWvHXi1jEAAAqQQggXpkB74W8vQEgVrNBLsT8vRWF4EBAS1Z9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBus5RbAv6XIG7y0IBvIZIwbeIggQELL1n0C2+hkjBt3yBukjBtjkrQ0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAVFEMwBdQB0NM/gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFRRDMDUQWlUDbBpvCuIgbrObMHBUcAAgcFRwACDjDVYVbVwC+JVUeYdTmJVUdDJTQ+IiwACXNFYlpBEmBN5WJYEBAVYdWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG6zlyBu8tCAbyiZMHBUcABUcAAg4lYilAVWIKCWBFYgoAQF4lMVtglQJqG2CyFWIKiCOAVrx14tYxAAAKkEUlARIah4XQH8gjgFa8deLWMQAACpBFY0VjKgViEitglQCKEBES0BoIFbEidWP6iCEDuaygCpBFIgu/L0ViBWLaG2C1ihAREtAaAgggDZyge7FvL0VjOBAQFWJFn0DW+hkjBt3yBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTiIG6zXgPulyBu8tCAbySVMHBwUxHicFYkJcIAlFYnJbqRcOKOQzEkViW2CFYnjhRWIyShUhCogjgFa8deLWMQAACpBI4UI1YkoVIQqII4BWvHXi1jEAAAqQTiUSGhUGahIMAAknA03gXeIMIAkTDjDXAgVibCAJJXIeMNVidsa18C+I4TUo6hL6iCOAVrx14tYxAAAKkEKI4TUn6hL6iCOAVrx14tYxAAAKkEJ+JWEREoIqAvoQEREgGgIBEooVYQAREQqFYmViWooFYQViegqQQREFYmoFYRVimOFVYRViahUiCogjgFa8deLWMQAACpBOMNIlYnqAERJQERI6BqYAL8AREiAaiCOAoY8H1za5C+VaocqQQBESCgVieBb7sRJKC5AREiAfL0ViWBQ6ARHqhWHlYQqII4BWvHXi1jEAAAqQS+AREdAfL0ViWOE1cVVxVXFVcVVxUqViBWGStRm6DjDhA4R2AQWQQRHAQDERMDAhESAgEREQEREIEBCxEQaWEB7MhVkBBaEEkQOEdqUEXLPxKBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyFVABlBFyz8SgQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkBzMkCERECF1YeASBulTBZ9FkwlEEz9BPigQEBAcgBAfQAyQIRKAJWHAFiAvwgbpUwWfRaMJRBM/QV4oEBASZUSjBWEFRKMCkCVhcCAREdAREpyFVw2zzJAhEkAgERIgFWGgEgbpUwWfRaMJRBM/QV4lR6mIEBAQvIVTBQNIEBAc8AygCBAQHPAIEBAc8AyQIRKgIYVhkBIG6VMFn0WjCUQTP0FeIRGhE2ERp0YwL+ERkRNREZERgRNBEYERcRMxEXERYRMhEWERURMREVERQRMBEUERMRLxETERIRLhESERERLRERERARLBEQDxErDw4RKg4NESkNDAsRJwsKESYKCRElCQgRJAgHES8HBhEiBgURIgUDESADAhEeAgERHQERHHLbPIEk1SHCAPL0cIpkAvhxVjlwViDIVSCCEO8BwrRQBMsfEss/gQEBzwDLP8lWFlUwECQQI21t2zwRGhE2ERoRGRE1ERkRGBEoERgRFxE0ERcRFhEzERYRFREyERURFBEjERQRExExERMREhEwERIREREpEREREBEuERAPER8PDhEnDg0RLA0MESEMmGUC+AsRHgsKESIKCREmCQgRIAgHER0HBhEqBgURJQUEESQEAxEvA1YeA1YjAwIRLQIBER4BES8PERAPyBEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADBEYDAwRFwxnZgBiDBEWDAwRFQwHERQHDBETDAcREgcNERENBxEQBxA/EL4QfRBcECsQahBpEEhAFgVQcwH0ghBJmPhDAREfyx8BER0Byz8BERsByz8BERkBywcBERcByz8BERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMByz8BEREBygAfgQEBzwANyIEBAc8AHIEBAc8AGoEBAc8ACMiBAQHPABeBAQHPABWBAQFoAPLPAAPIgQEBzwASgQEBzwCBAQHPAALIgQEBzwATgQEBzwAUgQEBzwAEyIEBAc8AFoEBAc8AFoEBAc8AFsoABsiBAQHPABeBAQHPABeBAQHPAAfIgQEBzwAYgQEBzwAYgQEB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FREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgiYEBAdcAAQHR2zygngHKMIIKYloAghAFXUqAggiYloBtggFRgIISVAvkAIIQO5rKAHBtbXFtVHREIG0mbVMzbW0i+EJTEchyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUyKfAMbIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIEBC/hCfywEERYEIW6VW1n0WTCYyAHPAEEz9EHiAhETAgEREgECERECAREQAU4fS9xIqUV2UEMB3IEBAdcAgQEB1wCBAQHXAPQE1AHQgQEB1wCBAQHXAIEBAdcA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1DDQoQDo+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE0z/0BIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcA9ATTP/QEgQEB1wDUMNCBAQHXAPQE9ASBAQHXADARFxEbERcRFxEaERcRFxEZERcRFxEYERdeFqrV');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPool_init_args({ $$type: 'Pool_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Pool_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    1644: { message: `not reach trigger price` },
    5238: { message: `position not exist` },
    9429: { message: `send gas not enough` },
    17312: { message: `leverage too high` },
    18995: { message: `margin rate too low` },
    19114: { message: `invalid premium rate` },
    23245: { message: `greater than max value` },
    23314: { message: `insufficient liquidity for single value` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31332: { message: `less than min value` },
    31425: { message: `not reach unlock time` },
    36718: { message: `disabled token` },
    39251: { message: `insufficient global LP` },
    41207: { message: `invalid sender` },
    54040: { message: `insufficient global net LP` },
    55754: { message: `insufficient liquidity for net value` },
    59588: { message: `token config not exist` },
    62409: { message: `insufficient margin` },
}

const Pool_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateConfig","header":776974783,"fields":[{"name":"executorLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executors","type":{"kind":"dict","key":"int","value":"ExecutorParam","valueFormat":"ref"}},{"name":"claimExecutor","type":{"kind":"simple","type":"address","optional":false}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateTokenConfig","header":3408848546,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maintenanceRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityProportion","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ClaimProtocolFee","header":4273121126,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendProtocolFee","header":1574274145,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePrice","header":499684748,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"LPPositionIncreasedEvent","header":866046695,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionDecreasedEvent","header":4192904720,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionIncreasedEvent","header":1234761795,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpReceivedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionDecreasedEvent","header":361946389,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpReceivedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateFundingFeeEvent","header":3900186253,"fields":[{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"datas","type":{"kind":"dict","key":"int","value":"UpdateFundingRateEventData","valueFormat":"ref"}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ExecutorParam","header":null,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maintenanceRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityProportion","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionData","header":null,"fields":[{"name":"lpPosition","type":{"kind":"simple","type":"LPPosition","optional":true}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"globalPerpNetValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}},{"name":"globalFundingRateSample","type":{"kind":"simple","type":"GlobalFundingRateSample","optional":true}},{"name":"prevPremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePriceParam","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalFundingRateSample","header":null,"fields":[{"name":"lastAdjustFundingRateTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cumulativePremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateFundingRateResult","header":null,"fields":[{"name":"lpReceivedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateFundingRateEventData","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpReceivedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"priceData","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"lpPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"LPPositionData","optional":false}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Pool implements Contract {
    
    static async init(deployId: bigint) {
        return await Pool_init(deployId);
    }
    
    static async fromInit(deployId: bigint) {
        const init = await Pool_init(deployId);
        const address = contractAddress(0, init);
        return new Pool(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Pool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Pool_types,
        getters: Pool_getters,
        receivers: Pool_receivers,
        errors: Pool_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | ClaimProtocolFee | UpdateLPPosition | UpdatePerpPosition | UpdatePrice | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenConfig') {
            body = beginCell().store(storeUpdateTokenConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimProtocolFee') {
            body = beginCell().store(storeClaimProtocolFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLPPosition') {
            body = beginCell().store(storeUpdateLPPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePerpPosition') {
            body = beginCell().store(storeUpdatePerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePrice') {
            body = beginCell().store(storeUpdatePrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getConfigData(provider: ContractProvider, executor: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(executor);
        let source = (await provider.get('configData', builder.build())).stack;
        const result = loadTupleConfigData(source);
        return result;
    }
    
    async getTokenConfig(provider: ContractProvider, tokenId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        let source = (await provider.get('tokenConfig', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleTokenConfig(result_p) : null;
        return result;
    }
    
    async getPriceData(provider: ContractProvider, tokenId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        let source = (await provider.get('priceData', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getLpPosition(provider: ContractProvider, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('lpPosition', builder.build())).stack;
        const result = loadTupleLPPositionData(source);
        return result;
    }
    
    async getPerpPosition(provider: ContractProvider, tokenId: bigint, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        builder.writeAddress(account);
        let source = (await provider.get('perpPosition', builder.build())).stack;
        const result = loadTuplePerpPositionData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}