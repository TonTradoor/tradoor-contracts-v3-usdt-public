import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const pool = attachPool(provider);
    let orderIdNext = (await orderBook.getLpPositionOrder(0n)).lpPositionOrderIndexNext;
    let orderId = orderIdNext - 1n;
    console.log(`orderIdNext:`, orderIdNext);
    console.log(`orderId:`, orderId);

    if (orderId < 0) {
        console.log('order not exist');
        return;
    }

    // get last order
    let order = (await orderBook.getLpPositionOrder(orderId)).lpPositionOrder;
    console.log(`order:`, order);

    // execute order
    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteLPPositionOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: provider.sender().address!!,
        }
    );
    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`execute LP success`);
    }

    // get position
    let position = await pool.getLpPosition(order!!.account);
    console.log(`position:`, position);

}
