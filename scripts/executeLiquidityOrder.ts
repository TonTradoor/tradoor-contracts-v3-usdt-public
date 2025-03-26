import { Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getLastTransaction, waitForTransaction } from '../utils/util';
import { toJettonUnits, toPriceUnits } from '../tests/lib/TokenHelper';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    let orderIdNext = (await pool.getLiquidityOrder(0n)).liquidityOrderIndexNext;
    let orderId = orderIdNext - 1n;
    console.log(`orderIdNext:`, orderIdNext);
    console.log(`orderId:`, orderId);

    if (orderId < 0) {
        console.log('order not exist');
        return;
    }

    // get last order
    let order = (await pool.getLiquidityOrder(orderId)).liquidityOrder;
    console.log(`order:`, order);

    let prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128))
    prices.set(1, toPriceUnits(60000));
    prices.set(2, toPriceUnits(3000));
    prices.set(3, toPriceUnits(7));
    prices.set(4, toPriceUnits(0.001));

    // execute order
    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteLiquidityOrder',
            orderId: orderId,
            trxId: 2n,
            executionFeeReceiver: provider.sender().address!!,
            prices: prices,
            lpFundingFeeGrowth: toJettonUnits(10),
            rolloverFeeGrowth: toJettonUnits(10),
        }
    );
    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`execute liquidity order success`);
    }

}
