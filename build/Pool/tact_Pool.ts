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
    minMarginPerPosition: bigint | null;
    maxLeveragePerPosition: bigint | null;
    liquidationFeeRatePerPosition: bigint | null;
    liquidationExecutionFee: bigint | null;
    interestRate: bigint | null;
    maxFundingRate: bigint | null;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2396313514, 32);
        b_0.storeInt(src.tokenId, 257);
        if (src.name !== null && src.name !== undefined) { b_0.storeBit(true).storeStringRefTail(src.name); } else { b_0.storeBit(false); }
        if (src.enable !== null && src.enable !== undefined) { b_0.storeBit(true).storeBit(src.enable); } else { b_0.storeBit(false); }
        if (src.minMarginPerPosition !== null && src.minMarginPerPosition !== undefined) { b_0.storeBit(true).storeInt(src.minMarginPerPosition, 257); } else { b_0.storeBit(false); }
        if (src.maxLeveragePerPosition !== null && src.maxLeveragePerPosition !== undefined) { b_0.storeBit(true).storeInt(src.maxLeveragePerPosition, 257); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.liquidationFeeRatePerPosition !== null && src.liquidationFeeRatePerPosition !== undefined) { b_1.storeBit(true).storeInt(src.liquidationFeeRatePerPosition, 257); } else { b_1.storeBit(false); }
        if (src.liquidationExecutionFee !== null && src.liquidationExecutionFee !== undefined) { b_1.storeBit(true).storeInt(src.liquidationExecutionFee, 257); } else { b_1.storeBit(false); }
        if (src.interestRate !== null && src.interestRate !== undefined) { b_1.storeBit(true).storeInt(src.interestRate, 257); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.maxFundingRate !== null && src.maxFundingRate !== undefined) { b_2.storeBit(true).storeInt(src.maxFundingRate, 257); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2396313514) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadIntBig(257);
    let _name = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _enable = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minMarginPerPosition = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _maxLeveragePerPosition = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationFeeRatePerPosition = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _liquidationExecutionFee = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _interestRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _maxFundingRate = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMarginPerPosition: _minMarginPerPosition, maxLeveragePerPosition: _maxLeveragePerPosition, liquidationFeeRatePerPosition: _liquidationFeeRatePerPosition, liquidationExecutionFee: _liquidationExecutionFee, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleUpdateTokenConfig(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _name = source.readStringOpt();
    let _enable = source.readBooleanOpt();
    let _minMarginPerPosition = source.readBigNumberOpt();
    let _maxLeveragePerPosition = source.readBigNumberOpt();
    let _liquidationFeeRatePerPosition = source.readBigNumberOpt();
    let _liquidationExecutionFee = source.readBigNumberOpt();
    let _interestRate = source.readBigNumberOpt();
    let _maxFundingRate = source.readBigNumberOpt();
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, name: _name, enable: _enable, minMarginPerPosition: _minMarginPerPosition, maxLeveragePerPosition: _maxLeveragePerPosition, liquidationFeeRatePerPosition: _liquidationFeeRatePerPosition, liquidationExecutionFee: _liquidationExecutionFee, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function storeTupleUpdateTokenConfig(source: UpdateTokenConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minMarginPerPosition);
    builder.writeNumber(source.maxLeveragePerPosition);
    builder.writeNumber(source.liquidationFeeRatePerPosition);
    builder.writeNumber(source.liquidationExecutionFee);
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

export type CancelIncreaseRBFPositionOrder = {
    $$type: 'CancelIncreaseRBFPositionOrder';
    index: bigint;
    trxId: bigint;
}

export function storeCancelIncreaseRBFPositionOrder(src: CancelIncreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(203251748, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 203251748) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelIncreaseRBFPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelIncreaseRBFPositionOrder(source: CancelIncreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelIncreaseRBFPositionOrder(): DictionaryValue<CancelIncreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelIncreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelIncreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteIncreaseRBFPositionOrder = {
    $$type: 'ExecuteIncreaseRBFPositionOrder';
    index: bigint;
    trxId: bigint;
}

export function storeExecuteIncreaseRBFPositionOrder(src: ExecuteIncreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1807834441, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1807834441) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteIncreaseRBFPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteIncreaseRBFPositionOrder(source: ExecuteIncreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteIncreaseRBFPositionOrder(): DictionaryValue<ExecuteIncreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteIncreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteIncreaseRBFPositionOrder(src.loadRef().beginParse());
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

export type CancelDecreaseRBFPositionOrder = {
    $$type: 'CancelDecreaseRBFPositionOrder';
    index: bigint;
    trxId: bigint;
}

export function storeCancelDecreaseRBFPositionOrder(src: CancelDecreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1646684831, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1646684831) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelDecreaseRBFPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelDecreaseRBFPositionOrder(source: CancelDecreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelDecreaseRBFPositionOrder(): DictionaryValue<CancelDecreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelDecreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelDecreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteDecreaseRBFPositionOrder = {
    $$type: 'ExecuteDecreaseRBFPositionOrder';
    index: bigint;
    trxId: bigint;
}

export function storeExecuteDecreaseRBFPositionOrder(src: ExecuteDecreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(669742899, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 669742899) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteDecreaseRBFPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreaseRBFPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteDecreaseRBFPositionOrder(source: ExecuteDecreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteDecreaseRBFPositionOrder(): DictionaryValue<ExecuteDecreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteDecreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteDecreaseRBFPositionOrder(src.loadRef().beginParse());
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

export type CancelIncreaseLPPositionOrder = {
    $$type: 'CancelIncreaseLPPositionOrder';
    index: bigint;
    trxId: bigint;
}

export function storeCancelIncreaseLPPositionOrder(src: CancelIncreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1969540622, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1969540622) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelIncreaseLPPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelIncreaseLPPositionOrder(source: CancelIncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeExecuteIncreaseLPPositionOrder(src: ExecuteIncreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1677064598, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1677064598) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteIncreaseLPPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteIncreaseLPPositionOrder(source: ExecuteIncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeCancelDecreaseLPPositionOrder(src: CancelDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1163644794, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1163644794) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelDecreaseLPPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelDecreaseLPPositionOrder(source: CancelDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeExecuteDecreaseLPPositionOrder(src: ExecuteDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2377315584, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2377315584) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteDecreaseLPPositionOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreaseLPPositionOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteDecreaseLPPositionOrder(source: ExecuteDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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

export type LiquidateLPPosition = {
    $$type: 'LiquidateLPPosition';
    account: Address;
    trxId: bigint;
}

export function storeLiquidateLPPosition(src: LiquidateLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4093128992, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadLiquidateLPPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4093128992) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'LiquidateLPPosition' as const, account: _account, trxId: _trxId };
}

function loadTupleLiquidateLPPosition(source: TupleReader) {
    let _account = source.readAddress();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidateLPPosition' as const, account: _account, trxId: _trxId };
}

function storeTupleLiquidateLPPosition(source: LiquidateLPPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidateLPPosition(): DictionaryValue<LiquidateLPPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLiquidateLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateLPPosition(src.loadRef().beginParse());
        }
    }
}

export type CancelIncreasePerpPositionMarketOrder = {
    $$type: 'CancelIncreasePerpPositionMarketOrder';
    index: bigint;
    trxId: bigint;
}

export function storeCancelIncreasePerpPositionMarketOrder(src: CancelIncreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4235467031, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235467031) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelIncreasePerpPositionMarketOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelIncreasePerpPositionMarketOrder(source: CancelIncreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeExecuteIncreasePerpPositionMarketOrder(src: ExecuteIncreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3197434679, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3197434679) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteIncreasePerpPositionMarketOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteIncreasePerpPositionMarketOrder(source: ExecuteIncreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeCancelDecreasePerpPositionMarketOrder(src: CancelDecreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2371221739, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2371221739) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelDecreasePerpPositionMarketOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelDecreasePerpPositionMarketOrder(source: CancelDecreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeExecuteDecreasePerpPositionMarketOrder(src: ExecuteDecreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(984660893, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 984660893) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteDecreasePerpPositionMarketOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreasePerpPositionMarketOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteDecreasePerpPositionMarketOrder(source: ExecuteDecreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeCancelIncreasePerpPositionLimitOrder(src: CancelIncreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3637900503, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelIncreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3637900503) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelIncreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelIncreasePerpPositionLimitOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelIncreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelIncreasePerpPositionLimitOrder(source: CancelIncreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeExecuteIncreasePerpPositionLimitOrder(src: ExecuteIncreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2037745049, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteIncreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2037745049) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteIncreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteIncreasePerpPositionLimitOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteIncreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteIncreasePerpPositionLimitOrder(source: ExecuteIncreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeCancelDecreasePerpPositionLimitOrder(src: CancelDecreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1635653831, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadCancelDecreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1635653831) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'CancelDecreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleCancelDecreasePerpPositionLimitOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelDecreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleCancelDecreasePerpPositionLimitOrder(source: CancelDecreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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
    index: bigint;
    trxId: bigint;
}

export function storeExecuteDecreasePerpPositionLimitOrder(src: ExecuteDecreasePerpPositionLimitOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1651479254, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadExecuteDecreasePerpPositionLimitOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1651479254) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'ExecuteDecreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function loadTupleExecuteDecreasePerpPositionLimitOrder(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteDecreasePerpPositionLimitOrder' as const, index: _index, trxId: _trxId };
}

function storeTupleExecuteDecreasePerpPositionLimitOrder(source: ExecuteDecreasePerpPositionLimitOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
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

export type RBFPositionIncreasedEvent = {
    $$type: 'RBFPositionIncreasedEvent';
    positionId: bigint;
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    bonusDelta: bigint;
    bonusAfter: bigint;
    unlockTimeAfter: bigint;
}

export function storeRBFPositionIncreasedEvent(src: RBFPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2392839293, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.unlockTimeAfter, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2392839293) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _unlockTimeAfter = sc_2.loadIntBig(257);
    return { $$type: 'RBFPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter };
}

function loadTupleRBFPositionIncreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _unlockTimeAfter = source.readBigNumber();
    return { $$type: 'RBFPositionIncreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, unlockTimeAfter: _unlockTimeAfter };
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
}

export function storeRBFPositionDecreasedEvent(src: RBFPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1638352695, 32);
        b_0.storeInt(src.positionId, 257);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.bonusDelta, 257);
        b_1.storeInt(src.bonusAfter, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.receive, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1638352695) { throw Error('Invalid prefix'); }
    let _positionId = sc_0.loadIntBig(257);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _bonusDelta = sc_1.loadIntBig(257);
    let _bonusAfter = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _receive = sc_2.loadIntBig(257);
    return { $$type: 'RBFPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, receive: _receive };
}

function loadTupleRBFPositionDecreasedEvent(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _bonusDelta = source.readBigNumber();
    let _bonusAfter = source.readBigNumber();
    let _receive = source.readBigNumber();
    return { $$type: 'RBFPositionDecreasedEvent' as const, positionId: _positionId, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, bonusDelta: _bonusDelta, bonusAfter: _bonusAfter, receive: _receive };
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
}

export function storeGlobalRBFChangedEvent(src: GlobalRBFChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1512070263, 32);
        b_0.storeInt(src.riskBufferFundAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        b_0.storeInt(src.tradingFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidation, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalRBFChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1512070263) { throw Error('Invalid prefix'); }
    let _riskBufferFundAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let _tradingFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidation = sc_1.loadIntBig(257);
    return { $$type: 'GlobalRBFChangedEvent' as const, riskBufferFundAfter: _riskBufferFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, liquidation: _liquidation };
}

function loadTupleGlobalRBFChangedEvent(source: TupleReader) {
    let _riskBufferFundAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _liquidation = source.readBigNumber();
    return { $$type: 'GlobalRBFChangedEvent' as const, riskBufferFundAfter: _riskBufferFundAfter, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, liquidation: _liquidation };
}

function storeTupleGlobalRBFChangedEvent(source: GlobalRBFChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.riskBufferFundAfter);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.liquidation);
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

export type IncreaseLPPositionCreatedEvent = {
    $$type: 'IncreaseLPPositionCreatedEvent';
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeIncreaseLPPositionCreatedEvent(src: IncreaseLPPositionCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3944230540, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreaseLPPositionCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3944230540) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function loadTupleIncreaseLPPositionCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function storeTupleIncreaseLPPositionCreatedEvent(source: IncreaseLPPositionCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserIncreaseLPPositionCreatedEvent(): DictionaryValue<IncreaseLPPositionCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreaseLPPositionCancelledEvent = {
    $$type: 'IncreaseLPPositionCancelledEvent';
    index: bigint;
    trxId: bigint;
}

export function storeIncreaseLPPositionCancelledEvent(src: IncreaseLPPositionCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(484255129, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreaseLPPositionCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 484255129) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleIncreaseLPPositionCancelledEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleIncreaseLPPositionCancelledEvent(source: IncreaseLPPositionCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreaseLPPositionCancelledEvent(): DictionaryValue<IncreaseLPPositionCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreaseLPPositionExecutedEvent = {
    $$type: 'IncreaseLPPositionExecutedEvent';
    index: bigint;
    trxId: bigint;
}

export function storeIncreaseLPPositionExecutedEvent(src: IncreaseLPPositionExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1914138461, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreaseLPPositionExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1914138461) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleIncreaseLPPositionExecutedEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleIncreaseLPPositionExecutedEvent(source: IncreaseLPPositionExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreaseLPPositionExecutedEvent(): DictionaryValue<IncreaseLPPositionExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseLPPositionExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseLPPositionExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionIncreasedEvent = {
    $$type: 'LPPositionIncreasedEvent';
    account: Address;
    marginDelta: bigint;
    marginAfter: bigint;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    entryFundingFeeGrowth: bigint;
    entryTradingFeeGrowth: bigint;
}

export function storeLPPositionIncreasedEvent(src: LPPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2965363548, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.marginAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityDelta, 257);
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.entryFundingFeeGrowth, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.entryTradingFeeGrowth, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2965363548) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _marginAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityDelta = sc_1.loadIntBig(257);
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _entryFundingFeeGrowth = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _entryTradingFeeGrowth = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionIncreasedEvent' as const, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryTradingFeeGrowth: _entryTradingFeeGrowth };
}

function loadTupleLPPositionIncreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryTradingFeeGrowth = source.readBigNumber();
    return { $$type: 'LPPositionIncreasedEvent' as const, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryTradingFeeGrowth: _entryTradingFeeGrowth };
}

function storeTupleLPPositionIncreasedEvent(source: LPPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.entryFundingFeeGrowth);
    builder.writeNumber(source.entryTradingFeeGrowth);
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

export type DecreaseLPPositionCreatedEvent = {
    $$type: 'DecreaseLPPositionCreatedEvent';
    account: Address;
    marginDelta: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeDecreaseLPPositionCreatedEvent(src: DecreaseLPPositionCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(918998073, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreaseLPPositionCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 918998073) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function loadTupleDecreaseLPPositionCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionCreatedEvent' as const, account: _account, marginDelta: _marginDelta, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function storeTupleDecreaseLPPositionCreatedEvent(source: DecreaseLPPositionCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserDecreaseLPPositionCreatedEvent(): DictionaryValue<DecreaseLPPositionCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreaseLPPositionCancelledEvent = {
    $$type: 'DecreaseLPPositionCancelledEvent';
    index: bigint;
    trxId: bigint;
}

export function storeDecreaseLPPositionCancelledEvent(src: DecreaseLPPositionCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2507115865, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreaseLPPositionCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2507115865) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleDecreaseLPPositionCancelledEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleDecreaseLPPositionCancelledEvent(source: DecreaseLPPositionCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreaseLPPositionCancelledEvent(): DictionaryValue<DecreaseLPPositionCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreaseLPPositionExecutedEvent = {
    $$type: 'DecreaseLPPositionExecutedEvent';
    index: bigint;
    trxId: bigint;
}

export function storeDecreaseLPPositionExecutedEvent(src: DecreaseLPPositionExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1924045722, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreaseLPPositionExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1924045722) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreaseLPPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleDecreaseLPPositionExecutedEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreaseLPPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleDecreaseLPPositionExecutedEvent(source: DecreaseLPPositionExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreaseLPPositionExecutedEvent(): DictionaryValue<DecreaseLPPositionExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseLPPositionExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseLPPositionExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionDecreasedEvent = {
    $$type: 'LPPositionDecreasedEvent';
    account: Address;
    marginDelta: bigint;
    marginAfter: bigint;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    realizedLoss: bigint;
}

export function storeLPPositionDecreasedEvent(src: LPPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3713343920, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.marginAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityDelta, 257);
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.tradingFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.fundingFee, 257);
        b_2.storeInt(src.realizedLoss, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3713343920) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _marginAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityDelta = sc_1.loadIntBig(257);
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _tradingFee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _fundingFee = sc_2.loadIntBig(257);
    let _realizedLoss = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionDecreasedEvent' as const, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, realizedLoss: _realizedLoss };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _realizedLoss = source.readBigNumber();
    return { $$type: 'LPPositionDecreasedEvent' as const, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, tradingFee: _tradingFee, fundingFee: _fundingFee, realizedLoss: _realizedLoss };
}

function storeTupleLPPositionDecreasedEvent(source: LPPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.realizedLoss);
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
    account: Address;
    trxId: bigint;
    margin: bigint;
    liquidity: bigint;
    tradingFee: bigint;
    fundingFee: bigint;
    liquidationFee: bigint;
}

export function storeLPPositionLiquidatedEvent(src: LPPositionLiquidatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(23433073, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.trxId, 257);
        b_0.storeInt(src.margin, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidity, 257);
        b_1.storeInt(src.tradingFee, 257);
        b_1.storeInt(src.fundingFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.liquidationFee, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionLiquidatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 23433073) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _trxId = sc_0.loadIntBig(257);
    let _margin = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidity = sc_1.loadIntBig(257);
    let _tradingFee = sc_1.loadIntBig(257);
    let _fundingFee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _liquidationFee = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionLiquidatedEvent' as const, account: _account, trxId: _trxId, margin: _margin, liquidity: _liquidity, tradingFee: _tradingFee, fundingFee: _fundingFee, liquidationFee: _liquidationFee };
}

function loadTupleLPPositionLiquidatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _trxId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    return { $$type: 'LPPositionLiquidatedEvent' as const, account: _account, trxId: _trxId, margin: _margin, liquidity: _liquidity, tradingFee: _tradingFee, fundingFee: _fundingFee, liquidationFee: _liquidationFee };
}

function storeTupleLPPositionLiquidatedEvent(source: LPPositionLiquidatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.margin);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.liquidationFee);
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

export type GlobalLPChangedEvent = {
    $$type: 'GlobalLPChangedEvent';
    netSizeAfter: bigint;
    isLong: boolean;
    entryPriceAfter: bigint;
}

export function storeGlobalLPChangedEvent(src: GlobalLPChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1111775758, 32);
        b_0.storeInt(src.netSizeAfter, 257);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.entryPriceAfter, 257);
    };
}

export function loadGlobalLPChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1111775758) { throw Error('Invalid prefix'); }
    let _netSizeAfter = sc_0.loadIntBig(257);
    let _isLong = sc_0.loadBit();
    let _entryPriceAfter = sc_0.loadIntBig(257);
    return { $$type: 'GlobalLPChangedEvent' as const, netSizeAfter: _netSizeAfter, isLong: _isLong, entryPriceAfter: _entryPriceAfter };
}

function loadTupleGlobalLPChangedEvent(source: TupleReader) {
    let _netSizeAfter = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPriceAfter = source.readBigNumber();
    return { $$type: 'GlobalLPChangedEvent' as const, netSizeAfter: _netSizeAfter, isLong: _isLong, entryPriceAfter: _entryPriceAfter };
}

function storeTupleGlobalLPChangedEvent(source: GlobalLPChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.netSizeAfter);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.entryPriceAfter);
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

export type IncreasePerpPositionMarketCreatedEvent = {
    $$type: 'IncreasePerpPositionMarketCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeIncreasePerpPositionMarketCreatedEvent(src: IncreasePerpPositionMarketCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3646947677, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.acceptablePrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreasePerpPositionMarketCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3646947677) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _acceptablePrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, index: _index };
}

function loadTupleIncreasePerpPositionMarketCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, index: _index };
}

function storeTupleIncreasePerpPositionMarketCreatedEvent(source: IncreasePerpPositionMarketCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketCreatedEvent(): DictionaryValue<IncreasePerpPositionMarketCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionMarketCancelledEvent = {
    $$type: 'IncreasePerpPositionMarketCancelledEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionMarketCancelledEvent(src: IncreasePerpPositionMarketCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4244499969, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionMarketCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4244499969) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleIncreasePerpPositionMarketCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleIncreasePerpPositionMarketCancelledEvent(source: IncreasePerpPositionMarketCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketCancelledEvent(): DictionaryValue<IncreasePerpPositionMarketCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionMarketExecutedEvent = {
    $$type: 'IncreasePerpPositionMarketExecutedEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionMarketExecutedEvent(src: IncreasePerpPositionMarketExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(289177631, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionMarketExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 289177631) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionMarketExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleIncreasePerpPositionMarketExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionMarketExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleIncreasePerpPositionMarketExecutedEvent(source: IncreasePerpPositionMarketExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionMarketExecutedEvent(): DictionaryValue<IncreasePerpPositionMarketExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionMarketExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionMarketExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitCreatedEvent = {
    $$type: 'IncreasePerpPositionLimitCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    index: bigint;
}

export function storeIncreasePerpPositionLimitCreatedEvent(src: IncreasePerpPositionLimitCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2481954512, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreasePerpPositionLimitCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2481954512) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, index: _index };
}

function loadTupleIncreasePerpPositionLimitCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, index: _index };
}

