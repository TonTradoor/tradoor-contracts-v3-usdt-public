import { NetworkProvider } from "@ton/blueprint";
import { Address } from "@ton/core";
import assert from "assert";

export function getSenderAddress(provider: NetworkProvider): Address {
    let address = provider.sender().address;
    assert(typeof address !== "undefined", "sender address not exist");
    
    return address;
}