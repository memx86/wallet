import { useTranslation } from "react-i18next";
import english from "assets/images/english.png";
import ukraine from "assets/images/ukrainian.png";
import "./backend";
import s from "./LanguageSwitcher.module.scss";

export default function LanguageSwitchers() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className={s.wrapBtn}>
      <button
        onClick={() => changeLanguage("en")}
        className={s.btn}
        aria-label={t("switcher.en")}
      >
        <img src={english} alt="" />
      </button>
      <button
        onClick={() => changeLanguage("ua")}
        className={s.btn}
        aria-label={t("switcher.ua")}
      >
        <img src={ukraine} alt="" />
      </button>
    </div>
  );
}
