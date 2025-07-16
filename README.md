# Tradoor Contracts v3 (USDT)

## Overview

Tradoor Contracts v3 is a suite of smart contracts and supporting scripts for a decentralized perpetual trading protocol on the TON blockchain. This project implements core DeFi primitives such as liquidity pools, perpetual orders, and multi-signature management, with a focus on USDT and other major assets.

## Directory Structure

- `contracts/` — All smart contract source code (Tact language), including:
  - `jetton/` — Jetton (token) standard contracts and helpers
  - `pool/` — Liquidity pool, perpetual trading, multisig, and upgrade logic
  - `imports/` — Shared libraries
- `wrappers/` — TypeScript wrappers for contracts, providing serialization, deployment, and interaction utilities
- `scripts/` — Automation scripts for deployment, configuration, and contract operations
- `tests/` — Automated tests for contract logic (Jest + Blueprint)
- `config/` — Network and protocol configuration files (JSON)
- `utils/` — Shared TypeScript utilities and constants

## Main Components

- **Liquidity Pool**: Manages pooled assets, liquidity orders, and protocol parameters
- **Perpetual Trading**: Handles perpetual order creation, execution, and position management
- **Multisig**: Multi-signature contract for protocol governance and upgrades
- **Upgradeability**: Secure upgrade mechanism with time-lock and owner checks

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Yarn or npm
- [TON Blueprint](https://github.com/ton-community/blueprint) (installed as a dev dependency)

### Installation
```bash
yarn install
# or
npm install
```

### Build Contracts
```bash
yarn build
# or
npx blueprint build
```

### Run Tests
```bash
yarn test
# or
npx blueprint test
```

### Deploy Contracts
1. Create environment files: `.env.devnet`, `.env.localnet`, `.env.testnet`, `.env.mainnet`
   ```env
   WALLET_MNEMONIC=""
   WALLET_VERSION=v4
   ```
2. Deploy to desired network:
   ```bash
   yarn deploylocal   # Localnet
   yarn deploydev     # Devnet
   yarn deploytest    # Testnet
   yarn deploymain    # Mainnet
   ```

### Run Scripts
Scripts automate common contract operations. Example usage:
```bash
yarn rundev addLiquidity
# Add liquidity order on devnet

yarn rundev mintMockJetton
# Mint mock tokens for testing
```
See `scripts/` for all available scripts and their purposes.

## Configuration
- Network and protocol parameters are defined in `config/*.json` (e.g., tokens, fees, addresses)
- Update these files to customize deployment and protocol behavior

## Testing
- All contract logic is covered by Jest-based tests in the `tests/` directory
- Run `yarn test` to execute the full test suite

## Contribution
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. For major changes, open an issue first to discuss your proposal.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.