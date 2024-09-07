import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { getLastTransaction, waitForTransaction, attachPool } from '../utils/util';
import { buildOnchainMetadata } from '../contracts/jetton/utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jettonParams = {
        name: 'USDT Tradoor LP 11',
        description: '12345',
        symbol: 'USDT-TLP 11',
        image: 'https://cache.tonapi.io/imgproxy/j-LhzbGesMjo5C17FRTdMQrGT1xCNJCjO4GmNDdY0Dk/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b24uYXBwL21lZGlhL2pldHRvbi0xYmY5NTgxNC03ODdhLTRlMmQtODZlYS1lMGRhZTNhOTQ4NGMuanBnP3c9NjQwJnE9NTA.webp',
        decimals: '9'
    };
    let content = buildOnchainMetadata(jettonParams);

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'JettonUpdateContent',
            jetton_content: content,
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log('Update content successfully!');
    }
}
