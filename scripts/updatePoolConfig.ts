import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    attachMockJetton,
    attachPool,
    attachTLPJetton,
    getConfig,
    getLastTransaction,
    waitForTransaction,
    toUnits
} from '../utils/util';
import { MOCK_DECIMAL, PERCENTAGE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const config = getConfig();
    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdatePoolConfig',
            orderLockTime: BigInt(config["orderLockTime"]),
            maxLpNetCap: toUnits(config["maxLpNetCap"], MOCK_DECIMAL),
            lpRolloverFeeRate: toUnits(config["lpRolloverFeeRate"], PERCENTAGE_DECIMAL),
            liquidatedPositionShareRate: toUnits(config["liquidatedPositionShareRate"], PERCENTAGE_DECIMAL),
            normalPositionShareRate: toUnits(config["normalPositionShareRate"], PERCENTAGE_DECIMAL)
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`set config success`);
    } else {
        console.error(`set config failed`);
    }

}
