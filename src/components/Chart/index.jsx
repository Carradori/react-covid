import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";
import styles from "./chart.module.css";

export default function Chart({
  data: { confirmed, recovered, deaths },
  country,
}) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      setDailyData(await fetchDailyData());
    }
    fetchApi();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infectados",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Mortes",
            backgroundColor: "rgba(255,0,0,.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infectados", "Recuperados", "Mortes"],
        datasets: [
          {
            label: "Pessoas",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Situação atual no ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
}
