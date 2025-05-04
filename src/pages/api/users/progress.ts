
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { User, sanitizeUser } from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'jwt_fallback_secret'
    ) as { id: string };

    const { problemId, solved, language } = req.body;

    if (!problemId || typeof solved !== 'boolean' || !language) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>('users');

    // Find user
    const userId = new ObjectId(decoded.id);
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const now = new Date();

    if (solved) {
      // Add to solved problems if not already solved
      const alreadySolved = user.solvedProblems.some(p => p.problemId === problemId);
      
      if (!alreadySolved) {
        await usersCollection.updateOne(
          { _id: userId },
          {
            $push: {
              solvedProblems: {
                problemId,
                solvedAt: now,
                language
              }
            },
            $set: { updatedAt: now }
          }
        );
      }
    } else {
      // Add to attempted problems if not already attempted
      const alreadyAttempted = user.attemptedProblems.some(p => p.problemId === problemId);
      
      if (!alreadyAttempted) {
        await usersCollection.updateOne(
          { _id: userId },
          {
            $push: {
              attemptedProblems: {
                problemId,
                attemptedAt: now,
                language
              }
            },
            $set: { updatedAt: now }
          }
        );
      }
    }

    // Get updated user
    const updatedUser = await usersCollection.findOne({ _id: userId });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found after update' });
    }

    return res.status(200).json(sanitizeUser(updatedUser));
  } catch (error) {
    console.error('Update progress error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
