/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductBox from "@/module/share/components/ProductBox";
import { getFeaturedProduct } from "@/module/products/server/products.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const { newProducts: product } = await getFeaturedProduct();

  return (
    <section className="nav-center flex flex-col pb-6">
      <h2>New Arrivals</h2>
      <div className="grid grid-cols-5 gap-5 pb-3 max-md:grid-cols-3 max-sm:grid-cols-2">
        {product.length > 0 &&
          product.map((p: any, index: number) => (
            <ProductBox key={index} {...p} />
          ))}
      </div>
      <Link
        href={"/categories"}
        className="ml-auto text-xs text-amber-800 hover:text-amber-600 hover:scale-105 underline cursor-pointer font-bold"
      >
        View All
      </Link>
    </section>
  );
};

export default page;
