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

}
