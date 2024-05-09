import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { ExecutorParamValue } from '../wrappers/OrderBook';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");
    const executor = Address.parse(getConfig(provider, "executor"));
    const executor1 = Address.parse(getConfig(provider, "executor1"));
    const claimExecutor = Address.parse(getConfig(provider, "claimExecutor"));

    const lastTrx = await getLastTransaction(provider, pool.address);

    let executors = Dictionary.empty(Dictionary.Keys.BigInt(32), ExecutorParamValue)
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

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            executorLength: BigInt(executors.size),
            executors: executors,
            claimExecutor: claimExecutor,
            lpGasConsumption: toNano(0.018),
            perpGasConsumption: toNano(0.038),
            minTonsForStorage: toNano(0.01),
            lpLockTime: 60n * 60n, // 1hour
            lpAddBonusFactor: 1n * 10n**9n,
            lpRemoveBonusFactor: 10n * 10n**9n,
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
