import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachPool,
    getLastTransaction,
    waitForTransaction,
} from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const seqno = BigInt(await provider.ui().input('seqno:'));

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'CancelUpgrade',
            seqno: seqno,
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`cancel pool upgrade success`);
    } else {
        console.error(`cancel pool upgrade failed`);
    }

}
