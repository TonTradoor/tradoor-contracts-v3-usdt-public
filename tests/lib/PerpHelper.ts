import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { beginCell, Dictionary, DictionaryValue, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits, toPriceUnits } from "./TokenHelper";
import { UpdatePrice } from "../../wrappers/OrderBook";

export async function createIncreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, isMarket: boolean, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number, tpSize: number, tpPrice: number, slSize: number, slPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = await TestEnv.orderBook.getPerpPositionOrderIndexNext();
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
            amount: toJettonUnits(margin),
            destination: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeRef(
                    beginCell()
                    .storeInt(3,32) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .storeInt(isMarket? -1n : 0n, 1)
                    .storeInt(tokenId, 64)
                    .storeInt(isLong? -1n : 0n, 1)
                    .storeInt(toJettonUnits(margin), 128)
                    .storeInt(toJettonUnits(size), 128)
                    .storeInt(toPriceUnits(triggerPrice), 256)
                    .storeRef(
                        beginCell()
                        .storeInt(toJettonUnits(tpSize), 128)
                        .storeInt(toPriceUnits(tpPrice), 256)
                        .storeInt(toJettonUnits(slSize), 128)
                        .storeInt(toPriceUnits(slPrice), 256)
                    )
                    .endCell()
                ).endCell()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = await TestEnv.orderBook.getPerpPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}

export async function cancelPerpOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano(0.3),
        },
        {
            $$type: 'CancelPerpPositionOrder',
            orderId: orderId,
            trxId: 1n,
            executionFeeReceiver: executor.address
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = await TestEnv.orderBook.getPerpPositionOrder(orderId);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        order
    };
}


export async function executePerpOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint, price: number) {
    let balanceBefore = await getAllBalance();
    let orderBefore = await TestEnv.orderBook.getPerpPositionOrder(orderId);
    let positionDataBefore = await TestEnv.pool.getPerpPosition(orderBefore?.tokenId!!, orderBefore?.account!!);
    let positionBefore = orderBefore?.isLong!! ? positionDataBefore?.perpPosition?.longPosition!! : positionDataBefore?.perpPosition?.shortPosition!!;
    let globalPositionBefore = positionDataBefore?.globalLPPosition;

    let UpdatePriceValue: DictionaryValue<UpdatePrice> = {
        serialize(src, builder) {
            builder.storeUint(src.tokenId, 64).storeUint(src.price, 256)
        },
        parse(src) {
            throw '';
        },
    }
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecutePerpPositionOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: executor.address,
            pricesLength: 1n,
            prices: Dictionary.empty(Dictionary.Keys.BigInt(32), UpdatePriceValue).set(
                0n, 
                {
                    $$type: 'UpdatePrice',
                    tokenId: orderBefore?.tokenId!!,
                    price: toPriceUnits(price)
                }
            )
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = await TestEnv.orderBook.getPerpPositionOrder(orderId);
    let positionDataAfter = await TestEnv.pool.getPerpPosition(orderBefore?.tokenId!!, orderBefore?.account!!);
    let positionAfter = orderBefore?.isLong!! ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let globalPositionAfter = positionDataAfter?.globalLPPosition;

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


export async function createDecreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, opType: bigint, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = await TestEnv.orderBook.getPerpPositionOrderIndexNext();
    // create order
    const trxResult = await TestEnv.orderBook.send(
        user.getSender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'CreateDecreasePerpPositionOrder',
            executionFee: toNano(executionFee),
            opType: opType,
            tokenId: BigInt(tokenId),
            isLong: isLong,
            marginDelta: toJettonUnits(margin),
            sizeDelta: toJettonUnits(size),
            triggerPrice: toPriceUnits(triggerPrice)
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = await TestEnv.orderBook.getPerpPositionOrderIndexNext();
    let order = await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderIdBefore,
        orderIdAfter,
        order
    };
}