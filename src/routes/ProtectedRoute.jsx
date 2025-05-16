import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Check if the user is authenticated and has a role of "admin" or "user"
  if ( (user?.role === 'admin' || user?.role === 'user')) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default ProtectedRoute;
