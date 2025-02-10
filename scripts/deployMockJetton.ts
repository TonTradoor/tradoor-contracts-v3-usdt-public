import { Address, SendMode, beginCell, toNano } from '@ton/core';

import { NetworkProvider } from '@ton/blueprint';
import { MockJettonMaster as MockJetton } from '../wrappers/JettonMock';
import { buildOnchainMetadata } from '../contracts/jetton/utils/jetton-helpers';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");

    const jettonParams = {
        name: 'Mock NOT ' + deployId,
        description: 'Mock NOT Jetton',
        symbol: 'mNOT',
        image: 'https://cache.tonapi.io/imgproxy/4KCMNm34jZLXt0rqeFm4rH-BK4FoK76EVX9r0cCIGDg/rs:fill:200:200:1/g:no/aHR0cHM6Ly9jZG4uam9pbmNvbW11bml0eS54eXovY2xpY2tlci9ub3RfbG9nby5wbmc.webp',
        decimals: '9'
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    let address = provider.sender().address!!;
    // create jetton contract
    const mock = provider.open(await MockJetton.fromInit(address, content));

    console.log('deployId:', deployId, 'deploying jetton to address:', mock.address);

    // deploy
    await mock.send(
        provider.sender(),
        {
            value: toNano('0.1')
        },
        {
            $$type: 'Deploy',
            queryId: 0n
        }
    );

    await provider.waitForDeploy(mock.address);
    setConfig('mockJetton', mock.address.toString());

}
