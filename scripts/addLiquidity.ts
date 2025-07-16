import { beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { toUnits, getLastTransaction, waitForTransaction, attachPool, attachMockJettonWallet } from '../utils/util';
import { MOCK_DECIMAL, OP_CREATE_INCREASE_LP_POSITION_ORDER } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    try {
        const pool = attachPool(provider);
        const sender = provider.sender();

        const trxId = BigInt(await provider.ui().input('trxId (default 0):')) || 0n;
        const liquidity = Number(await provider.ui().input('liquidity (default 100000):')) || 100000;
        const executionFee = 0.1;

        const mockJettonWallet = await attachMockJettonWallet(provider, sender.address!!);
        const walletData = await mockJettonWallet.getGetWalletData();
        if (walletData.balance < liquidity) {
            throw new Error('Insufficient jetton balance');
        }
        console.log('User mock-jetton wallet balance:', walletData.balance);

        const lastTrx = await getLastTransaction(provider, pool.address);
        await mockJettonWallet.send(
            sender,
            { value: toNano(executionFee + 0.2) },
            {
                $$type: 'JettonTransfer',
                query_id: trxId,
                amount: toUnits(liquidity, MOCK_DECIMAL),
                destination: pool.address,
                response_destination: sender.address!!,
                custom_payload: null,
                forward_ton_amount: toNano(executionFee + 0.1),
                forward_payload: beginCell()
                    .storeUint(1, 1)
                    .storeRef(
                        beginCell()
                            .storeUint(OP_CREATE_INCREASE_LP_POSITION_ORDER, 8)
                            .storeCoins(toNano(executionFee))
                            .endCell()
                    ).endCell().asSlice()
            }
        );

        const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
        if (transDone) {
            console.log('Create increase liquidity order success');
        } else {
            console.error('Create increase liquidity order failed');
        }
    } catch (err) {
        console.error('Error in addLiquidity:', err);
    }
}
