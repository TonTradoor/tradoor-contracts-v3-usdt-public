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

function loadGetterTupleStateInit(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
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

function loadGetterTupleSendParameters(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
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

function loadGetterTupleDeploy(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
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

function loadGetterTupleDeployOk(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
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

function loadGetterTupleFactoryDeploy(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
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

function loadGetterTupleChangeOwner(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
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

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonMint(src: JettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2310479113, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310479113) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    }
}

export type UpdateConfig = {
    $$type: 'UpdateConfig';
    orderLockTime: bigint | null;
    maxLpNetCap: bigint | null;
    lpRolloverFeeRate: bigint | null;
    gasConfig: GasConfig | null;
    executorConfig: ExecutorConfig | null;
    contractConfig: ContractConfig | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3258856372, 32);
        if (src.orderLockTime !== null && src.orderLockTime !== undefined) { b_0.storeBit(true).storeUint(src.orderLockTime, 32); } else { b_0.storeBit(false); }
        if (src.maxLpNetCap !== null && src.maxLpNetCap !== undefined) { b_0.storeBit(true).storeCoins(src.maxLpNetCap); } else { b_0.storeBit(false); }
        if (src.lpRolloverFeeRate !== null && src.lpRolloverFeeRate !== undefined) { b_0.storeBit(true).storeUint(src.lpRolloverFeeRate, 32); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.gasConfig !== null && src.gasConfig !== undefined) { b_1.storeBit(true); b_1.store(storeGasConfig(src.gasConfig)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.executorConfig !== null && src.executorConfig !== undefined) { b_2.storeBit(true); b_2.store(storeExecutorConfig(src.executorConfig)); } else { b_2.storeBit(false); }
        let b_3 = new Builder();
        if (src.contractConfig !== null && src.contractConfig !== undefined) { b_3.storeBit(true); b_3.store(storeContractConfig(src.contractConfig)); } else { b_3.storeBit(false); }
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3258856372) { throw Error('Invalid prefix'); }
    let _orderLockTime = sc_0.loadBit() ? sc_0.loadUintBig(32) : null;
    let _maxLpNetCap = sc_0.loadBit() ? sc_0.loadCoins() : null;
    let _lpRolloverFeeRate = sc_0.loadBit() ? sc_0.loadUintBig(32) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConfig = sc_1.loadBit() ? loadGasConfig(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _executorConfig = sc_2.loadBit() ? loadExecutorConfig(sc_2) : null;
    let sc_3 = sc_2.loadRef().beginParse();
    let _contractConfig = sc_3.loadBit() ? loadContractConfig(sc_3) : null;
    return { $$type: 'UpdateConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumberOpt();
    let _maxLpNetCap = source.readBigNumberOpt();
    let _lpRolloverFeeRate = source.readBigNumberOpt();
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadGetterTupleUpdateConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumberOpt();
    let _maxLpNetCap = source.readBigNumberOpt();
    let _lpRolloverFeeRate = source.readBigNumberOpt();
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
    if (source.gasConfig !== null && source.gasConfig !== undefined) {
        builder.writeTuple(storeTupleGasConfig(source.gasConfig));
    } else {
        builder.writeTuple(null);
    }
    if (source.executorConfig !== null && source.executorConfig !== undefined) {
        builder.writeTuple(storeTupleExecutorConfig(source.executorConfig));
    } else {
        builder.writeTuple(null);
    }
    if (source.contractConfig !== null && source.contractConfig !== undefined) {
        builder.writeTuple(storeTupleContractConfig(source.contractConfig));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserUpdateConfig(): DictionaryValue<UpdateConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateConfig(src.loadRef().beginParse());
        }
    }
}

export type ListToken = {
    $$type: 'ListToken';
    tokenId: bigint;
    config: TokenConfig;
}

export function storeListToken(src: ListToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(567610288, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.store(storeTokenConfig(src.config));
    };
}

export function loadListToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 567610288) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _config = loadTokenConfig(sc_0);
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function loadTupleListToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    const _config = loadTupleTokenConfig(source.readTuple());
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function loadGetterTupleListToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    const _config = loadGetterTupleTokenConfig(source);
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function storeTupleListToken(source: ListToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeTuple(storeTupleTokenConfig(source.config));
    return builder.build();
}

function dictValueParserListToken(): DictionaryValue<ListToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeListToken(src)).endCell());
        },
        parse: (src) => {
            return loadListToken(src.loadRef().beginParse());
        }
    }
}

export type DelistToken = {
    $$type: 'DelistToken';
    tokenId: bigint;
}

export function storeDelistToken(src: DelistToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2604852463, 32);
        b_0.storeUint(src.tokenId, 16);
    };
}

export function loadDelistToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2604852463) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    return { $$type: 'DelistToken' as const, tokenId: _tokenId };
}

function loadTupleDelistToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    return { $$type: 'DelistToken' as const, tokenId: _tokenId };
}

function loadGetterTupleDelistToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    return { $$type: 'DelistToken' as const, tokenId: _tokenId };
}

function storeTupleDelistToken(source: DelistToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    return builder.build();
}

function dictValueParserDelistToken(): DictionaryValue<DelistToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDelistToken(src)).endCell());
        },
        parse: (src) => {
            return loadDelistToken(src.loadRef().beginParse());
        }
    }
}

export type ClaimProtocolFee = {
    $$type: 'ClaimProtocolFee';
    trxId: bigint;
    feeReceiver: Address;
}

export function storeClaimProtocolFee(src: ClaimProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4273121126, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.feeReceiver);
    };
}

export function loadClaimProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4273121126) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _feeReceiver = sc_0.loadAddress();
    return { $$type: 'ClaimProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver };
}

function loadTupleClaimProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _feeReceiver = source.readAddress();
    return { $$type: 'ClaimProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver };
}

function loadGetterTupleClaimProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _feeReceiver = source.readAddress();
    return { $$type: 'ClaimProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver };
}

function storeTupleClaimProtocolFee(source: ClaimProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.feeReceiver);
    return builder.build();
}

function dictValueParserClaimProtocolFee(): DictionaryValue<ClaimProtocolFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadClaimProtocolFee(src.loadRef().beginParse());
        }
    }
}

export type CancelLiquidityOrder = {
    $$type: 'CancelLiquidityOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeCancelLiquidityOrder(src: CancelLiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1209955681, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCancelLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1209955681) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CancelLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCancelLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CancelLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadGetterTupleCancelLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CancelLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCancelLiquidityOrder(source: CancelLiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCancelLiquidityOrder(): DictionaryValue<CancelLiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteLiquidityOrder = {
    $$type: 'ExecuteLiquidityOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
    prices: Dictionary<number, bigint>;
    lpFundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeExecuteLiquidityOrder(src: ExecuteLiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2882492539, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeDict(src.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128));
        b_0.storeCoins(src.lpFundingFeeGrowth);
        b_0.storeCoins(src.rolloverFeeGrowth);
    };
}

export function loadExecuteLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2882492539) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _prices = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), sc_0);
    let _lpFundingFeeGrowth = sc_0.loadCoins();
    let _rolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'ExecuteLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleExecuteLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecuteLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleExecuteLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecuteLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleExecuteLiquidityOrder(source: ExecuteLiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128)).endCell() : null);
    builder.writeNumber(source.lpFundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserExecuteLiquidityOrder(): DictionaryValue<ExecuteLiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreasePerpOrder = {
    $$type: 'CreateDecreasePerpOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    trxId: bigint;
    requestTime: bigint;
}

export function storeCreateDecreasePerpOrder(src: CreateDecreasePerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4009071181, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.requestTime, 32);
    };
}

export function loadCreateDecreasePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4009071181) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    let _requestTime = sc_0.loadUintBig(32);
    return { $$type: 'CreateDecreasePerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId, requestTime: _requestTime };
}

function loadTupleCreateDecreasePerpOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId, requestTime: _requestTime };
}

function loadGetterTupleCreateDecreasePerpOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId, requestTime: _requestTime };
}

function storeTupleCreateDecreasePerpOrder(source: CreateDecreasePerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.requestTime);
    return builder.build();
}

function dictValueParserCreateDecreasePerpOrder(): DictionaryValue<CreateDecreasePerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDecreasePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreasePerpOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateTpSlPerpOrder = {
    $$type: 'CreateTpSlPerpOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    trxId: bigint;
    requestTime: bigint;
}

export function storeCreateTpSlPerpOrder(src: CreateTpSlPerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4182737083, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.tpSize);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeCoins(src.slSize);
        b_0.storeUint(src.slPrice, 128);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.requestTime, 32);
    };
}

export function loadCreateTpSlPerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4182737083) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _tpSize = sc_0.loadCoins();
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadCoins();
    let _slPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    let _requestTime = sc_0.loadUintBig(32);
    return { $$type: 'CreateTpSlPerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId, requestTime: _requestTime };
}

function loadTupleCreateTpSlPerpOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'CreateTpSlPerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId, requestTime: _requestTime };
}

function loadGetterTupleCreateTpSlPerpOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'CreateTpSlPerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId, requestTime: _requestTime };
}

function storeTupleCreateTpSlPerpOrder(source: CreateTpSlPerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.requestTime);
    return builder.build();
}

function dictValueParserCreateTpSlPerpOrder(): DictionaryValue<CreateTpSlPerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateTpSlPerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateTpSlPerpOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelPerpOrder = {
    $$type: 'CancelPerpOrder';
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelPerpOrder(src: CancelPerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(161477795, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCancelPerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 161477795) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CancelPerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelPerpOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelPerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleCancelPerpOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelPerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelPerpOrder(source: CancelPerpOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelPerpOrder(): DictionaryValue<CancelPerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelPerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelPerpOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecutePerpOrder = {
    $$type: 'ExecutePerpOrder';
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
    tokenId: bigint;
    price: bigint;
    premiumRate: bigint;
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeExecutePerpOrder(src: ExecutePerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(744005585, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeUint(src.price, 128);
        b_0.storeUint(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        b_0.storeInt(src.rolloverFeeGrowth, 128);
    };
}

export function loadExecutePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 744005585) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(16);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadUintBig(32);
    let _fundingFeeGrowth = sc_0.loadIntBig(128);
    let _rolloverFeeGrowth = sc_0.loadIntBig(128);
    return { $$type: 'ExecutePerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleExecutePerpOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecutePerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleExecutePerpOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecutePerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleExecutePerpOrder(source: ExecutePerpOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserExecutePerpOrder(): DictionaryValue<ExecutePerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecutePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecutePerpOrder(src.loadRef().beginParse());
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
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeLiquidatePerpPosition(src: LiquidatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(459845715, 32);
        b_0.storeAddress(src.liquidationFeeReceiver);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeUint(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        let b_1 = new Builder();
        b_1.storeInt(src.rolloverFeeGrowth, 128);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 459845715) { throw Error('Invalid prefix'); }
    let _liquidationFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadUintBig(32);
    let _fundingFeeGrowth = sc_0.loadIntBig(128);
    let sc_1 = sc_0.loadRef().beginParse();
    let _rolloverFeeGrowth = sc_1.loadIntBig(128);
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleLiquidatePerpPosition(source: TupleReader) {
    let _liquidationFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleLiquidatePerpPosition(source: TupleReader) {
    let _liquidationFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserLiquidatePerpPosition(): DictionaryValue<LiquidatePerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidatePerpPosition(src)).endCell());
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
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeADLPerpPosition(src: ADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1014255639, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeUint(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        let b_1 = new Builder();
        b_1.storeInt(src.rolloverFeeGrowth, 128);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1014255639) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadUintBig(32);
    let _fundingFeeGrowth = sc_0.loadIntBig(128);
    let sc_1 = sc_0.loadRef().beginParse();
    let _rolloverFeeGrowth = sc_1.loadIntBig(128);
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserADLPerpPosition(): DictionaryValue<ADLPerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeADLPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadADLPerpPosition(src.loadRef().beginParse());
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
        b_0.storeUint(4231235453, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4231235453) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
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

function loadGetterTupleCreateCompensate(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCreateCompensate(src.loadRef().beginParse());
        }
    }
}

export type ExecuteOrCancelCompensate = {
    $$type: 'ExecuteOrCancelCompensate';
    isCancel: boolean;
    compensateId: bigint;
    trxId: bigint;
}

export function storeExecuteOrCancelCompensate(src: ExecuteOrCancelCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2296903975, 32);
        b_0.storeBit(src.isCancel);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadExecuteOrCancelCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2296903975) { throw Error('Invalid prefix'); }
    let _isCancel = sc_0.loadBit();
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleExecuteOrCancelCompensate(source: TupleReader) {
    let _isCancel = source.readBoolean();
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function loadGetterTupleExecuteOrCancelCompensate(source: TupleReader) {
    let _isCancel = source.readBoolean();
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleExecuteOrCancelCompensate(source: ExecuteOrCancelCompensate) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isCancel);
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteOrCancelCompensate(): DictionaryValue<ExecuteOrCancelCompensate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteOrCancelCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteOrCancelCompensate(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrderCreatedEvent = {
    $$type: 'LiquidityOrderCreatedEvent';
    opType: bigint;
    account: Address;
    jettonDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLiquidityOrderCreatedEvent(src: LiquidityOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3301974244, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLiquidityOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3301974244) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _jettonDelta = sc_0.loadCoins();
    let _executionFee = sc_0.loadCoins();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LiquidityOrderCreatedEvent' as const, opType: _opType, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadTupleLiquidityOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCreatedEvent' as const, opType: _opType, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleLiquidityOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCreatedEvent' as const, opType: _opType, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function storeTupleLiquidityOrderCreatedEvent(source: LiquidityOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidityOrderCreatedEvent(): DictionaryValue<LiquidityOrderCreatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrderCancelledEvent = {
    $$type: 'LiquidityOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLiquidityOrderCancelledEvent(src: LiquidityOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3115334844, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLiquidityOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3115334844) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LiquidityOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLiquidityOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleLiquidityOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLiquidityOrderCancelledEvent(source: LiquidityOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidityOrderCancelledEvent(): DictionaryValue<LiquidityOrderCancelledEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type LiquidityPoolUpdatedEvent = {
    $$type: 'LiquidityPoolUpdatedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    account: Address;
    jettonDelta: bigint;
    tlpDelta: bigint;
    tlpPrice: bigint;
    tlpSupply: bigint;
    lpFundAfter: bigint;
    entryLpFundingFeeGrowth: bigint;
    entryRolloverFeeGrowth: bigint;
}

export function storeLiquidityPoolUpdatedEvent(src: LiquidityPoolUpdatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3727818557, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeCoins(src.tlpDelta);
        b_0.storeUint(src.tlpPrice, 128);
        b_0.storeCoins(src.tlpSupply);
        let b_1 = new Builder();
        b_1.storeInt(src.lpFundAfter, 128);
        b_1.storeCoins(src.entryLpFundingFeeGrowth);
        b_1.storeCoins(src.entryRolloverFeeGrowth);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidityPoolUpdatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3727818557) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _jettonDelta = sc_0.loadCoins();
    let _tlpDelta = sc_0.loadCoins();
    let _tlpPrice = sc_0.loadUintBig(128);
    let _tlpSupply = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpFundAfter = sc_1.loadIntBig(128);
    let _entryLpFundingFeeGrowth = sc_1.loadCoins();
    let _entryRolloverFeeGrowth = sc_1.loadCoins();
    return { $$type: 'LiquidityPoolUpdatedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadTupleLiquidityPoolUpdatedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidityPoolUpdatedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadGetterTupleLiquidityPoolUpdatedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidityPoolUpdatedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function storeTupleLiquidityPoolUpdatedEvent(source: LiquidityPoolUpdatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.tlpDelta);
    builder.writeNumber(source.tlpPrice);
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.entryLpFundingFeeGrowth);
    builder.writeNumber(source.entryRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserLiquidityPoolUpdatedEvent(): DictionaryValue<LiquidityPoolUpdatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityPoolUpdatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityPoolUpdatedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderCreatedEvent = {
    $$type: 'PerpOrderCreatedEvent';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
    blockTime: bigint;
    requestTime: bigint;
}

export function storePerpOrderCreatedEvent(src: PerpOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1726957151, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeBit(src.triggerAbove);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.blockTime, 32);
        b_0.storeUint(src.requestTime, 32);
    };
}

export function loadPerpOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1726957151) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _triggerAbove = sc_0.loadBit();
    let _executionFee = sc_0.loadCoins();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _blockTime = sc_0.loadUintBig(32);
    let _requestTime = sc_0.loadUintBig(32);
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, blockTime: _blockTime, requestTime: _requestTime };
}

function loadTuplePerpOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, blockTime: _blockTime, requestTime: _requestTime };
}

function loadGetterTuplePerpOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, blockTime: _blockTime, requestTime: _requestTime };
}

function storeTuplePerpOrderCreatedEvent(source: PerpOrderCreatedEvent) {
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
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.blockTime);
    builder.writeNumber(source.requestTime);
    return builder.build();
}

