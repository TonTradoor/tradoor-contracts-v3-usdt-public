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

export type SetManager = {
    $$type: 'SetManager';
    manager: Address;
}

export function storeSetManager(src: SetManager) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2465333454, 32);
        b_0.storeAddress(src.manager);
    };
}

export function loadSetManager(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2465333454) { throw Error('Invalid prefix'); }
    let _manager = sc_0.loadAddress();
    return { $$type: 'SetManager' as const, manager: _manager };
}

function loadTupleSetManager(source: TupleReader) {
    let _manager = source.readAddress();
    return { $$type: 'SetManager' as const, manager: _manager };
}

function loadGetterTupleSetManager(source: TupleReader) {
    let _manager = source.readAddress();
    return { $$type: 'SetManager' as const, manager: _manager };
}

function storeTupleSetManager(source: SetManager) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.manager);
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

export type Request = {
    $$type: 'Request';
    to: Address;
    timeout: bigint;
    manager: Address;
}

export function storeRequest(src: Request) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3570490360, 32);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.timeout, 32);
        b_0.storeAddress(src.manager);
    };
}

export function loadRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3570490360) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _timeout = sc_0.loadUintBig(32);
    let _manager = sc_0.loadAddress();
    return { $$type: 'Request' as const, to: _to, timeout: _timeout, manager: _manager };
}

function loadTupleRequest(source: TupleReader) {
    let _to = source.readAddress();
    let _timeout = source.readBigNumber();
    let _manager = source.readAddress();
    return { $$type: 'Request' as const, to: _to, timeout: _timeout, manager: _manager };
}

function loadGetterTupleRequest(source: TupleReader) {
    let _to = source.readAddress();
    let _timeout = source.readBigNumber();
    let _manager = source.readAddress();
    return { $$type: 'Request' as const, to: _to, timeout: _timeout, manager: _manager };
}

function storeTupleRequest(source: Request) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.timeout);
    builder.writeAddress(source.manager);
    return builder.build();
}

function dictValueParserRequest(): DictionaryValue<Request> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequest(src)).endCell());
        },
        parse: (src) => {
            return loadRequest(src.loadRef().beginParse());
        }
    }
}

export type Signed = {
    $$type: 'Signed';
    request: Request;
}

export function storeSigned(src: Signed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935724027, 32);
        b_0.store(storeRequest(src.request));
    };
}

export function loadSigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935724027) { throw Error('Invalid prefix'); }
    let _request = loadRequest(sc_0);
    return { $$type: 'Signed' as const, request: _request };
}

function loadTupleSigned(source: TupleReader) {
    const _request = loadTupleRequest(source);
    return { $$type: 'Signed' as const, request: _request };
}

function loadGetterTupleSigned(source: TupleReader) {
    const _request = loadGetterTupleRequest(source);
    return { $$type: 'Signed' as const, request: _request };
}

function storeTupleSigned(source: Signed) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleRequest(source.request));
    return builder.build();
}

function dictValueParserSigned(): DictionaryValue<Signed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSigned(src)).endCell());
        },
        parse: (src) => {
            return loadSigned(src.loadRef().beginParse());
        }
    }
}

export type MultisigSigner$Data = {
    $$type: 'MultisigSigner$Data';
    master: Address;
    members: Dictionary<Address, bigint>;
    weight: bigint;
    requiredWeight: bigint;
    completed: boolean;
    request: Request;
}

export function storeMultisigSigner$Data(src: MultisigSigner$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.weight, 257);
        b_0.storeInt(src.requiredWeight, 257);
        b_0.storeBit(src.completed);
        let b_1 = new Builder();
        b_1.store(storeRequest(src.request));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMultisigSigner$Data(slice: Slice) {
    let sc_0 = slice;
    let _master = sc_0.loadAddress();
    let _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _weight = sc_0.loadIntBig(257);
    let _requiredWeight = sc_0.loadIntBig(257);
    let _completed = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _request = loadRequest(sc_1);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request };
}

