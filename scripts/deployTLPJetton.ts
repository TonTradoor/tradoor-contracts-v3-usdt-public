import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { TLPJettonMaster as TLPJetton } from '../wrappers/JettonTLP';
import { buildOnchainMetadata } from '../contracts/jetton/utils/jetton-helpers';
import { attachPool, getConfig, setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");

    const jettonParams = {
        name: 'Tradoor NOT TLP',
        description: 'NOT locked in liquidity in Tradoor (tradoor.io)',
        symbol: 'NOT-TLP',
        image: 'https://static.tradoor.io/20250224-101027.jpeg',
        decimals: '9',
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    let address = attachPool(provider).address!!;
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
