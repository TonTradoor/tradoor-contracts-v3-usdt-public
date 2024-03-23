import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const pool = attachPool(provider);
    let orderIdNext = await orderBook.getRbfPositionOrderIndexNext();
    let orderId = orderIdNext - 1n;
    console.log(`orderIdNext:`, orderIdNext);
    console.log(`orderId:`, orderId);

    if (orderId < 0) {
        console.log('order not exist');
        return;
    }

    // get last order
    let order = await orderBook.getRbfPositionOrder(orderId);
    console.log(`order:`, order);

    // execute order
    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteRBFPositionOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: provider.sender().address!!,
            pricesLength: 0n,
            prices: Dictionary.empty()
        }
    );
    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 10);
    if (transDone) {
        console.log(`execute RBF success`);
    }

    // get position
    let position = await pool.getRbfPosition(order!!.account);
    console.log(`position:`, position);

}
