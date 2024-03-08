import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, beginCell, Cell } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { MockJetton } from '../wrappers/MockJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { buildOnchainMetadata } from '../contracts/mock/utils/jetton-helpers';
import '@ton/test-utils';
import { toUnits } from '../utils/util';

describe('Pool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let jetton: SandboxContract<MockJetton>;
    let executor: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let executionFeeReceiver: SandboxContract<TreasuryContract>;
    const usdtDecimal = 6;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        pool = blockchain.openContract(await Pool.fromInit());

        deployer = await blockchain.treasury('deployer');
        executor = await blockchain.treasury('deployer');
        user0 = await blockchain.treasury('user0');
        executionFeeReceiver = await blockchain.treasury('executionFeeReceiver');

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

        // set execution fee receiver
        const setExecutionFeeReceiverResult = await pool.send(
            deployer.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'SetExecutionFeeReceiver',
                receiver: executionFeeReceiver.address,
            }
        );

        // print pool ton balance
        let poolTonBalance = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalance after setExecutionFeeReceiverResult", poolTonBalance.toLocaleString());
        // expect(poolTonBalance).toEqual(toNano('0'));
        printTransactionFees(setExecutionFeeReceiverResult.transactions);


        expect(setExecutionFeeReceiverResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });

        let executionFeeReceiverAddress = await pool.getExecutionFeeReceiver();
        expect(executionFeeReceiverAddress).toEqualAddress(executionFeeReceiver.address);
        // deploy mock jetton
        const jettonParams = {
            name: "Mock USDC",
            description: "Mock USDC Token in Tact-lang",
            symbol: "mUSDC",
            image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
            decimals: "6"
        };

        // Create content Cell
        let content = buildOnchainMetadata(jettonParams);
        jetton = blockchain.openContract(await MockJetton.fromInit(deployer.address, content));
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
                amount: toUnits('100', usdtDecimal),
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

    it('should increase LP', async () => {
        /// create order
        let prevIndex = await pool.getIncreaseRbfPositionIndexNext();
        let margin = toUnits(10, usdtDecimal);
        let liquidity = toUnits(100, usdtDecimal);
        console.log('liquidity:', margin);

        // transfer jetton with create increase LP position order payload
        // get user jetton wallet address
        let user0WalletAddress = await jetton.getGetWalletAddress(user0.address);
        let user0JettonWallet = await blockchain.openContract(JettonDefaultWallet.fromAddress(user0WalletAddress));
        // get user jetton balance
        let user0JettonData = await user0JettonWallet.getGetWalletData();
        let user0JettonBalance = user0JettonData.balance;
        expect(user0JettonBalance).toEqual(toUnits('100', usdtDecimal));

        // get pool jetton wallet address 
        let poolJettonWalletAddress = await jetton.getGetWalletAddress(pool.address);
        // get poll TON balance
        let poolTonBalance = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalance", poolTonBalance.toLocaleString());

        let payloadCell = beginCell().storeInt(1,32).storeInt(margin, 128).storeInt(liquidity, 128).storeCoins(toNano('0.5')).endCell();
        let forwardPayload = beginCell().storeRef(payloadCell).endCell();

        let poolJettonBalanceBefore = 0n;

        const trxResult = await user0JettonWallet.send(
            user0.getSender(),
            {
                value: toNano('2'),
            },
            {
                $$type: 'TokenTransfer',
                query_id: 0n,
                amount: margin,
                destination: pool.address,
                response_destination: user0.address,
                custom_payload: null,
                forward_ton_amount: toNano('1'),
                forward_payload: forwardPayload
            }
        );

        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: poolJettonWalletAddress,
            to: pool.address,
            success: true,
        });
        console.log("TokenTransfer");

        // check index
        // let index = await pool.getIncreaseLpPositionIndexNext();
        // expect(index.toLocaleString).toEqual((prevIndex + BigInt(1)).toLocaleString);

        // // check order
        // let order = await pool.getIncreaseRbfPositionOrder(prevIndex);
        // expect(order).not.toBeNull();
        // expect(order?.liquidityDelta.toLocaleString).toEqual(margin.toLocaleString);

        // check pool jetton balance
        let poolJettonWallet = blockchain.openContract(JettonDefaultWallet.fromAddress(poolJettonWalletAddress));
        let poolJettonDataAfter = await poolJettonWallet.getGetWalletData();
        let poolJettonBalanceAfter = poolJettonDataAfter.balance;
        console.log("poolJettonBalanceAfter", poolJettonBalanceAfter.toLocaleString());
        console.log("poolJettonBalanceAfter + nano", (poolJettonBalanceBefore + margin).toLocaleString());
        expect(poolJettonBalanceAfter.toLocaleString()).toEqual((poolJettonBalanceBefore + margin).toLocaleString());

        // check pool TON balance
        let poolTonBalanceAfter = (await blockchain.getContract(pool.address)).balance;
        console.log("poolTonBalanceAfter", poolTonBalanceAfter.toLocaleString());
    });

});
