import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { OrderBook } from '../../wrappers/OrderBook';
import { Pool } from '../../wrappers/Pool';
import { MockJetton } from '../../wrappers/MockJetton';
import { toNano } from '@ton/core';
import { buildOnchainMetadata } from '../../contracts/mock/utils/jetton-helpers';
import { JettonDefaultWallet } from '../../wrappers/JettonDefaultWallet';
import { toJettonUnits } from './TokenHelper';
import { PERCENTAGE_BASIS_POINT } from '../../utils/constants';

export class TestEnv {

    static blockchain: Blockchain;
    static deployer: SandboxContract<TreasuryContract>;
    static executor: SandboxContract<TreasuryContract>;
    static compensator: SandboxContract<TreasuryContract>;
    static user0: SandboxContract<TreasuryContract>;
    static user1: SandboxContract<TreasuryContract>;
    static orderBook: SandboxContract<OrderBook>;
    static pool: SandboxContract<Pool>;
    static jetton: SandboxContract<MockJetton>;
    static user0JettonWallet: SandboxContract<JettonDefaultWallet>;
    static orderBookJettonWallet: SandboxContract<JettonDefaultWallet>;

    // config
    static jettonDecimal: number = 6;
    static priceDecimal: number = 20;

    static tradingFeeRate: number = 0.001;

    static async resetEnv() {
        TestEnv.blockchain = await Blockchain.create();
        TestEnv.orderBook = TestEnv.blockchain.openContract(await OrderBook.fromInit(0n));
        TestEnv.pool = TestEnv.blockchain.openContract(await Pool.fromInit(0n));

        TestEnv.deployer = await TestEnv.blockchain.treasury('deployer');
        TestEnv.executor = await TestEnv.blockchain.treasury('executor');
        TestEnv.compensator = await TestEnv.blockchain.treasury('compensator');

        TestEnv.user0 = await TestEnv.blockchain.treasury('user0');
        TestEnv.user1 = await TestEnv.blockchain.treasury('user1');

        // deploy order book
        const orderBookDeployResult = await TestEnv.orderBook.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(orderBookDeployResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.orderBook.address,
            deploy: true,
            success: true,
        });

        // deploy pool
        const poolDeployResult = await TestEnv.pool.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(poolDeployResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            deploy: true,
            success: true,
        });

        // deploy jetton
        const jettonParams = {
            name: "Mock USDT",
            description: "Mock USDT Token in Tact-lang",
            symbol: "mUSDT",
            image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
            decimals: "6"
        };

        // Create content Cell
        let content = buildOnchainMetadata(jettonParams);
        TestEnv.jetton = TestEnv.blockchain.openContract(await MockJetton.fromInit(TestEnv.deployer.address, content));
        const jettonDeployResult = await TestEnv.jetton.send(
            TestEnv.deployer.getSender(),
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
            from: TestEnv.deployer.address,
            to: TestEnv.jetton.address,
            deploy: true,
            success: true,
        });

        TestEnv.user0JettonWallet = TestEnv.blockchain.openContract(await JettonDefaultWallet.fromInit(TestEnv.user0.address, TestEnv.jetton.address));
        TestEnv.orderBookJettonWallet = TestEnv.blockchain.openContract(await JettonDefaultWallet.fromInit(TestEnv.orderBook.address, TestEnv.jetton.address));

        // set config to orderBook
        const setOderBookConfigResult = await TestEnv.orderBook.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateConfig',
                executor: TestEnv.executor.address,
                enableExecutor: true,
                maxTimeDelayExecutor: 30n * 60n,
                minTimeDelayTrader: 3n * 60n,
                minExecutionFee: toNano(0.1),
                gasConsumption: toNano(0.02),
                minTonsForStorage: toNano(0.01),
                usdtWallet: TestEnv.orderBookJettonWallet.address,
                pool: TestEnv.pool.address
            }
        );
        
        expect(setOderBookConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.orderBook.address,
            success: true,
        });

        // set config to pool
        const setPoolConfigResult = await TestEnv.pool.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateConfig',
                gasConsumption: toNano(0.04),
                minTonsForStorage: toNano(0.01),
                lpLockTime: 5n * 60n,
                bonusFactor: 1n,
                orderBook: TestEnv.orderBook.address
            }
        );

        expect(setPoolConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            success: true,
        });

        // set BTC config to orderbook
        const setPoolTokenConfigResult = await TestEnv.pool.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateTokenConfig',
                tokenId: 1n,
                name: "BTC",
                enable: true,
                minMargin: toJettonUnits(10), // 10U
                maxLeverage: 100n,
                liquidationFee: toJettonUnits(0.2), // 0.2U
                tradingFeeRate: BigInt(TestEnv.tradingFeeRate * PERCENTAGE_BASIS_POINT), // 0.1%
                lpTradingFeeRate: BigInt(0.6 * PERCENTAGE_BASIS_POINT), // 60%
                interestRate: 0n,
                maxFundingRate: 0n
            }
        );

        expect(setPoolTokenConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            success: true,
        });

    }

}
// exports.TestEnv = TestEnv;
