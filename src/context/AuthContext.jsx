import { createContext, useContext, useState, useEffect } from 'react';
// import { getUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const login = (userData) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ This is where the `useAuth` hook is exported.
export const useAuth = () => {
  return useContext(AuthContext);
};
