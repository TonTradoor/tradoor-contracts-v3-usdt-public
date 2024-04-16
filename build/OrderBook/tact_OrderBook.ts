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
    executor: Address | null;
    enableExecutor: boolean | null;
    maxTimeDelayExecutor: bigint;
    minTimeDelayTrader: bigint;
    minExecutionFee: bigint;
    gasConsumption: bigint;
    minTonsForStorage: bigint;
    usdtWallet: Address;
    pool: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1083088764, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
        b_0.storeInt(src.maxTimeDelayExecutor, 257);
        b_0.storeInt(src.minTimeDelayTrader, 257);
        b_0.storeCoins(src.minExecutionFee);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasConsumption);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeAddress(src.usdtWallet);
        b_1.storeAddress(src.pool);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1083088764) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _minExecutionFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConsumption = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _usdtWallet = sc_1.loadAddress();
    let _pool = sc_1.loadAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executor = source.readAddressOpt();
    let _enableExecutor = source.readBooleanOpt();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enableExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minExecutionFee);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
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

export type CreateDecreaseLPPositionOrder = {
    $$type: 'CreateDecreaseLPPositionOrder';
    executionFee: bigint;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeCreateDecreaseLPPositionOrder(src: CreateDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3183464008, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3183464008) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _liquidityDelta = sc_0.loadIntBig(257);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeExecuteLPPositionOrder(src: ExecuteLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1430915153, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
    };
}

