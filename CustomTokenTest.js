const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomToken", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("CustomToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy(ethers.parseEther("5000"));
    await token.waitForDeployment();
  });

  it("Should assign total supply to owner", async function () {
    expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("5000"));
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, ethers.parseEther("100"));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
  });

  it("Should approve and allow transferFrom", async function () {
    await token.approve(addr1.address, ethers.parseEther("200"));
    await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseEther("200"));
    expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseEther("200"));
  });
});
