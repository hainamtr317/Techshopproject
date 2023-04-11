import React from "react";

function CheckoutCard({ data }) {
  return (
    <main className="flex justify-between p-2 border-">
      <div className="flex">
        <img
          src={require(`../../Images/${data.img}`)}
          alt=""
          className="w-24"
        />
        <div className="flex-col mx-3 mt-1">
          <h1 className="text-lg font-semibold">{data.name}</h1>
          <p className="font-semibold text-gray-500">${data.price}</p>
          <p className="font-semibold text-gray-500">
            Total: ${data.price * data.quantity}
          </p>
        </div>
      </div>
      <div className="text-xl font-semibold mt-1">
        <span className="bg-gray-500 justify-start text-gray-200 rounded-[100%] p-[2px] px-[6px]">
          x{data.quantity}
        </span>
      </div>
    </main>
  );
}

export default CheckoutCard;