function dictValueParserPerpOrderCreatedEvent(): DictionaryValue<PerpOrderCreatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderCancelledEvent = {
    $$type: 'PerpOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpOrderCancelledEvent(src: PerpOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4073041580, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4073041580) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadGetterTuplePerpOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpOrderCancelledEvent(source: PerpOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpOrderCancelledEvent(): DictionaryValue<PerpOrderCancelledEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionIncreasedEvent = {
    $$type: 'PerpPositionIncreasedEvent';
    trxId: bigint;
    orderId: bigint;
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
    rolloverFee: bigint;
    tradingFee: bigint;
    entryFundingFeeGrowthAfter: bigint;
    entryRolloverFeeGrowthAfter: bigint;
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(791417061, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 128);
        b_0.storeCoins(src.marginAfter);
        b_0.storeInt(src.sizeDelta, 128);
        b_0.storeCoins(src.sizeAfter);
        let b_1 = new Builder();
        b_1.storeUint(src.tradePrice, 128);
        b_1.storeUint(src.entryPrice, 128);
        b_1.storeInt(src.fundingFee, 128);
        b_1.storeCoins(src.rolloverFee);
        b_1.storeCoins(src.tradingFee);
        b_1.storeInt(src.entryFundingFeeGrowthAfter, 128);
        b_1.storeInt(src.entryRolloverFeeGrowthAfter, 128);
        b_1.storeCoins(src.globalLongMarginAfter);
        let b_2 = new Builder();
        b_2.storeCoins(src.globalShortMarginAfter);
        b_2.storeCoins(src.globalLongSizeAfter);
        b_2.storeCoins(src.globalShortSizeAfter);
        b_2.storeCoins(src.lpNetSizeAfter);
        b_2.storeBit(src.lpIsLong);
        b_2.storeUint(src.lpEntryPriceAfter, 128);
        b_2.storeInt(src.lpFundAfter, 128);
        b_2.storeCoins(src.lpTradingFee);
        b_2.storeInt(src.lpRealizedPnl, 128);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 791417061) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(128);
    let _marginAfter = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadIntBig(128);
    let _sizeAfter = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tradePrice = sc_1.loadUintBig(128);
    let _entryPrice = sc_1.loadUintBig(128);
    let _fundingFee = sc_1.loadIntBig(128);
    let _rolloverFee = sc_1.loadCoins();
    let _tradingFee = sc_1.loadCoins();
    let _entryFundingFeeGrowthAfter = sc_1.loadIntBig(128);
    let _entryRolloverFeeGrowthAfter = sc_1.loadIntBig(128);
    let _globalLongMarginAfter = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _globalShortMarginAfter = sc_2.loadCoins();
    let _globalLongSizeAfter = sc_2.loadCoins();
    let _globalShortSizeAfter = sc_2.loadCoins();
    let _lpNetSizeAfter = sc_2.loadCoins();
    let _lpIsLong = sc_2.loadBit();
    let _lpEntryPriceAfter = sc_2.loadUintBig(128);
    let _lpFundAfter = sc_2.loadIntBig(128);
    let _lpTradingFee = sc_2.loadCoins();
    let _lpRealizedPnl = sc_2.loadIntBig(128);
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadTuplePerpPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
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
    source = source.readTuple();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadGetterTuplePerpPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
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
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function storeTuplePerpPositionIncreasedEvent(source: PerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
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
    builder.writeNumber(source.rolloverFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.entryRolloverFeeGrowthAfter);
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    return builder.build();
}

function dictValueParserPerpPositionIncreasedEvent(): DictionaryValue<PerpPositionIncreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionDecreasedEvent = {
    $$type: 'PerpPositionDecreasedEvent';
    trxId: bigint;
    orderId: bigint;
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
    realizedPnLDelta: bigint;
    fundingFee: bigint;
    rolloverFee: bigint;
    tradingFee: bigint;
    entryFundingFeeGrowthAfter: bigint;
    entryRolloverFeeGrowthAfter: bigint;
    payout: bigint;
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4253829579, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 128);
        b_0.storeCoins(src.marginAfter);
        b_0.storeInt(src.sizeDelta, 128);
        b_0.storeCoins(src.sizeAfter);
        let b_1 = new Builder();
        b_1.storeUint(src.tradePrice, 128);
        b_1.storeUint(src.entryPrice, 128);
        b_1.storeInt(src.realizedPnLDelta, 128);
        b_1.storeInt(src.fundingFee, 128);
        b_1.storeCoins(src.rolloverFee);
        b_1.storeCoins(src.tradingFee);
        b_1.storeInt(src.entryFundingFeeGrowthAfter, 128);
        b_1.storeInt(src.entryRolloverFeeGrowthAfter, 128);
        let b_2 = new Builder();
        b_2.storeCoins(src.payout);
        b_2.storeCoins(src.globalLongMarginAfter);
        b_2.storeCoins(src.globalShortMarginAfter);
        b_2.storeCoins(src.globalLongSizeAfter);
        b_2.storeCoins(src.globalShortSizeAfter);
        b_2.storeCoins(src.lpNetSizeAfter);
        b_2.storeBit(src.lpIsLong);
        b_2.storeUint(src.lpEntryPriceAfter, 128);
        b_2.storeInt(src.lpFundAfter, 128);
        let b_3 = new Builder();
        b_3.storeCoins(src.lpTradingFee);
        b_3.storeInt(src.lpRealizedPnl, 128);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4253829579) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(128);
    let _marginAfter = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadIntBig(128);
    let _sizeAfter = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tradePrice = sc_1.loadUintBig(128);
    let _entryPrice = sc_1.loadUintBig(128);
    let _realizedPnLDelta = sc_1.loadIntBig(128);
    let _fundingFee = sc_1.loadIntBig(128);
    let _rolloverFee = sc_1.loadCoins();
    let _tradingFee = sc_1.loadCoins();
    let _entryFundingFeeGrowthAfter = sc_1.loadIntBig(128);
    let _entryRolloverFeeGrowthAfter = sc_1.loadIntBig(128);
    let sc_2 = sc_1.loadRef().beginParse();
    let _payout = sc_2.loadCoins();
    let _globalLongMarginAfter = sc_2.loadCoins();
    let _globalShortMarginAfter = sc_2.loadCoins();
    let _globalLongSizeAfter = sc_2.loadCoins();
    let _globalShortSizeAfter = sc_2.loadCoins();
    let _lpNetSizeAfter = sc_2.loadCoins();
    let _lpIsLong = sc_2.loadBit();
    let _lpEntryPriceAfter = sc_2.loadUintBig(128);
    let _lpFundAfter = sc_2.loadIntBig(128);
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpTradingFee = sc_3.loadCoins();
    let _lpRealizedPnl = sc_3.loadIntBig(128);
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadTuplePerpPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
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
    let _realizedPnLDelta = source.readBigNumber();
    source = source.readTuple();
    let _fundingFee = source.readBigNumber();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _payout = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    source = source.readTuple();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadGetterTuplePerpPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
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
    let _realizedPnLDelta = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _payout = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function storeTuplePerpPositionDecreasedEvent(source: PerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
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
    builder.writeNumber(source.realizedPnLDelta);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.rolloverFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.entryRolloverFeeGrowthAfter);
    builder.writeNumber(source.payout);
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    return builder.build();
}

function dictValueParserPerpPositionDecreasedEvent(): DictionaryValue<PerpPositionDecreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionDecreasedEvent(src.loadRef().beginParse());
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
        b_0.storeUint(2519251606, 32);
        b_0.storeUint(src.compensateId, 64);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
        let b_1 = new Builder();
        b_1.storeUint(src.unlockTime, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2519251606) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _unlockTime = sc_1.loadUintBig(32);
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

function loadGetterTupleCompensateCreatedEvent(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateCreatedEvent(src)).endCell());
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

function loadGetterTupleCompensateCancelledEvent(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateCancelledEvent(src)).endCell());
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

function loadGetterTupleCompensateExecutedEvent(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type AccountInfo = {
    $$type: 'AccountInfo';
    isExecutor: boolean;
    isCompensator: boolean;
    isClaimer: boolean;
}

export function storeAccountInfo(src: AccountInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isExecutor);
        b_0.storeBit(src.isCompensator);
        b_0.storeBit(src.isClaimer);
    };
}

export function loadAccountInfo(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit();
    let _isCompensator = sc_0.loadBit();
    let _isClaimer = sc_0.loadBit();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer };
}

function loadTupleAccountInfo(source: TupleReader) {
    let _isExecutor = source.readBoolean();
    let _isCompensator = source.readBoolean();
    let _isClaimer = source.readBoolean();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer };
}

function loadGetterTupleAccountInfo(source: TupleReader) {
    let _isExecutor = source.readBoolean();
    let _isCompensator = source.readBoolean();
    let _isClaimer = source.readBoolean();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer };
}

function storeTupleAccountInfo(source: AccountInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeBoolean(source.isCompensator);
    builder.writeBoolean(source.isClaimer);
    return builder.build();
}

function dictValueParserAccountInfo(): DictionaryValue<AccountInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountInfo(src)).endCell());
        },
        parse: (src) => {
            return loadAccountInfo(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    orderLockTime: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasForTransferJetton: bigint;
    gasForBurnTlp: bigint;
    gasForMintTlp: bigint;
    tlpWallet: Address;
    jettonWallet: Address;
    tlpJetton: Address;
    maxLpNetCap: bigint;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.lpMinExecutionFee);
        b_0.storeCoins(src.perpMinExecutionFee);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeCoins(src.gasForTransferJetton);
        b_0.storeCoins(src.gasForBurnTlp);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasForMintTlp);
        b_1.storeAddress(src.tlpWallet);
        b_1.storeAddress(src.jettonWallet);
        b_1.storeAddress(src.tlpJetton);
        let b_2 = new Builder();
        b_2.storeCoins(src.maxLpNetCap);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _orderLockTime = sc_0.loadUintBig(32);
    let _lpMinExecutionFee = sc_0.loadCoins();
    let _perpMinExecutionFee = sc_0.loadCoins();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _gasForTransferJetton = sc_0.loadCoins();
    let _gasForBurnTlp = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasForMintTlp = sc_1.loadCoins();
    let _tlpWallet = sc_1.loadAddress();
    let _jettonWallet = sc_1.loadAddress();
    let _tlpJetton = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _maxLpNetCap = sc_2.loadCoins();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadGetterTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasForTransferJetton);
    builder.writeNumber(source.gasForBurnTlp);
    builder.writeNumber(source.gasForMintTlp);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.tlpJetton);
    builder.writeNumber(source.maxLpNetCap);
    return builder.build();
}

function dictValueParserConfigData(): DictionaryValue<ConfigData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeConfigData(src)).endCell());
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
    minValue: bigint;
    maxValue: bigint;
    maxLeverage: bigint;
    liquidationFee: bigint;
    maintenanceRate: bigint;
    tradingFeeRate: bigint;
    lpTradingFeeRate: bigint;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
        b_0.storeCoins(src.minValue);
        b_0.storeCoins(src.maxValue);
        b_0.storeUint(src.maxLeverage, 16);
        b_0.storeCoins(src.liquidationFee);
        b_0.storeUint(src.maintenanceRate, 32);
        b_0.storeUint(src.tradingFeeRate, 32);
        b_0.storeUint(src.lpTradingFeeRate, 32);
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _minValue = sc_0.loadCoins();
    let _maxValue = sc_0.loadCoins();
    let _maxLeverage = sc_0.loadUintBig(16);
    let _liquidationFee = sc_0.loadCoins();
    let _maintenanceRate = sc_0.loadUintBig(32);
    let _tradingFeeRate = sc_0.loadUintBig(32);
    let _lpTradingFeeRate = sc_0.loadUintBig(32);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minValue = source.readBigNumber();
    let _maxValue = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function loadGetterTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _minValue = source.readBigNumber();
    let _maxValue = source.readBigNumber();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, minValue: _minValue, maxValue: _maxValue, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.minValue);
    builder.writeNumber(source.maxValue);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.maintenanceRate);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    return builder.build();
}

function dictValueParserTokenConfig(): DictionaryValue<TokenConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadTokenConfig(src.loadRef().beginParse());
        }
    }
}

export type PoolStat = {
    $$type: 'PoolStat';
    tlpSupply: bigint;
    totalExecutionFee: bigint;
    protocolTradingFee: bigint;
    globalLPFund: bigint;
    globalLPUnrealizedPnl: bigint;
    globalLpFundingFeeGrowth: bigint;
    globalRolloverFeeGrowth: bigint;
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
}

export function storePoolStat(src: PoolStat) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tlpSupply);
        b_0.storeCoins(src.totalExecutionFee);
        b_0.storeCoins(src.protocolTradingFee);
        b_0.storeInt(src.globalLPFund, 128);
        b_0.storeInt(src.globalLPUnrealizedPnl, 128);
        b_0.storeCoins(src.globalLpFundingFeeGrowth);
        b_0.storeCoins(src.globalRolloverFeeGrowth);
        b_0.storeCoins(src.globalPerpNetValue);
        let b_1 = new Builder();
        b_1.storeCoins(src.globalPerpSingleValue);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolStat(slice: Slice) {
    let sc_0 = slice;
    let _tlpSupply = sc_0.loadCoins();
    let _totalExecutionFee = sc_0.loadCoins();
    let _protocolTradingFee = sc_0.loadCoins();
    let _globalLPFund = sc_0.loadIntBig(128);
    let _globalLPUnrealizedPnl = sc_0.loadIntBig(128);
    let _globalLpFundingFeeGrowth = sc_0.loadCoins();
    let _globalRolloverFeeGrowth = sc_0.loadCoins();
    let _globalPerpNetValue = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalPerpSingleValue = sc_1.loadCoins();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function loadTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    let _globalPerpNetValue = source.readBigNumber();
    let _globalPerpSingleValue = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function loadGetterTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    let _globalPerpNetValue = source.readBigNumber();
    let _globalPerpSingleValue = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function storeTuplePoolStat(source: PoolStat) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.totalExecutionFee);
    builder.writeNumber(source.protocolTradingFee);
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLPUnrealizedPnl);
    builder.writeNumber(source.globalLpFundingFeeGrowth);
    builder.writeNumber(source.globalRolloverFeeGrowth);
    builder.writeNumber(source.globalPerpNetValue);
    builder.writeNumber(source.globalPerpSingleValue);
    return builder.build();
}

function dictValueParserPoolStat(): DictionaryValue<PoolStat> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolStat(src)).endCell());
        },
        parse: (src) => {
            return loadPoolStat(src.loadRef().beginParse());
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

function loadGetterTupleAccountPerpPosition(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountPerpPosition(src)).endCell());
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

function loadGetterTupleDirectionPerpPosition(source: TupleReader) {
    const _longPosition = loadGetterTuplePerpPosition(source);
    const _shortPosition = loadGetterTuplePerpPosition(source);
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDirectionPerpPosition(src)).endCell());
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
    entryRolloverFeeGrowth: bigint;
}

export function storePerpPosition(src: PerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.positionId, 64);
        b_0.storeCoins(src.margin);
        b_0.storeCoins(src.size);
        b_0.storeUint(src.entryPrice, 128);
        b_0.storeInt(src.entryFundingFeeGrowth, 128);
        b_0.storeInt(src.entryRolloverFeeGrowth, 128);
    };
}

export function loadPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadUintBig(64);
    let _margin = sc_0.loadCoins();
    let _size = sc_0.loadCoins();
    let _entryPrice = sc_0.loadUintBig(128);
    let _entryFundingFeeGrowth = sc_0.loadIntBig(128);
    let _entryRolloverFeeGrowth = sc_0.loadIntBig(128);
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadTuplePerpPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _size = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadGetterTuplePerpPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _size = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function storeTuplePerpPosition(source: PerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeNumber(source.margin);
    builder.writeNumber(source.size);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.entryFundingFeeGrowth);
    builder.writeNumber(source.entryRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserPerpPosition(): DictionaryValue<PerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPosition(src)).endCell());
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
}

export function storeGlobalLPPosition(src: GlobalLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.netSize);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.entryPrice, 128);
    };
}

export function loadGlobalLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _netSize = sc_0.loadCoins();
    let _isLong = sc_0.loadBit();
    let _entryPrice = sc_0.loadUintBig(128);
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function loadTupleGlobalLPPosition(source: TupleReader) {
    let _netSize = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPrice = source.readBigNumber();
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function loadGetterTupleGlobalLPPosition(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGlobalLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPPosition(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionData = {
    $$type: 'PerpPositionData';
    perpPosition: DirectionPerpPosition;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeDirectionPerpPosition(src.perpPosition));
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_0.storeBit(true); b_0.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalPosition(src.globalPosition)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _perpPosition = loadDirectionPerpPosition(sc_0);
    let _globalLPPosition = sc_0.loadBit() ? loadGlobalLPPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalPosition = sc_1.loadBit() ? loadGlobalPosition(sc_1) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function loadTuplePerpPositionData(source: TupleReader) {
    const _perpPosition = loadTupleDirectionPerpPosition(source.readTuple());
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function loadGetterTuplePerpPositionData(source: TupleReader) {
    const _perpPosition = loadGetterTupleDirectionPerpPosition(source);
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function storeTuplePerpPositionData(source: PerpPositionData) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleDirectionPerpPosition(source.perpPosition));
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
    return builder.build();
}

function dictValueParserPerpPositionData(): DictionaryValue<PerpPositionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionData(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionData(src.loadRef().beginParse());
        }
    }
}

export type GlobalPosition = {
    $$type: 'GlobalPosition';
    longMargin: bigint;
    shortMargin: bigint;
    longSize: bigint;
    shortSize: bigint;
    longValue: bigint;
    shortValue: bigint;
}

export function storeGlobalPosition(src: GlobalPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.longMargin);
        b_0.storeCoins(src.shortMargin);
        b_0.storeCoins(src.longSize);
        b_0.storeCoins(src.shortSize);
        b_0.storeCoins(src.longValue);
        b_0.storeCoins(src.shortValue);
    };
}

