
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SafeUser } from '@/models/user';
import { useToast } from '@/components/ui/use-toast';
import { authService, COOKIE_NAME } from '@/services/authService';

interface AuthContextType {
  user: SafeUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (problemId: string, solved: boolean, language: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const userData = await authService.getUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authService.login(email, password);
      setUser(userData);
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${userData.username}!`,
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authService.register(username, email, password);
      setUser(userData);
      toast({
        title: 'Registration Successful',
        description: `Welcome to Smart Code Practice, ${userData.username}!`,
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      toast({
        title: 'Logout Successful',
        description: 'You have been logged out',
      });
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserProgress = async (problemId: string, solved: boolean, language: string) => {
    try {
      const updatedUser = await authService.updateProgress(problemId, solved, language);
      setUser(updatedUser);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update your progress',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserProgress }}>
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
