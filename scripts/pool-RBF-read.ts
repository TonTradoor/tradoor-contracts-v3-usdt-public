import { Address, beginCell, toNano } from '@ton/core';
import { Pool, attachJettonWallet, attachMockJetton, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jetton = attachMockJetton(provider);

    // get next index
    let index = await pool.getIncreaseRbfPositionIndexNext();
    let prevIndex = index - 1n;
    console.log(`index:`, index);
    console.log(`prevIndex:`, prevIndex);

    if (prevIndex < 0) {
        console.log('order not exist');
        return;
    }

    // get last order
    let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
    console.log(`order:`, order);

}
