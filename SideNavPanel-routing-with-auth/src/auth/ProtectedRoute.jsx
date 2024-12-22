import React from "react";
import Layout from "../Layout";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
  const user = localStorage.getItem("user");
  return user === "maverick" ? <Layout /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
