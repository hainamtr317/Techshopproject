import React from "react";
import { useSelector } from "react-redux";

function Order() {
  const { order } = useSelector((state) => state.order);
  console.log(order);
  return (
    <>
      <div>
        <p>Hello from order</p>
      </div>
    </>
  );
}

export default Order;
