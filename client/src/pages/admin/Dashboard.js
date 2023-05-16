import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardPopularItemCard from "../../components/Dashboard/DashboardPopularItemCard";
import DashBoardUpdate from "../../components/Dashboard/DashBoardUpdate";
import SlidebarShade from "../../components/SlidebarShade";
import { getTopSaleNumbers } from "../../features/admin/dashboardSlice";
export const Dashboard = () => {
  const dispatch = useDispatch();
  const { isTopSaleLoading, topSellingList } = useSelector(
    (state) => state.dashboard
  );
  useEffect(() => {
    dispatch(getTopSaleNumbers());
  }, [dispatch]);

  return (
    <div className="ml-28 w-full h-full">
      <SlidebarShade />
      <h1 className="text-4xl mt-5 text-[#414479] font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5 mt-5 gap-x-20">
        <section className="col-span-3 md:col-span-2">
          <DashBoardUpdate />
        </section>
        <section className="row-span-2 col-span-3 md:col-span-1 mr-5 mb-5">
          <h1 className="text-[#414479] font-semibold text-xl">
            Top selling products
          </h1>
          <ul className="flex flex-col gap-3 mt-3">
            {!isTopSaleLoading &&
              topSellingList.map((item, i) => (
                <DashboardPopularItemCard data={item} index={i} />
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
