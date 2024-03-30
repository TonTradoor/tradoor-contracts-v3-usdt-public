import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");

    const lastTrx = await getLastTransaction(provider, pool.address);

    // const executor = Address.parse(await provider.ui().input('executor address:'));
    const executor = Address.parse(getConfig(provider, "executor"));

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            gasConsumption: toNano(0.05),
            minTonsForStorage: toNano(0.03),
            rbfLockTime: 5n * 60n,
            bonusFactor: 1n,
            minLPMargin: toUnits(10, jettonDecimal),
            maxLPLeverage: 100n,
            lpLiquidationFee: toUnits(0.2, jettonDecimal),
            lpMaxRiskRate: 10n**6n,
            orderBook: orderBook.address
        }
    );

    const transDone1 = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone1) {
        console.log(`set config success`);
    }

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
            tradingFeeRate: BigInt(0.001 * 1000000), // 0.1%
            lpTradingFeeRate: 300_000n, // 30%
            protocalTradingFeeRate: 300_000n, // 30%
            interestRate: 0n,
            maxFundingRate: 0n
        }
    );

    const transDone2 = await waitForTransaction(provider, pool.address, lastTrx, 10);
    if (transDone2) {
        console.log(`set token config success`);
    }

}
