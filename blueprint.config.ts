import { Config } from '@ton/blueprint';

export const config: Config = {
    network: {
        endpoint: 'https://sandbox-v4.tonhubapi.com',
        type: 'testnet',
        version: 'v4',
    },
    // network: {
    //     endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    //     type: 'testnet',
    //     version: 'v2',
    //     key: '6eb37dd6dd6cf27b74cf704b9dac04f653bf1daf2877b7b0e43f80226574193f',
    // },
};