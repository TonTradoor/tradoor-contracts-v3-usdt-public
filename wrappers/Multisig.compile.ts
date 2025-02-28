import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/pool/multisig.tact',
    options: {
        // debug: true
    }
};
