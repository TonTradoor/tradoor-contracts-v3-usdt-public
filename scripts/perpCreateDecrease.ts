import { Address, beginCell, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook } from '../utils/util';
import { JETTON_DECIMAL, ORDER_OP_TYPE_DECREASE_MARKET, PRICE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);

    /// create order
    let orderId = (await orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    let executionFee = 0.1;
    let tokenId = 1;
    let isLong = true;
    let margin = 100;
    let size = 0.02;
    let triggerPrice = 51000;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await orderBook.send(
        provider.sender(),
        {
            value: toNano('1'),
        },
        {
            $$type: 'CreateDecreasePerpPositionOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            marginDelta: toUnits(margin, JETTON_DECIMAL),
            sizeDelta: toUnits(size, JETTON_DECIMAL),
            triggerPrice: toUnits(triggerPrice, PRICE_DECIMAL),
            trxId: 1n
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`create decrease perp success`);
    }

    // get index
    let orderIdNext = (await orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpPositionOrder(orderId);
    console.log(`order:`, order);

}
