import { toNano } from '@ton/core';
import { OrderBook } from '../wrappers/OrderBook';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig(provider, "nextDeployId");
    setConfig(provider, "nextDeployId", deployId + 1);
    console.log('cur deployId:', deployId, 'next deployId:', deployId + 1)
}
