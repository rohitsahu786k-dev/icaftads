import type { NextFunction, Request, Response } from "express";

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function requireTrustedOrigin(allowedOrigins: string[], nodeEnv: string) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!unsafeMethods.has(request.method)) {
      next();
      return;
    }

    const origin = request.get("origin");
    const referer = request.get("referer");
    let source = origin;

    if (!source && referer) {
      try {
        source = new URL(referer).origin;
      } catch {
        source = undefined;
      }
    }

    if (!source && nodeEnv !== "production") {
      next();
      return;
    }

    if (source && allowedOrigins.includes(source)) {
      next();
      return;
    }

    response.status(403).json({
      ok: false,
      error: {
        code: "UNTRUSTED_ORIGIN",
        message: "Request origin is not allowed."
      }
    });
  };
}
