import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const pool = attachPool(provider);

    // get index
    let orderIdNext = await orderBook.getRbfPositionOrderIndexNext();
    let orderId = orderIdNext - 1n;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    if (orderId < 0) {
        console.log('order not exist');
        return;
    }

    // get order
    let order = await orderBook.getRbfPositionOrder(orderId);
    console.log(`order:`, order);

    // get position
    let position = await pool.getRbfPosition(order!!.account);
    console.log(`position:`, position);
}
