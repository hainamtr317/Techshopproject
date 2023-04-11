import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";

const Cart = () => {
  const { cart, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return (
    <main className="w-screen h-screen bg-neutral-200 fixed overflow-auto">
      <section className="mt-24 bg-white w-[97%] mx-auto rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="flex-grow-[3]  mx-2 md:mx-9 my-8">
          <div className="flex justify-between text-[#2B2B2B] font-bold text-xl md:text-2xl">
            <h1>Shopping Cart</h1>
            <h1>{totalQuantity} Items</h1>
          </div>
          <hr className="my-4 border-t-[2px] border-gray-300" />
          <div className="text-left overflow-y-auto h-[400px] md:h-[600px]">
            <table className="w-full">
              <thead>
                <tr className="text-[#969696] cart-header">
                  <th>PRODUCT DETAILS</th>
                  <th className="text-center hidden md:table-cell">QUANTITY</th>
                  <th className="hidden md:table-cell">PRICE</th>
                  <th className="hidden md:table-cell">TOTAL</th>
                </tr>
              </thead>
              <tbody className="">
                {cart.map((product) => (
                  <CartItem data={product} key={product._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Order Summary */}
        <div className="flex-grow-[1] md:px-9 py-8 bg-[#F6F6F6]">
          <div className="mx-3">
            <div>
              <h1 className="text-[#2B2B2B] font-bold text-xl md:text-2xl">
                Order Summary
              </h1>
            </div>
            <hr className="my-4 border-t-[2px] border-[#EBEBEB] " />
            <div className="flex flex-col gap-y-7 ">
              <label htmlFor="shipping" className="font-bold text-[#797777]">
                SHIPPING OPTIONS
              </label>
              <select name="" id="" className="p-3">
                <option value="10">Standard - $10.00</option>
              </select>
              <label htmlFor="" className="font-bold text-[#797777]">
                PROMO CODE
              </label>
              <input
                type="text"
                placeholder="Enter your code"
                className="p-3"
              />
              <h1 className="font-bold text-[#797777]">
                Total: ${totalAmount}
              </h1>

              <button
                className={`${
                  cart.length > 0 ? "bg-slate-900" : "bg-gray-600"
                } font-semibold text-white p-2 rounded-md`}
              >
                {cart.length > 0 ? (
                  <Link to="/checkout">Checkout</Link>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
