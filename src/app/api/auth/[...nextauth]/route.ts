
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { User, sanitizeUser } from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_fallback_secret';
const COOKIE_NAME = 'auth_token';

export async function POST(
  request: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  const action = params.nextauth[0];
  
  if (action === 'register') {
    return handleRegister(request);
  }
  
  if (action === 'login') {
    return handleLogin(request);
  }
  
  if (action === 'logout') {
    return handleLogout();
  }
  
  return NextResponse.json({ message: "Route not found" }, { status: 404 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  const action = params.nextauth[0];
  
  if (action === 'me') {
    return handleGetCurrentUser(request);
  }
  
  return NextResponse.json({ message: "Route not found" }, { status: 404 });
}

// Handler functions
async function handleRegister(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
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
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: insertedUser._id.toString() },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const cookieStore = cookies();
    const response = NextResponse.json(sanitizeUser(insertedUser), { status: 201 });
    
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

async function handleLogin(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>("users");

    // Find user
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const cookieStore = cookies();
    const response = NextResponse.json(sanitizeUser(user));
    
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

async function handleLogout() {
  const cookieStore = cookies();
  const response = NextResponse.json({ message: "Logged out successfully" });
  
  cookieStore.set(COOKIE_NAME, '', {
    expires: new Date(0),
    path: '/',
  });

  return response;
}

async function handleGetCurrentUser(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<User>("users");

    // Find user
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.id) });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(sanitizeUser(user));
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
