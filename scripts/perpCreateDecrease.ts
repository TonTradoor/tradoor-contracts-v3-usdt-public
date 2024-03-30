import { Address, beginCell, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook } from '../utils/util';
import { ORDER_OP_TYPE_DECREASE_MARKET } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");

    /// create order
    let orderId = await orderBook.getPerpPositionOrderIndexNext();
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
            opType: ORDER_OP_TYPE_DECREASE_MARKET,
            tokenId: BigInt(tokenId),
            isLong: isLong,
            marginDelta: toUnits(margin, jettonDecimal),
            sizeDelta: toUnits(size, jettonDecimal),
            triggerPrice: toUnits(triggerPrice, priceDecimal)
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 10);
    if (transDone) {
        console.log(`create decrease perp success`);
    }

    // get index
    let orderIdNext = await orderBook.getPerpPositionOrderIndexNext();
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpPositionOrder(orderId);
    console.log(`order:`, order);

}
