import sprite from "assets/images/sprite.svg";
// import s from "./Navigation.module.scss";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/home" aria-label="Home">
          <svg width="38" height="38">
            <use href={`${sprite}#home`}></use>
          </svg>
          Home
        </NavLink>
        <NavLink to="/diagram" aria-label="Diagram">
          Diagram
        </NavLink>
        <NavLink to="/currency" aria-label="Currency">
          Currency
        </NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
