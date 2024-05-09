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

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    receiver: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _receiver = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, receiver: _receiver, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, receiver: _receiver, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type UpdateConfig = {
    $$type: 'UpdateConfig';
    executorLength: bigint;
    executors: Dictionary<bigint, ExecutorParam>;
    maxTimeDelayExecutor: bigint;
    minTimeDelayTrader: bigint;
    minExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    poolLpGasConsumption: bigint;
    poolPerpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasTransferJetton: bigint;
    usdtWallet: Address;
    pool: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(771386527, 32);
        b_0.storeInt(src.executorLength, 257);
        b_0.storeDict(src.executors, Dictionary.Keys.BigInt(257), dictValueParserExecutorParam());
        b_0.storeInt(src.maxTimeDelayExecutor, 257);
        b_0.storeInt(src.minTimeDelayTrader, 257);
        b_0.storeCoins(src.minExecutionFee);
        let b_1 = new Builder();
        b_1.storeCoins(src.lpGasConsumption);
        b_1.storeCoins(src.perpGasConsumption);
        b_1.storeCoins(src.poolLpGasConsumption);
        b_1.storeCoins(src.poolPerpGasConsumption);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeCoins(src.gasTransferJetton);
        b_1.storeAddress(src.usdtWallet);
        let b_2 = new Builder();
        b_2.storeAddress(src.pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 771386527) { throw Error('Invalid prefix'); }
    let _executorLength = sc_0.loadIntBig(257);
    let _executors = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserExecutorParam(), sc_0);
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _minExecutionFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpGasConsumption = sc_1.loadCoins();
    let _perpGasConsumption = sc_1.loadCoins();
    let _poolLpGasConsumption = sc_1.loadCoins();
    let _poolPerpGasConsumption = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _gasTransferJetton = sc_1.loadCoins();
    let _usdtWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _pool = sc_2.loadAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executorLength = source.readBigNumber();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserExecutorParam(), source.readCellOpt());
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _poolLpGasConsumption = source.readBigNumber();
    let _poolPerpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasTransferJetton = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executorLength);
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.BigInt(257), dictValueParserExecutorParam()).endCell() : null);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.poolLpGasConsumption);
    builder.writeNumber(source.poolPerpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasTransferJetton);
    builder.writeAddress(source.usdtWallet);
    builder.writeAddress(source.pool);
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

export type CreateDecreaseLPPositionOrder = {
    $$type: 'CreateDecreaseLPPositionOrder';
    executionFee: bigint;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeCreateDecreaseLPPositionOrder(src: CreateDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(632428324, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.liquidityDelta, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 632428324) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _liquidityDelta = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateDecreaseLPPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleCreateDecreaseLPPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateDecreaseLPPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleCreateDecreaseLPPositionOrder(source: CreateDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateDecreaseLPPositionOrder(): DictionaryValue<CreateDecreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreaseLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelLPPositionOrder = {
    $$type: 'CancelLPPositionOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeCancelLPPositionOrder(src: CancelLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2106714934, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCancelLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2106714934) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CancelLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCancelLPPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CancelLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCancelLPPositionOrder(source: CancelLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCancelLPPositionOrder(): DictionaryValue<CancelLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteLPPositionOrder = {
    $$type: 'ExecuteLPPositionOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeExecuteLPPositionOrder(src: ExecuteLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(310819211, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadExecuteLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 310819211) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'ExecuteLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleExecuteLPPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'ExecuteLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleExecuteLPPositionOrder(source: ExecuteLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserExecuteLPPositionOrder(): DictionaryValue<ExecuteLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteLPPositionOrder(src.loadRef().beginParse());
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

export type CreateCompensate = {
    $$type: 'CreateCompensate';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
}

export function storeCreateCompensate(src: CreateCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2945693128, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeUint(src.refundAmount, 128);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2945693128) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadUintBig(128);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function loadTupleCreateCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function storeTupleCreateCompensate(source: CreateCompensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserCreateCompensate(): DictionaryValue<CreateCompensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCreateCompensate(src.loadRef().beginParse());
        }
    }
}

export type CancelCompensate = {
    $$type: 'CancelCompensate';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCancelCompensate(src: CancelCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1491007674, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCancelCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1491007674) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CancelCompensate' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCancelCompensate(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelCompensate' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCancelCompensate(source: CancelCompensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelCompensate(): DictionaryValue<CancelCompensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCancelCompensate(src.loadRef().beginParse());
        }
    }
}

export type ExecuteCompensate = {
    $$type: 'ExecuteCompensate';
    compensateId: bigint;
    trxId: bigint;
}

export function storeExecuteCompensate(src: ExecuteCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3424428784, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadExecuteCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3424428784) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'ExecuteCompensate' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleExecuteCompensate(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteCompensate' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleExecuteCompensate(source: ExecuteCompensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteCompensate(): DictionaryValue<ExecuteCompensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteCompensate(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreasePerpPositionOrder = {
    $$type: 'CreateDecreasePerpPositionOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    trxId: bigint;
}

export function storeCreateDecreasePerpPositionOrder(src: CreateDecreasePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1787968987, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.marginDelta, 128);
        b_0.storeUint(src.sizeDelta, 128);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateDecreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1787968987) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadUintBig(128);
    let _sizeDelta = sc_0.loadUintBig(128);
    let _triggerPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId };
}

function loadTupleCreateDecreasePerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId };
}

function storeTupleCreateDecreasePerpPositionOrder(source: CreateDecreasePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateDecreasePerpPositionOrder(): DictionaryValue<CreateDecreasePerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreasePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreasePerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateTpSlPerpPositionOrder = {
    $$type: 'CreateTpSlPerpPositionOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    trxId: bigint;
}

export function storeCreateTpSlPerpPositionOrder(src: CreateTpSlPerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(600256344, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.tpSize, 128);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeUint(src.slSize, 128);
        b_0.storeUint(src.slPrice, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateTpSlPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 600256344) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _tpSize = sc_0.loadUintBig(128);
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadUintBig(128);
    let _slPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateTpSlPerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId };
}

function loadTupleCreateTpSlPerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateTpSlPerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId };
}

function storeTupleCreateTpSlPerpPositionOrder(source: CreateTpSlPerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateTpSlPerpPositionOrder(): DictionaryValue<CreateTpSlPerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateTpSlPerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateTpSlPerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelPerpPositionOrder = {
    $$type: 'CancelPerpPositionOrder';
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelPerpPositionOrder(src: CancelPerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3254342642, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCancelPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3254342642) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CancelPerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelPerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelPerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelPerpPositionOrder(source: CancelPerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelPerpPositionOrder(): DictionaryValue<CancelPerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelPerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelPerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecutePerpPositionOrder = {
    $$type: 'ExecutePerpPositionOrder';
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
    tokenId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeExecutePerpPositionOrder(src: ExecutePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2650410712, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadExecutePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2650410712) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate };
}

function loadTupleExecutePerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate };
}

