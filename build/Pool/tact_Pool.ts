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

export type CreateIncreasePerpPositionMarketOrder = {
    $$type: 'CreateIncreasePerpPositionMarketOrder';
    token: string;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    acceptablePrice: bigint;
}

export function storeCreateIncreasePerpPositionMarketOrder(src: CreateIncreasePerpPositionMarketOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4090057726, 32);
        b_0.storeStringRefTail(src.token);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        b_0.storeInt(src.acceptablePrice, 257);
    };
}

export function loadCreateIncreasePerpPositionMarketOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4090057726) { throw Error('Invalid prefix'); }
    let _token = sc_0.loadStringRefTail();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let _acceptablePrice = sc_0.loadIntBig(257);
    return { $$type: 'CreateIncreasePerpPositionMarketOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice };
}

function loadTupleCreateIncreasePerpPositionMarketOrder(source: TupleReader) {
    let _token = source.readString();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _acceptablePrice = source.readBigNumber();
    return { $$type: 'CreateIncreasePerpPositionMarketOrder' as const, token: _token, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, acceptablePrice: _acceptablePrice };
}

function storeTupleCreateIncreasePerpPositionMarketOrder(source: CreateIncreasePerpPositionMarketOrder) {
    let builder = new TupleBuilder();
    builder.writeString(source.token);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.acceptablePrice);
    return builder.build();
}

function dictValueParserCreateIncreasePerpPositionMarketOrder(): DictionaryValue<CreateIncreasePerpPositionMarketOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateIncreasePerpPositionMarketOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateIncreasePerpPositionMarketOrder(src.loadRef().beginParse());
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

export type SetOperator = {
    $$type: 'SetOperator';
    operator: Address;
}

export function storeSetOperator(src: SetOperator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1568312693, 32);
        b_0.storeAddress(src.operator);
    };
}

export function loadSetOperator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1568312693) { throw Error('Invalid prefix'); }
    let _operator = sc_0.loadAddress();
    return { $$type: 'SetOperator' as const, operator: _operator };
}

function loadTupleSetOperator(source: TupleReader) {
    let _operator = source.readAddress();
    return { $$type: 'SetOperator' as const, operator: _operator };
}

function storeTupleSetOperator(source: SetOperator) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.operator);
    return builder.build();
}

function dictValueParserSetOperator(): DictionaryValue<SetOperator> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetOperator(src)).endCell());
        },
        parse: (src) => {
            return loadSetOperator(src.loadRef().beginParse());
        }
    }
}

export type SetExecutor = {
    $$type: 'SetExecutor';
    executor: Address;
    enable: boolean;
}

export function storeSetExecutor(src: SetExecutor) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3975180524, 32);
        b_0.storeAddress(src.executor);
        b_0.storeBit(src.enable);
    };
}

export function loadSetExecutor(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3975180524) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadAddress();
    let _enable = sc_0.loadBit();
    return { $$type: 'SetExecutor' as const, executor: _executor, enable: _enable };
}

function loadTupleSetExecutor(source: TupleReader) {
    let _executor = source.readAddress();
    let _enable = source.readBoolean();
    return { $$type: 'SetExecutor' as const, executor: _executor, enable: _enable };
}

function storeTupleSetExecutor(source: SetExecutor) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enable);
    return builder.build();
}

function dictValueParserSetExecutor(): DictionaryValue<SetExecutor> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetExecutor(src)).endCell());
        },
        parse: (src) => {
            return loadSetExecutor(src.loadRef().beginParse());
        }
    }
}

export type SetUSDC = {
    $$type: 'SetUSDC';
    usdc: Address;
}

export function storeSetUSDC(src: SetUSDC) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1746224983, 32);
        b_0.storeAddress(src.usdc);
    };
}

export function loadSetUSDC(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1746224983) { throw Error('Invalid prefix'); }
    let _usdc = sc_0.loadAddress();
    return { $$type: 'SetUSDC' as const, usdc: _usdc };
}

function loadTupleSetUSDC(source: TupleReader) {
    let _usdc = source.readAddress();
    return { $$type: 'SetUSDC' as const, usdc: _usdc };
}

function storeTupleSetUSDC(source: SetUSDC) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.usdc);
    return builder.build();
}

function dictValueParserSetUSDC(): DictionaryValue<SetUSDC> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetUSDC(src)).endCell());
        },
        parse: (src) => {
            return loadSetUSDC(src.loadRef().beginParse());
        }
    }
}

export type SetExecutionFeeReceiver = {
    $$type: 'SetExecutionFeeReceiver';
    receiver: Address;
}

export function storeSetExecutionFeeReceiver(src: SetExecutionFeeReceiver) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937854314, 32);
        b_0.storeAddress(src.receiver);
    };
}

export function loadSetExecutionFeeReceiver(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937854314) { throw Error('Invalid prefix'); }
    let _receiver = sc_0.loadAddress();
    return { $$type: 'SetExecutionFeeReceiver' as const, receiver: _receiver };
}

function loadTupleSetExecutionFeeReceiver(source: TupleReader) {
    let _receiver = source.readAddress();
    return { $$type: 'SetExecutionFeeReceiver' as const, receiver: _receiver };
}

function storeTupleSetExecutionFeeReceiver(source: SetExecutionFeeReceiver) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserSetExecutionFeeReceiver(): DictionaryValue<SetExecutionFeeReceiver> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetExecutionFeeReceiver(src)).endCell());
        },
        parse: (src) => {
            return loadSetExecutionFeeReceiver(src.loadRef().beginParse());
        }
    }
}

export type IncreaseRBFPositionCreatedEvent = {
    $$type: 'IncreaseRBFPositionCreatedEvent';
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeIncreaseRBFPositionCreatedEvent(src: IncreaseRBFPositionCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2657621549, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.executionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreaseRBFPositionCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2657621549) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'IncreaseRBFPositionCreatedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function loadTupleIncreaseRBFPositionCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'IncreaseRBFPositionCreatedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function storeTupleIncreaseRBFPositionCreatedEvent(source: IncreaseRBFPositionCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserIncreaseRBFPositionCreatedEvent(): DictionaryValue<IncreaseRBFPositionCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseRBFPositionCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseRBFPositionCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreaseRBFPositionCancelledEvent = {
    $$type: 'IncreaseRBFPositionCancelledEvent';
    index: bigint;
    trxId: bigint;
}

export function storeIncreaseRBFPositionCancelledEvent(src: IncreaseRBFPositionCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2129292883, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreaseRBFPositionCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2129292883) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreaseRBFPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleIncreaseRBFPositionCancelledEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreaseRBFPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleIncreaseRBFPositionCancelledEvent(source: IncreaseRBFPositionCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreaseRBFPositionCancelledEvent(): DictionaryValue<IncreaseRBFPositionCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseRBFPositionCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseRBFPositionCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type IncreaseRBFPositionExecutedEvent = {
    $$type: 'IncreaseRBFPositionExecutedEvent';
    index: bigint;
    trxId: bigint;
}

export function storeIncreaseRBFPositionExecutedEvent(src: IncreaseRBFPositionExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2678054786, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadIncreaseRBFPositionExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2678054786) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'IncreaseRBFPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleIncreaseRBFPositionExecutedEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'IncreaseRBFPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleIncreaseRBFPositionExecutedEvent(source: IncreaseRBFPositionExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserIncreaseRBFPositionExecutedEvent(): DictionaryValue<IncreaseRBFPositionExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseRBFPositionExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseRBFPositionExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionIncreasedEvent = {
    $$type: 'RBFPositionIncreasedEvent';
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    unlockTimeAfter: bigint;
}

export function storeRBFPositionIncreasedEvent(src: RBFPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1049076465, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.unlockTimeAfter, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1049076465) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _unlockTimeAfter = sc_1.loadIntBig(257);
    return { $$type: 'RBFPositionIncreasedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, unlockTimeAfter: _unlockTimeAfter };
}

function loadTupleRBFPositionIncreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _unlockTimeAfter = source.readBigNumber();
    return { $$type: 'RBFPositionIncreasedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, unlockTimeAfter: _unlockTimeAfter };
}

function storeTupleRBFPositionIncreasedEvent(source: RBFPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
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

export type DecreaseRBFPositionCreatedEvent = {
    $$type: 'DecreaseRBFPositionCreatedEvent';
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeDecreaseRBFPositionCreatedEvent(src: DecreaseRBFPositionCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2582752718, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.executionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreaseRBFPositionCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2582752718) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'DecreaseRBFPositionCreatedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function loadTupleDecreaseRBFPositionCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'DecreaseRBFPositionCreatedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function storeTupleDecreaseRBFPositionCreatedEvent(source: DecreaseRBFPositionCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserDecreaseRBFPositionCreatedEvent(): DictionaryValue<DecreaseRBFPositionCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseRBFPositionCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseRBFPositionCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreaseRBFPositionCancelledEvent = {
    $$type: 'DecreaseRBFPositionCancelledEvent';
    index: bigint;
    trxId: bigint;
}

export function storeDecreaseRBFPositionCancelledEvent(src: DecreaseRBFPositionCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1357521055, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreaseRBFPositionCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1357521055) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreaseRBFPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleDecreaseRBFPositionCancelledEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreaseRBFPositionCancelledEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleDecreaseRBFPositionCancelledEvent(source: DecreaseRBFPositionCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreaseRBFPositionCancelledEvent(): DictionaryValue<DecreaseRBFPositionCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseRBFPositionCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseRBFPositionCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type DecreaseRBFPositionExecutedEvent = {
    $$type: 'DecreaseRBFPositionExecutedEvent';
    index: bigint;
    trxId: bigint;
}

export function storeDecreaseRBFPositionExecutedEvent(src: DecreaseRBFPositionExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2803852868, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeInt(src.trxId, 257);
    };
}

export function loadDecreaseRBFPositionExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2803852868) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadIntBig(257);
    return { $$type: 'DecreaseRBFPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function loadTupleDecreaseRBFPositionExecutedEvent(source: TupleReader) {
    let _index = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'DecreaseRBFPositionExecutedEvent' as const, index: _index, trxId: _trxId };
}

function storeTupleDecreaseRBFPositionExecutedEvent(source: DecreaseRBFPositionExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserDecreaseRBFPositionExecutedEvent(): DictionaryValue<DecreaseRBFPositionExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseRBFPositionExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseRBFPositionExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type RBFPositionDecreasedEvent = {
    $$type: 'RBFPositionDecreasedEvent';
    account: Address;
    liquidityDelta: bigint;
    liquidityAfter: bigint;
    unlockTimeAfter: bigint;
}

export function storeRBFPositionDecreasedEvent(src: RBFPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1539827988, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.liquidityAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.unlockTimeAfter, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRBFPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1539827988) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _unlockTimeAfter = sc_1.loadIntBig(257);
    return { $$type: 'RBFPositionDecreasedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, unlockTimeAfter: _unlockTimeAfter };
}

function loadTupleRBFPositionDecreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _unlockTimeAfter = source.readBigNumber();
    return { $$type: 'RBFPositionDecreasedEvent' as const, account: _account, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, unlockTimeAfter: _unlockTimeAfter };
}

function storeTupleRBFPositionDecreasedEvent(source: RBFPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.unlockTimeAfter);
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
}

export function storeGlobalRBFChangedEvent(src: GlobalRBFChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4249946343, 32);
        b_0.storeInt(src.riskBufferFundAfter, 257);
        b_0.storeInt(src.liquidityAfter, 257);
    };
}

export function loadGlobalRBFChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4249946343) { throw Error('Invalid prefix'); }
    let _riskBufferFundAfter = sc_0.loadIntBig(257);
    let _liquidityAfter = sc_0.loadIntBig(257);
    return { $$type: 'GlobalRBFChangedEvent' as const, riskBufferFundAfter: _riskBufferFundAfter, liquidityAfter: _liquidityAfter };
}

