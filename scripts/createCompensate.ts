import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { MOCK_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    let refundReceiverAddr = await provider.ui().input('refundReceiver:');
    const refundReceiver = refundReceiverAddr === '' ? null : Address.parse(refundReceiverAddr);

    let executionFeeReceiverAddr = await provider.ui().input('executionFeeReceiver:');
    const executionFeeReceiver = executionFeeReceiverAddr === '' ? null : Address.parse(executionFeeReceiverAddr);

    const orderType = BigInt(await provider.ui().input('orderType(1:LP, 2:PERP):'));
    const orderId = BigInt(await provider.ui().input('orderId:'));
    const refundAmount = Number(await provider.ui().input('refundAmount:'));
    const executionFee = Number(await provider.ui().input('executionFee:'));
    console.log("orderType:", orderType, "orderId:", orderId, "refundAmount:", refundAmount, "executionFee:", executionFee);
    const sure = await provider.ui().input('confirm? (y/n)') === 'y';
    if (!sure) {
        return;
    }

    const pool = attachPool(provider);

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1')
        },
        {
            $$type: 'CreateCompensate',
            orderType: orderType,
            orderId: orderId,
            trxId: 0n,
            refundReceiver: refundReceiver,
            refundAmount: toUnits(refundAmount, MOCK_DECIMAL),
            executionFeeReceiver: executionFeeReceiver,
            executionFee: toNano(executionFee)
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create compensation success`);
    }

    // get compensate order
    let nextId = (await pool.getCompensate(1n));
    let compensateResult = (await pool.getCompensate(nextId.compensateIndexNext - 1n));
    console.log(`compensateResult:`, compensateResult);

}
