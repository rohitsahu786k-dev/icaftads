import "dotenv/config";
import { parseApiEnv } from "@icraftads/config";
import { connectMongo } from "./lib/mongo.js";
import { createApiApp } from "./server.js";

const env = parseApiEnv(process.env);
const app = createApiApp(env);

async function start() {
  await connectMongo(env.MONGODB_URI);

  app.listen(env.API_PORT, () => {
    console.log(`I Craft Ads API listening on ${env.API_PORT}`);
  });
}

start().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
