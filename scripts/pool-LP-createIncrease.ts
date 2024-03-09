import { Address, beginCell, toNano } from '@ton/core';
import { Pool, attachJettonWallet, attachMockJetton, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jetton = attachMockJetton(provider);

    /// create order
    const usdtDecimal = 6;
    let margin = toUnits(10, usdtDecimal);
    let liquidity = toUnits(10, usdtDecimal);

    // transfer jetton with create increase LP position order payload
    // get user jetton wallet address
    let user0JettonWallet = await attachJettonWallet(provider, provider.sender().address!!);

    // get user jetton balance
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    let executionFee = toNano('0.5');
    let payloadCell = beginCell().storeInt(2,32).storeInt(margin, 128).storeInt(liquidity, 128).storeCoins(executionFee).endCell();
    let forwardPayload = beginCell().storeRef(payloadCell).endCell();

    let prevIndex = await pool.getDecreaseLpPositionIndexNext();

    const lastTrx = await getLastTransaction(provider, pool.address);
    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano('1.5'),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: liquidity,
            destination: pool.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano('1'),
            forward_payload: forwardPayload
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone) {
        console.log(`create increase success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachJettonWallet(provider, pool.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let index = await pool.getIncreaseLpPositionIndexNext();
    console.log(`prev index:`, prevIndex);
    console.log(`index:`, index);

    // get order
    let order = await pool.getIncreaseLpPositionOrder(prevIndex);
    console.log(`order:`, order);

}
