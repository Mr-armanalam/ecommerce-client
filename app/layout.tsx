"use client";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import React, { ReactNode, Suspense } from "react";
import { CartContextProvider } from "@/context/CartContext";
import Header from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { WishlistProvider } from "@/context/WishlistContext";

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
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>
          <CartContextProvider>
            <WishlistProvider>
              <Header />
              <SessionProvider>{children}</SessionProvider>
            </WishlistProvider>
          </CartContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
