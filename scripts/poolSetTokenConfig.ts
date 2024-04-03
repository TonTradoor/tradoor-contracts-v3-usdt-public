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

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateTokenConfig',
            tokenId: 1n,
            name: "BTC",
            enable: true,
            minMargin: toUnits(10, jettonDecimal), // 10U
            maxLeverage: 100n,
            liquidationFee: toUnits(0.2, jettonDecimal), // 0.2U
            tradingFeeRate: BigInt(0.001 * PERCENTAGE_BASIS_POINT), // 0.1%
            lpTradingFeeRate: BigInt(0.6 * PERCENTAGE_BASIS_POINT), // 60%
            interestRate: 0n,
            maxFundingRate: 0n
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone) {
        console.log(`set token config success`);
    } else {
        console.error(`set token config failed`);
    }

}
