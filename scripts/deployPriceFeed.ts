import { toNano } from '@ton/core';
import { PriceFeed } from '../wrappers/PriceFeed';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const priceFeed = provider.open(await PriceFeed.fromInit());

    await priceFeed.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(priceFeed.address);

    // run methods on `priceFeed`
}
