const hre = require("hardhat");

async function main() {
  const Web3Forms = await hre.ethers.getContractFactory("Web3Forms");
  const web3Forms = await Web3Forms.deploy();

  await web3Forms.deployed();

  console.log("Web3 Forms deployed to:", web3Forms.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
