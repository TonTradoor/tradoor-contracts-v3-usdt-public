import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig } from '../utils/util';
import { Address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    const account = Address.parse(await provider.ui().input('account address:'));
    const tokenId = BigInt(await provider.ui().input('tokenId:'));
    const orderId = BigInt(await provider.ui().input('orderId:'));

    const orderBook = attachOrderBook(provider);
    const pool = attachPool(provider);

    // get index
    let orderIdNext = await orderBook.getPerpPositionOrderIndexNext();
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpPositionOrder(orderId);
    console.log(`order:`, order);

    // get position
    let position = await pool.getPerpPosition(tokenId, account);
    console.log(`position:`, position);

    let tokenConfig = await pool.getTokenConfig(tokenId);
    console.log('tokenConfig:', tokenConfig);
}
