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
    gasConsumption: bigint;
    minTonsForStorage: bigint;
    lpLockTime: bigint;
    bonusFactor: bigint;
    orderBook: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2443370762, 32);
        b_0.storeInt(src.gasConsumption, 257);
        b_0.storeInt(src.minTonsForStorage, 257);
        b_0.storeInt(src.lpLockTime, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.bonusFactor, 257);
        b_1.storeAddress(src.orderBook);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2443370762) { throw Error('Invalid prefix'); }
    let _gasConsumption = sc_0.loadIntBig(257);
    let _minTonsForStorage = sc_0.loadIntBig(257);
    let _lpLockTime = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _bonusFactor = sc_1.loadIntBig(257);
    let _orderBook = sc_1.loadAddress();
    return { $$type: 'UpdateConfig' as const, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, bonusFactor: _bonusFactor, orderBook: _orderBook };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _lpLockTime = source.readBigNumber();
    let _bonusFactor = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'UpdateConfig' as const, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpLockTime: _lpLockTime, bonusFactor: _bonusFactor, orderBook: _orderBook };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.lpLockTime);
    builder.writeNumber(source.bonusFactor);
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
    minMargin: bigint;
    maxLeverage: bigint;
    liquidationFee: bigint;
    tradingFeeRate: bigint;
    lpTradingFeeRate: bigint;
    interestRate: bigint;
    maxFundingRate: bigint;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2464869117, 32);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
        b_0.storeInt(src.minMargin, 257);
        b_0.storeInt(src.maxLeverage, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidationFee, 257);
        b_1.storeInt(src.tradingFeeRate, 257);
        b_1.storeInt(src.lpTradingFeeRate, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.interestRate, 257);
        b_2.storeInt(src.maxFundingRate, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2464869117) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadIntBig(257);
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _minMargin = sc_0.loadIntBig(257);
    let _maxLeverage = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationFee = sc_1.loadIntBig(257);
    let _tradingFeeRate = sc_1.loadIntBig(257);
    let _lpTradingFeeRate = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _interestRate = sc_2.loadIntBig(257);
    let _maxFundingRate = sc_2.loadIntBig(257);
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleUpdateTokenConfig(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minMargin = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
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
        b_0.storeInt(src.pricesLength, 257);
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
    let _pricesLength = sc_0.loadIntBig(257);
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
        b_0.storeInt(src.orderId, 257);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 485543809) { throw Error('Invalid prefix'); }
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

export type LPPositionIncreasedEvent = {
    $$type: 'LPPositionIncreasedEvent';
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
        b_0.storeUint(3341824165, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.unlockTimeAfter, 257);
        b_2.storeInt(src.realizedFundingFeeDelta, 257);
        b_2.storeInt(src.realizedFundingFeeAfter, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3341824165) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _unlockTimeAfter = sc_2.loadIntBig(257);
    let _realizedFundingFeeDelta = sc_2.loadIntBig(257);
    let _realizedFundingFeeAfter = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'LPPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFeeDelta: _realizedFundingFeeDelta, realizedFundingFeeAfter: _realizedFundingFeeAfter, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
}

