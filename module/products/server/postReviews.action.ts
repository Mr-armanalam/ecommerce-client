/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { mongooseConnect } from "@/db/mongoose";
import "@/db/index";
import { Review } from "@/db/model/reviews.model";
import { Product } from "@/db/model/product";
import { Reviews } from "@/module/products/ui/ReviewShower";

export const postReviews = async (props: Reviews) => {
  try {
    mongooseConnect();

    const newReview = new Review({ ...props });
    await newReview.save();

    const productReviews = await Review.find({
      productId: props.productId,
    }).select("rating");

    const averageRating =
      productReviews.reduce((acc, review) => acc + review.rating, 0) /
      productReviews.length;

    await Product.updateOne(
      { _id: props.productId },
      { rating: averageRating },
    );

    const reviews = await Review.findOne({
      productId: props.productId,
      userId: props.userId,
    })
      .sort({
        createdAt: -1,
      })
      .populate("userId");

    if (reviews) {
      return {
        status: "success",
        reviews: JSON.parse(JSON.stringify(reviews)),
      };
    }

    return { status: "success", reviews: {} };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getAllReviews = async (productId: string) => {
  try {
    mongooseConnect();
    const reviews = await Review.find({ productId })
      .sort({
        createdAt: -1,
      })
      .populate("userId");

    if (reviews.length > 0) {
      return {
        status: "success",
        reviews: JSON.parse(JSON.stringify(reviews)),
      };
    }

    return { status: "success", reviews: [] };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getUserReview = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string | undefined;
}) => {
  try {
    mongooseConnect();
    const reviw = await Review.findOne({ productId, userId }).populate(
      "userId",
    );
    if (reviw) {
      return {
        status: "success",
        review: JSON.parse(JSON.stringify(reviw)),
      };
    }
    return { status: "500", review: null };
  } catch (error: any) {
    console.log(error.message);
    return { status: 500, review: [] };
  }
};
