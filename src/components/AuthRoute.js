import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoute = (props) => {
  const { admin, currentUser } = useAuth();

  return admin || currentUser ? <Route {...props} /> : <Navigate to="/login" />;
};

export default AuthRoute;
