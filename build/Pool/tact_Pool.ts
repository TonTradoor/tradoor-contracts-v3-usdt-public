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
    gasConsumption: bigint | null;
    minTonsForStorage: bigint | null;
    rbfLockTime: bigint | null;
    bonusFactor: bigint | null;
    minLPMargin: bigint | null;
    maxLPLeverage: bigint | null;
    lpLiquidationFee: bigint | null;
    lpMaxRiskRate: bigint | null;
    orderBook: Address | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1295362460, 32);
        if (src.gasConsumption !== null && src.gasConsumption !== undefined) { b_0.storeBit(true).storeInt(src.gasConsumption, 257); } else { b_0.storeBit(false); }
        if (src.minTonsForStorage !== null && src.minTonsForStorage !== undefined) { b_0.storeBit(true).storeInt(src.minTonsForStorage, 257); } else { b_0.storeBit(false); }
        if (src.rbfLockTime !== null && src.rbfLockTime !== undefined) { b_0.storeBit(true).storeInt(src.rbfLockTime, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.bonusFactor !== null && src.bonusFactor !== undefined) { b_1.storeBit(true).storeInt(src.bonusFactor, 257); } else { b_1.storeBit(false); }
        if (src.minLPMargin !== null && src.minLPMargin !== undefined) { b_1.storeBit(true).storeInt(src.minLPMargin, 257); } else { b_1.storeBit(false); }
        if (src.maxLPLeverage !== null && src.maxLPLeverage !== undefined) { b_1.storeBit(true).storeInt(src.maxLPLeverage, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.lpLiquidationFee !== null && src.lpLiquidationFee !== undefined) { b_2.storeBit(true).storeInt(src.lpLiquidationFee, 257); } else { b_2.storeBit(false); }
        if (src.lpMaxRiskRate !== null && src.lpMaxRiskRate !== undefined) { b_2.storeBit(true).storeInt(src.lpMaxRiskRate, 257); } else { b_2.storeBit(false); }
        b_2.storeAddress(src.orderBook);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1295362460) { throw Error('Invalid prefix'); }
    let _gasConsumption = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _minTonsForStorage = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _rbfLockTime = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _bonusFactor = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _minLPMargin = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _maxLPLeverage = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _lpLiquidationFee = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _lpMaxRiskRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _orderBook = sc_2.loadMaybeAddress();
    return { $$type: 'UpdateConfig' as const, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, rbfLockTime: _rbfLockTime, bonusFactor: _bonusFactor, minLPMargin: _minLPMargin, maxLPLeverage: _maxLPLeverage, lpLiquidationFee: _lpLiquidationFee, lpMaxRiskRate: _lpMaxRiskRate, orderBook: _orderBook };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _gasConsumption = source.readBigNumberOpt();
    let _minTonsForStorage = source.readBigNumberOpt();
    let _rbfLockTime = source.readBigNumberOpt();
    let _bonusFactor = source.readBigNumberOpt();
    let _minLPMargin = source.readBigNumberOpt();
    let _maxLPLeverage = source.readBigNumberOpt();
    let _lpLiquidationFee = source.readBigNumberOpt();
    let _lpMaxRiskRate = source.readBigNumberOpt();
    let _orderBook = source.readAddressOpt();
    return { $$type: 'UpdateConfig' as const, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, rbfLockTime: _rbfLockTime, bonusFactor: _bonusFactor, minLPMargin: _minLPMargin, maxLPLeverage: _maxLPLeverage, lpLiquidationFee: _lpLiquidationFee, lpMaxRiskRate: _lpMaxRiskRate, orderBook: _orderBook };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.rbfLockTime);
    builder.writeNumber(source.bonusFactor);
    builder.writeNumber(source.minLPMargin);
    builder.writeNumber(source.maxLPLeverage);
    builder.writeNumber(source.lpLiquidationFee);
    builder.writeNumber(source.lpMaxRiskRate);
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
    protocalTradingFeeRate: bigint | null;
    interestRate: bigint | null;
    maxFundingRate: bigint | null;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2181560623, 32);
        b_0.storeInt(src.tokenId, 257);
        if (src.name !== null && src.name !== undefined) { b_0.storeBit(true).storeStringRefTail(src.name); } else { b_0.storeBit(false); }
        if (src.enable !== null && src.enable !== undefined) { b_0.storeBit(true).storeBit(src.enable); } else { b_0.storeBit(false); }
        if (src.minMargin !== null && src.minMargin !== undefined) { b_0.storeBit(true).storeInt(src.minMargin, 257); } else { b_0.storeBit(false); }
        if (src.maxLeverage !== null && src.maxLeverage !== undefined) { b_0.storeBit(true).storeInt(src.maxLeverage, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.liquidationFee !== null && src.liquidationFee !== undefined) { b_1.storeBit(true).storeInt(src.liquidationFee, 257); } else { b_1.storeBit(false); }
        if (src.tradingFeeRate !== null && src.tradingFeeRate !== undefined) { b_1.storeBit(true).storeInt(src.tradingFeeRate, 257); } else { b_1.storeBit(false); }
        if (src.lpTradingFeeRate !== null && src.lpTradingFeeRate !== undefined) { b_1.storeBit(true).storeInt(src.lpTradingFeeRate, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.protocalTradingFeeRate !== null && src.protocalTradingFeeRate !== undefined) { b_2.storeBit(true).storeInt(src.protocalTradingFeeRate, 257); } else { b_2.storeBit(false); }
        if (src.interestRate !== null && src.interestRate !== undefined) { b_2.storeBit(true).storeInt(src.interestRate, 257); } else { b_2.storeBit(false); }
        if (src.maxFundingRate !== null && src.maxFundingRate !== undefined) { b_2.storeBit(true).storeInt(src.maxFundingRate, 257); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2181560623) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadIntBig(257);
    let _name = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _enable = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minMargin = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _maxLeverage = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationFee = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _tradingFeeRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _lpTradingFeeRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _protocalTradingFeeRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _interestRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _maxFundingRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, protocalTradingFeeRate: _protocalTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
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
    let _protocalTradingFeeRate = source.readBigNumberOpt();
    let _interestRate = source.readBigNumberOpt();
    let _maxFundingRate = source.readBigNumberOpt();
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, protocalTradingFeeRate: _protocalTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
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
    builder.writeNumber(source.protocalTradingFeeRate);
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

export type RBFPositionIncreasedEvent = {
    $$type: 'RBFPositionIncreasedEvent';
    positionId: bigint;
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    bonusDelta: bigint;
    bonusAfter: bigint;
    unlockTimeAfter: bigint;
    trxId: bigint;
}

export function storeRBFPositionIncreasedEvent(src: RBFPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4037720789, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.unlockTimeAfter, 257);
        b_2.storeInt(src.trxId, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4037720789) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _unlockTimeAfter = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadIntBig(257);
    return { $$type: 'RBFPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, trxId: _trxId };
}

function loadTupleRBFPositionIncreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _unlockTimeAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'RBFPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, trxId: _trxId };
}

function storeTupleRBFPositionIncreasedEvent(source: RBFPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.bonusDelta);
    builder.writeNumber(source.bonusAfter);
    builder.writeNumber(source.unlockTimeAfter);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserRBFPositionIncreasedEvent(): DictionaryValue<RBFPositionIncreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPositionIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPositionIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionDecreasedEvent = {
    $$type: 'RBFPositionDecreasedEvent';
    positionId: bigint;
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    bonusDelta: bigint;
    bonusAfter: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeRBFPositionDecreasedEvent(src: RBFPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2882242104, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.receive, 257);
        b_2.storeInt(src.trxId, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2882242104) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _receive = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadIntBig(257);
    return { $$type: 'RBFPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, receive: _receive, trxId: _trxId };
}

function loadTupleRBFPositionDecreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'RBFPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, receive: _receive, trxId: _trxId };
}

function storeTupleRBFPositionDecreasedEvent(source: RBFPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.bonusDelta);
    builder.writeNumber(source.bonusAfter);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserRBFPositionDecreasedEvent(): DictionaryValue<RBFPositionDecreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPositionDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPositionDecreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type GlobalRBFChangedEvent = {
    $$type: 'GlobalRBFChangedEvent';
    riskBufferFundAfter: bigint;
    liquidityAfter: bigint;
    tradingFee: bigint;
    liquidation: bigint;
    trxId: bigint;
}

export function storeGlobalRBFChangedEvent(src: GlobalRBFChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3450643003, 32);
        b_0.storeInt(src.riskBufferFundAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        b_0.storeInt(src.tradingFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidation, 257);
        b_1.storeInt(src.trxId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalRBFChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3450643003) { throw Error('Invalid prefix'); }
    let _riskBufferFundAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let _tradingFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidation = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadIntBig(257);
    return { $$type: 'GlobalRBFChangedEvent' as const, riskBufferFundAfter: _riskBufferFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, liquidation: _liquidation, trxId: _trxId };
}

function loadTupleGlobalRBFChangedEvent(source: TupleReader) {
    let _riskBufferFundAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _liquidation = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalRBFChangedEvent' as const, riskBufferFundAfter: _riskBufferFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, liquidation: _liquidation, trxId: _trxId };
}

function storeTupleGlobalRBFChangedEvent(source: GlobalRBFChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.riskBufferFundAfter);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.liquidation);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserGlobalRBFChangedEvent(): DictionaryValue<GlobalRBFChangedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalRBFChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalRBFChangedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionIncreasedEvent = {
    $$type: 'LPPositionIncreasedEvent';
    positionId: bigint;
    account: Address;
    marginDelta: bigint;
    marginAfter: bigint;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    trxId: bigint;
}

export function storeLPPositionIncreasedEvent(src: LPPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3487229017, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.marginAfter, 257);
        b_1.storeInt(src.liquidityDelta, 257);
        b_1.storeInt(src.liquidityAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tradingFee, 257);
        b_2.storeInt(src.fundingFee, 257);
        b_2.storeInt(src.trxId, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3487229017) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginAfter = sc_1.loadIntBig(257);
    let _liquidityDelta = sc_1.loadIntBig(257);
    let _liquidityAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tradingFee = sc_2.loadIntBig(257);
    let _fundingFee = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionIncreasedEvent' as const, positionId: _positionId, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, trxId: _trxId };
}

function loadTupleLPPositionIncreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionIncreasedEvent' as const, positionId: _positionId, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, trxId: _trxId };
}

function storeTupleLPPositionIncreasedEvent(source: LPPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
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
    positionId: bigint;
    account: Address;
    marginDelta: bigint;
    marginAfter: bigint;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    realizedLoss: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeLPPositionDecreasedEvent(src: LPPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2843728201, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.marginAfter, 257);
        b_1.storeInt(src.liquidityDelta, 257);
        b_1.storeInt(src.liquidityAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.tradingFee, 257);
        b_2.storeInt(src.fundingFee, 257);
        b_2.storeInt(src.realizedLoss, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.receive, 257);
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2843728201) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginAfter = sc_1.loadIntBig(257);
    let _liquidityDelta = sc_1.loadIntBig(257);
    let _liquidityAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tradingFee = sc_2.loadIntBig(257);
    let _fundingFee = sc_2.loadIntBig(257);
    let _realizedLoss = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _receive = sc_3.loadIntBig(257);
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'LPPositionDecreasedEvent' as const, positionId: _positionId, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, realizedLoss: _realizedLoss, receive: _receive, trxId: _trxId };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _realizedLoss = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionDecreasedEvent' as const, positionId: _positionId, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, realizedLoss: _realizedLoss, receive: _receive, trxId: _trxId };
}

function storeTupleLPPositionDecreasedEvent(source: LPPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.realizedLoss);
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

export type LPPositionLiquidatedEvent = {
    $$type: 'LPPositionLiquidatedEvent';
    positionId: bigint;
    account: Address;
    margin: bigint;
    liquidity: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    liquidationFee: bigint;
    trxId: bigint;
}

export function storeLPPositionLiquidatedEvent(src: LPPositionLiquidatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3220731385, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.margin, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidity, 257);
        b_1.storeInt(src.tradingFee, 257);
        b_1.storeInt(src.fundingFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.liquidationFee, 257);
        b_2.storeInt(src.trxId, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionLiquidatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3220731385) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _margin = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidity = sc_1.loadIntBig(257);
    let _tradingFee = sc_1.loadIntBig(257);
    let _fundingFee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _liquidationFee = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionLiquidatedEvent' as const, positionId: _positionId, account: _account, margin: _margin, liquidity: _liquidity, tradingFee: _tradingFee, fundingFee: _fundingFee, liquidationFee: _liquidationFee, trxId: _trxId };
}

function loadTupleLPPositionLiquidatedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _margin = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionLiquidatedEvent' as const, positionId: _positionId, account: _account, margin: _margin, liquidity: _liquidity, tradingFee: _tradingFee, fundingFee: _fundingFee, liquidationFee: _liquidationFee, trxId: _trxId };
}

function storeTupleLPPositionLiquidatedEvent(source: LPPositionLiquidatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.margin);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionLiquidatedEvent(): DictionaryValue<LPPositionLiquidatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionLiquidatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionLiquidatedEvent(src.loadRef().beginParse());
        }
    }
}

export type GlobalLPLiquidityChangedEvent = {
    $$type: 'GlobalLPLiquidityChangedEvent';
    marginAfter: bigint;
    liquidityAfter: bigint;
    trxId: bigint;
}

export function storeGlobalLPLiquidityChangedEvent(src: GlobalLPLiquidityChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1513930700, 32);
        b_0.storeInt(src.marginAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadGlobalLPLiquidityChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1513930700) { throw Error('Invalid prefix'); }
    let _marginAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'GlobalLPLiquidityChangedEvent' as const, marginAfter: _marginAfter, liquidityAfter: _liquidityAfter, trxId: _trxId };
}

function loadTupleGlobalLPLiquidityChangedEvent(source: TupleReader) {
    let _marginAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalLPLiquidityChangedEvent' as const, marginAfter: _marginAfter, liquidityAfter: _liquidityAfter, trxId: _trxId };
}

function storeTupleGlobalLPLiquidityChangedEvent(source: GlobalLPLiquidityChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.liquidityAfter);
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
        b_0.storeUint(2125986710, 32);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeInt(src.netSizeAfter, 257);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.entryPriceAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.trxId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalLPPositionChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2125986710) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadIntBig(257);
    let _netSizeAfter = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let _entryPriceAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _trxId = sc_1.loadIntBig(257);
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
    trxId: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(126890049, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeBit(src.isLong);
        let b_1 = new Builder();
        b_1.storeInt(src.marginDelta, 257);
        b_1.storeInt(src.marginAfter, 257);
        b_1.storeInt(src.sizeDelta, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.sizeAfter, 257);
        b_2.storeInt(src.tradePrice, 257);
        b_2.storeInt(src.entryPrice, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.fundingFee, 257);
        b_3.storeInt(src.tradingFee, 257);
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 126890049) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginDelta = sc_1.loadIntBig(257);
    let _marginAfter = sc_1.loadIntBig(257);
    let _sizeDelta = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _sizeAfter = sc_2.loadIntBig(257);
    let _tradePrice = sc_2.loadIntBig(257);
    let _entryPrice = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _fundingFee = sc_3.loadIntBig(257);
    let _tradingFee = sc_3.loadIntBig(257);
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'PerpPositionIncreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, trxId: _trxId };
}

function loadTuplePerpPositionIncreasedEvent(source: TupleReader) {
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
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, trxId: _trxId };
}

function storeTuplePerpPositionIncreasedEvent(source: PerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
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
    trxId: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1641924276, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeBit(src.isLong);
        let b_1 = new Builder();
        b_1.storeInt(src.marginDelta, 257);
        b_1.storeInt(src.marginAfter, 257);
        b_1.storeInt(src.sizeDelta, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.sizeAfter, 257);
        b_2.storeInt(src.tradePrice, 257);
        b_2.storeInt(src.realizedPnLDelta, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.fundingFee, 257);
        b_3.storeInt(src.tradingFee, 257);
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1641924276) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginDelta = sc_1.loadIntBig(257);
    let _marginAfter = sc_1.loadIntBig(257);
    let _sizeDelta = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _sizeAfter = sc_2.loadIntBig(257);
    let _tradePrice = sc_2.loadIntBig(257);
    let _realizedPnLDelta = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _fundingFee = sc_3.loadIntBig(257);
    let _tradingFee = sc_3.loadIntBig(257);
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'PerpPositionDecreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, trxId: _trxId };
}

function loadTuplePerpPositionDecreasedEvent(source: TupleReader) {
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
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, trxId: _trxId };
}

function storeTuplePerpPositionDecreasedEvent(source: PerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
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

export type UpdatePriceEvent = {
    $$type: 'UpdatePriceEvent';
    pricesLength: bigint;
    prices: Dictionary<bigint, UpdatePrice>;
}

export function storeUpdatePriceEvent(src: UpdatePriceEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1737737193, 32);
        b_0.storeInt(src.pricesLength, 257);
        b_0.storeDict(src.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice());
    };
}

export function loadUpdatePriceEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1737737193) { throw Error('Invalid prefix'); }
    let _pricesLength = sc_0.loadIntBig(257);
    let _prices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), sc_0);
    return { $$type: 'UpdatePriceEvent' as const, pricesLength: _pricesLength, prices: _prices };
}

function loadTupleUpdatePriceEvent(source: TupleReader) {
    let _pricesLength = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice(), source.readCellOpt());
    return { $$type: 'UpdatePriceEvent' as const, pricesLength: _pricesLength, prices: _prices };
}

function storeTupleUpdatePriceEvent(source: UpdatePriceEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.pricesLength);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.BigInt(257), dictValueParserUpdatePrice()).endCell() : null);
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
    rbfLockTime: bigint;
    bonusFactor: bigint;
    minLPMargin: bigint;
    maxLPLeverage: bigint;
    lpLiquidationFee: bigint;
    lpMaxRiskRate: bigint;
    orderBook: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.rbfLockTime, 257);
        b_0.storeInt(src.bonusFactor, 257);
        b_0.storeInt(src.minLPMargin, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.maxLPLeverage, 257);
        b_1.storeInt(src.lpLiquidationFee, 257);
        b_1.storeInt(src.lpMaxRiskRate, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.orderBook);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _rbfLockTime = sc_0.loadIntBig(257);
    let _bonusFactor = sc_0.loadIntBig(257);
    let _minLPMargin = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _maxLPLeverage = sc_1.loadIntBig(257);
    let _lpLiquidationFee = sc_1.loadIntBig(257);
    let _lpMaxRiskRate = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _orderBook = sc_2.loadAddress();
    return { $$type: 'ConfigData' as const, rbfLockTime: _rbfLockTime, bonusFactor: _bonusFactor, minLPMargin: _minLPMargin, maxLPLeverage: _maxLPLeverage, lpLiquidationFee: _lpLiquidationFee, lpMaxRiskRate: _lpMaxRiskRate, orderBook: _orderBook };
}

function loadTupleConfigData(source: TupleReader) {
    let _rbfLockTime = source.readBigNumber();
    let _bonusFactor = source.readBigNumber();
    let _minLPMargin = source.readBigNumber();
    let _maxLPLeverage = source.readBigNumber();
    let _lpLiquidationFee = source.readBigNumber();
    let _lpMaxRiskRate = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'ConfigData' as const, rbfLockTime: _rbfLockTime, bonusFactor: _bonusFactor, minLPMargin: _minLPMargin, maxLPLeverage: _maxLPLeverage, lpLiquidationFee: _lpLiquidationFee, lpMaxRiskRate: _lpMaxRiskRate, orderBook: _orderBook };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.rbfLockTime);
    builder.writeNumber(source.bonusFactor);
    builder.writeNumber(source.minLPMargin);
    builder.writeNumber(source.maxLPLeverage);
    builder.writeNumber(source.lpLiquidationFee);
    builder.writeNumber(source.lpMaxRiskRate);
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
    tradingFeeRate: bigint;
    lpTradingFeeRate: bigint;
    protocalTradingFeeRate: bigint;
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
        b_1.storeInt(src.tradingFeeRate, 257);
        b_1.storeInt(src.lpTradingFeeRate, 257);
        b_1.storeInt(src.protocalTradingFeeRate, 257);
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
    let _tradingFeeRate = sc_1.loadIntBig(257);
    let _lpTradingFeeRate = sc_1.loadIntBig(257);
    let _protocalTradingFeeRate = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _interestRate = sc_2.loadIntBig(257);
    let _maxFundingRate = sc_2.loadIntBig(257);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, protocalTradingFeeRate: _protocalTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minMargin = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    let _protocalTradingFeeRate = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, protocalTradingFeeRate: _protocalTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minMargin);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    builder.writeNumber(source.protocalTradingFeeRate);
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

