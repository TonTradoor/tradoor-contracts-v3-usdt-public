import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const isCancel = await provider.ui().input('cancel? (y/n)') === 'y';
    const compensateId = BigInt(await provider.ui().input('compensateId:'));

    const pool = attachPool(provider);

    const lastTrx = await getLastTransaction(provider, pool.address);
    console.log('isCancel:', isCancel, 'compensateId:', compensateId);

    const sure = await provider.ui().input('confirm? (y/n)') === 'y';
    if (!sure) {
        return;
    }

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1')
        },
        {
            $$type: 'ExecuteOrCancelCompensate',
            isCancel: isCancel,
            compensateId: compensateId,
            trxId: 0n
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`execute compensation success`);
    }

}
