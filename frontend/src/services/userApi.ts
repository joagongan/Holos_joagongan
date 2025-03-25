import { API_URL } from "../constants/api";
import { BaseUser, User } from "../constants/CommissionTypes";
import { handleError } from "../utils/handleError";
import api from "./axiosInstance";

const USER_URL = `${API_URL}/users`;
const ADMINISTRATOR_USER_URL = `${API_URL}/baseUser/administrator/users`;

export const getUser = async (token:string): Promise<User> => {
    try {
        const response = await api.get(`${USER_URL}/profile`, {headers: { Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        handleError(error, "Error fetching commissions");
        throw error;
    }
};
export const getAllUsers = async (): Promise<BaseUser[]> => {
    const response = await api.get(ADMINISTRATOR_USER_URL);
    return response.data;
  };
  
  export const getUserById = async (id: number): Promise<BaseUser> => {
    const response = await api.get(`${USER_URL}/administrator/users/${id}`);
    return response.data;
  };
  
  export const updateUser = async (id: number, user: Partial<BaseUser>): Promise<BaseUser> => {
    const response = await api.put(`${USER_URL}/administrator/users/${id}`, user);
    return response.data;
  };
  
  export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`${USER_URL}/administrator/users/${id}`);
  };
