import React from "react";

function DashboardPopularItemCard({ data, index }) {
  console.log(data);
  return (
    <li className="flex gap-6 items-center" key={data.product_id}>
      <p className="text-lg text-gray-400">{index + 1}</p>
      <img
        className="w-[110px]"
        src={require(`../../Images/${data.img}`)}
        alt="alt"
      />
      <section>
        <p className="text-[#414479] text-lg">{data?.name}</p>
        <p className="font-bold text-xl text-[#414479]">${data.price}</p>
        <p className="font-bold text-[#414479]">Quantity: {data.quantity}</p>
      </section>
    </li>
  );
}

export default DashboardPopularItemCard;
