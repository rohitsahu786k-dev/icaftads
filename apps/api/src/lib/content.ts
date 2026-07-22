import sanitizeHtml from "sanitize-html";

export function sanitizeContent(html: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" })
    }
  });
}

export function sanitizePlainText(value: string) {
  return sanitizeHtml(value, {
    allowedAttributes: {},
    allowedTags: [],
    disallowedTagsMode: "discard",
    parser: {
      decodeEntities: true
    }
  }).trim();
}

export function pageQuery(query: Record<string, unknown>) {
  const page = Math.max(Number(query.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(query.limit ?? 20), 1), 100);
  return { limit, page, skip: (page - 1) * limit };
}

export function publicContentFilter() {
  const now = new Date();
  return {
    $or: [
      { state: "published", publishedAt: { $lte: now } },
      { state: "scheduled", scheduledFor: { $lte: now } }
    ]
  };
}
