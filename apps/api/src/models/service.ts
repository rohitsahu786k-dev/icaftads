import { model, models, Schema, type Model } from "mongoose";
import { imageMetadataSchema, publishFields, seoMetadataSchema } from "./shared.js";

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    bodyHtml: { type: String, required: true },
    order: { type: Number, default: 0 },
    featuredImage: imageMetadataSchema,
    seo: { type: seoMetadataSchema, required: true },
    proofStatus: { type: String, required: true, trim: true },
    ...publishFields
  },
  { timestamps: true }
);

serviceSchema.index({ state: 1, publishedAt: -1, order: 1 });
serviceSchema.index({ state: 1, scheduledFor: -1, order: 1 });
serviceSchema.index({ updatedAt: -1 });

export const Service: Model<any> =
  (models.Service as Model<any> | undefined) ?? model<any>("Service", serviceSchema);
