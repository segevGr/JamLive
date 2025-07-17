import ErrorPageTemplate from "utils/errorsHandler/ErrorPageTemplate";
import { ROUTES } from "routes";
import { useTranslation } from "react-i18next";

export default function AccessDenied() {
  const { t } = useTranslation();

  return (
    <ErrorPageTemplate
      title={t("accessDenied.title")}
      description={t("accessDenied.description")}
      imageSrc="/access-denied-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
}