export function loadGlobalPosition(slice: Slice) {
    let sc_0 = slice;
    let _longMargin = sc_0.loadCoins();
    let _shortMargin = sc_0.loadCoins();
    let _longSize = sc_0.loadCoins();
    let _shortSize = sc_0.loadCoins();
    let _longValue = sc_0.loadCoins();
    let _shortValue = sc_0.loadCoins();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longValue: _longValue, shortValue: _shortValue };
}

function loadTupleGlobalPosition(source: TupleReader) {
    let _longMargin = source.readBigNumber();
    let _shortMargin = source.readBigNumber();
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longValue = source.readBigNumber();
    let _shortValue = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longValue: _longValue, shortValue: _shortValue };
}

function loadGetterTupleGlobalPosition(source: TupleReader) {
    let _longMargin = source.readBigNumber();
    let _shortMargin = source.readBigNumber();
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longValue = source.readBigNumber();
    let _shortValue = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longValue: _longValue, shortValue: _shortValue };
}

function storeTupleGlobalPosition(source: GlobalPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longMargin);
    builder.writeNumber(source.shortMargin);
    builder.writeNumber(source.longSize);
    builder.writeNumber(source.shortSize);
    builder.writeNumber(source.longValue);
    builder.writeNumber(source.shortValue);
    return builder.build();
}

function dictValueParserGlobalPosition(): DictionaryValue<GlobalPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGlobalPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalPosition(src.loadRef().beginParse());
        }
    }
}

export type GasConfig = {
    $$type: 'GasConfig';
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasForTransferJetton: bigint;
    gasForBurnTlp: bigint;
    gasForMintTlp: bigint;
}

export function storeGasConfig(src: GasConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.lpMinExecutionFee);
        b_0.storeCoins(src.perpMinExecutionFee);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeCoins(src.gasForTransferJetton);
        b_0.storeCoins(src.gasForBurnTlp);
        b_0.storeCoins(src.gasForMintTlp);
    };
}

export function loadGasConfig(slice: Slice) {
    let sc_0 = slice;
    let _lpMinExecutionFee = sc_0.loadCoins();
    let _perpMinExecutionFee = sc_0.loadCoins();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _gasForTransferJetton = sc_0.loadCoins();
    let _gasForBurnTlp = sc_0.loadCoins();
    let _gasForMintTlp = sc_0.loadCoins();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp };
}

function loadTupleGasConfig(source: TupleReader) {
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp };
}

function loadGetterTupleGasConfig(source: TupleReader) {
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp };
}

function storeTupleGasConfig(source: GasConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasForTransferJetton);
    builder.writeNumber(source.gasForBurnTlp);
    builder.writeNumber(source.gasForMintTlp);
    return builder.build();
}

function dictValueParserGasConfig(): DictionaryValue<GasConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGasConfig(src)).endCell());
        },
        parse: (src) => {
            return loadGasConfig(src.loadRef().beginParse());
        }
    }
}

export type ExecutorConfig = {
    $$type: 'ExecutorConfig';
    executors: Dictionary<Address, boolean>;
    compensator: Address;
    claimer: Address;
}

export function storeExecutorConfig(src: ExecutorConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeAddress(src.compensator);
        b_0.storeAddress(src.claimer);
    };
}

export function loadExecutorConfig(slice: Slice) {
    let sc_0 = slice;
    let _executors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _compensator = sc_0.loadAddress();
    let _claimer = sc_0.loadAddress();
    return { $$type: 'ExecutorConfig' as const, executors: _executors, compensator: _compensator, claimer: _claimer };
}

function loadTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'ExecutorConfig' as const, executors: _executors, compensator: _compensator, claimer: _claimer };
}

function loadGetterTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'ExecutorConfig' as const, executors: _executors, compensator: _compensator, claimer: _claimer };
}

function storeTupleExecutorConfig(source: ExecutorConfig) {
    let builder = new TupleBuilder();
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeAddress(source.compensator);
    builder.writeAddress(source.claimer);
    return builder.build();
}

function dictValueParserExecutorConfig(): DictionaryValue<ExecutorConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecutorConfig(src)).endCell());
        },
        parse: (src) => {
            return loadExecutorConfig(src.loadRef().beginParse());
        }
    }
}

export type ContractConfig = {
    $$type: 'ContractConfig';
    tlpJetton: Address;
    tlpWallet: Address;
    jettonWallet: Address;
}

export function storeContractConfig(src: ContractConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.tlpJetton);
        b_0.storeAddress(src.tlpWallet);
        b_0.storeAddress(src.jettonWallet);
    };
}

export function loadContractConfig(slice: Slice) {
    let sc_0 = slice;
    let _tlpJetton = sc_0.loadAddress();
    let _tlpWallet = sc_0.loadAddress();
    let _jettonWallet = sc_0.loadAddress();
    return { $$type: 'ContractConfig' as const, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet };
}

function loadTupleContractConfig(source: TupleReader) {
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    return { $$type: 'ContractConfig' as const, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet };
}

function loadGetterTupleContractConfig(source: TupleReader) {
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    return { $$type: 'ContractConfig' as const, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet };
}

function storeTupleContractConfig(source: ContractConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.jettonWallet);
    return builder.build();
}

function dictValueParserContractConfig(): DictionaryValue<ContractConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractConfig(src)).endCell());
        },
        parse: (src) => {
            return loadContractConfig(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrder = {
    $$type: 'LiquidityOrder';
    isIncrease: boolean;
    account: Address;
    jettonDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    executionFeeReceiver: Address;
    lastOperator: Address | null;
}

export function storeLiquidityOrder(src: LiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isIncrease);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.blockTime, 32);
        b_0.storeBit(src.isPending);
        b_0.storeAddress(src.executionFeeReceiver);
        let b_1 = new Builder();
        b_1.storeAddress(src.lastOperator);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    let _isIncrease = sc_0.loadBit();
    let _account = sc_0.loadAddress();
    let _jettonDelta = sc_0.loadCoins();
    let _executionFee = sc_0.loadCoins();
    let _blockTime = sc_0.loadUintBig(32);
    let _isPending = sc_0.loadBit();
    let _executionFeeReceiver = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _lastOperator = sc_1.loadMaybeAddress();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleLiquidityOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _executionFeeReceiver = source.readAddress();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadGetterTupleLiquidityOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _executionFeeReceiver = source.readAddress();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTupleLiquidityOrder(source: LiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.lastOperator);
    return builder.build();
}

function dictValueParserLiquidityOrder(): DictionaryValue<LiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrderData = {
    $$type: 'LiquidityOrderData';
    liquidityOrderIndexNext: bigint;
    liquidityOrder: LiquidityOrder | null;
}

export function storeLiquidityOrderData(src: LiquidityOrderData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.liquidityOrderIndexNext, 64);
        if (src.liquidityOrder !== null && src.liquidityOrder !== undefined) { b_0.storeBit(true); b_0.store(storeLiquidityOrder(src.liquidityOrder)); } else { b_0.storeBit(false); }
    };
}

export function loadLiquidityOrderData(slice: Slice) {
    let sc_0 = slice;
    let _liquidityOrderIndexNext = sc_0.loadUintBig(64);
    let _liquidityOrder = sc_0.loadBit() ? loadLiquidityOrder(sc_0) : null;
    return { $$type: 'LiquidityOrderData' as const, liquidityOrderIndexNext: _liquidityOrderIndexNext, liquidityOrder: _liquidityOrder };
}

function loadTupleLiquidityOrderData(source: TupleReader) {
    let _liquidityOrderIndexNext = source.readBigNumber();
    const _liquidityOrder_p = source.readTupleOpt();
    const _liquidityOrder = _liquidityOrder_p ? loadTupleLiquidityOrder(_liquidityOrder_p) : null;
    return { $$type: 'LiquidityOrderData' as const, liquidityOrderIndexNext: _liquidityOrderIndexNext, liquidityOrder: _liquidityOrder };
}

function loadGetterTupleLiquidityOrderData(source: TupleReader) {
    let _liquidityOrderIndexNext = source.readBigNumber();
    const _liquidityOrder_p = source.readTupleOpt();
    const _liquidityOrder = _liquidityOrder_p ? loadTupleLiquidityOrder(_liquidityOrder_p) : null;
    return { $$type: 'LiquidityOrderData' as const, liquidityOrderIndexNext: _liquidityOrderIndexNext, liquidityOrder: _liquidityOrder };
}

function storeTupleLiquidityOrderData(source: LiquidityOrderData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidityOrderIndexNext);
    if (source.liquidityOrder !== null && source.liquidityOrder !== undefined) {
        builder.writeTuple(storeTupleLiquidityOrder(source.liquidityOrder));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserLiquidityOrderData(): DictionaryValue<LiquidityOrderData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderData(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderData(src.loadRef().beginParse());
        }
    }
}

