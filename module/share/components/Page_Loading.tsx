import { lora } from "@/module/share/navbar/ui/Navbar";
import Image from "next/image";
import React from "react";
import logo from "@/lib/data/logo.svg";

const PageLoading = () => {
  return (
    <div className={`${lora.className}`}>
      <div className="flex h-[85vh] items-center justify-center gap-x-6 max-sm:flex-col">
        <Image src={logo} alt="watermarklogo" width={150} height={150} />
        <h1 className="animate-pulse text-5xl font-bold text-gray-800">
          Please Wait...
        </h1>
      </div>
    </div>
  );
};

export default PageLoading;
