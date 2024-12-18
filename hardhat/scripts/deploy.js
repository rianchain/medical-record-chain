const { error } = require("fp-ts/lib/Console");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account address:",
    deployer.address
  );

  const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
  const medicalRecords = await MedicalRecords.deploy({
    gassLimit: 3000000,
  });

  const txReceipt = await medicalRecords.waitForDeployment;

  console.log("MedicalRecords deployed to:", medicalRecords.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
