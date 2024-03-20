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

export type CompensateIncreaseRBFPositionOrder = {
    $$type: 'CompensateIncreaseRBFPositionOrder';
    orderId: bigint;
    trxId: bigint;
    positionSuccess: boolean;
    refundSuccess: boolean;
    executionFeeReceiver: Address | null;
}

export function storeCompensateIncreaseRBFPositionOrder(src: CompensateIncreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3360956377, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeBit(src.positionSuccess);
        b_0.storeBit(src.refundSuccess);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCompensateIncreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3360956377) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _positionSuccess = sc_0.loadBit();
    let _refundSuccess = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CompensateIncreaseRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, positionSuccess: _positionSuccess, refundSuccess: _refundSuccess, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCompensateIncreaseRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _positionSuccess = source.readBoolean();
    let _refundSuccess = source.readBoolean();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CompensateIncreaseRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, positionSuccess: _positionSuccess, refundSuccess: _refundSuccess, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCompensateIncreaseRBFPositionOrder(source: CompensateIncreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeBoolean(source.positionSuccess);
    builder.writeBoolean(source.refundSuccess);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCompensateIncreaseRBFPositionOrder(): DictionaryValue<CompensateIncreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateIncreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateIncreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CompensateDecreaseRBFPositionOrder = {
    $$type: 'CompensateDecreaseRBFPositionOrder';
    orderId: bigint;
    trxId: bigint;
    positionSuccess: boolean;
    refundSuccess: boolean;
    executionFeeReceiver: Address | null;
}

export function storeCompensateDecreaseRBFPositionOrder(src: CompensateDecreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3244396211, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeBit(src.positionSuccess);
        b_0.storeBit(src.refundSuccess);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCompensateDecreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3244396211) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _positionSuccess = sc_0.loadBit();
    let _refundSuccess = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CompensateDecreaseRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, positionSuccess: _positionSuccess, refundSuccess: _refundSuccess, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCompensateDecreaseRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _positionSuccess = source.readBoolean();
    let _refundSuccess = source.readBoolean();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CompensateDecreaseRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, positionSuccess: _positionSuccess, refundSuccess: _refundSuccess, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCompensateDecreaseRBFPositionOrder(source: CompensateDecreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeBoolean(source.positionSuccess);
    builder.writeBoolean(source.refundSuccess);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCompensateDecreaseRBFPositionOrder(): DictionaryValue<CompensateDecreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateDecreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateDecreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelIncreaseLPPositionOrder = {
    $$type: 'CancelIncreaseLPPositionOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelIncreaseLPPositionOrder(src: CancelIncreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(228695406, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 228695406) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelIncreaseLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelIncreaseLPPositionOrder(source: CancelIncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelIncreaseLPPositionOrder(): DictionaryValue<CancelIncreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelIncreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelIncreaseLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteIncreaseLPPositionOrder = {
    $$type: 'ExecuteIncreaseLPPositionOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteIncreaseLPPositionOrder(src: ExecuteIncreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3764880894, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3764880894) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteIncreaseLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteIncreaseLPPositionOrder(source: ExecuteIncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteIncreaseLPPositionOrder(): DictionaryValue<ExecuteIncreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteIncreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteIncreaseLPPositionOrder(src.loadRef().beginParse());
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

export type CancelDecreaseLPPositionOrder = {
    $$type: 'CancelDecreaseLPPositionOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelDecreaseLPPositionOrder(src: CancelDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2748692867, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2748692867) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelDecreaseLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelDecreaseLPPositionOrder(source: CancelDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelDecreaseLPPositionOrder(): DictionaryValue<CancelDecreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelDecreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelDecreaseLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteDecreaseLPPositionOrder = {
    $$type: 'ExecuteDecreaseLPPositionOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteDecreaseLPPositionOrder(src: ExecuteDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1701079937, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1701079937) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteDecreaseLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreaseLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteDecreaseLPPositionOrder(source: ExecuteDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteDecreaseLPPositionOrder(): DictionaryValue<ExecuteDecreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteDecreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteDecreaseLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelIncreasePerpPositionMarketOrder = {
    $$type: 'CancelIncreasePerpPositionMarketOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelIncreasePerpPositionMarketOrder(src: CancelIncreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1488535682, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1488535682) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelIncreasePerpPositionMarketOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelIncreasePerpPositionMarketOrder(source: CancelIncreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelIncreasePerpPositionMarketOrder(): DictionaryValue<CancelIncreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelIncreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelIncreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteIncreasePerpPositionMarketOrder = {
    $$type: 'ExecuteIncreasePerpPositionMarketOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteIncreasePerpPositionMarketOrder(src: ExecuteIncreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3760571195, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3760571195) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteIncreasePerpPositionMarketOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteIncreasePerpPositionMarketOrder(source: ExecuteIncreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteIncreasePerpPositionMarketOrder(): DictionaryValue<ExecuteIncreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteIncreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteIncreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreasePerpPositionMarketOrder = {
    $$type: 'CreateDecreasePerpPositionMarketOrder';
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
}

export function storeCreateDecreasePerpPositionMarketOrder(src: CreateDecreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3819223803, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        b_0.storeInt(src.acceptablePrice, 257);
    };
}

export function loadCreateDecreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3819223803) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let _acceptablePrice = sc_0.loadIntBig(257);
    return { $$type: 'CreateDecreasePerpPositionMarketOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice };
}

function loadTupleCreateDecreasePerpPositionMarketOrder(source: TupleReader) {
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpPositionMarketOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice };
}

