import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getLastTransaction, waitForTransaction } from '../utils/util';


export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const tokenId = BigInt(await provider.ui().input('tokenId:'));

    console.log(`Delist token[${tokenId}]`);
    const sure = await provider.ui().input('confirm? (y/n)') === 'y';
    if (!sure) {
        return;
    }
    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'DelistToken',
            tokenId: tokenId,
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`Delist token[${tokenId}] done`);
    } else {
        console.error(`Delist token[${tokenId}] failed`);
    }


}
