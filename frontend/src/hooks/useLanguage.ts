import { useState } from "react";
import i18n from "i18n";

const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  };

  const toggleLanguage = () => {
    changeLanguage(selectedLanguage === "he" ? "en" : "he");
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    changeLanguage,
    toggleLanguage,
  };
};

export default useLanguage;