function storeTupleCreateDecreasePerpPositionMarketOrder(source: CreateDecreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    return builder.build();
}

function dictValueParserCreateDecreasePerpPositionMarketOrder(): DictionaryValue<CreateDecreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelDecreasePerpPositionMarketOrder = {
    $$type: 'CancelDecreasePerpPositionMarketOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelDecreasePerpPositionMarketOrder(src: CancelDecreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3020087979, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3020087979) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelDecreasePerpPositionMarketOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelDecreasePerpPositionMarketOrder(source: CancelDecreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelDecreasePerpPositionMarketOrder(): DictionaryValue<CancelDecreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelDecreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelDecreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteDecreasePerpPositionMarketOrder = {
    $$type: 'ExecuteDecreasePerpPositionMarketOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteDecreasePerpPositionMarketOrder(src: ExecuteDecreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2471367957, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2471367957) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteDecreasePerpPositionMarketOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreasePerpPositionMarketOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteDecreasePerpPositionMarketOrder(source: ExecuteDecreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteDecreasePerpPositionMarketOrder(): DictionaryValue<ExecuteDecreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteDecreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteDecreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateIncreasePerpPositionLimitOrder = {
    $$type: 'CreateIncreasePerpPositionLimitOrder';
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
}

export function storeCreateIncreasePerpPositionLimitOrder(src: CreateIncreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3360172408, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        b_0.storeInt(src.triggerPrice, 257);
        b_0.storeBit(src.triggerAbove);
    };
}

export function loadCreateIncreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3360172408) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let _triggerPrice = sc_0.loadIntBig(257);
    let _triggerAbove = sc_0.loadBit();
    return { $$type: 'CreateIncreasePerpPositionLimitOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove };
}

function loadTupleCreateIncreasePerpPositionLimitOrder(source: TupleReader) {
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    return { $$type: 'CreateIncreasePerpPositionLimitOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove };
}

function storeTupleCreateIncreasePerpPositionLimitOrder(source: CreateIncreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    return builder.build();
}

function dictValueParserCreateIncreasePerpPositionLimitOrder(): DictionaryValue<CreateIncreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateIncreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateIncreasePerpPositionLimitOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelIncreasePerpPositionLimitOrder = {
    $$type: 'CancelIncreasePerpPositionLimitOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelIncreasePerpPositionLimitOrder(src: CancelIncreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3884519450, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3884519450) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelIncreasePerpPositionLimitOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelIncreasePerpPositionLimitOrder(source: CancelIncreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelIncreasePerpPositionLimitOrder(): DictionaryValue<CancelIncreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelIncreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelIncreasePerpPositionLimitOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteIncreasePerpPositionLimitOrder = {
    $$type: 'ExecuteIncreasePerpPositionLimitOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteIncreasePerpPositionLimitOrder(src: ExecuteIncreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1350453542, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1350453542) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteIncreasePerpPositionLimitOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteIncreasePerpPositionLimitOrder(source: ExecuteIncreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteIncreasePerpPositionLimitOrder(): DictionaryValue<ExecuteIncreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteIncreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteIncreasePerpPositionLimitOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreasePerpPositionLimitOrder = {
    $$type: 'CreateDecreasePerpPositionLimitOrder';
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
}

export function storeCreateDecreasePerpPositionLimitOrder(src: CreateDecreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2350654920, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        b_0.storeInt(src.triggerPrice, 257);
        b_0.storeBit(src.triggerAbove);
    };
}

