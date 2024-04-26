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
    lpBonusFactor: bigint | null;
    lpLiquidityFactor: bigint | null;
    orderBook: Address | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1125619742, 32);
        b_0.storeAddress(src.executor);
        if (src.enableExecutor !== null && src.enableExecutor !== undefined) { b_0.storeBit(true).storeBit(src.enableExecutor); } else { b_0.storeBit(false); }
        if (src.gasConsumption !== null && src.gasConsumption !== undefined) { b_0.storeBit(true).storeCoins(src.gasConsumption); } else { b_0.storeBit(false); }
        if (src.minTonsForStorage !== null && src.minTonsForStorage !== undefined) { b_0.storeBit(true).storeCoins(src.minTonsForStorage); } else { b_0.storeBit(false); }
        if (src.lpBonusFactor !== null && src.lpBonusFactor !== undefined) { b_0.storeBit(true).storeInt(src.lpBonusFactor, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.lpLiquidityFactor !== null && src.lpLiquidityFactor !== undefined) { b_1.storeBit(true).storeInt(src.lpLiquidityFactor, 257); } else { b_1.storeBit(false); }
        b_1.storeAddress(src.orderBook);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1125619742) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadMaybeAddress();
    let _enableExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _gasConsumption = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _minTonsForStorage = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _lpBonusFactor = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpLiquidityFactor = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _orderBook = sc_1.loadMaybeAddress();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executor = source.readAddressOpt();
    let _enableExecutor = source.readBooleanOpt();
    let _gasConsumption = source.readBigNumberOpt();
    let _minTonsForStorage = source.readBigNumberOpt();
    let _lpBonusFactor = source.readBigNumberOpt();
    let _lpLiquidityFactor = source.readBigNumberOpt();
    let _orderBook = source.readAddressOpt();
    return { $$type: 'UpdateConfig' as const, executor: _executor, enableExecutor: _enableExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enableExecutor);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
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
    liquidityProportion: bigint | null;
    tradingFeeRate: bigint | null;
    lpTradingFeeRate: bigint | null;
    interestRate: bigint | null;
    premuimRateCap: bigint | null;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(601863652, 32);
        b_0.storeUint(src.tokenId, 64);
        if (src.name !== null && src.name !== undefined) { b_0.storeBit(true).storeStringRefTail(src.name); } else { b_0.storeBit(false); }
        if (src.enable !== null && src.enable !== undefined) { b_0.storeBit(true).storeBit(src.enable); } else { b_0.storeBit(false); }
        if (src.minMargin !== null && src.minMargin !== undefined) { b_0.storeBit(true).storeInt(src.minMargin, 257); } else { b_0.storeBit(false); }
        if (src.maxLeverage !== null && src.maxLeverage !== undefined) { b_0.storeBit(true).storeInt(src.maxLeverage, 257); } else { b_0.storeBit(false); }
        if (src.liquidationFee !== null && src.liquidationFee !== undefined) { b_0.storeBit(true).storeInt(src.liquidationFee, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.liquidityProportion !== null && src.liquidityProportion !== undefined) { b_1.storeBit(true).storeInt(src.liquidityProportion, 257); } else { b_1.storeBit(false); }
        if (src.tradingFeeRate !== null && src.tradingFeeRate !== undefined) { b_1.storeBit(true).storeInt(src.tradingFeeRate, 257); } else { b_1.storeBit(false); }
        if (src.lpTradingFeeRate !== null && src.lpTradingFeeRate !== undefined) { b_1.storeBit(true).storeInt(src.lpTradingFeeRate, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.interestRate !== null && src.interestRate !== undefined) { b_2.storeBit(true).storeInt(src.interestRate, 257); } else { b_2.storeBit(false); }
        if (src.premuimRateCap !== null && src.premuimRateCap !== undefined) { b_2.storeBit(true).storeInt(src.premuimRateCap, 257); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 601863652) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _name = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _enable = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minMargin = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _maxLeverage = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _liquidationFee = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityProportion = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _tradingFeeRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _lpTradingFeeRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _interestRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    let _premuimRateCap = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, premuimRateCap: _premuimRateCap };
}

function loadTupleUpdateTokenConfig(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _name = source.readStringOpt();
    let _enable = source.readBooleanOpt();
    let _minMargin = source.readBigNumberOpt();
    let _maxLeverage = source.readBigNumberOpt();
    let _liquidationFee = source.readBigNumberOpt();
    let _liquidityProportion = source.readBigNumberOpt();
    let _tradingFeeRate = source.readBigNumberOpt();
    let _lpTradingFeeRate = source.readBigNumberOpt();
    let _interestRate = source.readBigNumberOpt();
    let _premuimRateCap = source.readBigNumberOpt();
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, premuimRateCap: _premuimRateCap };
}

function storeTupleUpdateTokenConfig(source: UpdateTokenConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minMargin);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.liquidityProportion);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    builder.writeNumber(source.interestRate);
    builder.writeNumber(source.premuimRateCap);
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

export type ClaimProtocolFee = {
    $$type: 'ClaimProtocolFee';
    feeReceiver: Address;
}

export function storeClaimProtocolFee(src: ClaimProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3045995621, 32);
        b_0.storeAddress(src.feeReceiver);
    };
}

export function loadClaimProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3045995621) { throw Error('Invalid prefix'); }
    let _feeReceiver = sc_0.loadAddress();
    return { $$type: 'ClaimProtocolFee' as const, feeReceiver: _feeReceiver };
}

function loadTupleClaimProtocolFee(source: TupleReader) {
    let _feeReceiver = source.readAddress();
    return { $$type: 'ClaimProtocolFee' as const, feeReceiver: _feeReceiver };
}

function storeTupleClaimProtocolFee(source: ClaimProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.feeReceiver);
    return builder.build();
}

