import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Address, beginCell, Dictionary, DictionaryValue, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits, toPriceUnits } from "./TokenHelper";
import { UpdatePrice } from "../../wrappers/OrderBook";
import { UpdatePriceParam } from "../../wrappers/Pool";
import { OP_CREATE_INCREASE_PERP_POSITION_ORDER } from "../../utils/constants";

export async function createIncreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, isMarket: boolean, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number, tpSize: number, tpPrice: number, slSize: number, slPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    // create order
    const jettonWallet = await getJettonWallet(user.address);
    const trxResult = await jettonWallet.send(
        user.getSender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toJettonUnits(margin),
            sender: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(OP_CREATE_INCREASE_PERP_POSITION_ORDER, 32) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .storeInt(isMarket? -1n : 0n, 1)
                    .storeUint(tokenId, 64)
                    .storeInt(isLong? -1n : 0n, 1)
                    .storeUint(toJettonUnits(margin), 128)
                    .storeUint(toJettonUnits(size), 128)
                    .storeUint(toPriceUnits(triggerPrice), 256)
                    .storeRef(
                        beginCell()
                        .storeUint(toJettonUnits(tpSize), 128)
                        .storeUint(toPriceUnits(tpPrice), 256)
                        .storeUint(toJettonUnits(slSize), 128)
                        .storeUint(toPriceUnits(slPrice), 256)
                    )
                    .endCell()
                ).endCell()
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    let order = (await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore)).perpPositionOrder;
    let orderEx = (await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore)).perpPositionOrderEx;

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
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano(0.2),
        },
        {
            $$type: 'CancelPerpPositionOrder',
            orderId: orderId,
            trxId: 0n,
            executionFeeReceiver: executor.address
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let order = (await TestEnv.orderBook.getPerpPositionOrder(orderId)).perpPositionOrder;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        order
    };
}


export async function executePerpOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint, price: number, premiumRate: number) {
    let balanceBefore = await getAllBalance();
    let orderBefore = (await TestEnv.orderBook.getPerpPositionOrder(orderId)).perpPositionOrder;
    let positionDataBefore = await TestEnv.pool.getPerpPosition(orderBefore?.tokenId!!, orderBefore?.account!!);
    let positionBefore = orderBefore?.isLong!! ? positionDataBefore?.perpPosition?.longPosition!! : positionDataBefore?.perpPosition?.shortPosition!!;
    let lpPositionDataBefore = await TestEnv.pool.getLpPosition(orderBefore?.account!!);
    
    const trxResult = await TestEnv.orderBook.send(
        executor.getSender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'ExecutePerpPositionOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: executor.address,
            tokenId: 1n,
            price: toPriceUnits(price),
            premiumRate: toUnits(premiumRate, 9)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let orderAfter = (await TestEnv.orderBook.getPerpPositionOrder(orderId)).perpPositionOrder;
    let orderExAfter = (await TestEnv.orderBook.getPerpPositionOrder(orderId)).perpPositionOrderEx;
    let positionDataAfter = await TestEnv.pool.getPerpPosition(orderBefore?.tokenId!!, orderBefore?.account!!);
    let positionAfter = orderBefore?.isLong!! ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let lpPositionDataAfter = await TestEnv.pool.getLpPosition(orderBefore?.account!!);

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderBefore,
        orderAfter,
        orderExAfter,
        positionDataBefore,
        positionBefore,
        lpPositionDataBefore,
        positionDataAfter,
        positionAfter,
        lpPositionDataAfter
    };
}

let UpdatePriceValue: DictionaryValue<UpdatePrice> = {
    serialize(src, builder) {
        builder.storeUint(src.tokenId, 64).storeUint(src.price, 256)
    },
    parse(src) {
        throw '';
    },
}