export function loadCreateDecreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2350654920) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let _triggerPrice = sc_0.loadIntBig(257);
    let _triggerAbove = sc_0.loadBit();
    return { $$type: 'CreateDecreasePerpPositionLimitOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove };
}

function loadTupleCreateDecreasePerpPositionLimitOrder(source: TupleReader) {
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    return { $$type: 'CreateDecreasePerpPositionLimitOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove };
}

function storeTupleCreateDecreasePerpPositionLimitOrder(source: CreateDecreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    return builder.build();
}

function dictValueParserCreateDecreasePerpPositionLimitOrder(): DictionaryValue<CreateDecreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreasePerpPositionLimitOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelDecreasePerpPositionLimitOrder = {
    $$type: 'CancelDecreasePerpPositionLimitOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelDecreasePerpPositionLimitOrder(src: CancelDecreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1507135123, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1507135123) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelDecreasePerpPositionLimitOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelDecreasePerpPositionLimitOrder(source: CancelDecreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelDecreasePerpPositionLimitOrder(): DictionaryValue<CancelDecreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelDecreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelDecreasePerpPositionLimitOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteDecreasePerpPositionLimitOrder = {
    $$type: 'ExecuteDecreasePerpPositionLimitOrder';
    executionFeeReceiver: Address;
    orderId: bigint;
    trxId: bigint;
}

export function storeExecuteDecreasePerpPositionLimitOrder(src: ExecuteDecreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(93494294, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 93494294) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleExecuteDecreasePerpPositionLimitOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddress();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreasePerpPositionLimitOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleExecuteDecreasePerpPositionLimitOrder(source: ExecuteDecreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteDecreasePerpPositionLimitOrder(): DictionaryValue<ExecuteDecreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteDecreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteDecreasePerpPositionLimitOrder(src.loadRef().beginParse());
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

export type IncreaseLPPositionOrderCreatedEvent = {
    $$type: 'IncreaseLPPositionOrderCreatedEvent';
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeIncreaseLPPositionOrderCreatedEvent(src: IncreaseLPPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1290578742, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.orderId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreaseLPPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1290578742) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionOrderCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleIncreaseLPPositionOrderCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionOrderCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleIncreaseLPPositionOrderCreatedEvent(source: IncreaseLPPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    return builder.build();
}

function dictValueParserIncreaseLPPositionOrderCreatedEvent(): DictionaryValue<IncreaseLPPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreaseLPPositionOrderCancelledEvent = {
    $$type: 'IncreaseLPPositionOrderCancelledEvent';
    orderId: bigint;
    trxId: bigint;
}

export function storeIncreaseLPPositionOrderCancelledEvent(src: IncreaseLPPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2575644314, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreaseLPPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2575644314) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionOrderCancelledEvent' as const, orderId: _orderId, trxId: _trxId };
}

function loadTupleIncreaseLPPositionOrderCancelledEvent(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionOrderCancelledEvent' as const, orderId: _orderId, trxId: _trxId };
}

function storeTupleIncreaseLPPositionOrderCancelledEvent(source: IncreaseLPPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreaseLPPositionOrderCancelledEvent(): DictionaryValue<IncreaseLPPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreaseLPPositionOrderExecutedEvent = {
    $$type: 'IncreaseLPPositionOrderExecutedEvent';
    orderId: bigint;
    trxId: bigint;
}

export function storeIncreaseLPPositionOrderExecutedEvent(src: IncreaseLPPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(920233740, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreaseLPPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 920233740) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionOrderExecutedEvent' as const, orderId: _orderId, trxId: _trxId };
}

function loadTupleIncreaseLPPositionOrderExecutedEvent(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionOrderExecutedEvent' as const, orderId: _orderId, trxId: _trxId };
}

function storeTupleIncreaseLPPositionOrderExecutedEvent(source: IncreaseLPPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreaseLPPositionOrderExecutedEvent(): DictionaryValue<IncreaseLPPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionOrderExecutedEvent(src.loadRef().beginParse());
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
    let _trxId = sc_1.loadIntBig(257);
    return { $$type: 'JettonCallback' as const, orderType: _orderType, orderId: _orderId, tokenId: _tokenId, amount: _amount, trxId: _trxId };
}

function loadTupleJettonCallback(source: TupleReader) {
    let _orderType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _tokenId = source.readBigNumberOpt();
    let _amount = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'JettonCallback' as const, orderType: _orderType, orderId: _orderId, tokenId: _tokenId, amount: _amount, trxId: _trxId };
}

function storeTupleJettonCallback(source: JettonCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.amount);
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

export type IncreaseLPPositionOrder = {
    $$type: 'IncreaseLPPositionOrder';
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    pendingTime: bigint;
}

export function storeIncreaseLPPositionOrder(src: IncreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.blockTime, 257);
        b_1.storeBit(src.isPending);
        b_1.storeInt(src.pendingTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    let _isPending = sc_1.loadBit();
    let _pendingTime = sc_1.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime };
}

function loadTupleIncreaseLPPositionOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _pendingTime = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime };
}

