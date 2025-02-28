import { Address, Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { getConfig, setConfig } from '../utils/util';
import { Multisig } from '../wrappers/Multisig';

export async function run(provider: NetworkProvider) {
    let deployId = getConfig("nextDeployId");

    let members = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Uint(8));
    const config = getConfig();
    const memberAddrs = config["members"];
    for (const i in memberAddrs) {
        members.set(Address.parse(memberAddrs[i].address), memberAddrs[i].weight);
    }

    const pool = provider.open(await Multisig.fromInit(members, config["requiredWeight"]));

    console.log('deployId:', deployId, 'deploying multisig to address:', pool.address);

    setConfig('multisig', "");

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 1n,
        }
    );

    await provider.waitForDeploy(pool.address);
    
    setConfig("multisig", pool.address.toString());
}
