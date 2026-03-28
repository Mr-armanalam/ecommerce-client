"use client";

import { useState } from "react";
import { getSubscribe } from "../server/getSubscribe";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await getSubscribe(email);
      const data = JSON.parse(res);

      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setMessage("Error subscribing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-700 py-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="text-white font-semibold">
          Subscribe to our newsletter
        </h4>
        <p className="text-sm">Get latest updates & offers</p>
      </div>

      <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
        <div className="flex gap-2 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 text-white py-2 rounded-md bg-gray-800 border border-gray-600 text-sm w-full md:w-64 focus:outline-none"
          />

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </div>

        {message && <p className="text-xs text-gray-400 mt-1">{message}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
