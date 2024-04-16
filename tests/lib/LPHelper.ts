import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Address, beginCell, Dictionary, DictionaryValue, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { toUnits } from "../../utils/util";
import { getAllBalance, getJettonWallet, toJettonUnits } from "./TokenHelper";
import { UpdateWhitelistParam } from "../../wrappers/OrderBook";

export async function createIncreaseLPOrder(user: SandboxContract<TreasuryContract>, liquidity: number, executionFee: number) {
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
            amount: toUnits(liquidity, TestEnv.jettonDecimal),
            destination: TestEnv.orderBook.address,
            response_destination: user.address,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeRef(
                    beginCell()
                    .storeUint(1,32) // op
                    .storeUint(toUnits(liquidity, TestEnv.jettonDecimal), 128) // liquidity
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
    let positionDataBefore = await TestEnv.pool.getLpPosition(orderBefore?.account!!);
    let positionBefore = positionDataBefore?.lpPosition;
    let globalLPLiquidityBefore = positionDataBefore;
    
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
    let orderAfter = await TestEnv.orderBook.getLpPositionOrder(orderId);
    let positionDataAfter = await TestEnv.pool.getLpPosition(orderBefore?.account!!);
    let positionAfter = positionDataAfter?.lpPosition;
    let globalLPLiquidityAfter = positionDataAfter;
    
    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        orderBefore,
        orderAfter,
        positionBefore,
        positionAfter,
        globalLPLiquidityBefore,
        globalLPLiquidityAfter,
    };
}


export async function createDecreaseLPOrder(user: SandboxContract<TreasuryContract>, liquidity: number, executionFee: number) {
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
            liquidityDelta: toJettonUnits(liquidity),
            trxId: 1n
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

export async function updateWhitelist(enableWhitelist: boolean, account: Address | null, enable: boolean | null) {
    let UpdateWhitelistValue: DictionaryValue<UpdateWhitelistParam> = {
        serialize(src, builder) {
            builder.storeAddress(src.account).storeBit(src.enable)
        },
        parse(src) {
            throw '';
        },
    }

    let whitelistLength = 0n;
    let whitelist = Dictionary.empty(Dictionary.Keys.BigInt(32), UpdateWhitelistValue);
    if (account != null && enable != null) {
        whitelistLength = 1n;
        whitelist.set(
            0n,
            {
                $$type: 'UpdateWhitelistParam',
                account: account,
                enable: enable
            }
        );
    }

    const trxResult = await TestEnv.orderBook.send(
        TestEnv.deployer.getSender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateWhitelist',
            enableWhitelist: enableWhitelist,
            whitelistLength: whitelistLength,
            whitelist: whitelist
        }
    );
    return trxResult;
}