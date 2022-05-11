import { useState } from "react";
import "./Table.scss";
import spriteSvg from "components/image/sprite.svg";
import { month, yearsGenerate } from "./mon-years";
import List from "../List/List";

const Table = ({ date }) => {
  const [selectMonth, setSelectMonth] = useState("Month");
  const [selectYear, setSelectYear] = useState("Year");
  const [activeMonth, setIsActiveMonth] = useState(false);
  const [activeYear, setIsActiveYear] = useState(false);

  return (
    <div>
      <h3>Table</h3>
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
              {yearsGenerate(2020 - 10).map((el) => (
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
      <List date={date} />
    </div>
  );
};

export default Table;
