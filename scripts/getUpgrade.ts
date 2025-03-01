import { NetworkProvider } from '@ton/blueprint';
import {
    attachPool,
} from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const seqno = BigInt(await provider.ui().input('seqno:'));

    const unlockTime = await pool.getUpgradeUnlockTime(seqno);
    console.log(`unlockTime:`, unlockTime);

    const nextSeqno = await pool.getUpgradeSeqno();
    console.log(`nextSeqno:`, nextSeqno);

}
