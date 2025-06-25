 'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Hardcoded credentials (in real app, this would be server-side)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'vividhata2024';

  useEffect(() => {
    // Check if admin session exists in localStorage
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('adminSession', 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminSession');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};