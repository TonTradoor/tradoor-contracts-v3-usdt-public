import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Address, beginCell, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";

export async function createCompensate(sender: SandboxContract<TreasuryContract>, orderType: number, orderId: bigint,
    refundReceiver: Address, refundAmount: number, executionFeeReceiver: Address, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let compensateIdBefore = (await TestEnv.pool.getCompensate(0n)).compensateIndexNext;
    // create order
    const trxResult = await TestEnv.pool.send(
        sender.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CreateCompensate',
            orderType: BigInt(orderType),
            orderId: BigInt(orderId),
            trxId: 1n,
            refundReceiver: refundReceiver,
            refundAmount: toJettonUnits(refundAmount),
            executionFeeReceiver: executionFeeReceiver,
            executionFee: toNano(executionFee),
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let compensateIdAfter = (await TestEnv.pool.getCompensate(0n)).compensateIndexNext;
    let compensate = (await TestEnv.pool.getCompensate(compensateIdBefore)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensateIdBefore,
        compensateIdAfter,
        compensate
    };
}

export async function cancelCompensate(executor: SandboxContract<TreasuryContract>, compensateId: bigint) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'ExecuteOrCancelCompensate',
            isCancel: true,
            compensateId: compensateId,
            trxId: 1n,
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let compensate = (await TestEnv.pool.getCompensate(compensateId)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensate
    };
}

export async function executeCompensate(executor: SandboxContract<TreasuryContract>, gas: number, compensateId: bigint) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano(gas),
        },
        {
            $$type: 'ExecuteOrCancelCompensate',
            isCancel: false,
            compensateId: compensateId,
            trxId: 1n,
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let compensate = (await TestEnv.pool.getCompensate(compensateId)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensate
    };
}


export async function sendCompensateJetton(user: SandboxContract<TreasuryContract>, amount: number) {
    let balanceBefore = await getAllBalance();
    // create order
    const jettonWallet = await getJettonWallet(user.address);
    const trxResult = await jettonWallet.send(
        user.getSender(),
        {
            value: toNano(0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 0n,
            amount: toJettonUnits(amount),
            destination: TestEnv.pool.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(0),
            forward_payload: beginCell().endCell().asSlice()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
    };
}