import { model, models, Schema, type Model } from "mongoose";

const siteSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
    isPublic: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

export const SiteSetting: Model<any> =
  (models.SiteSetting as Model<any> | undefined) ?? model<any>("SiteSetting", siteSettingSchema);
