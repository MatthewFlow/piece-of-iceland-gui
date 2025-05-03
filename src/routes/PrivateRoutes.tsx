import { Navigate, Outlet } from 'react-router-dom';

import { LoadingScreen } from '../components/LoadingScreen';
import { useSession } from '../hooks/useSession';

export default function PrivateRoutes() {
  const { isAuthenticated, loading, initialized } = useSession();

  if (!initialized || loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
