import { Navigate, Outlet } from 'react-router-dom';
import { APP_ROUTER } from '../../utils/config';

export function ProtectedRoute({ isLoggedIn }) {
  return isLoggedIn
    ? <Outlet />
    : <Navigate to={APP_ROUTER.main} replace />
}
