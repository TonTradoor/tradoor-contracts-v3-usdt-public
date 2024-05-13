import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Address, beginCell, Dictionary, DictionaryValue, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";

export async function createCompensate(executor: SandboxContract<TreasuryContract>, orderType: number, orderId: bigint,
    refundReceiver: Address, refundAmount: number, executionFeeReceiver: Address, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let compensateIdBefore = (await TestEnv.orderBook.getCompensate(0n)).compensateIndexNext;
    // create order
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
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
    let compensateIdAfter = (await TestEnv.orderBook.getCompensate(0n)).compensateIndexNext;
    let compensate = (await TestEnv.orderBook.getCompensate(compensateIdBefore)).compensate;

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

    const trxResult = await TestEnv.orderBook.send(
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
    let compensate = (await TestEnv.orderBook.getCompensate(compensateId)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensate
    };
}

export async function executeCompensate(executor: SandboxContract<TreasuryContract>, compensateId: bigint) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.2'),
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
    let compensate = (await TestEnv.orderBook.getCompensate(compensateId)).compensate;

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
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toJettonUnits(amount),
            sender: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(0),
            forward_payload: beginCell().endCell()
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