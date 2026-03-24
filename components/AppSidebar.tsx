/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import React, { useEffect, useState } from "react";
import { lora } from "./Navbar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { HomeIcon } from "./icons";
import { getCategories } from "@/components/server/getCategories.action";
import { Checkbox } from "./ui/checkbox";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface prop {
  _id: string;
  name: string;
  properties: Array<string>;
  children: Array<prop>;
}
export function AppSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [isChildChecked, setIsChildChecked] = useState<Record<string, boolean>>(
    {},
  );
  const [items, setItems] = useState<Array<prop>>([]);
  const { state } = useSidebar();

  const toggleChiledChecked = (title: string) => {
    setIsChildChecked((prevStates) => ({
      ...prevStates,
      [title]: !prevStates[title],
    }));
  };
  const toggleOpen = (title: string) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [title]: !prevStates[title],
    }));
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const category: any = await getCategories();
      setItems(JSON.parse(category));
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const updateCategoryWithDebounceFn = setTimeout(() => {
      if (isChildChecked) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "ct",
          value: Object.keys(isChildChecked)
            .filter((title) => isChildChecked[title])
            .join(",")
            .toLowerCase(),
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(updateCategoryWithDebounceFn);
  }, [searchParams, router, isChildChecked]);

  return (
    <Sidebar collapsible="icon" className={`${lora.className}`}>
      <SidebarHeader className="bg-primary-0 pl-3 pt-4">
        <h3
          className={` flex items-center justify-center rounded-lg bg-[#333] py-2 pr-6 text-2xl font-bold text-gray-300`}
        >
          <HomeIcon className="mr-1 size-6 text-gray-300" />
          {state === "expanded" && "QuirkCart"}
        </h3>
      </SidebarHeader>
      <SidebarHeader className="bg-primary-0 pl-3 pt-6">
        <h3 className={`text-xl font-bold ${lora.className} text-gray-500`}>
          {state === "expanded" ? "Categories" : <HomeIcon />}
        </h3>
      </SidebarHeader>
      <SidebarContent className="font-semibold text-gray-400">
        <SidebarGroup>
          <SidebarGroupContent>
            {state === "expanded" ? (
              // eslint-disable-next-line multiline-ternary
              <SidebarMenu>
                {items.map((item) => (
                  <Collapsible
                    defaultOpen={true}
                    key={item._id}
                    className="group/collapsible"
                    // open={openStates[item._id]}
                    onOpenChange={() => toggleOpen(item._id)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <SidebarMenuButton asChild>
                            <span>{item.name}</span>
                          </SidebarMenuButton>
                          <ChevronDown
                            className={`ml-auto transition-transform ${openStates[item._id] ? "-rotate-90" : ""}`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child, i) => (
                            <SidebarMenuSubItem key={i}>
                              <SidebarMenuButton>
                                <Checkbox
                                  checked={isChildChecked[child._id]}
                                  onCheckedChange={() =>
                                    toggleChiledChecked(child._id)
                                  }
                                />
                                {child.name}
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            ) : (
              <p className="text-wrap px-2 text-center leading-10 ">
                C A T E G O R I E S
              </p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {state === "expanded" && (
        <SidebarFooter className="text-center text-sm font-semibold text-gray-300 ">
          Search Your Products
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

// const items = [
//   {
//     _id: "675c0e9e3b69c541a28499bb",
//     name: "Mobiles",
//     properties: [],
//     children: [
//       { _id: "675d5e8a6c792646c91f64aa", name: "iPhones", properties: [] },
//       { _id: "675d5ea16c792646c91f64ae", name: "Samsung", properties: [] },
//       { _id: "675d5ec26c792646c91f64ba", name: "Xiaomi", properties: [] },
//     ],
//   },
//   {
//     _id: "676bffb9c0731b7673950eba",
//     name: "Watches",
//     properties: [],
//     children: [
//       { _id: "676c003ec0731b7673950ebe", name: "Men's watches", properties: [] },
//       { _id: "676c00ccc0731b7673950ec6", name: "Women's watches", properties: [] },
//     ],
//   },
//   // Add other categories here...
// ];
