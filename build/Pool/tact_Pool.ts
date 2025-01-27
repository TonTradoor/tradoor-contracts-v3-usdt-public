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

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
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

export type UpdateContract = {
    $$type: 'UpdateContract';
    code: Slice;
    data: Slice | null;
}

export function storeUpdateContract(src: UpdateContract) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(783354075, 32);
        b_0.storeRef(src.code.asCell());
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data.asCell()); } else { b_0.storeBit(false); }
    };
}

export function loadUpdateContract(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 783354075) { throw Error('Invalid prefix'); }
    let _code = sc_0.loadRef().asSlice();
    let _data = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    return { $$type: 'UpdateContract' as const, code: _code, data: _data };
}

function loadTupleUpdateContract(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'UpdateContract' as const, code: _code, data: _data };
}

function loadGetterTupleUpdateContract(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'UpdateContract' as const, code: _code, data: _data };
}

function storeTupleUpdateContract(source: UpdateContract) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.code.asCell());
    builder.writeSlice(source.data?.asCell());
    return builder.build();
}

function dictValueParserUpdateContract(): DictionaryValue<UpdateContract> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateContract(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateContract(src.loadRef().beginParse());
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

export type JettonUpdateContent = {
    $$type: 'JettonUpdateContent';
    jetton_content: Cell;
}

export function storeJettonUpdateContent(src: JettonUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1536108317, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadJettonUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1536108317) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'JettonUpdateContent' as const, jetton_content: _jetton_content };
}

function loadTupleJettonUpdateContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, jetton_content: _jetton_content };
}

function loadGetterTupleJettonUpdateContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, jetton_content: _jetton_content };
}

function storeTupleJettonUpdateContent(source: JettonUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserJettonUpdateContent(): DictionaryValue<JettonUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadJettonUpdateContent(src.loadRef().beginParse());
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
        b_0.storeUint(2629128772, 32);
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
    if (sc_0.loadUint(32) !== 2629128772) { throw Error('Invalid prefix'); }
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
        b_0.storeUint(3835378672, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.store(storeTokenConfig(src.config));
    };
}

export function loadListToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3835378672) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _config = loadTokenConfig(sc_0);
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function loadTupleListToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    const _config = loadTupleTokenConfig(source);
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
        b_0.storeUint(3983970926, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeUint(src.price, 128);
        b_0.storeInt(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        b_0.storeInt(src.rolloverFeeGrowth, 128);
    };
}

export function loadExecutePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3983970926) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(16);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadIntBig(32);
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
        b_0.storeUint(1189008210, 32);
        b_0.storeAddress(src.liquidationFeeReceiver);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeInt(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        let b_1 = new Builder();
        b_1.storeInt(src.rolloverFeeGrowth, 128);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1189008210) { throw Error('Invalid prefix'); }
    let _liquidationFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadIntBig(32);
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
        b_0.storeUint(3588145116, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeInt(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        let b_1 = new Builder();
        b_1.storeInt(src.rolloverFeeGrowth, 128);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3588145116) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadIntBig(32);
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

export type LiquidityPoolChangedEvent = {
    $$type: 'LiquidityPoolChangedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    account: Address;
    jettonDelta: bigint;
    tlpDelta: bigint;
    tlpPrice: bigint;
    tlpSupply: bigint;
    lpFundAfter: bigint;
    realizedLpFundingFeeDelta: bigint;
    realizedLpRolloverFeeDelta: bigint;
    entryLpFundingFeeGrowth: bigint;
    entryRolloverFeeGrowth: bigint;
}

export function storeLiquidityPoolChangedEvent(src: LiquidityPoolChangedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1212313398, 32);
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
        b_1.storeCoins(src.realizedLpFundingFeeDelta);
        b_1.storeCoins(src.realizedLpRolloverFeeDelta);
        b_1.storeCoins(src.entryLpFundingFeeGrowth);
        b_1.storeCoins(src.entryRolloverFeeGrowth);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidityPoolChangedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1212313398) { throw Error('Invalid prefix'); }
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
    let _realizedLpFundingFeeDelta = sc_1.loadCoins();
    let _realizedLpRolloverFeeDelta = sc_1.loadCoins();
    let _entryLpFundingFeeGrowth = sc_1.loadCoins();
    let _entryRolloverFeeGrowth = sc_1.loadCoins();
    return { $$type: 'LiquidityPoolChangedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadTupleLiquidityPoolChangedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _realizedLpFundingFeeDelta = source.readBigNumber();
    let _realizedLpRolloverFeeDelta = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidityPoolChangedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadGetterTupleLiquidityPoolChangedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _realizedLpFundingFeeDelta = source.readBigNumber();
    let _realizedLpRolloverFeeDelta = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidityPoolChangedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function storeTupleLiquidityPoolChangedEvent(source: LiquidityPoolChangedEvent) {
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
    builder.writeNumber(source.realizedLpFundingFeeDelta);
    builder.writeNumber(source.realizedLpRolloverFeeDelta);
    builder.writeNumber(source.entryLpFundingFeeGrowth);
    builder.writeNumber(source.entryRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserLiquidityPoolChangedEvent(): DictionaryValue<LiquidityPoolChangedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityPoolChangedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityPoolChangedEvent(src.loadRef().beginParse());
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
    requestTime: bigint;
}

export function storePerpOrderCreatedEvent(src: PerpOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2911777263, 32);
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
        b_0.storeUint(src.requestTime, 32);
    };
}

export function loadPerpOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2911777263) { throw Error('Invalid prefix'); }
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
    let _requestTime = sc_0.loadUintBig(32);
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, requestTime: _requestTime };
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
    let _requestTime = source.readBigNumber();
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, requestTime: _requestTime };
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
    let _requestTime = source.readBigNumber();
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, requestTime: _requestTime };
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
    globalLongValueAfter: bigint;
    globalShortValueAfter: bigint;
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
        b_0.storeUint(1197042366, 32);
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
        b_2.storeCoins(src.globalLongValueAfter);
        b_2.storeCoins(src.globalShortValueAfter);
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

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1197042366) { throw Error('Invalid prefix'); }
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
    let _globalLongValueAfter = sc_2.loadCoins();
    let _globalShortValueAfter = sc_2.loadCoins();
    let _lpNetSizeAfter = sc_2.loadCoins();
    let _lpIsLong = sc_2.loadBit();
    let _lpEntryPriceAfter = sc_2.loadUintBig(128);
    let _lpFundAfter = sc_2.loadIntBig(128);
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpTradingFee = sc_3.loadCoins();
    let _lpRealizedPnl = sc_3.loadIntBig(128);
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
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
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    source = source.readTuple();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
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
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
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
    builder.writeNumber(source.globalLongValueAfter);
    builder.writeNumber(source.globalShortValueAfter);
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
    globalLongValueAfter: bigint;
    globalShortValueAfter: bigint;
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
        b_0.storeUint(592660044, 32);
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
        b_2.storeCoins(src.globalLongValueAfter);
        b_2.storeCoins(src.globalShortValueAfter);
        b_2.storeCoins(src.lpNetSizeAfter);
        b_2.storeBit(src.lpIsLong);
        let b_3 = new Builder();
        b_3.storeUint(src.lpEntryPriceAfter, 128);
        b_3.storeInt(src.lpFundAfter, 128);
        b_3.storeCoins(src.lpTradingFee);
        b_3.storeInt(src.lpRealizedPnl, 128);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 592660044) { throw Error('Invalid prefix'); }
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
    let _globalLongValueAfter = sc_2.loadCoins();
    let _globalShortValueAfter = sc_2.loadCoins();
    let _lpNetSizeAfter = sc_2.loadCoins();
    let _lpIsLong = sc_2.loadBit();
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpEntryPriceAfter = sc_3.loadUintBig(128);
    let _lpFundAfter = sc_3.loadIntBig(128);
    let _lpTradingFee = sc_3.loadCoins();
    let _lpRealizedPnl = sc_3.loadIntBig(128);
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
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
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    source = source.readTuple();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
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
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
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
    builder.writeNumber(source.globalLongValueAfter);
    builder.writeNumber(source.globalShortValueAfter);
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
    gasForLpTrader: bigint;
    gasForLpExecutor: bigint;
    gasForPerpTrader: bigint;
    gasForPerpExecutor: bigint;
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
        b_0.storeCoins(src.gasForLpTrader);
        b_0.storeCoins(src.gasForLpExecutor);
        b_0.storeCoins(src.gasForPerpTrader);
        b_0.storeCoins(src.gasForPerpExecutor);
        b_0.storeCoins(src.minTonsForStorage);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasForTransferJetton);
        b_1.storeCoins(src.gasForBurnTlp);
        b_1.storeCoins(src.gasForMintTlp);
        b_1.storeAddress(src.tlpWallet);
        b_1.storeAddress(src.jettonWallet);
        let b_2 = new Builder();
        b_2.storeAddress(src.tlpJetton);
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
    let _gasForLpTrader = sc_0.loadCoins();
    let _gasForLpExecutor = sc_0.loadCoins();
    let _gasForPerpTrader = sc_0.loadCoins();
    let _gasForPerpExecutor = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasForTransferJetton = sc_1.loadCoins();
    let _gasForBurnTlp = sc_1.loadCoins();
    let _gasForMintTlp = sc_1.loadCoins();
    let _tlpWallet = sc_1.loadAddress();
    let _jettonWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _tlpJetton = sc_2.loadAddress();
    let _maxLpNetCap = sc_2.loadCoins();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _gasForLpTrader = source.readBigNumber();
    let _gasForLpExecutor = source.readBigNumber();
    let _gasForPerpTrader = source.readBigNumber();
    let _gasForPerpExecutor = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadGetterTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _gasForLpTrader = source.readBigNumber();
    let _gasForLpExecutor = source.readBigNumber();
    let _gasForPerpTrader = source.readBigNumber();
    let _gasForPerpExecutor = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.gasForLpTrader);
    builder.writeNumber(source.gasForLpExecutor);
    builder.writeNumber(source.gasForPerpTrader);
    builder.writeNumber(source.gasForPerpExecutor);
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
    let _maxLeverage = sc_0.loadUintBig(16);
    let _liquidationFee = sc_0.loadCoins();
    let _maintenanceRate = sc_0.loadUintBig(32);
    let _tradingFeeRate = sc_0.loadUintBig(32);
    let _lpTradingFeeRate = sc_0.loadUintBig(32);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function loadGetterTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
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
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadGetterTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
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
    const _longPosition = loadTuplePerpPosition(source);
    const _shortPosition = loadTuplePerpPosition(source);
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
    perpPositionIndexNext: bigint;
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.perpPositionIndexNext, 64);
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_0.storeBit(false); }
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_0.storeBit(true); b_0.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalPosition(src.globalPosition)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _perpPositionIndexNext = sc_0.loadUintBig(64);
    let _perpPosition = sc_0.loadBit() ? loadDirectionPerpPosition(sc_0) : null;
    let _globalLPPosition = sc_0.loadBit() ? loadGlobalLPPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalPosition = sc_1.loadBit() ? loadGlobalPosition(sc_1) : null;
    return { $$type: 'PerpPositionData' as const, perpPositionIndexNext: _perpPositionIndexNext, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function loadTuplePerpPositionData(source: TupleReader) {
    let _perpPositionIndexNext = source.readBigNumber();
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPositionIndexNext: _perpPositionIndexNext, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function loadGetterTuplePerpPositionData(source: TupleReader) {
    let _perpPositionIndexNext = source.readBigNumber();
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPositionIndexNext: _perpPositionIndexNext, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function storeTuplePerpPositionData(source: PerpPositionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.perpPositionIndexNext);
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
    gasForPerpTrader: bigint;
    gasForPerpExecutor: bigint;
    gasForLpTrader: bigint;
    gasForLpExecutor: bigint;
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
        b_0.storeCoins(src.gasForPerpTrader);
        b_0.storeCoins(src.gasForPerpExecutor);
        b_0.storeCoins(src.gasForLpTrader);
        b_0.storeCoins(src.gasForLpExecutor);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeCoins(src.gasForTransferJetton);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasForBurnTlp);
        b_1.storeCoins(src.gasForMintTlp);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGasConfig(slice: Slice) {
    let sc_0 = slice;
    let _lpMinExecutionFee = sc_0.loadCoins();
    let _perpMinExecutionFee = sc_0.loadCoins();
    let _gasForPerpTrader = sc_0.loadCoins();
    let _gasForPerpExecutor = sc_0.loadCoins();
    let _gasForLpTrader = sc_0.loadCoins();
    let _gasForLpExecutor = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _gasForTransferJetton = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasForBurnTlp = sc_1.loadCoins();
    let _gasForMintTlp = sc_1.loadCoins();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp };
}

function loadTupleGasConfig(source: TupleReader) {
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _gasForPerpTrader = source.readBigNumber();
    let _gasForPerpExecutor = source.readBigNumber();
    let _gasForLpTrader = source.readBigNumber();
    let _gasForLpExecutor = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp };
}

