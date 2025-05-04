
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { User, sanitizeUser } from '@/models/user';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const now = new Date();
    const user: User = {
      username,
      email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
      solvedProblems: [],
      attemptedProblems: [],
    };

    const result = await usersCollection.insertOne(user);
    const insertedUser = await usersCollection.findOne({ _id: result.insertedId });

    if (!insertedUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: insertedUser._id },
      process.env.JWT_SECRET || 'jwt_fallback_secret',
      { expiresIn: '7d' }
    );

    // Set cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    }));

    return res.status(201).json(sanitizeUser(insertedUser));
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
