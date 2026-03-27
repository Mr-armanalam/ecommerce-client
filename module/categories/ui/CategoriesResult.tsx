import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductPropertes } from "../../products/section/ProductComponent";
import CartButton from "../../share/components/CartButton";
import { WishlistIcon } from "../../account/component/icons";
import { useWishlist } from "@/context/WishlistContext";
import { Iproduct } from "@/db/model/product";
import Link from "next/link";

interface props extends Iproduct {
  _id: string | any;
}

const CategoriesResult = ({
  _id,
  title,
  description,
  properties,
  price,
  images,
}: props) => {
  const { addToWishlist, wishlistProduct } = useWishlist();
  const [iswishlist, setIsWishlist] = useState<boolean>(false);

  useEffect(() => {
    if (wishlistProduct.length > 0) {
      const found = wishlistProduct.find((product) => product === _id);
      if (found) {
        setIsWishlist(true);
      } else {
        setIsWishlist(false);
      }
    }
  }, [wishlistProduct, _id]);

  return (
    <div className="mt-10 grid grid-cols-5 max-sm:grid-cols-1 md:gap-5 lg:gap-10">
      <div className="center relative col-span-2 rounded-md bg-white p-10">
        <div
          className={`absolute right-2 top-2 z-10 cursor-pointer text-gray-500 `}
          onClick={() => addToWishlist(_id)}
        >
          <WishlistIcon className={`size-5 ${iswishlist && "fill-gray-700"}`} />
        </div>
        <Image src={images[0]} alt="product" width={200} height={200} />
      </div>
      <div className="col-span-3 max-sm:pb-4">
        <Link href={`/products/${_id}`} passHref>
          <p className="py-4 text-4xl font-bold text-gray-800">{title}</p>
          <p className="text-sm font-medium text-gray-700">{description}</p>
          <h3 className="mt-4 text-lg font-bold text-gray-700">Details</h3>
        </Link>
        {properties && <ProductPropertes properties={properties} />}
        <div className="mt-4 flex items-center font-bold text-gray-600">
          <p className="mr-4 rounded-md border-2 border-gray-400 px-8 py-0.5 text-2xl">
            ${price}
          </p>
          <CartButton productId={_id} btnType={"btn_primary_noOutline"} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesResult;
