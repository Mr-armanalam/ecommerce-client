"use client";
import React, { useEffect, useState } from "react";
import { lora } from "../../share/navbar/ui/Navbar";
import { StarIcon } from "../../account/component/icons";
import { useSession } from "next-auth/react";
// import { getUserReview, postReviews } from "../server/postReviews.action";

import ReviewList, { FetchReview } from "./ReviewList";
import ReviewStart from "../components/ReviewStart";
import {
  getUserReview,
  postReviews,
} from "@/module/products/server/postReviews.action";
// import CollapsibleRating from "./CollapsibleRating";

export interface Reviews {
  rating: number;
  title: string;
  description: string;
  userId?: string;
  productId: string;
  createdAt?: string;
}

const ReviewShower = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<FetchReview>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review: Reviews = {
      rating,
      title,
      description,
      userId: session?.user?.id,
      productId,
    };

    const handleReviewSubmit = await postReviews(review);
    if (!handleReviewSubmit || handleReviewSubmit?.status !== "success") {
      console.error("Failed to submit review:", handleReviewSubmit);
    } else {
      setReviews(handleReviewSubmit.reviews);
    }
    setRating(1);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (session?.user) {
      (async () => {
        const userReview = await getUserReview({
          userId: session?.user.id,
          productId,
        });
        // if (!userReview) throw new Error("Failed to fetch reviews");
        setReviews(userReview.review);
      })();
    }
  }, [productId, session, setReviews]);

  return (
    <section className=" relative pb-4">
      <h2 className={`${lora.className} mb-0.5 font-semibold`}>Reviews</h2>
      <div className="grid grid-cols-5 gap-8">
        <div className="white_box col-span-2">
          {reviews === null ? (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <h3 className={`${lora.className} mb-1 font-bold text-gray-500`}>
                Write a Review
              </h3>
              <div className="ml-auto flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`size-5 cursor-pointer ${i < (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
              <input
                type="text"
                name="title"
                placeholder="Title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="rounded-lg border-b px-2 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
              />
              <button
                type="submit"
                className="btn-primary1 btn_block mt-6 rounded-md bg-primaryMain py-2.5 text-white"
                id="submit"
              >
                Add Your Review
              </button>
            </form>
          ) : (
            <div className="text-gray-500">
              <h3 className={`${lora.className} mb-5 font-bold text-gray-500`}>
                Your Review
              </h3>
              {reviews !== undefined && <ReviewStart {...reviews} />}
            </div>
          )}
        </div>
        <div className="white_box col-span-3 h-fit">
          {productId && <ReviewList productId={productId} />}
        </div>
      </div>
      {/* <CollapsibleRating /> */}
    </section>
  );
};

export default ReviewShower;