function dictValueParserClaimProtocolFee(): DictionaryValue<ClaimProtocolFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadClaimProtocolFee(src.loadRef().beginParse());
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
        b_0.storeUint(2353525746, 32);
        b_0.storeUint(src.sampleRangeLength, 64);
        b_0.storeDict(src.sampleRanges, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSampleRangeParam());
    };
}

export function loadSetPremiumRateSampleRange(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2353525746) { throw Error('Invalid prefix'); }
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
    realizedPnl: bigint;
    trxId: bigint;
}

export function storeGlobalLPLiquidityChangedEvent(src: GlobalLPLiquidityChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1128107268, 32);
        b_0.storeInt(src.lpFundAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        b_0.storeInt(src.tradingFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.realizedPnl, 257);
        b_1.storeUint(src.trxId, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalLPLiquidityChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1128107268) { throw Error('Invalid prefix'); }
    let _lpFundAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let _tradingFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _realizedPnl = sc_1.loadIntBig(257);
    let _trxId = sc_1.loadUintBig(64);
    return { $$type: 'GlobalLPLiquidityChangedEvent' as const, lpFundAfter: _lpFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, realizedPnl: _realizedPnl, trxId: _trxId };
}

function loadTupleGlobalLPLiquidityChangedEvent(source: TupleReader) {
    let _lpFundAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _realizedPnl = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'GlobalLPLiquidityChangedEvent' as const, lpFundAfter: _lpFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, realizedPnl: _realizedPnl, trxId: _trxId };
}

function storeTupleGlobalLPLiquidityChangedEvent(source: GlobalLPLiquidityChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
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
    tokenId: bigint;
    price: bigint;
    lpReceivedFundingFeeDelta: bigint;
    longFundingFeeGrowthAfter: bigint;
    shortFundingFeeGrowthAfter: bigint;
}

export function storeUpdatePriceEvent(src: UpdatePriceEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3491704115, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
        b_0.storeInt(src.lpReceivedFundingFeeDelta, 257);
        b_0.storeInt(src.longFundingFeeGrowthAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortFundingFeeGrowthAfter, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdatePriceEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3491704115) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let _lpReceivedFundingFeeDelta = sc_0.loadIntBig(257);
    let _longFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortFundingFeeGrowthAfter = sc_1.loadIntBig(257);
    return { $$type: 'UpdatePriceEvent' as const, tokenId: _tokenId, price: _price, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function loadTupleUpdatePriceEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _lpReceivedFundingFeeDelta = source.readBigNumber();
    let _longFundingFeeGrowthAfter = source.readBigNumber();
    let _shortFundingFeeGrowthAfter = source.readBigNumber();
    return { $$type: 'UpdatePriceEvent' as const, tokenId: _tokenId, price: _price, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function storeTupleUpdatePriceEvent(source: UpdatePriceEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.lpReceivedFundingFeeDelta);
    builder.writeNumber(source.longFundingFeeGrowthAfter);
    builder.writeNumber(source.shortFundingFeeGrowthAfter);
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

export type PremiumRateChangedEvent = {
    $$type: 'PremiumRateChangedEvent';
    tokenId: bigint;
    premiumRate: bigint;
}

export function storePremiumRateChangedEvent(src: PremiumRateChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1491091956, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadPremiumRateChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1491091956) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'PremiumRateChangedEvent' as const, tokenId: _tokenId, premiumRate: _premiumRate };
}

function loadTuplePremiumRateChangedEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'PremiumRateChangedEvent' as const, tokenId: _tokenId, premiumRate: _premiumRate };
}

function storeTuplePremiumRateChangedEvent(source: PremiumRateChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserPremiumRateChangedEvent(): DictionaryValue<PremiumRateChangedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePremiumRateChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPremiumRateChangedEvent(src.loadRef().beginParse());
        }
    }
}

export type TestPerpPositionIncreasedEvent = {
    $$type: 'TestPerpPositionIncreasedEvent';
    trxId: bigint;
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
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    globalLongFundingFeeGrowthAfter: bigint;
    globalShortFundingFeeGrowthAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpLiquidityAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
}

