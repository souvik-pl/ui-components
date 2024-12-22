import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {
  const user = localStorage.getItem("user");
  return user === "maverick" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
}

export default GuestRoute;
