import { Address, beginCell, toNano } from '@ton/core';
import { Pool, attachJettonWallet, attachMockJetton, attachPool } from '../wrappers/Pool';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { toUnits, getConfig, getLastTransaction, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const jetton = attachMockJetton(provider);

    /// create order
    let prevIndex = await pool.getDecreaseLpPositionIndexNext();
    let decreaseMargin = toUnits(5, 6);
    let decreaseLiquidity = toUnits(5n, 6);
    let executionFee = toNano('0.5');

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('1'),
        },
        {
            $$type: 'CreateDecreaseLPPositionOrder',
            executionFee: executionFee,
            marginDelta: decreaseMargin,
            liquidityDelta: decreaseLiquidity
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone) {
        console.log(`create decrease LP success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachJettonWallet(provider, pool.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

    // get index
    let index = await pool.getIncreaseLpPositionIndexNext();
    console.log(`prev index:`, prevIndex);
    console.log(`index:`, index);

    // get order
    let order = await pool.getIncreaseLpPositionOrder(prevIndex);
    console.log(`order:`, order);

}