export function storeTestPerpPositionIncreasedEvent(src: TestPerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3371394054, 32);
        b_0.storeUint(src.trxId, 64);
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
        b_3.storeInt(src.globalLongMarginAfter, 257);
        b_3.storeInt(src.globalShortMarginAfter, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.globalLongSizeAfter, 257);
        b_4.storeInt(src.globalShortSizeAfter, 257);
        b_4.storeInt(src.globalLongFundingFeeGrowthAfter, 257);
        let b_5 = new Builder();
        b_5.storeInt(src.globalShortFundingFeeGrowthAfter, 257);
        b_5.storeInt(src.lpNetSizeAfter, 257);
        b_5.storeBit(src.lpIsLong);
        b_5.storeInt(src.lpEntryPriceAfter, 257);
        let b_6 = new Builder();
        b_6.storeInt(src.lpFundAfter, 257);
        b_6.storeInt(src.lpLiquidityAfter, 257);
        b_6.storeInt(src.lpTradingFee, 257);
        let b_7 = new Builder();
        b_7.storeInt(src.lpRealizedPnl, 257);
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTestPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3371394054) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
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
    let _globalLongMarginAfter = sc_3.loadIntBig(257);
    let _globalShortMarginAfter = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _globalLongSizeAfter = sc_4.loadIntBig(257);
    let _globalShortSizeAfter = sc_4.loadIntBig(257);
    let _globalLongFundingFeeGrowthAfter = sc_4.loadIntBig(257);
    let sc_5 = sc_4.loadRef().beginParse();
    let _globalShortFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let _lpNetSizeAfter = sc_5.loadIntBig(257);
    let _lpIsLong = sc_5.loadBit();
    let _lpEntryPriceAfter = sc_5.loadIntBig(257);
    let sc_6 = sc_5.loadRef().beginParse();
    let _lpFundAfter = sc_6.loadIntBig(257);
    let _lpLiquidityAfter = sc_6.loadIntBig(257);
    let _lpTradingFee = sc_6.loadIntBig(257);
    let sc_7 = sc_6.loadRef().beginParse();
    let _lpRealizedPnl = sc_7.loadIntBig(257);
    return { $$type: 'TestPerpPositionIncreasedEvent' as const, trxId: _trxId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadTupleTestPerpPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
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
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongFundingFeeGrowthAfter = source.readBigNumber();
    let _globalShortFundingFeeGrowthAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpLiquidityAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'TestPerpPositionIncreasedEvent' as const, trxId: _trxId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function storeTupleTestPerpPositionIncreasedEvent(source: TestPerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
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
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.globalLongFundingFeeGrowthAfter);
    builder.writeNumber(source.globalShortFundingFeeGrowthAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpLiquidityAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    return builder.build();
}

function dictValueParserTestPerpPositionIncreasedEvent(): DictionaryValue<TestPerpPositionIncreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTestPerpPositionIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadTestPerpPositionIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type TestPerpPositionDecreasedEvent = {
    $$type: 'TestPerpPositionDecreasedEvent';
    trxId: bigint;
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
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    globalLongFundingFeeGrowthAfter: bigint;
    globalShortFundingFeeGrowthAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpLiquidityAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
}

export function storeTestPerpPositionDecreasedEvent(src: TestPerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2366441884, 32);
        b_0.storeUint(src.trxId, 64);
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
        b_3.storeInt(src.globalLongMarginAfter, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.globalShortMarginAfter, 257);
        b_4.storeInt(src.globalLongSizeAfter, 257);
        b_4.storeInt(src.globalShortSizeAfter, 257);
        let b_5 = new Builder();
        b_5.storeInt(src.globalLongFundingFeeGrowthAfter, 257);
        b_5.storeInt(src.globalShortFundingFeeGrowthAfter, 257);
        b_5.storeInt(src.lpNetSizeAfter, 257);
        b_5.storeBit(src.lpIsLong);
        let b_6 = new Builder();
        b_6.storeInt(src.lpEntryPriceAfter, 257);
        b_6.storeInt(src.lpFundAfter, 257);
        b_6.storeInt(src.lpLiquidityAfter, 257);
        let b_7 = new Builder();
        b_7.storeInt(src.lpTradingFee, 257);
        b_7.storeInt(src.lpRealizedPnl, 257);
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTestPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2366441884) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
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
    let _globalLongMarginAfter = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _globalShortMarginAfter = sc_4.loadIntBig(257);
    let _globalLongSizeAfter = sc_4.loadIntBig(257);
    let _globalShortSizeAfter = sc_4.loadIntBig(257);
    let sc_5 = sc_4.loadRef().beginParse();
    let _globalLongFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let _globalShortFundingFeeGrowthAfter = sc_5.loadIntBig(257);
    let _lpNetSizeAfter = sc_5.loadIntBig(257);
    let _lpIsLong = sc_5.loadBit();
    let sc_6 = sc_5.loadRef().beginParse();
    let _lpEntryPriceAfter = sc_6.loadIntBig(257);
    let _lpFundAfter = sc_6.loadIntBig(257);
    let _lpLiquidityAfter = sc_6.loadIntBig(257);
    let sc_7 = sc_6.loadRef().beginParse();
    let _lpTradingFee = sc_7.loadIntBig(257);
    let _lpRealizedPnl = sc_7.loadIntBig(257);
    return { $$type: 'TestPerpPositionDecreasedEvent' as const, trxId: _trxId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadTupleTestPerpPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
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
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongFundingFeeGrowthAfter = source.readBigNumber();
    let _globalShortFundingFeeGrowthAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpLiquidityAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'TestPerpPositionDecreasedEvent' as const, trxId: _trxId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, receive: _receive, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongFundingFeeGrowthAfter: _globalLongFundingFeeGrowthAfter, globalShortFundingFeeGrowthAfter: _globalShortFundingFeeGrowthAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpLiquidityAfter: _lpLiquidityAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function storeTupleTestPerpPositionDecreasedEvent(source: TestPerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
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
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.globalLongFundingFeeGrowthAfter);
    builder.writeNumber(source.globalShortFundingFeeGrowthAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpLiquidityAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    return builder.build();
}

function dictValueParserTestPerpPositionDecreasedEvent(): DictionaryValue<TestPerpPositionDecreasedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTestPerpPositionDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadTestPerpPositionDecreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    gasConsumption: bigint;
    minTonsForStorage: bigint;
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
    let _lpBonusFactor = sc_0.loadIntBig(257);
    let _lpLiquidityFactor = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _orderBook = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _gasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _lpBonusFactor = source.readBigNumber();
    let _lpLiquidityFactor = source.readBigNumber();
    let _orderBook = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, gasConsumption: _gasConsumption, minTonsForStorage: _minTonsForStorage, lpBonusFactor: _lpBonusFactor, lpLiquidityFactor: _lpLiquidityFactor, orderBook: _orderBook };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.gasConsumption);
    builder.writeNumber(source.minTonsForStorage);
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
    premuimRateCap: bigint;
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
        b_2.storeInt(src.premuimRateCap, 257);
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
    let _premuimRateCap = sc_2.loadIntBig(257);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, premuimRateCap: _premuimRateCap };
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
    let _premuimRateCap = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMargin: _minMargin, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, liquidityProportion: _liquidityProportion, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate, interestRate: _interestRate, premuimRateCap: _premuimRateCap };
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
    builder.writeNumber(source.premuimRateCap);
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
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
    globalFundingRateSample: GlobalFundingRateSample | null;
    prevPremiumRate: bigint;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.globalPerpNetValue, 257);
        b_0.storeInt(src.globalPerpSingleValue, 257);
        let b_1 = new Builder();
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_1.storeBit(true); b_1.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_2.storeBit(true); b_2.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_2.storeBit(false); }
        let b_3 = new Builder();
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_3.storeBit(true); b_3.store(storeGlobalPosition(src.globalPosition)); } else { b_3.storeBit(false); }
        let b_4 = new Builder();
        if (src.globalFundingRateSample !== null && src.globalFundingRateSample !== undefined) { b_4.storeBit(true); b_4.store(storeGlobalFundingRateSample(src.globalFundingRateSample)); } else { b_4.storeBit(false); }
        let b_5 = new Builder();
        b_5.storeInt(src.prevPremiumRate, 257);
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _globalPerpNetValue = sc_0.loadIntBig(257);
    let _globalPerpSingleValue = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpPosition = sc_1.loadBit() ? loadDirectionPerpPosition(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _globalLPPosition = sc_2.loadBit() ? loadGlobalLPPosition(sc_2) : null;
    let sc_3 = sc_2.loadRef().beginParse();
    let _globalPosition = sc_3.loadBit() ? loadGlobalPosition(sc_3) : null;
    let sc_4 = sc_3.loadRef().beginParse();
    let _globalFundingRateSample = sc_4.loadBit() ? loadGlobalFundingRateSample(sc_4) : null;
    let sc_5 = sc_4.loadRef().beginParse();
    let _prevPremiumRate = sc_5.loadIntBig(257);
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalFundingRateSample: _globalFundingRateSample, prevPremiumRate: _prevPremiumRate };
}