export async function createDecreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number) {
    let balanceBefore = await getAllBalance();
    let orderIdBefore = (await TestEnv.orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    // create order
    const trxResult = await TestEnv.orderBook.send(
        user.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CreateDecreasePerpPositionOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            marginDelta: toJettonUnits(margin),
            sizeDelta: toJettonUnits(size),
            triggerPrice: toPriceUnits(triggerPrice),
            trxId: 1n
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    let order = (await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore)).perpPositionOrder;

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
    let orderIdBefore = (await TestEnv.orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    // create order
    const trxResult = await TestEnv.orderBook.send(
        user.getSender(),
        {
            value: toNano(executionFee + 0.1),
        },
        {
            $$type: 'CreateTpSlPerpPositionOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            tpSize: toJettonUnits(tpSize),
            tpPrice: toPriceUnits(tpPrice),
            slSize: toJettonUnits(slSize),
            slPrice: toPriceUnits(slPrice),
            trxId: 1n
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let orderIdAfter = (await TestEnv.orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    let order0;
    let order1;
    if (orderIdAfter - orderIdBefore == 1n) {
        order0 = (await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore)).perpPositionOrder;
    } else {
        order0 = (await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore)).perpPositionOrder;
        order1 = (await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore + 1n)).perpPositionOrder;
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
    let globalLPLiquidityBefore = await TestEnv.pool.getLpPosition(account);

    const trxResult = await TestEnv.orderBook.send(
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
            premiumRate: toUnits(premiumRate, 9)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let positionDataAfter = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionAfter = isLong ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let globalLPPositionAfter = positionDataAfter?.globalLPPosition;
    let globalPositionAfter = positionDataAfter?.globalPosition;
    let globalLPLiquidityAfter = await TestEnv.pool.getLpPosition(account);

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
        globalLPLiquidityBefore,
        globalLPLiquidityAfter,
    };
}

export async function adlPerpPosition(executor: SandboxContract<TreasuryContract>, tokenId: number, account: Address, isLong: boolean, margin: number, size: number, price: number, premiumRate: number) {
    let balanceBefore = await getAllBalance();
    let positionDataBefore = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionBefore = isLong ? positionDataBefore?.perpPosition?.longPosition!! : positionDataBefore?.perpPosition?.shortPosition!!;
    let globalLPPositionBefore = positionDataBefore?.globalLPPosition;
    let globalPositionBefore = positionDataBefore?.globalPosition;
    let globalLPLiquidityBefore = await TestEnv.pool.getLpPosition(account);

    const trxResult = await TestEnv.orderBook.send(
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
            premiumRate: toUnits(premiumRate, 9)
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let positionDataAfter = await TestEnv.pool.getPerpPosition(BigInt(tokenId), account);
    let positionAfter = isLong ? positionDataAfter?.perpPosition?.longPosition!! : positionDataAfter?.perpPosition?.shortPosition!!;
    let globalLPPositionAfter = positionDataAfter?.globalLPPosition;
    let globalPositionAfter = positionDataAfter?.globalPosition;
    let globalLPLiquidityAfter = await TestEnv.pool.getLpPosition(account);

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
        globalLPLiquidityBefore,
        globalLPLiquidityAfter,
    };
}


export async function updatePrice(executor: SandboxContract<TreasuryContract>, tokenId: number, price: number) {

    let UpdatePriceValue: DictionaryValue<UpdatePriceParam> = {
        serialize(src, builder) {
            builder.storeUint(src.tokenId, 64).storeUint(src.price, 256)
        },
        parse(src) {
            throw '';
        },
    }    
    
    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'UpdatePrice',
            trxId: 1n,
            pricesLength: 1n,
            prices: Dictionary.empty(Dictionary.Keys.BigInt(32), UpdatePriceValue).set(
                0n, 
                {
                    $$type: 'UpdatePriceParam',
                    tokenId: BigInt(tokenId),
                    price: toPriceUnits(price)
                }
            )
        }
    );


    let lpPositionDataAfter = await TestEnv.pool.getLpPosition(executor.address);
    let positionDataAfter = await TestEnv.pool.getPerpPosition(BigInt(tokenId), executor.address);
    return {
        trxResult,
        lpPositionDataAfter,
        positionDataAfter
    }
}

export async function claimProtocolFee(executor: SandboxContract<TreasuryContract>) {
    let balanceBefore = await getAllBalance();
    
    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano(0.2),
        },
        {
            $$type: 'ClaimProtocolFee',
            trxId: 0n,
            feeReceiver: executor.address
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