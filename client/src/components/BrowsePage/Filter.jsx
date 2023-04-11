import React, { useEffect } from "react";
import FilterItem from "./FilterItem";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { getCategories } from "../../features/admin/categorySlice";
import { getBrands } from "../../features/admin/brandSlice";
export const Filter = ({ setProducts, setResult }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const categoryIsLoading = useSelector((state) => state.category.isLoading);
  const { brands } = useSelector((state) => state.brand);
  const brandIsLoading = useSelector((state) => state.brand.isLoading);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  if (categoryIsLoading || brandIsLoading) {
    return <Spinner aria-label="Extra large spinner example" size="xl" />;
  }
  return (
    <section className="h-[300px] sm:overflow-y-visible sm:col-span-3 lg:col-span-2 w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
      <h1 className=" text-2xl font-bold text-[#252121] tracking-widest px-2 py-[13px]">
        Filter
      </h1>
      <hr />
      <div className="mt-2 mx-3">
        <h2 className="text-lg font-bold text-[#252121]">Category</h2>
        <ul className="flex flex-col gap-1">
          {categories.length > 0 &&
            categories.map((category) => (
              <FilterItem
                data={category}
                key={category._id}
                type={"category"}
                setProducts={setProducts}
                setResult={setResult}
              />
            ))}
        </ul>
      </div>
      <div className="mt-2 mx-3">
        <h2 className="text-lg font-bold text-[#252121]">Brand</h2>
        <ul className="flex flex-col gap-1">
          {brands.map((brand) => (
            <FilterItem
              data={brand}
              key={brand._id}
              type={"brand"}
              setProducts={setProducts}
              setResult={setResult}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
