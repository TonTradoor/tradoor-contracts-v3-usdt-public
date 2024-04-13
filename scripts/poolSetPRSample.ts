import { Address, Dictionary, DictionaryValue, OpenedContract, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachMockJetton, attachOrderBook, attachPool, getConfig, getLastTransaction, readPRSample, toUnits, waitForTransaction } from '../utils/util';
import { Pool, PremiumRateSample, PremiumRateSampleRangeParam } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    const orderBook = attachOrderBook(provider);
    const jetton = attachMockJetton(provider);
    const jettonDecimal = getConfig(provider, "jettonDecimal");
    const priceDecimal = getConfig(provider, "priceDecimal");
    const executor = Address.parse(getConfig(provider, "executor"));

    const lastTrx = await getLastTransaction(provider, pool.address);

    // set PR samples to pool
    let samples = await readPRSample();
        
    let subLength = 100;
    let start = 0, end = subLength;
    while (end <= samples.length) {
        // console.log('start:', start, 'end:', end);
        await setPremiumRateSampleRange(provider, pool, samples.slice(start, end));

        start += subLength;
        end += subLength;
        const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
        if (transDone) {
            console.log(`set config success`);
        } else {
            console.error(`set config failed`);
        }
    }

}

async function setPremiumRateSampleRange(
        executor: NetworkProvider, 
        pool: OpenedContract<Pool>,
        sampleRanges: {
            id: number,
            samples: {x: number, y: number}[]
        }[]
    ) {

    let PremiumRateSampleValue: DictionaryValue<PremiumRateSample> = {
        serialize(src, builder) {
            builder.storeInt(src.deviationRate, 257).storeInt(src.premiumRate, 257)
        },
        parse(src) {
            throw '';
        },
    }

    let PremiumRateSampleRangeValue: DictionaryValue<PremiumRateSampleRangeParam> = {
        serialize(src, builder) {
            builder.storeInt(src.sampleId, 257).storeInt(src.sampleLength, 257).storeDict(src.samples)
        },
        parse(src) {
            throw '';
        },
    }

    let sampleRangeValues = Dictionary.empty(Dictionary.Keys.BigInt(32), PremiumRateSampleRangeValue);

    for (let index = 0; index < sampleRanges.length; index++) {
        const sampleRange = sampleRanges[index];

        let sampleValues = Dictionary.empty(Dictionary.Keys.BigInt(32), PremiumRateSampleValue);
        let samples = sampleRange.samples;
        for (let j = 0; j < samples.length; j++) {
            sampleValues.set(BigInt(j), {
                $$type: 'PremiumRateSample',
                deviationRate: toUnits(samples[j].x, 9),
                premiumRate: toUnits(samples[j].y, 9)
            })
        }

        sampleRangeValues.set(
            BigInt(index),
            {
                $$type: 'PremiumRateSampleRangeParam',
                sampleId: BigInt(sampleRange.id),
                sampleLength: BigInt(samples.length),
                samples: sampleValues
            }
        )
    }

    await pool.send(
        executor.sender(),
        {
            value: toNano('1'),
        },
        {
            $$type: 'SetPremiumRateSampleRange',
            sampleRangeLength: BigInt(sampleRanges.length),
            sampleRanges: sampleRangeValues
        }
    );
}

