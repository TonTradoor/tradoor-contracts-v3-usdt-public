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

export type LaunchConfig = {
    $$type: 'LaunchConfig';
    members: Dictionary<Address, number>;
    requiredWeight: bigint;
    timeout: bigint;
}

export function storeLaunchConfig(src: LaunchConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1210757747, 32);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
        b_0.storeUint(src.requiredWeight, 8);
        b_0.storeUint(src.timeout, 32);
    };
}

export function loadLaunchConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1210757747) { throw Error('Invalid prefix'); }
    let _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), sc_0);
    let _requiredWeight = sc_0.loadUintBig(8);
    let _timeout = sc_0.loadUintBig(32);
    return { $$type: 'LaunchConfig' as const, members: _members, requiredWeight: _requiredWeight, timeout: _timeout };
}

function loadTupleLaunchConfig(source: TupleReader) {
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
    let _requiredWeight = source.readBigNumber();
    let _timeout = source.readBigNumber();
    return { $$type: 'LaunchConfig' as const, members: _members, requiredWeight: _requiredWeight, timeout: _timeout };
}

function loadGetterTupleLaunchConfig(source: TupleReader) {
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
    let _requiredWeight = source.readBigNumber();
    let _timeout = source.readBigNumber();
    return { $$type: 'LaunchConfig' as const, members: _members, requiredWeight: _requiredWeight, timeout: _timeout };
}

function storeTupleLaunchConfig(source: LaunchConfig) {
    let builder = new TupleBuilder();
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeNumber(source.requiredWeight);
    builder.writeNumber(source.timeout);
    return builder.build();
}

function dictValueParserLaunchConfig(): DictionaryValue<LaunchConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLaunchConfig(src)).endCell());
        },
        parse: (src) => {
            return loadLaunchConfig(src.loadRef().beginParse());
        }
    }
}

export type Request = {
    $$type: 'Request';
    to: Address;
    manager: Address;
    compensator: Address;
    claimer: Address;
}

export function storeRequest(src: Request) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2765516566, 32);
        b_0.storeAddress(src.to);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.compensator);
        let b_1 = new Builder();
        b_1.storeAddress(src.claimer);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2765516566) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _manager = sc_0.loadAddress();
    let _compensator = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _claimer = sc_1.loadAddress();
    return { $$type: 'Request' as const, to: _to, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function loadTupleRequest(source: TupleReader) {
    let _to = source.readAddress();
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'Request' as const, to: _to, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function loadGetterTupleRequest(source: TupleReader) {
    let _to = source.readAddress();
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'Request' as const, to: _to, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function storeTupleRequest(source: Request) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeAddress(source.manager);
    builder.writeAddress(source.compensator);
    builder.writeAddress(source.claimer);
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
        b_0.storeUint(1614315750, 32);
        b_0.store(storeRequest(src.request));
    };
}

export function loadSigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1614315750) { throw Error('Invalid prefix'); }
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
    members: Dictionary<Address, number>;
    weight: bigint;
    requiredWeight: bigint;
    completed: boolean;
    request: Request;
    expired: bigint;
}

export function storeMultisigSigner$Data(src: MultisigSigner$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
        b_0.storeUint(src.weight, 8);
        b_0.storeUint(src.requiredWeight, 8);
        b_0.storeBit(src.completed);
        let b_1 = new Builder();
        b_1.store(storeRequest(src.request));
        b_1.storeUint(src.expired, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMultisigSigner$Data(slice: Slice) {
    let sc_0 = slice;
    let _master = sc_0.loadAddress();
    let _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), sc_0);
    let _weight = sc_0.loadUintBig(8);
    let _requiredWeight = sc_0.loadUintBig(8);
    let _completed = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _request = loadRequest(sc_1);
    let _expired = sc_1.loadUintBig(32);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request, expired: _expired };
}

function loadTupleMultisigSigner$Data(source: TupleReader) {
    let _master = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
    let _weight = source.readBigNumber();
    let _requiredWeight = source.readBigNumber();
    let _completed = source.readBoolean();
    const _request = loadTupleRequest(source);
    let _expired = source.readBigNumber();
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request, expired: _expired };
}

function loadGetterTupleMultisigSigner$Data(source: TupleReader) {
    let _master = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
    let _weight = source.readBigNumber();
    let _requiredWeight = source.readBigNumber();
    let _completed = source.readBoolean();
    const _request = loadGetterTupleRequest(source);
    let _expired = source.readBigNumber();
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request, expired: _expired };
}

