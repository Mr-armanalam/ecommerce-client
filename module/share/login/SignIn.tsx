"use client";

import { lora } from "@/module/share/navbar/ui/Navbar";
import { getSignUp } from "@/module/share/login/server/getSignup.action";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for errors
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Call NextAuth
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirect to NextAuth error page
    });

    if (res?.error) {
      setError(res.error); // Display the error thrown in authorize()
    } else if (res?.ok) {
      router.push("/account"); // Manually redirect on success
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const result = await getSignUp({ email, password });

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.status === 200) {

        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError(res.error);
        } else {
          router.push("/account");
        }
      }
    } catch (err) {
      setError("Something went wrong during sign up.");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div className="center h-[90vh] max-md:px-4 md:px-12 ">
      <div className="grid h-fit w-full grid-cols-2 rounded-3xl bg-white max-sm:grid-cols-1 max-sm:p-10 sm:p-16 lg:w-[72vw]">
        <div className={`${lora.className}`}>
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-2 text-gray-500 hover:text-gray-800 max-sm:hidden"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div>
          {/* Display Error Message UI */}
          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
            className="flex flex-col gap-4"
          >
            <input name="email" type="email" placeholder="email" required />
            <input
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <button
              className="btn_block mt-3 rounded-3xl bg-gray-800 px-6 py-2 font-bold text-white"
              type="submit"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            <label className="text-center font-bold text-gray-600">OR</label>
          </form>
          <button
            className="btn_block mt-2 rounded-3xl border-2 border-gray-400 px-6 py-2 font-bold "
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </button>
          {/* extra for responsive */}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-2 text-gray-500 hover:text-gray-800 max-sm:pl-10 sm:hidden"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
