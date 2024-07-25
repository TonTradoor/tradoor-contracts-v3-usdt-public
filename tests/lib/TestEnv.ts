import { Blockchain, printTransactionFees, RemoteBlockchainStorage, SandboxContract, TreasuryContract, wrapTonClient4ForRemote } from '@ton/sandbox';
import { OrderBook } from '../../wrappers/OrderBook';
import { Pool } from '../../wrappers/Pool';
import { MockJettonMaster as MockJetton } from '../../wrappers/JettonMock';
import { TLPJettonMaster as TLPJetton } from '../../wrappers/JettonTLP';
import { Dictionary, DictionaryKey, toNano } from '@ton/core';
import { buildOnchainMetadata } from '../../contracts/jetton/utils/jetton-helpers';
import { MockJettonWallet } from '../../wrappers/MockJettonWallet';
import { TLPJettonWallet } from '../../wrappers/TLPJettonWallet';
import { toJettonUnits } from './TokenHelper';
import { PERCENTAGE_BASIS_POINT } from '../../utils/constants';

export class TestEnv {

    static blockchain: Blockchain;
    static deployer: SandboxContract<TreasuryContract>;
    static executor: SandboxContract<TreasuryContract>;
    static executor1: SandboxContract<TreasuryContract>;
    static compensator: SandboxContract<TreasuryContract>;
    static claimExecutor: SandboxContract<TreasuryContract>;
    static user0: SandboxContract<TreasuryContract>;
    static user1: SandboxContract<TreasuryContract>;
    static user2: SandboxContract<TreasuryContract>;
    static user3: SandboxContract<TreasuryContract>;
    static orderBook: SandboxContract<OrderBook>;
    static pool: SandboxContract<Pool>;
    static jetton: SandboxContract<MockJetton>;
    static user0JettonWallet: SandboxContract<MockJettonWallet>;
    static orderBookJettonWallet: SandboxContract<MockJettonWallet>;
    static tlp: SandboxContract<TLPJetton>;
    static user0TlpWallet: SandboxContract<TLPJettonWallet>;
    static orderBookTlpWallet: SandboxContract<TLPJettonWallet>;
    static user1JettonWallet: SandboxContract<MockJettonWallet>;
    static user1TlpWallet: SandboxContract<TLPJettonWallet>;

    // config
    static tlpDecimal: number = 9;
    static jettonDecimal: number = 6;
    static priceDecimal: number = 18;

    static lpRolloverFeeRate: number = 0.7;
    static tokenConfig = [{
        tokenId: 1n,
        name: 'BTC',
        tradingFeeRate: 0.001,
        lpTradingFeeRate: 0.7
    }, {
        tokenId: 2n,
        name: 'ETH',
        tradingFeeRate: 0.001,
        lpTradingFeeRate: 0.7
    }]


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
        TestEnv.user2 = await TestEnv.blockchain.treasury('user2');
        TestEnv.user3 = await TestEnv.blockchain.treasury('user3');

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
        printTransactionFees(jettonDeployResult.transactions);

