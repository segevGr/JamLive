import { ErrorPageTemplate } from "utils";
import { ROUTES } from "routes";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <ErrorPageTemplate
      title={t("notFound.title")}
      description={t("notFound.description")}
      imageSrc="/not-found-img.png"
      redirectTo={ROUTES.HOME}
    />
  );
};

export default NotFound;
