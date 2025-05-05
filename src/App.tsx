
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./app/page'));
const LoginPage = lazy(() => import('./app/login/page'));
const RegisterPage = lazy(() => import('./app/register/page'));
const ProfilePage = lazy(() => import('./app/profile/page'));
const NotFoundPage = lazy(() => import('./app/not-found'));

function App() {
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
