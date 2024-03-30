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
        b_0.storeUint(1843397758, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
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

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1843397758) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _minExecutionFee = sc_1.loadIntBig(257);
    let _gasConsumption = sc_1.loadIntBig(257);
    let _minTonsForStorage = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _usdtWallet = sc_2.loadAddress();
    let _pool = sc_2.loadAddress();
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

export type CompensateOrder = {
    $$type: 'CompensateOrder';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFeeAmount: bigint;
}

export function storeCompensateOrder(src: CompensateOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(903497951, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.refundReceiver);
        b_1.storeInt(src.refundAmount, 257);
        b_1.storeAddress(src.executionFeeReceiver);
        let b_2 = new Builder();
        b_2.storeInt(src.executionFeeAmount, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 903497951) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _refundReceiver = sc_1.loadMaybeAddress();
    let _refundAmount = sc_1.loadIntBig(257);
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _executionFeeAmount = sc_2.loadIntBig(257);
    return { $$type: 'CompensateOrder' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFeeAmount: _executionFeeAmount };
}

function loadTupleCompensateOrder(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFeeAmount = source.readBigNumber();
    return { $$type: 'CompensateOrder' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFeeAmount: _executionFeeAmount };
}

function storeTupleCompensateOrder(source: CompensateOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFeeAmount);
    return builder.build();
}

function dictValueParserCompensateOrder(): DictionaryValue<CompensateOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateOrder(src.loadRef().beginParse());
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

