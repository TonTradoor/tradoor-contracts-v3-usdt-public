import { toNano } from '@ton/core';
import { OrderBook } from '../wrappers/OrderBook';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const orderBook = provider.open(await OrderBook.fromInit());

    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(orderBook.address);

    // run methods on `orderBook`
}
