import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function FilterItem({ data, type, setProducts, setResult }) {
  const [productNum, setProductNum] = useState(0);
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    if (data?._id !== undefined && products.length > 0) {
      if (type === "category") {
        const filtered = products.filter(
          (product) => product.category === data._id
        );
        setProductNum(filtered.length);
      }
      if (type === "brand") {
        const filtered = products.filter(
          (product) => product.brand === data._id
        );
        setProductNum(filtered.length);
      }
    }
  }, [data]);

  const handleFilter = () => {
    if (type === "category") {
      const filtered = products.filter(
        (product) => product.category === data._id
      );
      setResult(filtered.length);
      setProducts(filtered);
    }
    if (type === "brand") {
      const filtered = products.filter((product) => product.brand === data._id);
      setResult(filtered.length);
      setProducts(filtered);
    }
  };
  return (
    <li
      className="text-lg py-1 px-2 text-[#5e5d5d] hover:text-white hover:bg-black rounded-lg flex justify-between font-semibold transition-all duration-500"
      onClick={handleFilter}
    >
      <span>{data?.name}</span>
      <span>{productNum}</span>
    </li>
  );
}

export default FilterItem;
