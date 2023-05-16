import React from "react";
import SlidebarShade from "../../components/SlidebarShade";

import OrderStatus from "../../components/OrdersPage/OrderStatus";
import OrdersTable from "../../components/OrdersPage/OrdersTable";
function OrdersPage() {
  return (
    <main className="ml-28 w-full h-full">
      <SlidebarShade />
      <h1 className="text-4xl mt-5 text-[#414479] font-bold">Orders</h1>
      <OrderStatus />
      <OrdersTable />
    </main>
  );
}

export default OrdersPage;
