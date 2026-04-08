import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Matches } from './pages/Matches';
import { MatchDetails } from './pages/MatchDetails';
import { Profile } from './pages/Profile';
import { GroupDetails } from './pages/GroupDetails';
import { Ranking } from './pages/Ranking';
import './index.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="flex h-screen items-center justify-center bg-gray-50 text-violet-900 font-bold">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="partidos" element={<Matches />} />
        <Route path="partidos/:id" element={<MatchDetails />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="grupos/:id" element={<GroupDetails />} />
      </Route>
    </Routes>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
