import { NextRequest, NextResponse } from "next/server";

const redirects = new Map<string, string>([
  ["/aboutus-digital-marketing-agency-ahmedabad", "/about"],
  ["/services-digital-marketing-agency-ahmedabad", "/services"],
  ["/contact-us", "/contact"],
  ["/blog-digital-marketing-insights", "/insights"],
  ["/client", "/work"],
  ["/portfolio", "/work"],
  ["/terms-condition", "/terms"],
  ["/terms-and-condition", "/terms"],
  ["/refund-policy", "/privacy-policy"],
  ["/sitemap", "/sitemap.xml"],
  ["/career", "/about"],
  ["/free-tools", "/insights"]
]);

const redirectPrefixes = new Map<string, string>([
  ["/category/", "/insights"],
  ["/tag/", "/insights"],
  ["/author/", "/about"]
]);

const noindexPrefixes = ["/admin", "/preview", "/search"];
const noindexParams = ["preview", "s", "q", "filter"];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const exactRedirect = redirects.get(pathname);

  if (exactRedirect) {
    return NextResponse.redirect(new URL(exactRedirect, request.url), 301);
  }

  for (const [prefix, destination] of redirectPrefixes) {
    if (request.nextUrl.pathname.startsWith(prefix)) {
      return NextResponse.redirect(new URL(destination, request.url), 301);
    }
  }

  const response = NextResponse.next();
  const hasNoindexPath = noindexPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );
  const hasNoindexParam = noindexParams.some((param) => request.nextUrl.searchParams.has(param));

  if (hasNoindexPath || hasNoindexParam) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image).*)"]
};
