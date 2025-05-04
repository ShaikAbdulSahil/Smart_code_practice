
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { User } from "@/models/user";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: User;
}

type ApiHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void;

export const withAuth =
  (handler: ApiHandler) =>
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      // Access token from cookies properly
      const token = req.cookies?.token;

      if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "jwt_fallback_secret"
      ) as { id: string };

      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection<User>("users");

      // Find user
      const user = await usersCollection.findOne({
        _id: new ObjectId(decoded.id),
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Add user to request object
      req.user = user;

      // Call the original handler
      return handler(req, res);
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
