import { toNano } from '@ton/core';
import { OrderBook } from '../wrappers/OrderBook';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig(provider, "deployId");
    setConfig(provider, "deployId", deployId + 1);
}
