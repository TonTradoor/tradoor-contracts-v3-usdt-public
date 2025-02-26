import { Blockchain, printTransactionFees, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Pool } from '../../wrappers/Pool';
import { MockJettonMaster as MockJetton } from '../../wrappers/JettonMock';
import { TLPJettonMaster as TLPJetton } from '../../wrappers/JettonTLP';
import { Address, Dictionary, toNano } from '@ton/core';
import { buildOnchainMetadata } from '../../contracts/jetton/utils/jetton-helpers';
import { MockJettonWallet } from '../../wrappers/MockJettonWallet';
import { TLPJettonWallet } from '../../wrappers/TLPJettonWallet';
import { toJettonUnits } from './TokenHelper';
import { PERCENTAGE_BASIS_POINT } from '../../utils/constants';
import { Multisig, Request } from '../../wrappers/Multisig';
import { MultisigSigner } from '../../build/Multisig/tact_MultisigSigner';

export class TestEnv {

    static blockchain: Blockchain;
    static deployer: SandboxContract<TreasuryContract>;
    static manager: SandboxContract<TreasuryContract>;
    static executor: SandboxContract<TreasuryContract>;
    static executor1: SandboxContract<TreasuryContract>;
    static compensator: SandboxContract<TreasuryContract>;
    static claimExecutor: SandboxContract<TreasuryContract>;
    static user0: SandboxContract<TreasuryContract>;
    static user1: SandboxContract<TreasuryContract>;
    static user2: SandboxContract<TreasuryContract>;
    static user3: SandboxContract<TreasuryContract>;
    static pool: SandboxContract<Pool>;
    static multisig: SandboxContract<Multisig>;
    static jetton: SandboxContract<MockJetton>;
    static user0JettonWallet: SandboxContract<MockJettonWallet>;
    static poolJettonWallet: SandboxContract<MockJettonWallet>;
    static tlp: SandboxContract<TLPJetton>;
    static user0TlpWallet: SandboxContract<TLPJettonWallet>;
    static poolTlpWallet: SandboxContract<TLPJettonWallet>;
    static user1JettonWallet: SandboxContract<MockJettonWallet>;
    static user1TlpWallet: SandboxContract<TLPJettonWallet>;

    static members: Dictionary<Address, number> = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
    static requiredWeight: bigint = 1n;

    // config
    static tlpDecimal: number = 9;
    static jettonDecimal: number = 6;
    static priceDecimal: number = 18;

    static lpRolloverFeeRate: number = 0.7;
    static liquidatedPositionShareRate: number = 0.5;
    static normalPositionShareRate: number = 0.5;
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
        TestEnv.pool = TestEnv.blockchain.openContract(await Pool.fromInit(0n));

        TestEnv.deployer = await TestEnv.blockchain.treasury('deployer');
        TestEnv.manager = await TestEnv.blockchain.treasury('manager');
        TestEnv.executor = await TestEnv.blockchain.treasury('executor');
        TestEnv.executor1 = await TestEnv.blockchain.treasury('executor1');
        TestEnv.compensator = await TestEnv.blockchain.treasury('compensator');
        TestEnv.claimExecutor = await TestEnv.blockchain.treasury('claimExecutor');

        this.members.set(TestEnv.deployer.address, 1);
        TestEnv.multisig = TestEnv.blockchain.openContract(await Multisig.fromInit(this.members, this.requiredWeight));

        TestEnv.user0 = await TestEnv.blockchain.treasury('user0');
        TestEnv.user1 = await TestEnv.blockchain.treasury('user1');
        TestEnv.user2 = await TestEnv.blockchain.treasury('user2');
        TestEnv.user3 = await TestEnv.blockchain.treasury('user3');

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
        TestEnv.poolJettonWallet = TestEnv.blockchain.openContract(await MockJettonWallet.fromInit(TestEnv.pool.address, TestEnv.jetton.address));

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
        TestEnv.poolTlpWallet = TestEnv.blockchain.openContract(await TLPJettonWallet.fromInit(TestEnv.pool.address, TestEnv.tlp.address));

        let executors = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
            .set(this.executor.address, true)
            .set(this.executor1.address, true);

        // set config to pool
        const setBaseConfigResult = await TestEnv.pool.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateBaseConfig',
                gasConfig: {
                    $$type: 'GasConfig',
                    mintJettonGas: toNano(0.04),
                    burnJettonGas: toNano(0.03),
                    transferJettonGas: toNano(0.04),
                    createPerpOrderGas: toNano(0.03),
                    cancelPerpOrderGas: toNano(0.03),
                    executePerpOrderGas: toNano(0.05),
                    createLiquidityOrderGas: toNano(0.03),
                    cancelLiquidityOrderGas: toNano(0.03),
                    executeLiquidityOrderGas: toNano(0.05),
                    minStorageReserve: toNano(0.01),
                    lpMinExecutionFee: toNano(0.05),
                    perpMinExecutionFee: toNano(0.05),
                },
                executorConfig: {
                    $$type: 'ExecutorConfig',
                    executors: executors
                },
                contractConfig: {
                    $$type: 'ContractConfig',
                    multisig: TestEnv.multisig.address,
                    tlpJetton: TestEnv.tlp.address,
                    tlpWallet: TestEnv.poolTlpWallet.address,
                    jettonWallet: TestEnv.poolJettonWallet.address,
                }
            }
        );

        expect(setBaseConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            success: true,
        });

        var multsigRequest: Request = {
            $$type: 'Request',
            to: TestEnv.pool.address,
            timeout: BigInt(Math.floor(Date.now() / 1000) + 60 * 60),
            manager: TestEnv.deployer.address,
            compensator: this.compensator.address,
            claimer: this.claimExecutor.address
        };
        
        const requestSetManagerResult = await TestEnv.multisig.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            multsigRequest
        );

        expect(requestSetManagerResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.multisig.address,
            success: true,
        });


        var multisigSigner = TestEnv.blockchain.openContract(await MultisigSigner.fromInit(TestEnv.multisig.address, this.members, this.requiredWeight, multsigRequest));
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

        const setPoolConfigResult = await TestEnv.pool.send(
            TestEnv.deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdatePoolConfig',
                orderLockTime: 3n * 60n,
                maxLpNetCap: toJettonUnits(100000n),
                lpRolloverFeeRate: BigInt(this.lpRolloverFeeRate * PERCENTAGE_BASIS_POINT),
                liquidatedPositionShareRate: BigInt(this.liquidatedPositionShareRate * PERCENTAGE_BASIS_POINT),
                normalPositionShareRate: BigInt(this.normalPositionShareRate * PERCENTAGE_BASIS_POINT),
            }
        );

        expect(setPoolConfigResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: TestEnv.pool.address,
            success: true,
        });


        // set token config to pool
        for (let index = 0; index < this.tokenConfig.length; index++) {
            const { tokenId, name, tradingFeeRate, lpTradingFeeRate } = this.tokenConfig[index];
            const setPoolTokenConfigResult = await TestEnv.pool.send(
                TestEnv.deployer.getSender(),
                {
                    value: toNano('0.1'),
                },
                {
                    $$type: 'ListToken',
                    tokenId: tokenId,
                    config: {
                        $$type: 'TokenConfig',
                        name: name,
                        enable: true,
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
