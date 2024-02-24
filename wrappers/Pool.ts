import { Address } from '@ton/core';
import { getConfig } from '../utils/util';
import { NetworkProvider } from '@ton/blueprint';
import { Pool } from '../build/Pool/tact_Pool';

export * from '../build/Pool/tact_Pool';

export function attachPool(provider: NetworkProvider) {
    const poolAddress = Address.parse(getConfig(provider, "pool"));
    return provider.open(Pool.fromAddress(poolAddress));
}