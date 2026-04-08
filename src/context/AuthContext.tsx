import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

interface User {
  id: string;
  nombre: string;
  email: string;
  is_pro: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
  setDemoMode: (isPro: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // In a real app, we'd fetch the user profile here
          // const res = await authService.getMe();
          // setUser(res.data);
          
          // For preview purposes, if we have a token but API fails, let's keep them logged in
          setUser({ id: '1', nombre: 'Jonathan', email: 'jonathan@prueba.com', is_pro: localStorage.getItem('is_pro') === 'true' });
        } catch (error) {
          console.error("Failed to fetch user", error);
          // logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('is_pro', String(newUser.is_pro));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_pro');
    setToken(null);
    setUser(null);
  };

  const setDemoMode = (isPro: boolean) => {
    const demoUser = { id: 'demo', nombre: 'Jonathan', email: 'demo@demo.com', is_pro: isPro };
    login('demo-token', demoUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, setDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
