import axios from "axios";
import api from "./axiosInstance";
import { API_URL } from "../constants/api";
const ARTIST_URL = `${API_URL}/artists`;
import { base64ToFile } from "@/src/components/convertionToBase64Image";
import { artistUser } from "@/src/constants/user";

export const getArtistById = async (id:number) => {
  try {
    console.log(id);
    const response = await api.get(`/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the artist!", error);
    throw error;
  }
};

export const getArtistByBaseId = async (baseUserId: number) => {
  try {
    const response = await axios.get(`/artists/byBaseUser/${baseUserId}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo artista con baseUserId ${baseUserId}:`, error);
    throw error;
  }
};

export const deleteArtist = async (id: number, token:string): Promise<void> => {
  await api.delete(`${ARTIST_URL}/administrator/artists/${id}`, { headers: { Authorization: `Bearer ${token}`}});
};


export const getArtistByUsername = async (username:string) => {
  try {
    const response = await api.get(`/artists/username/${username}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the artist!", error);
    throw error;
  }
};



export const updateUserArtist = async (
  user: artistUser,
  token: string

): Promise<artistUser> => {

  const formData = new FormData();

  const { imageProfile, tableCommissionsPrice, ...restOfUser } = user;

  formData.append("updateUser", JSON.stringify(restOfUser)); 


  const emptyFile = new File([], "archivo-vacio.txt", { type: "text/plain" });
  formData.append("tableCommissionsPrice", emptyFile);
  
  if(user.imageProfile && typeof user.imageProfile !== null){
    const imageProfileData = base64ToFile(user.imageProfile, "image.png");
    formData.append("imageProfile", imageProfileData);

  }else{
    formData.append("imageProfile", emptyFile);
  }
  if(user.imageProfile && typeof user.imageProfile !== null){
    const tableCommissionsPriceData = base64ToFile(user.tableCommissionsPrice, "image.png");
    formData.append("tableCommissionsPrice", tableCommissionsPriceData);

  }else{
    formData.append("tableCommissionsPrice", emptyFile);
  }

 

  const response = await api.put(`${API_URL}/auth/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  });

  return response.data;

};