        expect(jettonDeployResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.jetton.address,
            deploy: true,
            success: true,
        });

        TestEnv.user0JettonWallet = TestEnv.blockchain.openContract(await MockJettonWallet.fromInit(TestEnv.user0.address, TestEnv.jetton.address));
        TestEnv.user1JettonWallet = TestEnv.blockchain.openContract(await MockJettonWallet.fromInit(TestEnv.user1.address, TestEnv.jetton.address));
        TestEnv.orderBookJettonWallet = TestEnv.blockchain.openContract(await MockJettonWallet.fromInit(TestEnv.orderBook.address, TestEnv.jetton.address));

        const tlpParams = {
            name: "Tradoor LP",
            description: "Native Tether USD locked in liquidity in Tradoor Trade (tradoor.io)",
            symbol: "TLP",
            image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
            decimals: "9"
        };

        // Create content Cell
        let tlp_content = buildOnchainMetadata(tlpParams);
        TestEnv.tlp = TestEnv.blockchain.openContract(await TLPJetton.fromInit(TestEnv.pool.address, tlp_content));
        const tlpDeployResult = await TestEnv.tlp.send(
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
        printTransactionFees(tlpDeployResult.transactions);

        expect(tlpDeployResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.tlp.address,
            deploy: true,
            success: true,
        });

        TestEnv.user0TlpWallet = TestEnv.blockchain.openContract(await TLPJettonWallet.fromInit(TestEnv.user0.address, TestEnv.tlp.address));
        TestEnv.user1TlpWallet = TestEnv.blockchain.openContract(await TLPJettonWallet.fromInit(TestEnv.user1.address, TestEnv.tlp.address));
        TestEnv.orderBookTlpWallet = TestEnv.blockchain.openContract(await TLPJettonWallet.fromInit(TestEnv.orderBook.address, TestEnv.tlp.address));

        let executors =  Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
            .set(this.executor.address, true)
            .set(this.executor1.address, true);

        let lpExecutors =  Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
            .set(this.user0.address, true);

        // set config to orderBook
        const setOderBookConfigResult = await TestEnv.orderBook.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateConfig',
                orderLockTime: 3n * 60n,
                gasConfig: {
                    $$type: 'GasConfig',
                    lpMinExecutionFee: toNano(0.05),
                    perpMinExecutionFee: toNano(0.1),
                    lpGasConsumption: toNano(0.015),
                    perpGasConsumption: toNano(0.017),
                    poolLpGasConsumption: toNano(0.018),
                    poolPerpGasConsumption: toNano(0.038),
                    minTonsForStorage: toNano(0.01),
                    gasTransferJetton: toNano(0.03),
                    gasForBurnTlp: toNano(0.05),
                },
                executorConfig: {
                    $$type: 'ExecutorConfig',
                    executors: executors,
                    lpExecutors: lpExecutors,
                    compensator: this.compensator.address,
                },
                contractConfig: {
                    $$type: 'ContractConfig',
                    tlpWallet: TestEnv.orderBookTlpWallet.address,
                    jettonWallet: TestEnv.orderBookJettonWallet.address,
                    pool: TestEnv.pool.address,
                }
            }
        );
        
        expect(setOderBookConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.orderBook.address,
            success: true,
        });
        const orderBookConfigData = await  this.orderBook.getConfigData(null);
        console.log("orderBookConfigData", orderBookConfigData);

        // set config to pool
        const setPoolConfigResult = await TestEnv.pool.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateConfig',
                orderBook: TestEnv.orderBook.address,
                tlpJetton: TestEnv.tlp.address,
                claimExecutor: this.claimExecutor.address,
                lpGasConsumption: toNano(0.018),
                perpGasConsumption: toNano(0.038),
                minTonsForStorage: toNano(0.01),
                gasForMintTlp: toNano(0.05),
                maxLpNetCap: toJettonUnits(10**9),
                lpRolloverFeeRate: BigInt(this.lpRolloverFeeRate * PERCENTAGE_BASIS_POINT),
            }
        );

        expect(setPoolConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            success: true,
        });

        const poolConfigData = await  this.pool.getConfigData();
        console.log("poolConfigData", poolConfigData);

        // set token config to pool
        for (let index = 0; index < this.tokenConfig.length; index++) {
            const { tokenId, name, tradingFeeRate, lpTradingFeeRate } = this.tokenConfig[index];
            const setPoolTokenConfigResult = await TestEnv.pool.send(
                TestEnv.deployer.getSender(),
                {
                    value: toNano('0.1'),
                },
                {
                    $$type: 'UpdateTokenConfig',
                    tokenId: tokenId,
                    config: {
                        $$type: 'TokenConfig',
                        name: name,
                        enable: true,
                        minValue: toJettonUnits(100), // 100U
                        maxValue: toJettonUnits(10_000_000), // 10M U
                        maxLeverage: 105n,
                        liquidationFee: toJettonUnits(0.2), // 0.2U
                        maintenanceRate: BigInt(0.005 * PERCENTAGE_BASIS_POINT), // 0.5%
                        tradingFeeRate: BigInt(tradingFeeRate * PERCENTAGE_BASIS_POINT), // 0.1%
                        lpTradingFeeRate: BigInt(lpTradingFeeRate * PERCENTAGE_BASIS_POINT), // 60%
                    }
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
