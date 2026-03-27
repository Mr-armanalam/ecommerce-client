import { getFeaturedProduct } from "@/module/products/server/products.action";
// import Featured from "@/components/Featured";
import React from "react";
import { FeaturedProduct } from "../../../../module/home/section/FeaturedProduct";

const page = async () => {
  const { featuredProduct } = await getFeaturedProduct();
  return <FeaturedProduct featuredProduct={featuredProduct?.TrndProduct} />;
};

export default page;
