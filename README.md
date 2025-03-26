# tradoor-contracts-v3-usdt

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

## build
- yarn build

## test
- yarn test

## deploy
- create .env.devnet / .env.localnet / .env.testnet / .env.mainnet
```
WALLET_MNEMONIC=""
WALLET_VERSION=v4
```

- deploy

yarn deploylocal

yarn deploydev

yarn deploytest

yarn deploymain

## run script

yarn runlocal

yarn rundev

yarn runtest

yarn runmain

- mint token:

yarn rundev mintMockJetton

- add executor:

add 'executor' in config/testnet.json

yarn rundev updateBaseConfig

- create add liquidity order:

yarn rundev addLiquidity

- create remove liquidity order:

yarn rundev removeLiquidity

- execute liqidity order：

yarn rundev executeLiquidityOrder

- create Perp increase order:

yarn rundev createIncreaseOrder

- create Perp decrease order:

yarn rundev createDecreaseOrder