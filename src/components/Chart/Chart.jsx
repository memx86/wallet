import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import s from "./Chart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data: { categoriesSummary, periodTotal } }) => {
  const amountCat = categoriesSummary?.map((item) => item.total);
  const nameCat = categoriesSummary?.map((item) => item.name);
  const colorCat = categoriesSummary?.map((item) => item.color);

  const data = {
    datasets: [
      {
        // label: nameCat?.slice(1),
        id: nameCat?.slice(1),
        data: amountCat ? amountCat?.slice(1) : [1],
        backgroundColor: colorCat?.slice(1),
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
