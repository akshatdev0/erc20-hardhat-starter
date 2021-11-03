import hre from "hardhat";
import { expect } from "chai";
import { Artifact } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { Foo } from "../../../typechain/Foo";
import { Signers } from "../../types";

const { deployContract } = hre.waffle;

describe("Foo Token Unit tests", function () {
  const artifact = "Foo";
  const name = "Foo";
  const symbol = "FOO";

  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Foo", function () {
    beforeEach(async function () {
      const fooArtifact: Artifact = await hre.artifacts.readArtifact(artifact);
      this.foo = <Foo>await deployContract(this.signers.admin, fooArtifact);
    });

    it("has a name", async function () {
      expect(await this.foo.connect(this.signers.admin).name()).to.equal(name);
    });

    it("has a symbol", async function () {
      expect(await this.foo.connect(this.signers.admin).symbol()).to.equal(symbol);
    });

    it("has 18 decimals", async function () {
      expect(await this.foo.connect(this.signers.admin).decimals()).to.equal(18);
    });

    it("has total supply of", async function () {
      expect(await this.foo.connect(this.signers.admin).totalSupply()).to.equal("100000000000");
    });
  });
});