export function loadExecuteLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1430915153) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'ExecuteLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleExecuteLPPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'ExecuteLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleExecuteLPPositionOrder(source: ExecuteLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
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
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
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
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdateLPPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleUpdateLPPosition(source: UpdateLPPosition) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
        b_0.storeUint(2236388826, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeInt(src.refundAmount, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeCoins(src.executionFee);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2236388826) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let _executionFee = sc_1.loadCoins();
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
        b_0.storeUint(3223331775, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        b_0.storeInt(src.triggerPrice, 257);
        let b_1 = new Builder();
        b_1.storeUint(src.trxId, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateDecreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3223331775) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let _triggerPrice = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _trxId = sc_1.loadUintBig(64);
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
        b_0.storeUint(3112421641, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.tpSize, 257);
        b_0.storeInt(src.tpPrice, 257);
        b_0.storeInt(src.slSize, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.slPrice, 257);
        b_1.storeUint(src.trxId, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateTpSlPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3112421641) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _tpSize = sc_0.loadIntBig(257);
    let _tpPrice = sc_0.loadIntBig(257);
    let _slSize = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _slPrice = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadUintBig(64);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeExecutePerpPositionOrder(src: ExecutePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4188480865, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
    };
}

export function loadExecutePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4188480865) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleExecutePerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleExecutePerpPositionOrder(source: ExecutePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeLiquidatePerpPosition(src: LiquidatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3168159377, 32);
        b_0.storeAddress(src.liquidationFeeReceiver);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3168159377) { throw Error('Invalid prefix'); }
    let _liquidationFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleLiquidatePerpPosition(source: TupleReader) {
    let _liquidationFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleLiquidatePerpPosition(source: LiquidatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.liquidationFeeReceiver);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeADLPerpPosition(src: ADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(116682301, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 116682301) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleADLPerpPosition(source: ADLPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
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
        b_1.storeUint(src.pricesLength, 64);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
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
    let _pricesLength = sc_1.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
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
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
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
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    gasConsumption: bigint;
    minTonsForStorage: bigint;
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
        b_0.storeCoins(src.gasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        let b_1 = new Builder();
        b_1.storeAddress(src.usdtWallet);
        b_1.storeAddress(src.pool);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _minExecutionFee = sc_0.loadCoins();
    let _gasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _usdtWallet = sc_1.loadAddress();
    let _pool = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minExecutionFee);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
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
    const __code = Cell.fromBase64('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0gABwP8B03/Tf9P/1DDQ03/T/9N/0/8w2zyPIzBwgEBwbSPIydAmEGkQWAQHVSDIVWDbPMkvVTAUQzBtbds84h+RkwPsbCEREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYTVhTbPH9wgEIRFds8BBEUBEEwAREVARA0bW3bPA4REA5VHZAjkwOOUThSpMhVcNs8ySwQPgEgbpUwWfRaMJRBM/QV4nFRMEUTVCAXHchVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAgH2zyOKpID9vhBbyQTXwOLCHAtVh+gVh6gE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN5T6LmOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDecSbCAJMlwgCRcOKSMHLeJMIAkyPCAJFw4pGk3lYfAahS0LnjAAHjAjA8CJF6koAL4hEbER0RGyAhIgA6W3+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iAD7GyxERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERRWE1YU2zx/cIBCERXbPAQRFARBMAERFQEQNG1t2zwOERAOVR2QI5MC8BEaERwRGhEZER0RGREYERwRGBEXER0RFxEWERwRFhEVER0RFREUERwRFBETER0RExESERwREhERER0REREQERwREA8RHQ8OERwODREdDQwRHAwLER0LChEcCglWHFCZER5WHts8MBEQERIREA8REQ8OERAOVR3bPF6SAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEkALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMC8BEQERMREA8REg8OEREODRETDQwREgwLERELChETCgkREgkIEREIBxETBwYREgYFEREFBBETBAMREgMCERECARETARES2zz4QW8kMDGBS2kyVhOhU/6gvvL0gV/yVhJW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c3BTAHAh+CN/+EIQiVYcCVYeCVYkCQcFUIMWREABESEByFXA2zzJECYBERUBUkCEi0sC3CBulTBZ9FowlEEz9BXicIBAf3NUczMQOggRHQgHERkHBhEYBgURHgVANHACAREdAREcEKsQeRBnEFYQRRA0ECPIVbDbPMknBBA/AhEVAhETARRDMG1t2zwJERAJEI8QfhBtEFwQSxA6SRcGA0WFbJMDzJRWEsIAkXDikaTeVhXCAJRWFMIAkXDilFcUVxTjDVYRwgCUVhDCAJFw4o4WBREXBQQRFQQDERQDAhESAlcQVxBfBOMN+EIKERIKCRERCQgREAgQfxBuEF0QTBA7SpAQKBAnRgDbPE1OkgL+gA34QnBUcAAgVh8oqQQRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaViEKEIkQeFYgCFYgCAcGESAGBREfBQQDESADAhEfAgERINs8MF5PAv6ADvhCcFRwACBWHQERGqkEERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH4QzQwRHgwQaxBaEHkIER4IXiQQRRA0QTDbPDAGEREGBhEQBhBfXlAAEBETERIREFXgACAQTg0QPEugEGkQWBBHBlUTAcCBS2lWH6oAVh+gERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPAERFAGgAREgAb4BERMB8vRoAc6BS2lWH6oAVh+gERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPAERFAGgghAF9eEAoAERIAG+ARETAfL0aAL2EIwQexBqEFkQSBA3RlAEERIEEwIRHQIBERIB2zyCAKD3AfL0VhvACpF/lFYbwAzinYFBjFYTVhKg+CO88vTeVhFus5cRESBu8tCAlFcR+ELi+EJ/gQEBVh4FVh4FVh4FVh4FVh4FVh4FVh4FVh4FBBEeBAMRHQMCER4ChFQE/shVwNs8yRAjARERAVYbASBulTBZ9FowlEEz9BXiCBEZCAcRGAcGERwGBREWBQQRFwQDERUDAhEUAgEREwEREnAREoBAER1/ER0QeRBnEFYQRRA0ECPIVbDbPMlWEAQQOgIRFAIREwEUQzBtbds8AREQAQ8QXQwQWwoIBQdDkxaLbJNVAAIUBPIgbvLQgG8tNTVbMzMmwAqRf5MmwAvijhUzNIFLaVYXghAF9eEAoBe+FvL0RBTjDYEBAW0gbpIwbY6NIG7y0IBvLchVwNs8yeIpED8BIG6VMFn0WjCUQTP0FeImwgCSNjDjDUFTyFUgghChuws/UATLHxLLB8s/yz/JV4tYWQLygUtpCFYZvhjy9C2BAQErWfQNb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG6zjycgbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4pRfAzIz4w2TMDIz4lpbA/4jwAOOzhESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwRGAwLERcLChEWCgkRFQkIERQIBxETBwYFERcFBBEWBAMRFQMCERQCVhcCVhXbPOMNERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxA5kGJjAnzIgljAAAAAAAAAAAAAAAABActnzMlw+wAnwgCOjRJ/UAhyECNtbW3bPAWSMjbiIG6zjoggbvLQgHDbPJEw4pOSAfiADfhCcFRwACARGREmERkRGBElERgRFxEkERcRFhEjERYRFREiERURFBEhERQRExEgERMREhEfERIREREeEREREBEdERAPERwPDhEbDg0RGg0MESYMCxElCwoRJAoJESMJViAJEHgQZ1YeB1YdBwYFESgFBBEnBAMCESgCXAH4gA74QnBUcAAgERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRJBEUERMRIxETERIRIhESERERIRERERARIBEQDxEfDw4RHg4NER0NDBEkDFYhDBB7EGoJER8JCBElCBBXBhElBl0BigERJwFWJ9s8MBEQER0REA8RHA8OERsODREaDQwRGQwLERgLChEXCgkRFgkIERUIBxEUBwYREwYFERIFBBERBAMR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');
    const __system = Cell.fromBase64('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CwoggQT/uvLQiYMJuvLgiAHSANM/0z/0BFVgAuYw0x8BghDvAcK0uvLggdM/gQEB1wDTP1UgbBONBlVcGRhdGVQZXJwUG9zaXRpb25TdWNjZXNzg/hQw+EFvJBNfA4IAoPf4QlYQAccF8vQogQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsHW8N4iBukl8F4w5/p1EE8iBu8tCAby01NVszMybACpF/kybAC+KOFTM0gUtpVheCEAX14QCgF74W8vREFOMNgQEBbSBukjBtjo0gbvLQgG8tyFXA2zzJ4ikQPwEgbpUwWfRaMJRBM/QV4ibCAJI2MOMNQVPIVSCCEKG7Cz9QBMsfEssHyz/LP8lWpVNSAnzIgljAAAAAAAAAAAAAAAABActnzMlw+wAnwgCOjRJ/UAhyECNtbW3bPAWSMjbiIG6zjoggbvLQgHDbPJEw4p6UA/4jwAOOzhESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwRGAwLERcLChEWCgkRFQkIERQIBxETBwYFERcFBBEWBAMRFQMCERQCVhcCVhXbPOMNERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxA5mlVUAARIdgGeMRERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERcLChEWCgkRFQkIERQIBxETBwYREgYFBBEWBAMRFQMCERQCARETAVYWAVYWVhXbPJoC8oFLaQhWGb4Y8vQtgQEBK1n0DW+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBus48nIG7y0IBvJSTCAJMjwgCRcOKSMzPjDSDCAJMiwgCRcOKUXwMyM+MNkzAyM+JZVwH4gA74QnBUcAAgERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRJBEUERMRIxETERIRIhESERERIRERERARIBEQDxEfDw4RHg4NER0NDBEkDFYhDBB7EGoJER8JCBElCBBXBhElBlgBYgURJQURH9s8MBEQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIVXeMAfiADfhCcFRwACARGREmERkRGBElERgRFxEkERcRFhEjERYRFREi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ERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaViEKEIkQeFYgCFYgCAcGESAGBREfBQQDESADAhEfAgERINs8MIxsABARExESERBV4ABy0x8BghC5g8kJuvLggfoA0z/SAIEBAdcAgQEB1wCBAQHXANQB0IEBAdcA0z8wECgQJxAmECUQJBAjAu4REBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERcJCBEWCAcRFQcGERQGBRETBQQREgQDEREDAhEXAgERFgERFds8+EFvJDAxgUtpMlYWoVP+oL7y9IFf8lYVVhC+8vSADPhCcFRwABEWERwRFhEVERsRFYVvAtoRFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBCbEFoQSRB4EGcQRgURHQUEER0EVh3bPDD4QhERERIREREQEREREA8REA9VDts8jJQAXNMfAYIQwCAjv7ry4IH6ANM/0gCBAQHXAIEBAdcAgQEB1wDUAdDTPzAXFhUUQzACzvhBbyQTXwOCAKD3+EJWEAHHBfL0KoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhsIjMkmoFLaQZWF74W8vSOEYFLaVYXghAF9eEAoBe+FvL04oEBAW2scgT+IG6SMG2OjSBu8tCAbyjIVXDbPMniAhEQAlKQIG6VMFn0WjCUQTP0FeImwgCSMjXjDSzCAI6NEn9QDXIQI21tbds8CpIyO+IKkXGRcuJAM8hVIIIQswVf1FAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACBus6p0nnMBGo6IIG7y0IBw2zyRMOKUAegREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERgMCxEXCwoRFgoJERUJCAcREwcGERgGBREXBQQRFgQDERUDAlYXAhEZAVYZ2zwREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH1VVZoBkjDTHwGCEFVKCFG68uCB0z/TP/pAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/0BFVAbBXbPH92BOL4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');
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
    {"name":"UpdateConfig","header":1083088764,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":3183464008,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CancelLPPositionOrder","header":2106714934,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteLPPositionOrder","header":1430915153,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateCompensate","header":2236388826,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CancelCompensate","header":1491007674,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecuteCompensate","header":3424428784,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateDecreasePerpPositionOrder","header":3223331775,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateTpSlPerpPositionOrder","header":3112421641,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CancelPerpPositionOrder","header":3254342642,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecutePerpPositionOrder","header":4188480865,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"LiquidatePerpPosition","header":3168159377,"fields":[{"name":"liquidationFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"ADLPerpPosition","header":116682301,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
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
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | TokenNotification | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | CreateDecreasePerpPositionOrder | CreateTpSlPerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | CancelCompensate | ExecuteCompensate | Deploy | 'Resume' | 'Stop') {
        
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