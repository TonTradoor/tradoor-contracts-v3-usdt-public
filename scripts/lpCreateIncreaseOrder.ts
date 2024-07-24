import { beginCell, toNano } from '@ton/core';
import { } from '../wrappers/Pool';
import { NetworkProvider } from '@ton/blueprint';
import { toUnits, getLastTransaction, waitForTransaction, attachOrderBook, attachMockJettonWallet } from '../utils/util';
import { MOCK_DECIMAL, OP_CREATE_INCREASE_LP_POSITION_ORDER } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const orderBook = attachOrderBook(provider);

    /// create order
    let liquidity = 100;
    let executionFee = 0.1;

    // transfer jetton with create increase LP position order payload
    // get user jetton wallet address
    let mockJettonWallet = await attachMockJettonWallet(provider, provider.sender().address!!);

    // get user jetton balance
    let mockJettonWalletData = await mockJettonWallet.getGetWalletData();
    console.log('user mock-jetton wallet data:', mockJettonWalletData.balance);

    let orderId = (await orderBook.getLiquidityOrder(0n)).liquidityOrderIndexNext;

    const lastTrx = await getLastTransaction(provider, orderBook.address);
    await mockJettonWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: 7n,
            amount: toUnits(liquidity, MOCK_DECIMAL),
            destination: orderBook.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload: 
                beginCell()
                .storeUint(1, 1)
                .storeRef(
                    beginCell()
                    .storeUint(OP_CREATE_INCREASE_LP_POSITION_ORDER, 8) // op
                    .storeCoins(toUnits(liquidity, MOCK_DECIMAL)) // liquidity
                    .storeCoins(toNano(executionFee)) // execution fee
                    .endCell()
                ).endCell()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, orderBook.address, lastTrx, 20);
    if (transDone) {
        console.log(`create increase liquidity order success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachMockJettonWallet(provider, orderBook.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool MOCK-jetton balance:', poolJettonData.balance);

    // get index
    let orderIdNext = (await orderBook.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await orderBook.getLiquidityOrder(orderId);
    console.log(`order:`, order);

}