function storeTupleIncreaseLPPositionOrder(source: IncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeNumber(source.pendingTime);
    return builder.build();
}

function dictValueParserIncreaseLPPositionOrder(): DictionaryValue<IncreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type DecreaseLPPositionOrder = {
    $$type: 'DecreaseLPPositionOrder';
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    pendingTime: bigint;
}

export function storeDecreaseLPPositionOrder(src: DecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.blockTime, 257);
        b_1.storeBit(src.isPending);
        b_1.storeInt(src.pendingTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    let _isPending = sc_1.loadBit();
    let _pendingTime = sc_1.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime };
}

function loadTupleDecreaseLPPositionOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _pendingTime = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, pendingTime: _pendingTime };
}

function storeTupleDecreaseLPPositionOrder(source: DecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeNumber(source.pendingTime);
    return builder.build();
}

function dictValueParserDecreaseLPPositionOrder(): DictionaryValue<DecreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionOrder(src.loadRef().beginParse());
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

export type DecreasePerpPositionMarketOrders = {
    $$type: 'DecreasePerpPositionMarketOrders';
    decreasePerpPositionMarketOrders: Dictionary<bigint, DecreasePerpPositionMarketOrder>;
}

export function storeDecreasePerpPositionMarketOrders(src: DecreasePerpPositionMarketOrders) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.decreasePerpPositionMarketOrders, Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionMarketOrder());
    };
}

export function loadDecreasePerpPositionMarketOrders(slice: Slice) {
    let sc_0 = slice;
    let _decreasePerpPositionMarketOrders = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionMarketOrder(), sc_0);
    return { $$type: 'DecreasePerpPositionMarketOrders' as const, decreasePerpPositionMarketOrders: _decreasePerpPositionMarketOrders };
}

function loadTupleDecreasePerpPositionMarketOrders(source: TupleReader) {
    let _decreasePerpPositionMarketOrders = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionMarketOrder(), source.readCellOpt());
    return { $$type: 'DecreasePerpPositionMarketOrders' as const, decreasePerpPositionMarketOrders: _decreasePerpPositionMarketOrders };
}

