import PageLoading from "@/module/share/components/Page_Loading";
import SignIn from "@/module/share/login/SignIn";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <SignIn />
    </Suspense>
  );
}
