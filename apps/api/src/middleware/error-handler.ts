import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const message = error instanceof Error ? error.message : "Unexpected server error.";

  if (error instanceof Error && error.name === "ConflictError") {
    response.status(409).json({
      ok: false,
      error: {
        code: "CONFLICT",
        message
      }
    });
    return;
  }

  if (isMongoDuplicateKeyError(error)) {
    response.status(409).json({
      ok: false,
      error: {
        code: "CONFLICT",
        message: "A record with the same unique value already exists."
      }
    });
    return;
  }

  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message
    }
  });
};

function isMongoDuplicateKeyError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
}
