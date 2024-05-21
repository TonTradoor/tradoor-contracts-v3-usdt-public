import { Address, beginCell, fromNano, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachJettonWallet, attachMockJetton, fromUnits, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { JETTON_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const sampleJetton = attachMockJetton(provider);

    const recevier = Address.parse(await provider.ui().input('recevier address:'));
    const tonAmount = await provider.ui().input('ton amount:');
    const jettonAmount = await provider.ui().input('jetton amount:');

    console.log(`transfer to ${recevier} for ton ${tonAmount} and jetton ${jettonAmount}`);

    const lastTrx = await getLastTransaction(provider, sampleJetton.address);

    // get jetton balance
    let senderJettonWallet = await attachJettonWallet(provider, provider.sender().address!!);
    let senderJettonData = await senderJettonWallet.getGetWalletData();
    console.log('sender jetton balance:', fromUnits(senderJettonData.balance, JETTON_DECIMAL));

    await senderJettonWallet.send(
        provider.sender(),
        {
            value: toNano(tonAmount + 0.2),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toUnits(jettonAmount, JETTON_DECIMAL),
            sender: recevier,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(tonAmount),
            forward_payload: beginCell().storeUint(0, 1).endCell()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, sampleJetton.address, lastTrx, 20);
    if (transDone) {
        console.log(`transfer success`);
    }

    // get user jetton balance
    let user0JettonWallet = await attachJettonWallet(provider, recevier);
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', fromUnits(user0JettonData.balance, JETTON_DECIMAL));

    console.log('Transfer successfully!');
}
