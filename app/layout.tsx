"use client";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import React, { ReactNode, Suspense } from "react";
import Header from "@/module/share/navbar/ui/Navbar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/module/share/footer/view/footerSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <SessionProvider>{children}</SessionProvider>
            <Footer />
          </QueryClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
