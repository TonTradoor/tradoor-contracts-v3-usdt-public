import { Address } from '@ton/core';
import { getConfig } from '../utils/util';
import { NetworkProvider } from '@ton/blueprint';
import { Pool } from '../build/Pool/tact_Pool';
import { MockJetton } from '../wrappers/MockJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';

export * from '../build/Pool/tact_Pool';

export function attachPool(provider: NetworkProvider) {
    const poolAddress = Address.parse(getConfig(provider, "pool"));
    return provider.open(Pool.fromAddress(poolAddress));
}

export function attachMockJetton(provider: NetworkProvider) {
    const jettonAddress = Address.parse(getConfig(provider, "sampleJetton"));
    return provider.open(MockJetton.fromAddress(jettonAddress));
}

export async function attachJettonWallet(provider: NetworkProvider, userAddress: Address) {
    const jetton = attachMockJetton(provider);
    let walletAddress = await jetton.getGetWalletAddress(userAddress);
    return provider.open(JettonDefaultWallet.fromAddress(walletAddress));
}