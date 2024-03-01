import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { MockJetton } from '../wrappers/MockJetton';
import { attachJettonWallet, attachMockJetton } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {
    const sampleJetton = attachMockJetton(provider);

    let recevier = provider.sender().address!!;

    console.log('mint to', recevier);

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'Mint',
            amount: toNano('100'),
            receiver: recevier
        }
    );

    // get user jetton balance
    let user0JettonWallet = await attachJettonWallet(provider, recevier);
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    console.log('Mint successfully!');
}
