import api from "./axiosInstance"; 
import {newWorkArtist } from "@/src/constants/uploadNewWorkArtist";
import { API_URL } from "@/src/constants/api";

// URL base para los workdone
const worksdone_URL = `${API_URL}/worksdone`;

// Crear un nuevo workdone
export const uploadNewWorkArtist = async (
    uploadWork: newWorkArtist
): Promise<newWorkArtist> => {
    const response = await api.post(worksdone_URL, {
        name: uploadWork.name,
        description: uploadWork.description,
        price: uploadWork.price,
        image: uploadWork.image,
      });
  return response.data;
};