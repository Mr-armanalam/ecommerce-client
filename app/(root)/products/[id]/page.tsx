import CartButton from "@/module/share/components/CartButton";
import { ProductPropertes } from "@/module/products/section/ProductComponent";
import ReviewShower from "@/module/products/ui/ReviewShower";
import ProductImages from "@/module/products/section/ProductImages";
import { productDatails } from "@/module/products/server/productDetails.action";
import { StarIcon } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "QuirkCart | Products-Details",
  description: "Products Details",
};

type Params = Promise<{ id: string }>;
const ProductDetails = async (props: { params: Params }) => {
  const params = await props.params;
  const product = await productDatails(params.id);

  const displayStarRating = (averageRating: number) => {
    const fullStars = Math.floor(averageRating);
    return fullStars;
  };

  if (product) {
    return (
      <div className="nav-center">
        <div className="my-10 grid grid-cols-5 max-sm:grid-cols-1 md:gap-5 lg:gap-10">
          <div className="center col-span-2 rounded-md bg-white p-10">
            <ProductImages images={product.images} />
          </div>
          <div className="col-span-3 max-sm:pb-4">
            <h2 className="font-bold">{product.title}</h2>
            <p className="text-sm font-medium text-gray-700">
              {product.description}
            </p>
            <div className="mt-6 flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-5 ${displayStarRating(product.rating) > i ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                />
              ))}
            </div>
            <h3 className="ml-1 mt-4 text-lg font-bold text-gray-700">
              Details
            </h3>
            {product?.properties && (
              <ProductPropertes properties={product?.properties} />
            )}
            <p className="ml-1 mt-4 text-2xl font-bold text-gray-700">
              ${product.price}
            </p>
            <CartButton
              productId={product._id}
              btnType={"btn_primary_noOutline mt-5 ml-1 "}
            />
          </div>
        </div>
        <ReviewShower productId={params.id} />
      </div>
    );
  }
};

export default ProductDetails;
