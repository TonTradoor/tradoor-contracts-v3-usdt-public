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
    compensator: Address | null;
    enableCompensator: boolean | null;
    minTimeDelayExecutor: bigint | null;
    maxTimeDelayExecutor: bigint | null;
    minTimeDelayTrader: bigint | null;
    minPendingTimeDelayCompensator: bigint | null;
    minExecutionFee: bigint | null;
    gasConsumption: bigint | null;
    minTonsForStorage: bigint | null;
    usdtWallet: Address | null;
    pool: Address | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2288110707, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.compensator);
        if (src.enableCompensator !== null && src.enableCompensator !== undefined) { b_0.storeBit(true).storeBit(src.enableCompensator); } else { b_0.storeBit(false); }
        if (src.minTimeDelayExecutor !== null && src.minTimeDelayExecutor !== undefined) { b_0.storeBit(true).storeInt(src.minTimeDelayExecutor, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.maxTimeDelayExecutor !== null && src.maxTimeDelayExecutor !== undefined) { b_1.storeBit(true).storeInt(src.maxTimeDelayExecutor, 257); } else { b_1.storeBit(false); }
        if (src.minTimeDelayTrader !== null && src.minTimeDelayTrader !== undefined) { b_1.storeBit(true).storeInt(src.minTimeDelayTrader, 257); } else { b_1.storeBit(false); }
        if (src.minPendingTimeDelayCompensator !== null && src.minPendingTimeDelayCompensator !== undefined) { b_1.storeBit(true).storeInt(src.minPendingTimeDelayCompensator, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.minExecutionFee !== null && src.minExecutionFee !== undefined) { b_2.storeBit(true).storeInt(src.minExecutionFee, 257); } else { b_2.storeBit(false); }
        if (src.gasConsumption !== null && src.gasConsumption !== undefined) { b_2.storeBit(true).storeInt(src.gasConsumption, 257); } else { b_2.storeBit(false); }
        if (src.minTonsForStorage !== null && src.minTonsForStorage !== undefined) { b_2.storeBit(true).storeInt(src.minTonsForStorage, 257); } else { b_2.storeBit(false); }
        let b_3 = new Builder();
        b_3.storeAddress(src.usdtWallet);
        b_3.storeAddress(src.pool);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2288110707) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _compensator = sc_0.loadMaybeAddress();
    let _enableCompensator = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minTimeDelayExecutor = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _maxTimeDelayExecutor = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _minTimeDelayTrader = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _minPendingTimeDelayCompensator = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _minExecutionFee = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _gasConsumption = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _minTonsForStorage = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let sc_3 = sc_2.loadRef().beginParse();
    let _usdtWallet = sc_3.loadMaybeAddress();
    let _pool = sc_3.loadMaybeAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, compensator: _compensator, enableCompensator: _enableCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minPendingTimeDelayCompensator: _minPendingTimeDelayCompensator, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executor = source.readAddressOpt();
    let _enableExecutor = source.readBooleanOpt();
    let _compensator = source.readAddressOpt();
    let _enableCompensator = source.readBooleanOpt();
    let _minTimeDelayExecutor = source.readBigNumberOpt();
    let _maxTimeDelayExecutor = source.readBigNumberOpt();
    let _minTimeDelayTrader = source.readBigNumberOpt();
    let _minPendingTimeDelayCompensator = source.readBigNumberOpt();
    let _minExecutionFee = source.readBigNumberOpt();
    let _gasConsumption = source.readBigNumberOpt();
    let _minTonsForStorage = source.readBigNumberOpt();
    let _usdtWallet = source.readAddressOpt();
    let _pool = source.readAddressOpt();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, compensator: _compensator, enableCompensator: _enableCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minPendingTimeDelayCompensator: _minPendingTimeDelayCompensator, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enableExecutor);
    builder.writeAddress(source.compensator);
    builder.writeBoolean(source.enableCompensator);
    builder.writeNumber(source.minTimeDelayExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minPendingTimeDelayCompensator);
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

export type CreateDecreaseRBFPositionOrder = {
    $$type: 'CreateDecreaseRBFPositionOrder';
    executionFee: bigint;
    liquidityDelta: bigint;
}

export function storeCreateDecreaseRBFPositionOrder(src: CreateDecreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2702271213, 32);
        b_0.storeInt(src.executionFee, 257);
        b_0.storeInt(src.liquidityDelta, 257);
    };
}

export function loadCreateDecreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2702271213) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    return { $$type: 'CreateDecreaseRBFPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta };
}

function loadTupleCreateDecreaseRBFPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    return { $$type: 'CreateDecreaseRBFPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta };
}

function storeTupleCreateDecreaseRBFPositionOrder(source: CreateDecreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.liquidityDelta);
    return builder.build();
}

