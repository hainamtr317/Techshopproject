import React from "react";
import { AiFillStar } from "react-icons/ai";
function CustomerReview({ review }) {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 mx-2">
        <div className="shrink-0">
          <img
            className="h-8 w-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {new Date(review?.createdAt).toUTCString()}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {review?.rating}/5
          <AiFillStar className="text-yellow" />
        </div>
      </div>
      <p className="text-gray-600 mx-2 mt-1">{review?.text}</p>
    </li>
  );
}

export default CustomerReview;
