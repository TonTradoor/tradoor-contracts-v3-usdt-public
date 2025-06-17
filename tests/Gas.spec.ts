import { Blockchain, SandboxContract, TreasuryContract, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano, Dictionary } from '@ton/core';
import { MockJettonWallet } from '../wrappers/MockJettonWallet';
import { Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import { getJettonBalance, mint, toJettonUnits, toPriceUnits } from './lib/TokenHelper';
import { createDecreaseLiquidityOrder, createIncreaseLiquidityOrder, executeLiquidityOrder } from './lib/LPHelper';
import '@ton/test-utils';
import { createDecreasePerpOrder, createIncreasePerpOrder, executePerpOrder } from './lib/PerpHelper';
import { now } from '../utils/util';

describe('GAS', () => {
    let blockchain: Blockchain;
    let pool: SandboxContract<Pool>;
    let executor: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let poolJettonWallet: SandboxContract<MockJettonWallet>;

    beforeEach(async () => {
        await TestEnv.resetEnv();

        blockchain = TestEnv.blockchain;
        pool = TestEnv.pool;
        executor = TestEnv.executor;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        poolJettonWallet = TestEnv.poolJettonWallet;

        // mint
        await mint(user0.address, '100000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000'));

        await mint(user1.address, '100000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('100000'));

        // check config
        let orderBookConfigData = await pool.getConfigData();
        expect(orderBookConfigData.jettonWallet).toEqualAddress(poolJettonWallet.address);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should execute two direction perp', async () => {
        console.log("should execute two direction perp")
        // set block time
        blockchain.now = now();
        blockchain.now = blockchain.now - blockchain.now % 3600 + 70 * 60; // HH+1:10
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 10000;
        let executionFee = 0.1;
        const prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createIncreaseResult.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult.balanceBefore.user0TonBalance - createIncreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));
        console.log('pool ton balance', fromNano(createIncreaseResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        console.log('execute increase LP order gas used:', fromNano(executeIncreaseResult.balanceBefore.executorTonBalance - executeIncreaseResult.balanceAfter.executorTonBalance + toNano(executionFee)));
        console.log('pool ton balance', fromNano(executeIncreaseResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);
        
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
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        console.log('create increase long perp order gas used:', fromNano(createResult.balanceBefore.user1TonBalance - createResult.balanceAfter.user1TonBalance - toNano(executionFee)));
        console.log('pool ton balance', fromNano(createResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        // executor order
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase long perp order gas used:', fromNano(executeResult.balanceBefore.executorTonBalance - executeResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position data after increase long:', executeResult.positionDataAfter);
        console.log('pool ton balance', fromNano(executeResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        expect(executeResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();


        /* =========================== increase short perp ================================ */
        blockchain.now = blockchain.now + 30 * 60; // HH:40

        let increaseShortMargin = 100;
        let increaseShortSize = 0.02;
        let increaseShortTriggerPrice = 49000;
        let increaseShortIncreasePrice = 50000;

        // create order
        const createIncreaseShortResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, false, increaseShortMargin, increaseShortSize, increaseShortTriggerPrice, 0, 0, 0, 0);
        printTransactionFees(createIncreaseShortResult.trxResult.transactions);
        expect(createIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        console.log('create increase short perp order gas used:', fromNano(createIncreaseShortResult.balanceBefore.user1TonBalance - createIncreaseShortResult.balanceAfter.user1TonBalance - toNano(executionFee)));
        console.log('pool ton balance', fromNano(createIncreaseShortResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        // executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeIncreaseShortResult = await executePerpOrder(executor, createIncreaseShortResult.orderIdBefore, increaseShortIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeIncreaseShortResult.trxResult.transactions);
        expect(executeIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase short perp order gas used:', fromNano(executeIncreaseShortResult.balanceBefore.executorTonBalance - executeIncreaseShortResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position data after increase short:', executeIncreaseShortResult.positionDataAfter);
        console.log('pool ton balance', fromNano(executeIncreaseShortResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        expect(executeIncreaseShortResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(increaseShortSize - size));
        expect(executeIncreaseShortResult.positionDataAfter!.globalLPPosition?.isLong).toBeTruthy();

        /* =========================== decrease short perp ================================ */
        blockchain.now = blockchain.now + 30 * 60; // HH+1:10

        let decreaseShortMargin = 100;
        let decreaseShortSize = 0.02;
        let decreaseShortTriggerPrice = 52000;
        let decreaseShortIncreasePrice = 51000;

        // create order
        const createDecreaseShortResult = await createDecreasePerpOrder(user1, executionFee, tokenId, false, decreaseShortMargin, decreaseShortSize, decreaseShortTriggerPrice);
        printTransactionFees(createDecreaseShortResult.trxResult.transactions);
        expect(createDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true,
        });
        console.log('decrease short order:', createDecreaseShortResult.order);
        console.log('create decrease short perp order gas used:', fromNano(createDecreaseShortResult.balanceBefore.user1TonBalance - createDecreaseShortResult.balanceAfter.user1TonBalance - toNano(executionFee)));
        console.log('pool ton balance', fromNano(createDecreaseShortResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        // executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseShortResult = await executePerpOrder(executor, createDecreaseShortResult.orderIdBefore, decreaseShortIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseShortResult.trxResult.transactions);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log('execute decrease short perp order gas used:', fromNano(executeDecreaseShortResult.balanceBefore.executorTonBalance - executeDecreaseShortResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position data after decrease short:', executeDecreaseShortResult.positionDataAfter);
        console.log('pool ton balance', fromNano(executeDecreaseShortResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        expect(executeDecreaseShortResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeDecreaseShortResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== decrease long perp ================================ */
        blockchain.now = blockchain.now + 30 * 60; // HH+1:40

        let decreaseLongMargin = 50;
        let decreaseLongSize = 0.01;
        let decreaseLongTriggerPrice = 50000;
        let decreaseLongIncreasePrice = 51000;

        // create order
        const createDecreaseLongResult = await createDecreasePerpOrder(user1, executionFee, tokenId, true, decreaseLongMargin, decreaseLongSize, decreaseLongTriggerPrice);
        printTransactionFees(createDecreaseLongResult.trxResult.transactions);
        expect(createDecreaseLongResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true,
        });
        console.log('decrease long order:', createDecreaseLongResult.order);
        console.log('create decrease long perp order gas used:', fromNano(createDecreaseLongResult.balanceBefore.user1TonBalance - createDecreaseLongResult.balanceAfter.user1TonBalance - toNano(executionFee)));
        console.log('pool ton balance', fromNano(createDecreaseLongResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        // executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseLongResult = await executePerpOrder(executor, createDecreaseLongResult.orderIdBefore, decreaseLongIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseLongResult.trxResult.transactions);
        expect(executeDecreaseLongResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log('execute decrease long perp order gas used:', fromNano(executeDecreaseLongResult.balanceBefore.executorTonBalance - executeDecreaseLongResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position data after decrease long:', executeDecreaseLongResult.positionDataAfter);
        console.log('pool ton balance', fromNano(executeDecreaseLongResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        expect(executeDecreaseLongResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(0n);
        expect(executeDecreaseLongResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== decrease LP ================================ */
        /// create order
        const createDecreaseLPResult = await createDecreaseLiquidityOrder(user0, lpLiquidity, executionFee);
        printTransactionFees(createDecreaseLPResult.trxResult.transactions);

        console.log('create decrease LP order gas used:', fromNano(createDecreaseLPResult.balanceBefore.user0TonBalance - createDecreaseLPResult.balanceAfter.user0TonBalance - toNano(executionFee)));
        console.log('pool ton balance', fromNano(createDecreaseLPResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));


        /// executor order
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));
        lpFundingFeeGrowth = 0;
        rolloverFeeGrowth = 0;
        const executeDecreaseLPResult= await executeLiquidityOrder(executor, createDecreaseLPResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeDecreaseLPResult.trxResult.transactions);
        expect(executeDecreaseLPResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        console.log('execute decrease LP order gas used:', fromNano(executeDecreaseLPResult.balanceBefore.executorTonBalance - executeDecreaseLPResult.balanceAfter.executorTonBalance + toNano(executionFee)));
        console.log('pool ton balance', fromNano(executeDecreaseLPResult.balanceAfter.poolTonBalance));
        console.log('total execution fee', fromNano((await pool.getPoolStat()).totalExecutionFee));

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check position
        // let lpPosition = executeDecreaseLPResult.positionDataAfter.lpPosition;
        // expect(lpPosition).not.toBeNull();
        // expect(lpPosition?.liquidity).toEqual(0);

    });

});