function loadTupleLPPositionIncreasedEvent(source: TupleReader) {
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
    return { $$type: 'LPPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFeeDelta: _realizedFundingFeeDelta, realizedFundingFeeAfter: _realizedFundingFeeAfter, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
}

function storeTupleLPPositionIncreasedEvent(source: LPPositionIncreasedEvent) {
    let builder = new TupleBuilder();
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
        b_0.storeUint(3134889712, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.fundingFeeDelta, 257);
        b_2.storeInt(src.entryFundingFeeGrowthAfter, 257);
        b_2.storeInt(src.receive, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3134889712) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _fundingFeeDelta = sc_2.loadIntBig(257);
    let _entryFundingFeeGrowthAfter = sc_2.loadIntBig(257);
    let _receive = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'LPPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
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
    return { $$type: 'LPPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
}

function storeTupleLPPositionDecreasedEvent(source: LPPositionDecreasedEvent) {
    let builder = new TupleBuilder();
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

export type GlobalLPChangedEvent = {
    $$type: 'GlobalLPChangedEvent';
    lpFundAfter: bigint;
    liquidityAfter: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    trxId: bigint;
}

export function storeGlobalLPChangedEvent(src: GlobalLPChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1059260453, 32);
        b_0.storeInt(src.lpFundAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        b_0.storeInt(src.tradingFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.fundingFee, 257);
        b_1.storeInt(src.trxId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalLPChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1059260453) { throw Error('Invalid prefix'); }
    let _lpFundAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let _tradingFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fundingFee = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadIntBig(257);
    return { $$type: 'GlobalLPChangedEvent' as const, lpFundAfter: _lpFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, trxId: _trxId };
}

function loadTupleGlobalLPChangedEvent(source: TupleReader) {
    let _lpFundAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalLPChangedEvent' as const, lpFundAfter: _lpFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, trxId: _trxId };
}

function storeTupleGlobalLPChangedEvent(source: GlobalLPChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserGlobalLPChangedEvent(): DictionaryValue<GlobalLPChangedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalLPChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPChangedEvent(src.loadRef().beginParse());
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
    entryFundingFeeGrowthAfter: bigint;
    trxId: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(630925061, 32);
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
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.trxId, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 630925061) { throw Error('Invalid prefix'); }
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
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _trxId = sc_4.loadIntBig(257);
    return { $$type: 'PerpPositionIncreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
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
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, trxId: _trxId };
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
        b_0.storeUint(1990436485, 32);
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
        b_3.storeInt(src.entryFundingFeeGrowthAfter, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.receive, 257);
        b_4.storeInt(src.trxId, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1990436485) { throw Error('Invalid prefix'); }
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
    let _entryFundingFeeGrowthAfter = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _receive = sc_4.loadIntBig(257);
    let _trxId = sc_4.loadIntBig(257);
    return { $$type: 'PerpPositionDecreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
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
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, trxId: _trxId };
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

export type PerpPositionLiquidatedEvent = {
    $$type: 'PerpPositionLiquidatedEvent';
    positionId: bigint;
    account: Address;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    liquidatePrice: bigint;
    fundingFee: bigint;
    tradingFee: bigint;
    liquidationFee: bigint;
    trxId: bigint;
}

export function storePerpPositionLiquidatedEvent(src: PerpPositionLiquidatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3838903472, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.tokenId, 257);
        b_0.storeBit(src.isLong);
        let b_1 = new Builder();
        b_1.storeInt(src.marginDelta, 257);
        b_1.storeInt(src.sizeDelta, 257);
        b_1.storeInt(src.liquidatePrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.fundingFee, 257);
        b_2.storeInt(src.tradingFee, 257);
        b_2.storeInt(src.liquidationFee, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionLiquidatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3838903472) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _marginDelta = sc_1.loadIntBig(257);
    let _sizeDelta = sc_1.loadIntBig(257);
    let _liquidatePrice = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _fundingFee = sc_2.loadIntBig(257);
    let _tradingFee = sc_2.loadIntBig(257);
    let _liquidationFee = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'PerpPositionLiquidatedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, liquidatePrice: _liquidatePrice, fundingFee: _fundingFee, tradingFee: _tradingFee, liquidationFee: _liquidationFee, trxId: _trxId };
}

function loadTuplePerpPositionLiquidatedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _liquidatePrice = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionLiquidatedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, liquidatePrice: _liquidatePrice, fundingFee: _fundingFee, tradingFee: _tradingFee, liquidationFee: _liquidationFee, trxId: _trxId };
}

function storeTuplePerpPositionLiquidatedEvent(source: PerpPositionLiquidatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.liquidatePrice);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionLiquidatedEvent(): DictionaryValue<PerpPositionLiquidatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionLiquidatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionLiquidatedEvent(src.loadRef().beginParse());
        }
    }
}

