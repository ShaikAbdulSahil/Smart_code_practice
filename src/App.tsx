
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { COOKIE_NAME } from './services/authService';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./app/landing/page'));
const HomePage = lazy(() => import('./app/page'));
const LoginPage = lazy(() => import('./app/login/page'));
const RegisterPage = lazy(() => import('./app/register/page'));
const ProfilePage = lazy(() => import('./app/profile/page'));
const NotFoundPage = lazy(() => import('./app/not-found'));

// Define protected routes that require authentication
const protectedRoutes = ['/profile'];
// Define auth routes (login/register) that should redirect if already logged in
const authRoutes = ['/login', '/register'];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simple function to get the token from cookies
    const getToken = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith(`${COOKIE_NAME}=`));
      return tokenCookie ? tokenCookie.trim().substring(COOKIE_NAME.length + 1) : undefined;
    };

    // Apply middleware logic directly in App.tsx
    const applyRouteMiddleware = () => {
      const token = getToken();
      const pathname = location.pathname;
      
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

    // Apply middleware on route changes
    applyRouteMiddleware();
  }, [location, navigate]);

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workspace" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
