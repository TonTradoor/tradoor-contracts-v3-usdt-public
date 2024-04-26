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
    lpGasConsumption: bigint;
    minTonsForStorage: bigint;
    usdtWallet: Address;
    pool: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(49447017, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
        b_0.storeInt(src.maxTimeDelayExecutor, 257);
        b_0.storeInt(src.minTimeDelayTrader, 257);
        b_0.storeCoins(src.minExecutionFee);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasConsumption);
        b_1.storeCoins(src.lpGasConsumption);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeAddress(src.usdtWallet);
        b_1.storeAddress(src.pool);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 49447017) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _maxTimeDelayExecutor = sc_0.loadIntBig(257);
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _minExecutionFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConsumption = sc_1.loadCoins();
    let _lpGasConsumption = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _usdtWallet = sc_1.loadAddress();
    let _pool = sc_1.loadAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, lpGasConsumption: _lpGasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executor = source.readAddressOpt();
    let _enableExecutor = source.readBooleanOpt();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _gasConsumption = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, lpGasConsumption: _lpGasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enableExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minExecutionFee);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.lpGasConsumption);
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

export type UpdateWhitelist = {
    $$type: 'UpdateWhitelist';
    enableWhitelist: boolean | null;
    whitelistLength: bigint;
    whitelist: Dictionary<bigint, UpdateWhitelistParam>;
}

export function storeUpdateWhitelist(src: UpdateWhitelist) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1331445576, 32);
        if (src.enableWhitelist !== null && src.enableWhitelist !== undefined) { b_0.storeBit(true).storeBit(src.enableWhitelist); } else { b_0.storeBit(false); }
        b_0.storeUint(src.whitelistLength, 64);
        b_0.storeDict(src.whitelist, Dictionary.Keys.BigInt(257), dictValueParserUpdateWhitelistParam());
    };
}

export function loadUpdateWhitelist(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1331445576) { throw Error('Invalid prefix'); }
    let _enableWhitelist = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _whitelistLength = sc_0.loadUintBig(64);
    let _whitelist = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdateWhitelistParam(), sc_0);
    return { $$type: 'UpdateWhitelist' as const, enableWhitelist: _enableWhitelist, whitelistLength: _whitelistLength, whitelist: _whitelist };
}

function loadTupleUpdateWhitelist(source: TupleReader) {
    let _enableWhitelist = source.readBooleanOpt();
    let _whitelistLength = source.readBigNumber();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdateWhitelistParam(), source.readCellOpt());
    return { $$type: 'UpdateWhitelist' as const, enableWhitelist: _enableWhitelist, whitelistLength: _whitelistLength, whitelist: _whitelist };
}

function storeTupleUpdateWhitelist(source: UpdateWhitelist) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.enableWhitelist);
    builder.writeNumber(source.whitelistLength);
    builder.writeCell(source.whitelist.size > 0 ? beginCell().storeDictDirect(source.whitelist, Dictionary.Keys.BigInt(257), dictValueParserUpdateWhitelistParam()).endCell() : null);
    return builder.build();
}

function dictValueParserUpdateWhitelist(): DictionaryValue<UpdateWhitelist> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateWhitelist(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateWhitelist(src.loadRef().beginParse());
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
    gasConsumption: bigint;
    lpGasConsumption: bigint;
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
        b_0.storeCoins(src.lpGasConsumption);
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
    let _lpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _usdtWallet = sc_1.loadAddress();
    let _pool = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, lpGasConsumption: _lpGasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _maxTimeDelayExecutor = source.readBigNumber();
    let _minTimeDelayTrader = source.readBigNumber();
    let _minExecutionFee = source.readBigNumber();
    let _gasConsumption = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, maxTimeDelayExecutor: _maxTimeDelayExecutor, minTimeDelayTrader: _minTimeDelayTrader, minExecutionFee: _minExecutionFee, gasConsumption: _gasConsumption, lpGasConsumption: _lpGasConsumption, minTonsForStorage: _minTonsForStorage, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.maxTimeDelayExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.minExecutionFee);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.lpGasConsumption);
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

export type WhitelistData = {
    $$type: 'WhitelistData';
    enableWhitelist: boolean;
    isInWhitelist: boolean;
}

export function storeWhitelistData(src: WhitelistData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.enableWhitelist);
        b_0.storeBit(src.isInWhitelist);
    };
}

