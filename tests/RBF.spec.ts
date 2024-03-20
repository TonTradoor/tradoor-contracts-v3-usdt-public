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
import { cancelOrderByExecutor, createIncreaseOrder } from './lib/RBFHelper';

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
        let executionFee = 0.05;
        
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

    it('should cancel increase RBF', async () => {
        /// create order
        let liquidity = 10n;
        let executionFee = 0.1;

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

        console.log('create order gas used:', fromNano(createResult.tonBefore - createResult.tonAfter - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.liquidityDelta).toEqual(toJettonUnits(liquidity));

        // check jetton
        expect(createResult.jettonBalanceAfter).toEqual(createResult.jettonBalanceBefore - toJettonUnits(liquidity));
        
        // wait for 3min (cancel )
        blockchain.now = blockchain.now + 6;

        /// cancel order
        const cancelResult = await cancelOrderByExecutor(user0, createResult.orderIdBefore);
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
        expect(cancelResult.userJettonBalanceAfter).toEqual(createResult.jettonBalanceBefore);

        console.log('create order gas used:', fromNano(cancelResult.executorTonBefore - cancelResult.executorTonAfter + toNano(executionFee)));
    });

    // it('should execute increase RBF', async () => {
    //     // create order
    //     let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
    //     let liquidity = toUnits(10, usdtDecimal);
    //     // transfer jetton with create increase RBF position order payload
    //     // get user jetton wallet address
    //     let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
    //     let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
    //     // get user jetton balance
    //     let user0JettonData = await user0JettonWallet.getGetWalletData();
    //     let user0JettonBalance = user0JettonData.balance;
    //     expect(user0JettonBalance).toEqual(toUnits('100', usdtDecimal));

    //     let payloadCell = beginCell().storeInt(1,32).storeInt(liquidity, 128).storeCoins(toNano('0.5')).endCell();
    //     let forwardPayload =beginCell().storeRef(payloadCell).endCell();

    //     const time1 = Math.floor(Date.now() / 1000); 
    //     blockchain.now = time1;
    //     const trxResult = await user0JettonWallet.send(
    //         user0.getSender(),
    //         {
    //             value: toNano('2'),
    //         },
    //         {
    //             $$type: 'TokenTransfer',
    //             query_id: 0n,
    //             amount: liquidity,
    //             destination: pool.address,
    //             response_destination: user0.address,
    //             custom_payload: null,
    //             forward_ton_amount: toNano('1'),
    //             forward_payload: forwardPayload
    //         }
    //     );

    //     // get pool jetton wallet address
    //     let poolWalletAddress = await jetton.getGetWalletAddress(pool.address);
    //     expect(trxResult.transactions).toHaveTransaction({
    //         from: poolWalletAddress,
    //         to: pool.address,
    //         success: true,
    //     });

    //     // check index
    //     let index = await pool.getIncreaseRbfPositionIndexNext();
    //     expect(index).toEqual(prevIndex + 1n);

    //     // check order
    //     let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
    //     expect(order).not.toBeNull();
    //     expect(order?.liquidityDelta).toEqual(liquidity);
        
    //     // wait for 6s
    //     blockchain.now = blockchain.now + 6;
    //     /// executor order
    //     const trxResult2 = await pool.send(
    //         executor.getSender(),
    //         {
    //             value: toNano('0.5'),
    //         },
    //         {
    //             $$type: 'ExecuteIncreaseRBFPositionOrder',
    //             index: prevIndex,
    //             trxId: 1n
    //         }
    //     );

    //     printTransactionFees(trxResult2.transactions);
    //     expect(trxResult2.transactions).toHaveTransaction({
    //         from: executor.address,
    //         to: pool.address,
    //         success: true,
    //     });

    //     // check position
    //     let position = await pool.getFundPosition(user0.address);
    //     expect(position).not.toBeNull();
    //     expect(position?.liquidity).toEqual(liquidity);
    // });

    // it('should decrease RBF', async () => {
    //     /* =========================== increase RBF ================================ */
    //     // create increase order
    //     let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
    //     let liquidity = toUnits(10, 6);
    //     // transfer jetton with create increase RBF position order payload
    //     // get user jetton wallet address
    //     let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
    //     let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
    //     // get user jetton balance
    //     let user0JettonData = await user0JettonWallet.getGetWalletData();
    //     let user0JettonBalance = user0JettonData.balance;
    //     expect(user0JettonBalance).toEqual(toUnits('100', usdtDecimal));

    //     let executionFee = toNano('0.5');
    //     let payloadCell = beginCell().storeInt(1,32).storeInt(liquidity, 128).storeCoins(executionFee).endCell();
    //     let forwardPayload = beginCell().storeRef(payloadCell).endCell();

    //     const time1 = Math.floor(Date.now() / 1000); 
    //     blockchain.now = time1;
    //     const trxResult = await user0JettonWallet.send(
    //         user0.getSender(),
    //         {
    //             value: toNano('1.5'),
    //         },
    //         {
    //             $$type: 'TokenTransfer',
    //             query_id: 0n,
    //             amount: liquidity,
    //             destination: pool.address,
    //             response_destination: user0.address,
    //             custom_payload: null,
    //             forward_ton_amount: toNano('1'),
    //             forward_payload: forwardPayload
    //         }
    //     );

    //     // get pool jetton wallet address
    //     let poolWalletAddress = await jetton.getGetWalletAddress(pool.address);
    //     expect(trxResult.transactions).toHaveTransaction({
    //         from: poolWalletAddress,
    //         to: pool.address,
    //         success: true,
    //     });

    //     // check index
    //     let index = await pool.getIncreaseRbfPositionIndexNext();
    //     expect(index).toEqual(prevIndex + 1n);

    //     // check order
    //     let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
    //     expect(order).not.toBeNull();
    //     expect(order?.liquidityDelta).toEqual(liquidity);
        
    //     // wait for 6s
    //     blockchain.now = blockchain.now + 6;
    //     // executor order
    //     const trxResult2 = await pool.send(
    //         executor.getSender(),
    //         {
    //             value: toNano('0.5'),
    //         },
    //         {
    //             $$type: 'ExecuteIncreaseRBFPositionOrder',
    //             index: prevIndex,
    //             trxId: 1n
    //         }
    //     );

    //     printTransactionFees(trxResult2.transactions);
    //     expect(trxResult2.transactions).toHaveTransaction({
    //         from: executor.address,
    //         to: pool.address,
    //         success: true,
    //     });

    //     // check position
    //     let position = await pool.getFundPosition(user0.address);
    //     expect(position).not.toBeNull();
    //     expect(position?.liquidity).toEqual(liquidity);

    //     /* =========================== decrease RBF ================================ */
    //     // after 10days
    //     blockchain.now = blockchain.now + 10 * 24 * 60 * 60;

    //     let prevDecreaseIndex = await pool.getDecreaseRbfPositionIndexNext();
    //     let decreaseLiquidity = toUnits(5, 6);

    //     // create decrease order
    //     const trxResult3 = await pool.send(
    //         user0.getSender(),
    //         {
    //             value: toNano('1'),
    //         },
    //         {
    //             $$type: 'CreateDecreaseRBFPositionOrder',
    //             executionFee: executionFee,
    //             liquidityDelta: decreaseLiquidity
    //         }
    //     );
    //     printTransactionFees(trxResult3.transactions);
    //     expect(trxResult3.transactions).toHaveTransaction({
    //         from: user0.address,
    //         to: pool.address,
    //         success: true,
    //     });

    //     // check index
    //     let decreaseIndex = await pool.getDecreaseRbfPositionIndexNext();
    //     expect(decreaseIndex).toEqual(prevDecreaseIndex + 1n);

    //     // check order
    //     let decreaseOrder = await pool.getDecreaseRbfPositionOrder(prevDecreaseIndex);
    //     console.log('decreaseOrder:', decreaseOrder);
    //     expect(decreaseOrder).not.toBeNull();
    //     expect(decreaseOrder?.liquidityDelta).toEqual(decreaseLiquidity);

    //     blockchain.now = blockchain.now + 10;
    //     /// executor order
    //     const trxResult4 = await pool.send(
    //         executor.getSender(),
    //         {
    //             value: toNano('0.5'),
    //         },
    //         {
    //             $$type: 'ExecuteDecreaseRBFPositionOrder',
    //             index: prevIndex,
    //             trxId: 1n
    //         }
    //     );

    //     printTransactionFees(trxResult4.transactions);
    //     expect(trxResult4.transactions).toHaveTransaction({
    //         from: executor.address,
    //         to: pool.address,
    //         success: true,
    //     });

    //     // check position
    //     position = await pool.getFundPosition(user0.address);
    //     console.log('position:', position);
    //     expect(position).not.toBeNull();
    //     expect(position?.liquidity).toEqual(liquidity - decreaseLiquidity);
    // });
});
