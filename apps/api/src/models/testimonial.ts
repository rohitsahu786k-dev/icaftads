import { model, models, Schema, type Model } from "mongoose";
import { imageMetadataSchema, publishFields } from "./shared.js";

const testimonialSchema = new Schema(
  {
    quote: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    company: { type: String, trim: true },
    permissionStatus: { type: String, required: true, trim: true },
    featuredImage: imageMetadataSchema,
    ...publishFields
  },
  { timestamps: true }
);

testimonialSchema.index({ state: 1, publishedAt: -1, order: 1 });
testimonialSchema.index({ state: 1, scheduledFor: -1, order: 1 });
testimonialSchema.index({ updatedAt: -1 });

export const Testimonial: Model<any> =
  (models.Testimonial as Model<any> | undefined) ?? model<any>("Testimonial", testimonialSchema);
