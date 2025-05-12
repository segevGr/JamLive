import FooterLogos from "./FooterLogos";

interface AuthFormLayoutProps {
  title: string;
  formContent: React.ReactNode;
  bottomText: React.ReactNode;
  imageSrc: string;
  successMessage?: string;
  isAdmin?: boolean;
}

export default function AuthFormLayout({
  title,
  formContent,
  bottomText,
  imageSrc,
  successMessage,
  isAdmin = false,
}: AuthFormLayoutProps) {
  return (
    <div className="relative flex h-screen font-sans bg-background">
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <FooterLogos />

        <h1 className="text-3xl text-gold mb-2 text-center">
          Welcome to JaMoveo
        </h1>
        {isAdmin && (
          <p className="text-sm text-primary font-medium uppercase tracking-wide">
            Admin Registration
          </p>
        )}

        <h2 className="text-7xl font-bold text-primary mb-10 text-center">
          {title}
        </h2>

        <div className="space-y-6 w-full max-w-sm">{formContent}</div>

        <div className="text-sm mt-4 text-placeholderGray text-center">
          {bottomText}
        </div>
        {successMessage && (
          <div className="bg-green-100 text-primary px-4 py-2 rounded-md text-center font-medium mt-5">
            {successMessage}
          </div>
        )}
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
