import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano } from '@ton/core';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { MockJetton } from '../wrappers/MockJetton';
import { Pool } from '../wrappers/Pool';
import { OrderBook } from '../wrappers/OrderBook';
import { TestEnv } from './lib/TestEnv';
import { getFriendlyTonBalance, getJettonBalance, mint, toJettonUnits, toPriceUnits } from './lib/TokenHelper';
import { cancelLPOrder, createDecreaseLPOrder, createIncreaseLPOrder, executeLPOrder } from './lib/LPHelper';
import '@ton/test-utils';
import { adlPerpPosition, cancelPerpOrder, createDecreasePerpOrder, createIncreasePerpOrder, createTpSlPerpOrder, executePerpOrder, liquidatePerpPosition, updatePrice,  } from './lib/PerpHelper';
import { ORDER_OP_TYPE_DECREASE_MARKET, ORDER_OP_TYPE_DECREASE_SL, ORDER_OP_TYPE_DECREASE_TP } from '../utils/constants';
import { readPRSample, toUnits } from '../utils/util';

describe('LP', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let orderBook: SandboxContract<OrderBook>;
    let pool: SandboxContract<Pool>;
    let jetton: SandboxContract<MockJetton>;
    let executor: SandboxContract<TreasuryContract>;
    let compensator: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let user0JettonWallet: SandboxContract<JettonDefaultWallet>;
    let orderBookJettonWallet: SandboxContract<JettonDefaultWallet>;

    beforeEach(async () => {
        await TestEnv.resetEnv();

        blockchain = TestEnv.blockchain;
        deployer = TestEnv.deployer;
        orderBook = TestEnv.orderBook;
        pool = TestEnv.pool;
        jetton = TestEnv.jetton;
        executor = TestEnv.executor;
        compensator = TestEnv.compensator;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        user0JettonWallet = TestEnv.user0JettonWallet;
        orderBookJettonWallet = TestEnv.orderBookJettonWallet;

        // mint
        await mint(user0.address, '100000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000'));

        await mint(user1.address, '100000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('100000'));

        // check config
        let orderBookConfigData = await orderBook.getConfigData(executor.address);
        expect(orderBookConfigData.pool).toEqualAddress(pool.address);
        expect(orderBookConfigData.usdtWallet).toEqualAddress(orderBookJettonWallet.address);
        expect(orderBookConfigData.isExecutor).toBeTruthy();

        let poolConfigData = await pool.getConfigData(null);
        expect(poolConfigData.orderBook).toEqualAddress(orderBook.address);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    // it("should update price", async() => {
    //     // set block time
    //     blockchain.now = Math.floor(Date.now() / 1000);

    //     const executeResult =  await updatePrice(executor, 1, 50000);
    //     printTransactionFees(executeResult.trxResult.transactions);

    //     blockchain.now = Math.floor(Date.now() / 1000) + 60 * 60;

    //     const executeResult0 =  await updatePrice(executor, 1, 50000);
    //     printTransactionFees(executeResult0.trxResult.transactions);

    // });

    it('should execute two direction perp', async () => {
        console.log("should execute two direction perp")
        // set block time
        blockchain.now = Math.floor(Date.now() / 1000);
        blockchain.now = blockchain.now - blockchain.now % 3600 + 70 * 60; // HH+1:10
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);
        printTransactionFees(createIncreaseResult.trxResult.transactions);

        console.log('user0 balance before:', fromNano(createIncreaseResult.balanceBefore.user0TonBalance));
        console.log('user0 balance after:', fromNano(createIncreaseResult.balanceAfter.user0TonBalance));
        console.log('create increase LP order gas used:', fromNano(createIncreaseResult.balanceBefore.user0TonBalance - createIncreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('executor balance before:', fromNano(executeIncreaseResult.balanceBefore.executorTonBalance));
        console.log('executor balance after:', fromNano(executeIncreaseResult.balanceAfter.executorTonBalance));
        
        console.log('execute increase LP order gas used:', fromNano(executeIncreaseResult.balanceBefore.executorTonBalance - executeIncreaseResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));
        
        /* =========================== increase long perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 50;
        let size = 0.01; // 500u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let premiumRate = 0.001;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });
        console.log('create increase long perp order gas used:', fromNano(createResult.balanceBefore.user1TonBalance - createResult.balanceAfter.user1TonBalance - toNano(executionFee)));

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, premiumRate);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase long perp order gas used:', fromNano(executeResult.balanceBefore.executorTonBalance - executeResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('global position after increase long:', executeResult.globalPositionAfter);
        console.log('global lp position after increase long:', executeResult.globalLPPositionAfter);
        console.log('global funding rate after increase long:', executeResult.globalFundingRateSampleAfter);
        console.log('prev PR after increase long:', executeResult.prevPremiumRateAfter);

        expect(executeResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.globalLPPositionAfter?.isLong).toBeFalsy();


        /* =========================== increase short perp ================================ */
        blockchain.now = blockchain.now + 30 * 60; // HH:40

        let increaseShortMargin = 100;
        let increaseShortSize = 0.02;
        let increaseShortTriggerPrice = 49000;
        let increaseShortIncreasePrice = 50000;

        // create order
        const createIncreaseShortResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, false, increaseShortMargin, increaseShortSize, increaseShortTriggerPrice, 0, 0, 0, 0);
        expect(createIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });
        console.log('create increase short perp order gas used:', fromNano(createIncreaseShortResult.balanceBefore.user1TonBalance - createIncreaseShortResult.balanceAfter.user1TonBalance - toNano(executionFee)));

        // executor order
        const executeIncreaseShortResult = await executePerpOrder(executor, createIncreaseShortResult.orderIdBefore, increaseShortIncreasePrice, premiumRate);
        printTransactionFees(executeIncreaseShortResult.trxResult.transactions);
        expect(executeIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase short perp order gas used:', fromNano(executeIncreaseShortResult.balanceBefore.executorTonBalance - executeIncreaseShortResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('global position after increase short:', executeIncreaseShortResult.globalPositionAfter);
        console.log('global lp position after increase short:', executeIncreaseShortResult.globalLPPositionAfter);
        console.log('global funding rate after increase short:', executeIncreaseShortResult.globalFundingRateSampleAfter);
        console.log('prev PR after increase short:', executeIncreaseShortResult.prevPremiumRateAfter);

        expect(executeIncreaseShortResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(increaseShortSize - size));
        expect(executeIncreaseShortResult.globalLPPositionAfter?.isLong).toBeTruthy();

        /* =========================== decrease short perp ================================ */
        blockchain.now = blockchain.now + 30 * 60; // HH+1:10

        let decreaseShortMargin = 100;
        let decreaseShortSize = 0.02;
        let decreaseShortTriggerPrice = 52000;
        let decreaseShortIncreasePrice = 51000;

        // create order
        const createDecreaseShortResult = await createDecreasePerpOrder(user1, executionFee, tokenId, false, decreaseShortMargin, decreaseShortSize, decreaseShortTriggerPrice);
        expect(createDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });
        console.log('decrease short order:', createDecreaseShortResult.order);
        console.log('create decrease short perp order gas used:', fromNano(createDecreaseShortResult.balanceBefore.user1TonBalance - createDecreaseShortResult.balanceAfter.user1TonBalance - toNano(executionFee)));

        // executor order
        const executeDecreaseShortResult = await executePerpOrder(executor, createDecreaseShortResult.orderIdBefore, decreaseShortIncreasePrice, premiumRate);
        printTransactionFees(executeDecreaseShortResult.trxResult.transactions);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('execute decrease short perp order gas used:', fromNano(executeDecreaseShortResult.balanceBefore.executorTonBalance - executeDecreaseShortResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('global position after decrease short:', executeDecreaseShortResult.globalPositionAfter);
        console.log('global lp position after decrease short:', executeDecreaseShortResult.globalLPPositionAfter);
        console.log('global funding rate after decrease short:', executeDecreaseShortResult.globalFundingRateSampleAfter);
        console.log('prev PR after decrease short:', executeDecreaseShortResult.prevPremiumRateAfter);

        expect(executeDecreaseShortResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(size));
        expect(executeDecreaseShortResult.globalLPPositionAfter?.isLong).toBeFalsy();

        /* =========================== decrease long perp ================================ */
        blockchain.now = blockchain.now + 30 * 60; // HH+1:40

        let decreaseLongMargin = 50;
        let decreaseLongSize = 0.01;
        let decreaseLongTriggerPrice = 50000;
        let decreaseLongIncreasePrice = 51000;

        // create order
        const createDecreaseLongResult = await createDecreasePerpOrder(user1, executionFee, tokenId, true, decreaseLongMargin, decreaseLongSize, decreaseLongTriggerPrice);
        expect(createDecreaseLongResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });
        console.log('decrease long order:', createDecreaseLongResult.order);
        console.log('create decrease long perp order gas used:', fromNano(createDecreaseLongResult.balanceBefore.user1TonBalance - createDecreaseLongResult.balanceAfter.user1TonBalance - toNano(executionFee)));

        // executor order
        const executeDecreaseLongResult = await executePerpOrder(executor, createDecreaseLongResult.orderIdBefore, decreaseLongIncreasePrice, premiumRate);
        printTransactionFees(executeDecreaseLongResult.trxResult.transactions);
        expect(executeDecreaseLongResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('execute decrease long perp order gas used:', fromNano(executeDecreaseLongResult.balanceBefore.executorTonBalance - executeDecreaseLongResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('global position after decrease long:', executeDecreaseLongResult.globalPositionAfter);
        console.log('global lp position after decrease long:', executeDecreaseLongResult.globalLPPositionAfter);
        console.log('global funding rate after decrease long:', executeDecreaseLongResult.globalFundingRateSampleAfter);
        console.log('prev PR after decrease long:', executeDecreaseLongResult.prevPremiumRateAfter);

        expect(executeDecreaseLongResult.globalLPPositionAfter?.netSize).toEqual(0n);
        expect(executeDecreaseLongResult.globalLPPositionAfter?.isLong).toBeFalsy();

    });

});
