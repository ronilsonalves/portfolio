import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "pt"],

  // Used when no locale matches
  defaultLocale: "en",

  // The directory that contains our locale JSON files, working with "as-needed"
  localePrefix: "never",

  pathnames: {
    "/": "/",

    "/articles/[...slug]": {
      en: "/articles/[...slug]",
      pt: "/artigos/[...slug]",
    },
  },
});
export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(en|pt)/:path*",
    "/((?!api|_next|_vercel|studio|ads.txt|.*\\..*).*)",
  ],
};
