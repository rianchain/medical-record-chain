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
      // Reset form
      setFormData({
        nama: "",
        alamat: "",
        jenisKelamin: "",
        statusKeluarga: "",
        golonganDarah: "",
        pekerjaan: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mendaftarkan pasien");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nama</Form.Label>
        <Form.Control
          type="text"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Alamat</Form.Label>
        <Form.Control
          type="text"
          value={formData.alamat}
          onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Jenis Kelamin</Form.Label>
        <Form.Select
          value={formData.jenisKelamin}
          onChange={(e) =>
            setFormData({ ...formData, jenisKelamin: e.target.value })
          }
          required
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status Keluarga</Form.Label>
        <Form.Control
          type="text"
          value={formData.statusKeluarga}
          onChange={(e) =>
            setFormData({ ...formData, statusKeluarga: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Golongan Darah</Form.Label>
        <Form.Select
          value={formData.golonganDarah}
          onChange={(e) =>
            setFormData({ ...formData, golonganDarah: e.target.value })
          }
          required
        >
          <option value="">Pilih Golongan Darah</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
          <option value="O">O</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pekerjaan</Form.Label>
        <Form.Control
          type="text"
          value={formData.pekerjaan}
          onChange={(e) =>
            setFormData({ ...formData, pekerjaan: e.target.value })
          }
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Daftar Pasien
      </Button>
    </Form>
  );
};

export default PatientRegistration;
