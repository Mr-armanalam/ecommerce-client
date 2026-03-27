/* eslint-disable @typescript-eslint/no-explicit-any */

import { mongooseConnect } from "@/db/mongoose";
import { AdminUser } from "@/db/model/adminUser.model";
import { Order } from "@/db/model/Order.model";
import { Product } from "@/db/model/product";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SK) {
  throw new Error("Missing STRIPE_SK environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SK);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks = [];
  let result;

  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  if (!req.body) {
    throw new Error("Missing request body");
  }
  const buf = await buffer(req.body);
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    await mongooseConnect(); /// //////////
    event = stripe.webhooks.constructEvent(buf, sig!, endpointSecret!);
  } catch (err: any) {
    console.error(` Webhook signature verification failed.`, err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const paymentData = event.data.object as any;
      const orderId = paymentData.metadata.orderId;

      const SproductsIds = paymentData.metadata.productsIds;
      const productsIds = JSON.parse(SproductsIds);
      const products = await Product.find({ _id: { $in: productsIds } });
      const revenueByAdmin: { [key: string]: number } = {};

      products.forEach((product) => {
        if (product.adminUser) {
          const adminId = product.adminUser.toString();
          if (!revenueByAdmin[adminId]) {
            revenueByAdmin[adminId] = 0;
          }
          revenueByAdmin[adminId] += product.price;
        }
      });

      for (const [adminId, totalRevenue] of Object.entries(revenueByAdmin)) {
        try {
          await AdminUser.findByIdAndUpdate(
            adminId,
            { $inc: { totalRevenue } },
            { new: true },
          );
        } catch (error) {
          console.error(`Error updating Admin ID ${adminId}:`, error);
        }
      }

      const paid = paymentData.payment_status === "paid";
      if (paid && orderId) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
