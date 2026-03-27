/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ClientUser } from "@/db/model/Clientuser.model";
import { mongooseConnect } from "../../../db/mongoose";

export const AddressSaver = async (frmdata: FormData) => {
  const formDataObject: { [key: string]: any } = {};
  frmdata.forEach((value, key) => {
    formDataObject[key] = value;
  });

  await mongooseConnect();

  const { name, email, city, postalCode, landmark, country, _id } =
    formDataObject;

  const clientUser = await ClientUser.findById(_id);
  clientUser.address.push({ name, email, city, postalCode, landmark, country });

  clientUser.save();
  return { status: "ok", clientUser: JSON.parse(JSON.stringify(clientUser)) };
};
