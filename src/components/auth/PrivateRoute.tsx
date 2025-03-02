import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
  userType: 'user' | 'company';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, user, company } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={userType === 'user' ? '/login' : '/company-login'} state={{ from: location }} replace />;
  }

  // If authenticated but wrong user type, redirect to appropriate page
  if ((userType === 'user' && !user) || (userType === 'company' && !company)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and correct user type, render children
  return <>{children}</>;
};

export default PrivateRoute;