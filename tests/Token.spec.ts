import {
    SandboxContract,
    TreasuryContract
} from '@ton/sandbox';
import { MockJettonWallet } from '../wrappers/MockJettonWallet';
import { Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import '@ton/test-utils';
import { getJettonBalance, mint, toJettonUnits } from './lib/TokenHelper';
import { delistToken, listToken } from './lib/PoolHelper';

describe('token settings', () => {
    let pool: SandboxContract<Pool>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let poolJettonWallet: SandboxContract<MockJettonWallet>;

    const token = TestEnv.tokenConfigs[0];

    beforeEach(async () => {
        await TestEnv.resetEnv();
        pool = TestEnv.pool;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        poolJettonWallet = TestEnv.poolJettonWallet;

        // mint
        await mint(user0.address, '100000000');
        expect(await getJettonBalance(user0.address)).toEqual(toJettonUnits('100000000'));

        await mint(user1.address, '100000000');
        expect(await getJettonBalance(user1.address)).toEqual(toJettonUnits('100000000'));

        // check config
        let configData = await pool.getConfigData();
        expect(configData.jettonWallet).toEqualAddress(poolJettonWallet.address);
    });

    it('should correctly list perp tokens', async () => {
        const sender = TestEnv.manager;
        const listTokenResult = await listToken(sender.getSender(), token);

        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });
    });

    it('should revert list perp tokens if sender is not a manager', async () => {
        const sender = TestEnv.user0;
        const listTokenResult = await listToken(sender.getSender(), token);

        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should correctly delist perp tokens', async () => {
        const sender = TestEnv.manager;
        const listTokenResult = await listToken(sender.getSender(), token);
        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });

        const delistTokenResult = await delistToken(sender.getSender(), token.tokenId);

        expect(delistTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });
    });

    it('should revert delist perp tokens if sender is not a manager', async () => {
        let sender = TestEnv.manager;
        const listTokenResult = await listToken(sender.getSender(), token);
        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });

        sender = user0;
        const delistTokenResult = await delistToken(sender.getSender(), token.tokenId);

        expect(delistTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

});
