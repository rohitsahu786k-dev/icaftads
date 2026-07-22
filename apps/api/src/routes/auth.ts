import bcrypt from "bcryptjs";
import { Router } from "express";
import type { z } from "zod";
import type { apiEnvSchema } from "@icraftads/config";
import { adminCreateSchema, adminLoginSchema } from "@icraftads/validation";
import { signAdminToken } from "../middleware/auth.js";
import { AdminUser } from "../models/admin-user.js";

type ApiEnv = z.infer<typeof apiEnvSchema>;

export function createAuthRouter(env: ApiEnv) {
  const router = Router();

  router.post("/bootstrap", async (request, response, next) => {
    try {
      const existingCount = await AdminUser.countDocuments();

      if (existingCount > 0) {
        response.status(403).json({
          ok: false,
          error: { code: "FORBIDDEN", message: "Admin bootstrap is already complete." }
        });
        return;
      }

      const parsed = adminCreateSchema.safeParse(request.body);

      if (!parsed.success) {
        response.status(422).json({
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Admin validation failed.",
            details: parsed.error.flatten().fieldErrors
          }
        });
        return;
      }

      const passwordHash = await bcrypt.hash(parsed.data.password, 12);
      const user = await AdminUser.create({
        email: parsed.data.email,
        name: parsed.data.name,
        passwordHash,
        role: "owner"
      });

      response.status(201).json({
        ok: true,
        data: { id: user.id, email: user.email, role: user.role }
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/login", async (request, response, next) => {
    try {
      const parsed = adminLoginSchema.safeParse(request.body);

      if (!parsed.success) {
        response.status(422).json({
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Login validation failed.",
            details: parsed.error.flatten().fieldErrors
          }
        });
        return;
      }

      const user = await AdminUser.findOne({ email: parsed.data.email });
      const valid = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false;

      if (!user || !valid) {
        response.status(401).json({
          ok: false,
          error: { code: "UNAUTHORIZED", message: "Invalid email or password." }
        });
        return;
      }

      user.lastLoginAt = new Date();
      await user.save();

      const token = signAdminToken(env, {
        sub: user.id,
        email: user.email,
        role: user.role
      });

      response.cookie(env.ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        maxAge: env.ADMIN_SESSION_TTL_SECONDS * 1000
      });

      response.json({
        ok: true,
        data: { id: user.id, email: user.email, role: user.role }
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/logout", (_request, response) => {
    response.clearCookie(env.ADMIN_COOKIE_NAME, {
      httpOnly: true,
      sameSite: "lax",
      secure: env.NODE_ENV === "production"
    });
    response.json({ ok: true, data: { loggedOut: true } });
  });

  return router;
}
