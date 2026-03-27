/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Product } from "@/db/model/product";
import { mongooseConnect } from "../../../db/mongoose";

export const allProductsByCategory = async (category: string) => {
  try {
    mongooseConnect();
    let products: any[] = [];

    if (category !== "") {
      const categoryArray = category.split(",");
      const productPromises = categoryArray.map(async (cat) => {
        const product = await Product.find({ category: cat }).exec();
        return product;
      });

      products = await Promise.all(productPromises);
      products = products.flat();

      return JSON.stringify(products);
    }
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};
