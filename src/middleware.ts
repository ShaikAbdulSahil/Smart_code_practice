
import { NavigateFunction } from "react-router-dom";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_fallback_secret';
const COOKIE_NAME = 'auth_token';

// Define protected routes that require authentication
const protectedRoutes = ['/profile'];
// Define auth routes (login/register) that should redirect if already logged in
const authRoutes = ['/login', '/register'];

// This middleware will be used by React Router
export function routeMiddleware(
  path: string, 
  navigate: NavigateFunction,
  getToken: () => string | undefined
) {
  // Get token from cookies
  const token = getToken();
  
  // Check if route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  // Check if route is an auth route
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));
  
  // If no token and trying to access protected route
  if (isProtectedRoute && !token) {
    navigate('/login');
    return false;
  }
  
  // If has token and trying to access auth routes (login/register)
  if (isAuthRoute && token) {
    try {
      // Verify token is valid
      jwt.verify(token, JWT_SECRET);
      
      // If valid, redirect to homepage
      navigate('/');
      return false;
    } catch (error) {
      // If token is invalid, continue to auth routes
      return true;
    }
  }
  
  // For all other cases, continue
  return true;
}
