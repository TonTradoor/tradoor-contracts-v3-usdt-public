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
    executor: Address | null;
    enableExecutor: boolean | null;
    gasConsumption: bigint | null;
    minTonsForStorage: bigint | null;
    lpLockTime: bigint | null;
    lpBonusFactor: bigint | null;
    lpLiquidityFactor: bigint | null;
    orderBook: Address | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(198381229, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
        if (src.gasConsumption !== null && src.gasConsumption !== undefined) { b_0.storeBit(true).storeCoins(src.gasConsumption); } else { b_0.storeBit(false); }
        if (src.minTonsForStorage !== null && src.minTonsForStorage !== undefined) { b_0.storeBit(true).storeCoins(src.minTonsForStorage); } else { b_0.storeBit(false); }
        if (src.lpLockTime !== null && src.lpLockTime !== undefined) { b_0.storeBit(true).storeInt(src.lpLockTime, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.lpBonusFactor !== null && src.lpBonusFactor !== undefined) { b_1.storeBit(true).storeInt(src.lpBonusFactor, 257); } else { b_1.storeBit(false); }
        if (src.lpLiquidityFactor !== null && src.lpLiquidityFactor !== undefined) { b_1.storeBit(true).storeInt(src.lpLiquidityFactor, 257); } else { b_1.storeBit(false); }
        b_1.storeAddress(src.orderBook);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 198381229) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _gasConsumption = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _minTonsForStorage = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _lpLockTime = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpBonusFactor = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _lpLiquidityFactor = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _orderBook = sc_1.loadMaybeAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executor = source.readAddressOpt();
    let _enableExecutor = source.readBooleanOpt();
    let _gasConsumption = source.readBigNumberOpt();
    let _minTonsForStorage = source.readBigNumberOpt();
    let _lpLockTime = source.readBigNumberOpt();
    let _lpBonusFactor = source.readBigNumberOpt();
    let _lpLiquidityFactor = source.readBigNumberOpt();
    let _orderBook = source.readAddressOpt();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enableExecutor);
    builder.writeNumber(source.gasConsumption);
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
    name: string | null;
    enable: boolean | null;
    minMargin: bigint | null;
    maxLeverage: bigint | null;
    liquidationFee: bigint | null;
    tradingFeeRate: bigint | null;
    lpTradingFeeRate: bigint | null;
    interestRate: bigint | null;
    maxFundingRate: bigint | null;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1775519856, 32);
        b_0.storeUint(src.tokenId, 64);
        if (src.name !== null && src.name !== undefined) { b_0.storeBit(true).storeStringRefTail(src.name); } else { b_0.storeBit(false); }
        if (src.enable !== null && src.enable !== undefined) { b_0.storeBit(true).storeBit(src.enable); } else { b_0.storeBit(false); }
        if (src.minMargin !== null && src.minMargin !== undefined) { b_0.storeBit(true).storeInt(src.minMargin, 257); } else { b_0.storeBit(false); }
        if (src.maxLeverage !== null && src.maxLeverage !== undefined) { b_0.storeBit(true).storeInt(src.maxLeverage, 257); } else { b_0.storeBit(false); }
        if (src.liquidationFee !== null && src.liquidationFee !== undefined) { b_0.storeBit(true).storeInt(src.liquidationFee, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.tradingFeeRate !== null && src.tradingFeeRate !== undefined) { b_1.storeBit(true).storeInt(src.tradingFeeRate, 257); } else { b_1.storeBit(false); }
        if (src.lpTradingFeeRate !== null && src.lpTradingFeeRate !== undefined) { b_1.storeBit(true).storeInt(src.lpTradingFeeRate, 257); } else { b_1.storeBit(false); }
        if (src.interestRate !== null && src.interestRate !== undefined) { b_1.storeBit(true).storeInt(src.interestRate, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.maxFundingRate !== null && src.maxFundingRate !== undefined) { b_2.storeBit(true).storeInt(src.maxFundingRate, 257); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1775519856) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _name = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _enable = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minMargin = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _maxLeverage = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _liquidationFee = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _tradingFeeRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _lpTradingFeeRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _interestRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _maxFundingRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleUpdateTokenConfig(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _name = source.readStringOpt();
    let _enable = source.readBooleanOpt();
    let _minMargin = source.readBigNumberOpt();
    let _maxLeverage = source.readBigNumberOpt();
    let _liquidationFee = source.readBigNumberOpt();
    let _tradingFeeRate = source.readBigNumberOpt();
    let _lpTradingFeeRate = source.readBigNumberOpt();
    let _interestRate = source.readBigNumberOpt();
    let _maxFundingRate = source.readBigNumberOpt();
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function storeTupleUpdateTokenConfig(source: UpdateTokenConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minMargin);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    builder.writeNumber(source.interestRate);
    builder.writeNumber(source.maxFundingRate);
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

export type UpdateLPPosition = {
    $$type: 'UpdateLPPosition';
    isIncrease: boolean;
    orderId: bigint;
    account: Address;
    liquidityDelta: bigint;
    trxId: bigint;
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePriceParam>;
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
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam());
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
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), sc_0);
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdateLPPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), source.readCellOpt());
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
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam()).endCell() : null);
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
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePriceParam>;
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
        b_1.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam());
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
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), sc_1);
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
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), source.readCellOpt());
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
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam()).endCell() : null);
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

export type SetPremiumRateSampleRange = {
    $$type: 'SetPremiumRateSampleRange';
    sampleRangeLength: bigint;
    sampleRanges: Dictionary<bigint, PremiumRateSampleRangeParam>;
}

export function storeSetPremiumRateSampleRange(src: SetPremiumRateSampleRange) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(591847055, 32);
        b_0.storeUint(src.sampleRangeLength, 64);
        b_0.storeDict(src.sampleRanges, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSampleRangeParam());
    };
}

