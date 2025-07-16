import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store";
import { ROUTES } from "routes";

export default function HomeRedirect() {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    } else if (role === "admin") {
      navigate(ROUTES.ADMIN_SEARCH);
    } else if (role === "user") {
      navigate(ROUTES.WAITING_ROOM);
    }
  }, [isAuthenticated, role, navigate]);

  return null;
}
