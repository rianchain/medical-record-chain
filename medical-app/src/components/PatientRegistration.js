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
      await tx.wait();
      alert("Pasien berhasil didaftarkan!");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mendaftarkan pasien");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nama</Form.Label>
        <Form.Control
          type="text"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        />
      </Form.Group>
      {/* Tambahkan form field lainnya */}
      <Button type="submit">Daftar Pasien</Button>
    </Form>
  );
};
