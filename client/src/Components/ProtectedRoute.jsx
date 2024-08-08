import React from 'react';
import { Navigate } from 'react-router-dom';
import useTokenStore from '../Hooks/useToken';

const ProtectedRoute = ({ children }) => {
  const { token } = useTokenStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
