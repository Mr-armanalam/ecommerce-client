/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Category } from "@/db/model/categories.model";
import { mongooseConnect } from "../../../db/mongoose";

export const getCategories = async () => {
  try {
    await mongooseConnect();

    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children",
        },
      },
    ]);

    return JSON.stringify(
      categories.filter((category) => category.children.length > 0),
    );
  } catch (error: any) {
    console.log(error.message);
    JSON.stringify({ error: "Failed to fetch categories" });
  }
};
