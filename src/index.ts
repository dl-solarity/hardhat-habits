import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ContractDefinition, FunctionDefinition, SourceUnit } from "solidity-ast";
import { findAll, isNodeType } from "solidity-ast/utils";

export async function getInterfaceID(contractName: string) {
  const hre = require("hardhat") as HardhatRuntimeEnvironment;

  const contractArtifact = await hre.artifacts.readArtifact(contractName);
  const buildInfo = await hre.artifacts.getBuildInfo(`${contractArtifact.sourceName}:${contractName}`);

  const sourceUnit: SourceUnit = buildInfo!.output.sources[contractArtifact.sourceName].ast;
  const contractNode: ContractDefinition = sourceUnit.nodes.find(
    (node) => isNodeType("ContractDefinition", node) && node.name === contractName,
  ) as ContractDefinition;

  if (!contractNode) {
    throw new Error(`Contract ${contractName} not found in ${contractArtifact.sourceName}`);
  }

  const allFunctions: FunctionDefinition[] = [...findAll("FunctionDefinition", contractNode)];

  let interfaceID = 0n;

  for (const functionDef of allFunctions) {
    interfaceID = interfaceID ^ BigInt(`0x${functionDef.functionSelector!}`);
  }

  return "0x" + interfaceID.toString(16).padStart(8, "0");
}
