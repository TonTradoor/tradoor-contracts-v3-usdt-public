import { NetworkProvider } from '@ton/blueprint';
import {
    attachPool, fromUnits
} from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const tlpPrice = await pool.getTlpPrice();
    console.log(`tlpPrice:`, fromUnits(tlpPrice, 18));

}
