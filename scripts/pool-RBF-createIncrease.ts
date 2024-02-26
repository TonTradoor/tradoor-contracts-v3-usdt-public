import { Address, toNano } from '@ton/core';
import { Pool, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    let liquidity = 10n**6n;
    // create order
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'CreateIncreaseRBFPositionOrder',
            executionFee: 0n,
            liquidityDelta: liquidity,
        }
    );
    // wait for trx
    await sleep(10000);

    // get index
    let index = await pool.getIncreaseRbfPositionIndexNext();
    console.log(`index:`, index);

    // get order
    let order = await pool.getIncreaseRbfPositionOrder(index);
    console.log(`order:`, order);

}
