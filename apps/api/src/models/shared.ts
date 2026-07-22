import { Schema } from "mongoose";

export const imageMetadataSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    width: { type: Number },
    height: { type: Number },
    caption: { type: String, trim: true }
  },
  { _id: false }
);

export const seoMetadataSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    canonicalPath: { type: String, trim: true },
    noindex: { type: Boolean, default: false },
    image: imageMetadataSchema
  },
  { _id: false }
);

export const publishFields = {
  state: {
    type: String,
    enum: ["draft", "published", "scheduled", "archived"],
    default: "draft",
    index: true
  },
  publishedAt: { type: Date },
  scheduledFor: { type: Date, index: true }
};
