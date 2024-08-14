import { toNano } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");
    const pool = provider.open(await Pool.fromInit(deployId));

    console.log('deployId:', deployId, 'deploying pool to address:', pool.address);

    setConfig('pool', "");

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
    
    setConfig("pool", pool.address.toString());
}
