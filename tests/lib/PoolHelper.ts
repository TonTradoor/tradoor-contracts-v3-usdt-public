import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { beginCell, Dictionary, Sender, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";
import { OP_INCREASE_AUM, PERCENTAGE_BASIS_POINT } from "../../utils/constants";


export async function stopContract(sender: Sender) {
    let contractStatusBefore = await TestEnv.pool.getStopped();

    const trxResult = await TestEnv.pool.send(
        sender, { value: toNano(0.1) }, 'Stop'
    );

    let contractStatus = await TestEnv.pool.getStopped();

    return {
        trxResult,
        contractStatusBefore,
        contractStatus,
    };
}

export async function resumeContract(sender: Sender) {
    let contractStatusBefore = await TestEnv.pool.getStopped();

    const trxResult = await TestEnv.pool.send(
        sender, { value: toNano(0.1) }, 'Resume'
    );

    let contractStatus = await TestEnv.pool.getStopped();
    return {
        trxResult,
        contractStatusBefore,
        contractStatus,
    };
}

export async function claimProtocolFee(sender: Sender, gas: number, feeReceiver: SandboxContract<TreasuryContract>) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.pool.send(
        sender, { value: toNano(gas) }, { $$type: 'ClaimProtocolFee', trxId: 0n, feeReceiver: feeReceiver.address }
    );

    let balanceAfter = await getAllBalance();

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
    };
}

export async function increaseAUM(sender: Sender, gas: number, amount: number) {
    let balanceBefore = await getAllBalance();

    const jettonWallet = await getJettonWallet(sender.address!);
    const trxResult = await jettonWallet.send(
        sender,
        {
            value: toNano(0.15),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 1n,
            amount: toJettonUnits(amount),
            destination: TestEnv.pool.address,
            response_destination: sender.address!!,
            custom_payload: null,
            forward_ton_amount: toNano(0.1),
            forward_payload:
                beginCell()
                    .storeUint(1, 1)
                    .storeRef(beginCell().storeUint(OP_INCREASE_AUM, 8).endCell())
                    .endCell().asSlice()
        }
    );

    let balanceAfter = await getAllBalance();

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
    };
}

export async function feedPrices(sender: Sender, gas: number, lpFundingFeeGrowth: bigint, rolloverFeeGrowth: bigint, prices: Dictionary<number, bigint>) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.pool.send(
        sender, { value: toNano(gas) }, { $$type: 'FeedPrices', trxId: 0n, lpFundingFeeGrowth, rolloverFeeGrowth, prices }
    );

    let balanceAfter = await getAllBalance();

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
    };
}

export async function updateBaseConfig(sender: Sender) {
    let executors = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
            .set(TestEnv.executor.address, true)
            .set(TestEnv.executor1.address, true);

    const trxResult = await TestEnv.pool.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateBaseConfig',
            gasConfig: {
                $$type: 'GasConfig',
                mintJettonGas: toNano(0.04),
                burnJettonGas: toNano(0.03),
                transferJettonGas: toNano(0.04),
                createPerpOrderGas: toNano(0.03),
                cancelPerpOrderGas: toNano(0.03),
                executePerpOrderGas: toNano(0.05),
                createLiquidityOrderGas: toNano(0.03),
                cancelLiquidityOrderGas: toNano(0.03),
                executeLiquidityOrderGas: toNano(0.05),
                updateConfigGas: toNano(0.04),
                claimProtocolFeeGas: toNano(0.03),
                feedPricesGas: toNano(0.05),
                minStorageReserve: toNano(0.01),
                lpMinExecutionFee: toNano(0.05),
                perpMinExecutionFee: toNano(0.05),
            },
            executorConfig: {
                $$type: 'ExecutorConfig',
                executors: executors
            },
            contractConfig: {
                $$type: 'ContractConfig',
                multisig: TestEnv.multisig.address,
                tlpJetton: TestEnv.tlp.address,
                tlpWallet: TestEnv.poolTlpWallet.address,
                jettonWallet: TestEnv.poolJettonWallet.address,
            }
        }
    );

    return {trxResult}
}


export async function listToken(sender: Sender, token: any) {
    const { tokenId, name, tradingFeeRate, lpTradingFeeRate } = token;
    let tokenConfigBefore = (await TestEnv.pool.getTokenConfig(tokenId));
    const trxResult = await TestEnv.pool.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'ListToken',
            tokenId: tokenId,
            config: {
                $$type: 'TokenConfig',
                name: name,
                enable: true,
                maxLeverage: 105n,
                liquidationFee: toJettonUnits(0.2), // 0.2U
                maintenanceRate: BigInt(0.005 * PERCENTAGE_BASIS_POINT), // 0.5%
                tradingFeeRate: BigInt(tradingFeeRate * PERCENTAGE_BASIS_POINT), // 0.1%
                lpTradingFeeRate: BigInt(lpTradingFeeRate * PERCENTAGE_BASIS_POINT), // 60%
            }

        }
    );
    let tokenConfigAfter = (await TestEnv.pool.getTokenConfig(tokenId));

    return {
        trxResult,
        tokenConfigBefore,
        tokenConfigAfter
    };
}

export async function disbaleToken(sender: Sender, token: any) {
    const { tokenId, name, tradingFeeRate, lpTradingFeeRate } = token;
    let tokenConfigBefore = (await TestEnv.pool.getTokenConfig(tokenId));
    const trxResult = await TestEnv.pool.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'ListToken',
            tokenId: tokenId,
            config: {
                $$type: 'TokenConfig',
                name: name,
                enable: false,
                maxLeverage: 105n,
                liquidationFee: toJettonUnits(0.2), // 0.2U
                maintenanceRate: BigInt(0.005 * PERCENTAGE_BASIS_POINT), // 0.5%
                tradingFeeRate: BigInt(tradingFeeRate * PERCENTAGE_BASIS_POINT), // 0.1%
                lpTradingFeeRate: BigInt(lpTradingFeeRate * PERCENTAGE_BASIS_POINT), // 60%
            }

        }
    );
    let tokenConfigAfter = (await TestEnv.pool.getTokenConfig(tokenId));

    return {
        trxResult,
        tokenConfigBefore,
        tokenConfigAfter
    };
}

export async function delistToken(sender: Sender, tokenId: bigint) {
    let tokenConfigBefore = (await TestEnv.pool.getTokenConfig(tokenId));
    const trxResult = await TestEnv.pool.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'DelistToken',
            tokenId: tokenId
        }
    );
    let tokenConfigAfter = (await TestEnv.pool.getTokenConfig(tokenId));

    return {
        trxResult,
        tokenConfigBefore,
        tokenConfigAfter
    };
}
