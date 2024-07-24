import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, Cell, beginCell, contractAddress, toNano } from '@ton/core';
import { MockJettonMaster as MockJetton } from '../wrappers/JettonMock';
import { buildOnchainMetadata } from '../contracts/jetton/utils/jetton-helpers';
import '@ton/test-utils';

describe('Jetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jetton: SandboxContract<MockJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        const jettonParams = {
            name: "Mock USDT",
            description: "This is description of Test Jetton Token in Tact-lang",
            symbol: "mUSDT",
            image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
            decimals: "6"
        };

        let content = buildOnchainMetadata(jettonParams);
        jetton = blockchain.openContract(await MockJetton.fromInit(deployer.address, content));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and farm are ready to use
    });
});
