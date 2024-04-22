import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");
    const executor = Address.parse(getConfig(provider, "executor"));

    const lastTrx = await getLastTransaction(provider, pool.address);

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            executor: executor,
            enableExecutor: true,
            gasConsumption: toNano(0.05),
            minTonsForStorage: toNano(0.03),
            lpBonusFactor: 10n * 10n**9n,
            lpLiquidityFactor: 2n * 10n**9n,
            orderBook: orderBook.address
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`set config success`);
    } else {
        console.error(`set config failed`);
    }

}
