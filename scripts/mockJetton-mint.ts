import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { MockJetton } from '../wrappers/MockJetton';
import { attachJettonWallet, attachMockJetton } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {
    const sampleJetton = attachMockJetton(provider);

    const recevier = Address.parse(await provider.ui().input('recevier address:'));
    const amount = await provider.ui().input('mint amount:');

    console.log(`mint to ${recevier} for ${amount}`);

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'Mint',
            amount: toNano(amount),
            receiver: recevier
        }
    );

    // get user jetton balance
    let user0JettonWallet = await attachJettonWallet(provider, recevier);
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    console.log('Mint successfully!');
}
