import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano, Dictionary } from '@ton/core';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { MockJetton } from '../wrappers/MockJetton';
import { Pool } from '../wrappers/Pool';
import { OrderBook } from '../wrappers/OrderBook';
import { TestEnv } from './lib/TestEnv';
import { getFriendlyTonBalance, getJettonBalance, getTonBalance, mint, toJettonUnits } from './lib/TokenHelper';
import { cancelLPOrder, createDecreaseLPOrder, createIncreaseLPOrder, executeLPOrder } from './lib/LPHelper';
import '@ton/test-utils';
import {createIncreasePerpOrder, executePerpOrder, updatePrice} from "./lib/PerpHelper";
import { createCompensate, executeCompensate, sendCompensateJetton } from './lib/OrderBookHelper';
import { ORDER_TYPE_LP } from '../utils/constants';

describe('LP', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let orderBook: SandboxContract<OrderBook>;
    let pool: SandboxContract<Pool>;
    let jetton: SandboxContract<MockJetton>;
    let executor: SandboxContract<TreasuryContract>;
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
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        user0JettonWallet = TestEnv.user0JettonWallet;
        orderBookJettonWallet = TestEnv.orderBookJettonWallet;

        // mint to user
        await mint(user0.address, '100000');
        await mint(user1.address, '100000');
        // get user jetton balance
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000'));
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

    it('auto refund -- not enough execution fee', async () => {
        let liquidity = 10;
        let executionFee = 0.04;
        
        // get orderBook TON balance
        console.log("orderBookTonBalance", await getFriendlyTonBalance(orderBook.address));

        // create order
        let createResult = await createIncreaseLPOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check user jetton balance
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        // check orderBook TON balance
        console.log("orderBookTonBalanceAfter", await getFriendlyTonBalance(orderBook.address));
    });

    it('auto refund -- stopped', async () => {
        let liquidity = 10;
        let executionFee = 0.05;
        
        // get orderBook TON balance
        console.log("orderBookTonBalance", await getFriendlyTonBalance(orderBook.address));

        // stop
        const trxResult = await TestEnv.orderBook.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            "Stop"
        );
        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: orderBook.address,
            success: true,
        });

        // create order
        let createResult = await createIncreaseLPOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check user jetton balance
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        // resume
        const trxResult1 = await TestEnv.orderBook.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            "Resume"
        );
        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: orderBook.address,
            success: true,
        });

        // create order
        let createResult1 = await createIncreaseLPOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult1.trxResult.transactions);
        expect(createResult1.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check index
        expect(createResult1.orderIdAfter).toEqual(createResult1.orderIdBefore + 1n);

        // check order
        expect(createResult1.order).not.toBeNull();

        // check orderbook jetton balance
        expect(createResult1.balanceAfter.orderBookJettonBalance).toEqual(toJettonUnits(liquidity));
    });

    it('should create increase LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreaseLPOrder(user0, liquidity, executionFee);
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

    it('should cancel increase LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreaseLPOrder(user0, liquidity, executionFee);

        /// cancel order
        const cancelResult = await cancelLPOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: user0JettonWallet.address,
            success: true,
        });

        // check order
        expect(cancelResult.order).toBeNull();

        // check jetton
        expect(cancelResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        console.log('cancel order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should execute increase LP', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createIncreaseLPOrder(user0, liquidity, executionFee);

        /// executor order
        const executeResult = await executeLPOrder(executor, createResult.orderIdBefore);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        // check position
        let position = executeResult.positionDataAfter.lpPosition;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(liquidity));
    });

    it('should create decrease LP order', async () => {
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createDecreaseLPOrder(user0, liquidity, executionFee);
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

    it('should cancel decrease LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createDecreaseLPOrder(user0, liquidity, executionFee);
        console.log('orderId', createResult.orderIdBefore);

        /// cancel order
        const cancelResult = await cancelLPOrder(executor, createResult.orderIdBefore);
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

    it('should decrease LP', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, liquidity, executionFee);
        
        // wait for 6s (cancel )
        blockchain.now = blockchain.now + 6;

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
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(liquidity));

        /* =========================== decrease LP ================================ */
        // after 10days
        blockchain.now = blockchain.now + 10 * 24 * 60 * 60;
        let decreaseLiquidity = 4;

        // create order
        const createDecreaseResult = await createDecreaseLPOrder(user0, decreaseLiquidity, executionFee);
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
        const executeDecreaseResult = await executeLPOrder(executor, createDecreaseResult.orderIdBefore);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(executeDecreaseResult.orderAfter).toBeNull();

        // check position
        position = executeDecreaseResult.positionDataAfter.lpPosition;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(liquidity - decreaseLiquidity));
    });

    it('should increase LP with bonus', async () => {
        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 10000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);
        printTransactionFees(createIncreaseResult.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult.balanceBefore.user0TonBalance - createIncreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase LP order gas used:', fromNano(executeIncreaseResult.balanceBefore.executorTonBalance - executeIncreaseResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
        console.log('lp position after increase:', executeIncreaseResult.positionDataAfter);
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
        let premiumRate = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        printTransactionFees(createResult.trxResult.transactions);
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

        console.log('position after increase long:', executeResult.positionDataAfter);
        console.log('lp position after increase long:', executeResult.lpPositionDataAfter);

        expect(executeResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== update price ================================ */
        let indexPrice = 51000;

        const updatePriceResult = await updatePrice(executor, tokenId, indexPrice);
        printTransactionFees(updatePriceResult.trxResult.transactions);

        expect(updatePriceResult.lpPositionDataAfter.globalLPUnrealizedPnl).toEqual(toJettonUnits((increasePrice - indexPrice) * size));

        console.log('lp position data after update price:', updatePriceResult.lpPositionDataAfter);
        console.log('position data after update price:', updatePriceResult.positionDataAfter);

        /* =========================== increase LP ================================ */
        /// create order
        const createIncreaseResult1 = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);
        printTransactionFees(createIncreaseResult1.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult1.balanceBefore.user0TonBalance - createIncreaseResult1.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        const executeIncreaseResult1 = await executeLPOrder(executor, createIncreaseResult1.orderIdBefore);
        printTransactionFees(executeIncreaseResult1.trxResult.transactions);
        expect(executeIncreaseResult1.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        console.log('execute increase LP order gas used:', fromNano(executeIncreaseResult1.balanceBefore.executorTonBalance - executeIncreaseResult1.balanceAfter.executorTonBalance + toNano(executionFee)));

        // check order
        expect(executeIncreaseResult1.orderAfter).toBeNull();

        // check position
        let position1 = executeIncreaseResult1.positionDataAfter.lpPosition;
        console.log('lp position data after increase position:', executeIncreaseResult1.positionDataAfter);

        expect(position1).not.toBeNull();
        expect(position1?.liquidity).toEqual(toJettonUnits(lpLiquidity + lpLiquidity));

        /* =========================== update price ================================ */
        let indexPrice1 = 49000;

        const updatePriceResult1 = await updatePrice(executor, tokenId, indexPrice1);
        printTransactionFees(updatePriceResult1.trxResult.transactions);

        expect(updatePriceResult1.lpPositionDataAfter.globalLPUnrealizedPnl).toEqual(toJettonUnits((increasePrice - indexPrice1) * size));

        console.log('lp position data after update price:', updatePriceResult1.lpPositionDataAfter);
        console.log('position data after update price:', updatePriceResult1.positionDataAfter);

        /* =========================== decrease LP ================================ */
        // after 1 days
        blockchain.now = blockchain.now + 10 * 24 * 60 * 60;
        let decreaseLiquidity = 5000;

        // create order
        const createDecreaseResult = await createDecreaseLPOrder(user0, decreaseLiquidity, executionFee);
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
        const executeDecreaseResult = await executeLPOrder(executor, createDecreaseResult.orderIdBefore);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });
        
        console.log('lp position data after decrease lp:', executeDecreaseResult.positionDataAfter);

        // check position
        position = executeDecreaseResult.positionDataAfter.lpPosition;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity + lpLiquidity - decreaseLiquidity));
        
    });

    it('should compensate transfer in', async () => {
        let amount = 100;
        const executeResult = await sendCompensateJetton(user0, amount);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.balanceAfter.orderBookJettonBalance).toEqual(executeResult.balanceBefore.orderBookJettonBalance + toJettonUnits(amount));
        
        let ton = 1;
        const transferResult = await executor.send({
            value: toNano(ton),
            to: orderBook.address,
            sendMode: 1
        });
        printTransactionFees(transferResult.transactions);
        expect(await getTonBalance(orderBook.address)).toBeGreaterThan(executeResult.balanceAfter.orderBookTonBalance + toNano(ton * 0.9))

    });

    it('should compensate', async () => {
        blockchain.now = Math.floor(Date.now() / 1000);

        // create order
        let liquidity = 10;
        let executionFee = 0.1;
        const createResult = await createIncreaseLPOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.liquidityDelta).toEqual(toJettonUnits(liquidity));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(liquidity));
        expect(createResult.balanceAfter.orderBookJettonBalance).toEqual(createResult.balanceBefore.orderBookJettonBalance + toJettonUnits(liquidity));
        console.log('orderbook ton after create lp order', fromNano(createResult.balanceAfter.orderBookTonBalance));
        
        // create compensate order
        const createCompensateResult = await createCompensate(deployer, ORDER_TYPE_LP, createResult.orderIdBefore, user0.address, liquidity, user1.address, executionFee);
        printTransactionFees(createCompensateResult.trxResult.transactions);
        expect(createCompensateResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: orderBook.address,
            success: true,
        });
        console.log('create compensate', createCompensateResult.compensate);
        // check compensate
        expect(createCompensateResult.compensateIdAfter).toEqual(createCompensateResult.compensateIdBefore + 1n);
        expect(createCompensateResult.compensate).not.toBeNull();

        // 1 day later
        blockchain.now = blockchain.now + 3 * 24 * 60 * 60 + 60;
        const executeCompensateResult = await executeCompensate(deployer, createCompensateResult.compensateIdBefore);
        printTransactionFees(executeCompensateResult.trxResult.transactions);
        expect(executeCompensateResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: orderBook.address,
            success: true,
        });
        // check compensate
        expect(executeCompensateResult.compensate).toBeNull();
        expect((await TestEnv.orderBook.getLpPositionOrder(createResult.orderIdBefore)).lpPositionOrder).toBeNull();
        // check jetton
        expect(executeCompensateResult.balanceAfter.user0JettonBalance).toEqual(executeCompensateResult.balanceBefore.user0JettonBalance + toJettonUnits(liquidity));
        expect(executeCompensateResult.balanceAfter.orderBookJettonBalance).toEqual(executeCompensateResult.balanceBefore.orderBookJettonBalance - toJettonUnits(liquidity));
        // check ton
        expect(executeCompensateResult.balanceAfter.user1TonBalance).toBeGreaterThan(executeCompensateResult.balanceBefore.user1TonBalance + toNano(executionFee * 0.9))

    });

});
