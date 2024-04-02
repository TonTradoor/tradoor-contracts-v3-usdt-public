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
    realizedFundingFee: bigint;
    realizedFundingFeeAfter: bigint;
    trxId: bigint;
}

export function storeLPPositionIncreasedEvent(src: LPPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3497909766, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.unlockTimeAfter, 257);
        b_2.storeInt(src.realizedFundingFee, 257);
        b_2.storeInt(src.realizedFundingFeeAfter, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.trxId, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3497909766) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _unlockTimeAfter = sc_2.loadIntBig(257);
    let _realizedFundingFee = sc_2.loadIntBig(257);
    let _realizedFundingFeeAfter = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _trxId = sc_3.loadIntBig(257);
    return { $$type: 'LPPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFee: _realizedFundingFee, realizedFundingFeeAfter: _realizedFundingFeeAfter, trxId: _trxId };
}

function loadTupleLPPositionIncreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _unlockTimeAfter = source.readBigNumber();
    let _realizedFundingFee = source.readBigNumber();
    let _realizedFundingFeeAfter = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter, realizedFundingFee: _realizedFundingFee, realizedFundingFeeAfter: _realizedFundingFeeAfter, trxId: _trxId };
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
    builder.writeNumber(source.realizedFundingFee);
    builder.writeNumber(source.realizedFundingFeeAfter);
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
    receive: bigint;
    trxId: bigint;
}

export function storeLPPositionDecreasedEvent(src: LPPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3526966807, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.fundingFeeDelta, 257);
        b_2.storeInt(src.receive, 257);
        b_2.storeInt(src.trxId, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3526966807) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _fundingFeeDelta = sc_2.loadIntBig(257);
    let _receive = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, receive: _receive, trxId: _trxId };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _fundingFeeDelta = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, fundingFeeDelta: _fundingFeeDelta, receive: _receive, trxId: _trxId };
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
    receive: bigint;
    trxId: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(743380229, 32);
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
        b_3.storeInt(src.receive, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.trxId, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 743380229) { throw Error('Invalid prefix'); }
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
    let _receive = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _trxId = sc_4.loadIntBig(257);
    return { $$type: 'PerpPositionDecreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, receive: _receive, trxId: _trxId };
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
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, receive: _receive, trxId: _trxId };
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

export type GlobalLPLiquidity = {
    $$type: 'GlobalLPLiquidity';
    lpFund: bigint;
    liquidity: bigint;
    fundingFeeGrowth: bigint;
}

export function storeGlobalLPLiquidity(src: GlobalLPLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lpFund, 257);
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.fundingFeeGrowth, 257);
    };
}

export function loadGlobalLPLiquidity(slice: Slice) {
    let sc_0 = slice;
    let _lpFund = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    let _fundingFeeGrowth = sc_0.loadIntBig(257);
    return { $$type: 'GlobalLPLiquidity' as const, lpFund: _lpFund, liquidity: _liquidity, fundingFeeGrowth: _fundingFeeGrowth };
}

function loadTupleGlobalLPLiquidity(source: TupleReader) {
    let _lpFund = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    return { $$type: 'GlobalLPLiquidity' as const, lpFund: _lpFund, liquidity: _liquidity, fundingFeeGrowth: _fundingFeeGrowth };
}

function storeTupleGlobalLPLiquidity(source: GlobalLPLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpFund);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.fundingFeeGrowth);
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

export type LPPositionData = {
    $$type: 'LPPositionData';
    lpPosition: LPPosition | null;
    globalLPLiquidity: GlobalLPLiquidity;
}

