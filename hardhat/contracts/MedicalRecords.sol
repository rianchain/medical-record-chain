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

    
    // fungsi untuk menambahkan rekam medis
    function addMedicalRecord(
        string memory _diagnosis,
        string memory _keluhan,
        string memory _perawatan,
        string memory _pengobatan, 
        string memory _infoTambahan
    ) public {
        require(patients[msg.sender].id != 0, "Pasien tidak terdaftar!");

        MedicalRecord memory newRecord = MedicalRecord(_diagnosis, _keluhan, _perawatan, _pengobatan, _infoTambahan);
        patients[msg.sender].medicalRecords.push(newRecord);

        emit MedicalRecordAdded(msg.sender, _diagnosis);
    }


    // fungsi untuk mengambil data pasien dengan getter
    function getPatient() public view returns (Patient memory) {
        require(patients[msg.sender].id != 0, "Pasien tidak terdaftar!");
        return patients[msg.sender];
    }


    // fungsi untuk mengambil jumlah rekam medis
    function getMedicalRecordCount() public view returns (uint256) {
        require(patients[msg.sender].id != 0, "Pasien tidak terdaftar!");
        return patients[msg.sender].medicalRecords.length;
    }


    // fungsi untuk mengambil rekam medis tertentu
    function getMedicalRecord(uint256 index) public view returns (MedicalRecord memory) {
        
    }
}
