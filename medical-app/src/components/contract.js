import { ethers } from "ethers";
import MedicalRecords from "../contracts/Medicalrecords.json";

export const getContract = async (provider) => {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "Alamat contract",
    MedicalRecords.abi,
    signer
  );
  return contract;
};
