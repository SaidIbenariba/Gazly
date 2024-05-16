import React, { useEffect, useRef } from "react";
import LineChart from "../../components/Charts/SparkLine";
import SparkLine from "../../components/Charts/SparkLine";
import Line from "../../pages/Charts/Line";
const Dashboard = () => {
  const chartRef = useRef(null);

  // Sample data for demonstration
  const gasData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Gas Measurements",
        data: [15, 20, 18, 25, 22, 28],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // const options = {
  //   scales: {
  //     x: {
  //       type: "category",
  //       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //     },
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chartInstance.destroy();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Gas Measurements Dashboard</h1>
      <div className="max-w-lg">
        {/* <Line ref={chartRef} data={gasData} /> */}
        <Line />
      </div>
    </div>
  );
};

export default Dashboard;
