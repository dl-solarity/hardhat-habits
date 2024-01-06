[![npm](https://img.shields.io/npm/v/@solarity/hardhat-habits.svg)](https://www.npmjs.com/package/@solarity/hardhat-habits) [![hardhat](https://hardhat.org/buidler-plugin-badge.svg?1)](https://hardhat.org)

# Hardhat Habits (hABIts)

The hardhat plugin with common ABI utilities.

## What

This plugin simplifies interation with ABI and enables the following use cases:

- **Interface ID Calculation**: Calculates the Interface ID for a specified smart contract using `hardhat` environment and `solidity-ast` package.

## Installation

```bash
npm install --save-dev @solarity/hardhat-habits
```

## Usage

To use the module, follow these steps:

1. **Import the Module**:

```typescript
import { getInterfaceID } from "@solarity/hardhat-habits";
```

2. **Call the Function**:

```typescript
const interfaceID = await getInterfaceID("YourContractName");
```

Replace `"YourContractName"` with the name of your contract.

> [!NOTE]
> If the contract name is ambiguous, the fully qualified name of the contract will have to be specified.

## Tasks

This plugin does not add tasks to the Hardhat Runtime Environment.

## Environment extensions

This plugin does not extend the Hardhat Runtime Environment.
