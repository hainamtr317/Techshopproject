import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Interaction,
} from "chart.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearlyOrders } from "../../features/admin/dashboardSlice";
ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
);
function LineChartUpdate() {
  const dispatch = useDispatch();
  const [dataType, setDataType] = useState("");
  const { isUnitMode, isRevenueMode, isLineChartLoading, lineChartData } =
    useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getYearlyOrders());
  }, []);
  useEffect(() => {
    if (isUnitMode) {
      setDataType("numberOfSales");
    }
    if (isRevenueMode) {
      setDataType("totalRevenue");
    }
  }, [isUnitMode]);
  const data = {
    labels: Object.keys(lineChartData),
    datasets: [
      {
        label: "Sales Unit",
        data: Object.keys(lineChartData).map(
          (key) => lineChartData[key][dataType]
        ),
        fill: true,
        backgroundColor: "#42427D",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: false,
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };
  return !isLineChartLoading && <Line data={data} options={options} />;
}

export default LineChartUpdate;
