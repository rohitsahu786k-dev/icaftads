import { model, models, Schema, type Model } from "mongoose";
import { imageMetadataSchema, publishFields } from "./shared.js";

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    roleTitle: { type: String, required: true, trim: true },
    bioHtml: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    photo: imageMetadataSchema,
    credentialStatus: { type: String, required: true, trim: true },
    ...publishFields
  },
  { timestamps: true }
);

teamMemberSchema.index({ state: 1, publishedAt: -1, sortOrder: 1 });
teamMemberSchema.index({ state: 1, scheduledFor: -1, sortOrder: 1 });
teamMemberSchema.index({ updatedAt: -1 });

export const TeamMember: Model<any> =
  (models.TeamMember as Model<any> | undefined) ?? model<any>("TeamMember", teamMemberSchema);
