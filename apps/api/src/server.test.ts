import { describe, expect, it } from "vitest";
import { createApiApp } from "./server.js";

const app = createApiApp({
  NODE_ENV: "test",
  API_PORT: 4000,
  CORS_ORIGINS: ["http://localhost:3000"],
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX: 100,
  ADMIN_JWT_SECRET: "test-secret-that-is-long-enough-for-validation",
  ADMIN_COOKIE_NAME: "icraft_admin",
  ADMIN_SESSION_TTL_SECONDS: 28800
});

describe("API app", () => {
  it("creates the Express app", () => {
    expect(app).toBeDefined();
  });

  it("exposes health and database readiness endpoints", async () => {
    const server = app.listen(0);
    const address = server.address();

    if (!address || typeof address === "string") {
      server.close();
      throw new Error("Test server did not bind to a TCP port.");
    }

    try {
      const baseUrl = `http://127.0.0.1:${address.port}`;
      const health = await fetch(`${baseUrl}/health`);
      const ready = await fetch(`${baseUrl}/ready`);

      expect(health.status).toBe(200);
      expect(await health.json()).toMatchObject({ ok: true });
      expect(ready.status).toBe(503);
      expect(await ready.json()).toMatchObject({
        ok: false,
        data: {
          database: "unavailable",
          status: "not_ready"
        }
      });
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    }
  });
});
