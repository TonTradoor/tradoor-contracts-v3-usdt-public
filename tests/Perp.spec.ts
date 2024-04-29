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
import { adlPerpPosition, cancelPerpOrder, createDecreasePerpOrder, createIncreasePerpOrder, createTpSlPerpOrder, executePerpOrder, liquidatePerpPosition, } from './lib/PerpHelper';
import { ORDER_OP_TYPE_DECREASE_MARKET, ORDER_OP_TYPE_DECREASE_SL, ORDER_OP_TYPE_DECREASE_TP } from '../utils/constants';

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

    it('should executor cancel market increase perp order', async () => {
        let executionFee = 0.1;
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
        expect(createResult.order?.sizeDelta).toEqual(toJettonUnits(size));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(margin));
        expect(createResult.balanceAfter.orderBookJettonBalance).toEqual(createResult.balanceBefore.orderBookJettonBalance + toJettonUnits(margin));
        
        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
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

    it('should trader cancel limit increase perp order', async () => {
        let executionFee = 0.1;
        let isMarket = false;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
        expect(createResult.order?.sizeDelta).toEqual(toJettonUnits(size));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(margin));
        expect(createResult.balanceAfter.orderBookJettonBalance).toEqual(createResult.balanceBefore.orderBookJettonBalance + toJettonUnits(margin));
        
        /// cancel order
        const cancelResult = await cancelPerpOrder(user0, createResult.orderIdBefore);
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

    it('should execute increase perp market order', async () => {
        
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let indexPrice = 50000;
        let pr = 0.001; // 0.1%

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        /// executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, pr);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        // check position
        let perpPosition = executeResult.positionAfter;
        console.log('postion:', perpPosition);
        expect(perpPosition).not.toBeNull();
        // let tradingFee = size * indexPrice * TestEnv.tradingFeeRate;
        // expect(perpPosition?.margin).toEqual(toJettonUnits(margin - tradingFee));
        expect(perpPosition?.size).toEqual(toJettonUnits(size));
        expect(perpPosition?.entryPrice).toBeGreaterThanOrEqual(toPriceUnits(indexPrice));

        // check global position
        let globalPosition = executeResult.globalPositionAfter;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPosition?.margin);
        expect(globalPosition?.longSize).toEqual(perpPosition?.size);

        let globalLPPosition = executeResult.globalLPPositionAfter;
        console.log('globalLPPosition:', globalLPPosition);
        expect(globalLPPosition?.netSize).toEqual(perpPosition?.size);
        expect(globalLPPosition?.isLong).toBeFalsy();

    });

    it('should cancel decrease perp order', async () => {
        /// create order
        let executionFee = 0.1;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
        expect(createResult.order?.sizeDelta).toEqual(toJettonUnits(size));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
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

    it('should execute decrease perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));
        
        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let pr = 0.001;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, pr);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', perpPositionAfterIncrease);
        console.log('global position after increase:', executeResult.globalPositionAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let decreaseMargin = 50;
        let decreaseSize = 0.01;
        let decreaseTriggerPrice = 51000;
        let decreasePrice = 55000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createDecreaseResult = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });

        /// executor order
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, -pr);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position after decrease:', perpPositionAfterDecrease);
        console.log('global position after decrease:', executeDecreaseResult.globalPositionAfter);

        // check position
        // let tradingFee = decreaseSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * decreaseSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(decreaseMargin + tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toJettonUnits(decreaseSize));

        // check global position
        let globalPosition = executeDecreaseResult.globalPositionAfter;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPositionAfterDecrease?.margin);
        expect(globalPosition?.longSize).toEqual(perpPositionAfterDecrease?.size);

        let globalLPPosition = executeDecreaseResult.globalLPPositionAfter;
        console.log('globalLPPosition:', globalLPPosition);
        expect(globalLPPosition?.netSize).toEqual(perpPositionAfterDecrease?.size);
        expect(globalLPPosition?.isLong).toBeFalsy();

        /* =========================== close perp position ================================ */
        /// create order
        decreaseSize = size - decreaseSize;

        // create order
        const createDecreaseResult1 = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult1.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });

        /// executor order
        const executeDecreaseResult1 = await executePerpOrder(executor, createDecreaseResult1.orderIdBefore, decreasePrice, 0);
        printTransactionFees(executeDecreaseResult1.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult1.trxResult.transactions);
        expect(executeDecreaseResult1.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('global position after decrease:', executeDecreaseResult1.globalPositionAfter);

        // check position
        expect(executeDecreaseResult1.positionAfter.size).toEqual(0n);
        expect(executeDecreaseResult1.positionAfter.margin).toEqual(0n);

        // check global position
        let globalPositionAfterClose = executeDecreaseResult1.globalPositionAfter;
        console.log('globalPositionAfterClose:', globalPositionAfterClose);
        expect(globalPositionAfterClose?.longMargin).toEqual(0n);
        expect(globalPositionAfterClose?.longSize).toEqual(0n);

        let globalLPPositionAfterClose = executeDecreaseResult1.globalLPPositionAfter;
        console.log('globalLPPositionAfterClose:', globalLPPositionAfterClose);
        expect(globalLPPositionAfterClose?.netSize).toEqual(0n);
        expect(globalLPPositionAfterClose?.isLong).toBeFalsy();   
    });

    it('should execute increase perp market order with tp/sl', async () => {
        console.log("should execute increase perp market order with tp/sl");
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let indexPrice = 50000;
        let pr = 0.001;

        let tpSize = 0.01;
        let tpPrice = 51000;
        let slSize = 0.01;
        let slPrice = 49000;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee * 3, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        /// executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, pr);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        // check position
        let perpPosition = executeResult.positionAfter;
        console.log('postion:', perpPosition);

        expect(perpPosition).not.toBeNull();
        // let tradingFee = size * indexPrice * TestEnv.tradingFeeRate;
        // expect(perpPosition?.margin).toEqual(toJettonUnits(margin - tradingFee));
        expect(perpPosition?.size).toEqual(toJettonUnits(size));
        expect(perpPosition?.entryPrice).toBeGreaterThanOrEqual(toPriceUnits(indexPrice));

        // check tp order
        let tpOrder = await TestEnv.orderBook.getPerpPositionOrder(createResult.orderIdBefore + 1n);
        console.log('tpOrder after increase:', tpOrder);

        expect(tpOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_TP);
        expect(tpOrder?.sizeDelta).toEqual(toJettonUnits(tpSize));
        expect(tpOrder?.triggerPrice).toEqual(toPriceUnits(tpPrice));
        expect(tpOrder?.triggerAbove).toEqual(true);

        // check sl order
        let slOrder = await TestEnv.orderBook.getPerpPositionOrder(createResult.orderIdBefore + 2n);
        console.log('slOrder after increase:', slOrder);

        expect(slOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_SL);
        expect(slOrder?.sizeDelta).toEqual(toJettonUnits(slSize));
        expect(slOrder?.triggerPrice).toEqual(toPriceUnits(slPrice));
        expect(slOrder?.triggerAbove).toEqual(false);
    });
    
    it('should execute tp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));
        
        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let pr = 0.001;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, pr);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', perpPositionAfterIncrease);
        console.log('global position after increase:', executeResult.globalPositionAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let tpSize = 0.01;
        let tpPrice = 51000;
        let slSize = 0.01;
        let slPrice = 49000;
        let decreasePrice = 52000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;

        // create order
        const createDecreaseResult = await createTpSlPerpOrder(user1, executionFee, tokenId, isLong, tpSize, tpPrice, slSize, slPrice);
        printTransactionFees(createDecreaseResult.trxResult.transactions);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });
        let tpOrder = createDecreaseResult.order0;
        expect(tpOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_TP);
        expect(tpOrder?.sizeDelta).toEqual(toJettonUnits(tpSize));
        expect(tpOrder?.triggerPrice).toEqual(toPriceUnits(tpPrice));
        expect(tpOrder?.triggerAbove).toBeTruthy;

        let slOrder = createDecreaseResult.order1;
        expect(slOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_SL);
        expect(slOrder?.sizeDelta).toEqual(toJettonUnits(slSize));
        expect(slOrder?.triggerPrice).toEqual(toPriceUnits(slPrice));
        expect(slOrder?.triggerAbove).toBeFalsy();

        /// executor order
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, -pr);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position after decrease:', perpPositionAfterDecrease);
        console.log('global position after decrease:', executeDecreaseResult.globalPositionAfter);

        // check position
        // let tradingFee = tpSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * tpSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toJettonUnits(tpSize));

        expect(executeDecreaseResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(size - tpSize));
        expect(executeDecreaseResult.globalLPPositionAfter?.isLong).toBeFalsy();

    });

    it('should liquidate long perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));
        
        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, 0);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', perpPositionAfterIncrease);
        console.log('global position after increase:', executeResult.globalPositionAfter);

        /* =========================== liquidate perp ================================ */
        let liquidatePrice = 45000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('global position after liquidate:', liquidateResult.globalPositionAfter);

        // check position
        expect(liquidateResult.positionAfter.size).toEqual(0n);
        expect(liquidateResult.positionAfter.margin).toEqual(0n);

        expect(liquidateResult.globalLPPositionAfter?.netSize).toEqual(0n);

    });

    it('should liquidate short perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));
        
        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = false;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 49000;
        let increasePrice = 50000;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, 0);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', perpPositionAfterIncrease);
        console.log('global position after increase:', executeResult.globalPositionAfter);

        /* =========================== liquidate perp ================================ */
        let liquidatePrice = 56000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        printTransactionFees(liquidateResult.trxResult.transactions);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('position after liquidate:', liquidateResult.positionAfter);
        console.log('global position after liquidate:', liquidateResult.globalPositionAfter);

        // check position
        expect(liquidateResult.positionAfter.size).toEqual(0n);
        expect(liquidateResult.positionAfter.margin).toEqual(0n);

        expect(liquidateResult.globalLPPositionAfter?.netSize).toEqual(0n);

    });

    it('should adl perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionAfter;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(lpLiquidity));
        
        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, 0);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', perpPositionAfterIncrease);
        console.log('global position after increase:', executeResult.globalPositionAfter);

        /* =========================== adl perp ================================ */
        let adlMargin = 50;
        let adlSize = 0.01;
        let adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, tokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        let adlPosition = adlResult.positionAfter;
        console.log('global position after adl:', adlPosition);

        // check position
        expect(adlPosition?.size).toEqual(perpPositionAfterIncrease?.size - toJettonUnits(adlSize));
        expect(adlResult.globalLPPositionAfter?.netSize).toEqual(perpPositionAfterIncrease?.size - toJettonUnits(adlSize));
        expect(adlResult.globalLPPositionAfter?.isLong).toBeFalsy();

    });

    it('should execute two direction perp', async () => {
        // set block time
        blockchain.now = Math.floor(Date.now() / 1000);
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

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

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, 0);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        expect(executeResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.globalLPPositionAfter?.isLong).toBeFalsy();

        /* =========================== increase short perp ================================ */
        let increaseShortMargin = 100;
        let increaseShortSize = 0.02;
        let increaseShortTriggerPrice = 50000;
        let increaseShortIncreasePrice = 51000;

        // create order
        const createIncreaseShortResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, false, increaseShortMargin, increaseShortSize, increaseShortTriggerPrice, 0, 0, 0, 0);
        expect(createIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeIncreaseShortResult = await executePerpOrder(executor, createIncreaseShortResult.orderIdBefore, increaseShortIncreasePrice, 0);
        printTransactionFees(executeIncreaseShortResult.trxResult.transactions);
        expect(executeIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        expect(executeIncreaseShortResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(increaseShortSize - size));
        expect(executeIncreaseShortResult.globalLPPositionAfter?.isLong).toBeTruthy();

        /* =========================== decrease short perp ================================ */
        blockchain.now = blockchain.now + 10 * 60; // 1 hour

        let decreaseShortMargin = 100;
        let decreaseShortSize = 0.02;
        let decreaseShortTriggerPrice = 51000;
        let decreaseShortIncreasePrice = 50000;

        // create order
        const createDecreaseShortResult = await createDecreasePerpOrder(user1, executionFee, tokenId, false, decreaseShortMargin, decreaseShortSize, decreaseShortTriggerPrice);
        expect(createDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });
        console.log('decrease short order:', createDecreaseShortResult.order);

        // executor order
        const executeDecreaseShortResult = await executePerpOrder(executor, createDecreaseShortResult.orderIdBefore, decreaseShortIncreasePrice, 0);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        expect(executeDecreaseShortResult.globalLPPositionAfter?.netSize).toEqual(toJettonUnits(size));
        expect(executeDecreaseShortResult.globalLPPositionAfter?.isLong).toBeFalsy();
    });

});
