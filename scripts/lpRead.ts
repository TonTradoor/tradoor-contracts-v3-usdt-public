import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig } from '../utils/util';
import { Address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const pool = attachPool(provider);

    const account = Address.parse(await provider.ui().input('account address:'));
    const orderId = BigInt(await provider.ui().input('orderId:'));

    // get index
    let orderIdNext = await orderBook.getLpPositionOrderIndexNext();
    console.log(`orderIdNext:`, orderIdNext);

    if (orderId < 0) {
        console.log('order not exist');
        return;
    }

    // get order
    let order = await orderBook.getLpPositionOrder(orderId);
    console.log(`order:`, order);

    // get position
    let position = await pool.getLpPosition(account);
    console.log(`position:`, position);
}
