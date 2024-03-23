import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { beginCell, Dictionary, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";

export async function createIncreaseLPOrder(user: SandboxContract<TreasuryContract>, margin: number, liquidity: number, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = await TestEnv.orderBook.getLpPositionOrderIndexNext();
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
            amount: toUnits(margin, TestEnv.jettonDecimal),
            destination: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeRef(
                    beginCell()
                    .storeInt(2,32) // op
                    .storeInt(toUnits(margin, TestEnv.jettonDecimal), 128) // margin
                    .storeInt(toUnits(liquidity, TestEnv.jettonDecimal), 128) // liquidity
                    .storeCoins(toNano(executionFee)) // execution fee
                    .endCell()
                ).endCell()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = await TestEnv.orderBook.getLpPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getLpPositionOrder(orderIdBefore);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}

export async function cancelLPOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'CancelLPPositionOrder',
            orderId: orderId,
            trxId: 1n,
            executionFeeReceiver: executor.address
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = await TestEnv.orderBook.getLpPositionOrder(orderId);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        order
    };
}


export async function executeLPOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    let orderBefore = await TestEnv.orderBook.getLpPositionOrder(orderId);
    let positionBefore = await TestEnv.pool.getLpPosition(orderBefore?.account!!);
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteLPPositionOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: executor.address,
            pricesLength: 0n,
            prices: Dictionary.empty()
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = await TestEnv.orderBook.getLpPositionOrder(orderId);
    let positionAfter = await TestEnv.pool.getLpPosition(orderBefore?.account!!);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        positionBefore,
        positionAfter,
        order
    };
}


export async function createDecreaseLPOrder(user: SandboxContract<TreasuryContract>, margin: number, liquidity: number, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = await TestEnv.orderBook.getLpPositionOrderIndexNext();
    // create order
    const trxResult = await TestEnv.orderBook.send(
        user.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'CreateDecreaseLPPositionOrder',
            executionFee: toNano(executionFee),
            marginDelta: toJettonUnits(margin),
            liquidityDelta: toJettonUnits(liquidity)
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = await TestEnv.orderBook.getLpPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getLpPositionOrder(orderIdBefore);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}