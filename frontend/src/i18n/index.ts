import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./enTranslation.json";
import he from "./heTranslation.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  he: { translation: he },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("i18nextLng") || "en",
  fallbackLng: "en",
  load: "languageOnly",
  ns: [defaultNS],
  debug: false,
  interpolation: { escapeValue: false },
});

export default i18n;
