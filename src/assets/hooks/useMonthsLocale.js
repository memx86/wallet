import useTranslation from "./useTranslation";

import monthsEn from "assets/locales/en/months-en";
import monthsUa from "assets/locales/ua/months-ua";
import LANGUAGES from "assets/constants/LANGUAGES";

const useMonthsLocale = () => {
  const { language } = useTranslation();
  const getMonthsNameLocale = (lang) => {
    switch (lang) {
      case LANGUAGES.EN:
        return monthsEn;
      case LANGUAGES.UA:
        return monthsUa;
      default:
        return monthsEn;
    }
  };
  return getMonthsNameLocale(language);
};
export default useMonthsLocale;
