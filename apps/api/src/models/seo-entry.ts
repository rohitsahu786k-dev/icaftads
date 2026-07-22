import { model, models, Schema, type Model } from "mongoose";
import { seoMetadataSchema } from "./shared.js";

const seoEntrySchema = new Schema(
  {
    path: { type: String, required: true, unique: true, index: true, trim: true },
    seo: { type: seoMetadataSchema, required: true }
  },
  { timestamps: true }
);

export const SeoEntry: Model<any> =
  (models.SeoEntry as Model<any> | undefined) ?? model<any>("SeoEntry", seoEntrySchema);
