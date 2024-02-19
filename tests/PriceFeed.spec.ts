import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { PriceFeed } from '../wrappers/PriceFeed';
import '@ton/test-utils';

describe('PriceFeed', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let priceFeed: SandboxContract<PriceFeed>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        priceFeed = blockchain.openContract(await PriceFeed.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await priceFeed.send(
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
            to: priceFeed.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and priceFeed are ready to use
    });
});