function loadTupleMultisigSigner$Data(source: TupleReader) {
    let _master = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _weight = source.readBigNumber();
    let _requiredWeight = source.readBigNumber();
    let _completed = source.readBoolean();
    const _request = loadTupleRequest(source);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request };
}

function loadGetterTupleMultisigSigner$Data(source: TupleReader) {
    let _master = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _weight = source.readBigNumber();
    let _requiredWeight = source.readBigNumber();
    let _completed = source.readBoolean();
    const _request = loadGetterTupleRequest(source);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request };
}

function storeTupleMultisigSigner$Data(source: MultisigSigner$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.master);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.weight);
    builder.writeNumber(source.requiredWeight);
    builder.writeBoolean(source.completed);
    builder.writeTuple(storeTupleRequest(source.request));
    return builder.build();
}

function dictValueParserMultisigSigner$Data(): DictionaryValue<MultisigSigner$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMultisigSigner$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMultisigSigner$Data(src.loadRef().beginParse());
        }
    }
}

export type Multisig$Data = {
    $$type: 'Multisig$Data';
    members: Dictionary<Address, bigint>;
    requiredWeight: bigint;
}

export function storeMultisig$Data(src: Multisig$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.requiredWeight, 257);
    };
}

export function loadMultisig$Data(slice: Slice) {
    let sc_0 = slice;
    let _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _requiredWeight = sc_0.loadIntBig(257);
    return { $$type: 'Multisig$Data' as const, members: _members, requiredWeight: _requiredWeight };
}

function loadTupleMultisig$Data(source: TupleReader) {
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _requiredWeight = source.readBigNumber();
    return { $$type: 'Multisig$Data' as const, members: _members, requiredWeight: _requiredWeight };
}

function loadGetterTupleMultisig$Data(source: TupleReader) {
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _requiredWeight = source.readBigNumber();
    return { $$type: 'Multisig$Data' as const, members: _members, requiredWeight: _requiredWeight };
}

function storeTupleMultisig$Data(source: Multisig$Data) {
    let builder = new TupleBuilder();
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.requiredWeight);
    return builder.build();
}

function dictValueParserMultisig$Data(): DictionaryValue<Multisig$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMultisig$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMultisig$Data(src.loadRef().beginParse());
        }
    }
}

 type MultisigSigner_init_args = {
    $$type: 'MultisigSigner_init_args';
    master: Address;
    members: Dictionary<Address, bigint>;
    requiredWeight: bigint;
    request: Request;
}

function initMultisigSigner_init_args(src: MultisigSigner_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.requiredWeight, 257);
        let b_1 = new Builder();
        b_1.store(storeRequest(src.request));
        b_0.storeRef(b_1.endCell());
    };
}

