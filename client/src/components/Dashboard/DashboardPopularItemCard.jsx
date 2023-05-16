import React from "react";

function DashboardPopularItemCard({ data, index }) {
  return (
    <li className="flex gap-6 items-center" key={data.product_id}>
      <p className="text-lg text-gray-400">{index + 1}</p>
      <img
        className="w-[70px] bg-[#E1E3E5] rounded-tr-sm rounded-bl-sm rounded-tl-[35%] rounded-br-[35%] p-1"
        src={require(`../../Images/${data.img}`)}
        alt="alt"
      />
      <section>
        <p className="text-[#414479] text-lg">{data?.name}</p>
        <p className="font-bold text-xl text-[#414479]">${data.price}</p>
      </section>
    </li>
  );
}

export default DashboardPopularItemCard;
