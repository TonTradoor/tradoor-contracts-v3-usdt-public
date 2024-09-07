import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { MOCK_DECIMAL, PERCENTAGE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const config = getConfig();
    const tokens = config["tokens"];
    for (const token of tokens) {
        console.log(`set ${token["name"]} token config begining`);
        const lastTrx = await getLastTransaction(provider, pool.address);
        await pool.send(
            provider.sender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'ListToken',
                tokenId: BigInt(token["tokenId"]),
                config: {
                    $$type: 'TokenConfig',
                    name: token["name"],
                    enable: token["enable"],
                    maxLeverage: BigInt(token["maxLeverage"]),
                    liquidationFee: toUnits(token["liquidationFee"], MOCK_DECIMAL),
                    maintenanceRate: toUnits(token["maintenanceRate"], PERCENTAGE_DECIMAL),
                    tradingFeeRate: toUnits(token["tradingFeeRate"], PERCENTAGE_DECIMAL),
                    lpTradingFeeRate: toUnits(token["lpTradingFeeRate"], PERCENTAGE_DECIMAL)
                }
            }
        );

        const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
        if (transDone) {
            console.log(`set ${token["name"]} token config success`);
        } else {
            console.error(`set ${token["name"]} token config failed`);
        }
    }

}
