import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);

    const lastTrx = await getLastTransaction(provider, orderBook.address);

    // const executor = Address.parse(await provider.ui().input('executor address:'));
    const executor = Address.parse(getConfig(provider, "executor"));
    const compensator = Address.parse(getConfig(provider, "compensator"));

    const orderBookJettonWallet = await jetton.getGetWalletAddress(orderBook.address!!);

    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            executor: executor,
            enableExecutor: true,
            compensator: compensator,
            enableCompensator: true,
            minTimeDelayExecutor: null,
            maxTimeDelayExecutor: null,
            minTimeDelayTrader: null,
            minPendingTimeDelayCompensator: null,
            minExecutionFee: null,
            gasConsumption: null,
            minTonsForStorage: null,
            usdtWallet: orderBookJettonWallet,
            pool: pool.address
        }
    );

    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 10);
    if (transDone) {
        console.log(`set config success`);
    }

}
