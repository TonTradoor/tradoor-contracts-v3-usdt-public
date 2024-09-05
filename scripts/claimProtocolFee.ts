import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const feeReceiver = await provider.ui().input('feeReceiver:');

    console.log("feeReceiver:", feeReceiver);
    const sure = await provider.ui().input('confirm? (y/n)') === 'y';
    if (!sure) {
        return;
    }

    const pool = attachPool(provider);

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1')
        },
        {
            $$type: 'ClaimProtocolFee',
            feeReceiver: Address.parse(feeReceiver),
            trxId: 0n,
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`claim protocol fee success`);
    }

}
