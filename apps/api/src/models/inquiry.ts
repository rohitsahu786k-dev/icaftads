import type { ContactInquiryInput } from "@icraftads/validation";
import { model, models, Schema, type Model } from "mongoose";

const inquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    serviceInterest: { type: String, trim: true },
    requiredServices: [{ type: String, trim: true }],
    approximateBudget: { type: String, trim: true },
    timeline: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    utm: {
      source: { type: String, trim: true },
      medium: { type: String, trim: true },
      campaign: { type: String, trim: true },
      term: { type: String, trim: true },
      content: { type: String, trim: true }
    },
    landingPage: { type: String, trim: true },
    referrer: { type: String, trim: true },
    spam: {
      tokenPresent: { type: Boolean, default: false },
      verdict: { type: String, enum: ["unchecked", "passed", "failed"], default: "unchecked" }
    },
    consent: { type: Boolean, required: true }
  },
  { timestamps: true }
);

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ serviceInterest: 1, createdAt: -1 });
inquirySchema.index({ email: 1, createdAt: -1 });

export const Inquiry =
  (models.Inquiry as Model<ContactInquiryInput> | undefined) ??
  model<ContactInquiryInput>("Inquiry", inquirySchema);
