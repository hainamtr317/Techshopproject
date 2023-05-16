import React from "react";
import { BsEnvelopePaperFill } from "react-icons/bs";
import {
  AiFillCheckSquare,
  AiFillCloseSquare,
  AiFillContacts,
} from "react-icons/ai";
function OrderStatus() {
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-[#414479]">
      <span className="flex justify-between shadow-lg md:w-[300px] h-[120px] items-center px-6 rounded-lg ">
        <div className="">
          <h2 className="font-semibold text-4xl">2,403</h2>
          <p className="text-gray-500 text-sm">New Orders</p>
          <p className="text-gray-500 text-sm">in this week</p>
        </div>
        <BsEnvelopePaperFill className="text-6xl text-yellow-500 bg-yellow-500 bg-opacity-20 p-3 rounded-lg" />
      </span>
      <span className="flex justify-between shadow-xl md:w-[300px] h-[120px] items-center px-6 rounded-lg">
        <div className="">
          <h2 className="font-semibold text-4xl">2,403</h2>
          <p className="text-gray-500 text-sm">Scheduled Deliveries</p>
          <p className="text-gray-500 text-sm">in this week</p>
        </div>
        <AiFillContacts className="text-6xl text-blue-500 bg-blue-500 bg-opacity-20 p-3 rounded-lg" />
      </span>
      <span className="flex justify-between shadow-xl md:w-[300px] h-[120px] items-center px-6 rounded-lg">
        <div className="">
          <h2 className="font-semibold text-4xl">2,403</h2>
          <p className="text-gray-500 text-sm">Cancelled Orders</p>
          <p className="text-gray-500 text-sm">in this week</p>
        </div>
        <AiFillCheckSquare className="text-6xl text-green-400 bg-green-500 bg-opacity-20 p-3 rounded-lg" />
      </span>
      <span className="flex justify-between shadow-xl md:w-[300px] h-[120px] items-center px-6 rounded-lg">
        <div className="">
          <h2 className="font-semibold text-4xl">2,403</h2>
          <p className="text-gray-500 text-sm">New Orders</p>
          <p className="text-gray-500 text-sm">in this week</p>
        </div>
        <AiFillCloseSquare className="text-6xl text-red-500 bg-red-500 bg-opacity-20 p-3 rounded-lg" />
      </span>
    </div>
  );
}

export default OrderStatus;
