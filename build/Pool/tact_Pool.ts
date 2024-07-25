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

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
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
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
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
    tlpJetton: Address;
    orderBook: Address;
    claimExecutor: Address;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasForMintTlp: bigint;
    maxLpNetCap: bigint;
    lpRolloverFeeRate: bigint;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(978998165, 32);
        b_0.storeAddress(src.tlpJetton);
        b_0.storeAddress(src.orderBook);
        b_0.storeAddress(src.claimExecutor);
        b_0.storeCoins(src.lpGasConsumption);
        let b_1 = new Builder();
        b_1.storeCoins(src.perpGasConsumption);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeCoins(src.gasForMintTlp);
        b_1.storeCoins(src.maxLpNetCap);
        b_1.storeUint(src.lpRolloverFeeRate, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 978998165) { throw Error('Invalid prefix'); }
    let _tlpJetton = sc_0.loadAddress();
    let _orderBook = sc_0.loadAddress();
    let _claimExecutor = sc_0.loadAddress();
    let _lpGasConsumption = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpGasConsumption = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _gasForMintTlp = sc_1.loadCoins();
    let _maxLpNetCap = sc_1.loadCoins();
    let _lpRolloverFeeRate = sc_1.loadUintBig(32);
    return { $$type: 'UpdateConfig' as const, tlpJetton: _tlpJetton, orderBook: _orderBook, claimExecutor: _claimExecutor, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForMintTlp: _gasForMintTlp, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _tlpJetton = source.readAddress();
    let _orderBook = source.readAddress();
    let _claimExecutor = source.readAddress();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    return { $$type: 'UpdateConfig' as const, tlpJetton: _tlpJetton, orderBook: _orderBook, claimExecutor: _claimExecutor, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForMintTlp: _gasForMintTlp, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.orderBook);
    builder.writeAddress(source.claimExecutor);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasForMintTlp);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
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

export type UpdateTokenConfig = {
    $$type: 'UpdateTokenConfig';
    tokenId: bigint;
    config: TokenConfig;
}

export function storeUpdateTokenConfig(src: UpdateTokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3863104642, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.store(storeTokenConfig(src.config));
    };
}

export function loadUpdateTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3863104642) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _config = loadTokenConfig(sc_0);
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, config: _config };
}

function loadTupleUpdateTokenConfig(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    const _config = loadTupleTokenConfig(source.readTuple());
    return { $$type: 'UpdateTokenConfig' as const, tokenId: _tokenId, config: _config };
}

function storeTupleUpdateTokenConfig(source: UpdateTokenConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeTuple(storeTupleTokenConfig(source.config));
    return builder.build();
}

function dictValueParserUpdateTokenConfig(): DictionaryValue<UpdateTokenConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenConfig(src.loadRef().beginParse());
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
        b_0.storeUint(src.premiumRate, 32);
        let b_1 = new Builder();
        b_1.storeInt(src.fundingFeeGrowth, 128);
        b_1.storeInt(src.rolloverFeeGrowth, 128);
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
    let _premiumRate = sc_0.loadUintBig(32);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fundingFeeGrowth = sc_1.loadIntBig(128);
    let _rolloverFeeGrowth = sc_1.loadIntBig(128);
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
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

export type LiquidityIncreasedEvent = {
    $$type: 'LiquidityIncreasedEvent';
    trxId: bigint;
    opType: bigint;
    account: Address;
    jettonDelta: bigint;
    tlpDelta: bigint;
    tlpPrice: bigint;
    tlpSupply: bigint;
    lpFundAfter: bigint;
}

export function storeLiquidityIncreasedEvent(src: LiquidityIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(919762221, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeCoins(src.tlpDelta);
        b_0.storeUint(src.tlpPrice, 128);
        b_0.storeCoins(src.tlpSupply);
        b_0.storeInt(src.lpFundAfter, 128);
    };
}

export function loadLiquidityIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 919762221) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _jettonDelta = sc_0.loadCoins();
    let _tlpDelta = sc_0.loadCoins();
    let _tlpPrice = sc_0.loadUintBig(128);
    let _tlpSupply = sc_0.loadCoins();
    let _lpFundAfter = sc_0.loadIntBig(128);
    return { $$type: 'LiquidityIncreasedEvent' as const, trxId: _trxId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter };
}

function loadTupleLiquidityIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    return { $$type: 'LiquidityIncreasedEvent' as const, trxId: _trxId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter };
}

function storeTupleLiquidityIncreasedEvent(source: LiquidityIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.tlpDelta);
    builder.writeNumber(source.tlpPrice);
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.lpFundAfter);
    return builder.build();
}

function dictValueParserLiquidityIncreasedEvent(): DictionaryValue<LiquidityIncreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type LiquidityDecreasedEvent = {
    $$type: 'LiquidityDecreasedEvent';
    trxId: bigint;
    opType: bigint;
    account: Address;
    jettonDelta: bigint;
    tlpDelta: bigint;
    tlpPrice: bigint;
    tlpSupply: bigint;
    lpFundAfter: bigint;
}

export function storeLiquidityDecreasedEvent(src: LiquidityDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1105866910, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.jettonDelta);
        b_0.storeCoins(src.tlpDelta);
        b_0.storeUint(src.tlpPrice, 128);
        b_0.storeCoins(src.tlpSupply);
        b_0.storeInt(src.lpFundAfter, 128);
    };
}

export function loadLiquidityDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1105866910) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _jettonDelta = sc_0.loadCoins();
    let _tlpDelta = sc_0.loadCoins();
    let _tlpPrice = sc_0.loadUintBig(128);
    let _tlpSupply = sc_0.loadCoins();
    let _lpFundAfter = sc_0.loadIntBig(128);
    return { $$type: 'LiquidityDecreasedEvent' as const, trxId: _trxId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter };
}

function loadTupleLiquidityDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _jettonDelta = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    return { $$type: 'LiquidityDecreasedEvent' as const, trxId: _trxId, opType: _opType, account: _account, jettonDelta: _jettonDelta, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter };
}

function storeTupleLiquidityDecreasedEvent(source: LiquidityDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.jettonDelta);
    builder.writeNumber(source.tlpDelta);
    builder.writeNumber(source.tlpPrice);
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.lpFundAfter);
    return builder.build();
}

function dictValueParserLiquidityDecreasedEvent(): DictionaryValue<LiquidityDecreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityDecreasedEvent(src.loadRef().beginParse());
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
        b_0.storeUint(1862009286, 32);
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
        b_1.storeCoins(src.entryFundingFeeGrowthAfter);
        b_1.storeCoins(src.entryRolloverFeeGrowthAfter);
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
    if (sc_0.loadUint(32) !== 1862009286) { throw Error('Invalid prefix'); }
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
    let _entryFundingFeeGrowthAfter = sc_1.loadCoins();
    let _entryRolloverFeeGrowthAfter = sc_1.loadCoins();
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
        b_0.storeUint(1805384660, 32);
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
        b_1.storeCoins(src.entryFundingFeeGrowthAfter);
        b_1.storeCoins(src.entryRolloverFeeGrowthAfter);
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
    if (sc_0.loadUint(32) !== 1805384660) { throw Error('Invalid prefix'); }
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
    let _entryFundingFeeGrowthAfter = sc_1.loadCoins();
    let _entryRolloverFeeGrowthAfter = sc_1.loadCoins();
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

export type ConfigData = {
    $$type: 'ConfigData';
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasForMintTlp: bigint;
    maxLpNetCap: bigint;
    tlpJetton: Address;
    orderBook: Address;
    claimExecutor: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.minTonsForStorage);
        b_0.storeCoins(src.gasForMintTlp);
        b_0.storeCoins(src.maxLpNetCap);
        b_0.storeAddress(src.tlpJetton);
        let b_1 = new Builder();
        b_1.storeAddress(src.orderBook);
        b_1.storeAddress(src.claimExecutor);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _minTonsForStorage = sc_0.loadCoins();
    let _gasForMintTlp = sc_0.loadCoins();
    let _maxLpNetCap = sc_0.loadCoins();
    let _tlpJetton = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _orderBook = sc_1.loadAddress();
    let _claimExecutor = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForMintTlp: _gasForMintTlp, maxLpNetCap: _maxLpNetCap, tlpJetton: _tlpJetton, orderBook: _orderBook, claimExecutor: _claimExecutor };
}

function loadTupleConfigData(source: TupleReader) {
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasForMintTlp = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _orderBook = source.readAddress();
    let _claimExecutor = source.readAddress();
    return { $$type: 'ConfigData' as const, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, minTonsForStorage: _minTonsForStorage, gasForMintTlp: _gasForMintTlp, maxLpNetCap: _maxLpNetCap, tlpJetton: _tlpJetton, orderBook: _orderBook, claimExecutor: _claimExecutor };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasForMintTlp);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.orderBook);
    builder.writeAddress(source.claimExecutor);
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

export type GlobalPoolData = {
    $$type: 'GlobalPoolData';
    tlpSupply: bigint;
    protocolTradingFee: bigint;
    globalLPFund: bigint;
    globalLPUnrealizedPnl: bigint;
    globalLpFundingFeeGrowth: bigint;
    globalRolloverFeeGrowth: bigint;
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
}

export function storeGlobalPoolData(src: GlobalPoolData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tlpSupply);
        b_0.storeCoins(src.protocolTradingFee);
        b_0.storeInt(src.globalLPFund, 128);
        b_0.storeInt(src.globalLPUnrealizedPnl, 128);
        b_0.storeCoins(src.globalLpFundingFeeGrowth);
        b_0.storeCoins(src.globalRolloverFeeGrowth);
        b_0.storeCoins(src.globalPerpNetValue);
        b_0.storeCoins(src.globalPerpSingleValue);
    };
}

export function loadGlobalPoolData(slice: Slice) {
    let sc_0 = slice;
    let _tlpSupply = sc_0.loadCoins();
    let _protocolTradingFee = sc_0.loadCoins();
    let _globalLPFund = sc_0.loadIntBig(128);
    let _globalLPUnrealizedPnl = sc_0.loadIntBig(128);
    let _globalLpFundingFeeGrowth = sc_0.loadCoins();
    let _globalRolloverFeeGrowth = sc_0.loadCoins();
    let _globalPerpNetValue = sc_0.loadCoins();
    let _globalPerpSingleValue = sc_0.loadCoins();
    return { $$type: 'GlobalPoolData' as const, tlpSupply: _tlpSupply, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function loadTupleGlobalPoolData(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _protocolTradingFee = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    let _globalPerpNetValue = source.readBigNumber();
    let _globalPerpSingleValue = source.readBigNumber();
    return { $$type: 'GlobalPoolData' as const, tlpSupply: _tlpSupply, protocolTradingFee: _protocolTradingFee, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue };
}

function storeTupleGlobalPoolData(source: GlobalPoolData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.protocolTradingFee);
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLPUnrealizedPnl);
    builder.writeNumber(source.globalLpFundingFeeGrowth);
    builder.writeNumber(source.globalRolloverFeeGrowth);
    builder.writeNumber(source.globalPerpNetValue);
    builder.writeNumber(source.globalPerpSingleValue);
    return builder.build();
}

function dictValueParserGlobalPoolData(): DictionaryValue<GlobalPoolData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGlobalPoolData(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalPoolData(src.loadRef().beginParse());
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
        b_0.storeCoins(src.entryFundingFeeGrowth);
        b_0.storeCoins(src.entryRolloverFeeGrowth);
    };
}