function storeTupleMultisigSigner$Data(source: MultisigSigner$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.master);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeNumber(source.weight);
    builder.writeNumber(source.requiredWeight);
    builder.writeBoolean(source.completed);
    builder.writeTuple(storeTupleRequest(source.request));
    builder.writeNumber(source.expired);
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
    owner: Address;
    members: Dictionary<Address, number>;
    requiredWeight: bigint;
    timeout: bigint;
}

export function storeMultisig$Data(src: Multisig$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
        b_0.storeUint(src.requiredWeight, 8);
        b_0.storeUint(src.timeout, 32);
    };
}

export function loadMultisig$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), sc_0);
    let _requiredWeight = sc_0.loadUintBig(8);
    let _timeout = sc_0.loadUintBig(32);
    return { $$type: 'Multisig$Data' as const, owner: _owner, members: _members, requiredWeight: _requiredWeight, timeout: _timeout };
}

function loadTupleMultisig$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
    let _requiredWeight = source.readBigNumber();
    let _timeout = source.readBigNumber();
    return { $$type: 'Multisig$Data' as const, owner: _owner, members: _members, requiredWeight: _requiredWeight, timeout: _timeout };
}

function loadGetterTupleMultisig$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
    let _requiredWeight = source.readBigNumber();
    let _timeout = source.readBigNumber();
    return { $$type: 'Multisig$Data' as const, owner: _owner, members: _members, requiredWeight: _requiredWeight, timeout: _timeout };
}

function storeTupleMultisig$Data(source: Multisig$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeNumber(source.requiredWeight);
    builder.writeNumber(source.timeout);
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

 type Multisig_init_args = {
    $$type: 'Multisig_init_args';
    members: Dictionary<Address, number>;
    requiredWeight: bigint;
    timeout: bigint;
}

function initMultisig_init_args(src: Multisig_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
        b_0.storeInt(src.requiredWeight, 257);
        b_0.storeInt(src.timeout, 257);
    };
}

async function Multisig_init(members: Dictionary<Address, number>, requiredWeight: bigint, timeout: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMultisig_init_args({ $$type: 'Multisig_init_args', members, requiredWeight, timeout })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Multisig_errors: { [key: number]: { message: string } } = {
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

const Multisig_types: ABIType[] = [
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
    {"name":"SetManager","header":3368041608,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LaunchConfig","header":1210757747,"fields":[{"name":"members","type":{"kind":"dict","key":"address","value":"uint","valueFormat":8}},{"name":"requiredWeight","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"timeout","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Request","header":2765516566,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Signed","header":1614315750,"fields":[{"name":"request","type":{"kind":"simple","type":"Request","optional":false}}]},
    {"name":"MultisigSigner$Data","header":null,"fields":[{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"members","type":{"kind":"dict","key":"address","value":"uint","valueFormat":8}},{"name":"weight","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"requiredWeight","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"request","type":{"kind":"simple","type":"Request","optional":false}},{"name":"expired","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Multisig$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"members","type":{"kind":"dict","key":"address","value":"uint","valueFormat":8}},{"name":"requiredWeight","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"timeout","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const Multisig_getters: ABIGetter[] = [
    {"name":"member","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"members","arguments":[],"returnType":{"kind":"dict","key":"address","value":"uint","valueFormat":8}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Multisig_getterMapping: { [key: string]: string } = {
    'member': 'getMember',
    'members': 'getMembers',
    'owner': 'getOwner',
}

const Multisig_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"LaunchConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Request"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Signed"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Multisig implements Contract {
    
    static async init(members: Dictionary<Address, number>, requiredWeight: bigint, timeout: bigint) {
        return await Multisig_init(members, requiredWeight, timeout);
    }
    
    static async fromInit(members: Dictionary<Address, number>, requiredWeight: bigint, timeout: bigint) {
        const init = await Multisig_init(members, requiredWeight, timeout);
        const address = contractAddress(0, init);
        return new Multisig(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Multisig(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Multisig_types,
        getters: Multisig_getters,
        receivers: Multisig_receivers,
        errors: Multisig_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: LaunchConfig | Request | Signed | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LaunchConfig') {
            body = beginCell().store(storeLaunchConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Request') {
            body = beginCell().store(storeRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Signed') {
            body = beginCell().store(storeSigned(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMember(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('member', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getMembers(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('members', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(8), source.readCellOpt());
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}