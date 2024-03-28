import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano } from '@ton/core';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { MockJetton } from '../wrappers/MockJetton';
import { Pool } from '../wrappers/Pool';
import { OrderBook } from '../wrappers/OrderBook';
import { TestEnv } from './lib/TestEnv';
import { getFriendlyTonBalance, getJettonBalance, mint, toJettonUnits } from './lib/TokenHelper';
import { cancelLPOrder, createDecreaseLPOrder, createIncreaseLPOrder, executeLPOrder } from './lib/LPHelper';
import '@ton/test-utils';
import { cancelPerpOrder, createIncreasePerpOrder, executePerpOrder } from './lib/PerpHelper';

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
        await mint(user0.address, '1000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('1000'));

        await mint(user1.address, '1000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('1000'));

        // check config
        let orderBookConfigData = await orderBook.getConfigData(executor.address);
        expect(orderBookConfigData.pool).toEqualAddress(pool.address);
        expect(orderBookConfigData.usdtWallet).toEqualAddress(orderBookJettonWallet.address);
        expect(orderBookConfigData.isExecutor).toBeTruthy();

        let poolConfigData = await pool.getConfigData();
        expect(poolConfigData.orderBook).toEqualAddress(orderBook.address);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should create increase perp market order', async () => {
        let executionFee = 0.1;
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
        expect(createResult.order?.sizeDelta).toEqual(toJettonUnits(size));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(margin));
        expect(createResult.balanceAfter.orderBookJettonBalance).toEqual(createResult.balanceBefore.orderBookJettonBalance + toJettonUnits(margin));
    });

    it('should cancel increase perp order', async () => {
        let executionFee = 0.1;
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        
        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: user0JettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(cancelResult.order).toBeNull();

        // check jetton
        expect(cancelResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        console.log('cancel order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should execute increase perp market order', async () => {
        
        /* =========================== increase LP ================================ */
        /// create order
        let lpMargin = 10;
        let lpLiquidity = 100;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpMargin, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.order).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.margin).toEqual(toJettonUnits(lpMargin));
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let indexPrice = 50000;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        /// executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(executeResult.order).toBeNull();

        // check position
        let perpPosition = executeResult.positionAfter;
        expect(perpPosition).not.toBeNull();
        let tradingFee = size * indexPrice * TestEnv.tradingFeeRate;
        console.log('tradingFee:', tradingFee);
        expect(perpPosition?.margin).toEqual(toJettonUnits(margin - tradingFee));
        expect(perpPosition?.size).toEqual(toJettonUnits(size));
    });

    // it('should create decrease LP order', async () => {
    //     let margin = 10;
    //     let liquidity = 100;
    //     let executionFee = 0.1;

    //     // set block time
    //     const time1 = Math.floor(Date.now() / 1000); 
    //     blockchain.now = time1;

    //     // create order
    //     const createResult = await createDecreaseLPOrder(user0, margin, liquidity, executionFee);
    //     console.log('order:', createResult.order);

    //     expect(createResult.trxResult.transactions).toHaveTransaction({
    //         from: user0.address,
    //         to: orderBook.address,
    //         success: true,
    //     });

    //     console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

    //     // check order
    //     expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
    //     expect(createResult.order).not.toBeNull();
    //     expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
    //     expect(createResult.order?.liquidityDelta).toEqual(toJettonUnits(liquidity));
    // });

    // it('should cancel decrease LP order', async () => {
    //     /// create order
    //     let margin = 10;
    //     let liquidity = 100;
    //     let executionFee = 0.1;

    //     // set block time
    //     const time1 = Math.floor(Date.now() / 1000); 
    //     blockchain.now = time1;

    //     // create order
    //     const createResult = await createDecreaseLPOrder(user0, margin, liquidity, executionFee);
    //     console.log('orderId', createResult.orderIdBefore);

    //     // wait for 6s (cancel )
    //     blockchain.now = blockchain.now + 6;

    //     /// cancel order
    //     const cancelResult = await cancelLPOrder(executor, createResult.orderIdBefore);
    //     printTransactionFees(cancelResult.trxResult.transactions);
    //     prettyLogTransactions(cancelResult.trxResult.transactions);

    //     expect(cancelResult.trxResult.transactions).toHaveTransaction({
    //         from: executor.address,
    //         to: orderBook.address,
    //         success: true,
    //     });

    //     // check order
    //     expect(cancelResult.order).toBeNull();

    //     console.log('create order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    // });

    // it('should decrease LP', async () => {
    //     /* =========================== increase LP ================================ */
    //     /// create order
    //     let margin = 10;
    //     let liquidity = 100;
    //     let executionFee = 0.1;

    //     // set block time
    //     const time1 = Math.floor(Date.now() / 1000); 
    //     blockchain.now = time1;

    //     // create order
    //     const createIncreaseResult = await createIncreaseLPOrder(user0, margin, liquidity, executionFee);
        
    //     // wait for 6s (cancel )
    //     blockchain.now = blockchain.now + 6;

    //     /// executor order
    //     const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
    //     printTransactionFees(executeIncreaseResult.trxResult.transactions);
    //     prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
    //     expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
    //         from: pool.address,
    //         to: orderBook.address,
    //         success: true,
    //     });

    //     // check order
    //     expect(executeIncreaseResult.order).toBeNull();

    //     // check position
    //     let position = executeIncreaseResult.positionAfter;
    //     expect(position).not.toBeNull();
    //     expect(position?.margin).toEqual(toJettonUnits(margin));
    //     expect(position?.liquidity).toEqual(toJettonUnits(liquidity));

    //     /* =========================== decrease LP ================================ */
    //     // after 10days
    //     blockchain.now = blockchain.now + 10 * 24 * 60 * 60;
    //     let decreaseMargin = 4;
    //     let decreaseLiquidity = 30;

    //     // create order
    //     const createDecreaseResult = await createDecreaseLPOrder(user0, decreaseMargin, decreaseLiquidity, executionFee);
    //     console.log('order:', createDecreaseResult.order);

    //     expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
    //         from: user0.address,
    //         to: orderBook.address,
    //         success: true,
    //     });

    //     console.log('create order gas used:', fromNano(createDecreaseResult.balanceBefore.user0TonBalance - createDecreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

    //     // check order
    //     expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
    //     expect(createDecreaseResult.order).not.toBeNull();
    //     expect(createDecreaseResult.order?.marginDelta).toEqual(toJettonUnits(decreaseMargin));
    //     expect(createDecreaseResult.order?.liquidityDelta).toEqual(toJettonUnits(decreaseLiquidity));

    //     blockchain.now = blockchain.now + 10;
    //     /// executor order
    //     const executeDecreaseResult = await executeLPOrder(executor, createDecreaseResult.orderIdBefore);
    //     printTransactionFees(executeDecreaseResult.trxResult.transactions);
    //     prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
    //     expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
    //         from: pool.address,
    //         to: orderBook.address,
    //         success: true,
    //     });

    //     // check order
    //     expect(executeDecreaseResult.order).toBeNull();

    //     // check position
    //     position = executeDecreaseResult.positionAfter;
    //     expect(position).not.toBeNull();
    //     expect(position?.margin).toEqual(toJettonUnits(margin - decreaseMargin));
    //     expect(position?.liquidity).toEqual(toJettonUnits(liquidity - decreaseLiquidity));
    // });

});
