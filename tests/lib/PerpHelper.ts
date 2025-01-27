import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Address, beginCell, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { now } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits, toPriceUnits } from "./TokenHelper";
import { OP_CREATE_INCREASE_PERP_POSITION_ORDER } from "../../utils/constants";

export async function createIncreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, isMarket: boolean, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number, tpSize: number, tpPrice: number, slSize: number, slPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.pool.getPerpOrder(0n)).perpOrderIndexNext;
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
            amount: toJettonUnits(margin),
            destination: TestEnv.pool.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(OP_CREATE_INCREASE_PERP_POSITION_ORDER, 8) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .storeBit(isMarket)
                    .storeUint(tokenId, 16)
                    .storeBit(isLong)
                    .storeCoins(toJettonUnits(size))
                    .storeUint(toPriceUnits(triggerPrice), 128)
                    .storeUint(now(), 32)
                    .storeRef(
                        beginCell()
                        .storeCoins(toJettonUnits(tpSize))
                        .storeUint(toPriceUnits(tpPrice), 128)
                        .storeCoins(toJettonUnits(slSize))
                        .storeUint(toPriceUnits(slPrice), 128)
                    ).endCell()
                ).endCell().asSlice()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.pool.getPerpOrder(0n)).perpOrderIndexNext;
    let order = (await TestEnv.pool.getPerpOrder(orderIdBefore)).perpOrder;
    let orderEx = (await TestEnv.pool.getPerpOrder(orderIdBefore)).perpOrderEx;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order,
        orderEx
    };
}

export async function cancelPerpOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano(0.2),
        },
        {
            $$type: 'CancelPerpOrder',
            orderId: orderId,
            trxId: 0n,
            executionFeeReceiver: executor.address
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = (await TestEnv.pool.getPerpOrder(orderId)).perpOrder;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        order
    };
}


export async function executePerpOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint, price: number, fundingFeeGrowth: number, rolloverFeeGrowth: number) {
    let balanceBefore = await getAllBalance();
    let orderBefore = (await TestEnv.pool.getPerpOrder(orderId)).perpOrder;
    let positionDataBefore = await TestEnv.pool.getPerpPosition(orderBefore?.tokenId!!, orderBefore?.account!!);
    let positionBefore = orderBefore?.isLong!! ? positionDataBefore?.perpPosition?.longPosition!! : positionDataBefore?.perpPosition?.shortPosition!!;
    let poolStatBefore = await TestEnv.pool.getPoolStat();

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'ExecutePerpOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: executor.address,
            tokenId: 1n,
            price: toPriceUnits(price),
            premiumRate: 0n,
            fundingFeeGrowth: toJettonUnits(fundingFeeGrowth),
            rolloverFeeGrowth: toJettonUnits(rolloverFeeGrowth)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let orderAfter = (await TestEnv.pool.getPerpOrder(orderId)).perpOrder;
    let orderExAfter = (await TestEnv.pool.getPerpOrder(orderId)).perpOrder;
    let positionDataAfter = await TestEnv.pool.getPerpPosition(orderBefore?.tokenId!!, orderBefore?.account!!);
    let positionAfter = orderBefore?.isLong!! ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let poolStatAfter = await TestEnv.pool.getPoolStat();

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderBefore,
        orderAfter,
        orderExAfter,
        positionDataBefore,
        positionBefore,
        poolStatBefore,
        positionDataAfter,
        positionAfter,
        poolStatAfter
    };
}


export async function createDecreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.pool.getPerpOrder(0n)).perpOrderIndexNext;
    // create order
    const trxResult = await TestEnv.pool.send(
        user.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CreateDecreasePerpOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            marginDelta: toJettonUnits(margin),
            sizeDelta: toJettonUnits(size),
            triggerPrice: toPriceUnits(triggerPrice),
            requestTime: BigInt(now()),
            trxId: 1n
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.pool.getPerpOrder(0n)).perpOrderIndexNext;
    let order = (await TestEnv.pool.getPerpOrder(orderIdBefore)).perpOrder;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}

