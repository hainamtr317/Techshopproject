import React from "react";
import { Breadcrumb, Rating, Tooltip, Spinner } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../features/admin/productSlice";
import { addToCart } from "../../features/shop/cartSlice";
import { addToWishlist } from "../../features/shop/wishlistSlice";
import { toast } from "react-toastify";
import RatingComponent from "../../components/ProductPage/RatingComponent";
import ReviewsContainer from "../../components/ProductPage/ReviewsContainer";
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const { loggedUser } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { product_id } = useParams();
  const navigate = useNavigate();
  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    dispatch(getProduct(product_id));
  }, [dispatch, product_id]);

  useEffect(() => {
    const item = wishlist.find((product) => product._id === product_id);
    if (item) {
      setIsWishlist(true);
    }
  }, [wishlist, product_id]);

  const handleAddToCart = () => {
    let inputQuantity = 0;
    const itemFilter = cart.find((product) => product._id === product_id);
    if (typeof itemFilter !== "undefined") {
      inputQuantity = itemFilter.quantity;
    }

    dispatch(
      addToCart({
        input: {
          product_id,
          user_id: loggedUser._id,
          quantity: quantity + inputQuantity,
        },
        item: {
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: quantity,
          _id: product._id,
        },
      })
    );
  };

  const handleWishlist = (state) => {
    dispatch(
      addToWishlist({
        data: { product_id, user_id: loggedUser._id },
        item: {
          name: product.name,
          price: product.price,
          img: product.img,
          _id: product._id,
        },
      })
    );
    if (state === "Remove") {
      toast.error("Item remove from wishlist.", {
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
  return isLoading ? (
    <Spinner size="xs" className="mt-24" />
  ) : (
    <div className="w-screen h-screen">
      <div className="mt-24 md:mx-14 lg:mx-44 mx-1">
        {/* Breadcrumb */}
        <Breadcrumb
          aria-label=""
          onClick={() => {
            navigate("/");
          }}
        >
          <Breadcrumb.Item href="#" icon={HiHome}>
            Home
          </Breadcrumb.Item>

          <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <section className="flex-col flex lg:flex-row mt-14 md:gap-8 gap-5  items-center lg:items-start ">
          <div>
            {typeof product.img !== "undefined" && (
              <img
                src={require(`../../Images/${product.img}`)}
                alt={product.img}
                className="w-[300px] md:w-[400px] lg:w-[500px]"
              />
            )}
          </div>
          <article className="md:max-w-[900px]">
            <h1 className=" text-3xl md:text-5xl font-semibold mb-3">
              {product.name}
            </h1>
            <div>
              <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95 out of 5
                </p>
              </Rating>
            </div>
            <h2 className="my-3 text-xl md:text-2xl font-semibold">
              Price: ${product.price}
            </h2>
            <p className="text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae veritatis maxime veniam natus aperiam dolorum labore
              debitis. Quae asperiores aut id quam. Aperiam mollitia amet
              cupiditate laboriosam, quis magni repellendus?
            </p>
            <div className="flex gap-3 items-center mt-4">
              <AiOutlinePlus onClick={() => increment()} />
              <input
                type="number"
                value={quantity}
                min={1}
                className="[appearance:textfield] border-[1px] pl-6 text-center border-gray-500 rounded-xl w-[70px] h-11"
                readOnly
              />
              <AiOutlineMinus onClick={() => decrement()} />
            </div>

            <div className="flex gap-6 items-center my-6 ">
              <button
                onClick={() => handleAddToCart()}
                className="font-semibold bg-white order-b-[1px] border-solid border-black border-[1px] rounded-lg text-black hover:bg-slate-300 transition duration-500 p-1 w-[200px] h-12"
              >
                Add to Cart
              </button>
              <Tooltip
                content={
                  !isWishlist ? "Add to wishlist" : "Remove from Wishlist"
                }
              >
                <div
                  onClick={() => {
                    !isWishlist
                      ? handleWishlist("Add")
                      : handleWishlist("Remove");
                  }}
                >
                  {!isWishlist ? (
                    <AiOutlineHeart className="text-3xl text-pink-600" />
                  ) : (
                    <AiFillHeart className="text-3xl text-pink-600" />
                  )}
                </div>
              </Tooltip>
            </div>
          </article>
        </section>
      </div>
      <div className="md:mx-16 lg:mx-28 rounded-xl mb-9 mx-3 ">
        <section className="grid md:grid-cols-4 gap-[30px] md:gap-0">
          <div className="col-span-4 md:col-span-2 w-full xl:w-[800px] lg:w-[600px] md:w-[400px]">
            <span className="text-2xl font-bold">Customer Reviews:</span>
            {product && <RatingComponent />}
          </div>
          <div className="col-span-4 md:col-span-2 sm:ml-0 mr-1">
            {product && (
              <ReviewsContainer
                data={product?.reviews}
                product_id={product_id}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
