"use client";
import { useContext, useState, useRef } from "react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ShoppingBag, Heart, User, Menu, X, UserCircle } from "lucide-react";
import { Lora } from "next/font/google";
import ProductSearch from "./client/ProductSearch";
import { WishlistContext } from "@/context/WishlistContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const { cartProducts } = useContext(CartContext);
  const { wishlistProduct } = useContext(WishlistContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (isMobileOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 },
      );
    } else {
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

  return (
    <nav className="sticky top-0 z-100 w-full border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto max-sm:px-4 md:px-6">
        <div className="flex h-22 items-center justify-between">
          <Link
            href="/"
            className={`${lora.className} relative  z-10 text-4xl font-black tracking-tighter mix-blend-exclusion transition-transform text-black hover:scale-105`}
          >
            {isMobile ? (
              <Image src={"/logo.png"} height={60} width={60} alt="logo" />
            ) : (
              "QuirkCart"
            )}
          </Link>

          <div className=" items-center gap-6 md:flex">
            <ProductSearch />
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/wishlist"
              className="relative max-sm:hidden text-gray-600 hover:scale-110 transition-colors hover:text-black"
            >
              <Heart size={20} />{" "}
              {wishlistProduct?.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {wishlistProduct.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative max-sm:hidden text-gray-600 hover:scale-110 transition-colors hover:text-black"
            >
              <ShoppingBag size={20} />
              {cartProducts?.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="relative max-sm:hidden text-gray-600 hover:scale-110 transition-colors hover:text-black"
            >
              <span className="transition-transform group-hover:-translate-y-0.5">
                <UserCircle size={28} />{" "}
              </span>
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="rounded-lg md:p-2 text-gray-600 hover:bg-white/10 md:hidden"
            >
              <Menu size={36} />
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          className=" bg-black h-screen fixed top-0 right-0 bottom-0 inset-0 z-60 flex flex-col p-10 sm:hidden translate-x-full"
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
      )}
    </nav>
  );
}
