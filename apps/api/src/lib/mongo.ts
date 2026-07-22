import mongoose from "mongoose";

export async function connectMongo(uri?: string) {
  if (!uri) {
    console.warn("MONGODB_URI is not set. API will start without database persistence.");
    return;
  }

  await mongoose.connect(uri);
}
