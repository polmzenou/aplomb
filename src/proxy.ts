import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Root, every localized path, and any other path without a file extension (so it gets a locale prefix).
  matcher: ["/", "/(fr|en)/:path*", "/((?!_next|_vercel|api|apple-icon|.*\\..*).*)"],
};
