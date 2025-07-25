import { ErrorPageTemplate } from "utils";
import { ROUTES } from "routes";
import { useTranslation } from "react-i18next";

const AccessDenied = () => {
  const { t } = useTranslation();

  return (
    <ErrorPageTemplate
      title={t("accessDenied.title")}
      description={t("accessDenied.description")}
      imageSrc="/access-denied-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
};

export default AccessDenied;