export type GlobalPositionChangedEvent = {
    $$type: 'GlobalPositionChangedEvent';
    longSizeAfter: bigint;
    shortSizeAfter: bigint;
    longFundingRateGrowthAfter: bigint;
    shortFundingRateGrowthAfter: bigint;
    trxId: bigint;
}

export function storeGlobalPositionChangedEvent(src: GlobalPositionChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(831558081, 32);
        b_0.storeInt(src.longSizeAfter, 257);
        b_0.storeInt(src.shortSizeAfter, 257);
        b_0.storeInt(src.longFundingRateGrowthAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortFundingRateGrowthAfter, 257);
        b_1.storeInt(src.trxId, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalPositionChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 831558081) { throw Error('Invalid prefix'); }
    let _longSizeAfter = sc_0.loadIntBig(257);
    let _shortSizeAfter = sc_0.loadIntBig(257);
    let _longFundingRateGrowthAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortFundingRateGrowthAfter = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadIntBig(257);
    return { $$type: 'GlobalPositionChangedEvent' as const, longSizeAfter: _longSizeAfter, shortSizeAfter: _shortSizeAfter, longFundingRateGrowthAfter: _longFundingRateGrowthAfter, shortFundingRateGrowthAfter: _shortFundingRateGrowthAfter, trxId: _trxId };
}

function loadTupleGlobalPositionChangedEvent(source: TupleReader) {
    let _longSizeAfter = source.readBigNumber();
    let _shortSizeAfter = source.readBigNumber();
    let _longFundingRateGrowthAfter = source.readBigNumber();
    let _shortFundingRateGrowthAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalPositionChangedEvent' as const, longSizeAfter: _longSizeAfter, shortSizeAfter: _shortSizeAfter, longFundingRateGrowthAfter: _longFundingRateGrowthAfter, shortFundingRateGrowthAfter: _shortFundingRateGrowthAfter, trxId: _trxId };
}

function storeTupleGlobalPositionChangedEvent(source: GlobalPositionChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longSizeAfter);
    builder.writeNumber(source.shortSizeAfter);
    builder.writeNumber(source.longFundingRateGrowthAfter);
    builder.writeNumber(source.shortFundingRateGrowthAfter);
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
    lpLockTime: bigint;
    bonusFactor: bigint;
    orderBook: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lpLockTime, 257);
        b_0.storeInt(src.bonusFactor, 257);
        b_0.storeAddress(src.orderBook);
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _lpLockTime = sc_0.loadIntBig(257);
    let _bonusFactor = sc_0.loadIntBig(257);
    let _orderBook = sc_0.loadAddress();
    return { $$type: 'ConfigData' as const, lpLockTime: _lpLockTime, bonusFactor: _bonusFactor, orderBook: _orderBook };
}