export function loadWhitelistData(slice: Slice) {
    let sc_0 = slice;
    let _enableWhitelist = sc_0.loadBit();
    let _isInWhitelist = sc_0.loadBit();
    return { $$type: 'WhitelistData' as const, enableWhitelist: _enableWhitelist, isInWhitelist: _isInWhitelist };
}

function loadTupleWhitelistData(source: TupleReader) {
    let _enableWhitelist = source.readBoolean();
    let _isInWhitelist = source.readBoolean();
    return { $$type: 'WhitelistData' as const, enableWhitelist: _enableWhitelist, isInWhitelist: _isInWhitelist };
}

function storeTupleWhitelistData(source: WhitelistData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.enableWhitelist);
    builder.writeBoolean(source.isInWhitelist);
    return builder.build();
}

function dictValueParserWhitelistData(): DictionaryValue<WhitelistData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWhitelistData(src)).endCell());
        },
        parse: (src) => {
            return loadWhitelistData(src.loadRef().beginParse());
        }
    }
}

export type UpdateWhitelistParam = {
    $$type: 'UpdateWhitelistParam';
    account: Address;
    enable: boolean;
}

export function storeUpdateWhitelistParam(src: UpdateWhitelistParam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeBit(src.enable);
    };
}

export function loadUpdateWhitelistParam(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _enable = sc_0.loadBit();
    return { $$type: 'UpdateWhitelistParam' as const, account: _account, enable: _enable };
}

function loadTupleUpdateWhitelistParam(source: TupleReader) {
    let _account = source.readAddress();
    let _enable = source.readBoolean();
    return { $$type: 'UpdateWhitelistParam' as const, account: _account, enable: _enable };
}

function storeTupleUpdateWhitelistParam(source: UpdateWhitelistParam) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeBoolean(source.enable);
    return builder.build();
}