export function loadSetPremiumRateSampleRange(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 591847055) { throw Error('Invalid prefix'); }
    let _sampleRangeLength = sc_0.loadUintBig(64);
    let _sampleRanges = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSampleRangeParam(), sc_0);
    return { $$type: 'SetPremiumRateSampleRange' as const, sampleRangeLength: _sampleRangeLength, sampleRanges: _sampleRanges };
}

function loadTupleSetPremiumRateSampleRange(source: TupleReader) {
    let _sampleRangeLength = source.readBigNumber();
    let _sampleRanges = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSampleRangeParam(), source.readCellOpt());
    return { $$type: 'SetPremiumRateSampleRange' as const, sampleRangeLength: _sampleRangeLength, sampleRanges: _sampleRanges };
}

function storeTupleSetPremiumRateSampleRange(source: SetPremiumRateSampleRange) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.sampleRangeLength);
    builder.writeCell(source.sampleRanges.size > 0 ? beginCell().storeDictDirect(source.sampleRanges, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSampleRangeParam()).endCell() : null);
    return builder.build();
}

function dictValueParserSetPremiumRateSampleRange(): DictionaryValue<SetPremiumRateSampleRange> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetPremiumRateSampleRange(src)).endCell());
        },
        parse: (src) => {
            return loadSetPremiumRateSampleRange(src.loadRef().beginParse());
        }
    }
}

export type DeviationRate = {
    $$type: 'DeviationRate';
    deviationRate: bigint;
}

export function storeDeviationRate(src: DeviationRate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(769006232, 32);
        b_0.storeInt(src.deviationRate, 257);
    };
}

export function loadDeviationRate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 769006232) { throw Error('Invalid prefix'); }
    let _deviationRate = sc_0.loadIntBig(257);
    return { $$type: 'DeviationRate' as const, deviationRate: _deviationRate };
}

function loadTupleDeviationRate(source: TupleReader) {
    let _deviationRate = source.readBigNumber();
    return { $$type: 'DeviationRate' as const, deviationRate: _deviationRate };
}

function storeTupleDeviationRate(source: DeviationRate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.deviationRate);
    return builder.build();
}

function dictValueParserDeviationRate(): DictionaryValue<DeviationRate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeviationRate(src)).endCell());
        },
        parse: (src) => {
            return loadDeviationRate(src.loadRef().beginParse());
        }
    }
}

export type LPPositionIncreasedEvent = {
    $$type: 'LPPositionIncreasedEvent';
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
    trxId: bigint;
}

export function storeLPPositionIncreasedEvent(src: LPPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(528848591, 32);
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
        b_2.storeUint(src.trxId, 64);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 528848591) { throw Error('Invalid prefix'); }
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
    let _trxId = sc_2.loadUintBig(64);
    return { $$type: 'LPPositionIncreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFeeDelta: _realizedFundingFeeDelta, realizedFundingFeeAfter: _realizedFundingFeeAfter, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
}

function loadTupleLPPositionIncreasedEvent(source: TupleReader) {
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
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionIncreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFeeDelta: _realizedFundingFeeDelta, realizedFundingFeeAfter: _realizedFundingFeeAfter, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
}

function storeTupleLPPositionIncreasedEvent(source: LPPositionIncreasedEvent) {
    let builder = new TupleBuilder();
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
    builder.writeNumber(source.trxId);
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
    trxId: bigint;
}

export function storeLPPositionDecreasedEvent(src: LPPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(88850873, 32);
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
        b_2.storeUint(src.trxId, 64);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 88850873) { throw Error('Invalid prefix'); }
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
    let _trxId = sc_2.loadUintBig(64);
    return { $$type: 'LPPositionDecreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
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
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionDecreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
}

function storeTupleLPPositionDecreasedEvent(source: LPPositionDecreasedEvent) {
    let builder = new TupleBuilder();
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
    builder.writeNumber(source.trxId);
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

export type GlobalLPLiquidityChangedEvent = {
    $$type: 'GlobalLPLiquidityChangedEvent';
    lpFundAfter: bigint;
    liquidityAfter: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    realizedPnl: bigint;
    trxId: bigint;
}

export function storeGlobalLPLiquidityChangedEvent(src: GlobalLPLiquidityChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(185778578, 32);
        b_0.storeInt(src.lpFundAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        b_0.storeInt(src.tradingFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.fundingFee, 257);
        b_1.storeInt(src.realizedPnl, 257);
        b_1.storeUint(src.trxId, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalLPLiquidityChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 185778578) { throw Error('Invalid prefix'); }
    let _lpFundAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let _tradingFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fundingFee = sc_1.loadIntBig(257);
    let _realizedPnl = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadUintBig(64);
    return { $$type: 'GlobalLPLiquidityChangedEvent' as const, lpFundAfter: _lpFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, realizedPnl: _realizedPnl, trxId: _trxId };
}

function loadTupleGlobalLPLiquidityChangedEvent(source: TupleReader) {
    let _lpFundAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _realizedPnl = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalLPLiquidityChangedEvent' as const, lpFundAfter: _lpFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, realizedPnl: _realizedPnl, trxId: _trxId };
}

function storeTupleGlobalLPLiquidityChangedEvent(source: GlobalLPLiquidityChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.realizedPnl);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserGlobalLPLiquidityChangedEvent(): DictionaryValue<GlobalLPLiquidityChangedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalLPLiquidityChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPLiquidityChangedEvent(src.loadRef().beginParse());
        }
    }
}

export type GlobalLPPositionChangedEvent = {
    $$type: 'GlobalLPPositionChangedEvent';
    tokenId: bigint;
    netSizeAfter: bigint;
    isLong: boolean;
    entryPriceAfter: bigint;
    trxId: bigint;
}

export function storeGlobalLPPositionChangedEvent(src: GlobalLPPositionChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4133122195, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.netSizeAfter, 257);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.entryPriceAfter, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadGlobalLPPositionChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4133122195) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _netSizeAfter = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let _entryPriceAfter = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'GlobalLPPositionChangedEvent' as const, tokenId: _tokenId, netSizeAfter: _netSizeAfter, isLong: _isLong, entryPriceAfter: _entryPriceAfter, trxId: _trxId };
}

function loadTupleGlobalLPPositionChangedEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _netSizeAfter = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPriceAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalLPPositionChangedEvent' as const, tokenId: _tokenId, netSizeAfter: _netSizeAfter, isLong: _isLong, entryPriceAfter: _entryPriceAfter, trxId: _trxId };
}

function storeTupleGlobalLPPositionChangedEvent(source: GlobalLPPositionChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.netSizeAfter);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.entryPriceAfter);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserGlobalLPPositionChangedEvent(): DictionaryValue<GlobalLPPositionChangedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalLPPositionChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPPositionChangedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionIncreasedEvent = {
    $$type: 'PerpPositionIncreasedEvent';
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
    trxId: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(15026030, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.marginAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.sizeAfter, 257);
        b_1.storeInt(src.tradePrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.entryPrice, 257);
        b_2.storeInt(src.fundingFee, 257);
        b_2.storeInt(src.tradingFee, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_3.storeUint(src.trxId, 64);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 15026030) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _marginAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _sizeDelta = sc_1.loadIntBig(257);
    let _sizeAfter = sc_1.loadIntBig(257);
    let _tradePrice = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _entryPrice = sc_2.loadIntBig(257);
    let _fundingFee = sc_2.loadIntBig(257);
    let _tradingFee = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let _trxId = sc_3.loadUintBig(64);
    return { $$type: 'PerpPositionIncreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
}

function loadTuplePerpPositionIncreasedEvent(source: TupleReader) {
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
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
}

function storeTuplePerpPositionIncreasedEvent(source: PerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
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
    builder.writeNumber(source.trxId);
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
    trxId: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2650649001, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.marginAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.sizeAfter, 257);
        b_1.storeInt(src.tradePrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.realizedPnLDelta, 257);
        b_2.storeInt(src.fundingFee, 257);
        b_2.storeInt(src.tradingFee, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_3.storeInt(src.receive, 257);
        b_3.storeUint(src.trxId, 64);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2650649001) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _marginAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _sizeDelta = sc_1.loadIntBig(257);
    let _sizeAfter = sc_1.loadIntBig(257);
    let _tradePrice = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _realizedPnLDelta = sc_2.loadIntBig(257);
    let _fundingFee = sc_2.loadIntBig(257);
    let _tradingFee = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let _receive = sc_3.loadIntBig(257);
    let _trxId = sc_3.loadUintBig(64);
    return { $$type: 'PerpPositionDecreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
}

function loadTuplePerpPositionDecreasedEvent(source: TupleReader) {
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
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
}

function storeTuplePerpPositionDecreasedEvent(source: PerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
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
    builder.writeNumber(source.trxId);
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

export type GlobalPositionChangedEvent = {
    $$type: 'GlobalPositionChangedEvent';
    tokenId: bigint;
    longMarginAfter: bigint;
    shortMarginAfter: bigint;
    longSizeAfter: bigint;
    shortSizeAfter: bigint;
    longFundingFeeGrowthAfter: bigint;
    shortFundingFeeGrowthAfter: bigint;
    trxId: bigint;
}

export function storeGlobalPositionChangedEvent(src: GlobalPositionChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2196054124, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.longMarginAfter, 257);
        b_0.storeInt(src.shortMarginAfter, 257);
        b_0.storeInt(src.longSizeAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortSizeAfter, 257);
        b_1.storeInt(src.longFundingFeeGrowthAfter, 257);
        b_1.storeInt(src.shortFundingFeeGrowthAfter, 257);
        b_1.storeUint(src.trxId, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalPositionChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2196054124) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _longMarginAfter = sc_0.loadIntBig(257);
    let _shortMarginAfter = sc_0.loadIntBig(257);
    let _longSizeAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortSizeAfter = sc_1.loadIntBig(257);
    let _longFundingFeeGrowthAfter = sc_1.loadIntBig(257);
    let _shortFundingFeeGrowthAfter = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadUintBig(64);
    return { $$type: 'GlobalPositionChangedEvent' as const, tokenId: _tokenId, longMarginAfter: _longMarginAfter, shortMarginAfter: _shortMarginAfter, longSizeAfter: _longSizeAfter, shortSizeAfter: _shortSizeAfter, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter, trxId: _trxId };
}

function loadTupleGlobalPositionChangedEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _longMarginAfter = source.readBigNumber();
    let _shortMarginAfter = source.readBigNumber();
    let _longSizeAfter = source.readBigNumber();
    let _shortSizeAfter = source.readBigNumber();
    let _longFundingFeeGrowthAfter = source.readBigNumber();
    let _shortFundingFeeGrowthAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalPositionChangedEvent' as const, tokenId: _tokenId, longMarginAfter: _longMarginAfter, shortMarginAfter: _shortMarginAfter, longSizeAfter: _longSizeAfter, shortSizeAfter: _shortSizeAfter, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter, trxId: _trxId };
}

function storeTupleGlobalPositionChangedEvent(source: GlobalPositionChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.longMarginAfter);
    builder.writeNumber(source.shortMarginAfter);
    builder.writeNumber(source.longSizeAfter);
    builder.writeNumber(source.shortSizeAfter);
    builder.writeNumber(source.longFundingFeeGrowthAfter);
    builder.writeNumber(source.shortFundingFeeGrowthAfter);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserGlobalPositionChangedEvent(): DictionaryValue<GlobalPositionChangedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalPositionChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalPositionChangedEvent(src.loadRef().beginParse());
        }
    }
}

export type UpdatePriceEvent = {
    $$type: 'UpdatePriceEvent';
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePriceParam>;
}

export function storeUpdatePriceEvent(src: UpdatePriceEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1616417891, 32);
        b_0.storeUint(src.pricesLength, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam());
    };
}

