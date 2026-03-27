import { Schema, model, models, Document, Types } from "mongoose";

interface Iorder extends Document {
  line_items: object;
  name: string;
  email: string;
  clientuser: Types.ObjectId | undefined;
  products: [Types.ObjectId | undefined];
  city: string;
  postalCode: string;
  landmark: string;
  country: string;
  status: string;
  paid: boolean;
}

const OrderSchema = new Schema<Iorder>(
  {
    line_items: Object,
    name: String,
    email: String,
    clientuser: { type: Types.ObjectId, ref: "ClientUser" },
    products: [{ type: Types.ObjectId, ref: "Product" }],
    city: String,
    postalCode: String,
    landmark: String,
    country: String,
    status: { type: String, default: "new" },
    paid: Boolean,
  },
  { timestamps: true }
);

export const Order = models.Order || model<Iorder>("Order", OrderSchema);
