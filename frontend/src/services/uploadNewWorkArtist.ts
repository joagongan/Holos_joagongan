import api from "./axiosInstance"; 
import {newWorkArtist, newWorkUploadArtist } from "@/src/constants/uploadNewWorkArtist";
import { API_URL } from "@/src/constants/api";

// URL base para los workdone
const worksdone_URL = `${API_URL}/worksdone`;

// Crear un nuevo workdone
export const uploadNewWorkArtist = async (
    uploadWork: newWorkArtist,
    images: number[],
  
  ): Promise<newWorkUploadArtist> => {
    const response = await api.post(worksdone_URL, {
      work: {
        name: uploadWork.name,
        description: uploadWork.description,
        price: uploadWork.price,
      },
      image: images 
    });
  
    return response.data;
  };
  


  export const postReportWork = async (report, token) => {
      try {
          const response = await axios.post(API_URL, report, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          });
          return response.data;
        } catch (error) {
          console.error("Error al enviar el reporte:", error);
          throw error;
        }
  };