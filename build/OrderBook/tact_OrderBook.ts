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
    forward_payload: Cell;
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
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
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
    builder.writeSlice(source.forward_payload);
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
    forward_payload: Cell;
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
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
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

export type DeployTLP = {
    $$type: 'DeployTLP';
    jetton_content: Cell;
}

export function storeDeployTLP(src: DeployTLP) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4139425289, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadDeployTLP(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4139425289) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'DeployTLP' as const, jetton_content: _jetton_content };
}

function loadTupleDeployTLP(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'DeployTLP' as const, jetton_content: _jetton_content };
}

function storeTupleDeployTLP(source: DeployTLP) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserDeployTLP(): DictionaryValue<DeployTLP> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployTLP(src)).endCell());
        },
        parse: (src) => {
            return loadDeployTLP(src.loadRef().beginParse());
        }
    }
}

export type UpdateConfig = {
    $$type: 'UpdateConfig';
    orderLockTime: bigint | null;
    gasConfig: GasConfig | null;
    executorConfig: ExecutorConfig | null;
    contractConfig: ContractConfig | null;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2603796489, 32);
        if (src.orderLockTime !== null && src.orderLockTime !== undefined) { b_0.storeBit(true).storeUint(src.orderLockTime, 32); } else { b_0.storeBit(false); }
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
    if (sc_0.loadUint(32) !== 2603796489) { throw Error('Invalid prefix'); }
    let _orderLockTime = sc_0.loadBit() ? sc_0.loadUintBig(32) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConfig = sc_1.loadBit() ? loadGasConfig(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _executorConfig = sc_2.loadBit() ? loadExecutorConfig(sc_2) : null;
    let sc_3 = sc_2.loadRef().beginParse();
    let _contractConfig = sc_3.loadBit() ? loadContractConfig(sc_3) : null;
    return { $$type: 'UpdateConfig' as const, orderLockTime: _orderLockTime, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumberOpt();
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateConfig' as const, orderLockTime: _orderLockTime, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
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

export type SendProtocolFee = {
    $$type: 'SendProtocolFee';
    trxId: bigint;
    feeReceiver: Address;
    amount: bigint;
}

export function storeSendProtocolFee(src: SendProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1574274145, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.feeReceiver);
        b_0.storeCoins(src.amount);
    };
}

export function loadSendProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1574274145) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _feeReceiver = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver, amount: _amount };
}

function loadTupleSendProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _feeReceiver = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver, amount: _amount };
}

function storeTupleSendProtocolFee(source: SendProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.feeReceiver);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSendProtocolFee(): DictionaryValue<SendProtocolFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadSendProtocolFee(src.loadRef().beginParse());
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

export type UpdateLiquidityPool = {
    $$type: 'UpdateLiquidityPool';
    isIncrease: boolean;
    orderId: bigint;
    account: Address;
    jettonDelta: bigint;
    trxId: bigint;
    prices: Dictionary<number, bigint>;
    lpFundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeUpdateLiquidityPool(src: UpdateLiquidityPool) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1428410654, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeUint(src.orderId, 64);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeUint(src.trxId, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128));
        b_0.storeCoins(src.lpFundingFeeGrowth);
        b_0.storeCoins(src.rolloverFeeGrowth);
    };
}

export function loadUpdateLiquidityPool(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1428410654) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _jettonDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), sc_0);
    let _lpFundingFeeGrowth = sc_0.loadCoins();
    let _rolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'UpdateLiquidityPool' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, jettonDelta: _jettonDelta, trxId: _trxId, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleUpdateLiquidityPool(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'UpdateLiquidityPool' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, jettonDelta: _jettonDelta, trxId: _trxId, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleUpdateLiquidityPool(source: UpdateLiquidityPool) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.trxId);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128)).endCell() : null);
    builder.writeNumber(source.lpFundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserUpdateLiquidityPool(): DictionaryValue<UpdateLiquidityPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLiquidityPool(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLiquidityPool(src.loadRef().beginParse());
        }
    }
}

export type LiquidityPoolUpdated = {
    $$type: 'LiquidityPoolUpdated';
    isIncrease: boolean;
    orderId: bigint;
    tlpPrice: bigint;
    tlpDelta: bigint;
    jettonDelta: bigint;
    trxId: bigint;
}

export function storeLiquidityPoolUpdated(src: LiquidityPoolUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3445831356, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.tlpPrice, 128);
        b_0.storeCoins(src.tlpDelta);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLiquidityPoolUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3445831356) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadUintBig(64);
    let _tlpPrice = sc_0.loadUintBig(128);
    let _tlpDelta = sc_0.loadCoins();
    let _jettonDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LiquidityPoolUpdated' as const, isIncrease: _isIncrease, orderId: _orderId, tlpPrice: _tlpPrice, tlpDelta: _tlpDelta, jettonDelta: _jettonDelta, trxId: _trxId };
}

function loadTupleLiquidityPoolUpdated(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _jettonDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityPoolUpdated' as const, isIncrease: _isIncrease, orderId: _orderId, tlpPrice: _tlpPrice, tlpDelta: _tlpDelta, jettonDelta: _jettonDelta, trxId: _trxId };
}

function storeTupleLiquidityPoolUpdated(source: LiquidityPoolUpdated) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.tlpPrice);
    builder.writeNumber(source.tlpDelta);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidityPoolUpdated(): DictionaryValue<LiquidityPoolUpdated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityPoolUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityPoolUpdated(src.loadRef().beginParse());
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
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeExecutePerpOrder(src: ExecutePerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3917785824, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeUint(src.price, 128);
        b_0.storeCoins(src.fundingFeeGrowth);
        b_0.storeCoins(src.rolloverFeeGrowth);
    };
}

export function loadExecutePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3917785824) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(16);
    let _price = sc_0.loadUintBig(128);
    let _fundingFeeGrowth = sc_0.loadCoins();
    let _rolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'ExecutePerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleExecutePerpOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecutePerpOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleExecutePerpOrder(source: ExecutePerpOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
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
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeLiquidatePerpPosition(src: LiquidatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4219697507, 32);
        b_0.storeAddress(src.liquidationFeeReceiver);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeCoins(src.fundingFeeGrowth);
        let b_1 = new Builder();
        b_1.storeCoins(src.rolloverFeeGrowth);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4219697507) { throw Error('Invalid prefix'); }
    let _liquidationFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _fundingFeeGrowth = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _rolloverFeeGrowth = sc_1.loadCoins();
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleLiquidatePerpPosition(source: TupleReader) {
    let _liquidationFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleLiquidatePerpPosition(source: LiquidatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.liquidationFeeReceiver);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
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
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeADLPerpPosition(src: ADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3272606530, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeCoins(src.fundingFeeGrowth);
        b_0.storeCoins(src.rolloverFeeGrowth);
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3272606530) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _fundingFeeGrowth = sc_0.loadCoins();
    let _rolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeUpdatePerpPosition(src: UpdatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4283950423, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeBit(src.triggerAbove);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        let b_1 = new Builder();
        b_1.storeCoins(src.fundingFeeGrowth);
        b_1.storeCoins(src.rolloverFeeGrowth);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4283950423) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _triggerAbove = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fundingFeeGrowth = sc_1.loadCoins();
    let _rolloverFeeGrowth = sc_1.loadCoins();
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserUpdatePerpPosition(): DictionaryValue<UpdatePerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionUpdated = {
    $$type: 'PerpPositionUpdated';
    orderId: bigint;
    payout: bigint;
    trxId: bigint;
}

export function storePerpPositionUpdated(src: PerpPositionUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4009870004, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeCoins(src.payout);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpPositionUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4009870004) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _payout = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpPositionUpdated' as const, orderId: _orderId, payout: _payout, trxId: _trxId };
}

function loadTuplePerpPositionUpdated(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _payout = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionUpdated' as const, orderId: _orderId, payout: _payout, trxId: _trxId };
}

function storeTuplePerpPositionUpdated(source: PerpPositionUpdated) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.payout);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionUpdated(): DictionaryValue<PerpPositionUpdated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionUpdated(src.loadRef().beginParse());
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

