import { Router } from "express";
import type { Model } from "mongoose";
import type { ZodType } from "zod";
import { pageQuery, publicContentFilter, sanitizeContent } from "../lib/content.js";
import { assertUniqueSlug } from "../lib/slug.js";

type CmsRouteOptions<T extends ZodType> = {
  model: Model<any>;
  schema: T;
  slugged?: boolean;
  sanitizeFields?: string[];
};

export function createCmsRouter<T extends ZodType>(options: CmsRouteOptions<T>) {
  const router = Router();

  router.get("/", async (request, response, next) => {
    try {
      response.set(
        "Cache-Control",
        "no-store"
      );
      const { limit, page, skip } = pageQuery(request.query);
      const state = typeof request.query.state === "string" ? request.query.state : undefined;
      const filter = state ? { state } : {};
      const [items, total] = await Promise.all([
        options.model.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
        options.model.countDocuments(filter)
      ]);

      response.json({ ok: true, data: { items, pagination: { limit, page, total } } });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (request, response, next) => {
    try {
      const parsed = options.schema.safeParse(request.body);

      if (!parsed.success) {
        response.status(422).json({
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Request validation failed.",
            details: parsed.error.flatten().fieldErrors
          }
        });
        return;
      }

      const data = sanitizePayload(parsed.data, options.sanitizeFields);

      if (options.slugged && hasSlug(data)) {
        await assertUniqueSlug(options.model, data.slug);
      }

      const item = await options.model.create(data);
      response.status(201).json({ ok: true, data: { item } });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (request, response, next) => {
    try {
      const item = await options.model.findById(request.params.id).lean();

      if (!item) {
        response.status(404).json({
          ok: false,
          error: { code: "NOT_FOUND", message: "Item was not found." }
        });
        return;
      }

      response.json({ ok: true, data: { item } });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (request, response, next) => {
    try {
      const parsed = options.schema.safeParse(request.body);

      if (!parsed.success) {
        response.status(422).json({
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Request validation failed.",
            details: parsed.error.flatten().fieldErrors
          }
        });
        return;
      }

      const data = sanitizePayload(parsed.data, options.sanitizeFields);

      if (options.slugged && hasSlug(data)) {
        await assertUniqueSlug(options.model, data.slug, request.params.id);
      }

      const item = await options.model.findByIdAndUpdate(request.params.id, data, {
        new: true,
        runValidators: true
      });

      if (!item) {
        response.status(404).json({
          ok: false,
          error: { code: "NOT_FOUND", message: "Item was not found." }
        });
        return;
      }

      response.json({ ok: true, data: { item } });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export function createPublicCmsRouter(model: Model<any>) {
  const router = Router();

  router.get("/", async (request, response, next) => {
    try {
      response.set(
        "Cache-Control",
        "public, max-age=60, s-maxage=300, stale-while-revalidate=1800"
      );
      const { limit, page, skip } = pageQuery(request.query);
      const [items, total] = await Promise.all([
        model
          .find(publicContentFilter())
          .sort({ publishedAt: -1, order: 1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        model.countDocuments(publicContentFilter())
      ]);

      response.json({ ok: true, data: { items, pagination: { limit, page, total } } });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:slug", async (request, response, next) => {
    try {
      response.set(
        "Cache-Control",
        "public, max-age=60, s-maxage=300, stale-while-revalidate=1800"
      );
      const item = await model
        .findOne({ slug: request.params.slug, ...publicContentFilter() })
        .lean();

      if (!item) {
        response.status(404).json({
          ok: false,
          error: { code: "NOT_FOUND", message: "Item was not found." }
        });
        return;
      }

      response.json({ ok: true, data: { item } });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

function sanitizePayload<T>(payload: T, fields: string[] = []) {
  const clone = { ...(payload as Record<string, unknown>) };

  for (const field of fields) {
    if (typeof clone[field] === "string") {
      clone[field] = sanitizeContent(clone[field]);
    }
  }

  return clone;
}

function hasSlug(value: unknown): value is { slug: string } {
  return typeof value === "object" && value !== null && "slug" in value;
}