function storeTupleIncreasePerpPositionLimitCreatedEvent(source: IncreasePerpPositionLimitCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitCreatedEvent(): DictionaryValue<IncreasePerpPositionLimitCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitCancelledEvent = {
    $$type: 'IncreasePerpPositionLimitCancelledEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionLimitCancelledEvent(src: IncreasePerpPositionLimitCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4267702159, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionLimitCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4267702159) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleIncreasePerpPositionLimitCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleIncreasePerpPositionLimitCancelledEvent(source: IncreasePerpPositionLimitCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitCancelledEvent(): DictionaryValue<IncreasePerpPositionLimitCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreasePerpPositionLimitExecutedEvent = {
    $$type: 'IncreasePerpPositionLimitExecutedEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeIncreasePerpPositionLimitExecutedEvent(src: IncreasePerpPositionLimitExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1810135477, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreasePerpPositionLimitExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1810135477) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreasePerpPositionLimitExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleIncreasePerpPositionLimitExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreasePerpPositionLimitExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleIncreasePerpPositionLimitExecutedEvent(source: IncreasePerpPositionLimitExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreasePerpPositionLimitExecutedEvent(): DictionaryValue<IncreasePerpPositionLimitExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreasePerpPositionLimitExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreasePerpPositionLimitExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionIncreasedEvent = {
    $$type: 'PerpPositionIncreasedEvent';
    account: Address;
    token: string;
    marginDelta: bigint;
    marginAfter: bigint;
    sizeDelta: bigint;
    sizeAfter: bigint;
    tradePrice: bigint;
    entryPrice: bigint;
    fundingFee: bigint;
    tradingFee: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2082826315, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
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
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2082826315) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
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
    return { $$type: 'PerpPositionIncreasedEvent' as const, account: _account, token: _token, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee };
}

function loadTuplePerpPositionIncreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, account: _account, token: _token, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, tradingFee: _tradingFee };
}

function storeTuplePerpPositionIncreasedEvent(source: PerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.sizeAfter);
    builder.writeNumber(source.tradePrice);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.tradingFee);
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

export type DecreasePerpPositionMarketCreatedEvent = {
    $$type: 'DecreasePerpPositionMarketCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeDecreasePerpPositionMarketCreatedEvent(src: DecreasePerpPositionMarketCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2480328626, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.acceptablePrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreasePerpPositionMarketCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2480328626) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _acceptablePrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, index: _index };
}

function loadTupleDecreasePerpPositionMarketCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice, executionFee: _executionFee, index: _index };
}

function storeTupleDecreasePerpPositionMarketCreatedEvent(source: DecreasePerpPositionMarketCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketCreatedEvent(): DictionaryValue<DecreasePerpPositionMarketCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionMarketCancelledEvent = {
    $$type: 'DecreasePerpPositionMarketCancelledEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionMarketCancelledEvent(src: DecreasePerpPositionMarketCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2538831063, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionMarketCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2538831063) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleDecreasePerpPositionMarketCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleDecreasePerpPositionMarketCancelledEvent(source: DecreasePerpPositionMarketCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketCancelledEvent(): DictionaryValue<DecreasePerpPositionMarketCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionMarketExecutedEvent = {
    $$type: 'DecreasePerpPositionMarketExecutedEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionMarketExecutedEvent(src: DecreasePerpPositionMarketExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(90345901, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionMarketExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 90345901) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionMarketExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleDecreasePerpPositionMarketExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionMarketExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleDecreasePerpPositionMarketExecutedEvent(source: DecreasePerpPositionMarketExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionMarketExecutedEvent(): DictionaryValue<DecreasePerpPositionMarketExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionMarketExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionMarketExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitCreatedEvent = {
    $$type: 'DecreasePerpPositionLimitCreatedEvent';
    account: Address;
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    index: bigint;
}

export function storeDecreasePerpPositionLimitCreatedEvent(src: DecreasePerpPositionLimitCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3958755127, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreasePerpPositionLimitCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3958755127) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, index: _index };
}

function loadTupleDecreasePerpPositionLimitCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitCreatedEvent' as const, account: _account, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, index: _index };
}

function storeTupleDecreasePerpPositionLimitCreatedEvent(source: DecreasePerpPositionLimitCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitCreatedEvent(): DictionaryValue<DecreasePerpPositionLimitCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitCancelledEvent = {
    $$type: 'DecreasePerpPositionLimitCancelledEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionLimitCancelledEvent(src: DecreasePerpPositionLimitCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3480294240, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionLimitCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3480294240) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleDecreasePerpPositionLimitCancelledEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitCancelledEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleDecreasePerpPositionLimitCancelledEvent(source: DecreasePerpPositionLimitCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitCancelledEvent(): DictionaryValue<DecreasePerpPositionLimitCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreasePerpPositionLimitExecutedEvent = {
    $$type: 'DecreasePerpPositionLimitExecutedEvent';
    token: string;
    index: bigint;
    trxId: bigint;
}

export function storeDecreasePerpPositionLimitExecutedEvent(src: DecreasePerpPositionLimitExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(133513482, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreasePerpPositionLimitExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 133513482) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreasePerpPositionLimitExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function loadTupleDecreasePerpPositionLimitExecutedEvent(source: TupleReader) {
    let _token = source.readString();
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreasePerpPositionLimitExecutedEvent' as const, token: _token, index: _index, trxId: _trxId };
}

function storeTupleDecreasePerpPositionLimitExecutedEvent(source: DecreasePerpPositionLimitExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreasePerpPositionLimitExecutedEvent(): DictionaryValue<DecreasePerpPositionLimitExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreasePerpPositionLimitExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreasePerpPositionLimitExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionDecreasedEvent = {
    $$type: 'PerpPositionDecreasedEvent';
    account: Address;
    token: string;
    marginDelta: bigint;
    marginAfter: bigint;
    sizeDelta: bigint;
    sizeAfter: bigint;
    tradePrice: bigint;
    realizedPnLDelta: bigint;
    fundingFee: bigint;
    tradingFee: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1789226231, 32);
        b_0.storeAddress(src.account);
        b_0.storeStringRefTail(src.token);
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
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1789226231) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _token = sc_0.loadStringRefTail();
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
    return { $$type: 'PerpPositionDecreasedEvent' as const, account: _account, token: _token, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee };
}

function loadTuplePerpPositionDecreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _token = source.readString();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _realizedPnLDelta = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, account: _account, token: _token, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, tradingFee: _tradingFee };
}

function storeTuplePerpPositionDecreasedEvent(source: PerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeString(source.token);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.sizeAfter);
    builder.writeNumber(source.tradePrice);
    builder.writeNumber(source.realizedPnLDelta);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.tradingFee);
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
    minMarginPerPosition: bigint;
    maxLeveragePerPosition: bigint;
    liquidationFeeRatePerPosition: bigint;
    liquidationExecutionFee: bigint;
    interestRate: bigint;
    maxFundingRate: bigint;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
        b_0.storeInt(src.minMarginPerPosition, 257);
        b_0.storeInt(src.maxLeveragePerPosition, 257);
        b_0.storeInt(src.liquidationFeeRatePerPosition, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidationExecutionFee, 257);
        b_1.storeInt(src.interestRate, 257);
        b_1.storeInt(src.maxFundingRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _minMarginPerPosition = sc_0.loadIntBig(257);
    let _maxLeveragePerPosition = sc_0.loadIntBig(257);
    let _liquidationFeeRatePerPosition = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationExecutionFee = sc_1.loadIntBig(257);
    let _interestRate = sc_1.loadIntBig(257);
    let _maxFundingRate = sc_1.loadIntBig(257);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMarginPerPosition: _minMarginPerPosition, maxLeveragePerPosition: _maxLeveragePerPosition, liquidationFeeRatePerPosition: _liquidationFeeRatePerPosition, liquidationExecutionFee: _liquidationExecutionFee, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minMarginPerPosition = source.readBigNumber();
    let _maxLeveragePerPosition = source.readBigNumber();
    let _liquidationFeeRatePerPosition = source.readBigNumber();
    let _liquidationExecutionFee = source.readBigNumber();
    let _interestRate = source.readBigNumber();
    let _maxFundingRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minMarginPerPosition: _minMarginPerPosition, maxLeveragePerPosition: _maxLeveragePerPosition, liquidationFeeRatePerPosition: _liquidationFeeRatePerPosition, liquidationExecutionFee: _liquidationExecutionFee, interestRate: _interestRate, maxFundingRate: _maxFundingRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minMarginPerPosition);
    builder.writeNumber(source.maxLeveragePerPosition);
    builder.writeNumber(source.liquidationFeeRatePerPosition);
    builder.writeNumber(source.liquidationExecutionFee);
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
    margin: bigint;
    liquidity: bigint;
    entryFundingFeeGrowth: bigint;
    entryTradingFeeGrowth: bigint;
}

