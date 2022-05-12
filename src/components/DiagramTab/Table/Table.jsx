import { useState } from "react";
import "./Table.scss";
import spriteSvg from "assets/images/sprite.svg";
import { month, years } from "../../../assets/constants/MONTHS-YEARS";
import List from "../List/List";

const Table = ({ data }) => {
  const [selectMonth, setSelectMonth] = useState("Month");
  const [selectYear, setSelectYear] = useState("Year");
  const [activeMonth, setIsActiveMonth] = useState(false);
  const [activeYear, setIsActiveYear] = useState(false);

  return (
    <div>
      <div className="selectors">
        <div className="select_box">
          {activeMonth && (
            <div className="option_container active">
              {month.map((el) => (
                <div
                  key={el}
                  className="item"
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
            className="selected"
            onClick={(e) => setIsActiveMonth(!activeMonth)}
          >
            <b>{selectMonth}</b>
            <svg className="icon">
              <use href={`${spriteSvg}#icon-down-arrow`}></use>
            </svg>
          </div>
        </div>
        <div className="select_box">
          {activeYear && (
            <div className="option_container active">
              {years.map((el) => (
                <div
                  key={el}
                  className="item"
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
            className="selected"
            onClick={(e) => setIsActiveYear(!activeYear)}
          >
            <b>{selectYear}</b>
            <svg className="icon">
              <use href={`${spriteSvg}#icon-down-arrow`}></use>
            </svg>
          </div>
        </div>
      </div>
      <List data={data} />
    </div>
  );
};

export default Table;
