import { Schema, models, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  properties: {
    type: Array,
    default: [],
  },
});

export const Category = models.Category || model("Category", categorySchema);