function dictValueParserUpdateWhitelistParam(): DictionaryValue<UpdateWhitelistParam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateWhitelistParam(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateWhitelistParam(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('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uY50VhWBAQEiWfQNb6GSMG3fIG6SMG2OKND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAWWwSbwLiIG6zjiyBAQshIG7y0IBvIjACIG7y0IBvIjEQOhJxIW6VW1n0WTCYyAHPAEEz9EHiB5Ew4qToMB0BQoBAECNtbW3bPBEQERMREA8REg8OEREODREQDRDPEL5VKqwACFcUVxQE9C6P9TARFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJERYIBwZVQFYWVhfbPH9wgEKIBBEYBBA0bW3bPBESERMREhERERIREREQEREREA8REA9VDuAsnyCsIQT+jpsw0x8BghAlshckuvLggfoA03/TP1UgbBPbPH/gIIIQfZHrNrqOxDDTHwGCEH2R6za68uCB0z/TP/pAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeJDMGwT2zx/4CCCEBKGuYu64wIgghAc8M+BuiIjJCUAMAAAAABjcmVhdGUgb3JkZXIgc3RvcHBlZAL+jtsRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0RFQ0MERQMCxEXCwoRFgoJERUJCBEUCAcRFwcGERYGBREVBQQRFAQDERcDAhEWAgERFQERFFYV2zyzjh8DERcDAhEWAgERFQERFAMREwMCERICARERAREQVbNw4i0uAvIRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFds8+EFvJDAxgUtpMlYWoVYSVhGgvvL0gV/yVhVWE77y9CWkqCYC7PhBbyQTXwMqgQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFsljhSBS2lWG1YaoIIQBfXhAKAYvhfy9J2BS2lWG1YaoBi+F/L04oFebQazFvL0+EIRFBEcERQRExEbERMREhEaERK1QAGIMNMfAYIQEoa5i7ry4IHTP9M/+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4kMwbBPbPH8oBHiOnjDTHwGCEBzwz4G68uCB0z+BAQHXANM/VSBsE9s8f+AgghBqkj3buo8IMNs8bBfbPH/gIIIQI8cvWLpGR0hJA/yBAQFw+EL4I3D4Qm1WHgRWHUQ0yFVw2zzJKBA6ASBulTBZ9FowlEEz9BXicvhCUEMCERkCVhcCERkZyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK2dNScBJhCcEIsQehBpEGgQVxA2RQQC2zyiBPD4QW8kE18DKoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbJeMPgV5tERizAREYAfL0+EIREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlAEERcEAxEWAxK1KSorAeSBS2lWG6oAVhqgERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRFAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPAERGQGgAREUAb4BERgB8vSAAfKBS2lWG6oAVhqgERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRFAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPAERGQGgghAF9eEAoAERFAG+AREYAfL0gAPqAREVAds8ggCg9wHy9IFBjFYYVhWg+CO88vRWFG6zlxEUIG7y0ICUVxT4QuL4Qn+BAQFWHgVWHgVWHgUEER4EAxEdAwIRHgLIVXDbPMkQJQERFgFWFQEgbpUwWfRaMJRBM/QV4gERGAERE3ARE4BAERl/ERlYk50sAcjIVUCCEOic1F9QBssfFMoAEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8Ayz/JKAQDERIDAhEXAhEWARRDMG1t2zwLERMLChESCgkREQkIERAIVXdFcFUDrABAgQELKQJxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IAE8o/sVxSNBBub3QgaW4gd2hpdGVsaXN0g/hQwERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKxIBERYBVhZWF9s8f3CAQogEERgEEDRtbds8ERIRExESEREREhERERAREREQDxEQD1UO4BEU1DDQ0x8hwAGfL6wwACgAAAAAbm90IGluIHdoaXRlbGlzdAKcjsox03/6ADARFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RgDbPOMOMTIC9PhBbyQTXwOLCHAkVhmgVhegE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN5TUrmOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDeI1YZuY4dW3+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iDeAeMCMDMppIEBAX/4I3BtJ1E5MzQDnAHAAo9HMHCAQHBtI8jJ0AURHAUEERsEVhoEERtVIMhVYNs8yS0EAxEYAwIRFwIRFgEUQzBtbds8DxETDw4REg4NERENDBEQDFU7QzDjDaGsNgP4bCERFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFlYXVhjbPH9wgEIRF9s8BBEYBEEwAREXAZ88PQOOUThSpMhVcNs8ySwQPgEgbpUwWfRaMJRBM/QV4nFRMEUTVCAXHchVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAgH2zydNaIAeIIQtBfMbFAHyx8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AAfoCgQEBzwDLPwH8+gDSAAHA/wHTP9IAAcD/AdN/03/T/9Qw0NN/0//Tf9P/MBEdESERHREcESARHBEbER8RGxEaER4RGhEZER0RGREYERwRGBEXERsRFxEWERoRFhEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8OERIONwEYDRERDQwREAwQv9s8OAP2+EFvJBNfA4sIcC1WIqBWIKATuY4SW3+L5nYXMgbm90IGVub3VnaI3lPouY4WW3+NBFqZXR0b24gbm90IGVub3VnaIN5xJsIAkyXCAJFw4pIwct4kwgCTI8IAkXDikaTeViIBqFLQueMAAeMCMDwIkXqSgAviER4RIBEeOTo7ADpbf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIAP4bLERFREXERURFBEWERQRExEXERMREhEWERIREREXEREREBEWERAPERcPDhEWDg0RFw0MERYMCxEXCwoRFgoJERcJCBEWCAcRFwcGERYGBREXBQQRFgQDERcDAhEWAgERFwERFlYXVhjbPH9wgEIRF9s8BBEYBEEwAREXAZ88PQL8ER0RHxEdERwRIBEcERsRHxEbERoRIBEaERkRHxEZERgRIBEYERcRHxEXERYRIBEWERURHxEVERQRIBEUERMRHxETERIRIBESERERHxERERARIBEQDxEfDw4RIA4NER8NDBEgDAsRHwsKESAKCVYgUJkRIFYg2zwwERMRFRETcT8BQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMT4BOBA0bW3bPBERERMREREQERIREA8REQ8OERAOVR2sALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMBPBESERQREhERERMREREQERIREA8REQ8OERAOVR3bPKIE+hERERkREREQERgREA8RFw8OERYODREVDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFERUFBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYdAccF4vL0s44SggCbFxEVVhOg+CO7AREVAfL0klcU4vhCVhVus+MPk0FCQwAUMBEUIG7y0IARFAAEVxUE9IEBAW0gbpIwbY6NIG7y0IBvKMhVcNs8yeIQJ1YYASBulTBZ9FowlEEz9BXiVhqUVxhXGOMNVhXCAI6WARESAX8BERZyECNtbW3bPBEQERMREJRXElcU4hEWkXGRcuICARESARERyFUgghBLZYrAUATLHxLLB8s/yz/JnUSsRQHc+EIRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoZEFgQRxA2XiIjEDQCERoCERsB2zwCERcCBhEWBgIREwIGERIGERECERACEG9NHhBsShsQaUcYRRVQRAOfAYjIgljAAAAAAAAAAAAAAAABActnzMlw+wD4QgwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQO0qQEHgQJxBGFXDbPKICzvhBbyQTXwOCAKD3+EJWEgHHBfL0KoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhsIjMkmoFLaQZWGr4W8vSOEYFLaVYaghAF9eEAoBe+FvL04oEBAW21SgA60x8BghBqkj3buvLggfoA0z/SANN/03/Tf9M/VWAC9hETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwRGgwLERkLChEYCgkRFwkIERYIBxEVBwYRFAYFERoFBBEZBAMRGAMCERcCAREWAREV2zz4QW8kMDGBS2kyVhahVhJWEaC+8vSBX/JWFVYTvvL0gAz4QqhPBMaPCDDbPGwY2zx/4CCCEMH5U/K6jsUw0x8BghDB+VPyuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/TP1UgbBPbPH/gIIIQnfoO2LpRUlNUBHogbpIwbY6NIG7y0IBvKMhVcNs8yeICERACUpAgbpUwWfRaMJRBM/QV4ibCAJIyNeMN+CdvENs8/hQwLMIAnUtOTAL4ERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREbCQgHERkHBhEYBgURFwUEERYEAxEbAwJWFwIRGQFWGds8ERMRGRETERIRGBESERERFxERERARFhEQDxEVD59NA8KOjRJ/UA1yECNtbW3bPAqSMjvi+CdvENs8/hQwCpFxkXLiQDPIVSCCELMFX9RQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wAgbrOOiCBu8tCAcNs8kTDirE6iADgOERQODRETDQwREgwLERELChEQChCfEI4QfVVVAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydAC/nBUcAARGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBCbEFoQSQgRIAgQRVYg2zww+EIRFBEVERQRExEUERNxUAE0ERIRExESEREREhERERAREREQDxEQD1UO2zyiAD7THwGCECPHL1i68uCB+gDTP9IA03/Tf9N/03/TP1VwAvQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRFAQDERsDAhEaAgERGQERGNs8+EFvJDAxgUtpMlYZoVYSVhGgvvL0gV/yVhhWE77y9HBWFahjAu74QW8kE18DKIEBASRZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bbDM0NSXACpF/kyXAC+KOFIFLaVYbVhqgghAF9eEAoBi+F/L0nYFLaVYbVhqgGL4X8vTigV5tArMS8vT4QhEUERwRFLhVBDqPCDDbPGwW2zx/4CCCEO8BwrS64wIgghAjNDu0ulpbXF0D/BETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRFgYFERUFBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYcAccF4vL0s5xWG8AKkX+UVhvADOKRcOKSVxrjDZNWVwAkggCbFxEbVhOg+CO7AREbAfL0BPT4QlYXbrOaMBEWIG7y0IARFpJXF+KBAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniECVWFwEgbpUwWfRaMJRBM/QV4lYawAqRf5RWGsAL4pRXF1cX4w1WEcIAjpABERQBfwEREnIQI21tbds8lFcRVxPiAhEWAgEREQEREJpYrFkB5PhCERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBcQNhAlAxEaA1YaAwIRGQIRGgHbPBEXAhEWAgQRFQQEERMEERICERECBBEQBE4fEE1LHBBKSBkQR0UWA58BsMhVIIIQgD5hdVAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QTBA7SpAQSBVEQBNw2zyiAJbTHwGCEJ36Dti68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTP9M/0z+BAQHXAIEBAdcAVVAE9o0GEV4ZWN1dGVQZXJwUG9zaXRpb25PcmRlcoP4UMPhBbyQTXwMrgQEBJ1n0DW+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLVsqwAqRf5MqwAvi4w+BXm0RFLMBERQB8vSCAMrHESFWHLoBESEB8vT4QrheX2AC5jDTHwGCEO8BwrS68uCB0z+BAQHXANM/VSBsE40GVVwZGF0ZVBlcnBQb3NpdGlvblN1Y2Nlc3OD+FDD4QW8kE18DggCg9/hCVhIBxwXy9CiBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3iIG6SXwXjDn+4aQQ6jwgw2zxsF9s8f+AgghDsM8xSuuMCIIIQr5O1yLp3eHl6AeSBS2lWI6oAViKgERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPAERFQGgAREhAb4BERQB8vSAAfKBS2lWI6oAViKgERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPAERFQGgghAF9eEAoAERIQG+AREUAfL0gAL+DxEUDw4REw4NERINDBERDAsREAsQrxCeEI0QfBBrEFoQSRA4R2AFESAFEDQQIwIRHQLbPIIAoPcB8vRWG8AKkX+UVhvADOKdgUGMVh1WFaD4I7zy9N5WIm6zlxEiIG7y0ICUVyL4QuL4Qn+BAQFWHgVWHgVWHgVWHgVWHgVWHpNhA/4FVh4FVh4FBBEqBAMRJwMCESoCyFXA2zzJECMBERsBViABIG6VMFn0WjCUQTP0FeIIER4IBxEYBwYRHQYFERYFBBEXBAMRFQMCERQCARETAREScBESgEARHX8RHRB5EGcQVhBFEDQQI8hVsNs8yVRBFBA6AhEUAhETARRDMG1tmoRiAULbPAQREwQDERIDAhERAgEREAEPEF0MEDtJGggQN0YVQBSsA/zCAJRWHMIAkXDikjBx3lYbwgCUVhrCAJFw4pGk3lYVwgCUVhzCAJFw4pRXFVcb4w1WGcIAlFYYwgCRcOKOFgURGQUEERgEAxEXAwIRFQJXE1cTXwTjDfhCDREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQO0qQEEhkZWYB/oAN+EJwVHAAIFYfKKkEERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmlYhChCJEHhWIAhWIAhGFwURJwVnAfyADvhCcFRwACBWHQERG6kEERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH4NESENEJwQaxBaEHkIESEIEEdoARgQNxAmEEUQNEMA2zyiATBDFAIRJwIBESfbPDARGhETERIREREQVeBxAVIQNEEw2zwwERQGERMGBRESBQQREQQREBA/TtAQbBBbEEoJEDhAZxUUE3EE8iBu8tCAby01NVszMybACpF/kybAC+KOFTM0gUtpVhqCEAX14QCgF74W8vREFOMNgQEBbSBukjBtjo0gbvLQgG8tyFXA2zzJ4ikQPwEgbpUwWfRaMJRBM/QV4ibCAJI2MOMNQVPIVSCCEKG7Cz9QBMsfEssHyz/LP8lqmmtsAvKBS2kIVhy+GPL0LYEBAStZ9A1voZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIgbrOPJyBu8tCAbyUkwgCTI8IAkXDikjMz4w0gwgCTIsIAkXDilF8DMjPjDZMwMjPibW4D/iPAA47gERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREbCQgRGggHERkHBgURFwUEERYEAxEbAwIRGgJWFwJWG9s84w0RExEZERMREhEYERIREREXEREREBEWERCfdXYCfMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACfCAI6NEn9QCHIQI21tbds8BZIyNuIgbrOOiCBu8tCAcNs8kTDirKIB/oAN+EJwVHAAIBEcESkRHBEbESgRGxEaEScRGhEZESYRGREYESURGBEXESQRFxEWESMRFhEVESIRFREUESERFBETESARExESER8REhERER4REREQER0REA8RKQ8OESgODREnDQwRJgwLESULChEkCgkRIwlWIAkQeBBnVh4HVipvAfyADvhCcFRwACARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERgRFxEnERcRFhEmERYRFRElERURFBEkERQRExEjERMREhEiERIREREhEREREBEgERAPEScPDhEmDg0RJQ0MESQMViEMEHtwAcwHBgURKAUEEScEAwIRKAIBEScBVifbPDARExEgERMREhEfERIREREeEREREBEdERAPERwPDhEbDg0RGg0MERkMCxEYCwoRFwoJERYJCBEVCAcRFAcGERMGBRESBQQREQQDERADT+1xAaYQagkRJwkIESUIEFcGESUGBRElBREn2zwwERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVd3ED6i+kLMAKkX+TLMAL4o4SLMAMkSmZLMANkSmSKbPi4hES4w2BAQH4I3D4Qm1WEgRWEQRWEwRWEgRWEgRWEgRWEgRWHlFPVTDIVcDbPMkCERUCVhMBIG6VMFn0WjCUQTP0FeIQvBAnVhEHEDYFERMFBAIREwJQD3KacwDMKbNxJ8IAkybCAJFw4pIwct4lwgCTJMIAkXDikaTeI4EBAQKpBFRogFRogMhVQFBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAhEUAlYTASBulTBZ9FowlEEz9BXiAVYQaBBXEEYQNUQwyFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABQQDdADqghByY2FdAREQyx8eywccyz9QCiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhjKABaBAQHPABSBAQHPAALIgQEBzwDKABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwBQA/oCE4EBAc8A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');
    const __system = Cell.fromBase64('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GhEUERMRGRETERIRGBESERERFxERERARFhEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREbCQgRGggHERkHBgURFwUEERYEAxEbAwIRGgJWFwJWG9s84w0RExEZERMREhEYERIREREXEREREBEWERCvWlkATA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQOUh2AcIxERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRGggHERkHBhEYBgUEERYEAxEVAwIRGgIBERkBVhYBVhZWG9s8rwLygUtpCFYcvhjy9C2BAQErWfQNb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG6zjycgbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4pRfAzIz4w2TMDIz4l5cAfyADvhCcFRwACARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERgRFxEnERcRFhEmERYRFRElERURFBEkERQRExEjERMREhEiERIREREhEREREBEgERAPEScPDhEmDg0RJQ0MESQMViEMEHtdAaYQagkRJwkIESUIEFcGESUGBRElBREn2zwwERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVd54B/oAN+EJwVHAAIBEcESkRHBEbESgRGxEaEScRGhEZESYRGREYESURGBEXESQRFxEWESMRFhEVESIRFREUESERFBETESARExESER8REhERER4REREQER0REA8RKQ8OESgODREnDQwRJgwLESULChEkCgkRIwlWIAkQeBBnVh4HVipfAcwHBgURKAUEEScEAwIRKAIBEScBVifbPDARExEgERMREhEfERIREREeEREREBEdERAPERwPDhEbDg0RGg0MERkMCxEYCwoRFwoJERYJCBEVCAcRFAcGERMGBRESBQQREQQDERADT+2eBPaNBhFeGVjdXRlUGVycFBvc2l0aW9uT3JkZXKD+FDD4QW8kE18DK4EBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bKsAKkX+TKsAL4uMPgV5tERSzAREUAfL0ggDKxxEhVhy6AREhAfL0+EK+ZmVhAv4PERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHYAURIAUQNBAjAhEdAts8ggCg9wHy9FYbwAqRf5RWG8AM4p2BQYxWHVYVoPgjvPL03lYibrOXESIgbvLQgJRXIvhC4vhCf4EBAVYeBVYeBVYeBVYeBVYeBVYej2ID/gVWHgVWHgUEESoEAxEnAwIRKgLIVcDbPMkQIwERGwFWIAEgbpUwWfRaMJRBM/QV4ggRHggHERgHBhEdBgURFgUEERcEAxEVAwIRFAIBERMBERJwERKAQBEdfxEdEHkQZxBWEEUQNBAjyFWw2zzJVEEUEDoCERQCERMBFEMwbW28ZGMBQts8BBETBAMREgMCERECAREQAQ8QXQwQO0kaCBA3RhVAFMEAuIIQ/1flV1ANyx8byz8ZywcXyz9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhPKAIEBAc8AgQEBzwAByIEBAc8AEsoAEss/EoEBAc8AEoEBAc8AyQHMAfKBS2lWI6oAViKgERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPAERFQGgghAF9eEAoAERIQG+AREUAfL0hgHkgUtpViOqAFYioBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zwBERUBoAERIQG+AREUAfL0hgCW0x8BghCd+g7YuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/TP9M/gQEB1wCBAQHXAFVQAu74QW8kE18DKIEBASRZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bbDM0NSXACpF/kyXAC+KOFIFLaVYbVhqgghAF9eEAoBi+F/L0nYFLaVYbVhqgGL4X8vTigV5tArMS8vT4QhEUERwRFL5pA/wRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRHAQDERsDAhEaAgERGQHbPIIAoPchkX+X+EJWHAHHBeLy9LOcVhvACpF/lFYbwAzikXDiklca4w2PbWoE9PhCVhdus5owERYgbvLQgBEWklcX4oEBAW0gbpIwbY6NIG7y0IBvLchVwNs8yeIQJVYXASBulTBZ9FowlEEz9BXiVhrACpF/lFYawAvilFcXVxfjDVYRwgCOkAERFAF/ARESchAjbW1t2zyUVxFXE+ICERYCARERAREQvGzBawGwyFUgghCAPmF1UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIMERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMEDtKkBBIFURAE3DbPKYB5PhCERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBcQNhAlAxEaA1YaAwIRGQIRGgHbPBEXAhEWAgQRFQQEERMEERICERECBBEQBE4fEE1LHBBKSBkQR0UWA68AJIIAmxcRG1YToPgjuwERGwHy9AL0ERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsRGwsKERoKCREZCQgRGAgHERcHBhEWBgURFQUEERQEAxEbAwIRGgIBERkBERjbPPhBbyQwMYFLaTJWGaFWElYRoL7y9IFf8lYYVhO+8vRwVhWTbwP8wgCUVhzCAJFw4pIwcd5WG8IAlFYawgCRcOKRpN5WFcIAlFYcwgCRcOKUVxVXG+MNVhnCAJRWGMIAkXDijhYFERkFBBEYBAMRFwMCERUCVxNXE18E4w34Qg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMEDtKkBBIc3FwARgQNxAmEEUQNEMA2zymAfyADvhCcFRwACBWHQERG6kEERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH4NESENEJwQaxBaEHkIESEIEEdyAVIQNEEw2zwwERQGERMGBRESBQQREQQREBA/TtAQbBBbEEoJEDhAZxUUE54B/oAN+EJwVHAAIFYfKKkEERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmlYhChCJEHhWIAhWIAhGFwURJwV0ATBDFAIRJwIBESfbPDARGhETERIREREQVeCeAD7THwGCECPHL1i68uCB+gDTP9IA03/Tf9N/03/TP1VwAvYRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERoMCxEZCwoRGAoJERcJCBEWCAcRFQcGERQGBREaBQQRGQQDERgDAhEXAgERFgERFds8+EFvJDAxgUtpMlYWoVYSVhGgvvL0gV/yVhVWE77y9IAM+EKTdwL+cFRwABEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEJsQWhBJCBEgCBBFViDbPDD4QhEUERURFBETERQRE554ATQREhETERIRERESEREREBERERAPERAPVQ7bPKYAOtMfAYIQapI927ry4IH6ANM/0gDTf9N/03/TP1VgAs74QW8kE18DggCg9/hCVhIBxwXy9CqBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8obCIzJJqBS2kGVhq+FvL0jhGBS2lWGoIQBfXhAKAXvhby9OKBAQFtxXsEeiBukjBtjo0gbvLQgG8oyFVw2zzJ4gIREAJSkCBulTBZ9FowlEEz9BXiJsIAkjI14w34J28Q2zz+FDAswgDDfn18A8KOjRJ/UA1yECNtbW3bPAqSMjvi+CdvENs8/hQwCpFxkXLiQDPIVSCCELMFX9RQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wAgbrOOiCBu8tCAcNs8kTDiwX2mAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydAC+BEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRGwkIBxEZBwYRGAYFERcFBBEWBAMRGwMCVhcCERkBVhnbPBETERkRExESERgREhERERcREREQERYREA8RFQ+vfwA4DhEUDg0REw0MERIMCxERCwoREAoQnxCOEH1VVQGIMNMfAYIQEoa5i7ry4IHTP9M/+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4kMwbBPbPH+BBPD4QW8kE18DKoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbJeMPgV5tERizAREYAfL0+EIREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlAEERcEAxEWAxLFhYSCA+oBERUB2zyCAKD3AfL0gUGMVhhWFaD4I7zy9FYUbrOXERQgbvLQgJRXFPhC4vhCf4EBAVYeBVYeBVYeBQQRHgQDER0DAhEeAshVcNs8yRAlAREWAVYVASBulTBZ9FowlEEz9BXiAREYARETcBETgEARGX8RGViPw4MByMhVQIIQ6JzUX1AGyx8UygASyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDLP8koBAMREgMCERcCERYBFEMwbW3bPAsREwsKERIKCRERCQgREAhVd0VwVQPBAfKBS2lWG6oAVhqgERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKERYKCREVCQgRFAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPAERGQGgghAF9eEAoAERFAG+AREYAfL0hgHkgUtpVhuqAFYaoBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEWCgkRFQkIERQIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREY2zwBERkBoAERFAG+AREYAfL0hgEW+EFvJNs8VhCgL6CHAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAALs+EFvJBNfAyqBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8oWyWOFIFLaVYbVhqgghAF9eEAoBi+F/L0nYFLaVYbVhqgGL4X8vTigV5tBrMW8vT4QhEUERwRFBETERsRExESERoREsWJBPoREREZEREREBEYERAPERcPDhEWDg0RFQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRHAQDERsDAhEaAgERGQHbPIIAoPchkX+X+EJWHQHHBeLy9LOOEoIAmxcRFVYToPgjuwERFQHy9JJXFOL4QlYVbrPjD4+OjYoE9IEBAW0gbpIwbY6NIG7y0IBvKMhVcNs8yeIQJ1YYASBulTBZ9FowlEEz9BXiVhqUVxhXGOMNVhXCAI6WARESAX8BERZyECNtbW3bPBEQERMREJRXElcU4hEWkXGRcuICARESARERyFUgghBLZYrAUATLHxLLB8s/yz/Jw4zBiwGIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIMERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMEDtKkBB4ECcQRhVw2zymAdz4QhETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehkQWBBHEDZeIiMQNAIRGgIRGwHbPAIRFwIGERYGAhETAgYREgYREQIREAIQb00eEGxKGxBpRxhFFVBEA68ABFcVABQwERQgbvLQgBEUAECBAQsrAnFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgALyERMRFhETERIRFRESERERFBERERARFhEQDxEVDw4RFA4NERYNDBEVDAsRFAsKERYKCREVCQgRFAgHERYHBhEVBgURFAUEERYEAxEVAwIRFAIBERYBERXbPPhBbyQwMYFLaTJWFqFWElYRoL7y9IFf8lYVVhO+8vQlpJORA/yBAQFw+EL4I3D4Qm1WHgRWHUQ0yFVw2zzJKBA6ASBulTBZ9FowlEEz9BXicvhCUEMCERkCVhcCERkZyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK3Dp5IBJhCcEIsQehBpEGgQVxA2RQQC2zymABCCAJ2wK7Py9AT0Lo/1MBEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkRFggHBlVAVhZWF9s8f3CAQogEERgEEDRtbds8ERIRExESEREREhERERAREREQDxEQD1UO4CyvrsGVAv6O2xETERcRExESERYREhERERUREREQERQREA8RFw8OERYODREVDQwRFAwLERcLChEWCgkRFQkIERQIBxEXBwYRFgYFERUFBBEUBAMRFwMCERYCAREVAREUVhXbPLOOHwMRFwMCERYCAREVAREUAxETAwIREgIBEREBERBVs3DirZYE8o/sVxSNBBub3QgaW4gd2hpdGVsaXN0g/hQwERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKxIBERYBVhZWF9s8f3CAQogEERgEEDRtbds8ERIRExESEREREhERERAREREQDxEQD1UO4BEU1DDQ0x8hwAGvrMGXApyOyjHTf/oAMBEUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGANs84w6kmAOcAcACj0cwcIBAcG0jyMnQBREcBQQRGwRWGgQRG1UgyFVg2zzJLQQDERgDAhEXAhEWARRDMG1t2zwPERMPDhESDg0REQ0MERAMVTtDMOMNsMGZAfz6ANIAAcD/AdM/0gABwP8B03/Tf9P/1DDQ03/T/9N/0/8wER0RIREdERwRIBEcERsRHxEbERoRHhEaERkRHREZERgRHBEYERcRGxEXERYRGhEWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg6aARgNERENDBEQDBC/2zybA/b4QW8kE18DiwhwLVYioFYgoBO5jhJbf4vmdhcyBub3QgZW5vdWdojeU+i5jhZbf40EWpldHRvbiBub3QgZW5vdWdog3nEmwgCTJcIAkXDikjBy3iTCAJMjwgCRcOKRpN5WIgGoUtC54wAB4wIwPAiRepKAC+IRHhEgER6jopwC/BEdER8RHREcESARHBEbER8RGxEaESARGhEZER8RGREYESARGBEXER8RFxEWESARFhEVER8RFREUESARFBET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');
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
    {"name":"UpdateConfig","header":49447017,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateWhitelist","header":1331445576,"fields":[{"name":"enableWhitelist","type":{"kind":"simple","type":"bool","optional":true}},{"name":"whitelistLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"whitelist","type":{"kind":"dict","key":"int","value":"UpdateWhitelistParam","valueFormat":"ref"}}]},
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
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"maxTimeDelayExecutor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTimeDelayTrader","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usdtWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WhitelistData","header":null,"fields":[{"name":"enableWhitelist","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isInWhitelist","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"UpdateWhitelistParam","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LPPositionOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpPositionOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tpPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"slPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"whitelistData","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"WhitelistData","optional":false}},
    {"name":"lpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LPPositionOrder","optional":true}},
    {"name":"lpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"perpPositionOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PerpPositionOrder","optional":true}},
    {"name":"perpPositionOrderIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const OrderBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateWhitelist"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateWhitelist | TokenNotification | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | CreateDecreasePerpPositionOrder | CreateTpSlPerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | CancelCompensate | ExecuteCompensate | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateWhitelist') {
            body = beginCell().store(storeUpdateWhitelist(message)).endCell();
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
    
    async getWhitelistData(provider: ContractProvider, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('whitelistData', builder.build())).stack;
        const result = loadTupleWhitelistData(source);
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