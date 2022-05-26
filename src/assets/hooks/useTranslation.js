import { useSelector } from "react-redux";

import { languageSelector } from "redux/locale";

import translationEn from "assets/locales/en/translation.json";
import translationUa from "assets/locales/ua/translation.json";
import LANGUAGES from "assets/constants/LANGUAGES";

const useTranslation = (key) => {
  const language = useSelector(languageSelector);
  let translation;
  switch (language) {
    case LANGUAGES.EN:
      translation = translationEn;
      break;
    case LANGUAGES.UA:
      translation = translationUa;
      break;
    default:
      translation = translationEn;
  }
  const t = key ? translation[key] : translation;
  return {
    language,
    t,
  };
};
export default useTranslation;
