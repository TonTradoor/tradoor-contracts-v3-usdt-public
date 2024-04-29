import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { PERCENTAGE_BASIS_POINT } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");

    const lastTrx = await getLastTransaction(provider, pool.address);

    const tokens = ['BTC', 'ETH'];

    for (let index = 0; index < tokens.length; index++) {
        const name = tokens[index];
        await pool.send(
            provider.sender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'UpdateTokenConfig',
                tokenId: BigInt(index + 1),
                name: name,
                enable: true,
                minValue: toUnits(100, jettonDecimal), // 100U
                maxLeverage: 105n,
                liquidationFee: toUnits(0.2, jettonDecimal), // 0.2U
                liquidityProportion: BigInt(PERCENTAGE_BASIS_POINT / tokens.length), // 100% / n
                tradingFeeRate: BigInt(0.001 * PERCENTAGE_BASIS_POINT), // 0.1%
                lpTradingFeeRate: BigInt(0.6 * PERCENTAGE_BASIS_POINT), // 60%
                interestRate: 0n,
                maxFundingRate: BigInt(62500) // 1%
            }
        );

        const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
        if (transDone) {
            console.log(`set ${name} token config success`);
        } else {
            console.error(`set ${name} token config failed`);
        }
    }

}
