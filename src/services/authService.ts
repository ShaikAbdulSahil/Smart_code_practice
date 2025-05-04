
import { SafeUser } from '@/models/user';

// Service to interact with authentication APIs
const apiBaseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';

export const authService = {
  async login(email: string, password: string): Promise<SafeUser> {
    const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },

  async register(username: string, email: string, password: string): Promise<SafeUser> {
    const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }
    
    return;
  },

  async getUser(): Promise<SafeUser | null> {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }
      
      return response.json();
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  async updateProgress(problemId: string, solved: boolean, language: string): Promise<SafeUser> {
    const response = await fetch(`${apiBaseUrl}/api/users/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ problemId, solved, language }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update progress');
    }
    
    return response.json();
  }
};
