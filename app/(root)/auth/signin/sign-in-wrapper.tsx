"use client";

import PageLoading from "@/components/client/Page_Loading";
import SignIn from "@/components/client/SignIn";
import { Suspense } from "react";

export default function SignInWrapper() {
  return (
    <Suspense fallback={<PageLoading />}>
      <SignIn />
    </Suspense>
  );
}