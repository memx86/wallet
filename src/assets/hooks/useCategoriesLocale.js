import { useSelector } from "react-redux";

import { categoriesSelector } from "redux/categories";

import useTranslation from "./useTranslation";

import categoriesIdEn from "assets/locales/en/categoriesId-en";
import categoriesIdUa from "assets/locales/ua/categoriesId-ua";
import categoriesNameEn from "assets/locales/en/categoriesName-en";
import categoriesNameUa from "assets/locales/ua/categoriesName-ua";
import LANGUAGES from "assets/constants/LANGUAGES";

export const TYPES = {
  FULL: "full",
  NAME: "name",
};

const useCategoriesLocale = (type = TYPES.FULL) => {
  const { language } = useTranslation();
  const actualCategories = useSelector(categoriesSelector) || categoriesIdEn;

  const getCategoriesFullLocale = (lang) => {
    switch (lang) {
      case LANGUAGES.EN:
        return actualCategories;
      case LANGUAGES.UA:
        return categoriesIdUa;
      default:
        return actualCategories;
    }
  };

  const getCategoriesNameLocale = (lang) => {
    switch (lang) {
      case LANGUAGES.EN:
        return categoriesNameEn;
      case LANGUAGES.UA:
        return categoriesNameUa;
      default:
        return categoriesNameEn;
    }
  };

  switch (type) {
    case TYPES.FULL:
      return getCategoriesFullLocale(language);
    case TYPES.NAME:
      return getCategoriesNameLocale(language);
    default:
      return getCategoriesFullLocale(language);
  }
};
export default useCategoriesLocale;
