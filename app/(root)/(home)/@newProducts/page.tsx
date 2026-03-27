/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductBox from "@/module/share/components/ProductBox";
import { getFeaturedProduct } from "@/module/products/server/products.action";
import React from "react";

const page = async () => {
  const { newProducts: product } = await getFeaturedProduct();

  return (
    <div className="nav-center pb-6">
      <h2>New Arrivals</h2>
      <div className="grid grid-cols-5 gap-5 pb-3 max-md:grid-cols-3 max-sm:grid-cols-2">
        {product.length > 0 &&
          product.map((p: any, index: number) => (
            <ProductBox key={index} {...p} />
          ))}
      </div>
    </div>
  );
};

export default page;
