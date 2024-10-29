// src/components/common/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>; // Show loading state until it resolves
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;