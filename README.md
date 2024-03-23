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

## 步骤
- 创建.env文件
```
WALLET_MNEMONIC="助记词"
WALLET_VERSION=v4
```

- 编译：

yarn build

- 重新部署：

sh scripts/deploy.sh

- mint token:

yarn rundev mintMockJetton

- 添加executor:

修改 config/testnet.json 中 executor

yarn rundev orderBookSetConfig

- 创建RBF加仓订单：

yarn rundev rbfCreateIncreaseOrder

- 创建RBF减仓订单：

yarn rundev rbfCreateDecreaseOrder

- 创建LP加仓订单：

yarn rundev lpCreateIncreaseOrder

- 创建LP减仓订单：

yarn rundev lpCreateDecreaseOrder