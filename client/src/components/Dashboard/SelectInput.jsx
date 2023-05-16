import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SelectInput = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSelectedOption(
      options.find((option) => option.value === e.target.value)
    );
  };

  useEffect(() => {
    dispatch(selectedOption.toggle());
  }, [selectedOption]);
  return (
    <div className="inline-block relative w-28">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedOption.value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
    </div>
  );
};

export default SelectInput;
