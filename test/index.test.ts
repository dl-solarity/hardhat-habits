import { expect } from "chai";

import { getInterfaceId } from "../src";

describe("Interface Id Calculation", function () {
  it("should calculate the correct interface id", function () {
    expect(getInterfaceId()).to.be.equal("interface-id");
  });
});