export async function createTpSlPerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, 
    tokenId: number, isLong: boolean, tpSize: number, tpPrice: number, slSize: number, slPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.pool.getPerpOrder(0n)).perpOrderIndexNext;
    // create order
    const trxResult = await TestEnv.pool.send(
        user.getSender(),
        {
            value: toNano(executionFee + 0.1),
        },
        {
            $$type: 'CreateTpSlPerpOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            tpSize: toJettonUnits(tpSize),
            tpPrice: toPriceUnits(tpPrice),
            slSize: toJettonUnits(slSize),
            slPrice: toPriceUnits(slPrice),
            requestTime: BigInt(now()),
            trxId: 1n
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.pool.getPerpOrder(0n)).perpOrderIndexNext;
    let order0;
    let order1;
    if (orderIdAfter - orderIdBefore == 1n) {
        order0 = (await TestEnv.pool.getPerpOrder(orderIdBefore)).perpOrder;
    } else {
        order0 = (await TestEnv.pool.getPerpOrder(orderIdBefore)).perpOrder;
        order1 = (await TestEnv.pool.getPerpOrder(orderIdBefore + 1n)).perpOrder;
    }

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order0,
        order1
    };
}


export async function liquidatePerpPosition(executor: SandboxContract<TreasuryContract>, tokenId: number, account: Address, isLong: boolean, price: number, premiumRate: number) {
    let balanceBefore = await getAllBalance();
    let positionDataBefore = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionBefore = isLong ? positionDataBefore?.perpPosition?.longPosition!! : positionDataBefore?.perpPosition?.shortPosition!!;
    let globalLPPositionBefore = positionDataBefore?.globalLPPosition;
    let globalPositionBefore = positionDataBefore?.globalPosition;

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'LiquidatePerpPosition',
            tokenId: BigInt(tokenId),
            account: account,
            isLong: isLong,
            trxId: 2n,
            liquidationFeeReceiver: executor.address,
            price: toPriceUnits(price),
            premiumRate: 0n,
            fundingFeeGrowth: toJettonUnits(1),
            rolloverFeeGrowth: toJettonUnits(1)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let positionDataAfter = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionAfter = isLong ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let globalLPPositionAfter = positionDataAfter?.globalLPPosition;
    let globalPositionAfter = positionDataAfter?.globalPosition;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        positionBefore,
        positionAfter,
        globalLPPositionBefore,
        globalLPPositionAfter,
        globalPositionBefore,
        globalPositionAfter,
    };
}

export async function adlPerpPosition(executor: SandboxContract<TreasuryContract>, tokenId: number, account: Address, isLong: boolean, margin: number, size: number, price: number, premiumRate: number) {
    let balanceBefore = await getAllBalance();
    let positionDataBefore = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionBefore = isLong ? positionDataBefore?.perpPosition?.longPosition!! : positionDataBefore?.perpPosition?.shortPosition!!;
    let globalLPPositionBefore = positionDataBefore?.globalLPPosition;
    let globalPositionBefore = positionDataBefore?.globalPosition;

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'ADLPerpPosition',
            tokenId: BigInt(tokenId),
            account: account,
            isLong: isLong,
            marginDelta: toJettonUnits(margin),
            sizeDelta: toJettonUnits(size),
            trxId: 1n,
            price: toPriceUnits(price),
            premiumRate: 0n,
            fundingFeeGrowth: toJettonUnits(1),
            rolloverFeeGrowth: toJettonUnits(1)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let positionDataAfter = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionAfter = isLong ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let globalLPPositionAfter = positionDataAfter?.globalLPPosition;
    let globalPositionAfter = positionDataAfter?.globalPosition;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        positionBefore,
        positionAfter,
        globalLPPositionBefore,
        globalLPPositionAfter,
        globalPositionBefore,
        globalPositionAfter,
    };
}


export async function claimProtocolFee(feeReceiver: SandboxContract<TreasuryContract>) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.pool.send(
        TestEnv.claimExecutor.getSender(),
        {
            value: toNano(0.2),
        },
        {
            $$type: 'ClaimProtocolFee',
            trxId: 0n,
            feeReceiver: feeReceiver.address
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