export type LiquidityOrderExecutedEvent = {
    $$type: 'LiquidityOrderExecutedEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLiquidityOrderExecutedEvent(src: LiquidityOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(705921280, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLiquidityOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 705921280) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LiquidityOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLiquidityOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLiquidityOrderExecutedEvent(source: LiquidityOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidityOrderExecutedEvent(): DictionaryValue<LiquidityOrderExecutedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderExecutedEvent(src.loadRef().beginParse());
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

export type PerpOrderExecutedEvent = {
    $$type: 'PerpOrderExecutedEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpOrderExecutedEvent(src: PerpOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4229749909, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4229749909) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpOrderExecutedEvent(source: PerpOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpOrderExecutedEvent(): DictionaryValue<PerpOrderExecutedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderExecutedEvent(src.loadRef().beginParse());
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

export type GasConfig = {
    $$type: 'GasConfig';
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    poolLpGasConsumption: bigint;
    poolPerpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasTransferJetton: bigint;
    gasForBurnTlp: bigint;
}

export function storeGasConfig(src: GasConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.lpMinExecutionFee);
        b_0.storeCoins(src.perpMinExecutionFee);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.poolLpGasConsumption);
        b_0.storeCoins(src.poolPerpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeCoins(src.gasTransferJetton);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasForBurnTlp);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGasConfig(slice: Slice) {
    let sc_0 = slice;
    let _lpMinExecutionFee = sc_0.loadCoins();
    let _perpMinExecutionFee = sc_0.loadCoins();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _poolLpGasConsumption = sc_0.loadCoins();
    let _poolPerpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _gasTransferJetton = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasForBurnTlp = sc_1.loadCoins();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, gasForBurnTlp: _gasForBurnTlp };
}

function loadTupleGasConfig(source: TupleReader) {
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _poolLpGasConsumption = source.readBigNumber();
    let _poolPerpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    return { $$type: 'GasConfig' as const, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, gasForBurnTlp: _gasForBurnTlp };
}

function storeTupleGasConfig(source: GasConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.poolLpGasConsumption);
    builder.writeNumber(source.poolPerpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasTransferJetton);
    builder.writeNumber(source.gasForBurnTlp);
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
    lpExecutors: Dictionary<Address, boolean>;
    compensator: Address;
}

export function storeExecutorConfig(src: ExecutorConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeDict(src.lpExecutors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeAddress(src.compensator);
    };
}

export function loadExecutorConfig(slice: Slice) {
    let sc_0 = slice;
    let _executors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _lpExecutors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _compensator = sc_0.loadAddress();
    return { $$type: 'ExecutorConfig' as const, executors: _executors, lpExecutors: _lpExecutors, compensator: _compensator };
}

function loadTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _lpExecutors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _compensator = source.readAddress();
    return { $$type: 'ExecutorConfig' as const, executors: _executors, lpExecutors: _lpExecutors, compensator: _compensator };
}

function storeTupleExecutorConfig(source: ExecutorConfig) {
    let builder = new TupleBuilder();
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.lpExecutors.size > 0 ? beginCell().storeDictDirect(source.lpExecutors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeAddress(source.compensator);
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
    tlpWallet: Address;
    jettonWallet: Address;
    pool: Address;
}

export function storeContractConfig(src: ContractConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.tlpWallet);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.pool);
    };
}

export function loadContractConfig(slice: Slice) {
    let sc_0 = slice;
    let _tlpWallet = sc_0.loadAddress();
    let _jettonWallet = sc_0.loadAddress();
    let _pool = sc_0.loadAddress();
    return { $$type: 'ContractConfig' as const, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, pool: _pool };
}

function loadTupleContractConfig(source: TupleReader) {
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ContractConfig' as const, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, pool: _pool };
}

function storeTupleContractConfig(source: ContractConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.pool);
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

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    orderLockTime: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    poolLpGasConsumption: bigint;
    poolPerpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasTransferJetton: bigint;
    gasForBurnTlp: bigint;
    totalExecutionFee: bigint;
    tlpWallet: Address;
    jettonWallet: Address;
    pool: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.isExecutor !== null && src.isExecutor !== undefined) { b_0.storeBit(true).storeBit(src.isExecutor); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.lpMinExecutionFee);
        b_0.storeCoins(src.perpMinExecutionFee);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.poolLpGasConsumption);
        b_0.storeCoins(src.poolPerpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        let b_1 = new Builder();
        b_1.storeCoins(src.gasTransferJetton);
        b_1.storeCoins(src.gasForBurnTlp);
        b_1.storeCoins(src.totalExecutionFee);
        b_1.storeAddress(src.tlpWallet);
        b_1.storeAddress(src.jettonWallet);
        let b_2 = new Builder();
        b_2.storeAddress(src.pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _orderLockTime = sc_0.loadUintBig(32);
    let _lpMinExecutionFee = sc_0.loadCoins();
    let _perpMinExecutionFee = sc_0.loadCoins();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _poolLpGasConsumption = sc_0.loadCoins();
    let _poolPerpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasTransferJetton = sc_1.loadCoins();
    let _gasForBurnTlp = sc_1.loadCoins();
    let _totalExecutionFee = sc_1.loadCoins();
    let _tlpWallet = sc_1.loadAddress();
    let _jettonWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _pool = sc_2.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, gasForBurnTlp: _gasForBurnTlp, totalExecutionFee: _totalExecutionFee, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _orderLockTime = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _poolLpGasConsumption = source.readBigNumber();
    let _poolPerpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasTransferJetton = source.readBigNumber();
    let _gasForBurnTlp = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, orderLockTime: _orderLockTime, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, gasForBurnTlp: _gasForBurnTlp, totalExecutionFee: _totalExecutionFee, tlpWallet: _tlpWallet, jettonWallet: _jettonWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.poolLpGasConsumption);
    builder.writeNumber(source.poolPerpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasTransferJetton);
    builder.writeNumber(source.gasForBurnTlp);
    builder.writeNumber(source.totalExecutionFee);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.pool);
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

 type OrderBook_init_args = {
    $$type: 'OrderBook_init_args';
    deployId: bigint;
}

function initOrderBook_init_args(src: OrderBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.deployId, 257);
    };
}

