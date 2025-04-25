import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;