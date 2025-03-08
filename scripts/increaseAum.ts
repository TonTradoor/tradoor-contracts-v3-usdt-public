import { beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { toUnits, getLastTransaction, waitForTransaction, attachPool, attachMockJettonWallet } from '../utils/util';
import { MOCK_DECIMAL, OP_INCREASE_AUM } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    let amount = Number(await provider.ui().input('amount:'));

    let mockJettonWallet = await attachMockJettonWallet(provider, provider.sender().address!!);
    const lastTrx = await getLastTransaction(provider, pool.address);
    await mockJettonWallet.send(
        provider.sender(),
        {
            value: toNano(0.15),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 1n,
            amount: toUnits(amount, MOCK_DECIMAL),
            destination: pool.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(0.1),
            forward_payload:
                beginCell()
                    .storeUint(1, 1)
                    .storeRef(beginCell().storeUint(OP_INCREASE_AUM, 8).endCell())
                    .endCell().asSlice()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`request increase aum success`);
    }

}
