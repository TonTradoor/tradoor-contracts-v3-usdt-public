import { Address, toNano } from '@ton/core';
import { Pool, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    let index = await pool.getIncreaseLpPositionIndexNext();
    let prevIndex = index - 1n;
    console.log(`index:`, index);
    console.log(`prevIndex:`, prevIndex);

    if (prevIndex < 0) {
        console.log('order not exist');
        return;
    }

    // get last order
    let order = await pool.getIncreaseLpPositionOrder(prevIndex);
    console.log(`order:`, order);

    // execute order
    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteIncreaseLPPositionOrder',
            index: prevIndex,
            trxId: 0n
        }
    );
    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone) {
        console.log(`execute increase LP success`);
    }

    // get position
    let position = await pool.getLpPosition(order!!.account);
    console.log(`position:`, position);

}
