
import { SafeUser } from '@/models/user';

// This is a mock implementation to simulate API calls in a non-Next.js environment
export const authService = {
  async login(email: string, password: string): Promise<SafeUser> {
    // In development, just return a mock user
    if (email === 'test@example.com' && password === 'password') {
      return {
        _id: '1',
        username: 'testuser',
        email: 'test@example.com',
        createdAt: new Date(),
        solvedProblems: [],
        attemptedProblems: []
      };
    }
    throw new Error('Invalid credentials');
  },

  async register(username: string, email: string, password: string): Promise<SafeUser> {
    // In development, just return a mock user
    return {
      _id: '1',
      username,
      email,
      createdAt: new Date(),
      solvedProblems: [],
      attemptedProblems: []
    };
  },

  async logout(): Promise<void> {
    // In development, just return success
    return Promise.resolve();
  },

  async getUser(): Promise<SafeUser | null> {
    // In development, return null to simulate not logged in
    return null;
  },

  async updateProgress(problemId: string, solved: boolean, language: string): Promise<SafeUser> {
    // Return mock updated user
    return {
      _id: '1',
      username: 'testuser',
      email: 'test@example.com',
      createdAt: new Date(),
      solvedProblems: solved ? [{ problemId, solvedAt: new Date(), language }] : [],
      attemptedProblems: solved ? [] : [{ problemId, attemptedAt: new Date(), language }]
    };
  }
};
