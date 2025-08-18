import { FooterLogos } from "components";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface FormPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  imageSrc?: string;
  bottomText?: string;
  bottomLinkText?: string;
  onBottomLinkClick?: () => void;
}

const FormPageLayout = ({
  title,
  subtitle,
  children,
  imageSrc,
  bottomText = " ",
  bottomLinkText,
  onBottomLinkClick,
}: FormPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row font-sans bg-background">
      <div className="w-full flex-1 md:w-1/2 flex flex-col md:justify-center items-center">
        <div
          className={clsx(
            "w-full max-w-sm mt-24",
            imageSrc ? "md:mt-0" : "md:mt-5"
          )}
        >
          <div className="flex flex-col self-start md:self-center md:ml-0">
            <h1 className="text-xl md:text-3xl text-accent mb-2">{subtitle}</h1>
            <h2 className="text-5xl md:text-7xl font-semibold text-primary mb-10">
              {title}
            </h2>
          </div>

          {children}

          {bottomText && bottomLinkText && (
            <p className="text-center text-lg text-placeholderGray mt-6">
              {bottomText}{" "}
              <span
                onClick={onBottomLinkClick}
                className="text-primary font-semibold cursor-pointer"
              >
                {bottomLinkText}
              </span>
            </p>
          )}
        </div>

        <FooterLogos />
      </div>

      {imageSrc && (
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={imageSrc}
            alt="musicians"
            className="rounded-3xl shadow-xl object-cover w-full h-full max-w-[90%] max-h-[95%]"
          />
        </div>
      )}
    </div>
  );
};

export default FormPageLayout;