export type LiquidateOrADLPerpPosition = {
    $$type: 'LiquidateOrADLPerpPosition';
    executionFeeReceiver: Address | null;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    trxId: bigint;
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeLiquidateOrADLPerpPosition(src: LiquidateOrADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(492244992, 32);
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

export function loadLiquidateOrADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 492244992) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _trxId = sc_1.loadIntBig(257);
    let _pricesLength = sc_1.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_1);
    return { $$type: 'LiquidateOrADLPerpPosition' as const, executionFeeReceiver: _executionFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleLiquidateOrADLPerpPosition(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'LiquidateOrADLPerpPosition' as const, executionFeeReceiver: _executionFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleLiquidateOrADLPerpPosition(source: LiquidateOrADLPerpPosition) {
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

function dictValueParserLiquidateOrADLPerpPosition(): DictionaryValue<LiquidateOrADLPerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLiquidateOrADLPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateOrADLPerpPosition(src.loadRef().beginParse());
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
    opType: bigint;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
}

export function storeRBFPositionOrderCreatedEvent(src: RBFPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1507952113, 32);
        b_0.storeUint(src.opType, 8);
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
    if (sc_0.loadUint(32) !== 1507952113) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _orderId = sc_1.loadIntBig(257);
    return { $$type: 'RBFPositionOrderCreatedEvent' as const, opType: _opType, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function loadTupleRBFPositionOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    return { $$type: 'RBFPositionOrderCreatedEvent' as const, opType: _opType, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId };
}

function storeTupleRBFPositionOrderCreatedEvent(source: RBFPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
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
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeRBFPositionOrderCancelledEvent(src: RBFPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2552423338, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadRBFPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2552423338) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'RBFPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleRBFPositionOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'RBFPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleRBFPositionOrderCancelledEvent(source: RBFPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
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
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeRBFPositionOrderExecutedEvent(src: RBFPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1350653125, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadRBFPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1350653125) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'RBFPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleRBFPositionOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'RBFPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleRBFPositionOrderExecutedEvent(source: RBFPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
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

export type CompensateOrderEvent = {
    $$type: 'CompensateOrderEvent';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFeeAmount: bigint;
}

export function storeCompensateOrderEvent(src: CompensateOrderEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4042095478, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.trxId, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.refundReceiver);
        b_1.storeInt(src.refundAmount, 257);
        b_1.storeAddress(src.executionFeeReceiver);
        let b_2 = new Builder();
        b_2.storeInt(src.executionFeeAmount, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateOrderEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4042095478) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _refundReceiver = sc_1.loadMaybeAddress();
    let _refundAmount = sc_1.loadIntBig(257);
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _executionFeeAmount = sc_2.loadIntBig(257);
    return { $$type: 'CompensateOrderEvent' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFeeAmount: _executionFeeAmount };
}

function loadTupleCompensateOrderEvent(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFeeAmount = source.readBigNumber();
    return { $$type: 'CompensateOrderEvent' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFeeAmount: _executionFeeAmount };
}

function storeTupleCompensateOrderEvent(source: CompensateOrderEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFeeAmount);
    return builder.build();
}

function dictValueParserCompensateOrderEvent(): DictionaryValue<CompensateOrderEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateOrderEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateOrderEvent(src.loadRef().beginParse());
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
        b_0.storeInt(src.minExecutionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.gasConsumption, 257);
        b_1.storeInt(src.minTonsForStorage, 257);
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
    let _minExecutionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConsumption = sc_1.loadIntBig(257);
    let _minTonsForStorage = sc_1.loadIntBig(257);
    let _usdtWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _pool = sc_2.loadAddress();
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
<<<<<<< HEAD
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECvgEAOQ4AAQHAAQEFoHshAgEU/wD0pBP0vPLICwMCAWIhBAIBIBAFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtUVlXVzd1N1BVdjZ0cWl1dDhjd0Y3VkRTVzg4elFhU3VTUkN5Y3F4aHlTS2aCAAEbCvu1E0NIAAYAIBIAsKALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lACASAODAJpsx62zwRERESEREREBERERAPERAPVQ7bPFcQXw9sISBukjBtmSBu8tCAbylvCeIgbpIwbd6C5DQE6gQEBKAJZ9A1voZIwbd8gbpIwbY6H0Ns8bBlvCeK3AhmxFDbPNs8VxBfD2whguQ8AAiUCASAZEQIBYhQSAhmukG2ebZ4riC+HthDAuRMAAiACASAXFQIYqR3bPNs8VxBfD2whuRYAAioCgKrhIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRERESEREREBERERAPERAPVQ7bPGyIbKi5GABmbSFus44cMIEBCwEgbvLQgCtZcUEz9ApvoZQB1wAwkltt4pEx4lYSVhJWElYSVhJWElYSAgEgHBoCGbUHW2ebZ4riC+HthDC5GwACIwIBZh8dAmiq8ts8EREREhERERAREREQDxEQD1UO2zxXEF8PbCEgbpIwbZkgbvLQgG8ubw7iIG6SMG3euR4BOoEBASQCWfQNb6GSMG3fIG6SMG2Oh9DbPGwebw7irQJoqZvbPBERERIREREQEREREA8REA9VDts8VxBfD2whIG6SMG2ZIG7y0IBvKm8K4iBukjBt3rkgATqBAQEmAln0DW+hkjBt3yBukjBtjofQ2zxsGm8K4rIDztAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPBERERMREREQERIREA8REQ8OERAOVR3bPPLggsj4QwHMfwHKABESEREREFXg2zzJ7VS5JCIBzgEREQEREoEBAc8AH4EBAc8AHYEBAc8AC8iBAQHPABqBAQHPAFAIINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFAHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAUjAIYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYT9AD0AMs/9AASyz8CyPQAFMs/FPQAFPQAFMs/yQHMyVjMyQHMBFYB4wJwIddJwh+VMCDXCx/eIIIQbeAEfrqPCDDbPGwZ2zx/4CCCEHNi0Jy6qKagJQTmj+gw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhCVhEBxwWzjyMw+EJwgEBwbW0kyMnQEGoQWRBIyFVg2zzJFEMwFEMwbW3bPOMOf+AgghDVMnbbup+ijiYD/o7yMNMfAYIQ1TJ227ry4IHTPwExKYEBASJZ9A1voZIwbd8gbpIwbY5D0IEBAdcAgQEB1wCBAQHXANQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wAwECUQJBAjbBVvBeIgbpFb4w5/4CCCEKERYu264wKCfycE4iCCELxvBgO6jsow0x8BghC8bwYDuvLggYEBAdcAgQEB1wD6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iQzBsE9s8f+AgghAl7GPBuuMCIIIQHPDPgbrjAiCCEHICvX26eG9oKAP8jqQw0x8BghByAr19uvLggYEBAdcAgQEB1wCBAQHXAFUgbBPbPH/gIIIQWBV/u7qOyzDTHwGCEFgVf7u68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gGBAQHXAIEBAdcAVSBsE9s8f+AgZmApBP6CENChUgW6jtow0x8BghDQoVIFuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIBgQEB1wCBAQHXANQB0IEBAdcA9AQwECUQJBAjbBXbPH/gIIIQSYnHwbrjAiCCEGPdKKe64wIgghANp475WlNPKgTUuo8IMNs8bBfbPH/gIIIQ+ZUU87qOyzDTHwGCEPmVFPO68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gGBAQHXAIEBAdcAVSBsE9s8f+AgghDjC56buk5MRSsE8I7aMNMfAYIQ4wuem7ry4IH6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAYEBAdcAgQEB1wDUAdCBAQHXAPQEMBAlECQQI2wV2zx/4CCCEO8BwrS64wIgghAdVxAAuuMCghCUapi2uj8zLiwBWI6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwLQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zyiAhAw2zxsF9s8fzIvA/T4QW8kVBMjgUtpBNs8pwZWGKcDoFYXoBERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zwBERUBoIIJ6EgAoAERFgG+AREUAfL0cJ53MALwgQEL+EIpWXFBM/QKb6GUAdcAMJJbbeIgbrOWMSBu8tCAkTDiggCg9wHy9PhCVhFus5owERAgbvLQgBEQklcR4lYRpIEBAXNwUwBwIfgjf234QhCaVhsKViUKViUKCAZElBEfUAcFA8hV0Ns8yQIRFAIBERIBVhMBqzEC6iBulTBZ9FowlEEz9BXicIBAf3NUczMQOgkRGAkIER0IBxEfBwYRFgYFER4FQDRwAgERHQERHBCrEHkQZxBWEEUQNBAjyFWw2zzJJQQQPQIRFQIREwEUQzBtbds8BxERBwYREAYQXxBOED1MuhBJEGcQNgVDNEKiAPDTHwGCEB1XEAC68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDUAdCBAQHXAIEBAdcA9AQwEDcQNhA1EDQCqDDTHwGCEO8BwrS68uCBgQEB1wCBAQHXANM/VSBsE/hBbySCAKD3+EJWFAHHBfL0KYEBAShZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuIgbpJfCOMOf600A6ogbvLQgG8uMizACpF/kyzAC+KOlgEREAFR/oFLaQ/bPKoAViGgHb4b8vSOngEREAFR/oFLaQ/bPKoBViGqAKCCCehIAKAdvhvy9OIowAqRf5MowAvinp41AgTjDzg2AfxTaMADlzArIG7y0IDeVhikgQEBcwFWEwFWE1JSERTIVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkCERsCAREQAVYaASBulTBZ9FowlEEz9BXiVhgQrBCbEIo3AmAQeRBoEFcQRhA1RA2BAQEPyFXQ2zzJEDgVIG6VMFn0WjCUQTP0FeL4KBA8FhsT2zyrnQPgNl8ENDQ3KYEBASlZ9A1voZIwbd8gbpIwbY4g0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiIG6zjyYgbvLQgG8kI8IAkyLCAJFw4pJsIuMNIcIAkyDCAJFw4pNbNjDjDZMwNjDigQEBbT07OQP6IG6SMG2OjSBu8tCAby7IVdDbPMniJxA7ASBulTBZ9FowlEEz9BXiRFPIVSCCEP7POn9QBMsfEssHgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAibrOOkQIgbvLQgH9YBnEQI21tbds8kjI04iNus5Ez4w2rojoBEgMgbvLQgHDbPJwB/IAO+EJwVHAAUwARHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREjEREREBEiERAPESEPDhEgDg0RHw0MER4MEHsQagkRIgkQeBBXBhEiBjwBYts8MBERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVWSAfiADfhCcFRwAFMAERsRJREbERoRJBEaERkRIxEZERgRIhEYERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KEHkQaFYcCFYiCAYRIQYFESAFPgGkBBEhBAMRIAMCESECAREgAREh2zwwERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUyqC5IEuPhBbyQrgQEBKVn0DW+hkjBt3yBukjBtjofQ2zxsHm8O4oF/fSFus/L0IG7y0IBvLjEswAqRf5MswAvi4w8OERIODRERDQwREAxVOwMRHgMCER8CAREfAVYUAREUrURDQAP82zxWHm6zlxEeIG7y0ICUVx74QuJ/gQEBVh4GVh4GVh4GVh4GVh4GVh4GVh4GVh4GBREeBQQRHQQCESoCAREdAREpyFXQ2zzJAhEcAgERHQFS8CBulTBZ9FowlEEz9BXiEI0HERcHBhEYBgURFQUEERYEAxEUAwIREwIBERIBdKtBAn4REXAREYBAER9/ER8QeRBnEFYQRRA0ECPIVbDbPMlWEAQQOQIRFgIRFQEUQzBtbds8EREQT1DeELwQmkUVUDNCogC6ghD/V+VXUA3LHxvLPxnLBxeBAQHPAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8oAgQEBzwAByIEBAc8AEoEBAc8AEsoAEss/EoEBAc8AEvQAyQHMAvABERABUf6BS2kP2zynBlYjpwOgViKgERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPAERFgGgggnoSACgAREiAb4BESAB8vSedwLkAREQAVH+gUtpD9s8pwNWI6oAoFYioBERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zwBERYBoAERIgG+AREgAfL0nncE7vhBbyQpgQEBJ1n0DW+hkjBt3yBukjBtjofQ2zxsHm8O4oF/fSFus/L0IG7y0IBvLl8DKsAKkX+TKsAL4o6eVB7cgUtpDds8qgFWH6oAoFYeoIIJ6EgAoBu+GfL0jpZUHtyBS2kN2zyqAFYfoFYeoBu+GfL04vhCrZ6eRgPKERMRIBETERIRHxESERERHhERERARHREQDxEcDw4RGw4NERoNDBEZDAsRGAsKERcKCREWCQgRFQgHERQHBhEgBgURHwUEER4EAxEdAwIRHAJWGAIRGNs8VhLACpF/lFYSwAvi4w9+SUcC6lcTVxRXFFcXVxdXF1cXVxf4QlYSbrOaMBERIG7y0IAREZJXEuKBAQFtIG6SMG2OjSBu8tCAby7IVdDbPMniAhEQAlYSASBulTBZ9FowlEEz9BXiECoBERABD8hVIIIQl7Qm6lAEyx8SyweBAQHPAIEBAc8AyatIAo7IgljAAAAAAAAAAAAAAAABActnzMlw+wAef1AKcRAjbW1t2zz4QgUREgUEEREEAxEQA0/gEIwQaxCKEIkQWBBHEDZFQHDbPKKcAfonpIEBAXMBVhsBVh8BViIBER3IVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkQKgERGQFSkCBulTBZ9FowlEEz9BXiVhlus5cRGSBu8tCAlFcZ+ELi+EJ/KUoC/goRFQoJESEJgQEBViEKCREhCVYgCQgRIAgHERsHBhEZBgURGgUEERwEAxEcAwIRHAIBERkBERrIVdDbPMkDERMDEC8BEREBIG6VMFn0WjCUQTP0FeL4KAgRFQgHERQHBhETBgUREgUEEREEAxEQAxAvEE4QPBBLEIoQiRBoEEerSwEQFhA1RDAS2zydAvb4QW8kgUtpUyuhVTHbPKoAVhigVhegvvL0gV/yJ1YYvvL0ggDU4ybADJF/kybADeKRf5MmwA7i8vT4QnBUcAARHBEdERwRGxEdERsRGhEdERoRGREdERkRGBEdERgRFxEdERcRFhEdERYRFREdERURFBEdERQRExEdEROeTQKiERIRHRESERERHRERERARHREQDxEdDw4RHQ4NER0NDBEdDAsRHQsQSRBIEEcQRhBFVh3bPDD4QhESERMREhERERIREREQEREREA8REA9VDts8kpwActMfAYIQDaeO+bry4IGBAQHXAIEBAdcAgQEB1wDSANQB0IEBAdcAgQEB1wCBAQHXADAQNxA2EDUQNAHqMNMfAYIQY90op7ry4IH6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXAPQEMBAlECQQI2wV2zx/UAP0+EFvJFQTI4FLaQTbPKcGVhanA6BWFaAREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJERkJCBEYCAcRFwcGERYGBREVBQQRFAQDERMDAhESAgERGQERGNs8AREZAaCCCehIAKABERIBvgERGAHy9HCed1EC+oEBC/hCKVlxQTP0Cm+hlAHXADCSW23iIG6zljEgbvLQgJEw4oIAoPcB8vT4QlYVbrOaMBEUIG7y0IARFJJXFeIgpIEBAXNwUwD4I39t+EIQeFYdCBEfAchVkNs8yRAjAREWAVIwIG6VMFn0WjCUQTP0FeJwgEB/c1Q1MxAmsFICgAURGAUEERkEWgERFwERFhBnEEUQNBAjyFVw2zzJJwQDERIDAhETAhERARRDMG1t2zwJEREJCBEQCFV3XiQQNBJdogKoMNMfAYIQSYnHwbry4IGBAQHXAIEBAdcA0z9VIGwT+EFvJIIAoPf4QlYUAccF8vQrgQEBKFn0DW+hkjBt3yBukjBtjofQ2zxsGm8K4iBukl8I4w5/slQDgiBu8tCAbyoyKMABjpNUHLqBS2kL2zyqAFYdoBm+F/L0jptUHLqBS2kL2zyqAVYdqgCgggnoSACgGb4X8vTiJMABnp5VAgTjD1hWAf5TNMADlzAnIG7y0IDeVhSkgQEBclRv81JQERDIVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkCERcCHFYWASBulTBZ9FowlEEz9BXiVhQQaBBXEEYQNUQJgQEBVwJCC8hVkNs8yRA6FSBulTBZ9FowlEEz9BXi+CgQPBgbE9s8sJ0D/jVfAzI1gQEBbSBukjBtjo0gbvLQgG8qyFWQ2zzJ4icQPQEgbpUwWfRaMJRBM/QV4kpTyFUgghDXLzbYUATLHxLLB4EBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIm6zjpACIG7y0IB/WHEQI21tbds8kmwh4iWwolkBIG6zjokFIG7y0IBw2zyRNeKcBKb4QW8kLYEBASlZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBf30hbrPy9CBu8tCAbyoxKMAB4w8OERIODRERDQwREAxVOwMRFgMCERcCAREfASARF7JfXlsE/ts8Vh1us5cRHSBu8tCAlFcd+ELif4EBAVYWBlYWBlYWBlYbBgURJAUEERsEAxEkAwIRHgIBER3IVZDbPMkSARESAVYZASBulTBZ9FowlEEz9BXiBBEXBBA/AhEWAh5wERIegEARF38RFxBFEDQQI8hVcNs8ySIEED4CERICERF0sF1cATYBFEMwbW3bPAQREQQDERADT+0Qm0l6UAgFBAOiAJKCEP6ja3FQCcsfF8s/FcsHUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAIEBAc8Ayz8ByIEBAc8AEvQAyQHMAupUHLqBS2kL2zynBlYfpwOgVh6gERERIhERERARIREQDxEgDw4RHw4NER4NDBEdDAsRHAsKERsKCREaCQgRGQgHERgHBhEXBgURFgUEERUEAxEUAwIREwIBERIBESLbPAERIwGgggnoSACgAREaAb4BERgB8vSedwLeVBy6gUtpC9s8pwNWH6oAoFYeoBERESIREREQESEREA8RIA8OER8ODREeDQwRHQwLERwLChEbCgkRGgkIERkIBxEYBwYRFwYFERYFBBEVBAMRFAMCERMCARESAREi2zwBESMBoAERGgG+AREYAfL0nncE7PhBbyQrgQEBJ1n0DW+hkjBt3yBukjBtjofQ2zxsGm8K4oF/fSFus/L0IG7y0IBvKl8DJsABjp5UGpiBS2kJ2zyqAVYbqgCgVhqgggnoSACgF74V8vSOllQamIFLaQnbPKoAVhugVhqgF74V8vTi+EIRExEcEROynp5hA64REhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoRHAoJERsJCBEaCAcRGQcGERgGBREXBQQRFgQDERUDAhEUAlYZAhEZ2zxWE8AB4w9+ZGIC1FcSVxNXFFcU+EJWF26zmjARFiBu8tCAERaSVxfigQEBbSBukjBtjo0gbvLQgG8qyFWQ2zzJ4lYXASBulTBZ9FowlEEz9BXiEC8BERUBERTIVSCCEBBp6tBQBMsfEssHgQEBzwCBAQHPAMmwYwKYyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAARETAX9QD3EQI21tbds8+EIJERIJCBERCAcREAcQbxBeEE0QPEugEEgQJxBGECUQI3DbPKKcAfonpIEBAXIBVhwBVhoBVhcBER7IVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMkQKgERGgFSkCBulTBZ9FowlEEz9BXiVhpus5cRGiBu8tCAlFca+ELi+EJ/KWUC3gYRFgaBAQFWFgdWGwcGERoGBREbBQQRHQQDER0DAhEdAgERGgERG8hVkNs8yRMCERQCAREWASBulTBZ9FowlEEz9BXi+CgMERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QqxgQVxA0QTDbPLCdBPb4QW8kgUtpUyehVTHbPKoAVhSgVhOgvvL0gV/yI1YUvvL0JqSBAQFy+EL4I3BtbW0qUVpRXUUVUEQDyFWQ2zzJKRA7ASBulTBZ9FowlEEz9BXicvhCVSFSWshVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCEFaesJhnAQYB2zycAqgw0x8BghAc8M+BuvLggYEBAdcAgQEB1wDTP1UgbBP4QW8kggCg9/hCVhQBxwXy9C2BAQEoWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG6SXwjjDn+3aQN6IG7y0IBvKTInjpNUG6mBS2kK2zyqAFYcoBi+FvL0jptUG6mBS2kK2zyqAVYcqgCgggnoSACgGL4W8vTiI56eagIE4w9tawL8VhKkgQEBcVRt01J+yFVAUEWBAQHPABKBAQHPAIEBAc8AyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwDJAczJAhEVAhpWFAEgbpUwWfRaMJRBM/QV4lYSEEaBAQEkBxBGBREWBQQDUJrIVYDbPMkQPEFQtWwBLiBulTBZ9FowlEEz9BXi+CgQPBobE9s8nQP+OV8FgQEBbSBukjBtjo0gbvLQgG8pyFWA2zzJ4iYQPgEgbpUwWfRaMJRBM/QV4n9AU8hVIIIQkSuxT1AEyx8SygCBAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AClus46QCSBu8tCAf1hxECNtbW3bPJI5MOInbrWibgEes46JByBu8tCAcNs8kTfinAG0MNMfAYIQJexjwbry4IGBAQHXAIEBAdcA+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHUAdCBAQHXAPQEMBAlECQQI2wV2zx/cASm+EFvJC+BAQEqWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwnigX99IW6z8vQgbvLQgG8pMSfjDw4REg4NERENDBEQDFU7AxEUAwIRFQIBER0BVhQBER+3dnVxBP7bPFYZbrOXERkgbvLQgJRXGfhC4n+BAQFWFAZWFwZWIAYFESIFBBEYBAMRGAMCERsCAREiAREayFWA2zzJECMBERABVhgBIG6VMFn0WjCUQTP0FeIQPQIRFgIBERUBD3ARGIBAERV/ERUQNBAjyFVg2zzJIwMRFQMCERECERABdLVzcgE6FEMwbW3bPAUREQUEERAEED9O3BBKCRBoEDdeIgGiAHqCEOic1F9QCMsfFsoAFMs/WCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8Ayz+BAQHPAPQAAH6BXm0Bs/L0cIEBC/hCLVlxQTP0Cm+hlAHXADCSW23iIG6zljEgbvLQgJEw4oIAoPcB8vSBQYwBVhOg+CO88vQC6lQbqYFLaQrbPKcGVh6nA6BWHaAREREhEREREBEgERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRFAQDERMDAhESAgERIQERINs8AREhAaCCCehIAKABERgBvgERFgHy9J53At5UG6mBS2kK2zynA1YeqgCgVh2gERERIRERERARIBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURFQUEERQEAxETAwIREgIBESEBESDbPAERIQGgAREYAb4BERYB8vSedwEY+EFvJNs8L6oAoC6gngT0+EFvJC2BAQEoWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwnigX99IW6z8vQgbvLQgG8pXwMljp5UGYeBS2kI2zyqAVYaqgCgVhmgggnoSACgFr4U8vSOllQZh4FLaQjbPKoAVhqgVhmgFr4U8vTi+EIRExEbERMREhEaERK3np55A54REREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRFAQDERsDAhEaAlYWAhEW2zxWGOMPfnx6AthXE1cTVxZXFvhCVhJus5owEREgbvLQgBERklcS4oEBAW0gbpIwbY6NIG7y0IBvKchVgNs8yeIQJFYVASBulTBZ9FowlEEz9BXicAIBERQBERPIVSCCECRUZsRQBMsfEsoAgQEBzwCBAQHPAMm1ewKUyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAH39QDXEQI21tbds8+EIKERIKCRERCQgREAgQfxBuEF0QTBA7SpAQaBBnEDVEMBJw2zyinAH6J6SBAQFxAVYaAVYdAVYYAREcyFVAUEWBAQHPABKBAQHPAIEBAc8AyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwDJAczJECoBERgBUpAgbpUwWfRaMJRBM/QV4lYVbrOXERUgbvLQgJRXFfhC4vhCfyl9AtIFERsFgQEBVhcGVh4GBREYBQQRGgQDERoDAhEaAgERGMhVgNs8yRA0AhESAgERFQEgbpUwWfRaMJRBM/QV4vgoDREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEJwaSbBGcBAl2zy1nQCegV5tAbPy9HCBAQv4Qi5ZcUEz9ApvoZQB1wAwkltt4iBus5YxIG7y0ICRMOKCAKD3+EITxwWRf5Eg4hLy9LOdggCbFwFWEqD4I7vy9JEw4gE8MNMfAYIQoRFi7bry4IGBAQHXAIEBAdcAWWwS2zx/gAOo+EFvJIFLaVMmoVUx2zyqAFYToFYSoL7y9IFf8iJWE77y9CekgQEBcPhC+CNwbW0oUUpENG3IVYDbPMkqEDwBIG6VMFn0WjCUQTP0FeJw+EJUI0MLnrWBAcbIVUCCEM9jV5hQBssfFMoAWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwAByIEBAc8AyQHMyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCEHgB2zycAvIgbvLQgG8lbCGBAQFtIG6SMG2ORiBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMkBzMniED5BUCBulTBZ9FowlEEz9BXiIcABjoUxUKrbPOMOi4MCNCHAAo6FMVCq2zyOjQHAA46EUKrbPJI6MOLiiIQE6vhBbyRUEyOBS2kE2zxWE6ASvvL0JIEBASNZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuIgbpJfA+AgbvLQgG8uUGdfBWwzMzOBAQFtIG6SMG2OjSBu8tCAby7IVdDbPMniJxA7ASBulTBZ9FowlEEz9BXigQEBbZ6tq4UDwiBukjBtjiYgbvLQgG8kyFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyeInEDoBIG6VMFn0WjCUQTP0FeIjwAqRf5MjwAvi4w8jbrOOjAMgbvLQgBAjcNs8EpEz4hKHhpwBqkNUyFUgghD+zzp/UATLHxLLB4EBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIG6zkyLDAJFw4o6QIG7y0IB/WANxECNtbW3bPJIwMeKiAZxDVMhVIIIQl7Qm6lAEyx8SyweBAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACBus46QIG7y0IB/WANxECNtbW3bPJIwMeKiBOL4QW8kVBMjgUtpBNs8VhOgEr7y9CaBAQEjWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwriIG6SXwPgIG7y0IBvKlBnXwUzgQEBbSBukjBtjo0gbvLQgG8qyFWQ2zzJ4icQPQEgbpUwWfRaMJRBM/QV4iPAAZ6ysIkD1I7WQ1TIVSCCENcvNthQBMsfEssHgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAnbrOTIMMAkXDijpEHIG7y0IB/WAhxECNtbW3bPJIwNuLjDSBus46IIG7y0IBw2zyRMOKiipwBnkNUyFUgghAQaerQUATLHxLLB4EBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAJ26zjpEHIG7y0IB/WAhxECNtbW3bPJIwNuKiBNz4QW8kVBMjgUtpBNs8VhOgEr7y9CiBAQEjWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG6SXwPgIG7y0IBvKVBnXwWBAQFtIG6SMG2OjSBu8tCAbynIVYDbPMniJxA/ASBulTBZ9FowlEEz9BXiA563tYwDyo7QcEBUyFUgghCRK7FPUATLHxLKAIEBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIm6zjpECIG7y0IB/WApxECNtbW3bPJIyOOLjDSdus46JByBu8tCAcNs8kTfioo2cAaB/QFTIVSCCECRUZsRQBMsfEsoAgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAibrOOkQIgbvLQgH9YCnEQI21tbds8kjI44qIDrNQw0NIfIcABjokx0n/6ADAB2zyPQCHAAo6LMdJ/0n/6ADBZ2zyOrQHAA46k+gDSAAHA/wHSP9IAAcD/AdJ/0n/S/9Qw0NJ/0v/Sf9L/MNs8kl8E4uLimZWPBFr4QW8kQzBSMNs8qgBSwKBWHqBWHaC5joVfCyDbPOBTxrmOhV8LINs84CpWHrmenZ2QAvyOhV8LINs84Dw8B5F6koAL4hEbER0RGxEaERwRGhEZER0RGREYERwRGBEXER0RFxEWERwRFhEVER0RFREUERwRFBETER0RExESERwREhERER0REREQERwREA8RHQ8OERwODREdDQwRHAwLER0LChEcClGQCRB4EGcQVhBFEDSdkQJKECMBER4BER1WHds8MBERERMREREQERIREA8REQ8OERAOVR3bPJKcAfQspCzACpF/kyzAC+KOPSmzgQEBVHdlJ8hVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERECVhABIG6VMFn0WjCUQTP0FeKOESzADJEpmSzADZEpkimz4uIP4oEBAfgjcG1tbVYTBVYSBVYUBVYTBVYTBVYTBZMCwFYTBVYcBVYQBVUDyFXQ2zzJAhESAlYQASBulTBZ9FowlEEz9BXiEM0QrS4QrhCeEI4QNwYQXgQREAQCERAeVRXIVdDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBVIKuUAPSCEO4qmDFQD8sfHcsHG4EBAc8AUAkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYXygAVgQEBzwADyIEBAc8AEoEBAc8AygASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AA8iBAQHPABSBAQHPAMlYzMkBzMkBzARa+EFvJEMwUjDbPKoAUkCgVhagVhWguY6FXwMg2zzgU0G5joVfAyDbPOAiVha5np2dlgS8joVfAyDbPOA0NCekgQEBcfgjcG1tKFFLUUtRSgRtyFWQ2zzJKhA8ASBulTBZ9FowlEEz9BXicVEwRlNSC8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFAGBZ2wmJcBBNs8nACOghDpME3zUAfLHxXLB1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAcwEVvhBbyRDMFIw2zyqAFIwoFYVoFYUoLmOhFsg2zzgUzC5joRbINs84CFWFbmenZ2aA3yOhFsg2zzgMzMopIEBAX/4I3BtbW0oUVpRXEUVUEQDyFWA2zzJKxA9ASBulTBZ9FowlEEz9BXif1QiE1QkXJ21mwHCyFVAghDPY1eYUAbLHxTKAFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAIEBAc8AAciBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAQeAHbPJwBQPhBbyQTXwMBoVYQoS+hIMIAjopwAXIQI21tbds8kVviogJKggnoSABycG1wyMnQEGkQWBBHEDnIVWDbPMlWEFBEFEMwbW3bPJ+iAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAADeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WBPYREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBEaCAcRGQcGERgGBREXBQQRFgQDERUDAhEUAgEREwEREts8Ozs7Ozs7O1YTbrOUVhJus5Fw4pRXElcS4w34QnBwgEAQI21tbds8DxERDw4REA6lpKKhACIQ3xDOEL0QrAkLCAZEpBcVEwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wCjAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAFiBAQsRFCBu8tCAERMgbvLQgAIRFAIBERMBcSFulVtZ9FkwmMgBzwBBM/RB4gAS+EJSsMcF8uCEAcTTHwGCEG3gBH668uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHSAAGS0gCSbQHigQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0KcAkPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQWRBYEFcQVgTOgCDXIXAh10nCH5UwINcLH94gghDonNRfuuMCIIIQ/qNrcbqPOjDTHwGCEP6ja3G68uCB0z/TB1lsEjAlgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsGm8K4iBukVvjDn/gghD/V+VXurSyr6kCfI850x8BghD/V+VXuvLggdM/0wdZbBIwI4EBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bB5vDuIgbpFb4w5/4DB/raoC3CBu8tCAby4zLMADjqxfDYEBAW0gbpIwbY6NIG7y0IBvLshV0Ns8yeIQNRIgbpUwWfRaMJRBM/QV4o6xELwQrBCcEIwQfBBsEFwQTBA8ECxwWYEBAQ7IVdDbPMkQNRIgbpUwWfRaMJRBM/QV4uICq6sB1FDeywcbgQEBzwBQCSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhfKABWBAQHPAAPIgQEBzwASgQEBzwDKABKBAQHPAALIgQEBzwATygAjbrOafwHKABOBAQHPAJYzcFADygDiUAOsAL4gbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4shQBCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyVADzMlYzMkBzAGy0weBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gCBAQHXANQB0IEBAdcAgQEB1wDSAIEBAdcA1DDQgQEB1wDSANIAAZWBAQHXAJJtAeKuAMr6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAdQw0PpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxEJ4QnRCcEJsQmgLMIG7y0IBvKjMowAOOrF8JgQEBbSBukjBtjo0gbvLQgG8qyFWQ2zzJ4hA3EiBulTBZ9FowlEEz9BXijqkQeBBoEFgQSBA4EChwWYEBAQrIVZDbPMkQNxIgbpUwWfRaMJRBM/QV4uIEsLABsFCaywdQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhWBAQHPABOBAQHPAAHIgQEBzwASgQEBzwASygAibrOafwHKABKBAQHPAJUycFjKAOLIUAOxALQgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJAczJAcwB7tMH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wCBAQHXANIA0gABlYEBAdcAkm0B4tQw0PpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIBswBo+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4jEQahBpEGgQZwLWMNMfAYIQ6JzUX7ry4IHSANM/WWwSMSeBAQEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG6RW46wIG7y0IBvKTMQZxBXEEcQNxAncFmBAQEJyFWA2zzJEDkSIG6VMFn0WjCUQTP0FeIG4n+3tQH0UInKAFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFIEBAc8AEoEBAc8AAciBAQHPABLKACJus5p/AcoAEoEBAc8AlTJwWMoA4lggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4si2AGJQAyBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyVjMyQHMAeTSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcA0gDSAAGVgQEB1wCSbQHi+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHUMNC4AGj6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRBZEFgQVxBWAmTtRNDUAfhj0gABjpDbPFcSERAREREQDxEQD1UO4Pgo1wsKgwm68uCJgQEB1wABAdHbPLy6AdwwgQcIgQC0ghAF9eEAggr68ICCCcnDgG1tcW0hbSFtbSL4QoEBC/hCfyQQTiFulVtZ9FkwmMgBzwBBM/RB4nAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwILsAaMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUMtJqEZ1QEMBvoEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBvQCI+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE0z/0BNM/1DDQ9ATTP/QE9ATTPzAPERIPDxERDw8REA/uQULH');
=======
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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ERYGBREVBQQRFAQDERMDAhEWAgERFQERFHARFIBAERhwERjbPAQRFAQDERMDAhEWAgERFQEUQzBtbds8DRERDairpAAMDBEQDFU7AGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAP8MPhCERERFRERERARFBEQDxETDw4REg4NERUNDBEUDAsREwsKERIKCREVCQgRFAgHERMHBhESBgURFQUEERQEAxETAwIREgIBERUBERRwERSAQBEUVhdwERnbPAQRFQQDERQDAhETAgERFgEUQzBtbds8DRERDQwREAwQvxCuqKunAAgQnVU4ALbIghAPin6lAcofFMo/WPoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZwAcoAcPoCyMnQzxbJBPYREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBEaCAcRGQcGERgGBREXBQQRFgQDERUDAhEUAgEREwEREts8Ozs7Ozs7O1YTbrOUVhJus5Fw4pRXElcS4w34QnBwgEAQI21tbds8DxERDw4REA6urauqACIQ3xDOEL0QrAkLCAZEpBcVEwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wCsAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAFiBAQsRFCBu8tCAERMgbvLQgAIRFAIBERMBcSFulVtZ9FkwmMgBzwBBM/RB4gAS+EJSsMcF8uCEAcTTHwGCEG3gBH668uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHSAAGS0gCSbQHigQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0LAAkPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/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');
>>>>>>> perp
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
    54499: { message: `invalid op type` },
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
    {"name":"UpdateConfig","header":1843397758,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateDecreaseRBFPositionOrder","header":2702271213,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelRBFPositionOrder","header":3161392643,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteRBFPositionOrder","header":636249025,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateRBFPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateRBFPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateOrder","header":903497951,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFeeAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
    {"name":"LiquidateOrADLPerpPosition","header":492244992,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensatePerpPositionOrder","header":1214351731,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"needRefund","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isExecute","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"RBFPositionOrderCreatedEvent","header":1507952113,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderCancelledEvent","header":2552423338,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrderExecutedEvent","header":1350653125,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderCreatedEvent","header":3912257011,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderCancelledEvent","header":275376848,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionOrderExecutedEvent","header":3610195672,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionOrderCreatedEvent","header":3995768881,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionOrderCancelledEvent","header":2545166058,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionOrderExecutedEvent","header":4274993791,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CompensateOrderEvent","header":4042095478,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFeeAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonCallback","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LPPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"rbfPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"RBFPositionOrder","optional":true}},
    {"name":"rbfPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LPPositionOrder","optional":true}},
    {"name":"lpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"perpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PerpPositionOrder","optional":true}},
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
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateOrADLPerpPosition"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | TokenNotification | TokenExcesses | CreateDecreaseRBFPositionOrder | CancelRBFPositionOrder | ExecuteRBFPositionOrder | UpdateRBFPositionSuccess | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | LiquidateLPPositionOrder | CreateDecreasePerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidateOrADLPerpPosition | Deploy) {
        
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateOrADLPerpPosition') {
            body = beginCell().store(storeLiquidateOrADLPerpPosition(message)).endCell();
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
        const result = result_p ? loadTuplePerpPositionOrder(result_p) : null;
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