import { toNano } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { NetworkProvider } from '@ton/blueprint';
import { setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = provider.open(await Pool.fromInit());

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(pool.address);
    console.log('pool deployed: ', pool.address);
    
    setConfig(provider, "pool", pool.address.toString());
}
