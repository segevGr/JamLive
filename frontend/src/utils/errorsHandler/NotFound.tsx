import ErrorPageTemplate from "utils/errorsHandler/ErrorPageTemplate";
import { ROUTES } from "routes";

export default function NotFound() {
  return (
    <ErrorPageTemplate
      title="404 - Page Not Found"
      description="This page doesn’t exist in our harmony..."
      imageSrc="/not-found-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
