import React from "react";
import Chart from "chart.js";

export default function CardLineChart({id}) {
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

        datasets: [
          {
            label: "Today",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [20, 35, 25, 10, 30, 40, 45],

            fill: false,
          },
          {
            label: "All Reservations",
            fill: false,
            backgroundColor: "#edf2f7",
            borderColor: "#edf2f7",
            data: [10, 30, 45, 37, 28, 20, 43],

          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
                beginAtZero: true, // Set this to true
        max: 50,
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col m-auto  break-words  shadow-lg rounded bg-blueGray-700">
        <div className="p-4  flex-auto h-80  border">
          {/* Chart */}
          <div className="relative h-full  ">
            <canvas id="line-chart" className=""></canvas>
          </div>
        </div>
      </div>
    </>
  );
}