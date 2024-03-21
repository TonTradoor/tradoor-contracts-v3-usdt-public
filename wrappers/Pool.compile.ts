import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/core/pool.tact',
    options: {
        debug: true
    }
};
