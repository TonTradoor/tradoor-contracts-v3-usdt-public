import { Address, toNano } from '@ton/core';
import { Pool, attachMockJetton, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jetton = attachMockJetton(provider);

    const lastTrx = await getLastTransaction(provider, pool.address);

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

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone) {
        console.log(`set usdc jetton success`);
    }

    /* =========================== set executor ================================ */

    // const executor = Address.parse(await provider.ui().input('executor address:'));
    const executor = Address.parse(getConfig(provider, "executor"));

    const lastTrx1 = await getLastTransaction(provider, pool.address);
    // set executor
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'SetExecutor',
            executor: executor,
            enable: true
        }
    );

    const transDone1 = await waitForTransaction(provider, pool.address, lastTrx1, 10);
    if (transDone1) {
        console.log(`set executor success`);
    }

}
