"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import SearchResult from "./SearchResult";

export const ProductSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

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
    <div className="relative h-16 shadow px-10 rounded-full bg-white min-w-xl flex flex-col justify-center items-center">
      <div className={`rounded-full flex h-14 w-full items-center px-4 bg-gray-50`}>
        <input
          className="w-full text-foregroundNew outline-0 border-0 px-4 "
          placeholder="Search your products"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className={`h-[36px] px-2 `}
        >
          <SearchIcon />
        </button>
      </div>
      {/* {isOpen && <SearchResult />} */}
    </div>
  );
};

export default ProductSearch;
