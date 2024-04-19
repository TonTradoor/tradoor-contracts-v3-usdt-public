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
        b_0.storeUint(24568009, 32);
        b_0.storeUint(src.sampleRangeLength, 64);
        b_0.storeDict(src.sampleRanges, Dictionary.Keys.BigInt(257), dictValueParserPremiumRateSampleRangeParam());
    };
}

export function loadSetPremiumRateSampleRange(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 24568009) { throw Error('Invalid prefix'); }
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
    lpFundingFee: bigint;
}

export function storeUpdatePriceEvent(src: UpdatePriceEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1651614151, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
        b_0.storeInt(src.lpFundingFee, 257);
    };
}

export function loadUpdatePriceEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1651614151) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let _lpFundingFee = sc_0.loadIntBig(257);
    return { $$type: 'UpdatePriceEvent' as const, tokenId: _tokenId, price: _price, lpFundingFee: _lpFundingFee };
}

function loadTupleUpdatePriceEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _lpFundingFee = source.readBigNumber();
    return { $$type: 'UpdatePriceEvent' as const, tokenId: _tokenId, price: _price, lpFundingFee: _lpFundingFee };
}

function storeTupleUpdatePriceEvent(source: UpdatePriceEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.lpFundingFee);
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
    deviationRate: bigint;
    premiumRate: bigint;
}

export function storePremiumRateChangedEvent(src: PremiumRateChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4236686843, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.deviationRate, 257);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadPremiumRateChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4236686843) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _deviationRate = sc_0.loadIntBig(257);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'PremiumRateChangedEvent' as const, tokenId: _tokenId, deviationRate: _deviationRate, premiumRate: _premiumRate };
}

function loadTuplePremiumRateChangedEvent(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _deviationRate = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'PremiumRateChangedEvent' as const, tokenId: _tokenId, deviationRate: _deviationRate, premiumRate: _premiumRate };
}

function storeTuplePremiumRateChangedEvent(source: PremiumRateChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.deviationRate);
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
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
    globalFundingRateSample: GlobalFundingRateSample | null;
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
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalFundingRateSample: _globalFundingRateSample };
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
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition, globalFundingRateSample: _globalFundingRateSample };
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

export type PremiumRateSampleData = {
    $$type: 'PremiumRateSampleData';
    rangeId: bigint;
    sampleId: bigint;
    deviationRate: bigint;
    premiumRate: bigint;
}

export function storePremiumRateSampleData(src: PremiumRateSampleData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.rangeId, 64);
        b_0.storeUint(src.sampleId, 64);
        b_0.storeInt(src.deviationRate, 257);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadPremiumRateSampleData(slice: Slice) {
    let sc_0 = slice;
    let _rangeId = sc_0.loadUintBig(64);
    let _sampleId = sc_0.loadUintBig(64);
    let _deviationRate = sc_0.loadIntBig(257);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'PremiumRateSampleData' as const, rangeId: _rangeId, sampleId: _sampleId, deviationRate: _deviationRate, premiumRate: _premiumRate };
}

function loadTuplePremiumRateSampleData(source: TupleReader) {
    let _rangeId = source.readBigNumber();
    let _sampleId = source.readBigNumber();
    let _deviationRate = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'PremiumRateSampleData' as const, rangeId: _rangeId, sampleId: _sampleId, deviationRate: _deviationRate, premiumRate: _premiumRate };
}

