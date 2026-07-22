import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { z } from "zod";
import type { apiEnvSchema } from "@icraftads/config";

type ApiEnv = z.infer<typeof apiEnvSchema>;
export type AdminRole = "owner" | "admin" | "editor" | "viewer";

export type AdminSession = {
  sub: string;
  email: string;
  role: AdminRole;
};

declare module "express-serve-static-core" {
  interface Request {
    admin?: AdminSession;
  }
}

export function signAdminToken(env: ApiEnv, session: AdminSession) {
  return jwt.sign(session, env.ADMIN_JWT_SECRET, {
    expiresIn: env.ADMIN_SESSION_TTL_SECONDS
  });
}

export function requireAdmin(env: ApiEnv, roles: AdminRole[] = ["owner", "admin", "editor"]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies?.[env.ADMIN_COOKIE_NAME] as string | undefined;

    if (!token) {
      response.status(401).json({
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Admin authentication is required." }
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, env.ADMIN_JWT_SECRET) as AdminSession;

      if (!roles.includes(decoded.role)) {
        response.status(403).json({
          ok: false,
          error: { code: "FORBIDDEN", message: "Your role cannot access this resource." }
        });
        return;
      }

      request.admin = decoded;
      next();
    } catch {
      response.status(401).json({
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Admin session is invalid or expired." }
      });
    }
  };
}
