import { model, models, Schema, type Model } from "mongoose";

const redirectSchema = new Schema(
  {
    sourcePath: { type: String, required: true, unique: true, index: true, trim: true },
    targetPath: { type: String, required: true, trim: true },
    statusCode: { type: Number, enum: [301, 302, 307, 308], default: 301 },
    enabled: { type: Boolean, default: true, index: true },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export const Redirect: Model<any> =
  (models.Redirect as Model<any> | undefined) ?? model<any>("Redirect", redirectSchema);
