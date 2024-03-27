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
    minExecutionFee: bigint | null;
    gasConsumption: bigint | null;
    minTonsForStorage: bigint | null;
    usdtWallet: Address | null;
    pool: Address | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2706555649, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.compensator);
        if (src.enableCompensator !== null && src.enableCompensator !== undefined) { b_0.storeBit(true).storeBit(src.enableCompensator); } else { b_0.storeBit(false); }
        if (src.minTimeDelayExecutor !== null && src.minTimeDelayExecutor !== undefined) { b_0.storeBit(true).storeInt(src.minTimeDelayExecutor, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.maxTimeDelayExecutor !== null && src.maxTimeDelayExecutor !== undefined) { b_1.storeBit(true).storeInt(src.maxTimeDelayExecutor, 257); } else { b_1.storeBit(false); }
        if (src.minTimeDelayTrader !== null && src.minTimeDelayTrader !== undefined) { b_1.storeBit(true).storeInt(src.minTimeDelayTrader, 257); } else { b_1.storeBit(false); }
        if (src.minExecutionFee !== null && src.minExecutionFee !== undefined) { b_1.storeBit(true).storeInt(src.minExecutionFee, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.gasConsumption !== null && src.gasConsumption !== undefined) { b_2.storeBit(true).storeInt(src.gasConsumption, 257); } else { b_2.storeBit(false); }
        if (src.minTonsForStorage !== null && src.minTonsForStorage !== undefined) { b_2.storeBit(true).storeInt(src.minTonsForStorage, 257); } else { b_2.storeBit(false); }
        b_2.storeAddress(src.usdtWallet);
        let b_3 = new Builder();
        b_3.storeAddress(src.pool);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2706555649) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _compensator = sc_0.loadMaybeAddress();
    let _enableCompensator = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minTimeDelayExecutor = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _maxTimeDelayExecutor = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _minTimeDelayTrader = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _minExecutionFee = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _gasConsumption = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _minTonsForStorage = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _usdtWallet = sc_2.loadMaybeAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _pool = sc_3.loadMaybeAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, compensator: _compensator, enableCompensator: _enableCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executor = source.readAddressOpt();
    let _enableExecutor = source.readBooleanOpt();
    let _compensator = source.readAddressOpt();
    let _enableCompensator = source.readBooleanOpt();
    let _minTimeDelayExecutor = source.readBigNumberOpt();
    let _maxTimeDelayExecutor = source.readBigNumberOpt();
    let _minTimeDelayTrader = source.readBigNumberOpt();
    let _minExecutionFee = source.readBigNumberOpt();
    let _gasConsumption = source.readBigNumberOpt();
    let _minTonsForStorage = source.readBigNumberOpt();
    let _usdtWallet = source.readAddressOpt();
    let _pool = source.readAddressOpt();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, compensator: _compensator, enableCompensator: _enableCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeExecuteRBFPositionOrder(src: ExecuteRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(636249025, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeAddress(src.executionFeeReceiver);
        let b_1 = new Builder();
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadExecuteRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 636249025) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'ExecuteRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleExecuteRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'ExecuteRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleExecuteRBFPositionOrder(source: ExecuteRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
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
        b_0.storeInt(src.pricesLength, 257);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
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
    let _pricesLength = sc_0.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'UpdateRBFPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdateRBFPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'UpdateRBFPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleUpdateRBFPosition(source: UpdateRBFPosition) {
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeCompensateRBFPositionOrder(src: CompensateRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(167321554, 32);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        b_0.storeBit(src.needRefund);
        b_0.storeBit(src.isExecute);
        b_0.storeAddress(src.executionFeeReceiver);
        let b_1 = new Builder();
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 167321554) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let _needRefund = sc_0.loadBit();
    let _isExecute = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'CompensateRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleCompensateRBFPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _needRefund = source.readBoolean();
    let _isExecute = source.readBoolean();
    let _executionFeeReceiver = source.readAddressOpt();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'CompensateRBFPositionOrder' as const, orderId: _orderId, trxId: _trxId, needRefund: _needRefund, isExecute: _isExecute, executionFeeReceiver: _executionFeeReceiver, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleCompensateRBFPositionOrder(source: CompensateRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeBoolean(source.needRefund);
    builder.writeBoolean(source.isExecute);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeExecuteLPPositionOrder(src: ExecuteLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3500233221, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadExecuteLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3500233221) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'ExecuteLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleExecuteLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'ExecuteLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleExecuteLPPositionOrder(source: ExecuteLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
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

export type LiquidateLPPositionOrder = {
    $$type: 'LiquidateLPPositionOrder';
    executionFeeReceiver: Address | null;
    account: Address;
    trxId: bigint;
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeLiquidateLPPositionOrder(src: LiquidateLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1675438247, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.trxId, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidateLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1675438247) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _account = sc_0.loadAddress();
    let _trxId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'LiquidateLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, account: _account, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleLiquidateLPPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _account = source.readAddress();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'LiquidateLPPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, account: _account, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleLiquidateLPPositionOrder(source: LiquidateLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.account);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
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
        let b_1 = new Builder();
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
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
    let sc_1 = sc_0.loadRef().beginParse();
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'UpdateLPPosition' as const, orderId: _orderId, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdateLPPosition(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'UpdateLPPosition' as const, orderId: _orderId, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleUpdateLPPosition(source: UpdateLPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
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

export type CreateDecreasePerpPositionOrder = {
    $$type: 'CreateDecreasePerpPositionOrder';
    executionFee: bigint;
    opType: bigint;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
}

export function storeCreateDecreasePerpPositionOrder(src: CreateDecreasePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(229084921, 32);
        b_0.storeInt(src.executionFee, 257);
        b_0.storeInt(src.opType, 257);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeBit(src.isLong);
        let b_1 = new Builder();
        b_1.storeInt(src.marginDelta, 257);
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.triggerPrice, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateDecreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 229084921) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadIntBig(257);
    let _opType = sc_0.loadIntBig(257);
    let _tokenId = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginDelta = sc_1.loadIntBig(257);
    let _sizeDelta = sc_1.loadIntBig(257);
    let _triggerPrice = sc_1.loadIntBig(257);
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, opType: _opType, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice };
}

function loadTupleCreateDecreasePerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, opType: _opType, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice };
}

function storeTupleCreateDecreasePerpPositionOrder(source: CreateDecreasePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeExecutePerpPositionOrder(src: ExecutePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3809189531, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadExecutePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3809189531) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
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

export type LiquidatePerpPositionOrder = {
    $$type: 'LiquidatePerpPositionOrder';
    executionFeeReceiver: Address | null;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    trxId: bigint;
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeLiquidatePerpPositionOrder(src: LiquidatePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2595294022, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        let b_1 = new Builder();
        b_1.storeInt(src.trxId, 257);
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidatePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2595294022) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _trxId = sc_1.loadIntBig(257);
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'LiquidatePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleLiquidatePerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'LiquidatePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleLiquidatePerpPositionOrder(source: LiquidatePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
    return builder.build();
}

function dictValueParserLiquidatePerpPositionOrder(): DictionaryValue<LiquidatePerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLiquidatePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatePerpPositionOrder(src.loadRef().beginParse());
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
        b_0.storeInt(src.tokenId, 257);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeUint(src.trxId, 64);
        b_1.storeInt(src.pricesLength, 257);
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4283950423) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _sizeDelta = sc_1.loadIntBig(257);
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _trxId = sc_1.loadUintBig(64);
    let _pricesLength = sc_1.loadIntBig(257);
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
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdatePerpPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4009870004) { throw Error('Invalid prefix'); }
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
}

export function storePerpPositionOrderCreatedEvent(src: PerpPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3995768881, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.tpSize, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tpPrice, 257);
        b_2.storeInt(src.slSize, 257);
        b_2.storeInt(src.slPrice, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.executionFee, 257);
        b_3.storeInt(src.orderId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3995768881) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _sizeDelta = sc_1.loadIntBig(257);
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _tpSize = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tpPrice = sc_2.loadIntBig(257);
    let _slSize = sc_2.loadIntBig(257);
    let _slPrice = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _executionFee = sc_3.loadIntBig(257);
    let _orderId = sc_3.loadIntBig(257);
    return { $$type: 'PerpPositionOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee, orderId: _orderId };
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
    return { $$type: 'PerpPositionOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee, orderId: _orderId };
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
        b_0.storeUint(2545166058, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadPerpPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2545166058) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
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
        b_0.storeUint(4274993791, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadPerpPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4274993791) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
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
        b_1.storeInt(src.minExecutionFee, 257);
        b_1.storeInt(src.gasConsumption, 257);
        b_1.storeInt(src.minTonsForStorage, 257);
        let b_2 = new Builder();
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
    let _minExecutionFee = sc_1.loadIntBig(257);
    let _gasConsumption = sc_1.loadIntBig(257);
    let _minTonsForStorage = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _usdtWallet = sc_2.loadAddress();
    let _pool = sc_2.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _isCompensator = source.readBooleanOpt();
    let _minTimeDelayExecutor = source.readBigNumber();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, minTimeDelayExecutor: _minTimeDelayExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeBoolean(source.isCompensator);
    builder.writeNumber(source.minTimeDelayExecutor);
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

export type JettonCallback = {
    $$type: 'JettonCallback';
    orderType: bigint;
    orderId: bigint;
    amount: bigint;
    receiver: Address;
    trxId: bigint;
}

export function storeJettonCallback(src: JettonCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.orderType, 257);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.amount, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.receiver);
        b_1.storeInt(src.trxId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJettonCallback(slice: Slice) {
    let sc_0 = slice;
    let _orderType = sc_0.loadIntBig(257);
    let _orderId = sc_0.loadIntBig(257);
    let _amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _receiver = sc_1.loadAddress();
    let _trxId = sc_1.loadIntBig(257);
    return { $$type: 'JettonCallback' as const, orderType: _orderType, orderId: _orderId, amount: _amount, receiver: _receiver, trxId: _trxId };
}

function loadTupleJettonCallback(source: TupleReader) {
    let _orderType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _trxId = source.readBigNumber();
    return { $$type: 'JettonCallback' as const, orderType: _orderType, orderId: _orderId, amount: _amount, receiver: _receiver, trxId: _trxId };
}

function storeTupleJettonCallback(source: JettonCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
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
        if (src.callbackId !== null && src.callbackId !== undefined) { b_1.storeBit(true).storeInt(src.callbackId, 257); } else { b_1.storeBit(false); }
        b_1.storeAddress(src.executionFeeReceiver);
        let b_2 = new Builder();
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
    let _callbackId = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _lastOperator = sc_2.loadMaybeAddress();
    return { $$type: 'RBFPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleRBFPositionOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _callbackId = source.readBigNumberOpt();
    let _executionFeeReceiver = source.readAddressOpt();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'RBFPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTupleRBFPositionOrder(source: RBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
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
        if (src.callbackId !== null && src.callbackId !== undefined) { b_1.storeBit(true).storeInt(src.callbackId, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
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
    let _callbackId = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _executionFeeReceiver = sc_2.loadMaybeAddress();
    let _lastOperator = sc_2.loadMaybeAddress();
    return { $$type: 'LPPositionOrder' as const, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleLPPositionOrder(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _callbackId = source.readBigNumberOpt();
    let _executionFeeReceiver = source.readAddressOpt();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'LPPositionOrder' as const, opType: _opType, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
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
    callbackId: bigint | null;
    executionFeeReceiver: Address | null;
    lastOperator: Address | null;
}

export function storePerpPositionOrder(src: PerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.blockTime, 257);
        b_2.storeBit(src.isPending);
        if (src.callbackId !== null && src.callbackId !== undefined) { b_2.storeBit(true).storeInt(src.callbackId, 257); } else { b_2.storeBit(false); }
        b_2.storeAddress(src.executionFeeReceiver);
        let b_3 = new Builder();
        b_3.storeAddress(src.lastOperator);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _sizeDelta = sc_1.loadIntBig(257);
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _blockTime = sc_2.loadIntBig(257);
    let _isPending = sc_2.loadBit();
    let _callbackId = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _executionFeeReceiver = sc_2.loadMaybeAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _lastOperator = sc_3.loadMaybeAddress();
    return { $$type: 'PerpPositionOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
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
    let _callbackId = source.readBigNumberOpt();
    let _executionFeeReceiver = source.readAddressOpt();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'PerpPositionOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, callbackId: _callbackId, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
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
    builder.writeNumber(source.callbackId);
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
}

export function storePerpPositionOrderEx(src: PerpPositionOrderEx) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.tpSize, 257);
        b_0.storeInt(src.tpPrice, 257);
        b_0.storeInt(src.slSize, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.slPrice, 257);
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
    return { $$type: 'PerpPositionOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice };
}

function loadTuplePerpPositionOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    return { $$type: 'PerpPositionOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice };
}

function storeTuplePerpPositionOrderEx(source: PerpPositionOrderEx) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
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
        b_0.storeInt(src.tokenId, 257);
        b_0.storeInt(src.price, 257);
    };
}

export function loadUpdatePrice(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadIntBig(257);
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
    const __code = Cell.fromBase64('te6ccgECywEAP6AAART/APSkE/S88sgLAQIBYgIDA9LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILFEBECASAEBQIBILW2AgEgBgcCASAICQIBSA4PAgEgCgsAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkE4IGc6tPOK/OkoWA6wtxMj2UAIZsRQ2zzbPFcQXw9sYYMUMApmzHrbPBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xhIG6SMG2ZIG7y0IBvKW8J4iBukjBt3oMUNAAIlATqBAQEoAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4lgAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtVHAzTVZyNXUyaUJOTWl0blpVRUF2bXNIa1RtcUZDRWFtZ0pXV29yb2Fxa0qCAEVgHjAnAh10nCH5UwINcLH94gghChUsMBuo8IMNs8bBzbPH/gIIIQc2LQnLoSExQVATzI+EMBzH8BygARFhEVERQRExESEREREFXg2zzJ7VQpBM6AINchcCHXScIflTAg1wsf3iCCEOic1F+64wIgghD+o2txuo86MNMfAYIQ/qNrcbry4IHTP9MHWWwSMCWBAQEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwriIG6RW+MOf+CCEP9X5Ve6FrwXGAH20x8BghChUsMBuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0gABktIAkm0B4vpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0gABktIAkm0B4tIAGgP2ERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPFYXbrOUVhZus5Fw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8vQrgQEBKFn0DW+hkjBt3yBukjBtjofQ2zxsGm8K4iBukl8I4w5/vG8C/o71MNMfAYIQY90op7ry4IH6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXAPQEMBAlECQQI2wV2zx/4CCCEA2njvl1dgP4VBupgUtpCts8pwNWIaoAoFYgoBEVESURFREUESQRFBETESMRExESESIREhERESEREREQESAREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFESUFBBEkBAMRIwMCESICAREhAREg2zwBESEBoJ6VVAP4VBupgUtpCts8pwZWIacDoFYgoBEVESURFREUESQRFBETESMRExESESIREhERESEREREQESAREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFESUFBBEkBAMRIwMCESICAREhAREg2zwBESEBoJ6VVQT42zxWGW6zlxEZIG7y0ICUVxn4QuJ/gQEBVh8GViQGViQGBREkBQQRIwQDESMDAhEbAgERJAERIchVgNs8yRAjAREbAVYYASBulTBZ9FowlEEz9BXiAxEYAwIRFgIBERUBERxwERyAQBEVfxEVEDQQI8hVYNs8ySYEAxEZA5FfVlcAFgERGAG+AREWAfL0ACKCCehIAKABERgBvgERFgHy9AB6ghDonNRfUAjLHxbKABTLP1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMs/gQEBzwD0AAFqAhERAhEQARRDMG1t2zwJERUJCBEUCAcREwcGERIGBRERBQQREAQQP07cEIoJEFgQN0UWQ0SzAeTSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcA0gDSAAGVgQEB1wCSbQHi+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHUMNBaA3ogbvLQgG8pMieOk1QbqYFLaQrbPKoAVh+gGL4W8vSOm1QbqYFLaQrbPKoBVh+qAKCCCehIAKAYvhby9OIjnp5bAGj6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRBZEFgQVxBWAgTjD1xdA/45XwWBAQFtIG6SMG2OjSBu8tCAbynIVYDbPMniJhA+ASBulTBZ9FowlEEz9BXif0BTyFUgghCRK7FPUATLHxLKAIEBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAKW6zjpAJIG7y0IB/WHEQI21tbds8kjkw4iduX7NeAvxWEqSBAQFxVG3TUn7IVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkCERUCGlYUASBulTBZ9FowlEEz9BXiVhIQRoEBASQHEEYFERYFBANQmshVgNs8yRA8QVBfYAEes46JByBu8tCAcNs8kTfirAH0UInKAFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFIEBAc8AEoEBAc8AAciBAQHPABLKACJus5p/AcoAEoEBAc8AlTJwWMoA4lggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4shhAS4gbpUwWfRaMJRBM/QV4vgoEDwaGxPbPK8AYlADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJWMzJAcwD3hEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OESAODREfDQwRHgwLER0LChEcCgkRGwkIERoIBxEZBwYRGAYFESAFBBEfBAMRHgMCER0CVhkCERnbPFYcwAHjD4JjZAH6J6SBAQFyAVYcAVYaAVYgAREeyFVAUEWBAQHPABKBAQHPAIEBAc8AyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwDJAczJECoBERoBUpAgbpUwWfRaMJRBM/QV4lYabrOXERogbvLQgJRXGvhC4vhCfyllAthXFlcWVxlXGvhCVhdus5owERYgbvLQgBEWklcX4oEBAW0gbpIwbY6NIG7y0IBvKshVkNs8yeJWFwEgbpUwWfRaMJRBM/QV4gIRGAIBERUBERTIVSCCEBBp6tBQBMsfEssHgQEBzwCBAQHPAMl4ZwL+BhEfBoEBAVYfB1YbBwYRIwYFESQFBBEdBAMRHQMCER0CAREjAREkyFWQ2zzJEwIRFAIBERYBIG6VMFn0WjCUQTP0FeL4KBEQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRCrGBBXEDRBMHhmAQTbPK8CusiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAEREwF/AREYcRAjbW1t2zz4Qg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEugEEgQJxBGRTBEQHDbPLOsBNL4QW8kLYEBASlZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBf30hbrPy9CBu8tCAbyoxKMAB4w8REhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMVTsQIwIRFwIBER8BViEBESG8aWprA/hUHLqBS2kL2zynA1YiqgCgViGgERURJhEVERQRJREUERMRJBETERIRIxESERERIhERERARIREQDxEgDw4RHw4NER4NDBEdDAsRHAsKERsKCREaCQgRGQgHERgHBhEXBgURFgUEESYEAxElAwIRJAIBESMBESLbPAERIwGgnpVsA/hUHLqBS2kL2zynBlYipwOgViGgERURJhEVERQRJREUERMRJBETERIRIxESERERIhERERARIREQDxEgDw4RHw4NER4NDBEdDAsRHAsKERsKCREaCQgRGQgHERgHBhEXBgURFgUEESYEAxElAwIRJAIBESMBESLbPAERIwGgnpVtBPrbPFYdbrOXER0gbvLQgJRXHfhC4n+BAQFWIAZWIgZWGgZWJwYFEScFBBEmBAMRJwMCER4CAREdyFWQ2zzJEgERHQFWGQEgbpUwWfRaMJRBM/QV4gQRFwQDERkDAhEWAgERGgEREXARHoBAERd/ERcQRRA0ECPIVXDbPMklBJF4e24AFgERGgG+AREYAfL0ACKCCehIAKABERoBvgERGAHy9AFuAxEaAwIREgIREQEUQzBtbds8CBEVCAcRFAcGERMGBRESBQQREQQDERADT+0Qi0kaEEgXEFZEA7MDgiBu8tCAbyoyKMABjpNUHLqBS2kL2zyqAFYgoBm+F/L0jptUHLqBS2kL2zyqAVYgqgCgggnoSACgGb4X8vTiJMABnp5wAgTjD3FyA/41XwMyNYEBAW0gbpIwbY6NIG7y0IBvKshVkNs8yeInED0BIG6VMFn0WjCUQTP0FeJKU8hVIIIQ1y822FAEyx8SyweBAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACJus46QAiBu8tCAf1hxECNtbW3bPJJsIeIleLNzAf5TNMADlzAnIG7y0IDeVhSkgQEBclRv81JQERDIVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkCERcCHFYWASBulTBZ9FowlEEz9BXiVhQQaBBXEEYQNUQJgQEBdAEgbrOOiQUgbvLQgHDbPJE14qwCQgvIVZDbPMkQOhUgbpUwWfRaMJRBM/QV4vgoEDwYGxPbPHivA/b4QW8kVBMjgUtpBNs8pwZWGacDoFYYoBEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFER0FBBEcBAMRGwMCERoCAREZAREY2zyelXcE1LqPCDDbPGwX2zx/4CCCEPmVFPO6jssw0x8BghD5lRTzuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIBgQEB1wCBAQHXAFUgbBPbPH/gIIIQ4wuem7p8fX5/AvgBERkBoIIJ6EgAoAERGgG+AREYAfL0cIEBC/hCKllxQTP0Cm+hlAHXADCSW23iIG6zljEgbvLQgJEw4oIAoPcB8vT4QlYVbrOaMBEUIG7y0IARFJJXFeIgpIEBAXNwUwD4I39t+EIQeFYdCBEfAchVkNs8yRAjAREWAVIweHkBsFCaywdQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhWBAQHPABOBAQHPAAHIgQEBzwASgQEBzwASygAibrOafwHKABKBAQHPAJUycFjKAOLIUAN6AtAgbpUwWfRaMJRBM/QV4nCAQH9zVDUzECYFESAFBBEZBFoBER8BER4QZxBFEDQQI8hVcNs8ySoEAxEaAwIREwIRGQEUQzBtbds8DREVDQwRFAwLERMLChESCgkREQkIERAIVXdeJBA0EnuzALQgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJAczJAcwAkoIQ/qNrcVAJyx8Xyz8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwDLPwHIgQEBzwAS9ADJAcwActMfAYIQDaeO+bry4IGBAQHXAIEBAdcAgQEB1wDSANQB0IEBAdcAgQEB1wCBAQHXADAQNxA2EDUQNALs+EFvJIFLaVMroVUx2zyqAFYboFYaoL7y9IFf8idWG77y9PhCcFRwABEgESERIBEfESERHxEeESERHhEdESERHREcESERHBEbESERGxEaESERGhEZESERGREYESERGBEXESERFxEWESERFhEVESERFREUESERFJ6ABOz4QW8kKYEBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuKBf30hbrPy9CBu8tCAby5fAyrAAY6eVB7cgUtpDds8qgFWIqoAoFYhoIIJ6EgAoBu+GfL0jpZUHtyBS2kN2zyqAFYioFYhoBu+GfL04vhCERcRJBEXm56egQTwjtow0x8BghDjC56buvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIBgQEB1wCBAQHXANQB0IEBAdcA9AQwECUQJBAjbBXbPH/gIIIQ7wHCtLrjAiCCEJqxC0a64wKCEJRqmLa6iImKiwLeERMRIRETERIRIRESERERIRERERARIREQDxEhDw4RIQ4NESENDBEhDAsRIQsQSRBIEEcQRhBFViHbPDD4QhEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8qKwD3hEWESMRFhEVESIRFREUESERFBETESARExESER8REhERER4REREQER0REA8RHA8OERsODREaDQwRGQwLERgLChEkCgkRIwkIESIIBxEhBwYRIAYFER8FBBEeBAMRHQMCERwCVhgCESXbPFYfwAHjD4KDhAC+gV5tAbPy9HCBAQv4Qi9ZcUEz9ApvoZQB1wAwkltt4iBus5YxIG7y0ICRMOIgnYIAmxcjVhqg+CO78vTeggCg9/hCE8cFkX+RIOIS8vSznYIAmxcBVhWg+CO78vSR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FREpERURFBEoERQRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEpC6UB/IAO+EJwVHAAUwARIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEnERsRGhEmERoRGRElERkRGBEkERgRFxEjERcRFhEiERYRFREnERURFBEmERQRExElERMREhEkERIREREjEREREBEiERAPEScPDhEmDqcD+iBukjBtjo0gbvLQgG8uyFXQ2zzJ4icQOwEgbpUwWfRaMJRBM/QV4kRTyFUgghD+zzp/UATLHxLLB4EBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIm6zjpECIG7y0IB/WAZxECNtbW3bPJIyNOIjbrORM+MNrrOrAv4KESgKEHkQaFYmCFYiCAYRKwYFESoFBBErBAMRKgMCESsCAREqAREr2zwwERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUyqqKYAAgsBwg0RJQ0MESQMEHsQagkRIgkQeBBXBhEiBts8MBEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVWoAfQspCzACpF/kyzAC+KOPSmzgQEBVHdlJ8hVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERECVhABIG6VMFn0WjCUQTP0FeKOESzADJEpmSzADZEpkimz4uIP4oEBAfgjcG1tbVYTBVYSBVYUBVYTBVYTBVYTBakCwFYTBVYcBVYQBVUDyFXQ2zzJAhESAlYQASBulTBZ9FowlEEz9BXiEM0QrS4QrhCeEI4QNwYQXgQREAQCERAeVRXIVdDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBVIK6qAPSCEO4qmDFQD8sfHcsHG4EBAc8AUAkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYXygAVgQEBzwADyIEBAc8AEoEBAc8AygASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AA8iBAQHPABSBAQHPAMlYzMkBzMkBzAESAyBu8tCAcNs8rAFC+EFvJBNfAwGhVhOhVhKhIMIAjopwAXIQI21tbds8kVviswJgEHkQaBBXEEYQNUQNgQEBD8hV0Ns8yRA4FSBulTBZ9FowlEEz9BXi+CgQPBYbE9s8rq8B1FDeywcbgQEBzwBQCSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhfKABWBAQHPAAPIgQEBzwASgQEBzwDKABKBAQHPAALIgQEBzwATygAjbrOafwHKABOBAQHPAJYzcFADygDiUAOwAvRWExEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYcBEYgEARHHARHNs8BBEYBLGyAL4gbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4shQBCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyVADzMlYzMkBzAC2yIIQD4p+pQHKHxTKP1j6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WcAHKAHD6AsjJ0M8WyQFiAxEXAwIRGgIBERkBFEMwbW3bPBERERUREREQERQREA8REw8OERIODRERDQwREAxVO7MByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAtACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBILe4AgFivr8CAWa5ugIZtQdbZ5tniuIL4e2MMMXGApipm9s8ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbGEgbpIwbZkgbvLQgG8qbwriIG6SMG3exbsCmKry2zwRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sYSBukjBtmSBu8tCAbypvCuIgbpIwbd7FuwE6gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuK8Ae7TB/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAgQEB1wDSANIAAZWBAQHXAJJtAeLUMND6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAb0AaPpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxEGoQaRBoEGcCASDAwQIZrpBtnm2eK4gvh7YwwMXGAviq4SFukjFtjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOIhbpIxbY4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdxcICGKkd2zzbPFcQXw9sYcXEAQzbPGyqbMrDALhtIm6zjh4wgQELAiBu8tCAVE0zcUEz9ApvoZQB1wAwkltt4gGRMuJtIW6zjhwwgQELASBu8tCALFlxQTP0Cm+hlAHXADCSW23ikTHiVhdWF1YXVhdWF1YXVhdWFwACKwKU7UTQ1AH4Y9IAAY6o2zxXFhEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgiYEBAdcAAQHR2zzHyAACIwHQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAIEBAdcA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0z/JAb4wdoEHCIEAtIIQC+vCAIIK+vCAggnJw4BtcW1tbSNtIW0hbW0i+EKBAQv4Qn8kEE8hbpVbWfRZMJjIAc8AQTP0QeKBAQv4Qn8kEE4hbpVbWfRZMJjIAc8AQTP0QeJwIMoAnvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9AT0BNQw0PQE0z/0BNM/9ATTP9Qw0PQE9ATTPzARExEWERMRExEVERMRExEUERMAzMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiA4MUPodSbdGhEUFAw==');
    const __system = Cell.fromBase64('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ER4RHREnER0RHBEmERwRGxElERsRGhEkERoRGREjERkRGBEiERgRFxEhERcRFhEgERYRFREpERURFBEoERQRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEpCz8C/goRKAoQeRBoViYIViIIBhErBgURKgUEESsEAxEqAwIRKwIBESoBESvbPDARFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9TKqbQAACCwTS+EFvJCuBAQEpWfQNb6GSMG3fIG6SMG2Oh9DbPGwebw7igX99IW6z8vQgbvLQgG8uMSzAAeMPERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU7AxEeAwIRHwIBEScBIBEfvEdFQgP62zxWJW6zlxElIG7y0ICUVyX4QuJ/gQEBVh4GVh4GVh4GVh4GVh4GVh4GVh4GVicGBREwBQQRJwQCESoCAREnAREpyFXQ2zzJAhEcAgERHQFWIQEgbpUwWfRaMJRBM/QV4ggRHwgHERcHBhEeBgURFQUEERYEAxEUAwIREwJ7ukMCqgEREgEREXARGoBAER9/ER8QeRBnEFYQRRA0ECPIVbDbPMlUQRQDERIDAhEWAhEVARRDMG1t2zwEERUEAxEUAwIREwIBERIBEREQ302+HBCaRRVQRANEsAC6ghD/V+VXUA3LHxvLPxnLBxeBAQHPAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8oAgQEBzwAByIEBAc8AEoEBAc8AEsoAEss/EoEBAc8AEvQAyQHMA/4BERABUf6BS2kP2zynBlYmpwOgViWgERURKhEVERQRKREUERMRKBETERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBESrbPAERKwGgqIBGACKCCehIAKABESIBvgERIAHy9AP+AREQAVH+gUtpD9s8pwNWJqoAoFYloBEVESoRFREUESkRFBETESgRExESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEf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MjWBAQFtIG6SMG2OjSBu8tCAbyrIVZDbPMniJxA9ASBulTBZ9FowlEEz9BXiSlPIVSCCENcvNthQBMsfEssHgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAibrOOkAIgbvLQgH9YcRAjbW1t2zySbCHiJb+wXAEgbrOOiQUgbvLQgHDbPJE14qUBtDDTHwGCENChUgW68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gGBAQHXAIEBAdcA1AHQgQEB1wD0BDAQJRAkECNsFds8f14E0vhBbyQtgQEBKVn0DW+hkjBt3yBukjBtjofQ2zxsGm8K4oF/fSFus/L0IG7y0IBvKjEowAHjDxESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVOxAjAhEXAgERHwFWIQERIcFkYl8E+ts8Vh1us5cRHSBu8tCAlFcd+ELif4EBAVYgBlYiBlYaBlYnBgURJwUEESYEAxEnAwIRHgIBER3IVZDbPMkSAREdAVYZASBulTBZ9FowlEEz9BXiBBEXBAMRGQMCERYCAREaARERcBEegEARF38RFxBFEDQQI8hVcNs8ySUEe79hYAFuAxEaAwIREgIREQEUQzBtbds8CBEVCAcRFAcGERMGBRESBQQREQQDERADT+0Qi0kaEEgXEFZEA7AAkoIQ/qNrcVAJyx8Xyz8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwDLPwHIgQEBzwAS9ADJAcwD+FQcuoFLaQvbPKcGViKnA6BWIaARFREmERURFBElERQRExEkERMREhEjERIREREiEREREBEhERAPESAPDhEfDg0RHg0MER0MCxEcCwoRGwoJERoJCBEZCAcRGAcGERcGBREWBQQRJgQDESUDAhEkAgERIwERIts8AREjAaCogGMAIoIJ6EgAoAERGgG+AREYAfL0A/hUHLqBS2kL2zynA1YiqgCgViGgERURJhEVERQRJREUERMRJBETERIRIxESERERIhERERARIREQDxEgDw4RHw4NER4NDBEdDAsRHAsKERsKCREaCQgRGQgHERgHBhEXBgURFgUEESYEAxElAwIRJAIBESMBESLbPAERIwGgqIBlABYBERoBvgER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FqD4I7zy9AP4VBupgUtpCts8pwZWIacDoFYgoBEVESURFREUESQRFBETESMRExESESIREhERESEREREQESAREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFESUFBBEkBAMRIwMCESICAREhAREg2zwBESEBoKiAfQAiggnoSACgAREYAb4BERYB8vQD+FQbqYFLaQrbPKcDViGqAKBWIKARFRElERURFBEkERQRExEjERMREhEiERIREREhEREREBEgERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBRElBQQRJAQDESMDAhEiAgERIQERINs8AREhAaCogH8AFgERGAG+AREWAfL0ARz4QW8k2zxWEqoAoFYRoKgE9PhBbyQtgQEBKFn0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oF/fSFus/L0IG7y0IBvKV8DJY6eVBmHgUtpCNs8qgFWHaoAoFYcoIIJ6EgAoBa+FPL0jpZUGYeBS2kI2zyqAFYdoFYcoBa+FPL04vhCERcRHxEXERYRHhEWxqioggPOERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgJWHgIRHts8VhjjD4eFgwLYVxhXGFcZVxn4QlYabrOaMBEZIG7y0IARGZJXGuKBAQFtIG6SMG2OjSBu8tCAbynIVYDbPMniECRWFQEgbpUwWfRaMJRBM/QV4nACAREUARETyFUgghAkVGbEUATLHxLKAIEBAc8AgQEBzwDJxIQCusiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAERFwF/AREVcRAjbW1t2zz4Qg4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QTBA7SpAQaBBnEDUQNHDbPLClAfonpIEBAXEBVhoBVh0BViABERzIVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkQKgERGAFSkCBulTBZ9FowlEEz9BXiVh1us5cRHSBu8tCAlFcd+ELi+EJ/KYYC+gURGwWBAQFWHwZW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gNs8ySsQPQEgbpUwWfRaMJRBM/QV4n9UIhNUJFymxKQBwshVQIIQz2NXmFAGyx8UygBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEHgB2zylAUL4QW8kE18DAaFWE6FWEqEgwgCOinABchAjbW1t2zyRW+KwAvRWExEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYcBEYgEARHHARHNs8BBEYBKunAWIDERcDAhEaAgERGQEUQzBtbds8ERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU7sABkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAC/jD4QhEVERkRFREUERgRFBETERcRExESERYREhERERkREREQERgREA8RFw8OERYODREZDQwRGAwLERcLChEWCgkRGQkIERgIBxEXBwYRFgYFERkFBBEYBAMRFwMCERYCAREZAREYcBEYgEARGFYbcBEd2zwEERkEAxEYAwIRFwKrqgFeAREaARRDMG1t2zwREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdVTiwALbIghAPin6lAcofFMo/WPoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZwAcoAcPoCyMnQzxbJA/YRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRFgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGNs8Vhdus5RWFm6zkXDilFcWVxbjDVYfbrOzsq0B/pRWHm6zkXDiji+BAQsRICBu8tCAER8gbvLQgBA4AhEgAgERHwFxIW6VW1n0WTCYyAHPAEEz9EHiBZRXHlce4lYbbrOdVxERGiBu8tCAERARGpJXG+JWGW6zmz8RGCBu8tCA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');
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
    16780: { message: `order expired` },
    19305: { message: `gas not enough` },
    24173: { message: `order is pending` },
    24562: { message: `execution fee not enough` },
    32637: { message: `order not exist` },
    39703: { message: `too early` },
    41207: { message: `invalid sender` },
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
    {"name":"UpdateConfig","header":2706555649,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableCompensator","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":true}},{"name":"pool","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CreateDecreaseRBFPositionOrder","header":2702271213,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelRBFPositionOrder","header":3161392643,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteRBFPositionOrder","header":636249025,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateRBFPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateRBFPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateRBFPositionOrder","header":167321554,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":1912782205,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelLPPositionOrder","header":1477803963,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteLPPositionOrder","header":3500233221,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"LiquidateLPPositionOrder","header":1675438247,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateLPPosition","header":4272122737,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateLPPositionSuccess","header":1233766337,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateLPPositionOrder","header":3086175268,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CreateDecreasePerpPositionOrder","header":229084921,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"opType","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelPerpPositionOrder","header":4187297011,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecutePerpPositionOrder","header":3809189531,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"LiquidatePerpPositionOrder","header":2595294022,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensatePerpPositionOrder","header":1214351731,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RBFPositionOrderCreatedEvent","header":3479394200,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderCancelledEvent","header":609511108,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderExecutedEvent","header":2435559759,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderCreatedEvent","header":3912257011,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderCancelledEvent","header":275376848,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderExecutedEvent","header":3610195672,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionOrderCreatedEvent","header":3995768881,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionOrderCancelledEvent","header":2545166058,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionOrderExecutedEvent","header":4274993791,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonCallback","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LPPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"rbfPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"RBFPositionOrder","optional":true}},
    {"name":"rbfPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LPPositionOrder","optional":true}},
    {"name":"lpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"perpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LPPositionOrder","optional":true}},
    {"name":"perpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
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
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPositionSuccess"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreasePerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelPerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecutePerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPositionSuccess"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatePerpPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | TokenNotification | TokenExcesses | CreateDecreaseRBFPositionOrder | CancelRBFPositionOrder | ExecuteRBFPositionOrder | UpdateRBFPositionSuccess | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | LiquidateLPPositionOrder | CreateDecreasePerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidatePerpPositionOrder | Deploy) {
        
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreasePerpPositionOrder') {
            body = beginCell().store(storeCreateDecreasePerpPositionOrder(message)).endCell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidatePerpPositionOrder') {
            body = beginCell().store(storeLiquidatePerpPositionOrder(message)).endCell();
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
    
    async getPerpPositionOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('perpPositionOrder', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleLPPositionOrder(result_p) : null;
        return result;
    }
    
    async getPerpPositionOrderIndexNext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('perpPositionOrderIndexNext', builder.build())).stack;
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