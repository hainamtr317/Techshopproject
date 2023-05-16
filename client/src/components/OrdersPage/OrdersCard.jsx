import React from "react";
import OrdersProductDropList from "./OrdersProductDropList";

function OrdersCard({ data }) {
  return (
    <div
      className="grid grid-cols-8 w-full border-b-[1px] h-[75px]"
      key={data.id}
    >
      <input
        type="checkbox"
        className="w-[30px] h-[30px] m-auto rounded-2x bg-[#A8A8A8]"
      />
      <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] my-auto capitalize text-[#0066b2]">
        {data?.id.slice(2, 8)}
      </p>
      <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#002D62] font-bold flex items-center col-start-3 col-end-5">
        <img
          src="https://images.unsplash.com/photo-1683115763606-43dd57a47712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt="avata"
          className="h-[40px] w-[40px] rounded-full mr-3 hidden sm:hidden md:block lg:block"
        />
        {data.firstName + " " + data.lastName}
      </div>
      <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]zz">
        {data.phone}
      </h4>
      <div className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2] flex items-center">
        <span className="text-[#00563B] bg-[#17B169] p-2 rounded-xl font-bold">
          {data.status}
        </span>
      </div>
      <h4 className="my-auto capitalize text-[0.7rem] text-[#0066b2] flex items-center">
        <OrdersProductDropList options={data.products} />
      </h4>
      <h4 className="my-auto capitalize text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#0066b2]">
        $ {data.totalSales}
      </h4>
    </div>
  );
}

export default OrdersCard;