function dictValueParserCreateDecreaseRBFPositionOrder(): DictionaryValue<CreateDecreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelRBFPositionOrder = {
    $$type: 'CancelRBFPositionOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeCancelRBFPositionOrder(src: CancelRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3161392643, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCancelRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3161392643) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CancelRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCancelRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CancelRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCancelRBFPositionOrder(source: CancelRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCancelRBFPositionOrder(): DictionaryValue<CancelRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteRBFPositionOrder = {
    $$type: 'ExecuteRBFPositionOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeExecuteRBFPositionOrder(src: ExecuteRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2755031130, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadExecuteRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2755031130) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'ExecuteRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleExecuteRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'ExecuteRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleExecuteRBFPositionOrder(source: ExecuteRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserExecuteRBFPositionOrder(): DictionaryValue<ExecuteRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type UpdateRBFPosition = {
    $$type: 'UpdateRBFPosition';
    isIncrease: boolean;
    orderId: bigint;
    account: Address;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeUpdateRBFPosition(src: UpdateRBFPosition) {
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

export function loadUpdateRBFPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3902592095) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateRBFPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleUpdateRBFPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateRBFPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleUpdateRBFPosition(source: UpdateRBFPosition) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateRBFPosition(): DictionaryValue<UpdateRBFPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateRBFPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRBFPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdateRBFPositionSuccess = {
    $$type: 'UpdateRBFPositionSuccess';
    orderId: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeUpdateRBFPositionSuccess(src: UpdateRBFPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(485543809, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateRBFPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 485543809) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _receive = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateRBFPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function loadTupleUpdateRBFPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateRBFPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function storeTupleUpdateRBFPositionSuccess(source: UpdateRBFPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateRBFPositionSuccess(): DictionaryValue<UpdateRBFPositionSuccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateRBFPositionSuccess(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRBFPositionSuccess(src.loadRef().beginParse());
        }
    }
}

export type CompensateRBFPositionOrder = {
    $$type: 'CompensateRBFPositionOrder';
    orderId: bigint;
    trxId: bigint;
    needRefund: boolean;
    isExecute: boolean;
    executionFeeReceiver: Address | null;
}

export function storeCompensateRBFPositionOrder(src: CompensateRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(638245171, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeBit(src.needRefund);
        b_0.storeBit(src.isExecute);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCompensateRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 638245171) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _needRefund = sc_0.loadBit();
    let _isExecute = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CompensateRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCompensateRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _needRefund = source.readBoolean();
    let _isExecute = source.readBoolean();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CompensateRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCompensateRBFPositionOrder(source: CompensateRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeBoolean(source.needRefund);
    builder.writeBoolean(source.isExecute);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCompensateRBFPositionOrder(): DictionaryValue<CompensateRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreaseLPPositionOrder = {
    $$type: 'CreateDecreaseLPPositionOrder';
    executionFee: bigint;
    marginDelta: bigint;
    liquidityDelta: bigint;
}

export function storeCreateDecreaseLPPositionOrder(src: CreateDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1912782205, 32);
        b_0.storeInt(src.executionFee, 257);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
    };
}

export function loadCreateDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1912782205) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadIntBig(257);
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    return { $$type: 'CreateDecreaseLPPositionOrder' as const, executionFee: _executionFee, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta };
}

function loadTupleCreateDecreaseLPPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    return { $$type: 'CreateDecreaseLPPositionOrder' as const, executionFee: _executionFee, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta };
}

function storeTupleCreateDecreaseLPPositionOrder(source: CreateDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
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
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelLPPositionOrder(src: CancelLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1477803963, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1477803963) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelLPPositionOrder(source: CancelLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
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
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteLPPositionOrder(src: ExecuteLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(63604284, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 63604284) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteLPPositionOrder(source: ExecuteLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
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

export type LiquidateLPPositionOrder = {
    $$type: 'LiquidateLPPositionOrder';
    executionFeeReceiver: Address | null;
    account: Address;
    trxId: bigint;
}

export function storeLiquidateLPPositionOrder(src: LiquidateLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1380048001, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadLiquidateLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1380048001) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _account = sc_0.loadAddress();
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'LiquidateLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, account: _account, trxId: _trxId };
}

function loadTupleLiquidateLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _account = source.readAddress();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidateLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, account: _account, trxId: _trxId };
}

function storeTupleLiquidateLPPositionOrder(source: LiquidateLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.account);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidateLPPositionOrder(): DictionaryValue<LiquidateLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLiquidateLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type UpdateLPPosition = {
    $$type: 'UpdateLPPosition';
    orderId: bigint;
    opType: bigint;
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeUpdateLPPosition(src: UpdateLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4272122737, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4272122737) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateLPPosition' as const, orderId: _orderId, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleUpdateLPPosition(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateLPPosition' as const, orderId: _orderId, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleUpdateLPPosition(source: UpdateLPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
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
        b_0.storeUint(1233766337, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1233766337) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
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

export type CompensateLPPositionOrder = {
    $$type: 'CompensateLPPositionOrder';
    orderId: bigint;
    trxId: bigint;
    needRefund: boolean;
    isExecute: boolean;
    executionFeeReceiver: Address | null;
}

export function storeCompensateLPPositionOrder(src: CompensateLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3086175268, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeBit(src.needRefund);
        b_0.storeBit(src.isExecute);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCompensateLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3086175268) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _needRefund = sc_0.loadBit();
    let _isExecute = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CompensateLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCompensateLPPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _needRefund = source.readBoolean();
    let _isExecute = source.readBoolean();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CompensateLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCompensateLPPositionOrder(source: CompensateLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeBoolean(source.needRefund);
    builder.writeBoolean(source.isExecute);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCompensateLPPositionOrder(): DictionaryValue<CompensateLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateLPPositionOrder(src.loadRef().beginParse());
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
        b_0.storeUint(4187297011, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4187297011) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
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
}

export function storeExecutePerpPositionOrder(src: ExecutePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4141977440, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecutePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4141977440) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecutePerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecutePerpPositionOrder(source: ExecutePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
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

export type CreateDecreasePerpPositionOrder = {
    $$type: 'CreateDecreasePerpPositionOrder';
    executionFee: bigint;
    marginDelta: bigint;
    liquidityDelta: bigint;
}

export function storeCreateDecreasePerpPositionOrder(src: CreateDecreasePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3387409492, 32);
        b_0.storeInt(src.executionFee, 257);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
    };
}

export function loadCreateDecreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3387409492) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadIntBig(257);
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta };
}

function loadTupleCreateDecreasePerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta };
}

