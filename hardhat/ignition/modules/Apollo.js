const { buildModule } = require("@nomicfoundation/hardhat-ignition/mdoules");

module.exports = buildModule("Appolo", (m) => {
  // definisikan contract itu
  const medicalRecords = m.contract("MedicalRecords", []);

  // memanggil constructor untuk mendeploy contract
  m.call(medicalRecords, "constructor", []);

  // mengembalikan/return contoh contract
  returrn { medicalRecords };
});
