"use client";
import React from "react";
import { FetchReview } from "../ui/ReviewList";
import { StarIcon } from "../../account/component/icons";

const ReviewStart = (review: FetchReview) => {
  return (
    <div className="rounded-lg bg-gray-50 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white object-cover font-bold uppercase">
          {review.userId?.name
            ? review.userId?.name.at(0)?.toUpperCase()
            : review.userId?.email.at(0)?.toUpperCase()}
        </div>
        <span className="font-bold">
          {review.userId?.name
            ? review.userId.name
            : review.userId?.email.split("@")[0]}
        </span>
        <span className="ml-auto mr-4 text-xs font-bold text-gray-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="ml-4 mt-3 flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`size-4 ${review?.rating > i ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
          />
        ))}
      </div>
      <div className="mt-3 px-4">
        <p className={`font-bold`}>{review.title}</p>
        <p className="text-sm font-semibold">{review?.description}</p>
      </div>
    </div>
  );
};

export default ReviewStart;