export type RBFPosition = {
    $$type: 'RBFPosition';
    positionId: bigint;
    liquidity: bigint;
    bonus: bigint;
    unlockTime: bigint;
}

export function storeRBFPosition(src: RBFPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.positionId, 257);
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.bonus, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    let _bonus = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _unlockTime = sc_1.loadIntBig(257);
    return { $$type: 'RBFPosition' as const, positionId: _positionId, liquidity: _liquidity, bonus: _bonus, unlockTime: _unlockTime };
}

function loadTupleRBFPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _bonus = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'RBFPosition' as const, positionId: _positionId, liquidity: _liquidity, bonus: _bonus, unlockTime: _unlockTime };
}

function storeTupleRBFPosition(source: RBFPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.bonus);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserRBFPosition(): DictionaryValue<RBFPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRBFPosition(src)).endCell());
        },
        parse: (src) => {
            return loadRBFPosition(src.loadRef().beginParse());
        }
    }
}

export type GlobalRBFPosition = {
    $$type: 'GlobalRBFPosition';
    riskBufferFund: bigint;
    liquidity: bigint;
}

export function storeGlobalRBFPosition(src: GlobalRBFPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.riskBufferFund, 257);
        b_0.storeInt(src.liquidity, 257);
    };
}

export function loadGlobalRBFPosition(slice: Slice) {
    let sc_0 = slice;
    let _riskBufferFund = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    return { $$type: 'GlobalRBFPosition' as const, riskBufferFund: _riskBufferFund, liquidity: _liquidity };
}

function loadTupleGlobalRBFPosition(source: TupleReader) {
    let _riskBufferFund = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    return { $$type: 'GlobalRBFPosition' as const, riskBufferFund: _riskBufferFund, liquidity: _liquidity };
}

function storeTupleGlobalRBFPosition(source: GlobalRBFPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.riskBufferFund);
    builder.writeNumber(source.liquidity);
    return builder.build();
}

function dictValueParserGlobalRBFPosition(): DictionaryValue<GlobalRBFPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalRBFPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalRBFPosition(src.loadRef().beginParse());
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
    return { $$type: 'IncreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleIncreaseLPPositionOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleIncreaseLPPositionOrder(source: IncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
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
    return { $$type: 'DecreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleDecreaseLPPositionOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionOrder' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleDecreaseLPPositionOrder(source: DecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
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

export type LPPosition = {
    $$type: 'LPPosition';
    positionId: bigint;
    margin: bigint;
    liquidity: bigint;
    entryFundingFeeGrowth: bigint;
    entryTradingFeeGrowth: bigint;
}

export function storeLPPosition(src: LPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.positionId, 257);
        b_0.storeInt(src.margin, 257);
        b_0.storeInt(src.liquidity, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.entryFundingFeeGrowth, 257);
        b_1.storeInt(src.entryTradingFeeGrowth, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadIntBig(257);
    let _margin = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _entryFundingFeeGrowth = sc_1.loadIntBig(257);
    let _entryTradingFeeGrowth = sc_1.loadIntBig(257);
    return { $$type: 'LPPosition' as const, positionId: _positionId, margin: _margin, liquidity: _liquidity, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryTradingFeeGrowth: _entryTradingFeeGrowth };
}

function loadTupleLPPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryTradingFeeGrowth = source.readBigNumber();
    return { $$type: 'LPPosition' as const, positionId: _positionId, margin: _margin, liquidity: _liquidity, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryTradingFeeGrowth: _entryTradingFeeGrowth };
}

function storeTupleLPPosition(source: LPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeNumber(source.margin);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.entryFundingFeeGrowth);
    builder.writeNumber(source.entryTradingFeeGrowth);
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

export type GlobalLPLiquidity = {
    $$type: 'GlobalLPLiquidity';
    margin: bigint;
    liquidity: bigint;
    fundingFeeGrowth: bigint;
    tradingFeeGrowth: bigint;
}

export function storeGlobalLPLiquidity(src: GlobalLPLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.margin, 257);
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.fundingFeeGrowth, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.tradingFeeGrowth, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalLPLiquidity(slice: Slice) {
    let sc_0 = slice;
    let _margin = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    let _fundingFeeGrowth = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _tradingFeeGrowth = sc_1.loadIntBig(257);
    return { $$type: 'GlobalLPLiquidity' as const, margin: _margin, liquidity: _liquidity, fundingFeeGrowth: _fundingFeeGrowth, tradingFeeGrowth: _tradingFeeGrowth };
}

function loadTupleGlobalLPLiquidity(source: TupleReader) {
    let _margin = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _tradingFeeGrowth = source.readBigNumber();
    return { $$type: 'GlobalLPLiquidity' as const, margin: _margin, liquidity: _liquidity, fundingFeeGrowth: _fundingFeeGrowth, tradingFeeGrowth: _tradingFeeGrowth };
}

function storeTupleGlobalLPLiquidity(source: GlobalLPLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.margin);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.tradingFeeGrowth);
    return builder.build();
}

function dictValueParserGlobalLPLiquidity(): DictionaryValue<GlobalLPLiquidity> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalLPLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPLiquidity(src.loadRef().beginParse());
        }
    }
}

export type GlobalLPPosition = {
    $$type: 'GlobalLPPosition';
    netSize: bigint;
    isLong: boolean;
    entryPrice: bigint;
}

export function storeGlobalLPPosition(src: GlobalLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.netSize, 257);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.entryPrice, 257);
    };
}

