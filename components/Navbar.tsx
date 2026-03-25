"use client";
import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Home,
  ShoppingBag,
  Heart,
  User,
  LayoutGrid,
  Search,
  Menu,
  X,
  UserRound,
  UserCircle,
} from "lucide-react";
import { Lora } from "next/font/google";
import ProductSearch from "./client/ProductSearch";

// Register the GSAP plugin for React
gsap.registerPlugin(useGSAP);

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const { cartProducts } = useContext(CartContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const mobileMenuRef = useRef(null);
  // const menuLinksRef = useRef([]);

  // GSAP Animation for Mobile Menu
  useGSAP(() => {
    if (isMobileOpen) {
      // Slide menu in
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      // Staggered fade-in for links
      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 },
      );
    } else {
      // Slide menu out
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMobileOpen]);

  const navLinks = [
    { name: "Wishlist", href: "/wishlist", icon: <Heart size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingBag size={20} /> },
    { name: "Account", href: "/account", icon: <User size={18} /> },
  ];
  // const navLinks = [
  //   { name: "Products", href: "/products", icon: <ShoppingBag size={18} /> },
  //   { name: "Categories", href: "/categories", icon: <LayoutGrid size={18} /> },
  //   { name: "Wishlist", href: "/wishlist", icon: <Heart size={18} /> },
  // ];

  return (
    <nav className="sticky text-foregroundNew top-0 z-100 w-full border-b border-white/5 bg-primar-800 backdrop-blur-xl">
      <div className="mx-auto  px-6">
        <div className="flex h-22 items-center justify-between">
          <Link
            href="/"
            className={`${lora.className} bg-linear-to-r from-foregroundNew mix-blend-exclusion to-foregroundNew-500 bg-clip-text text-4xl font-black tracking-tighter text-transparent transition-transform hover:scale-105`}
          >
            QuirkCart
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <ProductSearch />
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/wishlist"
              className="relative text-gray-400 transition-colors hover:text-white"
            >
              <Heart size={20} />{" "}
              {cartProducts?.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-400 transition-colors hover:text-white"
            >
              <ShoppingBag size={20} />
              {cartProducts?.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-400 transition-colors hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-y-0.5">
                <UserCircle size={28} />{" "}
              </span>
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        style={{ transform: "translateX(100%)" }} // Initial state
        className=" bg-black h-screen fixed top-0 bottom-0 inset-0 z-60 flex flex-col p-10 md:hidden"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-full p-2 text-white hover:bg-white/5"
          >
            <X size={32} />
          </button>
        </div>

        <nav className="mt-12 flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="mobile-link flex items-center gap-5 text-3xl font-bold text-white transition-colors hover:text-blue-400"
            >
              <span className="text-blue-500">{link.icon}</span>
              {link.name}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={() => setIsMobileOpen(false)}
            className="mobile-link mt-4 flex items-center justify-between rounded-2xl bg-white/5 p-6"
          >
            <span className="text-xl font-medium text-white">Your Cart</span>
            <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1 text-sm">
              <ShoppingBag size={16} />
              {cartProducts?.length || 0}
            </div>
          </Link>
        </nav>
      </div>
    </nav>
  );
}

// "use client";
// import { CartContext } from "@/context/CartContext";
// import { Lora } from "next/font/google";
// import Link from "next/link";
// import React, { useContext, useRef, useState } from "react";
// import { HomeIcon, MenuIcon } from "./icons";
// import { usePathname } from "next/navigation";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { Heart, Home, LayoutGrid, ShoppingBag, User } from "lucide-react";

// export const lora = Lora({
//   subsets: ["latin"],
//   display: "swap",
// });

// export default function Header() {
//   const { cartProducts } = useContext(CartContext);
//   const [isMobileOpen, setisMobileOpen] = useState(false);

//   const pathname = usePathname();

//   const mobileMenuRef = useRef(null);
//   const menuLinksRef = useRef([]);

//   // GSAP Animation for Mobile Menu
//   useGSAP(() => {
//     if (isMobileOpen) {
//       // Slide menu in
//       gsap.to(mobileMenuRef.current, {
//         x: 0,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//       // Staggered fade-in for links
//       gsap.fromTo(
//         ".mobile-link",
//         { y: 20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 },
//       );
//     } else {
//       // Slide menu out
//       gsap.to(mobileMenuRef.current, {
//         x: "100%",
//         duration: 0.4,
//         ease: "power3.in",
//       });
//     }
//   }, [isMobileOpen]);

//   const navLinks = [
//     { name: "Home", href: "/", icon: <Home size={18} /> },
//     { name: "Products", href: "/products", icon: <ShoppingBag size={18} /> },
//     { name: "Categories", href: "/categories", icon: <LayoutGrid size={18} /> },
//     { name: "Wishlist", href: "/wishlist", icon: <Heart size={18} /> },
//     { name: "Account", href: "/account", icon: <User size={18} /> },
//   ];

//   return (
//     // `${lora.className} text-2xl font-black tracking-tighter bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent hover:scale-105 transition-transform`
//     <header className="bg-primary-900/90 sticky top-0 z-50 w-full border-b border-white/5 bg-[#222] backdrop-blur-xl">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="flex h-20 items-center justify-between">
//           <Link
//             className={`flex bg-linear-to-r from-gray-400 to-gray-200 bg-clip-text max-sm:relative max-sm:z-20
//              ${lora.className} text-xl font-bold text-transparent `}
//             href={"/"}
//           >
//             {" "}
//             <HomeIcon />
//             QuirkCart
//           </Link>
//           <nav
//             className={`flex gap-4 text-[#aaa]  ${isMobileOpen ? "max-sm:flex-col" : "max-sm:hidden"} max-sm:fixed
//           max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:z-10 max-sm:bg-[#222] max-sm:p-5 max-sm:pt-16 `}
//           >
//             <Link href="/">Home</Link>
//             <Link href="/products">All product</Link>
//             <Link href="/wishlist">WishList</Link>
//             <Link href="/categories">Categories</Link>
//             <Link href={"/account"}>Account</Link>
//             <Link href={"/cart"}>Cart ({cartProducts?.length})</Link>
//           </nav>

//           <button
//             onClick={() => setisMobileOpen((prev) => !prev)}
//             className="bg-transparent text-white max-sm:relative max-sm:z-10 sm:hidden "
//           >
//             <MenuIcon />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