function loadTupleGlobalRBFChangedEvent(source: TupleReader) {
    let _riskBufferFundAfter = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    return { $$type: 'GlobalRBFChangedEvent' as const, riskBufferFundAfter: _riskBufferFundAfter, liquidityAfter: _liquidityAfter };
}

function storeTupleGlobalRBFChangedEvent(source: GlobalRBFChangedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.riskBufferFundAfter);
    builder.writeNumber(source.liquidityAfter);
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
    margin: bigint;
    liquidityDelta: bigint;
    executionFee: bigint;
    index: bigint;
}

export function storeIncreaseLPPositionCreatedEvent(src: IncreaseLPPositionCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1533244921, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.margin, 257);
        b_0.storeInt(src.liquidityDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.executionFee, 257);
        b_1.storeInt(src.index, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreaseLPPositionCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1533244921) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _margin = sc_0.loadIntBig(257);
    let _liquidityDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFee = sc_1.loadIntBig(257);
    let _index = sc_1.loadIntBig(257);
    return { $$type: 'IncreaseLPPositionCreatedEvent' as const, account: _account, margin: _margin, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function loadTupleIncreaseLPPositionCreatedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _margin = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'IncreaseLPPositionCreatedEvent' as const, account: _account, margin: _margin, liquidityDelta: _liquidityDelta, executionFee: _executionFee, index: _index };
}

function storeTupleIncreaseLPPositionCreatedEvent(source: IncreaseLPPositionCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.margin);
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
    realizedProfit: bigint;
    realizedLoss: bigint;
}

export function storeLPPositionDecreasedEvent(src: LPPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3561213507, 32);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.marginAfter, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.liquidityDelta, 257);
        b_1.storeInt(src.liquidityAfter, 257);
        b_1.storeInt(src.realizedProfit, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.realizedLoss, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3561213507) { throw Error('Invalid prefix'); }
    let _account = sc_0.loadAddress();
    let _marginDelta = sc_0.loadIntBig(257);
    let _marginAfter = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _liquidityDelta = sc_1.loadIntBig(257);
    let _liquidityAfter = sc_1.loadIntBig(257);
    let _realizedProfit = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _realizedLoss = sc_2.loadIntBig(257);
    return { $$type: 'LPPositionDecreasedEvent' as const, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, realizedProfit: _realizedProfit, realizedLoss: _realizedLoss };
}

function loadTupleLPPositionDecreasedEvent(source: TupleReader) {
    let _account = source.readAddress();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _liquidityAfter = source.readBigNumber();
    let _realizedProfit = source.readBigNumber();
    let _realizedLoss = source.readBigNumber();
    return { $$type: 'LPPositionDecreasedEvent' as const, account: _account, marginDelta: _marginDelta, marginAfter: _marginAfter, liquidityDelta: _liquidityDelta, liquidityAfter: _liquidityAfter, realizedProfit: _realizedProfit, realizedLoss: _realizedLoss };
}

function storeTupleLPPositionDecreasedEvent(source: LPPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.liquidityAfter);
    builder.writeNumber(source.realizedProfit);
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

export type OperatorUpdatedEvent = {
    $$type: 'OperatorUpdatedEvent';
    newOperator: Address;
}

export function storeOperatorUpdatedEvent(src: OperatorUpdatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2286989662, 32);
        b_0.storeAddress(src.newOperator);
    };
}

export function loadOperatorUpdatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2286989662) { throw Error('Invalid prefix'); }
    let _newOperator = sc_0.loadAddress();
    return { $$type: 'OperatorUpdatedEvent' as const, newOperator: _newOperator };
}

function loadTupleOperatorUpdatedEvent(source: TupleReader) {
    let _newOperator = source.readAddress();
    return { $$type: 'OperatorUpdatedEvent' as const, newOperator: _newOperator };
}

function storeTupleOperatorUpdatedEvent(source: OperatorUpdatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOperator);
    return builder.build();
}

function dictValueParserOperatorUpdatedEvent(): DictionaryValue<OperatorUpdatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOperatorUpdatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadOperatorUpdatedEvent(src.loadRef().beginParse());
        }
    }
}

export type ExecutionFeeReceiverUpdatedEvent = {
    $$type: 'ExecutionFeeReceiverUpdatedEvent';
    newExecutionFeeReceiver: Address;
}

export function storeExecutionFeeReceiverUpdatedEvent(src: ExecutionFeeReceiverUpdatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3203710940, 32);
        b_0.storeAddress(src.newExecutionFeeReceiver);
    };
}

export function loadExecutionFeeReceiverUpdatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3203710940) { throw Error('Invalid prefix'); }
    let _newExecutionFeeReceiver = sc_0.loadAddress();
    return { $$type: 'ExecutionFeeReceiverUpdatedEvent' as const, newExecutionFeeReceiver: _newExecutionFeeReceiver };
}

function loadTupleExecutionFeeReceiverUpdatedEvent(source: TupleReader) {
    let _newExecutionFeeReceiver = source.readAddress();
    return { $$type: 'ExecutionFeeReceiverUpdatedEvent' as const, newExecutionFeeReceiver: _newExecutionFeeReceiver };
}

function storeTupleExecutionFeeReceiverUpdatedEvent(source: ExecutionFeeReceiverUpdatedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newExecutionFeeReceiver);
    return builder.build();
}

function dictValueParserExecutionFeeReceiverUpdatedEvent(): DictionaryValue<ExecutionFeeReceiverUpdatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecutionFeeReceiverUpdatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadExecutionFeeReceiverUpdatedEvent(src.loadRef().beginParse());
        }
    }
}

export type TokenInfo = {
    $$type: 'TokenInfo';
    name: string;
    enable: boolean;
}

export function storeTokenInfo(src: TokenInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
    };
}

export function loadTokenInfo(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    return { $$type: 'TokenInfo' as const, name: _name, enable: _enable };
}

function loadTupleTokenInfo(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    return { $$type: 'TokenInfo' as const, name: _name, enable: _enable };
}

function storeTupleTokenInfo(source: TokenInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    return builder.build();
}

function dictValueParserTokenInfo(): DictionaryValue<TokenInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTokenInfo(src.loadRef().beginParse());
        }
    }
}

export type IncreaseRBFPositionOrder = {
    $$type: 'IncreaseRBFPositionOrder';
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
}

