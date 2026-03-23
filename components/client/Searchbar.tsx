"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import SearchResult from "./SearchResult";

interface props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Searchbar = ({ isOpen, setIsOpen }: props) => {
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
        setIsOpen(true);

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
    <div
      className="relative flex flex-col items-center"
      // onClick={() => setIsOpen(false)}
    >
      <div
        className={`mt-4 flex h-10 ${isOpen ? "rounded-t-3xl border-b-gray-400" : "rounded-full"} border-2 border-gray-500 bg-primary-100`}
      >
        <input
          className="w-180 px-4 font-semibold"
          style={{ border: "none", background: "none" }}
          placeholder="Search your products"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className={`h-[36px] border-l-2 border-gray-500 bg-gray-800 px-2 text-white ${isOpen ? "rounded-tr-[22px]" : "rounded-r-full"}`}
        >
          <SearchIcon />
        </button>
      </div>
      {isOpen && <SearchResult />}
    </div>
  );
};

export default Searchbar;
