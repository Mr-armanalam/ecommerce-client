import { Document, Schema, model, models } from "mongoose";

interface IAdminUser extends Document {
  name: string;
  email: string;
  image: string;
  totalRevenue: number;
  role: string;
}

const AdminUserSchema = new Schema<IAdminUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  totalRevenue: { type: Number, default: 0 },
  role: { type: String, enum: ["admin", "user"], default: "admin" },
});

export const AdminUser =
  models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);
