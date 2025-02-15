# TACT Compilation Report
Contract: MultisigSigner
BOC Size: 1083 bytes

# Types
Total Types: 14

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## StdAddress
TLB: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

## VarAddress
TLB: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## SetManager
TLB: `set_manager#92f200ce manager:address = SetManager`
Signature: `SetManager{manager:address}`

## Request
TLB: `request#d4d15bf8 to:address timeout:uint32 manager:address = Request`
Signature: `Request{to:address,timeout:uint32,manager:address}`

## Signed
TLB: `signed#7360cdfb request:Request{to:address,timeout:uint32,manager:address} = Signed`
Signature: `Signed{request:Request{to:address,timeout:uint32,manager:address}}`

## RequestCreated
TLB: `request_created#b2d81b41 opAddress:address = RequestCreated`
Signature: `RequestCreated{opAddress:address}`

## MultisigSigner$Data
TLB: `null`
Signature: `null`

## Multisig$Data
TLB: `null`
Signature: `null`

# Get Methods
Total Get Methods: 1

## request

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
11: 'Unknown' error
12: Fatal error
13: Out of gas error
14: Virtualization error
32: Action list is invalid
33: Action list is too long
34: Action is invalid or not supported
35: Invalid source address in outbound message
36: Invalid destination address in outbound message
37: Not enough TON
38: Not enough extra-currencies
39: Outbound message does not fit into a cell after rewriting
40: Cannot process a message
41: Library reference is null
42: Library change action error
43: Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree
50: Account state size exceeded limits
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
4755: Timeout
40810: Completed
46307: Not a member

# Trait Inheritance Diagram

```mermaid
graph TD
MultisigSigner
MultisigSigner --> BaseTrait
```

# Contract Dependency Diagram

```mermaid
graph TD
MultisigSigner
```