import {
    Blockchain,
    prettyLogTransactions,
    printTransactionFees,
    SandboxContract,
    TreasuryContract
} from '@ton/sandbox';
import { Dictionary, fromNano, toNano } from '@ton/core';
import { MockJettonWallet } from '../wrappers/MockJettonWallet';
import { loadPerpOrderCreatedEvent, Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import {
    getJettonBalance,
    mint,
    mintXXX,
    toJettonUnits,
    toPriceUnits
} from './lib/TokenHelper';
import { createIncreaseLiquidityOrder, executeLiquidityOrder } from './lib/LPHelper';
import '@ton/test-utils';
import {
    adlPerpPosition,
    cancelPerpOrder,
    createDecreasePerpOrder,
    createIncreasePerpOrder,
    createIncreasePerpOrderWithXXX,
    createTpSlPerpOrder,
    executePerpOrder,
    liquidatePerpPosition
} from './lib/PerpHelper';
import { ORDER_OP_TYPE_DECREASE_SL, ORDER_OP_TYPE_DECREASE_TP } from '../utils/constants';
import { now } from '../utils/util';
import { claimProtocolFee, disbaleToken, increaseAUM, stopContract } from './lib/PoolHelper';


describe('PERP', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let executor: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let user0JettonWallet: SandboxContract<MockJettonWallet>;
    let poolJettonWallet: SandboxContract<MockJettonWallet>;
    let claimExecutor: SandboxContract<TreasuryContract>;

    const token = TestEnv.tokenConfigs[0];

    let defaultOrderParams = {
        executionFee: 0.1,
        isMarket: true,
        tokenId: 1,
        isLong: true,
        margin: 100,
        size: 0.02,
        triggerPrice: 51000,
        tpSize: 0,
        tpPrice: 0,
        slSize: 0,
        slPrice: 0
    };

    let defaultMarketParams = {
        indexPrice: 50000,
        _fundingFeeGrowth: 0,
        _rolloverFeeGrowth: 0
    }

    beforeEach(async () => {
        await TestEnv.resetEnv();

        blockchain = TestEnv.blockchain;
        deployer = TestEnv.deployer;
        pool = TestEnv.pool;
        executor = TestEnv.executor;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        user0JettonWallet = TestEnv.user0JettonWallet;
        poolJettonWallet = TestEnv.poolJettonWallet;
        claimExecutor = TestEnv.claimExecutor;

        // mint
        await mint(user0.address, '100000000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000000'));

        await mint(user1.address, '100000000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('100000000'));

        await mintXXX(user0.address, '100000000');
        // check config
        let configData = await pool.getConfigData();
        expect(configData.jettonWallet).toEqualAddress(poolJettonWallet.address);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    //JettonTransferNotification
    it('should refund jetton if contract is stopped', async () => {

        const stopResult = await stopContract(TestEnv.deployer.getSender());
        expect(stopResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true
        });
        expect(stopResult.contractStatusBefore).not.toBeTruthy();
        expect(stopResult.contractStatus).toBeTruthy();

        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;
        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);
        expect(createResult.order).toBeNull();
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance);

    });

    it('should refund jetton if caller is not the tlpWallet or jettonWallet address.', async () => {

        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;
        // create order
        const createResult = await createIncreasePerpOrderWithXXX(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);

        const wallet = TestEnv.blockchain.openContract(
            await MockJettonWallet.fromInit(TestEnv.pool.address, TestEnv.xxx_jetton.address),
        );
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: wallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);
        expect(createResult.order).toBeNull();
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance);
    });

    //OP_CREATE_INCREASE_PERP_POSITION_ORDER
    it('should revert perp order if insufficient execution fee is provided.', async () => {
        const { isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;
        const executionFee = 0.01; // insufficient execution fee
        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);
        expect(createResult.order).toBeNull();
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance);
    });

    //OP_CREATE_INCREASE_PERP_POSITION_ORDER
    it('should revert perp order if insufficient gas is provided.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;
        const gas = 0.1;
        const forwardTon = 0.02;
        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice, gas, forwardTon);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance);
        expect(createResult.order).toBeNull();
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance);
    });

    //OP_INCREASE_AUM
    it('should revert increase AUM if original caller is not the manager address.', async () => {
        const result = await increaseAUM(user0.getSender(), 0.1, 1000);
        expect(result.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(result.balanceAfter.user0JettonBalance).toEqual(result.balanceBefore.user0JettonBalance);
        expect(result.balanceAfter.poolJettonBalance).toEqual(result.balanceBefore.poolJettonBalance);
    });

    //CreateDecreasePerpOrder
    it('should revert decrease perp order if insufficient gas is provided', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;

        // create order
        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice, 0.001);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert decrease perp order if insufficient execution fee is provided', async () => {
        const { tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;
        const executionFee = 0.01; // insufficient execution fee

        // create order
        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert decrease perp order if protocol is stopped', async () => {
        const stopResult = await stopContract(deployer.getSender());
        expect(stopResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true
        })
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;
        // create order
        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: false
        });
    });

    //CancelPerpOrder
    it('should revert cancel perp order if insufficient gas to complete the transaction.', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, true, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // cancel order with insufficient gas
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore, 0.001); // insufficient gas
        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert cancel perp order if the order is not exist.', async () => {
        const orderId = 999999999n; // non-existent order ID
        const cancelResult = await cancelPerpOrder(executor, orderId);
        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(cancelResult.balanceAfter.poolJettonBalance).toEqual(cancelResult.balanceBefore.poolJettonBalance);
        expect(cancelResult.order).toBeNull();
    });

    it('should revert cancel perp order if the order that is not owned by the sender,and the sender is not a trusted executor.', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, true, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // cancel order with another user
        const cancelResult = await cancelPerpOrder(user1, createResult.orderIdBefore);
        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: false
        });
        expect(cancelResult.balanceAfter.poolJettonBalance).toEqual(cancelResult.balanceBefore.poolJettonBalance);
        expect(cancelResult.balanceAfter.user0JettonBalance).toEqual(cancelResult.balanceBefore.user0JettonBalance);
        expect(cancelResult.order).not.toBeNull();
    });

    it('should revert cancel perp order if the order before the order LockTime has elapsed, and the sender is not a trusted executor.', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, true, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // wait for lock time to pass
        blockchain.now = Math.floor(Date.now() / 1000) + 10; // simulate time passing

        // cancel order with another user
        const cancelResult = await cancelPerpOrder(user1, createResult.orderIdBefore);
        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: false
        });
        expect(cancelResult.balanceAfter.poolJettonBalance).toEqual(cancelResult.balanceBefore.poolJettonBalance);
        expect(cancelResult.balanceAfter.user0JettonBalance).toEqual(cancelResult.balanceBefore.user0JettonBalance);
        expect(cancelResult.order).not.toBeNull();
    });

    //ExecutePerpOrder
    it('should revert execute perp order if user is not a trusted executor.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;

        // execute order with another user
        const executeResult = await executePerpOrder(user1, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if order does not exist.', async () => {
        const orderId = 999999999n; // non-existent order ID
        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;

        // execute order
        const executeResult = await executePerpOrder(executor, orderId, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).toBeNull();
    });

    it('should revert execute perp order if insufficient gas is provided to complete the transaction.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;

        // execute order with insufficient gas
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth, 0.001); // insufficient gas
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if trigger price has not been reached, if applicable.', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        const isMarket = false; // market order
        // create order with a trigger price that has not been reached
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        const { _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;

        // execute order
        const indexPrice = 52000; // trigger price is 51000, so this should fail
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if token does not exist in the tokenConfigs, when increasing the perpetual position.', async () => {
        const { executionFee, isMarket, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order with a non-existent tokenId
        const nonExistentTokenId = 99; // non-existent token ID
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, nonExistentTokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if token does not exist in the tokenConfigs when decreasing the perpetual position.', async () => {
        const { executionFee, isMarket, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order with a non-existent tokenId
        const nonExistentTokenId = 99; // non-existent token ID
        const createResult = await createDecreasePerpOrder(user0, executionFee, nonExistentTokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if token is disabled when increasing the perpetual position.', async () => {
        const { executionFee, isMarket, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        const disabledTokenResult = await disbaleToken(TestEnv.manager.getSender(), token);
        expect(disabledTokenResult.trxResult.transactions).toHaveTransaction({
            from: TestEnv.manager.address,
            to: pool.address,
            success: true
        });

        // create order with a disabled tokenId
        const disabledTokenId = Number(token.tokenId); // disabled token ID
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, disabledTokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if token is disabled when decreasing the perpetual position.', async () => {
        const { executionFee, isMarket, isLong, margin, size, triggerPrice } = defaultOrderParams;

        const disabledTokenResult = await disbaleToken(TestEnv.manager.getSender(), token);
        expect(disabledTokenResult.trxResult.transactions).toHaveTransaction({
            from: TestEnv.manager.address,
            to: pool.address,
            success: true
        });

        // create order with a disabled tokenId
        const disabledTokenId = Number(token.tokenId); // disabled token ID
        const createResult = await createDecreasePerpOrder(user0, executionFee, disabledTokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if attempting to decrease a position whose size is not greater than zero.', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;

        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if margin rate is too high when increasing the perpetual position.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order with a high margin rate
        const highMarginRate = 0.001; // high margin rate
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin * highMarginRate, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if insufficient margin when decreasing the perpetual position, after accounting for fees in the realized PNL.', async () => {
        const { executionFee, tokenId, isLong, margin, size, triggerPrice } = defaultOrderParams;

        // create order with insufficient margin
        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        let { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        indexPrice = 20000;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    it('should revert execute perp order if leverage is too high after increasing the perpetual position.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order with a high margin rate
        const highMarginRate = 0.001; // high margin rate
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin * highMarginRate, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        const { indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth } = defaultMarketParams;
        // execute order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
        expect(executeResult.orderAfter).not.toBeNull();
    });

    //LiquidatePerpPosition
    it('should revert liquidate perp position if insufficient gas to process the message.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // liquidate position with insufficient gas
        const liquidatePrice = 20000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0, 0.001); // insufficient gas
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert liquidate perp position if caller is not a trusted executor.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // liquidate position with another user
        const liquidatePrice = 20000;
        const liquidateResult = await liquidatePerpPosition(user1, tokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert liquidate perp position if the tokenId does not exist in the tokenConfigs.', async () => {
        const { executionFee, isMarket, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // create order with a non-existent tokenId
        const nonExistentTokenId = 99; // non-existent token ID

        // liquidate position
        const liquidatePrice = 20000;
        const liquidateResult = await liquidatePerpPosition(executor, nonExistentTokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert liquidate perp position if the token is disabled.', async () => {
        const disabledTokenResult = await disbaleToken(TestEnv.manager.getSender(), token);
        expect(disabledTokenResult.trxResult.transactions).toHaveTransaction({
            from: TestEnv.manager.address,
            to: pool.address,
            success: true
        });

        const { isLong } = defaultOrderParams;

        // create order with a disabled tokenId
        const disabledTokenId = Number(token.tokenId); // disabled token ID

        // liquidate position
        const liquidatePrice = 20000;
        const liquidateResult = await liquidatePerpPosition(executor, disabledTokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert liquidate perp position if the account does not have an open position for the tokenId.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // liquidate position without creating an order
        const liquidatePrice = 20000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert liquidate perp position if the margin is too high to liquidate.', async () => {
        // add liquidity
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // set block time
        blockchain.now = Math.floor(Date.now() / 1000);

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        })
        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);


        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 1000;
        let size = 0.02;
        let triggerPrice = 51000;
        let indexPrice = 50000;
        let pr = 0.001; // 0.1%

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        /// executor order
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, 40000, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });


    });

    //ADLPerpPosition
    it('should revert adl perp position if insufficient gas to process the message.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;
        // adl position with insufficient gas
        const adlMargin = 50;
        const adlSize = 0.01; // 500u
        const adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, tokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0, 0.001);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert adl perp position if caller is not a trusted executor.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // adl position with another user
        const adlMargin = 50;
        const adlSize = 0.01; // 500u
        const adlPrice = 48000;

        const adlResult = await adlPerpPosition(user1, tokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert adl perp position if the tokenId is not configured in the contract.', async () => {
        const { executionFee, isMarket, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // adl position with a non-existent tokenId
        const nonExistentTokenId = 99; // non-existent token ID
        const adlMargin = 50;
        const adlSize = 0.01; // 500u
        const adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, nonExistentTokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert adl perp position if the token is disabled in the contract.', async () => {
        const disabledTokenResult = await disbaleToken(TestEnv.manager.getSender(), token);
        expect(disabledTokenResult.trxResult.transactions).toHaveTransaction({
            from: TestEnv.manager.address,
            to: pool.address,
            success: true
        });

        const { executionFee, isMarket, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // adl position with a disabled tokenId
        const disabledTokenId = Number(token.tokenId); // disabled token ID
        const adlMargin = 50;
        const adlSize = 0.01; // 500u
        const adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, disabledTokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
    });

    it('should revert adl perp position if the account does not have an open position for the tokenId.', async () => {
        const { executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice } = defaultOrderParams;

        // adl position without creating an order
        const adlMargin = 50;
        const adlSize = 0.01; // 500u
        const adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, tokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false
        });
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
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
        expect(createResult.order?.sizeDelta).toEqual(toJettonUnits(size));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(margin));
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance + toJettonUnits(margin));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: user0JettonWallet.address,
            success: true
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
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toJettonUnits(margin));
        expect(createResult.order?.sizeDelta).toEqual(toJettonUnits(size));
        // check jetton
        expect(createResult.balanceAfter.user0JettonBalance).toEqual(createResult.balanceBefore.user0JettonBalance - toJettonUnits(margin));
        expect(createResult.balanceAfter.poolJettonBalance).toEqual(createResult.balanceBefore.poolJettonBalance + toJettonUnits(margin));

        /// cancel order
        const cancelResult = await cancelPerpOrder(user0, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: user0JettonWallet.address,
            success: true
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
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // set block time
        const time1 = Math.floor(Date.now() / 1000);
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);


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
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        /// executor order
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
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
        let globalPosition = executeResult.positionDataAfter!.globalPosition;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPosition?.margin);
        expect(globalPosition?.longSize).toEqual(perpPosition?.size);

        let globalLPPosition = executeResult.positionDataAfter!.globalLPPosition;
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
            to: pool.address,
            success: true
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
            to: pool.address,
            success: true
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
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult.orderEx).toBeNull();

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', executeResult.positionDataAfter);
        console.log('global pool after increase:', executeResult.poolStatAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let decreaseMargin = 50;
        let decreaseSize = 0.01;
        let decreaseTriggerPrice = 51000;
        let decreasePrice = 55000;

        // set block time
        blockchain.now = now();

        // create order
        const createDecreaseResult = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        /// executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('global pool after decrease:', executeResult.poolStatAfter);

        // check position
        // let tradingFee = decreaseSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * decreaseSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(decreaseMargin + tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease!.size - toJettonUnits(decreaseSize));

        // check global position
        let globalPosition = executeDecreaseResult.positionDataAfter!.globalPosition;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPositionAfterDecrease?.margin);
        expect(globalPosition?.longSize).toEqual(perpPositionAfterDecrease?.size);

        let globalLPPosition = executeDecreaseResult.positionDataAfter!.globalLPPosition;
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
            to: pool.address,
            success: true
        });

        /// executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseResult1 = await executePerpOrder(executor, createDecreaseResult1.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult1.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult1.trxResult.transactions);
        expect(executeDecreaseResult1.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('position after close:', executeDecreaseResult1.positionDataAfter);
        console.log('global pool after close:', executeDecreaseResult1.poolStatAfter);

        // check position
        expect(executeDecreaseResult1.positionAfter!.size).toEqual(0n);
        expect(executeDecreaseResult1.positionAfter!.margin).toEqual(0n);

        // check global position
        let globalPositionAfterClose = executeDecreaseResult1.positionDataAfter!.globalPosition;
        console.log('globalPositionAfterClose:', globalPositionAfterClose);
        expect(globalPositionAfterClose?.longMargin).toEqual(0n);
        expect(globalPositionAfterClose?.longSize).toEqual(0n);

        let globalLPPositionAfterClose = executeDecreaseResult1.positionDataAfter!.globalLPPosition;
        console.log('globalLPPositionAfterClose:', globalLPPositionAfterClose);
        expect(globalLPPositionAfterClose?.netSize).toEqual(0n);
        expect(globalLPPositionAfterClose?.isLong).toBeFalsy();
    });

    it('should execute partial close perp position', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult.orderEx).toBeNull();

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', executeResult.positionDataAfter);
        console.log('global pool after increase:', executeResult.poolStatAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let decreaseMargin = 0;
        let decreaseSize = 0.01;
        let decreaseTriggerPrice = 51000;
        let decreasePrice = 55000;

        // set block time
        blockchain.now = now();

        // create order
        const createDecreaseResult = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        /// executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('global pool after decrease:', executeResult.poolStatAfter);

        // check position
        // let tradingFee = decreaseSize * decreasePrice * TestEnv.tradingFeeRate;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(decreaseMargin + tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease!.size - toJettonUnits(decreaseSize));

    });

    it('should execute increase perp market order with tp/sl', async () => {
        console.log('should execute increase perp market order with tp/sl');
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // set block time
        blockchain.now = now();

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

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
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee * 3, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        const body = createResult.trxResult.externals[0].body;
        const perpOrderCreatedEvent = loadPerpOrderCreatedEvent(body.asSlice());
        console.log(perpOrderCreatedEvent);

        console.log('pool ton balance after create order', fromNano(createResult.balanceAfter.poolTonBalance));
        console.log('total execution fee after create order with tp/sl', fromNano((await pool.getPoolStat()).totalExecutionFee));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, perpOrderCreatedEvent.orderId);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('pool ton balance after cancel order', fromNano(cancelResult.balanceAfter.poolTonBalance));
        console.log('total execution fee after cancel order with tp/sl', fromNano((await pool.getPoolStat()).totalExecutionFee));
        console.log('receive execution fee', fromNano(cancelResult.balanceAfter.user1TonBalance - cancelResult.balanceBefore.user1TonBalance));

        // create order
        const createResult1 = await createIncreasePerpOrder(user1, executionFee * 3, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult1.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });
        expect(createResult1.orderEx?.executionFee).toEqual(toNano(executionFee));
        expect(createResult1.orderEx?.tpPrice).toEqual(toPriceUnits(tpPrice));
        expect(createResult1.orderEx?.tpSize).toEqual(toJettonUnits(tpSize));
        expect(createResult1.orderEx?.slPrice).toEqual(toPriceUnits(slPrice));
        expect(createResult1.orderEx?.slSize).toEqual(toJettonUnits(slSize));
        console.log('total execution fee after create order with tp/sl', fromNano((await pool.getPoolStat()).totalExecutionFee));

        /// executor order
        const executeResult = await executePerpOrder(executor, createResult1.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('total execution fee after execute order', fromNano((await pool.getPoolStat()).totalExecutionFee));

        // check order
        expect(executeResult.orderAfter).toBeNull();
        expect(executeResult.orderExAfter).toBeNull();

        // check position
        let perpPosition = executeResult.positionAfter;
        console.log('postion:', perpPosition);

        expect(perpPosition).not.toBeNull();
        // let tradingFee = size * indexPrice * TestEnv.tradingFeeRate;
        // expect(perpPosition?.margin).toEqual(toJettonUnits(margin - tradingFee));
        expect(perpPosition?.size).toEqual(toJettonUnits(size));
        expect(perpPosition?.entryPrice).toBeGreaterThanOrEqual(toPriceUnits(indexPrice));

        // check tp order
        let tpOrderData = (await TestEnv.pool.getPerpOrder(createResult1.orderIdBefore + 1n));
        console.log('tpOrder after increase:', tpOrderData);

        let tpOrder = tpOrderData.perpOrder;
        expect(tpOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_TP);
        expect(tpOrder?.sizeDelta).toEqual(toJettonUnits(tpSize));
        expect(tpOrder?.triggerPrice).toEqual(toPriceUnits(tpPrice));
        expect(tpOrder?.triggerAbove).toEqual(true);
        expect(tpOrderData.perpOrderEx).toBeNull();

        // check sl order
        let slOrderData = (await TestEnv.pool.getPerpOrder(createResult1.orderIdBefore + 2n));
        console.log('slOrder after increase:', slOrderData);

        let slOrder = slOrderData.perpOrder;
        expect(slOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_SL);
        expect(slOrder?.sizeDelta).toEqual(toJettonUnits(slSize));
        expect(slOrder?.triggerPrice).toEqual(toPriceUnits(slPrice));
        expect(slOrder?.triggerAbove).toEqual(false);
        expect(slOrderData.perpOrderEx).toBeNull();

    });

    it('should execute tp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

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
            to: pool.address,
            success: true
        });
        console.log('pool ton balance', fromNano(createDecreaseResult.balanceAfter.poolTonBalance));
        console.log('total execution fee after create order', fromNano((await pool.getPoolStat()).totalExecutionFee));

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
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position data after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('global pool data after decrease:', executeDecreaseResult.poolStatAfter);

        console.log('pool ton balance', fromNano(executeDecreaseResult.balanceAfter.poolTonBalance));
        console.log('total execution fee after execute order', fromNano((await pool.getPoolStat()).totalExecutionFee));

        // check position
        // let tradingFee = tpSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * tpSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        // expect(perpPositionAfterDecrease?.margin).toEqual(perpPositionAfterIncrease?.margin + toJettonUnits(realizedPnl) - toJettonUnits(tradingFee));
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease!.size - toJettonUnits(tpSize));

        expect(executeDecreaseResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(size - tpSize));
        expect(executeDecreaseResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();

    });

    it('should liquidate long perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== liquidate perp ================================ */
        let liquidatePrice = 45000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
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
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = false;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 49000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== liquidate perp ================================ */
        let liquidatePrice = 56000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        printTransactionFees(liquidateResult.trxResult.transactions);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
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
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== adl perp ================================ */
        let adlMargin = 50;
        let adlSize = 0.01;
        let adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, tokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let adlPosition = adlResult.positionAfter;
        console.log('global position after adl:', adlPosition);

        // check position
        expect(adlPosition?.size).toEqual(perpPositionAfterIncrease!.size - toJettonUnits(adlSize));
        expect(adlResult.globalLPPositionAfter?.netSize).toEqual(perpPositionAfterIncrease!.size - toJettonUnits(adlSize));
        expect(adlResult.globalLPPositionAfter?.isLong).toBeFalsy();

    });

    it('should claim funding fee', async () => {
        // set block time
        blockchain.now = Math.floor(Date.now() / 1000);
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

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
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        expect(executeResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== increase short perp ================================ */
        let increaseShortMargin = 100;
        let increaseShortSize = 0.02;
        let increaseShortTriggerPrice = 50000;
        let increaseShortIncreasePrice = 51000;

        // create order
        const createIncreaseShortResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, false, increaseShortMargin, increaseShortSize, increaseShortTriggerPrice, 0, 0, 0, 0);
        expect(createIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeIncreaseShortResult = await executePerpOrder(executor, createIncreaseShortResult.orderIdBefore, increaseShortIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeIncreaseShortResult.trxResult.transactions);
        expect(executeIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        expect(executeIncreaseShortResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(increaseShortSize - size));
        expect(executeIncreaseShortResult.positionDataAfter!.globalLPPosition?.isLong).toBeTruthy();

        /* =========================== decrease short perp ================================ */
        blockchain.now = blockchain.now + 10 * 60; // 1 hour

        let decreaseShortMargin = 100;
        let decreaseShortSize = 0.02;
        let decreaseShortTriggerPrice = 51000;
        let decreaseShortIncreasePrice = 50000;
        _fundingFeeGrowth = 1;
        _rolloverFeeGrowth = 1;

        // create order
        const createDecreaseShortResult = await createDecreasePerpOrder(user1, executionFee, tokenId, false, decreaseShortMargin, decreaseShortSize, decreaseShortTriggerPrice);
        expect(createDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        console.log('decrease short order:', createDecreaseShortResult.order);

        // executor order
        const executeDecreaseShortResult = await executePerpOrder(executor, createDecreaseShortResult.orderIdBefore, decreaseShortIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseShortResult.trxResult.transactions);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        expect(executeDecreaseShortResult.positionDataAfter!.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeDecreaseShortResult.positionDataAfter!.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== claim protocol fee ================================ */
        console.log('>>>>>poolStat before claim', await pool.getPoolStat());

        const claimResult = await claimProtocolFee(TestEnv.claimExecutor.getSender(), 0.2, TestEnv.user3);
        printTransactionFees(claimResult.trxResult.transactions);
        expect(claimResult.trxResult.transactions).toHaveTransaction({
            from: claimExecutor.address,
            to: pool.address,
            success: true
        });
        console.log('jetton balance after claim.', claimResult.balanceAfter.user3JettonBalance);
        console.log('>>>>>poolStat after claim', await pool.getPoolStat());

    });

});
