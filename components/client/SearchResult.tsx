/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { searchProducts } from "@/components/server/getSearchResult.action";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { formUrlQuery } from "@/lib/utils";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchList, setSearchList] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const type = searchParams.get("type");
  const searchQuery = searchParams.get("q") ?? "";

  const handleSearchProducts = useCallback(async () => {
    const fetchedProducts = await searchProducts({ query: searchQuery, type });
    setSearchList(JSON.parse(fetchedProducts));
  }, [searchQuery]);

  useEffect(() => {
    handleSearchProducts();
    if (isAdmin) {
      const delayDebounceFn = setTimeout(() => {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "type",
          value: "admin",
        });
        router.push(newUrl, { scroll: false });
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [handleSearchProducts, searchParams, router, isAdmin]);

  return (
    <div className="no-scrollbar absolute top-14 z-40 max-h-96 w-[47.6rem] overflow-y-auto rounded-b-2xl border-x-2 border-b-2 border-gray-500 bg-[#222] p-4">
      <div className="flex items-center justify-between">
        <h3 className=" text-xl font-bold text-gray-200">By Seller name:</h3>
        <Switch
          checked={isAdmin}
          onCheckedChange={() => setIsAdmin(!isAdmin)}
        />
      </div>
      <div className="relative flex">
        <span className="absolute right-0 top-3 ml-auto text-sm font-semibold text-gray-200">
          {searchList?.length} results
        </span>
      </div>
      {searchList?.length > 0 && (
        <div className="mt-8 flex flex-col gap-2">
          {searchList.map((product: any, index: number) => (
            <Link
              href={`/products/${product?.id}`}
              key={index}
              className="cursor-pointer rounded-md p-1.5 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <span>{product?.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
