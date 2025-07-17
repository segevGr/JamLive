import "i18next";
import { resources, defaultNS } from "./index";

type TranslationResources = (typeof resources)["en"];

declare module "i18next" {
  interface CustomTypeOptions {
    resources: TranslationResources;
    defaultNS: typeof defaultNS;
  }
}
