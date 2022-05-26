import useTranslation from "./useTranslation";

import LANGUAGES from "assets/constants/LANGUAGES";

const useDatePickerLocale = () => {
  const { language } = useTranslation();
  const getDatePickerLocale = (lang) => {
    switch (lang) {
      case LANGUAGES.EN:
        return "en-US";
      case LANGUAGES.UA:
        return "uk-UA";
      default:
        return "en-US";
    }
  };
  return getDatePickerLocale(language);
};
export default useDatePickerLocale;
