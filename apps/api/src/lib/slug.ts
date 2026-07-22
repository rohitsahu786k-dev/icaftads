import type { Model } from "mongoose";

export async function assertUniqueSlug(model: Model<any>, slug: string, existingId?: string) {
  const existing = (await model.findOne({ slug }, { _id: 1 }).lean().exec()) as {
    _id: unknown;
  } | null;

  if (!existing) return;
  if (existingId && String(existing._id) === existingId) return;

  const error = new Error("Slug already exists.");
  error.name = "ConflictError";
  throw error;
}
