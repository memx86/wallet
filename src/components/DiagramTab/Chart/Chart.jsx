import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import s from "./Chart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({
  date: { categoriesSummary, incomeSummary, expenseSummary, periodTotal },
}) => {
  const amountCat = categoriesSummary?.map((item) => item.total);
  // console.log("amountCat", amountCat?.slice(1));
  const nameCat = categoriesSummary?.map((item) => item.name);
  //   console.log("categoriesSummary", categoriesSummary);

  const data = {
    // labels: nameCat?.slice(1),
    datasets: [
      {
        label: nameCat?.slice(1),
        data: amountCat?.slice(1),
        backgroundColor: [
          "red",
          "blue",
          "#ffd8d0",
          "#fd9498",
          "#c5baff",
          "#6e78e8",
          "#4a56e2",
          "#81e1ff",
          "#24cca7",
          "#3cac08",
          "#00ad84",
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className={s.chart}>
      <h3>Chart</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;
