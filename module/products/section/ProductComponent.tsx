"use client";

import React from "react";

export const ProductPropertes = ({
  properties,
}: {
  properties: { [key: string]: string };
}) => {
  const productPropertes = Object.keys(properties);
  return (
    <div className="ml-1 text-sm text-gray-700">
      {productPropertes &&
        productPropertes.reverse().map((product, index) => (
          <p key={index} className="font-semibold text-gray-600">
            {product}: {properties[product]}
          </p>
        ))}
    </div>
  );
};
