import { AccountState, Address, fromNano, toNano } from "@ton/core";
import { fromUnits, toUnits } from "../../utils/util";
import { TestEnv } from "./TestEnv";
import { BlockchainTransaction } from "@ton/sandbox";
import { JettonDefaultWallet } from "../../wrappers/JettonDefaultWallet";


export async function mint(to: Address, amount: string): Promise<BlockchainTransaction[]> {
    const mintResult = await TestEnv.jetton.send(
        TestEnv.deployer.getSender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Mint',
            amount: toJettonUnits(amount),
            receiver: to,
        }
    );

    expect(mintResult.transactions).toHaveTransaction({
        from: TestEnv.deployer.address,
        to: TestEnv.jetton.address,
        success: true,
    });

    return mintResult.transactions;
}

export async function getJettonWallet(senderAddress: Address) {
    return TestEnv.blockchain.openContract(await JettonDefaultWallet.fromInit(senderAddress, TestEnv.jetton.address));
}

export function toJettonUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.jettonDecimal);
}

export function fromJettonUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.jettonDecimal);
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

export async function getAllBalance() {
    return {
        deployerTonBalance: await getTonBalance(TestEnv.deployer.address),
        orderBookTonBalance: await getTonBalance(TestEnv.orderBook.address),
        poolTonBalance: await getTonBalance(TestEnv.pool.address),
        executorTonBalance: await getTonBalance(TestEnv.executor.address),
        compensatorTonBalance: await getTonBalance(TestEnv.compensator.address),
        user0TonBalance: await getTonBalance(TestEnv.user0.address),
        user1TonBalance: await getTonBalance(TestEnv.user1.address),
        orderBookJettonBalance: await getJettonBalance(TestEnv.orderBook.address),
        poolJettonBalance: await getJettonBalance(TestEnv.pool.address),
        user0JettonBalance: await getJettonBalance(TestEnv.user0.address),
        user1JettonBalance: await getJettonBalance(TestEnv.user1.address),
    }
}