import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const login = (userData) => {
    // console.log('Logging in user:', userData);
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

export const useAuth = () => {
  return useContext(AuthContext);
};
