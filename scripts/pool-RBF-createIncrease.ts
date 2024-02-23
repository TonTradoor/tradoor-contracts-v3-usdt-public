import { Address, toNano } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const poolAddress = Address.parse(getConfig(provider, "pool"));
    const pool = provider.open(await Pool.fromAddress(poolAddress));
    let liquidity = BigInt(10**6);

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'CreateIncreaseRBFPositionOrder',
            liquidityDelta: liquidity,
        }
    );

    await provider.waitForDeploy(pool.address);
    
    await sleep(3000);

    // get index
    let index = await pool.getIncreaseRbfPositionIndexNext();
    console.log(`index:`, index);

    // get order
    let order = await pool.getIncreaseRbfPositionOrder(index);
    console.log(`order:`, order);

}
