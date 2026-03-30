// server/getSignup.action.ts
"use server";

import { mongooseConnect } from "@/db/mongoose";
import { ClientUser } from "@/db/model/Clientuser.model";
import bcrypt from "bcrypt"; // Remember to hash passwords here before creating!

export const getSignUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  
  try {
    await mongooseConnect();
    console.log(email,'emz');
    
    const existingUser = await ClientUser.findOne({ email });    

    if (existingUser) {
      return { error: "A user with this email already exists." };
    }

    // Hash password here in a real app before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    

    const user = await ClientUser.create({
      email,
      password: hashedPassword,
      role: "user",
      address: [],
    });

    if (!user) return { error: "Failed to create user." };

    return { message: "ok", status: 200 };
    
  } catch (error: any) {
    console.log(error.message);
    return { error: "Internal server error. Please try again." };
  }
};

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { mongooseConnect } from "@/db/mongoose";
// import { ClientUser } from "@/db/model/Clientuser.model";

// export const getSignUp = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   if (!email || !password) {
//     console.log("email and password are required");
//     return;
//   }
//   try {
//     await mongooseConnect();
//     const existingUser = await ClientUser.findOne({ email });

//     if (!existingUser) {
//       const user = await ClientUser.create({
//         email,
//         password,
//         role: "user",
//         address: [],
//       });
//       if (!user) return;

//       return { message: "ok", status: 200 };
//     }
//   } catch (error: any) {
//     console.log(error.message);
//     throw new Error(error.message);
//   }
// };

