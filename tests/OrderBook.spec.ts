import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { OrderBook } from '../wrappers/OrderBook';
import '@ton/test-utils';

describe('OrderBook', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let orderBook: SandboxContract<OrderBook>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        orderBook = blockchain.openContract(await OrderBook.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await orderBook.send(
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
            to: orderBook.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and orderBook are ready to use
    });
});
