import { Router } from "express";
import { pageQuery } from "../lib/content.js";
import { Inquiry } from "../models/inquiry.js";

export function createLeadRouter() {
  const router = Router();

  router.get("/", async (request, response, next) => {
    try {
      const { limit, page, skip } = pageQuery(request.query);
      const serviceInterest =
        typeof request.query.serviceInterest === "string"
          ? request.query.serviceInterest
          : undefined;
      const filter = serviceInterest ? { serviceInterest } : {};
      const [items, total] = await Promise.all([
        Inquiry.find(filter)
          .select("-message")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Inquiry.countDocuments(filter)
      ]);

      response.json({ ok: true, data: { items, pagination: { limit, page, total } } });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (request, response, next) => {
    try {
      const item = await Inquiry.findById(request.params.id).lean();

      if (!item) {
        response.status(404).json({
          ok: false,
          error: { code: "NOT_FOUND", message: "Lead was not found." }
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