export type PerpOrder = {
    $$type: 'PerpOrder';
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

export function storePerpOrder(src: PerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeBit(src.triggerAbove);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.blockTime, 32);
        b_0.storeBit(src.isPending);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeAddress(src.lastOperator);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpOrder(slice: Slice) {
    let sc_0 = slice;
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _triggerAbove = sc_0.loadBit();
    let _executionFee = sc_0.loadCoins();
    let _blockTime = sc_0.loadUintBig(32);
    let _isPending = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadAddress();
    let _lastOperator = sc_1.loadMaybeAddress();
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTuplePerpOrder(source: TupleReader) {
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
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadGetterTuplePerpOrder(source: TupleReader) {
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
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTuplePerpOrder(source: PerpOrder) {
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

function dictValueParserPerpOrder(): DictionaryValue<PerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrder(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderEx = {
    $$type: 'PerpOrderEx';
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    executionFee: bigint;
}

export function storePerpOrderEx(src: PerpOrderEx) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tpSize);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeCoins(src.slSize);
        b_0.storeUint(src.slPrice, 128);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadPerpOrderEx(slice: Slice) {
    let sc_0 = slice;
    let _tpSize = sc_0.loadCoins();
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadCoins();
    let _slPrice = sc_0.loadUintBig(128);
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'PerpOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function loadTuplePerpOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'PerpOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function loadGetterTuplePerpOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'PerpOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function storeTuplePerpOrderEx(source: PerpOrderEx) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserPerpOrderEx(): DictionaryValue<PerpOrderEx> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderEx(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderEx(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderData = {
    $$type: 'PerpOrderData';
    perpOrderIndexNext: bigint;
    perpOrder: PerpOrder | null;
    perpOrderEx: PerpOrderEx | null;
}

export function storePerpOrderData(src: PerpOrderData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.perpOrderIndexNext, 64);
        if (src.perpOrder !== null && src.perpOrder !== undefined) { b_0.storeBit(true); b_0.store(storePerpOrder(src.perpOrder)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.perpOrderEx !== null && src.perpOrderEx !== undefined) { b_1.storeBit(true); b_1.store(storePerpOrderEx(src.perpOrderEx)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpOrderData(slice: Slice) {
    let sc_0 = slice;
    let _perpOrderIndexNext = sc_0.loadUintBig(64);
    let _perpOrder = sc_0.loadBit() ? loadPerpOrder(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpOrderEx = sc_1.loadBit() ? loadPerpOrderEx(sc_1) : null;
    return { $$type: 'PerpOrderData' as const, perpOrderIndexNext: _perpOrderIndexNext, perpOrder: _perpOrder, perpOrderEx: _perpOrderEx };
}

function loadTuplePerpOrderData(source: TupleReader) {
    let _perpOrderIndexNext = source.readBigNumber();
    const _perpOrder_p = source.readTupleOpt();
    const _perpOrder = _perpOrder_p ? loadTuplePerpOrder(_perpOrder_p) : null;
    const _perpOrderEx_p = source.readTupleOpt();
    const _perpOrderEx = _perpOrderEx_p ? loadTuplePerpOrderEx(_perpOrderEx_p) : null;
    return { $$type: 'PerpOrderData' as const, perpOrderIndexNext: _perpOrderIndexNext, perpOrder: _perpOrder, perpOrderEx: _perpOrderEx };
}

function loadGetterTuplePerpOrderData(source: TupleReader) {
    let _perpOrderIndexNext = source.readBigNumber();
    const _perpOrder_p = source.readTupleOpt();
    const _perpOrder = _perpOrder_p ? loadTuplePerpOrder(_perpOrder_p) : null;
    const _perpOrderEx_p = source.readTupleOpt();
    const _perpOrderEx = _perpOrderEx_p ? loadTuplePerpOrderEx(_perpOrderEx_p) : null;
    return { $$type: 'PerpOrderData' as const, perpOrderIndexNext: _perpOrderIndexNext, perpOrder: _perpOrder, perpOrderEx: _perpOrderEx };
}

function storeTuplePerpOrderData(source: PerpOrderData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.perpOrderIndexNext);
    if (source.perpOrder !== null && source.perpOrder !== undefined) {
        builder.writeTuple(storeTuplePerpOrder(source.perpOrder));
    } else {
        builder.writeTuple(null);
    }
    if (source.perpOrderEx !== null && source.perpOrderEx !== undefined) {
        builder.writeTuple(storeTuplePerpOrderEx(source.perpOrderEx));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserPerpOrderData(): DictionaryValue<PerpOrderData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderData(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderData(src.loadRef().beginParse());
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
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.unlockTime, 32);
    };
}

export function loadCompensate(slice: Slice) {
    let sc_0 = slice;
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    let _unlockTime = sc_0.loadUintBig(32);
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

function loadGetterTupleCompensate(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCompensate(src.loadRef().beginParse());
        }
    }
}

export type CompensateData = {
    $$type: 'CompensateData';
    compensateIndexNext: bigint;
    compensate: Compensate | null;
}

export function storeCompensateData(src: CompensateData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.compensateIndexNext, 64);
        if (src.compensate !== null && src.compensate !== undefined) { b_0.storeBit(true); b_0.store(storeCompensate(src.compensate)); } else { b_0.storeBit(false); }
    };
}

export function loadCompensateData(slice: Slice) {
    let sc_0 = slice;
    let _compensateIndexNext = sc_0.loadUintBig(64);
    let _compensate = sc_0.loadBit() ? loadCompensate(sc_0) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function loadTupleCompensateData(source: TupleReader) {
    let _compensateIndexNext = source.readBigNumber();
    const _compensate_p = source.readTupleOpt();
    const _compensate = _compensate_p ? loadTupleCompensate(_compensate_p) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function loadGetterTupleCompensateData(source: TupleReader) {
    let _compensateIndexNext = source.readBigNumber();
    const _compensate_p = source.readTupleOpt();
    const _compensate = _compensate_p ? loadTupleCompensate(_compensate_p) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function storeTupleCompensateData(source: CompensateData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateIndexNext);
    if (source.compensate !== null && source.compensate !== undefined) {
        builder.writeTuple(storeTupleCompensate(source.compensate));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserCompensateData(): DictionaryValue<CompensateData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateData(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateData(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('te6ccgICATEAAQAAZQQAAAEU/wD0pBP0vPLICwABAgFiAAIAAwLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8EScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdASQACAIBIAAEAAUCASAA/wEAAgEgAAYABwIBSAEJAQoCASABGQEaAroRHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4IIACQAKBHbtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQwj4ztLqPCDDbPGwW2zx/4CCCECHVC7C64wIgghCbQuTvugALAAwADQAOAYTI+EMBzH8BygARKBEnESYRJREkESMRIhEhESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQAIQOu0x8BghDCPjO0uvLggdIAAZLTH5JtAeLSAAGS+gCSbQHi0gABktMfkm0B4tQB0NIAAY6E2zxvCJFt4gHUMNDSAAGRbeMNAdQw0NIAAZIwbeMNEDYQNRA0AA8AEAARAfARJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREtESERIBEsESARHxErER8RHhEqER4RHREpER0RHBEoERwRGxEtERsRGhEsERoRGRErERkRGBEqERgRFxEpERcRFhEoERYRFREtERURFBEsERQAEgIyMNMfAYIQIdULsLry4IHTD9s8EJpsGts8fwEjABsEgo6VMNMfAYIQm0Lk77ry4IHTDwEx2zx/4CCCEP6yp2a64wIgwAAi10nBIbCSW3/gIIIQc2LQnLrjAiCCEEgedWG6ACQAJQAmACcAJPoA+gD6APoA+gD6APoA+gBVcACK9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMG8DAMr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBNvAwP8ERMRKxETERIRKhESERERKRERERARKBEQDxEtDw4RLA4NESsNDBEqDAsRKQsKESgKCREtCQgRLAgHESsHBhEqBgURKQUEESgEAxEtAwIRLAIBESsBESrbPD4+VyMRJiBu8tCAESUgbvLQgBEqIG7y0IBWJ26zklcn4w1WJ26zAPgAEwAUAGA5VxdXF1YkIG7y0IBvI1tWJSBu8tCAbyMwMREmIG7y0IBvI2whCBEmCAgRGAgRFxgE9pJXJ+MNVidus5JXJ+MNiBEiESgRIhEhEScRIREjESYRIxEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREQAVABYAFwAYAfhXFFcUViUgbvLQgG8jWyCBAQtxWfSCb6UgllAj1wAwWJZsIW0ybQHikI5BgQELAZF/kW3iAhEYAlYYAXEhbpVbWfRZMJjIAc8AQTP0QeKBAQsiAhEYcUEz9HRvpSCWUCPXADBYlmwhbTJtAeLoXwNWJSBu8tCAbyMwMREmABkB+lcYVxhXGFcYVxhXGFcYVxhWHyBu8tCAbygQV18HViAgbvLQgG8oEEdfB1YhIG7y0IBvKBA3XwdWIiBu8tCAbygQJ18HViMgbvLQgG8oXwdWJCBu8tCAbygQZ18HViUgbvLQgG8oF18HESYgbvLQgG8obHERFxEmERcGER4GABoAJAAAAABjb25maWcgdXBkYXRlZAFqERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsQ3xCOEH0QbBBbEEoQOUhwFkRAE/hCAX9t2zwA/AAeIG7y0IBvI2whERMRJhEUADgFER0FBBEcBAMRGwMRFxEaERcRGQIRGAIBERcCAfARJxExEScRJhEwESYRJREvESURJBEuESQRIxEtESMRIhEsESIRIRErESERIBEqESARHxEpER8RHhEoER4RHRExER0RHBEwERwRGxEvERsRGhEuERoRGREtERkRGBEsERgRFxErERcRFhEqERYRFREpERURFBEoERQAHAL0ERMRMRETERIRMBESERERLxERERARLhEQDxEtDw4RLA4NESsNDBEqDAsRKQsKESgKCRExCQgRMAgHES8HBhEuBgURLQUEESwEAxErAwIRKgIBESkBESjbPAcRMAcGES8GBREuBQQRLQQDESwDAhErAgERKgERKYAQESkA+AAdA/rIVYDbPMkQNgIRIQIBESoBIG6VMFn0WzCUQTP0F+KIER4RKBEeER0RJxEdERwRJhEcERsRJREbERoRJBEaERkRIxEZERgRIhEYERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDwAeAB8AIAA+yFAJzxbJUAnMFsoAUAT6Alj6AssPAfoCyx8Syx/LHwAgAAAAAHRva2VuIGxpc3RlZAGEDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8eED0QLBBLEEoQSRBIEEcQRhBFQzD4QgF/bds8APwB9gERKAERJyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgERJQHKAAERIwHLHwERIfoCAREf+gIBER36AgERG/oCAREZ+gLIAREY+gIBERb6AgERFPoCARESINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAQAiAf4RECDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFh70AMhQDSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlALINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGfQAF8s/FfQAE/QAyz8ByPQAEss/WPoCWPoCACMAvBLLHxP0AFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AlAD+gITyn8EyMp/UAX6AlAF+gJQBfoCUAX6AhXLPxX0ABb0ABT0AMlQA8zJAczJAczJAcwB8BEnESgRJxEmESgRJhElESgRJREkESgRJBEjESgRIxEiESgRIhEhESgRIREgESgRIBEfESgRHxEeESgRHhEdESgRHREcESgRHBEbESgRGxEaESgRGhEZESgRGREYESgRGBEXESgRFxEWESgRFhEVESgRFREUESgRFAAoAuQw0x8BghD+sqdmuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoIAoPf4QlYcAccF8vSBStstwgDy9IBCcG1wIMjLAMnQEEZWEVFGBBA3UHLIVWDbPMlWHgNWJUEzFEMwbW3bPH8A8AD9Ap4w0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhCViABxwWzmPhCViEBxwWzkXDi4w9/ADcAOATIjsYw0x8BghBIHnVhuvLggdM/0z8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeJDMGwT2zx/4CCCEKvPWHu6jwgw2zxsFts8f+AgghDu9ZJNugAtAC4ALwAwBMYRExEoERMREhEoERIREREoEREREBEoERAPESgPDhEoDg0RKA0MESgMCxEoCwoRKAoJESgJESgIBwZVQNs8IIAQVipZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrOTMFco4w0A+AEYACkAKgCMgV8FISBu8tCAbyYQNV8FAiBu8tCAbyYQJV8FEqDAAPL0VihQDoAQ9FswVihQDoAQ9FswVihYgBD0WzABESgBAoAQ9FswAQL+iBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQREwArACwAJAAAAAB0b2tlbiBkZWxpc3RlZAFuERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEw+EIBf23bPAD8A/b4QW8kMDKBS2lWKlYooBO+EvL0VhuAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbgV5tAbPy9FYjgQELJ3FBM/QKb6GUAdcAMJJbbeJus4IAoPchkX+UU1fHBeLy9LORMOMNUnARIIBA9FsBEgAxADIAjtMfAYIQq89Ye7ry4IHTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfQE+gD6AFVQA/Y++EFvJIIAoPdWJIEBCyVxQTP0Cm+hlAHXADCSW23ibrPy9FYggEAqWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8oW4FebQGz8vRUKHBSd9s8VjEBoCOzllYtVi+goJNWLKDiBYFLaQa+FfL0KG4BEgBbAFwEOo8IMNs8bBjbPH/gIIIQ+U+Au7rjAiCCEAmf9KO6AG0AbgBvAHAAGoIAmxcBVi+g+CO78vQB/jAjklYjklYk4hEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkETARJBEjES8RIxEiES4RIhEhES0RIREgESwRIBEfESsRHxEeETARHhEdES8RHREcES4RHBEbES0RGwERGgERGRErERkRGBEwERgRFxEvERcAMwP4ERYRLhEWERURLREVAREUARETESsRExESETAREhERES8REREQES4REA8RLQ8eDRErDQwRMAwLES8LChEuCgkRLQkYBxErBwYRMAYFES8FBBEuBAMRLQMCVisCES5WMNs8Vi1us5cRLSBu8tCAlFctViviVinCAJEw4w1WKgDuADQANQEgVilyf1UgbW1t2zwPViihDwD9AfaRcZFy4gIBESoBESjIVSCCELmwPLxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wBxESejVicRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0ANgH8ERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDkQKBA3EFZBBds8APIB9jD4QhEqESsRKhEpESsRKREoESsRKBEnESsRJxEmESsRJhElESsRJREkESsRJBEjESsRIxEiESsRIhEhESsRIREgESsRIBEfESsRHxEeESsRHhEdESsRHREcESsRHBEbESsRGxEaESsRGhEZESsRGREYESsRGBEXESsRFwA5Av5WKo77MPhCESoRKxEqESkRKxEpESgRKxEoEScRKxEnESYRKxEmESURKxElESQRKxEkESMRKxEjESIRKxEiESERKxEhESARKxEgER8RKxEfER4RKxEeER0RKxEdERwRKxEcERsRKxEbERoRKxEaERkRKxEZERgRKxEYERcRKxEXADsAPAP4ERYRKxEWERURKxEVERQRKxEUERMRKxETERIRKxESERERKxERERARKxEQDxErDw4RKw4NESsNDBErDAsRKwsKESsKCRErCQgRKwgHESsHBhErBgURKwUEESsEAxErAwIBESsBVitWLNs8iBEoESkRKBEnESgRJxEmEScRJgDuADoAWQAcAAAAAGpldHRvbiB1bnMD+BEWESsRFhEVESsRFREUESsRFBETESsRExESESsREhERESsREREQESsREA8RKw8OESsODRErDQwRKwwLESsLChErCgkRKwkIESsIBxErBwYRKwYFESsFBBErBAMRKwMCARErAVYrVizbPIgRKBEpESgRJxEoEScRJhEnESYA7gA9AFkDSuDTAAHDAeMC+EJWIQHHBY6L1DDQ+gD6ADAB2zzg1DDQ0wchwAEAPgA/AEAAKAAAAABjb250cmFjdCBzdG9wcGVkAfYw+EIRKhErESoRKRErESkRKBErESgRJxErEScRJhErESYRJRErESURJBErESQRIxErESMRIhErESIRIRErESERIBErESARHxErER8RHhErER4RHRErER0RHBErERwRGxErERsRGhErERoRGRErERkRGBErERgRFxErERcAQQPkM4sIcPhBbyQTXwNWKySguY4TW3+L5nYXMgbm90IGVub3VnaIAd4gs5QiViW5kXDijh5bf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIAHe4wIwVhqkgEBw+CNwbSdROVE4UqTIVXDbPMkCER4CVh0BAEMA5gBEA3qOiTH6APoAMAHbPI8vAcACjqj6ANIAAcD/AdMP0gABwP8B+gD6ANN/0x/UMND6ANN/+gDTfzBVA9s84w7iAEcASABJA/gRFhErERYRFRErERURFBErERQRExErERMREhErERIRERErEREREBErERAPESsPDhErDg0RKw0MESsMCxErCwoRKwoJESsJCBErCAcRKwcGESsGBRErBQQRKwQDESsDAgERKwFWK1Ys2zyIESgRKREoEScRKBEnESYRJxEmAO4AQgBZACYAAAAAcGF5bG9hZCBpbnZhbGlkAf4xESkRKxEpESgRKhEoEScRKxEnESYRKhEmESURKxElESQRKhEkESMRKxEjESIRKhEiESERKxEhESARKhEgER8RKxEfVioRHxEeESwRHhEdERwRLBEcERsRGhEsERoRGREYESwRGBEXERYRLBEWERURFBEsERQRExESESwREhERAEUCpiBulTBZ9FswlEEz9BfiERUhoHJRMEUTUgIBER4BB8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHEgERQRGxEUERQRGhEUAhEUAkMwcNs8AEwA8gP+ERARLBEQDw4RLA4NDBEsDAsKESwKCQgRLAgHBhEsBgUEESwEAwIRKwIBESwBVitWLNs8ESnbPBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHADuAFEARgHaERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDASf23bPAD8Avb4QW8kE18DiwhwJFYtoBO5jhJbf4vmdhcyBub3QgZW5vdWdojeIbOTU1K5kXDijhZbf40EWpldHRvbiBub3QgZW5vdWdog3iGzlCNWJrmRcOKOHVt/jQYZXhlY3V0aW9uIGZlZSBub3QgZW5vdWdog3gHjAjAzVhqkgEAASgBLA/D4QW8kE18DiwhwLlY2oBO5jhJbf4vmdhcyBub3QgZW5vdWdojeIbOTU/m5kXDijhZbf40EWpldHRvbiBub3QgZW5vdWdog3nEnwgCTJsIAkXDikjBy3iXCAJMkwgCRcOKRpN4is5dWLyGoUvC5kXDi4wAC4wIwPgoATQBOAE8B9jD4QhEqESsRKhEpESsRKREoESsRKBEnESsRJxEmESsRJhElESsRJREkESsRJBEjESsRIxEiESsRIhEhESsRIREgESsRIBEfESsRHxEeESsRHhEdESsRHREcESsRHBEbESsRGxEaESsRGhEZESsRGREYESsRGBEXESsRFwBXAfxsIREpESsRKREoESoRKBEnESsRJxEmESoRJhElESsRJREkESoRJBEjESsRIxEiESoRIhEhESsRIREgESoRIBEfESsRHxEeESoRHlYrER4RHRErER0RHBEbESsRGxEaERkRKxEZERgRFxErERcRFhEVESsRFREUERMRKxETERIAUAPYf/gjcG0nUTlROFKkyFVw2zzJAhEeAlYdASBulTBZ9FswlEEz9BfiERUhoHFRMEUTUgIBER4BB8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHEgERQRGxEUERQRGhEUAhEUAkMwcNs8AOYATADyAG6CEMTQIORQB8sfFcsHUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLLP8s/AD5sIX+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iBYAfxs0REpESsRKREoESoRKBEnESsRJxEmESoRJhElESsRJREkESoRJBEjESsRIxEiESoRIhEhESsRIREgESoRIBEfESsRHxEeESoRHlYrER4RHRErER0RHBEbESsRGxEaERkRKxEZERgRFxErERcRFhEVESsRFREUERMRKxETERIAUAH4kXqSgAviUr6pBBE0ETYRNBEzETURMxEyETYRMhExETURMREwETYRMBEvETURLxEuETYRLhEtETURLREsETYRLBErETURKxEqETYRKhEpETURKREoETYRKBEnETURJxEmETYRJhElETURJREkETYRJBEjETURIxEiETYRIgBUA/oRERErEREREA8RKw8ODRErDQwLESsLCgkRKwkIBxErBwYFESsFBAMRKwMCESwCARErVixWLds8ESjbPBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHQDuAFEAUgFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxAFMB5BEcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQwf23bPAD8ALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMB+BEhETURIREgETYRIBEfETURHxEeETYRHhEdETURHREcETYRHBEbETURGxEaETYRGhEZETURGREYETYRGBEXETURFxEWETYRFhEVETURFREUETYRFBETETURExESETYREhERETUREREQETYREA8RNQ8OETYODRE1DQwRNgwAVQL2CxE1C1Y2C9s8MBEQViigEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWAKsAVgGOERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERIPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJHJARHFw2zwA8gP4ERYRKxEWERURKxEVERQRKxEUERMRKxETERIRKxESERERKxERERARKxEQDxErDw4RKw4NESsNDBErDAsRKwsKESsKCRErCQgRKwgHESsHBhErBgURKwUEESsEAxErAwIBESsBVitWLNs8iBEoESkRKBEnESgRJxEmEScRJgDuAFgAWQAqAAAAAG9wZXJhdGlvbiB1bmtub3duAfwRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREAWgFQERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwf23bPAD8AGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAP2s5YIIG7y0ICSOCPif4BAI1FbUVcFEEoQI0oJyFVw2zzJAhEgAlQjgCBulTBZ9FswlEEz9BficCSAEIMGWfSGb6UgllAj1wEwWJZsIW0ybQHikIroWzRSL6EBERABoFPhDqEgVhaoghA7msoAqQRRIqACoQEREQGgLhEeAOYAXQBeAOorgBAjWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOOMCBu8tCAbyMBjhESoaiCMA3gtrOnZAAAqQQSoI4RWKGogjAN4Lazp2QAAKkEEqDiAZFb4oAQJgKDBkEz9HxvpSCWUCPXATBYlmwhbTJtAeICRo6PDREdDREQTh8QzRBFAts8jo8NER0NERBOHxDNEEUC2zziAF8AYAPoU/6gcFYXIqG2CSSBKWICu/L0VhLAAJswgjAN4Lazp2QAAI4Qgjg2Ncmtxd6gAACoVhKpBOIjgjg2Ncmtxd6gAACoIakEcX9tcMjJ0CpRO1E3A8hVUNs8yVYXA1YrQTMUQzBtbds8EREkoBETVhGgVh+AQCgAYQD9AGICoFP+oII4NjXJrcXeoAAAqFYSqQRTA6iCODY1ya3F3qAAAKkEVh+AQChZ9A9voZIwbd8gbpIwbY6H0Ns8bBhvCOIgbvLQgG8oNTZbcnBUfaRtARIAZADIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgT+WfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG7y0IBvKDU1WzNSkBEjgED0WzAiwgCOkVEScn9VIG1tbds8ERohoREakTHiEHkQaHEGEFoQSRA5AhEUAikCVhdADBBFyFWg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVhluswESAP0AaABjAUSOmXERGiBu8tCADKNWGgMRGwMQLxAtf9s8EJuTO1cY4hCbAPIC+MhVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYrA1YwQTMUQzBtbds8ERUkoREXKKERKBEzESgRJxEyEScRJhExESYRJREwESURJBEvESQRIxEuESMA/QBlAf4RIhEtESIRIREsESERIBErESARHxEqER8RHhEpER4RHREzER1WMhEdERwRMhEcERsRMREbERoRMBEaERkRLxEZERgRLhEYERcRLREXERYRLBEWERURKxEVERQRKhEUERMRNBETERIREREyEREREBExERAPETAPDhEvDh0MES0MAGYD/AsRLgsKESsKCREqCQgRNAgHBhEyBgURMQUEETAEAxEvAxIBETMBVi0BVjIBETFWNds8ViwBERiAQPRbMFYqwgCOkhEuVipyf1UgbW1t2zwPVimhD5JXLuIHESoHBhErBnIGBREpBQQRKAQDES8DAhEwAitUSjABETQBES8QVgDuAP0AZwP+yFWg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVihus5RXIVcn4w0RHBEnERwRGxEmERsRGhElERoRGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDgBoAGkAagCWghDeMf89UAzLHxrLPxjLPxbLB1AEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWPoCAfoCy38B+gIByMp/WPoCWPoCyQHMAf5xESkgbvLQgBEio1YpESARKxEgER8RKhEfER4RKREeER0RKBEdERwRJxEcERsRJhEbERoRJREaERkRJBEZERgRIxEYERcRIhEXERYRIREWERURIBEVERQRHxEUERMRHhETERIRHRESERERHBERERERGxERDxEaDw4RGQ4NERgNAGsAZA0RGA0NERcNCxEWCwoRFQoJERQJCBETCAcREgcGEREGBREQBRBPED5NyxBaEFhGF0REAv4MERcMCxEWCwoRFQoJERQJCBETCAcREgcGEREGBREQBRBPED4QLRA8EEsQahA5EEgQRhBFf9s8AREnAQoRJgoCESUCAxEkAxEXESMRFwYRIgYHESEHCBEgCAkRHwkFER4FBBEdBAERHAEKERsKAhEaAgMRGQMRFxEYERcGERcGAPIAbABYBxEWBwgRFQgJERQJBRETBQQREgQBEREBChEQChAvED4QbQxeNxBYEEdGBgQAPtMfAYIQ7vWSTbry4IH6ANMP0gD6APoA03/TP9MfVXAB8BEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIREgESgRIBEfES8RHxEeES4RHhEdES0RHREcESwRHBEbESsRGxEaESoRGhEZESkRGREYESgRGBEXES8RFxEWES4RFhEVES0RFREUESwRFABxAhAw2zxsGds8fwCFAIYEyo7HMNMfAYIQCZ/0o7ry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP1UgbBPbPH/gIIIQLFif0bqPCDDbPGwY2zx/4CCCEBtosFO6AHYAdwB4AHkC9BETESsRExESESoREhERESkREREQESgREA8RLw8OES4ODREtDQwRLAwLESsLChEqCgkRKQkIESgIBxEvBwYRLgYFES0FBBEsBAMRKwMCESoCAREpAREo2zz4QW8kMIFLaTNWMqFWJr4S8vSBX/JWMVYgvvL0gAxwVHAAAPkAcgH8ES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZAHMC9hEYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfJRCfEI4QfRBbCgkRNQkIBxE1BwYFETUFVjYBETbbPDAREFYpoBEnESkRJwCrAHQB/BEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREgB1AV4RERETEREREg8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNRAkckAUcXDbPADyAvb4QW8kMDJWGoBAJVn0D2+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLVtsMzQ1gV5tA7MT8vQkwAqRf5MkwAvinYFLaVYuVi2gGL4X8vSagUtpB1Yuvhfy9OJWI4EBCyZxQTP0Cm+hlAHXADCSW23ibrMBLwCPAJbTHwGCECxYn9G68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdM/0z/TD9N/0x/Sf9J/VXAD9DIz+EFvJDAyggCg91YjgQELI3FBM/QKb6GUAdcAMJJbbeJus/L0Vh2AQChZ9A9voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bgV5tAbPy9CnACpF/kynAC+Ign4FLaVY3qgBWNqAevh3y9OMNVhFuAS8AegB7BDqPCDDbPGwZ2zx/4CCCEDx0UBe64wIgghD8M4d9ugB9AH4AfwCAABiBS2lWN6oAHr4d8vQD+pNXESmXEREgbvLQgOJ/gEArUVtRW1FbUVtRW1FbVEFlFAMRGwNYERTIVcDbPMkCESUCVC/gIG6VMFn0WzCUQTP0F+IHjpoFk1J8vpNSfLvi8uZsBBEgBBCKSGdeIljbPI6aBZNSfL6TUny74vLmbAQRIAQQikhnXiJY2zziAOsAfACEBO5WGIAQKFn0D2+hkjBt3yBukjBtjofQ2zxsGW8J4oFsliFus/L0IG7y0IBvKTiCAI9uUAfy9FYngEBWEln0D2+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLTU1WzMzNDUvwgCSODjjDVYXgBBWEgEjAS8AlgCXAOrTHwGCEBtosFO68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdMP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANM/03/TH9J/1AHQ0n8wGRgXFhUUQzAC5jL4QW8kMDKBS2lWLqoAVi2gE74S8vSCAKD3ViSBAQsjcUEz9ApvoZQB1wAwkltt4m6z8vQobrOWCCBu8tCAkjgn4lYcpIBAc3BTAHAhEFf4I39WEQlWEQlWEQkIBwYFBEMTERUdyFXA2zzJAhEfAhlWHQEA6wCzAhAw2zxsGts8fwCBAIIEOo8IMNs8bBfbPH/gIIIQiOf5J7rjAiCCEJRqmLa6ANsA3ADdAN4AmNMfAYIQPHRQF7ry4IHTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA0z/Tf9Mf0n/UAdDSfzAaGRgXFhUUQzAC9jL4QW8kMDKBS2lWL6oAVi6gE74S8vSCAKD3ViWBAQsjcUEz9ApvoZQB1wAwkltt4m6z8vRWHaSAQHRwcCEQNPgjf1YRBlYRBlYRBlYRBlYRBlUTUdDIVcDbPMkCESECAREhAVYfASBulTBZ9FswlEEz9BfiER8RHRBJCADrAIMBFHQIBQZQc0RA2zwAhAP0VhiAEChZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeKBbJYhbrPy9CBu8tCAbyk1NTaCAI9uUAXy9FYlgEBWEFn0D2+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLTU1W2wzNDRWFoAQVhFZ9A9voZIwbd8BIwEvAMUAQtMfAYIQ+U+Au7ry4IH6ANMP0gD6ANN/+gDTf9M/0x9VgAHwEScRMBEnESYRLxEmESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RMBEeER0RLxEdERwRLhEcERsRLREbERoRLBEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURMBEVERQRLxEUAIcC/BETES4RExESES0REhERESwREREQESsREA8RKg8OESkODREoDQwRMAwLES8LChEuCgkRLQkIESwIBxErBwYRKgYFESkFBBEoBAMRMAMCES8CAREuAREt2zz4QW8kMDJwVizCAJRWK8IAkXDikjBx3lYzwgCUVjLCAJFw4pGk3gD5AIgE/IFLaQNWMKFWJyKovhPy9IFf8lYgI6hWMAG+8vRWK8IAlFYqwgCRcOKOtoANcFRwACBWNCipBFY3UZgQiVY2CFY2UHgGETYGBRE1BVA0AhE2AgERNQFWOts8MBEoESkRKJRXKlcq4lYwwgCUVi/CAJFw4uMPClYmoBEhESoRIQCrAIkAigCLAf6ADnBUcAAgVjJWMKkEES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcAIwALAURMAUEES8EAxEuAwIRLQJXKlcqXwQB+BEgESkRIBEfESgRHxEeEScRHhEdESYRHREcESURHBEbESQRGxEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLERMAjgL+ERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9DBE1DCsQfAsQmhCJEGgHETgHBhE3Bts8MACrAI0A9AURKgUEESkEAxEoAwIRJwIEESYEARElAREkAxEjAwURIgUCESECBBEgBAERHwERHgMRHQMFERwFAhEbAgQRGgQBERkBERgDERcDBREWBQIRFQIEERQEARETARESAxERAwUREAUQLxBOUNwQOxBaECkQSFB2EDUQNBAjAU4JERIJCBERCAcREAcQbxBeEE0QPEugGRBoEFcQRhA1UDRyUDNw2zwA8gP0ggCg9yGRf5RTNscF4vL0s5ojwAqRf5MjwAzikXDinoIAh6QDVi+g+CO7E/L0kTLiJ26SNyKWByBu8tCA4nAjwAqRf5MjwAvikjU34w1SUBEdgED0WzBWHMIAjpEGVhxyf1UgbW1t2zwRGxKgAZM2VxviERUhoVYaQEMAkAD9AJEC+FYdgEApWfQPb6GSMG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4iBus47HIG7y0IBvJSUFwgCTA8IAkjNw4pQzVEET3gHCAJLCAJIwcOKRoJEw4iDCAI6MMVOAcn9VIG1tbds8kTDiUnARHoBA9FswER2RMOIRKREwESkA/QCSAZbIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wByAaNxVhrACpNXGn+UERrAC+IEERoEAxEVA0FA2zwA8gH8ESgRLxEoEScRLhEnESYRLREmESURLBElESQRKxEkESMRKhEjESIRMBEiESERLxEhESARLhEgER8RLREfER4RLBEeVisRHhEdESsRHREcETERHBEbETARGxEaES8RGhEZES4RGREYES0RGBEXERYRKxEWERURMREVERQRMBEUAJMC+hETES8RExESES4REhERES0REREQDxErDw4RMQ4NETANDBEvDAsRLgsKES0KCQgRKwgHETEHBhEwBgURLwUEES4EAxEtAwIRLAJWMQIRMQFWMNs8EScRLhEnESYRLREmESURLBElESQRKxEkESMRKhEjESIRKREiESERKBEhAO4AlAH8ESARJxEgER8RJhEfER4RJREeER0RJBEdERwRIxEcERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQ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EUoRJhElEUkRJREkEUgRJBEjEUcRIxEiEUYRIhEhEUURIREgEUQRIBEfEUMRHxEeEUIRHhEdEUERHREcEUARHBEbET8RGxEaET4RGhEZET0RGREYETwRGACrAKgA1hEXETsRFxEWEToRFhEVETkRFREUETgRFBETETcRExESETYREhERETUREREQETQREA8RMw8OETIODRExDQwRMAwLES8LChEuCgkRLQkIESwIBxErBwYRKgYEESkEAhEoAgMRJwMRJRBbREATAf4RIBE/ESARHxE+ER8RHhE9ER4RHRE8ER0RHBE7ERwRGxE6ERsRGhE5ERoRGRE4ERkRGBE3ERgRFxE2ERcRFhE1ERYRFRE0ERURFBFSERQRExFRERMREhFQERIRERFQEREREBFPERAPEU0PDhFODhC9DBFLDFZJDBB7EGoJETcJAKoC9ggRPQgQVxBWETf4I9s8MBEnEUYRJxEmEUURJhElEUQRJREkEUMRJBEjEUIRIxEiEUERIhEhEUARIREgET8RIBEfET4RHxEeET0RHhEdETwRHREcETsRHBEbEToRGxEaETkRGhEZETgRGREYETcRGBEXETYRFxEWETURFgCrAKwE8FYhpC3ACpF/ky3AC+KOFWwzMynADJEmmSnADZEmkiaz4uJBMOMN+COAQHBtLlRNMC9UTjAuVE4wLlRLMC9UTDBWFwHIVcDbPMkCESQCViIBIG6VMFn0WzCUQTP0F+IQmhBFViAFQxQCESMCUA0QRhA1WchVwNs8yQCtAOsArgCvAMIRFRE0ERURFBEzERQRExEyERMREhExERIREREwEREREBEvERAPES4PDhEtDg0RLA0MESsMCxEqCwoRKQoJESgJCBEnCAcRJgcGESUGBBEkBAIRIwIDESIDESABEREBGxBWAK4qsyfCAJMmwgCRcOKRf5olwgCTJMIAkXDi4o43R2WAQFFUyFVAUFT6AhLLfwH6AhLLfwH6AskCESICAREiAVYhASBulTBZ9FswlEEz9BfiESBVIJJsROIAkoIQZu9GX1AOyx8cywcayw9QCCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhbKAFAE+gJY+gLLf8oAAfoCyz/LP8sfyx8AOMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEWERQCoMgRHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcgIgbvLQgAajEEkQSBBGEDUQNEMAcNs8ALEA8gH2ghAvLBDlAREdyx8BERsByz8BERkByz8BERcBywcBERUByz8BERMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBEREByw8fygAdyn9QC/oCGcp/UAf6AgXIy38Uy38Syn8B+gIB+gISyn8Syn9Y+gLIUAP6AlADALIAQPoCUAP6AlAD+gITygATy38Tyn9QA/oCE8p/yVjMyQHMATogbpUwWfRbMJRBM/QX4hEdBxEbBxA3EDYQNAHbPAC0A+5WFYAQJln0D2+hkjBt3yBukjBtjofQ2zxsGW8J4oFsliFus/L0IG7y0IBvKTQ0NDWCAI9uUATy9FYhgEAsWfQPb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tNTVbbGNWEYAQLVn0D2+hkjBt3wEjAS8AtQP8IG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELL1n0C2+hkjBt3yBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwziIG6zlyBu8tCAbyydMHBUcABTAHBUcABTAOJWF5ZUe6lUe6mWVHVDVHVD4oEUdiTCAPL0U0NWJIAQARYBFgC2A+5WIln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4iBus5cgbvLQgG8mlzBwVHAAUwDiViNQCqErqIIwDeC2s6dkAACpBFYiUAmhK6iCMA3gtrOnZAAAqQRWJY4TKlYloVLAqIIwDeC2s6dkAACpBOMNLFYmqFYgViKgqAEYALcAuAAmViQroVLAqIIwDeC2s6dkAACpBAHwgjBnZceT+hAHnaoaqQRWI6CCAJ/sU/ugJKFQA6C+8vRRyKAsoVYhoYIwDeC2s6dkAACoViWUCqMrqJNRq6jiGqBWHQERH6BWJJaCF8RlNgCWghA7msoA4qAaqIIQO5rKAKkEAREdAakEViiAEFYlWfQPb6GSMG3fALkC/iBukjBtndD6ANIA039VIGwTbwPiIG6zlyBu8tCAbyOUMHBwIeJwU3PCAJRWJyS9kXDijj8xUze2CFYns44SU1KhUhCogjAN4Lazp2QAAKkEjhJTJaFSEKiCMA3gtrOnZAAAqQTiUSGhUFWhIMAAknAz3gTeIMIAkTDjDVN0qAEAugC7ACQzUjKoUySooF2gqQRaoFYlQAMC/hEgqIIwZ2XHk/oQB52qGqkEIBEiqIIQO5rKAKkEViEhoQERNgGgVh9WNqABETUBoChWIqEqoC6ho3BUcABTAFYtjhlXHFccVxxXHFccVxxWGlYaVhpRrKERJCuh4w5T/rYJAREQAQ+htgsvViqogjAN4Lazp2QAAKkEVhEBESsAvAC9AH5XFlcWVxZXFlcWVxZWFFYUVhRRnKERECuhChEkChEXER0RFxEWERwRFhEVERsRFQIRFwIBERYBCREVCREQCQoD6KiCMA3gtrOnZAAAqQRWKiG2CQEREKEBETQBoFYpL6G2CwERNKEBETQBoAoRHQoZCBEzCBcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE4EBCxETyFWwEGwQWxBKEDlIfNs8yFVQB9s8yQHMyQIRFAIYViEBANAA0AC+AuogbpUwWfRZMJRBM/QT4oAQAcgBAfQAyQIRJQJWHwEgbpUwWfRbMJRBM/QX4oAQVhcCVihURDAmAgERIAERKMhVUNs8yQIRIQIBESMBVh0BIG6VMFn0WzCUQTP0F+KAEFR7qchVIFr6AhLKAMt/yQIRIgJWHQEA0gC/AfggbpUwWfRbMJRBM/QX4lYdARE1gED0WzARJxFGEScRJhFFESYRJRFEESURJBFDESQRIxFCESMRIhFBESIRIRFAESERIBE/ESARHxE+ER8RHhE9ER4RHRE8ER0RHBE7ERxWOhEcERsROhEbERoROREaERkROBEZERgRNxEYAMAD9hEXETYRFwERFgERFRE0ERURFBEzERQRExEyERMREhExERIREREwEREREBEvERAPES4PDhEtDg0RLA0MESsMCxEpCxCKCRFHCQgRRggHEUUHEFYFEUMFBBFCBAMROQMCETUCARFAARE7Vj5WN1Y0VjTbPFYvwgCSVzHjDQDuAMEAwgEkETFWL3J/VSBtbW3bPA9WLqEPAP0B+BEaETwRGhEZETsRGXMRGREYETgRGBEXETsRFxEWEToRFhEVETkRFREUEUERFBETESwRExESES0REhERESsREREQEUIREA8RKg8OEUQODRE/DQwRLgwLETQLVjULChE4CgkRNwkIETQIBxFEBwYRQQYFET8FBBEpBAMR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ERYRFRE5ERURFBEzERQRExEqERMREhE3ERIRERExEREREBE2ERAPET8PDhEvDg0RRQ0MEUMMCxFCC1Y4CwoRNgoJETsJCBEzCAcRNQcGEUUGBRFCBQQRKgQDESkDAhEoAlY7AgERMgEA1wL8EUgQ7xDeELwQq8gRHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHIREyBu8tCAERKjcREewgAMESwMCxErCwoRKgoJESkJCBEoCAcRJwcGESYGBRElBQQRJAQDESMDANgA2QH2ghD9jEnLAREfyx8BER0Byz8BERsByz8BERkBywcBERcByz8BERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMByw8BEREBygAfyn9QDfoCG8p/UAn6AgfIy38Wy38Uyn8Syn8B+gIB+gLKfxLKf8hQA/oCANoBzgIRIgIEESEEAxEgAwIRHwIGER4GBBEdBBESERwREgIRGwIRGREaERkREBEZERAEERgEERIRFhESBREVBQURFAULERMLCRESCQgREQgJERAJEC8QPhBNXikQehApEDgQR14yEDQS2zwA8gBcUAP6AlAD+gJQA/oCUAP6AlAD+gITygATy38Tyn/IUAT6AhTKf8lYzMkBzMkBzAH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAAN8D9IIAoPf4QlYixwXy9PhBbyQwMYFLaTJWLL7y9FYYpIBA+COCA/SAoFRpkFRpkFRpkFKQyFVw2zzJAhEcAlYbASBulTBZ9FswlEEz9Bfi+COCA/SAoAgRGggHERoHBhEaBgURGgUEERoEAxEaAwIRGgIBERoByFWA2zzJAOAA4QDiA8ww0x8BghCI5/knuvLggdIA0z/TP1UgbBOCAKD3+EJWHscF8vSBS2n4QW8kE18DVihWJ6C+8vRWFYBAI1n0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oErcCFus/L0IG7y0IBvKArjD38BDwDkAOUCZI6oMNMfAYIQlGqY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hEZERoRGYAEkAR0BiBEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82yjAR4ARlYbgQELInFBM/QKb6GUAdcAMJJbbeJusyFWHMcFAlYbxwUSAvmyBzbPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFIAEkASEC+bJ7ts8EScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUgASQBJQGAERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD2yBIG6SMG2ZIG7y0IBvKW8J4iBukjBt3gEiATiAEC8CWfQPb6GSMG3fIG6SMG2Oh9DbPGwZbwniASMALNQB0AHSAPoA+gDTD/oA0x/TH9MfVYACQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAEmAScBTBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82yjAS4C+Ns8VygRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMBKAEpBNQwcIEAtIIKYloAghAFXUqAggiYloCCEATEtABTAYIK+vCAghAF9eEAbW1xbW0ibSFwIIBkbVRyIlRwAFRwCm1tbfhCjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiYmJAS0BLQEtASwB9vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTH/oA+gD6APoA+gDUAdD6APoA+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATUMAEqADAREhETERIRERESEREREBERERAPERAPVQ4B/ND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATTP/QE9ATTP9Qw0PQE0z/6APoA0x/0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6AAErAJDSf9Qw0NJ/+gD6APoA+gDTP/QE9AT0BDARIBEoESARIBEnESARIBEmESARIBElESARIBEkESARIBEjESARIBEiESARIBEhESAB2okFEScFBREmBQURJQUFESQFBREjBQURIgUFESEFBREgBQURHwUFER4FBREdBQIRHAIDERsDBREaBQERGQERGAIRFwIDERYDBREVBQERFAEREwIREgIDEREDBREQBU3+EEwQOxBaR5gQRkADBQQBLQBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAGQVhaAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bB1vDeKAQFYXQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiVhVZAS8BrtMH0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gD6ANN/0gD6ANMf0gDUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAQEwAIgg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIxEC0QLBArECoQKRAoECcQJhAlECQQIw==');
    const __system = Cell.fromBase64('te6cckICATMAAQAAZRAAAAEBwAABAQWg6L8AAgEU/wD0pBP0vPLICwADAgFiAAQA/ALw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8EScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdASYABQK6ERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCAAYA+AR27aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEMI+M7S6jwgw2zxsFts8f+AgghAh1QuwuuMCIIIQm0Lk77oABwALABUAHAOu0x8BghDCPjO0uvLggdIAAZLTH5JtAeLSAAGS+gCSbQHi0gABktMfkm0B4tQB0NIAAY6E2zxvCJFt4gHUMNDSAAGRbeMNAdQw0NIAAZIwbeMNEDYQNRA0AAgACQAKACT6APoA+gD6APoA+gD6APoAVXAAivQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBvAwDK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTbwMB8BEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhES0RIREgESwRIBEfESsRHxEeESoRHhEdESkRHREcESgRHBEbES0RGxEaESwRGhEZESsRGREYESoRGBEXESkRFxEWESgRFhEVES0RFREUESwRFAAMA/wRExErERMREhEqERIREREpEREREBEoERAPES0PDhEsDg0RKw0MESoMCxEpCwoRKAoJES0JCBEsCAcRKwcGESoGBREpBQQRKAQDES0DAhEsAgERKwERKts8Pj5XIxEmIG7y0IARJSBu8tCAESogbvLQgFYnbrOSVyfjDVYnbrMA8QANAA4AYDlXF1cXViQgbvLQgG8jW1YlIG7y0IBvIzAxESYgbvLQgG8jbCEIESYICBEYCBEXGAT2klcn4w1WJ26zklcn4w2IESIRKBEiESERJxEhESMRJhEjER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERAA8AEQATABQB+FcUVxRWJSBu8tCAbyNbIIEBC3FZ9IJvpSCWUCPXADBYlmwhbTJtAeKQjkGBAQsBkX+RbeICERgCVhgBcSFulVtZ9FkwmMgBzwBBM/RB4oEBCyICERhxQTP0dG+lIJZQI9cAMFiWbCFtMm0B4uhfA1YlIG7y0IBvIzAxESYAEAAeIG7y0IBvI2whERMRJhEUAfpXGFcYVxhXGFcYVxhXGFcYVh8gbvLQgG8oEFdfB1YgIG7y0IBvKBBHXwdWISBu8tCAbygQN18HViIgbvLQgG8oECdfB1YjIG7y0IBvKF8HViQgbvLQgG8oEGdfB1YlIG7y0IBvKBdfBxEmIG7y0IBvKGxxERcRJhEXBhEeBgASADgFER0FBBEcBAMRGwMRFxEaERcRGQIRGAIBERcCACQAAAAAY29uZmlnIHVwZGF0ZWQBahEQERYREA8RFQ8OERQODRETDQwREgwLERELEN8QjhB9EGwQWxBKEDlIcBZEQBP4QgF/bds8APUCMjDTHwGCECHVC7C68uCB0w/bPBCabBrbPH8BJAAWAfARJxExEScRJhEwESYRJREvESURJBEuESQRIxEtESMRIhEsESIRIRErESERIBEqESARHxEpER8RHhEoER4RHRExER0RHBEwERwRGxEvERsRGhEuERoRGREtERkRGBEsERgRFxErERcRFhEqERYRFREpERURFBEoERQAFwL0ERMRMRETERIRMBESERERLxERERARLhEQDxEtDw4RLA4NESsNDBEqDAsRKQsKESgKCRExCQgRMAgHES8HBhEuBgURLQUEESwEAxErAwIRKgIBESkBESjbPAcRMAcGES8GBREuBQQRLQQDESwDAhErAgERKgERKYAQESkA8QAYA/rIVYDbPMkQNgIRIQIBESoBIG6VMFn0WzCUQTP0F+KIER4RKBEeER0RJxEdERwRJhEcERsRJREbERoRJBEaERkRIxEZERgRIhEYERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDwAZABoAGwA+yFAJzxbJUAnMFsoAUAT6Alj6AssPAfoCyx8Syx/LHwAgAAAAAHRva2VuIGxpc3RlZAGEDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8eED0QLBBLEEoQSRBIEEcQRhBFQzD4QgF/bds8APUEgo6VMNMfAYIQm0Lk77ry4IHTDwEx2zx/4CCCEP6yp2a64wIgwAAi10nBIbCSW3/gIIIQc2LQnLrjAiCCEEgedWG6AB0AIwAkAEkB8BEnESgRJxEmESgRJhElESgRJREkESgRJBEjESgRIxEiESgRIhEhESgRIREgESgRIBEfESgRHxEeESgRHhEdESgRHREcESgRHBEbESgRGxEaESgRGhEZESgRGREYESgRGBEXESgRFxEWESgRFhEVESgRFREUESgRFAAeBMYRExEoERMREhEoERIREREoEREREBEoERAPESgPDhEoDg0RKA0MESgMCxEoCwoRKAoJESgJESgIBwZVQNs8IIAQVipZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrOTMFco4w0A8QEZAB8AIACMgV8FISBu8tCAbyYQNV8FAiBu8tCAbyYQJV8FEqDAAPL0VihQDoAQ9FswVihQDoAQ9FswVihYgBD0WzABESgBAoAQ9FswAQL+iBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQREwAhACIAJAAAAAB0b2tlbiBkZWxpc3RlZAFuERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEw+EIBf23bPAD1AuQw0x8BghD+sqdmuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoIAoPf4QlYcAccF8vSBStstwgDy9IBCcG1wIMjLAMnQEEZWEVFGBBA3UHLIVWDbPMlWHgNWJUEzFEMwbW3bPH8A5gD2Ap4w0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhCViABxwWzmPhCViEBxwWzkXDi4w9/ACUAKAH2MPhCESoRKxEqESkRKxEpESgRKxEoEScRKxEnESYRKxEmESURKxElESQRKxEkESMRKxEjESIRKxEiESERKxEhESARKxEgER8RKxEfER4RKxEeER0RKxEdERwRKxEcERsRKxEbERoRKxEaERkRKxEZERgRKxEYERcRKxEXACYD+BEWESsRFhEVESsRFREUESsRFBETESsRExESESsREhERESsREREQESsREA8RKw8OESsODRErDQwRKwwLESsLChErCgkRKwkIESsIBxErBwYRKwYFESsFBBErBAMRKwMCARErAVYrVizbPIgRKBEpESgRJxEoEScRJhEnESYA5QAnAEcAHAAAAABqZXR0b24gdW5zAv5WKo77MPhCESoRKxEqESkRKxEpESgRKxEoEScRKxEnESYRKxEmESURKxElESQRKxEkESMRKxEjESIRKxEiESERKxEhESARKxEgER8RKxEfER4RKxEeER0RKxEdERwRKxEcERsRKxEbERoRKxEaERkRKxEZERgRKxEYERcRKxEXACkAKwP4ERYRKxEWERURKxEVERQRKxEUERMRKxETERIRKxESERERKxERERARKxEQDxErDw4RKw4NESsNDBErDAsRKwsKESsKCRErCQgRKwgHESsHBhErBgURKwUEESsEAxErAwIBESsBVitWLNs8iBEoESkRKBEnESgRJxEmEScRJgDlACoARwAoAAAAAGNvbnRyYWN0IHN0b3BwZWQDSuDTAAHDAeMC+EJWIQHHBY6L1DDQ+gD6ADAB2zzg1DDQ0wchwAEALAAvADQB9jD4QhEqESsRKhEpESsRKREoESsRKBEnESsRJxEmESsRJhElESsRJREkESsRJBEjESsRIxEiESsRIhEhESsRIREgESsRIBEfESsRHxEeESsRHhEdESsRHREcESsRHBEbESsRGxEaESsRGhEZESsRGREYESsRGBEXESsRFwAtA/gRFhErERYRFRErERURFBErERQRExErERMREhErERIRERErEREREBErERAPESsPDhErDg0RKw0MESsMCxErCwoRKwoJESsJCBErCAcRKwcGESsGBRErBQQRKwQDESsDAgERKwFWK1Ys2zyIESgRKREoEScRKBEnESYRJxEmAOUALgBHACYAAAAAcGF5bG9hZCBpbnZhbGlkA+Qziwhw+EFvJBNfA1YrJKC5jhNbf4vmdhcyBub3QgZW5vdWdogB3iCzlCJWJbmRcOKOHlt/jQYZXhlY3V0aW9uIGZlZSBub3QgZW5vdWdogAd7jAjBWGqSAQHD4I3BtJ1E5UThSpMhVcNs8yQIRHgJWHQEAMADeADMB/jERKRErESkRKBEqESgRJxErEScRJhEqESYRJRErESURJBEqESQRIxErESMRIhEqESIRIRErESERIBEqESARHxErER9WKhEfER4RLBEeER0RHBEsERwRGxEaESwRGhEZERgRLBEYERcRFhEsERYRFREUESwRFBETERIRLBESEREAMQP+ERARLBEQDw4RLA4NDBEsDAsKESwKCQgRLAgHBhEsBgUEESwEAwIRKwIBESwBVitWLNs8ESnbPBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHADlAD0AMgHaERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDASf23bPAD1AqYgbpUwWfRbMJRBM/QX4hEVIaByUTBFE1ICAREeAQfIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBxIBEUERsRFBEUERoRFAIRFAJDMHDbPAA4AOoDeo6JMfoA+gAwAds8jy8BwAKOqPoA0gABwP8B0w/SAAHA/wH6APoA03/TH9Qw0PoA03/6ANN/MFUD2zzjDuIANQA5AEQC9vhBbyQTXwOLCHAkVi2gE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN4hs5NTUrmRcOKOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDeIbOUI1YmuZFw4o4dW3+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iDeAeMCMDNWGqSAQAA2ADcB/GwhESkRKxEpESgRKhEoEScRKxEnESYRKhEmESURKxElESQRKhEkESMRKxEjESIRKhEiESERKxEhESARKhEgER8RKxEfER4RKhEeVisRHhEdESsRHREcERsRKxEbERoRGRErERkRGBEXESsRFxEWERURKxEVERQRExErERMREgA8A9h/+CNwbSdROVE4UqTIVXDbPMkCER4CVh0BIG6VMFn0WzCUQTP0F+IRFSGgcVEwRRNSAgERHgEHyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcSARFBEbERQRFBEaERQCERQCQzBw2zwA3gA4AOoAboIQxNAg5FAHyx8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6Ass/yz8D8PhBbyQTXwOLCHAuVjagE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN4hs5NT+bmRcOKOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDecSfCAJMmwgCRcOKSMHLeJcIAkyTCAJFw4pGk3iKzl1YvIahS8LmRcOLjAALjAjA+CgA6ADsAQAA+bCF/jQYZXhlY3V0aW9uIGZlZSBub3QgZW5vdWdogWAH8bNERKRErESkRKBEqESgRJxErEScRJhEqESYRJRErESURJBEqESQRIxErESMRIhEqESIRIRErESERIBEqESARHxErER8RHhEqER5WKxEeER0RKxEdERwRGxErERsRGhEZESsRGREYERcRKxEXERYRFRErERURFBETESsRExESADwD+hERESsREREQDxErDw4NESsNDAsRKwsKCRErCQgHESsHBgURKwUEAxErAwIRLAIBEStWLFYt2zwRKNs8EScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdAOUAPQA/AULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEAPgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAeQRHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMH9t2zwA9QH4kXqSgAviUr6pBBE0ETYRNBEzETURMxEyETYRMhExETURMREwETYRMBEvETURLxEuETYRLhEtETURLREsETYRLBErETURKxEqETYRKhEpETURKREoETYRKBEnETURJxEmETYRJhElETURJREkETYRJBEjETURIxEiETYRIgBBAfgRIRE1ESERIBE2ESARHxE1ER8RHhE2ER4RHRE1ER0RHBE2ERwRGxE1ERsRGhE2ERoRGRE1ERkRGBE2ERgRFxE1ERcRFhE2ERYRFRE1ERURFBE2ERQRExE1ERMREhE2ERIRERE1EREREBE2ERAPETUPDhE2Dg0RNQ0METYMAEIC9gsRNQtWNgvbPDAREFYooBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFgCaAEMBjhEVERcRFREUERYRFBETERURExESERQREhERERMRERESDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECRyQERxcNs8AOoB9jD4QhEqESsRKhEpESsRKREoESsRKBEnESsRJxEmESsRJhElESsRJREkESsRJBEjESsRIxEiESsRIhEhESsRIREgESsRIBEfESsRHxEeESsRHhEdESsRHREcESsRHBEbESsRGxEaESsRGhEZESsRGREYESsRGBEXESsRFwBFA/gRFhErERYRFRErERURFBErERQRExErERMREhErERIRERErEREREBErERAPESsPDhErDg0RKw0MESsMCxErCwoRKwoJESsJCBErCAcRKwcGESsGBRErBQQRKwQDESsDAgERKwFWK1Ys2zyIESgRKREoEScRKBEnESYRJxEmAOUARgBHACoAAAAAb3BlcmF0aW9uIHVua25vd24B/BElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREQBIAVAREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB/bds8APUEyI7GMNMfAYIQSB51Ybry4IHTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iQzBsE9s8f+AgghCrz1h7uo8IMNs8bBbbPH/gIIIQ7vWSTboASgBRAFIAZQP2+EFvJDAygUtpVipWKKATvhLy9FYbgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8oW4FebQGz8vRWI4EBCydxQTP0Cm+hlAHXADCSW23ibrOCAKD3IZF/lFNXxwXi8vSzkTDjDVJwESCAQPRbARIASwBMABqCAJsXAVYvoPgju/L0Af4wI5JWI5JWJOIRKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEwESQRIxEvESMRIhEuESIRIREtESERIBEsESARHxErER8RHhEwER4RHREvER0RHBEuERwRGxEtERsBERoBERkRKxEZERgRMBEYERcRLxEXAE0D+BEWES4RFhEVES0RFQERFAERExErERMREhEwERIREREvEREREBEuERAPES0PHg0RKw0METAMCxEvCwoRLgoJES0JGAcRKwcGETAGBREvBQQRLgQDES0DAlYrAhEuVjDbPFYtbrOXES0gbvLQgJRXLVYr4lYpwgCRMOMNVioA5QBOAE8BIFYpcn9VIG1tbds8D1YooQ8A9gH2kXGRcuICAREqAREoyFUgghC5sDy8UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcREno1YnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdAFAB/BEcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5ECgQNxBWQQXbPADqAI7THwGCEKvPWHu68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH0BPoA+gBVUAP2PvhBbySCAKD3ViSBAQslcUEz9ApvoZQB1wAwkltt4m6z8vRWIIBAKln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFuBXm0Bs/L0VChwUnfbPFYxAaAjs5ZWLVYvoKCTViyg4gWBS2kGvhXy9ChuARIAUwBUAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAP2s5YIIG7y0ICSOCPif4BAI1FbUVcFEEoQI0oJyFVw2zzJAhEgAlQjgCBulTBZ9FswlEEz9BficCSAEIMGWfSGb6UgllAj1wEwWJZsIW0ybQHikIroWzRSL6EBERABoFPhDqEgVhaoghA7msoAqQRRIqACoQEREQGgLhEeAN4AVQBWAOorgBAjWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOOMCBu8tCAbyMBjhESoaiCMA3gtrOnZAAAqQQSoI4RWKGogjAN4Lazp2QAAKkEEqDiAZFb4oAQJgKDBkEz9HxvpSCWUCPXATBYlmwhbTJtAeICRo6PDREdDREQTh8QzRBFAts8jo8NER0NERBOHxDNEEUC2zziAFcAWwPoU/6gcFYXIqG2CSSBKWICu/L0VhLAAJswgjAN4Lazp2QAAI4Qgjg2Ncmtxd6gAACoVhKpBOIjgjg2Ncmtxd6gAACoIakEcX9tcMjJ0CpRO1E3A8hVUNs8yVYXA1YrQTMUQzBtbds8EREkoBETVhGgVh+AQCgAWAD2AFkAyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYE/ln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4iBu8tCAbyg1NVszUpARI4BA9FswIsIAjpFREnJ/VSBtbW3bPBEaIaERGpEx4hB5EGhxBhBaEEkQOQIRFAIpAlYXQAwQRchVoNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFYZbrMBEgD2AGAAWgFEjplxERogbvLQgAyjVhoDERsDEC8QLX/bPBCbkztXGOIQmwDqAqBT/qCCODY1ya3F3qAAAKhWEqkEUwOogjg2Ncmtxd6gAACpBFYfgEAoWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG7y0IBvKDU2W3JwVH2kbQESAFwC+MhVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYrA1YwQTMUQzBtbds8ERUkoREXKKERKBEzESgRJxEyEScRJhExESYRJREwESURJBEvESQRIxEuESMA9gBdAf4RIhEtESIRIREsESERIBErESARHxEqER8RHhEpER4RHREzER1WMhEdERwRMhEcERsRMREbERoRMBEaERkRLxEZERgRLhEYERcRLREXERYRLBEWERURKxEVERQRKhEUERMRNBETERIREREyEREREBExERAPETAPDhEvDh0MES0MAF4D/AsRLgsKESsKCREqCQgRNAgHBhEyBgURMQUEETAEAxEvAxIBETMBVi0BVjIBETFWNds8ViwBERiAQPRbMFYqwgCOkhEuVipyf1UgbW1t2zwPVimhD5JXLuIHESoHBhErBnIGBREpBQQRKAQDES8DAhEwAitUSjABETQBES8QVgDlAPYAXwP+yFWg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVihus5RXIVcn4w0RHBEnERwRGxEmERsRGhElERoRGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQRExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDgBgAGEAZACWghDeMf89UAzLHxrLPxjLPxbLB1AEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWPoCAfoCy38B+gIByMp/WPoCWPoCyQHMAf5xESkgbvLQgBEio1YpESARKxEgER8RKhEfER4RKREeER0RKBEdERwRJxEcERsRJhEbERoRJREaERkRJBEZERgRIxEYERcRIhEXERYRIREWERURIBEVERQRHxEUERMRHhETERIRHRESERERHBERERERGxERDxEaDw4RGQ4NERgNAGIC/gwRFwwLERYLChEVCgkRFAkIERMIBxESBwYREQYFERAFEE8QPhAtEDwQSxBqEDkQSBBGEEV/2zwBEScBChEmCgIRJQIDESQDERcRIxEXBhEiBgcRIQcIESAICREfCQURHgUEER0EAREcAQoRGwoCERoCAxEZAxEXERgRFwYRFwYA6gBjAFgHERYHCBEVCAkRFAkFERMFBBESBAEREQEKERAKEC8QPhBtDF43EFgQR0YGBABkDREYDQ0RFw0LERYLChEVCgkRFAkIERMIBxESBwYREQYFERAFEE8QPk3LEFoQWEYXREQEOo8IMNs8bBjbPH/gIIIQ+U+Au7rjAiCCEAmf9KO6AGYAZwBtAHgAPtMfAYIQ7vWSTbry4IH6ANMP0gD6APoA03/TP9MfVXAB8BEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIREgESgRIBEfES8RHxEeES4RHhEdES0RHREcESwRHBEbESsRGxEaESoRGhEZESkRGREYESgRGBEXES8RFxEWES4RFhEVES0RFREUESwRFABoAvQRExErERMREhEqERIREREpEREREBEoERAPES8PDhEuDg0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRLwcGES4GBREtBQQRLAQDESsDAhEqAgERKQERKNs8+EFvJDCBS2kzVjKhVia+EvL0gV/yVjFWIL7y9IAMcFRwAADyAGkB/BEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGQBqAvYRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnyUQnxCOEH0QWwoJETUJCAcRNQcGBRE1BVY2ARE22zwwERBWKaARJxEpEScAmgBrAfwRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIAbAFeERERExERERIPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJHJAFHFw2zwA6gIQMNs8bBnbPH8AbgBvAELTHwGCEPlPgLu68uCB+gDTD9IA+gDTf/oA03/TP9MfVYAB8BEnETARJxEmES8RJhElES4RJREkES0RJBEjESwRIxEiESsRIhEhESoRIREgESkRIBEfESgRHxEeETARHhEdES8RHREcES4RHBEbES0RGxEaESwRGhEZESsRGREYESoRGBEXESkRFxEWESgRFhEVETARFREUES8RFABwAvwRExEuERMREhEtERIREREsEREREBErERAPESoPDhEpDg0RKA0METAMCxEvCwoRLgoJES0JCBEsCAcRKwcGESoGBREpBQQRKAQDETADAhEvAgERLgERLds8+EFvJDAycFYswgCUVivCAJFw4pIwcd5WM8IAlFYywgCRcOKRpN4A8gBxBPyBS2kDVjChViciqL4T8vSBX/JWICOoVjABvvL0VivCAJRWKsIAkXDijraADXBUcAAgVjQoqQRWN1GYEIlWNghWNlB4BhE2BgURNQVQNAIRNgIBETUBVjrbPDARKBEpESiUVypXKuJWMMIAlFYvwgCRcOLjDwpWJqARIREqESEAmgByAHUAdgH+gA5wVHAAIFYyVjCpBBEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHABzAv4RGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0METUMKxB8CxCaEIkQaAcROAcGETcG2zwwAJoAdAD0BREqBQQRKQQDESgDAhEnAgQRJgQBESUBESQDESMDBREiBQIRIQIEESAEAREfAREeAxEdAwURHAUCERsCBBEaBAERGQERGAMRFwMFERYFAhEVAgQRFAQBERMBERIDEREDBREQBRAvEE5Q3BA7EFoQKRBIUHYQNRA0ECMALAURMAUEES8EAxEuAwIRLQJXKlcqXwQB+BEgESkRIBEfESgRHxEeEScRHhEdESYRHREcESURHBEbESQRGxEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLERMAdwFOCRESCQgREQgHERAHEG8QXhBNEDxLoBkQaBBXEEYQNVA0clAzcNs8AOoEyo7HMNMfAYIQCZ/0o7ry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP1UgbBPbPH/gIIIQLFif0bqPCDDbPGwY2zx/4CCCEBtosFO6AHkAgQCCAKMC9vhBbyQwMlYagEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tW2wzNDWBXm0DsxPy9CTACpF/kyTAC+KdgUtpVi5WLaAYvhfy9JqBS2kHVi6+F/L04lYjgQELJnFBM/QKb6GUAdcAMJJbbeJuswExAHoD9IIAoPchkX+UUzbHBeLy9LOaI8AKkX+TI8AM4pFw4p6CAIekA1YvoPgjuxPy9JEy4idukjcilgcgbvLQgOJwI8AKkX+TI8AL4pI1N+MNUlARHYBA9FswVhzCAI6RBlYccn9VIG1tbds8ERsSoAGTNlcb4hEVIaFWGkBDAHsA9gCAAvhWHYBAKVn0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeIgbrOOxyBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjDFTgHJ/VSBtbW3bPJEw4lJwER6AQPRbMBEdkTDiESkRMBEpAPYAfAH8ESgRLxEoEScRLhEnESYRLREmESURLBElESQRKxEkESMRKhEjESIRMBEiESERLxEhESARLhEgER8RLREfER4RLBEeVisRHhEdESsRHREcETERHBEbETARGxEaES8RGhEZES4RGREYES0RGBEXERYRKxEWERURMREVERQRMBEUAH0C+hETES8RExESES4REhERES0REREQDxErDw4RMQ4NETANDBEvDAsRLgsKES0KCQgRKwgHETEHBhEwBgURLwUEES4EAxEtAwIRLAJWMQIRMQFWMNs8EScRLhEnESYRLREmESURLBElESQRKxEkESMRKhEjESIRKREiESERKBEh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MG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4iBus5QwPVcS4w1WHQERNYBA9FswLMIAjpFRrHJ/VSBtbW3bPBEuK6ERLpE64hEaER0RGgCSAPYAnwJoIG7y0IBvJSTCAJMjwgCRcOKSMzPjDSDCAJMiwgCRcOKVXwM9VxLjDVYdARE0gED0WzARMwCTAJcB+jVygA34QnBUcAAgETARVBEwES8RUxEvES4RUhEuES0RUREtESwRUBEsESsRTxErESoRThEqESkRTREpESgRTBEoEScRSxEnESYRShEmESURSRElESQRSBEkESMRRxEjESIRRhEiESERRREhESARRBEgER8RQxEfER4RQhEeAJQB/hEdEUERHREcEUARHBEbET8RGxEaET4RGhEZET0RGREYETwRGBEXETsRFxEWEToRFhEVETkRFREUETgRFBETETcRExESETYREhERETUREREQETQREA8RMw8OETgODREyDQwRVAwLETELChEyCgkRUgn4I1ZRChCJEHhWPwhWRggAlQL2BwYRNQYFETYFBAMRNQMCETYCAVZYARE22zwwEScRSxEnESYRShEmESURSRElESQRSBEkESMRRxEjESIRRhEiESERRREhESARRBEgER8RQxEfER4RQhEeER0RQREdERwRQBEcERsRPxEbERoRPhEaERkRPREZERgRPBEYAJoAlgDWERcROxEXERYROhEWERUROREVERQROBEUERMRNxETERIRNhESERERNRERERARNBEQDxEzDw4RMg4NETENDBEwDAsRLwsKES4KCREtCQgRLAgHESsHBhEqBgQRKQQCESgCAxEnAxElEFtEQBMB+gOkgA74QnBUcAAgETMRUhEzETIRUREyETERUBExETARTxEwES8RThEvES4RTREuES0RTBEtESwRSxEsESsRShErESoRSREqESkRSBEpESgRRxEoEScRRhEnESYRRREmESURRBElESQRQxEkESMRQhEjESIRQREiESERQBEhAJgB/hEgET8RIBEfET4RHxEeET0RHhEdETwRHREcETsRHBEbEToRGxEaETkRGhEZETgRGREYETcRGBEXETYRFxEWETURFhEVETQRFREUEVIRFBETEVERExESEVAREhEREVAREREQEU8REA8RTQ8OEU4OEL0MEUsMVkkMEHsQagkRNwkAmQL2CBE9CBBXEFYRN/gj2zwwEScRRhEnESYRRREmESURRBElESQRQxEkESMRQhEjESIRQREiESERQBEhESARPxEgER8RPhEfER4RPREeER0RPBEdERwROxEcERsROhEbERoROREaERkROBEZERgRNxEYERcRNhEXERYRNREWAJoAngTwViGkLcAKkX+TLcAL4o4VbDMzKcAMkSaZKcANkSaSJrPi4kEw4w34I4BAcG0uVE0wL1ROMC5UTjAuVEswL1RMMFYXAchVwNs8yQIRJAJWIgEgbpUwWfRbMJRBM/QX4hCaEEVWIAVDFAIRIwJQDRBGEDVZyFXA2zzJAJsA4QCcAJ0AriqzJ8IAkybCAJFw4pF/miXCAJMkwgCRcOLijjdHZYBAUVTIVUBQVPoCEst/AfoCEst/AfoCyQIRIgIBESIBViEBIG6VMFn0WzCUQTP0F+IRIFUgkmxE4gCSghBm70ZfUA7LHxzLBxrLD1AIINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFsoAUAT6Alj6Ast/ygAB+gLLP8s/yx/LHwA4yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERYRFADCERURNBEVERQRMxEUERMRMhETERIRMRESERERMBERERARLxEQDxEuDw4RLQ4NESwNDBErDAsRKgsKESkKCREoCQgRJwgHESYHBhElBgQRJAQCESMCAxEiAxEgARERARsQVgHCERkRHBEZERgRGxEYCBEXCBEWER0RFhEVERwRFREUERsRFBETETMREwgREggREREdEREREBEdERAPERwPDg0RHg0MER4MCxEgCwoRGwoJETMJGAcRHgcFER4FVidZEN4QzQCgAqDIERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHICIG7y0IAGoxBJEEgQRhA1EDRDAHDbPAChAOoB9oIQLywQ5QERHcsfAREbAcs/AREZAcs/AREXAcsHAREVAcs/ARETINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARERAcsPH8oAHcp/UAv6AhnKf1AH+gIFyMt/FMt/Esp/AfoCAfoCEsp/Esp/WPoCyFAD+gJQAwCiAED6AlAD+gJQA/oCE8oAE8t/E8p/UAP6AhPKf8lYzMkBzAQ6jwgw2zxsGds8f+AgghA8dFAXuuMCIIIQ/DOHfboApAClALgA0wDq0x8BghAbaLBTuvLggSDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTP9N/0x/Sf9QB0NJ/MBkYFxYVFEMwAuYy+EFvJDAygUtpVi6qAFYtoBO+EvL0ggCg91YkgQELI3FBM/QKb6GUAdcAMJJbbeJus/L0KG6zlgggbvLQgJI4J+JWHKSAQHNwUwBwIRBX+CN/VhEJVhEJVhEJCAcGBQRDExEVHchVwNs8yQIRHwIZVh0BAOEApgE6IG6VMFn0WzCUQTP0F+IRHQcRGwcQNxA2EDQB2zwApwPuVhWAECZZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeKBbJYhbrPy9CBu8tCAbyk0NDQ1ggCPblAE8vRWIYBALFn0D2+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLTU1W2xjVhGAEC1Z9A9voZIwbd8BJAExAKgD/CBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCy9Z9AtvoZIwbd8gbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4iBus5cgbvLQgG8snTBwVHAAUwBwVHAAUwDiVheWVHupVHupllR1Q1R1Q+KBFHYkwgDy9FNDViSAEAEXARcAqQPuViJZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrOXIG7y0IBvJpcwcFRwAFMA4lYjUAqhK6iCMA3gtrOnZAAAqQRWIlAJoSuogjAN4Lazp2QAAKkEViWOEypWJaFSwKiCMA3gtrOnZAAAqQTjDSxWJqhWIFYioKgBGQCqAKsAJlYkK6FSwKiCMA3gtrOnZAAAqQQB8IIwZ2XHk/oQB52qGqkEViOgggCf7FP7oCShUAOgvvL0UcigLKFWIaGCMA3gtrOnZAAAqFYllAqjK6iTUauo4hqgVh0BER+gViSWghfEZTYAloIQO5rKAOKgGqiCEDuaygCpBAERHQGpBFYogBBWJVn0D2+hkjBt3wCsAv4gbpIwbZ3Q+gDSANN/VSBsE28D4iBus5cgbvLQgG8jlDBwcCHicFNzwgCUVickvZFw4o4/MVM3tghWJ7OOElNSoVIQqIIwDeC2s6dkAACpBI4SUyWhUhCogjAN4Lazp2QAAKkE4lEhoVBVoSDAAJJwM94E3iDCAJEw4w1TdKgBAK0ArgAkM1IyqFMkqKBdoKkEWqBWJUADAv4RIKiCMGdlx5P6EAedqhqpBCARIqiCEDuaygCpBFYhIaEBETYBoFYfVjagARE1AaAoViKhKqAuoaNwVHAAUwBWLY4ZVxxXHFccVxxXHFccVhpWGlYaUayhESQroeMOU/62CQEREAEPobYLL1YqqIIwDeC2s6dkAACpBFYRARErAK8AsAB+VxZXFlcWVxZXFlcWVhRWFFYUUZyhERAroQoRJAoRFxEdERcRFhEcERYRFREbERUCERcCAREWAQkRFQkREAkKA+iogjAN4Lazp2QAAKkEViohtgkBERChARE0AaBWKS+htgsBETShARE0AaAKER0KGQgRMwgXBhEZBgURGAUEERcEAxEWAwIRFQIBERQBEROBAQsRE8hVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERQCGFYhAQDIAMgAsQLqIG6VMFn0WTCUQTP0E+KAEAHIAQH0AMkCESUCVh8BIG6VMFn0WzCUQTP0F+KAEFYXAlYoVEQwJgIBESABESjIVVDbPMkCESECAREjAVYdASBulTBZ9FswlEEz9BfigBBUe6nIVSBa+gISygDLf8kCESICVh0BAMoAsgH4IG6VMFn0WzCUQTP0F+JWHQERNYBA9FswEScRRhEnESYRRREmESURRBElESQRQxEkESMRQhEjESIRQREiESERQBEhESARPxEgER8RPhEfER4RPREeER0RPBEdERwROxEcVjoRHBEbEToRGxEaETkRGhEZETgRGREYETcRGACzA/YRFxE2ERcBERYBERURNBEVERQRMxEUERMRMhETERIRMRESERERMBERERARLxEQDxEuDw4RLQ4NESwNDBErDAsRKQsQigkRRwkIEUYIBxFFBxBWBRFDBQQRQgQDETkDAhE1AgERQAERO1Y+VjdWNFY02zxWL8IAklcx4w0A5QC0ALUBJBExVi9yf1UgbW1t2zwPVi6hDwD2AfgRGhE8ERoRGRE7ERlzERkRGBE4ERgRFxE7ERcRFhE6ERYRFRE5ERURFBFBERQRExEsERMREhEtERIRERErEREREBFCERAPESoP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RjAqAlYpAgERLAEGyFVQ2zzJAhEjAlYeASBulTBZ9FswlEEz9BfigBBUfLrIVSBa+gISygDLf8kCESQCVh4BIG6VMFn0WzCUQTP0F+IAygDLAChQZfoCUAP6AgH6AgH6Alj6AgH6AgH8Vh8BETeAQPRbMBEoEUgRKBEnEUcRJxEmEUYRJhElEUURJREkEUQRJBEjEUMRIxEiEUIRIhEhEUERIREgEUARIBEfET8RHxEeET4RHhEdET0RHVY8ER0RHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERgBERcBERYRNhEWAMwD/hEVETURFREUETQRFBETETMRExESETIREhERETEREREQETAREA8RLw8OES4ODREtDQwRLAwLESsLChEqCgkRSQkIEUgIECcGEUcGBRFFBQQRRgQDETcDAhFDAgERPQFWQQFWPAERMVYz2zxWLsIAklcs4w0RGxE+ERsRGhE9ERoA5QDNAM4BJBEsVi5yf1UgbW1t2zwPVi2hDwD2AfwRGRE8ERkRGBFAERgRFxE7ERcRFhEsERYRFRE5ERURFBEzERQRExEqERMREhE3ERIRERExEREREBE2ERAPET8PDhEvDg0RRQ0MEUMMCxFCC1Y4CwoRNgoJETsJCBEzCAcRNQcGEUUGBRFCBQQRKgQDESkDAhEoAlY7AgERMgEAzwL8EUgQ7xDeELwQq8gRHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHIREyBu8tCAERKjcREewgAMESwMCxErCwoRKgoJESkJCBEoCAcRJwcGESYGBRElBQQRJAQDESMDANAA0gH2ghD9jEnLAREfyx8BER0Byz8BERsByz8BERkBywcBERcByz8BERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMByw8BEREBygAfyn9QDfoCG8p/UAn6AgfIy38Wy38Uyn8Syn8B+gIB+gLKfxLKf8hQA/oCANEAXFAD+gJQA/oCUAP6AlAD+gJQA/oCE8oAE8t/E8p/yFAE+gIUyn/JWMzJAczJAcwBzgIRIgIEESEEAxEgAwIRHwIGER4GBBEdBBESERwREgIRGwIRGREaERkREBEZERAEERgEERIRFhESBREVBQURFAULERMLCRESCQgREQgJERAJEC8QPhBNXikQehApEDgQR14yEDQS2zwA6gQ6jwgw2zxsF9s8f+AgghCI5/knuuMCIIIQlGqYtroA1ADWANsA6wH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAANUABFVgA/SCAKD3+EJWIscF8vT4QW8kMDGBS2kyViy+8vRWGKSAQPgjggP0gKBUaZBUaZBUaZBSkMhVcNs8yQIRHAJWGwEgbpUwWfRbMJRBM/QX4vgjggP0gKAIERoIBxEaBwYRGgYFERoFBBEaBAMRGgMCERoCAREaAchVgNs8yQDXANgA2gDwJ26zmH9QCcoAF8sHmDdwUAjKABBn4hXLPxPLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AssfAaiCEJYoupZQCssfGMs/Jm6zl38BygAWyweWNnBQBsoA4hTLPxLLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEA2QBmIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIByMsfyQHMAUzIgljAAAAAAAAAAAAAAAABActnzMlw+wBy+EIRExEUERNwcXDbPADqA8ww0x8BghCI5/knuvLggdIA0z/TP1UgbBOCAKD3+EJWHscF8vSBS2n4QW8kE18DVihWJ6C+8vRWFYBAI1n0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oErcCFus/L0IG7y0IBvKArjD38BDgDcAN0Bfl8HMiARFYBA9FswERQByFmCEEvDQdVQA8sfyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wBy+EJwcXDbPADqBNA3gXrB+CNQCr4Z8vQkbrOPPQRxIW6SW3CRuuKOrIBAbSBukjBtjo0gbvLQgG8oyFVw2zzJ4gMRIANBQCBulTBZ9FswlEEz9Bfi4w4RHRKSMzPiIm6zkyHCAJFw4uMAJW6zkyPCAJFw4gDeAOAA4wDpAfZQeMoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCAfoCyx/KAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyQEA3wACzAHkgEBtIG6SMG2OjSBu8tCAby3IVcDbPMniAhEeAlJAIG6VMFn0WzCUQTP0F+KAQG0gbpIwbY4bIG7y0IBvJchVQFBU+gISy38B+gISy38B+gLJ4gMRHQNBQCBulTBZ9FswlEEz9BfiERoRHREaAREbAREaAOEBulDNywcayw9QCCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhbKAFAE+gJY+gLLf8oAAfoCyx/KAMhYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWADiAFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzAH0IiBu8tCA+EIRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEvESMRIhEuESIRIREtESERIBEsESARHxErER8RHhEqER5WLxEeER0RLxEdERwRLhEcERsRLREbERoRLBEaERkRKxEZERgRFxEvERcA5AL2ERYRLhEWERURLREVERQRLBEUERMRKxETERIREREvEREREBEuERAPES0PDhEsDg0RKw0MCxEvCwoRLgoJES0JCBEsCAcRKwcGBREvBQQRLgQDES0DAhEwAlYtAlYvAhEyAds8EScRLREnESYRLBEmESURKxElESQRKhEkAOUA5wJOIsIAjx5ycG1wyMnQEGheNBA3yFVg2zzJViVVIBRDMG1t2zySXwXiAOYA9gDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAfgRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREf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iI8IjoiOCI6IjgiNiI4IjYiNCI2IjQiMiI0IjIiMCIyIjAiLiIwIi4iLCIuIiwiKiIsIioiKCIqIikABJgEQAVwRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcSVxBfD1cSVxBfD2xiAREBQIBAVhkCWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjiVhcBARIB9tIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA0x/SAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iMQETAA4YFxYVFEMwAvmyoggbpIwbY4cINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOLbPBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGoAEmARUBtBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPGzubO4+Pj4+Pj4+Pj4+Pj5VsQEWA+ptIW6zj1klgBAkWfQPb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOPNTEgbvLQgG8hgQELAiBu8tCAEln0C2+hkjBt3yBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwzikjAx4pEx4iBunzBwVHAAUwBwVHAAUwBvDN4BFwEXARgAHNM/+gD6ANN/0n/Sf1VQAbYgbvLQgG8sLoAQLln0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPigBBUTx9Z9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIQzRC8EKsQmhCJEHgQZxBWEEUQNEEwARkAHPoA+gD6APoA+gD6AFVQAgEgARsBIAIBIAEcAR0AEbCvu1E0NIAAYAL1sqcINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8EScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZgASYBHgGIERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbKMBHwBGVhuBAQsicUEz9ApvoZQB1wAwkltt4m6zIVYcxwUCVhvHBRICASABIQElAvmyBzbPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFIAEmASIBgBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9sgSBukjBtmSBu8tCAbylvCeIgbpIwbd4BIwE4gBAvAln0D2+hkjBt3yBukjBtjofQ2zxsGW8J4gEkACzUAdAB0gD6APoA0w/6ANMf0x/TH1WAAvmye7bPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFIAEmAS8CQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAEnASwC+Ns8VygRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMBKAErAfb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0x/6APoA+gD6APoA1AHQ+gD6APoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE1DABKQH80PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BNM/9AT0BNM/1DDQ9ATTP/oA+gDTH/QE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoAASoAkNJ/1DDQ0n/6APoA+gD6ANM/9AT0BPQEMBEgESgRIBEgEScRIBEgESYRIBEgESURIBEgESQRIBEgESMRIBEgESIRIBEgESERIAAwERIRExESEREREhERERAREREQDxEQD1UOBNQwcIEAtIIKYloAghAFXUqAggiYloCCEATEtABTAYIK+vCAghAF9eEAbW1xbW0ibSFwIIBkbVRyIlRwAFRwCm1tbfhCjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiYmJAS4BLgEuAS0B2okFEScFBREmBQURJQUFESQFBREjBQURIgUFESEFBREgBQURHwUFER4FBREdBQIRHAIDERsDBREaBQERGQERGAIRFwIDERYDBREVBQERFAEREwIREgIDEREDBREQBU3+EEwQOxBaR5gQRkADBQQBLgBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAFMERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbKMBMAGQVhaAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bB1vDeKAQFYXQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiVhVZATEBrtMH0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gD6ANN/0gD6ANMf0gDUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAQEyAIgg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIxEC0QLBArECoQKRAoECcQJhAlECQQIxZqljc=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPool_init_args({ $$type: 'Pool_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Pool_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
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
    10594: { message: `insufficient quota to supply` },
    11120: { message: `compensate not exist` },
    17312: { message: `leverage too high` },
    19163: { message: `no enough jettons to claim` },
    19305: { message: `gas not enough` },
    23245: { message: `greater than max value` },
    24173: { message: `order is pending` },
    24325: { message: `token cannot be delisted` },
    24562: { message: `execution fee not enough` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31332: { message: `less than min value` },
    31425: { message: `not reach unlock time` },
    32637: { message: `order not exist` },
    34724: { message: `operation limited` },
    36718: { message: `disabled token` },
    39703: { message: `too early` },
    40368: { message: `Contract stopped` },
    40940: { message: `margin is too high to liquidate` },
    41207: { message: `invalid sender` },
    53296: { message: `Contract not stopped` },
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
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateConfig","header":3258856372,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":true,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":true,"format":32}},{"name":"gasConfig","type":{"kind":"simple","type":"GasConfig","optional":true}},{"name":"executorConfig","type":{"kind":"simple","type":"ExecutorConfig","optional":true}},{"name":"contractConfig","type":{"kind":"simple","type":"ContractConfig","optional":true}}]},
    {"name":"ListToken","header":567610288,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"config","type":{"kind":"simple","type":"TokenConfig","optional":false}}]},
    {"name":"DelistToken","header":2604852463,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"ClaimProtocolFee","header":4273121126,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CancelLiquidityOrder","header":1209955681,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteLiquidityOrder","header":2882492539,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateDecreasePerpOrder","header":4009071181,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateTpSlPerpOrder","header":4182737083,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CancelPerpOrder","header":161477795,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecutePerpOrder","header":744005585,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"LiquidatePerpPosition","header":459845715,"fields":[{"name":"liquidationFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"ADLPerpPosition","header":1014255639,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"CreateCompensate","header":4231235453,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecuteOrCancelCompensate","header":2296903975,"fields":[{"name":"isCancel","type":{"kind":"simple","type":"bool","optional":false}},{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCreatedEvent","header":3301974244,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCancelledEvent","header":3115334844,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityPoolUpdatedEvent","header":3727818557,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderCreatedEvent","header":1726957151,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PerpOrderCancelledEvent","header":4073041580,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionIncreasedEvent","header":791417061,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"PerpPositionDecreasedEvent","header":4253829579,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"payout","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"CompensateCreatedEvent","header":2519251606,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateCancelledEvent","header":1271087573,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateExecutedEvent","header":3678790712,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"AccountInfo","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isClaimer","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxLeverage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maintenanceRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolStat","header":null,"fields":[{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalPerpNetValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":false}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GasConfig","header":null,"fields":[{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecutorConfig","header":null,"fields":[{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContractConfig","header":null,"fields":[{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidityOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LiquidityOrderData","header":null,"fields":[{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidityOrder","type":{"kind":"simple","type":"LiquidityOrder","optional":true}}]},
    {"name":"PerpOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderData","header":null,"fields":[{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrder","type":{"kind":"simple","type":"PerpOrder","optional":true}},{"name":"perpOrderEx","type":{"kind":"simple","type":"PerpOrderEx","optional":true}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateData","header":null,"fields":[{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensate","type":{"kind":"simple","type":"Compensate","optional":true}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"accountInfo","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"AccountInfo","optional":false}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":false}},
    {"name":"configData","arguments":[],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"poolStat","arguments":[],"returnType":{"kind":"simple","type":"PoolStat","optional":false}},
    {"name":"liquidityOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LiquidityOrderData","optional":false}},
    {"name":"perpOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PerpOrderData","optional":false}},
    {"name":"compensate","arguments":[{"name":"compensateId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"CompensateData","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Pool_getterMapping: { [key: string]: string } = {
    'accountInfo': 'getAccountInfo',
    'perpPosition': 'getPerpPosition',
    'configData': 'getConfigData',
    'tokenConfig': 'getTokenConfig',
    'poolStat': 'getPoolStat',
    'liquidityOrder': 'getLiquidityOrder',
    'perpOrder': 'getPerpOrder',
    'compensate': 'getCompensate',
    'stopped': 'getStopped',
    'owner': 'getOwner',
}

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ListToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DelistToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimProtocolFee"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreasePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateTpSlPerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelPerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecutePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ADLPerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteOrCancelCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | ListToken | DelistToken | ClaimProtocolFee | null | JettonTransferNotification | CancelLiquidityOrder | ExecuteLiquidityOrder | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ListToken') {
            body = beginCell().store(storeListToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DelistToken') {
            body = beginCell().store(storeDelistToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimProtocolFee') {
            body = beginCell().store(storeClaimProtocolFee(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelLiquidityOrder') {
            body = beginCell().store(storeCancelLiquidityOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteLiquidityOrder') {
            body = beginCell().store(storeExecuteLiquidityOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreasePerpOrder') {
            body = beginCell().store(storeCreateDecreasePerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateTpSlPerpOrder') {
            body = beginCell().store(storeCreateTpSlPerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelPerpOrder') {
            body = beginCell().store(storeCancelPerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecutePerpOrder') {
            body = beginCell().store(storeExecutePerpOrder(message)).endCell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteOrCancelCompensate') {
            body = beginCell().store(storeExecuteOrCancelCompensate(message)).endCell();
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
    
    async getAccountInfo(provider: ContractProvider, account: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('accountInfo', builder.build())).stack;
        const result = loadGetterTupleAccountInfo(source);
        return result;
    }
    
    async getPerpPosition(provider: ContractProvider, tokenId: bigint, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        builder.writeAddress(account);
        let source = (await provider.get('perpPosition', builder.build())).stack;
        const result = loadGetterTuplePerpPositionData(source);
        return result;
    }
    
    async getConfigData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('configData', builder.build())).stack;
        const result = loadGetterTupleConfigData(source);
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
    
    async getPoolStat(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('poolStat', builder.build())).stack;
        const result = loadGetterTuplePoolStat(source);
        return result;
    }
    
    async getLiquidityOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('liquidityOrder', builder.build())).stack;
        const result = loadGetterTupleLiquidityOrderData(source);
        return result;
    }
    
    async getPerpOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('perpOrder', builder.build())).stack;
        const result = loadGetterTuplePerpOrderData(source);
        return result;
    }
    
    async getCompensate(provider: ContractProvider, compensateId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(compensateId);
        let source = (await provider.get('compensate', builder.build())).stack;
        const result = loadGetterTupleCompensateData(source);
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