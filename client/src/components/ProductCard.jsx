import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../features/shop/cartSlice";
import { addToWishlist } from "../features/shop/wishlistSlice";
import { BsTrash } from "react-icons/bs";
const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { loggedUser } = useSelector((state) => state.auth);
  const [isWishlist, setIsWishlist] = useState(false);
  useEffect(() => {
    const item = wishlist.find((product) => product._id === data._id);
    if (item) {
      setIsWishlist(true);
    }
  }, [wishlist, data._id]);

  const handleBuy = () => {
    dispatch(
      addToCart({
        input: { product_id: data._id, user_id: loggedUser._id },
        item: {
          name: data.name,
          price: data.price,
          img: data.img,
          quantity: 1,
          _id: data._id,
        },
      })
    );

    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleWishlist = (state) => {
    dispatch(
      addToWishlist({
        data: { product_id: data._id, user_id: loggedUser._id },
        item: {
          name: data.name,
          price: data.price,
          img: data.img,
          _id: data._id,
        },
      })
    );
    if (state === "Remove") {
      toast.error("Item remove wishlist.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setIsWishlist(false);
    }
    if (state === "Add") {
      toast.success("Item added to wishlist.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setIsWishlist(true);
    }
  };
  return (
    <>
      <article className="border-solid border-[1px] border-gray-500 w-[280px] bottom-0 h-[380px] hover:relative hover:bottom-3 rounded-t-xl bg-zinc-50 my-3 flex flex-col justify-start hover:shadow-xl transition-all duration-300 ease-in-out p-2">
        <img
          src={require(`../Images/${data.img}`)}
          alt="laptop"
          className="w-[100%] h-[50%] object-cover rounded-t-xl border-b-[1px] border-solid border-gray-300"
        />
        <Link
          className="font-semibold text-lg mt-3"
          to={`/product/${data._id}`}
        >
          {data.name}
        </Link>
        <h2>Price: ${data.price}</h2>
        <div className="flex flex-col">
          <button
            className={`font-semibold ${
              !isWishlist
                ? "bg-black text-white hover:bg-gray-800 "
                : "bg-white text-red-600 border-[1px] border-red-500 hover:bg-red-200"
            } mx-11 p-1 transition duration-500 rounded-lg my-2`}
            onClick={() => {
              !isWishlist ? handleWishlist("Add") : handleWishlist("Remove");
            }}
          >
            {!isWishlist ? (
              "Add to Wishlist"
            ) : (
              <div>
                <BsTrash className="inline mr-1 mb-1" />
                Remove from wishlist
              </div>
            )}
          </button>
          <button
            onClick={() => handleBuy()}
            className="font-semibold bg-white order-b-[1px] border-solid border-black border-[1px] rounded-lg text-black mx-11 hover:bg-slate-300 transition duration-500 p-1"
          >
            Buy
          </button>
        </div>
      </article>
    </>
  );
};

export default ProductCard;
