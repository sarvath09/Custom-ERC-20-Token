const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.parseEther("5000"); // 5000 tokens
  const Token = await hre.ethers.getContractFactory("CustomToken");
  const token = await Token.deploy(initialSupply);

  await token.waitForDeployment();

  console.log(`CustomToken deployed at: ${token.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
