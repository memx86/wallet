import React from "react";
import { useTranslation } from "react-i18next";
import "./backend";
import s from "./LanguageSwitcher.module.scss";
import english from "../../assets/images/english.png";
import ukraine from "../../assets/images/ukrainian.png";

export default function LanguageSwitchers() {
  const { i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className={s.wrapBtn}>
      <button onClick={() => changeLanguage("en")} className={s.btn}>
        <img src={english} alt="" />
      </button>
      <button onClick={() => changeLanguage("ua")} className={s.btn}>
        <img src={ukraine} alt="" />
      </button>
    </div>
  );
}
