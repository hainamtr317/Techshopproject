import React from "react";
import { BsEnvelopePaperFill } from "react-icons/bs";
import {
  AiFillCheckSquare,
  AiFillCloseSquare,
  AiFillContacts,
} from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../../configs/axiosConfig";
function OrderStatus() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const orders = await Axios.get("/api/store/getOrders/").then((res) => {
        setData(res.data);
      });
    };
    getOrders();
  }, []);
  console.log(data);
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-[#414479]">
      <span className="flex justify-between shadow-lg md:w-[300px] h-[120px] items-center px-6 rounded-lg ">
        <div className="">
          <h2 className="font-semibold text-4xl">{data.length}</h2>
          <p className="text-gray-500  text-xl"> Orders</p>
        </div>
        <BsEnvelopePaperFill className="text-6xl text-yellow-500 bg-yellow-500 bg-opacity-20 p-3 rounded-lg" />
      </span>
    </div>
  );
}

export default OrderStatus;
