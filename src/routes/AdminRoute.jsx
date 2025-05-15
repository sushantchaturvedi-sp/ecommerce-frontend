import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" />;
  //   if (!isAdmin) return <Navigate to="/unauthorized" />;

  return children;
}

export default AdminRoute;
