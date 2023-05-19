import React from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import { Spinner } from "flowbite-react";
import CarouselStore from "../../components/Store/CarouselStore";
import Footer from "../../components/Footer";

const Home = () => {
  const { isLoading, products } = useSelector((state) => state.product);
  console.log(products);
  return (
    <main className="w-screen">
      {/* Slider */}
      <section className="text-center">
        <div className="h-[400px] md:h-[500px] overflow-y-hidden xl:h-[600px] rounded-none">
          <CarouselStore />
        </div>
      </section>
      {/* Product */}
      <section className="mt-10">
        <div className="text-center">
          <h1 className="font-bold text-4xl ">Products</h1>
          <hr className="w-1/3 border-t-black border-t-2 mx-auto" />

          {isLoading ? (
            <Spinner color="info" aria-label="Info spinner example" />
          ) : (
            <Pagination data={products} />
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
