import { ethers } from "ethers";

interface FragmentObject {
  fragments: { format(format?: any): string; type: string }[];
}

interface ABIObject {
  abi?: ethers.InterfaceAbi;
  interface?: ethers.Interface | FragmentObject;
}

export function getInterfaceID(abi: ABIObject | string) {
  let contractInterface = resolveAbi(abi);

  let interfaceID = 0n;

  for (const fragment of contractInterface.fragments) {
    if (fragment.type !== "function") {
      continue;
    }

    const signature = ethers.id(fragment.format("sighash")).substring(0, 10);

    interfaceID = interfaceID ^ ethers.toBigInt(signature);
  }

  return "0x" + interfaceID.toString(16).padStart(8, "0");
}

function resolveAbi(abi: ABIObject | string) {
  if (typeof abi === "string") {
    return new ethers.Interface(abi);
  }

  if (abi.interface) {
    return abi.interface;
  }

  if (abi.abi) {
    return new ethers.Interface(abi.abi);
  }

  throw new Error("ABI object must have either abi or interface property");
}
