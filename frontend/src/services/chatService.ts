import axios from "axios";
import api from "@/src/services/axiosInstance";
import { API_URL } from "@/src/constants/api";
import { ChatMessage } from "@/src/services/ChatMessage";
import { Conversation } from "@/src/services/Conversation";


const CHAT_URL = `${API_URL}/messages`;
const CONVERSATIONS_URL = `${API_URL}/conversations`;

/**
 * Obtiene la conversación entre el usuario autenticado y el usuario con id `toUserId`.
 * @param toUserId El ID del usuario receptor (con quien se conversa).
 * @returns Array de mensajes de tipo ChatMessage.
 */
export async function getConversation(toUserId: number): Promise<ChatMessage[]> {
  try {
    const response = await api.get<ChatMessage[]>(`${CHAT_URL}/chat/${toUserId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching conversation:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", (error as Error).message);
    }
    throw error;
  }
}

/**
 * Envía un nuevo mensaje al backend.
 * @param messageData Objeto con los datos del mensaje (text, fromUser, toUser, etc.).
 * @returns El mensaje creado en el backend.
 */
export async function sendMessage(messageData: Partial<ChatMessage>): Promise<ChatMessage> {
  try {
    const response = await api.post<ChatMessage>(CHAT_URL, messageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error sending message:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", (error as Error).message);
    }
    throw error;
  }
}

/**
 * Obtiene un mensaje específico por su id.
 * @param id ID del mensaje.
 * @returns El mensaje encontrado.
 */
export async function getChatMessage(id: number): Promise<ChatMessage> {
  try {
    const response = await api.get<ChatMessage>(`${CHAT_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching chat message:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", (error as Error).message);
    }
    throw error;
  }
}

/**
 * Elimina un mensaje por su id.
 * @param id ID del mensaje.
 * @returns Respuesta del backend (vacía si todo salió bien).
 */
export async function deleteMessage(id: number): Promise<void> {
  try {
    await api.delete(`${CHAT_URL}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error deleting message:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", (error as Error).message);
    }
    throw error;
  }
}


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
