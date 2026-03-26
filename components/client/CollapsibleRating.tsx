"use client";
import React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { lora } from "../Navbar";
import { StarIcon } from "../icons";

const CollapsibleRating = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="absolute bottom-0 rounded-lg bg-gray-50 p-1">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="min-w-132 space-y-2 rounded-lg bg-white px-8 py-1"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h3 className={`${lora.className} font-bold text-gray-500`}>
            Write a Review
          </h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <form className="flex flex-col gap-4">
            <div className="ml-auto flex">
              {[...Array(5)].map((star, i) => (
                <StarIcon key={i} className="size-5" />
              ))}
            </div>
            <input type="text" name="title" placeholder="Title" id="title" />
            <textarea
              name="description"
              placeholder="Description"
              className="rounded-lg border-b px-2 outline-none"
              id="description"
            />
            <button
              type="submit"
              className="btn-primary1 btn_block mt-6 rounded-md bg-primaryMain py-2.5 text-white"
              id="submit"
            >
              Add Your Review
            </button>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapsibleRating;
