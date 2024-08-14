import { Address, beginCell, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJettonWallet, attachMockJetton, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { MOCK_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const mockJetton = attachMockJetton(provider);

    const receiver = Address.parse(await provider.ui().input('receiver address:'));
    const amount = await provider.ui().input('mint amount:');

    console.log(`mint MOCK-Jetton to ${receiver} for ${amount}`);

    const lastTrx = await getLastTransaction(provider, mockJetton.address);

    await mockJetton.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'JettonMint',
            origin: provider.sender().address!!,
            amount: toUnits(amount, MOCK_DECIMAL),
            receiver: receiver,
            custom_payload: null,
            forward_ton_amount: 0n,
            forward_payload: beginCell().endCell().asSlice(),
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, mockJetton.address, lastTrx, 20);
    if (transDone) {
        console.log(`mint MOCK-jetton...`);
    }

    // get user jetton balance
    let user0JettonWallet = await attachMockJettonWallet(provider, receiver);
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user MOCK-jetton balance:', user0JettonData.balance);

    console.log('Mint successfully!');
}
