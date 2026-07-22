import { model, models, Schema, type Model } from "mongoose";
import { imageMetadataSchema, publishFields, seoMetadataSchema } from "./shared.js";

const blogArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    bodyHtml: { type: String, required: true },
    category: { type: String, required: true, trim: true, index: true },
    tags: [{ type: String, trim: true }],
    authorName: { type: String, required: true, trim: true },
    featuredImage: imageMetadataSchema,
    seo: { type: seoMetadataSchema, required: true },
    ...publishFields
  },
  { timestamps: true }
);

blogArticleSchema.index({ state: 1, publishedAt: -1, order: 1 });
blogArticleSchema.index({ state: 1, scheduledFor: -1, order: 1 });
blogArticleSchema.index({ category: 1, state: 1, publishedAt: -1 });
blogArticleSchema.index({ updatedAt: -1 });

export const BlogArticle: Model<any> =
  (models.BlogArticle as Model<any> | undefined) ?? model<any>("BlogArticle", blogArticleSchema);
