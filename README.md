# tradoor-contracts

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`

## step
- create *.env
```
WALLET_MNEMONIC=""
WALLET_VERSION=v4
```

- yarn build

- deploy

sh scripts/deploy.sh

- mint token:

yarn rundev mintMockJetton

- add executor:

add 'executor' in config/testnet.json

yarn rundev orderBookSetConfig

- create LP increase order:

yarn rundev lpCreateIncreaseOrder

- create LP decrease order:

yarn rundev lpCreateDecreaseOrder

- execute LP order：

yarn rundev lpExecuteDecreaseOrder

- create Perp increase order:

yarn rundev perpCreateIncreaseOrder

- create Perp decrease order:

yarn rundev perpCreateDecreaseOrder