import { Iproduct } from "@/db/model/product";
import { getRecommendateProducts } from "@/module/home/server/recommendateProducts";
import ProductBox from "@/module/share/components/ProductBox";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const res = await getRecommendateProducts();

  if (!res) return;

  const product = res.recommendateProducts as Iproduct[];

  return (
    <section className="px-10">
      <h2>Recommendate</h2>
      <div className="grid grid-cols-5 gap-5 pb-3 max-md:grid-cols-3 max-sm:grid-cols-2">
        {product.length > 0 &&
          product.map((p: any, index: number) => (
            <ProductBox key={index} {...p} />
          ))}
      </div>
    </section>
  );
};

export default page;
