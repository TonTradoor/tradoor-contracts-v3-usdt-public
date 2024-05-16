import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano } from '@ton/core';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { MockJetton } from '../wrappers/MockJetton';
import { Pool } from '../wrappers/Pool';
import { OrderBook } from '../wrappers/OrderBook';
import { TestEnv } from './lib/TestEnv';
import { fromJettonUnits, getFriendlyTonBalance, getJettonBalance, mint, toJettonUnits, toPriceUnits } from './lib/TokenHelper';
import { cancelLPOrder, createDecreaseLPOrder, createIncreaseLPOrder, executeLPOrder } from './lib/LPHelper';
import '@ton/test-utils';
import { adlPerpPosition, cancelPerpOrder, claimProtocolFee, createDecreasePerpOrder, createIncreasePerpOrder, createTpSlPerpOrder, executePerpOrder, liquidatePerpPosition, updatePrice, } from './lib/PerpHelper';
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
    let user2: SandboxContract<TreasuryContract>;
    let user3: SandboxContract<TreasuryContract>;
    let user0JettonWallet: SandboxContract<JettonDefaultWallet>;
    let orderBookJettonWallet: SandboxContract<JettonDefaultWallet>;
    let claimExecutor: SandboxContract<TreasuryContract>;

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
        user2 = TestEnv.user2;
        user3 = TestEnv.user3;
        user0JettonWallet = TestEnv.user0JettonWallet;
        orderBookJettonWallet = TestEnv.orderBookJettonWallet;
        claimExecutor = TestEnv.claimExecutor;

        // mint
        await mint(user0.address, '100000000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000000'));

        await mint(user1.address, '100000000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('100000000'));

        await mint(user2.address, '100000000');
        expect(await getJettonBalance(user2.address)).toEqual(toJettonUnits('100000000'));

        await mint(user3.address, '100000000');
        expect(await getJettonBalance(user3.address)).toEqual(toJettonUnits('100000000'));

        // check config
        let orderBookConfigData = await orderBook.getConfigData(executor.address);
        expect(orderBookConfigData.pool).toEqualAddress(pool.address);
        expect(orderBookConfigData.usdtWallet).toEqualAddress(orderBookJettonWallet.address);
        expect(orderBookConfigData.isExecutor).toBeTruthy();

        let poolConfigData = await pool.getConfigData(null);
        expect(poolConfigData.orderBook).toEqualAddress(orderBook.address);
    });

    // it('should deploy', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and pool are ready to use
    // });

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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        let globalPosition = executeResult.positionDataAfter.globalPosition;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPosition?.margin);
        expect(globalPosition?.longSize).toEqual(perpPosition?.size);

        let globalLPPosition = executeResult.positionDataAfter.globalLPPosition;
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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        console.log('position after increase:', executeResult.positionDataAfter);
        console.log('lp after increase:', executeResult.lpPositionDataAfter);

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
        console.log('position after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('lp after decrease:', executeResult.lpPositionDataAfter);

        // check position
        // let tradingFee = decreaseSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * decreaseSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(decreaseMargin + tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toJettonUnits(decreaseSize));

        // check global position
        let globalPosition = executeDecreaseResult.positionDataAfter.globalPosition;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPositionAfterDecrease?.margin);
        expect(globalPosition?.longSize).toEqual(perpPositionAfterDecrease?.size);

        let globalLPPosition = executeDecreaseResult.positionDataAfter.globalLPPosition;
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
        console.log('position after close:', executeDecreaseResult1.positionDataAfter);
        console.log('lp after close:', executeDecreaseResult1.lpPositionDataAfter);

        // check position
        expect(executeDecreaseResult1.positionAfter.size).toEqual(0n);
        expect(executeDecreaseResult1.positionAfter.margin).toEqual(0n);

        // check global position
        let globalPositionAfterClose = executeDecreaseResult1.positionDataAfter.globalPosition;
        console.log('globalPositionAfterClose:', globalPositionAfterClose);
        expect(globalPositionAfterClose?.longMargin).toEqual(0n);
        expect(globalPositionAfterClose?.longSize).toEqual(0n);

        let globalLPPositionAfterClose = executeDecreaseResult1.positionDataAfter.globalLPPosition;
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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        console.log('orderbook ton balance after create order', fromNano(createResult.balanceAfter.orderBookTonBalance));
        console.log('total execution fee after create order with tp/sl', fromNano((await orderBook.getConfigData(null)).totalExecutionFee));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: orderBook.address,
            success: true,
        });
        console.log('orderbook ton balance after cancel order', fromNano(cancelResult.balanceAfter.orderBookTonBalance));
        console.log('total execution fee after cancel order with tp/sl', fromNano((await orderBook.getConfigData(null)).totalExecutionFee));
        console.log('receive execution fee', fromNano(cancelResult.balanceAfter.user1TonBalance - cancelResult.balanceBefore.user1TonBalance));

        // create order
        const createResult1 = await createIncreasePerpOrder(user1, executionFee * 3, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult1.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });
        console.log('total execution fee after create order with tp/sl', fromNano((await orderBook.getConfigData(null)).totalExecutionFee));

        /// executor order
        const executeResult = await executePerpOrder(executor, createResult1.orderIdBefore, indexPrice, pr);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        console.log('total execution fee after execute order', fromNano((await orderBook.getConfigData(null)).totalExecutionFee));

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
        let tpOrder = (await TestEnv.orderBook.getPerpPositionOrder(createResult1.orderIdBefore + 1n)).perpPositionOrder;
        console.log('tpOrder after increase:', tpOrder);

        expect(tpOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_TP);
        expect(tpOrder?.sizeDelta).toEqual(toJettonUnits(tpSize));
        expect(tpOrder?.triggerPrice).toEqual(toPriceUnits(tpPrice));
        expect(tpOrder?.triggerAbove).toEqual(true);

        // check sl order
        let slOrder = (await TestEnv.orderBook.getPerpPositionOrder(createResult1.orderIdBefore + 2n)).perpPositionOrder;
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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('lp data after increase:', executeResult.lpPositionDataAfter);

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
        const createDecreaseResult = await createTpSlPerpOrder(user1, executionFee * 2, tokenId, isLong, tpSize, tpPrice, slSize, slPrice);
        printTransactionFees(createDecreaseResult.trxResult.transactions);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });
        console.log('orderbook ton balance', fromNano(createDecreaseResult.balanceAfter.orderBookTonBalance));
        console.log('total execution fee after create order', fromNano((await orderBook.getConfigData(null)).totalExecutionFee));

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
        console.log('position data after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('lp data after decrease:', executeDecreaseResult.lpPositionDataAfter);

        console.log('orderbook ton balance', fromNano(executeDecreaseResult.balanceAfter.orderBookTonBalance));
        console.log('total execution fee after execute order', fromNano((await orderBook.getConfigData(null)).totalExecutionFee));

        // check position
        // let tradingFee = tpSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * tpSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toJettonUnits(tpSize));

        expect(executeDecreaseResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(size - tpSize));
        expect(executeDecreaseResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('lp data after increase:', executeResult.lpPositionDataAfter);

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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('lp data after increase:', executeResult.lpPositionDataAfter);


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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('lp data after increase:', executeResult.lpPositionDataAfter);

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

    it('should claim funding fee', async () => {
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
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
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
        expect(executeResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

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
        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(increaseShortSize - size));
        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.isLong).toBeTruthy();

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
        printTransactionFees(executeDecreaseShortResult.trxResult.transactions);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== claim protocol fee ================================ */
        console.log('config', await pool.getConfigData(null));

        const claimResult = await claimProtocolFee(claimExecutor);
        printTransactionFees(claimResult.trxResult.transactions);
        expect(claimResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });
        console.log('jetton balance of claim executor', claimResult.balanceAfter.claimExecutorJettonBalance);
        console.log('config', await pool.getConfigData(null));

    });

    it('should execute lp and perp', async () => {
        // set block time
        blockchain.now = Math.floor(Date.now() / 1000);
        blockchain.now = blockchain.now - blockchain.now % 3600 + 60 * 60; // HH+1:10

        /* =========================== increase LP ================================ */
        /// create order
        let increaseLiquidity = 2000000;
        let executionFee = 0.1;

        // create order
        const createIncreaseResult = await createIncreaseLPOrder(user0, increaseLiquidity, executionFee);
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });
        /// executor order
        const executeIncreaseResult = await executeLPOrder(executor, createIncreaseResult.orderIdBefore);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        let position = executeIncreaseResult.positionDataAfter.lpPosition;
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(toJettonUnits(2000000));
        expect(executeIncreaseResult.positionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(2000000));
        expect(executeIncreaseResult.positionDataAfter.globalLPFund).toEqual(toJettonUnits(2000000));
        console.log('lp data after increase:', executeIncreaseResult.positionDataAfter);
        
        /* =========================== increase long perp ================================ */
        // blockchain.now = blockchain.now + 20 * 60; // H:20
        blockchain.now = blockchain.now + 1040;

        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let increaseLongMargin = 6030;
        let increaseLongSize = 10;
        let triggerPrice = 3100;
        let increaseLongPrice = 3000;
        let increaseLongPR = 0.000780;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, increaseLongMargin, increaseLongSize, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increaseLongPrice, increaseLongPR);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check position
        expect(executeResult.positionAfter.margin).toEqual(toJettonUnits(5999.9883));
        expect(executeResult.positionAfter.size).toEqual(toJettonUnits(10));
        expect(executeResult.positionAfter.entryPrice).toEqual(toPriceUnits(3001.1700));

        expect(executeResult.positionDataAfter.globalLPPosition?.entryPrice).toEqual(toPriceUnits(3001.17));
        expect(executeResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(10));
        expect(executeResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        expect(executeResult.positionDataAfter.globalPosition?.longValue).toEqual(toJettonUnits(30011.7000));
        expect(executeResult.positionDataAfter.globalPosition?.shortValue).toEqual(toJettonUnits(0));
        expect(executeResult.positionDataAfter.globalPerpNetValue).toEqual(toJettonUnits(30011.7000));
        expect(executeResult.positionDataAfter.globalPerpSingleValue).toEqual(toJettonUnits(30011.7000));

        expect(executeResult.positionDataAfter.globalFundingRateSample?.sampleCount).toEqual(208n);

        expect(executeResult.lpPositionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(2000000));
        expect(executeResult.lpPositionDataAfter.globalLPFund).toEqual(toJettonUnits(2000018.007020));

        console.log('position data after increase long:', executeResult.positionDataAfter);
        console.log('lp data after increase long:', executeResult.lpPositionDataAfter);

        /* =========================== increase short perp ================================ */
        // blockchain.now = blockchain.now + 20 * 60; // H:40
        blockchain.now = blockchain.now + 1185;

        let increaseShortMargin = 1246.704711;
        let increaseShortSize = 2;
        let increaseShortTriggerPrice = 3000;
        let increaseShortPrice = 3100;
        let increaseShortPR = 0.000650;

        // create order
        const createIncreaseShortResult = await createIncreasePerpOrder(user2, executionFee, isMarket, tokenId, false, increaseShortMargin, increaseShortSize, increaseShortTriggerPrice, 0, 0, 0, 0);
        expect(createIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBookJettonWallet.address,
            to: orderBook.address,
            success: true,
        });

        // executor order
        const executeIncreaseShortResult = await executePerpOrder(executor, createIncreaseShortResult.orderIdBefore, increaseShortPrice, increaseShortPR);
        printTransactionFees(executeIncreaseShortResult.trxResult.transactions);
        expect(executeIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        
        // check position
        expect(executeIncreaseShortResult.positionAfter.margin).toEqual(toJettonUnits(1240.500278));
        expect(executeIncreaseShortResult.positionAfter.size).toEqual(toJettonUnits(2));
        expect(executeIncreaseShortResult.positionAfter.entryPrice).toEqual(toPriceUnits(3102.2165));

        expect(executeIncreaseShortResult.positionDataAfter.globalPosition?.longValue).toEqual(toJettonUnits(31022.165));
        expect(executeIncreaseShortResult.positionDataAfter.globalPosition?.shortValue).toEqual(toJettonUnits(6204.4330));
        expect(executeIncreaseShortResult.positionDataAfter.globalPerpNetValue).toEqual(toJettonUnits(24817.7320));
        expect(executeIncreaseShortResult.positionDataAfter.globalPerpSingleValue).toEqual(toJettonUnits(31022.165));

        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(8));
        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.unrealizedPnl).toEqual(toJettonUnits(-808.372000));
        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        expect(executeIncreaseShortResult.positionDataAfter.globalFundingRateSample?.sampleCount).toEqual(445n);
        expect(executeIncreaseShortResult.positionDataAfter.globalFundingRateSample?.cumulativePremiumRate).toEqual(toNano(60.44922000));

        expect(executeIncreaseShortResult.lpPositionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(2000000));
        expect(executeIncreaseShortResult.lpPositionDataAfter.globalLPFund).toEqual(toJettonUnits(1999819.636679));

        console.log('position data after increase short:', executeIncreaseShortResult.positionDataAfter);
        console.log('lp data after increase short:', executeIncreaseShortResult.lpPositionDataAfter);

        /* =========================== increase LP ================================ */
        /// create order
        let increaseLiquidity2 = 1000000;

        // create order
        const createIncreaseResult2 = await createIncreaseLPOrder(user3, increaseLiquidity2, executionFee);

        /// executor order
        const executeIncreaseResult2 = await executeLPOrder(executor, createIncreaseResult2.orderIdBefore);
        printTransactionFees(executeIncreaseResult2.trxResult.transactions);
        expect(executeIncreaseResult2.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult2.orderAfter).toBeNull();

        // check position
        let position2 = executeIncreaseResult2.positionDataAfter.lpPosition;
        expect(position2).not.toBeNull();
        expect(position2?.liquidity).toEqual(toJettonUnits(1000000));
        expect(position2?.bonus).toEqual(toJettonUnits(494.367660));

        expect(executeIncreaseResult2.positionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(3000000));
        expect(executeIncreaseResult2.positionDataAfter.globalLPFund).toEqual(toJettonUnits(2999819.636679));
        console.log('lp data after increase:', executeIncreaseResult2.positionDataAfter);

        /* =========================== update price ================================ */
        blockchain.now = blockchain.now - blockchain.now % 3600 + 60 * 60; // HH+2:00
        // let newPrice = 3000;
        // const updatePriceResult = await updatePrice(executor, tokenId, newPrice);

        // console.log('position data after update price:', updatePriceResult.positionDataAfter);
        // console.log('lp data after update price:', updatePriceResult.lpPositionDataAfter)

        /* =========================== decrease short perp ================================ */
        blockchain.now = blockchain.now + 459; // H+1:10

        let decreaseShortMargin = 0;
        let decreaseShortSize = 2;
        let decreaseShortTriggerPrice = 3100;
        let decreaseShortIncreasePrice = 3000;
        let decreaseShortPR = 0.000520;

        // create order
        const createDecreaseShortResult = await createDecreasePerpOrder(user2, executionFee, tokenId, false, decreaseShortMargin, decreaseShortSize, decreaseShortTriggerPrice);
        expect(createDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user2.address,
            to: orderBook.address,
            success: true,
        });
        console.log('decrease short order:', createDecreaseShortResult.order);

        // executor order
        const executeDecreaseShortResult = await executePerpOrder(executor, createDecreaseShortResult.orderIdBefore, decreaseShortIncreasePrice, decreaseShortPR);
        printTransactionFees(executeDecreaseShortResult.trxResult.transactions);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });
        // check position
        expect(executeDecreaseShortResult.positionAfter.margin).toEqual(toJettonUnits(0));
        expect(executeDecreaseShortResult.positionAfter.size).toEqual(toJettonUnits(0));
        expect(executeDecreaseShortResult.positionAfter.entryPrice).toEqual(toPriceUnits(0));
        expect(executeDecreaseShortResult.balanceAfter.user2JettonBalance - executeDecreaseShortResult.balanceBefore.user2JettonBalance).toEqual(toJettonUnits(1435.520608));

        expect(executeDecreaseShortResult.positionDataAfter.globalPosition?.longValue).toEqual(toJettonUnits(30017.55));
        expect(executeDecreaseShortResult.positionDataAfter.globalPosition?.shortValue).toEqual(toJettonUnits(0));
        expect(executeDecreaseShortResult.positionDataAfter.globalPerpNetValue).toEqual(toJettonUnits(30017.55));
        expect(executeDecreaseShortResult.positionDataAfter.globalPerpSingleValue).toEqual(toJettonUnits(30017.55));

        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(10));
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.entryPrice).toEqual(toPriceUnits(3001.287));
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.unrealizedPnl).toEqual(toJettonUnits(-4.680000));
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        expect(executeDecreaseShortResult.positionDataAfter.globalFundingRateSample?.sampleCount).toEqual(0n);
        expect(executeDecreaseShortResult.positionDataAfter.globalFundingRateSample?.cumulativePremiumRate).toEqual(toNano(0));

        expect(executeDecreaseShortResult.positionDataAfter.globalPosition?.longFundingFeeGrowth).toEqual(toPriceUnits(-0.05042047873500000000));
        expect(executeDecreaseShortResult.positionDataAfter.globalPosition?.shortFundingFeeGrowth).toEqual(toPriceUnits(0.05042047873500000000));

        expect(executeDecreaseShortResult.lpPositionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(3000000));
        expect(executeDecreaseShortResult.lpPositionDataAfter.globalLPFund).toEqual(toJettonUnits(2999823.238785));
        expect(executeDecreaseShortResult.lpPositionDataAfter.globalLPFundingFeeGrowth).toEqual(toPriceUnits(0.00000013445460996000));
        
        console.log('position data after decrease short:', executeDecreaseShortResult.positionDataAfter);
        console.log('lp data after decrease short:', executeDecreaseShortResult.lpPositionDataAfter)

        /* =========================== decrease long perp ================================ */
        blockchain.now = blockchain.now + 2271; // HH+2:20

        let decreaseLongMargin = 0;
        let decreaseLongSize = 10;
        let decreaseLongTriggerPrice = 2800;
        let decreaseLongIncreasePrice = 2900;
        let decreaseLongPR = 0

        // create order
        const createDecreaseLongResult = await createDecreasePerpOrder(user1, executionFee, tokenId, true, decreaseLongMargin, decreaseLongSize, decreaseLongTriggerPrice);
        expect(createDecreaseLongResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: orderBook.address,
            success: true,
        });
        // executor order
        const executeDecreaseLongResult = await executePerpOrder(executor, createDecreaseLongResult.orderIdBefore, decreaseLongIncreasePrice, decreaseLongPR);
        printTransactionFees(executeDecreaseLongResult.trxResult.transactions);
        expect(executeDecreaseLongResult.trxResult.transactions).toHaveTransaction({
            from: orderBook.address,
            to: pool.address,
            success: true,
        });

        // check position
        expect(executeDecreaseLongResult.positionAfter.margin).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionAfter.size).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionAfter.entryPrice).toEqual(toPriceUnits(0));
        expect(executeDecreaseLongResult.balanceAfter.user1JettonBalance - executeDecreaseLongResult.balanceBefore.user1JettonBalance).toEqual(toJettonUnits(4966.316555));

        expect(executeDecreaseLongResult.positionDataAfter.globalPosition?.longValue).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionDataAfter.globalPosition?.shortValue).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionDataAfter.globalPerpNetValue).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionDataAfter.globalPerpSingleValue).toEqual(toJettonUnits(0));

        expect(executeDecreaseLongResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionDataAfter.globalLPPosition?.entryPrice).toEqual(toPriceUnits(0));
        expect(executeDecreaseLongResult.positionDataAfter.globalLPPosition?.unrealizedPnl).toEqual(toJettonUnits(0));
        expect(executeDecreaseLongResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        expect(executeDecreaseLongResult.positionDataAfter.globalFundingRateSample?.sampleCount).toEqual(546n);
        expect(executeDecreaseLongResult.positionDataAfter.globalFundingRateSample?.cumulativePremiumRate).toEqual(toNano(77.65212));

        expect(executeDecreaseLongResult.lpPositionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(3000000));
        expect(executeDecreaseLongResult.lpPositionDataAfter.globalLPFund).toEqual(toJettonUnits(3000845.973309));

        console.log('execute decrease long perp order gas used:', fromNano(executeDecreaseLongResult.balanceBefore.executorTonBalance - executeDecreaseLongResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position data after decrease long:', executeDecreaseLongResult.positionDataAfter);
        console.log('lp data after decrease long:', executeDecreaseLongResult.lpPositionDataAfter);

        /* =========================== decrease LP ================================ */
        blockchain.now = blockchain.now + 10 * 60;
        let decreaseLiquidity = 500000;

        // create order
        const createDecreaseResult = await createDecreaseLPOrder(user3, decreaseLiquidity, executionFee);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user3.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
        expect(createDecreaseResult.order).not.toBeNull();
        expect(createDecreaseResult.order?.liquidityDelta).toEqual(toJettonUnits(decreaseLiquidity));

        /// executor order
        const executeDecreaseResult = await executeLPOrder(executor, createDecreaseResult.orderIdBefore);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });
        
        console.log('lp position data after decrease lp:', executeDecreaseResult.positionDataAfter);

        // check position
        expect(executeDecreaseResult.positionDataAfter.lpPosition).not.toBeNull();
        expect(executeDecreaseResult.positionDataAfter.lpPosition?.liquidity).toEqual(toJettonUnits(500000));
        expect(executeDecreaseResult.positionDataAfter.lpPosition?.bonus).toEqual(toJettonUnits(353.372109));
        expect(executeDecreaseResult.balanceAfter.user3JettonBalance - executeDecreaseResult.balanceBefore.user3JettonBalance).toEqual(toJettonUnits(500141.130005));

        expect(executeDecreaseResult.positionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(2500000));
        expect(executeDecreaseResult.positionDataAfter.globalLPFund).toEqual(toJettonUnits(2500704.977758));

        console.log('lp data after increase:', executeDecreaseResult.positionDataAfter);

        /* =========================== decrease LP ================================ */
        blockchain.now = blockchain.now + 10 * 60; // :40
        let decreaseLiquidity2 = 1000000;

        // create order
        const createDecreaseResult2 = await createDecreaseLPOrder(user0, decreaseLiquidity2, executionFee);
        expect(createDecreaseResult2.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createDecreaseResult2.orderIdAfter).toEqual(createDecreaseResult2.orderIdBefore + 1n);
        expect(createDecreaseResult2.order).not.toBeNull();
        expect(createDecreaseResult2.order?.liquidityDelta).toEqual(toJettonUnits(decreaseLiquidity2));

        /// executor order
        const executeDecreaseResult2 = await executeLPOrder(executor, createDecreaseResult2.orderIdBefore);
        printTransactionFees(executeDecreaseResult2.trxResult.transactions);
        expect(executeDecreaseResult2.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });
        
        console.log('lp position data after decrease lp:', executeDecreaseResult2.positionDataAfter);

        // check position
        expect(executeDecreaseResult2.positionDataAfter.lpPosition).not.toBeNull();
        expect(executeDecreaseResult2.positionDataAfter.lpPosition?.liquidity).toEqual(toJettonUnits(1000000));
        expect(executeDecreaseResult2.positionDataAfter.lpPosition?.bonus).toEqual(toJettonUnits(0));
        expect(executeDecreaseResult2.balanceAfter.user0JettonBalance - executeDecreaseResult2.balanceBefore.user0JettonBalance).toEqual(toJettonUnits(1000000.268909));

        expect(executeDecreaseResult2.positionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(1500000));
        expect(executeDecreaseResult2.positionDataAfter.globalLPFund).toEqual(toJettonUnits(1500704.977758));

        console.log('lp data after increase:', executeDecreaseResult2.positionDataAfter);

        /* =========================== decrease LP after 2 days ================================ */
        // after 2 days
        blockchain.now = blockchain.now + 2 * 24 * 60 * 60 + 40 * 60;
        let decreaseLiquidity3 = 500000;

        // create order
        const createDecreaseResult3 = await createDecreaseLPOrder(user3, decreaseLiquidity3, executionFee);
        expect(createDecreaseResult3.trxResult.transactions).toHaveTransaction({
            from: user3.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createDecreaseResult3.orderIdAfter).toEqual(createDecreaseResult3.orderIdBefore + 1n);
        expect(createDecreaseResult3.order).not.toBeNull();
        expect(createDecreaseResult3.order?.liquidityDelta).toEqual(toJettonUnits(decreaseLiquidity3));

        /// executor order
        const executeDecreaseResul3 = await executeLPOrder(executor, createDecreaseResult3.orderIdBefore);
        printTransactionFees(executeDecreaseResul3.trxResult.transactions);
        expect(executeDecreaseResul3.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });
        
        console.log('lp position data after decrease lp:', executeDecreaseResul3.positionDataAfter);

        // check position
        expect(executeDecreaseResul3.positionDataAfter.lpPosition).not.toBeNull();
        expect(executeDecreaseResul3.positionDataAfter.lpPosition?.liquidity).toEqual(toJettonUnits(0));
        expect(executeDecreaseResul3.positionDataAfter.lpPosition?.bonus).toEqual(toJettonUnits(118.379523));
        expect(executeDecreaseResul3.balanceAfter.user3JettonBalance - executeDecreaseResul3.balanceBefore.user3JettonBalance).toEqual(toJettonUnits(500234.992586));

        expect(executeDecreaseResul3.positionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(1000000));
        expect(executeDecreaseResul3.positionDataAfter.globalLPFund).toEqual(toJettonUnits(1000469.985172));
        console.log('lp data after increase:', executeDecreaseResul3.positionDataAfter);
        console.log('receive token:', fromJettonUnits(executeDecreaseResul3.balanceAfter.user3JettonBalance - executeDecreaseResul3.balanceBefore.user3JettonBalance));

        /* =========================== decrease LP ================================ */
        let decreaseLiquidity4 = 1000000;

        // create order
        const createDecreaseResult4 = await createDecreaseLPOrder(user0, decreaseLiquidity4, executionFee);
        expect(createDecreaseResult4.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: orderBook.address,
            success: true,
        });

        // check order
        expect(createDecreaseResult4.orderIdAfter).toEqual(createDecreaseResult4.orderIdBefore + 1n);
        expect(createDecreaseResult4.order).not.toBeNull();
        expect(createDecreaseResult4.order?.liquidityDelta).toEqual(toJettonUnits(decreaseLiquidity4));

        /// executor order
        const executeDecreaseResult4 = await executeLPOrder(executor, createDecreaseResult4.orderIdBefore);
        printTransactionFees(executeDecreaseResult4.trxResult.transactions);
        expect(executeDecreaseResult4.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: orderBook.address,
            success: true,
        });
        
        console.log('lp position data after decrease lp:', executeDecreaseResult4.positionDataAfter);

        // check position
        expect(executeDecreaseResult4.positionDataAfter.lpPosition).toBeNull();
        expect(executeDecreaseResult4.balanceAfter.user0JettonBalance - executeDecreaseResult4.balanceBefore.user0JettonBalance).toEqual(toJettonUnits(1000009.399703));

        expect(executeDecreaseResult4.positionDataAfter.globalLPLiquidity).toEqual(toJettonUnits(0));
        expect(executeDecreaseResult4.positionDataAfter.globalLPFund).toEqual(toJettonUnits(460.585469));
        console.log('lp data after increase:', executeDecreaseResult4.positionDataAfter);
        console.log('receive token:', fromJettonUnits(executeDecreaseResult4.balanceAfter.user0JettonBalance - executeDecreaseResult4.balanceBefore.user0JettonBalance));

        
    });

});
