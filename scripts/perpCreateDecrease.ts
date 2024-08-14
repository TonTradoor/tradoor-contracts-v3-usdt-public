import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { now, getLastTransaction, waitForTransaction, attachPool, toUnits } from '../utils/util';
import { MOCK_DECIMAL, PRICE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    /// create order
    let trxId = BigInt(await provider.ui().input('trxId:'));
    let orderId = (await pool.getPerpOrder(0n)).perpOrderIndexNext;
    let executionFee = 0.1;
    let tokenId = 1;
    let isLong = true;
    let margin = 0;
    let size = 0.01;
    let triggerPrice = 51000;

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('1'),
        },
        {
            $$type: 'CreateDecreasePerpOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            marginDelta: toUnits(margin, MOCK_DECIMAL),
            sizeDelta: toUnits(size, MOCK_DECIMAL),
            triggerPrice: toUnits(triggerPrice, PRICE_DECIMAL),
            requestTime: BigInt(now()),
            trxId: trxId
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create decrease perp success`);
    }

    // get index
    let orderIdNext = (await pool.getPerpOrder(0n)).perpOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await pool.getPerpOrder(orderId);
    console.log(`order:`, order);

}
