import ErrorPage from "../components/ErrorPage";
import { ROUTES } from "../constants/routes";

export default function AccessDenied() {
  return (
    <ErrorPage
      title="Access Denied"
      description="Looks like you're out of key..."
      imageSrc="/access-denied-graphic.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
