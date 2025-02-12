import { Cell } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { loadCreateTpSlPerpOrder, loadExecuteLiquidityOrder } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {

    //example: b5ee9c7201010101000e000018583e40190000000000000008, CancelIncreaseOrderEvent
    const rawBody = await provider.ui().input('Enter raw body:');

    await provider.ui().choose('Choose message type:', [
        'CreateTpSlPerpOrder',
        'ExecuteLiquidityOrder',
    ], a => a).then(async (msg) => {
        const body = Buffer.from(rawBody, 'hex').toString('base64');
        const slice = Cell.fromBase64(body).asSlice();
        if (msg === 'CreateTpSlPerpOrder') {
            const msg = loadCreateTpSlPerpOrder(slice);
            console.log(`msg:`, msg);
        }
        if (msg === 'ExecuteLiquidityOrder') {
            const msg = loadExecuteLiquidityOrder(slice);
            console.log(`msg:`, msg);
        }
    });
    
}
