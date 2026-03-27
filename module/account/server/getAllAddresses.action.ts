/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ClientUser } from "@/db/model/Clientuser.model";
import { mongooseConnect } from "../../../db/mongoose";

export const getAllAddresses = async (_id: string) => {
  try {
    await mongooseConnect();
    const { address } = await ClientUser.findOne({ _id }).select("address");
    return { address: JSON.parse(JSON.stringify(address)) };
  } catch (error: any) {
    console.log(error.message);
    return { address: [] };
  }
};
