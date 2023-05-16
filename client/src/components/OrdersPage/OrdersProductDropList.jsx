import React from "react";

const OrdersProductDropList = ({ options }) => {
  return (
    <div className="w-[80px]">
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        {options.map((option) => (
          <option>
            {option?.name +
              " - " +
              "x" +
              option.quantity +
              " - " +
              option.subTotal}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrdersProductDropList;
