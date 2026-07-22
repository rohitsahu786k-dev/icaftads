import { describe, expect, it } from "vitest";
import { contactInquirySchema } from "./index.js";

describe("contactInquirySchema", () => {
  it("accepts a complete inquiry", () => {
    const result = contactInquirySchema.safeParse({
      name: "Aisha Khan",
      email: "aisha@example.com",
      phone: "+971501234567",
      company: "Dubai Growth Studio",
      website: "https://example.com",
      serviceInterest: "seo",
      requiredServices: ["seo", "lead-generation-automation"],
      approximateBudget: "AED 15,000 - AED 40,000",
      timeline: "1-3 months",
      message: "We need a clearer SEO and lead generation plan for our UAE website.",
      landingPage: "https://icraftads.com/contact",
      referrer: "https://google.com",
      consent: true
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing consent and thin messages", () => {
    const result = contactInquirySchema.safeParse({
      name: "A",
      email: "not-an-email",
      phone: "",
      company: "",
      requiredServices: [],
      approximateBudget: "",
      timeline: "",
      message: "Help",
      consent: false
    });

    expect(result.success).toBe(false);
  });
});