function loadTupleConfigData(source: TupleReader) {
    let _lpLockTime = source.readBigNumber();
    let _bonusFactor = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'ConfigData' as const, lpLockTime: _lpLockTime, bonusFactor: _bonusFactor, orderBook: _orderBook };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpLockTime);
    builder.writeNumber(source.bonusFactor);
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
        b_1.storeInt(src.interestRate, 257);
        let b_2 = new Builder();
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
    let _interestRate = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _maxFundingRate = sc_2.loadIntBig(257);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minMargin = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
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
        b_0.storeInt(src.tokenIdNext, 257);
        let b_1 = new Builder();
        if (src.tokenConfig !== null && src.tokenConfig !== undefined) { b_1.storeBit(true); b_1.store(storeTokenConfig(src.tokenConfig)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenConfigData(slice: Slice) {
    let sc_0 = slice;
    let _tokenIdNext = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _tokenConfig = sc_1.loadBit() ? loadTokenConfig(sc_1) : null;
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
        b_0.storeInt(src.positionId, 257);
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.bonus, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.realizedFundingFee, 257);
        b_1.storeInt(src.entryFundingFeeGrowth, 257);
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    let _bonus = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _realizedFundingFee = sc_1.loadIntBig(257);
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
    lpFund: bigint;
    lpLiquidity: bigint;
    lpFundingFeeGrowth: bigint;
    lpUnrealizedPnl: bigint;
}

export function storeLPPositionData(src: LPPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.lpPosition !== null && src.lpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeLPPosition(src.lpPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        b_1.storeInt(src.lpFund, 257);
        b_1.storeInt(src.lpLiquidity, 257);
        b_1.storeInt(src.lpFundingFeeGrowth, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.lpUnrealizedPnl, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionData(slice: Slice) {
    let sc_0 = slice;
    let _lpPosition = sc_0.loadBit() ? loadLPPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpFund = sc_1.loadIntBig(257);
    let _lpLiquidity = sc_1.loadIntBig(257);
    let _lpFundingFeeGrowth = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _lpUnrealizedPnl = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionData' as const, lpPosition: _lpPosition, lpFund: _lpFund, lpLiquidity: _lpLiquidity, lpFundingFeeGrowth: _lpFundingFeeGrowth, lpUnrealizedPnl: _lpUnrealizedPnl };
}

function loadTupleLPPositionData(source: TupleReader) {
    const _lpPosition_p = source.readTupleOpt();
    const _lpPosition = _lpPosition_p ? loadTupleLPPosition(_lpPosition_p) : null;
    let _lpFund = source.readBigNumber();
    let _lpLiquidity = source.readBigNumber();
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _lpUnrealizedPnl = source.readBigNumber();
    return { $$type: 'LPPositionData' as const, lpPosition: _lpPosition, lpFund: _lpFund, lpLiquidity: _lpLiquidity, lpFundingFeeGrowth: _lpFundingFeeGrowth, lpUnrealizedPnl: _lpUnrealizedPnl };
}

function storeTupleLPPositionData(source: LPPositionData) {
    let builder = new TupleBuilder();
    if (source.lpPosition !== null && source.lpPosition !== undefined) {
        builder.writeTuple(storeTupleLPPosition(source.lpPosition));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.lpFund);
    builder.writeNumber(source.lpLiquidity);
    builder.writeNumber(source.lpFundingFeeGrowth);
    builder.writeNumber(source.lpUnrealizedPnl);
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
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _perpPosition = sc_0.loadBit() ? loadDirectionPerpPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalLPPosition = sc_1.loadBit() ? loadGlobalLPPosition(sc_1) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition };
}

function loadTuplePerpPositionData(source: TupleReader) {
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition };
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

export type GlobalPosition = {
    $$type: 'GlobalPosition';
    longSize: bigint;
    shortSize: bigint;
    longFundingRateGrowth: bigint;
    shortFundingRateGrowth: bigint;
}

export function storeGlobalPosition(src: GlobalPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.longSize, 257);
        b_0.storeInt(src.shortSize, 257);
        b_0.storeInt(src.longFundingRateGrowth, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortFundingRateGrowth, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalPosition(slice: Slice) {
    let sc_0 = slice;
    let _longSize = sc_0.loadIntBig(257);
    let _shortSize = sc_0.loadIntBig(257);
    let _longFundingRateGrowth = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortFundingRateGrowth = sc_1.loadIntBig(257);
    return { $$type: 'GlobalPosition' as const, longSize: _longSize, shortSize: _shortSize, longFundingRateGrowth: _longFundingRateGrowth, shortFundingRateGrowth: _shortFundingRateGrowth };
}

function loadTupleGlobalPosition(source: TupleReader) {
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longFundingRateGrowth = source.readBigNumber();
    let _shortFundingRateGrowth = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longSize: _longSize, shortSize: _shortSize, longFundingRateGrowth: _longFundingRateGrowth, shortFundingRateGrowth: _shortFundingRateGrowth };
}

function storeTupleGlobalPosition(source: GlobalPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longSize);
    builder.writeNumber(source.shortSize);
    builder.writeNumber(source.longFundingRateGrowth);
    builder.writeNumber(source.shortFundingRateGrowth);
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

export type FundingRateGrowth = {
    $$type: 'FundingRateGrowth';
    clampedFundingRateDelta: bigint;
    longFundingRateGrowthAfter: bigint;
    shortFundingRateGrowthAfter: bigint;
}

export function storeFundingRateGrowth(src: FundingRateGrowth) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.clampedFundingRateDelta, 257);
        b_0.storeInt(src.longFundingRateGrowthAfter, 257);
        b_0.storeInt(src.shortFundingRateGrowthAfter, 257);
    };
}

