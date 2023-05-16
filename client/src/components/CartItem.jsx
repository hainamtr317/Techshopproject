import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  setTotal,
  setTotalAmount,
} from "../features/shop/cartSlice";

const CartItem = ({ data }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const { loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const increment = () => {
    setQuantity(quantity + 1);
    dispatch(
      addToCart({
        input: {
          product_id: data._id,
          user_id: loggedUser._id,
        },
        item: {
          name: data.name,
          price: data.price,
          img: data.img,
          quantity: 1,
          _id: data._id,
        },
      })
    );
  };
  const decrement = () => {
    if (quantity <= 1) {
      return quantity;
    }
    setQuantity(quantity - 1);
    console.log(quantity);
    console.log(loggedUser._id);
    dispatch(
      addToCart({
        input: {
          product_id: data._id,
          user_id: loggedUser._id,
          quantity: quantity - 1,
        },
        item: {
          name: data.name,
          price: data.price,
          img: data.img,
          quantity: -1,
          _id: data._id,
        },
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ product_id: data._id, user_id: loggedUser._id }));
  };
  return (
    <tr className="font-['Nunito']">
      <th className="flex my-5 ">
        <img
          className="w-36 object-contain"
          src={require(`../Images/${data.img}`)}
          alt="itemname"
        />
        <div className="flex flex-col gap-y-3">
          <label className="text-[#3A3A3A]" htmlFor="itemName">
            {data.name}
          </label>
          <p
            className="text-[#AAAAAA] w-4 hover:cursor-pointer"
            onClick={() => handleRemove()}
          >
            Remove
          </p>
        </div>
      </th>
      <th className="hidden md:table-cell">
        <div className="flex justify-center items-center mb-9 gap-3 ">
          <i>
            <AiOutlinePlus onClick={() => increment()} />
          </i>
          <input
            type="number"
            min={1}
            value={quantity}
            className="[appearance:textfield] border-[1px] border-gray-500 rounded-xl w-16 h-11 text-center"
            readOnly
          />
          <i>
            <AiOutlineMinus onClick={() => decrement()} />
          </i>
        </div>
      </th>
      <th className="hidden md:table-cell">
        <h3 className="mb-9">${data.price}</h3>
      </th>
      <th className="hidden md:table-cell">
        <h3 className="mb-9">${data.price * quantity}</h3>
      </th>
    </tr>
  );
};

export default CartItem;
