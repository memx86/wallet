import { useState } from "react";

import { colorsChange } from "assets/constants/COLORS";
import Chart from "components/Chart";
import Loader from "components/Loader";

import s from "./DiagramTab.module.scss";
import NewTable from "components/NewTable";
import Selectors from "components/Selectors";
import {
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
} from "redux/wallet";

const DiagramTab = () => {
  const [object, setObject] = useState({ month: 0, year: 0 });

  const { data: diagData, isLoading: diagLoader } =
    useGetTransactionsSummaryQuery(object);

  const { data: transactions } = useGetTransactionsQuery();

  function changeData(data, colorsObj) {
    if (!Object.keys(data || {})?.length) {
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

  const dataWithoutIncome =
    changedData?.categoriesSummary?.filter((item) => item.type !== "INCOME") ||
    [];

  return (
    <div>
      {diagLoader ? (
        <Loader />
      ) : (
        <>
          <h2>Statistic</h2>
          <div className={s.diagram}>
            <Chart data={changedData} />
            <div className={s.table}>
              <Selectors transactions={transactions} selectDate={selectDate} />
              <NewTable
                type="chart"
                data={dataWithoutIncome}
                selectDate={selectDate}
                transactions={transactions}
                income={changedData?.incomeSummary}
                expense={changedData?.expenseSummary}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default DiagramTab;
