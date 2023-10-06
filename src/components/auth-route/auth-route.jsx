import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ component, onlyUnAuth = false, onlyAuth = false }) => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();
  if (onlyUnAuth) {
    return !accessToken ? component : <Navigate to={"/"} state={{ from: location }} />;
  }
  if (onlyAuth) {
    return accessToken ? component : <Navigate to={"/login"} state={{ from: location }} />;
  }
};

export const OnlyAuth = ({ component,  }) => (
  <ProtectedRoute onlyAuth={true} component={component} />
);
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  onlyAuth: PropTypes.bool,
  onlyUnAuth: PropTypes.bool,
};
