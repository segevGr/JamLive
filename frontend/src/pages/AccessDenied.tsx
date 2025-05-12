import { useNavigate } from "react-router-dom";
import FooterLogos from "../components/FooterLogos";
import { usePageTitle } from "../hooks/usePageTitle";
import { ROUTES } from "../constants/routes";
export default function AccessDenied() {
  usePageTitle("Access Denied");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:justify-center items-center bg-background text-textPrimary font-sans relative px-6">
      <div className="flex flex-col items-center text-center mt-10 lg:mt-0">
        <p className="text-xl text-gold italic">
          Looks like you're out of key...
        </p>

        <h1 className="text-6xl font-bold text-primary ">Access Denied</h1>

        <img
          src="/access-denied-graphic.png"
          alt="access denied"
          className="w-80 max-w-full my-8"
        />

        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="bg-primary text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-primaryLight transition"
        >
          Back to Home
        </button>
      </div>

      <FooterLogos />
    </div>
  );
}
