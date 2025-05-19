import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, user } = useContext(AuthContext);

  if (user?.role != 'admin') return <Navigate to="/" />;
  //   if (!isAdmin) return <Navigate to="/unauthorized" />;

  return children;
}

export default AdminRoute;
