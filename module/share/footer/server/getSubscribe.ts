'use server'

import newsLetterModel from "@/db/model/newsLetter.model";
import { mongooseConnect } from "@/db/mongoose";

export async function getSubscribe(email: string) {
  try {
    await mongooseConnect();

    if (!email || !email.includes("@")) {
      return JSON.stringify({ message: "Invalid email" });
    }

    const existing = await newsLetterModel.findOne({ email });

    if (existing) {
      return JSON.stringify({ message: "Already subscribed" });
    }

    await newsLetterModel.create({ email });

    return JSON.stringify({ message: "Subscribed successfully" });
  } catch (error) {
    return JSON.stringify({ message: "Something went wrong" });
  }
}
