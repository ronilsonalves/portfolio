import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/studio/",
      },
      {
        userAgent: "MSNBot",
        allow: "/",
        disallow: "/studio/",
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
        disallow: "/studio/",
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: "/studio/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: "/studio/",
      },
    ],
    sitemap: process.env.NEXT_PUBLIC_SITE_URL + "/sitemap.xml",
  };
}
