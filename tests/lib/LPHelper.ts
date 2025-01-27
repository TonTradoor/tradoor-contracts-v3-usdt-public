import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { beginCell, Dictionary, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { getAllBalance, getJettonWallet, getTlpWallet, toJettonUnits, toTlpUnits } from "./TokenHelper";
import { OP_CREATE_INCREASE_LP_POSITION_ORDER } from "../../utils/constants";

export async function createIncreaseLiquidityOrder(user: SandboxContract<TreasuryContract>, liquidity: number, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.pool.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    // create order
    const jettonWallet = await getJettonWallet(user.address);
    const trxResult = await jettonWallet.send(
        user.getSender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 0n,
            amount: toJettonUnits(liquidity),
            destination: TestEnv.pool.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(OP_CREATE_INCREASE_LP_POSITION_ORDER, 8) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .endCell()
                ).endCell().asSlice()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.pool.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    let order = (await TestEnv.pool.getLiquidityOrder(orderIdBefore)).liquidityOrder;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}

export async function cancelLiquidityOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CancelLiquidityOrder',
            orderId: orderId,
            trxId: 1n,
            executionFeeReceiver: executor.address
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = (await TestEnv.pool.getLiquidityOrder(orderId)).liquidityOrder;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        order
    };
}


export async function executeLiquidityOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint, 
    prices: Dictionary<number, bigint>, lpFundingFeeGrowth: number, rolloverFeeGrowth: number) {
    let balanceBefore = await getAllBalance();
    let orderBefore = (await TestEnv.pool.getLiquidityOrder(orderId)).liquidityOrder;
    let poolDataBefore = await TestEnv.pool.getPoolStat();

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteLiquidityOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: executor.address,
            prices: prices,
            lpFundingFeeGrowth: toJettonUnits(lpFundingFeeGrowth),
            rolloverFeeGrowth: toJettonUnits(rolloverFeeGrowth)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let orderAfter = (await TestEnv.pool.getLiquidityOrder(orderId)).liquidityOrder;
    let poolDataAfter = await TestEnv.pool.getPoolStat();

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderBefore,
        orderAfter,
        poolDataBefore,
        poolDataAfter
    };
}


export async function createDecreaseLiquidityOrder(user: SandboxContract<TreasuryContract>, tlp: number, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.pool.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    // create order
    const tlpWallet = await getTlpWallet(user.address);
    const trxResult = await tlpWallet.send(
        user.getSender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 0n,
            amount: toTlpUnits(tlp),
            destination: TestEnv.pool.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload:
                beginCell()
                    .storeUint(1, 1)
                    .storeRef(
                        beginCell()
                            .storeCoins(toNano(executionFee)) // execution fee
                            .endCell()
                    ).endCell().asSlice()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.pool.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    let order = (await TestEnv.pool.getLiquidityOrder(orderIdBefore)).liquidityOrder;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}
