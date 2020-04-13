import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";

function LineChart(props) {
  const chartConfig = {
    type: "line",
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "month",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
            },
          },
        ],
      },
    },
    data: {
      labels: props.data.map((d) => d.fecha),
      datasets: [
        {
          label: props.title,
          data: props.data.map((d) => d.peso),
          fill: "none",
          backgroundColor: props.color,
          pointRadius: 2,
          borderColor: props.color,
          borderWidth: 1,
          lineTension: 0,
        },
      ],
    },
  };
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, chartConfig]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default LineChart;
