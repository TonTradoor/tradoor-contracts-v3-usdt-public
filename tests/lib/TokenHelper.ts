import { Address, fromNano, toNano } from "@ton/core";
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
    let balance = (await TestEnv.blockchain.getContract(address)).balance;
    return fromNano(balance);
}

export async function getJettonBalance(address: Address) {
    let jettonWallet = TestEnv.blockchain.openContract(await JettonDefaultWallet.fromInit(address, TestEnv.jetton.address));
    let jettonData = await jettonWallet.getGetWalletData();
    return jettonData.balance;
}

export async function getFriendlyJettonBalance(address: Address) {
    let jettonWallet = TestEnv.blockchain.openContract(await JettonDefaultWallet.fromInit(address, TestEnv.jetton.address));
    let jettonData = await jettonWallet.getGetWalletData();
    return fromUnits(jettonData.balance, TestEnv.jettonDecimal);
}