export function storeIncreaseRBFPositionOrder(src: IncreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.executionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.blockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIncreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _blockTime = sc_1.loadIntBig(257);
    return { $$type: 'IncreaseRBFPositionOrder' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleIncreaseRBFPositionOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'IncreaseRBFPositionOrder' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleIncreaseRBFPositionOrder(source: IncreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    return builder.build();
}

function dictValueParserIncreaseRBFPositionOrder(): DictionaryValue<IncreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type DecreaseRBFPositionOrder = {
    $$type: 'DecreaseRBFPositionOrder';
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
}

export function storeDecreaseRBFPositionOrder(src: DecreaseRBFPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeInt(src.executionFee, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.blockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDecreaseRBFPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _blockTime = sc_1.loadIntBig(257);
    return { $$type: 'DecreaseRBFPositionOrder' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function loadTupleDecreaseRBFPositionOrder(source: TupleReader) {
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    return { $$type: 'DecreaseRBFPositionOrder' as const, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime };
}

function storeTupleDecreaseRBFPositionOrder(source: DecreaseRBFPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    return builder.build();
}

function dictValueParserDecreaseRBFPositionOrder(): DictionaryValue<DecreaseRBFPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDecreaseRBFPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadDecreaseRBFPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type RBFPosition = {
    $$type: 'RBFPosition';
    liquidity: bigint;
    bonus: bigint;
    unlockTime: bigint;
}

export function storeRBFPosition(src: RBFPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.liquidity, 257);
        b_0.storeInt(src.bonus, 257);
        b_0.storeInt(src.unlockTime, 257);
    };
}

export function loadRBFPosition(slice: Slice) {
    let sc_0 = slice;
    let _liquidity = sc_0.loadIntBig(257);
    let _bonus = sc_0.loadIntBig(257);
    let _unlockTime = sc_0.loadIntBig(257);
    return { $$type: 'RBFPosition' as const, liquidity: _liquidity, bonus: _bonus, unlockTime: _unlockTime };
}

function loadTupleRBFPosition(source: TupleReader) {
    let _liquidity = source.readBigNumber();
    let _bonus = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'RBFPosition' as const, liquidity: _liquidity, bonus: _bonus, unlockTime: _unlockTime };
}

function storeTupleRBFPosition(source: RBFPosition) {
    let builder = new TupleBuilder();
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

 type Pool_init_args = {
    $$type: 'Pool_init_args';
}

function initPool_init_args(src: Pool_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Pool_init() {
    const __code = Cell.fromBase64('te6ccgECwAEAQYwAART/APSkE/S88sgLAQIBYgIDAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER62BgIBIAQFAgEgl5gCASCmpwLKER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zzy4IIHCATUAZIwf+BwIddJwh+VMCDXCx/eIIIQXXqNdbqOsTDTHwGCEF16jXW68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQ7PBw7LrjAiCCEGgVR1e64wIgghCvHBlqugkKCwwBiMj4QwHMfwHKABEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UGQHwESgRKREoEScRKREnESYRKREmESURKRElESQRKREkESMRKREjESIRKREiESERKREhESARKREgER8RKREfER4RKREeER0RKREdERwRKREcERsRKREbERoRKREaERkRKREZERgRKREYERcRKREXERYRKREWERURKREVDQFsMNMfAYIQ7PBw7Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAWWwS2zx/EQFiMNMfAYIQaBVHV7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8fxYE2I6xMNMfAYIQrxwZarry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghBzYtCcuuMCIIIQDB1gJLqOmzDTHwGCEAwdYCS68uCBgQEB1wCBAQHXAFlsEuAgghBrwV1Juh0eHyAC5BEUESkRFBETESkRExESESkREhERESkREREQESkREA8RKQ8OESkODREpDQwRKQwLESkLChEpCgkRKQkRKQgHBlVA2zxXG1YoyAGCEIhQsV5Yyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WySIOAv7IgljAAAAAAAAAAAAAAAABActnzMlw+wCIESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERoRGxEaERkRGhEZERgRGREYERcRGBEXDxAAIAAAAABvcGVyYXRvciBzZXQBnhEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMPhCAX9t2zyUAfARKBEqESgRJxEpEScRJhEqESYRJREpESURJBEqESQRIxEpESMRIhEqESIRIREpESERIBEqESARHxEpER8RHhEqER4RHREpER0RHBEqERwRGxEpERsRGhEqERoRGREpERkRGBEqERgRFxEpERcRFhEqERYRFREpERUSAv4RFBEqERQRExEpERMREhEqERIREREpEREREBEqERAPESkPDhEqDg0RKQ0MESoMCxEpCwoRKgoJESkJCBEqCAcRKQcGESoGBREpBQQRKgQDESkDAhEqAgERKQERKts8AhEaAoEBCwIBESoBEStxIW6VW1n0WTCYyAHPAEEz9EHiIhMC+ogRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoBERsBERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETFBUAIAAAAABleGVjdXRvciBzZXQBchESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUFA+EIBf23bPJQB8BEoESkRKBEnESkRJxEmESkRJhElESkRJREkESkRJBEjESkRIxEiESkRIhEhESkRIREgESkRIBEfESkRHxEeESkRHhEdESkRHREcESkRHBEbESkRGxEaESkRGhEZESkRGREYESkRGBEXESkRFxEWESkRFhEVESkRFRcD+BEUESkRFBETESkRExESESkREhERESkREREQESkREA8RKQ8OESkODREpDQwRKQwLESkLChEpCgkRKQkRKQgHBlVA2zxXHfhCcHCAQBAjbW1t2zwRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESEilRgAzBEgESERIBEfESARHxEeER8RHhEdER4RHREbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgHEAREoAREpgQEBzwABESYBgQEBzwABESQBgQEBzwABESIB9AARIMiBAQHPAAERHwGBAQHPAAERHQGBAQHPABEbyIEBAc8AAREaAYEBAc8AAREYAYEBAc8AERbIgQEBzwABERUaAdIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIARESINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAREQAfQAUA4bAf4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYc9AAay38Y9AAWy3/IQFQCgQEBzwCBAQHPAPQA9AASy38S9AASy38CyIEBAc8AE/QAE/QAFIEBAc8AFIEBAc8AFfQAFct/Bsj0ABfLfxj0ABjLfxj0ABjLfwjI9ADJUAjMHAAwyVAHzMlQBszJUAPMyQHMyQHMyQHMyQHMAfARKBEpESgRJxEpEScRJhEpESYRJREpESURJBEpESQRIxEpESMRIhEpESIRIREpESERIBEpESARHxEpER8RHhEpER4RHREpER0RHBEpERwRGxEpERsRGhEpERoRGREpERkRGBEpERgRFxEpERcRFhEpERYRFREpERUhAagw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhCViIBxwWzkl8Ejo3UMNDSHwHAAZJfBOMN4n89AdL4QW8kMIFLaTNWLL4S8vRWG4EBASRZ9A1voZIwbd8gbpIwbY470PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiIG6SXwTjDn8lBPCOnjDTHwGCEGvBXUm68uCBgQEB1wCBAQHXAFlsEts8f+AgghChEWLtuo6eMNMfAYIQoRFi7bry4IGBAQHXAIEBAdcAWWwS2zx/4CCCEGImap+6jpsw0x8BghBiJmqfuvLggYEBAdcAgQEB1wBZbBLgIIIQJ+t3M7oqKywtAuQRFBEpERQRExEpERMREhEpERIREREpEREREBEpERAPESkPDhEpDg0RKQ0MESkMCxEpCwoRKQoJESkJESkIBwZVQNs8VxlWKMgBghC+9L/cWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskiIwAU+EJWHQHHBfLghAL8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EFvJBNfA4IKYloAofhCcFgScG1tbds8EScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEblSQAhBEaERsRGhEZERoRGREXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgH2IG7y0IBvJGwiESoRLREqESkRLBEpESgRKxEoEScRLREnESYRLBEmESURKxElESQRLREkESMRLBEjESIRKxEiESERLREhESARLBEgER8RKxEfER4RLREeER0RLBEdERwRKxEcERsRLREbERoRLBEaERkRKxEZERgRLREYJgP+ERcRLBEXERYRKxEWERURLREVERQRLBEUERMRKxETERIRLRESERERLBERERARKxEQDxEtDw4RLA4NESsNDBEtDAsRLAsKESsKCREtCQgRLAgHESsHBhEtBgURLAUEESsEAxEtAwIRLAIBESzbPH9WGgIRLHIQI21tbds8gQEBbXiVJwH0IG6SMG2OQCBu8tCAbyTIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMniAhEZAlYqASBulTBZ9FowlEEz9BXiAREoAREqyFmCEH7qblNQA8sfgQEBzwCBAQHPAMkoAfzIgljAAAAAAAAAAAAAAAABActnzMlw+wARJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8RHhEhER4RHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFhEYERYpAIIRFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkUzBAHyVhqBAQEjWfQNb6GSMG3fIG6SMG2OO9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4oF/fSFus/L0IG7y0IBvJBEpES4RKREoES0RKBEnESwRJxEmESsRJkkB9PhBbyQwMYFLaTIjoVYrvvL0gV/yIlYsvvL0VhekgQEB+EJTNPgjyFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPABKBAQHPAAHIgQEBzwDJAczJAhEbAlYaASBulTBZ9FowlEEz9BXi+EJQMxEZLgHS+EFvJDCBS2kzViy+EvL0VhmBAQEkWfQNb6GSMG3fIG6SMG2OO9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4iBukl8E4w5/LwTwjp4w0x8BghAn63czuvLggYEBAdcAgQEB1wBZbBLbPH/gIIIQdWTODrqOmzDTHwGCEHVkzg668uCBgQEB1wCBAQHXAFlsEuAgghBj9fmWuo6eMNMfAYIQY/X5lrry4IGBAQHXAIEBAdcAWWwS2zx/4CCCEHICvX26NDU2NwDAyFUwghCZ8a3OUAXLH1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERURFhEVAfYgbvLQgG8kbCIRKhEtESoRKREsESkRKBErESgRJxEtEScRJhEsESYRJRErESURJBEtESQRIxEsESMRIhErESIRIREtESERIBEsESARHxErER8RHhEtER4RHREsER0RHBErERwRGxEtERsRGhEsERoRGRErERkRGBEtERgwA/4RFxEsERcRFhErERYRFREtERURFBEsERQRExErERMREhEtERIREREsEREREBErERAPES0PDhEsDg0RKw0MES0MCxEsCwoRKwoJES0JCBEsCAcRKwcGES0GBREsBQQRKwQDES0DAhEsAgERLNs8f1YaAhEschAjbW1t2zyBAQFteJUxAfQgbpIwbY5AIG7y0IBvJMhVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwASgQEBzwAByIEBAc8AyQHMyeICERcCVioBIG6VMFn0WjCUQTP0FeIBESgBESrIWYIQUOogn1ADyx+BAQHPAIEBAc8AyTIB/MiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABElESgRJREkEScRJBEjESYRIxEiESURIhEhESQRIREgESMRIBEfESIRHxEeESERHhEdESARHREcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFTMAUBEUERcRFBESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsB9FYYgQEBI1n0DW+hkjBt3yBukjBtjjvQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOKBf30hbrPy9CBu8tCAbyQxESkRLREpESgRLBEoEScRKxEnESYRKhEmVQHi+EFvJDCBS2kzViy+EvL0VhSBAQEkWfQNb6GSMG3fIG6SMG2OQ9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG6SXwTjDn84AfZWE4EBASNZ9A1voZIwbd8gbpIwbY5D0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeKBf30hbrPy9CBu8tCAbyURKREvESkRKBEuESgRJxEtESdjBPqOpDDTHwGCEHICvX268uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f+AgghBFW896uo6bMNMfAYIQRVvPerry4IGBAQHXAIEBAdcAWWwS4CCCEI2y9QC6jp4w0x8BghCNsvUAuvLggYEBAdcAgQEB1wBZbBLbPH/gghCUapi2unFyc3QB+CBu8tCAbyVsIjIRKhEtESoRKREsESkRKBErESgRJxEtEScRJhEsESYRJRErESURJBEtESQRIxEsESMRIhErESIRIREtESERIBEsESARHxErER8RHhEtER4RHREsER0RHBErERwRGxEtERsRGhEsERoRGRErERkRGBEtERg5A/YRFxEsERcRFhErERYRFREtERURFBEsERQRExErERMREhEtERIREREsEREREBErERAPES0PDhEsDg0RKw0MES0MCxEsCwoRKwoJES0JCBEsCAcRKwcGES0GBREsBQQRKwQDES0DESwC2zx/VhoCESxyECNtbW3bPIEBAW14lToB/iBukjBtjkUgbvLQgG8lyFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwCBAQHPAALIgQEBzwCBAQHPAMkBzMniAhESAlYqASBulTBZ9FowlEEz9BXiAREoAREqyFmCEBzdJZlQA8sfgQEBzwCBAQHPAMk7AfzIgljAAAAAAAAAAAAAAAABActnzMlw+wARJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8RHhEhER4RHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERU8AFIRFBEXERQRExEWERMREhEVERIREREUEREREBETERBeLw0REA0Qz1UrEgTk+gD6ADCNDJyZWNlaXZlIGNyZWF0ZSBpbmNyZWFzZSByYmYgcG9zaXRpb24gb3JkZXIgb3AgY29kZYP4UMMgjINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfkA2zz+FDAh2zz+FDAg2zz+FDABj4+PPgEE2zw/A8qNCRoYW5kbGVDcmVhdGVJbmNyZWFzZVJCRlBvc2l0aW9uT3JkZXKD+FDD4QW8kE18DIoIQC+vCAKC5jpZbi+Z2FzIG5vdCBlbm91Z2iP4UMNs84FMwueMCMzNWGqSBAQFUcjT4I0JAQQFSW9s8jQgcmVmdW5kIGZyb20gbm90IGVub3VnaCBsaXF1aWRpdHmD+FDBCAabIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMkCER4CVh0BIG6VMFn0WjCUQTP0FeJUMjERHUcB9ov3JlZnVuZExpcXVpZGl0eY/hQwViBwgEBwIhEsETARLBErES8RKxEqES4RKhEpES0RKREoETARKBEnES8RJxEmES4RJhElES0RJREkETARJBEjES8RIxEiES4RIhEhES0RIREgETARIBEfES8RHxEeES4RHhEdES0RHUMB/BEcETARHBEbES8RGxEaES4RGhEZES0RGREYETARGBEXES8RFxEWES4RFhEVES0RFREUETARFBETES8RExESES4REhERES0REREQETAREA8RLw8OES4ODREtDQwRMAwLES8LChEuCgkRLQkIETAIBxEvBwYRLgYFES0FBBEwBEQD/AMRLwMCAREuAREt2zwEES0EAxEsAwIRKgIBESsBFEMwbW3bPBEkESgRJBEjEScRIxEiESYRIhEhESURIREgESQRIBEfESMRHxEeESIRHhEdESERHREcESARHBEbER8RGxEaER4RGhEZER0RGREYERwRGBEXERsRFxEWERoRFkWVRgC0yIIQD4p+pQHKHxTKPwH6AiIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WcAHKAAH6AnABygDJAJQRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RhRDUwHyyFUwghCeaBYtUAXLH1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwCBAQHPAAHIgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EFvJBNfA1ihghAL68IAoSDCAJMwVxjjDREXERgRF0gBjI0M2hhbmRsZUNyZWF0ZUluY3JlYXNlUkJGUG9zaXRpb25PcmRlciByZWZ1bmQgdG9uY29pboP4UMAERGQFwARJwbW1t2zyVAfwRJREqESURJBEuESQRIxEtESMRIhEsESIRIRErESERIBEqESARHxEuER8RHhEtER4RHREsER0RHBErERwRGxEqERsRGhEuERoRGREtERkRGBEsERgRFxErERcRFhEqERYRFREuERURFBEtERQRExEsERMREhErERIREREqERFKA/4REBEuERAPES0PDhEsDg0RKw0MESoMCxEuCwoRLQoJESwJCBErCAcRKgcGES4GBREtBQQRLAQDESsDAhEqAgERLgHbPFYSgQELVixZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JwUwAwIm6zkTLjDVYWfktMABRbIG7y0IBvIzABAfwRKBErESgRJxEqEScRJhEpESYRJRErESURJBEqESQRIxEpESMRIhErESIRIREqESERIBEpESARHxErER8RHhEqER4RHREpER0RHBErERwRGxEqERsRGhEpERoRGRErERkRGBEqERgRFxEpERcRFhErERYRFREqERURFBEpERRNBPoRExErERMREhEqERIREREpEREREBErERAPESoPDhEpDg0RKw0MESoMCxEpCwoRKwoJESoJCBEpCAcRKwcGESoGBREpBQQRKwQDESoDAhEpAgERKwERKts8ARErAaAgwQCSMHDeIFYUuZEw4w0RKlYroPgjViOgif4UMMhWLoJOT1ABTlYTAaFWIgGoViyoVhOpBItmJvbnVzOo/hQwINs8/hQwAREpAaARKI8ARmV4ZWN1dGUgaW5jcmVhc2UgcmJmIHBvc2l0aW9uIG9yZGVyAtIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ+QDbPP4UMCGBAQsRKyLIVSBQI4EBAc8AgQEBzwCBAQHPAMkCERMCAREqAVYuASBulTBZ9FkwlEEz9BPiERNWK6ARElYroIEBAW2PUQLiIG6SMG2OQCBu8tCAbyTIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMniAhEZAlYwASBulTBZ9FowlEEz9BXif1YZAhExchAjbW1t2zwBES0BESyVUgH4yFmCEJ+f34JQA8sfgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wADESkDAhEoAhElHshVMIIQPoei8VAFyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwAByIEBAc8AyQHMyVMB9MiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACtWEchZghD9UQjnUAPLH4EBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAESARKBEgER8RJxEfER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZVAC4ERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERDxEXDw4RFg4NERUNCxEUCxEQERMREAwREgwJEREJCBEQCFV3EFcQNkVAQwAB/BElES0RJREkESwRJBEjESsRIxEiESoRIhEhES0RIREgESwRIBEfESsRHxEeESoRHhEdES0RHREcESwRHBEbESsRGxEaESoRGhEZES0RGREYESwRGBEXESsRFxEWESoRFhEVES0RFREUESwRFBETESsRExESESoREhERES0REVYC9BEQESwREA8RKw8OESoODREtDQwRLAwLESsLChEqCgkRLQkIESwIBxErBwYRKgYFES0FBBEsBAMRKwMCESoCAREtAds8VhKBAQtWK1n0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4oEUdiFus/L0flcD9iBu8tCAbyMg2zz+FDD4I9s8/hQwgXrBIfgju/L0ggDjMSNWMb7y9BEoESsRKBEnESoRJxEmESkRJhElESsRJREkESoRJBEjESkRIxEiESsRIhEhESoRIREgESkRIBEfESsRHxEeESoRHhEdESkRHREcESsRHBEbESoRG4+PWAH8ERoRKREaERkRKxEZERgRKhEYERcRKREXERYRKxEWERURKhEVERQRKREUERMRKxETERIRKhESERERKRERERARKxEQDxEqDw4RKQ4NESsNDBEqDAsRKQsKESsKCREqCQgRKQgHESsHBhEqBgURKQUEESsEAxEqAwIRKQIBESsBWQL6ESrbPFYVgVrEAqDCAPL0VhQRKBEpESgRJxEpEScRJhEpESYRJREpESURJBEpESQRIxEpESMRIhEpESIRIREpESERIBEpESARHxEpER8RHhEpER4RHREpER0RHBEpERwRGxEpERsRGhEpERoRGREpERkRGBEpERgRFxEpEReCWgT8ERYRKREWERURKREVERQRKREUERMRKRETERIRKRESERERKRERERARKREQDxEpDw4RKQ4NESkNDBEpDAsRKQsKESkKCREpCREpCAcGVUDbPAERKgGgIMEAkjBw3oIA8ashwgDy9HAhVhW+mFYxWKhWFKkE4w0RK1YxoREtAaGJgltcXQC+MPgjViyhViSgggFRgKkEVi3AAI4XVjFWJKgiVhahqAGAZLYIqAGBA+ioqQSOLCFWFaFWMgGoIqkEVi5WM1YmqCRWGKGoA4BktggTqAOBA+ioE6kEWbYIAbYJ4lYTIaAARmV4ZWN1dGUgZGVjcmVhc2UgcmJmIHBvc2l0aW9uIG9yZGVyA/z+FDDIVi4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ+QDbPP4UMFYswgCOPjCBAQttIG6SMG2OHCBu8tCAbyPIVSBQI4EBAc8AgQEBzwCBAQHPAMniAhETAlYuASBulTBZ9FkwlEEz9BPi4w0BERMBESmhERFWLqGPXl8AZFYsgQELAlYtyFUgUCOBAQHPAIEBAc8AgQEBzwDJAhETAlYuASBulTBZ9FkwlEEz9BPiAfyBAQFtIG6SMG2OQCBu8tCAbyTIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMniAhEWAlYvASBulTBZ9FowlEEz9BXiAREtAREsyFmCEKcfZkRQA8sfgQEBzwCBAQHPAMlgAdDIgljAAAAAAAAAAAAAAAABActnzMlw+wADESkDAhEsAgERKAERJ8hVMIIQW8fpFFAFyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwAByIEBAc8AyQHMyWEB/siCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFO+yFmCEP1RCOdQA8sfgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARIBEoESARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERhiAKIRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDREVDQsRFAsOERMOCRERCQgREAhVdxBXBhA1REQB/BEmESwRJhElESsRJREkESoRJBEjES8RIxEiES4RIhEhES0RIREgESwRIBEfESsRHxEeESoRHhEdES8RHREcES4RHBEbES0RGxEaESwRGhEZESsRGREYESoRGBEXES8RFxEWES4RFhEVES0RFREUESwRFBETESsRExESESoREmQCshERES8REREQES4REA8RLQ8OESwODRErDQwRKgwLES8LChEuCgkRLQkIESwIBxErBwYRKgYFES8FBBEuBAMRLQMCESwCARErAds8K4EBC1YvWfQLb6GSMG3ffmUD3CBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOJwVHAAJG6zm18EIG7y0IBvJFUgkTTiIcAAjhwTXwNWLYIA88khViW+8vSCAKaKIVYkqFYvvvL04w4BVi2gU7yJ/hQwyFYyZmdoAfpS0KEhqFLkoSGoEqBYoFYuoBEoESoRKBEnESkRJxEmESoRJhElESkRJREkESoRJBEjESkRIxEiESoRIhEhESkRIREgESoRIBEfESkRHxEeESoRHhEdESkRHREcESoRHBEbESkRGxEaESoRGhEZESkRGREYESoRGBEXESkRF2kARGV4ZWN1dGUgaW5jcmVhc2UgbHAgcG9zaXRpb24gb3JkZXIC1CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwgQELVHQyJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERECVjMBIG6VMFn0WTCUQTP0E+IREVYvoIEBAW2PbAL6ERYRKhEWERURKREVERQRKhEUERMRKRETERIRKhESERERKRERERARKhEQDxEpDw4RKg4NESkNDBEqDAsRKQsKESoKCREpCQgRKggHESkHBhEqBgURKQUEESoEAxEpAwIRKgIBESkBESrbPFYVoC6oViqpBHAhwQCSMKORMeKCagH8gVjdVixWIqFWIaiCCA9CQKkEWLzy9IIApopWK1YiqFYvvvL0ESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaawCMERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHQLsIG6SMG2ORSBu8tCAbyXIVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAsiBAQHPAIEBAc8AyQHMyeICERcCVi8BIG6VMFn0WjCUQTP0FeJ/Vh4CETByECNtbW3bPAERLAERMZVtAvbIWYIQchdvXVADyx+BAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAYRLgYFES0FBAMRLAMCESoCAREvAQzIVWDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARIhEoESIRIREnESERIBEmESARHxElER9ubwCsghCwv9tcUAjLH1AGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFIEBAc8AEoEBAc8AAciBAQHPABKBAQHPABKBAQHPAALIgQEBzwDJWMzJAcwB/BEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwMEREMChEQChCfEI4QvRBsEHsQSnAAEBA5SHYQNUEEAfT4QW8kMDGBS2kyJKFWLL7y9IFf8iNWLb7y9FYRpIEBAfhCVHQ1+CPIVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAsiBAQHPAIEBAc8AyQHMyQIRFQJWFAEgbpUwWfRaMJRBM/QV4nUB4vhBbyQwgUtpM1YsvhLy9FYSgQEBJFn0DW+hkjBt3yBukjBtjkPQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBukl8E4w5/dgH2VhGBAQEjWfQNb6GSMG3fIG6SMG2OQ9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXigX99IW6z8vQgbvLQgG8lESkRLxEpESgRLhEoEScRLREnfAFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHCUANL4QlBEERPIVUCCEDbGzDlQBssfUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEO8B9iBu8tCAbyVsQREqESwRKhEpESsRKREoESwRKBEnESsRJxEmESwRJhElESsRJREkESwRJBEjESsRIxEiESwRIhEhESsRIREgESwRIBEfESsRHxEeESwRHhEdESsRHREcESwRHBEbESsRGxEaESwRGhEZESsRGREYESwRGHcC3hEXESsRFxEWESwRFhEVESsRFREUESwRFBETESsRExESESwREhERESsREREQESwREA8RKw8OESwODRErDQwRLAwLESsLChEsCgkRKwkIESwIBxErBwYRLAYFESsFBBEsBAMRKwMCESwCAds8gQEBbXh5ALr4QW8kECNfA1YdgQELInFBM/QKb6GUAdcAMJJbbeJwIW6zljAgbvLQgJEx4iCcggCbFySmBvgju/L03gKCAKD3AscFkX+RIeLy9LOeggCbFwGBALSg+CO78vSRMOIB/iBukjBtjkUgbvLQgG8lyFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwCBAQHPAALIgQEBzwCBAQHPAMkBzMniAhERAlYrASBulTBZ9FowlEEz9BXiAREpAREqyFmCEJVvjVlQA8sfgQEBzwCBAQHPAMl6AfzIgljAAAAAAAAAAAAAAAABActnzMlw+wARJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERZ7AGARFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDvVRwB/BEmESwRJhElESsRJREkESoRJBEjES8RIxEiES4RIhEhES0RIREgESwRIBEfESsRHxEeESoRHhEdES8RHREcES4RHBEbES0RGxEaESwRGhEZESsRGREYESoRGBEXES8RFxEWES4RFhEVES0RFREUESwRFBETESsRExESESoREn0CshERES8REREQES4REA8RLQ8OESwODRErDQwRKgwLES8LChEuCgkRLQkIESwIBxErBwYRKgYFES8FBBEuBAMRLQMCESwCARErAds8K4EBC1YvWfQLb6GSMG3ffn8AmPhBbyQQI18DgQELVh0CcUEz9ApvoZQB1wAwkltt4nAhbrOWMCBu8tCAkTHiggCg9wHy9IIAmxchpgb4I7vy9IFBjAGBBwig+CO88vQB9CBukjBtjiDQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOJwVHAAJG6zm18EIG7y0IBvJFUgkTTiUtChIahS5KEhqFADoFygggDzySFWMr7y9FYwoYIA4zEkVjG+8vQjVjChESgRLREoEScRLBEnESYRKxEmgAH8ESURKhElESQRKREkESMRLREjESIRLBEiESERKxEhESARKhEgER8RKREfER4RLREeER0RLBEdERwRKxEcERsRKhEbERoRKREaERkRLREZERgRLBEYERcRKxEXERYRKhEWERURKREVERQRLREUERMRLBETERIRKxESERERKhERgQP+ERARKREQDxEtDw4RLA4NESsNDBEqDAsRKQsKES0KCREsCQgRKwgHESoHBhEpBgURLQUEESwEAxErAwIRKgIBESkBES3bPFYVoC6oVi2pBHAhwQCTMCCj3oIA8zNWF1YRoFADoFYzvhLy9FYuwgCYESpWKqEgESvjDQHCADBWLoKDhAJSjQTY2FsY3VsYXRlIHRvdGFsIHBubIP4UMHBxlCBWJ7mK6DAg2zz+FDCFjwCGIFYyqFYuqQQgVjS7lFYzIaGacBEsVjSgIaERLOKBWN1WLVYkoVYjqIIID0JAqQRQBLwT8vSCAKaKVixWJKhWNL7y9APEwgCOVVcqVy2BAQttIG6SMG2OJiBu8tCAbyTIVTBQNIEBAc8AgQEBzwCBAQHPAAHIgQEBzwDJAczJ4hAsVjMBIG6VMFn0WTCUQTP0E+IRKxEsESsRKBEqESjjDYn+FDDIVjKMjY4B/BEoESoRKBEnESkRJxEmESoRJhElESkRJREkESoRJBEjESkRIxEiESoRIhEhESkRIREgESoRIBEfESkRHxEeESoRHhEdESkRHREcESoRHBEbESkRGxEaESoRGhEZESkRGREYESoRGBEXESkRFxEWESoRFhEVESkRFREUESoRFIYD+hETESkRExESESoREhERESkREREQESoREA8RKQ8OESoODREpDQwRKgwLESkLChEqCgkRKQkIESoIBxEpBwYRKgYFESkFBBEqBAMRKQMCESoCAREpAREqVirbPOMAESqkESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkh4iJAGCBAQFWJwJZ9A1voZIwbd8gbpIwbZzQ1AHQAdIAWWwSbwLiIG6SMHDgIG7y0IBvIjEBmCyBAQFWLFn0DW+hkjBt3yBukjBtjhPQgQEB1wDSAIEBAdcAVSBsE28D4iBus46aIG7y0IBvIxKCKCOG8m/BAADbPAERKgGgESmRMOKKAfgRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPiwA+A54SoaiCKCOG8m/BAACpBOBYoaiCKCOG8m/BAACpBAA4DhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMACEVyxXLFOJgQELVisCVjBARMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkQLFYzASBulTBZ9FkwlEEz9BPiAERleGVjdXRlIGRlY3JlYXNlIGxwIHBvc2l0aW9uIG9yZGVyAv4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ+QDbPP4UMAxWL6GBAQFtIG6SMG2ORSBu8tCAbyXIVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAsiBAQHPAIEBAc8AyQHMyeICERICj5AA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0APoVi8BIG6VMFn0WjCUQTP0FeJ/VhkCETByECNtbW3bPAERLAERMchZghByrpuaUAPLH4EBAc8AgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABhEuBgURLQUEESUEAxEsAwIRKQIBESYBESfIVWDbPMmVkZIArIIQ1EPOQ1AIyx9QBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhSBAQHPABKBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AyVjMyQHMAfjIgljAAAAAAAAAAAAAAAABActnzMlw+wARHREoER0RHBEnERwRGxEmERsRGhElERoRGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDg0RGA0MERcMkwBeCxEWCwoRFQoJERQJCBETCAcREgcOEREOBREQBRBPED4QbUvAEDoQWRBHUAYDRBQBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8lQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wCWAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFImZoCAWKhogIhsAu2zzbPFcQXw9XEF8PbJGC2mwIBZpydAARWFwL3p422eCJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPCI6IjwiOiI4IjoiOCI2IjgiNiI0IjYiNCIyIjQiMiIwIjIiMCIuIjAiLiIsIi4iLCIqIiwiK7aeAh+l47Z5tniuIL4eriC+HtkjtqABjBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9skSBukjBtmSBu8tCAbyRvBOIgbpIwbd6fAKSBAQFWGgJZ9A1voZIwbd8gbpIwbY470PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiAARWFQIhro7tnm2eK4gvh6uIL4e2SMC2owL1r5EQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4IlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI8IjoiPCI6IjgiOiI4IjYiOCI2IjQiNiI1AtqQABFYcAcgRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PbJEgbpIwbZkgbvLQgG8jbwPiIG6SMG3epQBagQELVhQCWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiAgEgqKkCASCrrAIht8kbZ5tniuIL4eriC+HtkjC2qgDdt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQTggZzq084r86ShYDrC3EyPZQAARWGQIBIK2uAgEgr7AAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtUTZvTkJqaUoydlZiTWI0Ujl2eUNRWmk1ZnhucmdBUVc5bk5RNmhrWk56UleCACAUixsgIhsto2zzbPFcQXw9XEF8PbJGC2twL4qdbbPBEoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFbazAiCoQ9s82zxXEF8PVxBfD2yRtrUBjBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9skSBukjBtmSBu8tCAbyRvBOIgbpIwbd60AKSBAQFWGAJZ9A1voZIwbd8gbpIwbY470PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiAARWHQI07UTQ1AH4Y9IAAeMCMPgo1wsKgwm68uCJ2zy4uQAEVhsC+Ns8VykRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERS6uwH0bYIIDS8AcW1tbW1tbW1tbW1tbW34QnAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIgQEL+EJ/VhO+AbqBAQHXAIEBAdcAgQEB1wD0BNQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAG8ADwRExEUERMREhETERIRERESEREREBERERAPERAPVQ4B/PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATTf/QE03/UMNCBAQHXAIEBAdcAWQL0BL0AqvQE03/0BNN/1DDQgQEB1wD0BPQEgQEB1wCBAQHXAPQE03/UMND0BNN/9ATTf/QE03/UMND0BDARJREpESURJREoESURJREnESURJREmESURExEUERMB+AQREwQhbpVbWfRZMJjIAc8AQTP0QeL4QlYRghAdzWUAggr68ICCCcnDgHqAZHCCCA9CQFR3cSBUciVUcAFUcAARExEoERMREhEnERIREREmERERExElERMRFBEkERQREhEjERIREREiEREREBEhERAPESAPDhEfDg0RHg2/AL4RFxEdERcRGBEcERgRExEbERMRFhEaERYRFREZERURFBEYERQMERcMERIRFhESCxEVCwoRFAoJERMJEREREhERERAREREQCBEQCBB+EG0QfBBrEFoQSRB4EDcQVkUDAg==');
    const __system = Cell.fromBase64('te6cckECwgEAQZYAAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWInBAIBIBcFAgEgEwYCASAQBwIBIAoIAiGy2jbPNs8VxBfD1cQXw9skYLkJAARWGwIBSA0LAiCoQ9s82zxXEF8PVxBfD2yRuQwABFYdAvip1ts8ESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVuQ4BjBEUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9skSBukjBtmSBu8tCAbyRvBOIgbpIwbd4PAKSBAQFWGAJZ9A1voZIwbd8gbpIwbY470PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTiAgEgEhEAdbJu40NWlwZnM6Ly9RbVE2b05CamlKMnZWYk1iNFI5dnlDUVppNWZ4bnJnQVFXOW5OUTZoa1pOelJXggABGwr7tRNDSAAGACASAVFADdt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQTggZzq084r86ShYDrC3EyPZQAiG3yRtnm2eK4gvh6uIL4e2SMLkWAARWGQIBIB4YAgFiHBkC9a+REGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eCJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPCI6IjwiOiI4IjoiOCI2IjgiNiI0IjYiNQLkaAcgRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PbJEgbpIwbZkgbvLQgG8jbwPiIG6SMG3eGwBagQELVhQCWfQLb6GSMG3fIG6SMG2OFtCBAQHXAIEBAdcAgQEB1wBVIGwTbwPiAiGuju2ebZ4riC+Hq4gvh7ZIwLkdAARWHAIBSCUfAgFmIiACH6Xjtnm2eK4gvh6uIL4e2SO5IQAEVhUC96eNtngiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+IjwiOiI8IjoiOCI6IjgiNiI4IjYiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIiu5IwGMERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD2yRIG6SMG2ZIG7y0IBvJG8E4iBukjBt3iQApIEBAVYaAln0DW+hkjBt3yBukjBtjjvQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOICIbALts82zxXEF8PVxBfD2yRguSYABFYXAvDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER65KALKER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zzy4IIuKQGIyPhDAcx/AcoAESkRKBEnESYRJREkESMRIhEhESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQqAcQBESgBESmBAQHPAAERJgGBAQHPAAERJAGBAQHPAAERIgH0ABEgyIEBAc8AAREfAYEBAc8AAREdAYEBAc8AERvIgQEBzwABERoBgQEBzwABERgBgQEBzwARFsiBAQHPAAERFSsB0iDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsgBERIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERAB9ABQDiwB/iDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhz0ABrLfxj0ABbLf8hAVAKBAQHPAIEBAc8A9AD0ABLLfxL0ABLLfwLIgQEBzwAT9AAT9AAUgQEBzwAUgQEBzwAV9AAVy38GyPQAF8t/GPQAGMt/GPQAGMt/CMj0AMlQCMwtADDJUAfMyVAGzMlQA8zJAczJAczJAczJAcwE1AGSMH/gcCHXScIflTAg1wsf3iCCEF16jXW6jrEw0x8BghBdeo11uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEOzwcOy64wIgghBoFUdXuuMCIIIQrxwZarqwqqYvBNiOsTDTHwGCEK8cGWq68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQc2LQnLrjAiCCEAwdYCS6jpsw0x8BghAMHWAkuvLggYEBAdcAgQEB1wBZbBLgIIIQa8FdSbqilI0wBPCOnjDTHwGCEGvBXUm68uCBgQEB1wCBAQHXAFlsEts8f+AgghChEWLtuo6eMNMfAYIQoRFi7bry4IGBAQHXAIEBAdcAWWwS2zx/4CCCEGImap+6jpsw0x8BghBiJmqfuvLggYEBAdcAgQEB1wBZbBLgIIIQJ+t3M7p3dW8xBPCOnjDTHwGCECfrdzO68uCBgQEB1wCBAQHXAFlsEts8f+AgghB1ZM4Ouo6bMNMfAYIQdWTODrry4IGBAQHXAIEBAdcAWWwS4CCCEGP1+Za6jp4w0x8BghBj9fmWuvLggYEBAdcAgQEB1wBZbBLbPH/gIIIQcgK9fbpgWksyBPqOpDDTHwGCEHICvX268uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f+AgghBFW896uo6bMNMfAYIQRVvPerry4IGBAQHXAIEBAdcAWWwS4CCCEI2y9QC6jp4w0x8BghCNsvUAuvLggYEBAdcAgQEB1wBZbBLbPH/gghCUapi2uklDNDMBWI6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwtAH2VhGBAQEjWfQNb6GSMG3fIG6SMG2OQ9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXigX99IW6z8vQgbvLQgG8lESkRLxEpESgRLhEoEScRLREnNQH8ESYRLBEmESURKxElESQRKhEkESMRLxEjESIRLhEiESERLREhESARLBEgER8RKxEfER4RKhEeER0RLxEdERwRLhEcERsRLREbERoRLBEaERkRKxEZERgRKhEYERcRLxEXERYRLhEWERURLREVERQRLBEUERMRKxETERIRKhESNgKyERERLxERERARLhEQDxEtDw4RLA4NESsNDBEqDAsRLwsKES4KCREtCQgRLAgHESsHBhEqBgURLwUEES4EAxEtAwIRLAIBESsB2zwrgQELVi9Z9AtvoZIwbd+MNwH0IG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4nBUcAAkbrObXwQgbvLQgG8kVSCRNOJS0KEhqFLkoSGoUAOgXKCCAPPJIVYyvvL0VjChggDjMSRWMb7y9CNWMKERKBEtESgRJxEsEScRJhErESY4AfwRJREqESURJBEpESQRIxEtESMRIhEsESIRIRErESERIBEqESARHxEpER8RHhEtER4RHREsER0RHBErERwRGxEqERsRGhEpERoRGREtERkRGBEsERgRFxErERcRFhEqERYRFREpERURFBEtERQRExEsERMREhErERIREREqERE5A/4REBEpERAPES0PDhEsDg0RKw0MESoMCxEpCwoRLQoJESwJCBErCAcRKgcGESkGBREtBQQRLAQDESsDAhEqAgERKQERLds8VhWgLqhWLakEcCHBAJMwIKPeggDzM1YXVhGgUAOgVjO+EvL0Vi7CAJgRKlYqoSARK+MNAcIAMFYug0I6A8TCAI5VVypXLYEBC20gbpIwbY4mIG7y0IBvJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMniECxWMwEgbpUwWfRZMJRBM/QT4hErESwRKxEoESoRKOMNif4UMMhWMkFAOwL+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfkA2zz+FDAMVi+hgQEBbSBukjBtjkUgbvLQgG8lyFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwCBAQHPAALIgQEBzwCBAQHPAMkBzMniAhESAqE8A+hWLwEgbpUwWfRaMJRBM/QV4n9WGQIRMHIQI21tbds8AREsARExyFmCEHKum5pQA8sfgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAGES4GBREtBQQRJQQDESwDAhEpAgERJgERJ8hVYNs8ybU/PQH4yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAER0RKBEdERwRJxEcERsRJhEbERoRJREaERkRJBEZERgRIxEYERcRIhEXERYRIREWERURIBEVERQRHxEUERMRHhETERIRHRESERERHBERERARGxEQDxEaDw4RGQ4NERgNDBEXDD4AXgsRFgsKERUKCREUCQgREwgHERIHDhERDgUREAUQTxA+EG1LwBA6EFkQR1AGA0QUAKyCENRDzkNQCMsfUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUgQEBzwASgQEBzwAByIEBAc8AEoEBAc8AEoEBAc8AAsiBAQHPAMlYzMkBzABEZXhlY3V0ZSBkZWNyZWFzZSBscCBwb3NpdGlvbiBvcmRlcgCEVyxXLFOJgQELVisCVjBARMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkQLFYzASBulTBZ9FkwlEEz9BPiAIYgVjKoVi6pBCBWNLuUVjMhoZpwESxWNKAhoREs4oFY3VYtViShViOogggPQkCpBFAEvBPy9IIApopWLFYkqFY0vvL0AeL4QW8kMIFLaTNWLL4S8vRWEoEBASRZ9A1voZIwbd8gbpIwbY5D0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIgbpJfBOMOf0QB9iBu8tCAbyVsQREqESwRKhEpESsRKREoESwRKBEnESsRJxEmESwRJhElESsRJREkESwRJBEjESsRIxEiESwRIhEhESsRIREgESwRIBEfESsRHxEeESwRHhEdESsRHREcESwRHBEbESsRGxEaESwRGhEZESsRGREYESwRGEUC3hEXESsRFxEWESwRFhEVESsRFREUESwRFBETESsRExESESwREhERESsREREQESwREA8RKw8OESwODRErDQwRLAwLESsLChEsCgkRKwkIESwIBxErBwYRLAYFESsFBBEsBAMRKwMCESwCAds8gQEBbZNGAf4gbpIwbY5FIG7y0IBvJchVQFBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AgQEBzwACyIEBAc8AgQEBzwDJAczJ4gIREQJWKwEgbpUwWfRaMJRBM/QV4gERKQERKshZghCVb41ZUAPLH4EBAc8AgQEBzwDJRwH8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWSABgERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q71UcAfT4QW8kMDGBS2kyJKFWLL7y9IFf8iNWLb7y9FYRpIEBAfhCVHQ1+CPIVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAsiBAQHPAIEBAc8AyQHMyQIRFQJWFAEgbpUwWfRaMJRBM/QV4koA0vhCUEQRE8hVQIIQNsbMOVAGyx9QBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAQ7wH2VhOBAQEjWfQNb6GSMG3fIG6SMG2OQ9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXigX99IW6z8vQgbvLQgG8lESkRLxEpESgRLhEoEScRLREnTAH8ESYRLBEmESURKxElESQRKhEkESMRLxEjESIRLhEiESERLREhESARLBEgER8RKxEfER4RKhEeER0RLxEdERwRLhEcERsRLREbERoRLBEaERkRKxEZERgRKhEYERcRLxEXERYRLhEWERURLREVERQRLBEUERMRKxETERIRKhESTQKyERERLxERERARLhEQDxEtDw4RLA4NESsNDBEqDAsRLwsKES4KCREtCQgRLAgHESsHBhEqBgURLwUEES4EAxEtAwIRLAIBESsB2zwrgQELVi9Z9AtvoZIwbd+MTgPcIG6SMG2OINCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4nBUcAAkbrObXwQgbvLQgG8kVSCRNOIhwACOHBNfA1YtggDzySFWJb7y9IIApoohViSoVi++8vTjDgFWLaBTvIn+FDDIVjJWVU8C1CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwgQELVHQyJMhVMFA0gQEBzwCBAQHPAIEBAc8AAciBAQHPAMkBzMkCERECVjMBIG6VMFn0WTCUQTP0E+IREVYvoIEBAW2hUALsIG6SMG2ORSBu8tCAbyXIVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAsiBAQHPAIEBAc8AyQHMyeICERcCVi8BIG6VMFn0WjCUQTP0FeJ/Vh4CETByECNtbW3bPAERLAERMbVRAvbIWYIQchdvXVADyx+BAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAYRLgYFES0FBAMRLAMCESoCAREvAQzIVWDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARIhEoESIRIREnESERIBEmESARHxElER9UUgH8ER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAwREQwKERAKEJ8QjhC9EGwQexBKUwAQEDlIdhA1QQQArIIQsL/bXFAIyx9QBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhSBAQHPABKBAQHPAAHIgQEBzwASgQEBzwASgQEBzwACyIEBAc8AyVjMyQHMAERleGVjdXRlIGluY3JlYXNlIGxwIHBvc2l0aW9uIG9yZGVyAfpS0KEhqFLkoSGoEqBYoFYuoBEoESoRKBEnESkRJxEmESoRJhElESkRJREkESoRJBEjESkRIxEiESoRIhEhESkRIREgESoRIBEfESkRHxEeESoRHhEdESkRHREcESoRHBEbESkRGxEaESoRGhEZESkRGREYESoRGBEXESkRF1cC+hEWESoRFhEVESkRFREUESoRFBETESkRExESESoREhERESkREREQESoREA8RKQ8OESoODREpDQwRKgwLESkLChEqCgkRKQkIESoIBxEpBwYRKgYFESkFBBEqBAMRKQMCESoCAREpAREq2zxWFaAuqFYqqQRwIcEAkjCjkTHig1gB/IFY3VYsViKhViGogggPQkCpBFi88vSCAKaKVitWIqhWL77y9BEoESoRKBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGlkAjBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0B4vhBbyQwgUtpM1YsvhLy9FYUgQEBJFn0DW+hkjBt3yBukjBtjkPQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBukl8E4w5/WwH4IG7y0IBvJWwiMhEqES0RKhEpESwRKREoESsRKBEnES0RJxEmESwRJhElESsRJREkES0RJBEjESwRIxEiESsRIhEhES0RIREgESwRIBEfESsRHxEeES0RHhEdESwRHREcESsRHBEbES0RGxEaESwRGhEZESsRGREYES0RGFwD9hEXESwRFxEWESsRFhEVES0RFREUESwRFBETESsRExESES0REhERESwREREQESsREA8RLQ8OESwODRErDQwRLQwLESwLChErCgkRLQkIESwIBxErBwYRLQYFESwFBBErBAMRLQMRLALbPH9WGgIRLHIQI21tbds8gQEBbZO1XQH+IG6SMG2ORSBu8tCAbyXIVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAIEBAc8AAsiBAQHPAIEBAc8AyQHMyeICERICVioBIG6VMFn0WjCUQTP0FeIBESgBESrIWYIQHN0lmVADyx+BAQHPAIEBAc8AyV4B/MiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABElESgRJREkEScRJBEjESYRIxEiESURIhEhESQRIREgESMRIBEfESIRHxEeESERHhEdESARHREcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFV8AUhEUERcRFBETERYRExESERUREhERERQREREQERMREF4vDREQDRDPVSsSAfRWGIEBASNZ9A1voZIwbd8gbpIwbY470PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQB0IEBAdcAMBRDMGwUbwTigX99IW6z8vQgbvLQgG8kMREpES0RKREoESwRKBEnESsRJxEmESoRJmEB/BElES0RJREkESwRJBEjESsRIxEiESoRIhEhES0RIREgESwRIBEfESsRHxEeESoRHhEdES0RHREcESwRHBEbESsRGxEaESoRGhEZES0RGREYESwRGBEXESsRFxEWESoRFhEVES0RFREUESwRFBETESsRExESESoREhERES0REWIC9BEQESwREA8RKw8OESoODREtDQwRLAwLESsLChEqCgkRLQkIESwIBxErBwYRKgYFES0FBBEsBAMRKwMCESoCAREtAds8VhKBAQtWK1n0C2+hkjBt3yBukjBtjhbQgQEB1wCBAQHXAIEBAdcAVSBsE28D4oEUdiFus/L0jGMD9iBu8tCAbyMg2zz+FDD4I9s8/hQwgXrBIfgju/L0ggDjMSNWMb7y9BEoESsRKBEnESoRJxEmESkRJhElESsRJREkESoRJBEjESkRIxEiESsRIhEhESoRIREgESkRIBEfESsRHxEeESoRHhEdESkRHREcESsRHBEbESoRG6GhZAH8ERoRKREaERkRKxEZERgRKhEYERcRKREXERYRKxEWERURKhEVERQRKREUERMRKxETERIRKhESERERKRERERARKxEQDxEqDw4RKQ4NESsNDBEqDAsRKQsKESsKCREqCQgRKQgHESsHBhEqBgURKQUEESsEAxEqAwIRKQIBESsBZQL6ESrbPFYVgVrEAqDCAPL0VhQRKBEpESgRJxEpEScRJhEpESYRJREpESURJBEpESQRIxEpESMRIhEpESIRIREpESERIBEpESARHxEpER8RHhEpER4RHREpER0RHBEpERwRGxEpERsRGhEpERoRGREpERkRGBEpERgRFxEpEReDZgT8ERYRKREWERURKREVERQRKREUERMRKRETERIRKRESERERKRERERARKREQDxEpDw4RKQ4NESkNDBEpDAsRKQsKESkKCREpCREpCAcGVUDbPAERKgGgIMEAkjBw3oIA8ashwgDy9HAhVhW+mFYxWKhWFKkE4w0RK1YxoREtAaGJg25tZwP8/hQwyFYuINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfkA2zz+FDBWLMIAjj4wgQELbSBukjBtjhwgbvLQgG8jyFUgUCOBAQHPAIEBAc8AgQEBzwDJ4gIREwJWLgEgbpUwWfRZMJRBM/QT4uMNARETAREpoRERVi6hoWxoAfyBAQFtIG6SMG2OQCBu8tCAbyTIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMniAhEWAlYvASBulTBZ9FowlEEz9BXiAREtAREsyFmCEKcfZkRQA8sfgQEBzwCBAQHPAMlpAdDIgljAAAAAAAAAAAAAAAABActnzMlw+wADESkDAhEsAgERKAERJ8hVMIIQW8fpFFAFyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwAByIEBAc8AyQHMyWoB/siCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFO+yFmCEP1RCOdQA8sfgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARIBEoESARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERhrAKIRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDREVDQsRFAsOERMOCRERCQgREAhVdxBXBhA1REQAZFYsgQELAlYtyFUgUCOBAQHPAIEBAc8AgQEBzwDJAhETAlYuASBulTBZ9FkwlEEz9BPiAEZleGVjdXRlIGRlY3JlYXNlIHJiZiBwb3NpdGlvbiBvcmRlcgC+MPgjViyhViSgggFRgKkEVi3AAI4XVjFWJKgiVhahqAGAZLYIqAGBA+ioqQSOLCFWFaFWMgGoIqkEVi5WM1YmqCRWGKGoA4BktggTqAOBA+ioE6kEWbYIAbYJ4lYTIaAB0vhBbyQwgUtpM1YsvhLy9FYZgQEBJFn0DW+hkjBt3yBukjBtjjvQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOIgbpJfBOMOf3AB9iBu8tCAbyRsIhEqES0RKhEpESwRKREoESsRKBEnES0RJxEmESwRJhElESsRJREkES0RJBEjESwRIxEiESsRIhEhES0RIREgESwRIBEfESsRHxEeES0RHhEdESwRHREcESsRHBEbES0RGxEaESwRGhEZESsRGREYES0RGHED/hEXESwRFxEWESsRFhEVES0RFREUESwRFBETESsRExESES0REhERESwREREQESsREA8RLQ8OESwODRErDQwRLQwLESwLChErCgkRLQkIESwIBxErBwYRLQYFESwFBBErBAMRLQMCESwCAREs2zx/VhoCESxyECNtbW3bPIEBAW2TtXIB9CBukjBtjkAgbvLQgG8kyFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPABKBAQHPAAHIgQEBzwDJAczJ4gIRFwJWKgEgbpUwWfRaMJRBM/QV4gERKAERKshZghBQ6iCfUAPLH4EBAc8AgQEBzwDJcwH8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAESURKBElESQRJxEkESMRJhEjESIRJREiESERJBEhESARIxEgER8RIhEfER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVdABQERQRFxEUERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VKwH0+EFvJDAxgUtpMiOhViu+8vSBX/IiViy+8vRWF6SBAQH4QlM0+CPIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMkCERsCVhoBIG6VMFn0WjCUQTP0FeL4QlAzERl2AMDIVTCCEJnxrc5QBcsfUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAIEBAc8AAciBAQHPAMkBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARFREWERUB8lYagQEBI1n0DW+hkjBt3yBukjBtjjvQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA1AHQgQEB1wAwFEMwbBRvBOKBf30hbrPy9CBu8tCAbyQRKREuESkRKBEtESgRJxEsEScRJhErESZ4AfwRJREqESURJBEuESQRIxEtESMRIhEsESIRIRErESERIBEqESARHxEuER8RHhEtER4RHREsER0RHBErERwRGxEqERsRGhEuERoRGREtERkRGBEsERgRFxErERcRFhEqERYRFREuERURFBEtERQRExEsERMREhErERIREREqERF5A/4REBEuERAPES0PDhEsDg0RKw0MESoMCxEuCwoRLQoJESwJCBErCAcRKgcGES4GBREtBQQRLAQDESsDAhEqAgERLgHbPFYSgQELVixZ9AtvoZIwbd8gbpIwbY4W0IEBAdcAgQEB1wCBAQHXAFUgbBNvA+JwUwAwIm6zkTLjDVYWjIt6AfwRKBErESgRJxEqEScRJhEpESYRJRErESURJBEqESQRIxEpESMRIhErESIRIREqESERIBEpESARHxErER8RHhEqER4RHREpER0RHBErERwRGxEqERsRGhEpERoRGRErERkRGBEqERgRFxEpERcRFhErERYRFREqERURFBEpERR7BPoRExErERMREhEqERIREREpEREREBErERAPESoPDhEpDg0RKw0MESoMCxEpCwoRKwoJESoJCBEpCAcRKwcGESoGBREpBQQRKwQDESoDAhEpAgERKwERKts8ARErAaAgwQCSMHDeIFYUuZEw4w0RKlYroPgjViOgif4UMMhWLoOCgXwC0iDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsn5ANs8/hQwIYEBCxErIshVIFAjgQEBzwCBAQHPAIEBAc8AyQIREwIBESoBVi4BIG6VMFn0WTCUQTP0E+IRE1YroBESViuggQEBbaF9AuIgbpIwbY5AIG7y0IBvJMhVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwASgQEBzwAByIEBAc8AyQHMyeICERkCVjABIG6VMFn0WjCUQTP0FeJ/VhkCETFyECNtbW3bPAERLQERLLV+AfjIWYIQn5/fglADyx+BAQHPAIEBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAMRKQMCESgCESUeyFUwghA+h6LxUAXLH1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwCBAQHPAAHIgQEBzwDJAczJfwH0yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAK1YRyFmCEP1RCOdQA8sfgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARIBEoESARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERmAALgRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREPERcPDhEWDg0RFQ0LERQLERARExEQDBESDAkREQkIERAIVXcQVxA2RUBDAABGZXhlY3V0ZSBpbmNyZWFzZSByYmYgcG9zaXRpb24gb3JkZXIBTlYTAaFWIgGoViyoVhOpBItmJvbnVzOo/hQwINs8/hQwAREpAaARKKECUo0E2NhbGN1bGF0ZSB0b3RhbCBwbmyD+FDBwcZQgVie5iugwINs8/hQwhKEB/BEoESoRKBEnESkRJxEmESoRJhElESkRJREkESoRJBEjESkRIxEiESoRIhEhESkRIREgESoRIBEfESkRHxEeESoRHhEdESkRHREcESoRHBEbESkRGxEaESoRGhEZESkRGREYESoRGBEXESkRFxEWESoRFhEVESkRFREUESoRFIUD+hETESkRExESESoREhERESkREREQESoREA8RKQ8OESoODREpDQwRKgwLESkLChEqCgkRKQkIESoIBxEpBwYRKgYFESkFBBEqBAMRKQMCESoCAREpAREqVirbPOMAESqkESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkioiGAfgRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPhwA4DhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMAGYLIEBAVYsWfQNb6GSMG3fIG6SMG2OE9CBAQHXANIAgQEB1wBVIGwTbwPiIG6zjpogbvLQgG8jEoIoI4byb8EAANs8AREqAaARKZEw4okAPgOeEqGogigjhvJvwQAAqQTgWKGogigjhvJvwQAAqQQAYIEBAVYnAln0DW+hkjBt3yBukjBtnNDUAdAB0gBZbBJvAuIgbpIwcOAgbvLQgG8iMQAUWyBu8tCAbyMwAQCY+EFvJBAjXwOBAQtWHQJxQTP0Cm+hlAHXADCSW23icCFus5YwIG7y0ICRMeKCAKD3AfL0ggCbFyGmBvgju/L0gUGMAYEHCKD4I7zy9AHS+EFvJDCBS2kzViy+EvL0VhuBAQEkWfQNb6GSMG3fIG6SMG2OO9D6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFG8E4iBukl8E4w5/jgH2IG7y0IBvJGwiESoRLREqESkRLBEpESgRKxEoEScRLREnESYRLBEmESURKxElESQRLREkESMRLBEjESIRKxEiESERLREhESARLBEgER8RKxEfER4RLREeER0RLBEdERwRKxEcERsRLREbERoRLBEaERkRKxEZERgRLREYjwP+ERcRLBEXERYRKxEWERURLREVERQRLBEUERMRKxETERIRLRESERERLBERERARKxEQDxEtDw4RLA4NESsNDBEtDAsRLAsKESsKCREtCQgRLAgHESsHBhEtBgURLAUEESsEAxEtAwIRLAIBESzbPH9WGgIRLHIQI21tbds8gQEBbZO1kAH0IG6SMG2OQCBu8tCAbyTIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMniAhEZAlYqASBulTBZ9FowlEEz9BXiAREoAREqyFmCEH7qblNQA8sfgQEBzwCBAQHPAMmRAfzIgljAAAAAAAAAAAAAAAABActnzMlw+wARJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8RHhEhER4RHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFhEYERaSAIIRFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkUzBAC6+EFvJBAjXwNWHYEBCyJxQTP0Cm+hlAHXADCSW23icCFus5YwIG7y0ICRMeIgnIIAmxckpgb4I7vy9N4CggCg9wLHBZF/kSHi8vSznoIAmxcBgQC0oPgju/L0kTDiAagw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhCViIBxwWzkl8Ejo3UMNDSHwHAAZJfBOMN4n+VBOT6APoAMI0MnJlY2VpdmUgY3JlYXRlIGluY3JlYXNlIHJiZiBwb3NpdGlvbiBvcmRlciBvcCBjb2Rlg/hQwyCMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ+QDbPP4UMCHbPP4UMCDbPP4UMAGhoaGWAQTbPJcDyo0JGhhbmRsZUNyZWF0ZUluY3JlYXNlUkJGUG9zaXRpb25PcmRlcoP4UMPhBbyQTXwMighAL68IAoLmOlluL5nYXMgbm90IGVub3VnaI/hQw2zzgUzC54wIzM1YapIEBAVRyNPgjnJuYAabIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AEoEBAc8AAciBAQHPAMkBzMkCER4CVh0BIG6VMFn0WjCUQTP0FeJUMjERHZkB8shVMIIQnmgWLVAFyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwAByIEBAc8AyQHMyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhBbyQTXwNYoYIQC+vCAKEgwgCTMFcY4w0RFxEYEReaAYyNDNoYW5kbGVDcmVhdGVJbmNyZWFzZVJCRlBvc2l0aW9uT3JkZXIgcmVmdW5kIHRvbmNvaW6D+FDABERkBcAEScG1tbds8tQFSW9s8jQgcmVmdW5kIGZyb20gbm90IGVub3VnaCBsaXF1aWRpdHmD+FDCcAfaL9yZWZ1bmRMaXF1aWRpdHmP4UMFYgcIBAcCIRLBEwESwRKxEvESsRKhEuESoRKREtESkRKBEwESgRJxEvEScRJhEuESYRJREtESURJBEwESQRIxEvESMRIhEuESIRIREtESERIBEwESARHxEvER8RHhEuER4RHREtER2dAfwRHBEwERwRGxEvERsRGhEuERoRGREtERkRGBEwERgRFxEvERcRFhEuERYRFREtERURFBEwERQRExEvERMREhEuERIREREtEREREBEwERAPES8PDhEuDg0RLQ0METAMCxEvCwoRLgoJES0JCBEwCAcRLwcGES4GBREtBQQRMASeA/wDES8DAgERLgERLds8BBEtBAMRLAMCESoCARErARRDMG1t2zwRJBEoESQRIxEnESMRIhEmESIRIRElESERIBEkESARHxEjER8RHhEiER4RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERagtZ8AlBEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGFENTALTIghAPin6lAcofFMo/AfoCIiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZwAcoAAfoCcAHKAMkA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AHwESgRKREoEScRKREnESYRKREmESURKRElESQRKREkESMRKREjESIRKREiESERKREhESARKREgER8RKREfER4RKREeER0RKREdERwRKREcERsRKREbERoRKREaERkRKREZERgRKREYERcRKREXERYRKREWERURKREVowLkERQRKREUERMRKRETERIRKRESERERKRERERARKREQDxEpDw4RKQ4NESkNDBEpDAsRKQsKESkKCREpCREpCAcGVUDbPFcZVijIAYIQvvS/3FjLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJuKQC/MiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhBbyQTXwOCCmJaAKH4QnBYEnBtbW3bPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRG7WlAIQRGhEbERoRGREaERkRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4BYjDTHwGCEGgVR1e68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH+nAfARKBEpESgRJxEpEScRJhEpESYRJREpESURJBEpESQRIxEpESMRIhEpESIRIREpESERIBEpESARHxEpER8RHhEpER4RHREpER0RHBEpERwRGxEpERsRGhEpERoRGREpERkRGBEpERgRFxEpERcRFhEpERYRFREpERWoA/gRFBEpERQRExEpERMREhEpERIREREpEREREBEpERAPESkPDhEpDg0RKQ0MESkMCxEpCwoRKQoJESkJESkIBwZVQNs8Vx34QnBwgEAQI21tbds8EScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhuLWpAMwRIBEhESARHxEgER8RHhEfER4RHREeER0RGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4BbDDTHwGCEOzwcOy68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFlsEts8f6sB8BEoESoRKBEnESkRJxEmESoRJhElESkRJREkESoRJBEjESkRIxEiESoRIhEhESkRIREgESoRIBEfESkRHxEeESoRHhEdESkRHREcESoRHBEbESkRGxEaESoRGhEZESkRGREYESoRGBEXESkRFxEWESoRFhEVESkRFawC/hEUESoRFBETESkRExESESoREhERESkREREQESoREA8RKQ8OESoODREpDQwRKgwLESkLChEqCgkRKQkIESoIBxEpBwYRKgYFESkFBBEqBAMRKQMCESoCAREpAREq2zwCERoCgQELAgERKgERK3EhbpVbWfRZMJjIAc8AQTP0QeK4rQL6iBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGgERGwERGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVEROvrgFyERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QUD4QgF/bds8tAAgAAAAAGV4ZWN1dG9yIHNldAHwESgRKREoEScRKREnESYRKREmESURKRElESQRKREkESMRKREjESIRKREiESERKREhESARKREgER8RKREfER4RKREeER0RKREdERwRKREcERsRKREbERoRKREaERkRKREZERgRKREYERcRKREXERYRKREWERURKREVsQLkERQRKREUERMRKRETERIRKRESERERKRERERARKREQDxEpDw4RKQ4NESkNDBEpDAsRKQsKESkKCREpCREpCAcGVUDbPFcbVijIAYIQiFCxXljLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJuLIC/siCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AIgRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGhEbERoRGREaERkRGBEZERgRFxEYERe3swGeERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEw+EIBf23bPLQBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8tQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wC2AJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMACAAAAAAb3BlcmF0b3Igc2V0ABT4QlYdAccF8uCEAjTtRNDUAfhj0gAB4wIw+CjXCwqDCbry4InbPL26AfRtgggNLwBxbW1tbW1tbW1tbW1tbfhCcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiBAQv4Qn9WE7sB+AQREwQhbpVbWfRZMJjIAc8AQTP0QeL4QlYRghAdzWUAggr68ICCCcnDgHqAZHCCCA9CQFR3cSBUciVUcAFUcAARExEoERMREhEnERIREREmERERExElERMRFBEkERQREhEjERIREREiEREREBEhERAPESAPDhEfDg0RHg28AL4RFxEdERcRGBEcERgRExEbERMRFhEaERYRFREZERURFBEYERQMERcMERIRFhESCxEVCwoRFAoJERMJEREREhERERAREREQCBEQCBB+EG0QfBBrEFoQSRB4EDcQVkUDAgL42zxXKREnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFL++ADwRExEUERMREhETERIRERESEREREBERERAPERAPVQ4BuoEBAdcAgQEB1wCBAQHXAPQE1AHQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAcAB/PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATTf/QE03/UMNCBAQHXAIEBAdcAWQL0BMEAqvQE03/0BNN/1DDQgQEB1wD0BPQEgQEB1wCBAQHXAPQE03/UMND0BNN/9ATTf/QE03/UMND0BDARJREpESURJREoESURJREnESURJREmESURExEUERNZkpCi');
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
    16780: { message: `order expired` },
    19305: { message: `gas not enough` },
    22749: { message: `risk rate too hig` },
    23236: { message: `insufficient global RBF` },
    24562: { message: `execution fee not enough` },
    31425: { message: `not reach unlock time` },
    32637: { message: `order not exist` },
    39703: { message: `too early` },
    41207: { message: `invalid sender` },
    42634: { message: `legerage too high` },
    55585: { message: `only operator` },
    58161: { message: `insufficient liquidity` },
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
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CancelIncreaseRBFPositionOrder","header":203251748,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreaseRBFPositionOrder","header":1807834441,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreaseRBFPositionOrder","header":2702271213,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreaseRBFPositionOrder","header":1646684831,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreaseRBFPositionOrder","header":669742899,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelIncreaseLPPositionOrder","header":1969540622,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteIncreaseLPPositionOrder","header":1677064598,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateDecreaseLPPositionOrder","header":1912782205,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CancelDecreaseLPPositionOrder","header":1163644794,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ExecuteDecreaseLPPositionOrder","header":2377315584,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateIncreasePerpPositionMarketOrder","header":4090057726,"fields":[{"name":"token","type":{"kind":"simple","type":"string","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"acceptablePrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
    {"name":"SetOperator","header":1568312693,"fields":[{"name":"operator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetExecutor","header":3975180524,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SetUSDC","header":1746224983,"fields":[{"name":"usdc","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetExecutionFeeReceiver","header":2937854314,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"IncreaseRBFPositionCreatedEvent","header":2657621549,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseRBFPositionCancelledEvent","header":2129292883,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseRBFPositionExecutedEvent","header":2678054786,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionIncreasedEvent","header":1049076465,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseRBFPositionCreatedEvent","header":2582752718,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseRBFPositionCancelledEvent","header":1357521055,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseRBFPositionExecutedEvent","header":2803852868,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPositionDecreasedEvent","header":1539827988,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTimeAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GlobalRBFChangedEvent","header":4249946343,"fields":[{"name":"riskBufferFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionCreatedEvent","header":1533244921,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"margin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionCancelledEvent","header":484255129,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"IncreaseLPPositionExecutedEvent","header":1914138461,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionIncreasedEvent","header":2965363548,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"entryTradingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionCreatedEvent","header":918998073,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionCancelledEvent","header":2507115865,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseLPPositionExecutedEvent","header":1924045722,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trxId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LPPositionDecreasedEvent","header":3561213507,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"marginAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"liquidityAfter","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedProfit","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"realizedLoss","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
    {"name":"OperatorUpdatedEvent","header":2286989662,"fields":[{"name":"newOperator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ExecutionFeeReceiverUpdatedEvent","header":3203710940,"fields":[{"name":"newExecutionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenInfo","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"IncreaseRBFPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DecreaseRBFPositionOrder","header":null,"fields":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityDelta","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"executionFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"blockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RBFPosition","header":null,"fields":[{"name":"liquidity","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unlockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
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
]

const Pool_getters: ABIGetter[] = [
    {"name":"operator","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"usdc","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"executionFeeReceiver","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"increaseRBFPositionIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"increaseRBFPositionOrder","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"IncreaseRBFPositionOrder","optional":true}},
    {"name":"decreaseRBFPositionIndexNext","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"decreaseRBFPositionOrder","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"DecreaseRBFPositionOrder","optional":true}},
    {"name":"fundPosition","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"RBFPosition","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetOperator"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetExecutor"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetUSDC"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetExecutionFeeReceiver"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelIncreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteIncreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelDecreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteDecreaseRBFPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelIncreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteIncreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelDecreaseLPPositionOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteDecreaseLPPositionOrder"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetOperator | SetExecutor | SetUSDC | SetExecutionFeeReceiver | TokenNotification | CancelIncreaseRBFPositionOrder | ExecuteIncreaseRBFPositionOrder | CreateDecreaseRBFPositionOrder | CancelDecreaseRBFPositionOrder | ExecuteDecreaseRBFPositionOrder | CancelIncreaseLPPositionOrder | ExecuteIncreaseLPPositionOrder | CreateDecreaseLPPositionOrder | CancelDecreaseLPPositionOrder | ExecuteDecreaseLPPositionOrder | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetOperator') {
            body = beginCell().store(storeSetOperator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetExecutor') {
            body = beginCell().store(storeSetExecutor(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetUSDC') {
            body = beginCell().store(storeSetUSDC(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetExecutionFeeReceiver') {
            body = beginCell().store(storeSetExecutionFeeReceiver(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelIncreaseRBFPositionOrder') {
            body = beginCell().store(storeCancelIncreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteIncreaseRBFPositionOrder') {
            body = beginCell().store(storeExecuteIncreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreaseRBFPositionOrder') {
            body = beginCell().store(storeCreateDecreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelDecreaseRBFPositionOrder') {
            body = beginCell().store(storeCancelDecreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteDecreaseRBFPositionOrder') {
            body = beginCell().store(storeExecuteDecreaseRBFPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelIncreaseLPPositionOrder') {
            body = beginCell().store(storeCancelIncreaseLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteIncreaseLPPositionOrder') {
            body = beginCell().store(storeExecuteIncreaseLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreaseLPPositionOrder') {
            body = beginCell().store(storeCreateDecreaseLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelDecreaseLPPositionOrder') {
            body = beginCell().store(storeCancelDecreaseLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteDecreaseLPPositionOrder') {
            body = beginCell().store(storeExecuteDecreaseLPPositionOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOperator(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('operator', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getUsdc(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('usdc', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getExecutionFeeReceiver(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('executionFeeReceiver', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getIncreaseRbfPositionIndexNext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('increaseRBFPositionIndexNext', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getIncreaseRbfPositionOrder(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('increaseRBFPositionOrder', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleIncreaseRBFPositionOrder(result_p) : null;
        return result;
    }
    
    async getDecreaseRbfPositionIndexNext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('decreaseRBFPositionIndexNext', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDecreaseRbfPositionOrder(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('decreaseRBFPositionOrder', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleDecreaseRBFPositionOrder(result_p) : null;
        return result;
    }
    
    async getFundPosition(provider: ContractProvider, account: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('fundPosition', builder.build())).stack;
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