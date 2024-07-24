import { Address, beginCell, toNano } from '@ton/core';
import { } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { now, getConfig, getLastTransaction, waitForTransaction, attachOrderBook, attachMockJettonWallet } from '../utils/util';
import { MOCK_DECIMAL, OP_CREATE_INCREASE_PERP_POSITION_ORDER, PRICE_DECIMAL } from '../utils/constants';
import { toJettonUnits, toPriceUnits } from '../tests/lib/TokenHelper';

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
    let user0JettonWallet = await attachMockJettonWallet(provider, provider.sender().address!!);
    // get user jetton balance
    if (!await provider.isContractDeployed(user0JettonWallet.address)) {
        console.log('user jetton wallet:', user0JettonWallet.address);
        return;
    }
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log(`user jetton wallet ${user0JettonWallet.address} balance ${user0JettonData.balance}`);

    let orderId = (await orderBook.getPerpOrder(0n)).perpOrderIndexNext;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 0n,
            amount: toJettonUnits(margin),
            destination: orderBook.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(OP_CREATE_INCREASE_PERP_POSITION_ORDER, 8) // op
                    .storeCoins(toNano(executionFee)) // execution fee
                    .storeInt(isMarket? -1n : 0n, 1)
                    .storeUint(tokenId, 16)
                    .storeInt(isLong? -1n : 0n, 1)
                    .storeCoins(toJettonUnits(margin))
                    .storeCoins(toJettonUnits(size))
                    .storeUint(toPriceUnits(triggerPrice), 128)
                    .storeUint(now(), 32)
                    .storeRef(
                        beginCell()
                        .storeCoins(toJettonUnits(0))
                        .storeUint(0, 128)
                        .storeCoins(toJettonUnits(0))
                        .storeUint(0, 128)
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
    let poolJettonWallet = await attachMockJettonWallet(provider, orderBook.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let orderIdNext = (await orderBook.getPerpOrder(0n)).perpOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getPerpOrder(orderId);
    console.log(`order:`, order);

}
