import { toPlainText } from "@portabletext/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { SanityDocument } from "next-sanity";
import Page from "@/components/institutional/page";
import {
  pageWithTranslationsQuery,
  postsByLangQuery,
} from "@/sanity/lib/queries";
import { generateStaticSlugs, sanityFetch } from "@/sanity/lib/fetch";

type Props = {
  params: { slug: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const loadedPage = await loadPage(params.slug, params.locale);
  if (!loadedPage) {
    notFound();
  }
  const languages = loadedPage?._translations?.filter(
    (translation: any) => translation !== undefined,
  );

  const en = languages.filter((language: any) => language?.language === "en");
  const pt = languages.filter((language: any) => language?.language === "pt");

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronilsonalves.com",
    ),
    alternates: {
      canonical:
        params.locale === "en" ? "/" + params.slug : "/pt/" + params.slug,
      languages: {
        en: en.length > 0 ? "/" + en[0].slug.current : "/",
        pt: pt.length > 0 ? "/pt/" + pt[0].slug.current : "/pt",
      },
    },
    title: loadedPage.title + " – Ronilson Alves",
    description: toPlainText(loadedPage.overview),
    openGraph: {
      type: "article",
      locale: params.locale,
      url: params.locale === "en" ? "/" + params.slug : "/pt/" + params.slug,
      siteName: t("Title"),
      title: loadedPage.title + " – " + process.env.NEXT_PUBLIC_SITE_NAME,
      description: toPlainText(loadedPage.overview),
      images: [
        {
          url: "https://c.ronilson.dev.br/images/og.png",
          width: 1200,
          height: 630,
          alt: loadedPage.title + " – Ronilson Alves",
        },
      ],
    },
  };
}

export function generateStaticParams() {
  const staticSlugs: String[] = [];
  generateStaticSlugs("page").then((slugs) => {
    staticSlugs.push(...slugs);
  });
  generateStaticSlugs("post").then((slugs) => {
    staticSlugs.push(...slugs);
  });
  return staticSlugs;
}

async function loadPage(slug: string, locale: string) {
  return await sanityFetch<SanityDocument>({
    query: pageWithTranslationsQuery,
    params: { slug, locale },
  });
}

async function loadPosts(language: string) {
  return await sanityFetch<SanityDocument[]>({
    query: postsByLangQuery,
    params: { language },
  });
}

export default async function PageSlugRoute({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const page = await loadPage(params.slug, params.locale);
  if (!page) {
    notFound();
  }
  switch (page.slug.current) {
    case "artigos":
    case "articles":
      const posts = await loadPosts(params.locale);
      return <Page page={page} posts={posts} locale={params.locale} />;
    default:
      return <Page page={page} />;
  }
}
