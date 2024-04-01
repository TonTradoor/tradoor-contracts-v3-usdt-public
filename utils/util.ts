import { NetworkProvider, sleep } from "@ton/blueprint";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import {Decimal} from "decimal.js";
import { Pool } from "../wrappers/Pool";
import { MockJetton } from "../wrappers/MockJetton";
import { JettonDefaultWallet } from "../wrappers/JettonDefaultWallet";
import { OrderBook } from "../wrappers/OrderBook";
let fs = require('fs');

function getPath(network: string) {
    return __dirname + "/../config/" + network + ".json"
}

export function setConfig(provider: NetworkProvider, key: string, val: string) {
    let path = getPath(provider.network());
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "{}");
    }
    let json = JSON.parse(fs.readFileSync(path));
    json[key] = val;
    fs.writeFileSync(path, JSON.stringify(json, null, 2));
}

export function getConfig(provider: NetworkProvider, key: string) {
    let path = getPath(provider.network());
    let json = JSON.parse(fs.readFileSync(path))
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

export const waitForTransaction = async (provider:NetworkProvider, address:Address, curTx:string | null, maxRetry:number, interval:number=5000) => {
    let done  = false;
    let count = 0;
    const ui  = provider.ui();

    do {
        ui.write(`Awaiting transaction completion (${++count}/${maxRetry})`);
        await sleep(interval);
        const lastTrx = await getLastTransaction(provider, address);
        if(lastTrx !== null){
            done = lastTrx !== curTx;
        }
    } while(!done && count < maxRetry);
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
            if (Math.log10(src) <= 6) {
                src = src.toLocaleString('en', { minimumFractionDigits: decimal, useGrouping: false });
            }
            else if (src - Math.trunc(src) === 0) {
                src = src.toLocaleString('en', { maximumFractionDigits: 0, useGrouping: false });
            }
            else {
                throw Error('Not enough precision for a number value. Use string value instead');
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
            throw Error('Invalid number');
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
    const orderBookAddress = Address.parse(getConfig(provider, "orderBook"));
    return provider.open(OrderBook.fromAddress(orderBookAddress));
}

export function attachPool(provider: NetworkProvider) {
    const poolAddress = Address.parse(getConfig(provider, "pool"));
    return provider.open(Pool.fromAddress(poolAddress));
}

export function attachMockJetton(provider: NetworkProvider) {
    const jettonAddress = Address.parse(getConfig(provider, "sampleJetton"));
    return provider.open(MockJetton.fromAddress(jettonAddress));
}

export async function attachJettonWallet(provider: NetworkProvider, userAddress: Address) {
    const jetton = attachMockJetton(provider);
    let walletAddress = await jetton.getGetWalletAddress(userAddress);
    return provider.open(JettonDefaultWallet.fromAddress(walletAddress));
}
