
import { NavigateFunction } from "react-router-dom";

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
    // We'll rely on the server-side verification instead of client-side JWT verification
    // Simply having a token is enough to redirect from auth routes
    navigate('/');
    return false;
  }
  
  // For all other cases, continue
  return true;
}
