import { Address, toNano } from '@ton/core';
import { Pool, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    // get last index
    let index = await pool.getIncreaseRbfPositionIndexNext();
    console.log(`index:`, index);

    // get last order
    let order = await pool.getIncreaseRbfPositionOrder(index);
    console.log(`order:`, order);

    // execute order
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteIncreaseRBFPositionOrder',
            index: index
        }
    );
    // wait for trx
    await sleep(10000);

    // get position
    let position = await pool.getFundPosition(order!!.account);
    console.log(`position:`, position);

}
