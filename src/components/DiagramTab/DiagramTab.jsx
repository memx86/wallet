import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionSummary } from "redux/diagram/diagramThunk";

import { colorsChange } from "assets/constants/COLORS";
import Chart from "components/Chart";
import Table from "components/Table";

import s from "./DiagramTab.module.scss";

const DiagramTab = () => {
  const dispatch = useDispatch();
  const { diagData } = useSelector((state) => state.diagram);
  const { diagLoader } = useSelector((state) => state);

  function changeData(data, colorsObj) {
    if (!Object.keys(data).length) {
      return false;
    }
    return {
      ...data,
      categoriesSummary: data?.categoriesSummary.map((el) => {
        const colorKey = el.name.toLowerCase().replace(/ /g, "");
        return {
          ...el,
          color: colorsObj[colorKey],
        };
      }),
    };
  }

  const changedData = changeData(diagData, colorsChange);

  function selectDate(month, year) {
    const obj = { month: 0, year: 0 };
    if (!isNaN(month) && !isNaN(year)) {
      obj.month = month;
      obj.year = year;
    }

    return obj;
  }

  useEffect(() => {
    dispatch(getTransactionSummary(selectDate()));
  }, [dispatch]);

  return (
    <div>
      DiagramTab
      {diagLoader ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h2>Statistic</h2>
          <div className={s.diagram}>
            <Chart data={changedData} />
            <Table data={changedData} selectDate={selectDate} />
          </div>
        </>
      )}
    </div>
  );
};
export default DiagramTab;