export function loadUpdatePriceEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1616417891) { throw Error('Invalid prefix'); }
    let _pricesLength = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), sc_0);
    return { $$type: 'UpdatePriceEvent' as const, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdatePriceEvent(source: TupleReader) {
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam(), source.readCellOpt());
    return { $$type: 'UpdatePriceEvent' as const, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleUpdatePriceEvent(source: UpdatePriceEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePriceParam()).endCell() : null);
    return builder.build();
}

function dictValueParserUpdatePriceEvent(): DictionaryValue<UpdatePriceEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePriceEvent(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePriceEvent(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    gasConsumption: bigint;
    minTonsForStorage: bigint;
    lpLockTime: bigint;
    lpBonusFactor: bigint;
    lpLiquidityFactor: bigint;
    orderBook: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.isExecutor !== null && src.isExecutor !== undefined) { b_0.storeBit(true).storeBit(src.isExecutor); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.gasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeInt(src.lpLockTime, 257);
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
    let _gasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _lpLockTime = sc_0.loadIntBig(257);
    let _lpBonusFactor = sc_0.loadIntBig(257);
    let _lpLiquidityFactor = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _orderBook = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _lpLockTime = source.readBigNumber();
    let _lpBonusFactor = source.readBigNumber();
    let _lpLiquidityFactor = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.lpLockTime);
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

export type TokenConfig = {
    $$type: 'TokenConfig';
    name: string;
    enable: boolean;
    minMargin: bigint;
    maxLeverage: bigint;
    liquidationFee: bigint;
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
        b_0.storeInt(src.minMargin, 257);
        b_0.storeInt(src.maxLeverage, 257);
        b_0.storeInt(src.liquidationFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityProportion, 257);
        b_1.storeInt(src.tradingFeeRate, 257);
        b_1.storeInt(src.lpTradingFeeRate, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.interestRate, 257);
        b_2.storeInt(src.maxFundingRate, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _minMargin = sc_0.loadIntBig(257);
    let _maxLeverage = sc_0.loadIntBig(257);
    let _liquidationFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityProportion = sc_1.loadIntBig(257);
    let _tradingFeeRate = sc_1.loadIntBig(257);
    let _lpTradingFeeRate = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _interestRate = sc_2.loadIntBig(257);
    let _maxFundingRate = sc_2.loadIntBig(257);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minMargin = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _liquidityProportion = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minMargin);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
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

export type TokenConfigData = {
    $$type: 'TokenConfigData';
    tokenIdNext: bigint;
    tokenConfig: TokenConfig | null;
}

export function storeTokenConfigData(src: TokenConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tokenIdNext, 64);
        if (src.tokenConfig !== null && src.tokenConfig !== undefined) { b_0.storeBit(true); b_0.store(storeTokenConfig(src.tokenConfig)); } else { b_0.storeBit(false); }
    };
}

export function loadTokenConfigData(slice: Slice) {
    let sc_0 = slice;
    let _tokenIdNext = sc_0.loadUintBig(64);
    let _tokenConfig = sc_0.loadBit() ? loadTokenConfig(sc_0) : null;
    return { $$type: 'TokenConfigData' as const, tokenIdNext: _tokenIdNext, tokenConfig: _tokenConfig };
}

function loadTupleTokenConfigData(source: TupleReader) {
    let _tokenIdNext = source.readBigNumber();
    const _tokenConfig_p = source.readTupleOpt();
    const _tokenConfig = _tokenConfig_p ? loadTupleTokenConfig(_tokenConfig_p) : null;
    return { $$type: 'TokenConfigData' as const, tokenIdNext: _tokenIdNext, tokenConfig: _tokenConfig };
}

function storeTupleTokenConfigData(source: TokenConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenIdNext);
    if (source.tokenConfig !== null && source.tokenConfig !== undefined) {
        builder.writeTuple(storeTupleTokenConfig(source.tokenConfig));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserTokenConfigData(): DictionaryValue<TokenConfigData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenConfigData(src)).endCell());
        },
        parse: (src) => {
            return loadTokenConfigData(src.loadRef().beginParse());
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
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_2.storeBit(true); b_2.store(storeGlobalPosition(src.globalPosition)); } else { b_2.storeBit(false); }
        let b_3 = new Builder();
        b_3.storeInt(src.globalPerpNetValue, 257);
        b_3.storeInt(src.globalPerpSingleValue, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _perpPosition = sc_0.loadBit() ? loadDirectionPerpPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalLPPosition = sc_1.loadBit() ? loadGlobalLPPosition(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _globalPosition = sc_2.loadBit() ? loadGlobalPosition(sc_2) : null;
    let sc_3 = sc_2.loadRef().beginParse();
    let _globalPerpNetValue = sc_3.loadIntBig(257);
    let _globalPerpSingleValue = sc_3.loadIntBig(257);
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function loadTuplePerpPositionData(source: TupleReader) {
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    let _globalPerpNetValue = source.readBigNumber();
    let _globalPerpSingleValue = source.readBigNumber();
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function storeTuplePerpPositionData(source: PerpPositionData) {
    let builder = new TupleBuilder();
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
    builder.writeNumber(source.globalPerpNetValue);
    builder.writeNumber(source.globalPerpSingleValue);
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

export type PriceData = {
    $$type: 'PriceData';
    price: bigint;
}

export function storePriceData(src: PriceData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.price, 257);
    };
}

export function loadPriceData(slice: Slice) {
    let sc_0 = slice;
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'PriceData' as const, price: _price };
}

function loadTuplePriceData(source: TupleReader) {
    let _price = source.readBigNumber();
    return { $$type: 'PriceData' as const, price: _price };
}

function storeTuplePriceData(source: PriceData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserPriceData(): DictionaryValue<PriceData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePriceData(src)).endCell());
        },
        parse: (src) => {
            return loadPriceData(src.loadRef().beginParse());
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

export type PremiumRateSampleRange = {
    $$type: 'PremiumRateSampleRange';
    sampleLength: bigint;
    samples: Dictionary<bigint, PremiumRateSample>;
}

export function storePremiumRateSampleRange(src: PremiumRateSampleRange) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.sampleLength, 257);
        b_0.storeDict(src.samples, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample());
    };
}

