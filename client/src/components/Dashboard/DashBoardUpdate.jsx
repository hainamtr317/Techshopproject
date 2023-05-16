import React, { useEffect } from "react";
import { IoIosPaper } from "react-icons/io";
import { BsPiggyBank } from "react-icons/bs";
import LineChartUpdate from "./LineChartUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyOrders,
  getTotalOrdersAndNewlyAddedOrders,
  getYearlyOrders,
  toggleRevenueMode,
  toggleUnitMode,
} from "../../features/admin/dashboardSlice";
import SelectInput from "./SelectInput";

function DashBoardUpdate() {
  const dispatch = useDispatch();
  const { totalOrdersAndNewlyAddedOrders, isTotalOrdersAndNewlyAddedOrders } =
    useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getTotalOrdersAndNewlyAddedOrders());
  }, []);

  if (isTotalOrdersAndNewlyAddedOrders) {
    return 0;
  }

  const options_1 = [
    { value: "unit", label: "Unit", toggle: toggleUnitMode },
    { value: "revenue", label: "Revenue", toggle: toggleRevenueMode },
  ];
  const options_2 = [
    { value: "yearly", label: "Yearly", toggle: getYearlyOrders },
    { value: "monthly", label: "Monthly", toggle: getMonthlyOrders },
  ];
  return (
    <div className="dashboard-containers grid grid-cols-2 gap-x-10">
      <span className="h-[180px] bg-[#C7F2FF] rounded-tr-lg rounded-bl-lg rounded-tl-[25%] rounded-br-[25%] col-span-1">
        <div className="flex justify-evenly items-center h-full">
          <IoIosPaper className="text-7xl text-[#42427D] bg-white rounded-tr-sm rounded-bl-sm rounded-tl-[35%] rounded-br-[35%] p-2" />
          <div className="text-[#42427D]">
            <h3 className="text-3xl font-bold mx">
              {totalOrdersAndNewlyAddedOrders.totalOrders}
            </h3>
            <p className="text-xl font-semibold">Orders</p>
          </div>
          <span className=" rounded-tr-sm rounded-bl-sm rounded-tl-[35%] rounded-br-[35%] bg-[#42427D] p-2 font-semibold text-white relative bottom-3">
            +{totalOrdersAndNewlyAddedOrders.dailyOrders}
          </span>
        </div>
      </span>
      <span className="col-span-1  h-[180px] bg-[#FBE6EE] rounded-tl-lg rounded-br-lg rounded-tr-[25%] rounded-bl-[25%]">
        <div className="flex justify-evenly items-center h-full">
          <BsPiggyBank className="text-7xl text-[#42427D] bg-white rounded-tl-sm rounded-br-sm rounded-tr-[35%] rounded-bl-[35%] p-2" />
          <div className="text-[#42427D]">
            <h3 className="text-3xl font-bold">
              $ {totalOrdersAndNewlyAddedOrders.totalRevenue}
            </h3>
            <p className="text-xl font-semibold">Revenue</p>
          </div>
          <span className="rrounded-tl-sm rounded-br-sm rounded-tr-xl rounded-bl-xl bg-[#42427D] p-1 font-semibold text-white relative bottom-3">
            +$ {totalOrdersAndNewlyAddedOrders.totalDailyRevenue}
          </span>
        </div>
      </span>
      <section className="col-span-2 h-[470px] w-auto mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-[#414479] font-semibold text-xl">
            Sales Statistic
          </h1>
          <span className="flex gap-2">
            <SelectInput options={options_1} />
            <SelectInput options={options_2} />
          </span>
        </div>
        <LineChartUpdate />
      </section>
    </div>
  );
}

export default DashBoardUpdate;
