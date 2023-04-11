import React from "react";
import { Rating } from "flowbite-react";
const RatingComponent = () => {
  return (
    <React.Fragment>
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
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
        1,745 global ratings
      </span>
      <div className="flex flex-col gap-3 mt-3">
        <Rating.Advanced percentFilled={70}>5 star</Rating.Advanced>
        <Rating.Advanced percentFilled={17}>4 star</Rating.Advanced>
        <Rating.Advanced percentFilled={8}>3 star</Rating.Advanced>
        <Rating.Advanced percentFilled={4}>2 star</Rating.Advanced>
        <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
      </div>
    </React.Fragment>
  );
};

export default RatingComponent;
