import { NetworkProvider, sleep } from "@ton/blueprint";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import {Decimal} from "decimal.js";
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

export function formatUnits(value: number, decimal: number) {
    return BigInt(value) * BigInt(Math.pow(10, decimal));
}

export function parseUnits(value: string, decimal: number) {
    return new Decimal(value).div(Math.pow(10, decimal));
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

export const waitForTransaction = async (provider:NetworkProvider, address:Address, curTx:string | null, maxRetry:number, interval:number=1000) => {
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