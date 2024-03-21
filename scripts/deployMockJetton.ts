import { Address, SendMode, beginCell, toNano } from '@ton/core';

import { NetworkProvider } from '@ton/blueprint';
import { MockJetton } from '../wrappers/MockJetton';
import { buildOnchainMetadata } from '../contracts/mock/utils/jetton-helpers';
import { setConfig } from '../utils/util';

export async function run(provider: NetworkProvider) {
    
    const jettonParams = {
        name: "Mock USDT",
        description: "Mock USDT Token in Tact-lang",
        symbol: "mUSDT",
        image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
        decimals: "6"
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    let address = provider.sender().address!!;
    // create jetton contract
    const sampleJetton = provider.open(await MockJetton.fromInit(address, content));

    // deploy
    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n
        }
    );

    await provider.waitForDeploy(sampleJetton.address);
    setConfig(provider, "sampleJetton", sampleJetton.address.toString());

}
