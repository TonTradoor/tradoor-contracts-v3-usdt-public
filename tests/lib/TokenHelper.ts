import { Address, beginCell, ContractProvider, fromNano, Sender, toNano } from "@ton/core";
import { fromUnits, toUnits } from '../../utils/util';
import { TestEnv } from "./TestEnv";
import { MockJettonWallet } from "../../wrappers/MockJettonWallet";
import { MockJettonMaster as MockJetton } from '../../wrappers/JettonMock';
import { TLPJettonWallet } from "../../wrappers/TLPJettonWallet";
import { buildOnchainMetadata } from "../../contracts/jetton/utils/jetton-helpers";


export async function updateJettonContent(sender: Sender) {

    const jettonParams = {
        name: 'USDT Tradoor LP',
        description: '12345',
        symbol: 'USDT-TLP',
        image: 'https://cache.tonapi.io/imgproxy/j-LhzbGesMjo5C17FRTdMQrGT1xCNJCjO4GmNDdY0Dk/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b24uYXBwL21lZGlhL2pldHRvbi0xYmY5NTgxNC03ODdhLTRlMmQtODZlYS1lMGRhZTNhOTQ4NGMuanBnP3c9NjQwJnE9NTA.webp',
        decimals: '9'
    };

    const trxResult = await TestEnv.pool.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'JettonUpdateContent',
            jetton_content: buildOnchainMetadata(jettonParams),
        }
    );

    return { trxResult };
}

export async function deployJetton(jettonParams: any) {

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);
    const jetton = TestEnv.blockchain.openContract(await MockJetton.fromInit(TestEnv.deployer.address, content));
    const jettonDeployResult = await jetton.send(
        TestEnv.deployer.getSender(),
        {
            value: toNano('0.1'),
            bounce: true
        },
        {
            $$type: 'Deploy',
            queryId: 0n
        }
    );

    expect(jettonDeployResult.transactions).toHaveTransaction({
        from: TestEnv.deployer.address,
        to: jetton.address,
        deploy: true,
        success: true,
    });
    return jetton;
}

export async function mint(to: Address, amount: string) {
    const mintResult = await TestEnv.jetton.send(
        TestEnv.deployer.getSender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'JettonMint',
            origin: TestEnv.deployer.address,
            amount: toJettonUnits(amount),
            receiver: to,
            custom_payload: null,
            forward_ton_amount: 0n,
            forward_payload: beginCell().endCell().asSlice(),
        }
    );

    expect(mintResult.transactions).toHaveTransaction({
        from: TestEnv.deployer.address,
        to: TestEnv.jetton.address,
        success: true,
    });

    return mintResult;
}

export async function mintXXX(to: Address, amount: string) {
    const mintResult = await TestEnv.xxx_jetton.send(
        TestEnv.deployer.getSender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'JettonMint',
            origin: TestEnv.deployer.address,
            amount: toJettonUnits(amount),
            receiver: to,
            custom_payload: null,
            forward_ton_amount: 0n,
            forward_payload: beginCell().endCell().asSlice(),
        }
    );

    expect(mintResult.transactions).toHaveTransaction({
        from: TestEnv.deployer.address,
        to: TestEnv.xxx_jetton.address,
        success: true,
    });

    return mintResult;
}

export async function getJettonWallet(senderAddress: Address) {
    return TestEnv.blockchain.openContract(await MockJettonWallet.fromInit(senderAddress, TestEnv.jetton.address));
}

export async function getXXXJetttonWallet(senderAddress: Address) {
    return TestEnv.blockchain.openContract(await MockJettonWallet.fromInit(senderAddress, TestEnv.xxx_jetton.address));
}

export async function getTlpWallet(senderAddress: Address) {
    return TestEnv.blockchain.openContract(await TLPJettonWallet.fromInit(senderAddress, TestEnv.tlp.address));
}

export function toTlpUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.tlpDecimal);
}

export function toJettonUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.jettonDecimal);
}

export function fromJettonUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.jettonDecimal);
}

export function fromTlpUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.tlpDecimal);
}

export async function getTonBalance(address: Address) {
    return (await TestEnv.blockchain.getContract(address)).balance;
}

export async function getFriendlyTonBalance(address: Address) {
    return fromNano(await getTonBalance(address));
}

export async function getJettonBalance(address: Address) {
    let jettonWallet = await getJettonWallet(address);
    let jettonWalletSmart = await TestEnv.blockchain.getContract(jettonWallet.address);
    if (jettonWalletSmart.accountState?.type == 'active') {
        let jettonData = await jettonWallet.getGetWalletData();
        return jettonData.balance;
    }
    return 0n;
}

export async function getFriendlyJettonBalance(address: Address) {
    let balance = await getJettonBalance(address);
    return fromUnits(balance, TestEnv.jettonDecimal);
}

export async function getTlpBalance(address: Address) {
    let tlpWallet = await getTlpWallet(address);
    let tlpWalletSmart = await TestEnv.blockchain.getContract(tlpWallet.address);
    if (tlpWalletSmart.accountState?.type == 'active') {
        let tlpData = await tlpWallet.getGetWalletData();
        return tlpData.balance;
    }
    return 0n;
}

export async function getAllBalance() {
    return {
        deployerTonBalance: await getTonBalance(TestEnv.deployer.address),
        poolTonBalance: await getTonBalance(TestEnv.pool.address),
        executorTonBalance: await getTonBalance(TestEnv.executor.address),
        compensatorTonBalance: await getTonBalance(TestEnv.compensator.address),
        user0TonBalance: await getTonBalance(TestEnv.user0.address),
        user1TonBalance: await getTonBalance(TestEnv.user1.address),
        user2TonBalance: await getTonBalance(TestEnv.user2.address),
        user3TonBalance: await getTonBalance(TestEnv.user3.address),
        poolJettonBalance: await getJettonBalance(TestEnv.pool.address),
        user0JettonBalance: await getJettonBalance(TestEnv.user0.address),
        user1JettonBalance: await getJettonBalance(TestEnv.user1.address),
        user2JettonBalance: await getJettonBalance(TestEnv.user2.address),
        user3JettonBalance: await getJettonBalance(TestEnv.user3.address),
        poolTlpBalance: await getTlpBalance(TestEnv.pool.address),
        user0TlpBalance: await getTlpBalance(TestEnv.user0.address),
        user1TlpBalance: await getTlpBalance(TestEnv.user1.address),
        user2TlpBalance: await getTlpBalance(TestEnv.user2.address),
        user3TlpBalance: await getTlpBalance(TestEnv.user3.address),
        claimExecutorJettonBalance: await getJettonBalance(TestEnv.claimExecutor.address),
    }
}

export function toPriceUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.priceDecimal);
}

export function fromPriceUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.priceDecimal);
}