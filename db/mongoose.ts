/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import mongoose from "mongoose";

export async function mongooseConnect () {
  const uri: string | undefined = process.env.MONGODB_URI;
  let isConnected: boolean = false;

  if (!uri) {
    return console.error("Missing MongoDB URI");
  }

  if (isConnected) {
    return console.log("Connected to MongoDB");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      return await mongoose.connection.asPromise();
    } else {
      await mongoose.connect(uri, { dbName: "quirkcartdb" });
      isConnected = true;
      console.log("Connected to MongoDB");
    }
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
