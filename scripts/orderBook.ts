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
            maxTimeDelayExecutor: 30n * 60n,
            minTimeDelayTrader: 3n * 60n,
            minExecutionFee: toNano(0.1),
            gasConsumption: toNano(0.05),
            minTonsForStorage: toNano(0.03),
            usdtWallet: orderBookJettonWallet,
            pool: pool.address
        }
    );

    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`set config success`);
    } else {
        console.error(`set config failed`);
    }

}
