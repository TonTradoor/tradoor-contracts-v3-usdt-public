import { Blockchain, RemoteBlockchainStorage, SandboxContract, TreasuryContract, wrapTonClient4ForRemote } from '@ton/sandbox';
import { ExecutorParamValue, OrderBook } from '../../wrappers/OrderBook';
import { Pool } from '../../wrappers/Pool';
import { MockJetton } from '../../wrappers/MockJetton';
import { Dictionary, DictionaryKey, toNano } from '@ton/core';
import { buildOnchainMetadata } from '../../contracts/mock/utils/jetton-helpers';
import { JettonDefaultWallet } from '../../wrappers/JettonDefaultWallet';
import { toJettonUnits } from './TokenHelper';
import { PERCENTAGE_BASIS_POINT } from '../../utils/constants';
import { TonClient4 } from '@ton/ton';
import { getHttpV4Endpoint } from '@orbs-network/ton-access'

export class TestEnv {

    static blockchain: Blockchain;
    static deployer: SandboxContract<TreasuryContract>;
    static executor: SandboxContract<TreasuryContract>;
    static executor1: SandboxContract<TreasuryContract>;
    static compensator: SandboxContract<TreasuryContract>;
    static claimExecutor: SandboxContract<TreasuryContract>;
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
        TestEnv.blockchain = await Blockchain.create({
            // storage: new RemoteBlockchainStorage(wrapTonClient4ForRemote(new TonClient4({
            //     endpoint: "https://testnet.toncenter.com/api/v2",
            // })))
        });
        TestEnv.orderBook = TestEnv.blockchain.openContract(await OrderBook.fromInit(0n));
        TestEnv.pool = TestEnv.blockchain.openContract(await Pool.fromInit(0n));

        TestEnv.deployer = await TestEnv.blockchain.treasury('deployer');
        TestEnv.executor = await TestEnv.blockchain.treasury('executor');
        TestEnv.executor1 = await TestEnv.blockchain.treasury('executor1');
        TestEnv.compensator = await TestEnv.blockchain.treasury('compensator');
        TestEnv.claimExecutor = await TestEnv.blockchain.treasury('claimExecutor');

        TestEnv.user0 = await TestEnv.blockchain.treasury('user0');
        TestEnv.user1 = await TestEnv.blockchain.treasury('user1');

        // deploy order book
        const orderBookDeployResult = await TestEnv.orderBook.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
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
                value: toNano('0.1'),
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
        
        let executors =  Dictionary.empty(Dictionary.Keys.BigInt(32), ExecutorParamValue)
            .set(0n, {
                $$type: 'ExecutorParam',
                executor: this.executor.address,
                enable: true
            })
            .set(1n, {
                $$type: 'ExecutorParam',
                executor: this.executor1.address,
                enable: true
            });

        // set config to orderBook
        const setOderBookConfigResult = await TestEnv.orderBook.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateConfig',
                executorLength: BigInt(executors.size),
                executors: executors,
                maxTimeDelayExecutor: 30n * 60n,
                minTimeDelayTrader: 3n * 60n,
                minExecutionFee: toNano(0.1),
                lpGasConsumption: toNano(0.013),
                perpGasConsumption: toNano(0.015),
                poolLpGasConsumption: toNano(0.016),
                poolPerpGasConsumption: toNano(0.035),
                minTonsForStorage: toNano(0.01),
                gasTransferJetton: toNano(0.025),
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
                executorLength: 2n,
                executors: executors,
                claimExecutor: this.claimExecutor.address,
                lpGasConsumption: toNano(0.016),
                perpGasConsumption: toNano(0.035),
                minTonsForStorage: toNano(0.01),
                lpLockTime: 60n * 60n,
                lpAddBonusFactor: 1n * 10n**9n,
                lpRemoveBonusFactor: 10n * 10n**9n,
                lpLiquidityFactor: 2n * 10n**9n,
                orderBook: TestEnv.orderBook.address
            }
        );

        expect(setPoolConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            success: true,
        });

        // set token config to pool
        const tokens = ['BTC', 'ETH'];

        for (let index = 0; index < tokens.length; index++) {
            const name = tokens[index];

            const setPoolTokenConfigResult = await TestEnv.pool.send(
                TestEnv.deployer.getSender(),
                {
                    value: toNano('0.1'),
                },
                {
                    $$type: 'UpdateTokenConfig',
                    tokenId: 1n,
                    name: name,
                    enable: true,
                    minValue: toJettonUnits(100), // 100U
                    maxValue: toJettonUnits(10_000_000), // 10M U
                    maxLeverage: 105n,
                    liquidationFee: toJettonUnits(0.2), // 0.2U
                    maintenanceRate: BigInt(0.005 * PERCENTAGE_BASIS_POINT), // 0.5%
                    tradingFeeRate: BigInt(TestEnv.tradingFeeRate * PERCENTAGE_BASIS_POINT), // 0.1%
                    lpTradingFeeRate: BigInt(0.6 * PERCENTAGE_BASIS_POINT), // 60%
                    interestRate: 0n,
                    maxFundingRate: BigInt(62500), // 0.00625%
                    liquidityProportion: BigInt(PERCENTAGE_BASIS_POINT / tokens.length), // 100% / n
                }
            );
    
            expect(setPoolTokenConfigResult.transactions).toHaveTransaction({
                from: TestEnv.deployer.address,
                to: TestEnv.pool.address,
                success: true,
            });
        }

    }

}
// exports.TestEnv = TestEnv;
