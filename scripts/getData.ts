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
    console.log('pool config:', await pool.getConfigData());
    console.log('=================== LP ===================');
    // get order
    let lpOrder = await orderBook.getLiquidityOrder(orderId);
    console.log(`lpOrder:`, lpOrder);

    // get global pool
    let globalPoolData = await pool.getGlobalPoolData();
    console.log(`globalPoolData:`, globalPoolData);

    console.log('=================== Perp ===================');
    // get index
    let order = await orderBook.getPerpOrder(orderId);
    console.log(`perp order:`, order);

    // get position
    let position = await pool.getPerpPosition(tokenId, account);
    console.log(`position:`, position);

    // get price
    console.log('price', await pool.getPriceData(tokenId));

    let tokenConfig = await pool.getTokenConfig(tokenId);
    console.log('tokenConfig:', tokenConfig);

}
