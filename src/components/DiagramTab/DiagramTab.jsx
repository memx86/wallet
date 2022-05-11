import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionSummary } from "./../../redux/diagram/diagramThunk";
import Chart from "./Chart/Chart";
import Table from "./Table/Table";

import s from "./DiagramTab.module.scss";

const DiagramTab = () => {
  const dispatch = useDispatch();
  const { diagDate } = useSelector((state) => state.diagram);
  const { diagLoader } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTransactionSummary());
  }, [dispatch]);

  // console.log("state", diagDate);

  return (
    <div>
      DiagramTab
      {diagLoader ? (
        <h3>Loading...</h3>
      ) : (
        <div className={s.diagram}>
          <Chart date={diagDate} />
          <Table date={diagDate} />
        </div>
      )}
    </div>
  );
};
export default DiagramTab;
