
import { SafeUser } from '@/models/user';

// Service to interact with authentication APIs
export const authService = {
  async login(email: string, password: string): Promise<SafeUser> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },

  async register(username: string, email: string, password: string): Promise<SafeUser> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }
    
    return;
  },

  async getUser(): Promise<SafeUser | null> {
    try {
      const response = await fetch('/api/auth/me');
      
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
    const response = await fetch('/api/users/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ problemId, solved, language }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update progress');
    }
    
    return response.json();
  }
};