function storeTupleExecutePerpPositionOrder(source: ExecutePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserExecutePerpPositionOrder(): DictionaryValue<ExecutePerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecutePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecutePerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type LiquidatePerpPosition = {
    $$type: 'LiquidatePerpPosition';
    liquidationFeeReceiver: Address | null;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeLiquidatePerpPosition(src: LiquidatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(590625716, 32);
        b_0.storeAddress(src.liquidationFeeReceiver);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeInt(src.price, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.premiumRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 590625716) { throw Error('Invalid prefix'); }
    let _liquidationFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _premiumRate = sc_1.loadIntBig(257);
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function loadTupleLiquidatePerpPosition(source: TupleReader) {
    let _liquidationFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function storeTupleLiquidatePerpPosition(source: LiquidatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.liquidationFeeReceiver);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserLiquidatePerpPosition(): DictionaryValue<LiquidatePerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLiquidatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type ADLPerpPosition = {
    $$type: 'ADLPerpPosition';
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeADLPerpPosition(src: ADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3962817618, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.marginDelta, 128);
        b_0.storeUint(src.sizeDelta, 128);
        b_0.storeUint(src.trxId, 64);
        b_0.storeInt(src.price, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.premiumRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3962817618) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadUintBig(128);
    let _sizeDelta = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _premiumRate = sc_1.loadIntBig(257);
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function loadTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function storeTupleADLPerpPosition(source: ADLPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserADLPerpPosition(): DictionaryValue<ADLPerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeADLPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadADLPerpPosition(src.loadRef().beginParse());
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

export type LPPositionOrderCreatedEvent = {
    $$type: 'LPPositionOrderCreatedEvent';
    opType: bigint;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLPPositionOrderCreatedEvent(src: LPPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3021458540, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeCoins(src.executionFee);
        b_0.storeInt(src.orderId, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLPPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3021458540) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadCoins();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LPPositionOrderCreatedEvent' as const, opType: _opType, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadTupleLPPositionOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionOrderCreatedEvent' as const, opType: _opType, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function storeTupleLPPositionOrderCreatedEvent(source: LPPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionOrderCreatedEvent(): DictionaryValue<LPPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderCancelledEvent = {
    $$type: 'LPPositionOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLPPositionOrderCancelledEvent(src: LPPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1264945856, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLPPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1264945856) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LPPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLPPositionOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLPPositionOrderCancelledEvent(source: LPPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionOrderCancelledEvent(): DictionaryValue<LPPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderExecutedEvent = {
    $$type: 'LPPositionOrderExecutedEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLPPositionOrderExecutedEvent(src: LPPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3003473876, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLPPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3003473876) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LPPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLPPositionOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLPPositionOrderExecutedEvent(source: LPPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionOrderExecutedEvent(): DictionaryValue<LPPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderCreatedEvent = {
    $$type: 'PerpPositionOrderCreatedEvent';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpPositionOrderCreatedEvent(src: PerpPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1919115613, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.tpSize, 257);
        b_1.storeInt(src.tpPrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.slSize, 257);
        b_2.storeInt(src.slPrice, 257);
        b_2.storeCoins(src.executionFee);
        b_2.storeInt(src.orderId, 257);
        b_2.storeUint(src.trxId, 64);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1919115613) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _tpSize = sc_1.loadIntBig(257);
    let _tpPrice = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _slSize = sc_2.loadIntBig(257);
    let _slPrice = sc_2.loadIntBig(257);
    let _executionFee = sc_2.loadCoins();
    let _orderId = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadUintBig(64);
    return { $$type: 'PerpPositionOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpPositionOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpPositionOrderCreatedEvent(source: PerpPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionOrderCreatedEvent(): DictionaryValue<PerpPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderCancelledEvent = {
    $$type: 'PerpPositionOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpPositionOrderCancelledEvent(src: PerpPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2151571829, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2151571829) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpPositionOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpPositionOrderCancelledEvent(source: PerpPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionOrderCancelledEvent(): DictionaryValue<PerpPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderExecutedEvent = {
    $$type: 'PerpPositionOrderExecutedEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpPositionOrderExecutedEvent(src: PerpPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2713389887, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2713389887) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpPositionOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpPositionOrderExecutedEvent(source: PerpPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionOrderExecutedEvent(): DictionaryValue<PerpPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateCreatedEvent = {
    $$type: 'CompensateCreatedEvent';
    compensateId: bigint;
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
    unlockTime: bigint;
}

export function storeCompensateCreatedEvent(src: CompensateCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(401001363, 32);
        b_0.storeUint(src.compensateId, 64);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeInt(src.refundAmount, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeCoins(src.executionFee);
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 401001363) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let _executionFee = sc_1.loadCoins();
    let _unlockTime = sc_1.loadIntBig(257);
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadTupleCompensateCreatedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function storeTupleCompensateCreatedEvent(source: CompensateCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserCompensateCreatedEvent(): DictionaryValue<CompensateCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateCancelledEvent = {
    $$type: 'CompensateCancelledEvent';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCompensateCancelledEvent(src: CompensateCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1271087573, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCompensateCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1271087573) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCompensateCancelledEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCompensateCancelledEvent(source: CompensateCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCompensateCancelledEvent(): DictionaryValue<CompensateCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateExecutedEvent = {
    $$type: 'CompensateExecutedEvent';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCompensateExecutedEvent(src: CompensateExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3678790712, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCompensateExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3678790712) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCompensateExecutedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCompensateExecutedEvent(source: CompensateExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCompensateExecutedEvent(): DictionaryValue<CompensateExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    maxTimeDelayExecutor: bigint;
    minTimeDelayTrader: bigint;
    minExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    poolLpGasConsumption: bigint;
    poolPerpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasTransferJetton: bigint;
    totalExecutionFee: bigint;
    usdtWallet: Address;
    pool: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.isExecutor !== null && src.isExecutor !== undefined) { b_0.storeBit(true).storeBit(src.isExecutor); } else { b_0.storeBit(false); }
        b_0.storeInt(src.maxTimeDelayExecutor, 257);
        b_0.storeInt(src.minTimeDelayTrader, 257);
        b_0.storeCoins(src.minExecutionFee);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.poolLpGasConsumption);
        let b_1 = new Builder();
        b_1.storeCoins(src.poolPerpGasConsumption);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeCoins(src.gasTransferJetton);
        b_1.storeCoins(src.totalExecutionFee);
        b_1.storeAddress(src.usdtWallet);
        let b_2 = new Builder();
        b_2.storeAddress(src.pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _minExecutionFee = sc_0.loadCoins();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _poolLpGasConsumption = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _poolPerpGasConsumption = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _gasTransferJetton = sc_1.loadCoins();
    let _totalExecutionFee = sc_1.loadCoins();
    let _usdtWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _pool = sc_2.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, totalExecutionFee: _totalExecutionFee, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _poolLpGasConsumption = source.readBigNumber();
    let _poolPerpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasTransferJetton = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, totalExecutionFee: _totalExecutionFee, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.poolLpGasConsumption);
    builder.writeNumber(source.poolPerpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasTransferJetton);
    builder.writeNumber(source.totalExecutionFee);
    builder.writeAddress(source.usdtWallet);
    builder.writeAddress(source.pool);
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

export type LPPositionOrder = {
    $$type: 'LPPositionOrder';
    isIncrease: boolean;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    executionFeeReceiver: Address;
    lastOperator: Address | null;
}

export function storeLPPositionOrder(src: LPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isIncrease);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeCoins(src.executionFee);
        b_0.storeInt(src.blockTime, 257);
        b_0.storeBit(src.isPending);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeAddress(src.lastOperator);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _isIncrease = sc_0.loadBit();
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadCoins();
    let _blockTime = sc_0.loadIntBig(257);
    let _isPending = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadAddress();
    let _lastOperator = sc_1.loadMaybeAddress();
    return { $$type: 'LPPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleLPPositionOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _executionFeeReceiver = source.readAddress();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'LPPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTupleLPPositionOrder(source: LPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.lastOperator);
    return builder.build();
}

function dictValueParserLPPositionOrder(): DictionaryValue<LPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrder = {
    $$type: 'PerpPositionOrder';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    executionFeeReceiver: Address;
    lastOperator: Address | null;
}

export function storePerpPositionOrder(src: PerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeCoins(src.executionFee);
        b_1.storeInt(src.blockTime, 257);
        b_1.storeBit(src.isPending);
        b_1.storeAddress(src.executionFeeReceiver);
        let b_2 = new Builder();
        b_2.storeAddress(src.lastOperator);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadCoins();
    let _blockTime = sc_1.loadIntBig(257);
    let _isPending = sc_1.loadBit();
    let _executionFeeReceiver = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _lastOperator = sc_2.loadMaybeAddress();
    return { $$type: 'PerpPositionOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTuplePerpPositionOrder(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _executionFeeReceiver = source.readAddress();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'PerpPositionOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTuplePerpPositionOrder(source: PerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.lastOperator);
    return builder.build();
}

function dictValueParserPerpPositionOrder(): DictionaryValue<PerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderEx = {
    $$type: 'PerpPositionOrderEx';
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    executionFee: bigint;
}

export function storePerpPositionOrderEx(src: PerpPositionOrderEx) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.tpSize, 257);
        b_0.storeInt(src.tpPrice, 257);
        b_0.storeInt(src.slSize, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.slPrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrderEx(slice: Slice) {
    let sc_0 = slice;
    let _tpSize = sc_0.loadIntBig(257);
    let _tpPrice = sc_0.loadIntBig(257);
    let _slSize = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _slPrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    return { $$type: 'PerpPositionOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function loadTuplePerpPositionOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'PerpPositionOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function storeTuplePerpPositionOrderEx(source: PerpPositionOrderEx) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserPerpPositionOrderEx(): DictionaryValue<PerpPositionOrderEx> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderEx(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderEx(src.loadRef().beginParse());
        }
    }
}

export type UpdatePrice = {
    $$type: 'UpdatePrice';
    tokenId: bigint;
    price: bigint;
}

export function storeUpdatePrice(src: UpdatePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
    };
}

export function loadUpdatePrice(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'UpdatePrice' as const, tokenId: _tokenId, price: _price };
}

function loadTupleUpdatePrice(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'UpdatePrice' as const, tokenId: _tokenId, price: _price };
}

function storeTupleUpdatePrice(source: UpdatePrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
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

export type Compensate = {
    $$type: 'Compensate';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
    unlockTime: bigint;
}

export function storeCompensate(src: Compensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeInt(src.refundAmount, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeCoins(src.executionFee);
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensate(slice: Slice) {
    let sc_0 = slice;
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let _executionFee = sc_1.loadCoins();
    let _unlockTime = sc_1.loadIntBig(257);
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadTupleCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function storeTupleCompensate(source: Compensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserCompensate(): DictionaryValue<Compensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCompensate(src.loadRef().beginParse());
        }
    }
}

 type OrderBook_init_args = {
    $$type: 'OrderBook_init_args';
    deployId: bigint;
}

function initOrderBook_init_args(src: OrderBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.deployId, 257);
    };
}

async function OrderBook_init(deployId: bigint) {
    const __code = Cell.fromBase64('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/GwhERcRGREXERYRGBEWERURGREVERQRGBEUERMRGRETERIRGBESERERGRERERARGBEQDxEZDw4RGA4NERkNDBEYDAsRGQsKERgKCREZCQgRGAgHERkHBhEYBgURGQUEERgEAxEZAwIRGAIBERkBERhWGVYa2zx/cIBCERnbPJssLQOeyFVw2zzJLBA+ASBulTBZ9FowlEEz9BXiEREhoHFRMEUTVCAXHchVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHFUHwAQKkkwEnDbPJknnwB4ghC0F8xsUAfLHxXLB1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAB+gKBAQHPAMs/A+z4QW8kE18DiwhwLVYkoBO5jhJbf4vmdhcyBub3QgZW5vdWdojeU+i5jhZbf40EWpldHRvbiBub3QgZW5vdWdog3nEmwgCTJcIAkXDikjBy3iTCAJMjwgCRcOKRpN5WHiGoUuC54wAC4wIwPQmRepKAC+JSrakEKSorAD5sIX+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iBYA/xswREXERkRFxEWERgRFhEVERkRFREUERgRFBETERkRExESERgREhERERkREREQERgREA8RGQ8OERgODREZDQwRGAwLERkLChEYCgkRGQkIERgIBxEZBwYRGAYFERkFBBEYBAMRGQMCERgCAREZAREYVhlWGts8f3CAQhEZ2zybLC0B+BEhESMRIREgESIRIBEfESMRHxEeESIRHhEdESMRHREcESIRHBEbESMRGxEaESIRGhEZESMRGREYESIRGBEXESMRFxEWESIRFhEVESMRFREUESIRFBETESMRExESESIREhERESMREREQESIREA8RIw8OESIODREjDQwRIgwvAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEuAWQEERoEQTABERkBEDRtbds8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHa0AuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwK6CxEjCwoRIgpWI1Cq2zwwDFYWoBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8OEL0QrBCbEIoQeRBoEFcQRhA1ECRyQERxcNs8bJ8E+hERERkREREQERgREA8RFw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYdAccF4vL0s44SggCbFxEdVhWg+CO7AREdAfL0klcc4vhCVh1us+MPjzEyMwAUMBEcIG7y0IARHAAEVx0E6IEBAW0gbpIwbY6NIG7y0IBvKMhVcNs8yeIQJ1YYASBulTBZ9FowlEEz9BXiVhqUVxhXGOMNVhXCAI6SERp/VhZyECNtbW3bPAhWFKEIklca4lYXkXGRcuICAREUARETyFUgghBLZYrAUATLHxLLB8s/yz/JmTStNQL++EIRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoZEFgQRxA2XiIDERwDVhwDAhEaAhEbAds8ERkCERcCBhEWBgYRFQYCERQCERMGERIGAhERAhEQEG9OHRBsSxoQaZs2AdDIgljAAAAAAAAAAAAAAAABActnzMlw+wBx+EIRFKMhERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QTBBrEGoQSRBoXiNBBAPbPJ8ACkgXRUQDBPb4QW8kE18DKoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbJeMPgV5tERizAREYAfL0+EIREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlC2ODk6AfiBS2lWHqoAERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERhx2zwBERkBoAERIAG+AREYAfL0egH8gUtpVh6qABEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREYcds8AREZAaAuoAERIAG+AREYAfL0egP2BBEXBBAjAhEdAts8ggCg9wHy9IFBjFYYVheg+CO88vRWHW6zlxEdIG7y0ICUVx34QuL4Qn+BAQFWHgVWHgVWHgUEER4EAxEdAwIRHgLIVXDbPMkQJQERFgFWFQEgbpUwWfRaMJRBM/QV4gERGAERE3ARGoBAERl/ERlYj5k7AdrIVUCCEOic1F9QBssfFMoAEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8Ayz/JJgQDERkDAhEXAhEWARRDMG1t2zwNERUNDBEUDAsREwsKERIKCRERCQgREAhVd0VwEDRYrQP2+EFvJBNfA4IAoPf4QlYQAccF8vQqgQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKGwiMySagUtpBlYdvhby9J2BS2lWHVYZoBe+FvL04oEBAW0gbpIwbY6NIG7y0IBvKMhVcNs8yeICERACtplAADrTHwGCEGqSPdu68uCB+gDTP9IA03/Tf9N/0z9VYAL2ERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RHA4NERsNDBEaDAsRGQsKERgKCREXCQgRFggHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERzbPPhBbyQwMYFLaTJWHaFWFL7y9IFf8lYcqUQExo8IMNs8bBjbPH/gIIIQwflT8rqOxTDTHwGCEMH5U/K68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTP9M/VSBsE9s8f+AgghCd+g7YukZHSEkD2lKQIG6VMFn0WjCUQTP0FeImwgCRMuMNLcIAjpEDfy5yECNtbW3bPBESLKEREpEz4gGRcZFy4kBTyFUgghCzBV/UUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIG6zkls34w1BrUIC9hEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIER0IBwYRGwYFERoFBBEZBAMRGAMCERcCAREdAVYaAVYcAREZVh/bPBEVERwRFREUERsRFJtDASpxASBu8tCACqNUQRPCABBLQUAT2zyfAIIRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QfhBcEEsQOkmHFgH4L77y9IAM+EJwVHAAERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwLESILEFoQSUUCygURIgUEESIEViLbPDAMVhagcvhCERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxAvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNFhxcNs8bJ8APtMfAYIQI8cvWLry4IH6ANM/0gDTf9N/03/Tf9M/VXAD9BEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFER0FBBEcBAMRGwMCERoCAREZAREY2zz4QW8kE18DcFYewgCUVh3CAJFw4uMAqVNUAvD4QW8kE18DKIEBASRZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bbDM0NSXACpF/kyXAC+KdgUtpVh1WGqAYvhfy9JqBS2kHVh2+F/L04oFebQKzEvL0+EIRFhEeERYRFREdERURFBEcERS5WgQ6jwgw2zxsFts8f+AgghDvAcK0uuMCIIIQIzQ7tLpKS0xNAJbTHwGCEJ36Dti68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTP9M/0z+BAQHXAIEBAdcAVVAE8vhBbyQTXwMrgQEBJ1n0DW+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLVsqwAqRf5MqwAvi4w+BXm0RFLMBERQB8vSCAMrHESFWHLoBESEB8vT4QhERERYREREQERUREA8RFA8OERMODRESDQwREQy5Tk9QAqgw0x8BghDvAcK0uvLggdM/gQEB1wDTP1UgbBP4QW8kE18DggCg9/hCVhABxwXy9CiBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3iIG6SXwXjDn+5YwQ6jwgw2zxsF9s8f+AgghDsM8xSuuMCIIIQXdWEYbpxcnN0AfiBS2lWJaoAERURKREVERQRKBEUERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBESkBEShy2zwBESkBoAERIQG+AREoAfL0egH8gUtpViWqABEVESkRFREUESgRFBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREpAREocts8AREpAaAuoAERIQG+AREoAfL0egL4CxEQCxCvEJ4QjRB8EGsQWhBJEDhHYAURIAUQNAMRJQMCER0CAREkAds8ggCg9wHy9FYbwAqRf5RWG8AM4p2BQYxWJVYXoPgjvPL03lYibrOXESIgbvLQgJRXIvhC4vhCf4EBAVYeBVYeBVYeBVYeBVYeBVYeBVYlBVYtBY9RBPgEESoEAxEvAwIRKgLIVcDbPMkQIwERIwFWIAEgbpUwWfRaMJRBM/QV4ggRHggHERgHBhEdBgURFgUEERcEAxEVAwIRFAIBERMBERlwESGAQBEdfxEdEHkQZxBWEEUQNBAjyFWw2zzJVhAEAxEZAwIRFAIREwEUQzBtbds8ln6tUgBMBhEVBgURFAUEERMEAxESAwIREQIBERABDxBdDBA7SRoIEDdGFQQABDBxA/xWHMIAlFYbwgCRcOKRpN6BS2kCVhqhVhUiqL4S8vSBX/JT8ahWGgG+8vRWHcIAlFYcwgCRcOKUVxxXHOMNVhnCAJRWGMIAkXDijhIEERwEAxEZAwIRGAJXFVcWXwPjDQZWEaBy+EIREREZEREREBEYERAPERcPDhEWDg0RFQ1VVlcB/oAN+EJwVHAAIFYfKKkEER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmlYhUaAQmghYAfqADvhCcFRwACBWHVYiqQQRHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCODREjDVkBWgwRFAwLERMLChESCgkREQkCERACEH8QbhBdEEwQOxCKEGgQVxBGEEVANHDbPJ8BXAlWKAgHBhEoBgURJwUEAxEoAwIRJwIBESjbPDARGxEaERURFBETERIREREQVeBsAYoMESMMEHteNggRJAgQVxBWBREkBds8MAURFwURFgURFQUEERQEAxETAwIREgIREQEREAEQXxBOED1MqxBZEEgQN0YVVSFsA/wRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBREdBQQRHAQDERsDAhEaAgERGQHbPIIAoPchkX+X+EJWHAHHBeLy9LOcVhvACpF/lFYbwAzikXDiklca4w2PW1wAJIIAmxcRG1YVoPgjuwERGwHy9AT8+EJWF26zmjARFiBu8tCAERaSVxficFYbwAqRf5RWG8AL4pRXGFcY4w2BAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniECRWFgEgbpUwWfRaMJRBM/QV4lYawgCOlhEVf1YbchAjbW1t2zwBERUBERmgERSUVxVXGeIIVhShVhcCXZatXgL8I4EBAVYYWfQNb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG6zkTDjDfhCERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOX2AB/AEREwERGshVIIIQgD5hdVAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHL4QhEUo3FWGMAKk1cYf5QRGMAL4hESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgsREQsIERAIEH8QbmIC9iBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjTFWGX8ichAjbW1t2zyRMOKBAQFtIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIQJVYYAa1hAXwQvRCsEJsQihB5EGgQVxBGEDUQJAMRGwNWHgMCERoCERsB2zwRGAERFwEBERUBERQBERMBERIBEREBERBV0ZsAHiBulTBZ9FowlEEz9BXiAwEmEF0QTBA7EEkQOBBHEEVBQBPbPJ8E6iBu8tCAby01NVszM3EnwAqRf5MnwAvijhE0NYFLaVYdVhqgGL4X8vQVE+MNgQEBbSBukjBtjo0gbvLQgG8tyFXA2zzJ4hAvUqAgbpUwWfRaMJRBM/QV4ifCAJEy4w1DdchVIIIQobsLP1AEyx8SywfLP8s/yWSWZWYC8oFLaQlWH74Z8vQugQEBLFn0DW+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBus48nIG7y0IBvJSTCAJMjwgCRcOKSMzPjDSDCAJMiwgCRcOKUXwMzNOMNkzAzNOJnaAP4JMADju8RFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBQQRHAQDERsDAhEaAgERGQFWHgFWGAERHFYf2zzjDREVER0RFZtvcAKGyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIMIAjpECfyNyECNtbW3bPBEQIaEREJEy4nIJIG7y0IACowPCABBJECPbPK2fAfo8coAN+EJwVHAAIBEeESwRHhEdESsRHREcESoRHBEbESkRGxEaESgRGhEZEScRGREYESYRGBEXESURFxEWESQRFhEVESMRFREUESIRFBETESERExESESAREhERER8REREQESwREA8RKw8OESoODREpDQwRKAwLEScLChEmCmkB/gqkgA74QnBUcAAgESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRKhEYERcRKREXERYRKBEWERURJxEVERQRJhEUERMRJRETERIRJBESERERIxERERARIhEQDxEqDw4RKQ5rAvgJESUJViIJEHgQZ1YgB1YtBwYFESoFBBEpBAMCESoCAREpAVYk2zwwERURIxEVERQRIhEUERMRIRETERIRIBESERERHxERERARHhEQDxEdDw4RHA4NERsNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBgUREwUEERIEbGoAFgMREQMCERACUP4aAfINESgNDBEnDFYkDBB7EGoJESsJCBEpCBBXBhEkBgURJAURK9s8MBEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8S6kVbAH0L6QswAqRf5MswAvijkUps4EBAVR3ZVN2yFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMkCERQCVhMBIG6VMFn0WjCUQTP0FeKOEizADJEpmSzADZEpkimz4uIREuKBAQH4I3D4Qm1WEgRWEQRWEwRtAthWEgRWEgRWEgRWEgRWHlFPVTDIVcDbPMkCERUCVhMBIG6VMFn0WjCUQTP0FeIQvBAnVhEHEDYFERMFBAIREwJQDxBoEFcQRhA1RDDIVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAFBAOWbgDqghByY2FdAREQyx8eywccyz9QCiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhjKABaBAQHPABSBAQHPAALIgQEBzwDKABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwBQA/oCE4EBAc8AE8s/yVjMyQHMAdQyERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURHQUUAxEbAwIRGgIBERkBERhWHVYXVhpWH9s8mwCSERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QO0qYFADm0x8BghAjNDu0uvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z+BAQHXANQB0IEBAdcAMBcWFRRDMAL0+EFvJBNfA4FLaVYbqgARFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERHwERHnLbPAERHwGgLqB6dQIQMNs8bBjbPH94eQP8j3Mw0x8BghBd1YRhuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFUgbBOCAKD3+EJS8McF8vQgwgCPJIBCcG1wyMnQJhBoEFgEB1UgyFVg2zzJLgNWEkEzFEMwbW3bPJJfA+J/4CCCEK+Ttci6na2AAv4BERYBvgERHgHy9PhCERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQAMRHQMBERwB2zyCAKD3AfL0+EJWG26zmjARGiBu8tCAERqSVxviIqSBAQFzcFMAcCH4I3/4QhCJj3YE+FYkCVYkCVYkCQcFUIMWREABESgByFXA2zzJECYBERwBUkAgbpUwWfRaMJRBM/QV4nCAQH9zVHMzEDoIER0IBxEfBwYRIAYFER4FQDRwAgERIwERJBCrEHkQZxBWEEUQNBAjyFWw2zzJJwQDERcDAhEVAhEZARRDMG1t2zyWfq13AEYOERUODREUDQwREwwLERILChERCgkREAkQjxB+VWYQRQNEFACY0x8BghDsM8xSuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANN/03/TP4EBAdcA1AHQgQEB1wAwGBcWFRRDMAL0+EFvJBNfA4FLaVYcqgARFREgERURFBEfERQRExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDg0RGA0MERcMCxEWCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQDERkDAhEYAgERFwERFnLbPAERFwGgLqB6ewEowAGSVhGSVhDi+EFvJNs8AaBWEKB8AvYBERgBvgERFgHy9PhCERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQBLbPIIA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8uCIzxbiyVjMyQHMAapQeMoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAB+gKBAQHPAMoAyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYmgBYIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJAcwCUiLCAI8gcnBtcMjJ0BBoXjQQN8hVYNs8yS4DVhJBMxRDMG1t2zySXwTina0AbBEUERkRFBETERgRExESERcREhERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALEK9VSQDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAWwRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRUQw2zyfBO4RGREaERkRGBEaERgRFxEaERcRFhEaERYRFREaERURFBEaERQRExEaERMREhEaERIREREaEREREBEaERAPERoPDhEaDg0RGg0MERoMCxEaCwoRGgoJERoJCBEaCAcRGgcGERoGBREaBQQRGgQDERoD2zwgwgDjD6ChoqMAoPgnbxBWEaEjoPhBbyQTXwOhcAG2CSBWFbYIVhUBoXACVhahErYJBcABklYYklYX4vhBbyQTXwNYoQOoEqFQA6AhwgCScDLfAaEBkS+RcOKhARoBERcBcAEScG1tbds8rQAGMFcWAEgRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4EENs82zw4cIgZqKanqwQQ2zzbPDh/iBmoqaqrAA6CANAwKfL0ABYAAAAAUmVzdW1lZAAS+EJSoMcF8uCEABCCAJ2wKbPy9AAWAAAAAFN0b3BwZWQBDvhCAX9t2zysATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPK0ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsArgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBILGyAgFiv8ACAWaztAIBSLu8Apipm9s8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbGEgbpIwbZkgbvLQgG8obwjiIG6SMG3exbUCmKry2zwRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sYSBukjBtmSBu8tCAby1vDeIgbpIwbd7FuAE6gQEBKAJZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOK2AabSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6AIEBAdcA0gDUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAbcAcPpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxECgQJxAmECUQJBAjATqBAQEmAln0DW+hkjBt3yBukjBtjofQ2zxsHW8N4rkBzNMH0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAgQEB1wCBAQHXANQB0IEBAdcA0gD6AIEBAdcA0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0LoAcPpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxEH0QfBB7EHoQeRB4Ahmsve2ebZ4riC+HtjDAxb0CGawdbZ5tniuIL4e2MMDFvgACKAACJQIBIMHCAhmukG2ebZ4riC+HtjDAxcYCwqrhIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPGzdPT09PT09PT09VYPFwwIYqR3bPNs8VxBfD2xhxcQAem0hbrOOHDCBAQsBIG7y0IApWXFBM/QKb6GUAdcAMJJbbeKRMeJWFlYWVhBWF1YXVhdWF1YXVhdWFlYWVhYAAikClO1E0NQB+GPSAAGOqNs8VxYRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4ImBAQHXAAEB0ds8x8gAAiIB9oEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAckB9jCBBwiBALSCCmJaAIIQBV1KgFyCCJiWgIIQBMS0AIIQBfXhAHBtbXFtbSJtIfhCcIEBC/hCfyUQTSFulVtZ9FkwmMgBzwBBM/RB4lOqyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhTu8oAltQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD0BPQE0z/0BNQw0PQE0z/0BNM/MBETERYRExETERURExETERQREwBuyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhQuhA5R4YQNUAzBA==');
    const __system = Cell.fromBase64('te6cckECzQEAPYgAAQHAAQEFoHshAgEU/wD0pBP0vPLICwMCAWIfBAIBIAsFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtWGNWRTRWWWJVQVJnbWZBWDNiOGdkU3pFY2t5VXdmY3h3VGExOWdoQ2ROM3WCAAEbCvu1E0NIAAYAHdu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwo+kC+W2BVCOi7wR2zmvRy4JwkTBoZqbopDZ+4Ee+BVGPiYCgAkgnBAznVp5xX50lCwHWFuJkeyAgEgFAwCAWIPDQIZrpBtnm2eK4gvh7YwwMgOAAIiAgEgEhACGKkd2zzbPFcQXw9sYcgRAAIpAsKq4SBukjBtjhwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI4ts8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs3T09PT09PT09PVWDyBMAem0hbrOOHDCBAQsBIG7y0IApWXFBM/QKb6GUAdcAMJJbbeKRMeJWFlYWVhBWF1YXVhdWF1YXVhdWFlYWVhYCASAaFQIBSBgWAhmsHW2ebZ4riC+HtjDAyBcAAiUCGay97Z5tniuIL4e2MMDIGQACKAIBZh0bApiq8ts8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbGEgbpIwbZkgbvLQgG8tbw3iIG6SMG3eyBwBOoEBASYCWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3ivwKYqZvbPBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xhIG6SMG2ZIG7y0IBvKG8I4iBukjBt3sgeATqBAQEoAln0DW+hkjBt3yBukjBtjofQ2zxsGG8I4sYD0tAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPBEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPPLggsgjIAE8yPhDAcx/AcoAERYRFREUERMREhERERBV4Ns8ye1U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HgFWHgFWHgFWJQHIVXDbPMkjEDUBIG6VMFn0WjCUQTP0FeL4I4IBUYCgECgHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBER4ByFWA2zzJR0VEAbjIgljAAAAAAAAAAAAAAAABActnzMlw+wBy+EIREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QfhBtEFwQSxA6ECkQOBA3EDYQNRA0ECNwcXDbPKcBtIIQF+bLk1AKyx8Yyz8mbrOafwHKABaBAQHPAJY2cFAGygDiFMs/Ess/ASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbigQEBzwDIWEYAaiBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiWPoCEoEBAc8AyQHMAfQnbrObf1AJygAXgQEBzwCYN3BQCMoAEGfiFcs/E8s/ASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbigQEBzwDIWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiWEgAFvoCEoEBAc8AyQHMAPLTHwGCEK+Ttci68uCB0gABktMHkm0B4tM/0z/6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAdN/+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gH6AFVgAhAw2zxsGNs8f09LAvT4QW8kE18DgUtpVhyqABEVESARFREUER8RFBETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAREWcts8AREXAaAuoItMAvYBERgBvgERFgHy9PhCERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQBLbPIIAoPcB8vQipIEBAXRwcCH4I3/4QvhCEHhWJwhWJwhWJwgHEScHViZGVwQRKAQDESiVTQT4yFXA2zzJECYBERwBUkAgbpUwWfRaMJRBM/QV4nCAQH90VDgzEIkIER4IBxEiBwYRIwYFESEFFAMRHwMCcAIBER4BER0QqxB5EGcQVhBFEDQQI8hVsNs8ySYEAxEYAwIREwIRFgEUQzBtbds8DREVDQwRFAwLERMLChESCr1lwk4AIAkREQkIERAIVXcDBgVQRAcAmNMfAYIQ7DPMUrry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTf9N/0z+BAQHXANQB0IEBAdcAMBgXFhUUQzAC9PhBbyQTXwOBS2lWG6oAERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBER8BER5y2zwBER8BoC6gi1EC/gERFgG+AREeAfL0+EIRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkVAAxEdAwERHAHbPIIAoPcB8vT4QlYbbrOaMBEaIG7y0IARGpJXG+IipIEBAXNwUwBwIfgjf/hCEImVUgT4ViQJViQJViQJBwVQgxZEQAERKAHIVcDbPMkQJgERHAFSQCBulTBZ9FowlEEz9BXicIBAf3NUczMQOggRHQgHER8HBhEgBgURHgVANHACAREjAREkEKsQeRBnEFYQRRA0ECPIVbDbPMknBAMRFwMCERUCERkBFEMwbW3bPL1lwlMARg4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZhBFA0QUAObTHwGCECM0O7S68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTP4EBAdcA1AHQgQEB1wAwFxYVFEMwAqgw0x8BghDvAcK0uvLggdM/gQEB1wDTP1UgbBP4QW8kE18DggCg9/hCVhABxwXy9CiBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3iIG6SXwXjDn+/VgTqIG7y0IBvLTU1WzMzcSfACpF/kyfAC+KOETQ1gUtpVh1WGqAYvhfy9BUT4w2BAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniEC9SoCBulTBZ9FowlEEz9BXiJ8IAkTLjDUN1yFUgghChuws/UATLHxLLB8s/yz/JW71YVwKGyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIMIAjpECfyNyECNtbW3bPBEQIaEREJEy4nIJIG7y0IACowPCABBJECPbPMKnA/gkwAOO7xEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRHgYFBBEcBAMRGwMCERoCAREZAVYeAVYYAREcVh/bPOMNERURHREVtFpZAJIRFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRA7SpgUAdQyERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURHQUUAxEbAwIRGgIBERkBERhWHVYXVhpWH9s8tALygUtpCVYfvhny9C6BAQEsWfQNb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG6zjycgbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4pRfAzM04w2TMDM04l5cAf4KpIAO+EJwVHAAIBEhESoRIREgESkRIBEfESgRHxEeEScRHhEdESYRHREcESURHBEbESQRGxEaESMRGhEZESIRGREYESoRGBEXESkRFxEWESgRFhEVEScRFREUESYRFBETESURExESESQREhERESMREREQESIREA8RKg8OESkOXQHyDREoDQwRJwxWJAwQexBqCRErCQgRKQgQVwYRJAYFESQFESvbPDARFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEupFaAB+jxygA34QnBUcAAgER4RLBEeER0RKxEdERwRKhEcERsRKREbERoRKBEaERkRJxEZERgRJhEYERcRJREXERYRJBEWERURIxEVERQRIhEUERMRIRETERIRIBESERERHxERERARLBEQDxErDw4RKg4NESkNDBEoDAsRJwsKESYKXwL4CRElCVYiCRB4EGdWIAdWLQcGBREqBQQRKQQDAhEqAgERKQFWJNs8MBEVESMRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIERYIBxEVBwYRFAYFERMFBBESBKBgABYDEREDAhEQAlD+GgTy+EFvJBNfAyuBAQEnWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tWyrACpF/kyrAC+LjD4FebREUswERFAHy9IIAyscRIVYcugERIQHy9PhCERERFhERERARFREQDxEUDw4REw4NERINDBERDL9nZmIC+AsREAsQrxCeEI0QfBBrEFoQSRA4R2AFESAFEDQDESUDAhEdAgERJAHbPIIAoPcB8vRWG8AKkX+UVhvADOKdgUGMViVWF6D4I7zy9N5WIm6zlxEiIG7y0ICUVyL4QuL4Qn+BAQFWHgVWHgVWHgVWHgVWHgVWHgVWJQVWLQWVYwT4BBEqBAMRLwMCESoCyFXA2zzJECMBESMBViABIG6VMFn0WjCUQTP0FeIIER4IBxEYBwYRHQYFERYFBBEXBAMRFQMCERQCARETAREZcBEhgEARHX8RHRB5EGcQVhBFEDQQI8hVsNs8yVYQBAMRGQMCERQCERMBFEMwbW3bPL1lwmQATAYRFQYFERQFBBETBAMREgMCERECAREQAQ8QXQwQO0kaCBA3RhUEALiCEP9X5VdQDcsfG8s/GcsHF8s/UAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTygCBAQHPAIEBAc8AAciBAQHPABLKABLLPxKBAQHPABKBAQHPAMkBzAH8gUtpViWqABEVESkRFREUESgRFBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREpAREocts8AREpAaAuoAERIQG+AREoAfL0iwH4gUtpViWqABEVESkRFREUESgRFBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREpAREocts8AREpAaABESEBvgERKAHy9IsAltMfAYIQnfoO2Lry4IH6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAdM/0z/TP4EBAdcAgQEB1wBVUALw+EFvJBNfAyiBAQEkWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tW2wzNDUlwAqRf5MlwAvinYFLaVYdVhqgGL4X8vSagUtpB1Ydvhfy9OKBXm0CsxLy9PhCERYRHhEWERURHREVERQRHBEUv2oD/BETERsRExESERoREhERERkREREQERgREA8RFw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYcAccF4vL0s5xWG8AKkX+UVhvADOKRcOKSVxrjDZVyawT8+EJWF26zmjARFiBu8tCAERaSVxficFYbwAqRf5RWG8AL4pRXGFcY4w2BAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniECRWFgEgbpUwWfRaMJRBM/QV4lYawgCOlhEVf1YbchAjbW1t2zwBERUBERmgERSUVxVXGeIIVhShVhcCbr3CbAH8ARETAREayFUgghCAPmF1UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcvhCERSjcVYYwAqTVxh/lBEYwAviERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCxERCwgREAgQfxBubQEmEF0QTBA7EEkQOBBHEEVBQBPbPKcC/COBAQFWGFn0DW+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBus5Ew4w34QhEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QznBvAXwQvRCsEJsQihB5EGgQVxBGEDUQJAMRGwNWHgMCERoCERsB2zwRGAERFwEBERUBERQBERMBERIBEREBERBV0bQC9iBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjTFWGX8ichAjbW1t2zyRMOKBAQFtIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIQJVYYAcJxAB4gbpUwWfRaMJRBM/QV4gMAJIIAmxcRG1YVoPgjuwERGwHy9AP0ERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURHQUEERwEAxEbAwIRGgIBERkBERjbPPhBbyQTXwNwVh7CAJRWHcIAkXDi4wCZenQD/FYcwgCUVhvCAJFw4pGk3oFLaQJWGqFWFSKovhLy9IFf8lPxqFYaAb7y9FYdwgCUVhzCAJFw4pRXHFcc4w1WGcIAlFYYwgCRcOKOEgQRHAQDERkDAhEYAlcVVxZfA+MNBlYRoHL4QhERERkREREQERgREA8RFw8OERYODREVDXh2dQFaDBEUDAsREwsKERIKCRERCQIREAIQfxBuEF0QTBA7EIoQaBBXEEYQRUA0cNs8pwH6gA74QnBUcAAgVh1WIqkEERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8Qjg0RIw13AYoMESMMEHteNggRJAgQVxBWBREkBds8MAURFwURFgURFQUEERQEAxETAwIREgIREQEREAEQXxBOED1MqxBZEEgQN0YVVSGgAf6ADfhCcFRwACBWHyipBBEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJpWIVGgEJoIeQFcCVYoCAcGESgGBREnBQQDESgDAhEnAgERKNs8MBEbERoRFREUERMREhERERBV4KAABDBxAD7THwGCECPHL1i68uCB+gDTP9IA03/Tf9N/03/TP1VwAvYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERFgERHNs8+EFvJDAxgUtpMlYdoVYUvvL0gV/yVhyZfQH4L77y9IAM+EJwVHAAERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwLESILEFoQSX4CygURIgUEESIEViLbPDAMVhagcvhCERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxAvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNFhxcNs8oKcAOtMfAYIQapI927ry4IH6ANM/0gDTf9N/03/TP1VgA/b4QW8kE18DggCg9/hCVhABxwXy9CqBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8obCIzJJqBS2kGVh2+FvL0nYFLaVYdVhmgF74W8vTigQEBbSBukjBtjo0gbvLQgG8oyFVw2zzJ4gIREALGxIED2lKQIG6VMFn0WjCUQTP0FeImwgCRMuMNLcIAjpEDfy5yECNtbW3bPBESLKEREpEz4gGRcZFy4kBTyFUgghCzBV/UUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIG6zkls34w2DwoIBKnEBIG7y0IAKo1RBE8IAEEtBQBPbPKcC9hEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIER0IBwYRGwYFERoFBBEZBAMRGAMCERcCAREdAVYaAVYcAREZVh/bPBEVERwRFREUERsRFLSEAIIRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QfhBcEEsQOkmHFgGIMNMfAYIQEoa5i7ry4IHTP9M/+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4kMwbBPbPH+GBPb4QW8kE18DKoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbJeMPgV5tERizAREYAfL0+EIREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlDGiomHA/YEERcEECMCER0C2zyCAKD3AfL0gUGMVhhWF6D4I7zy9FYdbrOXER0gbvLQgJRXHfhC4vhCf4EBAVYeBVYeBVYeBQQRHgQDER0DAhEeAshVcNs8yRAlAREWAVYVASBulTBZ9FowlEEz9BXiAREYARETcBEagEARGX8RGViVxIgB2shVQIIQ6JzUX1AGyx8UygASyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDLP8kmBAMRGQMCERcCERYBFEMwbW3bPA0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3RXAQNFjCAfyBS2lWHqoAERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERhx2zwBERkBoC6gAREgAb4BERgB8vSLAfiBS2lWHqoAERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERhx2zwBERkBoAERIAG+AREYAfL0iwEowAGSVhGSVhDi+EFvJNs8AaBWEKCMAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAALu+EFvJBNfAyqBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8oWyWdgUtpVh5WGqAYvhfy9JqBS2kHVh6+F/L04oFebQazFvL0+EIRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERLGjgT6ERERGRERERARGBEQDxEXDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEeBgURHQUEERwEAxEbAwIRGgIBERkB2zyCAKD3IZF/l/hCVh0BxwXi8vSzjhKCAJsXER1WFaD4I7sBER0B8vSSVxzi+EJWHW6z4w+VlJOPBOiBAQFtIG6SMG2OjSBu8tCAbyjIVXDbPMniECdWGAEgbpUwWfRaMJRBM/QV4lYalFcYVxjjDVYVwgCOkhEaf1YWchAjbW1t2zwIVhShCJJXGuJWF5FxkXLiAgERFAERE8hVIIIQS2WKwFAEyx8SywfLP8s/ycSRwpAB0MiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHH4QhEUoyEREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMEGsQahBJEGheI0EEA9s8pwL++EIRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoZEFgQRxA2XiIDERwDVhwDAhEaAhEbAds8ERkCERcCBhEWBgYRFQYCERQCERMGERIGAhERAhEQEG9OHRBsSxoQabSSAApIF0VEAwAEVx0AFDARHCBu8tCAERwAQIEBCykCcUEz9ApvoZQB1wAwkltt4iBukjBw4CBu8tCAAvYRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGNs8+EFvJDAxgUtpMlYZoVYVvvL0gV/yVhiZlwP8L77y9CWkgQEBcPhC+CNw+EJtVh4EViBENMhVcNs8ySgQOgEgbpUwWfRaMJRBM/QV4g1WGKBy+EJQQwIRGQJWGgIRHBnIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBx+EIhERYRGREWERURGBEVERQRFxEUERMRFhETxKyYAW4REhEVERIREREUEREREBETERAPERIPDhERDg4REA4QzxC+EK0QnBCLEHkQWBBHEDYQNEEwcNs8pwAQggCdsCmz8vQD1DDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU+EJWEAHHBbOPJTD4QnCAQnBtI8jJ0CcQahBZBAhVIMhVYNs8yRRDMBRDMG1t2zzjDn+1wpsDMCzjAtQw0NMfIcABjokx03/6ADAB2zzjDrGlnAOeAcACjqT6ANIAAcD/AdM/0gABwP8B03/Tf9P/1DDQ03/T/9N/0/8w2zyPIzBwgEJwbSPIydAmEGkQWAQHVSDIVWDbPMkvVTAUQzBtbds84p21wgPs+EFvJBNfA4sIcC1WJKATuY4SW3+L5nYXMgbm90IGVub3VnaI3lPouY4WW3+NBFqZXR0b24gbm90IGVub3VnaIN5xJsIAkyXCAJFw4pIwct4kwgCTI8IAkXDikaTeVh4hqFLgueMAAuMCMD0JkXqSgAviUq2pBKSjngH4ESERIxEhESARIhEgER8RIxEfER4RIhEeER0RIxEdERwRIhEcERsRIxEbERoRIhEaERkRIxEZERgRIhEYERcRIxEXERYRIhEWERURIxEVERQRIhEUERMRIxETERIRIhESERERIxERERARIhEQDxEjDw4RIg4NESMNDBEiDJ8CugsRIwsKESIKViNQqts8MAxWFqARFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfDhC9EKwQmxCKEHkQaBBXEEYQNRAkckBEcXDbPKCnAfQvpCzACpF/kyzAC+KORSmzgQEBVHdlU3bIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQIRFAJWEwEgbpUwWfRaMJRBM/QV4o4SLMAMkSmZLMANkSmSKbPi4hES4oEBAfgjcPhCbVYSBFYRBFYTBKEC2FYSBFYSBFYSBFYSBFYeUU9VMMhVwNs8yQIRFQJWEwEgbpUwWfRaMJRBM/QV4hC8ECdWEQcQNgUREwUEAhETAlAPEGgQVxBGEDVEMMhV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAUEA72iAOqCEHJjYV0BERDLHx7LBxzLP1AKINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGMoAFoEBAc8AFIEBAc8AAsiBAQHPAMoAEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAFAD+gITgQEBzwATyz/JWMzJAcwD/GzBERcRGREXERYRGBEWERURGREVERQRGBEUERMRGRETERIRGBESERERGRERERARGBEQDxEZDw4RGA4NERkNDBEYDAsRGQsKERgKCREZCQgRGAgHERkHBhEYBgURGQUEERgEAxEZAwIRGAIBERkBERhWGVYa2zx/cIBCERnbPLSvrgA+bCF/jQYZXhlY3V0aW9uIGZlZSBub3QgZW5vdWdogWAL2+EFvJBNfA4sIcCRWHKATuY4SW3+L5nYXMgbm90IGVub3VnaI3lNSuY4WW3+NBFqZXR0b24gbm90IGVub3VnaIN4jVhW5jh1bf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIN4B4wIwMymkgQEBf/gjcG0nUTlROFKkraYDnshVcNs8ySwQPgEgbpUwWfRaMJRBM/QV4hERIaBxUTBFE1QgFx3IVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBxVB8AECpJMBJw2zzErKcE7hEZERoRGREYERoRGBEXERoRFxEWERoRFhEVERoRFREUERoRFBETERoRExESERoREhERERoREREQERoREA8RGg8OERoODREaDQwRGgwLERoLChEaCgkRGgkIERoIBxEaBwYRGgYFERoFBBEaBAMRGgPbPCDCAOMPq6qpqABIERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOAAYwVxYBGgERFwFwARJwbW1t2zzCAKD4J28QVhGhI6D4QW8kE18DoXABtgkgVhW2CFYVAaFwAlYWoRK2CQXAAZJWGJJWF+L4QW8kE18DWKEDqBKhUAOgIcIAknAy3wGhAZEvkXDioQB4ghC0F8xsUAfLHxXLB1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAB+gKBAQHPAMs/A/xsIREXERkRFxEWERgRFhEVERkRFREUERgRFBETERkRExESERgREhERERkREREQERgREA8RGQ8OERgODREZDQwRGAwLERkLChEYCgkRGQkIERgIBxEZBwYRGAYFERkFBBEYBAMRGQMCERgCAREZAREYVhlWGts8f3CAQhEZ2zy0r64BZAQRGgRBMAERGQEQNG1t2zwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdwgFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxsAC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DBPYwERcR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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOrderBook_init_args({ $$type: 'OrderBook_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const OrderBook_errors: { [key: number]: { message: string } } = {
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
    11120: { message: `compensate not exist` },
    16780: { message: `order expired` },
    19305: { message: `gas not enough` },
    24173: { message: `order is pending` },
    24562: { message: `execution fee not enough` },
    31425: { message: `not reach unlock time` },
    32637: { message: `order not exist` },
    39703: { message: `too early` },
    40368: { message: `Contract stopped` },
    41207: { message: `invalid sender` },
    42241: { message: `order not pending` },
    51911: { message: `token not match` },
    53296: { message: `Contract not stopped` },
}

const OrderBook_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateConfig","header":771386527,"fields":[{"name":"executorLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executors","type":{"kind":"dict","key":"int","value":"ExecutorParam","valueFormat":"ref"}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolLpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolPerpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendProtocolFee","header":1574274145,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":632428324,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"liquidityDelta","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CancelLPPositionOrder","header":2106714934,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteLPPositionOrder","header":310819211,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateCompensate","header":2945693128,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CancelCompensate","header":1491007674,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecuteCompensate","header":3424428784,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateDecreasePerpPositionOrder","header":1787968987,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateTpSlPerpPositionOrder","header":600256344,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CancelPerpPositionOrder","header":3254342642,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecutePerpPositionOrder","header":2650410712,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LiquidatePerpPosition","header":590625716,"fields":[{"name":"liquidationFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ADLPerpPosition","header":3962817618,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionOrderCreatedEvent","header":3021458540,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionOrderCancelledEvent","header":1264945856,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionOrderExecutedEvent","header":3003473876,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionOrderCreatedEvent","header":1919115613,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionOrderCancelledEvent","header":2151571829,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionOrderExecutedEvent","header":2713389887,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateCreatedEvent","header":401001363,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderType","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CompensateCancelledEvent","header":1271087573,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateExecutedEvent","header":3678790712,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolLpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolPerpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ExecutorParam","header":null,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LPPositionOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"lpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LPPositionOrder","optional":true}},
    {"name":"lpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"perpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PerpPositionOrder","optional":true}},
    {"name":"perpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const OrderBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPositionSuccess"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreasePerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateTpSlPerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelPerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecutePerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPositionSuccess"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ADLPerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class OrderBook implements Contract {
    
    static async init(deployId: bigint) {
        return await OrderBook_init(deployId);
    }
    
    static async fromInit(deployId: bigint) {
        const init = await OrderBook_init(deployId);
        const address = contractAddress(0, init);
        return new OrderBook(address, init);
    }
    
    static fromAddress(address: Address) {
        return new OrderBook(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  OrderBook_types,
        getters: OrderBook_getters,
        receivers: OrderBook_receivers,
        errors: OrderBook_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | TokenNotification | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | CreateDecreasePerpPositionOrder | CreateTpSlPerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidatePerpPosition | ADLPerpPosition | SendProtocolFee | CreateCompensate | CancelCompensate | ExecuteCompensate | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreaseLPPositionOrder') {
            body = beginCell().store(storeCreateDecreaseLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelLPPositionOrder') {
            body = beginCell().store(storeCancelLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteLPPositionOrder') {
            body = beginCell().store(storeExecuteLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLPPositionSuccess') {
            body = beginCell().store(storeUpdateLPPositionSuccess(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreasePerpPositionOrder') {
            body = beginCell().store(storeCreateDecreasePerpPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateTpSlPerpPositionOrder') {
            body = beginCell().store(storeCreateTpSlPerpPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelPerpPositionOrder') {
            body = beginCell().store(storeCancelPerpPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecutePerpPositionOrder') {
            body = beginCell().store(storeExecutePerpPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePerpPositionSuccess') {
            body = beginCell().store(storeUpdatePerpPositionSuccess(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidatePerpPosition') {
            body = beginCell().store(storeLiquidatePerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ADLPerpPosition') {
            body = beginCell().store(storeADLPerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendProtocolFee') {
            body = beginCell().store(storeSendProtocolFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateCompensate') {
            body = beginCell().store(storeCreateCompensate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelCompensate') {
            body = beginCell().store(storeCancelCompensate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteCompensate') {
            body = beginCell().store(storeExecuteCompensate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
    
    async getLpPositionOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('lpPositionOrder', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleLPPositionOrder(result_p) : null;
        return result;
    }
    
    async getLpPositionOrderIndexNext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lpPositionOrderIndexNext', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPerpPositionOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('perpPositionOrder', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTuplePerpPositionOrder(result_p) : null;
        return result;
    }
    
    async getPerpPositionOrderIndexNext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('perpPositionOrderIndexNext', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}