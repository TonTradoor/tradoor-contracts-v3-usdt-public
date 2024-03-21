import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);

    const lastTrx = await getLastTransaction(provider, pool.address);

    // const executor = Address.parse(await provider.ui().input('executor address:'));
    const executor = Address.parse(getConfig(provider, "executor"));

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            gasConsumption: null,
            minTonsForStorage: null,
            rbfLockTime: null,
            bonusFactor: null,
            minLPMargin: null,
            maxLPLeverage: null,
            lpLiquidationFee: null,
            lpMaxRiskRate: null,
            orderBook: orderBook.address
        }
    );

    const transDone1 = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone1) {
        console.log(`set config success`);
    }

}
