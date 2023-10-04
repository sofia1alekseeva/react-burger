import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({ redirect, element, auth = false }) => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (auth) {
    return !accessToken ? element : <Navigate to={redirect} state={{ from: location }} />;
  }
  return accessToken ? element : <Navigate to={redirect} state={{ from: location }} />;
};