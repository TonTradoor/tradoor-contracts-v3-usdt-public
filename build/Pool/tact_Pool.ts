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

export type UpdatePoolConfig = {
    $$type: 'UpdatePoolConfig';
    orderLockTime: bigint;
    maxLpNetCap: bigint;
    lpRolloverFeeRate: bigint;
    liquidatedPositionShareRate: bigint;
    normalPositionShareRate: bigint;
}

export function storeUpdatePoolConfig(src: UpdatePoolConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2788132204, 32);
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.maxLpNetCap);
        b_0.storeUint(src.lpRolloverFeeRate, 32);
        b_0.storeUint(src.liquidatedPositionShareRate, 32);
        b_0.storeUint(src.normalPositionShareRate, 32);
    };
}

export function loadUpdatePoolConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2788132204) { throw Error('Invalid prefix'); }
    let _orderLockTime = sc_0.loadUintBig(32);
    let _maxLpNetCap = sc_0.loadCoins();
    let _lpRolloverFeeRate = sc_0.loadUintBig(32);
    let _liquidatedPositionShareRate = sc_0.loadUintBig(32);
    let _normalPositionShareRate = sc_0.loadUintBig(32);
    return { $$type: 'UpdatePoolConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate };
}

function loadTupleUpdatePoolConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    return { $$type: 'UpdatePoolConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate };
}

function loadGetterTupleUpdatePoolConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    return { $$type: 'UpdatePoolConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate };
}

function storeTupleUpdatePoolConfig(source: UpdatePoolConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
    builder.writeNumber(source.liquidatedPositionShareRate);
    builder.writeNumber(source.normalPositionShareRate);
    return builder.build();
}

function dictValueParserUpdatePoolConfig(): DictionaryValue<UpdatePoolConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePoolConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePoolConfig(src.loadRef().beginParse());
        }
    }
}

export type UpdateBaseConfig = {
    $$type: 'UpdateBaseConfig';
    gasConfig: GasConfig | null;
    executorConfig: ExecutorConfig | null;
    contractConfig: ContractConfig | null;
}

export function storeUpdateBaseConfig(src: UpdateBaseConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2824223913, 32);
        let b_1 = new Builder();
        if (src.gasConfig !== null && src.gasConfig !== undefined) { b_1.storeBit(true); b_1.store(storeGasConfig(src.gasConfig)); } else { b_1.storeBit(false); }
        if (src.executorConfig !== null && src.executorConfig !== undefined) { b_1.storeBit(true); b_1.store(storeExecutorConfig(src.executorConfig)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.contractConfig !== null && src.contractConfig !== undefined) { b_2.storeBit(true); b_2.store(storeContractConfig(src.contractConfig)); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateBaseConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2824223913) { throw Error('Invalid prefix'); }
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConfig = sc_1.loadBit() ? loadGasConfig(sc_1) : null;
    let _executorConfig = sc_1.loadBit() ? loadExecutorConfig(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _contractConfig = sc_2.loadBit() ? loadContractConfig(sc_2) : null;
    return { $$type: 'UpdateBaseConfig' as const, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadTupleUpdateBaseConfig(source: TupleReader) {
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateBaseConfig' as const, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadGetterTupleUpdateBaseConfig(source: TupleReader) {
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateBaseConfig' as const, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function storeTupleUpdateBaseConfig(source: UpdateBaseConfig) {
    let builder = new TupleBuilder();
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

function dictValueParserUpdateBaseConfig(): DictionaryValue<UpdateBaseConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateBaseConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBaseConfig(src.loadRef().beginParse());
        }
    }
}

export type SetManager = {
    $$type: 'SetManager';
    manager: Address;
    compensator: Address;
    claimer: Address;
}

export function storeSetManager(src: SetManager) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3368041608, 32);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.compensator);
        b_0.storeAddress(src.claimer);
    };
}

export function loadSetManager(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3368041608) { throw Error('Invalid prefix'); }
    let _manager = sc_0.loadAddress();
    let _compensator = sc_0.loadAddress();
    let _claimer = sc_0.loadAddress();
    return { $$type: 'SetManager' as const, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function loadTupleSetManager(source: TupleReader) {
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'SetManager' as const, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function loadGetterTupleSetManager(source: TupleReader) {
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'SetManager' as const, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function storeTupleSetManager(source: SetManager) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.manager);
    builder.writeAddress(source.compensator);
    builder.writeAddress(source.claimer);
    return builder.build();
}

function dictValueParserSetManager(): DictionaryValue<SetManager> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetManager(src)).endCell());
        },
        parse: (src) => {
            return loadSetManager(src.loadRef().beginParse());
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
    isManager: boolean;
}

export function storeAccountInfo(src: AccountInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isExecutor);
        b_0.storeBit(src.isCompensator);
        b_0.storeBit(src.isClaimer);
        b_0.storeBit(src.isManager);
    };
}

export function loadAccountInfo(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit();
    let _isCompensator = sc_0.loadBit();
    let _isClaimer = sc_0.loadBit();
    let _isManager = sc_0.loadBit();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer, isManager: _isManager };
}

function loadTupleAccountInfo(source: TupleReader) {
    let _isExecutor = source.readBoolean();
    let _isCompensator = source.readBoolean();
    let _isClaimer = source.readBoolean();
    let _isManager = source.readBoolean();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer, isManager: _isManager };
}

function loadGetterTupleAccountInfo(source: TupleReader) {
    let _isExecutor = source.readBoolean();
    let _isCompensator = source.readBoolean();
    let _isClaimer = source.readBoolean();
    let _isManager = source.readBoolean();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer, isManager: _isManager };
}

function storeTupleAccountInfo(source: AccountInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeBoolean(source.isCompensator);
    builder.writeBoolean(source.isClaimer);
    builder.writeBoolean(source.isManager);
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
    mintJettonGas: bigint;
    burnJettonGas: bigint;
    transferJettonGas: bigint;
    createPerpOrderGas: bigint;
    cancelPerpOrderGas: bigint;
    executePerpOrderGas: bigint;
    createLiquidityOrderGas: bigint;
    cancelLiquidityOrderGas: bigint;
    executeLiquidityOrderGas: bigint;
    minStorageReserve: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    tlpWallet: Address;
    tlpJetton: Address;
    maxLpNetCap: bigint;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.mintJettonGas);
        b_0.storeCoins(src.burnJettonGas);
        b_0.storeCoins(src.transferJettonGas);
        b_0.storeCoins(src.createPerpOrderGas);
        b_0.storeCoins(src.cancelPerpOrderGas);
        b_0.storeCoins(src.executePerpOrderGas);
        b_0.storeCoins(src.createLiquidityOrderGas);
        let b_1 = new Builder();
        b_1.storeCoins(src.cancelLiquidityOrderGas);
        b_1.storeCoins(src.executeLiquidityOrderGas);
        b_1.storeCoins(src.minStorageReserve);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_1.storeAddress(src.tlpWallet);
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
    let _mintJettonGas = sc_0.loadCoins();
    let _burnJettonGas = sc_0.loadCoins();
    let _transferJettonGas = sc_0.loadCoins();
    let _createPerpOrderGas = sc_0.loadCoins();
    let _cancelPerpOrderGas = sc_0.loadCoins();
    let _executePerpOrderGas = sc_0.loadCoins();
    let _createLiquidityOrderGas = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _cancelLiquidityOrderGas = sc_1.loadCoins();
    let _executeLiquidityOrderGas = sc_1.loadCoins();
    let _minStorageReserve = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    let _tlpWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _tlpJetton = sc_2.loadAddress();
    let _maxLpNetCap = sc_2.loadCoins();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, tlpWallet: _tlpWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    source = source.readTuple();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, tlpWallet: _tlpWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadGetterTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, tlpWallet: _tlpWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.mintJettonGas);
    builder.writeNumber(source.burnJettonGas);
    builder.writeNumber(source.transferJettonGas);
    builder.writeNumber(source.createPerpOrderGas);
    builder.writeNumber(source.cancelPerpOrderGas);
    builder.writeNumber(source.executePerpOrderGas);
    builder.writeNumber(source.createLiquidityOrderGas);
    builder.writeNumber(source.cancelLiquidityOrderGas);
    builder.writeNumber(source.executeLiquidityOrderGas);
    builder.writeNumber(source.minStorageReserve);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeAddress(source.tlpWallet);
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
    mintJettonGas: bigint;
    burnJettonGas: bigint;
    transferJettonGas: bigint;
    createPerpOrderGas: bigint;
    cancelPerpOrderGas: bigint;
    executePerpOrderGas: bigint;
    createLiquidityOrderGas: bigint;
    cancelLiquidityOrderGas: bigint;
    executeLiquidityOrderGas: bigint;
    minStorageReserve: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
}

export function storeGasConfig(src: GasConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.mintJettonGas);
        b_0.storeCoins(src.burnJettonGas);
        b_0.storeCoins(src.transferJettonGas);
        b_0.storeCoins(src.createPerpOrderGas);
        b_0.storeCoins(src.cancelPerpOrderGas);
        b_0.storeCoins(src.executePerpOrderGas);
        b_0.storeCoins(src.createLiquidityOrderGas);
        b_0.storeCoins(src.cancelLiquidityOrderGas);
        let b_1 = new Builder();
        b_1.storeCoins(src.executeLiquidityOrderGas);
        b_1.storeCoins(src.minStorageReserve);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGasConfig(slice: Slice) {
    let sc_0 = slice;
    let _mintJettonGas = sc_0.loadCoins();
    let _burnJettonGas = sc_0.loadCoins();
    let _transferJettonGas = sc_0.loadCoins();
    let _createPerpOrderGas = sc_0.loadCoins();
    let _cancelPerpOrderGas = sc_0.loadCoins();
    let _executePerpOrderGas = sc_0.loadCoins();
    let _createLiquidityOrderGas = sc_0.loadCoins();
    let _cancelLiquidityOrderGas = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _executeLiquidityOrderGas = sc_1.loadCoins();
    let _minStorageReserve = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    return { $$type: 'GasConfig' as const, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee };
}

function loadTupleGasConfig(source: TupleReader) {
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    return { $$type: 'GasConfig' as const, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee };
}

function loadGetterTupleGasConfig(source: TupleReader) {
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    return { $$type: 'GasConfig' as const, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee };
}

function storeTupleGasConfig(source: GasConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.mintJettonGas);
    builder.writeNumber(source.burnJettonGas);
    builder.writeNumber(source.transferJettonGas);
    builder.writeNumber(source.createPerpOrderGas);
    builder.writeNumber(source.cancelPerpOrderGas);
    builder.writeNumber(source.executePerpOrderGas);
    builder.writeNumber(source.createLiquidityOrderGas);
    builder.writeNumber(source.cancelLiquidityOrderGas);
    builder.writeNumber(source.executeLiquidityOrderGas);
    builder.writeNumber(source.minStorageReserve);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
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
}

export function storeExecutorConfig(src: ExecutorConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
    };
}

export function loadExecutorConfig(slice: Slice) {
    let sc_0 = slice;
    let _executors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    return { $$type: 'ExecutorConfig' as const, executors: _executors };
}

function loadTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'ExecutorConfig' as const, executors: _executors };
}

function loadGetterTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'ExecutorConfig' as const, executors: _executors };
}