function loadTuplePerpPositionData(source: TupleReader) {
    let _globalPerpNetValue = source.readBigNumber();
    let _globalPerpSingleValue = source.readBigNumber();
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    const _globalFundingRateSample_p = source.readTupleOpt();
    const _globalFundingRateSample = _globalFundingRateSample_p ? loadTupleGlobalFundingRateSample(_globalFundingRateSample_p) : null;
    let _prevPremiumRate = source.readBigNumber();
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalFundingRateSample: _globalFundingRateSample, prevPremiumRate: _prevPremiumRate };
}

function storeTuplePerpPositionData(source: PerpPositionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.globalPerpNetValue);
    builder.writeNumber(source.globalPerpSingleValue);
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
    if (source.globalFundingRateSample !== null && source.globalFundingRateSample !== undefined) {
        builder.writeTuple(storeTupleGlobalFundingRateSample(source.globalFundingRateSample));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.prevPremiumRate);
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
        b_0.storeUint(src.sampleLength, 64);
        b_0.storeDict(src.samples, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample());
    };
}

export function loadPremiumRateSampleRange(slice: Slice) {
    let sc_0 = slice;
    let _sampleLength = sc_0.loadUintBig(64);
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
        b_0.storeUint(src.sampleId, 64);
        b_0.storeUint(src.sampleLength, 64);
        b_0.storeDict(src.samples, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSample());
    };
}

export function loadPremiumRateSampleRangeParam(slice: Slice) {
    let sc_0 = slice;
    let _sampleId = sc_0.loadUintBig(64);
    let _sampleLength = sc_0.loadUintBig(64);
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
    sampleX: bigint;
    sampleY: bigint;
}

export function storePremiumRateSample(src: PremiumRateSample) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.sampleX, 257);
        b_0.storeInt(src.sampleY, 257);
    };
}

export function loadPremiumRateSample(slice: Slice) {
    let sc_0 = slice;
    let _sampleX = sc_0.loadIntBig(257);
    let _sampleY = sc_0.loadIntBig(257);
    return { $$type: 'PremiumRateSample' as const, sampleX: _sampleX, sampleY: _sampleY };
}

function loadTuplePremiumRateSample(source: TupleReader) {
    let _sampleX = source.readBigNumber();
    let _sampleY = source.readBigNumber();
    return { $$type: 'PremiumRateSample' as const, sampleX: _sampleX, sampleY: _sampleY };
}

function storeTuplePremiumRateSample(source: PremiumRateSample) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.sampleX);
    builder.writeNumber(source.sampleY);
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

export type PremiumRateSampleData = {
    $$type: 'PremiumRateSampleData';
    rangeId: bigint;
    sampleId: bigint;
    sampleX: bigint;
    sampleY: bigint;
    premiumRate: bigint;
}

export function storePremiumRateSampleData(src: PremiumRateSampleData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.rangeId, 64);
        b_0.storeUint(src.sampleId, 64);
        b_0.storeInt(src.sampleX, 257);
        b_0.storeInt(src.sampleY, 257);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadPremiumRateSampleData(slice: Slice) {
    let sc_0 = slice;
    let _rangeId = sc_0.loadUintBig(64);
    let _sampleId = sc_0.loadUintBig(64);
    let _sampleX = sc_0.loadIntBig(257);
    let _sampleY = sc_0.loadIntBig(257);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'PremiumRateSampleData' as const, rangeId: _rangeId, sampleId: _sampleId, sampleX: _sampleX, sampleY: _sampleY, premiumRate: _premiumRate };
}

function loadTuplePremiumRateSampleData(source: TupleReader) {
    let _rangeId = source.readBigNumber();
    let _sampleId = source.readBigNumber();
    let _sampleX = source.readBigNumber();
    let _sampleY = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'PremiumRateSampleData' as const, rangeId: _rangeId, sampleId: _sampleId, sampleX: _sampleX, sampleY: _sampleY, premiumRate: _premiumRate };
}

