import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    getLastTransaction,
    waitForTransaction,
    attachMultisigSigner
} from '../utils/util';

export async function run(provider: NetworkProvider) {

    let addr = Address.parse(await provider.ui().input('addr:'));
    const multisigSigner = attachMultisigSigner(provider, addr);

    const lastTrx = await getLastTransaction(provider, multisigSigner.address);
    await multisigSigner.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        'YES'
    );

    const transDone = await waitForTransaction(provider, multisigSigner.address, lastTrx, 20);
    if (transDone) {
        console.log(`request set manager success`);
    } else {
        console.error(`request set manager failed`);
    }

}
