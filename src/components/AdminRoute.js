import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = (props) => {
  const { admin, currentUser } = useAuth();

  return admin && currentUser ? <Route {...props} /> : <Navigate to="/" />;
};

export default AdminRoute;
