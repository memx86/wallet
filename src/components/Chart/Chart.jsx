import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { colorsArray, colorsChange } from "assets/constants/COLORS";
import s from "./Chart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({
  data: { categoriesSummary, incomeSummary, expenseSummary, periodTotal },
}) => {
  const amountCat = categoriesSummary?.map((item) => item.total);
  const nameCat = categoriesSummary?.map((item) => item.name);

  // console.log("categoriesSummary", categoriesSummary);

  // console.log("colorsArray", colorsArray);
  // console.log("amountCat", amountCat);

  const data = {
    datasets: [
      {
        label: nameCat?.slice(1),
        data: amountCat ? amountCat?.slice(1) : [1],
        backgroundColor: colorsArray,
        borderWidth: 0,
      },
    ],
  };
  return (
    <>
      <div className={s.chart}>
        <Doughnut data={data} />
        <b className={s.amount}>
          &#163;{periodTotal ? Math.abs(periodTotal) : "--"}
        </b>
      </div>
    </>
  );
};

export default Chart;
