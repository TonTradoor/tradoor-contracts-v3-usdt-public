import { Address, beginCell, toNano } from '@ton/core';
import { Pool, attachJettonWallet, attachMockJetton, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jetton = attachMockJetton(provider);

    /// create order
    let liquidity = 10n**6n;

    // transfer jetton with create increase RBF position order payload
    // get user jetton wallet address
    let user0JettonWallet = await attachJettonWallet(provider, provider.sender().address!!);

    // get user jetton balance
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    let payloadCell = beginCell().storeInt(1,32).storeAddress(provider.sender().address).storeCoins(liquidity).storeCoins(toNano('0.1')).endCell();
    let forwardPayload = beginCell().storeRef(payloadCell).endCell();

    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano('1'),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toNano('10'),
            destination: pool.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano('0.5'),
            forward_payload: forwardPayload
        }
    );

    // wait for trx
    await sleep(10000);

    // get pool jetton wallet address 
    let poolJettonWallet = await attachJettonWallet(provider, pool.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let index = await pool.getIncreaseRbfPositionIndexNext();
    console.log(`index:`, index);

    // get order
    let order = await pool.getIncreaseRbfPositionOrder(index);
    console.log(`order:`, order);

}
