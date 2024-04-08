import { Address, beginCell, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");

    /// create order
    let orderId = await orderBook.getLpPositionOrderIndexNext();
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
            liquidityDelta: toUnits(decreaseLiquidity, jettonDecimal),
            trxId: 1n
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 10);
    if (transDone) {
        console.log(`create decrease LP success`);
    }

    // get index
    let orderIdNext = await orderBook.getLpPositionOrderIndexNext();
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getLpPositionOrder(orderId);
    console.log(`order:`, order);

}
