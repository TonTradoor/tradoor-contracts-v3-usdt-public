import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/oracle/price_feed.tact',
    options: {
        debug: true
    }
};
