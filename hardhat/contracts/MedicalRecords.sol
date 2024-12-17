// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MedicalRecords {
    /// Struktur untuk menyimpan rekam medis
    struct MedicalRecord {
        string diagnosis;
        string keluhan;
        string perawatan;
        string pengobatan;
        string infoTambahan;
    }

    /// Struktur untuk menyimpan data pasien
    struct Patient {
        uint256 id;
        string nama;
        string alamat;
        string jenisKelamin;
        string statusKeluarga;
        string golonganDarah;
        string pekerjaan;
    }

    // Mapping untuk menyimpan pasien dan rekam medisnya
    mapping(address => Patient) private patients;
    mapping(address => MedicalRecord[]) private patientMedicalRecords;
    uint256 private patientCount;

    // Event untuk mencatat penambahan pasien
    event PatientAdded(address indexed patientAddress, uint256 id, string nama);

    // Event untuk mencatat penambahan rekam medis
    event MedicalRecordAdded(address indexed patientAddress, string diagnosis);

    // Fungsi untuk menambahkan pasien
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
        patients[msg.sender] = Patient({
            id: patientCount,
            nama: _nama,
            alamat: _alamat,
            jenisKelamin: _jenisKelamin,
            statusKeluarga: _statusKeluarga,
            golonganDarah: _golonganDarah,
            pekerjaan: _pekerjaan
        });

        emit PatientAdded(msg.sender, patientCount, _nama);
    }

    // Fungsi untuk menambahkan rekam medis
    function addMedicalRecord(
        string memory _diagnosis,
        string memory _keluhan,
        string memory _perawatan,
        string memory _pengobatan, 
        string memory _infoTambahan
    ) public {
        require(patients[msg.sender].id != 0, "Pasien tidak terdaftar!");

        patientMedicalRecords[msg.sender].push(MedicalRecord({
            diagnosis: _diagnosis,
            keluhan: _keluhan,
            perawatan: _perawatan,
            pengobatan: _pengobatan,
            infoTambahan: _infoTambahan
        }));

        emit MedicalRecordAdded(msg.sender, _diagnosis);
    }

    // Fungsi untuk mengambil data pasien
    function getPatient() public view returns (
        uint256 id,
        string memory nama,
        string memory alamat,
        string memory jenisKelamin,
        string memory statusKeluarga,
        string memory golonganDarah,
        string memory pekerjaan
    ) {
        require(patients[msg.sender].id != 0, "Pasien tidak terdaftar!");
        Patient memory patient = patients[msg.sender];
        
        return (
            patient.id,
            patient.nama,
            patient.alamat,
            patient.jenisKelamin,
            patient.statusKeluarga,
            patient.golonganDarah,
            patient.pekerjaan
        );
    }

    // Fungsi untuk mengambil jumlah rekam medis
    function getMedicalRecordCount() public view returns (uint256) {
        require(patients[msg.sender].id != 0, "Pasien tidak terdaftar!");
        return patientMedicalRecords[msg.sender].length;
    }

    // Fungsi untuk mengambil rekam medis tertentu
    function getMedicalRecord(uint256 index) public view returns (
        string memory diagnosis,
        string memory keluhan,
        string memory perawatan,
        string memory pengobatan,
        string memory infoTambahan
    ) {
        require(patients[msg.sender].id != 0, "Pasien tidak ada!");
        require(index < patientMedicalRecords[msg.sender].length, "Index tidak valid!");
        
        MedicalRecord memory record = patientMedicalRecords[msg.sender][index];
        
        return (
            record.diagnosis,
            record.keluhan,
            record.perawatan,
            record.pengobatan,
            record.infoTambahan
        );
    }
}