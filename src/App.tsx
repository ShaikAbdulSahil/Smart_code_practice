
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { routeMiddleware } from './middleware';
import { COOKIE_NAME } from './services/authService';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./app/page'));
const LoginPage = lazy(() => import('./app/login/page'));
const RegisterPage = lazy(() => import('./app/register/page'));
const ProfilePage = lazy(() => import('./app/profile/page'));
const NotFoundPage = lazy(() => import('./app/not-found'));

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

    // Apply middleware on route changes
    routeMiddleware(location.pathname, navigate, getToken);
  }, [location, navigate]);

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