export function storeLPPosition(src: LPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.margin, 257);
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.entryFundingFeeGrowth, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.entryTradingFeeGrowth, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _margin = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    let _entryFundingFeeGrowth = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _entryTradingFeeGrowth = sc_1.loadIntBig(257);
    return { $$type: 'LPPosition' as const, margin: _margin, liquidity: _liquidity, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryTradingFeeGrowth: _entryTradingFeeGrowth };
}

function loadTupleLPPosition(source: TupleReader) {
    let _margin = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryTradingFeeGrowth = source.readBigNumber();
    return { $$type: 'LPPosition' as const, margin: _margin, liquidity: _liquidity, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryTradingFeeGrowth: _entryTradingFeeGrowth };
}

function storeTupleLPPosition(source: LPPosition) {
    let builder = new TupleBuilder();
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
    margin: bigint;
    size: bigint;
    entryPrice: bigint;
    entryFundingFeeGrowth: bigint;
}

export function storePerpPosition(src: PerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
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
    let _margin = sc_0.loadIntBig(257);
    let _size = sc_0.loadIntBig(257);
    let _entryPrice = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _entryFundingFeeGrowth = sc_1.loadIntBig(257);
    return { $$type: 'PerpPosition' as const, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth };
}

function loadTuplePerpPosition(source: TupleReader) {
    let _margin = source.readBigNumber();
    let _size = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    return { $$type: 'PerpPosition' as const, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth };
}

function storeTuplePerpPosition(source: PerpPosition) {
    let builder = new TupleBuilder();
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

export type PriceVertex = {
    $$type: 'PriceVertex';
    size: bigint;
    premiumRateX96: bigint;
}

export function storePriceVertex(src: PriceVertex) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.size, 257);
        b_0.storeInt(src.premiumRateX96, 257);
    };
}

export function loadPriceVertex(slice: Slice) {
    let sc_0 = slice;
    let _size = sc_0.loadIntBig(257);
    let _premiumRateX96 = sc_0.loadIntBig(257);
    return { $$type: 'PriceVertex' as const, size: _size, premiumRateX96: _premiumRateX96 };
}

function loadTuplePriceVertex(source: TupleReader) {
    let _size = source.readBigNumber();
    let _premiumRateX96 = source.readBigNumber();
    return { $$type: 'PriceVertex' as const, size: _size, premiumRateX96: _premiumRateX96 };
}

function storeTuplePriceVertex(source: PriceVertex) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.size);
    builder.writeNumber(source.premiumRateX96);
    return builder.build();
}

function dictValueParserPriceVertex(): DictionaryValue<PriceVertex> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePriceVertex(src)).endCell());
        },
        parse: (src) => {
            return loadPriceVertex(src.loadRef().beginParse());
        }
    }
}

export type PriceState = {
    $$type: 'PriceState';
    maxPriceImpactLiquidity: bigint;
    premiumRateX96: bigint;
    priceVertices: Dictionary<bigint, PriceVertex>;
    pendingVertexIndex: bigint;
    liquidationVertexIndex: bigint;
    currentVertexIndex: bigint;
    liquidationBufferNetSizes: Dictionary<bigint, bigint>;
}

export function storePriceState(src: PriceState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.maxPriceImpactLiquidity, 257);
        b_0.storeInt(src.premiumRateX96, 257);
        b_0.storeDict(src.priceVertices, Dictionary.Keys.BigInt(257), dictValueParserPriceVertex());
        b_0.storeInt(src.pendingVertexIndex, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidationVertexIndex, 257);
        b_1.storeInt(src.currentVertexIndex, 257);
        b_1.storeDict(src.liquidationBufferNetSizes, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPriceState(slice: Slice) {
    let sc_0 = slice;
    let _maxPriceImpactLiquidity = sc_0.loadIntBig(257);
    let _premiumRateX96 = sc_0.loadIntBig(257);
    let _priceVertices = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserPriceVertex(), sc_0);
    let _pendingVertexIndex = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidationVertexIndex = sc_1.loadIntBig(257);
    let _currentVertexIndex = sc_1.loadIntBig(257);
    let _liquidationBufferNetSizes = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    return { $$type: 'PriceState' as const, maxPriceImpactLiquidity: _maxPriceImpactLiquidity, premiumRateX96: _premiumRateX96, priceVertices: _priceVertices, pendingVertexIndex: _pendingVertexIndex, liquidationVertexIndex: _liquidationVertexIndex, currentVertexIndex: _currentVertexIndex, liquidationBufferNetSizes: _liquidationBufferNetSizes };
}

function loadTuplePriceState(source: TupleReader) {
    let _maxPriceImpactLiquidity = source.readBigNumber();
    let _premiumRateX96 = source.readBigNumber();
    let _priceVertices = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPriceVertex(), source.readCellOpt());
    let _pendingVertexIndex = source.readBigNumber();
    let _liquidationVertexIndex = source.readBigNumber();
    let _currentVertexIndex = source.readBigNumber();
    let _liquidationBufferNetSizes = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'PriceState' as const, maxPriceImpactLiquidity: _maxPriceImpactLiquidity, premiumRateX96: _premiumRateX96, priceVertices: _priceVertices, pendingVertexIndex: _pendingVertexIndex, liquidationVertexIndex: _liquidationVertexIndex, currentVertexIndex: _currentVertexIndex, liquidationBufferNetSizes: _liquidationBufferNetSizes };
}

function storeTuplePriceState(source: PriceState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.maxPriceImpactLiquidity);
    builder.writeNumber(source.premiumRateX96);
    builder.writeCell(source.priceVertices.size > 0 ? beginCell().storeDictDirect(source.priceVertices, Dictionary.Keys.BigInt(257), dictValueParserPriceVertex()).endCell() : null);
    builder.writeNumber(source.pendingVertexIndex);
    builder.writeNumber(source.liquidationVertexIndex);
    builder.writeNumber(source.currentVertexIndex);
    builder.writeCell(source.liquidationBufferNetSizes.size > 0 ? beginCell().storeDictDirect(source.liquidationBufferNetSizes, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserPriceState(): DictionaryValue<PriceState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePriceState(src)).endCell());
        },
        parse: (src) => {
            return loadPriceState(src.loadRef().beginParse());
        }
    }
}

export type GlobalRiskBufferFund = {
    $$type: 'GlobalRiskBufferFund';
    riskBufferFund: bigint;
    liquidity: bigint;
}

export function storeGlobalRiskBufferFund(src: GlobalRiskBufferFund) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.riskBufferFund, 257);
        b_0.storeInt(src.liquidity, 257);
    };
}

export function loadGlobalRiskBufferFund(slice: Slice) {
    let sc_0 = slice;
    let _riskBufferFund = sc_0.loadIntBig(257);
    let _liquidity = sc_0.loadIntBig(257);
    return { $$type: 'GlobalRiskBufferFund' as const, riskBufferFund: _riskBufferFund, liquidity: _liquidity };
}

function loadTupleGlobalRiskBufferFund(source: TupleReader) {
    let _riskBufferFund = source.readBigNumber();
    let _liquidity = source.readBigNumber();
    return { $$type: 'GlobalRiskBufferFund' as const, riskBufferFund: _riskBufferFund, liquidity: _liquidity };
}

function storeTupleGlobalRiskBufferFund(source: GlobalRiskBufferFund) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.riskBufferFund);
    builder.writeNumber(source.liquidity);
    return builder.build();
}

function dictValueParserGlobalRiskBufferFund(): DictionaryValue<GlobalRiskBufferFund> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalRiskBufferFund(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalRiskBufferFund(src.loadRef().beginParse());
        }
    }
}

export type GlobalPosition = {
    $$type: 'GlobalPosition';
    longSize: bigint;
    shortSize: bigint;
    longFundingRateGrowthX96: bigint;
    shortFundingRateGrowthX96: bigint;
}

export function storeGlobalPosition(src: GlobalPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.longSize, 257);
        b_0.storeInt(src.shortSize, 257);
        b_0.storeInt(src.longFundingRateGrowthX96, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.shortFundingRateGrowthX96, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalPosition(slice: Slice) {
    let sc_0 = slice;
    let _longSize = sc_0.loadIntBig(257);
    let _shortSize = sc_0.loadIntBig(257);
    let _longFundingRateGrowthX96 = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortFundingRateGrowthX96 = sc_1.loadIntBig(257);
    return { $$type: 'GlobalPosition' as const, longSize: _longSize, shortSize: _shortSize, longFundingRateGrowthX96: _longFundingRateGrowthX96, shortFundingRateGrowthX96: _shortFundingRateGrowthX96 };
}

function loadTupleGlobalPosition(source: TupleReader) {
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longFundingRateGrowthX96 = source.readBigNumber();
    let _shortFundingRateGrowthX96 = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longSize: _longSize, shortSize: _shortSize, longFundingRateGrowthX96: _longFundingRateGrowthX96, shortFundingRateGrowthX96: _shortFundingRateGrowthX96 };
}