function storeTuplePremiumRateSampleData(source: PremiumRateSampleData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.rangeId);
    builder.writeNumber(source.sampleId);
    builder.writeNumber(source.sampleX);
    builder.writeNumber(source.sampleY);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserPremiumRateSampleData(): DictionaryValue<PremiumRateSampleData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePremiumRateSampleData(src)).endCell());
        },
        parse: (src) => {
            return loadPremiumRateSampleData(src.loadRef().beginParse());
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

export type UpdateFundingRateResult = {
    $$type: 'UpdateFundingRateResult';
    lpReceivedFundingFeeDelta: bigint;
    longFundingFeeGrowthAfter: bigint;
    shortFundingFeeGrowthAfter: bigint;
}

export function storeUpdateFundingRateResult(src: UpdateFundingRateResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lpReceivedFundingFeeDelta, 257);
        b_0.storeInt(src.longFundingFeeGrowthAfter, 257);
        b_0.storeInt(src.shortFundingFeeGrowthAfter, 257);
    };
}

export function loadUpdateFundingRateResult(slice: Slice) {
    let sc_0 = slice;
    let _lpReceivedFundingFeeDelta = sc_0.loadIntBig(257);
    let _longFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    let _shortFundingFeeGrowthAfter = sc_0.loadIntBig(257);
    return { $$type: 'UpdateFundingRateResult' as const, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function loadTupleUpdateFundingRateResult(source: TupleReader) {
    let _lpReceivedFundingFeeDelta = source.readBigNumber();
    let _longFundingFeeGrowthAfter = source.readBigNumber();
    let _shortFundingFeeGrowthAfter = source.readBigNumber();
    return { $$type: 'UpdateFundingRateResult' as const, lpReceivedFundingFeeDelta: _lpReceivedFundingFeeDelta, longFundingFeeGrowthAfter: _longFundingFeeGrowthAfter, shortFundingFeeGrowthAfter: _shortFundingFeeGrowthAfter };
}

function storeTupleUpdateFundingRateResult(source: UpdateFundingRateResult) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpReceivedFundingFeeDelta);
    builder.writeNumber(source.longFundingFeeGrowthAfter);
    builder.writeNumber(source.shortFundingFeeGrowthAfter);
    return builder.build();
}

