import { useSession } from "@/context/SessionContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isLoggedIn } = useSession();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
