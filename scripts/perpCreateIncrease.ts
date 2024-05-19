import { Address, beginCell, toNano } from '@ton/core';
import { } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction, attachOrderBook, attachJettonWallet } from '../utils/util';
import { JETTON_DECIMAL, OP_CREATE_INCREASE_PERP_POSITION_ORDER, PRICE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);

    /// create order
    let executionFee = 0.1;
    let isMarket = true;
    let tokenId = 1;
    let isLong = true;
    let margin = 0.01;
    let size = 0.005;
    let triggerPrice = 67180;

    // transfer jetton with create increase perp position order payload
    // get user jetton wallet address
    let user0JettonWallet = await attachJettonWallet(provider, provider.sender().address!!);
    // get user jetton balance
    if (!await provider.isContractDeployed(user0JettonWallet.address)) {
        console.log('user jetton wallet:', user0JettonWallet.address);
        return;
    }
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log(`user jetton wallet ${user0JettonWallet.address} balance ${user0JettonData.balance}`);

    let orderId = (await orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.3),
        },
        {
            $$type: 'TokenTransfer',
            query_id: 0n,
            amount: toUnits(margin, JETTON_DECIMAL),
            sender: orderBook.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.2),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(OP_CREATE_INCREASE_PERP_POSITION_ORDER, 32) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .storeInt(isMarket? -1n : 0n, 1)
                    .storeUint(tokenId, 64)
                    .storeInt(isLong? -1n : 0n, 1)
                    .storeUint(toUnits(margin, JETTON_DECIMAL), 128)
                    .storeUint(toUnits(size, JETTON_DECIMAL), 128)
                    .storeUint(toUnits(triggerPrice, PRICE_DECIMAL), 256)
                    .storeRef(
                        beginCell()
                        .storeUint(toUnits(0, JETTON_DECIMAL), 128)
                        .storeUint(0, 256)
                        .storeUint(toUnits(0, JETTON_DECIMAL), 128)
                        .storeUint(0, 256)
                    )
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
    let orderIdNext = (await orderBook.getPerpPositionOrder(0n)).perpPositionOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpPositionOrder(orderId);
    console.log(`order:`, order);

}
