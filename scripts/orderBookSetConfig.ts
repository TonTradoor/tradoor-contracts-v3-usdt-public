import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';
import { ExecutorParamValue } from '../wrappers/OrderBook';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);

    const orderBookJettonWallet = await jetton.getGetWalletAddress(orderBook.address!!);

    const config = getConfig();
    const executorAddrs = config["executor"];
    let executors =  Dictionary.empty(Dictionary.Keys.BigInt(32), ExecutorParamValue)
    for (const i in executorAddrs) {
        executors.set(BigInt(i), {
            $$type: 'ExecutorParam',
            executor: Address.parse(executorAddrs[i]),
            enable: true
        })
    }

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            executorLength: BigInt(executors.size),
            executors: executors,
            compensator: Address.parse(config["compensator"]),
            minTimeDelayTrader: BigInt(config["minTimeDelayTrader"]),
            lpMinExecutionFee: toNano(config["lpMinExecutionFee"]),
            perpMinExecutionFee: toNano(config["perpMinExecutionFee"]),
            lpGasConsumption: toNano(config["orderbookLpGasConsumption"]),
            perpGasConsumption: toNano(config["orderbookPerpGasConsumption"]),
            poolLpGasConsumption: toNano(config["poolLpGasConsumption"]),
            poolPerpGasConsumption: toNano(config["poolPerpGasConsumption"]),
            minTonsForStorage: toNano(config["minTonsForStorage"]),
            gasTransferJetton: toNano(config["gasTransferJetton"]),
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
