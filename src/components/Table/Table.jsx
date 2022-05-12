import List from "components/List";
import Selectors from "components/Selectors";

// import s from "./Table.module.scss";

const Table = ({ data }) => {
  return (
    <div>
      <Selectors />
      <List data={data} />
    </div>
  );
};

export default Table;
