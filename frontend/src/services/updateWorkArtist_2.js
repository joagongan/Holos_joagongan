import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/worksdone";

/**
 * Convierte base64 a un File, tal como lo hacías en "uploadNewWorkArtist_2.js"
 */
const base64ToFile = (base64Data, filename) => {
  const arr = base64Data.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

/**
 * Llama al endpoint PUT para actualizar un WorkDone existente.
 * @param {number} workId     - ID de la obra
 * @param {Object} work       - { name, description, price }
 * @param {string|null} imageBase64 - Si el usuario cambió imagen, base64 de la nueva imagen. Si no, null
 * @param {string} token      - Token JWT
 */
export const updateWorkdone = async (workId, work, imageBase64, token) => {
  const formData = new FormData();
  // Parte JSON con datos de la obra
  formData.append("work", JSON.stringify(work));

  // Si hay imagen (el usuario decidió cambiarla)
  if (imageBase64) {
    const imageFile = base64ToFile(imageBase64, "image.png");
    formData.append("image", imageFile);
  }

  const response = await axios.put(`${API_URL}/${workId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