function dictValueParserUpdateFundingRateResult(): DictionaryValue<UpdateFundingRateResult> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateFundingRateResult(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFundingRateResult(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('te6ccgECmgEANBkAART/APSkE/S88sgLAQIBYgIDA+rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4IKTBAUCASB8fQRuAZIwf+BwIddJwh+VMCDXCx/eIIIQQxeYHrqPCDDbPGwX2zx/4CCCECPfteS64wIgghC1jjRlugYHCAkBRMj4QwHMfwHKABEYERcRFhEVERQRExESEREREFXg2zzJ7VQYAejTHwGCEEMXmB668uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHSAAGS0gCSbQHi0gABkvoAkm0B4tIAAZL6AJJtAeLSAAGVgQEB1wCSbQHi1AHQ0gABlYEBAdcAkm0B4goD8BEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCER4CAREdAREc2zxWG26zkXDjDRELDAIQMNs8bBvbPH8ODwP6jq4w0x8BghC1jjRluvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx4CCCEOic1F+6jsAw0x8BghDonNRfuvLggdIA0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0z9VQGwV2zx/4CAaGxwAbPpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIxECcQJhAlECQQIwAIVhpuswH8jjGBAQsRHCBu8tCAERsgbvLQgAMREAMCERwCAREbAXEhbpVbWfRZMJjIAc8AQTP0QeINlFcaVxriVhdus51XFREWIG7y0IARFBEWklcX4lYVbrOdVxMRFCBu8tCAERIRFJJXFeJWGm6znFcQERkgbvLQgA8RGZJXGuJWGG6zDQHKmz4RFyBu8tCADREXklcY4lYWbrObOxEVIG7y0IAKERWSVxbi+EJwcIBAECNtbW3bPBEQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+EG0QXBBLEDpJF1CGRAVUAfbTHwGCECPfteS68uCB0z/SAAGT1AHQkW3iAdIAAZLSAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUAdDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNDSAAEQAu4RFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDg0RGA0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgQDERkDAhEYAgERIgERIds8VhWBAQFWIhESAEiVgQEB1wCSbQHi0gABloEBAdcAMJIwbeIQWxBaEFkQWBBXEFYAFPhCVhMBxwXy4IQD/ln0DW+hkjBt3yBukjBtjofQ2zxsGm8K4iBus5cgbvLQgG8qjiYwiwhwggiYloCAZIIDDUCCCA9CQIIQI8NGAIIQBfXhAHAhECQQI+JWKW6zmzkRKCBu8tCACBEoklcp4lYnbrObNxEmIG7y0IAGESaSVyfiViVus5JXJeMNViOZExQAFjURJCBu8tCABBEkAf5us5szESIgbvLQgAIRIpJXI+JWIW6zmDERICBu8tCAklch4lYfbrOdVyARHiBu8tCAER8RHpJXH+JWJm6znVciESUgbvLQgBEhESWSVybiVhxus51XHxEbIG7y0IARHhEbklcc4lYabrOdVx8RGSBu8tCAER4RGZJXGuJWIm6zFQP8nVcgESEgbvLQgBEfESGSVyLiCBEhCAcRGAcGERkGBREiBQQRGgQDERsDAhEcAgERHQERHoEBAREgyFWQ2zzJED0CERcCAREYASBulTBZ9FowlEEz9BXi+EJwcIBAECNtbW3bPAwRFwwLERYLERUJERQJCBETCAcREgcGEREGFlQXAIbIUArPFslQCswXygAVgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwASgQEBzwADyIEBAc8AEoEBAc8AyVjMyQHMACoFERAFEE8QPk3AEKsJCkcYEDYVQzAB9gERFwERGIEBAc8AAREVAYEBAc8AARETAfQAARERAYEBAc8AD8iBAQHPAFAOINdJgQELuvLgiCDXCwoggQT/uvLQ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bpVbWfRaMJjIAc8AQTP0QuLiLoEBASNZ9A1voZIwbd85AfoRHJcgER2+8uZslyARHbvy5mziERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHEG8QXhBNEDxLqRBYBxEhB1YhBxBWBREhBQHbPEME/DBWIsADj3NWIsAEjutXG1cbERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6EGkQKAcRIAckRWcEAhEhAgHbPOMO4w0RGFlWV1gBfAIRGgIRGwEQJBAjbW3bPBEUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsSVAP+IG6SMG2OGNCBAQHXANIAgQEB1wCBAQHXAFUwbBRvBOIgbrORMOMNJ4EBASNZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOIgbrOXIG7y0IBvKJkwcFRwAFRwACDiXLYJWaG2C1NbqII4BWvHXi1jEAAAqQRTXKiCOAVrx14tYxAAADqJOwDWIG7y0IBvJCKOE1NxoVJAqII4BWvHXi1jEAAAqQSOE1MXoVJAqII4BWvHXi1jEAAAqQTiUhCgH6FVIIEBAQ/IVTBQNIEBAc8AygCBAQHPAIEBAc8AyQIREAJULDAgbpUwWfRaMJRBM/QV4g4B+KkEXLYJUAShH6BT4qG2C1ihH6ARGREhERkRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREhEREREBEgERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJESEJCBEgCAcRHwcGBREeBQQRHAQ8A8gDESADAhEaAlYhAlYcAlYgAlYfAgERJAERHts8XAYRIgYFER0FBBEhBAMRHwNYESCBAQERJMhVcNs8yRAkAREdAVYeASBulTBZ9FowlEEz9BXiBBEcBAMRFgMCERkCAREXAREYPXU+AvJWG4EBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKCAOjEIW6z8vQgbvLQgG8qGV8JKYEBAShZ9A1voZIwbd8gbpIw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VTBQNIEBAc8AygCBAQHPAIEBAc8AyQIRKAIZVhgBIG6VMFn0WjCUQTP0FeIRGBEZERh1UALyERcRJhEXERYRJhEWERURJhEVERQRJhEUERMRIRETERIRJhESERERIRERDxEhDw4RHQ4MER8MCxEdC0qQCBEfCBBHEDYFER0FRDACER8CViUCViUCESMBEO/IERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yVFSAfSCEMjzZAYBER3LHwERGwHLPwERGQHLBwERFwHLPwERFSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREwHLPwEREQHKAB+BAQHPAB2BAQHPAAvIgQEBzwAagQEBzwAYgQEBzwAGyIEBAc8AFYEBAc8AE4EBAVMAOMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABB8EDQA5M8AAciBAQHPABKBAQHPABKBAQHPAAPIgQEBzwAUgQEBzwAVgQEBzwAFyIEBAc8AFoEBAc8AFsoAFoEBAc8ABsiBAQHPABeBAQHPABeBAQHPAAfIgQEBzwDJUAfMyVADzMlQBMzJUATMyVADzMlYzMkBzAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wBVAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAfwRG5lWGgERHL7y5myZVhoBERy78uZs4hEVER8RFREUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBOED1MuhBpECgHESAHJEVnBAIRIQIB2zxZAc5XG1cbVxtXG1ceERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6CREdCRBYEEcQNgURHQVUQRUEAxEeAwIRHts8agAkERcRFhEVERQRExESEREREFXgAuZWHoEBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bBpvCuKBbJYhbrPy9CBu8tCAbypbMjQ1ggCPblAE8vRWFIEBAStZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBus5cgbvLQgG8hkjBt4iCBAQstWfQLb6GSMG3fmVoB/iBukjBtjkrQ0z+BAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAVFEMwBdQB0NM/gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFRRDMDUQWlUDbBpvCuIgbrOXIG7y0IBvKpswcFRwACBwVHAAIOJWE5VUeYdTmJVUdDJTQ+KBFHYjwgBbAv7y9FYWI7yVVxYhERbeViKBAQFWG1n0DW+hkjBt3yBukjBtjofQ2zxsGG8I4iBus5cgbvLQgG8omTBwVHAAVHAAIOJWII4TUjmhKqiCOAVrx14tYxAAAKkEI44TUimhKqiCOAVrx14tYxAAAKkEIuJWMoEBAVYkWfQNb6GSMG3fiVwD3CBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTiIG6zlyBu8tCAbySVMHBwUxHicFYkJcIAlFYnJb2RcOLjACDCAI4VNFJDqCNWI6igU0OgqQRQQ6BWJUNDkTDicCBWJsIAklcj4w1WE1YoXV5fAIgxJFYltghWJ7OOFFYjJKFSEKiCOAVrx14tYxAAAKkEjhQjViShUhCogjgFa8deLWMQAACpBOJRIaFQZqEgwACScDTeBQB4W1YkViOoViCogjgKGPB9c2uQvlWqHKkEIBEjqIIQO5rKAKkEViIhoQERPQGgIVY9oAEROAGgETcRPBEiBPyOFlYkVhKhVicBqII4BWvHXi1jEAAAqQSOFlYRViWhVicBqII4BWvHXi1jEAAAqQTiVhRTGqAkoQERFgGgggDzySHC//L0VikhvJRXKVYo3lYpoREUViihKREWVhWhIcIA4w9WKI4VVxpXGlcaVxpXGi1WHQxWH6EKViOh4w5gYWJjAPhWK44VVidWFaFSIKiCOAVrx14tYxAAAKkEjhVWFFYooVIgqII4BWvHXi1jEAAAqQTiIlYpqAERJqiCOAoY8H1za5C+VaocqQQBESagVhWBb7sRJqC5AREkAfL0VhOBQ6ARI6hWI1YUqII4BWvHXi1jEAAAqQS+AREiAfL0AHoxVxNXFFcUVx9XH1cfUd6gAREjAQ6gcFRwACAFEScFERIRIhESAhEhAhETESAREwQRFAQREwMREgMBEREEAKBXFVcVVxVXFVcVLVYdC1YfoQlWI6ERFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREWEREBERUBCxEUCw4REw4REBESERAQvAkLCgHSU222CVB+obYLJlYjqII4BWvHXi1jEAAAqQRSoBEkqII4BWvHXi1jEAAAqQRWIyG2CVAPoQERLgGgViIuobYLAREuoQERLgGgCBEQCAcRLQcQaxBdEE8DERUDAhEUAgEREwEREoEBCxESZAHsyFWQEFoQSRA4R2pQRcs/EoEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczIVUAGUEXLPxKBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyQHMyQIREwIZVh4BIG6VMFn0WTCUQTP0E+KBAQEByAEB9ADJAhEnAlYcAWUC/iBulTBZ9FowlEEz9BXigQEBJwJWElRFMCkCVicCVisCAREdAQjIVXDbPMkCESMCVhoBIG6VMFn0WjCUQTP0FeJUd22BAQEREMhVMFA0gQEBzwDKAIEBAc8AgQEBzwDJAhEpAh1WGQEgbpUwWfRaMJRBM/QV4hEYERoRGAgRFwh1ZgL0ERYRGhEWCBEVCBEUERoRFBEQERMREBESEScREhERERoREQ8REA8PEScPEJ1UHAgQjAsQShBJCBEhCBA3BhEgBgURIwUQNAMRIANWJwJWJwIBER0BDxEQD8gRHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMlnaAH0ghCNDQmcAREeyx8BERwByz8BERoBywcBERgByz8BERYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERQByz8BERIBygABERABgQEBzwAegQEBzwAMyIEBAc8AG4EBAc8AGYEBAc8AB8iBAQHPABaBAQHPABRpADbIgljAAAAAAAAAAAAAAAABActnzMlw+wANCAUA7oEBAc8AAsiBAQHPAIEBAc8AEoEBAc8AAsiBAQHPABSBAQHPABSBAQHPAAXIgQEBzwAWgQEBzwAWgQEBzwAWygAGyIEBAc8AF4EBAc8AF4EBAc8AB8iBAQHPABiBAQHPAMlQBszJWMzJUAPMyVjMyVjMyVjMyQHMAuhWG4EBASVZ9A1voZIwbd8gbpIwbY6H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');
    const __system = Cell.fromBase64('te6cckECnAEANCMAAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWIbBAIBIBYFAgEgDwYCASAJBwKxtQObZ4Ii4iMCIuIiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2QJA3SRg2zJA3eWhAN5U3hXEQN0kYNu9CXCAE8gQEBVhcCWfQNb6GSMG3fIG6SMG2Oh9DbPGwabwriiwIBIA4KAgEgDAsAdazdxoatLgzOZ0Xl6i2qai0pri7nC0jKpsxKaobubm0szOcKjWxnDk0KpsbI6yps700qyO0q5w7JRxBAAu2ufZA3SRg2xw4Qa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEcW2eCIuIjAiLiIsIi4iLCIqIiwiKiIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ42erZKghA3SRg2zJA3eWhAN5M3g3ECQJcNAWRtIW6zjqUwgQELASBu8tCAVhBZWfQLb6GSMG3fIG6SMG2Oh9DbPGwWbwbikTHiVHy6LIEAEbCvu1E0NIAAYAIBIBEQALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lAD0bdRBA3SRg2xw4Qa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEcW2eCIuIjIiLiIsIjAiLCIqIi4iKiIoIiwiKCImIioiJiIkIigiJCIiIiYiIiIgIiQiIB4iIh4cIiAcqju2eNnO2U8JcTEgCeBCBukjBtjhEgbvLQgG8qVURvBVVAbwVvAuIDIG6SMG2ZIG7y0IBvJG8E4gIgbpIwbZkgbvLQgG8obwjiASBukjBtmSBu8tCAbyNvA+JVAwP2bSFus46kKoEBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBus5IwMeMNkTHiLoEBASNZ9A1voZIwbd8gbpIwbY4Y0IEBAdcA0gCBAQHXAIEBAdcAVTBsFG8E4iiBAQEkWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigQEBFW0UAGJURxVZ9A1voZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+IoUUgEQxMmANoxIG7y0IBvIYEBCwIgbvLQgBJZ9AtvoZIwbd8gbpIwbY5K0NM/gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFRRDMAXUAdDTP4EBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBUUQzA1EFpVA2wabwriAgN6IBkXAhipHds82zxXEF8PbIGXGAAEVhICyKrhIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPGzGbMaXGgBgbSFus44dMIEBCwEgbvLQgFYRWXFBM/QKb6GUAdcAMJJbbeKRMeJWGFYYVhdWF1YWA+rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4IKXHxwBRMj4QwHMfwHKABEYERcRFhEVERQRExESEREREFXg2zzJ7VQdAfYBERcBERiBAQHPAAERFQGBAQHPAAEREwH0AAEREQGBAQHPAA/IgQEBzwBQDiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAMINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WCsiBAQHPABn0ABf0ABXLPxMeAJD0AIEBAc8AgQEBzwAByIEBAc8AEoEBAc8AEvQAE8s/E/QAFIEBAc8ABMiBAQHPABX0ABX0ABWBAQHPAMkBzMlQA8zJWMzJAcwEbgGSMH/gcCHXScIflTAg1wsf3iCCEEMXmB66jwgw2zxsF9s8f+AgghAj37XkuuMCIIIQtY40ZbqVjoMgA/qOrjDTHwGCELWONGW68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgIIIQ6JzUX7qOwDDTHwGCEOic1F+68uCB0gDTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDTP1VAbBXbPH/gIIJwIQTkghD/V+VXuo8IMNs8bBzbPH/gIIIQHciVjLqOzjDTHwGCEB3IlYy68uCB0z/TP/QEVSBsEzJwgQEL+EJWFFlxQTP0Cm+hlAHXADCSW23iIG6zljEgbvLQgJEw4oIAoPcB8vQgwQGRW+MOf+CCEJRqmLa6byckIgFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAjATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPJECwnCTUwG5jqoigQEBIln0DW+hkjBt3yBukjBtndDTP4EBAdcAWWwSbwLiIG6zkTDjDaToXwNw+CdvEPhBbyQTXwOhVhihtgn4QW8kE18DVhhWGqChAaD4Qn9YchAjbW1t2zwlkQH8ICBu8tCAbyIwASBu8tCAbyIxERkRHBEZERgRGxEYERcRGhEXERYRHBEWERURGxEVERQRGhEUERMRHBETERIRGxESERERGhERERARHBEQDxEbDw4RGg4NERwNDBEbDAsRGgsKERwKCREbCQgRGggHERwHBhEbBgURGgUEERwEJgGUAxEbAwIRGgLbPBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVStiAfaCAKD3+EJWHwHHBfL0ERcRIxEXERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERgoBPxWIVYa2zxWGAGgqwCCEDuaygABoFYZqIIQO5rKAKkEcFYjwAqRf5RWI8AL4uMPcPgnbxD4QW8kE18DoVYYobYJ+EFvJBNfA1YYVhqgoQGggSTVIcIA8vQRG3ARGnERHMhVIIIQ7wHCtFAEyx8Syz+BAQHPAMs/yVYSBAMRHANiUCopAXwCERoCERsBECQQI21t2zwRFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0Qz1UrEpEE/DBWIsADj3NWIsAEjutXG1cbERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6EGkQKAcRIAckRWcEAhEhAgHb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');
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
    17312: { message: `leverage too high` },
    18995: { message: `margin rate too low` },
    23314: { message: `insufficient liquidity for single value` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31425: { message: `not reach unlock time` },
    36718: { message: `disabled token` },
    39251: { message: `insufficient global LP` },
    41207: { message: `invalid sender` },
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
    {"name":"UpdateConfig","header":1125619742,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"UpdateTokenConfig","header":601863652,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":true}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidityProportion","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"premuimRateCap","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"ClaimProtocolFee","header":3045995621,"fields":[{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePrice","header":499684748,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"SetPremiumRateSampleRange","header":2353525746,"fields":[{"name":"sampleRangeLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleRanges","type":{"kind":"dict","key":"int","value":"PremiumRateSampleRangeParam","valueFormat":"ref"}}]},
    {"name":"DeviationRate","header":769006232,"fields":[{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionIncreasedEvent","header":528848591,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionDecreasedEvent","header":88850873,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalLPLiquidityChangedEvent","header":1128107268,"fields":[{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalLPPositionChangedEvent","header":4133122195,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionIncreasedEvent","header":15026030,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionDecreasedEvent","header":2650649001,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalPositionChangedEvent","header":2196054124,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"longMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePriceEvent","header":3491704115,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpReceivedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateChangedEvent","header":1491091956,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TestPerpPositionIncreasedEvent","header":3371394054,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TestPerpPositionDecreasedEvent","header":2366441884,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLongFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalShortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityProportion","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premuimRateCap","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionData","header":null,"fields":[{"name":"lpPosition","type":{"kind":"simple","type":"LPPosition","optional":true}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"globalPerpNetValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}},{"name":"globalFundingRateSample","type":{"kind":"simple","type":"GlobalFundingRateSample","optional":true}},{"name":"prevPremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatePriceParam","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateSampleRange","header":null,"fields":[{"name":"sampleLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"samples","type":{"kind":"dict","key":"int","value":"PremiumRateSample","valueFormat":"ref"}}]},
    {"name":"PremiumRateSampleRangeParam","header":null,"fields":[{"name":"sampleId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"samples","type":{"kind":"dict","key":"int","value":"PremiumRateSample","valueFormat":"ref"}}]},
    {"name":"PremiumRateSample","header":null,"fields":[{"name":"sampleX","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleY","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateSampleData","header":null,"fields":[{"name":"rangeId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleX","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleY","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalFundingRateSample","header":null,"fields":[{"name":"lastAdjustFundingRateTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cumulativePremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateFundingRateResult","header":null,"fields":[{"name":"lpReceivedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"lpPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"LPPositionData","optional":false}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePrice"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | ClaimProtocolFee | UpdateLPPosition | UpdatePerpPosition | UpdatePrice | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenConfig') {
            body = beginCell().store(storeUpdateTokenConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimProtocolFee') {
            body = beginCell().store(storeClaimProtocolFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLPPosition') {
            body = beginCell().store(storeUpdateLPPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePerpPosition') {
            body = beginCell().store(storeUpdatePerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePrice') {
            body = beginCell().store(storeUpdatePrice(message)).endCell();
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
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleTokenConfig(result_p) : null;
        return result;
    }
    
    async getLpPosition(provider: ContractProvider, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('lpPosition', builder.build())).stack;
        const result = loadTupleLPPositionData(source);
        return result;
    }
    
    async getPerpPosition(provider: ContractProvider, tokenId: bigint, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        builder.writeAddress(account);
        let source = (await provider.get('perpPosition', builder.build())).stack;
        const result = loadTuplePerpPositionData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}