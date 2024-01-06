import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

import { useEnvironment } from "./helpers";

import { getInterfaceID } from "../src";

import {
  ERC165Contract,
  ERC165Contract__factory,
} from "./fixture-projects/hardhat-project-typechain-ethers/typechain-types";

describe("Interface Id Calculation", function () {
  useEnvironment("typechain-ethers");

  let erc165Contract: ERC165Contract;

  beforeEach("setup", async function () {
    const signer = await this.hre.ethers.provider.getSigner();

    erc165Contract = await new ERC165Contract__factory(signer).deploy();
  });

  it("should calculate the correct interface id", async function () {
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC20"))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC1271"))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC1967"))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC5313"))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC165"))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC721Enumerable"))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(await getInterfaceID("IERC4626"))).to.be.eventually.true;

    await expect(erc165Contract.supportsInterface("0xffffffff")).to.be.eventually.false;
  });
});
