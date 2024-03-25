import { toNano } from '@ton/core';
import { Farm } from '../wrappers/Farm';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const farm = provider.open(await Farm.fromInit());

    await farm.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 1n,
        }
    );

    await provider.waitForDeploy(farm.address);

    // run methods on `farm`
}
