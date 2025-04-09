import axios from "axios";
import api from "@/src/services/axiosInstance";
import { API_URL } from "@/src/constants/api";
import { Client } from "@/src/constants/CommissionTypes";
import {  clientUser } from "@/src/constants/user";
import { base64ToFile } from "@/src/components/convertionToBase64Image";
const CLIENT_URL = `${API_URL}/users`;

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get(`${CLIENT_URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching client:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", (error as Error).message);
    }
    throw error;
  }
  
};

export const deleteClient = async (id: number, token:string): Promise<void> => {
  await api.delete(`${CLIENT_URL}/administrator/clients/${id}`, { headers: { Authorization: `Bearer ${token}`}});
};



export const updateUserClient = async (
  user: clientUser,
  token: string

): Promise<clientUser> => {

  const formData = new FormData();

  const { imageProfile,tableCommissionsPrice, ...restOfUser } = user;
    
  const emptyFile = new File([], "archivo-vacio.txt", { type: "text/plain" });
  formData.append("tableCommissionsPrice", emptyFile);
  if(user.imageProfile!== undefined){
    const imageProfileData = base64ToFile(user.imageProfile, "image.png");
    formData.append("imageProfile", imageProfileData);

  }else{
    formData.append("imageProfile", emptyFile);
  }


  Object.entries(restOfUser).forEach(([key, value]) => {
    formData.append(key, String(value));
  });


  Object.entries(user).forEach(([key, value]) => {
    formData.append(key, String(value));
  });


  const response = await api.put(`${API_URL}/auth/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  });

  return response.data;

};