import { Address, SendMode, beginCell, toNano } from '@ton/core';

import { NetworkProvider } from '@ton/blueprint';
import { MockJettonMaster as MockJetton } from '../wrappers/JettonMock';
import { buildOnchainMetadata } from '../contracts/jetton/utils/jetton-helpers';
import { getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");

    const jettonParams = {
        name: 'Mock USDT ' + deployId,
        description: 'Mock USDT Jetton',
        symbol: 'mUSDT',
        image: 'https://ton.app/media/jetton-1bf95814-787a-4e2d-86ea-e0dae3a9484c.jpg?w=640&q=50',
        decimals: '6'
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