export function loadPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadUintBig(64);
    let _margin = sc_0.loadCoins();
    let _size = sc_0.loadCoins();
    let _entryPrice = sc_0.loadUintBig(128);
    let _entryFundingFeeGrowth = sc_0.loadCoins();
    let _entryRolloverFeeGrowth = sc_0.loadCoins();
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
    globalPerpNetValue: bigint;
    globalPerpSingleValue: bigint;
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.globalPerpNetValue);
        b_0.storeCoins(src.globalPerpSingleValue);
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_1.storeBit(false); }
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalPosition(src.globalPosition)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _globalPerpNetValue = sc_0.loadCoins();
    let _globalPerpSingleValue = sc_0.loadCoins();
    let _perpPosition = sc_0.loadBit() ? loadDirectionPerpPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalLPPosition = sc_1.loadBit() ? loadGlobalLPPosition(sc_1) : null;
    let _globalPosition = sc_1.loadBit() ? loadGlobalPosition(sc_1) : null;
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
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
    return { $$type: 'PerpPositionData' as const, globalPerpNetValue: _globalPerpNetValue, globalPerpSingleValue: _globalPerpSingleValue, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
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
    const __code = Cell.fromBase64('te6ccgECewEAJSwAART/APSkE/S88sgLAQIBYgIDA+rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4IJ1BAUCASBcXQRuAZIwf+BwIddJwh+VMCDXCx/eIIIQOlpTlbqPCDDbPGwZ2zx/4CCCEOZCTIK64wIgghD+sqdmugYHCAkBRMj4QwHMfwHKABEYERcRFhEVERQRExESEREREFXg2zzJ7VQhAfTTHwGCEDpaU5W68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gDUAdD6APoA+gD6AAoD9BEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OESAODREfDQwRHgwLER0LChEcCgkRGwkIERoIBxEZBwYRGAYFESAFBBEfBAMRHgMCER0CAREcAREb2zw9Pj4+Pj4+Pj6IDgsMAjIw0x8BghDmQkyCuvLggdMP2zwQmmwa2zx/eg0EtI6yMNMfAYIQ/rKnZrry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLgIMAAItdJwSGwklt/4CCCEFUj0R66jwUw2zxsGOAgghD/V+VXuhITFBUAFtMfMBBZEFgQVxBWACQAAAAAY29uZmlnIHVwZGF0ZWQBgg8RGA8REREXEREREBEWERAPERUPERERFBERERARExEQDxESDxBvEG4QTRA8S6AQaRBIEDdGUBAkECP4QgF/bds8OALwERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEhAwIRIAIBER8BER7bPAcRHAcGERsGDg8AFPhCVhgBxwXy4IQD9AURGgUEERkEAxEYAwIRIQIBESABER+AEBEfyFWA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JqigLlYnoKkEDlYmoFYkViRWKo4UVidWEaFSMKiCMA3gtrOnZAAAqQSOFFYQViihUjCogjAN4Lazp2QAAKkE4iNWKagBESUBESOgAREiAagtAvaCMGdlx5P6EAedqhqpBAERIqBWKIFvuxEkoLkBESIB8vRWJoFDoBEfqFYhL6iCMA3gtrOnZAAAqQS+AREeAfL0ViaOFVcVVxVXFVcVVxVXFShWIFYbKVFpoOMOEDpJgBBnBhEcBgURGwUEERIEAxERAwIREAJQ/oEBCw4uLwCQPz8/Pz8/KFYgVhspUVmgERQRHBEUERMRGxETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNAxESAwIREQIBERABBQ8GBPbIVbAQbBBbEEoQOUh82zzIVVAH2zzJAczJTzBWHAEgbpUwWfRZMJRBM/QT4oAQAcgBAfQAyQIRIgJWGgEgbpUwWfRbMJRBM/QX4oAQIgJWEFRNMC8CAREnAQrIVVDbPMkCER4CFVYYASBulTBZ9FswlEEz9BfigBBUd2VQUFIwAfrIVSBa+gISygDLf8kCER8CVhgBIG6VMFn0WzCUQTP0F+IRFxEyERcRFhExERYRFREwERURFBEvERQRExEuERMREhEtERIREREsEREREBErERAPESoPDhEpDg0RKA0MEScMCxEmCwoRJQoJESQJCBEjCAcRIgcGESIGBREhBTED+gQRHwQDESADAgERHQERG9s8VhShgSTVIcIA8vRwcVYccFYfyFUgghDvAcK0UATLHxLLPwH6Ass/yVYaVTAQJBAjbW3bPBEXESURFxEWETIRFhEVETERFREUETARFBETER0RExESES8REhERES4REREQESkREA8RLQ8OERsOVFYyAvoNERwNDBEoDAsRHgsKESwKCRErCQgRIAgHEScHBhEjBgURJAUEESIEAxEhAwIRHwJWLAIBESsBEScQ3hDNyBEcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAKERcKChEWCjM0AfaCEG78AcYBER3LHwERGwHLPwERGQHLPwERFwHLBwERFQHLPwEREyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREQHLDx/KAB3Kf1AL+gIZyn9QB/oCBcjLfxTLfxLK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VVAH2zzJAczJAhERAhVWHlBQUQAE8vQAJlBWyz9QA/oCAfoCy38B+gIB+gIC/gEgbpUwWfRZMJRBM/QT4oAQAcgBAfQAyQIRJAJWHAEgbpUwWfRbMJRBM/QX4oAQVhNURjAqAlYmAgERKQEGyFVQ2zzJAhEgAlYaASBulTBZ9FswlEEz9BfigBBUfLrIVSBa+gISygDLf8kCESECVhoBIG6VMFn0WzCUQTP0F+JSUwAoUGX6AlAD+gIB+gIB+gJY+gIB+gIC+hEXETQRFxEWETMRFhEVETIRFREUETERFBETETARExESES8REhERES4REREQES0REA8RLA8OESsODREqDQwRKQwLESgLChEnCgkRJgkIESUIBxEkBxYFESMFBBEhBAMRIgMCAREfAREd2zxWFKGBJNUhwgDy9HBxVh5WN1YhVFUARPhBbyQTXwP4J28QIaEgVhW2CFYVAaFwAlYWoRK2CVmhAaAC/MhVIIIQ7wHCtFAEyx8Syz8B+gLLP8lWGlUwECQQI21t2zwRGREfERkRGBEfERgRFxEfERcRFhE0ERYRFREuERURFBEpERQRExEyERMREhEsERIRERExEREREBEeERAPESoPDhEkDg0RIg0MESEMCxEzCwoRMAoJES8JCBEtCFZXAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AFgC+gcRHQcGESMGBREgBQQRKAQDEScDAhEmAlYwAgERLAERJhDvEN4QvBCryBEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAhEXAgIRFgIREREVEREMERQMERERExERWVoAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwB9IIQa5v71AERH8sfAREdAcs/AREbAcs/AREZAcsHAREXAcs/AREVINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARETAcsPARERAcoAH8p/UA36AhvKf1AJ+gIHyMt/Fst/FMp/Esp/AfoCAfoCAfoCWPoCyFADWwBEDxESDwwREQwBERABEN8QfhBdEEwQKxBKEFlQhxA1ECQQIwBg+gJQA/oCUAP6AlAD+gJQA/oCUAP6AhPKABPLfxPKf8hQBPoCFMp/yVjMyQHMyQHMAgEgXl8CASBoaQKFuX+Ns8ERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbIGHVgAgEgYWIAKoAQIgKDBkEz9A5voZQB1wEwkltt4gIBYmNkAhm2Qttnm2eNkQ2RDZEQdWcCGKrh2zzbPGyIbIhsiHVlAhipHds82zxXEF8PbIF1ZgAgVhRWFFYUVhRWFFYSVhxWHAAEVhcAEFR8ulR8ulPLAgEgamsCASBxcgPRt1EEDdJGDbHDhBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERxbZ4Ii4iMiIuIiwiMCIsIioiLiIqIigiLCIoIiYiKiImIiQiKCIkIiIiJiIiIiAiJCIgHiIiHhwiIByqO7Z42erZKwdWxtAN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lAD3m0hbrOPWSaAECRZ9A9voZIwbd8gbpIwbZfQ9AQBMW8B4iBus481MSBu8tCAbyGBAQsCIG7y0IASWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOKSMDHikTHiJIAQI1n0D2+hkjBt325ubwB6AiBukjBtjhEgbvLQgG8sVVVvBlVQbwZvAuIBIG6SMG2ZIG7y0IBvI28D4gIgbpIwbZkgbvLQgG8mbwbiEgAc0z/6APoA03/6APoAVVABbCBukjBtndD6ANIA039VIGwTbwPigBBURRRZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIpUTlDE3AAHPoA+gD6APoA+gD6AFVQAgEgc3QCsbUDm2eCIuIjAiLiIsIi4iLCIqIiwiKiIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ4riC+HtkCQN0kYNsyQN3loQDeUt4TxEDdJGDbvQdXYAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtVzN3WEpLcDQ4aHBQY0dkYjFHUDVhaEpVN1hnWGFvQnNMcTlRN1JHUTdBdGqCACrO1E0NQB+GPSAAGOtNs8VxgRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4ImBAQHXAAEB0ds8d3gBOoAQVhACWfQPb6GSMG3fIG6SMG2Oh9DbPGwZbwniegHi+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gDUAdD6APoA+gD6ANMf9AR5ALowggpiWgCCEAVdSoCCCJiWgCCCKCOG8m/BAACAZG1wVHAAVHAAIHFtbW1t+EL4QvhC+EIDERcDAhEWAhEVAxEUAwIREwIREgMREQMCERACDxA+TNsQOkiXEDZEUwIAsvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gDUMND6ANJ/0n/6APoA+gD6ANM/9AT0BPQE1DDQ9AQwERQRGBEUERQRFxEUERQRFhEUERQRFREUACzUAdAB0gD6APoA0w/6ANMf0x/TH1WA');
    const __system = Cell.fromBase64('te6cckECfQEAJTYAAQHAAQEFoOi/AgEU/wD0pBP0vPLICwMCAWIEXQPq0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCdwVaBG4BkjB/4HAh10nCH5UwINcLH94gghA6WlOVuo8IMNs8bBnbPH/gIIIQ5kJMgrrjAiCCEP6yp2a6BggLEQH00x8BghA6WlOVuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA1AHQ+gD6APoA+gAHABbTHzAQWRBYEFcQVgP0ERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RIA4NER8NDBEeDAsRHQsKERwKCREbCQgRGggHERkHBhEYBgURIAUEER8EAxEeAwIRHQIBERwBERvbPD0+Pj4+Pj4+PogNCQoAJAAAAABjb25maWcgdXBkYXRlZAGCDxEYDxERERcREREQERYREA8RFQ8REREUEREREBETERAPERIPEG8QbhBNEDxLoBBpEEgQN0ZQECQQI/hCAX9t2zxXAjIw0x8BghDmQkyCuvLggdMP2zwQmmwa2zx/fAwC8BEXESERFxEWESARFhEVER8RFREUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRIQMCESACAREfAREe2zwHERwHBhEbBg0OABT4QlYYAccF8uCEA/QFERoFBBEZBAMRGAMCESECAREgAREfgBARH8hVgNs8yRA3AhEXAgERFgEgbpUwWfRbMJRBM/QX4ogOERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYfEE4QPRAsEFsQWhBZEFgQVxBWFEMw+EIBf23bPA8QVwA+yFAJzxbJUAnMFsoAUAT6Alj6AssPAfoCyx8Syx/LHwAwAAAAAHRva2VuIGNvbmZpZyB1cGRhdGVkBLSOsjDTHwGCEP6yp2a68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS4CDAACLXScEhsJJbf+AgghBVI9Eeuo8FMNs8bBjgIIIQ/1flV7oSExQgAb6CAKD3+EJWGQHHBfL0LcIAjslwcFqAQBEQyFUgghBd1YRhUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLJVhkEUP8QJBAjbW3bPHALkVvif1gAetMfAYIQVSPRHrry4IHSANM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANM/9AT6APoAVXAD0DJXEIIAoPf4QlYeAccF8vRwJ4AQgwZZ9IZvpSCWUCPXATBYlmwhbTJtAeKQiuhbVhABERChARERAaBWEFAOoSBWFqiCEDuaygCpBFHuoA6hARERAaAEjoYQP14r2zyOhhA/XivbPOJ/FRYbAOorgBAjWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOOMCBu8tCAbyMBjhESoaiCMA3gtrOnZAAAqQQSoI4RWKGogjAN4Lazp2QAAKkEEqDiAZFb4oAQKQKDBkEz9HxvpSCWUCPXATBYlmwhbTJtAeID9lPtoHBWFiKhtgkigVxlArvy9FYRwACbMIIwDeC2s6dkAACOE4ED6KiCMA3gtrOnZAAAqFYRqQTiIYED6KiCMA3gtrOnZAAAqCGpBHF/bXDIydAoUTlRNwPIVVDbPMlWFgNWG0EzFEMwbW3bPBEQIqARElYQoBEXER0RFxdYGADIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgP+ERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERHRERERARHBEQDxEbDw4RGg4NERkNDAsRHQsKERgKCREbCQgRGggHERkHBgURHQUEERgEAxEbAwIRGgIBERkB2zxWFaFWEqFwcX8BERxWHVYhViBWJMhVUNs8yVYZBFAdGQLeERwBECQQI21t2zwEERwEcQQDERsDAhEaAgERGQERHFPKECPIVXDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbFVVWBoAeoIQNtJ1LVAJyx8Xyz8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6Ast/AfoCyn8B8FPtoIED6KiCMA3gtrOnZAAAqFYRqQRTAaiCODY1ya3F3qAAAKkEERBWEKEREiKhERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERHRERERARHBEQDxEbDw4RGg4NERkNDAsRHQsKERgKCREbCRwEuAgRGggHERkHBgURHQUEERgEAxEbAwIRGgIBERkB2zxWFaFwc3ABERxWHVYfViJWJMhVUNs8yVYZBBEcARAkECNtbds8BBEcBHIEAxEbAwIRGgIBERwBERlTyhA0UB1YHgA0ghDNYza8UAfLHxXKABPLP8t/AfoCAfoCyz8BmshVcNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVUUHwB6ghBB6jCeUAnLHxfLPxXLB1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAfoCy38B+gLKfwTAj9Yw2zxsHjKCAKD3+EJWJQHHBfL0DYAQU7ODBiFulVtZ9FswmMgBzwFBM/RD4ivACpF/kyvAC+KOmwSWUhW+8uZsllIVu/LmbOJLoBlACAYFBAPbPOMOf+CCEJRqmLa6ISIyVgDG0x8BghD/V+VXuvLggdM/0wfTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6APoA03/SANM/03/TH9QB0NJ/0n8wEC4QLRAsECsQKhApECgQJxAmECUQJBAjAtxWGYAQKFn0D2+hkjBt3yBukjBtjofQ2zxsGW8J4oFsliFus/L0IG7y0IBvKTiCAI9uUAfy9CrCAI4iU6mogjAN4Lazp2QAAKkEIIF6ZAe+FvL0BIFazQS7E/L0EpIzM+JWE4AQLVn0D2+hkjBt33wjA/wgbpIwbZfQ9AQBMW8B4iBus5cgbvLQgG8hkjBt4iCBAQsvWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOIgbrOXIG7y0IBvLJ0wcFRwAFMAcFRwAFMA4lYXllR7qVR7qZZUdUNUdUPiI8AAlzVWJqQRJwXeViRtbSQC/oAQViBZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrOXIG7y0IBvJpcwcFRwAFMA4lYjlANWIaCWAlYhoEAT4lMTtglQJKG2CyFWIaiCMA3gtrOnZAAAqQQjViKogjAN4Lazp2QAAKkEXLYJUAahAREwAaBWLyWhtgtYoQERMAFvJQP+oFYrgBBWJln0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPiIG6zlyBu8tCAbyOUMHBwIeJwViUkwgCUVigkupFw4uMAIMIAjhQzUjKoIlYlqKBdoKkEWqBWJrNAA5Ew4nAgVifCAJJXI+MNViRQDaEuqIIwDeC2s6dkAACpBCYnKACCMSNWJrYIViiOE1YlI6FSEKiCMA3gtrOnZAAAqQSOEyJWJqFSEKiCMA3gtrOnZAAAqQTiUSGhUFWhIMAAknAz3gQAdltWJVYlqFYhqIIwZ2XHk/oQB52qGqkEIBEjqIIQO5rKAKkEViIhoQEROgGgIVY6oAEROQGgETgROREiAfZWI1AMoS6ogjAN4Lazp2QAAKkELxEoLKAtoSGhAREQAaAgESihUu6oViZWJqigLlYnoKkEDlYmoFYkViRWKo4UVidWEaFSMKiCMA3gtrOnZAAAqQSOFFYQViihUjCogjAN4Lazp2QAAKkE4iNWKagBESUBESOgAREiAagpAvaCMGdlx5P6EAedqhqpBAERIqBWKIFvuxEkoLkBESIB8vRWJoFDoBEfqFYhL6iCMA3gtrOnZAAAqQS+AREeAfL0ViaOFVcVVxVXFVcVVxVXFShWIFYbKVFpoOMOEDpJgBBnBhEcBgURGwUEERIEAxERAwIREAJQ/oEBCw4qKwCQPz8/Pz8/KFYgVhspUVmgERQRHBEUERMRGxETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNAxESAwIREQIBERABBQ8GBPbIVbAQbBBbEEoQOUh82zzIVVAH2zzJAczJTzBWHAEgbpUwWfRZMJRBM/QT4oAQAcgBAfQAyQIRIgJWGgEgbpUwWfRbMJRBM/QX4oAQIgJWEFRNMC8CAREnAQrIVVDbPMkCER4CFVYYASBulTBZ9FswlEEz9BfigBBUd2VMTE4sAfrIVSBa+gISygDLf8kCER8CVhgBIG6VMFn0WzCUQTP0F+IRFxEyERcRFhExERYRFREwERURFBEvERQRExEuERMREhEtERIREREsEREREBErERAPESoPDhEpDg0RKA0MEScMCxEmCwoRJQoJESQJCBEjCAcRIgcGESIGBREhBS0D+gQRHwQDESADAgERHQERG9s8VhShgSTVIcIA8vRwcVYccFYfyFUgghDvAcK0UATLHxLLPwH6Ass/yVYaVTAQJBAjbW3bPBEXESURFxEWETIRFhEVETERFREUETARFBETER0RExESES8REhERES4REREQESkREA8RLQ8OERsOUFguAvoNERwNDBEoDAsRHgsKESwKCRErCQgRIAgHEScHBhEjBgURJAUEESIEAxEhAwIRHwJWLAIBESsBEScQ3hDNyBEcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAKERcKChEWCi8xAfaCEG78AcYBER3LHwERGwHLPwERGQHLPwERFwHLBwERFQHLPwEREyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREQHLDx/KAB3Kf1AL+gIZyn9QB/oCBcjLfxTLfxLKfwH6AgH6Alj6Alj6Alj6AshQA/oCUAMwAED6AlAD+gJQA/oCE8oAE8t/E8p/UAP6AhPKf8lYzMkBzABSChEVCgoRFAoCERMCChESCgIREQIOERAOEK9Q3hwQO0oZBQgGUDMHRBQDjCvAA46ObEQ3EGgQJxAmEEUS2zyPMCvABI6NNDRLoBlACAYFBAPbPI6bBJZSFb7y5myWUhW78uZs4kugGUAIBgUEA9s84uIzQEAC4FYWgBAmWfQPb6GSMG3fIG6SMG2Oh9DbPGwZbwnigWyWIW6z8vQgbvLQgG8pNDQ0NYIAj25QBPL0L4AQKln0D2+hkjBt3yBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCyxZ9AtvoZIwbd98NATgIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOIgbrOXIG7y0IBvLJ0wcFRwAFMAcFRwAFMA4lYUllR7qVR7qZZUdUNUdUPigRR2JMIA8vRTQ1YigBBWH1n0D2+hkjBt3yBukjBtjofQ2zxsFm8G4iBus21tbzUB/pcgbvLQgG8mlzBwVHAAUwDiViBQCqErqIIwDeC2s6dkAACpBFYfUAmhK6iCMA3gtrOnZAAAqQRWIo4TViEroVLAqIIwDeC2s6dkAACpBI4TKlYioVLAqIIwDeC2s6dkAACpBOIsViOoVh1WH6CogjBnZceT+hAHnaoaqQRWIKA2AfyCAJ/sU/ugJKFQA6C+8vRRyKAsoVYeoYIwDeC2s6dkAACoViKUCqMrqJNRq6jiGqBWGgERHKBWIZaCF8RlNgCWghA7msoA4qAaqIIQO5rKAKkEAREaAakEViaAEFYiWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrM3AfyXIG7y0IBvI5QwcHAh4nBTc8IAlFYkJL2RcOKOPzFTN7YIViSzjhJTUqFSEKiCMA3gtrOnZAAAqQSOElMloVIQqIIwDeC2s6dkAACpBOJRIaFQVaEgwACScDPeBN4gwgCOEjNSMqhTJKigXaCpBFqgViJAA5Ew4lN0qAERHag4AvqCMGdlx5P6EAedqhqpBCARH6iCEDuaygCpBFYeIaEBETQBoFYcVjSgAREzAaAoVh+hKqAuoaNwVHAAUwBWKo4ZVxxXHFccVxxXHFccVhpWGlYaUayhESEroeMOU/62CQEREAEPobYLL1YnqIIwDeC2s6dkAACpBFYRAREoqDk6AH5XFlcWVxZXFlcWVxZWFFYUVhRRnKERECuhChEhChEXER0RFxEWERwRFhEVERsRFQIRFwIBERYBCREVCREQCQoD5oIwDeC2s6dkAACpBFYnIbYJAREQoQERMgGgViYvobYLAREyoQERMgGgChEdChkIETEIFwYRGQYFERgFBBEXBAMRFgMCERUCAREUARETgQELERPIVbAQbBBbEEoQOUh82zzIVVAH2zzJAczJAhEUAhhWHgFMTDsC6iBulTBZ9FkwlEEz9BPigBAByAEB9ADJAhEjAlYcASBulTBZ9FswlEEz9BfigBBWFAJWJlREMCYCAREdAREmyFVQ2zzJAhEfAgERIQFWGgEgbpUwWfRbMJRBM/QX4oAQVHupyFUgWvoCEsoAy3/JAhEgAlYaAU48AvwgbpUwWfRbMJRBM/QX4hEXETMRFxEWETIRFhEVETERFREUETARFBETES8RExESES4REhERES0REREQESwREA8RKw8OESoODREpDQwRKAwLESYLEHoJESUJCBEkCAcRIwcQRgURIQUEESAEAxEyAwIBER4BERzbPFYUoYEk1SFQPQL6wgDy9HBxVh1WM1YgyFUgghDvAcK0UATLHxLLPwH6Ass/yVYaVTAQJBAjbW3bPHMRGhEZER0RGREYERcRHREXERYRNBEWERURMxEVERQRKhEUERMRKxETERIRKRESERERIhERERARJxEQDxEhDw4RLw4NESwNDBEfDAsRMAtYPgL6ChEyCgkRMQkIES4IBxEjBwYRIAYFER4FBBEkBAMRJgMCESUCVjACAREpAREuEO8Q3hC8EKvIER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wALERcLERYLERULERRTPwBKDRETDQ4REg4MEREMBREQBRCvEE4QTRCsECsQSkkYEEcQNVAEAwLgVhmAEChZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeKBbJYhbrPy9CBu8tCAbyk1NTaCAI9uUAXy9FYTgBAtWfQPb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELL1n0C2+hkjBt33xBBPIgbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4iBus5cgbvLQgG8snTBwVHAAUwBwVHAAUwDiVheWVHupVHupllR1Q1R1Q+KBFHYkwgDy9FYbJLyVVxsiERveViSAEFYgWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiIG6zbW1vQgL8lyBu8tCAbyaXMHBUcABTAOJWH1AIoSmogjAN4Lazp2QAAKkEVh5QB6EpqIIwDeC2s6dkAACpBFYrgBBWJln0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPiIG6zlyBu8tCAbyOUMHBwIeJwViUkwgCUVigkvZFw4uMAIMIAQ0QAhDEjVia2CFYos44TViUjoVIQqIIwDeC2s6dkAACpBI4TIlYmoVIQqIIwDeC2s6dkAACpBOJRIaFQVaEgwACScDPeBAL+jhMzUjKoIlYlqKBdoKkEWqBWJkADkTDicCBWJ8IAjjtbViVWJahWIKiCMGdlx5P6EAedqhqpBCARIKiCEDuaygCpBFYfIaEBEToBoCFWOqABETkBoBE4ETkRH5JXIOJWEFYpjhQuViehVigBqIIwDeC2s6dkAACpBOMNVhFTHkVGAChWJi+hVigBqIIwDeC2s6dkAACpBAT8oCShKaEBERMBoIIA88khwv/y9FYqIbyUVypWKd5WKqEREVYpoVYnVicRFFYToSLCAI5BVxJbVxFXEVceVx9XH1cfUZqgAREjAQqgcFRwAFMABhEoBg8RIw8BESIBAxEhAxEQER8REAUREQUREBBPEC5FAwLjDVYp4w9TSrYJR0lKSwH8Vi2OFFYqVhOhUjCogjAN4Lazp2QAAKkEjhRWElYroVIwqIIwDeC2s6dkAACpBOIjViyoAREnAREpoAERKAGogjBnZceT+hAHnaoaqQQBESagVhKBb7sRJqC5AREkAfL0VhCBQ6ARIqhWI1YRqIIwDeC2s6dkAACpBL4BESEBSAAE8vQAMFcYVxhXGFcYVxhXGClWHCoIViChBlYkoQCuVxJXElcSVxJXElcSKVYcKgdWIKEFViShERYRHxEWERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4CERMCARESAQcREQcQ3xB4BQcGA/5QW6G2CyRWJKiCMA3gtrOnZAAAqQQmViWogjAN4Lazp2QAAKkEXLYJUA2hAREzAaBWMiyhtgtYoQERMwGgEK5JgBcGER8GEF0EERQEAxETAwIREgIBEREBERCBAQsREMhVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERECFVYeTExNACZQVss/UAP6AgH6Ast/AfoCAfoCAv4BIG6VMFn0WTCUQTP0E+KAEAHIAQH0AMkCESQCVhwBIG6VMFn0WzCUQTP0F+KAEFYTVEYwKgJWJgIBESkBBshVUNs8yQIRIAJWGgEgbpUwWfRbMJRBM/QX4oAQVHy6yFUgWvoCEsoAy3/JAhEhAlYaASBulTBZ9FswlEEz9BfiTk8AKFBl+gJQA/oCAfoCAfoCWPoCAfoCAvoRFxE0ERcRFhEzERYRFREyERURFBExERQRExEwERMREhEvERIREREuEREREBEtERAPESwPDhErDg0RKg0MESkMCxEoCwoRJwoJESYJCBElCAcRJAcWBREjBQQRIQQDESIDAgERHwERHds8VhShgSTVIcIA8vRwcVYeVjdWIVBRAET4QW8kE18D+CdvECGhIFYVtghWFQGhcAJWFqEStglZoQGgAvzIVSCCEO8BwrRQBMsfEss/AfoCyz/JVhpVMBAkECNtbds8ERkRHxEZERgRHxEYERcRHxEXERYRNBEWERURLhEVERQRKREUERMRMhETERIRLBESERERMRERERARHhEQDxEqDw4RJA4NESINDBEhDAsRMwsKETAKCREvCQgRLQhYUgL6BxEdBwYRIwYFESAFBBEoBAMRJwMCESYCVjACAREsAREmEO8Q3hC8EKvIER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wACERcCAhEWAhERERUREQwRFAwRERETERFTVQH0ghBrm/vUAREfyx8BER0Byz8BERsByz8BERkBywcBERcByz8BERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMByw8BEREBygAfyn9QDfoCG8p/UAn6AgfIy38Wy38Uyn8Syn8B+gIB+gIB+gJY+gLIUANUAGD6AlAD+gJQA/oCUAP6AlAD+gJQA/oCE8oAE8t/E8p/yFAE+gIUyn/JWMzJAczJAcwARA8REg8MEREMAREQARDfEH4QXRBMECsQShBZUIcQNRAkECMBWI6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwVwE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxYAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AFkAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwBRMj4QwHMfwHKABEYERcRFhEVERQRExESEREREFXg2zzJ7VRbAfYBERgBERcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERH6AsgBERD6AlAO+gJQDPoCUApcALT6AhjLHxb0AFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWPoCyFj6AhLKfxLKf1j6Alj6Alj6Alj6AhPLPxP0ABP0ABT0AALI9ADJWMzJAczJAcwCASBeaQIBIF9hAoW5f42zwRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9sgYd2AAKoAQIgKDBkEz9A5voZQB1wEwkltt4gIBIGJnAgFiY2UCGKrh2zzbPGyIbIhsiHdkACBWFFYUVhRWFFYUVhJWHFYcAhipHds82zxXEF8PbIF3ZgAEVhcCGbZC22ebZ42RDZENkRB3aAAQVHy6VHy6U8sCASBqcgIBIGtxA9G3UQQN0kYNscOEGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRHFtngiLiIyIi4iLCIwIiwiKiIuIioiKCIsIigiJiIqIiYiJCIoIiQiIiImIiIiICIkIiAeIiIeHCIgHKo7tnjZ6tkrB3bHAD3m0hbrOPWSaAECRZ9A9voZIwbd8gbpIwbZfQ9AQBMW8B4iBus481MSBu8tCAbyGBAQsCIG7y0IASWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOKSMDHikTHiJIAQI1n0D2+hkjBt321tbgAc0z/6APoA03/6APoAVVABbCBukjBtndD6ANIA039VIGwTbwPigBBURRRZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIpUTlDE28AHPoA+gD6APoA+gD6AFVQAHoCIG6SMG2OESBu8tCAbyxVVW8GVVBvBm8C4gEgbpIwbZkgbvLQgG8jbwPiAiBukjBtmSBu8tCAbyZvBuISAN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lACASBzdgIBIHR1ABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVczd1hKS3A0OGhwUGNHZGIxR1A1YWhKVTdYZ1hhb0JzTHE5UTdSR1E3QXRqggArG1A5tngiLiIwIi4iLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7ZAkDdJGDbMkDd5aEA3lLeE8RA3SRg270Hd7AqztRNDUAfhj0gABjrTbPFcYERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJgQEB1wABAdHbPHh6AeL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANQB0PoA+gD6APoA0x/0BHkAsvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gDUMND6ANJ/0n/6APoA+gD6ANM/9AT0BPQE1DDQ9AQwERQRGBEUERQRFxEUERQRFhEUERQRFREUALowggpiWgCCEAVdSoCCCJiWgCCCKCOG8m/BAACAZG1wVHAAVHAAIHFtbW1t+EL4QvhC+EIDERcDAhEWAhEVAxEUAwIREwIREgMREQMCERACDxA+TNsQOkiXEDZEUwIBOoAQVhACWfQPb6GSMG3fIG6SMG2Oh9DbPGwZbwnifAAs1AHQAdIA+gD6ANMP+gDTH9Mf0x9VgG/DtUw=');
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
    9429: { message: `send gas not enough` },
    17312: { message: `leverage too high` },
    23245: { message: `greater than max value` },
    23653: { message: `insufficient available jetton` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31332: { message: `less than min value` },
    36718: { message: `disabled token` },
    40940: { message: `margin is too high to liquidate` },
    41207: { message: `invalid sender` },
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
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateConfig","header":978998165,"fields":[{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimExecutor","type":{"kind":"simple","type":"address","optional":false}},{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UpdateTokenConfig","header":3863104642,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"config","type":{"kind":"simple","type":"TokenConfig","optional":false}}]},
    {"name":"ClaimProtocolFee","header":4273121126,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendProtocolFee","header":1574274145,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpdateLiquidityPool","header":1428410654,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LiquidityPoolUpdated","header":3445831356,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdatePerpPosition","header":4283950423,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"PerpPositionUpdated","header":4009870004,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"payout","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityIncreasedEvent","header":919762221,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"LiquidityDecreasedEvent","header":1105866910,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"PerpPositionIncreasedEvent","header":1862009286,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"PerpPositionDecreasedEvent","header":1805384660,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payout","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"lpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpGasConsumption","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minTonsForStorage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"gasForMintTlp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"orderBook","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimExecutor","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxLeverage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maintenanceRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"GlobalPoolData","header":null,"fields":[{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocolTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalPerpNetValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"globalPerpNetValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalPerpSingleValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"configData","arguments":[],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"priceData","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"globalPoolData","arguments":[],"returnType":{"kind":"simple","type":"GlobalPoolData","optional":false}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimProtocolFee"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLiquidityPool"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePerpPosition"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateConfig | UpdateTokenConfig | ClaimProtocolFee | null | UpdateLiquidityPool | UpdatePerpPosition | Deploy) {
        
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
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLiquidityPool') {
            body = beginCell().store(storeUpdateLiquidityPool(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePerpPosition') {
            body = beginCell().store(storeUpdatePerpPosition(message)).endCell();
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
    
    async getPriceData(provider: ContractProvider, tokenId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        let source = (await provider.get('priceData', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getGlobalPoolData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('globalPoolData', builder.build())).stack;
        const result = loadTupleGlobalPoolData(source);
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