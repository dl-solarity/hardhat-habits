import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

import { useEnvironment } from "./helpers";

import { getInterfaceID } from "../src";

import {
  ERC165Contract,
  IERC20__factory,
  IERC165__factory,
  IERC5313__factory,
  IERC1967__factory,
  IERC1271__factory,
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
    await expect(erc165Contract.supportsInterface(getInterfaceID(IERC20__factory))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(getInterfaceID(IERC1271__factory))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(getInterfaceID(IERC1967__factory))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(getInterfaceID(IERC5313__factory))).to.be.eventually.true;
    await expect(erc165Contract.supportsInterface(getInterfaceID(IERC165__factory))).to.be.eventually.true;

    // Not Supported
    // await expect(erc165Contract.supportsInterface(getInterfaceID(IERC721Enumerable__factory))).to.be.eventually.true;
    // await expect(erc165Contract.supportsInterface(getInterfaceID(IERC4626__factory))).to.be.eventually.true;

    await expect(erc165Contract.supportsInterface("0xffffffff")).to.be.eventually.false;
  });
});
