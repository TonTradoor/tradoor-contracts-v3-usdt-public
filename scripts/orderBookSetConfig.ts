import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachMockJetton,
    attachOrderBook,
    attachPool,
    attachTLPJetton,
    getConfig,
    getLastTransaction,
    waitForTransaction
} from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const mockJetton = attachMockJetton(provider);
    const tlpJetton = attachTLPJetton(provider);

    const orderBookMockJettonWallet = await mockJetton.getGetWalletAddress(orderBook.address!!);
    const orderBookTLPJettonWallet = await tlpJetton.getGetWalletAddress(orderBook.address!!);

    const config = getConfig();
    const executorAddrs = config["executors"];
    let executors =  Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
    for (const i in executorAddrs) {
        executors.set(Address.parse(executorAddrs[i]), true);
    }

    const lpExecutorAddrs = config["executors"];
    let lpExecutors =  Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
    for (const i in lpExecutorAddrs) {
        lpExecutors.set(Address.parse(lpExecutorAddrs[i]), true);
    }

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await orderBook.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            orderLockTime: BigInt(config["orderLockTime"]),
            gasConfig: {
                $$type: 'GasConfig',
                lpMinExecutionFee: toNano(config["lpMinExecutionFee"]),
                perpMinExecutionFee: toNano(config["perpMinExecutionFee"]),
                lpGasConsumption: toNano(config["orderbookLpGasConsumption"]),
                perpGasConsumption: toNano(config["orderbookPerpGasConsumption"]),
                poolLpGasConsumption: toNano(config["poolLpGasConsumption"]),
                poolPerpGasConsumption: toNano(config["poolPerpGasConsumption"]),
                minTonsForStorage: toNano(config["minTonsForStorage"]),
                gasTransferJetton: toNano(config["gasTransferJetton"]),
                gasForBurnTlp: toNano(config["gasForBurnTlp"]),
            },
            executorConfig: {
                $$type: 'ExecutorConfig',
                executors: executors,
                lpExecutors: lpExecutors,
                compensator: Address.parse(config["compensator"]),
            },
            contractConfig: {
                $$type: 'ContractConfig',
                tlpWallet: orderBookTLPJettonWallet,
                jettonWallet: orderBookMockJettonWallet,
                pool: pool.address,
            }
        }
    );

    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`set config success`);
    } else {
        console.error(`set config failed`);
    }

}
