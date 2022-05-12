import { useState } from "react";

import { month, years } from "assets/constants/MONTHS-YEARS";
import spriteSvg from "assets/images/sprite.svg";

import s from "./Selectors.module.scss";
const Selectors = () => {
  const [selectMonth, setSelectMonth] = useState("Month");
  const [selectYear, setSelectYear] = useState("Year");
  const [activeMonth, setIsActiveMonth] = useState(false);
  const [activeYear, setIsActiveYear] = useState(false);

  return (
    <div className={s.selectors}>
      <div className={s.select_box}>
        {activeMonth && (
          <div className={s.active}>
            {month.map((el) => (
              <div
                key={el}
                className={s.item}
                onClick={() => {
                  setSelectMonth(el);
                  setIsActiveMonth(false);
                }}
              >
                {el}
              </div>
            ))}
          </div>
        )}
        <div
          className={s.selected}
          onClick={() => setIsActiveMonth(!activeMonth)}
        >
          <b>{selectMonth}</b>
          <svg className={s.icon}>
            <use href={`${spriteSvg}#icon-down-arrow`}></use>
          </svg>
        </div>
      </div>
      <div className={s.select_box}>
        {activeYear && (
          <div className={s.active}>
            {years.map((el) => (
              <div
                key={el}
                className={s.item}
                onClick={() => {
                  setSelectYear(el);
                  setIsActiveYear(false);
                }}
              >
                {el}
              </div>
            ))}
          </div>
        )}
        <div
          className={s.selected}
          onClick={() => setIsActiveYear(!activeYear)}
        >
          <b>{selectYear}</b>
          <svg className={s.icon}>
            <use href={`${spriteSvg}#icon-down-arrow`}></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Selectors;
