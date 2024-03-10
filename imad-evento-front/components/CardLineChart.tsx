import React, { useEffect, useState } from "react";
import Chart from "chart.js";

const CardLineChart = ({ id }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStatusData(id);
  }, [id]);

  useEffect(() => {
    if (stats) {
      createChart();
    }
  }, [stats]);

  const fetchStatusData = async (eventId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/GetStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event status");
      }

      const data = await response.json();
      setStats(data.status);
    } catch (error) {
      console.error("Error fetching event status:", error.message);
    }
  };

  const createChart = () => {
    const config = {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "All reservations",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [stats.monday, stats.tuesday, stats.wednesday, stats.thursday, stats.friday, stats.saturday, stats.sunday],
            fill: false,
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
    const ctx = document.getElementById("line-chart").getContext("2d");

    if (window.myLine) {
      window.myLine.destroy();
    }

    window.myLine = new Chart(ctx, config);
  };

  return (
    <div className="relative flex flex-col m-auto break-words shadow-lg rounded bg-blueGray-700">
      <div className="p-4 flex-auto h-80 border">
        <div className="relative h-full">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default CardLineChart;