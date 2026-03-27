"use client";
import { lora } from "@/module/share/navbar/ui/Navbar";
import { ClearIcon } from "@/module/account/component/icons";
import ProductBox from "@/module/share/components/ProductBox";
import { useWishlist } from "@/context/WishlistContext";
import { getWishlistProducts } from "@/module/products/server/products.action";
import React, { useEffect, useState } from "react";

interface props {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  key?: number;
}

const Wishlist = () => {
  const { wishlistProduct, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<props[]>([]);

  async function handleWishlist(product: string[]) {
    const WishProducts = await getWishlistProducts(product);
    setProducts(WishProducts);
  }
  useEffect(() => {
    if (wishlistProduct?.length > 0) {
      handleWishlist(wishlistProduct);
    }
  }, [wishlistProduct]);

  return (
    <>
      {products.length > 0 ? (
        <div className="nav-center relative">
          <div
            className="absolute right-12 top-0 flex cursor-pointer items-center justify-center text-lg font-bold text-gray-700"
            onClick={() => clearWishlist()}
          >
            <ClearIcon className="size-5" /> clear
          </div>
          <h2 className="text-[1.5em] font-bold">Your WishList</h2>
          <div className="grid-product mb-8">
            {products?.length > 0 &&
              products.map((product, index) => (
                <ProductBox key={index} {...product} />
              ))}
          </div>
        </div>
      ) : (
        <div className="white_box col-span-2 m-8 w-7/12">
          <h2 className={`${lora.className} text-gray-700 `}>
            Your Wishlist is empty
          </h2>
        </div>
      )}
    </>
  );
};

export default Wishlist;
