import { beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    toUnits,
    getLastTransaction,
    waitForTransaction,
    attachPool,
    attachTLPJettonWallet
} from '../utils/util';
import { TLP_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    let trxId = BigInt(await provider.ui().input('trxId:'));

    /// create order
    let tlp = 100;
    let executionFee = 0.1;

    // transfer TLP-jetton with create decrease liquidity order payload
    // get user TLP-jetton wallet address
    let user0TlpWallet = await attachTLPJettonWallet(provider, provider.sender().address!!);

    // get user TLP-jetton balance
    let user0TlpData = await user0TlpWallet.getGetWalletData();
    console.log('user TLP-Jetton balance:', user0TlpData.balance);

    const lastTrx = await getLastTransaction(provider, pool.address);
    await user0TlpWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: trxId,
            amount: toUnits(tlp, TLP_DECIMAL),
            destination: pool.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload:
                beginCell()
                    .storeUint(1, 1)
                    .storeRef(
                        beginCell()
                            .storeCoins(toNano(executionFee)) // execution fee
                            .endCell())
                    .endCell().asSlice()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create decrease liquidity order success`);
    }

    // get pool TLP-jetton wallet address
    let poolTlpWallet = await attachTLPJettonWallet(provider, pool.address);
    let poolTlpData = await poolTlpWallet.getGetWalletData();

    console.log('pool TLP-jetton balance:', poolTlpData.balance);

}
