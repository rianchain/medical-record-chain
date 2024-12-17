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
};
