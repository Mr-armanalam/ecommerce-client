import { CornerDownRightIcon } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { searchProducts } from "../server/getSearchResult.action";
import { formUrlQuery } from "@/lib/utils";

interface searchProp {
  title: string;
  category: string;
  id: string;
}
const ProductSearchResult = () => {
  const searchParams = useSearchParams();
  const [searchList, setSearchList] = useState<searchProp[]>([]);
  const type = searchParams.get("type");
  const searchQuery = searchParams.get("q") ?? "";
  const router = useRouter();

  const handleSearchProducts = useCallback(async () => {
    const fetchedProducts = await searchProducts({ query: searchQuery, type });
    setSearchList(JSON.parse(fetchedProducts));
  }, [searchQuery]);

  const handleSetCategory = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("ct", id);

    // Use a template literal with the leading slash
    router.push(`/categories?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    handleSearchProducts();
  }, [handleSearchProducts]);

  return (
    <div className="overflow-y-auto pb-2 w-full">
      <div className="flex px-2 justify-end text-xs items-center gap-x-1">
        <span>Results:</span> {searchQuery ? searchList.length : 0}
      </div>
      {searchQuery ? (
        <>
          <Separator />
          <div className="flex flex-col gap-y-1.5 mt-2">
            {searchList.length > 0 ? (
              searchList.map((list, i) => (
                <div
                  key={i}
                  onClick={() => handleSetCategory(list.category)}
                  className="flex text-sm cursor-pointer px-2 line-clamp-1 rounded gap-x-2 items-center"
                >
                  <CornerDownRightIcon size={15} /> {list.title}
                </div>
              ))
            ) : (
              <p className="text-sm font-semibold">No results</p>
            )}
          </div>
        </>
      ) : (
        <>
          <Separator className="mt-2" />
          <p className="text-xs mt-2 mb-1 px-2 font-semibold">Suggesstion:</p>
          <div className="flex gap-y-1.5 flex-col">
            {searchList.length > 0 &&
              searchList.map((list, i) => (
                <div
                  key={i}
                  onClick={() => handleSetCategory(list.category)}
                  className="flex text-sm cursor-pointer px-2 line-clamp-1 rounded gap-x-2 items-center"
                >
                  <CornerDownRightIcon size={15} /> {list.title}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSearchResult;