export function loadPremiumRateSampleRange(slice: Slice) {
    let sc_0 = slice;
    let _sampleLength = sc_0.loadIntBig(257);
    let _samples = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample(), sc_0);
    return { $$type: 'PremiumRateSampleRange' as const, sampleLength: _sampleLength, samples: _samples };
}

function loadTuplePremiumRateSampleRange(source: TupleReader) {
    let _sampleLength = source.readBigNumber();
    let _samples = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample(), source.readCellOpt());
    return { $$type: 'PremiumRateSampleRange' as const, sampleLength: _sampleLength, samples: _samples };
}

function storeTuplePremiumRateSampleRange(source: PremiumRateSampleRange) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.sampleLength);
    builder.writeCell(source.samples.size > 0 ? beginCell().storeDictDirect(source.samples, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample()).endCell() : null);
    return builder.build();
}

function dictValueParserPremiumRateSampleRange(): DictionaryValue<PremiumRateSampleRange> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePremiumRateSampleRange(src)).endCell());
        },
        parse: (src) => {
            return loadPremiumRateSampleRange(src.loadRef().beginParse());
        }
    }
}

export type PremiumRateSampleRangeParam = {
    $$type: 'PremiumRateSampleRangeParam';
    sampleId: bigint;
    sampleLength: bigint;
    samples: Dictionary<bigint, PremiumRateSample>;
}

export function storePremiumRateSampleRangeParam(src: PremiumRateSampleRangeParam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.sampleId, 257);
        b_0.storeInt(src.sampleLength, 257);
        b_0.storeDict(src.samples, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample());
    };
}

export function loadPremiumRateSampleRangeParam(slice: Slice) {
    let sc_0 = slice;
    let _sampleId = sc_0.loadIntBig(257);
    let _sampleLength = sc_0.loadIntBig(257);
    let _samples = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample(), sc_0);
    return { $$type: 'PremiumRateSampleRangeParam' as const, sampleId: _sampleId, sampleLength: _sampleLength, samples: _samples };
}

function loadTuplePremiumRateSampleRangeParam(source: TupleReader) {
    let _sampleId = source.readBigNumber();
    let _sampleLength = source.readBigNumber();
    let _samples = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample(), source.readCellOpt());
    return { $$type: 'PremiumRateSampleRangeParam' as const, sampleId: _sampleId, sampleLength: _sampleLength, samples: _samples };
}

function storeTuplePremiumRateSampleRangeParam(source: PremiumRateSampleRangeParam) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.sampleId);
    builder.writeNumber(source.sampleLength);
    builder.writeCell(source.samples.size > 0 ? beginCell().storeDictDirect(source.samples, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample()).endCell() : null);
    return builder.build();
}

function dictValueParserPremiumRateSampleRangeParam(): DictionaryValue<PremiumRateSampleRangeParam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePremiumRateSampleRangeParam(src)).endCell());
        },
        parse: (src) => {
            return loadPremiumRateSampleRangeParam(src.loadRef().beginParse());
        }
    }
}

export type PremiumRateSample = {
    $$type: 'PremiumRateSample';
    deviationRate: bigint;
    premiumRate: bigint;
}

export function storePremiumRateSample(src: PremiumRateSample) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.deviationRate, 257);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadPremiumRateSample(slice: Slice) {
    let sc_0 = slice;
    let _deviationRate = sc_0.loadIntBig(257);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'PremiumRateSample' as const, deviationRate: _deviationRate, premiumRate: _premiumRate };
}

function loadTuplePremiumRateSample(source: TupleReader) {
    let _deviationRate = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'PremiumRateSample' as const, deviationRate: _deviationRate, premiumRate: _premiumRate };
}

function storeTuplePremiumRateSample(source: PremiumRateSample) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.deviationRate);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserPremiumRateSample(): DictionaryValue<PremiumRateSample> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePremiumRateSample(src)).endCell());
        },
        parse: (src) => {
            return loadPremiumRateSample(src.loadRef().beginParse());
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

export type FundingFeeGrowth = {
    $$type: 'FundingFeeGrowth';
    clampedFundingRateDelta: bigint;
    longFundingFeeGrowthAfter: bigint;
    shortFundingFeeGrowthAfter: bigint;
}

export function storeFundingFeeGrowth(src: FundingFeeGrowth) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.clampedFundingRateDelta, 257);
        b_0.storeInt(src.longFundingFeeGrowthAfter, 257);
        b_0.storeInt(src.shortFundingFeeGrowthAfter, 257);
    };
}

export function loadFundingFeeGrowth(slice: Slice) {
    let sc_0 = slice;
    let _clampedFundingRateDelta = sc_0.loadIntBig(257);
    let _longFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    let _shortFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    return { $$type: 'FundingFeeGrowth' as const, clampedFundingRateDelta: _clampedFundingRateDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function loadTupleFundingFeeGrowth(source: TupleReader) {
    let _clampedFundingRateDelta = source.readBigNumber();
    let _longFundingFeeGrowthAfter = source.readBigNumber();
    let _shortFundingFeeGrowthAfter = source.readBigNumber();
    return { $$type: 'FundingFeeGrowth' as const, clampedFundingRateDelta: _clampedFundingRateDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function storeTupleFundingFeeGrowth(source: FundingFeeGrowth) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.clampedFundingRateDelta);
    builder.writeNumber(source.longFundingFeeGrowthAfter);
    builder.writeNumber(source.shortFundingFeeGrowthAfter);
    return builder.build();
}

function dictValueParserFundingFeeGrowth(): DictionaryValue<FundingFeeGrowth> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFundingFeeGrowth(src)).endCell());
        },
        parse: (src) => {
            return loadFundingFeeGrowth(src.loadRef().beginParse());
        }
    }
}

