/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";
import { WishlistIcon } from "../../account/component/icons";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface props {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  keys?: number;
}

const ProductBox = ({ _id, title, price, images }: props) => {
  const url = `/products/${_id}`;

  const [isHover, setIsHover] = useState(false);
  const { wishlistItems, toggleWishlist } = useWishlist(); // Use the new react-query hook
  const { cartItems, addProduct } = useCart(); // Assuming you'll create a similar useCart hook

  const isAddedToWishlist = wishlistItems.includes(_id);
  const isAddedToCart = cartItems.includes(_id);

  // You might want to add loading/error states to your UI based on isWishlistLoading, isCartLoading etc.
  // For brevity, they are omitted in the UI logic below.

  return (
    <div className="relative">
      <div
        className={`flex h-[150px] items-center justify-center rounded-md bg-white p-5 ${isHover && "shadow-lg"}`}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`absolute right-2 top-2 z-10 cursor-pointer text-gray-500 ${isHover || isAddedToWishlist ? "block" : "hidden"}`}
          onClick={() => toggleWishlist(_id)}
        >
          <WishlistIcon
            className={`size-5 active:fill-black ${isAddedToWishlist && "fill-gray-700"}`}
          />
        </div>

        <Link href={`/products/${_id}`}>
          <img
            src={images[0]}
            alt="new product"
            className="max-h-[100px] max-w-full"
          />
        </Link>
      </div>

      <div className="mt-1.5">
        <Link className="text-[0.9rem] font-medium text-[#333]" href={url}>
          {title}
        </Link>
        <div className="mt-0.5 flex items-center justify-between">
          <div className="text-[1.2rem] font-bold">${price}</div>
          <CartButton
            icon={false}
            productId={_id}
            btnType="btn_primary_Outline rounded-md"
            isAdded={isAddedToCart}
            onClick={addProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
