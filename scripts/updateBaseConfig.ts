import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachMockJetton,
    attachPool,
    attachTLPJetton,
    getConfig,
    getLastTransaction,
    waitForTransaction,
} from '../utils/util';

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
    let members = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
    const membersAddrs = config["members"];
    for (const i in membersAddrs) {
        members.set(Address.parse(membersAddrs[i].address), membersAddrs[i].pubKey);
    }

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateBaseConfig',
            gasConfig: {
                $$type: 'GasConfig',
                mintJettonGas: toNano(config["mintJettonGas"]),
                burnJettonGas: toNano(config["burnJettonGas"]),
                transferJettonGas: toNano(config["transferJettonGas"]),
                createPerpOrderGas: toNano(config["createPerpOrderGas"]),
                cancelPerpOrderGas: toNano(config["cancelPerpOrderGas"]),
                executePerpOrderGas: toNano(config["executePerpOrderGas"]),
                createLiquidityOrderGas: toNano(config["createLiquidityOrderGas"]),
                cancelLiquidityOrderGas: toNano(config["cancelLiquidityOrderGas"]),
                executeLiquidityOrderGas: toNano(config["executeLiquidityOrderGas"]),
                updateConfigGas: toNano(config["updateConfigGas"]),
                claimProtocolFeeGas: toNano(config["claimProtocolFeeGas"]),
                feedPricesGas: toNano(config["feedPricesGas"]),
                minStorageReserve: toNano(config["minStorageReserve"]),
                lpMinExecutionFee: toNano(config["lpMinExecutionFee"]),
                perpMinExecutionFee: toNano(config["perpMinExecutionFee"]),
            },
            executorConfig: {
                $$type: 'ExecutorConfig',
                executors: executors
            },
            contractConfig: {
                $$type: 'ContractConfig',
                multisig: Address.parse(config["multisig"]),
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
