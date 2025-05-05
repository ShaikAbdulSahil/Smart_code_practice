
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { User, sanitizeUser } from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_fallback_secret';
const COOKIE_NAME = 'auth_token';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies directly from the request
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const { problemId, solved, language } = await request.json();

    if (!problemId || typeof solved !== 'boolean' || !language) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>("users");

    // Find user
    const userId = new ObjectId(decoded.id);
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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
      return NextResponse.json({ message: "User not found after update" }, { status: 404 });
    }

    return NextResponse.json(sanitizeUser(updatedUser));
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
