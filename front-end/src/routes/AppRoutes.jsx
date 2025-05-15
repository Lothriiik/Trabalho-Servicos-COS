import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import HomeRoutes from './HomeRoutes';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  const isLogged = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>

        <Route
          path="/login"
          element={isLogged ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/registrar"
          element={isLogged ? <Navigate to="/home" replace /> : <Register />}
        />


        <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <HomeRoutes />
            </ProtectedRoute>
          }
        />


        <Route
          path="/"
          element={isLogged ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />


        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
