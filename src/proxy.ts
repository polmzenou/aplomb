import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except Next internals, metadata images and files with an extension.
  matcher: "/((?!_next|_vercel|apple-icon|icon|opengraph-image|.*\..*).*)",
};
