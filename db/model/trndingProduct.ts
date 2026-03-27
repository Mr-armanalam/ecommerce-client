import { Schema, model, models, Document, Types } from "mongoose";

interface TrandingSchemaProps extends Document {
  TrndProduct: [Types.ObjectId];
  CategoryName: [string];
}

const TrandingSchema = new Schema<TrandingSchemaProps>(
  {
    TrndProduct: [
      { type: Types.ObjectId, ref: "Product", unique: true, required: true },
    ],
    CategoryName: [{ type: String, require: true, default: null }],
  },
  { timestamps: true }
);

export const Tranding = models.Tranding || model("Tranding", TrandingSchema);
