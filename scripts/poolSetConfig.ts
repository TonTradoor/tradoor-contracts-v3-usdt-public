import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachOrderBook, attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { ExecutorParamValue } from '../wrappers/OrderBook';
import { PERCENTAGE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);

    const config = getConfig();
    const executorAddrs = config["executors"];
    let executors =  Dictionary.empty(Dictionary.Keys.BigInt(32), ExecutorParamValue)
    for (const i in executorAddrs) {
        executors.set(BigInt(i), {
            $$type: 'ExecutorParam',
            executor: Address.parse(executorAddrs[i]),
            enable: true
        })
    }

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            executorLength: BigInt(executors.size),
            executors: executors,
            claimExecutor: Address.parse(config["claimExecutor"]),
            lpGasConsumption: toNano(config["poolLpGasConsumption"]),
            perpGasConsumption: toNano(config["poolPerpGasConsumption"]),
            minTonsForStorage: toNano(config["minTonsForStorage"]),
            lpLockTime: BigInt(config["lpLockTime"]),
            lpAddBonusFactor: toUnits(config["lpAddBonusFactor"], PERCENTAGE_DECIMAL),
            lpRemoveBonusFactor: toUnits(config["lpRemoveBonusFactor"], PERCENTAGE_DECIMAL),
            lpLiquidityFactor: toUnits(config["lpLiquidityFactor"], PERCENTAGE_DECIMAL),
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
