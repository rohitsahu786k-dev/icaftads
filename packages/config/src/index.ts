import { z } from "zod";

const nodeEnvSchema = z.enum(["development", "test", "production"]).default("development");
const optionalPublicId = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);
const booleanString = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

export const apiEnvSchema = z
  .object({
    NODE_ENV: nodeEnvSchema,
    API_PORT: z.coerce.number().int().positive().default(4000),
    MONGODB_URI: z.string().trim().min(1).optional(),
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:3000,http://127.0.0.1:3000")
      .transform((value) =>
        value
          .split(",")
          .map((origin) => origin.trim())
          .filter(Boolean)
      ),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
    ADMIN_JWT_SECRET: z.string().min(32).default("development-only-change-this-secret-please"),
    ADMIN_COOKIE_NAME: z.string().min(1).default("icraft_admin"),
    ADMIN_SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(28800)
  })
  .superRefine((env, context) => {
    if (
      env.NODE_ENV === "production" &&
      env.ADMIN_JWT_SECRET === "development-only-change-this-secret-please"
    ) {
      context.addIssue({
        code: "custom",
        message: "ADMIN_JWT_SECRET must be set to a production secret.",
        path: ["ADMIN_JWT_SECRET"]
      });
    }
  });

export const webEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4000"),
  NEXT_PUBLIC_GTM_ID: optionalPublicId,
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: optionalPublicId,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: optionalPublicId,
  NEXT_PUBLIC_CLARITY_PROJECT_ID: optionalPublicId,
  NEXT_PUBLIC_ENABLE_CLARITY: booleanString,
  NEXT_PUBLIC_META_PIXEL_ID: optionalPublicId,
  NEXT_PUBLIC_ENABLE_META_PIXEL: booleanString,
  NEXT_PUBLIC_GOOGLE_ADS_ID: optionalPublicId,
  NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: optionalPublicId,
  NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED: booleanString,
  NEXT_PUBLIC_ANALYTICS_DEBUG: booleanString
});

export function parseApiEnv(env: NodeJS.ProcessEnv) {
  return apiEnvSchema.parse(env);
}

export function parseWebEnv(env: NodeJS.ProcessEnv) {
  return webEnvSchema.parse(env);
}