async function MultisigSigner_init(master: Address, members: Dictionary<Address, bigint>, requiredWeight: bigint, request: Request) {
    const __code = Cell.fromBase64('te6ccgECFAEABCAAART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCCyPhDAcx/AcoAVXDbPMntVA0EBQIBWAsMAVTtou37AZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4MAAkTDjDXAGAWZQhyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhX0ABOBAQHPAIEBAc8AygDIUEMKAej5AYLwIq7m0KbcFGV3J33VjQauMJCjzdPYqIVhGEIIrl9usDm6jsyBEpP4I1IwvPL0ggCfaiSz8vT4QieBAQsigQEBQTP0Cm+hlAHXADCSW23iggC04yFus/L0IG7y0IAIgQEL9FkwUGegUwS+4wAFf9sx4AcB3DN/cIEAgnBUdUjIVSCCEHNgzftQBMsfA4IQ1NFb+FAEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyStVIERAbW3bPDADCAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgJAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAJqCENTRW/hQBMsfWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzAIRui/ts82zxsg4DQ4AEbgr7tRNDSAAGANI7UTQ1AH4Y9IAAY6E2zxsGOD4KNcLCoMJuvLgids8BtFVBNs8DxARAAZUchABYvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAIEBAdcA0gDUAdASAfb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQEgQEB1wDUAdDTHwGCENTRW/i68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMDMTAAxwBANwQTMAuNMfAYIQ1NFb+Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwMxA4EDcQNhA1EDRYAA4QNhA1EDRY');
    const __system = Cell.fromBase64('te6cckECFgEABCoAAQHAAQEFoSdzAgEU/wD0pBP0vPLICwMCAWIEDAOa0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRfbPPLggsj4QwHMfwHKAFVw2zzJ7VQOBQoBVO2i7fsBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCSW3/gwACRMOMNcAYB6PkBgvAirubQptwUZXcnfdWNBq4wkKPN09iohWEYQgiuX26wObqOzIESk/gjUjC88vSCAJ9qJLPy9PhCJ4EBCyKBAQFBM/QKb6GUAdcAMJJbbeKCALTjIW6z8vQgbvLQgAiBAQv0WTBQZ6BTBL7jAAV/2zHgBwHcM39wgQCCcFR1SMhVIIIQc2DN+1AEyx8DghDU0Vv4UATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJK1UgREBtbds8MAMIAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CAkAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwBZlCHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFfQAE4EBAc8AgQEBzwDKAMhQQwsAmoIQ1NFb+FAEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAgFYDRUCEbov7bPNs8bIOA4UA0jtRNDUAfhj0gABjoTbPGwY4Pgo1wsKgwm68uCJ2zwG0VUE2zwPERMBYvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAIEBAdcA0gDUAdAQALjTHwGCENTRW/i68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMDMQOBA3EDYQNRA0WAH2+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BIEBAdcA1AHQ0x8BghDU0Vv4uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzAzEgAOEDYQNRA0WAAMcAQDcEEzAAZUchAAEbgr7tRNDSAAGPEw78Y=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMultisigSigner_init_args({ $$type: 'MultisigSigner_init_args', master, members, requiredWeight, request })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MultisigSigner_errors: { [key: number]: { message: string } } = {
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
    4429: { message: `Invalid sender` },
    4755: { message: `Timeout` },
    40810: { message: `Completed` },
    46307: { message: `Not a member` },
}

const MultisigSigner_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetManager","header":2465333454,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Request","header":3570490360,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"timeout","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Signed","header":1935724027,"fields":[{"name":"request","type":{"kind":"simple","type":"Request","optional":false}}]},
    {"name":"MultisigSigner$Data","header":null,"fields":[{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"members","type":{"kind":"dict","key":"address","value":"int"}},{"name":"weight","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"requiredWeight","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"request","type":{"kind":"simple","type":"Request","optional":false}}]},
    {"name":"Multisig$Data","header":null,"fields":[{"name":"members","type":{"kind":"dict","key":"address","value":"int"}},{"name":"requiredWeight","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const MultisigSigner_getters: ABIGetter[] = [
    {"name":"request","arguments":[],"returnType":{"kind":"simple","type":"Request","optional":false}},
]

export const MultisigSigner_getterMapping: { [key: string]: string } = {
    'request': 'getRequest',
}

const MultisigSigner_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"YES"}},
]

export class MultisigSigner implements Contract {
    
    static async init(master: Address, members: Dictionary<Address, bigint>, requiredWeight: bigint, request: Request) {
        return await MultisigSigner_init(master, members, requiredWeight, request);
    }
    
    static async fromInit(master: Address, members: Dictionary<Address, bigint>, requiredWeight: bigint, request: Request) {
        const init = await MultisigSigner_init(master, members, requiredWeight, request);
        const address = contractAddress(0, init);
        return new MultisigSigner(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MultisigSigner(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MultisigSigner_types,
        getters: MultisigSigner_getters,
        receivers: MultisigSigner_receivers,
        errors: MultisigSigner_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'YES') {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'YES') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getRequest(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('request', builder.build())).stack;
        const result = loadGetterTupleRequest(source);
        return result;
    }
    
}