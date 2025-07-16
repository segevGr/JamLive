import { useNavigate } from "react-router-dom";
import FooterLogos from "components/FooterLogos";
import { usePageTitle } from "hooks/usePageTitle";

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
  buttonText = "Back to Home",
  redirectTo = "/",
}: ErrorPageProps) {
  usePageTitle(title);
  const navigate = useNavigate();

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
          {buttonText}
        </button>
      </div>

      <FooterLogos />
    </div>
  );
}
