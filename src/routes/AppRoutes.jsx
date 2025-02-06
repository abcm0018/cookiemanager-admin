import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../controlpanel/components";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
  const { status, user, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Loader />;
  }

  if (status === "not-authenticated") {
    return <PublicRoutes />;
  }

  if (user.role === "admin") {
    return <AdminRoutes />;
  }

  // Manejo de errores y fallback
  return <Navigate to="/auth/admin/login" replace />;
};
