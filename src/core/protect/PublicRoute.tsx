import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
