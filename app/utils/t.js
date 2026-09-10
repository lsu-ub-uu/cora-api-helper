import { getLanguage } from "./searchParams.js";
import { getTranslations } from "./translations.js";

export default function t(key) {
  const lang = getLanguage();

  return getTranslations()[key]?.[lang] ?? key;
}
