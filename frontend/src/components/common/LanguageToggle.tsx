import { useLanguage } from "hooks";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

const LanguageToggle = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "he", label: "עברית" },
  ];

  return (
    <div
      className={clsx(
        "absolute top-4 sm:top-6 z-50",
        isRtl() ? "right-4" : "left-4"
      )}
    >
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded-md bg-white shadow hover:bg-gray-50 transition"
        >
          🌐 {selectedLanguage.toUpperCase()}
          <ChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <div
            className={clsx(
              "absolute mt-2 w-28 rounded-md shadow-lg bg-white border border-gray-200",
              isRtl() ? "flex-row-reverse text-right" : "flex-row text-left"
            )}
          >
            <ul className="py-1 text-sm text-gray-700">
              {languages.map(({ code, label }) => (
                <li
                  key={code}
                  onClick={() => {
                    changeLanguage(code);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "px-4 py-2 cursor-pointer hover:bg-gray-100",
                    code === selectedLanguage && "font-semibold text-primary"
                  )}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default LanguageToggle;