function storeTupleGlobalPosition(source: GlobalPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longSize);
    builder.writeNumber(source.shortSize);
    builder.writeNumber(source.longFundingRateGrowthX96);
    builder.writeNumber(source.shortFundingRateGrowthX96);
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

export type GlobalLiquidityPosition = {
    $$type: 'GlobalLiquidityPosition';
    netSize: bigint;
    liquidationBufferNetSize: bigint;
    entryPriceX96: bigint;
    side: boolean;
    liquidity: bigint;
    realizedProfitGrowthX64: bigint;
}

export function storeGlobalLiquidityPosition(src: GlobalLiquidityPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.netSize, 257);
        b_0.storeInt(src.liquidationBufferNetSize, 257);
        b_0.storeInt(src.entryPriceX96, 257);
        b_0.storeBit(src.side);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidity, 257);
        b_1.storeInt(src.realizedProfitGrowthX64, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGlobalLiquidityPosition(slice: Slice) {
    let sc_0 = slice;
    let _netSize = sc_0.loadIntBig(257);
    let _liquidationBufferNetSize = sc_0.loadIntBig(257);
    let _entryPriceX96 = sc_0.loadIntBig(257);
    let _side = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidity = sc_1.loadIntBig(257);
    let _realizedProfitGrowthX64 = sc_1.loadIntBig(257);
    return { $$type: 'GlobalLiquidityPosition' as const, netSize: _netSize, liquidationBufferNetSize: _liquidationBufferNetSize, entryPriceX96: _entryPriceX96, side: _side, liquidity: _liquidity, realizedProfitGrowthX64: _realizedProfitGrowthX64 };
}

function loadTupleGlobalLiquidityPosition(source: TupleReader) {
    let _netSize = source.readBigNumber();
    let _liquidationBufferNetSize = source.readBigNumber();
    let _entryPriceX96 = source.readBigNumber();
    let _side = source.readBoolean();
    let _liquidity = source.readBigNumber();
    let _realizedProfitGrowthX64 = source.readBigNumber();
    return { $$type: 'GlobalLiquidityPosition' as const, netSize: _netSize, liquidationBufferNetSize: _liquidationBufferNetSize, entryPriceX96: _entryPriceX96, side: _side, liquidity: _liquidity, realizedProfitGrowthX64: _realizedProfitGrowthX64 };
}

function storeTupleGlobalLiquidityPosition(source: GlobalLiquidityPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.netSize);
    builder.writeNumber(source.liquidationBufferNetSize);
    builder.writeNumber(source.entryPriceX96);
    builder.writeBoolean(source.side);
    builder.writeNumber(source.liquidity);
    builder.writeNumber(source.realizedProfitGrowthX64);
    return builder.build();
}

function dictValueParserGlobalLiquidityPosition(): DictionaryValue<GlobalLiquidityPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGlobalLiquidityPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLiquidityPosition(src.loadRef().beginParse());
        }
    }
}

export type GlobalFundingRateSample = {
    $$type: 'GlobalFundingRateSample';
    lastAdjustFundingRateTime: bigint;
    sampleCount: bigint;
    cumulativePremiumRateX96: bigint;
}

export function storeGlobalFundingRateSample(src: GlobalFundingRateSample) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lastAdjustFundingRateTime, 257);
        b_0.storeInt(src.sampleCount, 257);
        b_0.storeInt(src.cumulativePremiumRateX96, 257);
    };
}

export function loadGlobalFundingRateSample(slice: Slice) {
    let sc_0 = slice;
    let _lastAdjustFundingRateTime = sc_0.loadIntBig(257);
    let _sampleCount = sc_0.loadIntBig(257);
    let _cumulativePremiumRateX96 = sc_0.loadIntBig(257);
    return { $$type: 'GlobalFundingRateSample' as const, lastAdjustFundingRateTime: _lastAdjustFundingRateTime, sampleCount: _sampleCount, cumulativePremiumRateX96: _cumulativePremiumRateX96 };
}

function loadTupleGlobalFundingRateSample(source: TupleReader) {
    let _lastAdjustFundingRateTime = source.readBigNumber();
    let _sampleCount = source.readBigNumber();
    let _cumulativePremiumRateX96 = source.readBigNumber();
    return { $$type: 'GlobalFundingRateSample' as const, lastAdjustFundingRateTime: _lastAdjustFundingRateTime, sampleCount: _sampleCount, cumulativePremiumRateX96: _cumulativePremiumRateX96 };
}

function storeTupleGlobalFundingRateSample(source: GlobalFundingRateSample) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lastAdjustFundingRateTime);
    builder.writeNumber(source.sampleCount);
    builder.writeNumber(source.cumulativePremiumRateX96);
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

export type PreviousGlobalFundingRate = {
    $$type: 'PreviousGlobalFundingRate';
    longFundingRateGrowthX96: bigint;
    shortFundingRateGrowthX96: bigint;
}

export function storePreviousGlobalFundingRate(src: PreviousGlobalFundingRate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.longFundingRateGrowthX96, 257);
        b_0.storeInt(src.shortFundingRateGrowthX96, 257);
    };
}

export function loadPreviousGlobalFundingRate(slice: Slice) {
    let sc_0 = slice;
    let _longFundingRateGrowthX96 = sc_0.loadIntBig(257);
    let _shortFundingRateGrowthX96 = sc_0.loadIntBig(257);
    return { $$type: 'PreviousGlobalFundingRate' as const, longFundingRateGrowthX96: _longFundingRateGrowthX96, shortFundingRateGrowthX96: _shortFundingRateGrowthX96 };
}

function loadTuplePreviousGlobalFundingRate(source: TupleReader) {
    let _longFundingRateGrowthX96 = source.readBigNumber();
    let _shortFundingRateGrowthX96 = source.readBigNumber();
    return { $$type: 'PreviousGlobalFundingRate' as const, longFundingRateGrowthX96: _longFundingRateGrowthX96, shortFundingRateGrowthX96: _shortFundingRateGrowthX96 };
}

function storeTuplePreviousGlobalFundingRate(source: PreviousGlobalFundingRate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longFundingRateGrowthX96);
    builder.writeNumber(source.shortFundingRateGrowthX96);
    return builder.build();
}

function dictValueParserPreviousGlobalFundingRate(): DictionaryValue<PreviousGlobalFundingRate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePreviousGlobalFundingRate(src)).endCell());
        },
        parse: (src) => {
            return loadPreviousGlobalFundingRate(src.loadRef().beginParse());
        }
    }
}

export type FundingRateGrowthX96 = {
    $$type: 'FundingRateGrowthX96';
    clampedFundingRateDeltaX96: bigint;
    longFundingRateGrowthAfterX96: bigint;
    shortFundingRateGrowthAfterX96: bigint;
}

export function storeFundingRateGrowthX96(src: FundingRateGrowthX96) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.clampedFundingRateDeltaX96, 257);
        b_0.storeInt(src.longFundingRateGrowthAfterX96, 257);
        b_0.storeInt(src.shortFundingRateGrowthAfterX96, 257);
    };
}

export function loadFundingRateGrowthX96(slice: Slice) {
    let sc_0 = slice;
    let _clampedFundingRateDeltaX96 = sc_0.loadIntBig(257);
    let _longFundingRateGrowthAfterX96 = sc_0.loadIntBig(257);
    let _shortFundingRateGrowthAfterX96 = sc_0.loadIntBig(257);
    return { $$type: 'FundingRateGrowthX96' as const, clampedFundingRateDeltaX96: _clampedFundingRateDeltaX96, longFundingRateGrowthAfterX96: _longFundingRateGrowthAfterX96, shortFundingRateGrowthAfterX96: _shortFundingRateGrowthAfterX96 };
}

function loadTupleFundingRateGrowthX96(source: TupleReader) {
    let _clampedFundingRateDeltaX96 = source.readBigNumber();
    let _longFundingRateGrowthAfterX96 = source.readBigNumber();
    let _shortFundingRateGrowthAfterX96 = source.readBigNumber();
    return { $$type: 'FundingRateGrowthX96' as const, clampedFundingRateDeltaX96: _clampedFundingRateDeltaX96, longFundingRateGrowthAfterX96: _longFundingRateGrowthAfterX96, shortFundingRateGrowthAfterX96: _shortFundingRateGrowthAfterX96 };
}

function storeTupleFundingRateGrowthX96(source: FundingRateGrowthX96) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.clampedFundingRateDeltaX96);
    builder.writeNumber(source.longFundingRateGrowthAfterX96);
    builder.writeNumber(source.shortFundingRateGrowthAfterX96);
    return builder.build();
}

function dictValueParserFundingRateGrowthX96(): DictionaryValue<FundingRateGrowthX96> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFundingRateGrowthX96(src)).endCell());
        },
        parse: (src) => {
            return loadFundingRateGrowthX96(src.loadRef().beginParse());
        }
    }
}

export type SamplePremiumRateResult = {
    $$type: 'SamplePremiumRateResult';
    sample: GlobalFundingRateSample;
    shouldAdjustFundingRate: boolean;
    fundingRateDeltaX96: bigint;
}

export function storeSamplePremiumRateResult(src: SamplePremiumRateResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeGlobalFundingRateSample(src.sample));
        b_0.storeBit(src.shouldAdjustFundingRate);
        let b_1 = new Builder();
        b_1.storeInt(src.fundingRateDeltaX96, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSamplePremiumRateResult(slice: Slice) {
    let sc_0 = slice;
    let _sample = loadGlobalFundingRateSample(sc_0);
    let _shouldAdjustFundingRate = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _fundingRateDeltaX96 = sc_1.loadIntBig(257);
    return { $$type: 'SamplePremiumRateResult' as const, sample: _sample, shouldAdjustFundingRate: _shouldAdjustFundingRate, fundingRateDeltaX96: _fundingRateDeltaX96 };
}

function loadTupleSamplePremiumRateResult(source: TupleReader) {
    const _sample = loadTupleGlobalFundingRateSample(source.readTuple());
    let _shouldAdjustFundingRate = source.readBoolean();
    let _fundingRateDeltaX96 = source.readBigNumber();
    return { $$type: 'SamplePremiumRateResult' as const, sample: _sample, shouldAdjustFundingRate: _shouldAdjustFundingRate, fundingRateDeltaX96: _fundingRateDeltaX96 };
}

function storeTupleSamplePremiumRateResult(source: SamplePremiumRateResult) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleGlobalFundingRateSample(source.sample));
    builder.writeBoolean(source.shouldAdjustFundingRate);
    builder.writeNumber(source.fundingRateDeltaX96);
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
}