function storeTupleExecutorConfig(source: ExecutorConfig) {
    let builder = new TupleBuilder();
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
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
    multisig: Address;
    tlpJetton: Address;
    tlpWallet: Address;
    jettonWallet: Address;
}

export function storeContractConfig(src: ContractConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.multisig);
        b_0.storeAddress(src.tlpJetton);
        b_0.storeAddress(src.tlpWallet);
        let b_1 = new Builder();
        b_1.storeAddress(src.jettonWallet);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadContractConfig(slice: Slice) {
    let sc_0 = slice;
    let _multisig = sc_0.loadAddress();
    let _tlpJetton = sc_0.loadAddress();
    let _tlpWallet = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jettonWallet = sc_1.loadAddress();
    return { $$type: 'ContractConfig' as const, multisig: _multisig, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet };
}

function loadTupleContractConfig(source: TupleReader) {
    let _multisig = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    return { $$type: 'ContractConfig' as const, multisig: _multisig, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet };
}

function loadGetterTupleContractConfig(source: TupleReader) {
    let _multisig = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    return { $$type: 'ContractConfig' as const, multisig: _multisig, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet };
}

function storeTupleContractConfig(source: ContractConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.multisig);
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
    liquidatedPositionShareRate: bigint;
    normalPositionShareRate: bigint;
    mintJettonGas: bigint;
    burnJettonGas: bigint;
    transferJettonGas: bigint;
    createPerpOrderGas: bigint;
    cancelPerpOrderGas: bigint;
    executePerpOrderGas: bigint;
    createLiquidityOrderGas: bigint;
    cancelLiquidityOrderGas: bigint;
    executeLiquidityOrderGas: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    minStorageReserve: bigint;
    tlpJetton: Address;
    tlpWallet: Address;
    jettonWallet: Address;
    manager: Address;
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
    multisig: Address;
}

export function storePool$Data(src: Pool$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.stopped);
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.maxLpNetCap);
        b_0.storeUint(src.lpRolloverFeeRate, 32);
        b_0.storeUint(src.liquidatedPositionShareRate, 32);
        b_0.storeUint(src.normalPositionShareRate, 32);
        b_0.storeCoins(src.mintJettonGas);
        b_0.storeCoins(src.burnJettonGas);
        b_0.storeCoins(src.transferJettonGas);
        b_0.storeCoins(src.createPerpOrderGas);
        let b_1 = new Builder();
        b_1.storeCoins(src.cancelPerpOrderGas);
        b_1.storeCoins(src.executePerpOrderGas);
        b_1.storeCoins(src.createLiquidityOrderGas);
        b_1.storeCoins(src.cancelLiquidityOrderGas);
        b_1.storeCoins(src.executeLiquidityOrderGas);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_1.storeCoins(src.minStorageReserve);
        let b_2 = new Builder();
        b_2.storeAddress(src.tlpJetton);
        b_2.storeAddress(src.tlpWallet);
        b_2.storeAddress(src.jettonWallet);
        let b_3 = new Builder();
        b_3.storeAddress(src.manager);
        b_3.storeAddress(src.compensator);
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
        let b_6 = new Builder();
        b_6.storeAddress(src.multisig);
        b_5.storeRef(b_6.endCell());
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
    let _liquidatedPositionShareRate = sc_0.loadUintBig(32);
    let _normalPositionShareRate = sc_0.loadUintBig(32);
    let _mintJettonGas = sc_0.loadCoins();
    let _burnJettonGas = sc_0.loadCoins();
    let _transferJettonGas = sc_0.loadCoins();
    let _createPerpOrderGas = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _cancelPerpOrderGas = sc_1.loadCoins();
    let _executePerpOrderGas = sc_1.loadCoins();
    let _createLiquidityOrderGas = sc_1.loadCoins();
    let _cancelLiquidityOrderGas = sc_1.loadCoins();
    let _executeLiquidityOrderGas = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    let _minStorageReserve = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _tlpJetton = sc_2.loadAddress();
    let _tlpWallet = sc_2.loadAddress();
    let _jettonWallet = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _manager = sc_3.loadAddress();
    let _compensator = sc_3.loadAddress();
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
    let sc_6 = sc_5.loadRef().beginParse();
    let _multisig = sc_6.loadAddress();
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, perpPositionIndexNext: _perpPositionIndexNext, perpPositions: _perpPositions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig };
}

function loadTuplePool$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _stopped = source.readBoolean();
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    source = source.readTuple();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tokenConfigs = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), source.readCellOpt());
    let _liquidityOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), source.readCellOpt());
    source = source.readTuple();
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
    source = source.readTuple();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    let _multisig = source.readAddress();
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, perpPositionIndexNext: _perpPositionIndexNext, perpPositions: _perpPositions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig };
}

function loadGetterTuplePool$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _stopped = source.readBoolean();
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _manager = source.readAddress();
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
    let _multisig = source.readAddress();
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, perpPositionIndexNext: _perpPositionIndexNext, perpPositions: _perpPositions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, tlpSupply: _tlpSupply, totalExecutionFee: _totalExecutionFee, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig };
}

