import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/storeHooks";
import { ROUTES } from "../constants/routes";

interface Props {
  allowedRoles: Array<"user" | "admin">;
  children: JSX.Element;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !role || !allowedRoles.includes(role))
    return <Navigate to={ROUTES.ACCESS_DENIED} replace />;

  return children;
}
