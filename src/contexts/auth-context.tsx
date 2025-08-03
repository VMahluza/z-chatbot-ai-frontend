"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { checkAuthAction } from '@/app/auth/check/actions';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication with server
  const checkAuth = async () => {
    try {
      const result = await checkAuthAction();
      if (result.success && result.user) {
        setUser(result.user);
        // Store user in localStorage for persistence
        localStorage.setItem('auth_user', JSON.stringify(result.user));
      } else {
        // Clear invalid data
        setUser(null);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
  };

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to load from localStorage first (for quick UI)
        const storedUser = localStorage.getItem('auth_user');
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }

        // Then verify with server (using cookies)
        await checkAuth();
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // checkAuth is stable, but we only want to run this once on mount

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    
    // Store in localStorage
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    
    // Clear cookies (for server-side)
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
