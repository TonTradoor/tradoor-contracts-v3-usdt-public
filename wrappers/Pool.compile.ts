import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/pool/pool.tact',
    options: {
        debug: true
    }
};
