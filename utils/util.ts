import { NetworkProvider } from "@ton/blueprint";
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
    return value * Math.pow(10, decimal);
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
