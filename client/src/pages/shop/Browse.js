import { Dropdown } from "flowbite-react";
import React, { useState } from "react";
import { Filter } from "../../components/BrowsePage/Filter";
import { RiArrowUpDownFill } from "react-icons/ri";
import { BsArrowDownUp, BsFilterCircle } from "react-icons/bs";
import { AiFillCalendar } from "react-icons/ai";
import FilterCard from "../../components/BrowsePage/FilterCard";
import { useSelector } from "react-redux";
import PaginationBrowse from "../../components/BrowsePage/PaginationBrowse";
import { useEffect } from "react";

const Browse = () => {
  const { items } = useSelector((state) => state.pagination);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState(0);
  const allProducts = useSelector((state) => state.product.products);

  useEffect(() => {
    if (allProducts.length > 0) {
      setProducts([...allProducts]);
      setResult(allProducts.length);
    }
  }, [allProducts]);

  const handleNewestSort = () => {
    const filtered = products.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setProducts([...filtered]);
  };

  const handleHighestSort = () => {
    const filtered = products.sort((a, b) => b.price - a.price);
    setProducts([...filtered]);
  };

  const handleLowestSort = () => {
    const filtered = products.sort((a, b) => a.price - b.price);
    setProducts([...filtered]);
  };

  const handleOldesttSort = () => {
    const filtered = products.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setProducts([...filtered]);
  };

  return (
    <div className="w-screen h-screen">
      <main className="flex flex-col sm:flex-row h-full">
        <Filter setProducts={setProducts} setResult={setResult} />

        <section className="flex flex-col w-auto">
          <div className="flex justify-between ml-6 md:ml-0 lg:mr-40 items-center p-2 mr-3 md:mr-0">
            <p className="text-xl font-semibold">Results: {result}</p>
            <div className="block sm:hidden ml-auto mr-4">
              <BsFilterCircle
                className="text-4xl"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div>
              <Dropdown label="Sorting" color="light">
                <Dropdown.Item onClick={handleHighestSort}>
                  <div className="flex items-center gap-2">
                    <RiArrowUpDownFill className="text-xl" />
                    Sort by Highest Price
                  </div>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLowestSort}>
                  <div className="flex items-center gap-2">
                    <BsArrowDownUp className="text-lg font-bold" />
                    Sort by Lowest Price
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div
                    className="flex items-center gap-2"
                    onClick={handleNewestSort}
                  >
                    <AiFillCalendar className="text-lg font-bold" />
                    Sort by Newest
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div
                    className="flex items-center gap-2"
                    onClick={handleOldesttSort}
                  >
                    <AiFillCalendar className="text-lg font-bold" />
                    Sort by Oldest
                  </div>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <hr />

          <div className="flex flex-col mt-7 w-full">
            <section className="flex flex-wrap mx-10 md:gap-6 gap-3 lg:gap-8 justify-center sm:justify-start mb-7">
              {products.length > 0 &&
                items.map((product) => (
                  <FilterCard data={product} key={product._id} />
                ))}
            </section>
            <div className="mt-auto mb-4">
              <PaginationBrowse data={products} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Browse;
