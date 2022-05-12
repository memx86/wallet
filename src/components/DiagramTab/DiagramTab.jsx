import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionSummary } from "./../../redux/diagram/diagramThunk";

import { colorsArray, colorsChange } from "assets/constants/COLORS";
import Chart from "./Chart/Chart";
import Table from "./Table/Table";

import s from "./DiagramTab.module.scss";

const DiagramTab = () => {
  const dispatch = useDispatch();
  const { diagData } = useSelector((state) => state.diagram);
  const { diagLoader } = useSelector((state) => state);

  function changedData(data, colorsObj) {
    // const test = Data.categoriesSummary.map((el) => {});
    const test = data;
    return test;
  }

  console.log("diagData", changedData(diagData, colorsChange));

  useEffect(() => {
    dispatch(getTransactionSummary());
  }, [dispatch]);

  return (
    <div>
      DiagramTab
      {diagLoader ? (
        <h3>Loading...</h3>
      ) : (
        <div className={s.diagram}>
          <Chart data={diagData} />
          <Table data={diagData} />
        </div>
      )}
    </div>
  );
};
export default DiagramTab;
