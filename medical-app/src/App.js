import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import PatientRegistration from "./components/PatientRegistration";
import PatientData from "./components/PatientData";
import AddMedicalRecord from "./components/AddMedicalRecord";
import MedicalHistory from "./components/MedicalHistory";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import MedicalRecords from "./contracts/Medicalrecords.json";

function App() {
  const [contract, setContract] = useState(null);
  const [activeTab, setActiveTab] = useState("registration");

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        try {
          // Minta izin untuk mengakses wallet
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Buat provider dan signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Ganti dengan alamat kontrak Anda setelah deploy
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

          // Inisialisasi kontrak
          const medicalContract = new ethers.Contract(
            contractAddress,
            MedicalRecords.abi,
            signer
          );

          setContract(medicalContract);
        } catch (error) {
          console.error("Error menginisialisasi kontrak:", error);
          alert("Gagal terhubung ke wallet");
        }
      } else {
        alert("Mohon install MetaMask!");
      }
    };

    initContract();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Sistem Rekam Medis</h1>
      {contract ? (
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="registration" title="Pendaftaran Pasien">
            <PatientRegistration contract={contract} />
          </Tab>
          <Tab eventKey="patientData" title="Data Pasien">
            <PatientData contract={contract} />
          </Tab>
          <Tab eventKey="addRecord" title="Tambah Rekam Medis">
            <AddMedicalRecord contract={contract} />
          </Tab>
          <Tab eventKey="history" title="Riwayat Medis">
            <MedicalHistory contract={contract} />
          </Tab>
        </Tabs>
      ) : (
        <p className="text-center">Menghubungkan ke blockchain...</p>
      )}
    </Container>
  );
}

export default App;