export function loadGlobalLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _netSize = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let _entryPrice = sc_0.loadIntBig(257);
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function loadTupleGlobalLPPosition(source: TupleReader) {
    let _netSize = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPrice = source.readBigNumber();
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function storeTupleGlobalLPPosition(source: GlobalLPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.netSize);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.entryPrice);
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
        b_0.storeInt(src.positionId, 257);
        b_0.storeInt(src.margin, 257);
        b_0.storeInt(src.size, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.entryPrice, 257);
        b_1.storeInt(src.entryFundingFeeGrowth, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadIntBig(257);
    let _margin = sc_0.loadIntBig(257);
    let _size = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _entryPrice = sc_1.loadIntBig(257);
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
    const __code = Cell.fromBase64('te6ccgECqAEANzMAART/APSkE/S88sgLAQIBYgIDAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERKhBAIBIIqLApIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UBQYEbgGSMH/gcCHXScIflTAg1wsf3iCCEE01qZy6jwgw2zxsGds8f+AgghCCB/kvuuMCIIIQ6JzUX7oHCAkKAeYBERwBER2BAQHPAAERGgGBAQHPAAERGAH0AAERFgGBAQHPABEUyIEBAc8AARETAYEBAc8AARERAYEBAc8AD8iBAQHPAB6BAQHPAByBAQHPAMhQCyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAJHALs0x8BghBNNamcuvLggdIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQB0NIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQw0NIAAZWBAQHXAJJtAeLSAAGSbQHjDRMLAfQRHBElERwRGxEkERsRGhEjERoRGREiERkRGBEhERgRFxEgERcRFhEfERYRFREeERURFBEdERQRExElERMREhEkERIREREjEREREBEiERAPESEPDhEgDg0RHw0MER4MCxEdCwoRJQoJESQJCBEjCAcRIgcGESEGBREgBQwCEDDbPGwb2zx/ERIEOo8IMNs8bBfbPH/gIIIQ/qNrcbrjAiCCEP9X5Ve6GBkaGwBk+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4jEQaRBoEGcE/AQRHwQDER4DAhEdAgERJQERJNs8ViNus51XHBEiIG7y0IARGxEiklcj4lYhbrOdVxoRICBu8tCAERkRIJJXIeJWH26znVcWER4gbvLQgBEVER6SVx/iVh1us51XFBEcIG7y0IARExEcklcd4lYbbrOSVxvjDVYZbrOSVxnjDRYNDg8AGlcSERogbvLQgBERERoAGFcQERggbvLQgA8RGAL6Vhdus5s+ERYgbvLQgA0RFpJXF+JWHm6zmzwRHSBu8tCACxEdklce4lYcbrObOREbIG7y0IAIERuSVxzi+EJwcIBAECNtbW3bPBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgmIEAAsCBERCAcREAcQbxBeEE0QPEsZUKheUQLy0x8BghCCB/kvuvLggYEBAdcA0gABk9QB0JFt4gHSAAGS0gCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUAdDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNDSAAGSbQHjDdIAARMUAfQRHBEnERwRGxEmERsRGhElERoRGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEdERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGEScGBREmBRUACoEBAdcAAESVgQEB1wCSbQHi0gABloEBAdcAMJIwbeIQaxBqEGkQaBBnA/4EESUEAxEkAwIRIwIBESIBESHbPIEBAVYbAhEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwriIG4xszBWHm5XHxEeszBWHG5XHREcszBWGm5XGxEaszBWI25XJBEjszBWIW5XIhEhszBWHG5XHREcszBWHm5XHxEeszBWHG5XHREcFqAXABT4QlYTAccF8uCEAdKzMFYablcbERqzMFYXblcYERezMPhCcHCAQBAjbW1t2zwREREcEREREBEbERAPERoPDhEZDg0RGA0MERcMCxEWCwoRFQoJERQJCBETCAcREgcGEREGBREQBRBPED5NG0nKEDgQRxYUQzCIAILTHwGCEOic1F+68uCB0gDTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDTP4EBAdcA9ARVYAHsjQbcmVjZWl2ZSB1cGRhdGUgcG9zaXRpb24gbXNng/hQwggCg9/hCVhoBxwXy9BEeESMRHhEdESIRHREcESERHBEbESARGxEaER8RGhEZESMRGREYESIRGBEXESERFxEWESARFhEVER8RFREUESMRFBETESIREx4CEDDbPGwY2zx/NjcDfI8IMNs8bBzbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwW1xdAf4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYX9AAVyz/IQEMCgQEBzwCBAQHPAPQAEss/yEQUUGdQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAcwV9AAFyIEBAc8AF4EBAc8AF/QAF8s/F/QAF4EBAc8AyVAGzMkBzMkBHQAUzMlYzMkBzMkBzATIERIRIRESERERIBERERARHxEQDxEjDw4RIg4NESENDBEgDAsRHwsKESMKCREiCQgRIQgHESAHBhEfBgURIwUEESIEAxEhAwIRIALbPHARHuMP+EFvJBNfA1YdqgChVhyh+EFvJF8fICEBxBEcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0BESABER9WH9s8IgL+Vx0RGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0Qz1UrEgERHwFWH9s8ER4RHREcERsRGhEZERgRFxEWERURFBETERIRESssA/zbPKGBJNUhwgDy9BEgcBEgcREgyFUgghAc8M+BUATLHxKBAQHPAIEBAc8Ayz/JVhIEAxEhAwIRIAIRHwEQJBAjbW3bPI0HHNlbmQgdXBkYXRlIFJCRiBwb3NpdGlvbiBtc2eD+FDARGREcERkRGBEbERgRFxEaERcRFhEZERaGiCoB8lYTgQELJFn0C2+hkjBt3yBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOJwVHAAMDIibrOZWyBu8tCAbyQwlzJWFKQRFVniVhQRHBEjERwRGxEiERsRGhEhERoRGREgERkRGBEfERgRFxEeERcjA/wRFhEdERYRFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRIwcGESIGBREhBQQRIAQDER8DAhEeAgERHQERI9s8AREkAaAgwQCSMHDecFMeuZEx4w1wJCUBTDBS0KFWFwGoViGoLakEi2Ym9udXM6j+FDAg2zz+FDARHVYdoBEdcwL8ER5WIaD4I1YZoI0HWV4ZWN1dGUgaW5jcmVhc2UgcmJmIHBvc2l0aW9ug/hQwyFYkINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfkA2zz+FDCBAQtWISNWISTIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJcyYCugIREwJWJQEgbpUwWfRZMJRBM/QT4g9WIqAOViKgBhEgBgURIwUEESIEEwIRHwIBER4BERFWIchVcNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHBTCFE9VSARHicoALiCEPCqutVQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzAH4yFVAghDNrKI7UAbLHxSBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wCNB1pbmNyZWFzZSByYmYgcG9zaXRpb24gc3VjY2Vzc4P4UMBEVERwRFREUERsRFBETERoREykAhBESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgcREAcQjxBuEJ0QXBBLEDpJhxBGEDVBBABoERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKwPuVhOBAQskWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4oEUdiFus/L0IG7y0IBvJCDbPP4UMPgj2zz+FDCBesEh+CO78vSCAOMxUza+8vQRHBEjERwRGxEiERsRGhEhERpzcy0ACBEQVeAC+hEZESARGREYER8RGBEXER4RFxEWER0RFhEVESMRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEjBwYRIgYFESEFBBEgBAMRHwMCER4CAREdAREj2zwvcC4C+oFaxAKgwgDy9C4RHBEdERwRGxEdERsRGhEdERoRGREdERkRGBEdERgRFxEdERcRFhEdERYRFREdERURFBEdERQRExEdERMREhEdERIREREdEREREBEdERAPER0PDhEdDg0RHQ0MER0MCxEdCwoRHQoJER0JER0IBwZVQNs8cC8D+AERHgGgIMEAkjBw3oIA8ashwgDy9HBTHr6XViNYqC6pBOMNESBWI6ERHyGhjQdZXhlY3V0ZSBkZWNyZWFzZSByYmYgcG9zaXRpb26D+FDDIViUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ+QDbPP4UMFYfwgAwczEAujD4I1YloVYZoIIBUYCpBFYfwACOFlYjVhmoUy+hqAGAZLYIqAGBA+ioqQSOK1MeoVYkAagiqQRWIFYlVhuoJFYSoagDgGS2CBOoA4ED6KgTqQRZtggBtgniViIhoAP4kX+TIMIA4o5JVyWBAQttIG6SMG2OJiBu8tCAbyTIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJ4gIREgJWJQEgbpUwWfRZMJRBM/QT4uMNDlYfoQ1WIqEFESAFBBEjBAMRIgMCER4CAREQAREkVh9WIshVcNs8yTIzNACEViFWICKBAQsRKchVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERICAREmAVYlASBulTBZ9FkwlEEz9BPiALiCEKvLhjhQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzAH2yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcFMIA1YhVSARH8hVQIIQzayiO1AGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERURHREVERQRHBEUERMRGxETNQCQERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKBxERBwgREAgQbxDeEF0QTBA7SpgQJxAmEEUQNEEwAKjTHwGCEP6ja3G68uCB0z/TB/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANM/1AHQgQEB1wD0BDAQKBAnECYQJRAkECMB8o0HnJlY2VpdmUgdXBkYXRlIExQIHBvc2l0aW9uIG1zZ4P4UMIIAoPf4QlYbAccF8vQRHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEkERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExEfERM4BMwREhEkERIREREjEREREBEiERAPESEPDhEgDg0RHw0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGESQGBREjBQQRIgQDESEDAhEgAts8cFYjwAHjD/hBbyQTXwNWHaoAoVYcofhBbyRfOTo7AdZXIxEcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsCESECESABViDbPDwD/jARIsACjuBXHlceERkRHREZERgRHBEYERcRGxEXERYRGhEWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK5VOQERHwERHlYf2zzjDREfER0RHBEbERoRGREYERcRFhEVERRGR0gD+ts8oYEk1SHCAPL0ER9wESFxESDIVSCCEEmJx8FQBMsfEoEBAc8AgQEBzwDLP8lWEgQDESADAhEhAhEfARAkECNtbds8jQbc2VuZCB1cGRhdGUgTFAgcG9zaXRpb24gbXNng/hQwERkRHBEZERgRGxEYERcRGhEXERYRGREWhohFBN5WEIEBCyVZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeJwVHAAIDQkbrOZXwQgbvLQgG8lmTRWE6QRFEFEA+JwUwPAAOMPUSagU96J/hQwyCs9Pj9AADRsIjMmggDzySFWIb7y9IIApoohViCoKL7y9AH4W1LSoSKoUuKhIqhRM6AhoCegERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRJRETERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRHQsKESUKCREkCUEARGV4ZWN1dGUgaW5jcmVhc2UgbHAgcG9zaXRpb24gb3JkZXIC+CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwgQELJ1RGMFRFUMhVQFBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAhEXAlKgIG6VMFn0WTCUQTP0E+IREyegERImoBBHEGgQRRAkEDhzQwL+CBEjCAcRIgcGESEGBREgBQQRHwQDER4DAhEdAgERJQERJNs8L6AqqFYeqQRwIcEAkjCjkTHiggDsulYmVhehVhaogggPQkCpBFi88vSCAKaKViVWF6hWI77y9BEcESURHBEbESQRGxEaESMRGhEZESIRGREYESERGBEXESARF3BCALARFhEfERYRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEupAcYCERUCUIhWFchVgNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFRqD8hVIIIQWjy/zFAEyx8SgQEBzwCBAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABCsEJpEAMKCEM/a5FlQCssfGIEBAc8AUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUgQEBzwACyIEBAc8AgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AyVjMyQHMAI4RFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkUzBAH2LoEBCyNZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeKBFHYhbrPy9CBu8tCAbyVSsqEiqFLCoSKoUwGgUkCgERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYSQHYERsRHxEbERoRHhEaERkRHREZERgRHBEYERcRGxEXERYRGhEWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU7AxEhAwIRIAIBESEBESBWIds8UAAUERMREhERERBV4AL4ERcRHxEXERYRHhEWERURHREVERQRJBEUERMRIxETERIRIhESERERIRERERARIBEQDxEfDw4RHg4NER0NDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUEESQEAxEjAwIRIgIBESEBESDbPC+gKqhWJKkEcCHBAHBKAv6SMKORMeKCAOy6ViJWF6FWFqiCCA9CQKkEWLvy9FYUViFWFrmSMHCVESFWFaHiH6CBAQttIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIQLlYhASBulTBZ9FkwlEEz9BPiif4US0wANmxpcXVpZGF0ZSBscCBwb3NpdGlvbiBvcmRlcgPmMMhWICDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwClYkoQlWI6EFER0FBBEfBAMRJAMCESMCAREhAREiViBWH8hVcNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHBTB1E6VSARHHNNTgC4ghC/+HX5UAnLHxeBAQHPAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE4EBAc8AAciBAQHPABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwDJAczJAcwB/shVQIIQzayiO1AGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwtPADwKERIKCRERCQgREAgQXxBuED0QTBArShgFUJcQNAEB9FYQgQELJVn0C2+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4oEUdiFus/L0IG7y0IBvJVLSoSKoUuKhIqhRM6AhoIIA88lTGL7y9CehggDjMVM3vvL0UyahERwRJhEcUQH4ERsRJREbERoRJBEaERkRIxEZERgRIhEYERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRJggHESUHBhEkBgURIwUEESIEAxEhA1IDjgIRIAIBER8BER7bPC+gK6hWIqkEcCHBAJMwIKPeggDzM1YRLaBQA6BWKL4S8vRWH8IAnlciER9WIaEgESIBESAB4w1WH8IAcFNUAJAgVieoAREjqQQgVii7lFYnIaGacBEhViigIaERIeKBWN1WIlYYoVYXqIIID0JAqQQBESW8AREkAfL0ggCmilYhVhioVii+8vQDyo5aVx9XH3AggQELbSBukjBtji0gbvLQgG8lyFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMniEC9WIAEgbpUwWfRZMJRBM/QT4gERIAENER8N4w2J/hQwyFYfVVZXAJBTVoEBC1YnAlYkAlYkUFLIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyRAvViABIG6VMFn0WTCUQTP0E+IARGV4ZWN1dGUgZGVjcmVhc2UgbHAgcG9zaXRpb24gb3JkZXID7CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwC1YnoQpWJqEIESQIBxEeBwYRJwYFESAFBBEmBAMRHwMCESMCAREhAQ1WIlYmyFWg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVGFQER5zWFkA4oIQqX/ZSVAMyx8agQEBzwBQCCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhaBAQHPAATIgQEBzwATgQEBzwCBAQHPAAHIgQEBzwATgQEBzwATgQEBzwADyIEBAc8AFIEBAc8AyVjMyVjMyQHMAfzIVSCCEFo8v8xQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QTkzbEDpaABYQeRBoEDcQNkUTBADE0x8BghD/V+VXuvLggdM/0weBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gCBAQHXANQB0IEBAdcAgQEB1wDSANM/gQEB1wD0BDAQbBBrEGoQaRBoEGcB8o0HnJlY2VpdmUgdXBkYXRlIExQIHBvc2l0aW9uIG1zZ4P4UMIIAoPf4QlYfAccF8vQRHhEoER4RHREnER0RHBEmERwRGxElERsRGhEkERoRGREjERkRGBEiERgRFxEhERcRFhEgERYRFREfERURFBEoERQRExEnERNeATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPIgE/BESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEoCgkRJwkIESYIBxElBwYRJAYFESMFBBEiBAMRIQMCESAC2zxWJds8cFYowAqTVyh/lBEowAvijhswBhElBgURJAUEESMEAxEiAwIRIQJXH1cfXwXjDV95YGEB0iHBAZFb4HCTUwK5jq4hgQEBIln0DW+hkjBt3yBukjBtjhDQgQEB1wCBAQHXAFlsEm8C4iBus5Ew4w2k6DDIWYIQZ5PD6VADyx+BAQHPAPQAyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AGIB/hEgmVYfAREhvvLmbJlWHwERIbvy5mziERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5jA/74QW8kE18DVhaqAKFWFaH4QW8k2zyhgSTVIcIA8vQRF3ARIXERGshVIIIQ7wHCtFAEyx8SgQEBzwCBAQHPAMs/ySsEAxEYAwIRIQIRGQEQJBAjbW3bPI0HXNlbmQgdXBkYXRlIHBlcnAgcG9zaXRpb24gbXNng/hQwERIRHBEShoiHAOogIG7y0IBvIjEBIG7y0IBvIjAmgQEBIln0DW+hkjBt3yBukjBtmtCBAQHXAAExbwHiIG4xs44dgQEBAsgBAYEBAc8AyRA3IG6VMFn0WjCUQTP0FeKOHYEBAQLIAQGBAQHPAMkQNyBulTBZ9FowlEEz9BXi4gQBulVmIRBHBgURJAUEESUEAxElAwIBESQBESXbPAYRHgYFER0FBBEcBAMRGwMCERoCAREZAREYBhEXBgURFgUEERUEAxEUAwIREwIBERIBEREGERAGEF8QThA9TLpVJmQC4lYhgQEBJln0DW+hkjBt3yBukjBtjofQ2zxsGm8K4oFsliFus/L0IG7y0IBvKls3ggCPblAG8vRWEIEBASxZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBus5cgbvLQgG8hkjBt4iCBAQsuWfQLb6GSMG3foGUC/iBukjBtjlTQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECMF1AHQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECM1EFpVA2wabwriIG6zlyBu8tCAbyqbMHBUcAAgcFRwACDiVhSVVHQyU0PjDSJmZwAKVHmHU5gD8MAAjhg0VheCAPPJERS+ARETAfL0Vh2kER4DERKSVxPiViKBAQFWG1n0DW+hkjBt3yBukjBtjhPQgQEB1wDSAIEBAdcAVSBsE28D4iBus5cgbvLQgG8jlDBwcCHicCPCAJRWHCO6kXDi4wBWGsIA4wBWGlYaqFYUqGhpagH6MFYZI7yRIpJWGeIRHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERgRFxE3ERcRFhE2ERYRFRE1ERURFBE0ERQRExEzERMREhEyERIRERExEREREBEwERAPES8PDhEuDg0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRJwdrAfgRHRE8ER0RHBE7ERwRGxE6ERsRGhE5ERoRGRE4ERkRGBE3ERgRFxE2ERcRFhE1ERYRFRE0ERURFBEzERQRExEyERMREhExERIREREwEREREBEvERAPES4PDhEtDg0RLA0MESsMCxEqCwoRKQoJESgJCBEnCAcRJgcGESUGbQH8gjAUrfS3MgM0uaoZqQQgERmogggPQkCpBFYYAREaqIIID0JAqQRWGFYaoSGhERqCOAVrx14tYxAAAKhWK6kEAREpAaABESEBESigESBWGKABES4BoIIA4zEhERwRPREcERsRPBEbERoROxEaERkROhEZERgROREYERcROBEXbwL0BhEmBgURJQUEESQEAxEjAwIRIgIBESEBESBWPFYhViNWPNs8ETtWIaEBESQBESGhIMAAk3BXIt4RHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERgRFxE3ERcRFhE2ERYRFRE1ERURFBE0ERQRExEzERMREhEyERJ+bACaERERMRERERARMBEQDxEvDw4RLg4NES0NDBEsDAsRKwsKESoKCREpCQgRKAgHEScHBhEmBgURJQUEESQEAxEjAwIRIgIBESEBAxEgERoC/gURJAUEESMEAxEiAwIRIQIBESABViIBESFWOlY62zwRHRE8ER0RHBE7ERwRGxE6ERsRGhE5ERoRGRE4ERkRGBE3ERgRFxE2ERcRFhE1ERYRFRE0ERURFBEzERQRExEyERMREhExERIREREwEREREBEvERAPES4PDhEtDg0RLA18bgBeDBErDAsRKgsKESkKCREoCQgRJwgHESYHBhElBgURJAUEESMEAxEiAwIRIQIBESAC/hEWETcRFhEVETYRFREUETURFBETETQRExESETMREhERETIREREQETEREA8RMA8QLg0RLg0MES0MCxEsCwoRKwoJESoJCBEpCAcRKAcGEScGBREmBQQRJQQDESQDAhEjAgERIgERIds8AREiAaApoFYlAbsBESIB8vRwVjxWOaFwcQJSjQTY2FsY3VsYXRlIHRvdGFsIHBubIP4UMHBxlCBWHLmK6DAg2zz+FDBycwH8AREoAaARGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMAIRIQIBESABViYBESZWPFY8ewH8ERwRHhEcERsRHREbERoRHhEaERkRHREZERgRHhEYERcRHREXERYRHhEWERURHREVERQRHhEUERMRHRETERIRHhESERERHRERERARHhEQDxEdDw4RHg4NER0NDBEeDAsRHQsKER4KCREdCQgRHggHER0HBhEeBgURHQUEER4EdADeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQA/4DER0DAhEeAgERHQERHlYe2zyOsSaBAQFWIFn0DW+hkjBt3yBukjBtjhPQgQEB1wDSAIEBAdcAVSBsE28D4iBus5Ew4w3eER6kERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUdXZ3AV6BAQFWHAJZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuIgbpIwcOAgbvLQgG8qEIlfCaAB+iBu8tCAbyMRHBEfERwRGxEeERsRGhEdERoRGREfERkRGBEeERgRFxEdERcRFhEfERYRFREeERURFBEdERQRExEfERMREhEeERIREREdEREREBEfERAPER4PDhEdDg0RHw0MER4MCxEdCwoRHwoJER4JCBEdCAcRHwcGER4GeABwERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDAC/AURHQUEER8EAxEeAwIRHQIBER8BER5WIds8ER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8Qvnl6AF6BAQEjAln0DW+hkjBt3yBukjBtmtCBAQHXAAExbwHicCFus5gwIG7y0IBvIZEx4gE6EK0QnBCLEHoQaRBYEEcQNkVAECPbPAERHgGgER1+AvzbPBEmVjugERwRHREcERsRHREbERoRHREaERkRHREZERgRHREYERcRHREXERYRHREWERURHREVERQRHREUERMRHRETERIRHRESERERHRERERARHREQDxEdDw4RHQ4NER0NDBEdDAsRHQsKER0KCREdCREdCAcGVUBWIVYeVih8fQBWI8AAkyHAAJFw4pNfBHDgI8AAkmwx4CHAAJQQI18D4FIzqFITqBKgWaCpBAPmVj3bPFYeVjyoARE2qIIwFK30tzIDNLmqGakEARE2oFYlgW+7ETaguQERNAHy9FYjggCmihE2qFYcvgERNQHy9FYejhJXH1crVytXK1crViBWHlYXViHjDhA4R2UEETMEAxEpAwIRKAIBEScBESaBAQsRJn5/gABIA44QEqGogjgFa8deLWMQAACpBOBYoaiCOAVrx14tYxAAAKkEAIhXJlcmVyZXJlcmViBWHlYXViERHhEzER4RKREuESkRKBEtESgRJxEsEScRJhErESYDESkDAhEoAgERJwERJhEeESURHgH8yFWQEFoQSRA4R2pQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyFVABlBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAczJAhEnAgERHQFWEgEgbpUwWfRZMJRBM/QT4oEBAQHIAQH0AMkCERUCgQLmVhMBIG6VMFn0WjCUQTP0FeKBAQFWFlYWViLIVSBQI4EBAc8AygCBAQHPAMkCESQCVhMBIG6VMFn0WjCUQTP0FeIKERkKEJ9WEQkIERMIBxEuBwYRFwYFES0FEE8DESwDAhEYAgERKgERGVYREshVwNs8yYKDAPSCEAeQMEFQDssfHIEBAc8AUAog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYgQEBzwAWygAEyIEBAc8AE4EBAc8AgQEBzwAByIEBAc8AE4EBAc8AE4EBAc8AA8iBAQHPABSBAQHPABSBAQHPAMkBzMkBzMkBzAHayIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEDYQKhEUVBkFyFVAghB+t/uWUAbLHxSBAQHPABKBAQHPAMoAgQEBzwAByIEBAc8AyQHMyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHBWFlE9AxEeWYQB/shVQIIQzayiO1AGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABBEcBAMRGwMOERoOCBEZCAgRGAgHERcHAREWAQQRFQQFERQFAxETAxESDhERDgYREAYQLxA+EJ2FABgQnBCbEJoHCAZBVQQAZGwx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDD6ADFx1yH6ADH6ADCnA6sAAH4REREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9TBpVgAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAiQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIIyNAgEgk5QC7bl/jbPBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2zRIG6SMG2ZIG7y0IBvIW8B4iBukjBt3ooY4CAcePkAA+gQEBIwJZ9A1voZIwbd8gbpIwbZrQgQEB1wABMW8B4gIUquHbPNs8bOds96GRAhipHds82zxXEF8PbNGhkgAcVhhWGFYYVhhWGFYYVhcABFYSAN27vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygCASCVlgIBIJeYAgEgnZ4AEbCvu1E0NIAAYAIBIJmaA/mufZBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtngiOCI6IjgiNiI4IjYiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7ZowKGbnAB1rN3Ghq0uDM5nReXqLaxsKw4mqosKCusrSmyuqWamaQiqDc0JRo9GTKyJjwlOCqxKiMpsKC9N6OyGkEAAfIEBCy4CWfQLb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiACwgbpIwbZkgbvLQgG8lbwXiIG6SMG3eAu2yBzbPBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2zRIG6SMG2ZIG7y0IBvKm8K4iBukjBt3oKGfA/mz1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9s0YKGiowE8gQEBVhwCWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwrioAB+1AHQAdIAgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wCBAQHXADAQWhBZEFgQVxBWAujtRNDUAfhj0gABjtLbPFcdERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJgQEB1wABAdHbPKSlAG6BAQtWEgJZ9AtvoZIwbd8gbpIwbY4g0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiACwgbpIwbZkgbvLQgG8kbwTiIG6SMG3eAfSBAQHXAIEBAdcA9ASBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BKYB9jCCCvrwgIIJycOAbXGBASxTEYBkgggHoSCCCA9CQG0kbSFtcCBtJG0j+EJTEchyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUyJUdEQgBxESBwYREQYHERAHEG8QXhBNEHwQaxA6SYcQVqcA3tM/1DDQgQEB1wCBAQHXAFkC9ATTP9Qw0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMAT0BNQw0IEBAdcAgQEB1wD0BNM/9ASBAQHXADARGREdERkRGREcERkRGREbERkRGREaERkQ3hCaEIkQeAAIBAVVIA==');
    const __system = Cell.fromBase64('te6cckECqgEANz0AAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWIdBAIBIBUFAgEgFAYCASANBwIBIAsIA/mz1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9s0YKUKCQAsIG6SMG2ZIG7y0IBvJG8E4iBukjBt3gBugQELVhICWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4gLtsgc2zwRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9s0SBukjBtmSBu8tCAbypvCuIgbpIwbd6ClDAE8gQEBVhwCWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwrilgIBIBMOAgEgEA8AdazdxoatLgzOZ0Xl6i2sbCsOJqqLCgrrK0psrqlmpmkIqg3NCUaPRkysiY8JTgqsSojKbCgvTejshpBAA/mufZBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtngiOCI6IjgiNiI4IjYiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7ZowKUSEQAsIG6SMG2ZIG7y0IBvJW8F4iBukjBt3gB8gQELLgJZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIAEbCvu1E0NIAAYADdu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgGxYCAccZFwIYqR3bPNs8VxBfD2zRpRgABFYSAhSq4ds82zxs52z3pRoAHFYYVhhWGFYYVhhWGFYXAu25f42zwRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9s0SBukjBtmSBu8tCAbyFvAeIgbpIwbd6KUcAD6BAQEjAln0DW+hkjBt3yBukjBtmtCBAQHXAAExbwHiAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERKlHgKSERERExERERAREhEQDxERDw4REA4Q31Uc2zzy4ILI+EMBzH8BygARHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVCIfAeYBERwBER2BAQHPAAERGgGBAQHPAAERGAH0AAERFgGBAQHPABEUyIEBAc8AARETAYEBAc8AARERAYEBAc8AD8iBAQHPAB6BAQHPAByBAQHPAMhQCyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAJIAH+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WF/QAFcs/yEBDAoEBAc8AgQEBzwD0ABLLP8hEFFBnUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMFfQABciBAQHPABeBAQHPABf0ABfLPxf0ABeBAQHPAMlQBszJAczJASEAFMzJWMzJAczJAcwEbgGSMH/gcCHXScIflTAg1wsf3iCCEE01qZy6jwgw2zxsGds8f+AgghCCB/kvuuMCIIIQ6JzUX7qimZIjBDqPCDDbPGwX2zx/4CCCEP6ja3G64wIgghD/V+VXupFqRCQDfI8IMNs8bBzbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwQyYlATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPJ0B8o0HnJlY2VpdmUgdXBkYXRlIExQIHBvc2l0aW9uIG1zZ4P4UMIIAoPf4QlYfAccF8vQRHhEoER4RHREnER0RHBEmERwRGxElERsRGhEkERoRGREjERkRGBEiERgRFxEhERcRFhEgERYRFREfERURFBEoERQRExEnERMnBPwREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRKAoJEScJCBEmCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAts8ViXbPHBWKMAKk1cof5QRKMAL4o4bMAYRJQYFESQFBBEjBAMRIgMCESECVx9XH18F4w2PjSooA/74QW8kE18DVhaqAKFWFaH4QW8k2zyhgSTVIcIA8vQRF3ARIXERGshVIIIQ7wHCtFAEyx8SgQEBzwCBAQHPAMs/ySsEAxEYAwIRIQIRGQEQJBAjbW3bPI0HXNlbmQgdXBkYXRlIHBlcnAgcG9zaXRpb24gbXNng/hQwERIRHBESbp0pAH4REREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9TBpVgAsB/hEgmVYfAREhvvLmbJlWHwERIbvy5mziERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH4rAbpVZiEQRwYFESQFBBElBAMRJQMCAREkAREl2zwGER4GBREdBQQRHAQDERsDAhEaAgERGQERGAYRFwYFERYFBBEVBAMRFAMCERMCARESARERBhEQBhBfEE4QPUy6VSYsAuJWIYEBASZZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBbJYhbrPy9CBu8tCAbypbN4IAj25QBvL0VhCBAQEsWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELLln0C2+hkjBt35YtAv4gbpIwbY5U0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjBdQB0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjNRBaVQNsGm8K4iBus5cgbvLQgG8qmzBwVHAAIHBUcAAg4lYUlVR0MlND4w0iQi4D8MAAjhg0VheCAPPJERS+ARETAfL0Vh2kER4DERKSVxPiViKBAQFWG1n0DW+hkjBt3yBukjBtjhPQgQEB1wDSAIEBAdcAVSBsE28D4iBus5cgbvLQgG8jlDBwcCHicCPCAJRWHCO6kXDi4wBWGsIA4wBWGlYaqFYUqD87LwH8gjAUrfS3MgM0uaoZqQQgERmogggPQkCpBFYYAREaqIIID0JAqQRWGFYaoSGhERqCOAVrx14tYxAAAKhWK6kEAREpAaABESEBESigESBWGKABES4BoIIA4zEhERwRPREcERsRPBEbERoROxEaERkROhEZERgROREYERcROBEXMAL+ERYRNxEWERURNhEVERQRNREUERMRNBETERIRMxESERERMhERERARMREQDxEwDxAuDREuDQwRLQwLESwLChErCgkRKgkIESkIBxEoBwYRJwYFESYFBBElBAMRJAMCESMCAREiAREh2zwBESIBoCmgViUBuwERIgHy9HBWPFY5oYQxAfwBESgBoBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQwAhEhAgERIAFWJgERJlY8VjwyAvzbPBEmVjugERwRHREcERsRHREbERoRHREaERkRHREZERgRHREYERcRHREXERYRHREWERURHREVERQRHREUERMRHRETERIRHRESERERHRERERARHREQDxEdDw4RHQ4NER0NDBEdDAsRHQsKER0KCREdCREdCAcGVUBWIVYeVig+MwPmVj3bPFYeVjyoARE2qIIwFK30tzIDNLmqGakEARE2oFYlgW+7ETaguQERNAHy9FYjggCmihE2qFYcvgERNQHy9FYejhJXH1crVytXK1crViBWHlYXViHjDhA4R2UEETMEAxEpAwIRKAIBEScBESaBAQsRJow6NAH8yFWQEFoQSRA4R2pQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyFVABlBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAczJAhEnAgERHQFWEgEgbpUwWfRZMJRBM/QT4oEBAQHIAQH0AMkCERUCNQLmVhMBIG6VMFn0WjCUQTP0FeKBAQFWFlYWViLIVSBQI4EBAc8AygCBAQHPAMkCESQCVhMBIG6VMFn0WjCUQTP0FeIKERkKEJ9WEQkIERMIBxEuBwYRFwYFES0FEE8DESwDAhEYAgERKgERGVYREshVwNs8yTk2AdrIgljAAAAAAAAAAAAAAAABActnzMlw+wAQNhAqERRUGQXIVUCCEH63+5ZQBssfFIEBAc8AEoEBAc8AygCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcFYWUT0DER5ZNwH+yFVAghDNrKI7UAbLHxSBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAEERwEAxEbAw4RGg4IERkICBEYCAcRFwcBERYBBBEVBAURFAUDERMDERIOEREOBhEQBhAvED4QnTgAGBCcEJsQmgcIBkFVBAD0ghAHkDBBUA7LHxyBAQHPAFAKINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGIEBAc8AFsoABMiBAQHPABOBAQHPAIEBAc8AAciBAQHPABOBAQHPABOBAQHPAAPIgQEBzwAUgQEBzwAUgQEBzwDJAczJAczJAcwAiFcmVyZXJlcmVyZWIFYeVhdWIREeETMRHhEpES4RKREoES0RKBEnESwRJxEmESsRJgMRKQMCESgCAREnAREmER4RJREeAfgRHRE8ER0RHBE7ERwRGxE6ERsRGhE5ERoRGRE4ERkRGBE3ERgRFxE2ERcRFhE1ERYRFRE0ERURFBEzERQRExEyERMREhExERIREREwEREREBEvERAPES4PDhEtDg0RLA0MESsMCxEqCwoRKQoJESgJCBEnCAcRJgcGESUGPAL+BREkBQQRIwQDESIDAhEhAgERIAFWIgERIVY6VjrbPBEdETwRHREcETsRHBEbEToRGxEaETkRGhEZETgRGREYETcRGBEXETYRFxEWETURFhEVETQRFREUETMRFBETETIRExESETEREhERETAREREQES8REA8RLg8OES0ODREsDT49AF4MESsMCxEqCwoRKQoJESgJCBEnCAcRJgcGESUGBREkBQQRIwQDESIDAhEhAgERIABWI8AAkyHAAJFw4pNfBHDgI8AAkmwx4CHAAJQQI18D4FIzqFITqBKgWaCpBAH6MFYZI7yRIpJWGeIRHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERgRFxE3ERcRFhE2ERYRFRE1ERURFBE0ERQRExEzERMREhEyERIRERExEREREBEwERAPES8PDhEuDg0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRJwdAAvQGESYGBRElBQQRJAQDESMDAhEiAgERIQERIFY8ViFWI1Y82zwRO1YhoQERJAERIaEgwACTcFci3hEcETwRHBEbETsRGxEaEToRGhEZETkRGREYETgRGBEXETcRFxEWETYRFhEVETURFREUETQRFBETETMRExESETIREoxBAJoRERExEREREBEwERAPES8PDhEuDg0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRJwcGESYGBRElBQQRJAQDESMDAhEiAgERIQEDESARGgAKVHmHU5gAxNMfAYIQ/1flV7ry4IHTP9MHgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAgQEB1wDUAdCBAQHXAIEBAdcA0gDTP4EBAdcA9AQwEGwQaxBqEGkQaBBnAhAw2zxsGNs8f2lFAfKNB5yZWNlaXZlIHVwZGF0ZSBMUCBwb3NpdGlvbiBtc2eD+FDCCAKD3+EJWGwHHBfL0ER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRJBEYERcRIxEXERYRIhEWERURIREVERQRIBEUERMRHxETRgTMERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEkBgURIwUEESIEAxEhAwIRIALbPHBWI8AB4w/4QW8kE18DVh2qAKFWHKH4QW8kj19JRwP62zyhgSTVIcIA8vQRH3ARIXERIMhVIIIQSYnHwVAEyx8SgQEBzwCBAQHPAMs/yVYSBAMRIAMCESECER8BECQQI21t2zyNBtzZW5kIHVwZGF0ZSBMUCBwb3NpdGlvbiBtc2eD+FDARGREcERkRGBEbERgRFxEaERcRFhEZERZunUgAjhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgQRxA2RTMEA/4wESLAAo7gVx5XHhEZER0RGREYERwRGBEXERsRFxEWERoRFhEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuVTkBER8BER5WH9s84w0RHxEdERwRGxEaERkRGBEXERYRFREUV0tKABQRExESEREREFXgAdgRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMVTsDESEDAhEgAgERIQERIFYh2zxMAfRWEIEBCyVZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeKBFHYhbrPy9CBu8tCAbyVS0qEiqFLioSKoUTOgIaCCAPPJUxi+8vQnoYIA4zFTN77y9FMmoREcESYRHE0B+BEbESURGxEaESQRGhEZESMRGREYESIRGBEXESERFxEWESARFhEVER8RFREUER4RFBETER0RExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIESYIBxElBwYRJAYFESMFBBEiBAMRIQNOA44CESACAREfAREe2zwvoCuoViKpBHAhwQCTMCCj3oIA8zNWES2gUAOgVii+EvL0Vh/CAJ5XIhEfViGhIBEiAREgAeMNVh/CAIRWTwPKjlpXH1cfcCCBAQttIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIQL1YgASBulTBZ9FkwlEEz9BPiAREgAQ0RHw3jDYn+FDDIVh9VVFAD7CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwC1YnoQpWJqEIESQIBxEeBwYRJwYFESAFBBEmBAMRHwMCESMCAREhAQ1WIlYmyFWg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVGFQER6FU1EB/MhVIIIQWjy/zFAEyx8SgQEBzwCBAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBOTNsQOlIAFhB5EGgQNxA2RRMEAOKCEKl/2UlQDMsfGoEBAc8AUAgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYWgQEBzwAEyIEBAc8AE4EBAc8AgQEBzwAByIEBAc8AE4EBAc8AE4EBAc8AA8iBAQHPABSBAQHPAMlYzMlYzMkBzABEZXhlY3V0ZSBkZWNyZWFzZSBscCBwb3NpdGlvbiBvcmRlcgCQU1aBAQtWJwJWJAJWJFBSyFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMkQL1YgASBulTBZ9FkwlEEz9BPiAJAgVieoAREjqQQgVii7lFYnIaGacBEhViigIaERIeKBWN1WIlYYoVYXqIIID0JAqQQBESW8AREkAfL0ggCmilYhVhioVii+8vQB9i6BAQsjWfQLb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXigRR2IW6z8vQgbvLQgG8lUrKhIqhSwqEiqFMBoFJAoBEcESQRHBEbESMRGxEaESIRGhEZESERGREYESARGFgC+BEXER8RFxEWER4RFhEVER0RFREUESQRFBETESMRExESESIREhERESEREREQESAREA8RHw8OER4ODREdDQwRJAwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEkBAMRIwMCESICAREhAREg2zwvoCqoViSpBHAhwQCEWQL+kjCjkTHiggDsulYiVhehVhaogggPQkCpBFi78vRWFFYhVha5kjBwlREhVhWh4h+ggQELbSBukjBtji0gbvLQgG8lyFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMniEC5WIQEgbpUwWfRZMJRBM/QT4on+FF5aA+YwyFYgINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfkA2zz+FDAKViShCVYjoQURHQUEER8EAxEkAwIRIwIBESEBESJWIFYfyFVw2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcFMHUTpVIBEchV1bAf7IVUCCEM2sojtQBssfFIEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLXAA8ChESCgkREQkIERAIEF8QbhA9EEwQK0oYBVCXEDQBALiCEL/4dflQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzAA2bGlxdWlkYXRlIGxwIHBvc2l0aW9uIG9yZGVyAdZXIxEcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsCESECESABViDbPGAE3lYQgQELJVn0C2+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4nBUcAAgNCRus5lfBCBu8tCAbyWZNFYTpBEUQUQD4nBTA8AA4w9RJqBT3on+FDDIK2hlZGEC+CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwgQELJ1RGMFRFUMhVQFBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAhEXAlKgIG6VMFn0WTCUQTP0E+IREyegERImoBBHEGgQRRAkEDiFYgHGAhEVAlCIVhXIVYDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBUag/IVSCCEFo8v8xQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAQrBCaYwDCghDP2uRZUArLHxiBAQHPAFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFIEBAc8AAsiBAQHPAIEBAc8AEoEBAc8AAsiBAQHPABOBAQHPABOBAQHPAMlYzMkBzABEZXhlY3V0ZSBpbmNyZWFzZSBscCBwb3NpdGlvbiBvcmRlcgH4W1LSoSKoUuKhIqhRM6AhoCegERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRJRETERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRHQsKESUKCREkCWYC/ggRIwgHESIHBhEhBgURIAUEER8EAxEeAwIRHQIBESUBESTbPC+gKqhWHqkEcCHBAJIwo5Ex4oIA7LpWJlYXoVYWqIIID0JAqQRYvPL0ggCmilYlVheoViO+8vQRHBElERwRGxEkERsRGhEjERoRGREiERkRGBEhERgRFxEgEReEZwCwERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHEG8QXhBNEDxLqQA0bCIzJoIA88khViG+8vSCAKaKIVYgqCi+8vQAqNMfAYIQ/qNrcbry4IHTP9MH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA0z/UAdCBAQHXAPQEMBAoECcQJhAlECQQIwHsjQbcmVjZWl2ZSB1cGRhdGUgcG9zaXRpb24gbXNng/hQwggCg9/hCVhoBxwXy9BEeESMRHhEdESIRHREcESERHBEbESARGxEaER8RGhEZESMRGREYESIRGBEXESERFxEWESARFhEVER8RFREUESMRFBETESIRE2sEyBESESEREhERESAREREQER8REA8RIw8OESIODREhDQwRIAwLER8LChEjCgkRIgkIESEIBxEgBwYRHwYFESMFBBEiBAMRIQMCESAC2zxwER7jD/hBbyQTXwNWHaoAoVYcofhBbySPe29sA/zbPKGBJNUhwgDy9BEgcBEgcREgyFUgghAc8M+BUATLHxKBAQHPAIEBAc8Ayz/JVhIEAxEhAwIRIAIRHwEQJBAjbW3bPI0HHNlbmQgdXBkYXRlIFJCRiBwb3NpdGlvbiBtc2eD+FDARGREcERkRGBEbERgRFxEaERcRFhEZERZunW0AaBEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsAZGwx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDD6ADFx1yH6ADH6ADCnA6sAAv5XHREbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsSAREfAVYf2zwRHhEdERwRGxEaERkRGBEXERYRFREUERMREhERcXAACBEQVeAD7lYTgQELJFn0C2+hkjBt3yBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOKBFHYhbrPy9CBu8tCAbyQg2zz+FDD4I9s8/hQwgXrBIfgju/L0ggDjMVM2vvL0ERwRIxEcERsRIhEbERoRIREahYVyAvoRGREgERkRGBEfERgRFxEeERcRFhEdERYRFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEjDg0RIg0MESEMCxEgCwoRHwoJER4JCBEdCAcRIwcGESIGBREhBQQRIAQDER8DAhEeAgERHQERI9s8L4RzAvqBWsQCoMIA8vQuERwRHREcERsRHREbERoRHREaERkRHREZERgRHREYERcRHREXERYRHREWERURHREVERQRHREUERMRHRETERIRHRESERERHRERERARHREQDxEdDw4RHQ4NER0NDBEdDAsRHQsKER0KCREdCREdCAcGVUDbPIR0A/gBER4BoCDBAJIwcN6CAPGrIcIA8vRwUx6+l1YjWKguqQTjDREgViOhER8hoY0HWV4ZWN1dGUgZGVjcmVhc2UgcmJmIHBvc2l0aW9ug/hQwyFYlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfkA2zz+FDBWH8IAeoV1A/iRf5MgwgDijklXJYEBC20gbpIwbY4mIG7y0IBvJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMniAhESAlYlASBulTBZ9FkwlEEz9BPi4w0OVh+hDVYioQURIAUEESMEAxEiAwIRHgIBERABESRWH1YiyFVw2zzJeXh2AfbIgljAAAAAAAAAAAAAAAABActnzMlw+wBwUwgDViFVIBEfyFVAghDNrKI7UAbLHxSBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARFREdERURFBEcERQRExEbERN3AJAREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoHEREHCBEQCBBvEN4QXRBMEDtKmBAnECYQRRA0QTAAuIIQq8uGOFAJyx8XgQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhOBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AyQHMyQHMAIRWIVYgIoEBCxEpyFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyQIREgIBESYBViUBIG6VMFn0WTCUQTP0E+IAujD4I1YloVYZoIIBUYCpBFYfwACOFlYjVhmoUy+hqAGAZLYIqAGBA+ioqQSOK1MeoVYkAagiqQRWIFYlVhuoJFYSoagDgGS2CBOoA4ED6KgTqQRZtggBtgniViIhoAHEERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHQERIAERH1Yf2zx8AfJWE4EBCyRZ9AtvoZIwbd8gbpIwbY4g0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTicFRwADAyIm6zmVsgbvLQgG8kMJcyVhSkERVZ4lYUERwRIxEcERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXfQP8ERYRHREWERURIxEVERQRIhEUERMRIRETERIRIBESERERHxERERARHhEQDxEdDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHESMHBhEiBgURIQUEESAEAxEfAwIRHgIBER0BESPbPAERJAGgIMEAkjBw3nBTHrmRMeMNhIN+AvwRHlYhoPgjVhmgjQdZXhlY3V0ZSBpbmNyZWFzZSByYmYgcG9zaXRpb26D+FDDIViQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ+QDbPP4UMIEBC1YhI1YhJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMmFfwK6AhETAlYlASBulTBZ9FkwlEEz9BPiD1YioA5WIqAGESAGBREjBQQRIgQTAhEfAgERHgEREVYhyFVw2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcFMIUT1VIBEegoAB+MhVQIIQzayiO1AGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAjQdaW5jcmVhc2UgcmJmIHBvc2l0aW9uIHN1Y2Nlc3OD+FDARFREcERURFBEbERQRExEaEROBAIQREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoHERAHEI8QbhCdEFwQSxA6SYcQRhA1QQQAuIIQ8Kq61VAJyx8XgQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhOBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AyQHMyQHMAUwwUtChVhcBqFYhqC2pBItmJvbnVzOo/hQwINs8/hQwER1WHaARHYUCUo0E2NhbGN1bGF0ZSB0b3RhbCBwbmyD+FDBwcZQgVhy5iugwINs8/hQwhoUA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AH8ERwRHhEcERsRHREbERoRHhEaERkRHREZERgRHhEYERcRHREXERYRHhEWERURHREVERQRHhEUERMRHRETERIRHhESERERHRERERARHhEQDxEdDw4RHg4NER0NDBEeDAsRHQsKER4KCREdCQgRHggHER0HBhEeBgURHQUEER4EhwP+AxEdAwIRHgIBER0BER5WHts8jrEmgQEBViBZ9A1voZIwbd8gbpIwbY4T0IEBAdcA0gCBAQHXAFUgbBNvA+IgbrORMOMN3hEepBEcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFI6JiABwERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDAB+iBu8tCAbyMRHBEfERwRGxEeERsRGhEdERoRGREfERkRGBEeERgRFxEdERcRFhEfERYRFREeERURFBEdERQRExEfERMREhEeERIREREdEREREBEfERAPER4PDhEdDg0RHw0MER4MCxEdCwoRHwoJER4JCBEdCAcRHwcGER4GigL8BREdBQQRHwQDER4DAhEdAgERHwERHlYh2zwRHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+jYsBOhCtEJwQixB6EGkQWBBHEDZFQBAj2zwBER4BoBEdjABIA44QEqGogjgFa8deLWMQAACpBOBYoaiCOAVrx14tYxAAAKkEAF6BAQEjAln0DW+hkjBt3yBukjBtmtCBAQHXAAExbwHicCFus5gwIG7y0IBvIZEx4gFegQEBVhwCWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwriIG6SMHDgIG7y0IBvKhCJXwmWAdIhwQGRW+Bwk1MCuY6uIYEBASJZ9A1voZIwbd8gbpIwbY4Q0IEBAdcAgQEB1wBZbBJvAuIgbrORMOMNpOgwyFmCEGeTw+lQA8sfgQEBzwD0AMnIgljAAAAAAAAAAAAAAAABActnzMlw+wCQAOogIG7y0IBvIjEBIG7y0IBvIjAmgQEBIln0DW+hkjBt3yBukjBtmtCBAQHXAAExbwHiIG4xs44dgQEBAsgBAYEBAc8AyRA3IG6VMFn0WjCUQTP0FeKOHYEBAQLIAQGBAQHPAMkQNyBulTBZ9FowlEEz9BXi4gQAgtMfAYIQ6JzUX7ry4IHSANM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANM/gQEB1wD0BFVgAhAw2zxsG9s8f5eTAfQRHBEnERwRGxEmERsRGhElERoRGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEdERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGEScGBREmBZQD/gQRJQQDESQDAhEjAgERIgERIds8gQEBVhsCESJZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuIgbjGzMFYeblcfER6zMFYcblcdERyzMFYablcbERqzMFYjblckESOzMFYhblciESGzMFYcblcdERyzMFYeblcfER6zMFYcblcdERyhlpUB0rMwVhpuVxsRGrMwVhduVxgRF7Mw+EJwcIBAECNtbW3bPBERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIERMIBxESBwYREQYFERAFEE8QPk0bScoQOBBHFhRDMJ0AftQB0AHSAIEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wAwEFoQWRBYEFcQVgLy0x8BghCCB/kvuvLggYEBAdcA0gABk9QB0JFt4gHSAAGS0gCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUAdDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNDSAAGSbQHjDdIAAaSYAESVgQEB1wCSbQHi0gABloEBAdcAMJIwbeIQaxBqEGkQaBBnAfQRHBElERwRGxEkERsRGhEjERoRGREiERkRGBEhERgRFxEgERcRFhEfERYRFREeERURFBEdERQRExElERMREhEkERIREREjEREREBEiERAPESEPDhEgDg0RHw0MER4MCxEdCwoRJQoJESQJCBEjCAcRIgcGESEGBREgBZoE/AQRHwQDER4DAhEdAgERJQERJNs8ViNus51XHBEiIG7y0IARGxEiklcj4lYhbrOdVxoRICBu8tCAERkRIJJXIeJWH26znVcWER4gbvLQgBEVER6SVx/iVh1us51XFBEcIG7y0IARExEcklcd4lYbbrOSVxvjDVYZbrOSVxnjDaGgn5sC+lYXbrObPhEWIG7y0IANERaSVxfiVh5us5s8ER0gbvLQgAsRHZJXHuJWHG6zmzkRGyBu8tCACBEbklcc4vhCcHCAQBAjbW1t2zwRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJnZwALAgREQgHERAHEG8QXhBNEDxLGVCoXlEByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAngCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAYVxARGCBu8tCADxEYABpXEhEaIG7y0IAREREaABT4QlYTAccF8uCEAuzTHwGCEE01qZy68uCB0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi1AHQ0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi1DDQ0gABlYEBAdcAkm0B4tIAAZJtAeMNpKMAZPpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxEGkQaBBnAAqBAQHXAALo7UTQ1AH4Y9IAAY7S2zxXHREbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgiYEBAdcAAQHR2zyopgH2MIIK+vCAggnJw4BtcYEBLFMRgGSCCAehIIIID0JAbSRtIW1wIG0kbSP4QlMRyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhTIlR0RCAHERIHBhERBgcREAcQbxBeEE0QfBBrEDpJhxBWpwAIBAVVIAH0gQEB1wCBAQHXAPQEgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASpAN7TP9Qw0IEBAdcAgQEB1wBZAvQE0z/UMNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzAE9ATUMNCBAQHXAIEBAdcA9ATTP/QEgQEB1wAwERkRHREZERkRHBEZERkRGxEZERkRGhEZEN4QmhCJEHgq/+xr');
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
    22749: { message: `risk rate too hig` },
    23236: { message: `insufficient global RBF` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31425: { message: `not reach unlock time` },
    36718: { message: `disabled token` },
    41207: { message: `invalid sender` },
    42634: { message: `legerage too high` },
    58161: { message: `insufficient liquidity` },
    60602: { message: `risk rate too high` },
    61867: { message: `insuficient global net RBF` },
    62259: { message: `insufficient global liquidity` },
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
    {"name":"UpdateConfig","header":1295362460,"fields":[{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"rbfLockTime","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"bonusFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"minLPMargin","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxLPLeverage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpLiquidationFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpMaxRiskRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"UpdateTokenConfig","header":2181560623,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"name","type":{"kind":"simple","type":"string","optional":true}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"protocalTradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"UpdateRBFPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateRBFPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateLPPosition","header":4272122737,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateLPPositionSuccess","header":1233766337,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"RBFPositionIncreasedEvent","header":4037720789,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionDecreasedEvent","header":2882242104,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalRBFChangedEvent","header":3450643003,"fields":[{"name":"riskBufferFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidation","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionIncreasedEvent","header":3487229017,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionDecreasedEvent","header":2843728201,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedLoss","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionLiquidatedEvent","header":3220731385,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPLiquidityChangedEvent","header":1513930700,"fields":[{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPositionChangedEvent","header":2125986710,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionIncreasedEvent","header":126890049,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionDecreasedEvent","header":1641924276,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePriceEvent","header":1737737193,"fields":[{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"rbfLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minLPMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLPLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpMaxRiskRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"protocalTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalRBFPosition","header":null,"fields":[{"name":"riskBufferFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryTradingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPLiquidity","header":null,"fields":[{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PriceData","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"priceData","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PriceData","optional":true}},
    {"name":"rbfPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"RBFPosition","optional":true}},
    {"name":"lpPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"LPPosition","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRBFPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPosition"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | UpdateRBFPosition | UpdateLPPosition | UpdatePerpPosition | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenConfig') {
            body = beginCell().store(storeUpdateTokenConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRBFPosition') {
            body = beginCell().store(storeUpdateRBFPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLPPosition') {
            body = beginCell().store(storeUpdateLPPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePerpPosition') {
            body = beginCell().store(storeUpdatePerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getConfigData(provider: ContractProvider) {
        let builder = new TupleBuilder();
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
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTuplePriceData(result_p) : null;
        return result;
    }
    
    async getRbfPosition(provider: ContractProvider, account: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('rbfPosition', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleRBFPosition(result_p) : null;
        return result;
    }
    
    async getLpPosition(provider: ContractProvider, account: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('lpPosition', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleLPPosition(result_p) : null;
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}