import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachOrderBook, attachPool, attachTLPJetton, getConfig, getLastTransaction, toUnits, waitForTransaction } from '../utils/util';
import { PERCENTAGE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const tlpJetton = attachTLPJetton(provider);

    const config = getConfig();

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateConfig',
            orderBook: orderBook.address,
            tlpJetton: tlpJetton.address,
            claimExecutor: Address.parse(config["claimExecutor"]),
            lpGasConsumption: toNano(config["poolLpGasConsumption"]),
            perpGasConsumption: toNano(config["poolPerpGasConsumption"]),
            minTonsForStorage: toNano(config["minTonsForStorage"]),
            gasForMintTlp: toNano(config["gasForMintTlp"]),
            maxLpNetCap: toUnits(config["maxLpNetCap"], PERCENTAGE_DECIMAL),
            lpRolloverFeeRate: toUnits(config["lpRolloverFeeRate"], PERCENTAGE_DECIMAL)
        }
    );

    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`set config success`);
    } else {
        console.error(`set config failed`);
    }

}
