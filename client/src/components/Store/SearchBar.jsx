import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchbarCard from "./SearchbarCard";

function SearchBar({ placeholder, data }) {
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const handleFilter = (e) => {
    const { value } = e.target;
    setSearch(value);
    setFilterData(
      data.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div>
      <TextInput
        id="email4"
        type="email"
        placeholder={placeholder}
        className="w-[500px]"
        value={search}
        icon={AiOutlineSearch}
        onChange={handleFilter}
      />
      <section className="w-[250px] md:w-[29%] max-h-[300px] bg-white dark:bg-slate-800 overflow-hidden overflow-y-auto shadow-2xl absolute rounded-lg opacity-90">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filterData.length > 0 &&
            search &&
            filterData.map((product) => (
              <div onClick={() => setSearch("")} key={product._id}>
                <SearchbarCard data={product} />
              </div>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default SearchBar;
