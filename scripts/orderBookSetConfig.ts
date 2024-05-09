import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';
import { ExecutorParamValue } from '../wrappers/OrderBook';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);

    const lastTrx = await getLastTransaction(provider, orderBook.address);

    // const executor = Address.parse(await provider.ui().input('executor address:'));
    const executor = Address.parse(getConfig(provider, "executor"));
    const executor1 = Address.parse(getConfig(provider, "executor1"));
    
    const orderBookJettonWallet = await jetton.getGetWalletAddress(orderBook.address!!);

    let executors =  Dictionary.empty(Dictionary.Keys.BigInt(32), ExecutorParamValue)
            .set(0n, {
                $$type: 'ExecutorParam',
                executor: executor,
                enable: true
            })
            .set(1n, {
                $$type: 'ExecutorParam',
                executor: executor1,
                enable: true
            });

    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            executorLength: BigInt(executors.size),
            executors: executors,
            maxTimeDelayExecutor: 30n * 60n,
            minTimeDelayTrader: 3n * 60n,
            minExecutionFee: toNano(0.1),
            lpGasConsumption: toNano(0.013),
            perpGasConsumption: toNano(0.015),
            poolLpGasConsumption: toNano(0.016),
            poolPerpGasConsumption: toNano(0.035),
            minTonsForStorage: toNano(0.01),
            gasTransferJetton: toNano(0.025),
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
