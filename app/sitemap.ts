import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  getPagesSlugByLanguageQuery,
  getPostsSlugByLanguageQuery,
} from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";

const publicURL = process.env.NEXT_PUBLIC_SITE_URL;

function generatePagesSlugs(language: string) {
  return sanityFetch<SanityDocument>({
    query: getPagesSlugByLanguageQuery,
    params: { language },
  });
}

function generatePostsSlugs(language: string) {
  return sanityFetch<SanityDocument>({
    query: getPostsSlugByLanguageQuery,
    params: { language },
  });
}

export default async function Sitemap(): Promise<
  {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never"
      | undefined;
    priority?: number | undefined;
  }[]
> {
  const pagesSlug: string[] = [];
  await generatePagesSlugs("en").then((slugs) => {
    slugs.forEach((page: any) => {
      pagesSlug.push(page.slug);
    });
  });
  await generatePagesSlugs("pt").then((slugs) => {
    slugs.forEach((page: any) => {
      pagesSlug.push("pt/" + page.slug);
    });
  });
  const postsSlug: string[] = [];
  await generatePostsSlugs("en").then((slugs) => {
    slugs.forEach((page: any) => {
      postsSlug.push("articles/" + page.slug);
    });
  });
  await generatePostsSlugs("pt").then((slugs) => {
    slugs.forEach((page: any) => {
      postsSlug.push("pt/artigos/" + page.slug);
    });
  });

  let xml: MetadataRoute.Sitemap = [
    {
      url: publicURL!,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  pagesSlug.forEach((slug) => {
    xml.push({
      url: `${publicURL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  postsSlug.forEach((slug) => {
    xml.push({
      url: `${publicURL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return xml;
}
