import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionSummary } from "./../../redux/diagram/diagramThunk";

import { colorsArray, colorsChange } from "assets/constants/COLORS";
import Chart from "../Chart/Chart";
import Table from "../Table/Table";

import s from "./DiagramTab.module.scss";

const DiagramTab = () => {
  const dispatch = useDispatch();
  const { diagData } = useSelector((state) => state.diagram);
  const { diagLoader } = useSelector((state) => state);
  // console.log(Boolean({}));

  let person = {
    name: "John Doe",
    age: 35,
  };

  person.occupation = "Web Designer";

  function changeData(data, colorsObj) {
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

  // console.log(
  //   "changedData(diagData, colorsChange)",
  //   changedData(diagData, colorsChange)
  // );

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
          <Chart data={changedData} />
          <Table data={changedData} />
        </div>
      )}
    </div>
  );
};
export default DiagramTab;
