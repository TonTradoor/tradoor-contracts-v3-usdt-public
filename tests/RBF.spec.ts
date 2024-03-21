import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, beginCell, Cell, fromNano } from '@ton/core';
import { toUnits } from '../utils/util';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { MockJetton } from '../wrappers/MockJetton';
import { Pool } from '../wrappers/Pool';
import { OrderBook } from '../wrappers/OrderBook';
import { TestEnv } from './lib/TestEnv';
import { fromJettonUnits, getFriendlyJettonBalance, getFriendlyTonBalance, getJettonBalance, getTonBalance, mint, toJettonUnits } from './lib/TokenHelper';
import '@ton/test-utils';
import { cancelOrder, createDecreaseOrder, createIncreaseOrder, executeOrder } from './lib/RBFHelper';

describe('Pool', () => {
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

        // mint to user0
        await mint(user0.address, '100');
        // get user jetton balance
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100'));

        // check config
        let orderBookConfigData = await orderBook.getConfigData(executor.address, compensator.address);
        expect(orderBookConfigData.pool).toEqualAddress(pool.address);
        expect(orderBookConfigData.usdtWallet).toEqualAddress(orderBookJettonWallet.address);
        expect(orderBookConfigData.isExecutor).toBeTruthy();
        expect(orderBookConfigData.isCompensator).toBeTruthy();

        let poolConfigData = await pool.getConfigData();
        expect(poolConfigData.orderBook).toEqualAddress(orderBook.address);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('auto refund -- not enough execution fee', async () => {
        let liquidity = 10;
        let executionFee = 0.1;
        
        // get orderBook TON balance
        console.log("orderBookTonBalance", await getFriendlyTonBalance(orderBook.address));

        // create order
        let createResult = await createIncreaseOrder(user0, liquidity, executionFee);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check orderBook jetton balance
        expect(await getJettonBalance(orderBook.address)).toEqual(0n);

        // check orderBook TON balance
        console.log("orderBookTonBalanceAfter", await getFriendlyTonBalance(orderBook.address));
    });

    it('should create increase RBF order', async () => {
        let liquidity = 10n;
        let executionFee = 0.2;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreaseOrder(user0, liquidity, executionFee);
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
        expect(createResult.order?.liquidityDelta).toEqual(toJettonUnits(liquidity));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(liquidity));
        expect(createResult.balanceAfter.orderBookJettonBalance).toEqual(createResult.balanceBefore.orderBookJettonBalance + toJettonUnits(liquidity));
    });

    it('should cancel increase RBF order', async () => {
        /// create order
        let liquidity = 10n;
        let executionFee = 0.2;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreaseOrder(user0, liquidity, executionFee);
        
        // wait for 6s (cancel )
        blockchain.now = blockchain.now + 6;

        /// cancel order
        const cancelResult = await cancelOrder(executor, createResult.orderIdBefore);
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

    it('should execute increase RBF', async () => {
        /// create order
        let liquidity = 10n;
        let executionFee = 0.2;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreaseOrder(user0, liquidity, executionFee);
        
        // wait for 6s (cancel )
        blockchain.now = blockchain.now + 6;

        /// executor order
        const executeResult = await executeOrder(executor, createResult.orderIdBefore);
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
        let position = executeResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(liquidity));
    });

    it('should create decrease RBF order', async () => {
        let liquidity = 10n;
        let executionFee = 0.2;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createDecreaseOrder(user0, liquidity, executionFee);
        console.log('order:', createResult.order);

        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: orderBook.address,
            success: true,
        });

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.liquidityDelta).toEqual(toJettonUnits(liquidity));
    });

    it('should cancel decrease RBF order', async () => {
        /// create order
        let liquidity = 10n;
        let executionFee = 0.2;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createDecreaseOrder(user0, liquidity, executionFee);
        console.log('orderId', createResult.orderIdBefore);

        // wait for 6s (cancel )
        blockchain.now = blockchain.now + 6;

        /// cancel order
        const cancelResult = await cancelOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(cancelResult.order).toBeNull();

        console.log('create order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should decrease RBF', async () => {
        /* =========================== increase RBF ================================ */
        /// create order
        let liquidity = 10n;
        let executionFee = 0.2;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseOrder(user0, liquidity, executionFee);
        
        // wait for 6s (cancel )
        blockchain.now = blockchain.now + 6;

        /// executor order
        const executeIncreaseResult = await executeOrder(executor, createIncreaseResult.orderIdBefore);
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
        expect(position?.liquidity).toEqual(toJettonUnits(liquidity));

        /* =========================== decrease RBF ================================ */
        // after 10days
        blockchain.now = blockchain.now + 10 * 24 * 60 * 60;
        let decreaseLiquidity = 4n;

        // create order
        const createDecreaseResult = await createDecreaseOrder(user0, decreaseLiquidity, executionFee);
        console.log('order:', createDecreaseResult.order);

        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: orderBook.address,
            success: true,
        });

        console.log('create order gas used:', fromNano(createDecreaseResult.balanceBefore.user0TonBalance - createDecreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
        expect(createDecreaseResult.order).not.toBeNull();
        expect(createDecreaseResult.order?.liquidityDelta).toEqual(toJettonUnits(decreaseLiquidity));

        blockchain.now = blockchain.now + 10;
        /// executor order
        const executeDecreaseResult = await executeOrder(executor, createDecreaseResult.orderIdBefore);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(executeDecreaseResult.order).toBeNull();

        // check position
        position = executeDecreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(liquidity - decreaseLiquidity));
    });
});
