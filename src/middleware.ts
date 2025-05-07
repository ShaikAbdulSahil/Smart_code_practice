
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'auth_token';

// Define protected routes that require authentication
const protectedRoutes = ['/profile'];
// Define auth routes (login/register) that should redirect if already logged in
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;
  
  // Check if route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // If no token and trying to access protected route
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
  
  // If has token and trying to access auth routes (login/register)
  if (isAuthRoute && token) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
  
  // For all other cases, continue
  return NextResponse.next();
}

// Function for react-router-dom to use in App.tsx
export const routeMiddleware = (
  pathname: string,
  navigate: (path: string) => void,
  getToken: () => string | undefined
) => {
  const token = getToken();
  
  // Check if route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // If no token and trying to access protected route
  if (isProtectedRoute && !token) {
    navigate('/login');
    return;
  }
  
  // If has token and trying to access auth routes (login/register)
  if (isAuthRoute && token) {
    navigate('/');
    return;
  }
};

// Specify which routes the middleware should run on
export const config = {
  matcher: ['/profile/:path*', '/login', '/register', '/workspace'],
}
