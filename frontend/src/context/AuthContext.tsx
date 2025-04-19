import React, { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser, logoutUser, registerUser } from "../services/authService";
import { AuthContextType, AuthUser } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [token]);

  const register = async (userData: { email: string, password: string }) => {
    try {
      const data = await registerUser(userData);
      setToken(data.token);
      const authUser = { email: data.email };
      setUser(authUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(authUser));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials: { email: string, password: string }) => {
    try {
      const data = await loginUser(credentials);
      const authUser = { email: data.email };
      setToken(data.token);
      setUser(authUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(authUser));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
