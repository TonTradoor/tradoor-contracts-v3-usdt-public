import { NetworkProvider, sleep } from "@ton/blueprint";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import { Pool } from "../wrappers/Pool";
import { MockJetton } from "../wrappers/MockJetton";
import { JettonDefaultWallet } from "../wrappers/JettonDefaultWallet";
import { OrderBook } from "../wrappers/OrderBook";
let fs = require('fs');
let readline = require('readline');

function getPath(network: string) {
    return getConfigPath(network + ".json")
}

function getConfigPath(fileName: string) {
    return __dirname + "/../config/" + fileName
}

export function setConfig(key: string, val: string) {
    let path = getPath(process.env.NODE_ENV!!);
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "{}");
    }
    let json = JSON.parse(fs.readFileSync(path));
    json[key] = val;
    fs.writeFileSync(path, JSON.stringify(json, null, 2));
}

export function getConfig(key?: string) {
    let path = getPath(process.env.NODE_ENV!!);
    let json = JSON.parse(fs.readFileSync(path));
    if (key == undefined) {
        return json;
    }
    return json[key];
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min))  + min;
}

export function getCurrentTimestamp(): number {
    return Math.ceil(new Date().getTime() / 1000);
}

export const getLastTransaction = async (provider:NetworkProvider, address:Address) => {
    const client = await provider.api();
    if (client instanceof TonClient) {
        const curState = await client.getContractState(address);
        if(curState.lastTransaction === null)
            return null;
        return curState.lastTransaction.lt;
    } else {
        const res = await client.getAccountLite((await client.getLastBlock()).last.seqno, address);
        if(res.account.last == null)
            return null;
        return res.account.last.lt;
    }
}

export const waitForTransaction = async (provider:NetworkProvider, address:Address, curTx:string | null, maxRetry:number, interval:number=3000) => {
    let done  = false;
    let count = 0;
    const ui  = provider.ui();
    let startTime = Date.now();
    do {
        ui.write(`Awaiting transaction completion (${++count}/${maxRetry})`);
        await sleep(interval);
        const lastTrx = await getLastTransaction(provider, address);
        if(lastTrx !== null){
            done = lastTrx !== curTx;
        }
    } while(!done && count < maxRetry);
    let endTime = Date.now();
    console.log(`trx period: ${(endTime - startTime) / 1000}s`);
    return done;
}

export function toUnits(src: number | string | bigint, decimal: number) {
    let factor = BigInt(Math.pow(10, decimal));

    if (typeof src === 'bigint') {
        return src * factor;
    }
    else {
        if (typeof src === 'number') {
            if (!Number.isFinite(src)) {
                throw Error('Invalid number');
            }
            if (src - Math.trunc(src) === 0) {
                src = src.toLocaleString('en', { maximumFractionDigits: 0, useGrouping: false });
            } else {
                src = src.toLocaleString('en', { minimumFractionDigits: decimal, useGrouping: false });
            }
        }
        // Check sign
        let neg = false;
        while (src.startsWith('-')) {
            neg = !neg;
            src = src.slice(1);
        }
        // Split string
        if (src === '.') {
            throw Error('Invalid number');
        }
        let parts = src.split('.');
        if (parts.length > 2) {
            throw Error('Invalid number');
        }
        // Prepare parts
        let whole = parts[0];
        let frac = parts[1];
        if (!whole) {
            whole = '0';
        }
        if (!frac) {
            frac = '0';
        }
        if (frac.length > decimal) {
            frac = frac.substring(0, decimal);
        }
        while (frac.length < decimal) {
            frac += '0';
        }
        // Convert
        let r = BigInt(whole) * factor + BigInt(frac);
        if (neg) {
            r = -r;
        }
        return r;
    }
}

export function fromUnits(src: number | string | bigint, decimal: number) {
    let factor = BigInt(Math.pow(10, decimal));

    let v = BigInt(src);
    let neg = false;
    if (v < 0) {
        neg = true;
        v = -v;
    }
    // Convert fraction
    let frac = v % factor;
    let facStr = frac.toString();
    while (facStr.length < decimal) {
        facStr = '0' + facStr;
    }
    let pattern = /^([0-9]*[1-9]|0)(0*)/;
    let match = facStr.match(pattern);
    facStr = match!![1];
    // Convert whole
    let whole = v / factor;
    let wholeStr = whole.toString();
    // Value
    let value = `${wholeStr}${facStr === '0' ? '' : `.${facStr}`}`;
    if (neg) {
        value = '-' + value;
    }
    return value;
}

export function attachOrderBook(provider: NetworkProvider) {
    const orderBookAddress = Address.parse(getConfig("orderBook"));
    return provider.open(OrderBook.fromAddress(orderBookAddress));
}

export function attachPool(provider: NetworkProvider) {
    const poolAddress = Address.parse(getConfig("pool"));
    return provider.open(Pool.fromAddress(poolAddress));
}

export function attachMockJetton(provider: NetworkProvider) {
    const jettonAddress = Address.parse(getConfig("sampleJetton"));
    return provider.open(MockJetton.fromAddress(jettonAddress));
}

export async function attachJettonWallet(provider: NetworkProvider, userAddress: Address) {
    const jetton = attachMockJetton(provider);
    let walletAddress = await jetton.getGetWalletAddress(userAddress);
    return provider.open(JettonDefaultWallet.fromAddress(walletAddress));
}

// sampleRanges: {
//     id: number,
//     samples: {x: string, y: string}[]
// }[]
export async function readPRSample() {
    let samples: {x: number; y: number; }[] = [];
    const allFileContents = fs.readFileSync(getConfigPath('pr_sample.csv'), 'utf-8');
    allFileContents.split(/\r?\n/).forEach((line: string) =>  {
        let split = line.split(' ');
        samples.push({
            x: Number(split[0]),
            y: Number(split[1])
        });
    });

    let sampleRange: {id: number, samples: {x: number, y: number}[]};
    let sampleRanges: {id: number, samples: {x: number, y: number}[]}[] = [];
    let rangeId = 0;
    let rangeSamples: {x: number, y: number}[] = [];
    let lastSample: {x: number, y: number} = samples[0];
    for(let i = 0; i < samples.length; i++) {
        let sample = samples[i];
        let prefix = Math.trunc(sample.x * 100);

        if (prefix < 200 || rangeId < 200) {
            if (prefix == rangeId) {
                rangeSamples.push(sample);
                lastSample = sample;
            } else {
                // rangeSamples.push(sample);
                sampleRange = {
                    id: rangeId,
                    samples: rangeSamples
                };
                // console.log(sampleRange);
                sampleRanges.push(sampleRange);
                
                // next range
                rangeSamples = [];
                rangeSamples.push(lastSample);
                rangeSamples.push(sample);
                lastSample = sample;

                rangeId++;
            }
        } else if (prefix >= 200) {
            prefix = Math.trunc(prefix / 10) * 10;
            if (prefix == rangeId) {
                rangeSamples.push(sample);
                lastSample = sample;
            } else {
                // rangeSamples.push(sample);
                sampleRange = {
                    id: rangeId,
                    samples: rangeSamples
                };
                // console.log(sampleRange);
                rangeSamples.push(lastSample);
                sampleRanges.push(sampleRange);
                
                // next range
                rangeSamples = [];
                rangeSamples.push(lastSample);
                rangeSamples.push(sample);
                lastSample = sample;

                rangeId += 10;
            }
            if (rangeId > 300) {
                rangeId = 300;
            }
        } else {
            rangeSamples.push(sample);
        }
    }

    return sampleRanges;
}
