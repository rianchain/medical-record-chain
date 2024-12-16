// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MedicalRecords {

    /// Variable state untuk menampung data pasien:

    struct Patient {
        uint256 id;
        string nama;
        string alamat;
        string jenisKelamin;
        string statusKeluarga;
        string golonganDarah;
        string pekerjaan;
        MedicalRecord[] medicalRecords;
    }

    struct MedicalRecord {
        string diagnosis;
        string keluhan;
        string perawatan;
        string pengobatan;
        string infoTambahan;
    }
    
    // state variable untuk menyimpan pasien
    mapping(address => Patient) private patients;
    uint256 private patientCount;

    // event untuk mencatat penambahan pasien
    event PatientAdded(address indexed patientAddress, uint256 id, string nama);

    // event untuk mencatat penambahan rekam medis
    event MedicalRecordAdded(address indexed patientAddress, string diagnosis);

    //fungsi untuk menambahkan pasien
    function addPatient(
        string memory _nama,
        string memory _alamat,
        string memory _jenisKelamin,
        string memory _statusKeluarga,
        string memory _golonganDarah,
        string memory _pekerjaan 
    ) public {
        require(patients[msg.sender].id == 0, "Pasien sudah terdaftar!");
        
        patientCount++;
        patients[msg.sender] = Patient(patientCount, _nama, _alamat, _jenisKelamin, _statusKeluarga, _golonganDarah, _pekerjaan, new MedicalRecord[](0));

        emit PatientAdded(msg.sender, patientCount, _nama);
    }
}
