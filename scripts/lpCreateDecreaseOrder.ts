import { beginCell, toNano } from '@ton/core';
import { } from '../wrappers/Pool';
import { NetworkProvider } from '@ton/blueprint';
import {
    toUnits,
    getLastTransaction,
    waitForTransaction,
    attachOrderBook,
    attachTLPJettonWallet
} from '../utils/util';
import { TLP_DECIMAL } from '../utils/constants';
import { toTlpUnits } from '../tests/lib/TokenHelper';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);

    /// create order
    let tlp = 1;
    let executionFee = 0.1;

    // transfer TLP-jetton with create decrease liquidity order payload
    // get user TLP-jetton wallet address
    let user0TlpWallet = await attachTLPJettonWallet(provider, provider.sender().address!!);

    // get user TLP-jetton balance
    let user0TlpData = await user0TlpWallet.getGetWalletData();
    console.log('user TLP-Jetton balance:', user0TlpData.balance);

    let orderId = (await orderBook.getLiquidityOrder(0n)).liquidityOrderIndexNext;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await user0TlpWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 0n,
            amount: toUnits(tlp, TLP_DECIMAL),
            destination: orderBook.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload:
                beginCell()
                    .storeUint(1, 1)
                    .storeRef(
                        beginCell()
                            .storeCoins(toTlpUnits(tlp))
                            .storeCoins(toNano(executionFee)) // execution fee
                            .endCell()
                    ).endCell()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`create decrease liquidity order success`);
    }

    // get pool TLP-jetton wallet address
    let poolTlpWallet = await attachTLPJettonWallet(provider, orderBook.address);
    let poolTlpData = await poolTlpWallet.getGetWalletData();

    console.log('pool TLP-jetton balance:', poolTlpData.balance);

    // get index
    let orderIdNext = (await orderBook.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getLiquidityOrder(orderId);
    console.log(`order:`, order);

}
