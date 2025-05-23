import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({
  publicPage = false,
  sellerPage = false,
}) {
  const { user } = useSelector((state) => state.auth);

  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
  if (sellerPage) {
    return user.roles.includes("ROLE_SELLER") ? (
      <Outlet />
    ) : (
      <Navigate to="/profile" />
    );
  }
  return user ? <Outlet /> : <Navigate to="login" />;
}
