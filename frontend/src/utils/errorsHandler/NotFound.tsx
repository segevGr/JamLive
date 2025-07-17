import ErrorPageTemplate from "utils/errorsHandler/ErrorPageTemplate";
import { ROUTES } from "routes";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <ErrorPageTemplate
      title={t("notFound.title")}
      description={t("notFound.description")}
      imageSrc="/not-found-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
