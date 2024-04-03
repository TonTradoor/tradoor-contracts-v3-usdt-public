import { Address, beginCell, toNano } from '@ton/core';
import { } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook, attachJettonWallet } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");

    /// create order
    let executionFee = 0.1;
    let isMarket = true;
    let tokenId = 1;
    let isLong = true;
    let margin = 100;
    let size = 0.02;
    let triggerPrice = 51000;

    // transfer jetton with create increase perp position order payload
    // get user jetton wallet address
    let user0JettonWallet = await attachJettonWallet(provider, provider.sender().address!!);

    // get user jetton balance
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log('user jetton balance:', user0JettonData.balance);

    let orderId = await orderBook.getPerpPositionOrderIndexNext();

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.3),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toUnits(margin, jettonDecimal),
            destination: orderBook.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeRef(
                    beginCell()
                    .storeUint(2,32) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .storeInt(isMarket? -1n : 0n, 1)
                    .storeUint(tokenId, 64)
                    .storeInt(isLong? -1n : 0n, 1)
                    .storeUint(toUnits(margin, jettonDecimal), 128)
                    .storeUint(toUnits(size, jettonDecimal), 128)
                    .storeUint(toUnits(triggerPrice, priceDecimal), 256)
                    .storeRef(
                        beginCell()
                        .storeUint(toUnits(0, jettonDecimal), 128)
                        .storeUint(0, 256)
                        .storeUint(toUnits(0, jettonDecimal), 128)
                        .storeUint(0, 256)
                    )
                    .endCell()
                ).endCell()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 10);
    if (transDone) {
        console.log(`create increase success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachJettonWallet(provider, orderBook.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let orderIdNext = await orderBook.getPerpPositionOrderIndexNext();
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpPositionOrder(orderId);
    console.log(`order:`, order);

}
