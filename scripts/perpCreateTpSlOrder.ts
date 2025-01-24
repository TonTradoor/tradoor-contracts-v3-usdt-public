import { beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { now, getLastTransaction, waitForTransaction, attachPool, attachMockJettonWallet, toUnits } from '../utils/util';
import { MOCK_DECIMAL, OP_CREATE_INCREASE_PERP_POSITION_ORDER, PRICE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    /// create order
    let executionFee = 0.1;
    let isMarket = true;
    let tokenId = 1;
    let isLong = true;
    let margin = 100;
    let size = 0.01;
    let triggerPrice = 60000;
    let tpPrice = 61000;
    let slPrice = 59000;

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

    let orderId = (await pool.getPerpOrder(0n)).perpOrderIndexNext;

    let trxId = BigInt(await provider.ui().input('trxId:'));
    executionFee *= 3;

    const lastTrx = await getLastTransaction(provider, pool.address);
    await user0JettonWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: trxId,
            amount: toUnits(margin, MOCK_DECIMAL),
            destination: pool.address,
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
                    .storeCoins(toUnits(size, MOCK_DECIMAL))
                    .storeUint(toUnits(triggerPrice, PRICE_DECIMAL), 128)
                    .storeUint(now(), 32)
                    .storeRef(
                        beginCell()
                        .storeCoins(toUnits(size, MOCK_DECIMAL))
                        .storeUint(toUnits(tpPrice, PRICE_DECIMAL), 128)
                        .storeCoins(toUnits(size, MOCK_DECIMAL))
                        .storeUint(toUnits(slPrice, PRICE_DECIMAL), 128)
                    ).endCell()
                ).endCell().asSlice()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create increase success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachMockJettonWallet(provider, pool.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let orderIdNext = (await pool.getPerpOrder(0n)).perpOrderIndexNext;
    console.log(`orderId:`, orderId);
    console.log(`orderIdNext:`, orderIdNext);

    // get order
    let order = await pool.getPerpOrder(orderId);
    console.log(`order:`, order);

}
