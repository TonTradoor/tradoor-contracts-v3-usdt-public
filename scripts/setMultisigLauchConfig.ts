import { Address, Dictionary, toNano } from '@ton/core';
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

    let members = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
    const config = getConfig();
    const memberAddrs = config["members"];
    for (const i in memberAddrs) {
        members.set(Address.parse(memberAddrs[i].address), memberAddrs[i].weight);
    }
    

    const lastTrx = await getLastTransaction(provider, multisig.address);
    await multisig.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'LaunchConfig',
            members: members,
            requiredWeight: config["requiredWeight"]
        }
    );

    const transDone = await waitForTransaction(provider, multisig.address, lastTrx, 20);
    if (transDone) {
        console.log(`request set manager success`);
    } else {
        console.error(`request set manager failed`);
    }

}
