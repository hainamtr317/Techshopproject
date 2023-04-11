import React from "react";
import { Link } from "react-router-dom";

function SearchbarCard({ data }) {
  return (
    <Link to={`/product/${data._id}`}>
      <li className="py-3 sm:py-4 mx-1">
        <div className="flex items-center space-x-4">
          <div className="shrink-0">
            <img
              className="w-[50px] md:w-[80px] rounded-md"
              src={require(`../../Images/${data.img}`)}
              alt="Neil image"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {data.name}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ${data.price}
          </div>
        </div>
      </li>
    </Link>
  );
}

export default SearchbarCard;
