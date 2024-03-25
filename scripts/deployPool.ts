import { toNano } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig(provider, "deployId");
    const pool = provider.open(await Pool.fromInit(deployId));

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 1n,
        }
    );

    await provider.waitForDeploy(pool.address);
    console.log('pool deployed: ', pool.address);
    
    setConfig(provider, "pool", pool.address.toString());
}
