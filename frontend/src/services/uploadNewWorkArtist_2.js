import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/worksdone";



export const postWorkdone = async (work, imageFile, token) => {
  const formData = new FormData();
  formData.append("work", JSON.stringify(work));
  formData.append("image", imageFile);

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  return response.data;
};
