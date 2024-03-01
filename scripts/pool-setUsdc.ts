import { Address, toNano } from '@ton/core';
import { Pool, attachMockJetton, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jetton = attachMockJetton(provider);

    const executor = Address.parse(await provider.ui().input('executor address:'));

    // set usdc jetton address to pool
    let poolJettonWalletAddress = await jetton.getGetWalletAddress(pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'SetUSDC',
            usdc: poolJettonWalletAddress
        }
    );
    await sleep(10 * 1000);

    console.log(`set usdc jetton success`);
}
