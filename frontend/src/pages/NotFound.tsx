import ErrorPage from "../components/ErrorPage";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <ErrorPage
      title="404 - Page Not Found"
      description="This page doesn’t exist in our harmony..."
      imageSrc="/not-found-graphic.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
