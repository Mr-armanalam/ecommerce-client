"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import SearchResult from "./SearchResult";
import ProductSearchResult from "./product-search-result";

export const ProductSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <form
      tabIndex={0}
      onBlur={() => setIsSearchActive(false)}
      onFocus={() => setIsSearchActive(true)}
      className="relative mt-2 h-18 flex items-center borde bordr-red-300  min-w-2xl "
    >
      <div
        className={`flex w-full shadow ${isSearchActive ? "rounded-lg" : "rounded-[100px]"} top-0 bg-white max-h-75 absolute px-10 flex-col justify-center items-center`}
      >
        <div
          className={`rounded-full flex h-14 my-2 w-full items-center px-4 bg-gray-50`}
        >
          <input
            className="w-full text-foregroundNew outline-0 border-0 px-4 "
            placeholder="Search your products"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className={`h-9 px-2 `}>
            <SearchIcon />
          </button>
        </div>
        {isSearchActive && <ProductSearchResult />}
      </div>
    </form>
  );
};

export default ProductSearch;
