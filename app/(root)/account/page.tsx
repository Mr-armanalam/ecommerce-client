/* eslint-disable multiline-ternary */
/* eslint-disable @next/next/no-img-element */
"use client";
import AddressShower from "@/module/account/component/AddressShower";
import { lora } from "@/module/share/navbar/ui/Navbar";
import { AddressSaver } from "@/module/account/server/addressSaver";
import { allOrderItems } from "@/module/products/server/products.action";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IProducts {
  title: string;
  images: string[];
  description: string;
}
interface IOrders {
  line_items: [{ quantity: number }];
  name: string;
  email: string;
  products: IProducts[];
  city: string;
  postalCode: string;
  landmark: string;
  country: string;
  paid: boolean;
}

const Account = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [prevAddress, setPrevAddress] = useState([]);

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) return;
      const { orderItems } = await allOrderItems(session?.user?.id);
      if (!orderItems) {
        throw new Error("Failed to fetch orders");
      }
      setOrders(orderItems);
    })();
  }, [session?.user]);

  const handleAddressSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (session) formData.append("_id", session.user.id);
    const response = await AddressSaver(formData);

    if (response.status === "ok") {
      setPrevAddress(response?.clientUser?.address);
      setName("");
      setEmail("");
      setCity("");
      setCountry("");
      setPostalCode("");
      setLandmark("");
    }
  };

  return (
    <div className="nav-center mt-10 grid grid-cols-3 overflow-y-auto max-lg:mb-2 max-lg:grid-cols-1 max-lg:gap-y-2 lg:gap-10">
      <div className="white_box col-span-2">
        <Link
          href={process.env.NEXT_PUBLIC_ADMIN_URL || ""}
          className={`absolute ${lora.className} right-8 top-8 cursor-pointer rounded-2xl
          border-2 border-gray-300 bg-gray-900 px-4 py-2 text-sm text-white transition-colors
           active:border-gray-600 active:bg-white active:text-gray-600`}
        >
          Login as Seller
        </Link>
        <h2 className={` ${lora.className} `}>Orders</h2>
        {!orders?.length ? (
          <div className={`text-gray-500 ${lora.className}`}>
            Your Order is empty
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th className="max-lg:w-[40%] lg:w-[52%]">Product</th>
                  <th className="max-lg:w-[50%] lg:w-[32%]">Address</th>
                  <th className="w-16 max-sm:hidden">Paid</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <td className="flex flex-col gap-4 py-8 ">
                      {order?.products.length > 0 &&
                        order.products.map((product, index) => (
                          <div key={index} className="flex">
                            <div className="center h-[100px] w-[100px] rounded-md border border-gray-100 p-3 shadow-md">
                              <img
                                src={product?.images[0]}
                                alt="order product"
                                className="max-h-[80px] max-w-[80px]"
                              />
                            </div>
                            <div className=" ml-6 w-8/12 text-left max-lg:hidden">
                              <div className="text-[1.2rem] font-semibold text-gray-500">
                                {product?.title}
                              </div>
                              <div className="line-clamp-2 text-balance text-[.8rem] text-gray-400">
                                {product?.description}
                              </div>
                            </div>
                          </div>
                        ))}
                    </td>
                    <td className="relative text-sm text-gray-400 ">
                      <div className="absolute left-0 right-0 top-10 text-wrap">
                        name: {order.name} <br />
                        email: {order.email} <br />
                        address: {order.city} , {order.postalCode},{" "}
                        {order.landmark}, {order.country}
                      </div>
                    </td>
                    <td
                      className={`relative font-semibold max-sm:hidden ${order.paid ? "text-green-700" : "text-red-600"}`}
                    >
                      <p className="absolute top-16 ">
                        {order.paid ? "Yes" : "No"}
                      </p>
                    </td>
                    <td className="relative ">
                      <div className="absolute top-16 flex flex-col gap-20 pl-4 font-semibold text-gray-500">
                        {order?.line_items.length > 0 &&
                          order?.line_items.map((item, litem) => (
                            <p className="pl-1 " key={litem}>
                              {item.quantity}
                            </p>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div>
        <form className="white_box col-span-2" onSubmit={handleAddressSave}>
          <button
            type="button"
            className={`absolute ${lora.className} btn-primary1 btn_primary_Outline right-8 top-8
            rounded-2xl border-2 font-semibold text-gray-600 active:bg-gray-900 active:text-white`}
            onClick={() => signOut()}
          >
            Logout
          </button>
          <h2 className={`${lora.className}`}>New Address</h2>
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
          <button
            type="submit"
            className="btn-primary1 btn_block mt-6 rounded-md bg-[#222] py-2 text-white"
          >
            Save
          </button>
        </form>
        <AddressShower
          prevAddress={prevAddress}
          setName={setName}
          setEmail={setEmail}
          setCity={setCity}
          setCountry={setCountry}
          setPostalCode={setPostalCode}
          setLandmark={setLandmark}
        />
      </div>
    </div>
  );
};

export default Account;
