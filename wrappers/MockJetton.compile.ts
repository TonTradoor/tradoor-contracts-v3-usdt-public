import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/mock/mockJetton.tact',
    options: {
        debug: true
    }
};
