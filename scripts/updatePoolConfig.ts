import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachMockJetton,
    attachPool,
    attachTLPJetton,
    getConfig,
    getLastTransaction,
    waitForTransaction,
    toUnits
} from '../utils/util';
import { MOCK_DECIMAL, PERCENTAGE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const mockJetton = attachMockJetton(provider);
    const tlpJetton = attachTLPJetton(provider);

    const poolMockJettonWallet = await mockJetton.getGetWalletAddress(pool.address!!);
    const poolTLPJettonWallet = await tlpJetton.getGetWalletAddress(pool.address!!);

    const config = getConfig();
    const executorAddrs = config["executors"];
    let executors =  Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
    for (const i in executorAddrs) {
        executors.set(Address.parse(executorAddrs[i]), true);
    }

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            orderLockTime: BigInt(config["orderLockTime"]),
            maxLpNetCap: toUnits(config["maxLpNetCap"], MOCK_DECIMAL),
            lpRolloverFeeRate: toUnits(config["lpRolloverFeeRate"], PERCENTAGE_DECIMAL),
            gasConfig: {
                $$type: 'GasConfig',
                lpMinExecutionFee: toNano(config["lpMinExecutionFee"]),
                perpMinExecutionFee: toNano(config["perpMinExecutionFee"]),
                gasForLpTrader: toNano(config["gasForLpTrader"]),
                gasForLpExecutor: toNano(config["gasForLpExecutor"]),
                gasForPerpTrader: toNano(config["gasForPerpTrader"]),
                gasForPerpExecutor: toNano(config["gasForPerpExecutor"]),
                minTonsForStorage: toNano(config["minTonsForStorage"]),
                gasForTransferJetton: toNano(config["gasForTransferJetton"]),
                gasForBurnTlp: toNano(config["gasForBurnTlp"]),
                gasForMintTlp: toNano(config["gasForMintTlp"]),
            },
            executorConfig: {
                $$type: 'ExecutorConfig',
                executors: executors,
                compensator: Address.parse(config["compensator"]),
                claimer: Address.parse(config["claimer"]),
            },
            contractConfig: {
                $$type: 'ContractConfig',
                tlpJetton: tlpJetton.address,
                tlpWallet: poolTLPJettonWallet,
                jettonWallet: poolMockJettonWallet,
            }
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`set config success`);
    } else {
        console.error(`set config failed`);
    }

}
