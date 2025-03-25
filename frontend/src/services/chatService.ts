// src/services/chatService.ts

import axios from "axios";
import api from "@/src/services/axiosInstance"; // Tu instancia de Axios con interceptores
import { API_URL } from "@/src/constants/api";
import { Conversation } from "@/src/services/Conversation";

// Ajusta el endpoint según tu backend real
const CONVERSATIONS_URL = `${API_URL}/api/v1/conversations`;

/**
 * Obtiene todas las conversaciones de un usuario por su ID.
 * Se asume que el backend expone algo como GET /api/v1/conversations/user/{userId}.
 */
export async function getAllUserConversations(userId: number): Promise<Conversation[]> {
  try {
    const response = await api.get<Conversation[]>(`${CONVERSATIONS_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching conversations:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", (error as Error).message);
    }
    throw error;
  }
}
