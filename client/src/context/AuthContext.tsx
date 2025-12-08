// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';
import { User } from '../types/user.types';
import { useAtom } from "jotai";
import { isAdminAtom } from '../atoms/isAdminAtom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  googleLogin: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (authService.isAuthenticated()) {
      try {
        const response = await authService.getProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.logout();
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    authService.saveToken(response.token);
    setUser(response.user);
  };

  const register = async (data: any) => {
    const response = await authService.register(data);
    authService.saveToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAdmin(false);
    
  };

  const googleLogin = () => {
    authService.googleLogin();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        googleLogin,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};