function storeTuplePool$Data(source: Pool$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.stopped);
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
    builder.writeNumber(source.liquidatedPositionShareRate);
    builder.writeNumber(source.normalPositionShareRate);
    builder.writeNumber(source.mintJettonGas);
    builder.writeNumber(source.burnJettonGas);
    builder.writeNumber(source.transferJettonGas);
    builder.writeNumber(source.createPerpOrderGas);
    builder.writeNumber(source.cancelPerpOrderGas);
    builder.writeNumber(source.executePerpOrderGas);
    builder.writeNumber(source.createLiquidityOrderGas);
    builder.writeNumber(source.cancelLiquidityOrderGas);
    builder.writeNumber(source.executeLiquidityOrderGas);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.minStorageReserve);
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.manager);
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
    builder.writeAddress(source.multisig);
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
    const __code = Cell.fromBase64('te6ccgICARAAAQAAXZsAAAEU/wD0pBP0vPLICwABAgFiAAIAAwLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjAQMACAIBIAAEAAUCASAA3wDgAgEgAAYABwIBSADpAOoCASAA+AD5AvwRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zwACQAKBKLtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQW48nHbqOlDDTHwGCEFuPJx268uCB1AEx2zx/4CCCEMjAPIi64wIgghCoVjypuuMCIIIQpi+FbLoACwAMAA0ADgGi8uCCyPhDAcx/AcoAES4RLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UAB8B8BEtES4RLREsES4RLBErES4RKxEqES4RKhEpES4RKREoES4RKBEnES4RJxEmES4RJhElES4RJREkES4RJBEjES4RIxEiES4RIhEhES4RIREgES4RIBEfES4RHxEeES4RHhEdES4RHREcES4RHBEbES4RGxEaES4RGgAPAeIw0x8BghDIwDyIuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsEwASA4Qw0x8BghCoVjypuvLggdQB0NIAAY6E2zxvDJFt4gHSAAGV9AQBbwGRbeIB1DDQ0gABjobbPGwUbwSSMG3ibBPbPH8AEwAUABUEoI87MNMfAYIQpi+FbLry4IHTH/oA0x/TH9MfVUBsFVcsVyxXLFcsVyyCAKD3+EJWGccF8vSI+EIBf23bPH/gIIIQ5Js78LrjAiCCEJtC5O+6ACMA3AAkACUC+BEZES4RGREYES4RGBEXES4RFxEWES4RFhEVES4RFREUES4RFBETES4RExESES4REhERES4REREQES4REA8RLg8OES4ODREuDQwRLgwLES4LChEuCgkRLgkRLggHBlVA2zwRLsgBghBbjycdWMsfzMkRLREuES0RLBEtESwA2AAQAfwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERt/bVYcER4RHBEdERwRGxEcERsRGhEbERoAEQG0ERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWBAVVINs8ANwAJlcYVxhXGIIAoPf4QlIgxwXy9H8AWPoA+gD6APoA+gD6APoA+gDUAdD6APoA+gD6ADAQTBBLEEoQSRBIEEcQRhBFAcb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAAFgHwES0RMBEtESwRLxEsESsRLhErESoRMBEqESkRLxEpESgRLhEoEScRMBEnESYRLxEmESURLhElESQRMBEkESMRLxEjESIRLhEiESERMBEhESARLxEgER8RLhEfER4RMBEeER0RLxEdERwRLhEcERsRMBEbERoRLxEaABcARvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxFEMwAv4RGREuERkRGBEwERgRFxEvERcRFhEuERYRFREwERURFBEvERQRExEuERMREhEwERIREREvEREREBEuERAPETAPDhEvDg0RLg0METAMCxEvCwoRLgoJETAJCBEvCAcRLgcGETAGBREvBQQRLgQDETADAhEvAgERLgERMNs8VjBuANgAGAT6s45FMFcXVxdXF1YsIG7y0IBvJF8DVi0gbvLQgG8kECNfA1YuIG7y0IBvJBNfAxEvIG7y0IBvJGwxAhEvAgERGQECERgCERcSklcw4lYtbrOSVy3jDVYtbrOSVy3jDYgRKxEuESsRKhEtESoRKREsESkRKBErESgRJxEqEScAGQAaABsAHADUES0gbvLQgG8hIIEBC3FZ9IJvpSCWUCPXADBYlmwhbTJtAeKQjkGBAQsBkX+RbeICERYCVhYBcSFulVtZ9FkwmMgBzwBBM/RB4oEBCyICERZxQTP0dG+lIJZQI9cAMFiWbCFtMm0B4uhfAwH6VxlXGVcZVxlXGVcZVxlXGVcZVxlXGVcZViEgbvLQgG8sECtfC1YiIG7y0IBvLBtfC1YjIG7y0IBvLGyxViQgbvLQgG8sXwtWJSBu8tCAbywQq18LViYgbvLQgG8sEJtfC1YnIG7y0IBvLBCLXwtWKCBu8tCAbywQe18LVikAHQAuAAAAAGJhc2UgY29uZmlnIHVwZGF0ZWQB/BEmESkRJhElESgRJREkEScRJBEjESYRIxEiESURIhEhESQRIREgESMRIBEfESIRHxEeESERHhEdESARHREcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREgAeAOogbvLQgG8sEGtfC1YqIG7y0IBvLBBbXwtWKyBu8tCAbywQS18LESwgbvLQgG8sEDtfCxEYESwRGAcRIwcGESIGBREhBQQRIAQDER8DAhEeAgERHQERGBEcERgRGwkRGgkIERkIChEYChB6EGkQWBBHEDZARRMBahERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgQRxA2RUD4QgF/bds8ANwB9gERLgERLSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgERKwHKAAERKQHLHwERJ/oCARElAcsfAREjAcsfAREhAcsfAREf+gIBER36AgERG/oCAREZ+gLIAREY+gIBERb6AgERFPoCARES+gIBERD6AlAO+gJQDAAgAdT6AlAK+gLIUAkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFAEACEB/iDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEvQAEvQAE/QAE8s/A8j0ABT0ABTLPxT0ABTLPxXLPwXI9AAAIgCsFvQAFvQAUAb6AlAG+gJQBvoCFsp/Fsp/UAb6AlAH+gLIUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJUAXMyVAEzMlQA8zJWMzJWMzJAcwALgAAAABwb29sIGNvbmZpZyB1cGRhdGVkAiww0x8BghDkmzvwuvLggdMP2zwQeGwYAQIAJgSCjpUw0x8BghCbQuTvuvLggdMPATHbPH/gIIIQ/rKnZrrjAiDAACLXScEhsJJbf+AgghBzYtCcuuMCIIIQSB51YboAKQAqACsALANuggCg9/hCViHHBfL0VVCAEAfIVWDbPMkDERYDEiBulTBZ9FswlEEz9BfiiAERFAH4QgF/bds8fwAnACgA3AAyyFAHzxbJUAfMFMoAEssPAfoCyx8Syx/LHwAgAAAAAHRva2VuIGxpc3RlZAP2ggCg9/hCVhrHBfL0KYAQIln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4iBus44hgV8FISBu8tCAbyYQNV8FAiBu8tCAbyYQJV8FEqDAAPL0kTDiIBEVgBD0WzBWFFAKgBD0WzBWFFALgBD0WzABERQBC4AQ9FswiAkRFAkbAPcALQAuAuYw0x8BghD+sqdmuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEoIAoPf4QlYZAccF8vSBStsowgDy9HCAQnBtI8hSEMsAydAmEGgQXgQHVSDIVWDbPMlWGwRJmRRDMG1t2zwwcAV/AM0A3QKqMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBT4QlYdAccFs5j4QlYeAccFs5Fw4o6EMCDbPOMOfwA+AC8EyI7GMNMfAYIQSB51Ybry4IHTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iQzBsE9s8f+AgghCrz1h7uo8IMNs8bBbbPH/gIIIQ7vWSTboAMAAxADIAMwAkAAAAAHRva2VuIGRlbGlzdGVkARIaGfhCAX9t2zwA3ANcVjCRf5XTAAHDAeKOhDAg2zzg+EJWHgHHBY6K1DDQ+gAwcAPbPODUMNDTByHAAQA+ADoAOQL2+EFvJDAygUtpViVWK6ATvhLy9FYWgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbigX99IW6z8vQgbvLQgG8mgV5tAbPy9FYdgQELJ1n0Cm+hMYIAoPchkX+UU1fHBeLy9LOcgRfmAVY1oPgju/L0kTDiUnARG4BA9FswAPIANACO0x8BghCrz1h7uvLggdM/0z8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB9AT6APoAVVAD9Dn4QW8kMDKCAKD3VhyBAQsjWfQKb6Ex8vRWGYBAKFn0D2+hkjBt3yBukjBtjofQ2zxsFm8G4oF/fSFus/L0IG7y0IBvJoFebQGz8vRWKiWTVjOgllYyVjKgoOKBS2lRgb4Y8vR/gEAmVEYwJlRGNgHIVVDbPMkCER8CAPIARgBHBDqPCDDbPGwY2zx/4CCCEPlPgLu64wIgghAJn/SjugBSAFMAVABVAfQjklYgklYh4hEwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETYRKhEpETURKREoETQRKBEnETMRJxEmETIRJhElETERJREkETYRJBEjETURIxEiETQRIhEhETMRIREgETIRIBEfETERHxEeETYRHgA1Af4RHRE1ER0RHBE0ERwRGxEzERsRGhEyERoRGRExERkRGBE2ERgRFxE1ERcRFhE0ERYBERUBERQRMhEUERMRMRETERIRNhESERERNRERERARNBEQHw4RMg4NETENDBE2DAsRNQsKETQKGQgRMggHETEHBhE2BgURNQUEETQEWlYxADYD9AJWNts8VjNus5cRMyBu8tCAlFczVjHiVjDCAI6RVjByf1UgbW1t2zwwBVYvoQWRMOIRMJFxkXLiAgERLgERLchVIIIQubA8vFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFYbViGgES2jESoRMBEqAMsA3QA3AfwRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERUAOAGYERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIcEVgQzDbPADOA4KOiDH6ADB/A9s8jzQBwAKOqPoA0gDTD9IA+gDTf9Mf1DDQ+gDTf/oA038wELwQqxCaEIkQeFUD2zyOhDAg2zzi4gA6ADsAPgTC+EFvJBNfAyQwIlYkuY6GMDEyINs84FYmI6C5joUxMiDbPOBWFqSAQPgjcCdURzAmVEgwyFVQ2zzJAhEaAlYZASBulTBZ9FswlEEz9BfiUcKgBJFxkXLiUTBUIxQBERkBBwA+AD4ARgA8A/T4QW8kE18DLFYzoLmOiBB7XwtRENs84HElwgCTJMIAkXDikjBy3iPCAJMiwgCRcOKRpN5WKyGoUtC5jogQjF8MURDbPOALkXqSgAviU8upBBE2ET0RNhE1ETwRNRE0ETsRNBEzEToRMxEyETkRMhExETgRMREwETcRMAA+AD4APwJYyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAViIJERUJCREUCUAJ2zwAPQDOAG6CEMTQIORQB8sfFcsHUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLLP8s/AlwiwgCPJfhCcIBCcG0jyFIQywDJ0BBqEFkQSBA3yFVg2zzJFEMwbW3bPDCSXwTiAM0A3QH8ES8RPREvES4RPBEuES0ROxEtESwROhEsESsRORErESoROBEqESkRNxEpESgRPREoEScRPBEnESYROxEmESUROhElESQROREkESMROBEjESIRNxEiESERPREhESARPBEgER8ROxEfER4ROhEeER0ROREdERwROBEcERsRNxEbAEAE+hEaET0RGhEZETwRGREYETsRGBEXEToRFxEWETkRFhEVETgRFREUETcRFBETET0RExESETwREhERETsREREQEToREA8ROQ8OETgODRE3DQwRPQwLETwLChE7CgkROgkIETkIF1Y4BwYRPQYFETwFBBE7BBE6A9s8VjHCAOMPAI0AQQBCAEMACFY0wgAAAnAB+pF/nFYzwgCUVjLCAJFw4uKOUVYvgEARN6kEBBEyBAMRNQMCETQCAREzAchVQFBU+gISy38B+gISy38B+gLJED0CETICAREvASBulTBZ9FswlEEz9BfiESwRLhEsESsRLRErCo4TMAQRNAQDETMDAhEyAlcwVzBfA+IBVimgAEQB+BEoES8RKBEnES4RJxEmES0RJhElESwRJREkESsRJBEjESoRIxEiESkRIhEhESgRIREgEScRIBEfESYRH1YeESYRHhElER4RHREkER0RHBEjERwRGxEiERsRGhEhERoRGREgERkRGBEfERgRFxEeERcRFhEdERYRFREcERUARQGiERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH4QbRBcEEsQOkiQEGcQVgRDNds8AM4AXFBWygBQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6AssfygAEzlLAIG6VMFn0WzCUQTP0F+JwKIAQgwZZ9IZvpSCWUCPXATBYlmwhbTJtAeKQiuhbOFJuoVLtoSBWNaiCEDuaygCpBFPQoAEREQGgAVYQoQEREQGgVhAooCTjD1LAERCAQPRbMFYfwgAASABJAEoASwDMVheAECNZ9A9voZIwbd8gbpIwbZ3Q+gDSANN/VSBsE28D4iBus44gIG7y0IBvIxOhqAGRcZF/4qiCMA3gtrOnZAAAqQQSoAGRW+KAECoCgwZBM/R8b6UgllAj1wEwWJZsIW0ybQHiAtJwVjciobYJI4EpYgK78vRWE8AAmzCCMA3gtrOnZAAAn4IwDeC2s6dkAACoVhOpBOIigjAN4Lazp2QAAKghqQR/bXDIydAqUTlRNgPIVVDbPMlWKQJWNgJDMHABbW3bPDAREiOgERRWEqAATADdAvqCMA3gtrOnZAAAqFYTqQRTAqiCMA3gtrOnZAAAqQR/VHxHbchVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYoAlY1AkMwcAFtbds8MBESVhKhERQjoQDdAE0D4o6hKm6zlgogbvLQgJI6JeJWH3J/VSBtbW3bPDARElYeoRESkTriBJFxkXLiXjcGEDUQJBAjAhERAi4CVhQCERJUHw1WEhBnyFXA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERWjEFpeNEVgFNs8AN0AUQDOAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAfwRLRE6ES0RLBE5ESwRKxE4ESsRKhE3ESoRKRE2ESkRKBE1ESgRJxE0EScRJhEzESYRJREyESURJBExESQRIxEwESMRIhEvESIRIREuESERIBE6ESARHxE5ER8RHhE4ER4RHRE3ER0RHBE2ERwRGxE1ERsRGhE0ERoRGREzERkATgL0VjIRGREYETIRGBEXETERFxEWETARFhEVES8RFREUETsRFBEQERMREBESETkREhERETgREREQETcREA8RNg8OETUODRE0DQwLETILChExCgkRMAkYBxE7BxA2BREvBQQRMQQDETADAhE4AgERNQERM1YzVjhWMVY+2zwAywBPAfwRLRE6ES0RLBE5ESwRKxE4ESsRKhE3ESoRKRE2ESkRKBE1ESgRJxE0EScRJhEzESYRJREyESURJBExESQRIxEwESMRIhEvESIRIREuESERIBEtESARHxEsER8RHhErER4RHREqER0RHBEpERwRGxEoERsRGhEnERoRGREmERkAUADSERgRJREYERcRJBEXERYRIxEWERURIhEVERQRIREUERMRIBETERERHhERERARHREQDxEcDw4RGw4NERoNDBEZDAsRGAsKERcKCREWCQgRFQgEERQEBhETBgkREgkBERABEJ8NEDlIFxAlAKSCEEhCbzZQDssfHMs/Gss/GMsHUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBPoCWPoCy38B+gIByMp/WPoCWPoCWPoCWPoCyQHMAD7THwGCEO71kk268uCB+gDTD9IA+gD6ANN/0z/TH1VwAfARLRE1ES0RLBE0ESwRKxEzESsRKhEyESoRKRExESkRKBEwESgRJxEvEScRJhEuESYRJRE1ESURJBE0ESQRIxEzESMRIhEyESIRIRExESERIBEwESARHxEvER8RHhEuER4RHRE1ER0RHBE0ERwRGxEzERsRGhEyERoAVgIQMNs8bBnbPH8AWwBcBMqOxzDTHwGCEAmf9KO68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdM/0z9VIGwT2zx/4CCCEO12km66jwgw2zxsGNs8f+AgghBG3tNSugBlAGYAZwBoAvgRGRExERkRGBEwERgRFxEvERcRFhEuERYRFRE1ERURFBE0ERQRExEzERMREhEyERIRERExEREREBEwERAPES8PDhEuDg0RNQ0METQMCxEzCwoRMgoJETEJCBEwCAcRLwcGES4GBRE1BQQRNAQDETMDAhEyAgERMQERMNs8ANkAVwH6+EFvJDAygV/yVjJWIL7y9IFLaVYmVjOgE74S8vQRLhE0ES4RLREzES0RLBEyESwRKxExESsRKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8AWAH8ER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKAFkC/hA5SHAQJoAMVEF2FQQROAQDETcDAlY4ARE42zwwBlYvoBEtES8RLREsES4RLBErES0RKxEqESwRKhEpESsRKREoESoRKBEnESkRJxEmESgRJhElEScRJREkESYRJFYjESYRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8AjQBaAfYRHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihkQaBBXEEYQNRAk2zwAzgBC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARLRE2ES0RLBE1ESwRKxE0ESsRKhEzESoRKREyESkRKBExESgRJxEwEScRJhEvESYRJREuESURJBE2ESQRIxE1ESMRIhE0ESIRIREzESERIBEyESARHxExER8RHhEwER4RHREvER0RHBEuERwRGxE2ERsRGhE1ERoAXQL4ERkRNBEZERgRMxEYERcRMhEXERYRMREWERURMBEVERQRLxEUERMRLhETERIRNhESERERNRERERARNBEQDxEzDw4RMg4NETENDBEwDAsRLwsKES4KCRE2CQgRNQgHETQHBhEzBgURMgUEETEEAxEwAwIRLwIBES4BETbbPADZAF4C/PhBbyQwMnBWNcIAlFY0wgCRcOKSMHHeVjPCAJRWMsIAkXDikaTegUtpViciqFY6oBS+E/L0gV/yVh8jqFY5Ab7y9FY0wgCUVjPCAJFw4o6ogA1wVjkkqQRWM1FUEEVWOwRWO1A0AhE7AgEROgFWP9s8MBExETIRMZRXM1cz4gCNAF8C+lYwwgCUVi/CAJFw4o4WBRE2BQQRNAQDETMDAhEwAlcuVy5fBOMNVi+gVh0BES2oEScRMBEnESYRLxEmESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbAGAAYQH2gA5wVjdWNakEETARNhEwES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeAGIB/BEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8S6AQiRA4FxA2EDUQNALbPADOAf4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbKhBbEEoQiRA4AGMC/AcGETgGRBUQIxE62zwwBREwBQQRLgQDES0DBBEsBAURKwUCESoCAREpAREoAxEnAwQRJgQFESUFAhEkAgERIwERIgMRIQMEESAEBREfBQIRHgIBER0BERwDERsDBBEaBAURGQUC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ERwRGxEzERtWMhEbAHYC+hEaETIRGhEZETERGREYETgRGBEXETcRFxEWETYRFhEVETURFREUETQRFBETERIRMhESERERMRERERAROBEQDxE3Dw4RNg4NETUNDBE0DAsKETIKCRExCQgROAgHETcHBhE2BgURNQUEETQEAwIRMwJWOFlWN9s8ES0RNREtAMsAdwH8ESwRNBEsESsRMxErESoRMhEqESkRMREpESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiESERKREhESARKBEgER8RJxEfER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYAHgApBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIVXcD/iBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBC1YUWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOIgbrOXIG7y0IBvLJ0wcFRwAFMAcFRwAFMA4lYcllR7qVR7qZZUdUNUdUPiI8AAlzVWMqQRMwXeVjAA9QD1AHoC3IAQViVZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrOYIG7y0IBvJluYMHBUcABTAFviViaUAVYkoJRWJKAB4iBWJKiCMA3gtrOnZAAAqQQiViWogjAN4Lazp2QAAKkEVjeAEFYrWfQPb6GSMG3fAPcAewL+IG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOXIG7y0IBvI5QwcHAh4nBWKiTCAJRWLSS6kXDijkExI1YrtghWLY4TViojoVIQqIIwDeC2s6dkAACpBI4TIlYroVIQqIIwDeC2s6dkAACpBOJRIaFQVaEgwACScDPeBN4gwgCRMOMNcAB8AH0AKDNSMqgiViqooF2gqQRaoFYrs0ADAfZTAFYtwgCOVWwhVitWK6hWJqiCMGdlx5P6EAedqhqpBCARKKiCEDuaygCpBCLCAJ4xIVZbqIIQO5rKAKkEAd5WJyGhIqABEToBoFMhoVY6oAEROQGgETgROQERJwGSVyjiVipQDqEvqIIwDeC2s6dkAACpBFYpUA2hL6gAfgH+gjAN4Lazp2QAAKkEVhARLi2gIqEhoQEREQGgIBEuoVL/qFYsViyooC9WLaCpBA9WLKBWKlYqVjCOFFYtVhKhUjCogjAN4Lazp2QAAKkEjhRWEVYuoVIwqIIwDeC2s6dkAACpBOIjVi+oAREqAREnoAERJgGogjBnZceT+hAHnQB/AuaqGqkEAREmoFYugW+7ESmguQERJwHy9FYsgUOgESaoViZWEKiCMA3gtrOnZAAAqQS+ARElAfL0ViyOFVcWVxZXFlcWVxZXFilWJlYgKlF6oOMOEDpJgAYRIAYFER8FBBETBAMREgMCERECAREQAQ+BAQsPAIAAgQCiVxBXEFcQVxBXEFcQKVYmViAqUWqgERURIBEVERQRHxEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4DERMDAhESAgEREQEGERAHBPLIVbAQbBBbEEoQOUh82zzIVVAH2zzJAczJAhEQAhRWIgEgbpUwWfRZMJRBM/QT4oAQAcgBAfQAyQIRLwJWIAEgbpUwWfRbMJRBM/QX4oAQI1YVKVYWVhFWEchVUNs8yQIRLQJWIAEgbpUwWfRbMJRBM/QX4oAQVHupALAAsACyAIID/MhVIFr6AhLKAMt/yQIRLgJWIAEgbpUwWfRbMJRBM/QX4nFWM4BAViRZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zmDACERECPz8w4w1WHwERMoBA9FswL8IAjpMRFS9yf1UgbW1t2zwwESYuoREmklcV4gCDAN0AhAJwIG7y0IBvJSTCAJMjwgCRcOKSMzPjDSDCAJMiwgCRcOKZXwMCERECPz8w4w1WHwERMYBA9FswETAAhQCGAfoRExShERwRHhEcERsRHREbERoRHhEaERkRKREZERgRHREYERcRHhEXERYRKREWAREVAREUER0RFBETER4RExERERIRERERESkREQwREAwQzw4RKQ4QnRwLER0LChEvCkiQBxEpBxAmBREpBRAkAxEpA1YjAhEqAQ8REA8Q7wCTAf41coANcPgjETIRWREyETERWBExETARVxEwES8RVhEvES4RVREuES0RVBEtESwRUxEsESsRUhErESoRUREqESkRUBEpESgRTxEoEScRThEnESYRTREmESURTBElESQRSxEkESMRShEjESIRSREiESERSBEhESARRxEgER8RRhEfAIcB/gOkgA5w+CMRNhFXETYRNRFWETURNBFVETQRMxFUETMRMhFTETIRMRFSETERMBFRETARLxFQES8RLhFPES4RLRFOES0RLBFNESwRKxFMESsRKhFLESoRKRFKESkRKBFJESgRJxFIEScRJhFHESYRJRFGESURJBFFESQRIxFEESMAiwH4ER4RRREeER0RRBEdERwRQxEcERsRQhEbERoRQREaERkRQBEZERgRPxEYERcRPhEXERYRPREWERURPBEVERQROxEUERMROhETERIRORESEREROBERERARNxEQDxE0DxCeDRE1DQwRMwwLEVkLChFYCgkRVwkIEVYIBxFVBwCIAv4GEVQGBRFTBVZSBRA0VkAEVkIEVkFQNAIRWQIBEVgBVloB2zwwES0RVBEtESwRUxEsESsRUhErESoRUREqESkRUBEpESgRTxEoEScRThEnESYRTREmESURTBElESQRSxEkESMRShEjESIRSREiESERSBEhESARRxEgER8RRhEfAI0AiQH8ER4RRREeER0RRBEdERwRQxEcERsRQhEbERoRQREaERkRQBEZERgRPxEYERcRPhEXERYRPREWERURPBEVERQROxEUERMROhETERIRORESEREROBERERARNxEQDxE2Dw4RNQ4NETQNDBEzDAsRMgsIETAIChEvCgcRLgcGES0GAIoANAURLAUEESsEAxEqAwIRKQIBESgBEScQSUEwAfgRIhFDESIRIRFCESERIBFBESARHxFAER8RHhE/ER4RHRE+ER0RHBE9ERwRGxE8ERsRGhE7ERoRGRE6ERkRGBE5ERgRFxE4ERcRFhE3ERYRFRFXERURFBFWERQRExFTERMHERIHERERVBERERARUhEQDxFRDw4RUA4NEU8NAIwC/gwRTgwLEU0LChFMCgkRSwlWSgkQOAcROAcGETkGBRFYBRAkAxE4AwIROQIRWAHbPDARLRFOES0RLBFNESwRKxFMESsRKhFLESoRKRFKESkRKBFJESgRJxFIEScRJhFHESYRJRFGESURJBFFESQRIxFEESMRIhFDESIRIRFCESEAjQCOA9xWGKQpwAqRf5MpwAvikiazjhApwAyRJpkpwA2RJpIms+Li4vgjgEBwLVRMMC5UTTAtVE0wLVRKMFROu8hVoNs8yQIRHgJWHAEg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UBEuES0RTxEtESwRThEsALIAswAoUGX6AlAD+gIB+gIB+gJY+gIB+gIB+BErEU0RKxEqEUwRKhEpEUsRKREoEUoRKBEnEUkRJxEmEUgRJhElEUcRJREkEUYRJBEjEUURIxEiEUQRIhEhEUMRIREgEUIRIBEfEUERHxEeEUARHhEdET8RHREcET4RHBEbET0RG1Y8ERsRGhE8ERoRGRE7ERkRGBE6ERgAtAP8ERcROREXERYROBEWERURNxEVERQRNhEUAhETAhESETQREhERETMREREQETIREA8RMQ8OEVIODRFPDQwRNQwLEVALChFOCgkRTQkIEUwIBxFLBwYRSgYFEUkFBBFIBAMRRwMCET0CVkYCVkECET8B2zxWMcIAklc44w0BEU4BAMsAtQC2ASYROFYxcn9VIG1tbds8MAVWMKEFAN0B/BE2oREdEUERHREcEUARHBEbET8RGxEaEUsRGhEZET4RGREYET0RGBEXETwRFxEWETERFhEVEUwRFREUEToRFBETETQRExESETkREhERES4REREQETMREA8RSg8OEUMODREyDVY7DQwROQwLETgLChFKCgkRSQkIEUgIBxFFBwC3AvwGEUcGBRFGBQQRQwQDES4DAhEtAlYuAgERMgEREBERERAPERAPEN4QzcgRIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARHcIAkSORcOJSEKD4QhESow4RMA4AuAC5AfSCECNTRkwBESHLHwERHwHLPwERHQHLPwERGwHLBwERGQHLPwERFyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgERFQHLDwEREwHKAAEREQHKf1AP+gIdyn9QC/oCCcjLfxjLfxbKfxTKf1j6AgH6Asp/yn/IWAC6AfgNES8NDBEuDAsRLQsKESwKCRErCQgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIRHhEjER4CESICER4RIREeAhEgAgwRHwwCER0CDBEcDBEUERsRFA0RGg0CERkCERcRGBEXDBEXDBERERYRERERERUREQsRFAsEERMEALsAcvoCUAP6AlAD+gJQA/oCUAP6AlAD+gJQA/oCUAP6AhPKAAPIy38Uyn9QBPoCFMp/yVADzMlYzMkBzAFMEREREhERBBERBAsREAsQ3xCuEJ0QjBBbEHoQaRA4EFcQNEEw2zwAzgH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAAMAD9IIAoPf4QlYfxwXy9PhBbyQwMYFLaTJWLL7y9FYTpIBA+COCAVGAoFRpkFRpkFRpkFKQyFVw2zzJAhEXAlYWASBulTBZ9FswlEEz9Bfi+COCAVGAoAgRFQgHERUHBhEVBgURFQUEERUEAxEVAwIRFQIBERUByFWA2zzJAMEAwgDDA8ww0x8BghCI5/knuvLggdIA0z/TP1UgbBOCAKD3+EJWG8cF8vSBS2n4QW8kE18DViZWKqC+8vRWEIBAI1n0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oErcCFus/L0IG7y0IBvKArjD38A7wDFAMYDvo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AgghAusQjbuo6iMNMfAYIQLrEI27ry4IHUAdAB0gABk9QB0JFt4hJsEts8f+DAAJEw4w1wANwAzwDQAARVYADwJ26zmH9QCcoAF8sHmDdwUAjKABBn4hXLPxPLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AssfAaiCEJYoupZQCssfGMs/Jm6zl38BygAWyweWNnBQBsoA4hTLPxLLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEAxAFEyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EJWJBDvAXDbPADOAGYgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgHIyx/JAcwBfF8HMiAREIBA9FswUP/IWYIQS8NB1VADyx/LP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCViMBcNs8AM4D/DeBesH4I1AKvhny9CRus440BHEhbpJbcJG64pgRGRKAQPRbMI4bUiARGIBA9FswERYSgED0WzARFhEYERYRFREW4hEYWZIzM+IibrOTIcIAkXDiIJJsIuMNJG6zkyLCAJFw4o6TBCBu8tCAf1gDchAjbW1t2zwwApIyM+JSEADHAN0AyAH0AyBu8tCA+EIRMBE1ETARLxE0ES8RLhEzES4RLREyES0RLBExESwRKxE1ESsRKhE0ESoRKREzESkRKBEyESgRJxExEScRJhE1ESYRJRE0ESURJBEzESQRIxEyESMRIhExESIRIRE1ESERIBE0ESARHxEzER8RHhEyER4AyQGCERGAQPRbMALIWYIQ20XkOFADyx/LP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA6SViSRcOJWIgGg+EJw2zwAzgH8ER0RMREdERwRNREcVjQRHBEbETQRGxEaETMRGhEZETIRGREYETYRGBEXERYRNBEWERURMxEVERQRMhEUERMRNhETERIRERE0EREREBEzERAPETIPDhE2Dg0METQMCxEzCwoRMgoJETYJCAcRNAcGETMGBREyBQQRNgQDETUDAMoC/FY1AwIRNwIBETfbPBEtETIRLREsETERLBErETARKxEqES8RKhEpES4RKREoES0RKBEnESwRJxEmESsRJhElESoRJREkESkRJBEjESgRIxEiEScRIhEhESYRIREgESURIBEfESQRHxEeESMRHhEdESIRHREcESERHBEbESARGwDLAMwCWCLCAI8jcnBtcMhSEMsAydAQaF40EDfIVWDbPMlWKFUgFEMwbW3bPDCSXwXiAM0A3QDWERoRHxEaERkRHhEZERgRHREYERcRHBEXERYRGxEWERURGhEVERQRGREUERMRGBETERIRFxESERERFhERERARFREQDxEUDw4REw4NERINDBERDAsREAsQrxCeEI0QfBBrEFoQSRA4RxVQRAYA3oIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AgHPFgGy+EFvJDAy+CdvECyhI6AioXABtgkgViK2CFYiAaGBAQtWHEAUWfQKb6ExkjBwl3ABViKhtgniWaFQBKFQA6AiwgCScDPfWKEgwgCOinJ/VSBtbW3bPDCRW+IA3QHwES0RLxEtESwRLhEsESsRLxErESoRLhEqESkRLxEpESgRLhEoEScRLxEnESYRLhEmESURLxElESQRLhEkESMRLxEjESIRLhEiESERLxEhESARLhEgER8RLxEfER4RLhEeER0RLxEdERwRLhEcERsRLxEbERoRLhEaANECtPkBIILwbI9E9F/ttM3+1N6NsUqlsTrVXUMPdZ0GaSELdMSP49+6joYw2zx/2zHggvC8+vd2kHxxnMjTedjxlKqqJ+jKKHHNWReBch8hWkVFAbqOhds8f9sx4ADUANUC/BEZES8RGREYES4RGBEXES8RFxEWES4RFhEVES8RFREUES4RFBETES8RExESES4REhERES8REREQES4REA8RLw8OES4ODREvDQwRLgwLES8LChEuCgkRLwkIES4IBxEvBwYRLgYFES8FBBEuBAMRLwMCES4CAREvAREu2zzIAQDYANIB+BEwzxbJ+wRWLW6zjhHIES4gbvLQgAERLgHPFsntVJJXLeIRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0A0wC0ERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcBBjbPNs8VyxwiAERLQEA2ADWANcA2wQY2zzbPFcsf4gBES0BANgA2QDaANsAEIIA0DBWLfL0ABYAAAAAUmVzdW1lZAAU+EJWLgHHBfLghAASggCdsFYts/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPADcATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAA3QHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgA3gCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIhuhe9s82zxXEF8PVxBfD2zhgBAwDhAgEgAOIA4wAEViwCAWIA5ADlAh21pptnm2eNnO2c7ZztiPABAwDoAsiq4ds82zxXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFXRAQMA5gIgqR3bPNs8VxBfD1cQXw9s4QEDAOcAQFYrVidWJ1YnVidWJ1YnVidWJ1YnViVWKFYoViZWKFY5AARWLQAOVHdlVHdlJwIBIADrAOwC+bKiCBukjBtjhwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI4ts8ES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEggAQMA8wL5rQrtngiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+IjwiOiI8IjoiOCI6IjgiNiI4IjYiNCI2IjUABAwDtAvmueG2eCJaIlwiWiJYIloiWCJWIlgiViJUIlYiVCJSIlQiUiJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPCI6IjwiOiI4IjoiOCI2IjgiNiI0IjYiNQAEDAPABpBEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PVxJXEF8PbMIA7gE8gEAvAln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4lLQAO8A5NIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoA0x9VcAGkERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXElcQXw9XElcQXw9swgDxAUCAQFYUAln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4lYSAQDyAFjSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6ANMf0gBVUAHoER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8bMRsxGzEbKQA9APebSFus49ZLYAQJFn0D2+hkjBt3yBukjBtl9D0BAExbwHiIG6zjzUxIG7y0IBvIYEBCwIgbvLQgBJZ9AtvoZIwbd8gbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4pIwMeKRMeIrgBAjWfQPb6GSMG3fAPUA9QD2ABzTP/oA+gDTf9J/0n9VUAFoIG6SMG2d0PoA0gDTf1UgbBNvA+KAEFRMFFn0D2+hkjBt3yBukjBtjofQ2zxsFm8G4i5QMwD3ABz6APoA+gD6APoA+gBVUAIBIAD6APsCASAA/gD/ABGwr7tRNDSAAGAC9bKnCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARH4AEDAPwB1BEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bMRsxGzEbKQA/QA6VhWBAQsiWfQKb6ExIVYZxwUiVhnHBQNWG8cFQTAC+bIHNs8ES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEagAQMBAAL5snu2zwRLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERqABAwEEAcgRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PbOEgbpIwbZkgbvLQgG8nbwfiIG6SMG3eAQEBOoAQVhUCWfQPb6GSMG3fIG6SMG2Oh9DbPGwXbwfiAQIAJNQB0AHSANMP+gDTH9Mf0x9VYAJC7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4ImBAQHXAAEB0ds8AQUBBgGYERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbMNsQwEOAvjbPFcuESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZAQcBCATaMHCBALRwVHAAVHAAVHAAVHAAggr68ICCEAX14QCCCJiWgI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABImJiQENAQ0BDQEMAdT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0x/6ANMf0x/TH/oA+gD6APoA1AHQ+gD6APoA+gD6APoA+gD6ANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBAQkAeBEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgHG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBAQoB4vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE9ATTP9Qw0PQE9ATTP/QE0z/TP9Qw0PQE9AT0BPoA+gD6ANJ/0n/6APoA1DDQAQsAxPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxESMRLhEjESMRLREjESMRLBEjESMRKxEjESMRKhEjESMRKREjESMRKBEjESMRJxEjESMRJhEjESMRJREjESMRJBEjAfSJbW1tcW1tIm1TEW1tbVYWVHAAVHAAjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+EIRLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4AENAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAZBWEYBAIln0D2+hkjBt3yBukjBtjofQ2zxsG28L4oBAVhJAE1n0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeJWEFkBDwBs0wfTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA03/SAPoA0x/SAFWg');
    const __system = Cell.fromBase64('te6cckICARIAAQAAXacAAAEBwAABAQWg6L8AAgEU/wD0pBP0vPLICwADAgFiAAQA3ALw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjAQUABQL8ESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8AAYA1wSi7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEFuPJx26jpQw0x8BghBbjycduvLggdQBMds8f+AgghDIwDyIuuMCIIIQqFY8qbrjAiCCEKYvhWy6AAcACwANABoB8BEtES4RLREsES4RLBErES4RKxEqES4RKhEpES4RKREoES4RKBEnES4RJxEmES4RJhElES4RJREkES4RJBEjES4RIxEiES4RIhEhES4RIREgES4RIBEfES4RHxEeES4RHhEdES4RHREcES4RHBEbES4RGxEaES4RGgAIAvgRGREuERkRGBEuERgRFxEuERcRFhEuERYRFREuERURFBEuERQRExEuERMREhEuERIREREuEREREBEuERAPES4PDhEuDg0RLg0MES4MCxEuCwoRLgoJES4JES4IBwZVQNs8ES7IAYIQW48nHVjLH8zJES0RLhEtESwRLREsANAACQH8ESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbf21WHBEeERwRHREcERsRHBEbERoRGxEaAAoBtBEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVgQFVSDbPADUAeIw0x8BghDIwDyIuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsEwAMACZXGFcYVxiCAKD3+EJSIMcF8vR/A4Qw0x8BghCoVjypuvLggdQB0NIAAY6E2zxvDJFt4gHSAAGV9AQBbwGRbeIB1DDQ0gABjobbPGwUbwSSMG3ibBPbPH8ADgAPABEAWPoA+gD6APoA+gD6APoA+gDUAdD6APoA+gD6ADAQTBBLEEoQSRBIEEcQRhBFAcb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAAEABG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEUQzAB8BEtETARLREsES8RLBErES4RKxEqETARKhEpES8RKREoES4RKBEnETARJxEmES8RJhElES4RJREkETARJBEjES8RIxEiES4RIhEhETARIREgES8RIBEfES4RHxEeETARHhEdES8RHREcES4RHBEbETARGxEaES8RGgASAv4RGREuERkRGBEwERgRFxEvERcRFhEuERYRFREwERURFBEvERQRExEuERMREhEwERIREREvEREREBEuERAPETAPDhEvDg0RLg0METAMCxEvCwoRLgoJETAJCBEvCAcRLgcGETAGBREvBQQRLgQDETADAhEvAgERLgERMNs8VjBuANAAEwT6s45FMFcXVxdXF1YsIG7y0IBvJF8DVi0gbvLQgG8kECNfA1YuIG7y0IBvJBNfAxEvIG7y0IBvJGwxAhEvAgERGQECERgCERcSklcw4lYtbrOSVy3jDVYtbrOSVy3jDYgRKxEuESsRKhEtESoRKREsESkRKBErESgRJxEqEScAFAAVABcAGADUES0gbvLQgG8hIIEBC3FZ9IJvpSCWUCPXADBYlmwhbTJtAeKQjkGBAQsBkX+RbeICERYCVhYBcSFulVtZ9FkwmMgBzwBBM/RB4oEBCyICERZxQTP0dG+lIJZQI9cAMFiWbCFtMm0B4uhfAwH6VxlXGVcZVxlXGVcZVxlXGVcZVxlXGVcZ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EBE6ERAPETkPDhE4Dg0RNw0MET0MCxE8CwoROwoJEToJCBE5CBdWOAcGET0GBRE8BQQROwQROgPbPFYxwgDjDwB9AC4ALwAwAAhWNMIAAAJwAfqRf5xWM8IAlFYywgCRcOLijlFWL4BAETepBAQRMgQDETUDAhE0AgERMwHIVUBQVPoCEst/AfoCEst/AfoCyRA9AhEyAgERLwEgbpUwWfRbMJRBM/QX4hEsES4RLBErES0RKwqOEzAEETQEAxEzAwIRMgJXMFcwXwPiAVYpoAAxAfgRKBEvESgRJxEuEScRJhEtESYRJREsESURJBErESQRIxEqESMRIhEpESIRIREoESERIBEnESARHxEmER9WHhEmER4RJREeER0RJBEdERwRIxEcERsRIhEbERoRIREaERkRIBEZERgRHxEYERcRHhEXERYRHREWERURHBEVADIBohEUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+EG0QXBBLEDpIkBBnEFYEQzXbPADFAlwiwgCPJfhCcIBCcG0jyFIQywDJ0BBqEFkQSBA3yFVg2zzJFEMwbW3bPDCSXwTiAMIA1QTIjsYw0x8BghBIHnVhuvLggdM/0z8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeJDMGwT2zx/4CCCEKvPWHu6jwgw2zxsFts8f+AgghDu9ZJNugA1ADsAPABJAvb4QW8kMDKBS2lWJVYroBO+EvL0VhaAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuKBf30hbrPy9CBu8tCAbyaBXm0Bs/L0Vh2BAQsnWfQKb6ExggCg9yGRf5RTV8cF4vL0s5yBF+YBVjWg+CO78vSRMOJScBEbgED0WzAA8gA2AfQjklYgklYh4hEwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETYRKhEpETURKREoETQRKBEnETMRJxEmETIRJhElETERJREkETYRJBEjETURIxEiETQRIhEhETMRIREgETIRIBEfETERHxEeETYRHgA3Af4RHRE1ER0RHBE0ERwRGxEzERsRGhEyERoRGRExERkRGBE2ERgRFxE1ERcRFhE0ERYBERUBERQRMhEUERMRMRETERIRNhESERERNRERERARNBEQHw4RMg4NETENDBE2DAsRNQsKETQKGQgRMggHETEHBhE2BgURNQUEETQEWlYxADgD9AJWNts8VjNus5cRMyBu8tCAlFczVjHiVjDCAI6RVjByf1UgbW1t2zwwBVYvoQWRMOIRMJFxkXLiAgERLgERLchVIIIQubA8vFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFYbViGgES2jESoRMBEqAMEA1QA5AfwRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERUAOgGYERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIcEVgQzDbPADFAI7THwGCEKvPWHu68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH0BPoA+gBVUAP0OfhBbyQwMoIAoPdWHIEBCyNZ9ApvoTHy9FYZgEAoWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbigX99IW6z8vQgbvLQgG8mgV5tAbPy9FYqJZNWM6CWVjJWMqCg4oFLaVGBvhjy9H+AQCZURjAmVEY2AchVUNs8yQIRHwIA8gA9AD4AXFBWygBQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6AssfygAEzlLAIG6VMFn0WzCUQTP0F+JwKIAQgwZZ9IZvpSCWUCPXATBYlmwhbTJtAeKQiuhbOFJuoVLtoSBWNaiCEDuaygCpBFPQoAEREQGgAVYQoQEREQGgVhAooCTjD1LAERCAQPRbMFYfwgAAPwBAAEIARwDMVheAECNZ9A9voZIwbd8gbpIwbZ3Q+gDSANN/VSBsE28D4iBus44gIG7y0IBvIxOhqAGRcZF/4qiCMA3gtrOnZAAAqQQSoAGRW+KAECoCgwZBM/R8b6UgllAj1wEwWJZsIW0ybQHiAtJwVjciobYJI4EpYgK78vRWE8AAmzCCMA3gtrOnZAAAn4IwDeC2s6dkAACoVhOpBOIigjAN4Lazp2QAAKghqQR/bXDIydAqUTlRNgPIVVDbPMlWKQJWNgJDMHABbW3bPDAREiOgERRWEqAAQQDVAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAvqCMA3gtrOnZAAAqFYTqQRTAqiCMA3gtrOnZAAAqQR/VHxHbchVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYoAlY1AkMwcAFtbds8MBESVhKhERQjoQDVAEMB/BEtEToRLREsETkRLBErETgRKxEqETcRKhEpETYRKREoETURKBEnETQRJxEmETMRJhElETIRJREkETERJBEjETARIxEiES8RIhEhES4RIREgEToRIBEfETkRHxEeETgRHhEdETcRHREcETYRHBEbETURGxEaETQRGhEZETMRGQBEAvRWMhEZERgRMhEYERcRMREXERYRMBEWERURLxEVERQROxEUERARExEQERIRORESEREROBERERARNxEQDxE2Dw4RNQ4NETQNDAsRMgsKETEKCREwCRgHETsHEDYFES8FBBExBAMRMAMCETgCARE1AREzVjNWOFYxVj7bPADBAEUB/BEtEToRLREsETkRLBErETgRKxEqETcRKhEpETYRKREoETURKBEnETQRJxEmETMRJhElETIRJREkETERJBEjETARIxEiES8RIhEhES4RIREgES0RIBEfESwRHxEeESsRHhEdESoRHREcESkRHBEbESgRGxEaEScRGhEZESYRGQBGANIRGBElERgRFxEkERcRFhEjERYRFREiERURFBEhERQRExEgERMREREeEREREBEdERAPERwPDhEbDg0RGg0MERkMCxEYCwoRFwoJERYJCBEVCAQRFAQGERMGCRESCQEREAEQnw0QOUgXECUD4o6hKm6zlgogbvLQgJI6JeJWH3J/VSBtbW3bPDARElYeoRESkTriBJFxkXLiXjcGEDUQJBAjAhERAi4CVhQCERJUHw1WEhBnyFXA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERWjEFpeNEVgFNs8ANUASADFAKSCEEhCbzZQDssfHMs/Gss/GMsHUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBPoCWPoCy38B+gIByMp/WPoCWPoCWPoCWPoCyQHMBDqPCDDbPGwY2zx/4CCCEPlPgLu64wIgghAJn/SjugBKAEsAUQBcAD7THwGCEO71kk268uCB+gDTD9IA+gD6ANN/0z/TH1VwAfARLRE1ES0RLBE0ESwRKxEzESsRKhEyESoRKRExESkRKBEwESgRJxEvEScRJhEuESYRJRE1ESURJBE0ESQRIxEzESMRIhEyESIRIRExESERIBEwESARHxEvER8RHhEuER4RHRE1ER0RHBE0ERwRGxEzERsRGhEyERoATAL4ERkRMREZERgRMBEYERcRLxEXERYRLhEWERURNREVERQRNBEUERMRMxETERIRMhESERERMRERERARMBEQDxEvDw4RLg4NETUNDBE0DAsRMwsKETIKCRExCQgRMAgHES8HBhEuBgURNQUEETQEAxEzAwIRMgIBETEBETDbPADRAE0B+vhBbyQwMoFf8lYyViC+8vSBS2lWJlYzoBO+EvL0ES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfAE4B/BEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQSgBPAv4QOUhwECaADFRBdhUEETgEAxE3AwJWOAERONs8MAZWL6ARLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESRWIxEmESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfAH0AUAH2ER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoZEGgQVxBGEDUQJNs8AMUCEDDbPGwZ2zx/AFIAUwBC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARLRE2ES0RLBE1ESwRKxE0ESsRKhEzESoRKREyESkRKBExESgRJxEwEScRJhEvESYRJREuESURJBE2ESQRIxE1ESMRIhE0ESIRIREzESERIBEyESARHxExER8RHhEwER4RHREvER0RHBEuERwRGxE2ERsRGhE1ERoAVAL4ERkRNBEZERgRMxEYERcRMhEXERYRMREWERURMBEVERQRLxEUERMRLhETERIRNhESERERNRERERARNBEQDxEzDw4RMg4NETENDBEwDAsRLwsKES4KCRE2CQgRNQgHETQHBhEzBgURMgUEETEEAxEwAwIRLwIBES4BETbbPADRAFUC/PhBbyQwMnBWNcIAlFY0wgCRcOKSMHHeVjPCAJRWMsIAkXDikaTegUtpViciqFY6oBS+E/L0gV/yVh8jqFY5Ab7y9FY0wgCUVjPCAJFw4o6ogA1wVjkkqQRWM1FUEEVWOwRWO1A0AhE7AgEROgFWP9s8MBExETIRMZRXM1cz4gB9AFYC+lYwwgCUVi/CAJFw4o4WBRE2BQQRNAQDETMDAhEwAlcuVy5fBOMNVi+gVh0BES2oEScRMBEnESYRLxEmESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbAFcAWwH2gA5wVjdWNakEETARNhEwES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeAFgB/hEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsqEFsQShCJEDgAWQL8BwYROAZEFRAjETrbPDAFETAFBBEuBAMRLQMEESwEBRErBQIRKgIBESkBESgDEScDBBEmBAURJQUCESQCAREjAREiAxEhAwQRIAQFER8FAhEeAgERHQERHAMRGwMEERoEBREZBQIRGAIBERcBERYDERUDBBEUBAUREwUCERICAH0AWgAoARERAREQED8QThBdTLpeU0YUUFIB/BEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8S6AQiRA4FxA2EDUQNALbPADFBMqOxzDTHwGCEAmf9KO68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdM/0z9VIGwT2zx/4CCCEO12km66jwgw2zxsGNs8f+AgghBG3tNSugBdAGYAZwCGA/L4QW8kMDJWFYBAJVn0D2+hkjBt3yBukjBtjofQ2zxsG28L4oF/fSFus/L0IG7y0IBvK2wzNDWBXm0DsxPy9CTACpF/kyTAC+JWLSGTVjCg3oFLaVGRvhny9FYfgQELKFn0Cm+hMYIAoPchkX+UU1jHBeLy9LORcOMNAREAXgBfABQlwAqRf5MlwAziA/ydgRfmBVY3oPgjuxXy9JE04nAEkjAx4w1SYBEZgED0WzBWGMIAjp8nbpI3IpYHIG7y0IDiVhhyf1UgbW1t2zwwAREXoBEWkzdXF+IMVhahTEPIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wAAYADVAGUC+lYZgEAqWfQPb6GSMG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4iBus47IIG7y0IBvJSgFwgCTA8IAkjNw4pQzVEET3gHCAJLCAJIwcOKRoJEw4iDCAI6NNFMjcn9VIG1tbds8MJEw4lKAERqAQPRbMBEZkTDiES8RNxEvANUAYQH4ES4RNhEuES0RNREtESwRNBEsESsRMxErESoRMhEqESkRMREpESgRMBEoEScRNxEnESYRNhEmESURNRElESQRNBEkESMRMxEjESIRMhEiESERMREhESARMBEgER8RNxEfER4RNhEeER0RNREdERwRNBEcERsRMxEbVjIRGwBiAvoRGhEyERoRGRExERkRGBE4ERgRFxE3ERcRFhE2ERYRFRE1ERURFBE0ERQRExESETIREhERETEREREQETgREA8RNw8OETYODRE1DQwRNAwLChEyCgkRMQkIETgIBxE3BwYRNgYFETUFBBE0BAMCETMCVjhZVjfbPBEtETURLQDBAGMB/BEsETQRLBErETMRKxEqETIRKhEpETERKREoETARKBEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIREgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGREYESARGABkAKQRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3ARYRE6MCERMCECnbPADFAJbTHwGCEO12km668uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdM/0z/TD9N/0h/Sf9J/VXAD8jIz+EFvJDAyggCg91YdgQELI1n0Cm+hMfL0VhiAQChZ9A9voZIwbd8gbpIwbY6H0Ns8bBtvC+KBf30hbrPy9CBu8tCAbyuBS2lWNVY5oB6+HfL0gV5tDLMc8vR/gEAqUTpROlE6UTpROlE6UTpQIwERFAHIVaDbPMkBEQCaAGgC7AIRIQJUKvAgbpUwWfRbMJRBM/QX4ibACpF/kybADOKzjhEIlVKQER++lVKQER+74vLmbJM4Vx7iLG6RPJk1CyBu8tCABAviI8AKkX+TI8AL4o6QBREcBRCbEDlHhhA1VQPbPI6QBREcBRCbEDlHhhA1VQPbPOIAaQCbA9xWH4AQKVn0D2+hkjBt3yBukjBtjofQ2zxsF28H4oFsliFus/L0IG7y0IBvJzaCAI9uUAXy9FYhgEBWEVn0D2+hkjBt3yBukjBtjofQ2zxsG28L4iBu8tCAbysQJl8GNFYfgBBWEln0D2+hkjBt3wEDAREAagP+IG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELVhRZ9AtvoZIwbd8gbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4iBus5cgbvLQgG8snTBwVHAAUwBwVHAAUwDiVhyWVHupVHupllR1Q1R1Q+IjwACXNVYypBEzBd5WMAD2APYAawLcgBBWJVn0D2+hkjBt3yBukjBtjofQ2zxsFm8G4iBus5ggbvLQgG8mW5gwcFRwAFMAW+JWJpQBViSglFYkoAHiIFYkqIIwDeC2s6dkAACpBCJWJaiCMA3gtrOnZAAAqQRWN4AQVitZ9A9voZIwbd8A+ABsAv4gbpIwbZ3Q+gDSANN/VSBsE28D4iBus5cgbvLQgG8jlDBwcCHicFYqJMIAlFYtJLqRcOKOQTEjViu2CFYtjhNWKiOhUhCogjAN4Lazp2QAAKkEjhMiViuhUhCogjAN4Lazp2QAAKkE4lEhoVBVoSDAAJJwM94E3iDCAJEw4w1wAG0AbgAoM1IyqCJWKqigXaCpBFqgViuzQAMB9lMAVi3CAI5VbCFWK1YrqFYmqIIwZ2XHk/oQB52qGqkEIBEoqIIQO5rKAKkEIsIAnjEhVluoghA7msoAqQQB3lYnIaEioAEROgGgUyGhVjqgARE5AaAROBE5AREnAZJXKOJWKlAOoS+ogjAN4Lazp2QAAKkEVilQDaEvqABvAf6CMA3gtrOnZAAAqQRWEBEuLaAioSGhARERAaAgES6hUv+oVixWLKigL1YtoKkED1YsoFYqVipWMI4UVi1WEqFSMKiCMA3gtrOnZAAAqQSOFFYRVi6hUjCogjAN4Lazp2QAAKkE4iNWL6gBESoBESegAREmAaiCMGdlx5P6EAedAHAC5qoaqQQBESagVi6Bb7sRKaC5AREnAfL0ViyBQ6ARJqhWJlYQqIIwDeC2s6dkAACpBL4BESUB8vRWLI4VVxZXFlcWVxZXFlcWKVYmViAqUXqg4w4QOkmABhEgBgURHwUEERMEAxESAwIREQIBERABD4EBCw8AcQByAKJXEFcQVxBXEFcQVxApViZWICpRaqARFREgERURFBEfERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDgMREwMCERICARERAQYREAcE8shVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERACFFYiASBulTBZ9FkwlEEz9BPigBAByAEB9ADJAhEvAlYgASBulTBZ9FswlEEz9BfigBAjVhUpVhZWEVYRyFVQ2zzJAhEtAlYgASBulTBZ9FswlEEz9BfigBBUe6kApwCnAKkAcwP8yFUgWvoCEsoAy3/JAhEuAlYgASBulTBZ9FswlEEz9BficVYzgEBWJFn0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeIgbrOYMAIREQI/PzDjDVYfAREygED0WzAvwgCOkxEVL3J/VSBtbW3bPDARJi6hESaSVxXiAHQA1QCCAnAgbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4plfAwIREQI/PzDjDVYfARExgED0WzARMAB1AHoB/jVygA1w+CMRMhFZETIRMRFYETERMBFXETARLxFWES8RLhFVES4RLRFUES0RLBFTESwRKxFSESsRKhFRESoRKRFQESkRKBFPESgRJxFOEScRJhFNESYRJRFMESURJBFLESQRIxFKESMRIhFJESIRIRFIESERIBFHESARHxFGER8AdgH4ER4RRREeER0RRBEdERwRQxEcERsRQhEbERoRQREaERkRQBEZERgRPxEYERcRPhEXERYRPREWERURPBEVERQROxEUERMROhETERIRORESEREROBERERARNxEQDxE0DxCeDRE1DQwRMwwLEVkLChFYCgkRVwkIEVYIBxFVBwB3Av4GEVQGBRFTBVZSBRA0VkAEVkIEVkFQNAIRWQIBEVgBVloB2zwwES0RVBEtESwRUxEsESsRUhErESoRUREqESkRUBEpESgRTxEoEScRThEnESYRTREmESURTBElESQRSxEkESMRShEjESIRSREiESERSBEhESARRxEgER8RRhEfAH0AeAH8ER4RRREeER0RRBEdERwRQxEcERsRQhEbERoRQREaERkRQBEZERgRPxEYERcRPhEXERYRPREWERURPBEVERQROxEUERMROhETERIRORESEREROBERERARNxEQDxE2Dw4RNQ4NETQNDBEzDAsRMgsIETAIChEvCgcRLgcGES0GAHkANAURLAUEESsEAxEqAwIRKQIBESgBEScQSUEwAf4DpIAOcPgjETYRVxE2ETURVhE1ETQRVRE0ETMRVBEzETIRUxEyETERUhExETARUREwES8RUBEvES4RTxEuES0RThEtESwRTREsESsRTBErESoRSxEqESkRShEpESgRSREoEScRSBEnESYRRxEmESURRhElESQRRREkESMRRBEjAHsB+BEiEUMRIhEhEUIRIREgEUERIBEfEUARHxEeET8RHhEdET4RHREcET0RHBEbETwRGxEaETsRGhEZEToRGREYETkRGBEXETgRFxEWETcRFhEVEVcRFREUEVYRFBETEVMREwcREgcRERFUEREREBFSERAPEVEPDhFQDg0RTw0AfAL+DBFODAsRTQsKEUwKCRFLCVZKCRA4BxE4BwYROQYFEVgFECQDETgDAhE5AhFYAds8MBEtEU4RLREsEU0RLBErEUwRKxEqEUsRKhEpEUoRKREoEUkRKBEnEUgRJxEmEUcRJhElEUYRJREkEUURJBEjEUQRIxEiEUMRIhEhEUIRIQB9AIAD3FYYpCnACpF/kynAC+KSJrOOECnADJEmmSnADZEmkiaz4uLi+COAQHAtVEwwLlRNMC1UTTAtVEowVE67yFWg2zzJAhEeAlYcASBulTBZ9FswlEEz9BfiEIkQNFYaBAMCER0CUAwQNUQAyFWw2zzJAJoAfgB/AI6CEK2OMe9QDcsfG8sHGcsPUAcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVygBQA/oCAfoCy3/KAAH6Ass/yz/LHwA2yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEREPAfwRIBFBESARHxFAER8RHhE/ER4RHRE+ER0RHBE9ERwRGxE8ERsRGhE7ERoRGRE6ERkRGBE5ERgRFxE4ERcRFhE3ERYRFRE2ERURFBE1ERQRExE0ERMREhEzERIREREyEREREBExERAPETAPDhEvDg0RLg0MES0MCxEsCwgRKggAgQBMChEpCgcRKAcGEScGBREmBQQRJQQDESQDAhEjAgERIgERIRDOEJ0B+hETFKERHBEeERwRGxEdERsRGhEeERoRGREpERkRGBEdERgRFxEeERcRFhEpERYBERUBERQRHREUERMRHhETEREREhERERERKRERDBEQDBDPDhEpDhCdHAsRHQsKES8KSJAHESkHECYFESkFECQDESkDViMCESoBDxEQDxDvAIMCosgRHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AFYjARETqPhCDaMCERMCEL1BwBvbPACEAMUB9IIQR1lqvgERH8sfAREdAcs/AREbAcs/AREZ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FA4NERMNAhESAgEREQEGERAGEM4JBgcFA/6CMA3gtrOnZAAAqQQqVieogjAN4Lazp2QAAKkEEK8QSRA4EEcGESAGEF4EERUEAxEUAwIREwIBERIBERGBAQsREchVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERICFlYiASBulTBZ9FkwlEEz9BPigBAByAEB9ADJAhEvAlYgAKcApwCoACJQVss/UAP6AgH6Ast/yn/KfwL4ASBulTBZ9FswlEEz9BfigBBUeYdUd5jIVVDbPMkCES0CViABIG6VMFn0WzCUQTP0F+KAEFRy/shVIFr6AhLKAMt/yQIRLgJWIAEgbpUwWfRbMJRBM/QX4lYhARE0gED0WzD4QhEvEVERLxEuEVARLhEtEU8RLREsEU4RLACpAKoAKFBl+gJQA/oCAfoCAfoCWPoCAfoCAfgRKxFNESsRKhFMESoRKRFLESkRKBFKESgRJxFJEScRJhFIESYRJRFHESURJBFGESQRIxFFESMRIhFEESIRIRFDESERIBFCESARHxFBER8RHhFAER4RHRE/ER0RHBE+ERwRGxE9ERtWPBEbERoRPBEaERkROxEZERgROhEYAKsD/BEXETkRFxEWETgRFhEVETcRFREUETYRFAIREwIREhE0ERIREREzEREREBEyERAPETEPDhFSDg0RTw0METUMCxFQCwoRTgoJEU0JCBFMCAcRSwcGEUoGBRFJBQQRSAQDEUcDAhE9AlZGAlZBAhE/Ads8VjHCAJJXOOMNARFOAQDBAKwArQEmEThWMXJ/VSBtbW3bPDAFVjChBQDVAfwRNqERHRFBER0RHBFAERwRGxE/ERsRGhFLERoRGRE+ERkRGBE9ERgRFxE8ERcRFhExERYRFRFMERURFBE6ERQRExE0ERMREhE5ERIREREuEREREBEzERAPEUoPDhFDDg0RMg1WOw0METkMCxE4CwoRSgoJEUkJCBFICAcRRQcArgL8BhFHBgURRgUEEUMEAxEuAwIRLQJWLgIBETIBERAREREQDxEQDxDeEM3IESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAER3CAJEjkXDiUhCg+EIREqMOETAOAK8AsQH0ghAjU0ZMAREhyx8BER8Byz8BER0Byz8BERsBywcBERkByz8BERcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERUByw8BERMBygABEREByn9QD/oCHcp/UAv6AgnIy38Yy38Wyn8Uyn9Y+gIB+gLKf8p/yFgAsABy+gJQA/oCUAP6AlAD+gJQA/oCUAP6AlAD+gJQA/oCE8oAA8jLfxTKf1AE+gIUyn/JUAPMyVjMyQHMAfgNES8NDBEuDAsRLQsKESwKCRErCQgRKggHESkHBhEoBgURJwUEESYEAxElAwIRJAIRHhEjER4CESICER4RIREeAhEgAgwRHwwCER0CDBEcDBEUERsRFA0RGg0CERkCERcRGBEXDBEXDBERERYRERERERUREQsRFAsEERMEALIBTBERERIREQQREQQLERALEN8QrhCdEIwQWxB6EGkQOBBXEDRBMNs8AMUESiCCEPwzh326jwgw2zxsF9s8f+AgghCI5/knuuMCIIIQlGqYtroAtAC2ALsAxgH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAALUABFVgA/SCAKD3+EJWH8cF8vT4QW8kMDGBS2kyViy+8vRWE6SAQPgjggFRgKBUaZBUaZBUaZBSkMhVcNs8yQIRFwJWFgEgbpUwWfRbMJRBM/QX4vgjggFRgKAIERUIBxEVBwYRFQYFERUFBBEVBAMRFQMCERUCAREVAchVgNs8yQC3ALgAugDwJ26zmH9QCcoAF8sHmDdwUAjKABBn4hXLPxPLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AssfAaiCEJYoupZQCssfGMs/Jm6zl38BygAWyweWNnBQBsoA4hTLPxLLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgEAuQBmIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIByMsfyQHMAUTIgljAAAAAAAAAAAAAAAABActnzMlw+wD4QlYkEO8BcNs8AMUDzDDTHwGCEIjn+Se68uCB0gDTP9M/VSBsE4IAoPf4QlYbxwXy9IFLafhBbyQTXwNWJlYqoL7y9FYQgEAjWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjigStwIW6z8vQgbvLQgG8oCuMPfwDuALwAvQF8XwcyIBEQgED0WzBQ/8hZghBLw0HVUAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EJWIwFw2zwAxQP8N4F6wfgjUAq+GfL0JG6zjjQEcSFukltwkbrimBEZEoBA9FswjhtSIBEYgED0WzARFhKAQPRbMBEWERgRFhEVERbiERhZkjMz4iJus5MhwgCRcOIgkmwi4w0kbrOTIsIAkXDijpMEIG7y0IB/WANyECNtbW3bPDACkjIz4lIQAL4A1QDEAfQDIG7y0ID4QhEwETURMBEvETQRLxEuETMRLhEtETIRLREsETERLBErETURKxEqETQRKhEpETMRKREoETIRKBEnETERJxEmETURJhElETQRJREkETMRJBEjETIRIxEiETERIhEhETURIREgETQRIBEfETMRHxEeETIRHgC/AfwRHRExER0RHBE1ERxWNBEcERsRNBEbERoRMxEaERkRMhEZERgRNhEYERcRFhE0ERYRFREzERURFBEyERQRExE2ERMREhERETQREREQETMREA8RMg8OETYODQwRNAwLETMLChEyCgkRNgkIBxE0BwYRMwYFETIFBBE2BAMRNQMAwAL8VjUDAhE3AgERN9s8ES0RMhEtESwRMREsESsRMBErESoRLxEqESkRLhEpESgRLREoEScRLBEnESYRKxEmESURKhElESQRKREkESMRKBEjESIRJxEiESERJhEhESARJREgER8RJBEfER4RIxEeER0RIhEdERwRIREcERsRIBEbAMEAwwJYIsIAjyNycG1wyFIQywDJ0BBoXjQQN8hVYNs8yVYoVSAUQzBtbds8MJJfBeIAwgDVAN6CEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIB+gIBzxYA1hEaER8RGhEZER4RGREYER0RGBEXERwRFxEWERsRFhEVERoRFREUERkRFBETERgRExESERcREhERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALEK8QnhCNEHwQaxBaEEkQOEcVUEQGAYIREYBA9FswAshZghDbReQ4UAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADpJWJJFw4lYiAaD4QnDbPADFAbL4QW8kMDL4J28QLKEjoCKhcAG2CSBWIrYIViIBoYEBC1YcQBRZ9ApvoTGSMHCXcAFWIqG2CeJZoVAEoVADoCLCAJJwM99YoSDCAI6Kcn9VIG1tbds8MJFb4gDVA76OqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQLrEI27qOojDTHwGCEC6xCNu68uCB1AHQAdIAAZPUAdCRbeISbBLbPH/gwACRMOMNcADUAMcAywHwES0RLxEtESwRLhEsESsRLxErESoRLhEqESkRLxEpESgRLhEoEScRLxEnESYRLhEmESURLxElESQRLhEkESMRLxEjESIRLhEiESERLxEhESARLhEgER8RLxEfER4RLhEeER0RLxEdERwRLhEcERsRLxEbERoRLhEaAMgC/BEZES8RGREYES4RGBEXES8RFxEWES4RFhEVES8RFREUES4RFBETES8RExESES4REhERES8REREQES4REA8RLw8OES4ODREvDQwRLgwLES8LChEuCgkRLwkIES4IBxEvBwYRLgYFES8FBBEuBAMRLwMCES4CAREvAREu2zzIAQDQAMkB+BEwzxbJ+wRWLW6zjhHIES4gbvLQgAERLgHPFsntVJJXLeIRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0AygC0ERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcArT5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx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2zxsFm8G4lYSAQDyAFjSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6ANMf0gBVUAL5sqIIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESCABBQD0AegRHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zxsxGzEbMRspAD1A95tIW6zj1ktgBAkWfQPb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOPNTEgbvLQgG8hgQELAiBu8tCAEln0C2+hkjBt3yBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwzikjAx4pEx4iuAECNZ9A9voZIwbd8A9gD2APcAHNM/+gD6ANN/0n/Sf1VQAWggbpIwbZ3Q+gDSANN/VSBsE28D4oAQVEwUWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiLlAzAPgAHPoA+gD6APoA+gD6AFVQAgEgAPoA/wIBIAD7APwAEbCvu1E0NIAAYAL1sqcINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfgAQUA/QHUER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxsxGzEbMRspAD+ADpWFYEBCyJZ9ApvoTEhVhnHBSJWGccFA1YbxwVBMAIBIAEAAQQC+bIHNs8ES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEagAQUBAQHIERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD2zhIG6SMG2ZIG7y0IBvJ28H4iBukjBt3gECATqAEFYVAln0D2+hkjBt3yBukjBtjofQ2zxsF28H4gEDACTUAdAB0gDTD/oA0x/TH9MfVWAC+bJ7ts8ES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEagAQUBDwJC7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4ImBAQHXAAEB0ds8AQYBDAL42zxXLhEsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGQEHAQsB1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTH/oA0x/TH9Mf+gD6APoA+gDUAdD6APoA+gD6APoA+gD6APoA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEBCAHG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBAQkB4vpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE9ATTP9Qw0PQE9ATTP/QE0z/TP9Qw0PQE9AT0BPoA+gD6ANJ/0n/6APoA1DDQAQoAxPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxESMRLhEjESMRLREjESMRLBEjESMRKxEjESMRKhEjESMRKREjESMRKBEjESMRJxEjESMRJhEjESMRJREjESMRJBEjAHgRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4E2jBwgQC0cFRwAFRwAFRwAFRwAIIK+vCAghAF9eEAggiYloCNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASJiYkBDgEOAQ4BDQH0iW1tbXFtbSJtUxFtbW1WFlRwAFRwAI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPhCES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeABDgBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAGYERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbMNsQwEQAZBWEYBAIln0D2+hkjBt3yBukjBtjofQ2zxsG28L4oBAVhJAE1n0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeJWEFkBEQBs0wfTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA03/SAPoA0x/SAFWg1ZxOng==');
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
    {"name":"UpdatePoolConfig","header":2788132204,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidatedPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"normalPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UpdateBaseConfig","header":2824223913,"fields":[{"name":"gasConfig","type":{"kind":"simple","type":"GasConfig","optional":true}},{"name":"executorConfig","type":{"kind":"simple","type":"ExecutorConfig","optional":true}},{"name":"contractConfig","type":{"kind":"simple","type":"ContractConfig","optional":true}}]},
    {"name":"SetManager","header":3368041608,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}}]},
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
    {"name":"AccountInfo","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isClaimer","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isManager","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"maxLeverage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maintenanceRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolStat","header":null,"fields":[{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPositionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GasConfig","header":null,"fields":[{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecutorConfig","header":null,"fields":[{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}}]},
    {"name":"ContractConfig","header":null,"fields":[{"name":"multisig","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidityOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LiquidityOrderData","header":null,"fields":[{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidityOrder","type":{"kind":"simple","type":"LiquidityOrder","optional":true}}]},
    {"name":"PerpOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PerpOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderData","header":null,"fields":[{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrder","type":{"kind":"simple","type":"PerpOrder","optional":true}},{"name":"perpOrderEx","type":{"kind":"simple","type":"PerpOrderEx","optional":true}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateData","header":null,"fields":[{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensate","type":{"kind":"simple","type":"Compensate","optional":true}}]},
    {"name":"Pool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidatedPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"normalPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}},{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"tokenConfigs","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"TokenConfig","valueFormat":"ref"}},{"name":"liquidityOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"LiquidityOrder","valueFormat":"ref"}},{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrder","valueFormat":"ref"}},{"name":"perpOrderExs","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrderEx","valueFormat":"ref"}},{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Compensate","valueFormat":"ref"}},{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpPositionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"AccountPerpPosition","valueFormat":"ref"}},{"name":"globalLPPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalLPPosition","valueFormat":"ref"}},{"name":"globalPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalPosition","valueFormat":"ref"}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"multisig","type":{"kind":"simple","type":"address","optional":false}}]},
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
    {"receiver":"internal","message":{"kind":"typed","type":"JettonUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetManager"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateBaseConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePoolConfig"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonUpdateContent | SetManager | UpdateBaseConfig | UpdatePoolConfig | ListToken | DelistToken | ClaimProtocolFee | null | JettonTransferNotification | CancelLiquidityOrder | ExecuteLiquidityOrder | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop' | UpdateContract) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonUpdateContent') {
            body = beginCell().store(storeJettonUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetManager') {
            body = beginCell().store(storeSetManager(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateBaseConfig') {
            body = beginCell().store(storeUpdateBaseConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePoolConfig') {
            body = beginCell().store(storeUpdatePoolConfig(message)).endCell();
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