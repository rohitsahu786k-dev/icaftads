import { describe, expect, it } from "vitest";
import { parseApiEnv, parseWebEnv } from "./index.js";

describe("environment validation", () => {
  it("parses API defaults", () => {
    const env = parseApiEnv({});
    expect(env.API_PORT).toBe(4000);
    expect(env.CORS_ORIGINS).toContain("http://localhost:3000");
  });

  it("parses web defaults", () => {
    const env = parseWebEnv({});
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
  });
});
