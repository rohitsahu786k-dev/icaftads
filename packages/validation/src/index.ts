import { z } from "zod";

export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id.");

export const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a URL-safe slug.");

export const publishStateSchema = z.enum(["draft", "published", "scheduled", "archived"]);

export const roleSchema = z.enum(["owner", "admin", "editor", "viewer"]);

export const imageMetadataSchema = z.object({
  url: z.string().trim().url(),
  alt: z.string().trim().min(3).max(180),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  caption: z.string().trim().max(240).optional()
});

export const seoMetadataSchema = z.object({
  title: z.string().trim().min(10).max(70),
  description: z.string().trim().min(30).max(170),
  canonicalPath: z.string().trim().startsWith("/").optional(),
  noindex: z.boolean().default(false),
  image: imageMetadataSchema.optional()
});

export const contentStatusFields = {
  state: publishStateSchema.default("draft"),
  publishedAt: z.coerce.date().optional(),
  scheduledFor: z.coerce.date().optional()
};

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: slugSchema,
  excerpt: z.string().trim().min(20).max(320),
  bodyHtml: z.string().trim().min(1),
  order: z.number().int().min(0).default(0),
  featuredImage: imageMetadataSchema.optional(),
  seo: seoMetadataSchema,
  proofStatus: z.string().trim().max(240).default("Incomplete proof requires owner review."),
  ...contentStatusFields
});

export const caseStudySchema = z.object({
  title: z.string().trim().min(2).max(140),
  slug: slugSchema,
  clientName: z.string().trim().max(120).optional(),
  anonymized: z.boolean().default(false),
  industry: z.string().trim().min(2).max(80),
  services: z.array(z.string().trim().min(2).max(80)).min(1),
  summary: z.string().trim().min(20).max(420),
  bodyHtml: z.string().trim().min(1),
  results: z
    .array(
      z.object({
        label: z.string().trim().min(2).max(80),
        value: z.string().trim().min(1).max(80),
        context: z.string().trim().min(2).max(180)
      })
    )
    .default([]),
  permissionStatus: z.string().trim().max(240).default("Client permission required."),
  featuredImage: imageMetadataSchema.optional(),
  seo: seoMetadataSchema,
  ...contentStatusFields
});

export const blogArticleSchema = z.object({
  title: z.string().trim().min(2).max(140),
  slug: slugSchema,
  excerpt: z.string().trim().min(20).max(320),
  bodyHtml: z.string().trim().min(1),
  category: z.string().trim().min(2).max(80),
  tags: z.array(z.string().trim().min(2).max(40)).default([]),
  authorName: z.string().trim().min(2).max(120),
  featuredImage: imageMetadataSchema.optional(),
  seo: seoMetadataSchema,
  ...contentStatusFields
});

export const testimonialSchema = z.object({
  quote: z.string().trim().min(20).max(1000),
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional(),
  company: z.string().trim().max(120).optional(),
  permissionStatus: z.string().trim().max(240).default("Permission requires owner confirmation."),
  featuredImage: imageMetadataSchema.optional(),
  ...contentStatusFields
});

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: slugSchema,
  roleTitle: z.string().trim().min(2).max(120),
  bioHtml: z.string().trim().min(1),
  sortOrder: z.number().int().min(0).default(0),
  photo: imageMetadataSchema.optional(),
  credentialStatus: z.string().trim().max(240).default("Credentials require owner confirmation."),
  ...contentStatusFields
});

export const siteSettingsSchema = z.object({
  key: slugSchema,
  value: z.record(z.string(), z.unknown()),
  isPublic: z.boolean().default(false)
});

export const seoEntrySchema = z.object({
  path: z.string().trim().startsWith("/"),
  seo: seoMetadataSchema
});

export const redirectSchema = z.object({
  sourcePath: z.string().trim().startsWith("/"),
  targetPath: z.string().trim().startsWith("/"),
  statusCode: z
    .union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)])
    .default(301),
  enabled: z.boolean().default(true),
  notes: z.string().trim().max(300).optional()
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(10).max(200)
});

export const adminCreateSchema = adminLoginSchema.extend({
  name: z.string().trim().min(2).max(120),
  role: roleSchema.default("editor")
});

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(5, "Enter a phone number with country code."),
  company: z.string().trim().min(2, "Enter your company name."),
  website: z.string().trim().url("Enter a valid website URL.").optional().or(z.literal("")),
  serviceInterest: z
    .enum([
      "seo",
      "ppc-google-ads",
      "social-media",
      "web-design-development",
      "shopify-development",
      "lead-generation-automation",
      "branding",
      "not-sure"
    ])
    .optional(),
  requiredServices: z
    .array(
      z.enum([
        "seo",
        "ppc-google-ads",
        "social-media",
        "web-design-development",
        "shopify-development",
        "lead-generation-automation",
        "branding",
        "not-sure"
      ])
    )
    .min(1, "Choose at least one service."),
  approximateBudget: z.string().trim().min(2, "Choose an approximate budget."),
  timeline: z.string().trim().min(2, "Choose a timeline."),
  message: z.string().trim().min(20, "Share a little more context."),
  utm: z
    .object({
      source: z.string().trim().max(120).optional(),
      medium: z.string().trim().max(120).optional(),
      campaign: z.string().trim().max(160).optional(),
      term: z.string().trim().max(160).optional(),
      content: z.string().trim().max(160).optional()
    })
    .optional(),
  landingPage: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
  spamToken: z.string().trim().max(500).optional(),
  consent: z.literal(true, {
    error: "Consent is required."
  })
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
