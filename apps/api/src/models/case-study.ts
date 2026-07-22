import { model, models, Schema, type Model } from "mongoose";
import { imageMetadataSchema, publishFields, seoMetadataSchema } from "./shared.js";

const resultSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    context: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const caseStudySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    clientName: { type: String, trim: true },
    anonymized: { type: Boolean, default: false },
    industry: { type: String, required: true, trim: true },
    services: [{ type: String, required: true, trim: true }],
    summary: { type: String, required: true, trim: true },
    bodyHtml: { type: String, required: true },
    results: [resultSchema],
    permissionStatus: { type: String, required: true, trim: true },
    featuredImage: imageMetadataSchema,
    seo: { type: seoMetadataSchema, required: true },
    ...publishFields
  },
  { timestamps: true }
);

caseStudySchema.index({ state: 1, publishedAt: -1, order: 1 });
caseStudySchema.index({ state: 1, scheduledFor: -1, order: 1 });
caseStudySchema.index({ industry: 1, state: 1 });
caseStudySchema.index({ updatedAt: -1 });

export const CaseStudy: Model<any> =
  (models.CaseStudy as Model<any> | undefined) ?? model<any>("CaseStudy", caseStudySchema);
