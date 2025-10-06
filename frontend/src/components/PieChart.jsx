import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Prepare labels and values from data
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Category-wise Spending",
        data: values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB", 
          "#FFCE56", 
          "#4BC0C0", 
          "#9966FF", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: 'rgb(252, 252, 252)',
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw}`,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;