import { Config } from '@ton/blueprint';

console.log('use env', process.env.NODE_ENV);

let config: Config;
if (process.env.NODE_ENV === 'mainnet') {
    config = {
        network: {
            endpoint: 'https://mainnet-v4.tonhubapi.com',
            type: 'mainnet',
            version: 'v4',
        },
        // network: {
        //     endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        //     type: 'mainnet',
        //     version: 'v2',
        //     key: 'd62949d66112cb5623f22889b5730eb8460eb5ed051f00ba06c179669705bf18'
        // },
    };
} else {
    config = {
        network: {
            endpoint: 'https://sandbox-v4.tonhubapi.com',
            type: 'testnet',
            version: 'v4',
        },
    };
}

export { config };

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });