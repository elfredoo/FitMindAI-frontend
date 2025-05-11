import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ publicPage = false }) {
  const { user } = useSelector((state) => state.auth);

  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
  return user ? <Outlet /> : <Navigate to="login" />;
}
