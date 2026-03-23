/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(images?.[0] || "");
  return (
    <div className="flex h-fit flex-col">
      <div className="center max-h-[220px] w-full">
        <img
          className="max-h-[220px] max-w-full object-contain"
          src={activeImage}
          alt="details-product"
        />
      </div>
      <div className="flex w-full overflow-x-auto ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              activeImage === image
                ? "border-2 border-gray-200"
                : "border border-gray-100"
            } center mb-2 ml-3 mt-10 cursor-pointer rounded-md p-2 shadow-md`}
          >
            <img
              onClick={() => setActiveImage(image)}
              className="w-[80px] bg-transparent object-contain mix-blend-multiply  "
              src={image}
              alt="details-all-product"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
