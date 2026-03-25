"use client";
import Featured from "@/components/Featured";
import React from "react";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface props {
  _id: string;
  title: string;
  description: string;
  images: string[];
}
export const FeaturedProduct = ({
  featuredProduct,
}: {
  featuredProduct: props[];
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <div className="group h-90 border relative z-10 mt-4 px-10 rounded-md flex items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredProduct?.map((product, index) => (
            <CarouselItem key={index}>
              <Featured product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant={"outline"}
          size={"icon"}
          className="absolute -left-8 top-[50%] z-50 bg-transparent fill-gray-500 text-white opacity-0 transition-opacity group-hover:left-4 group-hover:opacity-100"
        />
        <CarouselNext
          variant={"outline"}
          className="absolute right-4 top-[50%] z-50 bg-transparent fill-gray-800 text-white opacity-0 group-hover:opacity-100"
        />
      </Carousel>
    </div>
  );
};
