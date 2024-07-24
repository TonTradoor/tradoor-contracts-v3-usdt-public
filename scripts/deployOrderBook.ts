import { toNano } from '@ton/core';
import { OrderBook } from '../wrappers/OrderBook';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");

    const orderBook = provider.open(await OrderBook.fromInit(deployId));

    console.log('deployId:', deployId, 'deploying order_book to address:', orderBook.address);

    setConfig('orderBook', "");
    setConfig('pool', "");

    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 1n,
        }
    );

    await provider.waitForDeploy(orderBook.address);

    setConfig("orderBook", orderBook.address.toString());
}
