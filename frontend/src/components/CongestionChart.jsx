import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function CongestionChart() {
  // Chart data
  const data = {
    labels: [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "10", "11", "12", "13", "14", "15", "16", "17", "18",
      "19", "20", "21", "22", "23"
    ],
    datasets: [
      {
        label: "Congestion Level",
        data: [
          10, 9, 15, 12, 10, 8, 14, 20, 25, 40, 
          50, 45, 35, 30, 55, 65, 70, 85, 60, 
          50, 40, 30, 20, 15
        ],
        backgroundColor: "#FF6B6B", // Color of the bars (red for congestion)
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
          text: "Hours of the Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Congestion Level (%)",
        },
        beginAtZero: true, // Start the y-axis at 0
        max: 100, // Set a maximum value for the congestion percentage
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default CongestionChart;
