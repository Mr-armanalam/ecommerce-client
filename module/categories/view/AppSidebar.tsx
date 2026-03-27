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

import { lora } from "../../share/navbar/ui/Navbar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import { getCategories } from "@/module/categories/server/getCategories.action";
import { Checkbox } from "../../../components/ui/checkbox";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    () => {
      const data = searchParams.get("ct");
      if (data && data !== "null" && data !== "") {
        const initialMap: Record<string, boolean> = {};
        data.split(",").forEach((id) => {
          if (id !== "null") initialMap[id] = true;
        });
        return initialMap;
      }
      return {};
    },
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
      // 1. Generate the new list of IDs
      const activeKeys = Object.keys(isChildChecked).filter(
        (id) => isChildChecked[id] && id !== "" && id !== "null",
      );

      const newValue = activeKeys.join(",").toLowerCase();

      // 2. Check current value in URL to prevent redundant pushes
      const currentParams = new URLSearchParams(window.location.search);
      const currentValue = currentParams.get("ct") || "";

      // 3. ONLY push if the value has actually changed
      if (newValue !== currentValue) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "ct",
          value: newValue,
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(updateCategoryWithDebounceFn);
    // Remove searchParams and router from here to stop the loop
  }, [isChildChecked]);

  return (
    <Sidebar collapsible="icon" className={`${lora.className}`}>
      <SidebarContent className="font-semibold mt-24 text-gray-400">
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
