import React from "react";
import { useSelector } from "react-redux";
import WishlistCard from "../../components/Wishlist/WishlistCard";

function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <div className="w-screen h-screen mt-10">
      <section className=" md:mx-24 text-center max-w-full h-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Wishlist</h1>
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-14 gap-y-12 mx-auto max-w-[1500px]">
          {wishlist.length === 0 && (
            <div className="mx-auto font-mono text-gray-400 text-5xl">
              Your wishlist is empty.
            </div>
          )}
          {wishlist.length > 0 &&
            wishlist.map((product) => <WishlistCard data={product} />)}
        </div>
      </section>
    </div>
  );
}

export default Wishlist;
