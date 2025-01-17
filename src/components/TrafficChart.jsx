import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function TrafficChart() {
  // Chart data
  const data = {
    labels: [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "10", "11", "12", "13", "14", "15", "16", "17", "18",
      "19", "20", "21", "22", "23"
    ],
    datasets: [
      {
        label: "Traffic Per Hour",
        data: [
          46, 43, 50, 45, 43, 43, 49, 58, 78, 128, 
          137, 102, 81, 96, 139, 148, 156, 169, 138, 
          107, 85, 79, 68, 59
        ],
        backgroundColor: "#30C8DC", // Color of the bars
        borderRadius: 4, // Rounded bar corners
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Last 24 Hours", // Title text
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours",
        },
      },
      y: {
        title: {
          display: true,
          text: "Traffic",
        },
        beginAtZero: true, // Start the y-axis at 0
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default TrafficChart;
