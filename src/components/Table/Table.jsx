import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "redux/diagram/diagramThunk";

import List from "components/List";
import Selectors from "components/Selectors";

const Table = ({ data, selectDate }) => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.diagram);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div>
      <Selectors transactions={transactions} selectDate={selectDate} />
      <List data={data} />
    </div>
  );
};

export default Table;