function initPool_init_args(src: Pool_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Pool_init() {
    const __code = Cell.fromBase64('te6ccgECVQEAGUwAART/APSkE/S88sgLAQIBYgIDAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERNPBAIBID9AAp4REhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UBQYEbgGSMH/gcCHXScIflTAg1wsf3iCCEE01qZy6jwgw2zxsGds8f+AgghCO1NequuMCIIIQ6JzUX7oHCAkKAegBER0BER6BAQHPAAERGwGBAQHPAAERGQH0AAERFwGBAQHPABEVyIEBAc8AAREUAYEBAc8AARESAYEBAc8AERDIgQEBzwAfgQEBzwAdgQEBzwDIUAwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQCiwC7NMfAYIQTTWpnLry4IHSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUAdDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNDSAAGVgQEB1wCSbQHi0gABkm0B4w0LDAHwER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRJhEUERMRJRETERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRJgsKESUKCREkCQgRIwgHESIHDQIQMNs8bBnbPH8REgT+jsAw0x8BghDonNRfuvLggdIA0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0z9VQGwV2zx/4CCCEPx0GRe6jh0w0x8BghD8dBkXuvLggYEBAdcAgQEB1wBZbBJbf+AgghC+lPs3uuMCghCUapi2uuMCMBgZGhsACoEBAdcAAGT6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRBpEGgQZwP+BhEhBgURIAUEER8EAxEeAwIRJgIBESUBESTbPFYjbrOdVx0RIiBu8tCAERwRIpJXI+JWIW6znVcbESAgbvLQgBEaESCSVyHiVh9us51XFxEeIG7y0IARFhEeklcf4lYdbrOdVxURHCBu8tCAERQRHJJXHeJWG26zklcb4w1WGRYODwAaVxMRGiBu8tCAERIRGgL+brOdVxERGCBu8tCAERARGJJXGeJWIG6zmz8RHyBu8tCADhEfklcg4lYebrObPREdIG7y0IAMER2SVx7iVhxus5s6ERsgbvLQgAkRG5JXHOL4QnBwgEAQI21tbds8ERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDyoQAFwOERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8SxlQqF5RAvTTHwGCEI7U16q68uCBgQEB1wDSAAGT1AHQkW3iAdIAAZLSAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQB0NIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQw0NIAAZIwbeMNEEkQSBMUAfARHREmER0RHBElERwRGxEkERsRGhEjERoRGREiERkRGBEhERgRFxEgERcRFhEfERYRFREeERURFBEmERQRExElERMREhEkERIREREjEREREBEiERAPESEPDhEgDg0RHw0MER4MCxEmCwoRJQoJESQJCBEjCAcRIgcVAAyBAQHXADAADBBHEEYQRQP+BhEhBgURIAUEER8EAxEeAwIRJgIBESUBESTbPIEBAVYcAhElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG4xszBWIW5XIhEhszBWH25XIBEfszBWHW5XHhEdszBWG25XHBEbszBWGW5XGhEZszBWIG5XIREgszBWHm5XHxEesxZOFwAU+EJWFAHHBfLghAHOMFYcblcdERyzMPhCcHCAQBAjbW1t2zwRFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEsZUKheUSoEvI0G3JlY2VpdmUgdXBkYXRlIHBvc2l0aW9uIG1zZ4P4UMIIAoPf4QlYZAccF8vRwBeMP+EFvJBNfA1YeqgChVh2h+EFvJNs8oYEk1SHCAPL0i4bXNnVmFsdWWP4UMCAcHR4fADow0x8BghC+lPs3uvLggYEBAdcAgQEB1wBZbBJbfwFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/KQACcAH4ER8RIhEfER4RIREeER0RIBEdERwRIhEcERsRIREbERoRIBEaERkRIhEZERgRIREYERcRIBEXERYRIhEWERURIREVERQRIBEUERMRIhETERIRIRESERERIBERERARIhEQDxEhDw4RIA4NESINDBEhDAsRIAsKESIKCREhCSAB+jQRHxEhER8RHhEgER4RHREhER0RHBEgERwRGxEhERsRGhEgERoRGREhERkRGBEgERgRFxEhERcRFhEgERYRFREhERURFBEgERQRExEhERMREhEgERIREREhEREREBEgERAPESEPDhEgDg0RIQ0MESAMCxEhCwoRIAoJESEJLQBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAD/Ns8/hQwESBwESJxESHIVSCCEBzwz4FQBMsfEoEBAc8AgQEBzwDLP8lWEwQDESEDAhEiAhEgARAkECNtbds8jQcc2VuZCB1cGRhdGUgUkJGIHBvc2l0aW9uIG1zZ4P4UMBEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFjoqKAE6CBEgCAcRIgcGESEGBREgBQQRIgQDESEDESBZ2zwhAfJWEYEBCyNZ9AtvoZIwbd8gbpIwbY4g0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTicFRwADAyIm6zmVsgbvLQgG8kMJcyVhKkERNZ4lYWER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYIgL8ERcRIxEXERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgURIwUEESIEAxEhAwIRIAIBER8BER7bPAERHwGgIMEAkjBw3nAhMiMC/lYSuY6oMFYQAaFWGAGoViKoVhCpBItmJvbnVzOo/hQwINs8/hQwER9WH6ARH5Ex4hEgViKg+CNWGqCNB1leGVjdXRlIGluY3JlYXNlIHJiZiBwb3NpdGlvboP4UMMhWJSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsk6JAPW+QDbPP4UMIEBC1YjI1YjJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERICViYBIG6VMFn0WTCUQTP0E+IRElYjoBERViOgBhEiBgURJAUEESMEEwIRIQIBESABERDIVWDbPMk6JSYArIIQjp/UfVAIyx8WgQEBzwBQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AyVjMyQHMAfzIgljAAAAAAAAAAAAAAAABActnzMlw+wBwVFsALALIVTCCEFogXHdQBcsfE4EBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAjQdaW5jcmVhc2UgcmJmIHBvc2l0aW9uIHN1Y2Nlc3OAnAKz+FDARFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMChERCgkREAkQvxCOEH0QbFVVEgCQERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFE1BCATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPCoByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAKwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAD4INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyECYAoEBAc8AgQEBzwAV9AATyz+BAQHPAPQA9ADLPwLIgQEBzwAUgQEBzwAU9AAVyz8V9AAW9AAGyPQAF/QAF/QAB8j0AMlQB8zJUAPMyQHMyVAEzMlYzMkBzMkBzAGACBEgCAcRIQcGESAGBREhBQQRIAQDESEDAhEgAts8ESARHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4C4D7lYRgQELI1n0C2+hkjBt3yBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOKBFHYhbrPy9CBu8tCAbyQg2zz+FDD4I9s8/hQwgXrBIfgju/L0ggDjMVM1vvL0ER0RIxEdERwRIhEcERsRIREbOjovAfwRGhEgERoRGREfERkRGBEeERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREjEREREBEiERAPESEPDhEgDg0RHw0MER4MCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GBREjBQQRIgQDESEDAhEgAgERHwEwAvoRHts8VhKBWsQCoMIA8vRWEREdER4RHREcER4RHBEbER4RGxEaER4RGhEZER4RGREYER4RGBEXER4RFxEWER4RFhEVER4RFREUER4RFBETER4RExESER4REhERER4REREQER4REA8RHg8OER4ODREeDQwRHgwLER4LChEeCjIxA/4JER4JER4IBwZVQNs8AREfAaAgwQCSMHDeggDxqyHCAPL0cCFWEr6YViRYqFYRqQTjDREiViShESEhoY0HWV4ZWN1dGUgZGVjcmVhc2UgcmJmIHBvc2l0aW9ug/hQwyFYmINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WMjM0AlKNBNjYWxjdWxhdGUgdG90YWwgcG5sg/hQwcHGUIFYduYroMCDbPP4UMDU6AL4w+CNWIKFWGqCCAVGAqQRWIcAAjhdWJFYaqCJWE6GoAYBktgioAYED6KipBI4sIVYSoVYlAagiqQRWIlYmVhyoJFYVoagDgGS2CBOoA4ED6KgTqQRZtggBtgniViMhoAP+yfkA2zz+FDBWIcIAkX+TIMIA4o5JVyCBAQttIG6SMG2OJiBu8tCAbyTIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJ4gIREQJWJgEgbpUwWfRZMJRBM/QT4uMNERFWIaEREFYjoQURIgUEESQEAxEjAwIRIAIRHx9WITo7PAH4ER0RHxEdERwRHhEcERsRHxEbERoRHhEaERkRHxEZERgRHhEYERcRHxEXERYRHhEWERURHxEVERQRHhEUERMRHxETERIRHhESERERHxERERARHhEQDxEfDw4RHg4NER8NDBEeDAsRHwsKER4KCREfCQgRHggHER8HBhEeBjYD/AURHwUEER4EAxEfAwIRHgIBER8BER5WHts8jswsgQEBViBZ9A1voZIwbd8gbpIwbY4T0IEBAdcA0gCBAQHXAFUgbBNvA+IgbrOOmiBu8tCAbyMSgigjhvJvwQAA2zwBESABoBEfkTDi3hEepBEdER8RHREcER4RHBEbER0RGzc4OQFegQEBVh0CWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG6SMHDgIG7y0IBvKBBnXwdOAD4DnhKhqIIoI4byb8EAAKkE4FihqIIoI4byb8EAAKkEAMQRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMADeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQAIRWI1YiIoEBCxEkyFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyQIREQIBESEBViYBIG6VMFn0WTCUQTP0E+IC+shVYNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHBUWwBWHALIVTCCEFogXHdQBcsfE4EBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERcRHhEXERYRHREWERURHBEVERQRGxEUPT4ArIIQYadHN1AIyx8WgQEBzwBQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AyVjMyQHMAI4RExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMChESCgoREQoLERALEI8QfhBtEFwQSxA6SRdQhhQVEwIDeiBBQgIBIEVGAhiq4ds82zxs52znbCdPQwIYqR3bPNs8VxBfD2zhT0QAHFYZVhlWGVYZVhlWGVYYAARWEwDdu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgR0gCASBJSgIBIEtMABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVZwNjlFS3ZLbW5yU3laVHJZQXllaG5XdkdDcWpBZHVodXF6ZVVtNWM0ODI3ggAvmyBzbPBEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2zhIG6SMG2ZIG7y0IBvKG8I4iBukjBt3oE9NA/mz1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPIE9QUQE8gQEBVh0CWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiTgBk1AHQAdIAgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAIEBAdcAMBA4EDcQNhA1EDQC5u1E0NQB+GPSAAGO2Ns8Vx4RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7gMPgo1wsKgwm68uCJ2zxSUwBugQELVhECWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4gA4VxBfD2zhIG6SMG2ZIG7y0IBvJG8E4iBukjBt3gH2gQEB1wCBAQHXAPQEgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQVADeggr68ICCCcnDgG1xgQEsIXKAZIIIB6EggggPQkBtJXBtbVRzIm0jbW1tbW1t+EJTmchyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIU6oDERMDAhESAgEREQEREFWzALqBAQHXAIEBAdcAWQL0BNM/gQEB1wD0BPQE0z/UMNCBAQHXAIEBAdcA9ATTP/QE9ATUMND0BPQE9ATUMND0BDARGhEeERoRGhEdERoRGhEcERoRGhEbERoREBERERA=');
    const __system = Cell.fromBase64('te6cckECVwEAGVYAAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWIWBAIBIBEFAgEgEAYCASANBwIBIAsIA/mz1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI2zwRHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPIFMKCQA4VxBfD2zhIG6SMG2ZIG7y0IBvJG8E4iBukjBt3gBugQELVhECWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4gL5sgc2zwRHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9s4SBukjBtmSBu8tCAbyhvCOIgbpIwbd6BTDAE8gQEBVh0CWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiRAIBIA8OAHWybuNDVpcGZzOi8vUW1WcDY5RUt2S21uclN5WlRyWUF5ZWhuV3ZHQ3FqQWR1aHVxemVVbTVjNDgyN4IAARsK+7UTQ0gABgAN27vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygCA3ogFBICGKkd2zzbPFcQXw9s4VMTAARWEwIYquHbPNs8bOds52wnUxUAHFYZVhlWGVYZVhlWGVYYAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERNTFwKeERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVBoYAegBER0BER6BAQHPAAERGwGBAQHPAAERGQH0AAERFwGBAQHPABEVyIEBAc8AAREUAYEBAc8AARESAYEBAc8AERDIgQEBzwAfgQEBzwAdgQEBzwDIUAwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQChkA+CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshAmAKBAQHPAIEBAc8AFfQAE8s/gQEBzwD0APQAyz8CyIEBAc8AFIEBAc8AFPQAFcs/FfQAFvQABsj0ABf0ABf0AAfI9ADJUAfMyVADzMkBzMlQBMzJWMzJAczJAcwEbgGSMH/gcCHXScIflTAg1wsf3iCCEE01qZy6jwgw2zxsGds8f+AgghCO1NequuMCIIIQ6JzUX7pQSEAbBP6OwDDTHwGCEOic1F+68uCB0gDTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDTP1VAbBXbPH/gIIIQ/HQZF7qOHTDTHwGCEPx0GRe68uCBgQEB1wCBAQHXAFlsElt/4CCCEL6U+ze64wKCEJRqmLa64wIwIB8dHAACcAFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/HgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxMADow0x8BghC+lPs3uvLggYEBAdcAgQEB1wBZbBJbfwS8jQbcmVjZWl2ZSB1cGRhdGUgcG9zaXRpb24gbXNng/hQwggCg9/hCVhkBxwXy9HAF4w/4QW8kE18DVh6qAKFWHaH4QW8k2zyhgSTVIcIA8vSLhtc2dWYWx1ZY/hQwIDAkIyED/Ns8/hQwESBwESJxESHIVSCCEBzwz4FQBMsfEoEBAc8AgQEBzwDLP8lWEwQDESEDAhEiAhEgARAkECNtbds8jQcc2VuZCB1cGRhdGUgUkJGIHBvc2l0aW9uIG1zZ4P4UMBEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFjpMIgCQERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFE1BCAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAH6NBEfESERHxEeESARHhEdESERHREcESARHBEbESERGxEaESARGhEZESERGREYESARGBEXESERFxEWESARFhEVESERFREUESARFBETESERExESESAREhERESEREREQESAREA8RIQ8OESAODREhDQwRIAwLESELChEgCgkRIQklAYAIESAIBxEhBwYRIAYFESEFBBEgBAMRIQMCESAC2zwRIBEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXgJgPuVhGBAQsjWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4oEUdiFus/L0IG7y0IBvJCDbPP4UMPgj2zz+FDCBesEh+CO78vSCAOMxUzW+8vQRHREjER0RHBEiERwRGxEhERs6OicB/BEaESARGhEZER8RGREYER4RGBEXESMRFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERESMREREQESIREA8RIQ8OESAODREfDQwRHgwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYFESMFBBEiBAMRIQMCESACAREfASgC+hEe2zxWEoFaxAKgwgDy9FYRER0RHhEdERwRHhEcERsRHhEbERoRHhEaERkRHhEZERgRHhEYERcRHhEXERYRHhEWERURHhEVERQRHhEUERMRHhETERIRHhESERERHhERERARHhEQDxEeDw4RHg4NER4NDBEeDAsRHgsKER4KOSkD/gkRHgkRHggHBlVA2zwBER8BoCDBAJIwcN6CAPGrIcIA8vRwIVYSvphWJFioVhGpBOMNESJWJKERISGhjQdZXhlY3V0ZSBkZWNyZWFzZSByYmYgcG9zaXRpb26D+FDDIViYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxY5LyoD/sn5ANs8/hQwViHCAJF/kyDCAOKOSVcggQELbSBukjBtjiYgbvLQgG8kyFUwUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHMyeICERECViYBIG6VMFn0WTCUQTP0E+LjDRERViGhERBWI6EFESIFBBEkBAMRIwMCESACER8fViE6LisC+shVYNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHBUWwBWHALIVTCCEFogXHdQBcsfE4EBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERcRHhEXERYRHREWERURHBEVERQRGxEULSwAjhETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwKERIKChERCgsREAsQjxB+EG0QXBBLEDpJF1CGFBUTAKyCEGGnRzdQCMsfFoEBAc8AUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPAMlYzMkBzACEViNWIiKBAQsRJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERECAREhAVYmASBulTBZ9FkwlEEz9BPiAL4w+CNWIKFWGqCCAVGAqQRWIcAAjhdWJFYaqCJWE6GoAYBktgioAYED6KipBI4sIVYSoVYlAagiqQRWIlYmVhyoJFYVoagDgGS2CBOoA4ED6KgTqQRZtggBtgniViMhoAH4ER8RIhEfER4RIREeER0RIBEdERwRIhEcERsRIREbERoRIBEaERkRIhEZERgRIREYERcRIBEXERYRIhEWERURIREVERQRIBEUERMRIhETERIRIRESERERIBERERARIhEQDxEhDw4RIA4NESINDBEhDAsRIAsKESIKCREhCTEBOggRIAgHESIHBhEhBgURIAUEESIEAxEhAxEgWds8MgHyVhGBAQsjWfQLb6GSMG3fIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4nBUcAAwMiJus5lbIG7y0IBvJDCXMlYSpBETWeJWFhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGDMC/BEXESMRFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERESMREREQESIREA8RIQ8OESAODREfDQwRHgwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYFESMFBBEiBAMRIQMCESACAREfAREe2zwBER8BoCDBAJIwcN5wITk0Av5WErmOqDBWEAGhVhgBqFYiqFYQqQSLZib251czqP4UMCDbPP4UMBEfVh+gER+RMeIRIFYioPgjVhqgjQdZXhlY3V0ZSBpbmNyZWFzZSByYmYgcG9zaXRpb26D+FDDIViUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJOjUD1vkA2zz+FDCBAQtWIyNWIyTIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJAhESAlYmASBulTBZ9FkwlEEz9BPiERJWI6AREVYjoAYRIgYFESQFBBEjBBMCESECAREgAREQyFVg2zzJOjg2AfzIgljAAAAAAAAAAAAAAAABActnzMlw+wBwVFsALALIVTCCEFogXHdQBcsfE4EBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAjQdaW5jcmVhc2UgcmJmIHBvc2l0aW9uIHN1Y2Nlc3OA3AKz+FDARFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMChERCgkREAkQvxCOEH0QbFVVEgCsghCOn9R9UAjLHxaBAQHPAFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AAciBAQHPABKBAQHPABKBAQHPAALIgQEBzwDJWMzJAcwCUo0E2NhbGN1bGF0ZSB0b3RhbCBwbmyD+FDBwcZQgVh25iugwINs8/hQwOzoA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AH4ER0RHxEdERwRHhEcERsRHxEbERoRHhEaERkRHxEZERgRHhEYERcRHxEXERYRHhEWERURHxEVERQRHhEUERMRHxETERIRHhESERERHxERERARHhEQDxEfDw4RHg4NER8NDBEeDAsRHwsKER4KCREfCQgRHggHER8HBhEeBjwD/AURHwUEER4EAxEfAwIRHgIBER8BER5WHts8jswsgQEBViBZ9A1voZIwbd8gbpIwbY4T0IEBAdcA0gCBAQHXAFUgbBNvA+IgbrOOmiBu8tCAbyMSgigjhvJvwQAA2zwBESABoBEfkTDi3hEepBEdER8RHREcER4RHBEbER0RGz8+PQDEERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDAAPgOeEqGogigjhvJvwQAAqQTgWKGogigjhvJvwQAAqQQBXoEBAVYdAln0DW+hkjBt3yBukjBtjofQ2zxsGG8I4iBukjBw4CBu8tCAbygQZ18HRAIQMNs8bBnbPH9FQQHwER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRJhEUERMRJRETERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRJgsKESUKCREkCQgRIwgHESIHQgP+BhEhBgURIAUEER8EAxEeAwIRJgIBESUBESTbPIEBAVYcAhElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG4xszBWIW5XIhEhszBWH25XIBEfszBWHW5XHhEdszBWG25XHBEbszBWGW5XGhEZszBWIG5XIREgszBWHm5XHxEes09EQwHOMFYcblcdERyzMPhCcHCAQBAjbW1t2zwRFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEsZUKheUUwAZNQB0AHSAIEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXADAQOBA3EDYQNRA0AvTTHwGCEI7U16q68uCBgQEB1wDSAAGT1AHQkW3iAdIAAZLSAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQB0NIAAZWBAQHXAJJtAeLSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tQw0NIAAZIwbeMNEEkQSEdGAAwQRxBGEEUADIEBAdcAMAHwER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRJhEUERMRJRETERIRJBESERERIxERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRJgsKESUKCREkCQgRIwgHESIHSQP+BhEhBgURIAUEER8EAxEeAwIRJgIBESUBESTbPFYjbrOdVx0RIiBu8tCAERwRIpJXI+JWIW6znVcbESAgbvLQgBEaESCSVyHiVh9us51XFxEeIG7y0IARFhEeklcf4lYdbrOdVxURHCBu8tCAERQRHJJXHeJWG26zklcb4w1WGU9OSgL+brOdVxERGCBu8tCAERARGJJXGeJWIG6zmz8RHyBu8tCADhEfklcg4lYebrObPREdIG7y0IAMER2SVx7iVhxus5s6ERsgbvLQgAkRG5JXHOL4QnBwgEAQI21tbds8ERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYD0xLAFwOERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8SxlQqF5RAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AE0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAGlcTERogbvLQgBESERoAFPhCVhQBxwXy4IQC7NMfAYIQTTWpnLry4IHSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUAdDSAAGVgQEB1wCSbQHi0gABlYEBAdcAkm0B4tIAAZWBAQHXAJJtAeLUMNDSAAGVgQEB1wCSbQHi0gABkm0B4w1SUQBk+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4jEQaRBoEGcACoEBAdcAAubtRNDUAfhj0gABjtjbPFceERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4DD4KNcLCoMJuvLgids8VVQA3oIK+vCAggnJw4BtcYEBLCFygGSCCAehIIIID0JAbSVwbW1UcyJtI21tbW1tbfhCU5nIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFOqAxETAwIREgIBEREBERBVswH2gQEB1wCBAQHXAPQEgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAIEBAdcAgQEB1wDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQVgC6gQEB1wCBAQHXAFkC9ATTP4EBAdcA9AT0BNM/1DDQgQEB1wCBAQHXAPQE0z/0BPQE1DDQ9AT0BPQE1DDQ9AQwERoRHhEaERoRHREaERoRHBEaERoRGxEaERAREREQZoi8wg==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPool_init_args({ $$type: 'Pool_init_args' })(builder);
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
    23236: { message: `insufficient global RBF` },
    31425: { message: `not reach unlock time` },
    41207: { message: `invalid sender` },
    58161: { message: `insufficient liquidity` },
    61867: { message: `insuficient global net RBF` },
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
    {"name":"UpdateTokenConfig","header":2396313514,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"name","type":{"kind":"simple","type":"string","optional":true}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":true}},{"name":"minMarginPerPosition","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxLeveragePerPosition","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidationFeeRatePerPosition","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"liquidationExecutionFee","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"CancelIncreaseRBFPositionOrder","header":203251748,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreaseRBFPositionOrder","header":1807834441,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreaseRBFPositionOrder","header":2702271213,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreaseRBFPositionOrder","header":1646684831,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreaseRBFPositionOrder","header":669742899,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateRBFPosition","header":3902592095,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateRBFPositionSuccess","header":485543809,"fields":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CancelIncreaseLPPositionOrder","header":1969540622,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreaseLPPositionOrder","header":1677064598,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":1912782205,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreaseLPPositionOrder","header":1163644794,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreaseLPPositionOrder","header":2377315584,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LiquidateLPPosition","header":4093128992,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelIncreasePerpPositionMarketOrder","header":4235467031,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreasePerpPositionMarketOrder","header":3197434679,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreasePerpPositionMarketOrder","header":3819223803,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreasePerpPositionMarketOrder","header":2371221739,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreasePerpPositionMarketOrder","header":984660893,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateIncreasePerpPositionLimitOrder","header":3360172408,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CancelIncreasePerpPositionLimitOrder","header":3637900503,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreasePerpPositionLimitOrder","header":2037745049,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreasePerpPositionLimitOrder","header":2350654920,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CancelDecreasePerpPositionLimitOrder","header":1635653831,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreasePerpPositionLimitOrder","header":1651479254,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionIncreasedEvent","header":2392839293,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionDecreasedEvent","header":1638352695,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receive","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalRBFChangedEvent","header":1512070263,"fields":[{"name":"riskBufferFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidation","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionCreatedEvent","header":3944230540,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionCancelledEvent","header":484255129,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionExecutedEvent","header":1914138461,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionIncreasedEvent","header":2965363548,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryTradingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionCreatedEvent","header":918998073,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionCancelledEvent","header":2507115865,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionExecutedEvent","header":1924045722,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionDecreasedEvent","header":3713343920,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedLoss","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionLiquidatedEvent","header":23433073,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPChangedEvent","header":1111775758,"fields":[{"name":"netSizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPriceAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketCreatedEvent","header":3646947677,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketCancelledEvent","header":4244499969,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketExecutedEvent","header":289177631,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitCreatedEvent","header":2481954512,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitCancelledEvent","header":4267702159,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitExecutedEvent","header":1810135477,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionIncreasedEvent","header":2082826315,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketCreatedEvent","header":2480328626,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketCancelledEvent","header":2538831063,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketExecutedEvent","header":90345901,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitCreatedEvent","header":3958755127,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitCancelledEvent","header":3480294240,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitExecutedEvent","header":133513482,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerpPositionDecreasedEvent","header":1789226231,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tradingFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"rbfLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonusFactor","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minLPMargin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLPLeverage","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpLiquidationFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lpMaxRiskRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minMarginPerPosition","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxLeveragePerPosition","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationFeeRatePerPosition","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationExecutionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"interestRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxFundingRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalRBFPosition","header":null,"fields":[{"name":"riskBufferFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPosition","header":null,"fields":[{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryTradingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionMarketOrders","header":null,"fields":[{"name":"increasePerpPositionMarketOrders","type":{"kind":"dict","key":"int","value":"IncreasePerpPositionMarketOrder","valueFormat":"ref"}}]},
    {"name":"IncreasePerpPositionMarketOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionMarketOrders","header":null,"fields":[{"name":"decreasePerpPositionMarketOrders","type":{"kind":"dict","key":"int","value":"DecreasePerpPositionMarketOrder","valueFormat":"ref"}}]},
    {"name":"DecreasePerpPositionMarketOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreasePerpPositionLimitOrders","header":null,"fields":[{"name":"increasePerpPositionLimitOrders","type":{"kind":"dict","key":"int","value":"IncreasePerpPositionLimitOrder","valueFormat":"ref"}}]},
    {"name":"IncreasePerpPositionLimitOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreasePerpPositionLimitOrders","header":null,"fields":[{"name":"decreasePerpPositionLimitOrders","type":{"kind":"dict","key":"int","value":"DecreasePerpPositionLimitOrder","valueFormat":"ref"}}]},
    {"name":"DecreasePerpPositionLimitOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PriceVertex","header":null,"fields":[{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRateX96","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PriceState","header":null,"fields":[{"name":"maxPriceImpactLiquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"premiumRateX96","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"priceVertices","type":{"kind":"dict","key":"int","value":"PriceVertex","valueFormat":"ref"}},{"name":"pendingVertexIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationVertexIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"currentVertexIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationBufferNetSizes","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"GlobalRiskBufferFund","header":null,"fields":[{"name":"riskBufferFund","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingRateGrowthX96","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingRateGrowthX96","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalLiquidityPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidationBufferNetSize","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryPriceX96","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"side","type":{"kind":"simple","type":"bool","optional":false}},{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedProfitGrowthX64","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalFundingRateSample","header":null,"fields":[{"name":"lastAdjustFundingRateTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sampleCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cumulativePremiumRateX96","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PreviousGlobalFundingRate","header":null,"fields":[{"name":"longFundingRateGrowthX96","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingRateGrowthX96","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"FundingRateGrowthX96","header":null,"fields":[{"name":"clampedFundingRateDeltaX96","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"longFundingRateGrowthAfterX96","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"shortFundingRateGrowthAfterX96","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SamplePremiumRateResult","header":null,"fields":[{"name":"sample","type":{"kind":"simple","type":"GlobalFundingRateSample","optional":false}},{"name":"shouldAdjustFundingRate","type":{"kind":"simple","type":"bool","optional":false}},{"name":"fundingRateDeltaX96","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"rbfPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"RBFPosition","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRBFPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelIncreasePerpPositionMarketOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteIncreasePerpPositionMarketOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Pool implements Contract {
    
    static async init() {
        return await Pool_init();
    }
    
    static async fromInit() {
        const init = await Pool_init();
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | UpdateRBFPosition | CancelIncreasePerpPositionMarketOrder | ExecuteIncreasePerpPositionMarketOrder | Deploy) {
        
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
    
    async getRbfPosition(provider: ContractProvider, account: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('rbfPosition', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleRBFPosition(result_p) : null;
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}