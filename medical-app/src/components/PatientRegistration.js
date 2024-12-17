import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const PatientRegistration = ({ contract }) => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jenisKelamin: "",
    statusKeluarga: "",
    golonganDarah: "",
    pekerjaan: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const tx = await contract.addPatient(
            formData.nama,
            formData.alamat,
            formData.jenisKelamin,
            formData.statusKeluarga,
            formData.golonganDarah,
            formData.pekerjaan
        );
    }
  };
};
