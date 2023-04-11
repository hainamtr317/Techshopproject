import React from "react";

import CustomerReview from "./CustomerReview";
import ReviewModal from "./ReviewModal";
function ReviewsContainer({ data, product_id }) {
  return (
    <main className="h-[500px] shadow-xl rounded-md mt-8 mb-10 md:mt-0 border-[1px] border-gray-500 flex-col flex">
      <div className="h-[87%] overflow-y-auto">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data?.map((review) => (
            <CustomerReview review={review} />
          ))}
        </ul>
      </div>
      <hr />
      <div className="mt-auto ml-auto mr-2 mb-2">
        <ReviewModal product_id={product_id} />
      </div>
    </main>
  );
}

export default ReviewsContainer;
