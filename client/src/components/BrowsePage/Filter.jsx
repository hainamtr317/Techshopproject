import React, { useEffect } from "react";
import FilterItem from "./FilterItem";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { getCategories } from "../../features/admin/categorySlice";
import { getBrands } from "../../features/admin/brandSlice";
export const Filter = ({ setProducts, setResult, open }) => {
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
    <section
      className={`overflow-y-auto ${
        open ? "block" : "hidden"
      } md:block min-h-[300px] md:h-full sm:col-span-3 lg:col-span-2 min-w-[130px] bg-white md:w-[250px] lg:w-[300px]`}
    >
      <h1 className="text-2xl font-bold text-[#252121] tracking-widest px-2 py-[13px]">
        Filter
      </h1>
      <hr />
      <section className="p-3 sm:p-1">
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
      </section>
    </section>
  );
};
