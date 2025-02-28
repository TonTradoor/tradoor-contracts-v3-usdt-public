import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachPool,
    getConfig,
    getLastTransaction,
    waitForTransaction,
    attachMultisig
} from '../utils/util';

export async function run(provider: NetworkProvider) {
    const multisig = attachMultisig(provider);
    const pool = attachPool(provider);

    const config = getConfig();

    const lastTrx = await getLastTransaction(provider, multisig.address);
    await multisig.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Request',
            to: pool.address,
            timeout: BigInt(Math.floor(Date.now() / 1000) + 60 * 60),
            manager: Address.parse(config["manager"]),
            compensator: Address.parse(config["compensator"]),
            claimer: Address.parse(config["claimer"])
        }
    );

    const transDone = await waitForTransaction(provider, multisig.address, lastTrx, 20);
    if (transDone) {
        console.log(`request set manager success`);
    } else {
        console.error(`request set manager failed`);
    }

}
