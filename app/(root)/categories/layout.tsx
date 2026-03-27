import { Metadata } from "next";
import React, { ReactNode, Suspense } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/module/categories/view/AppSidebar";

export const metadata: Metadata = {
  title: "QuirkCart | Categories",
  description: "Do you need something, Let's buy together",
  applicationName: "QuirkCart",
  keywords: [
    "Quirkcart",
    "QuirkCart",
    "quirkcart",
    "quirk cart",
    "quirkcart ecommerce website",
    "quirkcart store",
  ],
  creator: "Arman Alam",
  icons: "qlogo.svg",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </Suspense>
  );
};

export default Layout;
