import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { JETTON_DECIMAL, PERCENTAGE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const config = getConfig();
    const tokens = config["tokens"];
    for (const token of tokens) {
        const lastTrx = await getLastTransaction(provider, pool.address);
        await pool.send(
            provider.sender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateTokenConfig',
                tokenId: BigInt(token["tokenId"]),
                name: token["name"],
                enable: token["enable"],
                minValue: toUnits(token["minValue"], JETTON_DECIMAL),
                maxValue: toUnits(token["maxValue"], JETTON_DECIMAL),
                maxLeverage: BigInt(token["maxLeverage"]),
                liquidationFee: toUnits(token["liquidationFee"], JETTON_DECIMAL),
                maintenanceRate: toUnits(token["maintenanceRate"], PERCENTAGE_DECIMAL),
                liquidityProportion: toUnits(token["liquidityProportion"], PERCENTAGE_DECIMAL),
                tradingFeeRate: toUnits(token["tradingFeeRate"], PERCENTAGE_DECIMAL),
                lpTradingFeeRate: toUnits(token["lpTradingFeeRate"], PERCENTAGE_DECIMAL),
                interestRate: toUnits(token["interestRate"], PERCENTAGE_DECIMAL),
                maxFundingRate: toUnits(token["maxFundingRate"], PERCENTAGE_DECIMAL)
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
