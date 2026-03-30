/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import CartButton from "../../share/components/CartButton";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface props {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

const Featured = ({ product }: { product: props }) => {
  const { cartItems, addProduct } = useCart();
  const isAddedToCart = cartItems.includes(product._id);

  return (
    <div className="bg-[#222] md:h-90 rounded-md py-8 text-white">
      <div className="nav-center h-full">
        <div className="grid h-full items-center grid-cols-5 gap-8 max-sm:grid-cols-1">
          <div className=" flex justify-center gap-y-4 flex-col items-start h-full col-span-3 md:px-8">
            <h1 className="text-6xl font-semibold">{product?.title}</h1>
            <p className="description mt-3">{product?.description}</p>
            <div className="mt-6 flex gap-2">
              <Link
                href={"/products/" + product._id}
                className="btn-primary1 btn_white_Outline px-4 py-2"
              >
                Read more
              </Link>
              <CartButton
                fill={"fill-black size-5"}
                productId={product._id}
                btnType={"btn_white_noOutline "}
                isAdded={isAddedToCart}
                onClick={addProduct}
              />
            </div>
          </div>
          <div className="grid-column relative h-full col-span-2 flex max-h-50 items-center justify-center max-sm:-order-1">
            <div className="aspect-3/6 ml-aut mr-8 md:pr-10">
              <Image
                src={product.images[0]}
                alt="home product"
                className="sm:ml-auto object-contain"
                fill
                // className="w-[85%] max-md:w-full sm:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
