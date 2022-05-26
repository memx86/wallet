import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import useTranslation from "assets/hooks/useTranslation";

import sprite from "assets/images/sprite.svg";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import s from "./Navigation.module.scss";

const Navigation = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { t } = useTranslation("navigation");
  return (
    <ul className={s.list}>
      <li>
        <NavLink
          to="/home"
          aria-label={t.home}
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          <svg width="38" height="38" className={s.icon}>
            <use href={`${sprite}#home`}></use>
          </svg>
          {!isMobile && t.home}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/diagram"
          aria-label={t.diagram}
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          <svg width="38" height="38" className={s.icon}>
            <use href={`${sprite}#diagram`}></use>
          </svg>
          {!isMobile && t.diagram}
        </NavLink>
      </li>
      <li>
        {isMobile && (
          <NavLink
            to="/currency"
            aria-label={t.currency}
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            <svg width="38" height="38" className={s.icon}>
              <use href={`${sprite}#currency`}></use>
            </svg>
            {!isMobile && t.currency}
          </NavLink>
        )}
      </li>
    </ul>
  );
};
export default Navigation;