export type SamplePremiumRateResult = {
    $$type: 'SamplePremiumRateResult';
    sample: GlobalFundingRateSample;
    shouldAdjustFundingRate: boolean;
    fundingRateDelta: bigint;
}

export function storeSamplePremiumRateResult(src: SamplePremiumRateResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeGlobalFundingRateSample(src.sample));
        b_0.storeBit(src.shouldAdjustFundingRate);
        let b_1 = new Builder();
        b_1.storeInt(src.fundingRateDelta, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSamplePremiumRateResult(slice: Slice) {
    let sc_0 = slice;
    let _sample = loadGlobalFundingRateSample(sc_0);
    let _shouldAdjustFundingRate = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _fundingRateDelta = sc_1.loadIntBig(257);
    return { $$type: 'SamplePremiumRateResult' as const, sample: _sample, shouldAdjustFundingRate: _shouldAdjustFundingRate, fundingRateDelta: _fundingRateDelta };
}

function loadTupleSamplePremiumRateResult(source: TupleReader) {
    const _sample = loadTupleGlobalFundingRateSample(source.readTuple());
    let _shouldAdjustFundingRate = source.readBoolean();
    let _fundingRateDelta = source.readBigNumber();
    return { $$type: 'SamplePremiumRateResult' as const, sample: _sample, shouldAdjustFundingRate: _shouldAdjustFundingRate, fundingRateDelta: _fundingRateDelta };
}

function storeTupleSamplePremiumRateResult(source: SamplePremiumRateResult) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleGlobalFundingRateSample(source.sample));
    builder.writeBoolean(source.shouldAdjustFundingRate);
    builder.writeNumber(source.fundingRateDelta);
    return builder.build();
}

