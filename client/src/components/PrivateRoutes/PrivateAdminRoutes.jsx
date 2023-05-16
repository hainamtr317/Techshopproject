import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateAdminRoutes() {
  const { isAdminLogin, isLoading } = useSelector((state) => state.auth);
  if (isLoading) return <h1>loading</h1>;
  if (!isAdminLogin || !localStorage.getItem("authAdminToken")) {
    return <Navigate replace to="/auth/login" />;
  }
  return <Outlet />;
}

export default PrivateAdminRoutes;
