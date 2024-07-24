import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/jetton/jetton_tlp.tact',
    options: {
        debug: true
    }
};