function dictValueParserSamplePremiumRateResult(): DictionaryValue<SamplePremiumRateResult> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSamplePremiumRateResult(src)).endCell());
        },
        parse: (src) => {
            return loadSamplePremiumRateResult(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('te6ccgECcwEAImMAART/APSkE/S88sgLAQIBYgIDAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERJsBAIBIFBRApIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UBQYEbgGSMH/gcCHXScIflTAg1wsf3iCCEAvTDq26jwgw2zxsGNs8f+AgghBp1EhwuuMCIIIQ6JzUX7oHCAkKAfYBERwBER2BAQHPAAERGgGBAQHPAAERGAH0AAERFgHLPwERFAGBAQHPABESyIEBAc8AARERAYEBAc8AUA8g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUA4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYcA/LTHwGCEAvTDq268uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHSAAGS0gCSbQHi0gABkvoAkm0B4tIAAZL6AJJtAeLSAAGVgQEB1wCSbQHi1AHQ0gABlYEBAdcAkm0B4tIAAeMPCwwNAfQRHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEkERQRExEjERMREhEiERIREREhEREREBEgERAPER8PDhEeDg0RHQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBQ4CEDDbPGwa2zx/EhME0I8IMNs8bBfbPH/gIIIQHciVjLqOyjDTHwGCEB3IlYy68uCB0z/TP/QEVSBsEzJwgQEL+EJWF1lxQTP0Cm+hlAHXADCSW23iIG6zljEgbvLQgJEw4oIAoPcB8vQB2zx/4CCCECNG3o+6HR4tHwAKgQEB1wAABG0BAGz6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRA4EDcQNhA1EDQD+gQRJAQDESMDAhEiAgERIQERINs8Vh9us5RWHm6zkXDijjKBAQsRICBu8tCAER8gbvLQgAMREwMCESACAREfAXEhbpVbWfRZMJjIAc8AQTP0QeIREJRXHlce4lYbbrOdVxoRGiBu8tCAERkRGpJXG+JWIW6zklch4w1WH26zFg8QABpXGBEgIG7y0IARFxEgAvidVxQRHiBu8tCAERMRHpJXH+JWHW6znVcSERwgbvLQgBERERySVx3iVhtus5xXEBEaIG7y0IAPERqSVxviVhlus5s9ERggbvLQgAwRGJJXGeL4QnBwgEAQI21tbds8ERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQTREAYg8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQO0oYUJdeQQEB9tMfAYIQadRIcLry4IHTP9IAAZPUAdCRbeIB0gABktIAkm0B4tIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQB0NIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQw0NIAARQB9BEcESYRHBEbESURGxEaESQRGhEZESMRGREYESIRGBEXESERFxEWESARFhEVER8RFREUER4RFBETER0RExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIESYIBxElBwYRJAYFESMFFQAuloEBAdcAMJIwbeIQShBJEEgQRxBGEEUD/gQRIgQDESEDAhEgAgERHwERHts8VhqBAQFWH1n0DW+hkjBt3yBukjBtjofQ2zxsGm8K4iBus5cgbvLQgG8qjiYwiwhwggiYloCAZIIDDUCCCA9CQIIQI8NGAIIQBfXhAHAgECQQI+JWMG6zmzkRLyBu8tCACBEvklcw4lYubrMWchcAFPhCVhYBxwXy4IQC/Js3ES0gbvLQgAYRLZJXLuJWLG6zmzURKyBu8tCABBErklcs4lYqbrObMxEpIG7y0IACESmSVyriVihus5gxEScgbvLQgJJXKOJWJG6znVcqESMgbvLQgBEpESOSVyTiViVus51XJxEkIG7y0IARJhEkklcl4lYjbrOSVyPjDRgZABpXJxEiIG7y0IARJhEiA/ZWIG6znVcoER8gbvLQgBEnER+SVyDiVh5WG76XVxpWHaQRGt4IBxEfBwYRIQYF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xBEcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0BESABER9WH9s8PgL+Vx0RGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0Qz1UrEgERHwFWH9s8ER4RHREcERsRGhEZERgRFxEWERURFBETERIREUNEA/rbPKGBJNUhwgDy9BEgcBEgcREgyFUgghAc8M+BUATLHxLLP4EBAc8Ayz/JVhUEAxEhAwIRIAIRHwEQJBAjbW3bPBEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREExNTgH+ICBu8tCAbyIxASBu8tCAbyIwKoEBASJZ9A1voZIwbd8gbpIwbZrQgQEB1wABMW8B4iBuMbOOICGBAQEByAEBgQEBzwDJIhA9ASBulTBZ9FowlEEz9BXijh+BAQEiyAEBgQEBzwDJIhA9ASBulTBZ9FowlEEz9BXi4lYVgQEBLDIE/Fn0DW+hkjBt3yBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTiIG6zkTDjDS6BAQEsWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG6zkTDjDREeESIRHhEdESERHREcESARHBEbER8RGxEaESIRGhEZESERGREYESARGDNhNDUA2iBu8tCAbyQijhNTUaFSQKiCOAVrx14tYxAAAKkEjhNTFaFSQKiCOAVrx14tYxAAAKkE4lFxoVAHoFUggQEBB8hVMFA0gQEBzwDKAIEBAc8AgQEBzwDJAhEXAlQkwCBulTBZ9FowlEEz9BXiERUB3iBu8tCAbyhctglZobYLU1mogjgFa8deLWMQAACpBFNaqII4BWvHXi1jEAAAqQRctglQBKEBERYBoFYVI6G2C1ihAREWAaARFBcWFRRDMIEBAQjIVXDbPMkCERACUsAgbpUwWfRaMJRBM/QV4g4QzTwC/hEXER8RFxEWESIRFhEVESERFREUESARFBETER8RExESESIREhERESEREREQESAREA8R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DMsfGssHGMs/UAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUgQEBzwASgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPABPLP8lYzMkBzABcghALEsGSUAfLHxWBAQHPABOBAQHPAIEBAc8AAciBAQHPABKBAQHPABLLP8kBzABkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsATwAgDxESDw4REQ4NERANEM9VKwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIFJTAgEgWlsC7bl/jbPBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2zRIG6SMG2ZIG7y0IBvIW8B4iBukjBt3obFQCAcdVVgA+gQEBJgJZ9A1voZIwbd8gbpIwbZrQgQEB1wABMW8B4gL4quEgbpIwbY4cINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOLbPBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDmxXAhipHds82zxXEF8PbNFsWQEM2zxs52z3WABkbSFus44dMIEBCwEgbvLQgFYUWXFBM/QKb6GUAdcAMJJbbeKRMeJWHVYdVhtWG1YbVhoABFYVAgEgXF0CASBjZAL1t1EEDdJGDbHDhBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERxbZ4IjgiPCI4IjYiOiI2IjQiOCI0IjIiNiIyIjAiNCIwIi4iMiIuIiwiMCIsIioiLiIqIigiLCIoIiYiKiImIiQiKCIkIiIiJiIiIi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');
    const __system = Cell.fromBase64('te6cckECdQEAIm0AAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWIgBAIBIBcFAgEgEAYCASAJBwLptQObZ4IjgiOiI4IjYiOCI2IjQiNiI0IjIiNCIyIjAiMiIwIi4iMCIuIiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuJK4gvh6hmr4YQN0kYNsyQN3loQDeVN4VxQcAgBQoEBAVYcAln0DW+hkjBt3yBukjBtjofQ2zxsGm8K4lYaAWECASAPCgIBIAwLAHWs3caGrS4MzmdF5eotrCjOKi8oTU0LCWrOjsrs7gsrDKkLCkZozomHCggmakxmyEbIrSyNSEyKbQcQQAL5rn2QN0kYNscOEGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRHFtngiOCI6IjgiNiI4IjYiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh0BwDQFi2zxXEF8PbNEgbpIwbY4bIG7y0IBvJQQgbpIwbZkgbvLQgG8mbwbiBG8F4iBukjBt3g4BaG0hbrOOpTCBAQsBIG7y0IBWE1lZ9AtvoZIwbd8gbpIwbY6H0Ns8bBZvBuKRMeJUf+0vbwVIABGwr7tRNDSAAGACASASEQDdt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQTggZzq084r86ShYDrC3EyPZQAvW3UQQN0kYNscOEGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRHFtngiOCI8IjgiNiI6IjYiNCI4IjQiMiI2IjIiMCI0IjAiLiIyIi4iLCIwIiwiKiIuIioiKCIsIigiJiIqIiYiJCIoIiQiIiImIiIiICIkIiAeIiIfBwEwHODhEQDhDfVRzbPFcQXw9s0SBukjBtjkkgbvLQgG8lBCBukjBtjhEgbvLQgG8qVURvBVVAbwVvAuIDIG6SMG2ZIG7y0IBvJG8E4gIgbpIwbZkgbvLQgG8obwjiEDRAE28F4iBukjBt3hQD9G0hbrOOpC2BAQEkWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOSMDHjDZEx4lYRgQEBI1n0DW+hkjBt3yBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTigQEBVEwUWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiFlYVAAxUEgoqbwUA2jEgbvLQgG8hgQELAiBu8tCAEln0C2+hkjBt3yBukjBtjkrQ0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAVFEMwBdQB0NM/gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFRRDMDUQWlUDbBpvCuICASAeGAIBxxsZAhipHds82zxXEF8PbNFwGgAEVhUC+KrhIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ5wHAEM2zxs52z3HQBkbSFus44dMIEBCwEgbvLQgFYUWXFBM/QKb6GUAdcAMJJbbeKRMeJWHVYdVhtWG1YbVhoC7bl/jbPBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2zRIG6SMG2ZIG7y0IBvIW8B4iBukjBt3ocB8APoEBASYCWfQNb6GSMG3fIG6SMG2a0IEBAdcAATFvAeIC8NAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPBEcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREnAhApIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UJCIB9gERHAERHYEBAc8AAREaAYEBAc8AAREYAfQAAREWAcs/AREUAYEBAc8AERLIgQEBzwABEREBgQEBzwBQDyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQDiDX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DhDNVQByUHiBAQHPABWBAQHPABOBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AyQHMyQHMAGqBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAMBBYEFcQVgDaIG7y0IBvJCKOE1NRoVJAqII4BWvHXi1jEAAAqQSOE1MVoVJAqII4BWvHXi1jEAAAqQTiUXGhUAegVSCBAQEHyFUwUDSBAQHPAMoAgQEBzwCBAQHPAMkCERcCVCTAIG6VMFn0WjCUQTP0FeIRFQB80x8BghDonNRfuvLggdIA0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0z/TP/QEVWACEDDbPGwa2zx/YloB9BEcESYRHBEbESURGxEaESQRGhEZESMRGREYESIRGBEXESERFxEWESARFhEVER8RFREUER4RFBETER0RExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIESYIBxElBwYRJAYFESMFWwP+BBEiBAMRIQMCESACAREfAREe2zxWGoEBAVYfWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwriIG6zlyBu8tCAbyqOJjCLCHCCCJiWgIBkggMNQIIID0JAghAjw0YAghAF9eEAcCAQJBAj4lYwbrObOREvIG7y0IAIES+SVzDiVi5us2thXAL8mzcRLSBu8tCABhEtklcu4lYsbrObNRErIG7y0IAEESuSVyziVipus5szESkgbvLQgAIRKZJXKuJWKG6zmDERJyBu8tCAklco4lYkbrOdVyoRIyBu8tCAESkRI5JXJOJWJW6znVcnESQgbvLQgBEmESSSVyXiViNus5JXI+MNYF0D9lYgbrOdVygRHyBu8tCAEScRH5JXIOJWHlYbvpdXGlYdpBEa3ggHER8HBhEhBgURIgUEESAEAxEjAwIRJAIBESUBESaBAQERKMhVkNs8yQMREwMCER8CAREWASBulTBZ9FowlEEz9BXi+EJwcIBAECNtbW3bPBESERwREl9oXgCAERERGxERERoPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9TLAQahCJRTBEQACGyFAKzxbJUArMF8oA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');
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
    5238: { message: `position not exist` },
    9429: { message: `send gas not enough` },
    18995: { message: `margin rate too low` },
    23314: { message: `insufficient liquidity for single value` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31425: { message: `not reach unlock time` },
    36718: { message: `disabled token` },
    39251: { message: `insufficient global LP` },
    41207: { message: `invalid sender` },
    42634: { message: `legerage too high` },
    54040: { message: `insufficient global net LP` },
    55429: { message: `not reach liquidate price` },
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
    {"name":"UpdateConfig","header":198381229,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"lpLockTime","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"UpdateTokenConfig","header":1775519856,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":true}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePrice","header":499684748,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"SetPremiumRateSampleRange","header":591847055,"fields":[{"name":"sampleRangeLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleRanges","type":{"kind":"dict","key":"int","value":"PremiumRateSampleRangeParam","valueFormat":"ref"}}]},
    {"name":"DeviationRate","header":769006232,"fields":[{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionIncreasedEvent","header":528848591,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionDecreasedEvent","header":88850873,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalLPLiquidityChangedEvent","header":185778578,"fields":[{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalLPPositionChangedEvent","header":4133122195,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionIncreasedEvent","header":15026030,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionDecreasedEvent","header":2650649001,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalPositionChangedEvent","header":2196054124,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"longMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePriceEvent","header":1616417891,"fields":[{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityProportion","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenConfigData","header":null,"fields":[{"name":"tokenIdNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenConfig","type":{"kind":"simple","type":"TokenConfig","optional":true}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionData","header":null,"fields":[{"name":"lpPosition","type":{"kind":"simple","type":"LPPosition","optional":true}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}},{"name":"globalPerpNetValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PriceData","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePriceParam","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateSampleRange","header":null,"fields":[{"name":"sampleLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"samples","type":{"kind":"dict","key":"int","value":"PremiumRateSample","valueFormat":"ref"}}]},
    {"name":"PremiumRateSampleRangeParam","header":null,"fields":[{"name":"sampleId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"samples","type":{"kind":"dict","key":"int","value":"PremiumRateSample","valueFormat":"ref"}}]},
    {"name":"PremiumRateSample","header":null,"fields":[{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalFundingRateSample","header":null,"fields":[{"name":"lastAdjustFundingRateTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cumulativePremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"FundingFeeGrowth","header":null,"fields":[{"name":"clampedFundingRateDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SamplePremiumRateResult","header":null,"fields":[{"name":"sample","type":{"kind":"simple","type":"GlobalFundingRateSample","optional":false}},{"name":"shouldAdjustFundingRate","type":{"kind":"simple","type":"bool","optional":false}},{"name":"fundingRateDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfigData","optional":false}},
    {"name":"priceData","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PriceData","optional":true}},
    {"name":"lpPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"LPPositionData","optional":true}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPremiumRateSampleRange"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeviationRate"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | UpdateLPPosition | UpdatePrice | SetPremiumRateSampleRange | DeviationRate | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenConfig') {
            body = beginCell().store(storeUpdateTokenConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLPPosition') {
            body = beginCell().store(storeUpdateLPPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePrice') {
            body = beginCell().store(storeUpdatePrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPremiumRateSampleRange') {
            body = beginCell().store(storeSetPremiumRateSampleRange(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeviationRate') {
            body = beginCell().store(storeDeviationRate(message)).endCell();
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
        const result = loadTupleTokenConfigData(source);
        return result;
    }
    
    async getPriceData(provider: ContractProvider, tokenId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        let source = (await provider.get('priceData', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTuplePriceData(result_p) : null;
        return result;
    }
    
    async getLpPosition(provider: ContractProvider, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('lpPosition', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleLPPositionData(result_p) : null;
        return result;
    }
    
    async getPerpPosition(provider: ContractProvider, tokenId: bigint, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        builder.writeAddress(account);
        let source = (await provider.get('perpPosition', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTuplePerpPositionData(result_p) : null;
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}