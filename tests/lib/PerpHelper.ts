import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { beginCell, Dictionary, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";

export async function createIncreasePerpOrder(user: SandboxContract<TreasuryContract>, executionFee: number, isMarket: boolean, 
    tokenId: number, isLong: boolean, margin: number, size: number, triggerPrice: number, tpSize: number, tpPrice: number, slSize: number, sPerprice: number) {
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
            amount: toUnits(margin, TestEnv.jettonDecimal),
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
                    .storeInt(isMarket? -1 : 0, 1)
                    .storeInt(tokenId, 64)
                    .storeInt(isLong? -1 : 0, 1)
                    .storeInt(toUnits(margin, TestEnv.jettonDecimal), 128)
                    .storeInt(toUnits(size, TestEnv.jettonDecimal), 128)
                    .storeInt(toUnits(triggerPrice, TestEnv.priceDecimal), 256)
                    .storeInt(toUnits(tpSize, TestEnv.jettonDecimal), 128)
                    .storeInt(toUnits(tpPrice, TestEnv.priceDecimal), 256)
                    .storeInt(toUnits(slSize, TestEnv.jettonDecimal), 128)
                    .storeInt(toUnits(sPerprice, TestEnv.priceDecimal), 256)
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
            value: toNano('0.5'),
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


// export async function executePerpOrder(executor: SandboxContract<TreasuryContract>, orderId: bigint) {
//     let balanceBefore = await getAllBalance();
//     let orderBefore = await TestEnv.orderBook.getPerpPositionOrder(orderId);
//     let positionBefore = await TestEnv.pool.getPerpPosition(orderBefore?.account!!);
    
//     const trxResult = await TestEnv.orderBook.send(
//         executor.getSender(),
//         {
//             value: toNano('0.5'),
//         },
//         {
//             $$type: 'ExecutePerpPositionOrder',
//             orderId: orderId,
//             trxId: 2n,
//             executionFeeReceiver: executor.address,
//             pricesLength: 0n,
//             prices: Dictionary.empty()
//         }
//     );

//     // after trx
//     let balanceAfter = await getAllBalance();
//     let order = await TestEnv.orderBook.getPerpPositionOrder(orderId);
//     let positionAfter = await TestEnv.pool.getPerpPosition(orderBefore?.account!!);

//     return {
//         trxResult,
//         balanceBefore,
//         balanceAfter,
//         positionBefore,
//         positionAfter,
//         order
//     };
// }


// export async function createDecreasePerpOrder(user: SandboxContract<TreasuryContract>, margin: number, liquidity: number, executionFee: number) {
//     let balanceBefore = await getAllBalance();
//     let orderIdBefore = await TestEnv.orderBook.getPerpPositionOrderIndexNext();
//     // create order
//     const trxResult = await TestEnv.orderBook.send(
//         user.getSender(),
//         {
//             value: toNano('0.5'),
//         },
//         {
//             $$type: 'CreateDecreasePerpPositionOrder',
//             executionFee: toNano(executionFee),
//             marginDelta: toJettonUnits(margin),
//             liquidityDelta: toJettonUnits(liquidity)
//         }
//     );
//     // after trx
//     let balanceAfter = await getAllBalance();
//     let orderIdAfter = await TestEnv.orderBook.getPerpPositionOrderIndexNext();
//     let order = await TestEnv.orderBook.getPerpPositionOrder(orderIdBefore);

//     return {
//         trxResult,
//         balanceBefore,
//         balanceAfter,
//         orderIdBefore,
//         orderIdAfter,
//         order
//     };
// }