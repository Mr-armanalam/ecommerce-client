import { Document, model, models, Schema, Types } from "mongoose";

interface IReviews extends Document {
  title: string;
  description: string;
  rating: number;
  userId: Types.ObjectId | undefined;
  productId: Types.ObjectId | undefined;
}

const ReviewSchema = new Schema<IReviews>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    userId: { type: Types.ObjectId, ref: "ClientUser" },
    productId: { type: Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

export const Review = models.Review || model("Review", ReviewSchema);
