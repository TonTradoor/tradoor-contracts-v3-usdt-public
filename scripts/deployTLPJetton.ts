import { Address, SendMode, beginCell, toNano } from '@ton/core';

import { NetworkProvider } from '@ton/blueprint';
import { TLPJettonMaster as TLPJetton } from '../wrappers/JettonTLP';
import { buildOnchainMetadata } from '../contracts/jetton/utils/jetton-helpers';
import { attachPool, getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");

    const jettonParams = {
        name: 'Tradoor LP' + deployId,
        description: 'Native Tether USD locked in liquidity in Tradoor Trade (tradoor.io)',
        symbol: 'TLP',
        image: 'https://avatars.githubusercontent.com/u/104382459?s=200&v=4',
        decimals: '9'
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    let address =  attachPool(provider).address!!;
    // create jetton contract
    const tlp = provider.open(await TLPJetton.fromInit(address, content));

    console.log('deployId:', deployId, 'deploying jetton to address:', tlp.address);

    // deploy
    await tlp.send(
        provider.sender(),
        {
            value: toNano('0.1')
        },
        {
            $$type: 'Deploy',
            queryId: 0n
        }
    );

    await provider.waitForDeploy(tlp.address);
    setConfig('tlpJetton', tlp.address.toString());

}
