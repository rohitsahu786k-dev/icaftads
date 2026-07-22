import { model, models, Schema, type Model } from "mongoose";

const adminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["owner", "admin", "editor", "viewer"], default: "editor" },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export const AdminUser: Model<any> =
  (models.AdminUser as Model<any> | undefined) ?? model<any>("AdminUser", adminUserSchema);
