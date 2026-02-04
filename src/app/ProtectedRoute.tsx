import type { JSX } from "react";
import { useAuth } from "./providers/AuthProvider";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[];
}

export const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuth, user } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  if (requiredRoles && !user?.roles.some(role => requiredRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};