export function loadFundingRateGrowth(slice: Slice) {
    let sc_0 = slice;
    let _clampedFundingRateDelta = sc_0.loadIntBig(257);
    let _longFundingRateGrowthAfter = sc_0.loadIntBig(257);
    let _shortFundingRateGrowthAfter = sc_0.loadIntBig(257);
    return { $$type: 'FundingRateGrowth' as const, clampedFundingRateDelta: _clampedFundingRateDelta, longFundingRateGrowthAfter: _longFundingRateGrowthAfter, shortFundingRateGrowthAfter: _shortFundingRateGrowthAfter };
}

function loadTupleFundingRateGrowth(source: TupleReader) {
    let _clampedFundingRateDelta = source.readBigNumber();
    let _longFundingRateGrowthAfter = source.readBigNumber();
    let _shortFundingRateGrowthAfter = source.readBigNumber();
    return { $$type: 'FundingRateGrowth' as const, clampedFundingRateDelta: _clampedFundingRateDelta, longFundingRateGrowthAfter: _longFundingRateGrowthAfter, shortFundingRateGrowthAfter: _shortFundingRateGrowthAfter };
}

function storeTupleFundingRateGrowth(source: FundingRateGrowth) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.clampedFundingRateDelta);
    builder.writeNumber(source.longFundingRateGrowthAfter);
    builder.writeNumber(source.shortFundingRateGrowthAfter);
    return builder.build();
}

