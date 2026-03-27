/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { mongooseConnect } from "@/db/mongoose";
import { ClientUser } from "@/db/model/Clientuser.model";

export const getSignUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    console.log("email and password are required");
    return;
  }
  try {
    await mongooseConnect();
    const existingUser = await ClientUser.findOne({ email });

    if (!existingUser) {
      const user = await ClientUser.create({
        email,
        password,
        role: "user",
        address: [],
      });
      if (!user) return;

      return { message: "ok", status: 200 };
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// await signIn("credentials", {
//   email,
//   password,
//   callbackUrl: "/account",
// });
// return NextResponse.json({message: "SignUpSuccess"}, { status: 200 });
