import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../../configs/axiosConfig";
import OrdersCard from "./OrdersCard";

const OrdersTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const orders = await Axios.get("/api/store/getOrders/").then((res) => {
        setData(res.data);
      });
    };
    getOrders();
  }, []);
  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-9 w-full border-t-[1px] border-b-[4px] h-[75px]">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] m-auto rounded-lg bg-[#A8A8A8]"
        />
        <p className="text-[1.5rem] my-auto capitalize text-[#707070]">ID</p>
        <h4 className="my-auto uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]  text-[#707070] col-start-3 col-end-5">
          Customer Name
        </h4>
        <h4 className="my-auto ml-[-100px] text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] uppercase text-[#707070] col-start-5 col-end-7">
          Phone Number
        </h4>
        <h4 className="my-auto ml-[-200px] uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#707070] flex items-center">
          Status
        </h4>
        <h4 className="my-auto ml-[-200px] uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#707070] flex items-center">
          Products
        </h4>
        <h4 className="my-auto uppercase text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] text-[#707070] flex items-center">
          Total
        </h4>
      </div>

      {/* detail table */}
      {data.length > 0 && data.map((element) => <OrdersCard data={element} />)}
    </div>
  );
};

export default OrdersTable;
