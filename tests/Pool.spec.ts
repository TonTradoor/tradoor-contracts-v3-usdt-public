import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import '@ton/test-utils';

describe('Pool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let executor: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        pool = blockchain.openContract(await Pool.fromInit());

        deployer = await blockchain.treasury('deployer');
        executor = await blockchain.treasury('deployer');
        user0 = await blockchain.treasury('user0');

        const deployResult = await pool.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should increase RBF', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;
        const trxResult = await pool.send(
            user0.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CreateIncreaseRBFPositionOrder',
                liquidityDelta: liquidity
            }
        );

        expect(trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });
        printTransactionFees(trxResult.transactions);

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index).toEqual(prevIndex + BigInt(1));

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(index);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta).toEqual(liquidity);

    });

    it('should cancel increase RBF', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;
        let trxResult = await pool.send(
            user0.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CreateIncreaseRBFPositionOrder',
                liquidityDelta: liquidity
            }
        );

        expect(trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index).toEqual(prevIndex + 1n);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(index);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta).toEqual(liquidity);
        
        /// cancel order
        trxResult = await pool.send(
            user0.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CancelIncreaseRBFPositionOrder',
                index: index
            }
        );

        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        // check order
        order = await pool.getIncreaseRbfPositionOrder(index);
        expect(order).toBeNull();
    });

    it('should execute increase RBF', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;
        let trxResult = await pool.send(
            user0.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CreateIncreaseRBFPositionOrder',
                liquidityDelta: liquidity
            }
        );

        expect(trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index).toEqual(prevIndex + 1n);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(index);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta).toEqual(liquidity);
        
        /// executor order
        trxResult = await pool.send(
            executor.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'ExecuteIncreaseRBFPositionOrder',
                index: index
            }
        );

        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check position
        let position = await pool.getFundPosition(user0.address);
        expect(position).not.toBeNull();
        expect(position?.liquidity).toEqual(liquidity);
    });
});
