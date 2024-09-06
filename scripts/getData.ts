import { NetworkProvider, sleep } from '@ton/blueprint';
import { attachPool, attachTLPJetton } from '../utils/util';
import { Address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    let accountAddr = await provider.ui().input('account address:');
    const account = accountAddr === '' ? null : Address.parse(accountAddr);
    const tokenId = BigInt(await provider.ui().input('tokenId:'));
    const orderId = BigInt(await provider.ui().input('orderId:'));

    const pool = attachPool(provider);
    const tlp = attachTLPJetton(provider);

    console.log('=================== Config ===================');
    let tokenConfig = await pool.getTokenConfig(tokenId);
    console.log('token config:', tokenConfig);
    console.log('pool config:', await pool.getConfigData());

    console.log('=================== Liquidity ===================');
    // get liquidity order
    let liquidityOrder = await pool.getLiquidityOrder(orderId);
    console.log(`liquidity order:`, liquidityOrder);

    // get pool stat
    let poolStat = await pool.getPoolStat();
    console.log(`poolStat:`, poolStat);

    console.log('=================== Perp ===================');
    // get perp order
    let order = await pool.getPerpOrder(orderId);
    console.log(`perp order:`, order);

    // get perp position
    let position = await pool.getPerpPosition(tokenId, account);
    console.log(`position:`, position);

    console.log('=================== TLP ===================');
    const tlpData = await tlp.getGetJettonData();
    console.log(`tlpData{ mintable: ${tlpData.mintable}, total_supply: ${tlpData.total_supply}, admin_address: ${tlpData.admin_address}`);
}
