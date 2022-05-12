import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import sprite from "assets/images/sprite.svg";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
// import s from "./Navigation.module.scss";

const Navigation = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return (
    <ul>
      <li>
        <NavLink to="/home" aria-label="Home">
          <svg width="38" height="38">
            <use href={`${sprite}#home`}></use>
          </svg>
          {!isMobile && "Home"}
        </NavLink>
        <NavLink to="/diagram" aria-label="Diagram">
          <svg width="38" height="38">
            <use href={`${sprite}#diagram`}></use>
          </svg>
          {!isMobile && "Diagram"}
        </NavLink>
        <NavLink to="/currency" aria-label="Currency">
          <svg width="38" height="38">
            <use href={`${sprite}#currency`}></use>
          </svg>
          {!isMobile && "Currency"}
        </NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
