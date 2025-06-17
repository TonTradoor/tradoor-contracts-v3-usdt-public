import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano, Dictionary } from '@ton/core';
import { MockJettonWallet } from '../wrappers/MockJettonWallet';
import { TLPJettonWallet as TLPJettonWallet } from '../wrappers/TLPJettonWallet';
import { Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import {
    fromJettonUnits,
    fromTlpUnits,
    getFriendlyTonBalance,
    getJettonBalance,
    getTonBalance,
    mint,
    toJettonUnits,
    toPriceUnits, toTlpUnits
} from './lib/TokenHelper';
import { cancelLiquidityOrder, createDecreaseLiquidityOrder, createIncreaseLiquidityOrder, executeLiquidityOrder } from './lib/LPHelper';
import '@ton/test-utils';
import { createIncreasePerpOrder, executePerpOrder } from "./lib/PerpHelper";
import { createCompensate, executeCompensate, sendCompensateJetton } from './lib/CompensateHelper';
import { ORDER_TYPE_LP } from '../utils/constants';
import { now } from '../utils/util';
import { resumeContract, stopContract } from './lib/PoolHelper';

describe('LP', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let executor: SandboxContract<TreasuryContract>;
    let compensator: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let poolJettonWallet: SandboxContract<MockJettonWallet>;
    let poolTlpWallet: SandboxContract<TLPJettonWallet>;
    let user0JettonWallet: SandboxContract<MockJettonWallet>;
    let user0TlpWallet: SandboxContract<TLPJettonWallet>;

    beforeEach(async () => {
        await TestEnv.resetEnv();

        blockchain = TestEnv.blockchain;
        deployer = TestEnv.deployer;
        pool = TestEnv.pool;
        executor = TestEnv.executor;
        compensator = TestEnv.compensator;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        poolJettonWallet = TestEnv.poolJettonWallet;
        poolTlpWallet = TestEnv.poolTlpWallet;
        user0JettonWallet = TestEnv.user0JettonWallet;
        user0TlpWallet = TestEnv.user0TlpWallet;

        // mint to user
        let trxResult = await mint(user0.address, '10000000');
        printTransactionFees(trxResult.transactions);

        trxResult = await mint(user1.address, '10000000');
        printTransactionFees(trxResult.transactions);

        // get user jetton balance
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('10000000'));
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('10000000'));

        // check config
        let configData = await pool.getConfigData();
        expect(configData.jettonWallet).toEqualAddress(poolJettonWallet.address);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    //OP_CREATE_INCREASE_LP_POSITION_ORDER
    it('should revert liquidity order if insufficient execution fee is provided.', async () => {
        let liquidity = 10;
        let executionFee = 0.04;

        // get pool TON balance
        console.log("poolTonBalance", await getFriendlyTonBalance(pool.address));

        // create order
        let createResult = await createIncreaseLiquidityOrder(user0, { executionFee: 0.001});
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check user jetton balance
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        // check pool TON balance
        console.log("poolTonBalanceAfter", await getFriendlyTonBalance(pool.address));
    });

    //OP_CREATE_INCREASE_LP_POSITION_ORDER
    it('should revert liquidity order if insufficient gas is provided.', async () => {
        let liquidity = 10;
        let executionFee = 0.04;

        // get pool TON balance
        console.log("poolTonBalance", await getFriendlyTonBalance(pool.address));

        // create order
        let createResult = await createIncreaseLiquidityOrder(user0, { gas: 0.1,forwardTon: 0.01});
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check user jetton balance
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        // check pool TON balance
        console.log("poolTonBalanceAfter", await getFriendlyTonBalance(pool.address));
    });

    it('should revert liquidity order if the contract is stopped.', async () => {
        let liquidity = 10;
        let executionFee = 0.05;

        // get pool TON balance
        console.log("poolTonBalance", await getFriendlyTonBalance(pool.address));

        // stop
        const stopResult = await stopContract(TestEnv.deployer.getSender());
        expect(stopResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });

        // create order
        let createResult = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check user jetton balance
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);

        // resume
        const resumeResult = await resumeContract(TestEnv.deployer.getSender());
        expect(resumeResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });

        // create order
        let createResult1 = await createIncreaseLiquidityOrder(user0, {liquidity});
        printTransactionFees(createResult1.trxResult.transactions);
        expect(createResult1.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        expect(createResult1.orderIdAfter).toEqual(createResult1.orderIdBefore + 1n);
        expect(createResult1.order).not.toBeNull();
        expect(createResult1.balanceAfter.poolJettonBalance).toEqual(toJettonUnits(liquidity));
    });


        // CancelLiquidityOrder
        it('should revert cancel liquidity order if insufficient gas to complete the transaction.', async () => {
            const result = await createIncreaseLiquidityOrder(user0, { gas: 0.2 });
            expect(result.trxResult.transactions).toHaveTransaction({
                from: poolJettonWallet.address,
                to: pool.address,
                success: true
            });
            const cancelResult = await cancelLiquidityOrder(executor, result.orderIdBefore, 0.001); // insufficient gas
            expect(cancelResult.trxResult.transactions).toHaveTransaction({
                from: executor.address,
                to: pool.address,
                success: false
            });
            expect(cancelResult.balanceAfter.poolJettonBalance).toEqual(cancelResult.balanceBefore.poolJettonBalance);
            expect(cancelResult.order).not.toBeNull();
        });
    
        it('should revert cancel liquidity order if the order is not exist.', async () => {
            const orderId = 999999999n; // non-existent order ID
            const result = await cancelLiquidityOrder(executor, orderId);
            expect(result.trxResult.transactions).toHaveTransaction({
                from: executor.address,
                to: pool.address,
                success: false
            });
            expect(result.balanceAfter.poolJettonBalance).toEqual(result.balanceBefore.poolJettonBalance);
            expect(result.order).toBeNull();
        });
    
        it('should revert cancel liquidity order if the order is pending.', async () => {
    
        });
    
        it('should revert cancel liquidity order if the order that is not owned by the sender,and the sender is not a trusted executor.', async () => {
            blockchain.now = Math.floor(Date.now() / 1000);
            const result = await createIncreaseLiquidityOrder(user0, { gas: 0.2 });
            expect(result.trxResult.transactions).toHaveTransaction({
                from: poolJettonWallet.address,
                to: pool.address,
                success: true
            });
            blockchain.now = Math.floor(Date.now() / 1000) + 3600; // simulate time passing
            const cancelResult = await cancelLiquidityOrder(user1, result.orderIdBefore, 0.001); // insufficient gas
            expect(cancelResult.trxResult.transactions).toHaveTransaction({
                from: user1.address,
                to: pool.address,
                success: false
            });
            expect(cancelResult.balanceAfter.poolJettonBalance).toEqual(cancelResult.balanceBefore.poolJettonBalance);
            expect(cancelResult.order).not.toBeNull();
        });
    
        it('should revert cancel liquidity order if the order before the order LockTime has elapsed, and the sender is not a trusted executor.', async () => {
            blockchain.now = Math.floor(Date.now() / 1000);
            const result = await createIncreaseLiquidityOrder(user0, { gas: 0.2 });
            expect(result.trxResult.transactions).toHaveTransaction({
                from: poolJettonWallet.address,
                to: pool.address,
                success: true
            });
            blockchain.now = Math.floor(Date.now() / 1000) + 10; // simulate time passing
            const cancelResult = await cancelLiquidityOrder(user1, result.orderIdBefore, 0.001); // insufficient gas
            expect(cancelResult.trxResult.transactions).toHaveTransaction({
                from: user1.address,
                to: pool.address,
                success: false
            });
            expect(cancelResult.balanceAfter.poolJettonBalance).toEqual(cancelResult.balanceBefore.poolJettonBalance);
            expect(cancelResult.order).not.toBeNull();
        });
    

    it('should create increase LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.jettonDelta).toEqual(toJettonUnits(liquidity));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(liquidity));
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance + toJettonUnits(liquidity));
    });

    it('should cancel increase LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, {});

        /// cancel order
        const cancelResult = await cancelLiquidityOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
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
        let liquidity = 1000;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });

        /// executor order
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128))
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        const lpFundingFeeGrowth = 10;
        const rolloverFeeGrowth = 20;

        const executeResult = await executeLiquidityOrder(executor, createResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        // check tlp
        let user0TlpBalance = executeResult.balanceAfter.user0TlpBalance;
        expect(user0TlpBalance).toBeGreaterThan(0);
    });

    it('should create decrease LP order failed - insufficient quota of liquidity', async () => {
        /// create order
        let liquidity = 100001;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });

        /// executor order
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128))
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        const lpFundingFeeGrowth = 0;
        const rolloverFeeGrowth = 0;

        const executeResult = await executeLiquidityOrder(executor, createResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false,
        });
    });

    it('should create decrease LP order failed - insufficient tlp-jetton', async () => {
        let tlpAmount = 10;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createDecreaseLiquidityOrder(user0, tlpAmount, executionFee);
        console.log('order:', createResult.order);

        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: user0TlpWallet.address,
            success: false,
        });

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);
        expect(createResult.order).toBeNull();
        // check user jetton balance
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);
    });

    it('should create & cancel decrease LP order successfully', async () => {
        // set block time
        blockchain.now = now();

        /// create order
        let liquidity = 100;
        let executionFee = 0.1;
        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createIncreaseResult.trxResult.transactions);
        prettyLogTransactions(createIncreaseResult.trxResult.transactions);
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        // wait for 6s (cancel )
        blockchain.now += 60;

        /// executor order
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log(">>>>>>>>user0TLPBalance", fromTlpUnits(executeIncreaseResult.balanceAfter.user0TlpBalance));
        let tlpAmount = 50;

        // set block time
        blockchain.now += 60;

        // create order
        const createResult = await createDecreaseLiquidityOrder(user0, tlpAmount, executionFee);
        console.log('order:', createResult.order);

        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolTlpWallet.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.jettonDelta).toEqual(toTlpUnits(tlpAmount));

        /// cancel order
        const cancelResult = await cancelLiquidityOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(cancelResult.order).toBeNull();
    });

    it('should decrease LP successfully', async () => {
        // set block time
        blockchain.now = now();

        /// create order
        let liquidity = 100.5;
        let executionFee = 0.1;
        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createIncreaseResult.trxResult.transactions);
        prettyLogTransactions(createIncreaseResult.trxResult.transactions);
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        // wait for 6s (cancel )
        blockchain.now += 60;

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        const user0TLPBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log(">>>>>>>>user0TLPBalance", fromTlpUnits(executeIncreaseResult.balanceAfter.user0TlpBalance));
        let user0JettonBalance = executeIncreaseResult.balanceAfter.user0JettonBalance;
        console.log(">>>>>>>>user0JettonBalance", fromJettonUnits(user0JettonBalance));
        let tlpAmount = 50;

        // set block time
        blockchain.now += 60;

        // create order
        const createDecreaseResult = await createDecreaseLiquidityOrder(user0, tlpAmount, executionFee);
        console.log('order:', createDecreaseResult.order);

        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolTlpWallet.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
        expect(createDecreaseResult.order).not.toBeNull();
        expect(createDecreaseResult.order?.jettonDelta).toEqual(toTlpUnits(tlpAmount));

        blockchain.now += 60;
        /// executor order
        const executeDecreaseResult = await executeLiquidityOrder(executor, createDecreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeDecreaseResult.orderAfter).toBeNull();

        // check tlp
        let user0TLPBalance1 = executeDecreaseResult.balanceAfter.user0TlpBalance;
        expect(user0TLPBalance1).toBeGreaterThan(0n);
        expect(user0TLPBalance1).toEqual(user0TLPBalance - toTlpUnits(tlpAmount));
        let user0JettonBalance1 = executeDecreaseResult.balanceAfter.user1JettonBalance;
        console.log(">>>>>>>>user0JettonBalance1", fromJettonUnits(user0JettonBalance1));
    });

    it('should increase LP successfully', async () => {
        // set block time
        blockchain.now = now();

        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 10000;
        let executionFee = 0.1;

        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));
        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createIncreaseResult.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult.balanceBefore.user0TonBalance - createIncreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tlp balance
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
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        console.log('create increase long perp order gas used:', fromNano(createResult.balanceBefore.user1TonBalance - createResult.balanceAfter.user1TonBalance - toNano(executionFee)));

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase long perp order gas used:', fromNano(executeResult.balanceBefore.executorTonBalance - executeResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position after increase long:', executeResult.positionDataAfter);

        expect(executeResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== increase LP ================================ */
        /// create order
        const createIncreaseResult1 = await createIncreaseLiquidityOrder(user0, {});
        printTransactionFees(createIncreaseResult1.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult1.balanceBefore.user0TonBalance - createIncreaseResult1.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        prices.set(1, toPriceUnits(61000)).set(2, toPriceUnits(3100));
        lpFundingFeeGrowth = 0;
        rolloverFeeGrowth = 0;

        const executeIncreaseResult1 = await executeLiquidityOrder(executor, createIncreaseResult1.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult1.trxResult.transactions);
        expect(executeIncreaseResult1.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        console.log('execute increase LP order gas used:', fromNano(executeIncreaseResult1.balanceBefore.executorTonBalance - executeIncreaseResult1.balanceAfter.executorTonBalance + toNano(executionFee)));

        // check order
        expect(executeIncreaseResult1.orderAfter).toBeNull();

        // check tlp balance
        let user0TlpBalance1 = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance1:', user0TlpBalance1);
        expect(user0TlpBalance1).toBeGreaterThan(0);

        /* =========================== decrease LP ================================ */
        // after 1 days
        blockchain.now += 10 * 24 * 60 * 60;
        let decreaseTlpAmount = 5000;

        // create order
        const createDecreaseResult = await createDecreaseLiquidityOrder(user0, decreaseTlpAmount, executionFee);
        console.log('order:', createDecreaseResult.order);

        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolTlpWallet.address,
            to: pool.address,
            success: true,
        });

        console.log('create order gas used:', fromNano(createDecreaseResult.balanceBefore.user0TonBalance - createDecreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
        expect(createDecreaseResult.order).not.toBeNull();
        expect(createDecreaseResult.order?.jettonDelta).toEqual(toTlpUnits(decreaseTlpAmount));

        blockchain.now = blockchain.now + 10;
        /// executor order
        prices.set(1, toPriceUnits(61000)).set(2, toPriceUnits(3100));
        lpFundingFeeGrowth = 1;
        rolloverFeeGrowth = 1;
        const executeDecreaseResult = await executeLiquidityOrder(executor, createDecreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check position
        let user0TlpBalance2 = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance2:', user0TlpBalance2);
        expect(user0TlpBalance2).toBeGreaterThan(0);

    });

    it('should compensate transfer in', async () => {
        let amount = 100;
        const executeResult = await sendCompensateJetton(user0, amount);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.balanceAfter.poolJettonBalance).toEqual(executeResult.balanceBefore.poolJettonBalance + toJettonUnits(amount));

        let ton = 1;
        const transferResult = await executor.send({
            value: toNano(ton),
            to: pool.address,
            sendMode: 1
        });
        printTransactionFees(transferResult.transactions);
        expect(await getTonBalance(pool.address)).toBeGreaterThan(executeResult.balanceAfter.poolTonBalance + toNano(ton * 0.9))

    });

    it('should compensate', async () => {
        blockchain.now = Math.floor(Date.now() / 1000);

        // create order
        let liquidity = 10;
        let executionFee = 0.1;
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.jettonDelta).toEqual(toJettonUnits(liquidity));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(liquidity));
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance + toJettonUnits(liquidity));
        console.log('pool ton after create lp order', fromNano(createResult.balanceAfter.poolTonBalance));
        console.log('pool usdt after create lp order', fromJettonUnits(createResult.balanceAfter.poolJettonBalance));
        // create compensate order
        const createCompensateResult = await createCompensate(compensator, ORDER_TYPE_LP, createResult.orderIdBefore, user0.address, liquidity, user1.address, executionFee);
        printTransactionFees(createCompensateResult.trxResult.transactions);
        expect(createCompensateResult.trxResult.transactions).toHaveTransaction({
            from: compensator.address,
            to: pool.address,
            success: true,
        });
        console.log('create compensate', createCompensateResult.compensate);
        // check compensate
        expect(createCompensateResult.compensateIdAfter).toEqual(createCompensateResult.compensateIdBefore + 1n);
        expect(createCompensateResult.compensate).not.toBeNull();

        // 1 day later
        blockchain.now = blockchain.now + 3 * 24 * 60 * 60 + 60;
        const executeCompensateResult = await executeCompensate(compensator, 0.2, createCompensateResult.compensateIdBefore);
        printTransactionFees(executeCompensateResult.trxResult.transactions);
        expect(executeCompensateResult.trxResult.transactions).toHaveTransaction({
            from: compensator.address,
            to: pool.address,
            success: true,
        });
        // check compensate
        expect(executeCompensateResult.compensate).toBeNull();
        // check jetton
        expect(executeCompensateResult.balanceAfter.user0JettonBalance).toEqual(executeCompensateResult.balanceBefore.user0JettonBalance + toJettonUnits(liquidity));
        expect(executeCompensateResult.balanceAfter.poolJettonBalance).toEqual(executeCompensateResult.balanceBefore.poolJettonBalance - toJettonUnits(liquidity));

    });

});
