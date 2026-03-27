/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, model, models, Schema, Types } from "mongoose";

export interface Iproduct extends Document {
  adminUser: Types.ObjectId | undefined;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Types.ObjectId | undefined;
  properties: object | any;
  rating: number;
  sells: number;
  totalItem: number;
}

const ProductSchema = new Schema<Iproduct>(
  {
    adminUser: { type: Types.ObjectId, ref: "AdminUser" },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    rating: { type: Number, default: 0 },
    sells: { type: Number, default: 0 },
    totalItem: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
