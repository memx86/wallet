import List from "components/List";
import Selectors from "components/Selectors";

const Table = ({ data, selectDate, transactions }) => {
  return (
    <div>
      <Selectors transactions={transactions} selectDate={selectDate} />
      <List data={data} />
    </div>
  );
};

export default Table;
