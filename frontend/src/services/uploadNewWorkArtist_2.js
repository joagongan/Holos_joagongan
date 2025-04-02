import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/worksdone";

const base64ToFile = (base64Data, filename) => {
  const arr = base64Data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const postWorkdone = async (work, imageBase64, token) => {
  const formData = new FormData();
  formData.append("work", JSON.stringify(work));

  const imageFile = base64ToFile(imageBase64, "image.png");


  formData.append("image", imageFile);

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  });

  return response.data;
};
