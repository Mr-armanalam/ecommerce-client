/* eslint-disable multiline-ternary */
/* eslint-disable @next/next/no-img-element */
"use client";
import AddressShower from "@/module/account/component/AddressShower";
import { lora } from "@/module/share/navbar/ui/Navbar";
import { getCartProduct } from "@/module/products/server/products.action";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  properties: { [key: string]: string };
}

const Cart = () => {
  const { cartItems, addProduct, removeProduct, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (cartItems.length > 0) {
      (async function () {
        const { product } = await getCartProduct(cartItems);
        setProducts(product);
      })();
    } else {
      setProducts([]);
    }
  }, [cartItems]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // This should only run once on mount

  const moreOfThisProduct = (productId: string) => {
    if (addProduct) {
      addProduct(productId);
    }
  };

  const lessOfThisProduct = (productId: string) => {
    if (removeProduct) {
      removeProduct(productId);
    }
  };

  const goToPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("cartProducts", JSON.stringify(cartItems));
    if (session) formData.append("clientuser", session.user.id);

    await fetch("/api/checkout", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = data.url;
      });
  };

  let total = 0;
  for (const productId of cartItems) {
    const price = products.find((p) => p._id === productId)?.price;

    if (price) {
      total += price;
    }
  }

  if (
    typeof window !== "undefined" &&
    window.location.href.includes("success")
  ) {
    return (
      <div className="nav-center mt-10 grid grid-cols-3 gap-10">
        <div className="col-span-2 rounded-md bg-white p-8">
          <h1 className="font-bold">Thanks for your order !</h1>
          <p className="ml-2 font-medium text-gray-500">
            We will email you when your order will be sent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="nav-center mt-10 grid grid-cols-3 max-md:mb-2 max-md:grid-cols-1 max-md:gap-y-2 md:gap-10">
      <div className="col-span-2 h-fit rounded-md bg-white p-8">
        <h2 className={`font-bold ${lora.className}`}>Cart</h2>
        {!cartItems?.length ? (
          <div className={lora.className}>Your cart is empty</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th className="md:w-[60%]">Product</th>
                  <th>Quantity</th>
                  <th>Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={index}>
                    <td className="flex ">
                      <div className="center h-[100px] w-[100px] rounded-md border border-gray-100 p-3 shadow-md">
                        <img
                          src={product.images[0]}
                          alt="cart product"
                          className="max-h-[80px] max-w-[80px]"
                        />
                      </div>
                      <div className=" ml-6 w-7/12 text-left max-sm:hidden">
                        <div className="text-[1.2rem] font-semibold text-gray-500">
                          {product?.title}
                        </div>
                        <div className="line-clamp-2 text-balance text-[.8rem] text-gray-400">
                          {product?.description}
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => lessOfThisProduct(product._id)}
                        className="mr-1 w-6 rounded bg-gray-400 pb-0.5 text-center text-white"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-500">
                        {cartItems.filter((id) => id === product._id).length}
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(product?._id)}
                        className=" ml-1 w-6 rounded bg-gray-400 pb-0.5 text-center text-white"
                        type="button"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      {" "}
                      $
                      {cartItems.filter((id) => id === product._id).length *
                        product.price || "-"}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>{"$" + total || "-"}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
      {!!cartItems?.length && (
        <div>
          <form
            onSubmit={goToPayment}
            className="col-auto max-h-fit rounded-md bg-white p-8"
          >
            <h2 className={lora.className}>Order information</h2>
            <input
              className="input-b"
              type="text"
              required
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input-b"
              type="email"
              required
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-4">
              <input
                className="input-b"
                type="text"
                required
                placeholder="City"
                value={city}
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="input-b"
                type="number"
                required
                placeholder="Postel Code"
                value={postalCode}
                name="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <input
              className="input-b"
              type="text"
              required
              placeholder="Landmark"
              value={landmark}
              name="landmark"
              onChange={(e) => setLandmark(e.target.value)}
            />
            <input
              className="input-b"
              type="text"
              required
              placeholder="Country"
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
            />
            {/* <input type="hidden" name="products" value={cartItems.join(',')} /> */}
            <button
              type="submit"
              className="btn-primary1 btn_block mt-6 rounded-md bg-[#222] py-2 text-white"
            >
              Continue to payment
            </button>
          </form>
          <AddressShower
            setName={setName}
            setEmail={setEmail}
            setCity={setCity}
            setCountry={setCountry}
            setPostalCode={setPostalCode}
            setLandmark={setLandmark}
            isCart={true}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
