/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CategoriesResult from "@/module/categories/ui/CategoriesResult";
import ComponentLoader from "@/module/categories/ui/ComponentLoader";
import { getAllProducts } from "@/module/home/server/allProducts.action";
import { allProductsByCategory } from "@/module/categories/server/getAllProductsByCatg";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Categories = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("ct");
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    if (searchQuery) {
      (async () => {
        const fetchedProduct: any = await allProductsByCategory(
          searchQuery || "",
        );
        if (fetchedProduct?.length > 0) {
          setProducts(JSON.parse(fetchedProduct));
        }
      })();
    } else {
      (async () => {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      })();
    }
  }, [searchParams, searchQuery]);

  return (
    <>
      <div className="pb-8">
        {products?.length > 0 ? (
          products.map((product, i) => (
            <div key={i} className="nav-center">
              <CategoriesResult {...product} />
            </div>
          ))
        ) : (
          <ComponentLoader className="h-[90vh] w-[80vw]" />
        )}
      </div>
    </>
  );
};

export default Categories;

// adminUser: id
// category: id
// description: string
// images: array of string
// price: number
// properties: object
// sells: number
// title: string
// totalItem:number
// updatedAt: date
// _id
