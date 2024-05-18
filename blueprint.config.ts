import { Config } from '@ton/blueprint';

console.log('use env', process.env.NODE_ENV);
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

let config: Config;
if (process.env.NODE_ENV === 'mainnet') {
    config = {
        network: {
            endpoint: 'https://mainnet-v4.tonhubapi.com',
            type: 'mainnet',
            version: 'v4',
        },
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
