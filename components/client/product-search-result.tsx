import { CornerDownRightIcon } from "lucide-react";
import { Separator } from "../ui/separator";

const ProductSearchResult = () => {
  return (
    <div className="overflow-y-auto pb-2 w-full">
      <div className="flex px-2 justify-end text-xs items-center gap-x-1">
        <span>Results:</span>25{" "}
      </div>
      <Separator />
      <div className="flex flex-col gap-y-1.5 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            onClick={()=> console.log(i)}
            className="flex text-sm cursor-pointer px-2 line-clamp-1 rounded gap-x-2 items-center"
          >
            <CornerDownRightIcon size={15} /> arman is a good boy
          </div>
        ))}
      </div>
      <Separator className="mt-2" />
      <p className="text-xs mt-2 mb-1 px-2 font-semibold">Suggesstion:</p>
      <div className="flex gap-y-1.5 flex-col">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex text-sm cursor-pointer px-2 rounded line-clamp-1 gap-x-2 items-center"
          >
            <CornerDownRightIcon size={15} /> arman is a good boy
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearchResult;
