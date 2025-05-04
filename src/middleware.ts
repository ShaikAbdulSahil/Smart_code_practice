
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_fallback_secret';
const COOKIE_NAME = 'auth_token';

// Define protected routes that require authentication
const protectedRoutes = ['/profile'];
// Define auth routes (login/register) that should redirect if already logged in
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Get token from cookies
  const token = request.cookies.get(COOKIE_NAME)?.value;
  
  // Check if route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  // Check if route is an auth route
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));
  
  // If no token and trying to access protected route
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // If has token and trying to access auth routes (login/register)
  if (isAuthRoute && token) {
    try {
      // Verify token is valid
      jwt.verify(token, JWT_SECRET);
      
      // If valid, redirect to homepage
      return NextResponse.redirect(new URL('/', request.url));
    } catch (error) {
      // If token is invalid, continue to auth routes
      return NextResponse.next();
    }
  }
  
  // For all other cases, continue
  return NextResponse.next();
}

// Define which routes this middleware will run on
export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
    '/register',
    '/api/:path*',
  ]
};
