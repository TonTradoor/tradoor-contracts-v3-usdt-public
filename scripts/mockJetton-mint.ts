import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { MockJetton } from '../wrappers/MockJetton';
import { attachJettonWallet, attachMockJetton } from '../wrappers/Pool';
import { getLastTransaction, toUnits, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const sampleJetton = attachMockJetton(provider);

    const recevier = Address.parse(await provider.ui().input('recevier address:'));
    const amount = await provider.ui().input('mint amount:');

    console.log(`mint to ${recevier} for ${amount}`);

    const lastTrx = await getLastTransaction(provider, sampleJetton.address);

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'Mint',
            amount: toUnits(amount, 6),
            receiver: recevier
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, sampleJetton.address, lastTrx, 10);
    if (transDone) {
        console.log(`create decrease LP success`);
    }

    // get user jetton balance
    let user0JettonWallet = await attachJettonWallet(provider, recevier);
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    console.log('Mint successfully!');
}
