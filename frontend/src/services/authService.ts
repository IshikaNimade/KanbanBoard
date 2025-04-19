import api from "../api/api";
import { UserData, AuthResponse } from "../types/types";
import { AxiosError } from "axios"; 

export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
    console.log("Sending register request with data:", userData);
    const response = await api.post<AuthResponse>("/auth/signup", userData);
    return response.data;
  } catch (error: unknown) { 
    if (error instanceof AxiosError && error.response) { 
      throw error.response.data.data.message || "Registration failed.";
    }
    throw new Error("Registration failed.");
  }
};

export const loginUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", userData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) { 
      throw error.response.data.data.message || "Login failed.";
    }
    throw new Error("Login failed.");
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.clear();
};
