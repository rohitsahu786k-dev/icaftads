import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApiApp } from "./server.js";

const env = {
  NODE_ENV: "test" as const,
  API_PORT: 4000,
  CORS_ORIGINS: ["http://localhost:3000"],
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX: 100,
  ADMIN_JWT_SECRET: "test-secret-that-is-long-enough-for-validation",
  ADMIN_COOKIE_NAME: "icraft_admin",
  ADMIN_SESSION_TTL_SECONDS: 28800
};

const app = createApiApp(env);
let mongo: MongoMemoryServer | undefined;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongo?.stop();
});

async function loginOwner() {
  await request(app).post("/auth/bootstrap").send({
    name: "Owner",
    email: "owner@example.com",
    password: "very-secure-password",
    role: "owner"
  });

  const response = await request(app).post("/auth/login").send({
    email: "owner@example.com",
    password: "very-secure-password"
  });

  const cookie = response.headers["set-cookie"];
  if (!cookie) {
    throw new Error("Login did not set an admin cookie.");
  }

  return cookie;
}

const servicePayload = {
  title: "SEO",
  slug: "seo-dubai",
  excerpt: "Technical and content-led SEO support for qualified organic visibility.",
  bodyHtml: "<p>SEO body<script>alert('x')</script></p>",
  order: 1,
  seo: {
    title: "SEO Agency Dubai | I Craft Ads",
    description:
      "SEO strategy, technical SEO and content planning for more qualified organic visibility.",
    noindex: false
  },
  proofStatus: "[OWNER MUST PROVIDE VERIFIED SEO RESULT]",
  state: "draft"
};

describe("CMS integration", () => {
  it("requires admin auth for private CMS routes", async () => {
    const response = await request(app).get("/admin/services");

    expect(response.status).toBe(401);
    expect(response.body.ok).toBe(false);
  });

  it("creates draft content, enforces unique slugs, sanitises HTML and hides drafts publicly", async () => {
    const cookie = await loginOwner();

    const created = await request(app)
      .post("/admin/services")
      .set("Cookie", cookie)
      .send(servicePayload);

    expect(created.status).toBe(201);
    expect(created.body.data.item.bodyHtml).not.toContain("<script>");

    const duplicate = await request(app)
      .post("/admin/services")
      .set("Cookie", cookie)
      .send(servicePayload);

    expect(duplicate.status).toBe(409);

    const publicDraft = await request(app).get("/public/services/seo-dubai");
    expect(publicDraft.status).toBe(404);

    const published = await request(app)
      .put(`/admin/services/${created.body.data.item._id}`)
      .set("Cookie", cookie)
      .send({
        ...servicePayload,
        state: "published",
        publishedAt: new Date().toISOString()
      });

    expect(published.status).toBe(200);

    const publicPublished = await request(app).get("/public/services/seo-dubai");
    expect(publicPublished.status).toBe(200);
    expect(publicPublished.body.data.item.slug).toBe("seo-dubai");
  });

  it("keeps lead listings private and stores UTM attribution", async () => {
    const lead = await request(app)
      .post("/inquiries")
      .send({
        name: "Aisha Khan",
        email: "aisha@example.com",
        phone: "+971501234567",
        company: "Dubai Growth Studio",
        requiredServices: ["lead-generation-automation", "ppc-google-ads"],
        approximateBudget: "AED 15,000 - AED 40,000",
        timeline: "This month",
        message: "We need support with a lead generation system for our website.",
        consent: true,
        utm: { source: "google", campaign: "seo-dubai" },
        landingPage: "https://icraftads.com/contact",
        referrer: "https://google.com",
        spamToken: "test-token"
      });

    expect(lead.status).toBe(201);

    const publicLeadAttempt = await request(app).get("/public/leads");
    expect(publicLeadAttempt.status).toBe(404);

    const cookie = await loginOwner();
    const adminLeads = await request(app).get("/admin/leads").set("Cookie", cookie);

    expect(adminLeads.status).toBe(200);
    expect(adminLeads.body.data.items[0].utm.source).toBe("google");
    expect(adminLeads.body.data.items[0].requiredServices).toContain("lead-generation-automation");
    expect(adminLeads.body.data.items[0].message).toBeUndefined();
  });
});
