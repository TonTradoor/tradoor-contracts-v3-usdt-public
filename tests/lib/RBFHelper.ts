import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { beginCell, Dictionary, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";

export async function createIncreaseRBFOrder(user: SandboxContract<TreasuryContract>, liquidity: number, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    // create order
    const jettonWallet = await getJettonWallet(user.address);
    const trxResult = await jettonWallet.send(
        user.getSender(),
        {
            value: toNano(executionFee + 0.3),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toUnits(liquidity, TestEnv.jettonDecimal),
            destination: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeRef(
                    beginCell()
                    .storeInt(1,32) // op
                    .storeInt(toUnits(liquidity, TestEnv.jettonDecimal), 128) // liquidity
                    .storeCoins(toNano(executionFee)) // execution fee
                    .endCell()
                ).endCell()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getRbfPositionOrder(orderIdBefore);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}

export async function cancelRBFOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'CancelRBFPositionOrder',
            orderId: orderId,
            trxId: 1n,
            executionFeeReceiver: executor.address
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = await TestEnv.orderBook.getRbfPositionOrder(orderId);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        order
    };
}


export async function executeRBFOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    let orderBefore = await TestEnv.orderBook.getRbfPositionOrder(orderId);
    let positionDataBefore = await TestEnv.pool.getRbfPosition(orderBefore?.account!!);
    let positionBefore = positionDataBefore?.rbfPosition;
    let globalPositionBefore = positionDataBefore?.globalRBFPosition;
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteRBFPositionOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: executor.address,
            pricesLength: 0n,
            prices: Dictionary.empty()
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = await TestEnv.orderBook.getRbfPositionOrder(orderId);
    let positionDataAfter = await TestEnv.pool.getRbfPosition(orderBefore?.account!!);
    let positionAfter = positionDataAfter?.rbfPosition;
    let globalPositionAfter = positionDataAfter?.globalRBFPosition;
    
    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        positionBefore,
        positionAfter,
        globalPositionBefore,
        globalPositionAfter,
        order
    };
}


export async function createDecreaseRBFOrder(user: SandboxContract<TreasuryContract>, liquidity: number, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    // create order
    const trxResult = await TestEnv.orderBook.send(
        user.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'CreateDecreaseRBFPositionOrder',
            executionFee: toNano(executionFee),
            liquidityDelta: toJettonUnits(liquidity)
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getRbfPositionOrder(orderIdBefore);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}