import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ roles }) => {
  const { user, loading, role } = useAuth();

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700" /></div>;
  if (!user?.token) return <Navigate to="/login" replace />;
  if (!roles.includes(role)) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default RoleRoute;