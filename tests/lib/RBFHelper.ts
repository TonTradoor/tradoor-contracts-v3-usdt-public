import { SandboxContract, SendMessageResult, TreasuryContract } from "@ton/sandbox";
import { Address, beginCell, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getJettonBalance, getJettonWallet, getTonBalance } from "./TokenHelper";

export async function createIncreaseOrder(user: SandboxContract<TreasuryContract>, liquidity: number | string | bigint, executionFee: number | string | bigint) {
    let tonBefore = await getTonBalance(user.address);
    let jettonBalanceBefore = await getJettonBalance(user.address);

    let orderIdBefore = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    // create order
    const jettonWallet = await getJettonWallet(user.address);
    const trxResult = await jettonWallet.send(
        user.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toUnits(liquidity, TestEnv.jettonDecimal),
            destination: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano('0.3'),
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
    expect(trxResult.transactions).toHaveTransaction({
        from: TestEnv.user0JettonWallet.address,
        to: TestEnv.orderBookJettonWallet.address,
        success: true,
    });
    // after trx
    let tonAfter = await getTonBalance(user.address);
    let jettonBalanceAfter = await getJettonBalance(user.address);
    let orderIdAfter = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getRbfPositionOrder(orderIdBefore);

    return {
        trxResult,
        tonBefore,
        tonAfter,
        jettonBalanceBefore,
        jettonBalanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}

export async function cancelOrderByExecutor(user: SandboxContract<TreasuryContract>, orderId: bigint) {
    let executorTonBefore = await getTonBalance(TestEnv.executor.address);
    let userTonBefore = await getTonBalance(user.address);
    let userJettonBalanceBefore = await getJettonBalance(user.address);
    
    const trxResult = await TestEnv.orderBook.send(
        TestEnv.executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'CancelRBFPositionOrder',
            orderId: orderId,
            trxId: 1n,
            executionFeeReceiver: TestEnv.executor.address
        }
    );

    // after trx
    let executorTonAfter = await getTonBalance(TestEnv.executor.address);
    let userTonAfter = await getTonBalance(user.address);
    let userJettonBalanceAfter = await getJettonBalance(user.address);

    let orderIdNext = await TestEnv.orderBook.getRbfPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getRbfPositionOrder(orderIdNext - 1n);

    return {
        trxResult,
        executorTonBefore,
        executorTonAfter,
        userTonBefore,
        userTonAfter,
        userJettonBalanceBefore,
        userJettonBalanceAfter,
        order
    };
}