export function storeLPPositionData(src: LPPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.lpPosition !== null && src.lpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeLPPosition(src.lpPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        b_1.store(storeGlobalLPLiquidity(src.globalLPLiquidity));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionData(slice: Slice) {
    let sc_0 = slice;
    let _lpPosition = sc_0.loadBit() ? loadLPPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalLPLiquidity = loadGlobalLPLiquidity(sc_1);
    return { $$type: 'LPPositionData' as const, lpPosition: _lpPosition, globalLPLiquidity: _globalLPLiquidity };
}

function loadTupleLPPositionData(source: TupleReader) {
    const _lpPosition_p = source.readTupleOpt();
    const _lpPosition = _lpPosition_p ? loadTupleLPPosition(_lpPosition_p) : null;
    const _globalLPLiquidity = loadTupleGlobalLPLiquidity(source.readTuple());
    return { $$type: 'LPPositionData' as const, lpPosition: _lpPosition, globalLPLiquidity: _globalLPLiquidity };
}

function storeTupleLPPositionData(source: LPPositionData) {
    let builder = new TupleBuilder();
    if (source.lpPosition !== null && source.lpPosition !== undefined) {
        builder.writeTuple(storeTupleLPPosition(source.lpPosition));
    } else {
        builder.writeTuple(null);
    }
    builder.writeTuple(storeTupleGlobalLPLiquidity(source.globalLPLiquidity));
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
<<<<<<< HEAD
    const __code = Cell.fromBase64('te6ccgECnAEAMPQAART/APSkE/S88sgLAQIBYgIDAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVEROVBAIBIHx9Ap4REhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UBQYEbgGSMH/gcCHXScIflTAg1wsf3iCCEGXvmv26jwgw2zxsGds8f+AgghA4IV65uuMCIIIQ6JzUX7oHCAkKAegBER0BER6BAQHPAAERGwGBAQHPAAERGQH0AAERFwGBAQHPABEVyIEBAc8AAREUAYEBAc8AARESAYEBAc8AERDIgQEBzwAfgQEBzwAdgQEBzwDIUAwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQChcAwtMfAYIQZe+a/bry4IGBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQaRBoEGcB8BEdESYRHREcESURHBEbESQRGxEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUESYRFBETESURExESESQREhERESMREREQESIREA8RIQ8OESAODREfDQwRHgwLESYLChElCgkRJAkIESMIBxEiBwsCEDDbPGwb2zx/DQ4EOo8IMNs8bBfbPH/gIIIQ/qNrcbrjAiCCEP9X5Ve6ExQVFgP+BhEhBgURIAUEER8EAxEeAwIRJgIBESUBESTbPFcSVxNXE1cTVxNXE1cTVxVXFfhCcHCAQBAjbW1t2zwRGhEdERoRGREcERkREhEbERIREREaERERGBEZERgRFxEYERcRFhEXERYRFREWERUREREVEREREREUEREKERMKCBERCBBiDAAoBxEQBxBvEF4QTRA8S6kXFhUUQzAAotMfAYIQOCFeubry4IGBAQHXANQB0AHSAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAgQEB1wAwEGsQahBpEGgQZwHwER0RKBEdERwRJxEcERsRJhEbERoRJREaERkRJBEZERgRIxEYERcRIhEXERYRIREWERURIBEVERQRHxEUERMRHhETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHESgHDwT8BhEnBgURJgUEESUEAxEkAwIRIwIBESIBESHbPFYgVhu+l1caVh+kERreCBEfCAcRHgcGESgGBREnBQQRJgQDESUDAhEkAgERIwERIoEBAREiyFWQ2zzJAxETAwIRGQIBERgBIG6VMFn0WjCUQTP0FeL4QnBwgEAQI21tbds8EBFiEgAU+EJWFAHHBfLghACGyFAKzxbJUArMF8oAFYEBAc8AE4EBAc8AgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AA8iBAQHPABKBAQHPAMlYzMkBzACcERIRHRESERERHBERERsPERoPDhEZDg0RGA0MERcMCxEWCwoRFQoJERQJCBETCAcREgcGEREGBREQBRBPED5NwBBbEFoQWRBYEFcQVlUwAILTHwGCEOic1F+68uCB0gDTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDTP4EBAdcA9ARVYAHyggCg9/hCVhsBxwXy9BEfESQRHxEeESMRHhEdESIRHREcESERHBEbESARGxEaESQRGhEZESMRGREYESIRGBEXESERFxEWESARFhEVESQRFREUESMRFBETESIRExESESEREhERESAREREQESQREA8RIw8OESIODREhDRkCEDDbPGwY2zx/KisDfI8IMNs8bBzbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwREVGAf4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYY9AAWyz/IQFQCgQEBzwCBAQHPAPQAyz/IRBRQV1A0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzBT0AAXIgQEBzwAWgQEBzwAXgQEBzwAX9AAXyz8X9AAHyIEBAc8AyVAHGAAqzMlQBczJWMzJAczJUAPMyVjMyQHMBIwMESAMCxEkCwoRIwoJESIJCBEhCAcRIAcGESQGBREjBQQRIgQDESEDAhEgAts8cBEj4w/4QW8kE18DVh6qAKFWHaH4QW8kSBobHAH4ER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QBQRIFADViDbPB0C/FciERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKwIRIQJWIds8ESARHhEdERwRGxEaERkRGBEXERYRFSEiA/TbPKGBJNUhwgDy9BEgcBEicREhyFUgghAc8M+BUATLHxKBAQHPAIEBAc8Ayz/JVhMEAxEhAwIRIgIRIAEQJBAjbW3bPBEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREmBiKQH0VhSBAQskWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4nBUcAAwMiJus5lbIG7y0IBvJDCXMlYVpBEWWeJWFS2gIMEAkjBw3nAhVhe5jhIwVhUBoVYfAaglqFYVqQRmoAGRMeIeAvRRJaD4I1YhoIEBC1R1IyTIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJAhEbAlKQIG6VMFn0WTCUQTP0E+IRFyagERYmoBBGEFcRGUMwJ8hVcNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHAgVhEDVhVVIB8gALiCEPCqutVQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzACayFVAghDNrKI7UAbLHxSBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAPEREPEO8B9FYUgQELJFn0C2+hkjBt3yBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOKBFHYhbrPy9CBu8tCAbySBesEh+CO78vRTJbmUNVRBFd4tgVrEVhgioMIA8vRWFwGgIMEAkjBw3oIA8ashwgDy9HAhIwAYERQRExESEREREFXgA/5WGL6OWDD4IyKhViKgggFRgKkEI8AAjhYnViKoIlYZoagBgGS2CKgBgQPoqKkEjikhVhihUoCoIqkEU0hWJKgkVhuhqAOAZLYIE6gDgQPoqBOpBFm2CAG2CeJTYKCXUnKoVhepBOJRR6FRMaEjwgCRf5MgwgDi4w8RFyOhERYmJCUmAHZUdTCBAQsGyFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyQIRGwJUI5AgbpUwWfRZMJRBM/QT4gCOMoEBC20gbpIwbY4mIG7y0IBvJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMniAhEbAlKQIG6VMFn0WTCUQTP0E+IC9qEQRRBHEDYRGVQxZ8hVcNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHAgVhIDVhZVIAXIVUCCEM2sojtQBssfFIEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACcoALiCEKvLhjhQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzAAUERAREhEQDxEQDwBgERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFE1BCAKjTHwGCEP6ja3G68uCB0z/TB/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANM/1AHQgQEB1wD0BDAQKBAnECYQJRAkECMB8oIAoPf4QlYcAccF8vQRHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGRElERkRGBEkERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExElERMREhEkERIREREjEREREBEiERAPESEPDhEgDg0RJQ0sBJAMESQMCxEjCwoRIgoJESEJCBEgCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAts8cFYjwAHjD/hBbyQTXwNWHqoAoVYdofhBbyRILS4vAfxXIxEdESARHREcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgQRxA2RRMRIUAEViEwA/4wESLAAo7uERwRIBEcERsRHxEbERoRHhEaERkRHREZERgRHBEYERcRGxEXERYRGhEWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDFU7AxEhAwJwAhEiAVYi2zzjDhEfER4RHREcOjc4A/TbPKGBJNUhwgDy9BEhcBEhcREhyFUgghBJicfBUATLHxKBAQHPAIEBAc8Ayz/JVhMEAxEiAwIRIQIRIAEQJBAjbW3bPBEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREmBiYQEE2zwxA+ZWEYEBCyVZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeJwVHAAIDQkbrOZXwQgbvLQgG8lmTRWFKQRFUFEA+JwUwPAAOMPUSagU96BAQsnVEYwVEVQMjM0ADRsIjMmggDzySFWIr7y9IIApoohViGoKL7y9ACQW1LSoSKoUuKhIqhRM6AhoCegL1YZoFYUqCOpBHAhwQCSMKORMeKCAOy6IlYhoVYgqIIID0JAqQRYvPL0ggCmiiFWIagovvL0Au7IVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQIRGAJSoCBulTBZ9FkwlEEz9BPiERQnoBETJqAQRxBoEEUQJBA4AhEWAlCIVhbIVYDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBUWwAREDU2AMKCEM/a5FlQCssfGIEBAc8AUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUgQEBzwACyIEBAc8AgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AyVjMyQHMAHTIVSCCEFo8v8xQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljA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AQGBAQHPAMkiEDkBIG6VMFn0WjCUQTP0FeKOH4EBASLIAQGBAQHPAMkiEDkBIG6VMFn0WjCUQTP0FeLiLIEBAShMAWRZ9A1voZIwbd8gbpIwbY4Y0IEBAdcA0gCBAQHXAIEBAdcAVTBsFG8E4iBus5MwNjDjDU0AziBu8tCAbyQijhNRUaFSMKiCOAVrx14tYxAAAKkEjhNSFqFSMKiCOAVrx14tYxAAAKkE4lFloVAGoAWBAQEFyFUwUDSBAQHPAMoAgQEBzwCBAQHPAMkQPRcgbpUwWfRaMJRBM/QV4goB/lcfVx9XH1cff3AgERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF1kAf4RH5lWJQERIL7y5myZViUBESC78uZs4hEbESMRGxEaESIRGhEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIZQH+VygRIJlWHwERIb7y5myZVh8BESG78uZs4hEcESMRHBEbESIRGxEaESERGhEZESARGREYER8RGBEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERClID9Ns8oYEk1SHCAPL0ESFwESFxESHIVSCCEO8BwrRQBMsfEoEBAc8AgQEBzwDLP8lWEwQDESIDAhEhAhEgARAkECNtbds8ERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESYGJhATgJERAJEI8QflVmIRBHUFYEESUEAxElAwIRJds8UwLiViKBAQEmWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwrigWyWIW6z8vQgbvLQgG8qWzeCAI9uUAby9FYQgQEBLFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCy5Z9AtvoZIwbd+UVAL+IG6SMG2OVNCB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');
    const __system = Cell.fromBase64('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IIEE/7ry0ImDCbry4IjPFhj0ABbLP8hAVAKBAQHPAIEBAc8A9ADLP8hEFFBXUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMFPQABciBAQHPABaBAQHPABeBAQHPABf0ABfLPxf0AAfIgQEBzwDJUAcjACrMyVAFzMlYzMkBzMlQA8zJWMzJAcwEbgGSMH/gcCHXScIflTAg1wsf3iCCEGXvmv26jwgw2zxsGds8f+AgghA4IV65uuMCIIIQ6JzUX7qYkowlBDqPCDDbPGwX2zx/4CCCEP6ja3G64wIgghD/V+VXuot0WCYDfI8IMNs8bBzbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwVygnATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPJUB8oIAoPf4QlYgAccF8vQRHxEpER8RHhEoER4RHREnER0RHBEmERwRGxElERsRGhEkERoRGREjERkRGBEiERgRFxEhERcRFhEgERYRFREpERURFBEoERQRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0pA34MESAMCxEpCwoRKAoJEScJCBEmCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAts8ViXbPHBWKMAKkX+UVijAC+KHVioEgI8pMBEnwAPjDxEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDjDfhBbyQTXwNWHqoAoVYdofhBbyQ9OywrA/TbPKGBJNUhwgDy9BEhcBEhcREhyFUgghDvAcK0UATLHxKBAQHPAIEBAc8Ayz/JVhMEAxEiAwIRIQIRIAEQJBAjbW3bPBEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREniVXAH+VygRIJlWHwERIb7y5myZVh8BESG78uZs4hEcESMRHBEbESIRGxEaESERGhEZESARGREYER8RGBEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCi0BOAkREAkQjxB+VWYhEEdQVgQRJQQDESUDAhEl2zwuAuJWIoEBASZZ9A1voZIwbd8g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AQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gCBAQHXANQB0IEBAdcAgQEB1wDSANM/gQEB1wD0BDAQbBBrEGoQaRBoEGcCEDDbPGwY2zx/c1kB8oIAoPf4QlYcAccF8vQRHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGRElERkRGBEkERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExElERMREhEkERIREREjEREREBEiERAPESEPDhEgDg0RJQ1aBJAMESQMCxEjCwoRIgoJESEJCBEgCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAts8cFYjwAHjD/hBbyQTXwNWHqoAoVYdofhBbySHa11bA/TbPKGBJNUhwgDy9BEhcBEhcREhyFUgghBJicfBUATLHxKBAQHPAIEBAc8Ayz/JVhMEAxEiAwIRIQIRIAEQJBAjbW3bPBEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREniVXAA0ERERFBERERARExEQDxESDw4REQ4NERANVSwD/jARIsACju4RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMVTsDESEDAnACESIBViLbPOMOER8RHhEdERxhX14ANBEbERoRGREYERcRFhEVERQRExESEREREFXgAf5XHlcef3AgER0RIREdERwRIBEcERsRHxEbERoRHhEaERkRHREZERgRHBEYERcRGxEXERYRGhEWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEheMxA1YAEQBBEiBFYi2zxhAfRWEoEBCyZZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeKBFHYhbrPy9CBu8tCAbyVS4qEiqFLyoSKoUzCgIqApkjcijhBTc7yTNyIH3lMIuZI4J94H4lF4oVM3oWICuFYSVhygVhioJakEcCHBAJMwIKPeDOMPUP+hUN6hVG0DyFUgghBaPL/MUATLHxKBAQHPAIEBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhEQDgsOaGMC/jaCAPMzVhxWGKBQB6Apvhby9CTCAI5dMzNRF6FwIIEBC20gbpIwbY4tIG7y0IBvJchVQFBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJ4gIRGgJSwCBulTBZ9FkwlEEz9BPiCREYCRApRDAS4w0oEGcQa1FYUERmZAFYQxMRGlO8yFWg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAhETAgIREQJlAOKCEKl/2UlQDMsfGoEBAc8AUAgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYWgQEBzwAEyIEBAc8AE4EBAc8AgQEBzwAByIEBAc8AE4EBAc8AE4EBAc8AA8iBAQHPABSBAQHPAMlYzMlYzMkBzAHmU5eoUASpBFMIu5NTgKGXcFFJoCGhBOKBWN0lViOhViKogggPQkCpBFAMvBvy9IIApookViOoKb7y9C9WEYEBCyhURzBUSVDIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQIRGgJSwGcAHCBulTBZ9FkwlEEz9BPiAf5bggDsuiFWIqFWIaiCCA9CQKkEUAu7GvL0Vh8pViG5kjBwlAlWIKHiViARGwGggQELbSBukjBtji0gbvLQgG8lyFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMniAhEaAlLAIG6VMFn0WTCUQTP0E+IQVhBaaQHiVBKayFVw2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcCBWEwJWFVEnyFVAghDNrKI7UAbLHxSBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBqALiCEL/4dflQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzAH8VyMRHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkUTESFABFYhbAEE2zxtA+ZWEYEBCyVZ9AtvoZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeJwVHAAIDQkbrOZXwQgbvLQgG8lmTRWFKQRFUFEA+JwUwPAAOMPUSagU96BAQsnVEYwVEVQcnFuAu7IVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQIRGAJSoCBulTBZ9FkwlEEz9BPiERQnoBETJqAQRxBoEEUQJBA4AhEWAlCIVhbIVYDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBUWwAREHBvAHTIVSCCEFo8v8xQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAQvRCrAMKCEM/a5FlQCssfGIEBAc8AUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUgQEBzwACyIEBAc8AgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AyVjMyQHMAJBbUtKhIqhS4qEiqFEzoCGgJ6AvVhmgVhSoI6kEcCHBAJIwo5Ex4oIA7LoiViGhViCogggPQkCpBFi88vSCAKaKIVYhqCi+8vQANGwiMyaCAPPJIVYivvL0ggCmiiFWIagovvL0AKjTHwGCEP6ja3G68uCB0z/TB/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANM/1AHQgQEB1wD0BDAQKBAnECYQJRAkECMB8oIAoPf4QlYbAccF8vQRHxEkER8RHhEjER4RHREiER0RHBEhERwRGxEgERsRGhEkERoRGREjERkRGBEiERgRFxEhERcRFhEgERYRFREkERURFBEjERQRExEiERMREhEhERIREREgEREREBEkERAPESMPDhEiDg0RIQ11BIwMESAMCxEkCwoRIwoJESIJCBEhCAcRIAcGESQGBREjBQQRIgQDESEDAhEgAts8cBEj4w/4QW8kE18DVh6qAKFWHaH4QW8kh4J5dgP02zyhgSTVIcIA8vQRIHARInERIchVIIIQHPDPgVAEyx8SgQEBzwCBAQHPAMs/yVYTBAMRIQMCESICESABECQQI21t2zwRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERJ4lXcAYBERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgQRxA2RRNQQgBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAC/FciERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKwIRIQJWIds8ESARHhEdERwRGxEaERkRGBEXERYRFXt6ABgRFBETERIREREQVeAB9FYUgQELJFn0C2+hkjBt3yBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOKBFHYhbrPy9CBu8tCAbySBesEh+CO78vRTJbmUNVRBFd4tgVrEVhgioMIA8vRWFwGgIMEAkjBw3oIA8ashwgDy9HAhfAP+Vhi+jlgw+CMioVYioIIBUYCpBCPAAI4WJ1YiqCJWGaGoAYBktgioAYED6KipBI4pIVYYoVKAqCKpBFNIViSoJFYboagDgGS2CBOoA4ED6KgTqQRZtggBtgniU2Cgl1JyqFYXqQTiUUehUTGhI8IAkX+TIMIA4uMPERcjoREWJoGAfQL2oRBFEEcQNhEZVDFnyFVw2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcCBWEgNWFlUgBchVQIIQzayiO1AGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAf34AFBEQERIREA8REA8AuIIQq8uGOFAJyx8XgQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhOBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AyQHMyQHMAI4ygQELbSBukjBtjiYgbvLQgG8kyFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyeICERsCUpAgbpUwWfRZMJRBM/QT4gB2VHUwgQELBshVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERsCVCOQIG6VMFn0WTCUQTP0E+IB+BEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUAUESBQA1Yg2zyDAfRWFIEBCyRZ9AtvoZIwbd8gbpIwbY4g0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTicFRwADAyIm6zmVsgbvLQgG8kMJcyVhWkERZZ4lYVLaAgwQCSMHDecCFWF7mOEjBWFQGhVh8BqCWoVhWpBGagAZEx4oQC9FEloPgjViGggQELVHUjJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERsCUpAgbpUwWfRZMJRBM/QT4hEXJqARFiagEEYQVxEZQzAnyFVw2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcCBWEQNWFVUghoUAmshVQIIQzayiO1AGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADxERDxDvALiCEPCqutVQCcsfF4EBAc8AUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPABOBAQHPAMkBzMkBzAHcIcEBkVvgOHAgk1MSuY6wKYEBASNZ9A1voZIwbd8gbpIwbY4Q0IEBAdcAgQEB1wBZbBJvAuIgbrORMOMNAaQB6DEIyFmCEGeTw+lQA8sfgQEBzwD0AMnIgljAAAAAAAAAAAAAAAABActnzMlw+wCIAfwgIG7y0IBvIjEBIG7y0IBvIjAmgQEBIln0DW+hkjBt3yBukjBtmtCBAQHXAAExbwHiIG4xs44gIYEBAQHIAQGBAQHPAMkiEDkBIG6VMFn0WjCUQTP0FeKOH4EBASLIAQGBAQHPAMkiEDkBIG6VMFn0WjCUQTP0FeLiLIEBASiJAWRZ9A1voZIwbd8gbpIwbY4Y0IEBAdcA0gCBAQHXAIEBAdcAVTBsFG8E4iBus5MwNjDjDYoAziBu8tCAbyQijhNRUaFSMKiCOAVrx14tYxAAAKkEjhNSFqFSMKiCOAVrx14tYxAAAKkE4lFloVAGoAWBAQEFyFUwUDSBAQHPAMoAgQEBzwCBAQHPAMkQPRcgbpUwWfRaMJRBM/QV4goAgtMfAYIQ6JzUX7ry4IHSANM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANM/gQEB1wD0BFVgAhAw2zxsG9s8f5GNAfARHREoER0RHBEnERwRGxEmERsRGhElERoRGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRKAeOBPwGEScGBREmBQQRJQQDESQDAhEjAgERIgERIds8ViBWG76XVxpWH6QRGt4IER8IBxEeBwYRKAYFEScFBBEmBAMRJQMCESQCAREjAREigQEBESLIVZDbPMkDERMDAhEZAgERGAEgbpUwWfRaMJRBM/QV4vhCcHCAQBAjbW1t2zyXkJWPAJwREhEdERIREREcERERGw8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIERMIBxESBwYREQYFERAFEE8QPk3AEFsQWhBZEFgQVxBWVTAAhshQCs8WyVAKzBfKABWBAQHPABOBAQHPAIEBAc8AAciBAQHPABKBAQHPABKBAQHPAAPIgQEBzwASgQEBzwDJWMzJAcwAotMfAYIQOCFeubry4IGBAQHXANQB0AHSAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAgQEB1wAwEGsQahBpEGgQZwHwER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRJhEUERMRJRETERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRJgsKESUKCREkCQgRIwgHESIHkwP+BhEhBgURIAUEER8EAxEeAwIRJgIBESUBESTbPFcSVxNXE1cTVxNXE1cTVxVXFfhCcHCAQBAjbW1t2zwRGhEdERoRGREcERkREhEbERIREREaERERGBEZERgRFxEYERcRFhEXERYRFREWERUREREVEREREREUEREKERMKCBERCJeVlAAoBxEQBxBvEF4QTRA8S6kXFhUUQzAByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAlgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAU+EJWFAHHBfLghADC0x8BghBl75r9uvLggYEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRBpEGgQZwL07UTQ1AH4Y9IAAY7Y2zxXHhEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgiYEBAdcAAQHR2zycmgH2MIIK+vCAggnJw4BtcYEBLCGCCJiWgIBkggMNQIIID0JAbSVtIW1wUwBtJW0j+EJTEchyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUyJUdEQgBxETBwYREgYHEREHBhEQBhBfEE4QfRBsmwAQEDtKmBBXEEYB9IEBAdcAgQEB1wD0BIEBAdcA1AHQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wCBAQHXAIEBAdcA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQEnQDu0z/UMNCBAQHXAIEBAdcAWQL0BNM/1DDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwBPQE1DDQgQEB1wCBAQHXAIEBAdcA9ATTP/QE1DDQgQEB1wAwERoRHhEaERoRHREaERoRHBEaERoRGxEaEO8QqxCaEIkFClSE');
=======
    const __code = Cell.fromBase64('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ygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwC/CBukjBtjlTQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECMF1AHQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECM1EFpVA2wabwriIG6zlyBu8tCAbyqbMHBUcAAgcFRwACDiVhKVVHQyU0PjDVI7BPRWGpVXFVcVXI4RVhUjvJVXFSERFd4BERYBERXicFYb4wBWH4EBAVYbWfQNb6GSMG3fIG6SMG2OE9CBAQHXANIAgQEB1wBVIGwTbwPiIG6zlyBu8tCAbyOUMCBwIeJUc0LCAJRWHSS9kXDi4wAgwgCRMOMNJVYaqFYZqDw9Pj8C/hERES4REREQES0REA8RLA8OESsODREqDQwRKQwLESgLChEnCgkRJgkIESUIBxEkBwYRIwYFESIFBBEhBAMRIAMCER8CAREeAREdVhhWIVYZVhjbPFYhAREXqFYVqIIwFK30tzIDNLmqGakEVhSgViKBSjMRGKC+AREWAfL0ViBbQAL0MVNTvJEjkSXiERERMxERERARMhEQDxExDw4RMA4NES8NDBEuDAsRLQsKESwKCRErCQgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIBESMBESJWHVYjViZWHds8ESRWI6EBEScBESOhIMAAllckViYRJN4REREzERFbQgL8MxESETIREhERETEREREQETAREA8RLw8OES4ODREtDQwRLAwLESsLChEqCgkRKQkIESgIBxEnBwYRJgYFESUFBBEkBAMRIwMCESICAREhAVYjAREiViZWG9s8AREjAREioFYbsxESETIREhERETEREREQETAREA8RLw8OES4OWkMDrIIwFK30tzIDNLmqGakEIBEYqIIID0JAqQRWFyGhAREjAaABViKgAREpAaApESDjDxEUlTY2NjY2nGxRTcAQWxA6EEhVBOIQixB7EGoQXRBMTcOBAQsOREVGAfhWE6GCOAVrx14tYxAAAKhWGJZWF6NWIaiVVhdWIajioFYYlYIP8L3AlYIID0JA4lYVAaBWIQGoqQSCANiFVhmUIVYZuZQhVhm84vL0ERERLhERERARLREQDxEsDw4RKw4NESoNDBEpDAsRKAsKEScKCREmCQgRJQgHESQHQQA4BhEjBgURIgUEESEEAxEgAwIRHwIBER4BERURHQCKERARMhEQDxExDw4RMA4NES8NDBEuDAsRLQsKESwKCRErCQgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIBESMBBBEiAGwNES0NDBEsDAsRKwsKESoKCREpCQgRKAgHEScHBhEmBgURJQUEESQEAxEjAwIRIgIDESEDQAMBqDc3N1cSVxRXFVcVVhFUcAAgBREdBVYcBVYcBVYcBQQRHAQDERsDAhEaAgERFwERGVYYViIQI8hVoNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AEcC/hERETIREREQETEREA8RMA8OES8ODREuDQwRLQwLESwLChErCgkRKgkIESkIBwYRJwYFESYFBBElBAMRJAMCESMCAREiAREoVhxWJ1YdVhzbPIIA4zFWJlYlqII4BWvHXi1jEAAAqQQqu/L0IFYYoQERKwGgggDzySHC//L0VihbSAHuyFWQEFoQSRA4R2pQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyFVABlBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAczJECNFgCBulTBZ9FkwlEEz9BPigQEBAcgBAfQAySUQPgFOAN6CEOTRBLBQDMsfGoEBAc8AUAgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYWgQEBzwAUygACyIEBAc8AgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AA8iBAQHPAMlQA8zJAczJAcwC+iG8lFcoVifeViihESlWJ6EgwgCORzBXFVcWVxZXF1cXVyVWH1RwACAEESkEAxEnAwERGgERGREWERcRFhEUERYRFAIREAIQLxAuEC0QLBArECoQKRAoQQcGBQQD4w0GER4GVh0GVh0GVh0GBREpBVYqBQQRKQRWFAQDER0DSUoB7hERERIREREQERIREA8REg8OERIODRESDQwREgwLERILChESCgkREgkREggHBlVAVh1WE1YeVh3bPFYTVhyoAREbqIIwFK30tzIDNLmqGakEAREZoFYpgW+7ERuguQERGQHy9FYnggCmihEWqFYRvgERFQHy9FYlWwL8AhEtAgERGgERKVYqViUQI8hV0Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIBESMBESIRFxEhERcPESAPERERHxERERcRHhEXERERHRERDhEcDg0RGw0REBEaERAREREXS0wB9IIQLE8VBVAPyx8dgQEBzwBQCyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhmBAQHPABfKAAXIgQEBzwAUgQEBzwASgQEBzwAByIEBAc8AEoEBAc8AE4EBAc8AA8iBAQHPABSBAQHPABSBAQHPAATIgQEBzwDJTQASCREQCQ8ODVUIABpQBMzJUAPMyQHMyQHMAf4gbpUwWfRaMJRBM/QV4oEBAVRyw8hVIFAjgQEBzwDKAIEBAc8AySUQPAEgbpUwWfRaMJRBM/QV4kG7JshVQIIQfrf7llAGyx8UgQEBzwASgQEBzwDKAIEBAc8AAciBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBwTwCeUyoDRmXIVUCCED8jCCVQBssfFIEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABgQNQLiVhaBAQEmWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwnigWyWIW6z8vQgbvLQgG8pWzaCAI9uUAXy9FYQgQEBK1n0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCy1Z9AtvoZIwbd+AUQL+IG6SMG2OVNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQIwXUAdCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQIzUQWlUDbBpvCuIgbrOXIG7y0IBvKpswcFRwACBwVHAAIOJWE5VUdDJTQ+MNIlJTAApUeYdTmAP2wACOGDRWFoIA88kRE74BERIB8vRWHaQRHgMREZJXEuJWHYEBAVYaWfQNb6GSMG3fIG6SMG2OE9CBAQHXANIAgQEB1wBVIGwTbwPiIG6zlyBu8tCAbyOUMHBwIeJwVhkkwgCUVhwkupFw4uMAIMIAkTDjDVYZVhmoVheoVFVWAv4xVhkkvJEjklYZ4hERETEREREQETAREA8RLw8OES4ODREtDQwRLAwLESsLChEqCgkRKQkIESgIBxEnBwYRJgYFESUFBBEkBAMRIwMCESICAREhAREgVhxWIVYkVhzbPBEiViGhARElAREhoSDAAJNwVyPeERERMRERERARMBEQW1cC/DMREhEwERIREREvEREREBEuERAPES0PDhEsDg0RKw0MESoMCxEpCwoRKAoJEScJCBEmCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAgERHwFWIQERIFYhVhrbPAERIQERIKBWGrMREhEwERIREREvEREREBEuERAPES0PDhEsDlpYAfyCMBSt9LcyAzS5qhmpBCARGaiCCA9CQKkEVhghoQERIQGgAVYgoAERJwGgggDjMVNCqII4BWvHXi1jEAAAqQQiu/L0cFYbVhmhGKAREhExERIREREwEREREBEvERAPES4PDhEtDg0RLA0MESsMCxEqCwoRKQoJESgJGAcRJgdZAH4PES8PDhEuDg0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRJwcGESYGBRElBQQRJAQDESMDAhEiAgERIQEEESAAbA0RKw0MESoMCxEpCwoRKAoJEScJCBEmCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAgMRHwNAAwP8BhElBgURJAUEESMEAxEiAwIRIQIBEScBViUBESVWG1Yb2zwRJVYaoBERERIREREQERIREA8REg8OERIODRESDQwREgwLERILChESCgkREgkREggHBlVAVhxWE1YnVhzbPFYTVhuoAREZqIIwFK30tzIDNLmqGakEAREVoFYkWltcAFYjwACTIcAAkXDik18EcOAjwACSbDHgIcAAlBAjXwPgUjOoUhOoEqBZoKkEAEgDjhASoaiCOAVrx14tYxAAAKkE4FihqII4BWvHXi1jEAAAqQQC+IFvuxEZoLkBERcB8vRWIoIApooRFahWEVYlqII4BWvHXi1jEAAAqQS+AREUAfL0VhmOQ1clVyVXJVclVyVWH1YdLFYgESgRLREoEScRLBEnESYRKxEmESURKhElESQRKREkAxEoAwIRJwIBESYBESUREhEkERLjDRA4R2VdXgAiVypXKlcqVypXKlYfVh0sViAB7gQREgQDESgDAhEnAgERJgERJYEBCxElyFWQEFoQSRA4R2pQRYEBAc8AEoEBAc8AgQEBzwAB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');
    const __system = Cell.fromBase64('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4IjPFhaBAQHPABTKAALIgQEBzwCBAQHPABKBAQHPAALIgQEBzwATgQEBzwATgQEBzwADyIEBAc8AyVADzMkBzMkBzAL8MxESETIREhERETEREREQETAREA8RLw8OES4ODREtDQwRLAwLESsLChEqCgkRKQkIESgIBxEnBwYRJgYFESUFBBEkBAMRIwMCESICAREhAVYjAREiViZWG9s8AREjAREioFYbsxESETIREhERETEREREQETAREA8RLw8OES4OTEsAbA0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRJwcGESYGBRElBQQRJAQDESMDAhEiAgMRIQNAAwBWI8AAkyHAAJFw4pNfBHDgI8AAkmwx4CHAAJQQI18D4FIzqFITqBKgWaCpBAL0MVNTvJEjkSXiERERMxERERARMhEQDxExDw4RMA4NES8NDBEuDAsRLQsKESwKCRErCQgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIBESMBESJWHVYjViZWHds8ESRWI6EBEScBESOhIMAAllckViYRJN4REREzERFrTgCKERARMhEQDxExDw4RMA4NES8NDBEuDAsRLQsKESwKCRErCQgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIBESMBBBEiAv4REREuEREREBEtERAPESwPDhErDg0RKg0MESkMCxEoCwoRJwoJESYJCBElCAcRJAcGESMGBREiBQQRIQQDESADAhEfAgERHgERHVYYViFWGVYY2zxWIQERF6hWFaiCMBSt9LcyAzS5qhmpBFYUoFYigUozERigvgERFgHy9FYga1AB+FYToYI4BWvHXi1jEAAAqFYYllYXo1YhqJVWF1YhqOKgVhiVgg/wvcCVgggPQkDiVhUBoFYhAaipBIIA2IVWGZQhVhm5lCFWGbzi8vQREREuEREREBEtERAPESwPDhErDg0RKg0MESkMCxEoCwoRJwoJESYJCBElCAcRJAdRADgGESMGBREiBQQRIQQDESADAhEfAgERHgERFREdAApUeYdTmADE0x8BghD/V+VXuvLggdM/0weBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gCBAQHXANQB0IEBAdcAgQEB1wDSANM/gQEB1wD0BDAQbBBrEGoQaRBoEGcE7oIAoPf4QlYT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');
>>>>>>> perp
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
    {"name":"LPPositionIncreasedEvent","header":3497909766,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionDecreasedEvent","header":3526966807,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPChangedEvent","header":1059260453,"fields":[{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPositionChangedEvent","header":2125986710,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionIncreasedEvent","header":126890049,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionDecreasedEvent","header":743380229,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionLiquidatedEvent","header":3838903472,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidatePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePriceEvent","header":1737737193,"fields":[{"name":"pricesLength","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePrice","valueFormat":"ref"}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"lpLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenConfigData","header":null,"fields":[{"name":"tokenIdNext","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenConfig","type":{"kind":"simple","type":"TokenConfig","optional":true}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPLiquidity","header":null,"fields":[{"name":"lpFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionData","header":null,"fields":[{"name":"lpPosition","type":{"kind":"simple","type":"LPPosition","optional":true}},{"name":"globalLPLiquidity","type":{"kind":"simple","type":"GlobalLPLiquidity","optional":false}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}}]},
    {"name":"PriceData","header":null,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePrice","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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