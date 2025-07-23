import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "store";
import { ROUTES } from "routes";
import type { UserRole } from "types";

interface Props {
  allowedRoles: Array<UserRole>;
  children: JSX.Element;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !role || !allowedRoles.includes(role))
    return <Navigate to={ROUTES.ACCESS_DENIED} replace />;

  return children;
}
