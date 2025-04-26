import { useKeycloak } from '@react-keycloak/web';
import { Navigate, useLocation } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();

  // Show loading state while Keycloak is initializing
  if (!initialized) {
    return <SuspenseLoader />;
  }

  // Handle authentication state
  if (!keycloak.authenticated) {
    // Store the attempted URL for redirect after login
    const returnUrl = location.pathname + location.search;
    return <Navigate to="/login" state={{ from: returnUrl }} replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default PrivateRoute;
