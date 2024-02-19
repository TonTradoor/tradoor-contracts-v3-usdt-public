import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Farm } from '../wrappers/Farm';
import '@ton/test-utils';

describe('Farm', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let farm: SandboxContract<Farm>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        farm = blockchain.openContract(await Farm.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await farm.send(
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
            to: farm.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and farm are ready to use
    });
});
