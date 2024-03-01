import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, beginCell, Cell } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { MockJetton } from '../wrappers/MockJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { buildOnchainMetadata } from '../contracts/mock/utils/jetton-helpers';
import '@ton/test-utils';

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

        // set usdc jetton address to pool
        let poolJettonWalletAddress = await jetton.getGetWalletAddress(pool.address);
        const setJettonResult = await pool.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'SetUSDC',
                usdc: poolJettonWalletAddress
            }
        );

        let usdcAddress = await pool.getUsdc();
        expect(usdcAddress).toEqualAddress(poolJettonWalletAddress);
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should increase RBF', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;

        // transfer jetton with create increase RBF position order payload
        // get user jetton wallet address
        let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
        let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
        // get user jetton balance
        let user0JettonData = await user0JettonWallet.getGetWalletData();
        let user0JettonBalance = user0JettonData.balance;
        expect(user0JettonBalance).toEqual(toNano('100'));

        // get pool jetton wallet address 
        let poolJettonWalletAddress = await jetton.getGetWalletAddress(pool.address);
        // get poll TON balance
        let poolTonBalance = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalance", poolTonBalance.toLocaleString());


        let payloadCell = beginCell().storeInt(1,32).storeCoins(liquidity).storeCoins(toNano('0.5')).endCell();
        let forwardPayload =beginCell().storeRef(payloadCell).endCell();

        let poolJettonBalanceBefore = 0n;

        const trxResult = await user0JettonWallet.send(
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
                forward_payload: forwardPayload
            }
        );

        expect(trxResult.transactions).toHaveTransaction({
            from: poolJettonWalletAddress,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index.toLocaleString).toEqual((prevIndex + BigInt(1)).toLocaleString);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta.toLocaleString).toEqual(liquidity.toLocaleString);

        // check pool jetton balance
        let poolJettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(poolJettonWalletAddress));
        let poolJettonDataAfter = await poolJettonWallet.getGetWalletData();
        let poolJettonBalanceAfter = poolJettonDataAfter.balance;
        console.log("poolJettonBalanceAfter", poolJettonBalanceAfter.toLocaleString());
        console.log("poolJettonBalanceAfter + nano", (poolJettonBalanceBefore + toNano('10')).toLocaleString());
        expect(poolJettonBalanceAfter.toLocaleString()).toEqual((poolJettonBalanceBefore + toNano('10')).toLocaleString());

        // check pool TON balance
        let poolTonBalanceAfter = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalanceAfter", poolTonBalanceAfter.toLocaleString());
    });


    it('auto refund -- not enough execution fee', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;

        // transfer jetton with create increase RBF position order payload
        // get user jetton wallet address
        let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
        let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
        // get user jetton balance
        let user0JettonData = await user0JettonWallet.getGetWalletData();
        let user0JettonBalance = user0JettonData.balance;
        expect(user0JettonBalance).toEqual(toNano('100'));

        // get pool jetton wallet address 
        let poolJettonWalletAddress = await jetton.getGetWalletAddress(pool.address);
        // get poll TON balance
        let poolTonBalance = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalance", poolTonBalance.toLocaleString());


        let payloadCell = beginCell().storeInt(1,32).storeCoins(liquidity).storeCoins(toNano('0.5')).endCell();
        let forwardPayload =beginCell().storeRef(payloadCell).endCell();

        let poolJettonBalanceBefore = 0n;

        const trxResult = await user0JettonWallet.send(
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
                forward_ton_amount: toNano('0.4'),
                forward_payload: forwardPayload
            }
        );

        expect(trxResult.transactions).toHaveTransaction({
            from: poolJettonWalletAddress,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index.toLocaleString).toEqual((prevIndex + BigInt(1)).toLocaleString);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
        expect(order).toBeNull();

        // check pool jetton balance
        let poolJettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(poolJettonWalletAddress));
        let poolJettonDataAfter = await poolJettonWallet.getGetWalletData();
        let poolJettonBalanceAfter = poolJettonDataAfter.balance;
        expect(poolJettonBalanceAfter.toLocaleString()).toEqual(toNano('0').toLocaleString());

        // check pool TON balance
        let poolTonBalanceAfter = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalanceAfter", poolTonBalanceAfter.toLocaleString());
    });

    it('should cancel increase RBF', async () => {
        // create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;
        // transfer jetton with create increase RBF position order payload
        // get user jetton wallet address
        let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
        let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
        // get user jetton balance
        let user0JettonData = await user0JettonWallet.getGetWalletData();
        let user0JettonBalance = user0JettonData.balance;
        expect(user0JettonBalance).toEqual(toNano('100'));

        let payloadCell = beginCell().storeInt(1,32).storeCoins(liquidity).storeCoins(toNano('0.5')).endCell();
        let forwardPayload =beginCell().storeRef(payloadCell).endCell();

        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;
        const trxResult = await user0JettonWallet.send(
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
                forward_payload: forwardPayload
            }
        );

        let poolWalletAddress = await jetton.getGetWalletAddress(pool.address);
        expect(trxResult.transactions).toHaveTransaction({
            from: user0JettonWallet.address,
            to: poolWalletAddress,
            success: true,
        });
        expect(trxResult.transactions).toHaveTransaction({
            from: poolWalletAddress,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index).toEqual(prevIndex + 1n);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta).toEqual(liquidity);
        
        // wait for 7s (cancel )

        blockchain.now = blockchain.now + 7 * 1000;
        /// cancel order
        const trxResult2 = await pool.send(
            user0.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CancelIncreaseRBFPositionOrder',
                index: prevIndex,
                trxId: 1n
            }
        );

        printTransactionFees(trxResult2.transactions);
        expect(trxResult2.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });
        printTransactionFees(trxResult2.transactions);
        // check order
        order = await pool.getIncreaseRbfPositionOrder(index);
        expect(order).toBeNull();
    }, 10 * 1000);

    it('should execute increase RBF', async () => {
        // create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let liquidity = 10n**6n;
        // transfer jetton with create increase RBF position order payload
        // get user jetton wallet address
        let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
        let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
        // get user jetton balance
        let user0JettonData = await user0JettonWallet.getGetWalletData();
        let user0JettonBalance = user0JettonData.balance;
        expect(user0JettonBalance).toEqual(toNano('100'));

        let payloadCell = beginCell().storeInt(1,32).storeCoins(liquidity).storeCoins(toNano('0.5')).endCell();
        let forwardPayload =beginCell().storeRef(payloadCell).endCell();

        const time1 = Math.floor(Date.now() / 1000); 
        blockchain.now = time1;
        const trxResult = await user0JettonWallet.send(
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
                forward_payload: forwardPayload
            }
        );

        // get pool jetton wallet address
        let poolWalletAddress = await jetton.getGetWalletAddress(pool.address);
        expect(trxResult.transactions).toHaveTransaction({
            from: poolWalletAddress,
            to: pool.address,
            success: true,
        });

        // check index
        let index = await pool.getIncreaseRbfPositionIndexNext();
        expect(index).toEqual(prevIndex + 1n);

        // check order
        let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
        expect(order).not.toBeNull();
        expect(order?.liquidityDelta).toEqual(liquidity);
        
        blockchain.now = blockchain.now + 7;
        /// executor order
        const trxResult2 = await pool.send(
            executor.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'ExecuteIncreaseRBFPositionOrder',
                index: prevIndex,
                trxId: 1n
            }
        );

        printTransactionFees(trxResult2.transactions);
        expect(trxResult2.transactions).toHaveTransaction({
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
