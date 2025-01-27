import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { getLastTransaction, waitForTransaction, attachPool } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    /// create order
    const orderId = BigInt(await provider.ui().input('orderId to cancel:'));

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CancelPerpOrder',
            orderId: orderId,
            trxId: 1n,
            executionFeeReceiver: provider.sender().address!!
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`cancel perp order submitted...`);
    }

    // get index
    let orderIdNext = (await pool.getPerpOrder(0n)).perpOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await pool.getPerpOrder(orderId);
    console.log(`order:`, order);

}
