import { toNano } from '@ton/core';
import { OrderBook } from '../wrappers/OrderBook';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig(provider, "deployId");
    const orderBook = provider.open(await OrderBook.fromInit(deployId));

    console.log('deployId:', deployId, 'deploying order book to address:', orderBook.address);

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

    setConfig(provider, "orderBook", orderBook.address.toString());
}
