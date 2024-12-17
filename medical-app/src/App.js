import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PatientRegistration from "./components/PatientRegistration";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import MedicalRecords from "./artifacts/contracts/MedicalRecords.sol/MedicalRecords.json";

function App() {
  const [contract, setContract] = useState(null);

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
          const contractAddress = "ALAMAT_KONTRAK_ANDA";

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
        <PatientRegistration contract={contract} />
      ) : (
        <p className="text-center">Menghubungkan ke blockchain...</p>
      )}
    </Container>
  );
}

export default App;
