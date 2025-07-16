import ErrorPageTemplate from "utils/errorsHandler/ErrorPageTemplate";
import { ROUTES } from "routes/routes";

export default function AccessDenied() {
  return (
    <ErrorPageTemplate
      title="Access Denied"
      description="Looks like you're out of key..."
      imageSrc="/access-denied-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