function storeTuplePremiumRateSampleData(source: PremiumRateSampleData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.rangeId);
    builder.writeNumber(source.sampleId);
    builder.writeNumber(source.deviationRate);
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
    const __code = Cell.fromBase64('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NxIgbpUwWfRaMJRBM/QV4gSRMOKk6F8D+EJwgEB/VSBtbW3bPHkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8eQTgBBEdBAMRHAMCERsC2zxwER6OyBEYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0BERsBVhvbPOMO+EFvJBNfA1YZqgChVhih+EFvJDUmJygD9FYSgQELJFn0C2+hkjBt3yBukjBtjofQ2zxsFm8G4nBUcABTADA0JG6zml8EIG7y0IBvJjCZNFYVpBEWQUQD4lYUVhKgIMEAkjBw3nAhVha5jhowVhQBoVYeAagnqFYUghA7msoAqKkEUTOgA5Ex4nAlwgCRMuMNUUegqikqAehXHREXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgQRxA2RRMRHEAEVhzbPBEbERkRGBEXERYRFREUERMREhERERBV4C0C7Ns8oYEk1SHCAPL0ERtwER1xERzIVSCCEBzwz4FQBMsfEss/gQEBzwDLP8lWEwQDERwDAhEdAhEbARAkECNtbds8ERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKxJ4eQAqMFYTWKEkqII4BWvHXi1jEAAAqQQBA+JRIaBWE/gjggFRgKCBAQtUeFZUdlTIVVDbPMkCERwCUsAgbpUwWfRZMJRBM/QT4hEXKaARFimgcQoQiRCLBwUGBAMRGwMCAREbASvIVbDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBwUw0DVhNVIDErLADWghAfhZbPUA3LHxvLBxnLP1AHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFYEBAc8AE4EBAc8AAciBAQHPABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwATgQEBzwATyz/JAczJAcwAkMhVQIIQQz2NBFAGyx8UgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASyz/JAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEM8QvAT2VhKBAQskWfQLb6GSMG3fIG6S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');
    const __system = Cell.fromBase64('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Ac8AFMs/yVjMyQHMyQHMAIpXEFcQVxBXEFcQKlYfVhwrUZugERQRGhEUERMRGBETERIRFxESERERFhERERARFREQDxEUDwMREwMCERICARERAQkREAoAKlYjVhGhUiCogjgFa8deLWMQAACpBAB4W1YiViGoViCogjgKGPB9c2uQvlWqHKkEIBEgqIIQO5rKAKkEVh8hoQERPAGgIVY8oAERNwGgETYROxEfACw0UkOoI1YhqKBTQ6CpBFBDoFYjs0NDAOQBIG7y0IBvJFIFoKsAA4EBAVQzJchVMFA0yz/LP4EBAc8AgQEBzwDJRVBWIQEgbpUwWfRaMJRBM/QV4lYfQEPIVSCCEPyGtftQBMsfEss/gQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAB/FYasxEZERoRGREYERoRGBEXERoRFxEWERoRFhEVERoRFREUERoRFBETERoRExESERoREhERERoREREQERoREA8RGg8OERoODREaDQwRGgwLERoLChEaCgkRGgkIERoIBxEaBwYRGgYFERoFBBEaBAMRGgMCERoCAREaAVYdAWgBClYkAds8agHCERgRGREYERcRGREXERYRGREWERURGREVERQRGREUERMRGRETERIRGRESERERGRERERARGREQDxEZDw4RGQ4NERkNDBEZDAsRGQsKERkKCREZCREZCAcGVUBWHFYjVhzbPGoD8lYZgQEBJFn0DW+hkjBt3yBukjBtjofQ2zxsGm8K4iBuk18EbeAgbvLQgG8qEElfCVYRgQEBJVn0DW+hkjBt3yBukjBtjhjQgQEB1wDSAIEBAdcAgQEB1wBVMGwUbwTiIG6TXwVt4CBu8tCAbyRbVHEEJMIAkjNw4w2hc2sB+JpQNrYIZqFZoVBEkjM14iDCAJYxE6ABs1iSMDLiVhAuoAGoghA7msoAqQQCghA7msoAqFipBBEaERsRGhEZERsRGREYERsRGBEXERsRFxEWERsRFhEVERsRFREUERsRFBETERsRExESERsREhERERsREREQERsREA8RGw9sAvQOERsODREbDQwRGwwLERsLChEbCgkRGwkIERsIBxEbBwYRGwYFERsFBBEbBAMRGwMCERsCAREbAds8ER2WoxEcoxEc3lUCERxvBBEYERkRGBEXERgRFxEWERcRFhEVERYR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');
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
    {"name":"UpdateConfig","header":1125619742,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}},{"name":"enableExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"UpdateTokenConfig","header":1775519856,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":true}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"ClaimProtocolFee","header":3045995621,"fields":[{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateLPPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"UpdateLPPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"UpdatePerpPositionSuccess","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePrice","header":499684748,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pricesLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"int","value":"UpdatePriceParam","valueFormat":"ref"}}]},
    {"name":"SetPremiumRateSampleRange","header":24568009,"fields":[{"name":"sampleRangeLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleRanges","type":{"kind":"dict","key":"int","value":"PremiumRateSampleRangeParam","valueFormat":"ref"}}]},
    {"name":"DeviationRate","header":769006232,"fields":[{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionIncreasedEvent","header":528848591,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFeeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LPPositionDecreasedEvent","header":88850873,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFeeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalLPLiquidityChangedEvent","header":1128107268,"fields":[{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalLPPositionChangedEvent","header":4133122195,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionIncreasedEvent","header":15026030,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionDecreasedEvent","header":2650649001,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GlobalPositionChangedEvent","header":2196054124,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"longMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMarginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePriceEvent","header":1651614151,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateChangedEvent","header":4236686843,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"gasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpBonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidityFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityProportion","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenConfigData","header":null,"fields":[{"name":"tokenIdNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenConfig","type":{"kind":"simple","type":"TokenConfig","optional":true}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedFundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionData","header":null,"fields":[{"name":"lpPosition","type":{"kind":"simple","type":"LPPosition","optional":true}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"globalPerpNetValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}},{"name":"globalFundingRateSample","type":{"kind":"simple","type":"GlobalFundingRateSample","optional":true}}]},
    {"name":"UpdatePriceParam","header":null,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateSampleRange","header":null,"fields":[{"name":"sampleLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"samples","type":{"kind":"dict","key":"int","value":"PremiumRateSample","valueFormat":"ref"}}]},
    {"name":"PremiumRateSampleRangeParam","header":null,"fields":[{"name":"sampleId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleLength","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"samples","type":{"kind":"dict","key":"int","value":"PremiumRateSample","valueFormat":"ref"}}]},
    {"name":"PremiumRateSample","header":null,"fields":[{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PremiumRateSampleData","header":null,"fields":[{"name":"rangeId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"sampleId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"deviationRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalFundingRateSample","header":null,"fields":[{"name":"lastAdjustFundingRateTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cumulativePremiumRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"executor","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"lpPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"LPPositionData","optional":true}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLPPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPremiumRateSampleRange"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | ClaimProtocolFee | UpdateLPPosition | UpdatePerpPosition | UpdatePrice | SetPremiumRateSampleRange | Deploy) {
        
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPremiumRateSampleRange') {
            body = beginCell().store(storeSetPremiumRateSampleRange(message)).endCell();
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