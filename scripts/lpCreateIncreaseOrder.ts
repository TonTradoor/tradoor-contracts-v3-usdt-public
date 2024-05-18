import { Address, beginCell, toNano } from '@ton/core';
import { } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook, attachJettonWallet } from '../utils/util';
import { JETTON_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);

    /// create order
    let liquidity = 0.001;
    let executionFee = 0.05;

    // transfer jetton with create increase LP position order payload
    // get user jetton wallet address
    let user0JettonWallet = await attachJettonWallet(provider, provider.sender().address!!);

    // get user jetton balance
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    let orderId = (await orderBook.getLpPositionOrder(0n)).lpPositionOrderIndexNext;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.3),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toUnits(liquidity, JETTON_DECIMAL),
            sender: orderBook.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(1,32) // op
                    .storeUint(toUnits(liquidity, JETTON_DECIMAL), 128) // liquidity
                    .storeCoins(toNano(executionFee)) // execution fee
                    .endCell()
                ).endCell()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`create increase success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachJettonWallet(provider, orderBook.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let orderIdNext = (await orderBook.getLpPositionOrder(0n)).lpPositionOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getLpPositionOrder(orderId);
    console.log(`order:`, order);

}