function storeTupleDecreasePerpPositionMarketOrders(source: DecreasePerpPositionMarketOrders) {
    let builder = new TupleBuilder();
    builder.writeCell(source.decreasePerpPositionMarketOrders.size > 0 ? beginCell().storeDictDirect(source.decreasePerpPositionMarketOrders, Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionMarketOrder()).endCell() : null);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketOrders(): DictionaryValue<DecreasePerpPositionMarketOrders> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketOrders(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketOrders(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionMarketOrder = {
    $$type: 'DecreasePerpPositionMarketOrder';
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    blockTime: bigint;
}

export function storeDecreasePerpPositionMarketOrder(src: DecreasePerpPositionMarketOrder) {
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

export function loadDecreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _acceptablePrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleDecreasePerpPositionMarketOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleDecreasePerpPositionMarketOrder(source: DecreasePerpPositionMarketOrder) {
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

function dictValueParserDecreasePerpPositionMarketOrder(): DictionaryValue<DecreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketOrder(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitOrders = {
    $$type: 'IncreasePerpPositionLimitOrders';
    increasePerpPositionLimitOrders: Dictionary<bigint, IncreasePerpPositionLimitOrder>;
}

export function storeIncreasePerpPositionLimitOrders(src: IncreasePerpPositionLimitOrders) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.increasePerpPositionLimitOrders, Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionLimitOrder());
    };
}

export function loadIncreasePerpPositionLimitOrders(slice: Slice) {
    let sc_0 = slice;
    let _increasePerpPositionLimitOrders = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionLimitOrder(), sc_0);
    return { $$type: 'IncreasePerpPositionLimitOrders' as const, increasePerpPositionLimitOrders: _increasePerpPositionLimitOrders };
}

function loadTupleIncreasePerpPositionLimitOrders(source: TupleReader) {
    let _increasePerpPositionLimitOrders = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionLimitOrder(), source.readCellOpt());
    return { $$type: 'IncreasePerpPositionLimitOrders' as const, increasePerpPositionLimitOrders: _increasePerpPositionLimitOrders };
}

function storeTupleIncreasePerpPositionLimitOrders(source: IncreasePerpPositionLimitOrders) {
    let builder = new TupleBuilder();
    builder.writeCell(source.increasePerpPositionLimitOrders.size > 0 ? beginCell().storeDictDirect(source.increasePerpPositionLimitOrders, Dictionary.Keys.BigInt(257), dictValueParserIncreasePerpPositionLimitOrder()).endCell() : null);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitOrders(): DictionaryValue<IncreasePerpPositionLimitOrders> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitOrders(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitOrders(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitOrder = {
    $$type: 'IncreasePerpPositionLimitOrder';
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    blockTime: bigint;
}

export function storeIncreasePerpPositionLimitOrder(src: IncreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.blockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleIncreasePerpPositionLimitOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleIncreasePerpPositionLimitOrder(source: IncreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitOrder(): DictionaryValue<IncreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitOrder(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitOrders = {
    $$type: 'DecreasePerpPositionLimitOrders';
    decreasePerpPositionLimitOrders: Dictionary<bigint, DecreasePerpPositionLimitOrder>;
}

export function storeDecreasePerpPositionLimitOrders(src: DecreasePerpPositionLimitOrders) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.decreasePerpPositionLimitOrders, Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionLimitOrder());
    };
}

export function loadDecreasePerpPositionLimitOrders(slice: Slice) {
    let sc_0 = slice;
    let _decreasePerpPositionLimitOrders = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionLimitOrder(), sc_0);
    return { $$type: 'DecreasePerpPositionLimitOrders' as const, decreasePerpPositionLimitOrders: _decreasePerpPositionLimitOrders };
}

function loadTupleDecreasePerpPositionLimitOrders(source: TupleReader) {
    let _decreasePerpPositionLimitOrders = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionLimitOrder(), source.readCellOpt());
    return { $$type: 'DecreasePerpPositionLimitOrders' as const, decreasePerpPositionLimitOrders: _decreasePerpPositionLimitOrders };
}

function storeTupleDecreasePerpPositionLimitOrders(source: DecreasePerpPositionLimitOrders) {
    let builder = new TupleBuilder();
    builder.writeCell(source.decreasePerpPositionLimitOrders.size > 0 ? beginCell().storeDictDirect(source.decreasePerpPositionLimitOrders, Dictionary.Keys.BigInt(257), dictValueParserDecreasePerpPositionLimitOrder()).endCell() : null);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitOrders(): DictionaryValue<DecreasePerpPositionLimitOrders> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitOrders(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitOrders(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitOrder = {
    $$type: 'DecreasePerpPositionLimitOrder';
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    blockTime: bigint;
}

export function storeDecreasePerpPositionLimitOrder(src: DecreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.blockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let _blockTime = sc_1.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleDecreasePerpPositionLimitOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitOrder' as const, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleDecreasePerpPositionLimitOrder(source: DecreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitOrder(): DictionaryValue<DecreasePerpPositionLimitOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitOrder(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitOrder(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('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uUCCuuMCIIIQ4CXDO7owMTIzAvb4QW8kMDGBS2kyVhW+8vQogQEBJFn0DW+hkjBt3yBukjBtjofQ2zxsGm8K4oF/fSFus/L0IG7y0IBvKjEyERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEgDAsRHwtzKwPuChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCESACAREfAVYXAREh2zxWG26zlxEbIG7y0ICUVxv4QuJ/+COBAQFWHQdWHQdWHQcGER0GBREcBQQRHAQDERwDAhElAgERHQERJMhVkNs8yQEREwFWGgEsWC0C8IFebQGz8vT4QhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMCERcCAREXAds8ggCg9wHy9DkuAvogbpUwWfRaMJRBM/QV4gERFQERGHARGIBAERZwERZYyFVAghDonNRfUAbLHxTKABLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMs/yScEAxEXAwIRFAIREwEUQzBtbds8CxEVCwoRFAoJERMJCBESCF0vAIaCAJsXVhdWF6D4I7vy9IFBjBEXVhWg+CO8AREXAfL0ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOADIHEREHBhEQBhBfEE4QPUy6EEkQVxBFRAMCAfT4QW8kMDGBS2kyVhe+8vSBUkj4QhEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEcCgkRGwkIERoIBxEZBwYRGAYFERcFBBEcBAMRGwMCERoCAREZAUUBoDDTHwGCEMFhjrO68uCBgQEB1wCBAQHXANIA0gD6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iFRRDMGwV2zx/SgB+MNMfAYIQWLlAgrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wBVIGwTXwN/AeqOPzDTHwGC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wAAAAAAAAAAAAAAAAQHLZ8zJcPsAVhdus46SERcgbvLQgH9WFnEQI21tbds8klcX4lhdVALWggCcXVYhbrPy9FYgIG7y0IAugQEBIln0DW+hkjBt3yBukjBtjjDQgQEB1wCBAQHXANIAAZWBAQHXAJJtAeLUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG7jAiBu8tCAbyUwVSAjgQEBESNWVwF6+EIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQORAoEFZQBAPbPFUBQvhBbyQTXwMBoVYSoVYRoSDCAI6KcAFxECNtbW3bPJFb4l0AZl8JVxVXFVcWVxZXFg8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVUQNUQwEgL+yFVAUEWBAQHPABKBAQHPACFus5l/AcoAgQEBzwCUcDLKAOIByIEBAc8AEoEBAc8AyQHMyQIREAIBER8BVhABIG6VMFn0WjCUQTP0FeJWIG6znVciER8gbvLQgBEhER+SVyDi+EKBAQEnAhEjAgERJAERI8hVkNs8yRA1AhEbAlhZAbBQmsoAUAcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVgQEBzwATgQEBzwAByIEBAc8AEsoAEoEBAc8AIm6zmn8BygASgQEBzwCVMnBYygDiyFADWgL+AREXASBulTBZ9FowlEEz9BXiK3CAQHD4KBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwLERsLEIpeNQYRHQYFERsFBBEaBAMRGwMCER0CAREcAds8BBEXBFtcALQgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJAczJAcwAtsiCEA+KfqUByh8Uyj9Y+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFnABygBw+gLIydDPFskBZgMRGAMCERoCAREZARRDMG1t2zwREREVEREREBEUERAPERMPDhESDg0REQ0MERAMVTsQI10ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAXgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIDeiBhYgIBIGZnAviq4SFukjFtjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOIhbpIxbY4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdbWMCGKkd2zzbPFcQXw9sYW1lAQzbPGy7bLtkALxtIm6zjh4wgQELAiBu8tCAVEwzcUEz9ApvoZQB1wAwkltt4gGRMuJtIW6zjhwwgQELASBu8tCAK1lxQTP0Cm+hlAHXADCSW23ikTHiVhdWF1YXVhdWF1YXVhdWF1YXAAIqAgEgaGkCAUh1dgIBIGprAN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lACGbEUNs82zxXEF8PbGGBtbAKZsx62zwRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sYSBukjBtmSBu8tCAbypvCuIgbpIwbd6BtbgACJAKG7UTQ1AH4Y9IAAY6o2zxXFhEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuAw+CjXCwqDCbry4InbPG9wATqBAQEnAln0DW+hkjBt3yBukjBtjofQ2zxsGm8K4nMB4IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0z/UMNBxAcB2gQcIgQC0gQOEghAF9eEAggr68ICCCcnDgG1xbW1tI20hbSFtIfhCgQEL+EJ/JBBOIW6VW1n0WTCYyAHPAEEz9EHigQEL+EJ/JBBNIW6VW1n0WTCYyAHPAEEz9EHicCByAJT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE9AT0BNM/1DDQ9ATTP/QE0z/0BNM/MBETERYRExETERURExETERQREwDIyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIDQtQ6RxIpkVzFAHu0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXANIAgQEB1wDSAAGVgQEB1wCSbQHi1DDQ+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gF0AGj6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRBqEGkQaBBnABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWNKTHRMclNoZHprV3JKd2NzTkt5ZFFYbjl2dVp1Z3JOSHhwVnJDZ1V2ZGNGgg');
    const __system = Cell.fromBase64('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VZDbPMkBERMBVhoBQnBAAvogbpUwWfRaMJRBM/QV4gERFQERGHARGIBAERZwERZYyFVAghDonNRfUAbLHxTKABLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMs/yScEAxEXAwIRFAIREwEUQzBtbds8CxEVCwoRFAoJERMJCBESCGdBADIHEREHBhEQBhBfEE4QPUy6EEkQVxBFRAMCAvCBXm0Bs/L0+EIRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERcDAhEXAgERFwHbPIIAoPcB8vRPQwCGggCbF1YXVheg+CO78vSBQYwRF1YVoPgjvAERFwHy9BEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgL2+EFvJDAxgUtpMlYVvvL0KIEBASRZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBf30hbrPy9CBu8tCAbypfBPhCERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NckUD0AwRHAwLERsLChEaCgkRGQkIERgIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCVhoC2zxWHOMPERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0YUQAUDTElGAthXGFcZVxlXGfhCVhpus5owERkgbvLQgBEZklca4oEBAW0gbpIwbY6NIG7y0IBvKshVkNs8yeIQI1YVASBulTBZ9FowlEEz9BXicAIBERQBERPIVSCCECRUZsRQBMsfEsoAgQEBzwCBAQHPAMlwRwP8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERd/VhRxECNtbW3bPPhCDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QTBA7SpAXUAgGBQQD2zwDERUDAhEUAhETARESAQMREQMCERACUO8QPUyrEDlIZxA1Z11IAAZEMwIB/iakgQEBcQFtVhsCVh8BERzIVUBQRYEBAc8AEoEBAc8AIW6zmX8BygCBAQHPAJRwMsoA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l0eY/hQwVhERFREZERURFBEYERQRExEXERMREhEWERIREREZEREREBEYERAPERcPDhEWDg0RGQ0MERgMCxEXCwoRFgoJERkJCBEYCAcRFwcGERYGBREZBQQRGAQDERcDAhEWAgERGQERGHARGGACjIBAERhWG3ARHds8BBEZBAMRGAMCERcCAREaARRDMG1t2zwREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdVThhZwC2yIIQD4p+pQHKHxTKP1j6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WcAHKAHD6AsjJ0M8WyQDeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQA/YRFREiERURFBEhERQRExEgERMREhEfERIREREeEREREBEdERAPERwPDhEbDg0RGg0MERkMCxEYCwoRFwoJERYJCBEiCAcRIQcGESAGBREfBQQRHgQDER0DAhEcAgERGwERGts8Vhlus5RWGG6zkXDilFcYVxjjDVYVbrNqaWQB/pRWFG6zkXDiji+BAQsRFiBu8tCAERUgbvLQgBA3AhEWAgERFQFxIW6VW1n0WTCYyAHPAEEz9EHiBJRXFFcU4lYebrOdVxERHSBu8tCAERARHZJXHuJWHG6zmz8RGyBu8tCADhEbklcc4lYabrObPREZIG7y0IAMERmSVxriVhhlAv5us5s7ERcgbvLQgAoRF5JXGOJWFm6zmzkRFSBu8tCACBEVklcW4lYUbrObNxETIG7y0IAGEROSVxTiVhJus5s1EREgbvLQgAQREZJXEuJWEG6zmTMPIG7y0IBAH5JXEOIubrOXMQ0gbvLQgJE+4vhCcHCAQBAjbW1t2zwIERUIZ2YAOAcRFAcGERMGBRESBQQREQQDERADTx1Q7F6RQwAByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAaACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzABegQELERogbvLQgBEZIG7y0IAQOgIRGgIBERkBcSFulVtZ9FkwmMgBzwBBM/RB4gcAEvhCUrDHBfLghAH20x8BghCIYcxzuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0gABktIAkm0B4vpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0gABktIAkm0B4tIAbAHEAZWBAQHXAJJtAeLUAdDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNBtAMT6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxEI0QjBCLEIoQiQP+0x8BghDonNRfuvLggdIA0z9ZbBIxJoEBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuIgbo4VW4v29yZGVyIG5vdCBleGlzdI/hQwjrEgbvLQgG8qNBB4EGgQWBBIEDhwVSCBAQEKyFWQ2zzJEDgSIG6VMFn0WjCUQTP0FeIF4nJwbwACfwGwUJrKAFAHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFYEBAc8AE4EBAc8AAciBAQHPABLKABKBAQHPACJus5p/AcoAEoEBAc8AlTJwWMoA4shQA3EAtCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiUAMgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzMkBzAHu0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXANIAgQEB1wDSAAGVgQEB1wCSbQHi1DDQ+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gFzAGj6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRBqEGkQaBBnAobtRNDUAfhj0gABjqjbPFcWERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4DD4KNcLCoMJuvLgids8d3UBwHaBBwiBALSBA4SCEAX14QCCCvrwgIIJycOAbXFtbW0jbSFtIW0h+EKBAQv4Qn8kEE4hbpVbWfRZMJjIAc8AQTP0QeKBAQv4Qn8kEE0hbpVbWfRZMJjIAc8AQTP0QeJwIHYAyMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiA0LUOkcSKZFcxQB4IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0z/UMNB4AJT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE9AT0BNM/1DDQ9ATTP/QE0z/0BNM/MBETERYRExETERURExETERQRE07XsFA=');
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
    {"name":"CompensateIncreaseRBFPositionOrder","header":3360956377,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"positionSuccess","type":{"kind":"simple","type":"bool","optional":false}},{"name":"refundSuccess","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CompensateDecreaseRBFPositionOrder","header":3244396211,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"positionSuccess","type":{"kind":"simple","type":"bool","optional":false}},{"name":"refundSuccess","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CancelIncreaseLPPositionOrder","header":228695406,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreaseLPPositionOrder","header":3764880894,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":1912782205,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreaseLPPositionOrder","header":2748692867,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreaseLPPositionOrder","header":1701079937,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelIncreasePerpPositionMarketOrder","header":1488535682,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreasePerpPositionMarketOrder","header":3760571195,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreasePerpPositionMarketOrder","header":3819223803,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreasePerpPositionMarketOrder","header":3020087979,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreasePerpPositionMarketOrder","header":2471367957,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateIncreasePerpPositionLimitOrder","header":3360172408,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CancelIncreasePerpPositionLimitOrder","header":3884519450,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreasePerpPositionLimitOrder","header":1350453542,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreasePerpPositionLimitOrder","header":2350654920,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CancelDecreasePerpPositionLimitOrder","header":1507135123,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreasePerpPositionLimitOrder","header":93494294,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderCreatedEvent","header":3479394200,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderCancelledEvent","header":609511108,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderExecutedEvent","header":2435559759,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionOrderCreatedEvent","header":1290578742,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionOrderCancelledEvent","header":2575644314,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionOrderExecutedEvent","header":920233740,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
    {"name":"JettonCallback","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pendingTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"IncreaseLPPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pendingTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pendingTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketOrders","header":null,"fields":[{"name":"increasePerpPositionMarketOrders","type":{"kind":"dict","key":"int","value":"IncreasePerpPositionMarketOrder","valueFormat":"ref"}}]},
    {"name":"IncreasePerpPositionMarketOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketOrders","header":null,"fields":[{"name":"decreasePerpPositionMarketOrders","type":{"kind":"dict","key":"int","value":"DecreasePerpPositionMarketOrder","valueFormat":"ref"}}]},
    {"name":"DecreasePerpPositionMarketOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitOrders","header":null,"fields":[{"name":"increasePerpPositionLimitOrders","type":{"kind":"dict","key":"int","value":"IncreasePerpPositionLimitOrder","valueFormat":"ref"}}]},
    {"name":"IncreasePerpPositionLimitOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitOrders","header":null,"fields":[{"name":"decreasePerpPositionLimitOrders","type":{"kind":"dict","key":"int","value":"DecreasePerpPositionLimitOrder","valueFormat":"ref"}}]},
    {"name":"DecreasePerpPositionLimitOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"rbfPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"RBFPositionOrder","optional":true}},
    {"name":"rbfPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
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
    {"receiver":"internal","message":{"kind":"typed","type":"CompensateIncreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CompensateDecreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelIncreasePerpPositionMarketOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteIncreasePerpPositionMarketOrder"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | TokenNotification | TokenExcesses | CreateDecreaseRBFPositionOrder | CancelRBFPositionOrder | ExecuteRBFPositionOrder | UpdateRBFPositionSuccess | CompensateIncreaseRBFPositionOrder | CompensateDecreaseRBFPositionOrder | CancelIncreasePerpPositionMarketOrder | ExecuteIncreasePerpPositionMarketOrder | Deploy) {
        
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CompensateIncreaseRBFPositionOrder') {
            body = beginCell().store(storeCompensateIncreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CompensateDecreaseRBFPositionOrder') {
            body = beginCell().store(storeCompensateDecreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelIncreasePerpPositionMarketOrder') {
            body = beginCell().store(storeCancelIncreasePerpPositionMarketOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteIncreasePerpPositionMarketOrder') {
            body = beginCell().store(storeExecuteIncreasePerpPositionMarketOrder(message)).endCell();
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
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}