import { DictionaryValue } from '@ton/core';
import { ExecutorParam } from '../build/OrderBook/tact_OrderBook';

export * from '../build/OrderBook/tact_OrderBook';

let ExecutorParamValue: DictionaryValue<ExecutorParam> = {
    serialize(src, builder) {
        builder.storeAddress(src.executor).storeBit(src.enable)
    },
    parse(src) {
        throw '';
    },
}
export {ExecutorParamValue};