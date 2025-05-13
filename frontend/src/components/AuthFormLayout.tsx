import FooterLogos from "./FooterLogos";

interface AuthFormLayoutProps {
  title: string;
  formContent: React.ReactNode;
  imageSrc: string;
  isAdmin?: boolean;
  buttonText?: string;
  isDisabled?: boolean;
  bottomText?: string;
  bottomLinkText?: string;
  onBottomLinkClick?: () => void;
}

export default function AuthFormLayout({
  title,
  formContent,
  bottomText,
  bottomLinkText,
  onBottomLinkClick,
  imageSrc,
  isAdmin = false,
  buttonText,
  isDisabled = false,
}: AuthFormLayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row font-sans bg-background">
      <div className="w-full flex-1 md:w-1/2 flex flex-col md:justify-center items-center">
        <img
          src="/jamoveo-logo.png"
          alt="Jamoveo Logo"
          className="block md:hidden w-64 h-28 object-cover mx-auto self-start ml-0 mb-3"
        />
        <div className="w-full max-w-sm">
          <div className="flex flex-col self-start md:self-center md:ml-0">
            <h1 className="text-xl md:text-3xl text-gold mb-2">
              Welcome to JaMoveo
            </h1>
            {isAdmin && (
              <p className="text-sm text-primary font-medium uppercase tracking-wide">
                Admin Registration
              </p>
            )}

            <h2 className="text-5xl md:text-7xl font-semibold text-primary mb-10">
              {title}
            </h2>
          </div>
          <div className="space-y-6">
            {formContent}
            {buttonText && (
              <button
                type="submit"
                disabled={isDisabled}
                className={`text-xl font-semibold px-4 py-5 md:py-3 rounded-2xl w-full transition ${
                  isDisabled
                    ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                    : "bg-primaryLight hover:bg-primary text-textOnDark opacity-100 cursor-pointer"
                }`}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>

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
        <FooterLogos />
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src={imageSrc}
          alt="musicians"
          className="rounded-3xl shadow-xl object-cover w-full h-full max-w-[90%] max-h-[95%]"
        />
      </div>
    </div>
  );
}
