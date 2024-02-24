import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, beginCell, Cell } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { MockJetton } from '../wrappers/MockJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { buildOnchainMetadata } from '../contracts/mock/utils/jetton-helpers';
import '@ton/test-utils';
import BN from "bn.js";

describe('Pool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let jetton: SandboxContract<MockJetton>;
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

        // deploy mock jetton
        const jettonParams = {
            name: "Mock USDC",
            description: "Mock USDC Token in Tact-lang",
            symbol: "mUSDC",
            image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
        };
        let max_supply = toNano(1000000000); // 🔴 Set the specific total supply in nano

        // Create content Cell
        let content = buildOnchainMetadata(jettonParams);
        jetton = blockchain.openContract(await MockJetton.fromInit(deployer.address, content, max_supply));
        const jettonDeployResult = await jetton.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
                bounce: true
            },
            {
                $$type: 'Deploy',
                queryId: 0n
            }
        );

        expect(jettonDeployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jetton.address,
            deploy: true,
            success: true,
        });
        // deploy mock jetton end

        // mint for user0
        const mintResult = await jetton.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'Mint',
                amount: toNano('100'),
                receiver: user0.address,
            }
        );

        expect(mintResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jetton.address,
            success: true,
        });

        // mint end
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should increase RBF', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;
        // const trxResult = await pool.send(
        //     user0.getSender(),
        //     {
        //         value: toNano('0.5'),
        //     },
        //     {
        //         $$type: 'CreateIncreaseRBFPositionOrder',
        //         liquidityDelta: liquidity
        //     }
        // );

        // expect(trxResult.transactions).toHaveTransaction({
        //     from: user0.address,
        //     to: pool.address,
        //     success: true,
        // });
        // printTransactionFees(trxResult.transactions);

        // transfer jetton with create increase RBF position order payload
        // get user jetton wallet address
        let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
        let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
        // get user jetton balance
        let user0JettonData = await user0JettonWallet.getGetWalletData();
        let user0JettonBalance = user0JettonData.balance;
        expect(user0JettonBalance).toEqual(toNano('100'));

        const trxResult2 = await user0JettonWallet.send(
            user0.getSender(),
            {
                value: toNano('2'),
            },
            {
                $$type: 'TokenTransfer',
                query_id: 0n,
                amount: toNano('10'),
                destination: pool.address,
                response_destination: user0.address,
                custom_payload: null,
                forward_ton_amount: toNano('1'),
                forward_payload: beginCell().storeInt(1,32).storeInt(liquidity,256).endCell()
            }
        );

        // printTransactionFees(trxResult2.transactions);

        // get pool jetton wallet address 
        let poolWalletAddress = await jetton.getGetWalletAddress(pool.address);
        expect(trxResult2.transactions).toHaveTransaction({
            from: poolWalletAddress,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index.toLocaleString).toEqual((prevIndex + BigInt(1)).toLocaleString);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(index);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta.toLocaleString).toEqual(liquidity.toLocaleString);

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
