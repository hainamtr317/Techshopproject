import React from "react";
import OrdersProductDropList from "../OrdersPage/OrdersProductDropList";

function HistoryCard({ data }) {
  return (
    <div
      className="grid grid-cols-9 w-full border-b-[1px] h-[75px]"
      key={data.id}
    >
      <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] my-auto capitalize text-[#0066b2] ml-10">
        {data?.id.slice(2, 8)}
      </p>
      <div className="my-auto text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#002D62] font-bold flex items-center col-start-3 col-end-5">
        {data.email}
      </div>
      <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2] col-start-5 col-end-7">
        {data.phone}
      </h4>
      <h4 className="my-auto capitalize text-[0.7rem] text-[#0066b2] flex items-center">
        <OrdersProductDropList options={data.products} />
      </h4>
      <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
        $ {data.totalSales}
      </h4>
    </div>
  );
}

export default HistoryCard;
