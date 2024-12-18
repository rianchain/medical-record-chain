const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Appolo", (m) => {
  // definisikan contract itu
  const medicalRecords = m.contract("MedicalRecords", []);

  // memanggil constructor untuk mendeploy contract
  //   m.call(medicalRecords, "initialize", [66]);

  // mengembalikan/return contoh contract
  return { medicalRecords };
});