async function OrderBook_init(deployId: bigint) {
    const __code = Cell.fromBase64('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ZyB1cGRhdGVkAyhWHOMC0wABwAEgs+MC+EJWEgHHBRcYGQTIjsYw0x8BghBIHnVhuvLggdM/0z8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeJDMGwT2zx/4CCCEKvPWHu6jwgw2zxsFts8f+AgghDNYza8ui8wMTIB+jD4QhEcER0RHBEbER0RGxEaER0RGhEZER0RGREYER0RGBEXER0RFxEWER0RFhEVER0RFREUER0RFBETER0RExESER0REhERER0REREQER0REA8RHQ8OER0ODREdDQwRHQwLER0LChEdCgkRHQkIER0IBxEdBwYRHQYFER0FGgH6W/hCERwRHREcERsRHREbERoRHREaERkRHREZERgRHREYERcRHREXERYRHREWERURHREVERQRHREUERMRHRETERIRHRESERERHRERERARHREQDxEdDw4RHQ4NER0NDBEdDAsRHQsKER0KCREdCQgRHQgHER0HBhEdBgURHQUcA1qPHAHUMNDTByKTIcABkXDijopsIfoA+gAwAds84w6OjDDUMND6APoAMAHbPOIgISID8AQRHQQDER0DAgERHQFWHVYe2zyIERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwf23bPJ8bkwAoAAAAAGNvbnRyYWN0IHN0b3BwZWQD8AQRHQQDER0DAgERHQFWHVYe2zyIERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwf23bPJ8dkwAqAAAAAHBheWxvYWQgbm90IGV4aXN0Af4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEvQAEvQAUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYT9AATyz8DyPQAFPQAFMs/FPQAFcs/UAP6AskBHwAOzMkBzMkBzAL0+EFvJBNfA4sIcCRWH6ATuY4SW3+L5nYXMgbm90IGVub3VnaI3lNSuY4WW3+NBFqZXR0b24gbm90IGVub3VnaIN4jVhe5jh1bf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIN4B4wIwMyqkgEB/+CNwbSdROVE4UqQjJAOWApLAApIwcOKOqPoA0gABwP8B0w/SAAHA/wH6APoA03/TH9Qw0PoA03/6ANN/MFUD2zyPFjBtcMjJ0CNVIMhVYNs8yfhCAXBt2zziJaCTA+QzggCg9y6BAQskcUEz9ApvoZQB1wAwkltt4m6z8vT4QW8kMDGBS2kyIqFWHL7y9IFf8iFWFb7y9CqkgEBw+CNwbSdROVE4UqTIVXDbPMktED8BIG6VMFn0WzCUQTP0F+JRUaByUTBFE1QgFx7IVVDbPMmcLS4C/mwhERsRHREbERoRHBEaERkRHREZERgRHBEYERcRHREXERYRHBEWERURHREVERQRHBEUERMRHRETERIRHBESERERHRERERARHBEQDxEdD1YcDw4RHg4NDBEeDAsKER4KCQgRHggHBhEeBgUEER4EAwIRHQIBER4BVh1WHts8ERufKQOcyFVw2zzJLRA/ASBulTBZ9FswlEEz9BfiUVGgcVEwRRNUIBceyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcSAQSxBKRDAScNs8nC2iA+z4QW8kE18DiwhwLlYooBO5jhJbf4vmdhcyBub3QgZW5vdWdojeU/m5jhZbf40EWpldHRvbiBub3QgZW5vdWdog3nEnwgCTJsIAkXDikjBy3iXCAJMkwgCRcOKRpN5WICGoUvC54wAC4wIwPgqRepKAC+JSvqkEJicoAD5sIX+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iBYAv5s0REbER0RGxEaERwRGhEZER0RGREYERwRGBEXER0RFxEWERwRFhEVER0RFREUERwRFBETER0RExESERwREhERER0REREQERwREA8RHQ9WHA8OER4ODQwRHgwLChEeCgkIER4IBwYRHgYFBBEeBAMCER0CAREeAVYdVh7bPBEbnykB/BEmESgRJhElEScRJREkESgRJBEjEScRIxEiESgRIhEhEScRIREgESgRIBEfEScRHxEeESgRHhEdEScRHREcESgRHBEbEScRGxEaESgRGhEZEScRGREYESgRGBEXEScRFxEWESgRFhEVEScRFREUESgRFBETEScRExESESgREiwCxts8ERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDASf23bPCqTAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DErALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMC6hEREScREREQESgREA8RJw8OESgODREnDQwRKAwLEScLVigL2zwwVhqgERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHXJZcXDbPGiiAG6CEMTQIORQB8sfFcsHUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLLP8s/AUjIgljAAAAAAAAAAAAAAAABActnzMlw+wBxIBBLEEpEMBJw2zyiA/b4QW8kMDKBS2lWHFYYoBO+EvL0K4BAJVn0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFuBXm0Bs/L0VhOBAQsncUEz9ApvoZQB1wAwkltt4m6zggCg9yGRf5RTV8cF4vL0s5Ew4w1ScBEQgED0WzC5MzQAjtMfAYIQq89Ye7ry4IHTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfQE+gD6AFVQA/T4QW8kVhGAQCtZ9A9voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbViaqAFQqkFKZ2zwWoBEZESgRGREYEScRGBEXESYRFxEWESURFhEVESQRFREUESMRFBETESIRExESESEREhERESAREREQER8RELl7NwQ6jwgw2zxsFts8f+AgghDu9ZJNuuMCIIIQ+U+Au7o7PD0+ABqCAJsXAVYhoPgju/L0Af4jklYUklYV4hEcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQESIREA8RIQ8OESAODREfDQwRHgwLER0LGgkRIQkIESAIBxEfBwYRHgYFER0FNQP6FAMRIQMCVh8CESJWHts8Vhtus5cRGyBu8tCAlFcbVhniVh/CAI6SVh9yf1UgbW1t2zwRGlYeoREakTDiVh2RcZFy4gIBER0BERzIVSCCELmwPLxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wBxER2jVh2fpTYBxBEYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5XlJBBds8ogLsDxEeDw4RHQ4NERwNDBEbDAsRGgsKESgKCREnCQgRJggHESUHBhEkBgURIwUEESIEAxEhAwIRIAIBER8BER5x2zwBER8BoFYRoFYis5NWEaDeESSBS2kRJb4BESQB8vSBXm0RJbMBESUB8vSCAKD3KIEBC1YlcX04AvhBM/QKb6GUAdcAMJJbbeJus/L0Vhhus5cRGCBu8tCAlFcYViHif4BAViEFViEFViEFBBEhBAMRJQMCESECAREnyFVw2zzJAREeAVYYASBulTBZ9FswlEEz9BfiBREbBQQRFgQDERUDAhEaAgERGQERE3ARIoBAESIQRRA0nDkCpMhVcNs8yVYRAwIRHQIRHAF/VTBtbds8ChEZCgkRGAkIERcIBxEWBwYRFQYFERQFBBETBAMREgMCERECAREQAQ8QnhCtEEwQmxA5ECgQNxUWEDQ6pQB6ghBVI9EeUAnLHxfKABXLP1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCyz/0AAH6AgH6AgA20x8BghDNYza8uvLggdIA0z/Tf/oA+gDTP1VQBN4z+EFvJDAyVhKCAKD3AscF8vQtgEAmWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8obCIzCrOVEDY1M1vjDVJOgED0WzAhwgCOj1FRcn9VIG1tbds8UVWhBZE14gGRcZFy4lq5P6VAAhAw2zxsGNs8f0NEBMqPCDDbPGwZ2zx/4CCCEAmf9KO6jscw0x8BghAJn/SjuvLggSDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHTP9M/VSBsE9s8f+AgghDphKrgukhJSksC9IFLaVYhVhygVh2gFr4V8vRycG1USZBSWshVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYYA1YcQ5MUQzBtbds8ERsRIREbERoRIBEaERkRHxEZpUEBishVIIIQKhOBAFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AClus46PcQogbvLQgAGjKhA7f9s8kjA44qIC+BEYER4RGBEXER0RFxEWERwRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RIQ9WIA8OESAODREfDQwRHgwLER0LChEiCgkIESAIBxEfBwYRHgYFER0FBBEiBAMCESECVh4CAREjAVYe2zwRGREfERmfQgDAERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIFlByAD7THwGCEO71kk268uCB+gDTD9IA+gD6ANN/0z/TH1VwAfQRGREhERkRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREhEREREBEgERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERIQERIEUC/Ns8+EFvJDCBS2kzViKhVhi+EvL0gV/yViFWEb7y9IAMcFRwABEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREZBGAvwREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbAsRJwslEFsKEHkIESgIEFcGVigBESjbPDBWG6ARGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERBoRwEgDxERDw4REA5VHXICcXDbPKIAQtMfAYIQ+U+Au7ry4IH6ANMP0gD6ANN/+gDTf9M/0x9VgAH0ERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARIhEQDxEhDw4RIA4NER8NDBEeDAsRHQsKERwKCREbCQgRGggHESIHBhEhBgURIAUEER8EAxEeAwIRHQIBERwBERtbAvT4QW8kMDIqgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tW2wzNDUlwAqRf5MlwAvinYFLaVYhVh6gGb4Y8vSagUtpCFYhvhjy9OKBXm0CsxLy9FYTgQELJnFBM/QKb6GUAdcAMJJbbeJus8ZMBDqPCDDbPGwX2zx/4CCCEO8BwrS64wIgghD7g3ljulFSU1QD5oIAoPchkX+UUzbHBeLy9LOaI8AKkX+TI8AM4pFw4p6CAJsXA1YhoPgjuxPy9JEy4idukjcilgcgbvLQgOJwI8AKkX+TI8AL4pIyN+MNUl2AQPRbMCPCAI6QUWNyf1UgbW1t2zxQsqBQSpIzNeJRWqFURENNpU4C/C2AQClZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zjsQgbvLQgG8lJQXCAJMDwgCSM3DilDNUQRPeAcIAksIAkjBw4pGgkTDiIMIAjowxU4Byf1UgbW1t2zyRMOJSfoBA9FswDZEw4hEbESIRGxEaESERGqVPAYjIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wByCaNxJMAKkjR/kwTAC+IQKhA1QUDbPKIB/hEZESARGREYER8RGBEXER4RFxEWER0RFhEVERwRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ9WHA8OESMODREiDQwRIQwLESALChEfCgkRHgkIBxEjBwYRIgYFESEFBBEgBAMRHwMCER0CViMCAREgAREfViJQAdbbPBEZESARGREYER8RGBEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+EG0QXBBLEDpJFwVQhp8AktMfAYIQ6YSq4Lry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP9MP03/6APoAVWAE8vhBbyRWEIBAK1n0D2+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLVsqwAqRf5MqwAvi4w+BXm0RH7MBER8B8vSCAMrHESVWHLoBESUB8vSCAKD3JoEBC1YhcUEz9ApvoZQB1wAwkltt4m6z8vRWJm7GVVZXAqAw0x8BghDvAcK0uvLggdM/+gDTP1UgbBP4QW8kE18DggCg9/hCVhEBxwXy9CmAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bB1vDeIgbpJfBeMOf8ZgBDqPCDDbPGwY2zx/4CCCEMMQA0K64wIgghBd1YRhunJzdHUC/IFLaVYsqgABERABVG//2zwcoBEZES8RGREYES4RGBEXES0RFxEWESwRFhEVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBHtYAvyBS2lWLKoAAREQAVRv/9s8HKARGREvERkRGBEuERgRFxEtERcRFhEsERYRFRErERURFBEqERQRExEpERMREhEoERIREREnEREREBEmERAPESUPDhEkDg0RIw0MESIMCxEhCwoRIAoJER8JCBEeCAcRHQcGERwGBREbBQQRGgR7WQL8lFcmVh2XESYgbvLQgOJ/gEBWHQVWHQVWHQVWHQVWHQVWHQVWHQVWMwUEETMEAxEyAwIRMwIBESjIVcDbPMkCESQCAREmAVYjASBulTBZ9FswlEEz9BfiCREhCQgRFwgHESAHBhEVBgURFgUEERQEAxETAwIREgIBEREBESZwmVoBQgMRLwMCES4CAREtAREscts8AREtAaABESIBvgERIwHy9H0BSAMRLwMCES4CAREtAREscts8AREtAaBWEaABESIBvgERIwHy9H0C0hEfgEARH38RHxCKEHgQZxBWEEUQNMhVwNs8ySkEAxEWAwIRFQIRFAEUQzBtbds8AxEZAwIRGAIBERcBERYPERUPERERFBERERARExEQEREREhERChERChCPEJ4QfRBsEFsQShhHkF4yEn+lBP7bPPhBbyQwMnBWI8IAlFYiwgCRcOKSMHHeViHCAJRWIMIAkXDikaTegUtpA1YeoVYZIqi+E/L0gV/yVhEjqFYeAb7y9FYiwgCUViHCAJFw4pRXIVch4w1WHsIAlFYdwgCRcOKOFgURIgUEESEEAxEeAwIRHQJXG1cbXwTjDREVkFxdXgFsgA1wVHAAIFYiKKkEViVRmBCJVi0IVi1QeAYRLQYFESwFUDQCES0CAREsAVYo2zwwER8RIBEfaAH+gA5wVHAAIFYgViepBBEgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDV8BqFYUoBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8SxNQqRhyUDNIGHDbPKIBsAwREgwLERELChEQChCfLhCfEI4QzRB8CwoRKgoJESkJEGgQZ9s8MAURHAUEERsEBBEZBAMRGAMCERcCAREWAREVBREUBQQREwQDERIDAhERAgEREAEPVYVoA/wgbvLQgG8tNTVbMzNxJ8AKkX+TJ8AL4o65gUtpCVYivhny9C+AQCxZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zkzAzNOMNjhE0NYFLaVYgVh2gGL4X8vQVE+KAQG0gbpIwbY6NIG7y0IBvLchVwNs8yeJhmWICwCBu8tCAbyUkwgCTI8IAkXDikjMz4w0gwgCTIsIAkXDilF8DMzTjDYBAbSBukjBtjhsgbvLQgG8lyFVAUFT6AhLLfwH6AhLLfwH6AsniEC9SoCBulTBZ9FswlEEz9BfiDWNkA+YCERACUqAgbpUwWfRbMJRBM/QX4ifCAJEy4w1DdchVIIIQ/BzclVAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ACDCAI6PUSJyf1UgbW1t2zxRQaEEkTLicgogbvLQgAKjA8IAEEoQI9s8baWiAfo8coAN+EJwVHAAIBEiETARIhEhES8RIREgES4RIBEfES0RHxEeESwRHhEdESsRHREcESoRHBEbESkRGxEaESgRGhEZEScRGREYESYRGBEXESURFxEWESQRFhEVESMRFREUETARFBETES8RExESES4REhERES0REREQESwREGUB+gqkgA74QnBUcAAgESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRLhEcERsRLREbERoRLBEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURJxEVERQRJhEUERMRLhETZwL4DxErDw4RKg4NESkNDBEoDAsRJwsKESYKCRElCfgjVjEKEIkQeFYvCFYuCAcGESsGBREqBQQDESsDAhEqAgFWMwERLNs8MBEZEScRGREYESYRGBEXESURFxEWESQRFhEVESMRFREUESIRFBETESERExESESAREhERER8REWhmAIIREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRFQcGERQGBRETBQQREgQDEREDAhEQAk/+GgL8ERIRLRESERERLBERERARKxEQDxEqDw4RKQ4NESgNDBEnDFYtDBB7EGoJESsJCBEpCBBXBhEtBgURLQURK/gj2zwwERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQaGkE8FYRpC3ACpF/ky3AC+KOFWwzMynADJEmmSnADZEmkiaz4uJBMOMN+COAQHBtLlRNMC9UTjAuVE4wLlRLMC9UTDBWFwHIVcDbPMkCERQCVhIBIG6VMFn0WzCUQTP0F+IQmhBFVhAFQxQCERMCUA0QRhA1WchVwNs8yWqZa2wAXg8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8S6kVAK4qsyfCAJMmwgCRcOKRf5olwgCTJMIAkXDi4o43R2WAQFFUyFVAUFT6AhLLfwH6AhLLfwH6AskCERICARESAVYRASBulTBZ9FswlEEz9BfiERBVIJJsROIAkoIQZu9GX1AOyx8cywcayw9QCCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhbKAFAE+gJY+gLLf8oAAfoCyz/LP8sfyx8ANMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAYEAtgkwAPjDxEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBMEDtKmBVubwH8MhEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERESEREREQESAREA8RHw8OER4ODREdDVYcDQwRHAwLERsLChEiCgkRIQkIESAIBxEfB0YVBBEcBAMRGwMCESICAREhAREdViJWIFYjcAH8ERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRIhESERERIRERERARIBEQDxEfDw4RHg5WHQ4NER0NDBEcDAsRIwsKESIKCREhCQgRIAhQdgURHQUEERwEAxEjAwIRIgIBER4BVh4BcQEIViHbPJ8BHlYhARElViHbPBEcESERHJ8A5NMfAYIQ+4N5Y7ry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z/Tf/oA1AHQ+gAwGBcWFRRDMAL2+EFvJIFLaVYiqgBUJUBSRNs8oBEZESURGREYESQRGBEXESMRFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODRElDQwRJAwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYFER0Fe3YCEDDbPGwZ2zx/eXoD/o90MNMfAYIQXdWEYbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBVIGwTggCg9/hCVhABxwXy9CDCAI8ngEJwbXAgyMsAydAmEGgQWAQHVSDIVWDbPMkvA1YVQTMUQzBtbds8kl8D4n/gIIIQ/DOHfbqgpYEC9gQRHAQDERsDAhEaAgERJQERJHLbPAERJQGgVhGgARElAb4BERoB8vSCAKD3KIEBC1YacUEz9ApvoZQB1wAwkltt4m6z8vRWIG6zlxEgIG7y0ICUVyBWFuJWIKSAQHNwUwBwIRBX+CN/VikJVikJVikJCAcGBQRDExEkHX13BPjIVcDbPMkQIwERGAFWIQEgbpUwWfRbMJRBM/QX4nCAQH9zVHMzEDsKESYKCREiCQgRJAgHESUHBhEjBlUicAMCESICAREhAREgELwQihB4EGcQVhBFEDTIVcDbPMkjAxEZAwIRFQIRFwEUQzBtbds8DREZDQwRGAwLERcLmX+leABQChEWCgkRFQkIERQIBxETBwYREgYFEREFBBEQBBA/TtwQaxCKXkQQIwB+0x8BghDDEANCuvLggdMP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAPoA+gDTP9N/+gD6AFWAAvb4QW8kgUtpViOqAFQlQFJE2zygERkRJhEZERgRJREYERcRJBEXERYRIxEWERURIhEVERQRIREUERMRIBETERIRHxESERERHhERERARHREQDxEcDw4RGw4NERoNDBEmDAsRJQsKESQKCREjCQgRIggHESEHBhEgBgURHwV7fABkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAD/gQRHgQDER0DAhEcAgERGwERGnLbPAERGwGgVhGgAREbAb4BERwB8vSCAKD3KIEBC1YccUEz9ApvoZQB1wAwkltt4m6z8vQgpIBAdHBwIRA1+CN/VisHVisHVisHBhErBlYqUFYEESwEUCMBESwBViUBESbIVcDbPMkQIwERGgF9mX4AGsABklYUklYT4lYTAaAD/lYaASBulTBZ9FswlEEz9BficIBAf3RUOTMKER4KCREjCQgRJwgHESgHBhEmBhUEESQEA3ADAhEjAgERIgERIRC8EIoQeBBnEFYQRRA0yFXA2zzJIgQDERgDAhEaAhEXARRDMG1t2zwMERkMCxEYCwoRFwoJERYJCBEVCAcRFAd/pYAAnIIQ/1flV1AOyx8cyz8aywcYyw9QBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhTKAFj6AgH6Ast/ygDLP8t/yFj6Alj6AskBzABEBhETBgUREgUEEREEAxEQA0/tEFwQaxCKEEkQKBAlECQQIwQ6jwgw2zxsF9s8f+AgghCI5/knuuMCIIIQlGqYtrqCg4SFAfbTHwGCEPwzh3268uCB0gABktMH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Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIB+gIBzxYA8Cdus5h/UAnKABfLB5g3cFAIygAQZ+IVyz8Tyz8BIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gLLHwHwER0RHhEdERwRHhEcERsRHhEbERoRHhEaERkRHhEZERgRHhEYERcRHhEXERYRHhEWERURHhEVERQRHhEUERMRHhETERIRHhESERERHhERERARHhEQDxEeDw4RHg4NER4NDBEeDAsRHgsKER4KCREeCQgRHggHER4HowLKBhEeBgURHgUEER4EAxEeA9s8IMIAjo0BERsBcn9VIG1tbds8kzBXGuIRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ6kpQCU+EFvJBNfA/gnbxAmoSSgIaFwAbYJIFYZtghWGQGhcAJWGqEStgkGwAGSVhySVhviWaEDqBKhUAOgIcIAknAy3wGhAZJWEpFw4qEByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsApgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIKmqAgEgsLECGboXvbPNs8VxBfD2yhjAqwIBx6ytAARWGAL2quEgbpIwbY4cINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOLbPBEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bP8/Pz8/Pz8/Pz8/P1WjwK4CGKkd2zzbPFcQXw9socCvAIBtIW6zjhwwgQELASBu8tCA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');
    const __system = Cell.fromBase64('te6cckECygEAPrkAAQHAAQEFoHshAgEU/wD0pBP0vPLICwMCAWIEqAL40AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHcIFAlbbPPLggsj4QwHMfwHKABEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UBqUE8O2i7fsBj+KAINchcCHXScIflTAg1wsf3iCCEFUj0R664wKCEP9X5Ve6jzvTHwGCEP9X5Ve68uCB0z/TB9MPVSBsE1smgEAiWfQPb6GSMG3fIG6SMG2Oh9DbPGwdbw3iIG6RW+MOf+Awf+BwIddJwh+VMCDXCx/eIAfICAkD+DDTHwGCEFUj0R668uCB0gDTP1lsEjEogEAiWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG6RW49CIG7y0IBvKDIQRhA1RlZwgEBRh8hVcNs8yRsTIG6VMFn0WzCUQTP0F+IobrOOkQggbvLQgHCAQn9VIG1tbds8kTji4n+5jaMD6iBu8tCAby0yK8ADjq0bXwuAQG0gbpIwbY6NIG7y0IBvLchVwNs8yeIQOUGQIG6VMFn0WzCUQTP0F+KOn1WRcIBAUc3IVcDbPMkQOUGQIG6VMFn0WzCUQTP0F+LiJm6zjpEGIG7y0IBwgEJ/VSBtbW3bPJE24oqKowT+ghCbMsgJuo/tMNMfAYIQmzLICbry4IHSAAGS0x+SbQHi1AHQ0gABjoTbPG8JkW3iAdQw0NIAAY4n9AT0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMG8DkW3iAdQw0NIAAZIwbeMNEDRsFNs8f+AgwAAi10nBIQoLDBQAPPoA+gD6APoA+gD6APoA+gDUAdD6ADAZGBcWFRRDMADK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTbwMB9BEZER0RGREYERwRGBEXERsRFxEWERoRFhEVER0RFREUERwRFBETERsRExESERoREhERER0REREQERwREA8RGw8OERoODREdDQwRHAwLERsLChEaCgkRHQkIERwIBxEbBwYRGgYFER0FBBEcBAMRGwMCERoCAREdAREcDQSe2zxXFxEaIG7y0IBWG26zjig6OjpWGCBu8tCAbyNbVhkgbvLQgG8jMDERGiBu8tCAbyNsIQkRGlC6klcb4lYbbrOSVxvjDVYXbrOSVxfjDZ4OEBIB8DZWGiBu8tCAbyNbIIEBC3FZ9IJvpSCWUCPXADBYlmwhbTJtAeKQjj2BAQsBkX+RbeIiEDwBcSFulVtZ9FkwmMgBzwBBM/RB4oEBC1RCG3FBM/R0b6UgllAj1wAwWJZsIW0ybQHi6F8DVhogbvLQgG8jMDEggQELcQ8AzFn0gm+lIJZQI9cAMFiWbCFtMm0B4pCOPYEBCwGRf5Ft4iIQOwFxIW6VW1n0WTCYyAHPAEEz9EHigQELVEIacUEz9HRvpSCWUCPXADBYlmwhbTJtAeLoXwMRGiBu8tCAbyNsIQURGgH+Ozs7Ozs7Ozs7LiBu8tCAbykQaF8ILyBu8tCAbykQWF8IVhAgbvLQgG8pEEhfCFYRIG7y0IBvKRA4XwhWEiBu8tCAbykQKF8IVhMgbvLQgG8pGF8IVhQgbvLQgG8pXwhWFSBu8tCAbykQeF8IERYgbvLQgG8pbIEKERYKBxESBxEAHgYREQYFERAFEE8QPk3MCwK0iBEWERoRFhEVERkRFREVERgRFRETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGUBA0QTD4QgF/bds8E6IAJAAAAABjb25maWcgdXBkYXRlZAT+sJJbf+AgghBzYtCcuo/nMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBT4QlYRAccFs5j4QlYSAccFs5Fw4o8WMG1wyMnQI1UgyFVg2zzJ+EIBcG3bPOMOf+AgghBIHnVhupKiFSwDKFYc4wLTAAHAASCz4wL4QlYSAccFFhkcAfow+EIRHBEdERwRGxEdERsRGhEdERoRGREdERkRGBEdERgRFxEdERcRFhEdERYRFREdERURFBEdERQRExEdERMREhEdERIREREdEREREBEdERAPER0PDhEdDg0RHQ0MER0MCxEdCwoRHQoJER0JCBEdCAcRHQcGER0GBREdBRcD8AQRHQQDER0DAgERHQFWHVYe2zyIERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwf23bPJEYogAoAAAAAGNvbnRyYWN0IHN0b3BwZWQB+lv4QhEcER0RHBEbER0RGxEaER0RGhEZER0RGREYER0RGBEXER0RFxEWER0RFhEVER0RFREUER0RFBETER0RExESER0REhERER0REREQER0REA8RHQ8OER0ODREdDQwRHQwLER0LChEdCgkRHQkIER0IBxEdBwYRHQYFER0FGgPwBBEdBAMRHQMCAREdAVYdVh7bPIgRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTB/bds8kRuiACoAAAAAcGF5bG9hZCBub3QgZXhpc3QDWo8cAdQw0NMHIpMhwAGRcOKOimwh+gD6ADAB2zzjDo6MMNQw0PoA+gAwAds84h0gKQL0+EFvJBNfA4sIcCRWH6ATuY4SW3+L5nYXMgbm90IGVub3VnaI3lNSuY4WW3+NBFqZXR0b24gbm90IGVub3VnaIN4jVhe5jh1bf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIN4B4wIwMyqkgEB/+CNwbSdROVE4UqQeHwL+bCERGxEdERsRGhEcERoRGREdERkRGBEcERgRFxEdERcRFhEcERYRFREdERURFBEcERQRExEdERMREhEcERIREREdEREREBEcERAPER0PVhwPDhEeDg0MER4MCwoRHgoJCBEeCAcGER4GBQQRHgQDAhEdAgERHgFWHVYe2zwRG5EkA5zIVXDbPMktED8BIG6VMFn0WzCUQTP0F+JRUaBxUTBFE1QgFx7IVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBxIBBLEEpEMBJw2zyNKpUDlgKSwAKSMHDijqj6ANIAAcD/AdMP0gABwP8B+gD6ANN/0x/UMND6ANN/+gDTfzBVA9s8jxYwbXDIydAjVSDIVWDbPMn4QgFwbds84iGSogPs+EFvJBNfA4sIcC5WKKATuY4SW3+L5nYXMgbm90IGVub3VnaI3lP5uY4WW3+NBFqZXR0b24gbm90IGVub3VnaIN5xJ8IAkybCAJFw4pIwct4lwgCTJMIAkXDikaTeViAhqFLwueMAAuMCMD4KkXqSgAviUr6pBCIjJwA+bCF/jQYZXhlY3V0aW9uIGZlZSBub3QgZW5vdWdogWAL+bNERGxEdERsRGhEcERoRGREdERkRGBEcERgRFxEdERcRFhEcERYRFREdERURFBEcERQRExEdERMREhEcERIREREdEREREBEcERAPER0PVhwPDhEeDg0MER4MCwoRHgoJCBEeCAcGER4GBQQRHgQDAhEdAgERHgFWHVYe2zwRG5EkAsbbPBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQwEn9t2zwlogFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxJgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAfwRJhEoESYRJREnESURJBEoESQRIxEnESMRIhEoESIRIREnESERIBEoESARHxEnER8RHhEoER4RHREnER0RHBEoERwRGxEnERsRGhEoERoRGREnERkRGBEoERgRFxEnERcRFhEoERYRFREnERURFBEoERQRExEnERMREhEoERIoAuoREREnEREREBEoERAPEScPDhEoDg0RJw0MESgMCxEnC1YoC9s8MFYaoBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1yWXFw2zxklQPkM4IAoPcugQELJHFBM/QKb6GUAdcAMJJbbeJus/L0+EFvJDAxgUtpMiKhVhy+8vSBX/IhVhW+8vQqpIBAcPgjcG0nUTlROFKkyFVw2zzJLRA/ASBulTBZ9FswlEEz9BfiUVGgclEwRRNUIBceyFVQ2zzJjSorAG6CEMTQIORQB8sfFcsHUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLLP8s/AUjIgljAAAAAAAAAAAAAAAABActnzMlw+wBxIBBLEEpEMBJw2zyVBMiOxjDTHwGCEEgedWG68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4kMwbBPbPH/gIIIQq89Ye7qPCDDbPGwW2zx/4CCCEM1jNry6LTIzOAP2+EFvJDAygUtpVhxWGKATvhLy9CuAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbgV5tAbPy9FYTgQELJ3FBM/QKb6GUAdcAMJJbbeJus4IAoPchkX+UU1fHBeLy9LORMOMNUnAREIBA9FswuS4vABqCAJsXAVYhoPgju/L0Af4jklYUklYV4hEcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQESIREA8RIQ8OESAODREfDQwRHgwLER0LGgkRIQkIESAIBxEfBwYRHgYFER0FMAP6FAMRIQMCVh8CESJWHts8Vhtus5cRGyBu8tCAlFcbVhniVh/CAI6SVh9yf1UgbW1t2zwRGlYeoREakTDiVh2RcZFy4gIBER0BERzIVSCCELmwPLxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wBxER2jVh2RozEBxBEYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5XlJBBds8lQCO0x8BghCrz1h7uvLggdM/0z8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB9AT6APoAVVAD9PhBbyRWEYBAK1n0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFtWJqoAVCqQUpnbPBagERkRKBEZERgRJxEYERcRJhEXERYRJREWERURJBEVERQRIxEUERMRIhETERIRIRESERERIBERERARHxEQuXg0AuwPER4PDhEdDg0RHA0MERsMCxEaCwoRKAoJEScJCBEmCAcRJQcGESQGBREjBQQRIgQDESEDAhEgAgERHwERHnHbPAERHwGgVhGgViKzk1YRoN4RJIFLaRElvgERJAHy9IFebRElswERJQHy9IIAoPcogQELViVxejUC+EEz9ApvoZQB1wAwkltt4m6z8vRWGG6zlxEYIG7y0ICUVxhWIeJ/gEBWIQVWIQVWIQUEESEEAxElAwIRIQIBESfIVXDbPMkBER4BVhgBIG6VMFn0WzCUQTP0F+IFERsFBBEWBAMRFQMCERoCAREZARETcBEigEARIhBFEDSNNgKkyFVw2zzJVhEDAhEdAhEcAX9VMG1t2zwKERkKCREYCQgRFwgHERYHBhEVBgURFAUEERMEAxESAwIREQIBERABDxCeEK0QTBCbEDkQKBA3FRYQNDejAHqCEFUj0R5QCcsfF8oAFcs/UAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLLP/QAAfoCAfoCBDqPCDDbPGwW2zx/4CCCEO71kk264wIgghD5T4C7ujk6P0UANtMfAYIQzWM2vLry4IHSANM/03/6APoA0z9VUATeM/hBbyQwMlYSggCg9wLHBfL0LYBAJln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKGwiMwqzlRA2NTNb4w1SToBA9FswIcIAjo9RUXJ/VSBtbW3bPFFVoQWRNeIBkXGRcuJauTujPgL0gUtpViFWHKBWHaAWvhXy9HJwbVRJkFJayFUwghBZXwe8UAXLHxPLPwH6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOLJVhgDVhxDkxRDMG1t2zwRGxEhERsRGhEgERoRGREfERmjPAL4ERgRHhEYERcRHREXERYRHBEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEhD1YgDw4RIA4NER8NDBEeDAsRHQsKESIKCQgRIAgHER8HBhEeBgURHQUEESIEAwIRIQJWHgIBESMBVh7bPBEZER8RGZE9AMARGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQOUgWUHIBishVIIIQKhOBAFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AClus46PcQogbvLQgAGjKhA7f9s8kjA44pUCEDDbPGwY2zx/QEEAPtMfAYIQ7vWSTbry4IH6ANMP0gD6APoA03/TP9MfVXAB9BEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERESEREREQESAREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREhAREgQgL82zz4QW8kMIFLaTNWIqFWGL4S8vSBX/JWIVYRvvL0gAxwVHAAER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERn0MC/BEQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsCxEnCyUQWwoQeQgRKAgQVwZWKAERKNs8MFYboBEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREGREASAPEREPDhEQDlUdcgJxcNs8lQTKjwgw2zxsGds8f+AgghAJn/Sjuo7HMNMfAYIQCZ/0o7ry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP1UgbBPbPH/gIIIQ6YSq4LpGR01TAELTHwGCEPlPgLu68uCB+gDTD9IA+gDTf/oA03/TP9MfVYAB9BEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQESIREA8RIQ8OESAODREfDQwRHgwLER0LChEcCgkRGwkIERoIBxEiBwYRIQYFESAFBBEfBAMRHgMCER0CAREcAREbSAT+2zz4QW8kMDJwViPCAJRWIsIAkXDikjBx3lYhwgCUViDCAJFw4pGk3oFLaQNWHqFWGSKovhPy9IFf8lYRI6hWHgG+8vRWIsIAlFYhwgCRcOKUVyFXIeMNVh7CAJRWHcIAkXDijhYFESIFBBEhBAMRHgMCER0CVxtXG18E4w0RFZ9JSkwBbIANcFRwACBWIiipBFYlUZgQiVYtCFYtUHgGES0GBREsBVA0AhEtAgERLAFWKNs8MBEfESARH2QB/oAOcFRwACBWIFYnqQQRIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw1LAbAMERIMCxERCwoREAoQny4QnxCOEM0QfAsKESoKCREpCRBoEGfbPDAFERwFBBEbBAQRGQQDERgDAhEXAgERFgERFQURFAUEERMEAxESAwIREQIBERABD1WFZAGoVhSgERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHEG8QXhBNEDxLE1CpGHJQM0gYcNs8lQL0+EFvJDAyKoBAJVn0D2+hkjBt3yBukjBtjofQ2zxsHW8N4oF/fSFus/L0IG7y0IBvLVtsMzQ1JcAKkX+TJcAL4p2BS2lWIVYeoBm+GPL0moFLaQhWIb4Y8vTigV5tArMS8vRWE4EBCyZxQTP0Cm+hlAHXADCSW23ibrPITgPmggCg9yGRf5RTNscF4vL0s5ojwAqRf5MjwAzikXDinoIAmxcDViGg+CO7E/L0kTLiJ26SNyKWByBu8tCA4nAjwAqRf5MjwAvikjI34w1SXYBA9FswI8IAjpBRY3J/VSBtbW3bPFCyoFBKkjM14lFaoVREQ0+jUgL8LYBAKVn0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeIgbrOOxCBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjDFTgHJ/VSBtbW3bPJEw4lJ+gED0WzANkTDiERsRIhEbERoRIREao1AB/hEZESARGREYER8RGBEXER4RFxEWER0RFhEVERwRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ9WHA8OESMODREiDQwRIQwLESALChEfCgkRHgkIBxEjBwYRIgYFESEFBBEgBAMRHwMCER0CViMCAREgAREfViJRAdbbPBEZESARGREYER8RGBEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+EG0QXBBLEDpJFwVQhpEBiMhVIIIQ8sWurFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHIJo3EkwAqSNH+TBMAL4hAqEDVBQNs8lQQ6jwgw2zxsF9s8f+AgghDvAcK0uuMCIIIQ+4N5Y7pUVVxvAJLTHwGCEOmEquC68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdM/0z/TD9N/+gD6AFVgBPL4QW8kVhCAQCtZ9A9voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bKsAKkX+TKsAL4uMPgV5tER+zAREfAfL0ggDKxxElVhy6ARElAfL0ggCg9yaBAQtWIXFBM/QKb6GUAdcAMJJbbeJus/L0ViZuyFZYWgL8gUtpViyqAAEREAFUb//bPBygERkRLxEZERgRLhEYERcRLREXERYRLBEWERURKxEVERQRKhEUERMRKRETERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEeFcBQgMRLwMCES4CAREtAREscts8AREtAaABESIBvgERIwHy9HoC/IFLaVYsqgABERABVG//2zwcoBEZES8RGREYES4RGBEXES0RFxEWESwRFhEVESsRFREUESoRFBETESkRExESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBHhZAUgDES8DAhEuAgERLQERLHLbPAERLQGgVhGgAREiAb4BESMB8vR6AvyUVyZWHZcRJiBu8tCA4n+AQFYdBVYdBVYdBVYdBVYdBVYdBVYdBVYzBQQRMwQDETIDAhEzAgERKMhVwNs8yQIRJAIBESYBViMBIG6VMFn0WzCUQTP0F+IJESEJCBEXCAcRIAcGERUGBREWBQQRFAQDERMDAhESAgEREQERJnCKWwLSER+AQBEffxEfEIoQeBBnEFYQRRA0yFXA2zzJKQQDERYDAhEVAhEUARRDMG1t2zwDERkDAhEYAgERFwERFg8RFQ8REREUEREREBETERARERESEREKEREKEI8QnhB9EGwQWxBKGEeQXjISfKMCoDDTHwGCEO8BwrS68uCB0z/6ANM/VSBsE/hBbyQTXwOCAKD3+EJWEQHHBfL0KYBAJVn0D2+hkjBt3yBukjBtjofQ2zxsHW8N4iBukl8F4w5/yF0D/CBu8tCAby01NVszM3EnwAqRf5MnwAvijrmBS2kJViK+GfL0L4BALFn0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeIgbrOTMDM04w2OETQ1gUtpViBWHaAYvhfy9BUT4oBAbSBukjBtjo0gbvLQgG8tyFXA2zzJ4l6KaQLAIG7y0IBvJSTCAJMjwgCRcOKSMzPjDSDCAJMiwgCRcOKUXwMzNOMNgEBtIG6SMG2OGyBu8tCAbyXIVUBQVPoCEst/AfoCEst/AfoCyeIQL1KgIG6VMFn0WzCUQTP0F+INX2IB+jxygA34QnBUcAAgESIRMBEiESERLxEhESARLhEgER8RLREfER4RLBEeER0RKxEdERwRKhEcERsRKREbERoRKBEaERkRJxEZERgRJhEYERcRJREXERYRJBEWERURIxEVERQRMBEUERMRLxETERIRLhESERERLRERERARLBEQYAL4DxErDw4RKg4NESkNDBEoDAsRJwsKESYKCRElCfgjVjEKEIkQeFYvCFYuCAcGESsGBREqBQQDESsDAhEqAgFWMwERLNs8MBEZEScRGREYESYRGBEXESURFxEWESQRFhEVESMRFREUESIRFBETESERExESESAREhERER8REWRhAIIREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRFQcGERQGBRETBQQREgQDEREDAhEQAk/+GgH6CqSADvhCcFRwACARJREuESURJBEtESQRIxEsESMRIhErESIRIREqESERIBEpESARHxEoER8RHhEnER4RHREmER0RHBEuERwRGxEtERsRGhEsERoRGRErERkRGBEqERgRFxEpERcRFhEoERYRFREnERURFBEmERQRExEuERNjAvwREhEtERIREREsEREREBErERAPESoPDhEpDg0RKA0MEScMVi0MEHsQagkRKwkIESkIEFcGES0GBREtBREr+CPbPDARGREiERkRGBEhERgRFxEgERcRFhEfERYRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERBkaATwVhGkLcAKkX+TLcAL4o4VbDMzKcAMkSaZKcANkSaSJrPi4kEw4w34I4BAcG0uVE0wL1ROMC5UTjAuVEswL1RMMFYXAchVwNs8yQIRFAJWEgEgbpUwWfRbMJRBM/QX4hCaEEVWEAVDFAIREwJQDRBGEDVZyFXA2zzJZYpmZwCuKrMnwgCTJsIAkXDikX+aJcIAkyTCAJFw4uKON0dlgEBRVMhVQFBU+gISy38B+gISy38B+gLJAhESAgEREgFWEQEgbpUwWfRbMJRBM/QX4hEQVSCSbETiAJKCEGbvRl9QDssfHMsHGssPUAgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYWygBQBPoCWPoCy3/KAAH6Ass/yz/LH8sfADTIgljAAAAAAAAAAAAAAAABActnzMlw+wAGBABeDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHEG8QXhBNEDxLqRUD5gIREAJSoCBulTBZ9FswlEEz9BfiJ8IAkTLjDUN1yFUgghD8HNyVUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIMIAjo9RInJ/VSBtbW3bPFFBoQSRMuJyCiBu8tCAAqMDwgAQShAj2zxqo5UC2CTAA+MPERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEEwQO0qYFWttAfwyERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERIRERERARIBEQDxEfDw4RHg4NER0NVhwNDBEcDAsRGwsKESIKCREhCQgRIAgHER8HRhUEERwEAxEbAwIRIgIBESEBER1WIlYgViNsAQhWIds8kQH8ERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRIhESERERIRERERARIBEQDxEfDw4RHg5WHQ4NER0NDBEcDAsRIwsKESIKCREhCQgRIAhQdgURHQUEERwEAxEjAwIRIgIBER4BVh4BbgEeViEBESVWIds8ERwRIREckQQ6jwgw2zxsGNs8f+AgghDDEANCuuMCIIIQXdWEYbpwcXV+AOTTHwGCEPuDeWO68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdMP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANM/03/6ANQB0PoAMBgXFhUUQzAC9vhBbySBS2lWIqoAVCVAUkTbPKARGRElERkRGBEkERgRFxEjERcRFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RJQ0MESQMCxEjCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBXhyAvYEERwEAxEbAwIRGgIBESUBESRy2zwBESUBoFYRoAERJQG+AREaAfL0ggCg9yiBAQtWGnFBM/QKb6GUAdcAMJJbbeJus/L0ViBus5cRICBu8tCAlFcgVhbiViCkgEBzcFMAcCEQV/gjf1YpCVYpCVYpCQgHBgUEQxMRJB16cwT4yFXA2zzJECMBERgBViEBIG6VMFn0WzCUQTP0F+JwgEB/c1RzMxA7ChEmCgkRIgkIESQIBxElBwYRIwZVInADAhEiAgERIQERIBC8EIoQeBBnEFYQRRA0yFXA2zzJIwMRGQMCERUCERcBFEMwbW3bPA0RGQ0MERgMCxEXC4p8o3QAUAoRFgoJERUJCBEUCAcREwcGERIGBRERBQQREAQQP07cEGsQil5EECMCEDDbPGwZ2zx/dncAftMfAYIQwxADQrry4IHTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA0z/Tf/oA+gBVgAL2+EFvJIFLaVYjqgBUJUBSRNs8oBEZESYRGREYESURGBEXESQRFxEWESMRFhEVESIRFREUESERFBETESARExESER8REhERER4REREQER0REA8RHA8OERsODREaDQwRJgwLESULChEkCgkRIwkIESIIBxEhBwYR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FBEgERQRExEfERMREhEeERIREREdEREREBEcERAPESEPViAPDhEgDg0RHw0MER4MCxEdCwoRIgoJCBEgCAcRHwcGER4GBREdBZAB4gQRIgQDAhEhAlICViMCESMB2zwRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbFVVkQJOIsIAjx5ycG1wyMnQEGheNBA3yFVg2zzJVhVVIBRDMG1t2zySXwXikqMA3oIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AgHPFgLOIG6SMG2OjSBu8tCAbyjIVXDbPMniJBA5ASBulTBZ9FswlEEz9BfiWchZghDbReQ4UAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcvhCcHEIbrOTBMIAkjRw4hA3RDDbPJSVAPAnbrOYf1AJygAXyweYN3BQCMoAEGfiFcs/E8s/ASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCyx8B8BEdER4RHREcER4RHBEbER4RGxEaER4RGhEZER4RGREYER4RGBEXER4RFxEWER4RFhEVER4RFREUER4RFBETER4RExESER4REhERER4REREQER4REA8RHg8OER4ODREeDQwRHgwLER4LChEeCgkRHgkIER4IBxEeB5YCygYRHgYFER4FBBEeBAMRHgPbPCDCAI6NAREbAXJ/VSBtbW3bPJMwVxriERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOl6MAlPhBbyQTXwP4J28QJqEkoCGhcAG2CSBWGbYIVhkBoXACVhqhErYJBsABklYcklYb4lmhA6gSoVADoCHCAJJwMt8BoQGSVhKRcOKhAmSOqDDTHwGCEJRqmLa68uCB0z8B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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOrderBook_init_args({ $$type: 'OrderBook_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const OrderBook_errors: { [key: number]: { message: string } } = {
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
    11120: { message: `compensate not exist` },
    19305: { message: `gas not enough` },
    24173: { message: `order is pending` },
    24562: { message: `execution fee not enough` },
    31425: { message: `not reach unlock time` },
    32637: { message: `order not exist` },
    39703: { message: `too early` },
    40368: { message: `Contract stopped` },
    41207: { message: `invalid sender` },
    51911: { message: `token not match` },
    53296: { message: `Contract not stopped` },
}

const OrderBook_types: ABIType[] = [
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
    {"name":"DeployTLP","header":4139425289,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateConfig","header":2603796489,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":true,"format":32}},{"name":"gasConfig","type":{"kind":"simple","type":"GasConfig","optional":true}},{"name":"executorConfig","type":{"kind":"simple","type":"ExecutorConfig","optional":true}},{"name":"contractConfig","type":{"kind":"simple","type":"ContractConfig","optional":true}}]},
    {"name":"SendProtocolFee","header":1574274145,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CancelLiquidityOrder","header":1209955681,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ExecuteLiquidityOrder","header":2882492539,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpdateLiquidityPool","header":1428410654,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LiquidityPoolUpdated","header":3445831356,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateCompensate","header":4231235453,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecuteOrCancelCompensate","header":2296903975,"fields":[{"name":"isCancel","type":{"kind":"simple","type":"bool","optional":false}},{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateDecreasePerpOrder","header":4009071181,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateTpSlPerpOrder","header":4182737083,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CancelPerpOrder","header":161477795,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecutePerpOrder","header":3917785824,"fields":[{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LiquidatePerpPosition","header":4219697507,"fields":[{"name":"liquidationFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ADLPerpPosition","header":3272606530,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpPositionUpdated","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"payout","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCreatedEvent","header":3301974244,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCancelledEvent","header":3115334844,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderExecutedEvent","header":705921280,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpOrderCreatedEvent","header":1726957151,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PerpOrderCancelledEvent","header":4073041580,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpOrderExecutedEvent","header":4229749909,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateCreatedEvent","header":2519251606,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateCancelledEvent","header":1271087573,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateExecutedEvent","header":3678790712,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GasConfig","header":null,"fields":[{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolLpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolPerpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecutorConfig","header":null,"fields":[{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"lpExecutors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContractConfig","header":null,"fields":[{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":true}},{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolLpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"poolPerpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasTransferJetton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForBurnTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidityOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LiquidityOrderData","header":null,"fields":[{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidityOrder","type":{"kind":"simple","type":"LiquidityOrder","optional":true}}]},
    {"name":"PerpOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastOperator","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"PerpOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderData","header":null,"fields":[{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrder","type":{"kind":"simple","type":"PerpOrder","optional":true}},{"name":"perpOrderEx","type":{"kind":"simple","type":"PerpOrderEx","optional":true}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateData","header":null,"fields":[{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensate","type":{"kind":"simple","type":"Compensate","optional":true}}]},
]

const OrderBook_getters: ABIGetter[] = [
    {"name":"configData","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"liquidityOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LiquidityOrderData","optional":false}},
    {"name":"perpOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PerpOrderData","optional":false}},
    {"name":"compensate","arguments":[{"name":"compensateId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"CompensateData","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const OrderBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidityPoolUpdated"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreasePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateTpSlPerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelPerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecutePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PerpPositionUpdated"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ADLPerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendProtocolFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteOrCancelCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class OrderBook implements Contract {
    
    static async init(deployId: bigint) {
        return await OrderBook_init(deployId);
    }
    
    static async fromInit(deployId: bigint) {
        const init = await OrderBook_init(deployId);
        const address = contractAddress(0, init);
        return new OrderBook(address, init);
    }
    
    static fromAddress(address: Address) {
        return new OrderBook(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  OrderBook_types,
        getters: OrderBook_getters,
        receivers: OrderBook_receivers,
        errors: OrderBook_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | null | JettonTransferNotification | CancelLiquidityOrder | ExecuteLiquidityOrder | LiquidityPoolUpdated | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | PerpPositionUpdated | LiquidatePerpPosition | ADLPerpPosition | SendProtocolFee | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConfig') {
            body = beginCell().store(storeUpdateConfig(message)).endCell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidityPoolUpdated') {
            body = beginCell().store(storeLiquidityPoolUpdated(message)).endCell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PerpPositionUpdated') {
            body = beginCell().store(storePerpPositionUpdated(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidatePerpPosition') {
            body = beginCell().store(storeLiquidatePerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ADLPerpPosition') {
            body = beginCell().store(storeADLPerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendProtocolFee') {
            body = beginCell().store(storeSendProtocolFee(message)).endCell();
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
    
    async getConfigData(provider: ContractProvider, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('configData', builder.build())).stack;
        const result = loadTupleConfigData(source);
        return result;
    }
    
    async getLiquidityOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('liquidityOrder', builder.build())).stack;
        const result = loadTupleLiquidityOrderData(source);
        return result;
    }
    
    async getPerpOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('perpOrder', builder.build())).stack;
        const result = loadTuplePerpOrderData(source);
        return result;
    }
    
    async getCompensate(provider: ContractProvider, compensateId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(compensateId);
        let source = (await provider.get('compensate', builder.build())).stack;
        const result = loadTupleCompensateData(source);
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