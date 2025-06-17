import {
    Blockchain,
    SandboxContract,
    TreasuryContract
} from '@ton/sandbox';
import { Address, Dictionary, toNano } from '@ton/core';
import { MockJettonWallet } from '../wrappers/MockJettonWallet';
import { Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import { getJettonBalance,  mint, toJettonUnits, toPriceUnits, updateJettonContent } from './lib/TokenHelper';
import { claimProtocolFee, feedPrices, listToken, updateBaseConfig } from './lib/PoolHelper';
import { createIncreaseLiquidityOrder, executeLiquidityOrder } from './lib/LPHelper';
import { createCompensate, executeCompensate } from './lib/CompensateHelper';
import { ORDER_TYPE_LP } from '../utils/constants';
import { now } from '../utils/util';
import { Request } from '../wrappers/Multisig';
import { MultisigSigner } from '../build/Multisig/tact_MultisigSigner';
import { createIncreasePerpOrder, executePerpOrder } from './lib/PerpHelper';
import '@ton/test-utils';


describe('pool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let executor: SandboxContract<TreasuryContract>;
    let compensator: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let poolJettonWallet: SandboxContract<MockJettonWallet>;

    const members: Dictionary<Address, number> = Dictionary.empty<Address, number>();
    const requiredWeight: bigint = 1n;
    const timeout: bigint = 60n * 60n; // 1 hour

    const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128)).set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

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
        members.set(TestEnv.deployer.address, 1).set(TestEnv.executor.address, 1);

        // mint
        await mint(user0.address, '100000000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000000'));

        await mint(user1.address, '100000000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('100000000'));

        // check config
        let configData = await pool.getConfigData();
        expect(configData.jettonWallet).toEqualAddress(poolJettonWallet.address);
    });

    it('should correctly claim fees', async () => {
        blockchain.now = now();

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, {});
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolJettonWallet.address,
            to: pool.address,
            success: true,
        });
        expect(createIncreaseResult.order).not.toBeNull();

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        expect(executeIncreaseResult.orderAfter).toBeNull();

        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;
        let executionFee = 0.1;
        // create increase perp order
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

        const sender = TestEnv.claimExecutor;
        const feeReceiver = TestEnv.user0;
        const claimResult = await claimProtocolFee(sender.getSender(), 0.2, feeReceiver);

        expect(claimResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });
        expect((await TestEnv.pool.getPoolStat()).protocolTradingFee).toEqual(toJettonUnits(0));
    });

    it('should revert claim fees if sender is not a manager', async () => {
        const sender = TestEnv.user0;
        const feeReceiver = TestEnv.user0;
        const claimResult = await claimProtocolFee(sender.getSender(), 0.2, feeReceiver);

        expect(claimResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should revert claim fees if gas is not enough', async () => {
        const sender = TestEnv.user0;
        const feeReceiver = TestEnv.user0;
        const claimResult = await claimProtocolFee(sender.getSender(), 0.01, feeReceiver);

        expect(claimResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should correctly feed prices', async () => {
        const sender = TestEnv.executor;
        const prices = Dictionary.empty<number, bigint>().set(1, 100000n).set(2, 2000n);
        const feedPricesResult = await feedPrices(sender.getSender(), 0.2, 0n, 0n, prices);
        expect(feedPricesResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });
    });

    it('should revert feed prices if sender is not a executor', async () => {
        const sender = TestEnv.user0;
        const prices = Dictionary.empty<number, bigint>().set(1, 100000n);
        const feedPricesResult = await feedPrices(sender.getSender(), 0.2, 0n, 0n, prices);
        expect(feedPricesResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should revert feed prices if prices is empty', async () => {
        const sender = TestEnv.deployer;
        const prices = Dictionary.empty<number, bigint>();
        const feedPricesResult = await feedPrices(sender.getSender(), 0.2, 0n, 0n, prices);
        expect(feedPricesResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should revert feed prices if gas is not enough', async () => {
        const sender = TestEnv.deployer;
        const prices = Dictionary.empty<number, bigint>().set(1, 100000n);
        const feedPricesResult = await feedPrices(sender.getSender(), 0.01, 0n, 0n, prices);
        expect(feedPricesResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should correctly compensate', async () => {
        blockchain.now = Math.floor(Date.now() / 1000);

        // create order
        let liquidity = 10;
        let executionFee = 0.1;
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
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

        // create compensate order
        const createCompensateResult = await createCompensate(compensator, ORDER_TYPE_LP, createResult.orderIdBefore, user0.address, liquidity, user1.address, executionFee);
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

    it('should revert compensate if sender is not a compensator', async () => {
        blockchain.now = now();
        // create order
        let liquidity = 10;
        let executionFee = 0.1;
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
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
        // create compensate order
        const sender = user0;
        const createCompensateResult = await createCompensate(sender, ORDER_TYPE_LP, createResult.orderIdBefore, user0.address, liquidity, user1.address, executionFee);
        expect(createCompensateResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: pool.address,
            success: false,
        });
        console.log('create compensate', createCompensateResult.compensate);
        // check compensate
        expect(createCompensateResult.compensateIdAfter).toEqual(createCompensateResult.compensateIdBefore);
        expect(createCompensateResult.compensate).toBeNull();
    });

    it('should revert compensate if the required unlock time has not elapsed', async () => {
        blockchain.now = Math.floor(Date.now() / 1000);
        // create order
        let liquidity = 10;
        let executionFee = 0.1;
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
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
        // create compensate order
        const sender = compensator;
        const createCompensateResult = await createCompensate(sender, ORDER_TYPE_LP, createResult.orderIdBefore, user0.address, liquidity, user1.address, executionFee);
        expect(createCompensateResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: pool.address,
            success: true,
        });
        console.log('create compensate', createCompensateResult.compensate);
        // check compensate
        expect(createCompensateResult.compensateIdAfter).toEqual(createCompensateResult.compensateIdBefore + 1n);
        expect(createCompensateResult.compensate).not.toBeNull();

        blockchain.now = blockchain.now + 0.5 * 24 * 60 * 60 + 60; // 0.5 day later
        const executeCompensateResult = await executeCompensate(compensator, 0.2, createCompensateResult.compensateIdBefore);
        expect(executeCompensateResult.trxResult.transactions).toHaveTransaction({
            from: compensator.address,
            to: pool.address,
            success: false,
        });
        // check compensate
        expect(executeCompensateResult.compensate).not.toBeNull();
        // check jetton
        expect(executeCompensateResult.balanceAfter.user0JettonBalance).toEqual(executeCompensateResult.balanceBefore.user0JettonBalance);
        expect(executeCompensateResult.balanceAfter.poolJettonBalance).toEqual(executeCompensateResult.balanceBefore.poolJettonBalance);

    });

    it('should revert compensate if the message value is insufficient to cover for gas fees', async () => {
        blockchain.now = Math.floor(Date.now() / 1000);
        // create order
        let liquidity = 10;
        let executionFee = 0.1;
        const createResult = await createIncreaseLiquidityOrder(user0, {liquidity});
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
        // create compensate order
        const sender = compensator;
        const createCompensateResult = await createCompensate(sender, ORDER_TYPE_LP, createResult.orderIdBefore, user0.address, liquidity, user1.address, executionFee);
        expect(createCompensateResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: pool.address,
            success: true,
        });
        console.log('create compensate', createCompensateResult.compensate);
        // check compensate
        expect(createCompensateResult.compensateIdAfter).toEqual(createCompensateResult.compensateIdBefore + 1n);
        expect(createCompensateResult.compensate).not.toBeNull();

        blockchain.now = blockchain.now + 2 * 24 * 60 * 60 + 60; // 2 day later
        const executeCompensateResult = await executeCompensate(compensator, 0.01, createCompensateResult.compensateIdBefore);
        expect(executeCompensateResult.trxResult.transactions).toHaveTransaction({
            from: compensator.address,
            to: pool.address,
            success: false,
        });
        // check compensate
        expect(executeCompensateResult.compensate).not.toBeNull();
        // check jetton
        expect(executeCompensateResult.balanceAfter.user0JettonBalance).toEqual(executeCompensateResult.balanceBefore.user0JettonBalance);
        expect(executeCompensateResult.balanceAfter.poolJettonBalance).toEqual(executeCompensateResult.balanceBefore.poolJettonBalance);

    });

    //UpdateBaseConfig
    it('should correctly update base config.', async () => {
        const result = await updateBaseConfig(deployer.getSender());
        expect(result.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });
    });

    it('should revert update base config if caller is not the owner.', async () => {
        const result = await updateBaseConfig(executor.getSender());
        expect(result.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false,
        });
    });

    //SetManager
    it('should correctly set manager.', async () => {
        var setManagerRequest: Request = {
            $$type: 'Request',
            to: TestEnv.pool.address,
            manager: TestEnv.deployer.address,
            compensator: TestEnv.compensator.address,
            claimer: TestEnv.claimExecutor.address
        };

        const requestSetManagerResult = await TestEnv.multisig.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            setManagerRequest
        );

        expect(requestSetManagerResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.multisig.address,
            success: true,
        });


        var multisigSigner = TestEnv.blockchain.openContract(await MultisigSigner.fromInit(TestEnv.multisig.address, members, requiredWeight, timeout, setManagerRequest));
        const approveSetManagerResult = await multisigSigner.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'YES'
        );

        expect(approveSetManagerResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: multisigSigner.address,
            success: true,
        });
    });

    it('should revert set manager if caller is not the multisig.', async () => {
        const trxResult = await TestEnv.pool.send(
            TestEnv.executor.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'SetManager',
                manager: TestEnv.deployer.address,
                compensator: TestEnv.compensator.address,
                claimer: TestEnv.claimExecutor.address
            }
        );
        expect(trxResult.transactions).toHaveTransaction({
            from: TestEnv.executor.address,
            to: TestEnv.pool.address,
            success: false,
        });

    });

    //JettonUpdateContent
    it('should correctly update jetton content.', async () => {
        const updateResult = await updateJettonContent(deployer.getSender());
        expect(updateResult.trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });
    });

    it('should revert update jetton content if caller is not the pool owner.', async () => {
        const updateResult = await updateJettonContent(executor.getSender());
        expect(updateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false,
        });
    });

});