function dictValueParserFundingRateGrowth(): DictionaryValue<FundingRateGrowth> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFundingRateGrowth(src)).endCell());
        },
        parse: (src) => {
            return loadFundingRateGrowth(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('te6ccgECeQEAI24AART/APSkE/S88sgLAQIBYgIDA8rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggnMEBQIBIFtcA/ABkjB/4HAh10nCH5UwINcLH94gghCRouEKuo7QMNMfAYIQkaLhCrry4IGBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxECUQJBAjbBXbPH/gIIIQkurq/brjAiAGBwgBOMj4QwHMfwHKABEVERQRExESEREREFXg2zzJ7VQkA/ARFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERkPDhEYDg0RFw0MERYMCxEVCwoRGQoJERgJCBEXCAcRFgcGERUGBREZBQQRGAQDERcDAhEWAgERFQERGds8PT4+VxBXEPhCcHCAQBAjbW1t2zwRExEUERMMQgkCEDDbPGwa2zx/CgsERoIQ6JzUX7qPCDDbPGwX2zx/4CCCEP9X5Ve64wKCEJRqmLa6ERITFABMERIRExESDRESDQwREQwMERAMEM8QnhB8EGsQWhBJEDhHVUYWBAMAmNMfAYIQkurq/bry4IGBAQHXANQB0AHSAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAMBBaEFkQWBBXEFYC3BEUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREe2zxWEoEBAVYfWfQNb6GSMG3fDA0AEvhCUvDHBfLghAL4IG6SMG2Oh9DbPGwZbwniIG6zlyBu8tCAbymOGTCLCHCCCJiWgIBkggMNQIED6IIICSfAcCDiViVus5U4BxEkB5JXJeJWI26zlTYFESIFklcj4lYhbrOVNAMRIAOSVyHiVh9us5UyAREeAZJXH+JWHW6zkTCSVx3iVhlus3gOAvqYVx8RGBEeERiSVxniVhpus5hXHBEZERsRGZJXGuJWGG6zmFccERcRGxEXklcY4lYfbrOYVx0RHBEeERySVx/iVh1WEr6XVxFWHKQREd4HER4HBhEWBgURFwUEERUEAxEYAwIRGQIBERoBERuBAQERHchVgNs8yRA7AhEVAg8QAHrIUAnPFslQCcwWygAUgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwATgQEBzwAByIEBAc8AyQHMyQHMAYgBERYBIG6VMFn0WjCUQTP0FeL4QnBwgEAQI21tbds8ChEUCgkREwkREgcREQcGERAGEF8QThA9TLAQigkIRhcQNRRDMEIAgtMfAYIQ6JzUX7ry4IHSANM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANM/gQEB1wD0BFVgBPSCAKD3+EJWFgHHBfL0ERYRGxEWERURGhEVERQRGREUERMRGBETERIRFxESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEbDAsRGgsKERkKCREYCQgRFwgHERsHBhEaBgURGQUEERgEAxEXAwIRGwLbPHARGeMP+EFvJCgVFhcCEDDbPGwc2zx/JicBWI6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwIwFcERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcVhnbPBgBilcYERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKwIRFwIBERdWGNs8ERYRFREUERMREhERERBV4BwD/BNfA1YVqgChVhSh+EFvJNs8oYEk1SHCAPL0ERZwERhxERrIVSCCEBzwz4FQBMsfEoEBAc8AgQEBzwDLP8kuBAMRFwMCERgCERkBECQQI21t2zwREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkFCIgLuLoEBCyRZ9AtvoZIwbd8gbpIwbY6H0Ns8bBZvBuJwVHAAUwAwNCRus5pfBCBu8tCAbyYwmTRWEaQREkFEA+JWEC6gIMEAkjBw3nAhVhK5jhMwVhABoVYYAagnqFYQqQRRM6ADkTHiUUeg+CNWGqCBAQtUdyVUd2RyGQOuyFVQ2zzJAhEXAlKwIG6VMFn0WTCUQTP0E+IREiigEREooBBoEHkVFBMCERUCcFkRFirIVaDbPMnIgljA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');
    const __system = Cell.fromBase64('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');
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
    4996: { message: `none available price` },
    5238: { message: `position not exist` },
    9429: { message: `send gas not enough` },
    11117: { message: `insuficient global net LP` },
    18995: { message: `margin rate too low` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31425: { message: `not reach unlock time` },
    36718: { message: `disabled token` },
    39251: { message: `insufficient global LP` },
    41207: { message: `invalid sender` },
    42634: { message: `legerage too high` },
    55429: { message: `not reach liquidate price` },
    58161: { message: `insufficient liquidity` },
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
    {"name":"UpdateConfig","header":2443370762,"fields":[{"name":"gasConsumption","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateTokenConfig","header":2464869117,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionIncreasedEvent","header":3341824165,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionDecreasedEvent","header":3134889712,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPChangedEvent","header":1059260453,"fields":[{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPositionChangedEvent","header":2125986710,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionIncreasedEvent","header":630925061,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionDecreasedEvent","header":1990436485,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionLiquidatedEvent","header":3838903472,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidatePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPositionChangedEvent","header":831558081,"fields":[{"name":"longSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingRateGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingRateGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePriceEvent","header":1737737193,"fields":[{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"lpLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenConfigData","header":null,"fields":[{"name":"tokenIdNext","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenConfig","type":{"kind":"simple","type":"TokenConfig","optional":true}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionData","header":null,"fields":[{"name":"lpPosition","type":{"kind":"simple","type":"LPPosition","optional":true}},{"name":"lpFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}}]},
    {"name":"PriceData","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingRateGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingRateGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalFundingRateSample","header":null,"fields":[{"name":"lastAdjustFundingRateTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cumulativePremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"FundingRateGrowth","header":null,"fields":[{"name":"clampedFundingRateDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingRateGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingRateGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SamplePremiumRateResult","header":null,"fields":[{"name":"sample","type":{"kind":"simple","type":"GlobalFundingRateSample","optional":false}},{"name":"shouldAdjustFundingRate","type":{"kind":"simple","type":"bool","optional":false}},{"name":"fundingRateDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | UpdateLPPosition | UpdatePerpPosition | Deploy) {
        
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