function loadGetterTupleGasConfig(source: TupleReader) {
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _gasForPerpTrader = source.readBigNumber();
    let _gasForPerpExecutor = source.readBigNumber();
    let _gasForLpTrader = source.readBigNumber();
    let _gasForLpExecutor = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, minTonsForStorage: _minTonsForStorage, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp };
}

function storeTupleGasConfig(source: GasConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.gasForPerpTrader);
    builder.writeNumber(source.gasForPerpExecutor);
    builder.writeNumber(source.gasForLpTrader);
    builder.writeNumber(source.gasForLpExecutor);
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
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function loadTupleLiquidityOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function loadGetterTupleLiquidityOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, jettonDelta: _jettonDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function storeTupleLiquidityOrder(source: LiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
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
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
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
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
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
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
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

export type Pool$Data = {
    $$type: 'Pool$Data';
    owner: Address;
    stopped: boolean;
    orderLockTime: bigint;
    maxLpNetCap: bigint;
    lpRolloverFeeRate: bigint;
    gasForPerpTrader: bigint;
    gasForPerpExecutor: bigint;
    gasForLpTrader: bigint;
    gasForLpExecutor: bigint;
    gasForTransferJetton: bigint;
    gasForBurnTlp: bigint;
    gasForMintTlp: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    minTonsForStorage: bigint;
    tlpJetton: Address;
    tlpWallet: Address;
    jettonWallet: Address;
    compensator: Address;
    claimer: Address;
    executors: Dictionary<Address, boolean>;
    tokenConfigs: Dictionary<number, TokenConfig>;
    liquidityOrders: Dictionary<bigint, LiquidityOrder>;
    liquidityOrderIndexNext: bigint;
    perpOrders: Dictionary<bigint, PerpOrder>;
    perpOrderExs: Dictionary<bigint, PerpOrderEx>;
    perpOrderIndexNext: bigint;
    compensates: Dictionary<bigint, Compensate>;
    compensateIndexNext: bigint;
    perpPositionIndexNext: bigint;
    perpPositions: Dictionary<number, AccountPerpPosition>;
    globalLPPositions: Dictionary<number, GlobalLPPosition>;
    globalPositions: Dictionary<number, GlobalPosition>;
    tlpSupply: bigint;
    totalExecutionFee: bigint;
    protocolTradingFee: bigint;
    globalLPFund: bigint;
    globalLPUnrealizedPnl: bigint;
    globalLpFundingFeeGrowth: bigint;
    globalRolloverFeeGrowth: bigint;
}

export function storePool$Data(src: Pool$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.stopped);
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.maxLpNetCap);
        b_0.storeUint(src.lpRolloverFeeRate, 32);
        b_0.storeCoins(src.gasForPerpTrader);
        b_0.storeCoins(src.gasForPerpExecutor);
        b_0.storeCoins(src.gasForLpTrader);
        b_0.storeCoins(src.gasForLpExecutor);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasForTransferJetton);
        b_1.storeCoins(src.gasForBurnTlp);
        b_1.storeCoins(src.gasForMintTlp);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeAddress(src.tlpJetton);
        let b_2 = new Builder();
        b_2.storeAddress(src.tlpWallet);
        b_2.storeAddress(src.jettonWallet);
        b_2.storeAddress(src.compensator);
        let b_3 = new Builder();
        b_3.storeAddress(src.claimer);
        b_3.storeDict(src.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_3.storeDict(src.tokenConfigs, Dictionary.Keys.Uint(16), dictValueParserTokenConfig());
        b_3.storeDict(src.liquidityOrders, Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder());
        b_3.storeUint(src.liquidityOrderIndexNext, 64);
        let b_4 = new Builder();
        b_4.storeDict(src.perpOrders, Dictionary.Keys.BigUint(64), dictValueParserPerpOrder());
        b_4.storeDict(src.perpOrderExs, Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx());
        b_4.storeUint(src.perpOrderIndexNext, 64);
        b_4.storeDict(src.compensates, Dictionary.Keys.BigUint(64), dictValueParserCompensate());
        b_4.storeUint(src.compensateIndexNext, 64);
        b_4.storeUint(src.perpPositionIndexNext, 64);
        let b_5 = new Builder();
        b_5.storeDict(src.perpPositions, Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition());
        b_5.storeDict(src.globalLPPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition());
        b_5.storeDict(src.globalPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalPosition());
        b_5.storeCoins(src.tlpSupply);
        b_5.storeCoins(src.totalExecutionFee);
        b_5.storeCoins(src.protocolTradingFee);
        b_5.storeInt(src.globalLPFund, 128);
        b_5.storeInt(src.globalLPUnrealizedPnl, 128);
        b_5.storeCoins(src.globalLpFundingFeeGrowth);
        b_5.storeCoins(src.globalRolloverFeeGrowth);
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPool$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _stopped = sc_0.loadBit();
    let _orderLockTime = sc_0.loadUintBig(32);
    let _maxLpNetCap = sc_0.loadCoins();
    let _lpRolloverFeeRate = sc_0.loadUintBig(32);
    let _gasForPerpTrader = sc_0.loadCoins();
    let _gasForPerpExecutor = sc_0.loadCoins();
    let _gasForLpTrader = sc_0.loadCoins();
    let _gasForLpExecutor = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasForTransferJetton = sc_1.loadCoins();
    let _gasForBurnTlp = sc_1.loadCoins();
    let _gasForMintTlp = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _tlpJetton = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _tlpWallet = sc_2.loadAddress();
    let _jettonWallet = sc_2.loadAddress();
    let _compensator = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _claimer = sc_3.loadAddress();
    let _executors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_3);
    let _tokenConfigs = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), sc_3);
    let _liquidityOrders = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), sc_3);
    let _liquidityOrderIndexNext = sc_3.loadUintBig(64);
    let sc_4 = sc_3.loadRef().beginParse();
    let _perpOrders = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserPerpOrder(), sc_4);
    let _perpOrderExs = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx(), sc_4);
    let _perpOrderIndexNext = sc_4.loadUintBig(64);
    let _compensates = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserCompensate(), sc_4);
    let _compensateIndexNext = sc_4.loadUintBig(64);
    let _perpPositionIndexNext = sc_4.loadUintBig(64);
    let sc_5 = sc_4.loadRef().beginParse();
    let _perpPositions = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition(), sc_5);
    let _globalLPPositions = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition(), sc_5);
    let _globalPositions = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserGlobalPosition(), sc_5);
    let _tlpSupply = sc_5.loadCoins();
    let _totalExecutionFee = sc_5.loadCoins();
    let _protocolTradingFee = sc_5.loadCoins();
    let _globalLPFund = sc_5.loadIntBig(128);
    let _globalLPUnrealizedPnl = sc_5.loadIntBig(128);
    let _globalLpFundingFeeGrowth = sc_5.loadCoins();
    let _globalRolloverFeeGrowth = sc_5.loadCoins();
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minTonsForStorage: _minTonsForStorage, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, perpPositionIndexNext: _perpPositionIndexNext, perpPositions: _perpPositions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadTuplePool$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _stopped = source.readBoolean();
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _gasForPerpTrader = source.readBigNumber();
    let _gasForPerpExecutor = source.readBigNumber();
    let _gasForLpTrader = source.readBigNumber();
    let _gasForLpExecutor = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    source = source.readTuple();
    let _minTonsForStorage = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tokenConfigs = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), source.readCellOpt());
    let _liquidityOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), source.readCellOpt());
    let _liquidityOrderIndexNext = source.readBigNumber();
    let _perpOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrder(), source.readCellOpt());
    let _perpOrderExs = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx(), source.readCellOpt());
    let _perpOrderIndexNext = source.readBigNumber();
    let _compensates = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserCompensate(), source.readCellOpt());
    source = source.readTuple();
    let _compensateIndexNext = source.readBigNumber();
    let _perpPositionIndexNext = source.readBigNumber();
    let _perpPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition(), source.readCellOpt());
    let _globalLPPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition(), source.readCellOpt());
    let _globalPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalPosition(), source.readCellOpt());
    let _tlpSupply = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minTonsForStorage: _minTonsForStorage, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, perpPositionIndexNext: _perpPositionIndexNext, perpPositions: _perpPositions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadGetterTuplePool$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _stopped = source.readBoolean();
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _gasForPerpTrader = source.readBigNumber();
    let _gasForPerpExecutor = source.readBigNumber();
    let _gasForLpTrader = source.readBigNumber();
    let _gasForLpExecutor = source.readBigNumber();
    let _gasForTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tokenConfigs = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), source.readCellOpt());
    let _liquidityOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), source.readCellOpt());
    let _liquidityOrderIndexNext = source.readBigNumber();
    let _perpOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrder(), source.readCellOpt());
    let _perpOrderExs = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx(), source.readCellOpt());
    let _perpOrderIndexNext = source.readBigNumber();
    let _compensates = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserCompensate(), source.readCellOpt());
    let _compensateIndexNext = source.readBigNumber();
    let _perpPositionIndexNext = source.readBigNumber();
    let _perpPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition(), source.readCellOpt());
    let _globalLPPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition(), source.readCellOpt());
    let _globalPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalPosition(), source.readCellOpt());
    let _tlpSupply = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, gasForPerpTrader: _gasForPerpTrader, gasForPerpExecutor: _gasForPerpExecutor, gasForLpTrader: _gasForLpTrader, gasForLpExecutor: _gasForLpExecutor, gasForTransferJetton: _gasForTransferJetton, gasForBurnTlp: _gasForBurnTlp, gasForMintTlp: _gasForMintTlp, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minTonsForStorage: _minTonsForStorage, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, perpPositionIndexNext: _perpPositionIndexNext, perpPositions: _perpPositions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function storeTuplePool$Data(source: Pool$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.stopped);
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
    builder.writeNumber(source.gasForPerpTrader);
    builder.writeNumber(source.gasForPerpExecutor);
    builder.writeNumber(source.gasForLpTrader);
    builder.writeNumber(source.gasForLpExecutor);
    builder.writeNumber(source.gasForTransferJetton);
    builder.writeNumber(source.gasForBurnTlp);
    builder.writeNumber(source.gasForMintTlp);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.compensator);
    builder.writeAddress(source.claimer);
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.tokenConfigs.size > 0 ? beginCell().storeDictDirect(source.tokenConfigs, Dictionary.Keys.Uint(16), dictValueParserTokenConfig()).endCell() : null);
    builder.writeCell(source.liquidityOrders.size > 0 ? beginCell().storeDictDirect(source.liquidityOrders, Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder()).endCell() : null);
    builder.writeNumber(source.liquidityOrderIndexNext);
    builder.writeCell(source.perpOrders.size > 0 ? beginCell().storeDictDirect(source.perpOrders, Dictionary.Keys.BigUint(64), dictValueParserPerpOrder()).endCell() : null);
    builder.writeCell(source.perpOrderExs.size > 0 ? beginCell().storeDictDirect(source.perpOrderExs, Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx()).endCell() : null);
    builder.writeNumber(source.perpOrderIndexNext);
    builder.writeCell(source.compensates.size > 0 ? beginCell().storeDictDirect(source.compensates, Dictionary.Keys.BigUint(64), dictValueParserCompensate()).endCell() : null);
    builder.writeNumber(source.compensateIndexNext);
    builder.writeNumber(source.perpPositionIndexNext);
    builder.writeCell(source.perpPositions.size > 0 ? beginCell().storeDictDirect(source.perpPositions, Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition()).endCell() : null);
    builder.writeCell(source.globalLPPositions.size > 0 ? beginCell().storeDictDirect(source.globalLPPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition()).endCell() : null);
    builder.writeCell(source.globalPositions.size > 0 ? beginCell().storeDictDirect(source.globalPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalPosition()).endCell() : null);
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.totalExecutionFee);
    builder.writeNumber(source.protocolTradingFee);
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLPUnrealizedPnl);
    builder.writeNumber(source.globalLpFundingFeeGrowth);
    builder.writeNumber(source.globalRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserPool$Data(): DictionaryValue<Pool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPool$Data(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('te6ccgICAQUAAQAAVvwAAAEU/wD0pBP0vPLICwABAgFiAAIAAwLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8EScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdAPgABAIBIAAFAAYCuhEcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPPLgggAJAAoCASAA1ADVAgEgAAcACAIBSADeAN8CASAA7QDuBKDtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQnLVSRLqPCDDbPGwW2zx/4CCCEFuPJx26jpQw0x8BghBbjycduvLggdQBMds8f+AgghDkmzvwugALAAwADQAOAYTI+EMBzH8BygARKBEnESYRJREkESMRIhEhESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQAKwOu0x8BghCctVJEuvLggdIAAZLTH5JtAeLSAAGS+gCSbQHi0gABktMfkm0B4tQB0NIAAY6E2zxvCpFt4gHUMNDSAAGRbeMNAdQw0NIAAZIwbeMNEDYQNRA0AA8AEAARAfARJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREtESERIBEsESARHxErER8RHhEqER4RHREpER0RHBEoERwRGxEtERsRGhEsERoRGRErERkRGBEqERgRFxEpERcRFhEoERYRFREtERURFBEsERQAEgHwEScRKBEnESYRKBEmESURKBElESQRKBEkESMRKBEjESIRKBEiESERKBEhESARKBEgER8RKBEfER4RKBEeER0RKBEdERwRKBEcERsRKBEbERoRKBEaERkRKBEZERgRKBEYERcRKBEXERYRKBEWERURKBEVERQRKBEUABsEiI8ZMNMfAYIQ5Js78Lry4IHTD9s8EHhsGNs8f+AgghCbQuTvuo6VMNMfAYIQm0Lk77ry4IHTDwEx2zx/4CCCEP6yp2a6APcAHgAfACAAUPoA+gD6APoA+gD6APoA+gDUAdD6APoAMBAqECkQKBAnECYQJRAkECMAivQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBvAwDK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTbwMD/hETESsRExESESoREhERESkREREQESgREA8RLQ8OESwODRErDQwRKgwLESkLChEoCgkRLQkIESwIBxErBwYRKgYFESkFBBEoBAMRLQMCESwCARErAREq2zxXI1cjVyMRJiBu8tCAESUgbvLQgBEqIG7y0IBWJ26zklcn4w1WJ24AzQATABQAaFcTVxNXE1YkIG7y0IBvI1tWJSBu8tCAbyMwMREmIG7y0IBvI2whERIRJhESAREUARESERME+LOSVyfjDVYnbrOSVyfjDYgRIhEoESIRIREnESERIxEmESMRIhElESIRIhEkESIRHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREAFQAWABcAGAH4VxBXEFYlIG7y0IBvI1sggQELcVn0gm+lIJZQI9cAMFiWbCFtMm0B4pCOQYEBCwGRf5Ft4gIREQJWEQFxIW6VW1n0WTCYyAHPAEEz9EHigQELIgIREXFBM/R0b6UgllAj1wAwWJZsIW0ybQHi6F8DViUgbvLQgG8jMDERJgAZAfhXFFcUVxRXFFcUVxRXFFcUVxRXFFYdIG7y0IBvKhB5XwlWHiBu8tCAbyoQaV8JVh8gbvLQgG8qEFlfCVYgIG7y0IBvKhBJXwlWISBu8tCAbyoQOV8JViIgbvLQgG8qEClfCVYjIG7y0IBvKl8JViQgbvLQgG8qEIlfCVYlABoAJAAAAABjb25maWcgdXBkYXRlZAFyERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIcBA2QTD4QgF/bds8ANEAHCBu8tCAbyNsIQ8RJhEQAIwgbvLQgG8qGV8JESYgbvLQgG8qbJERExEmERMIERwIBxEbBwYRGgYFERkFAxEYAxETERcRExEWAhEVAgERFAEEERMEEDRZAvgRExEoERMREhEoERIREREoEREREBEoERAPESgPDhEoDg0RKA0MESgMCxEoCwoRKAoJESgJESgIBwZVQNs8ESjIAYIQW48nHVjLH8zJEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgAM0AHAH8ER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZf21WGhEcERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8AB0BJBCrEJoQiRB4EGcQVgQFVSDbPADRAfARJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEvER8RHhEuER4RHREtER0RHBEsERwRGxErERsRGhEqERoRGREpERkRGBEoERgRFxEvERcRFhEuERYRFREtERURFBEsERQAIQHwEScRKBEnESYRKBEmESURKBElESQRKBEkESMRKBEjESIRKBEiESERKBEhESARKBEgER8RKBEfER4RKBEeER0RKBEdERwRKBEcERsRKBEbERoRKBEaERkRKBEZERgRKBEYERcRKBEXERYRKBEWERURKBEVERQRKBEUACYD/o9zMNMfAYIQ/rKnZrry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKCAKD3+EJWGAHHBfL0gUrbJ8IA8vRwgEJwbSPIUhDLAMnQJhBoEF0EB1UgyFVg2zzJVhkESIgUQzBtbds8MHAEf+AgwAAi10nBIbAAxQDSAC4D/BETESsRExESESoREhERESkREREQESgREA8RLw8OES4ODREtDQwRLAwLESsLChEqCgkRKQkIESgIBxEvBwYRLgYFES0FBBEsBAMRKwMCESoCAREpAREo2zwFES4FBBEtBAMRLAMCESsCAREqAREpgBARKchVYNs8yRA9AhEjAgDNACIAIwAyyFAHzxbJUAfMFMoAEssPAfoCyx8Syx/LHwL6AREqASBulTBZ9FswlEEz9BfiiBEgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8AJAAlACAAAAAAdG9rZW4gbGlzdGVkAXgOERYODREVDQwRFAwBERMBChESCgkREQkIERAIEH8QbhBdEEwQOxAqEDkQOBA3EDYQNRA0EvhCAX9t2zwA0QT6ERMRKBETERIRKBESERERKBERERARKBEQDxEoDw4RKA4NESgNDBEoDAsRKAsKESgKCREoCREoCAcGVUDbPCeAEFYqWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiIG6zkTDjDVYoARETgBD0WzBWKFAIgBD0WzBWKFAJgBD0WzAAzQDsACcAKABCgV8FISBu8tCAbyYQNV8FAiBu8tCAbyYQJV8FEqDAAPL0AvoBESgBCYAQ9FswiBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFQApACoAJAAAAAB0b2tlbiBkZWxpc3RlZAF2ERQRFREUERMRFBETBxETBxERERIREREQEREREA8REA8Q7xDeEM0QvBobEGcQVhBFEDQQI/hCAX9t2zwA0QHcAREoAREnINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARElAcoAAREjAcsfAREh+gIBER8Byx8BER36AgERG/oCAREZ+gIBERf6AsgBERb6AgERFPoCARES+gIBERD6AlAO+gJQDPoCUAoALAH+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFAJINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgAtAOTIUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYS9AD0ABL0ABLLPwPI9AAU9AAUyz8U9AAUyz8Uyz8FyPQAFvQAFvQAUAb6AlAG+gJQBvoCFsp/Fsp/UAf6AlAF+gLJAczJAczJAczJWMzJAcwE7JJbf+AgghBzYtCcuo9VMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBT4QlYbAccFs5j4QlYcAccFs5Fw4o6EMCDbPOMOf+AgghBIHnVhuuMCIIIQq89Ye7oASAAvADAAMQNcViqRf5XTAAHDAeKOhDAg2zzg+EJWHAHHBY6K1DDQ+gAwcAPbPODUMNDTByHAAQBIAEQAQwGMMNMfAYIQSB51Ybry4IHTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iQzBsE9s8fwAyBDqPCDDbPGwW2zx/4CCCEO71kk264wIgghD5T4C7ugA4ADkAOgA7Avb4QW8kMDKBS2lWJlYloBO+EvL0VhWAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuKBf30hbrPy9CBu8tCAbyaBXm0Bs/L0VhyBAQsnWfQKb6ExggCg9yGRf5RTV8cF4vL0s5yBF+YBVi+g+CO78vSRMOJScBEagED0WzAA5wAzAfQjklYeklYf4hEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkETARJBEjES8RIxEiES4RIhEhES0RIREgESwRIBEfESsRHxEeETARHhEdES8RHREcES4RHBEbES0RGxEaESwRGhEZESsRGREYETARGAA0AvgRFxEvERcRFhEuERYRFREtERUBERQBERMRKxETERIRMBESERERLxERERARLhEQDxEtDx4NESsNDBEwDAsRLwsKES4KCREtCRgHESsHBhEwBgURLwUEES4EAxEtAwJWKwIRLlYw2zxWLW6zlxEtIG7y0ICUVy1WK+JWKcIAAMMANQL6jpFWKXJ/VSBtbW3bPDAEViihBJEw4hEqkXGRcuICAREpAREnyFUgghC5sDy8UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVhxWG6ARJqMRJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8A0gA2AfwRHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoANwESEDlIcBYTFds8AMcAjtMfAYIQq89Ye7ry4IHTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfQE+gD6AFVQA/Q4+EFvJDAyggCg91YbgQELI1n0Cm+hMfL0VhiAQChZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuKBf30hbrPy9CBu8tCAbyaBXm0Bs/L0Vislk1YpoJZWKlYsoKDigUtpUYG+GPL0f4BAJlRGMCZURjYByFVQ2zzJAhEeAgDnAE8AUAIQMNs8bBjbPH8APAA9BMqPCDDbPGwZ2zx/4CCCEAmf9KO6jscw0x8BghAJn/SjuvLggSDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHTP9M/VSBsE9s8f+AgghDtdpJuugBbAFwAXQBeAD7THwGCEO71kk268uCB+gDTD9IA+gD6ANN/0z/TH1VwAfARJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEvER8RHhEuER4RHREtER0RHBEsERwRGxErERsRGhEqERoRGREpERkRGBEoERgRFxEvERcRFhEuERYRFREtERURFBEsERQAPgL0ERMRKxETERIRKhESERERKRERERARKBEQDxEvDw4RLg4NES0NDBEsDAsRKwsKESoKCREpCQgRKAgHES8HBhEuBgURLQUEESwEAxErAwIRKgIBESkBESjbPPhBbyQwgUtpM1YyoVYlvhLy9IFf8lYxVh2+8vQRKBEuESgAzgA/AfwRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMAQAL2ERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIcIAMVEF2BRExBQQDETEDAgERMQFWMgERMts8MAVWKaARJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESNWIhElAIoAQQH8ESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOAEIBLhC9EKwQmxCKEHkYEFcQRhA1ECRDANs8AMcDgo6IMfoAMH8D2zyPNAHAAo6o+gDSANMP0gD6ANN/0x/UMND6ANN/+gDTfzAQvBCrEJoQiRB4VQPbPI6EMCDbPOLiAEQARQBIBML4QW8kE18DJDAiViK5joYwMTIg2zzgViYjoLmOhTEyINs84FYVpIBA+CNwJ1RHMCZUSDDIVVDbPMkCERkCVhgBIG6VMFn0WzCUQTP0F+JRsqAEkXGRcuJRMFQjFAERGAEHAEgASABPAEYD9PhBbyQTXwMsVjKguY6IEHtfC1EQ2zzgcSXCAJMkwgCRcOKSMHLeI8IAkyLCAJFw4pGk3lYpIahS0LmOiBCMXwxRENs84AuRepKAC+JTy6kEETARNxEwES8RNhEvES4RNREuES0RNBEtESwRMxEsESsRMhErESoRMREqAEgASABJAljIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBWIggRFAgIERMIQAjbPABHAMcAboIQxNAg5FAHyx8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6Ass/yz8CXCLCAI8l+EJwgEJwbSPIUhDLAMnQEGoQWRBIEDfIVWDbPMkUQzBtbds8MJJfBOIAxQDSAfwRKRE3ESkRKBE2ESgRJxE1EScRJhE0ESYRJREzESURJBEyESQRIxExESMRIhE3ESIRIRE2ESERIBE1ESARHxE0ER8RHhEzER4RHREyER0RHBExERwRGxE3ERsRGhE2ERoRGRE1ERkRGBE0ERgRFxEzERcRFhEyERYRFRExERUASgT0ERQRNxEUERMRNhETERIRNRESERERNBERERARMxEQDxEyDw4RMQ4NETcNDBE2DAsRNQsKETQKCREzCQgRMggXVjEHBhE2BgURNQUEETQEETMD2zxWKsIAlFYtwgCRcOKRf5xWLMIAlFYrwgCRcOLi4w9WKaARIhEpESIAigBLAEwATQCiVi+AQBEwqQQEESsEAxEuAwIRLQIBESwByFVAUFT6AhLLfwH6AhLLfwH6AskQPAIRKwIBESgBIG6VMFn0WzCUQTP0F+IRJREnESURJBEmESQJACYwBBEtBAMRLAMCESsCVylXKV8DAfgRIREoESERIBEnESARHxEmER8RHhElER5WHRElER0RJBEdERwRIxEcERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNAE4BUAwREwwLERILChERCgkREAkQjxB+EG0QXBBLEDpJgBBnEFYQRQME2zwAxwBcUFbKAFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAfoCyx/KAATGUsAgbpUwWfRbMJRBM/QX4nAogBCDBln0hm+lIJZQI9cBMFiWbCFtMm0B4pCK6Fs4Um2hUtyhIFYvqIIQO5rKAKkEU8CgAREQAaBRH6EBERABoFP3oCTjD1LPgED0WzBWHsIAAFEAUgBTAFQAzFYWgBAjWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOOICBu8tCAbyMToagBkXGRf+KogjAN4Lazp2QAAKkEEqABkVvigBAqAoMGQTP0fG+lIJZQI9cBMFiWbCFtMm0B4gLYcFYxIqG2CSOBKWICu/L0VhLAAJswgjAN4Lazp2QAAI4Qgjg2Ncmtxd6gAACoVhKpBOIigjg2Ncmtxd6gAACoIakEf21wyMnQKlE5UTYDyFVQ2zzJVicCViwCQzBwAW1t2zwwEREjoBETVhGgAFUA0gL+gjg2Ncmtxd6gAACoVhKpBFMCqII4NjXJrcXeoAAAqQR/VHxHbchVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYmAlYtAkMwcAFtbds8MBERVhGhERMjoQDSAFYD4o6hKm6zlgogbvLQgJI6JeJWHnJ/VSBtbW3bPDAREVYdoRERkTriBJFxkXLiXjcGEDUQJBAjAhEQAi0CVhMCERFUHg1WERBnyFXA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERSjEEleM14xE9s8ANIAWgDHAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAfgRJxE0EScRJhEzESYRJREyESURJBExESQRIxEwESMRIhEvESIRIREuESERIBEtESARHxEsER8RHhErER4RHREqER0RHBEpERwRGxEoERsRGhE0ERoRGREzERkRGBEyERgRFxExERdWMBEXERYRMBEWERURLxEVERQRLhEUAFcC+hETES0REw8REg8RERErEREREBEqERAPESkPDhE1Dg0RNA0METMMCxEyCwoJETAJCBEvCBcGES0GEDUEES4EAwIRMAIBESoBETFWM1YqVjNWLds8EScRNBEnESYRMxEmESURMhElESQRMREkESMRMBEjESIRLxEiESERLhEhAMMAWAH4ESARLREgER8RLBEfER4RKxEeER0RKhEdERwRKREcERsRKBEbERoRJxEaERkRJhEZERgRJREYERcRJBEXERYRIxEWERURIhEVERQRIREUERMRIBETERIRHxESERARHREQDxEcDw4RGw4NERoNDBEZDAsRGAsKERcKCREWCQBZADYIERUIBxEUBwMREwMFERIFAxERAw8QPkmGECQApIIQSEJvNlAOyx8cyz8ayz8YywdQBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAE+gJY+gLLfwH6AgHIyn9Y+gJY+gJY+gJY+gLJAcwAQtMfAYIQ+U+Au7ry4IH6ANMP0gD6ANN/+gDTf9M/0x9VgAHwEScRMBEnESYRLxEmESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RMBEeER0RLxEdERwRLhEcERsRLREbERoRLBEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURMBEVERQRLxEUAF8D8vhBbyQwMlYUgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwvigX99IW6z8vQgbvLQgG8rbDM0NYFebQOzE/L0JMAKkX+TJMAL4lYsIZNWKqDegUtpUZG+GfL0Vh6BAQsoWfQKb6ExggCg9yGRf5RTWMcF4vL0s5Fw4w0BBABmAGcEOo8IMNs8bBjbPH/gIIIQRt7TUrrjAiCCENXev9y6AG4AbwBwAHEC/BETES4RExESES0REhERESwREREQESsREA8RKg8OESkODREoDQwRMAwLES8LChEuCgkRLQkIESwIBxErBwYRKgYFESkFBBEoBAMRMAMCES8CAREuAREt2zz4QW8kMDJwVizCAJRWK8IAkXDikjBx3lYzwgCUVjLCAJFw4pGk3gDOAGAD/IFLaQNWMKFWJiKovhPy9IFf8lYdI6hWMAG+8vRWK8IAlFYqwgCRcOKOqIANcFYwJKkEVjNRVBBFVjIEVjJQNAIRMgIBETEBVjbbPDARKBEpESiUVypXKuJWMMIAlFYvwgCRcOKOFgURMAUEES8EAxEuAwIRLQJXKlcqXwTjDQCKAGEAYgH2gA5wVi5WLKkEESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYAGMB/hEqViagVhwBESSoESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4AZQL+ERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDkIETEIJxA4BxBWEEUQJAMRNAMCETMC2zwwBREqBQQRKQQDESgDAhEnAgCKAGQA1AQRJgQBESUBESQDESMDBREiBQIRIQIEESAEAREfAREeAxEdAwURHAUCERsCBBEaBAERGQERGAMRFwMFERYFAhEVAgQRFAQBERMBERIDEREDBREQBRAvEE5Q3BA7EFoQKRBIUHYQNRA0ECMBZg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEugEGkQVxBGEDVQQhPbPADHABQlwAqRf5MlwAziA/ydgRfmBVYxoPgjuxXy9JE04nAEkjAx4w1SYBEYgED0WzBWF8IAjp8nbpI3IpYHIG7y0IDiVhdyf1UgbW1t2zwwAREWoBEVkzdXFuILVhWhS0PIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wAAaADSAGkC+lYYgEAqWfQPb6GSMG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4iBus47IIG7y0IBvJSgFwgCTA8IAkjNw4pQzVEET3gHCAJLCAJIwcOKRoJEw4iDCAI6NNFMjcn9VIG1tbds8MJEw4lKAERmAQPRbMBEYkTDiESkRMREpANIAagEWERKjAhESAhAo2zwAxwH4ESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiESERMREhESARMBEgER8RLxEfER4RLhEeER0RLREdERwRLBEcERsRKxEbERoRKhEaERkRMREZVjARGREYETARGBEXES8RFxEWES4RFhEVES0RFQBrAvgRFBEsERQRExErERMREhEyERIREREQETAREA8RLw8OES4ODREtDQwRLAwLESsLChEyCgkIETAIBxEvBwYRLgYFES0FBBEsBAMRKwMCETECVjBZESxWL9s8EScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiAMMAbAH4ESERKREhESARKBEgER8RJxEfER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDABtADwLERMLChESCgkREQkIERAIEH8QbhBdEEwQO0oYUJYAltMfAYIQ7XaSbrry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP9MP03/SH9J/0n9VcAL0MjP4QW8kMDKCAKD3VhyBAQsjWfQKb6Ex8vRWF4BAKFn0D2+hkjBt3yBukjBtjofQ2zxsG28L4oF/fSFus/L0IG7y0IBvKyrACpF/kyrAC+IgmoFLaQ5WNr4e8vSdgUtpVjZWNKAfvh7y9OKBXm0Bs/L0f4BA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LsIAklcU4w0AgACBAIICcCBu8tCAbyUkwgCTI8IAkXDikjMz4w0gwgCTIsIAkXDimV8DAhEQAj4+MOMNVh4BES+AQPRbMBEuAIMAhAEmERQucn9VIG1tbds8MBEkLaERJADSAd4RHBEeERwRGxEdERsRGhEeERoJERkJERgRHREYERcRHhEXCREWCREVERQRHREUERMRHhETEREREhERCRERCQEREAEPES4PDhEuDg0RKA0MCxEdCwoJES4JECcQJhAlECQQI1YiAgERLwEPERAPEO8AjgH+NXKADXD4IxEsEVIRLBErEVERKxEqEVARKhEpEU8RKREoEU4RKBEnEU0RJxEmEUwRJhElEUsRJREkEUoRJBEjEUkRIxEiEUgRIhEhEUcRIREgEUYRIBEfEUURHxEeEUQRHhEdEUMRHREcEUIRHBEbEUERGxEaEUARGhEZET8RGQCFAf4DpIAOcPgjETARUBEwES8RTxEvES4RThEuES0RTREtESwRTBEsESsRSxErESoRShEqESkRSREpESgRSBEoEScRRxEnESYRRhEmESURRRElESQRRBEkESMRQxEjESIRQhEiESERQREhESARQBEgER8RPxEfER4RPhEeER0RPREdAIgC+hEYET4RGBEXET0RFxEWETwRFhEVETsRFREUEToRFBETETkRExESETgREhERETcREREQETYREA8RNQ8OETIOEJ0METMMCxExCwoRMAoJES8JCBEuCAcRLQcGEVIGBRFRBVZQBRA0Vj4EVkAEVj9QNAIRMQIBEVYBVjIB2zwwAIoAhgH8EScRTREnESYRTBEmESURSxElESQRShEkESMRSREjESIRSBEiESERRxEhESARRhEgER8RRREfER4RRBEeER0RQxEdERwRQhEcERsRQREbERoRQBEaERkRPxEZERgRPhEYERcRPREXERYRPBEWERUROxEVERQROhEUERMRORETAIcAoBESETgREhERETcREREQETYREA8RNQ8OETQODREzDQwRMgwLETELChEwCgcRLgcJES0JBhEsBgURKwUEESoEAxEpAwIRKAIBEScBESYQSEEwAf4RHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERgRFxE3ERcRFhE2ERYRFRE1ERURFBE0ERQRExEzERMREhFQERIHEREHERARMREQDxFPDw4RTg4NEU0NDBFMDAsRSwsKEUoKCRFJCVZICRA4BxE2BwYRNwYFETUFECQDETYDAIkC+AIRNwIRNQHbPDARJxFHEScRJhFGESYRJRFFESURJBFEESQRIxFDESMRIhFCESIRIRFBESERIBFAESARHxE/ER8RHhE+ER4RHRE9ER0RHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERgRFxE3ERcRFhE2ERYRFRE1ERUAigCLA9xWF6QpwAqRf5MpwAvikiazjhApwAyRJpkpwA2RJpIms+Li4vgjgEBwLVRMMC5UTTAtVE0wLVRKMFROu8hVoNs8yQIRHQJWGwEgbpUwWfRbMJRBM/QX4hCJEDRWGQQDAhEcAlAMEDVEAMhVsNs8yQCSAIwAjQC4ERQRNBEUERMRMxETERIRMhESERERMRERERARMBEQDxEvDw4RLg4NES0NDBEsDAsRKwsKESoKBxEoBwkRJwkGESYGBRElBQQRJAQDESMDAhEiAgERIQERIBC9EIwAjoIQrY4x71ANyx8bywcZyw9QByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXKAFAD+gIB+gLLf8oAAfoCyz/LP8sfADbIgljAAAAAAAAAAAAAAAABActnzMlw+wAREA4CosgRHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFYjARESqPhCDKMCERICEKxBsBrbPACPAMcB9IIQR1lqvgERH8sfAREdAcs/AREbAcs/AREZAcsHAREXAcs/AREVINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARETAcsPARERAcoAH8p/UA36AhvKf1AJ+gIHyMt/Fst/FMp/WPoCAfoCyn/Kf1j6AshQA/oCAJAAXFAD+gJQA/oCUAP6AlAD+gJQA/oCE8oAE8t/E8p/yFAE+gIUyn/JWMzJAczJAcwA6tMfAYIQRt7TUrry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z/Tf9If0n/UAdDSfzAZGBcWFRRDMAB2UKvLBxjLD1AGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFMoAWPoCAfoCy3/KAAH6AssfygAD9lYbgBAnWfQPb6GSMG3fIG6SMG2Oh9DbPGwXbwfigWyWIW6z8vQgbvLQgG8nNDWCAI9uUATy9FYcgEAtWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIG7y0IBvKxAqXwpWF4AQLFn0D2+hkjBt3yBukjBtl9D0BAExbwHiIAD3AQQAlAP0brOXIG7y0IBvIZIwbeIggQELLln0C2+hkjBt3yBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwziIG6zlyBu8tCAbyydMHBUcABTAHBUcABTAOJWFpZUe6lUe6mWVHVDVHVD4oEUdiTCAPL0U0NWKoAQViFZ9A9voZIwbd8A6gDqAJUC/iBukjBtjofQ2zxsFm8G4iBus5ggbvLQgG8mW5gwcFRwAFMAW+JWIFAIoSmogjAN4Lazp2QAAKkEVh9QB6EpqIIwDeC2s6dkAACpBFYijhNWISmhUqCogjAN4Lazp2QAAKkEjhMoViKhUqCogjAN4Lazp2QAAKkE4ipWI6hWHwEA7ACWAe4RH6ABER4BqIIwZ2XHk/oQB52qGqkEVhugggCf7FPIoCOhAREfoL4BER0B8vRRlaBWG6FWGaGCMA3gtrOnZAAAqFYhlAejKKiTUXio4hegViCWghfEZTYAloIQO5rKAOJWHAGgGKiCEDuaygCpBBepBFYsgBBWIgCXAfxZ9A9voZIwbd8gbpIwbZ3Q+gDSANN/VSBsE28D4iBus5cgbvLQgG8jlDBwcCHicFNTwgCUViQkvZFw4o4/MVM1tghWJLOOElNSoVIQqIIwDeC2s6dkAACpBI4SUyWhUhCogjAN4Lazp2QAAKkE4lEhoVBVoSDAAJJwM94E3iAAmAL+wgCOEjNSMqhTJKigXaCpBFqgViJAA5Ew4lNUqAERH6iCMGdlx5P6EAedqhqpBCARHaiCEDuaygCpBFYcIaEBES0BoFYeVi2gAREsAaAmVh2hKKBWHqGjcFRwAFMAViqOGFcaVxpXGlcaVxpXGlYYVhhWGFHqoVH5oeMOIFYnqACZAJoAeFcUVxRXFFcUVxRXFFYSVhJWElHaoVHJoREVERsRFREUERoRFBETERkREwIRFQIBERQBDRETDRDvEN4MDQP8gjAN4Lazp2QAAKkEUtARKKiCMA3gtrOnZAAAqQQKER0KEDkQKBB/BhEZBgURGAUEERcEAxEWAwIRFQIBERQBEROBAQsRE8hVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERQCGFYgASBulTBZ9FkwlEEz9BPigBAByAEB9ADJAKsAqwCbAvwCESsCVh4BIG6VMFn0WzCUQTP0F+KAEFR0KFYtVh8syFVQ2zzJAhEpAlYeASBulTBZ9FswlEEz9BfigBBUeT3IVSBa+gISygDLf8kCESoCVh4BIG6VMFn0WzCUQTP0F+JWHgERMIBA9Fsw+EIRKBFIESgRJxFHEScRJhFGESYArQCcAfgRJRFFESURJBFEESQRIxFDESMRIhFCESIRIRFBESERIBFAESARHxE/ER8RHhE+ER4RHRE9ER0RHBE8ERwRGxE7ERsRGhE6ERoRGRE5ERkRGBE4ERhWNxEYERcRNxEXERYRNhEWERURNREVERQRNBEUERMRMxETERIRMhESAJ0D/gIREQIREBEwERAPES8PDhEuDg0RLQ0MESwMCxFJCwoRMQoJESoJCBFICAcRRwcGEUUGBREtBQQRRAQDEUMDAhFCAgEROAFWQQFWNgFWOwERO9s8VjLCAI6TETdWMnJ/VSBtbW3bPDAEVjGhBJJXN+IRHBE+ERwRGxE9ERtzERsAwwDSAJ4B/hEaEUMRGhEZET0RGREYETwRGBEXETsRFxEWEUURFhEVEUARFREUETARFBETES4RExESEUcREhERES0REREQESoREA8RNA8OETEODRE1DVYzDQwROgwLETkLChEsCgkRQgkIESkIBxEqBwYROwYFEUcFBBEwBAMRQwMCES0CVjAAnwL+AgERRgEROBEQEREREA8REA8Q3hDNyBEgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEVwgCSVhSRcOJSMKD4QhEVowoRKgoJESkJCBEoCAcRJwcGESYGBRElBQCyAKAB/AQRJAQDESMDAhEiAhEWESERFgIRIAIRFhEfERYRGREeERkGER0GAhEcAhEWERsRFhEZERoRGQgRGQgDERgDERMRFxETERERFhERChEVChEQERQREA0REw0NERINERAREREQAxEQAxB/EC4QPRAsEEsQShApEGgQJxA2QUDbPADHBP4gbpIwbZfQ9AQBMW8B4iBus5cgbvLQgG8hkjBt4iCBAQtWEln0C2+hkjBt3yBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwziIG6zlyBu8tCAbyydMHBUcABTAHBUcABTAOJWGpZUe6lUe6mWVHVDVHVD4oEUdiTCAPL0Vh4kvOMAAOoA6gCiAKMAClceIhEeAv5WLYAQViNZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrOYIG7y0IBvJluYMHBUcABTAFviViBQBqEnqIIwDeC2s6dkAACpBFYfUAWhJ6iCMA3gtrOnZAAAqQRWMoAQVidZ9A9voZIwbd8gbpIwbZ3Q+gDSANN/VSBsE28D4iBuAOwApAH+s5cgbvLQgG8jlDBwcCHicFYmJMIAlFYpJL2RcOKOQjEjVie2CFYps44TViYjoVIQqIIwDeC2s6dkAACpBI4TIlYnoVIQqIIwDeC2s6dkAACpBOJRIaFQVaEgwACScDPeBN4gwgCOEzNSMqgiViaooF2gqQRaoFYnQAORMOJwIAClAfpWKMIAjjtbViZWJqhWIaiCMGdlx5P6EAedqhqpBCARI6iCEDuaygCpBFYiIaEBETQBoCFWNKABETMBoBEyETMRIpJXI+IuViqOFFYnLaFWKQGogjAN4Lazp2QAAKkEjhQsViihVikBqIIwDeC2s6dkAACpBOJUfwugJKEpoQCmBP4BEREBoIIA88khwv/y9FYqwgCVVipWELmRcOKUVivAAJFw4pxXK1YqViqoL6kEESveVishvJRXK1Yq3lYroQ9WKqFWKFYoERJWEaEiwgDjD1YqjhhXFlcWVxZXFlcWVxYnVh0oBlYcoQRWJaHjDiBWJaiCMA3gtrOnZAAAqQQpAKcAqACpAKoA/FYujhRWK1YRoVIwqIIwDeC2s6dkAACpBI4UVhBWLKFSMKiCMA3gtrOnZAAAqQTiI1YtqAERKAERJaABESQBqIIwZ2XHk/oQB52qGqkEAREkoFYQgW+7ESeguQERJQHy9C6BQ6ARJKhWJC+ogjAN4Lazp2QAAKkEvgERIwHy9AB2VxBbPz9XHlceVx5XHlF4oAERJAEIoHBUcABTAAYRKQYDESIDDhEhDgERIAENER8NEF8OEE0QLEUTQUQAoFcQVxBXEFcQVxBXECdWHSgFVhyhCFYloREUER0RFBESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwCERECAREQARBfEL0IBQYEA+ZWJqiCMA3gtrOnZAAAqQQQrhBJEDgQNwYRHwYQXQQRFAQDERMDAhESAgEREQEREIEBCxEQyFWwEGwQWxBKEDlIfNs8yFVQB9s8yQHMyQIREQIVViEBIG6VMFn0WTCUQTP0E+KAEAHIAQH0AMkCES0CVh8BAKsAqwCsACJQVss/UAP6AgH6Ast/yn/KfwL4IG6VMFn0WzCUQTP0F+KAEFYTVHhzU5jIVVDbPMkCESsCVh8BIG6VMFn0WzCUQTP0F+KAEFR+3MhVIFr6AhLKAMt/yQIRLAJWHwEgbpUwWfRbMJRBM/QX4lYgAREygED0WzD4QhEpEUoRKREoEUkRKBEnEUgRJxEmEUcRJgCtAK4AKFBl+gJQA/oCAfoCAfoCWPoCAfoCAfQRJRFGESURJBFFESQRIxFEESMRIhFDESIRIRFCESERIBFBESARHxFAER8RHhE/ER4RHRE+ER0RHBE9ERwRGxE8ERsRGhE7ERoRGRE6ERlWOREZERgROREYERcROBEXERYRNxEWERURNhEVERQRNREUERMRNBETAhESAgCvA/wREREyEREREBExERAPETAPDhEvDg0RLg0MESsMCxEzCwoRLAoJEUsJCBFKCAcRSQcGEUgGBRFHBQQRRgQDEUUDAhE6AlZEAlY/AhE8Ads8Vi/CAI6TETZWL3J/VSBtbW3bPDAEVi6hBJJXNuIRHRFAER0RHBE/ERwRGxE+ERsAwwDSALAB/hEaESgRGhEZET0RGREYETwRGBEXETsRFxEWETARFhEVES0RFREUETkRFBETETMRExESETgREhEREUIREREQETIREA8RLw8OEUcODREpDVY6DQwROAwLETcLChEyCgkRRwkIEUYIBxFCBwYRRQYFEUQFBBEtBAMRLAMCESsCViwAsQL+AgERNgERKREQEREREA8REA8Q3hDNyBEgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEcwgCSViGRcOJSIKD4QhERowkRKgkIESkIBxEoBwYRJwYFESYFBBElBACyALMB9IIQI1NGTAERIcsfAREfAcs/AREdAcs/AREbAcsHAREZAcs/AREXINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAREVAcsPARETAcoAARERAcp/UA/6Ah3Kf1AL+gIJyMt/GMt/Fsp/FMp/WPoCAfoCyn/Kf8hYALQB6AMRJAMCESMCER0RIhEdAhEhAhEdESARHQIRHwILER4LAhEcAgsRGwsRExEaERMREBEZERACERgCERYRFxEWCxEWCwQRFQQEERQEERIRExESCRESCQwREQwLERALEJ8QvhBNEIwQexA6EGleJRBFEDRBMNs8AMcAcvoCUAP6AlAD+gJQA/oCUAP6AlAD+gJQA/oCUAP6AhPKAAPIy38Uyn9QBPoCFMp/yVADzMlYzMkBzAH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAALkD9IIAoPf4QlYexwXy9PhBbyQwMYFLaTJWKr7y9FYSpIBA+COCAVGAoFRpkFRpkFRpkFKQyFVw2zzJAhEWAlYVASBulTBZ9FswlEEz9Bfi+COCAVGAoAgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQByFWA2zzJALoAuwC8A8ow0x8BghCI5/knuvLggdIA0z/TP1UgbBOCAKD3+EJWGscF8vSBS2n4QW8kE18DViZWJKC+8vQvgEAjWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjigStwIW6z8vQgbvLQgG8oCuMPfwDkAL4AvwLujqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEC6xCNu6jjow0x8BghAusQjbuvLggdQB0AHSAAGT1AHQkW3iEmwSyFjPFsn7BCBus5zIASBu8tCAzxbJ7VSRMOJ/4MAAkTDjDXAA0QDIAARVYADwJ26zmH9QCcoAF8sHmDdwUAjKABBn4hXLPxPLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AssfAaiCEJYoupZQCssfGMs/Jm6zl38BygAWyweWNnBQBsoA4hTLPxLLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEAvQFEyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EJWIhDeAXDbPADHAGYgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgHIyx/JAcwBel8HMlIPgED0WzBQ7shZghBLw0HVUAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EJWIgFw2zwAxwP8N4F6wfgjUAq+GfL0JG6zjjQEcSFukltwkbrimBEYEoBA9FswjhtSIBEXgED0WzARFRKAQPRbMBEVERcRFREUERXiERdZkjMz4iJus5MhwgCRcOIgkmwi4w0kbrOTIsIAkXDijpMEIG7y0IB/WANyECNtbW3bPDACkjIz4lIQAMAA0gDBAfwDIG7y0ID4QhEqES8RKhEpES4RKREoES0RKBEnESwRJxEmESsRJhElES8RJREkES4RJBEjES0RIxEiESwRIhEhESsRIREgES8RIBEfES4RHxEeES0RHhEdESwRHREcESsRHBEbES8RGxEaES4RGlYtERoRGREtERkRGBEsERgAwgGCERCAQPRbMALIWYIQ20XkOFADyx/LP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA2SVh6RcOJWIgGg+EJw2zwAxwL0ERcRMBEXERYRLxEWERURFBEtERQRExEsERMREhEwERIREREvEREREA8RLQ8OESwODREwDQwRLwwLChEtCgkRLAkIETAIBxEvBwYFES0FBBEsBAMRLgNWLgMCES0CAREt2zwRJxEsEScRJhErESYRJREqESURJBEpESQAwwDEAlgiwgCPI3JwbXDIUhDLAMnQEGheNBA3yFVg2zzJViJVIBRDMG1t2zwwkl8F4gDFANIB+BEjESgRIxEiEScRIhEhESYRIREgESURIBEfESQRHxEeESMRHhEdESIRHREcESERHBEbESARGxEaER8RGhEZER4RGREYER0RGBEXERwRFxEWERsRFhEVERoRFREUERkRFBETERgRExESERcREhERERYREREQERUREA8RFA8AxgDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDX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APoA+gBVUAIBIADvAPACASAA8wD0ABGwr7tRNDSAAGAC9bKnCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGYAD4APEBiBEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82yjAPIALlYUgQELIln0Cm+hMSFWGMcFAlYXxwUSAvmyBzbPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFIAD4APUC+bJ7ts8EScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUgAPgA+QGAERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD2yBIG6SMG2ZIG7y0IBvJ28H4iBukjBt3gD2ATqAEFYUAln0D2+hkjBt3yBukjBtjofQ2zxsF28H4gD3ACTUAdAB0gDTD/oA0x/TH9MfVWACQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAD6APsBTBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82yjAQMC+Ns8VygRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMA/AD9BPYwcIEAtHAgghAExLQAVHAAUwCCCJiWgIIK+vCAghAF9eEAIo0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABImJiW1tbXFtbSJtUxFtbW0BAQEBAQEBAgHE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANMf+gDTH/oA+gD6APoA1AHQ+gD6APoA+gD6APoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMNAA/gAwERIRExESEREREhERERAREREQDxEQD1UOAcb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMNAA/wH++kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE9ATTP9Qw0PQE9ATTP/QE0z/TP9Qw0PQE9AT0BPoA+gD6ANJ/0n/6APoAMBEfESgRHxEfEScRHxEfESYRHxEfESURHxEfESQRHxEfESMRHxEfESIRHxEfESERHwEAAAwRHxEgER8AQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAeFYcVHAAVHAA+EIRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4AGOVhCAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bBtvC+KAQFYRQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiL1kBBABs0wfTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA03/SAPoA0x/SAFWg');
    const __system = Cell.fromBase64('te6cckICAQcAAQAAVwgAAAEBwAABAQWg6L8AAgEU/wD0pBP0vPLICwADAgFiAAQA0QLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8EScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdAPoABQK6ERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCAAYAzQSg7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEJy1UkS6jwgw2zxsFts8f+AgghBbjycduo6UMNMfAYIQW48nHbry4IHUATHbPH/gIIIQ5Js78LoABwALABUAGQOu0x8BghCctVJEuvLggdIAAZLTH5JtAeLSAAGS+gCSbQHi0gABktMfkm0B4tQB0NIAAY6E2zxvCpFt4gHUMNDSAAGRbeMNAdQw0NIAAZIwbeMNEDYQNRA0AAgACQAKAFD6APoA+gD6APoA+gD6APoA1AHQ+gD6ADAQKhApECgQJxAmECUQJBAjAIr0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbwMAyvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE28DAfARJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREtESERIBEsESARHxErER8RHhEqER4RHREpER0RHBEoERwRGxEtERsRGhEsERoRGRErERkRGBEqERgRFxEpERcRFhEoERYRFREtERURFBEsERQADAP+ERMRKxETERIRKhESERERKRERERARKBEQDxEtDw4RLA4NESsNDBEqDAsRKQsKESgKCREtCQgRLAgHESsHBhEqBgURKQUEESgEAxEtAwIRLAIBESsBESrbPFcjVyNXIxEmIG7y0IARJSBu8tCAESogbvLQgFYnbrOSVyfjDVYnbgDGAA0ADgBoVxNXE1cTViQgbvLQgG8jW1YlIG7y0IBvIzAxESYgbvLQgG8jbCEREhEmERIBERQBERIREwT4s5JXJ+MNVidus5JXJ+MNiBEiESgRIhEhEScRIREjESYRIxEiESURIhEiESQRIhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREQAPABEAEwAUAfhXEFcQViUgbvLQgG8jWyCBAQtxWfSCb6UgllAj1wAwWJZsIW0ybQHikI5BgQELAZF/kW3iAhERAlYRAXEhbpVbWfRZMJjIAc8AQTP0QeKBAQsiAhERcUEz9HRvpSCWUCPXADBYlmwhbTJtAeLoXwNWJSBu8tCAbyMwMREmABAAHCBu8tCAbyNsIQ8RJhEQAfhXFFcUVxRXFFcUVxRXFFcUVxRXFFYdIG7y0IBvKhB5XwlWHiBu8tCAbyoQaV8JVh8gbvLQgG8qEFlfCVYgIG7y0IBvKhBJXwlWISBu8tCAbyoQOV8JViIgbvLQgG8qEClfCVYjIG7y0IBvKl8JViQgbvLQgG8qEIlfCVYlABIAjCBu8tCAbyoZXwkRJiBu8tCAbypskRETESYREwgRHAgHERsHBhEaBgURGQUDERgDERMRFxETERYCERUCAREUAQQREwQQNFkAJAAAAABjb25maWcgdXBkYXRlZAFyERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIcBA2QTD4QgF/bds8AMoB8BEnESgRJxEmESgRJhElESgRJREkESgRJBEjESgRIxEiESgRIhEhESgRIREgESgRIBEfESgRHxEeESgRHhEdESgRHREcESgRHBEbESgRGxEaESgRGhEZESgRGREYESgRGBEXESgRFxEWESgRFhEVESgRFREUESgRFAAWAvgRExEoERMREhEoERIREREoEREREBEoERAPESgPDhEoDg0RKA0MESgMCxEoCwoRKAoJESgJESgIBwZVQNs8ESjIAYIQW48nHVjLH8zJEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgAMYAFwH8ER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZf21WGhEcERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8ABgBJBCrEJoQiRB4EGcQVgQFVSDbPADKBIiPGTDTHwGCEOSbO/C68uCB0w/bPBB4bBjbPH/gIIIQm0Lk77qOlTDTHwGCEJtC5O+68uCB0w8BMds8f+AgghD+sqdmugD4ABoAIAAmAfARJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEvER8RHhEuER4RHREtER0RHBEsERwRGxErERsRGhEqERoRGREpERkRGBEoERgRFxEvERcRFhEuERYRFREtERURFBEsERQAGwP8ERMRKxETERIRKhESERERKRERERARKBEQDxEvDw4RLg4NES0NDBEsDAsRKwsKESoKCREpCQgRKAgHES8HBhEuBgURLQUEESwEAxErAwIRKgIBESkBESjbPAURLgUEES0EAxEsAwIRKwIBESoBESmAEBEpyFVg2zzJED0CESMCAMYAHAAdADLIUAfPFslQB8wUygASyw8B+gLLHxLLH8sfAvoBESoBIG6VMFn0WzCUQTP0F+KIESARKBEgER8RJxEfER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDwAeAB8AIAAAAAB0b2tlbiBsaXN0ZWQBeA4RFg4NERUNDBEUDAEREwEKERIKCRERCQgREAgQfxBuEF0QTBA7ECoQORA4EDcQNhA1EDQS+EIBf23bPADKAfARJxEoEScRJhEoESYRJREoESURJBEoESQRIxEoESMRIhEoESIRIREoESERIBEoESARHxEoER8RHhEoER4RHREoER0RHBEoERwRGxEoERsRGhEoERoRGREoERkRGBEoERgRFxEoERcRFhEoERYRFREoERURFBEoERQAIQT6ERMRKBETERIRKBESERERKBERERARKBEQDxEoDw4RKA4NESgNDBEoDAsRKAsKESgKCREoCREoCAcGVUDbPCeAEFYqWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiIG6zkTDjDVYoARETgBD0WzBWKFAIgBD0WzBWKFAJgBD0WzAAxgDtACIAIwBCgV8FISBu8tCAbyYQNV8FAiBu8tCAbyYQJV8FEqDAAPL0AvoBESgBCYAQ9FswiBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFQAkACUAJAAAAAB0b2tlbiBkZWxpc3RlZAF2ERQRFREUERMRFBETBxETBxERERIREREQEREREA8REA8Q7xDeEM0QvBobEGcQVhBFEDQQI/hCAX9t2zwAygP+j3Mw0x8BghD+sqdmuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoIAoPf4QlYYAccF8vSBStsnwgDy9HCAQnBtI8hSEMsAydAmEGgQXQQHVSDIVWDbPMlWGQRIiBRDMG1t2zwwcAR/4CDAACLXScEhsAC7AMsAJwTsklt/4CCCEHNi0Jy6j1Uw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhCVhsBxwWzmPhCVhwBxwWzkXDijoQwINs84w5/4CCCEEgedWG64wIgghCrz1h7ugA0ACgANQA8A1xWKpF/ldMAAcMB4o6EMCDbPOD4QlYcAccFjorUMND6ADBwA9s84NQw0NMHIcABADQAKgApA4KOiDH6ADB/A9s8jzQBwAKOqPoA0gDTD9IA+gDTf9Mf1DDQ+gDTf/oA038wELwQqxCaEIkQeFUD2zyOhDAg2zzi4gAqAC0ANATC+EFvJBNfAyQwIlYiuY6GMDEyINs84FYmI6C5joUxMiDbPOBWFaSAQPgjcCdURzAmVEgwyFVQ2zzJAhEZAlYYASBulTBZ9FswlEEz9BfiUbKgBJFxkXLiUTBUIxQBERgBBwA0ADQAPwArAljIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBWIggRFAgIERMIQAjbPAAsAL8AboIQxNAg5FAHyx8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6Ass/yz8D9PhBbyQTXwMsVjKguY6IEHtfC1EQ2zzgcSXCAJMkwgCRcOKSMHLeI8IAkyLCAJFw4pGk3lYpIahS0LmOiBCMXwxRENs84AuRepKAC+JTy6kEETARNxEwES8RNhEvES4RNREuES0RNBEtESwRMxEsESsRMhErESoRMREqADQANAAuAfwRKRE3ESkRKBE2ESgRJxE1EScRJhE0ESYRJREzESURJBEyESQRIxExESMRIhE3ESIRIRE2ESERIBE1ESARHxE0ER8RHhEzER4RHREyER0RHBExERwRGxE3ERsRGhE2ERoRGRE1ERkRGBE0ERgRFxEzERcRFhEyERYRFRExERUALwT0ERQRNxEUERMRNhETERIRNRESERERNBERERARMxEQDxEyDw4RMQ4NETcNDBE2DAsRNQsKETQKCREzCQgRMggXVjEHBhE2BgURNQUEETQEETMD2zxWKsIAlFYtwgCRcOKRf5xWLMIAlFYrwgCRcOLi4w9WKaARIhEpESIAfAAwADEAMgCiVi+AQBEwqQQEESsEAxEuAwIRLQIBESwByFVAUFT6AhLLfwH6AhLLfwH6AskQPAIRKwIBESgBIG6VMFn0WzCUQTP0F+IRJREnESURJBEmESQJACYwBBEtBAMRLAMCESsCVylXKV8DAfgRIREoESERIBEnESARHxEmER8RHhElER5WHRElER0RJBEdERwRIxEcERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNADMBUAwREwwLERILChERCgkREAkQjxB+EG0QXBBLEDpJgBBnEFYQRQME2zwAvwJcIsIAjyX4QnCAQnBtI8hSEMsAydAQahBZEEgQN8hVYNs8yRRDMG1t2zwwkl8E4gC7AMsBjDDTHwGCEEgedWG68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4kMwbBPbPH8ANgL2+EFvJDAygUtpViZWJaATvhLy9FYVgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbigX99IW6z8vQgbvLQgG8mgV5tAbPy9FYcgQELJ1n0Cm+hMYIAoPchkX+UU1fHBeLy9LOcgRfmAVYvoPgju/L0kTDiUnARGoBA9FswAOcANwH0I5JWHpJWH+IRKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEwESQRIxEvESMRIhEuESIRIREtESERIBEsESARHxErER8RHhEwER4RHREvER0RHBEuERwRGxEtERsRGhEsERoRGRErERkRGBEwERgAOAL4ERcRLxEXERYRLhEWERURLREVAREUARETESsRExESETAREhERES8REREQES4REA8RLQ8eDRErDQwRMAwLES8LChEuCgkRLQkYBxErBwYRMAYFES8FBBEuBAMRLQMCVisCES5WMNs8Vi1us5cRLSBu8tCAlFctViviVinCAAC6ADkC+o6RVilyf1UgbW1t2zwwBFYooQSRMOIRKpFxkXLiAgERKQERJ8hVIIIQubA8vFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFYcVhugESajESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfAMsAOgH8ER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKADsBEhA5SHAWExXbPAC/BDqPCDDbPGwW2zx/4CCCEO71kk264wIgghD5T4C7ugA9AD4ASwBTAI7THwGCEKvPWHu68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH0BPoA+gBVUAP0OPhBbyQwMoIAoPdWG4EBCyNZ9ApvoTHy9FYYgEAoWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbigX99IW6z8vQgbvLQgG8mgV5tAbPy9FYrJZNWKaCWVipWLKCg4oFLaVGBvhjy9H+AQCZURjAmVEY2AchVUNs8yQIRHgIA5wA/AEAAXFBWygBQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6AssfygAExlLAIG6VMFn0WzCUQTP0F+JwKIAQgwZZ9IZvpSCWUCPXATBYlmwhbTJtAeKQiuhbOFJtoVLcoSBWL6iCEDuaygCpBFPAoAEREAGgUR+hAREQAaBT96Ak4w9Sz4BA9FswVh7CAABBAEIARABJAMxWFoAQI1n0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPiIG6zjiAgbvLQgG8jE6GoAZFxkX/iqIIwDeC2s6dkAACpBBKgAZFb4oAQKgKDBkEz9HxvpSCWUCPXATBYlmwhbTJtAeIC2HBWMSKhtgkjgSliArvy9FYSwACbMIIwDeC2s6dkAACOEII4NjXJrcXeoAAAqFYSqQTiIoI4NjXJrcXeoAAAqCGpBH9tcMjJ0CpROVE2A8hVUNs8yVYnAlYsAkMwcAFtbds8MBERI6ARE1YRoABDAMsAyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYC/oI4NjXJrcXeoAAAqFYSqQRTAqiCODY1ya3F3qAAAKkEf1R8R23IVTCCEFlfB7xQBcsfE8s/AfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4slWJgJWLQJDMHABbW3bPDAREVYRoRETI6EAywBFAfgRJxE0EScRJhEzESYRJREyESURJBExESQRIxEwESMRIhEvESIRIREuESERIBEtESARHxEsER8RHhErER4RHREqER0RHBEpERwRGxEoERsRGhE0ERoRGREzERkRGBEyERgRFxExERdWMBEXERYRMBEWERURLxEVERQRLhEUAEYC+hETES0REw8REg8RERErEREREBEqERAPESkPDhE1Dg0RNA0METMMCxEyCwoJETAJCBEvCBcGES0GEDUEES4EAwIRMAIBESoBETFWM1YqVjNWLds8EScRNBEnESYRMxEmESURMhElESQRMREkESMRMBEjESIRLxEiESERLhEhALoARwH4ESARLREgER8RLBEfER4RKxEeER0RKhEdERwRKREcERsRKBEbERoRJxEaERkRJhEZERgRJREYERcRJBEXERYRIxEWERURIhEVERQRIREUERMRIBETERIRHxESERARHREQDxEcDw4RGw4NERoNDBEZDAsRGAsKERcKCREWCQBIADYIERUIBxEUBwMREwMFERIFAxERAw8QPkmGECQD4o6hKm6zlgogbvLQgJI6JeJWHnJ/VSBtbW3bPDAREVYdoRERkTriBJFxkXLiXjcGEDUQJBAjAhEQAi0CVhMCERFUHg1WERBnyFXA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERSjEEleM14xE9s8AMsASgC/AKSCEEhCbzZQDssfHMs/Gss/GMsHUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBPoCWPoCy38B+gIByMp/WPoCWPoCWPoCWPoCyQHMAhAw2zxsGNs8fwBMAE0APtMfAYIQ7vWSTbry4IH6ANMP0gD6APoA03/TP9MfVXAB8BEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIREgESgRIBEfES8RHxEeES4RHhEdES0RHREcESwRHBEbESsRGxEaESoRGhEZESkRGREYESgRGBEXES8RFxEWES4RFhEVES0RFREUESwRFABOAvQRExErERMREhEqERIREREpEREREBEoERAPES8PDhEuDg0RLQ0MESwMCxErCwoRKgoJESkJCBEoCAcRLwcGES4GBREtBQQRLAQDESsDAhEqAgERKQERKNs8+EFvJDCBS2kzVjKhViW+EvL0gV/yVjFWHb7y9BEoES4RKADHAE8B/BEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkREwBQAvYREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQOUhwgAxUQXYFETEFBAMRMQMCARExAVYyAREy2zwwBVYpoBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURI1YiESUAfABRAfwRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4AUgEuEL0QrBCbEIoQeRgQVxBGEDUQJEMA2zwAvwTKjwgw2zxsGds8f+AgghAJn/Sjuo7HMNMfAYIQCZ/0o7ry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP1UgbBPbPH/gIIIQ7XaSbroAVABVAF0AZgBC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARJxEwEScRJhEvESYRJREuESURJBEtESQRIxEsESMRIhErESIRIREqESERIBEpESARHxEoER8RHhEwER4RHREvER0RHBEuERwRGxEtERsRGhEsERoRGRErERkRGBEqERgRFxEpERcRFhEoERYRFREwERURFBEvERQAVgL8ERMRLhETERIRLRESERERLBERERARKxEQDxEqDw4RKQ4NESgNDBEwDAsRLwsKES4KCREtCQgRLAgHESsHBhEqBgURKQUEESgEAxEwAwIRLwIBES4BES3bPPhBbyQwMnBWLMIAlFYrwgCRcOKSMHHeVjPCAJRWMsIAkXDikaTeAMcAVwP8gUtpA1YwoVYmIqi+E/L0gV/yVh0jqFYwAb7y9FYrwgCUVirCAJFw4o6ogA1wVjAkqQRWM1FUEEVWMgRWMlA0AhEyAgERMQFWNts8MBEoESkRKJRXKlcq4lYwwgCUVi/CAJFw4o4WBREwBQQRLwQDES4DAhEtAlcqVypfBOMNAHwAWABbAfaADnBWLlYsqQQRKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgAWQL+ERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDkIETEIJxA4BxBWEEUQJAMRNAMCETMC2zwwBREqBQQRKQQDESgDAhEnAgB8AFoA1AQRJgQBESUBESQDESMDBREiBQIRIQIEESAEAREfAREeAxEdAwURHAUCERsCBBEaBAERGQERGAMRFwMFERYFAhEVAgQRFAQBERMBERIDEREDBREQBRAvEE5Q3BA7EFoQKRBIUHYQNRA0ECMB/hEqViagVhwBESSoESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4AXAFmDREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8S6AQaRBXEEYQNVBCE9s8AL8D8vhBbyQwMlYUgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwvigX99IW6z8vQgbvLQgG8rbDM0NYFebQOzE/L0JMAKkX+TJMAL4lYsIZNWKqDegUtpUZG+GfL0Vh6BAQsoWfQKb6ExggCg9yGRf5RTWMcF4vL0s5Fw4w0BBgBeAF8AFCXACpF/kyXADOID/J2BF+YFVjGg+CO7FfL0kTTicASSMDHjDVJgERiAQPRbMFYXwgCOnydukjcilgcgbvLQgOJWF3J/VSBtbW3bPDABERagERWTN1cW4gtWFaFLQ8hVIIIQ8sWurFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AABgAMsAZQL6VhiAQCpZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zjsggbvLQgG8lKAXCAJMDwgCSM3DilDNUQRPeAcIAksIAkjBw4pGgkTDiIMIAjo00UyNyf1UgbW1t2zwwkTDiUoARGYBA9FswERiRMOIRKRExESkAywBhAfgRKBEwESgRJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIRExESERIBEwESARHxEvER8RHhEuER4RHREtER0RHBEsERwRGxErERsRGhEqERoRGRExERlWMBEZERgRMBEYERcRLxEXERYRLhEWERURLREVAGIC+BEUESwRFBETESsRExESETIREhERERARMBEQDxEvDw4RLg4NES0NDBEsDAsRKwsKETIKCQgRMAgHES8HBhEuBgURLQUEESwEAxErAwIRMQJWMFkRLFYv2zwRJxEv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qQRS0BEoqIIwDeC2s6dkAACpBAoRHQoQORAoEH8GERkGBREYBQQRFwQDERYDAhEVAgERFAERE4EBCxETyFWwEGwQWxBKEDlIfNs8yFVQB9s8yQHMyQIRFAIYViABIG6VMFn0WTCUQTP0E+KAEAHIAQH0AMkAowCjAI8C/AIRKwJWHgEgbpUwWfRbMJRBM/QX4oAQVHQoVi1WHyzIVVDbPMkCESkCVh4BIG6VMFn0WzCUQTP0F+KAEFR5PchVIFr6AhLKAMt/yQIRKgJWHgEgbpUwWfRbMJRBM/QX4lYeAREwgED0WzD4QhEoEUgRKBEnEUcRJxEmEUYRJgClAJAB+BElEUURJREkEUQRJBEjEUMRIxEiEUIRIhEhEUERIREgEUARIBEfET8RHxEeET4RHhEdET0RHREcETwRHBEbETsRGxEaEToRGhEZETkRGREYETgRGFY3ERgRFxE3ERcRFhE2ERYRFRE1ERURFBE0ERQRExEzERMREhEyERIAkQP+AhERAhEQETAREA8RLw8OES4ODREtDQwRLAwLEUkLChExCgkRKgkIEUgIBxFHBwYRRQYFES0FBBFEBAMRQwMCEUICARE4AVZBAVY2AVY7ARE72zxWMsIAjpMRN1Yycn9VIG1tbds8MARWMaEEklc34hEcET4RHBEbET0RG3MRGwC6AMsAkgH+ERoRQxEaERkRPREZERgRPBEYERcROxEXERYRRREWERURQBEVERQRMBEUERMRLhETERIRRxESERERLRERERARKhEQDxE0Dw4RMQ4NETUNVjMNDBE6DAsROQsKESwKCRFCCQgRKQgHESoHBhE7BgURRwUEETAEAxFDAwIRLQJWMACTAv4CARFGARE4ERAREREQDxEQDxDeEM3IESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERXCAJJWFJFw4lIwoPhCERWjChEqCgkRKQkIESgIBxEnBwYRJgYFESUFAKoAlAH8BBEkBAMRIwMCESICERYRIREWAhEgAhEWER8RFhEZER4RGQYRHQYCERwCERYRGxEWERkRGhEZCBEZCAMRGAMRExEXERMREREWEREKERUKERARFBEQDRETDQ0REg0REBERERADERADEH8QLhA9ECwQSxBKECkQaBAnEDZBQNs8AL8E/o/1MNs8bBoy+EFvJDAygUtpVi1WK6ATvhLy9IIAoPdWHoEBCyNZ9ApvoTHy9FYXpIBAdHBwIfgjf1YRBVYRBVYRBVYRBVYRBchVoNs8yQIRHAJWGgEgbpUwWfRbMJRBM/QX4hEaERgQWgl0CQYHUEQIBUMT2zx/4CCCEPwzh30AlgCXAJgArQCY0x8BghDV3r/cuvLggdMP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAPoA+gDTP9N/0h/Sf9QB0NJ/MBoZGBcWFRRDMAB2UKvLBxjLD1AGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFMoAWPoCAfoCy3/KAAH6AssfygAD3lYegBApWfQPb6GSMG3fIG6SMG2Oh9DbPGwXbwfigWyWIW6z8vQgbvLQgG8nNoIAj25QBfL0ViCAQFYRWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIG7y0IBvKxAnXwdsIlYcgBBWEFn0D2+hkjBt3wD4AQYAmQT+IG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELVhJZ9AtvoZIwbd8gbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4iBus5cgbvLQgG8snTBwVHAAUwBwVHAAUwDiVhqWVHupVHupllR1Q1R1Q+KBFHYkwgDy9FYeJLzjAADrAOsAmgCbAApXHiIRHgL+Vi2AEFYjWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiIG6zmCBu8tCAbyZbmDBwVHAAUwBb4lYgUAahJ6iCMA3gtrOnZAAAqQRWH1AFoSeogjAN4Lazp2QAAKkEVjKAEFYnWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbgDtAJwB/rOXIG7y0IBvI5QwcHAh4nBWJiTCAJRWKSS9kXDijkIxI1YntghWKbOOE1YmI6FSEKiCMA3gtrOnZAAAqQSOEyJWJ6FSEKiCMA3gtrOnZAAAqQTiUSGhUFWhIMAAknAz3gTeIMIAjhMzUjKoIlYmqKBdoKkEWqBWJ0ADkTDicCAAnQH6VijCAI47W1YmViaoViGogjBnZceT+hAHnaoaqQQgESOoghA7msoAqQRWIiGhARE0AaAhVjSgAREzAaARMhEzESKSVyPiLlYqjhRWJy2hVikBqIIwDeC2s6dkAACpBI4ULFYooVYpAaiCMA3gtrOnZAAAqQTiVH8LoCShKaEAngT+ARERAaCCAPPJIcL/8vRWKsIAlVYqVhC5kXDilFYrwACRcOKcVytWKlYqqC+pBBEr3lYrIbyUVytWKt5WK6EPViqhVihWKBESVhGhIsIA4w9WKo4YVxZXFlcWVxZXFlcWJ1YdKAZWHKEEViWh4w4gViWogjAN4Lazp2QAAKkEKQCfAKAAoQCiAPxWLo4UVitWEaFSMKiCMA3gtrOnZAAAqQSOFFYQViyhUjCogjAN4Lazp2QAAKkE4iNWLagBESgBESWgAREkAaiCMGdlx5P6EAedqhqpBAERJKBWEIFvuxEnoLkBESUB8vQugUOgESSoViQvqIIwDeC2s6dkAACpBL4BESMB8vQAdlcQWz8/Vx5XHlceVx5ReKABESQBCKBwVHAAUwAGESkGAxEiAw4RIQ4BESABDREfDRBfDhBNECxFE0FEAKBXEFcQVxBXEFcQVxAnVh0oBVYcoQhWJaERFBEdERQREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMAhERAgEREAEQXxC9CAUGBAPmViaogjAN4Lazp2QAAKkEEK4QSRA4EDcGER8GEF0EERQEAxETAwIREgIBEREBERCBAQsREMhVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERECFVYhASBulTBZ9FkwlEEz9BPigBAByAEB9ADJAhEtAlYfAQCjAKMApAAiUFbLP1AD+gIB+gLLf8p/yn8C+CBulTBZ9FswlEEz9BfigBBWE1R4c1OYyFVQ2zzJAhErAlYfASBulTBZ9FswlEEz9BfigBBUftzIVSBa+gISygDLf8kCESwCVh8BIG6VMFn0WzCUQTP0F+JWIAERMoBA9Fsw+EIRKRFKESkRKBFJESgRJxFIEScRJhFHESYApQCmAChQZfoCUAP6AgH6AgH6Alj6AgH6AgH0ESURRhElESQRRREkESMRRBEjESIRQxEiESERQhEhESARQREgER8RQBEfER4RPxEeER0RPhEdERwRPREcERsRPBEbERoROxEaERkROhEZVjkRGREYETkRGBEXETgRFxEWETcRFhEVETYRFREUETURFBETETQREwIREgIApwP8ERERMhERERARMREQDxEwDw4RLw4NES4NDBEr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+gD6APoA+gD6AFVQAgEgAO8A9AIBIADwAPEAEbCvu1E0NIAAYAL1sqcINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8EScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZgAPoA8gGIERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbKMA8wAuVhSBAQsiWfQKb6ExIVYYxwUCVhfHBRICASAA9QD5AvmyBzbPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFIAD6APYBgBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9sgSBukjBtmSBu8tCAbydvB+IgbpIwbd4A9wE6gBBWFAJZ9A9voZIwbd8gbpIwbY6H0Ns8bBdvB+IA+AAk1AHQAdIA0w/6ANMf0x/TH1VgAvmye7bPBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFIAD6AQQCQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAD7AQEC+Ns8VygRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMA/AEAAcT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0x/6ANMf+gD6APoA+gDUAdD6APoA+gD6APoA+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0AD9Acb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMNAA/gH++kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE9ATTP9Qw0PQE9ATTP/QE0z/TP9Qw0PQE9AT0BPoA+gD6ANJ/0n/6APoAMBEfESgRHxEfEScRHxEfESYRHxEfESURHxEfESQRHxEfESMRHxEfESIRHxEfESERHwD/AAwRHxEgER8AMBESERMREhERERIREREQEREREA8REA9VDgT2MHCBALRwIIIQBMS0AFRwAFMAggiYloCCCvrwgIIQBfXhACKNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASJiYltbW1xbW0ibVMRbW1tAQIBAgECAQMAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAeFYcVHAAVHAA+EIRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4AFMERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbKMBBQGOVhCAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bBtvC+KAQFYRQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiL1kBBgBs0wfTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA03/SAPoA0x/SAFWg+lFRJw==');
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
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
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
    6118: { message: `too early to cancel` },
    10594: { message: `insufficient quota to supply` },
    11120: { message: `compensate not exist` },
    17312: { message: `leverage too high` },
    19163: { message: `no enough jettons to claim` },
    19305: { message: `gas not enough` },
    24173: { message: `order is pending` },
    24325: { message: `token cannot be delisted` },
    24562: { message: `execution fee not enough` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31425: { message: `not reach unlock time` },
    32637: { message: `order not exist` },
    36718: { message: `disabled token` },
    40368: { message: `Contract stopped` },
    40940: { message: `margin is too high to liquidate` },
    41207: { message: `invalid sender` },
    53296: { message: `Contract not stopped` },
    62409: { message: `insufficient margin` },
}

const Pool_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateContract","header":783354075,"fields":[{"name":"code","type":{"kind":"simple","type":"slice","optional":false}},{"name":"data","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonUpdateContent","header":1536108317,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateConfig","header":2629128772,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":true,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":true,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":true,"format":32}},{"name":"gasConfig","type":{"kind":"simple","type":"GasConfig","optional":true}},{"name":"executorConfig","type":{"kind":"simple","type":"ExecutorConfig","optional":true}},{"name":"contractConfig","type":{"kind":"simple","type":"ContractConfig","optional":true}}]},
    {"name":"ListToken","header":3835378672,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"config","type":{"kind":"simple","type":"TokenConfig","optional":false}}]},
    {"name":"DelistToken","header":2604852463,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"ClaimProtocolFee","header":4273121126,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CancelLiquidityOrder","header":1209955681,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteLiquidityOrder","header":2882492539,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateDecreasePerpOrder","header":4009071181,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateTpSlPerpOrder","header":4182737083,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CancelPerpOrder","header":161477795,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecutePerpOrder","header":3983970926,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"LiquidatePerpPosition","header":1189008210,"fields":[{"name":"liquidationFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"ADLPerpPosition","header":3588145116,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"CreateCompensate","header":4231235453,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecuteOrCancelCompensate","header":2296903975,"fields":[{"name":"isCancel","type":{"kind":"simple","type":"bool","optional":false}},{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCreatedEvent","header":3301974244,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCancelledEvent","header":3115334844,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityPoolChangedEvent","header":1212313398,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"realizedLpFundingFeeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"realizedLpRolloverFeeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderCreatedEvent","header":2911777263,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PerpOrderCancelledEvent","header":4073041580,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionIncreasedEvent","header":1197042366,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"PerpPositionDecreasedEvent","header":592660044,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"payout","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"CompensateCreatedEvent","header":2519251606,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateCancelledEvent","header":1271087573,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateExecutedEvent","header":3678790712,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"AccountInfo","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isClaimer","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForLpTrader","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForLpExecutor","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForPerpTrader","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForPerpExecutor","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"maxLeverage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maintenanceRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolStat","header":null,"fields":[{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPositionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GasConfig","header":null,"fields":[{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForPerpTrader","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForPerpExecutor","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForLpTrader","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForLpExecutor","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecutorConfig","header":null,"fields":[{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContractConfig","header":null,"fields":[{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidityOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LiquidityOrderData","header":null,"fields":[{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidityOrder","type":{"kind":"simple","type":"LiquidityOrder","optional":true}}]},
    {"name":"PerpOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PerpOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderData","header":null,"fields":[{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrder","type":{"kind":"simple","type":"PerpOrder","optional":true}},{"name":"perpOrderEx","type":{"kind":"simple","type":"PerpOrderEx","optional":true}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateData","header":null,"fields":[{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensate","type":{"kind":"simple","type":"Compensate","optional":true}}]},
    {"name":"Pool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"gasForPerpTrader","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForPerpExecutor","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForLpTrader","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForLpExecutor","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}},{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"tokenConfigs","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"TokenConfig","valueFormat":"ref"}},{"name":"liquidityOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"LiquidityOrder","valueFormat":"ref"}},{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrder","valueFormat":"ref"}},{"name":"perpOrderExs","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrderEx","valueFormat":"ref"}},{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Compensate","valueFormat":"ref"}},{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpPositionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"AccountPerpPosition","valueFormat":"ref"}},{"name":"globalLPPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalLPPosition","valueFormat":"ref"}},{"name":"globalPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalPosition","valueFormat":"ref"}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
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
    {"receiver":"internal","message":{"kind":"typed","type":"JettonUpdateContent"}},
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
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateContract"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | JettonUpdateContent | ListToken | DelistToken | ClaimProtocolFee | null | JettonTransferNotification | CancelLiquidityOrder | ExecuteLiquidityOrder | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop' | UpdateContract) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonUpdateContent') {
            body = beginCell().store(storeJettonUpdateContent(message)).endCell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateContract') {
            body = beginCell().store(storeUpdateContract(message)).endCell();
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