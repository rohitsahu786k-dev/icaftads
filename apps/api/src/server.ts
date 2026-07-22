import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import type { z } from "zod";
import type { apiEnvSchema } from "@icraftads/config";
import { contactInquirySchema } from "@icraftads/validation";
import { sanitizePlainText } from "./lib/content.js";
import { evaluateSpam } from "./lib/spam.js";
import { requireAdmin } from "./middleware/auth.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { requireTrustedOrigin } from "./middleware/origin-guard.js";
import { Inquiry } from "./models/inquiry.js";
import { createAuthRouter } from "./routes/auth.js";
import { createLeadRouter } from "./routes/leads.js";
import { registerAdminCmsRoutes, registerPublicRoutes } from "./routes/index.js";

type ApiEnv = z.infer<typeof apiEnvSchema>;

export function createApiApp(env: ApiEnv) {
  const app = express();

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", "data:"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"]
        }
      },
      crossOriginResourcePolicy: { policy: "same-site" },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" }
    })
  );
  app.use(
    cors({
      credentials: true,
      origin(origin, callback) {
        if (!origin || env.CORS_ORIGINS.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin is not allowed by CORS."));
      }
    })
  );
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(requireTrustedOrigin(env.CORS_ORIGINS, env.NODE_ENV));
  app.use(
    rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      limit: env.RATE_LIMIT_MAX,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler(_request, response) {
        response.status(429).json({
          ok: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many requests. Please try again later."
          }
        });
      }
    })
  );

  const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: env.NODE_ENV === "test" ? 100 : 10,
    standardHeaders: "draft-8",
    legacyHeaders: false
  });

  const inquiryRateLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: env.NODE_ENV === "test" ? 100 : 5,
    standardHeaders: "draft-8",
    legacyHeaders: false
  });

  app.get("/health", (_request, response) => {
    response.set("Cache-Control", "no-store");
    response.json({
      ok: true,
      data: {
        service: "icraftads-api",
        status: "ok",
        timestamp: new Date().toISOString()
      }
    });
  });

  app.get("/ready", (_request, response) => {
    response.set("Cache-Control", "no-store");
    const databaseReady = mongoose.connection.readyState === 1;

    response.status(databaseReady ? 200 : 503).json({
      ok: databaseReady,
      data: {
        database: databaseReady ? "connected" : "unavailable",
        service: "icraftads-api",
        status: databaseReady ? "ready" : "not_ready",
        timestamp: new Date().toISOString()
      }
    });
  });

  app.use("/auth", (_request, response, next) => {
    response.set("Cache-Control", "no-store");
    next();
  }, authRateLimit, createAuthRouter(env));

  const publicRouter = express.Router();
  registerPublicRoutes(publicRouter);
  app.use("/public", publicRouter);

  const adminRouter = express.Router();
  adminRouter.use((_request, response, next) => {
    response.set("Cache-Control", "no-store");
    next();
  });
  adminRouter.use(requireAdmin(env));
  registerAdminCmsRoutes(adminRouter);
  adminRouter.use("/leads", createLeadRouter());
  app.use("/admin", adminRouter);

  app.post("/inquiries", inquiryRateLimit, async (request, response, next) => {
    try {
      response.set("Cache-Control", "no-store");
      const parsed = contactInquirySchema.safeParse(request.body);

      if (!parsed.success) {
        response.status(422).json({
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Inquiry validation failed.",
            details: parsed.error.flatten().fieldErrors
          }
        });
        return;
      }

      if (mongoose.connection.readyState !== 1) {
        response.status(503).json({
          ok: false,
          error: {
            code: "SERVICE_UNAVAILABLE",
            message: "Database is not connected."
          }
        });
        return;
      }

      const spam = await evaluateSpam(parsed.data);
      const cleanInquiry = sanitizeInquiry(parsed.data);
      const inquiry = await Inquiry.create({
        ...cleanInquiry,
        spam,
        spamToken: undefined
      });

      response.status(201).json({
        ok: true,
        data: {
          id: inquiry.id
        }
      });
    } catch (error) {
      next(error);
    }
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

function sanitizeInquiry(inquiry: z.infer<typeof contactInquirySchema>) {
  return {
    ...inquiry,
    name: sanitizePlainText(inquiry.name),
    email: sanitizePlainText(inquiry.email),
    phone: sanitizePlainText(inquiry.phone),
    company: sanitizePlainText(inquiry.company),
    website: inquiry.website ? sanitizePlainText(inquiry.website) : inquiry.website,
    approximateBudget: sanitizePlainText(inquiry.approximateBudget),
    timeline: sanitizePlainText(inquiry.timeline),
    message: sanitizePlainText(inquiry.message),
    landingPage: inquiry.landingPage ? sanitizePlainText(inquiry.landingPage) : inquiry.landingPage,
    referrer: inquiry.referrer ? sanitizePlainText(inquiry.referrer) : inquiry.referrer,
    utm: inquiry.utm
      ? {
          source: inquiry.utm.source ? sanitizePlainText(inquiry.utm.source) : undefined,
          medium: inquiry.utm.medium ? sanitizePlainText(inquiry.utm.medium) : undefined,
          campaign: inquiry.utm.campaign ? sanitizePlainText(inquiry.utm.campaign) : undefined,
          term: inquiry.utm.term ? sanitizePlainText(inquiry.utm.term) : undefined,
          content: inquiry.utm.content ? sanitizePlainText(inquiry.utm.content) : undefined
        }
      : undefined
  };
}
