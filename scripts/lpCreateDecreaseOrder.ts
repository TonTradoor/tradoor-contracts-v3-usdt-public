import { Address, beginCell, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook } from '../utils/util';
import { JETTON_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);

    /// create order
    let orderId = (await orderBook.getLpPositionOrder(0n)).lpPositionOrderIndexNext;
    let decreaseLiquidity = 4;
    let executionFee = 0.2;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await orderBook.send(
        provider.sender(),
        {
            value: toNano('1'),
        },
        {
            $$type: 'CreateDecreaseLPPositionOrder',
            executionFee: toNano(executionFee),
            liquidityDelta: toUnits(decreaseLiquidity, JETTON_DECIMAL),
            trxId: 1n
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 10);
    if (transDone) {
        console.log(`create decrease LP success`);
    }

    // get index
    let orderIdNext = (await orderBook.getLpPositionOrder(0n)).lpPositionOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getLpPositionOrder(orderId);
    console.log(`order:`, order);

}
