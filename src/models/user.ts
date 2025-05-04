
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  solvedProblems: {
    problemId: string;
    solvedAt: Date;
    language: string;
  }[];
  attemptedProblems: {
    problemId: string;
    attemptedAt: Date;
    language: string;
  }[];
}

export interface SafeUser {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  solvedProblems: {
    problemId: string;
    solvedAt: Date;
    language: string;
  }[];
  attemptedProblems: {
    problemId: string;
    attemptedAt: Date;
    language: string;
  }[];
}

export const sanitizeUser = (user: User): SafeUser => {
  const { password, ...safeUser } = user;
  return {
    ...safeUser,
    _id: user._id?.toString() || '',
  } as SafeUser;
};
