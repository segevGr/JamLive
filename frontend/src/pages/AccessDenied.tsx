import ErrorPage from "../components/ErrorPage";
import { ROUTES } from "../routes/routes";

export default function AccessDenied() {
  return (
    <ErrorPage
      title="Access Denied"
      description="Looks like you're out of key..."
      imageSrc="/access-denied-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
