import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachPool,
    getLastTransaction,
    waitForTransaction,
} from '../utils/util';
import { Pool } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateContract',
            code: (await Pool.init(0n)).code.asSlice(),
            data: null
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`pool upgrade success`);
    } else {
        console.error(`pool upgrade failed`);
    }

}