function storeTupleCreateDecreasePerpPositionOrder(source: CreateDecreasePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
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

export type UpdatePerpPosition = {
    $$type: 'UpdatePerpPosition';
    isIncrease: boolean;
    orderId: bigint;
    account: Address;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeUpdatePerpPosition(src: UpdatePerpPosition) {
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

export function loadUpdatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3902592095) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdatePerpPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleUpdatePerpPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdatePerpPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleUpdatePerpPosition(source: UpdatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
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
        b_0.storeUint(485543809, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdatePerpPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 485543809) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
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

export type CompensatePerpPositionOrder = {
    $$type: 'CompensatePerpPositionOrder';
    orderId: bigint;
    trxId: bigint;
    needRefund: boolean;
    isExecute: boolean;
    executionFeeReceiver: Address | null;
}

export function storeCompensatePerpPositionOrder(src: CompensatePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1214351731, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeBit(src.needRefund);
        b_0.storeBit(src.isExecute);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCompensatePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1214351731) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _needRefund = sc_0.loadBit();
    let _isExecute = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CompensatePerpPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCompensatePerpPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _needRefund = source.readBoolean();
    let _isExecute = source.readBoolean();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CompensatePerpPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCompensatePerpPositionOrder(source: CompensatePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeBoolean(source.needRefund);
    builder.writeBoolean(source.isExecute);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCompensatePerpPositionOrder(): DictionaryValue<CompensatePerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensatePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCompensatePerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionOrderCreatedEvent = {
    $$type: 'RBFPositionOrderCreatedEvent';
    isIncrease: boolean;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeRBFPositionOrderCreatedEvent(src: RBFPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3479394200, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.executionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3479394200) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'RBFPositionOrderCreatedEvent' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleRBFPositionOrderCreatedEvent(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'RBFPositionOrderCreatedEvent' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleRBFPositionOrderCreatedEvent(source: RBFPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserRBFPositionOrderCreatedEvent(): DictionaryValue<RBFPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionOrderCancelledEvent = {
    $$type: 'RBFPositionOrderCancelledEvent';
    isIncrease: boolean;
    orderId: bigint;
    trxId: bigint;
}

export function storeRBFPositionOrderCancelledEvent(src: RBFPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(609511108, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadRBFPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 609511108) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'RBFPositionOrderCancelledEvent' as const, isIncrease: _isIncrease, orderId: _orderId, trxId: _trxId };
}

function loadTupleRBFPositionOrderCancelledEvent(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'RBFPositionOrderCancelledEvent' as const, isIncrease: _isIncrease, orderId: _orderId, trxId: _trxId };
}

function storeTupleRBFPositionOrderCancelledEvent(source: RBFPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserRBFPositionOrderCancelledEvent(): DictionaryValue<RBFPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionOrderExecutedEvent = {
    $$type: 'RBFPositionOrderExecutedEvent';
    isIncrease: boolean;
    orderId: bigint;
    trxId: bigint;
}

export function storeRBFPositionOrderExecutedEvent(src: RBFPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2435559759, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadRBFPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2435559759) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'RBFPositionOrderExecutedEvent' as const, isIncrease: _isIncrease, orderId: _orderId, trxId: _trxId };
}

function loadTupleRBFPositionOrderExecutedEvent(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'RBFPositionOrderExecutedEvent' as const, isIncrease: _isIncrease, orderId: _orderId, trxId: _trxId };
}

function storeTupleRBFPositionOrderExecutedEvent(source: RBFPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserRBFPositionOrderExecutedEvent(): DictionaryValue<RBFPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPositionOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderCreatedEvent = {
    $$type: 'LPPositionOrderCreatedEvent';
    opType: bigint;
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeLPPositionOrderCreatedEvent(src: LPPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3912257011, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3912257011) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'LPPositionOrderCreatedEvent' as const, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleLPPositionOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'LPPositionOrderCreatedEvent' as const, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleLPPositionOrderCreatedEvent(source: LPPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
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
        b_0.storeUint(275376848, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadLPPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 275376848) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
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
        b_0.storeUint(3610195672, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadLPPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3610195672) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
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

export type DecreaseLPPositionOrderCreatedEvent = {
    $$type: 'DecreaseLPPositionOrderCreatedEvent';
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeDecreaseLPPositionOrderCreatedEvent(src: DecreaseLPPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(81725293, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreaseLPPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 81725293) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionOrderCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleDecreaseLPPositionOrderCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionOrderCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleDecreaseLPPositionOrderCreatedEvent(source: DecreaseLPPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserDecreaseLPPositionOrderCreatedEvent(): DictionaryValue<DecreaseLPPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreaseLPPositionOrderCancelledEvent = {
    $$type: 'DecreaseLPPositionOrderCancelledEvent';
    orderId: bigint;
    trxId: bigint;
}

export function storeDecreaseLPPositionOrderCancelledEvent(src: DecreaseLPPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(408753603, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreaseLPPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 408753603) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionOrderCancelledEvent' as const, orderId: _orderId, trxId: _trxId };
}

function loadTupleDecreaseLPPositionOrderCancelledEvent(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionOrderCancelledEvent' as const, orderId: _orderId, trxId: _trxId };
}

function storeTupleDecreaseLPPositionOrderCancelledEvent(source: DecreaseLPPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreaseLPPositionOrderCancelledEvent(): DictionaryValue<DecreaseLPPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreaseLPPositionOrderExecutedEvent = {
    $$type: 'DecreaseLPPositionOrderExecutedEvent';
    orderId: bigint;
    trxId: bigint;
}

export function storeDecreaseLPPositionOrderExecutedEvent(src: DecreaseLPPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2567157546, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreaseLPPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2567157546) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionOrderExecutedEvent' as const, orderId: _orderId, trxId: _trxId };
}

function loadTupleDecreaseLPPositionOrderExecutedEvent(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionOrderExecutedEvent' as const, orderId: _orderId, trxId: _trxId };
}

function storeTupleDecreaseLPPositionOrderExecutedEvent(source: DecreaseLPPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreaseLPPositionOrderExecutedEvent(): DictionaryValue<DecreaseLPPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionMarketOrderCreatedEvent = {
    $$type: 'IncreasePerpPositionMarketOrderCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeIncreasePerpPositionMarketOrderCreatedEvent(src: IncreasePerpPositionMarketOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1445874292, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.acceptablePrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreasePerpPositionMarketOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1445874292) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _acceptablePrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleIncreasePerpPositionMarketOrderCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleIncreasePerpPositionMarketOrderCreatedEvent(source: IncreasePerpPositionMarketOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketOrderCreatedEvent(): DictionaryValue<IncreasePerpPositionMarketOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionMarketOrderCancelledEvent = {
    $$type: 'IncreasePerpPositionMarketOrderCancelledEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionMarketOrderCancelledEvent(src: IncreasePerpPositionMarketOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3054729633, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionMarketOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3054729633) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleIncreasePerpPositionMarketOrderCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleIncreasePerpPositionMarketOrderCancelledEvent(source: IncreasePerpPositionMarketOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketOrderCancelledEvent(): DictionaryValue<IncreasePerpPositionMarketOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionMarketOrderExecutedEvent = {
    $$type: 'IncreasePerpPositionMarketOrderExecutedEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionMarketOrderExecutedEvent(src: IncreasePerpPositionMarketOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1442009393, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionMarketOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1442009393) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleIncreasePerpPositionMarketOrderExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleIncreasePerpPositionMarketOrderExecutedEvent(source: IncreasePerpPositionMarketOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketOrderExecutedEvent(): DictionaryValue<IncreasePerpPositionMarketOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitOrderCreatedEvent = {
    $$type: 'IncreasePerpPositionLimitOrderCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    orderId: bigint;
}

export function storeIncreasePerpPositionLimitOrderCreatedEvent(src: IncreasePerpPositionLimitOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3303324975, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreasePerpPositionLimitOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3303324975) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleIncreasePerpPositionLimitOrderCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleIncreasePerpPositionLimitOrderCreatedEvent(source: IncreasePerpPositionLimitOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitOrderCreatedEvent(): DictionaryValue<IncreasePerpPositionLimitOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitOrderCancelledEvent = {
    $$type: 'IncreasePerpPositionLimitOrderCancelledEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionLimitOrderCancelledEvent(src: IncreasePerpPositionLimitOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2056849555, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionLimitOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2056849555) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleIncreasePerpPositionLimitOrderCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleIncreasePerpPositionLimitOrderCancelledEvent(source: IncreasePerpPositionLimitOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitOrderCancelledEvent(): DictionaryValue<IncreasePerpPositionLimitOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitOrderExecutedEvent = {
    $$type: 'IncreasePerpPositionLimitOrderExecutedEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionLimitOrderExecutedEvent(src: IncreasePerpPositionLimitOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3235760894, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionLimitOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3235760894) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleIncreasePerpPositionLimitOrderExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleIncreasePerpPositionLimitOrderExecutedEvent(source: IncreasePerpPositionLimitOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitOrderExecutedEvent(): DictionaryValue<IncreasePerpPositionLimitOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionMarketOrderCreatedEvent = {
    $$type: 'DecreasePerpPositionMarketOrderCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeDecreasePerpPositionMarketOrderCreatedEvent(src: DecreasePerpPositionMarketOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2264529706, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.acceptablePrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreasePerpPositionMarketOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2264529706) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _acceptablePrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleDecreasePerpPositionMarketOrderCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleDecreasePerpPositionMarketOrderCreatedEvent(source: DecreasePerpPositionMarketOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketOrderCreatedEvent(): DictionaryValue<DecreasePerpPositionMarketOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionMarketOrderCancelledEvent = {
    $$type: 'DecreasePerpPositionMarketOrderCancelledEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionMarketOrderCancelledEvent(src: DecreasePerpPositionMarketOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1243823502, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionMarketOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1243823502) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleDecreasePerpPositionMarketOrderCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleDecreasePerpPositionMarketOrderCancelledEvent(source: DecreasePerpPositionMarketOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketOrderCancelledEvent(): DictionaryValue<DecreasePerpPositionMarketOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionMarketOrderExecutedEvent = {
    $$type: 'DecreasePerpPositionMarketOrderExecutedEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionMarketOrderExecutedEvent(src: DecreasePerpPositionMarketOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2036383615, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionMarketOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2036383615) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleDecreasePerpPositionMarketOrderExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleDecreasePerpPositionMarketOrderExecutedEvent(source: DecreasePerpPositionMarketOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketOrderExecutedEvent(): DictionaryValue<DecreasePerpPositionMarketOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitOrderCreatedEvent = {
    $$type: 'DecreasePerpPositionLimitOrderCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    orderId: bigint;
}

export function storeDecreasePerpPositionLimitOrderCreatedEvent(src: DecreasePerpPositionLimitOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3295238919, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreasePerpPositionLimitOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3295238919) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleDecreasePerpPositionLimitOrderCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitOrderCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleDecreasePerpPositionLimitOrderCreatedEvent(source: DecreasePerpPositionLimitOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitOrderCreatedEvent(): DictionaryValue<DecreasePerpPositionLimitOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitOrderCancelledEvent = {
    $$type: 'DecreasePerpPositionLimitOrderCancelledEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionLimitOrderCancelledEvent(src: DecreasePerpPositionLimitOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2276847295, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionLimitOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2276847295) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleDecreasePerpPositionLimitOrderCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitOrderCancelledEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleDecreasePerpPositionLimitOrderCancelledEvent(source: DecreasePerpPositionLimitOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitOrderCancelledEvent(): DictionaryValue<DecreasePerpPositionLimitOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitOrderExecutedEvent = {
    $$type: 'DecreasePerpPositionLimitOrderExecutedEvent';
    token: string;
    orderId: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionLimitOrderExecutedEvent(src: DecreasePerpPositionLimitOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2064498851, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionLimitOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2064498851) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function loadTupleDecreasePerpPositionLimitOrderExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitOrderExecutedEvent' as const, token: _token, orderId: _orderId, trxId: _trxId };
}

function storeTupleDecreasePerpPositionLimitOrderExecutedEvent(source: DecreasePerpPositionLimitOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitOrderExecutedEvent(): DictionaryValue<DecreasePerpPositionLimitOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type TokenConfig = {
    $$type: 'TokenConfig';
    name: string;
    enable: boolean;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
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

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    isCompensator: boolean | null;
    minTimeDelayExecutor: bigint;
    maxTimeDelayExecutor: bigint;
    minTimeDelayTrader: bigint;
    minPendingTimeDelayCompensator: bigint;
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
        if (src.isCompensator !== null && src.isCompensator !== undefined) { b_0.storeBit(true).storeBit(src.isCompensator); } else { b_0.storeBit(false); }
        b_0.storeInt(src.minTimeDelayExecutor, 257);
        b_0.storeInt(src.maxTimeDelayExecutor, 257);
        b_0.storeInt(src.minTimeDelayTrader, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.minPendingTimeDelayCompensator, 257);
        b_1.storeInt(src.minExecutionFee, 257);
        b_1.storeInt(src.gasConsumption, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.minTonsForStorage, 257);
        b_2.storeAddress(src.usdtWallet);
        b_2.storeAddress(src.pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _isCompensator = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minTimeDelayExecutor = sc_0.loadIntBig(257);
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _minPendingTimeDelayCompensator = sc_1.loadIntBig(257);
    let _minExecutionFee = sc_1.loadIntBig(257);
    let _gasConsumption = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _minTonsForStorage = sc_2.loadIntBig(257);
    let _usdtWallet = sc_2.loadAddress();
    let _pool = sc_2.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minPendingTimeDelayCompensator: _minPendingTimeDelayCompensator, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _isCompensator = source.readBooleanOpt();
    let _minTimeDelayExecutor = source.readBigNumber();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minPendingTimeDelayCompensator = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minPendingTimeDelayCompensator: _minPendingTimeDelayCompensator, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeBoolean(source.isCompensator);
    builder.writeNumber(source.minTimeDelayExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minPendingTimeDelayCompensator);
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

export type JettonCallback = {
    $$type: 'JettonCallback';
    orderType: bigint;
    orderId: bigint;
    tokenId: bigint | null;
    amount: bigint;
    receiver: Address;
    trxId: bigint;
}

export function storeJettonCallback(src: JettonCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.orderType, 257);
        b_0.storeInt(src.orderId, 257);
        if (src.tokenId !== null && src.tokenId !== undefined) { b_0.storeBit(true).storeInt(src.tokenId, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        b_1.storeInt(src.amount, 257);
        b_1.storeAddress(src.receiver);
        b_1.storeInt(src.trxId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJettonCallback(slice: Slice) {
    let sc_0 = slice;
    let _orderType = sc_0.loadIntBig(257);
    let _orderId = sc_0.loadIntBig(257);
    let _tokenId = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _amount = sc_1.loadIntBig(257);
    let _receiver = sc_1.loadAddress();
    let _trxId = sc_1.loadIntBig(257);
    return { $$type: 'JettonCallback' as const, orderType: _orderType, orderId: _orderId, tokenId: _tokenId, amount: _amount, receiver: _receiver, trxId: _trxId };
}

function loadTupleJettonCallback(source: TupleReader) {
    let _orderType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _tokenId = source.readBigNumberOpt();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _trxId = source.readBigNumber();
    return { $$type: 'JettonCallback' as const, orderType: _orderType, orderId: _orderId, tokenId: _tokenId, amount: _amount, receiver: _receiver, trxId: _trxId };
}

function storeTupleJettonCallback(source: JettonCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserJettonCallback(): DictionaryValue<JettonCallback> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonCallback(src)).endCell());
        },
        parse: (src) => {
            return loadJettonCallback(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionOrder = {
    $$type: 'RBFPositionOrder';
    isIncrease: boolean;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    pendingTime: bigint;
    callbackId: bigint | null;
    executionFeeReceiver: Address | null;
    lastOperator: Address | null;
}

export function storeRBFPositionOrder(src: RBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isIncrease);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.executionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.blockTime, 257);
        b_1.storeBit(src.isPending);
        b_1.storeInt(src.pendingTime, 257);
        if (src.callbackId !== null && src.callbackId !== undefined) { b_1.storeBit(true).storeInt(src.callbackId, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        b_2.storeAddress(src.executionFeeReceiver);
        b_2.storeAddress(src.lastOperator);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _isIncrease = sc_0.loadBit();
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _blockTime = sc_1.loadIntBig(257);
    let _isPending = sc_1.loadBit();
    let _pendingTime = sc_1.loadIntBig(257);
    let _callbackId = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _executionFeeReceiver = sc_2.loadMaybeAddress();
    let _lastOperator = sc_2.loadMaybeAddress();
    return { $$type: 'RBFPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleRBFPositionOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _pendingTime = source.readBigNumber();
    let _callbackId = source.readBigNumberOpt();
    let _executionFeeReceiver = source.readAddressOpt();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'RBFPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTupleRBFPositionOrder(source: RBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeNumber(source.pendingTime);
    builder.writeNumber(source.callbackId);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.lastOperator);
    return builder.build();
}

function dictValueParserRBFPositionOrder(): DictionaryValue<RBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrder = {
    $$type: 'LPPositionOrder';
    opType: bigint;
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    pendingTime: bigint;
    callbackId: bigint | null;
    executionFeeReceiver: Address | null;
    lastOperator: Address | null;
}

export function storeLPPositionOrder(src: LPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.blockTime, 257);
        b_1.storeBit(src.isPending);
        b_1.storeInt(src.pendingTime, 257);
        let b_2 = new Builder();
        if (src.callbackId !== null && src.callbackId !== undefined) { b_2.storeBit(true).storeInt(src.callbackId, 257); } else { b_2.storeBit(false); }
        b_2.storeAddress(src.executionFeeReceiver);
        b_2.storeAddress(src.lastOperator);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    let _isPending = sc_1.loadBit();
    let _pendingTime = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _callbackId = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _executionFeeReceiver = sc_2.loadMaybeAddress();
    let _lastOperator = sc_2.loadMaybeAddress();
    return { $$type: 'LPPositionOrder' as const, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleLPPositionOrder(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _pendingTime = source.readBigNumber();
    let _callbackId = source.readBigNumberOpt();
    let _executionFeeReceiver = source.readAddressOpt();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'LPPositionOrder' as const, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTupleLPPositionOrder(source: LPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeNumber(source.pendingTime);
    builder.writeNumber(source.callbackId);
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

export type IncreasePerpPositionMarketOrders = {
    $$type: 'IncreasePerpPositionMarketOrders';
    increasePerpPositionMarketOrders: Dictionary<bigint, IncreasePerpPositionMarketOrder>;
}

export function storeIncreasePerpPositionMarketOrders(src: IncreasePerpPositionMarketOrders) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.increasePerpPositionMarketOrders, Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionMarketOrder());
    };
}

export function loadIncreasePerpPositionMarketOrders(slice: Slice) {
    let sc_0 = slice;
    let _increasePerpPositionMarketOrders = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionMarketOrder(), sc_0);
    return { $$type: 'IncreasePerpPositionMarketOrders' as const, increasePerpPositionMarketOrders: _increasePerpPositionMarketOrders };
}

function loadTupleIncreasePerpPositionMarketOrders(source: TupleReader) {
    let _increasePerpPositionMarketOrders = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionMarketOrder(), source.readCellOpt());
    return { $$type: 'IncreasePerpPositionMarketOrders' as const, increasePerpPositionMarketOrders: _increasePerpPositionMarketOrders };
}

function storeTupleIncreasePerpPositionMarketOrders(source: IncreasePerpPositionMarketOrders) {
    let builder = new TupleBuilder();
    builder.writeCell(source.increasePerpPositionMarketOrders.size > 0 ? beginCell().storeDictDirect(source.increasePerpPositionMarketOrders, Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionMarketOrder()).endCell() : null);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketOrders(): DictionaryValue<IncreasePerpPositionMarketOrders> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketOrders(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketOrders(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionMarketOrder = {
    $$type: 'IncreasePerpPositionMarketOrder';
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    blockTime: bigint;
}

export function storeIncreasePerpPositionMarketOrder(src: IncreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.acceptablePrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.blockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _acceptablePrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleIncreasePerpPositionMarketOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleIncreasePerpPositionMarketOrder(source: IncreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketOrder(): DictionaryValue<IncreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

 type OrderBook_init_args = {
    $$type: 'OrderBook_init_args';
}

function initOrderBook_init_args(src: OrderBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function OrderBook_init() {
    const __code = Cell.fromBase64('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HBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgJWHgIRHts8VhjjD1krLAPyJqSBAQFxAW1WGwJWHgFWIQERHchVUNs8yRApAREYAVKAIG6VMFn0WjCUQTP0FeJWHW6zlxEdIG7y0ICUVx34QuL4Qn/4IykGERwGgQEBViAHVh8HBhEhBgURIwUEESMEAxEjAwIRIwIBESHIVZDbPMkCERoCAREVAX5ULQLYVxhXGFcZVxn4QlYabrOaMBEZIG7y0IARGZJXGuKBAQFtIG6SMG2OjSBu8tCAbyrIVZDbPMniECNWFQEgbpUwWfRaMJRBM/QV4nACAREUARETyFUgghAkVGbEUATLHxLKAIEBAc8AgQEBzwDJVC4BoiBulTBZ9FowlEEz9BXi+CgREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMGRsXEEYQRRA0ECPbPHkCusiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAERFwF/AREVcRAjbW1t2zz4Qg4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QTBA7SpAQaBA3EDUQNHDbPISCBNT4QW8kLIEBAShZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBf30hbrPy9CBu8tCAbyoxMifjDxESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVOwMRIAMCESACAREZAVYbAREbojAxMgP4VBupgUtpCts8pwNWHqoAoFYdoBEVESMRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIERYIBxEjBwYRIgYFESEFBBEgBAMRHwMCER4CAREdAREc2zwBER0BoHNxMwP4VBupgUtpCts8pwZWHqcDoFYdoBEVESMRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIERYIBxEjBwYRIgYFESEFBBEgBAMRHwMCER4CAREdAREc2zwBER0BoHNxNAPS2zxWH26zlxEfIG7y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yFWg2zzJAREWAVYYAX9IAsogbpUwWfRaMJRBM/QV4nCAQH9zVDMABBEcBAMRHgMCERkCEEVVAshVUNs8ySsEAxEVAwIRGAIRGgEUQzBtbds8DxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGxVVRNFUGSEA/hUHLqBS2kL2zynA1YhqgCgViCgERURJhEVERQRJREUERMRJBETERIRIxESERERIhERERARIREQDxEgDw4RHw4NER4NDBEdDAsRHAsKERsKCREaCQgRGQgHERgHBhEXBgURFgUEESYEAxElAwIRJAIBESMBESLbPAERIwGgc3FMA/hUHLqBS2kL2zynBlYhpwOgViCgERURJhEVERQRJREUERMRJBETERIRIxESERERIhERERARIREQDxEgDw4RHw4NER4NDBEdDAsRHAsKERsKCREaCQgRGQgHERgHBhEXBgURFgUEESYEAxElAwIRJAIBESMBESLbPAERIwGgc3FNAgTjD05PABYBERoBvgERGAHy9AAiggnoSACgAREaAb4BERgB8vQC/FcaggCcXVYYbrPy9FYXIG7y0IAjgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsFm8G4iBujj9bVxFXEVcRVxNXE1cTVxVXFVcWVxZXFlcWBBEVBAMRFAMCERMCARESARERBBEQBBA/TtAQTBA7EEoQORRIgBPgIG7y0IBvJjBENHZQA/5XElcSVxJXFlcbVxtXGxETjulXEIEBAW0gbpIwbY6NIG7y0IBvKshVkNs8yeIQLFYWASBulTBZ9FowlEEz9BXifwIBERUBERTIVSCCEJErsU9QBMsfEsoAgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wDjDixuVFJTA+hTNIEBAREkyFVQ2zzJECYBER8BUjAgbpUwWfRaMJRBM/QV4lYabrOdVxgRGSBu8tCAERcRGZJXGuL4QggRFQgHERQHBhETBgURIwUEESIEAxEhAwIRIAIBERkBERiBAQERGchVkNs8yQMRGAMCERACAREWAX5UUQGWIG6VMFn0WjCUQTP0FeL4KAgRGQgHERgHBhEXBgURFgUEERUEAxEUAwIREwIFERIFDhERDgMREAMQvxCuEJ0QjBA7EGoZEGgVF9s8eQPsVhBus464gQEBEREgbvLQgG0gbpIw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');
    const __system = Cell.fromBase64('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bpUwWfRaMJRBM/QV4vgoBxEZBwYRGAYFERcFBBEWBAMRFQMCERQCDxESDwMREQMMERAMEL8QrhCdEIwQOxBqEFkQOBcQVts8igP4VB3LgUtpDNs8pwZWIqcDoFYhoBEVEScRFREUESYRFBETESURExESESQREhERESMREREQESIREA8RIQ8OESAODREfDQwRHgwLER0LChEcCgkRGwkIERoIBxEZBwYRGAYFERcFBBEWBAMRJwMCESYCARElAREk2zwBESUBoI1uMwAiggnoSACgAREcAb4BERoB8vQD+FQdy4FLaQzbPKcDViKqAKBWIaARFREnERURFBEmERQRExElERMREhEkERIREREjEREREBEiERAPESEPDhEgDg0RHw0MER4MCxEdCwoRHAoJERsJCBEaCAcRGQcGERgGBREXBQQRFgQDEScDAhEmAgERJQERJNs8ARElAaCNbjUAFgERHAG+AREaAfL0Acww0x8BghBSQdyBuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFUgbBPbPH83A/b4QW8kVBMjgUtpBNs8pwZWFqcDoFYVoBEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRGwkIERoIBxEZBwYRGAYFERcFBBEWBAMRGwMCERoCAREZAREY2zyNbjgC/AERGQGgggnoSACgAREaAb4BERgB8vRwgQEL+EIpWXFBM/QKb6GUAdcAMJJbbeIgbrOWMSBu8tCAkTDiggCg9wHy9PhCVhVus5owERQgbvLQgBEUklcV4lYWpIEBAXNwUwD4I3/4I234QhCJVh4JESAByFWg2zzJAREWAVYYAZo5AsogbpUwWfRaMJRBM/QV4nCAQH9zVDMABBEcBAMRHgMCERkCEEVVAshVUNs8ySsEAxEVAwIRGAIRGgEUQzBtbds8DxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGxVVRNFUEOSAqgw0x8BghBJicfBuvLggYEBAdcAgQEB1wDTP1UgbBP4QW8kggCg9/hCVhYBxwXy9CqBAQEoWfQNb6GSMG3fIG6SMG2O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kjBt3yBukjBtjofQ2zxsGm8K4oF/fSFus/L0IG7y0IBvKjEyJ+MPERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU7AxEgAwIRIAIBERkBVhsBERuhbGpnA9LbPFYfbrOXER8gbvLQgJRXH/hC4n/4I4EBAVYhB1YhB1YhBwYRIQYFESAFBBEgBAMRIAMCER8CAREhAREeyFWQ2zzJAREXAVYUASBulTBZ9FowlEEz9BXiAREZAREScBESgEARGn8RGlhpn2gB8MhVQIIQ6JzUX1AGyx8UygASyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDLP8knBAMREQMCERgCERcBFEMwbW3bPAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6EIkQKEcWEDVQRJIAmIFebQGz8vRwgQEL+EItWXFBM/QKb6GUAdcAMJJbbeIgbrOWMSBu8tCAkTDiggCg9wHy9IIAmxchVhig+CO78vSBQYwBVhag+CO88vQD+FQbqYFLaQrbPKcGVh6nA6BWHaARFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRIwcGESIGBREhBQQRIAQDER8DAhEeAgERHQERHNs8AREdAaCNbmsAIoIJ6EgAoAERFgG+AREiAfL0A/hUG6mBS2kK2zynA1YeqgCgVh2gERURIxEVERQRIhEUERMRIRETERIRIBESERERHxERERARHhEQDxEdDw4RHA4NERsNDBEaDAsRGQsKERgKCREXCQgRFggHESMHBhEiBgURIQUEESAEAxEfAwIRHgIBER0BERzbPAERHQGgjW5tABYBERYBvgERIgHy9AEc+EFvJNs8VhGqAKBWEKCNBPT4QW8kLIEBAShZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBf30hbrPy9CBu8tCAbypfBCWOnlQZh4FLaQjbPKoBVhyqAKBWG6CCCehIAKAWvhTy9I6WVBmHgUtpCNs8qgBWHKBWG6AWvhTy9OL4QhEXER8RFxEWER4RFqGNjXADzhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RHw8OER4ODREdDQwRHAwLERsL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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOrderBook_init_args({ $$type: 'OrderBook_init_args' })(builder);
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
    16780: { message: `order expired` },
    19305: { message: `gas not enough` },
    21064: { message: `not compensator` },
    24173: { message: `order is pending` },
    24562: { message: `execution fee not enough` },
    32637: { message: `order not exist` },
    39703: { message: `too early` },
    40029: { message: `jetton callback not exist` },
    41207: { message: `invalid sender` },
    42241: { message: `order not pending` },
    54538: { message: `too early for compensator` },
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
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateConfig","header":2288110707,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableCompensator","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minPendingTimeDelayCompensator","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":true}},{"name":"pool","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CreateDecreaseRBFPositionOrder","header":2702271213,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelRBFPositionOrder","header":3161392643,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteRBFPositionOrder","header":2755031130,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"UpdateRBFPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateRBFPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateRBFPositionOrder","header":638245171,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":1912782205,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelLPPositionOrder","header":1477803963,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteLPPositionOrder","header":63604284,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LiquidateLPPositionOrder","header":1380048001,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateLPPosition","header":4272122737,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateLPPositionSuccess","header":1233766337,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateLPPositionOrder","header":3086175268,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CancelPerpPositionOrder","header":4187297011,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecutePerpPositionOrder","header":4141977440,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreasePerpPositionOrder","header":3387409492,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePerpPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensatePerpPositionOrder","header":1214351731,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RBFPositionOrderCreatedEvent","header":3479394200,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderCancelledEvent","header":609511108,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderExecutedEvent","header":2435559759,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderCreatedEvent","header":3912257011,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderCancelledEvent","header":275376848,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderExecutedEvent","header":3610195672,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionOrderCreatedEvent","header":81725293,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionOrderCancelledEvent","header":408753603,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionOrderExecutedEvent","header":2567157546,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketOrderCreatedEvent","header":1445874292,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketOrderCancelledEvent","header":3054729633,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketOrderExecutedEvent","header":1442009393,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitOrderCreatedEvent","header":3303324975,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitOrderCancelledEvent","header":2056849555,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitOrderExecutedEvent","header":3235760894,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketOrderCreatedEvent","header":2264529706,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketOrderCancelledEvent","header":1243823502,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketOrderExecutedEvent","header":2036383615,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitOrderCreatedEvent","header":3295238919,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitOrderCancelledEvent","header":2276847295,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitOrderExecutedEvent","header":2064498851,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minPendingTimeDelayCompensator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonCallback","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pendingTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LPPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pendingTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"IncreasePerpPositionMarketOrders","header":null,"fields":[{"name":"increasePerpPositionMarketOrders","type":{"kind":"dict","key":"int","value":"IncreasePerpPositionMarketOrder","valueFormat":"ref"}}]},
    {"name":"IncreasePerpPositionMarketOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"rbfPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"RBFPositionOrder","optional":true}},
    {"name":"rbfPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LPPositionOrder","optional":true}},
    {"name":"lpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const OrderBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRBFPositionSuccess"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CompensateRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPositionSuccess"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CompensateLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class OrderBook implements Contract {
    
    static async init() {
        return await OrderBook_init();
    }
    
    static async fromInit() {
        const init = await OrderBook_init();
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | TokenNotification | TokenExcesses | CreateDecreaseRBFPositionOrder | CancelRBFPositionOrder | ExecuteRBFPositionOrder | UpdateRBFPositionSuccess | CompensateRBFPositionOrder | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | LiquidateLPPositionOrder | CompensateLPPositionOrder | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreaseRBFPositionOrder') {
            body = beginCell().store(storeCreateDecreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelRBFPositionOrder') {
            body = beginCell().store(storeCancelRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteRBFPositionOrder') {
            body = beginCell().store(storeExecuteRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRBFPositionSuccess') {
            body = beginCell().store(storeUpdateRBFPositionSuccess(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CompensateRBFPositionOrder') {
            body = beginCell().store(storeCompensateRBFPositionOrder(message)).endCell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateLPPositionOrder') {
            body = beginCell().store(storeLiquidateLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CompensateLPPositionOrder') {
            body = beginCell().store(storeCompensateLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getConfigData(provider: ContractProvider, executor: Address | null, compensator: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(executor);
        builder.writeAddress(compensator);
        let source = (await provider.get('configData', builder.build())).stack;
        const result = loadTupleConfigData(source);
        return result;
    }
    
    async getRbfPositionOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('rbfPositionOrder', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleRBFPositionOrder(result_p) : null;
        return result;
    }
    
    async getRbfPositionOrderIndexNext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('rbfPositionOrderIndexNext', builder.build())).stack;
        let result = source.readBigNumber();
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
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}