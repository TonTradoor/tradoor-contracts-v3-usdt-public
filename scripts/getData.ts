import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig } from '../utils/util';
import { Address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    let accountAddr = await provider.ui().input('account address:');
    const account = accountAddr === '' ? null : Address.parse(accountAddr);
    const tokenId = BigInt(await provider.ui().input('tokenId:'));
    const orderId = BigInt(await provider.ui().input('orderId:'));

    const orderBook = attachOrderBook(provider);
    const pool = attachPool(provider);

    console.log('=================== Config ===================');
    console.log('orderbook config:', await orderBook.getConfigData(account));
    console.log('pool config:', await pool.getConfigData(account));
    console.log('token config:', await pool.getTokenConfig(tokenId));

    console.log('=================== LP ===================');
    // get index
    let lpOrderIdNext = (await orderBook.getLpPositionOrder(0n)).lpPositionOrderIndexNext;
    console.log(`lpOrderIdNext:`, lpOrderIdNext);

    if (orderId < 0) {
        console.log('order not exist');
        return;
    }

    // get order
    let lpOrder = await orderBook.getLpPositionOrder(orderId);
    console.log(`lpOrder:`, lpOrder);

    // get position
    let lpPosition = await pool.getLpPosition(account);
    console.log(`lpPosition:`, lpPosition);

    console.log('=================== Perp ===================');
    // get index
    let orderIdNext = (await orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpPositionOrder(orderId);
    console.log(`order:`, order);

    // get position
    let position = await pool.getPerpPosition(tokenId, account);
    console.log(`position:`, position);

    // get price
    console.log('price', await pool.getPriceData(tokenId));

    let tokenConfig = await pool.getTokenConfig(tokenId);
    console.log('tokenConfig:', tokenConfig);

}
