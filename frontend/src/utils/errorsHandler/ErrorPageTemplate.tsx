import { useNavigate } from "react-router-dom";
import { FooterLogos } from "components";
import { usePageTitle } from "hooks";
import { useTranslation } from "react-i18next";

interface ErrorPageProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  redirectTo?: string;
}

export default function ErrorPageTemplate({
  title,
  description,
  imageSrc,
  buttonText,
  redirectTo = "/",
}: ErrorPageProps) {
  const { t } = useTranslation();
  usePageTitle(title);
  const navigate = useNavigate();

  const fallbackButtonText = buttonText || t("errorPage.backButton");

  return (
    <div className="min-h-screen flex flex-col md:justify-center items-center bg-background text-textPrimary font-sans relative px-6">
      <div className="flex flex-col items-center text-center mt-10 lg:mt-0">
        <p className="text-xl text-accent italic">{description}</p>

        <h1 className="text-6xl font-bold text-primary">{title}</h1>

        <img
          src={imageSrc}
          alt={title}
          className="w-[22rem] max-w-full my-8 md:w-[28rem] lg:w-[32rem]"
        />

        <button
          onClick={() => navigate(redirectTo)}
          className="bg-primary text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-primaryLight transition"
        >
          {fallbackButtonText}
        </button>
      </div>

      <FooterLogos />
    </div>
  );
}
