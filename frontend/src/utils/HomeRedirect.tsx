import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store";
import { ROUTES } from "routes";

const HomeRedirect = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    } else if (role === "admin") {
      navigate(ROUTES.ADMIN_LOBBY);
    } else if (role === "user") {
      navigate(ROUTES.USER_LOBBY);
    }
  }, [isAuthenticated, role, navigate]);

  return null;
};

export default HomeRedirect;
