import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactions,
  getTransactionSummary,
} from "redux/diagram/diagramThunk";

import { colorsChange } from "assets/constants/COLORS";
import Chart from "components/Chart";
import Table from "components/Table";
import Loader from "components/Loader";

import s from "./DiagramTab.module.scss";

const DiagramTab = () => {
  const dispatch = useDispatch();
  const { diagData } = useSelector((state) => state.diagram);
  const { diagLoader } = useSelector((state) => state);
  const { transactions } = useSelector((state) => state.diagram);
  const [object, setObject] = useState({ month: 0, year: 0 });

  // console.log("diagData", diagData);

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
    setObject(obj);
  }

  useEffect(() => {
    dispatch(getTransactionSummary(object));
    dispatch(getTransactions());
  }, [dispatch, object]);

  return (
    <div>
      {diagLoader ? (
        <Loader />
      ) : (
        <>
          <h2>Statistic</h2>
          <div className={s.diagram}>
            <Chart data={changedData} />
            <Table
              data={changedData}
              selectDate={selectDate}
              transactions={transactions}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default DiagramTab;
