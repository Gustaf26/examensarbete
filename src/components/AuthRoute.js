import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoute = (props) => {
  const { admin } = useAuth();

  return admin ? <Route {...props} /> : <Navigate to="/login" />;
};

export default AuthRoute;
