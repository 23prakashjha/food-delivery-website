import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // optional loading state

  // Show a loading spinner if auth state is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in → redirect to login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render protected content
  return <Outlet />;
};

export default ProtectedRoute;

